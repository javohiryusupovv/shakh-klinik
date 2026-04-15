# Architecture Research — ShaxKlinika

**Confidence:** HIGH

## Component Layers

### Layer 1 — UI Primitives (`/components/ui/`)
shadcn/ui re-exports + atomic tokens. No business logic/i18n/data. Client only when carrying browser handlers.

Primitives: Button, Badge, Card (glass shell), Skeleton, Dialog, StarRating, Input/Textarea/Select.

### Layer 2 — Section Modules (`/components/sections/`)
Page-level blocks. Receive pre-fetched, pre-localized data as props from the page RSC. Own their Framer Motion (`motion/react`) animations.

RSC by default; Client only when owning browser state (Swiper, `whileInView`, forms). Pattern: outer RSC receives data from page, passes minimal props to inner client island.

| Component | Data Source | Emits To |
|---|---|---|
| HeroSlider | messages/[locale].json slides | Appointment modal |
| ServicesGrid | /lib/data/services.ts via page | — |
| DoctorsSlider/Grid | /lib/data/doctors.ts via page | Appointment modal |
| StatsCounter | Hardcoded (15y, 50k…) | — |
| NewsGrid | /lib/data/news.ts via page | — |
| ReviewsSlider | /lib/data/reviews.ts via page | — |
| ReviewForm | User input | /api/review |
| ContactForm | User input | /api/contact |
| GalleryTabs | Image arrays | — |
| BreadcrumbNav | Locale-aware hrefs | — |

### Layer 3 — Layout Shell (`/components/layout/`)
Header (RSC shell) · LanguageSwitcher (client, uses next-intl `useRouter`) · MobileMenu (client) · Footer (RSC).

### Layer 4 — Shared (`/components/shared/`)
GlassCard · AnimatedCounter (client) · **AppointmentModal** (client) · FloatingCTA · JsonLd (RSC) · CookieConsent (client) · ScrollToTop (client) · PageTransition (client).

### Layer 5 — Page Shells (`/app/[locale]/*/page.tsx`)
RSC only. Import data, compose sections, call `generateMetadata`, generate JSON-LD, return JSX. Thin orchestrators.

### AppointmentModal Pattern

Client component triggered from Hero, DoctorCard, FloatingCTA, Header. Wrap in `<AppointmentModalProvider>` context mounted as a client boundary *inside* the locale layout. Sections dispatch through context, not prop drilling.

## Data + Messages Split

```
/lib/data/                             locale-agnostic
  services.ts    slug, categoryId, priceMin, priceMax, durationMinutes, imageQuery
  doctors.ts     slug, photo, departmentId, experience, workingHours
  news.ts        slug, date, authorSlug, categoryId, coverImageQuery
  reviews.ts     rating, date, serviceSlug, doctorSlug

/messages/                             human-readable + translations
  ru.json  uz.json  en.json
    services.[slug].name / description
    doctors.[slug].name / bio / metaDescription
    news.[slug].title / content
    reviews.[id].text / authorName
    UI labels, nav, CTA, validation errors
```

**Slug strategy:** single canonical slug (`cardiology-consultation`, `karimov-sherzod`). Locale URL prefix differentiates SEO. hreflang handles equivalence. Don't use per-locale slugs — triples generateStaticParams cost, zero SEO benefit.

## Data Flow: Data → Cards → Detail → JSON-LD

```
/lib/data/services.ts (Service[])
  │
  ▼ import in page RSC
/app/[locale]/services/page.tsx
  - import services
  - const t = await getTranslations({ locale, namespace: 'services' })
  - merged = services.map(s => ({ ...s, name: t(`${s.slug}.name`), description: t(`${s.slug}.description`) }))
  - <ServicesGrid items={merged} />
  - generateMetadata + hreflang alternates
  - <JsonLd schema={buildServiceListSchema(merged, locale)} />
  │
  ▼ slug param
/app/[locale]/services/[slug]/page.tsx
  - find by slug, merge with translations
  - <ServiceDetail service={merged} />
  - generateMetadata (localized title/desc/OG/canonical/hreflang)
  - <JsonLd schema={buildMedicalProcedureSchema(merged, locale)} />
```

Identical pattern for doctors → Physician, news → NewsArticle, reviews → Review.

## Rendering Strategy

| Page | Strategy | Notes |
|---|---|---|
| Home | SSG (`force-static`) | — |
| Services list | SSG | — |
| Services detail | SSG + `generateStaticParams` | ~25×3 = 75 pages |
| Doctors list | SSG | — |
| Doctors detail | SSG + `generateStaticParams` | ~15×3 = 45 pages |
| News list | SSG | — |
| News detail | SSG + `generateStaticParams` | ~12×3 = 36 pages |
| Reviews | SSG + client form island | — |
| Gallery | SSG | — |
| Contact | SSG + client form island | — |
| API routes | Node dynamic | Telegram calls |
| sitemap.ts / robots.ts | Build-time | native |

ISR not needed for v1. Use `export const dynamic = 'force-static'` on marketing pages.

```ts
export async function generateStaticParams() {
  return locales.flatMap(locale =>
    services.map(s => ({ locale, slug: s.slug }))
  )
}
```

## Metadata + SEO Layering

**Root layout:** `metadataBase` fallback only.

**Locale layout:** title template, global default description, MedicalOrganization + LocalBusiness JSON-LD (every page), locale-root hreflang.

```ts
alternates: {
  canonical: `/${locale}`,
  languages: { ru: '/ru', uz: '/uz', en: '/en', 'x-default': '/ru' }
}
```

**Per-page `generateMetadata`:** unique title, description, OG, hreflang per slug:

```ts
alternates: {
  canonical: `/${locale}/doctors/${slug}`,
  languages: {
    ru: `/ru/doctors/${slug}`,
    uz: `/uz/doctors/${slug}`,
    en: `/en/doctors/${slug}`,
    'x-default': `/ru/doctors/${slug}`
  }
}
```

**JSON-LD by page:**

| Page | Schemas |
|---|---|
| Every page (locale layout) | MedicalOrganization, LocalBusiness |
| Home | LocalBusiness, BreadcrumbList |
| Service detail | MedicalProcedure, BreadcrumbList |
| Doctor detail | Physician, BreadcrumbList |
| News detail | NewsArticle, BreadcrumbList |
| Reviews page | AggregateRating + Review × N, BreadcrumbList |
| Contact | Full LocalBusiness (address, geo, hours) |

Types via `schema-dts`. Generators in `/lib/seo.ts`. Shared `<JsonLd>` RSC component. Never hand-write schema strings in pages.

**Sitemap:** native `app/sitemap.ts` with `alternates.languages`. **Do not** install `next-sitemap` — conflicts.

## API Route Boundaries

Routes at `/app/api/` (not under `/[locale]/`). Node runtime.

- **POST /api/appointment** — `{ name, phone, service, doctor?, preferredDate }` → Zod → Telegram
- **POST /api/contact** — `{ name, phone, email, service, message }` → Zod → Telegram
- **POST /api/review** — `{ name, rating, text, serviceName, doctorName? }` → Zod → Telegram (manual moderation, no DB)

Shared:
- `/lib/telegram.ts` — `sendTelegramMessage(text)` with env vars
- `/lib/validations.ts` — Zod schemas shared by RHF client + server route
- `/lib/rateLimit.ts` — in-memory Map keyed by `X-Forwarded-For`, 5/min, 429 on excess. Acceptable for v1.

## Anti-Patterns

- **Importing `/lib/data/*` in `"use client"` components** — bundles entire dataset client-side. Always import in page RSC, pass minimal props down.
- **`useTranslations` in async RSC** — runtime error. Use `await getTranslations()` in RSC, `useTranslations()` in client.
- **Locale-specific slugs** — triples `generateStaticParams`; no SEO benefit.
- **Hand-written JSON-LD strings** — no type safety. Use `schema-dts` + `/lib/seo.ts`.
- **AppointmentModal state in layout** — forces layout to client. Use context provider mounted as child boundary.
- **`next-sitemap` alongside native `sitemap.ts`** — conflict/overwrite.

## Build Order (phase-level)

```
P1 — Foundation
    next.config.ts · proxy.ts + i18n.ts · messages/*.json skeleton
    app/layout + app/[locale]/layout
    globals.css with @theme + @utility glass

P2 — Design System
    shadcn init + primitives (Button, Card, Dialog, Input...)
    GlassCard, AnimatedCounter, PageTransition

P3 — Data Layer
    /lib/data/{services,doctors,news,reviews}.ts
    Populate messages/*.json with all content translations

P4 — Layout Chrome
    Header (RSC + LanguageSwitcher client)
    Footer · MobileMenu
    AppointmentModal + Provider + FloatingCTA
    CookieConsent · ScrollToTop

P5 — API Routes
    lib/telegram · lib/validations · lib/rateLimit
    api/appointment · api/contact · api/review

P6 — Pages
    Home · Services + detail · Doctors + detail
    News + detail + pagination · Reviews + form
    Gallery + lightbox · Contact + Yandex map · 404

P7 — SEO
    generateMetadata per page + hreflang
    /lib/seo.ts JSON-LD generators + <JsonLd>
    app/sitemap.ts · app/robots.ts

P8 — Polish
    Page transitions, scroll reveal, Ken Burns, counters
    Performance audit · README
```

**Critical path blockers:**
- P1 blocks everything (message key namespace must exist first)
- P3 blocks P6 (pages import data + translations)
- P4 blocks P6 (layout wraps pages)
- P5 blocks P6 form testing
- P6 blocks P7 (generateMetadata per page)

## Open Questions

1. Read `node_modules/next/dist/docs/upgrading/version-16.md` before P1 to confirm `sitemap.ts` MetadataRoute alternates API is available.
2. Verify next-intl major version after install — `getTranslations` async function exists in v3.x; v2 uses different API.

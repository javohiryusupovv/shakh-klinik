# Research Summary — ShaxKlinika

## Headline Findings

1. **Next.js 16, not 14.** Scaffolded `package.json` pins `next@16.2.3` + `react@19.2.4` + `tailwindcss@^4`. TZ is out of date. Every implementation decision must target v16. (AGENTS.md's breaking-change warning = this.)
2. **File convention change:** `middleware.ts` → **`proxy.ts`**. Silent failure if wrong filename used.
3. **Async params everywhere:** `params`, `searchParams`, `cookies()`, `headers()` are Promises in v16.
4. **Tailwind 4 is CSS-first:** no `tailwind.config.ts`. Colors + `.glass` go in `globals.css` via `@theme` and `@utility`.
5. **Framer Motion → `motion`:** renamed package. Install `motion`, import `motion/react`.
6. **No `next-sitemap`:** use native `app/sitemap.ts` (supports `alternates.languages`). Installing next-sitemap overwrites native output.
7. **`source.unsplash.com` is deprecated** and rate-limits. Either add all Unsplash hosts to `remotePatterns` or pre-download a static set.
8. **Telegram-first booking is correct** for UZ market (~80% urban penetration). Yandex Maps mandatory (not Google).
9. **Appointment modal is the critical-path component** — every CTA across the site depends on it; build via client-context provider inside locale layout.
10. **Glass perf:** `backdrop-filter` kills mid-tier Android. Apply `.glass` selectively (Header + visible cards only); add reduced-motion fallback without blur.

## Stack Lock

**Install:**
`next-intl`, `motion`, `swiper`, `lucide-react`, `react-hook-form`, `@hookform/resolvers`, `zod`, `schema-dts`, `@next/third-parties`. shadcn/ui via `npx shadcn@latest init` (select Tailwind 4). `yet-another-react-lightbox` for gallery.

**Do not install:** `framer-motion`, `next-sitemap`, `next-i18next`, `@pbe/react-yandex-maps`, `telegraf`, `tailwindcss@3`, `autoprefixer`.

## Architecture Lock

- 5 component layers: `ui/` (shadcn), `sections/` (RSC receiving page-props), `layout/` (Header/Footer/MobileMenu), `shared/` (GlassCard, Modal, FloatingCTA, JsonLd), pages (thin RSC orchestrators).
- Data/messages split: `/lib/data/*.ts` locale-agnostic structure; `/messages/{ru,uz,en}.json` all strings + translated content.
- Single canonical slug per entity. hreflang handles locale equivalence.
- SSG + `generateStaticParams` on all marketing pages; force-static; no ISR.
- `generateMetadata` per page with `alternates.languages` for hreflang.
- JSON-LD: `schema-dts` types, `/lib/seo.ts` generators, shared `<JsonLd>` RSC; escape `<` to `\u003c`.
- API routes (`/app/api/{appointment,contact,review}/route.ts`) share `/lib/telegram.ts` (with `import 'server-only'`), `/lib/validations.ts` (shared Zod), and in-memory rate-limiter.
- AppointmentModal mounted via a `<AppointmentModalProvider>` client boundary inside locale layout; invoked by context from any section.

## Build Order (phase candidates)

1. **Foundation & i18n scaffold** — proxy.ts, next-intl, messages skeletons, root + locale layouts, `next/font`.
2. **Design System** — Tailwind 4 `@theme` + `@utility glass`, shadcn init + primitives, GlassCard, AnimatedCounter, PageTransition; reduced-motion + contrast rules baked in.
3. **Data & Content** — `/lib/data/*.ts` + fully translated `/messages/*.json` (services ×25, doctors ×15, news ×12, reviews ×20). Include FAQ copy (added per features research).
4. **Layout, Modal & API** — Header/Footer/MobileMenu, AppointmentModalProvider, FloatingCTA, Cookie/ScrollTop, `/lib/telegram.ts` + Zod + rate-limit + 3 API routes.
5. **Pages** — Home, Services (+ detail), Doctors (+ detail), News (+ detail + pagination), Reviews (+ form), Gallery (+ lightbox), Contact (+ Yandex iframe), 404.
6. **SEO & Ship** — generateMetadata + hreflang per page, JSON-LD per type, `app/sitemap.ts`, `app/robots.ts`, Lighthouse audit, README, Vercel deploy.

## Market Notes (Uzbekistan)

- Default RU; UZ (Latin) must be fully polished; EN acceptable slightly leaner
- Phone: `+998 XX XXX-XX-XX` · Currency: `"150 000 сум"` (thin space)
- Maps: Yandex iframe only · Messaging: Telegram primary, WhatsApp secondary
- Mobile-first 360px · Budget Android (Galaxy A/Redmi) baseline · avg 15-25 Mbps
- Law ZRU-547: no PII storage — Telegram delivery only, no DB
- Yandex Metrika + GA4 dual tracking; both non-blocking

## Features Additions Beyond TZ (low cost, high value)

- Compact FAQ accordion on home (6-8 questions): booking, insurance, consult length, referrals
- Prominent 24/7 emergency phone in hero/header
- "Pending moderation" explicit UX on review submission (no DB → Telegram inbox workflow)

## Watch Out For (Top Risks)

- `middleware.ts` silently ignored → all i18n broken
- Sync `params` → runtime crash on every dynamic route
- Swiper SSR hydration mismatch → CLS spike on hero
- `backdrop-filter` stacked over many elements → mobile FPS collapse
- `TELEGRAM_BOT_TOKEN` client leakage (import trail via `/lib/telegram.ts`)
- `next-sitemap` overwriting native sitemap
- Glass contrast failing WCAG AA (use `#1F2937` for body on glass)
- `source.unsplash.com` redirects breaking `next/image` without correct `remotePatterns`

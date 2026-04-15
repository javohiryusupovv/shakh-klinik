# Requirements: ShaxKlinika

**Defined:** 2026-04-15
**Core Value:** Convert visitors into booked appointments by presenting the clinic as trustworthy, modern, and accessible — in the visitor's own language, on any device, and with content that ranks on search engines.

## v1 Requirements

### Foundation

- [x] **FND-01**: Project runs on Next.js 16 App Router + React 19 + TypeScript 5 with `npm install && npm run dev`
- [x] **FND-02**: Tailwind CSS v4 configured CSS-first in `app/globals.css` via `@import 'tailwindcss'`, `@theme` tokens, and `@utility glass` (no `tailwind.config.ts`)
- [x] **FND-03**: `proxy.ts` (not `middleware.ts`) is in repo root and routes locale prefixes via `next-intl`
- [x] **FND-04**: `next.config.ts` includes `images.remotePatterns` for `source.unsplash.com`, `images.unsplash.com`, and `*.unsplash.com`
- [x] **FND-05**: Environment variables documented in `.env.example`: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_YM_ID`
- [x] **FND-06**: Fonts loaded via `next/font/google` (Inter + PT Sans, `latin` + `cyrillic` subsets, `display: 'swap'`)

### i18n

- [x] **I18N-01**: Three locales configured — `ru` (default), `uz`, `en` — with URL prefixes `/ru/...`, `/uz/...`, `/en/...`
- [x] **I18N-02**: Visiting `/` redirects to `/ru`
- [x] **I18N-03**: Header contains a working language switcher (with flag icons) that preserves the current pathname
- [x] **I18N-04**: All UI labels, nav items, CTAs, and validation messages exist in `/messages/{ru,uz,en}.json`
- [x] **I18N-05**: All content (services, doctors, news, reviews, FAQ) is translated into all 3 languages — no Lorem Ipsum, no English in UZ/RU pages
- [x] **I18N-06**: `<html lang>` attribute matches the current locale

### Design System

- [ ] **DS-01**: Color tokens in `@theme`: white, light-blues, primary `#4A9EE7`, deep-blue `#2B7FCC`/`#1A5A94`, text `#1F2937`/`#6B7280`, mint `#A8E6CF`
- [ ] **DS-02**: `.glass` utility applies backdrop-filter blur 20px + saturate 180% + translucent white + border + shadow + rounded-2xl
- [ ] **DS-03**: `.glass` has a hover state (lift + deeper shadow) and a `prefers-reduced-motion` fallback that removes blur and uses solid `rgba(255,255,255,0.9)`
- [ ] **DS-04**: Typography scale per TZ (H1 48-64, H2 36-48, H3 24-32, body 16-18) applied via utilities or typography plugin
- [ ] **DS-05**: Buttons — rounded-full, glass variant, gradient primary CTA with motion on click
- [ ] **DS-06**: Cards — rounded-2xl glass with hover lift
- [ ] **DS-07**: Page background uses subtle white→light-blue gradient with occasional blob shapes
- [ ] **DS-08**: Body text on glass meets WCAG AA contrast (4.5:1); primary body uses `#1F2937` on glass
- [ ] **DS-09**: shadcn/ui primitives initialized (Button, Dialog, Input, Textarea, Select, Tabs, Badge, Skeleton) and re-exported from `/components/ui`

### Home Page (`/`)

- [ ] **HOME-01**: Hero Swiper slider — 4 slides, autoplay 5s, fade transition, Ken Burns effect, SSR-safe via `dynamic({ ssr: false })` with skeleton fallback of matching height
- [ ] **HOME-02**: About section (3-4 paragraphs)
- [ ] **HOME-03**: "Why choose us" — 6 glass feature cards with hover lift (Опытные врачи, Современное оборудование, Удобное расположение, Доступные цены, Индивидуальный подход, Конфиденциальность)
- [ ] **HOME-04**: Popular services grid — 8 cards linking to `/services/[slug]`
- [ ] **HOME-05**: Animated stats counter (15+, 50 000+, 40+, 25+) using `whileInView` + `useReducedMotion` fallback
- [ ] **HOME-06**: Top doctors slider — 6 doctors linking to `/doctors/[slug]`
- [ ] **HOME-07**: Latest news — 3 cards linking to `/news/[slug]`
- [ ] **HOME-08**: Reviews slider (desktop + mobile)
- [ ] **HOME-09**: FAQ accordion — 6-8 questions (booking, insurance, consult length, referrals, etc.)
- [ ] **HOME-10**: Final CTA section: "Запишитесь на прием" opens Appointment Modal
- [ ] **HOME-11**: Hero LCP image uses `priority` + explicit width/height; `next/image` everywhere

### Services (`/services`)

- [ ] **SRV-01**: Static data file `/lib/data/services.ts` with 25+ services (structure: slug, categoryId, priceMin, priceMax, durationMinutes, imageQuery) spanning 13 categories per TZ
- [ ] **SRV-02**: Service names + descriptions (100-150 words each) in all 3 messages JSON
- [ ] **SRV-03**: `/services` lists all services grouped by category with filter UI (by category)
- [ ] **SRV-04**: `/services/[slug]` detail page with name, full description, duration, UZS price range ("от 50 000 сум"), responsible department, booking CTA
- [ ] **SRV-05**: Each service page renders `MedicalProcedure` JSON-LD
- [ ] **SRV-06**: `generateStaticParams` emits the locale × slug matrix for all services

### Doctors (`/doctors`)

- [ ] **DOC-01**: Static data file `/lib/data/doctors.ts` with 15 doctors (structure: slug, photoQuery, departmentId, experience, workingHours)
- [ ] **DOC-02**: Doctor names (Uzbek/Russian: Каримов Шерзод Алишерович, etc.), specialty, education, achievements, bio (150-200 words) in messages JSON for all locales
- [ ] **DOC-03**: `/doctors` lists all 15 with filter by department
- [ ] **DOC-04**: `/doctors/[slug]` detail page with photo (400×500), credentials, bio, hours, "Записаться на прием" CTA pre-fills the appointment modal
- [ ] **DOC-05**: Each doctor page renders `Physician` JSON-LD with Schema.org `medicalSpecialty`
- [ ] **DOC-06**: `generateStaticParams` covers locale × slug

### News (`/news`)

- [ ] **NWS-01**: Static data file `/lib/data/news.ts` with 12 articles (slug, date, authorSlug, categoryId, coverImageQuery)
- [ ] **NWS-02**: Article titles + bodies (300-500 words each) in messages JSON, across all three languages and matching TZ examples
- [ ] **NWS-03**: `/news` lists articles with pagination (e.g., 6 per page)
- [ ] **NWS-04**: `/news/[slug]` detail page with title, date, category, cover image, content, author, related news (3 from same category)
- [ ] **NWS-05**: Each article renders `NewsArticle` JSON-LD
- [ ] **NWS-06**: `generateStaticParams` covers locale × slug

### Reviews (`/reviews`)

- [ ] **RVW-01**: Static data file `/lib/data/reviews.ts` with 20 reviews (rating 4-5, date, serviceSlug, doctorSlug)
- [ ] **RVW-02**: Review names + texts (50-150 words) in messages JSON for all locales
- [ ] **RVW-03**: `/reviews` displays a grid of all reviews with star ratings
- [ ] **RVW-04**: Review submission form (name, rating, text, service) validated with RHF + Zod, posts to `/api/review`, shows explicit pending-moderation message in current locale after submit
- [ ] **RVW-05**: Reviews page renders `AggregateRating` + `Review × N` JSON-LD

### Gallery (`/gallery`)

- [ ] **GAL-01**: Tabs: Клиника / Оборудование / Команда / Мероприятия (localized)
- [ ] **GAL-02**: Masonry layout with lazy-loaded `next/image` (Unsplash URLs per TZ); explicit widths/heights
- [ ] **GAL-03**: Lightbox on click (via `yet-another-react-lightbox` or equivalent) with keyboard nav

### Contact (`/contact`)

- [ ] **CNT-01**: Displays address, two phones, email, and working hours (Пн-Сб 8:00-20:00, Вс 9:00-15:00) — localized
- [ ] **CNT-02**: Embedded Yandex Maps iframe (lazy-loaded) pointing to placeholder Tashkent coordinates (Амира Темура 108)
- [ ] **CNT-03**: Contact form (Name, Phone `+998`-regex, Email, Service dropdown, Message) validated with RHF + Zod, submits to `/api/contact`
- [ ] **CNT-04**: Social links: Telegram, Instagram, Facebook, YouTube
- [ ] **CNT-05**: Contact page renders full `LocalBusiness` JSON-LD (address, geo, hours)

### Layout & Shared UI

- [ ] **LAY-01**: Sticky glass Header with logo, nav, language switcher, and "Запись" CTA (opens modal)
- [ ] **LAY-02**: Footer with logo, about blurb, quick links, contacts, social, copyright
- [ ] **LAY-03**: Floating WhatsApp + Telegram buttons (bottom-right)
- [ ] **LAY-04**: Floating "Запись на прием" FAB on mobile only
- [ ] **LAY-05**: Appointment modal (Name, Phone, Service dropdown, Doctor optional dropdown, preferred date) posts to `/api/appointment`; reachable from every section via `<AppointmentModalProvider>` context
- [ ] **LAY-06**: 404 page with localized message and nav-back
- [ ] **LAY-07**: Cookie consent banner (localized, persists via localStorage)
- [ ] **LAY-08**: Scroll-to-top button appears after scroll
- [ ] **LAY-09**: Loading skeletons on data-dependent sections
- [ ] **LAY-10**: Mobile menu slides from right with backdrop blur
- [ ] **LAY-11**: Prominent 24/7 emergency phone accessible in header (or distinct hero slide 4 badge)

### API Routes & Backend Integration

- [ ] **API-01**: `/lib/telegram.ts` starts with `import 'server-only'` and exposes `sendTelegramMessage(text)`
- [ ] **API-02**: `/lib/validations.ts` Zod schemas shared between client RHF and server routes (single source of truth) with `+998 XX XXX-XX-XX` phone regex
- [ ] **API-03**: `/lib/rateLimit.ts` in-memory rate limiter keyed by `X-Forwarded-For`, 5 req/min, returns 429
- [ ] **API-04**: `POST /api/appointment` validates and sends formatted HTML message to Telegram chat
- [ ] **API-05**: `POST /api/contact` same contract
- [ ] **API-06**: `POST /api/review` same contract with "PENDING MODERATION" prefix
- [ ] **API-07**: All three routes return `{ success: true }` on success or `{ error, fieldErrors }` on validation failure

### Animations

- [ ] **ANM-01**: `motion` (not framer-motion) installed; animated components marked `'use client'`
- [ ] **ANM-02**: Page transitions (fade + slide) via `<PageTransition>` wrapper
- [ ] **ANM-03**: Scroll reveals (`whileInView` + fadeInUp, staggered children) on sections; all honour `useReducedMotion`
- [ ] **ANM-04**: Ken Burns on hero images
- [ ] **ANM-05**: Cards: hover lift + glow; Buttons: scale on click
- [ ] **ANM-06**: Counters animate from 0 on scroll
- [ ] **ANM-07**: Smooth-scroll enabled globally
- [ ] **ANM-08**: Mobile menu slide + backdrop blur

### SEO

- [ ] **SEO-01**: `generateMetadata` on every page returns unique title + description + OG + Twitter per locale
- [ ] **SEO-02**: `alternates.languages` on every page includes `ru`, `uz`, `en`, and `x-default` (→ RU), with self-reference
- [ ] **SEO-03**: JSON-LD rendered on every page via shared `<JsonLd>` component with `<` escaped to `\u003c`
- [ ] **SEO-04**: Root/locale layout emits `MedicalOrganization` + `LocalBusiness`; each page type emits its specific schema + `BreadcrumbList`
- [ ] **SEO-05**: `app/sitemap.ts` generates multilingual sitemap with `alternates.languages` per URL (no `next-sitemap`)
- [ ] **SEO-06**: `app/robots.ts` allows indexing and points to sitemap
- [ ] **SEO-07**: `schema-dts` used for all JSON-LD types (type safety)
- [ ] **SEO-08**: Semantic HTML (header/nav/main/article/section/aside/footer); one H1 per page; proper H2-H6
- [ ] **SEO-09**: All images use `next/image` with explicit width/height and localized alt text
- [ ] **SEO-10**: SEO-friendly slug-based URLs

### Performance & Responsive

- [ ] **PRF-01**: Lighthouse ≥ 90 across Performance, Accessibility, Best Practices, SEO on `/ru`
- [ ] **PRF-02**: Core Web Vitals targets met on mid-tier mobile throttle: LCP < 2.5s, CLS < 0.1, FID/INP within good thresholds
- [ ] **PRF-03**: Responsive across 320, 768, 1024, 1440+ breakpoints; tested at 360px (Galaxy A)
- [ ] **PRF-04**: `backdrop-filter` applied only to Header + visible cards (not off-screen or stacked); solid-fallback when `prefers-reduced-motion`
- [ ] **PRF-05**: Lazy-loading enabled for below-the-fold images and Yandex Maps iframe
- [ ] **PRF-06**: Compression enabled (default Vercel output)

### Analytics

- [x] **ANA-01**: GA4 integrated via `@next/third-parties` `<GoogleTagManager>` (or `<GoogleAnalytics>`) non-blocking
- [x] **ANA-02**: Yandex Metrika initialised via `instrumentation-client.ts`, non-blocking

### Delivery

- [ ] **DEL-01**: `README.md` with setup steps, env vars, and Vercel deploy guide
- [x] **DEL-02**: `.env.example` with all expected keys (no secrets)
- [ ] **DEL-03**: Project builds (`npm run build`) with no errors on Node 20.9+

## v2 Requirements (Deferred)

### Advanced Booking

- **V2-BOOK-01**: Insurance partnerships list
- **V2-BOOK-02**: Checkup package price calculator
- **V2-BOOK-03**: Real-time doctor availability calendar

### Content & Community

- **V2-CONT-01**: Before/after gallery tab (if aesthetics services added)
- **V2-CONT-02**: Newsletter signup
- **V2-CONT-03**: Patient portal / login system

### Integrations

- **V2-INT-01**: Telemedicine / video consultation CTA
- **V2-INT-02**: Online payment gateway (Click / Payme / Visa)
- **V2-INT-03**: SMS OTP phone verification

## Out of Scope (v1)

| Feature | Reason |
|---------|--------|
| Headless CMS / admin panel | TZ mandates static TS data files; adding CMS = rewrite |
| Patient database / PII storage | UZ Personal Data Law (ZRU-547) liability; Telegram-only delivery is zero-liability |
| Google Maps embed | Yandex Maps is dominant in UZ; Google coverage unreliable outside central Tashkent |
| Live chat widget (JivoSite/Intercom) | Adds ~200-500ms LCP penalty, kills Lighthouse 90+ target; requires staffing |
| Video posts on news | Storage/bandwidth; defer to v2+ |
| OAuth login / auth system | No business case for marketing site; security liability |
| Automated test suite | TZ excludes; prioritize delivery |
| Native mobile apps | Web-first; responsive handles mobile |
| `framer-motion` | Renamed to `motion`; install that |
| `next-sitemap` | Native `app/sitemap.ts` used; next-sitemap would overwrite it |
| Locale-specific slugs | Triples `generateStaticParams`; zero SEO benefit over hreflang |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FND-01 | Phase 1 | Complete |
| FND-02 | Phase 1 | Complete |
| FND-03 | Phase 1 | Complete |
| FND-04 | Phase 1 | Complete |
| FND-05 | Phase 1 | Complete |
| FND-06 | Phase 1 | Complete |
| I18N-01 | Phase 1 | Complete |
| I18N-02 | Phase 1 | Complete |
| I18N-03 | Phase 1 | Complete |
| I18N-04 | Phase 1 | Complete |
| I18N-05 | Phase 1 | Complete |
| I18N-06 | Phase 1 | Complete |
| ANA-01 | Phase 1 | Complete |
| ANA-02 | Phase 1 | Complete |
| DEL-02 | Phase 1 | Complete |
| DS-01 | Phase 2 | Pending |
| DS-02 | Phase 2 | Pending |
| DS-03 | Phase 2 | Pending |
| DS-04 | Phase 2 | Pending |
| DS-05 | Phase 2 | Pending |
| DS-06 | Phase 2 | Pending |
| DS-07 | Phase 2 | Pending |
| DS-08 | Phase 2 | Pending |
| DS-09 | Phase 2 | Pending |
| LAY-01 | Phase 2 | Pending |
| LAY-02 | Phase 2 | Pending |
| LAY-03 | Phase 2 | Pending |
| LAY-04 | Phase 2 | Pending |
| LAY-06 | Phase 2 | Pending |
| LAY-07 | Phase 2 | Pending |
| LAY-08 | Phase 2 | Pending |
| LAY-09 | Phase 2 | Pending |
| LAY-10 | Phase 2 | Pending |
| ANM-01 | Phase 2 | Pending |
| ANM-08 | Phase 2 | Pending |
| SRV-01 | Phase 3 | Pending |
| SRV-02 | Phase 3 | Pending |
| DOC-01 | Phase 3 | Pending |
| DOC-02 | Phase 3 | Pending |
| NWS-01 | Phase 3 | Pending |
| NWS-02 | Phase 3 | Pending |
| RVW-01 | Phase 3 | Pending |
| RVW-02 | Phase 3 | Pending |
| HOME-09 | Phase 3 | Pending |
| API-01 | Phase 3 | Pending |
| API-02 | Phase 3 | Pending |
| API-03 | Phase 3 | Pending |
| API-04 | Phase 3 | Pending |
| API-05 | Phase 3 | Pending |
| API-06 | Phase 3 | Pending |
| API-07 | Phase 3 | Pending |
| LAY-05 | Phase 3 | Pending |
| HOME-01 | Phase 4 | Pending |
| HOME-02 | Phase 4 | Pending |
| HOME-03 | Phase 4 | Pending |
| HOME-04 | Phase 4 | Pending |
| HOME-05 | Phase 4 | Pending |
| HOME-06 | Phase 4 | Pending |
| HOME-07 | Phase 4 | Pending |
| HOME-08 | Phase 4 | Pending |
| HOME-10 | Phase 4 | Pending |
| HOME-11 | Phase 4 | Pending |
| SRV-03 | Phase 4 | Pending |
| SRV-04 | Phase 4 | Pending |
| SRV-05 | Phase 4 | Pending |
| SRV-06 | Phase 4 | Pending |
| DOC-03 | Phase 4 | Pending |
| DOC-04 | Phase 4 | Pending |
| DOC-05 | Phase 4 | Pending |
| DOC-06 | Phase 4 | Pending |
| NWS-03 | Phase 4 | Pending |
| NWS-04 | Phase 4 | Pending |
| NWS-05 | Phase 4 | Pending |
| NWS-06 | Phase 4 | Pending |
| RVW-03 | Phase 4 | Pending |
| RVW-04 | Phase 4 | Pending |
| RVW-05 | Phase 4 | Pending |
| GAL-01 | Phase 4 | Pending |
| GAL-02 | Phase 4 | Pending |
| GAL-03 | Phase 4 | Pending |
| CNT-01 | Phase 4 | Pending |
| CNT-02 | Phase 4 | Pending |
| CNT-03 | Phase 4 | Pending |
| CNT-04 | Phase 4 | Pending |
| CNT-05 | Phase 4 | Pending |
| LAY-11 | Phase 4 | Pending |
| PRF-03 | Phase 4 | Pending |
| PRF-05 | Phase 4 | Pending |
| SEO-08 | Phase 4 | Pending |
| SEO-09 | Phase 4 | Pending |
| SEO-10 | Phase 4 | Pending |
| ANM-02 | Phase 5 | Pending |
| ANM-03 | Phase 5 | Pending |
| ANM-04 | Phase 5 | Pending |
| ANM-05 | Phase 5 | Pending |
| ANM-06 | Phase 5 | Pending |
| ANM-07 | Phase 5 | Pending |
| SEO-01 | Phase 5 | Pending |
| SEO-02 | Phase 5 | Pending |
| SEO-03 | Phase 5 | Pending |
| SEO-04 | Phase 5 | Pending |
| SEO-05 | Phase 5 | Pending |
| SEO-06 | Phase 5 | Pending |
| SEO-07 | Phase 5 | Pending |
| PRF-01 | Phase 5 | Pending |
| PRF-02 | Phase 5 | Pending |
| PRF-04 | Phase 5 | Pending |
| PRF-06 | Phase 5 | Pending |
| DEL-01 | Phase 5 | Pending |
| DEL-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 110 total
- Mapped to phases: 110
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-15*
*Last updated: 2026-04-15 after roadmap creation*

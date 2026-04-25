# Roadmap: ShaxKlinika

## Overview

Five broad phases carry the project from an empty repo to a production-ready multilingual clinic site. Phase 1 lays the Next.js 16 / next-intl / analytics scaffold. Phase 2 builds the design system and all shared UI shells. Phase 3 populates every data layer and wires the API backbone (Telegram, rate-limiting, AppointmentModal). Phase 4 assembles every marketing page using what the earlier phases produced. Phase 5 completes animations, adds SEO machinery, audits performance, and ships. Each phase delivers something a human can open in a browser and verify.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & i18n Scaffold** - Next.js 16 project compiles, routes locale prefixes, loads fonts, and records analytics
- [ ] **Phase 2: Design System & Shared UI** - Glass design language and all shared layout/UI components exist and render correctly
- [ ] **Phase 3: Content Data Layer & API Backbone** - All translated content is in place and every API route delivers to Telegram
- [ ] **Phase 4: Marketing Pages** - Every public page is navigable, statically generated, and functionally complete
- [ ] **Phase 5: Animations, SEO & Ship** - Full animation polish, per-page SEO/JSON-LD, Core Web Vitals ≥ 90, README, production build passes

## Phase Details

### Phase 1: Foundation & i18n Scaffold
**Goal**: The project boots, enforces locale routing, loads the correct fonts, and initialises analytics — every subsequent phase builds on this scaffold without revisiting it
**Depends on**: Nothing (first phase)
**Requirements**: FND-01, FND-02, FND-03, FND-04, FND-05, FND-06, I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, I18N-06, ANA-01, ANA-02, DEL-02
**Success Criteria** (what must be TRUE):
  1. Running `npm install && npm run dev` starts the server with no TypeScript or compilation errors
  2. Visiting `http://localhost:3000/` redirects to `http://localhost:3000/ru` (default locale)
  3. Visiting `/uz` and `/en` renders pages with `<html lang="uz">` and `<html lang="en">` respectively; the language switcher in the Header navigates between them without losing the current path
  4. Inter and PT Sans fonts load with cyrillic subsets; no FOUT; `display: swap` visible in page source
  5. GA4 and Yandex Metrika script tags are present in the rendered HTML and do not block LCP (deferred/non-blocking)
**Plans**: 1 plan
Plans:
- [x] 01-01-PLAN.md — Full Phase 1 scaffold: dependencies, next.config.ts, proxy.ts, i18n config, root + locale layouts, fonts, analytics, message skeletons, language switcher
**UI hint**: no

### Phase 2: Design System & Shared UI
**Goal**: Every visual primitive and shared layout shell exists — the glass utility, tokens, shadcn components, Header, Footer, mobile menu, floating CTAs, modal shell, skeletons, cookie banner, 404, and scroll-to-top — so Phase 4 page work is purely assembly
**Depends on**: Phase 1
**Requirements**: DS-01, DS-02, DS-03, DS-04, DS-05, DS-06, DS-07, DS-08, DS-09, LAY-01, LAY-02, LAY-03, LAY-04, LAY-06, LAY-07, LAY-08, LAY-09, LAY-10, LAY-11, ANM-01, ANM-08
**Success Criteria** (what must be TRUE):
  1. A `/ru` page rendered in Chrome shows glass cards with visible backdrop-blur; toggling `prefers-reduced-motion: reduce` in DevTools switches them to solid `rgba(255,255,255,0.9)` with no blur
  2. Body text (`#1F2937`) on a glass surface passes WCAG AA contrast check (≥ 4.5:1) in an accessibility tool
  3. The sticky Header is visible on scroll, contains the logo, navigation links, language switcher, and a "Запись" CTA button; the mobile menu slides in from the right on viewports < 768 px
  4. The Footer renders with logo, quick links, contacts, social icons, and copyright; floating WhatsApp and Telegram buttons appear bottom-right; the mobile-only booking FAB is visible on a 375 px viewport
  5. Navigating to a non-existent path (e.g. `/ru/does-not-exist`) shows the localised 404 page with a back-navigation link; the cookie consent banner appears on first visit and does not reappear after acceptance
**Plans**: TBD
**UI hint**: yes

### Phase 3: Content Data Layer & API Backbone
**Goal**: All static data files and fully-translated message JSONs are complete (no Lorem Ipsum, no English on RU/UZ pages), the three API routes accept valid submissions and deliver formatted messages to a real Telegram chat, and the AppointmentModal is wired to the provider so any section can open it
**Depends on**: Phase 2
**Requirements**: SRV-01, SRV-02, DOC-01, DOC-02, NWS-01, NWS-02, RVW-01, RVW-02, HOME-09, API-01, API-02, API-03, API-04, API-05, API-06, API-07, LAY-05
**Success Criteria** (what must be TRUE):
  1. `/lib/data/services.ts` exports 25+ services; `/lib/data/doctors.ts` exports 15 doctors; `/lib/data/news.ts` exports 12 articles; `/lib/data/reviews.ts` exports 20 reviews — all with correct TypeScript types and no compile errors
  2. `/messages/ru.json`, `/messages/uz.json`, and `/messages/en.json` each contain full translated copy for every service description, doctor bio, article body, review text, and FAQ — confirmed by opening each file and finding zero occurrences of "Lorem" or untranslated English strings on RU/UZ keys
  3. Submitting the Appointment modal with valid data (name, phone matching `+998 XX XXX-XX-XX`, service, date) delivers a formatted HTML message to the configured Telegram chat and the form shows a success state
  4. Sending more than 5 requests per minute to `/api/appointment` from the same IP returns HTTP 429
  5. Submitting invalid data (empty name, malformed phone) to any of the three API routes returns HTTP 422 with a `fieldErrors` object matching the Zod schema
**Plans**: 2 plans
Plans:
- [ ] 03-01-PLAN.md — Content & data foundation: lib/data/content.ts (types + 25+ services / 15 doctors / 12 news / 20 reviews / 13 categories / 10-12 departments) + RU/UZ/EN translations for all 4 content domains + FAQ + appointment + form.errors namespaces
- [ ] 03-02-PLAN.md — Telegram backbone, 3 POST API routes (appointment / contact / review with Zod validation + 5/min rate limit), AppointmentForm (RHF + zodResolver, 4-state machine per UI-SPEC), modal body wire-up
**UI hint**: yes

### Phase 4: Marketing Pages
**Goal**: Every public route is navigable, statically generated across all three locales, and functionally complete — visitors can browse services, read doctor profiles, explore news, submit reviews, view the gallery with lightbox, and reach the clinic via the contact page
**Depends on**: Phase 3
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08, HOME-10, HOME-11, SRV-03, SRV-04, SRV-05, SRV-06, DOC-03, DOC-04, DOC-05, DOC-06, NWS-03, NWS-04, NWS-05, NWS-06, RVW-03, RVW-04, RVW-05, GAL-01, GAL-02, GAL-03, CNT-01, CNT-02, CNT-03, CNT-04, CNT-05, LAY-11, PRF-03, PRF-05, SEO-08, SEO-09, SEO-10
**Success Criteria** (what must be TRUE):
  1. The Home page at `/ru` displays the Swiper hero slider (4 slides, no hydration mismatch visible), the about section, six "why choose us" glass cards, 8 popular service cards, animated stats, 6 doctor cards, 3 news cards, a reviews slider, the FAQ accordion, and the final CTA — all in Russian; the same page at `/uz` and `/en` shows the same sections in the respective language with no English fragments
  2. `/ru/services` lists all 25+ services grouped by category with a working category filter; clicking any service card navigates to `/ru/services/[slug]` which shows the name, description, duration, UZS price range, and a "Записаться" CTA that opens the Appointment modal pre-filled with that service
  3. `/ru/doctors` lists all 15 doctors with a working department filter; each doctor detail page shows the photo, credentials, bio, working hours, and a booking CTA; `/ru/news` paginates 12 articles at 6 per page; each article detail page shows title, date, cover image, full body, author, and 3 related articles
  4. `/ru/gallery` displays four tabs (Клиника / Оборудование / Команда / Мероприятия) with masonry images; clicking an image opens the lightbox with keyboard navigation; `/ru/reviews` displays all 20 review cards with star ratings and a submission form that shows "на модерации" after submit
  5. `/ru/contact` displays address, two phones (one prominently marked 24/7), working hours, the embedded Yandex Maps iframe, a functional contact form, and four social links; all pages use semantic HTML with one H1 per page and `next/image` on every image
**Plans**: TBD
**UI hint**: yes

### Phase 5: Animations, SEO & Ship
**Goal**: Scroll-reveal and page-transition animations are applied globally, every page emits correct per-locale metadata and JSON-LD, the sitemap and robots.txt are present, and the production build passes Lighthouse ≥ 90 across all four categories — the site is ready to deploy on Vercel
**Depends on**: Phase 4
**Requirements**: ANM-02, ANM-03, ANM-04, ANM-05, ANM-06, ANM-07, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, PRF-01, PRF-02, PRF-04, PRF-06, DEL-01, DEL-03
**Success Criteria** (what must be TRUE):
  1. Navigating between pages shows a smooth fade+slide transition; sections on every page fade in on scroll; hero images exhibit the Ken Burns zoom/pan effect; card hover shows lift and glow; the stats counter animates from 0 when scrolled into view — all with no animation when `prefers-reduced-motion: reduce` is enabled
  2. Inspecting the `<head>` of `/ru`, `/ru/services/[slug]`, `/ru/doctors/[slug]`, `/ru/news/[slug]`, `/ru/reviews`, `/ru/contact` shows unique `<title>`, `<meta name="description">`, `<meta property="og:*">`, and `<link rel="alternate" hreflang="...">` tags for all three locales plus `x-default`
  3. Each page type contains the correct JSON-LD block in a `<script type="application/ld+json">` tag: MedicalOrganization+LocalBusiness on the root layout, MedicalProcedure on service detail, Physician on doctor detail, NewsArticle on news detail, AggregateRating+Review on reviews, LocalBusiness+BreadcrumbList on contact — and no unescaped `<` characters appear inside any JSON-LD block
  4. `https://[site-url]/sitemap.xml` returns a valid XML sitemap listing all locale variants of every route with `<xhtml:link rel="alternate" hreflang="...">` entries; `https://[site-url]/robots.txt` allows all crawlers and references the sitemap URL
  5. Running Lighthouse (mobile, throttled) on `/ru` scores ≥ 90 in Performance, Accessibility, Best Practices, and SEO; Core Web Vitals report shows LCP < 2.5 s, CLS < 0.1; `npm run build` completes with zero errors on Node 20.9+
**Plans**: TBD
**UI hint**: no

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & i18n Scaffold | 0/1 | Not started | - |
| 2. Design System & Shared UI | 0/TBD | Not started | - |
| 3. Content Data Layer & API Backbone | 0/2 | Not started | - |
| 4. Marketing Pages | 0/TBD | Not started | - |
| 5. Animations, SEO & Ship | 0/TBD | Not started | - |

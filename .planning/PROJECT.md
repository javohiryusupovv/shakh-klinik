# ShaxKlinika — Multi-language Medical Clinic Website

## What This Is

ShaxKlinika is a production-ready, multilingual (RU/UZ/EN) marketing website for a modern private medical clinic in Uzbekistan. It showcases services, doctors, news, and patient reviews with a premium "liquid glass" UI, full SEO optimization, and appointment booking that routes to Telegram. RU is the default locale; all content is realistic (no Lorem Ipsum).

## Core Value

Convert visitors into booked appointments by presenting the clinic as trustworthy, modern, and accessible — in the visitor's own language, on any device, and with content that ranks on search engines.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Next.js 14 (App Router) + TypeScript scaffold with TailwindCSS, Framer Motion, shadcn/ui
- [ ] next-intl i18n with RU (default), UZ, EN locales; URL-prefixed routes; full content translation
- [ ] Liquid glass design system (colors, typography, `.glass` utility, rounded cards, blob backgrounds)
- [ ] Home page: hero Swiper slider, about, why-choose-us, popular services, animated stats counter, doctors slider, news cards, reviews slider, CTA
- [ ] Services page + detail pages: 25+ realistic services across 13 categories, filter by category, UZS pricing
- [ ] Doctors page + detail pages: 15 realistic Uzbek/Russian-named doctor profiles, filter by department, booking CTA
- [ ] News page + detail pages: 12 realistic articles with categories, pagination, related news
- [ ] Reviews page: 20 realistic reviews, slider on home, submission form with pending moderation
- [ ] Gallery page: tabbed (Clinic/Equipment/Team/Events), masonry, lightbox, lazy loading
- [ ] Contact page: address, phones, embedded Yandex Map, contact form → Telegram bot, social links
- [ ] Layout/shared components: sticky glass Header, Footer, Mobile menu, floating WhatsApp/Telegram + booking CTA, Appointment modal, 404, cookie consent, scroll-to-top, loading skeletons
- [ ] Framer Motion animations: page transitions, scroll reveals, Ken Burns hero, card hover, counter animations, mobile menu slide
- [ ] SEO: per-locale metadata, OG/Twitter, JSON-LD (MedicalOrganization, Physician, MedicalProcedure, Article, Review, BreadcrumbList, LocalBusiness), multilingual sitemap with hreflang, robots.txt, canonical URLs, semantic HTML
- [ ] Core Web Vitals targets (LCP <2.5s, CLS <0.1, FID <100ms) and Lighthouse 90+
- [ ] Responsive design across 320px → 1440px+ with mobile-first approach
- [ ] Appointment + contact + review API routes; Telegram bot integration via env vars
- [ ] README with setup, env vars, Vercel deploy guide

### Out of Scope

- Real CMS backend — content is static TS data files; no admin panel
- User authentication / patient portal — public marketing site only
- Real-time chat / video consultation — out of v1 scope
- E-commerce / online payment — appointments route to Telegram, not a payment gateway
- Native mobile apps — responsive web only
- Automated tests — TZ does not require a test suite; prioritize delivery

## Context

- **Greenfield project**: empty repo aside from TZ.md and CLAUDE.md/AGENTS.md. Git just initialized.
- **Target market**: Uzbekistan; Russian-speaking default audience with UZ/EN fallbacks.
- **Content strategy**: all copy (services, doctors, news, reviews) must be generated realistically and translated to all 3 languages — critical differentiator from demo templates.
- **Visual identity**: "liquid glass" aesthetic — translucent, backdrop-blurred surfaces on a white/light-blue gradient; mint accent. Must feel premium, not template-y.
- **Imagery**: Unsplash placeholder URLs (`source.unsplash.com`) for all images during v1.
- **Deployment target**: Vercel, runnable via `npm install && npm run dev`.
- **AGENTS.md warns**: this Next.js version has breaking changes — consult `node_modules/next/dist/docs/` before writing code.

## Constraints

- **Tech stack**: Next.js 14 App Router, TypeScript, TailwindCSS, Framer Motion, next-intl, Swiper, shadcn/ui, React Hook Form + Zod, next-sitemap, Lucide icons — fixed by TZ.
- **i18n**: next-intl with ru/uz/en; RU is default; all content translated; hreflang on every page.
- **Performance**: Core Web Vitals (LCP<2.5s, CLS<0.1, FID<100ms), Lighthouse 90+.
- **Content authenticity**: no placeholder/Lorem text; medically accurate, professionally worded, localized names and pricing (UZS).
- **Booking flow**: submissions deliver to Telegram via `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`; no database.
- **File structure**: follows TZ-specified layout (`/app/[locale]/...`, `/components/{ui,sections,layout,shared}`, `/lib/data`, `/messages`).
- **Versioned API**: Next.js breaking changes — follow official docs bundled in node_modules.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Coarse phase granularity | TZ is cohesive; fewer broad phases reduce overhead | — Pending |
| Sequential plan execution | Many plans share the design system/i18n scaffold; safer to serialize | — Pending |
| YOLO auto-advance | Auto-approved workflow to move fast through a well-specified TZ | — Pending |
| Balanced model profile | Sonnet across agents — adequate for a content-heavy marketing site | — Pending |
| Static TS data files (no CMS) | TZ specifies; avoids backend complexity for v1 | — Pending |
| Telegram-only submissions (no DB) | TZ specifies; fastest path to functional booking | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-15 after initialization*

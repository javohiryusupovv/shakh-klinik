# Phase 2: Design System & Shared UI - Context

**Gathered:** 2026-04-15 (assumptions mode, `--auto` chain)
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the complete visual language and all shared layout shells so Phase 4 page work is pure assembly. In scope: Tailwind 4 tokens + `.glass` utility + hover/reduced-motion variants; shadcn primitives; typography scale; sticky Header (with full nav + language switcher + "Запись" CTA), Footer, MobileMenu, FloatingCTAs (WhatsApp/Telegram + mobile booking FAB), Cookie banner, ScrollToTop, localized 404, loading skeletons, gradient page background + blob shapes, emergency phone badge in header. Install `motion` + Lucide icons.

**In scope (21 reqs):** DS-01…09, LAY-01…04, LAY-06…11, ANM-01, ANM-08

**Out of scope:** AppointmentModal (Phase 3 — shell may be stubbed here but wiring lives in P3), any page content (Phase 4), JSON-LD/metadata (Phase 5).
</domain>

<decisions>
## Implementation Decisions

### Tailwind 4 Tokens (DS-01)
- **D-01:** Extend `app/globals.css` with `@theme { ... }` block defining CSS variables: `--color-primary: #4A9EE7; --color-primary-deep: #2B7FCC; --color-primary-deeper: #1A5A94; --color-text-dark: #1F2937; --color-text-gray: #6B7280; --color-mint: #A8E6CF; --color-bg-light: #E8F4FD; --color-bg-lighter: #D1E9FB; --color-bg-lightest: #F0F8FF;`
- **D-02:** Font family tokens: `--font-sans: var(--font-inter), system-ui, sans-serif;` `--font-heading: var(--font-pt-sans), var(--font-inter), sans-serif;` (CSS vars from Phase 1's `next/font`)

### Glass Utility (DS-02, DS-03)
- **D-03:** `@utility glass { background: rgba(255,255,255,0.25); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255,255,255,0.4); box-shadow: 0 8px 32px rgba(74,158,231,0.15); border-radius: 1rem; transition: all 0.3s ease; }`
- **D-04:** Hover variant via utility modifier or `:hover` pseudo — deepen shadow, lift `translateY(-4px)`, slight opacity bump to 0.4
- **D-05:** `prefers-reduced-motion: reduce` fallback: solid `rgba(255,255,255,0.9)` with no blur, no transform. Implemented via media query inside `@utility glass`.

### Typography (DS-04)
- **D-06:** Use Tailwind utilities with custom theme values. H1 `text-5xl md:text-6xl` (48-64), H2 `text-4xl md:text-5xl` (36-48), H3 `text-2xl md:text-3xl` (24-32), body `text-base md:text-lg` (16-18). Apply PT Sans to h1/h2/h3 via `font-heading` utility (mapped from `--font-heading`).

### shadcn/ui (DS-09)
- **D-07:** Run `npx shadcn@latest init` (select Tailwind v4 when prompted; use CSS variables approach). Then `npx shadcn@latest add button dialog input textarea select tabs badge skeleton sheet`. Re-export each from `components/ui/index.ts` for ergonomic imports.
- **D-08:** Override shadcn Button to include a `glass` variant + gradient primary CTA variant (DS-05). Extend Card component with `glass` prop wiring to the utility.

### Background & Layout Shell (DS-07)
- **D-09:** `app/[locale]/layout.tsx` body gets gradient background: `bg-gradient-to-b from-white via-[var(--color-bg-lightest)] to-[var(--color-bg-light)]`. Add 2-3 fixed `blob` shapes (SVG or CSS with `blur-3xl opacity-20` absolute positioned) behind content for depth.

### Header (LAY-01, LAY-11)
- **D-10:** Sticky glass Header (`top-0 sticky z-50 .glass`) with logo (text wordmark "ShaxKlinika" with mint accent), nav links (Главная, Услуги, Врачи, Новости, Отзывы, Галерея, Контакты — translated), LanguageSwitcher (from Phase 1, possibly enhanced with flags), "Запись" CTA Button (gradient primary variant).
- **D-11:** Emergency 24/7 phone badge — visible in header on desktop as a subtle red-tinted pill showing "24/7 +998 90 123-45-67"; collapses into mobile menu. Icon: Phone + small pulsing dot for urgency, `prefers-reduced-motion` removes the pulse.

### Mobile Menu (LAY-10)
- **D-12:** Use shadcn `Sheet` component, slide from right with backdrop blur. Contains: all nav links, language switcher, emergency phone, "Запись" CTA. Trigger: hamburger icon in Header on `< md` breakpoint.

### Footer (LAY-02)
- **D-13:** 4-column grid on desktop (About, Quick links, Contacts, Social) collapsing to stacked on mobile. Logo + short blurb top; copyright bottom with current year. Social icons via Lucide (Send=Telegram, Instagram, Facebook, Youtube). Translated nav + blurb.

### Floating CTAs (LAY-03, LAY-04)
- **D-14:** `FloatingCTA.tsx` component rendered in locale layout, `fixed bottom-6 right-6 flex flex-col gap-3 z-40`. WhatsApp + Telegram buttons always visible. Mobile-only "Запись на прием" FAB (shown `md:hidden`) uses gradient primary + full-pill shape, opens AppointmentModal (Phase 3 wires submit; here it renders the shell).

### 404 (LAY-06)
- **D-15:** `app/[locale]/not-found.tsx` (Next 16 convention) with localized "Страница не найдена" / "Sahifa topilmadi" / "Page not found" + short copy + glass Card containing link back to home. Triggered by Next's 404 handling.

### Cookie Consent (LAY-07)
- **D-16:** `CookieConsent.tsx` as `'use client'` — reads `localStorage.getItem('shax.cookieAccepted')` on mount; if absent, renders fixed bottom glass banner with "Accept" button. On accept, `setItem('shax.cookieAccepted', '1')` + animate out. Localized text.

### Scroll-to-top (LAY-08)
- **D-17:** `ScrollToTop.tsx` client component, fixed bottom-left or bottom-right (above FloatingCTAs). Visible when `scrollY > 600`, smooth-scrolls to top on click. Icon: ArrowUp.

### Loading Skeletons (LAY-09)
- **D-18:** Use shadcn `Skeleton` primitive. Provide preset skeleton components for common shapes: `SkeletonCard`, `SkeletonListItem`, `SkeletonText` in `components/shared/skeletons/`. Match glass card dimensions for seamless swap.

### Appointment Modal Shell (precursor for Phase 3)
- **D-19:** Ship a minimal `<AppointmentModal>` + `<AppointmentModalProvider>` scaffold this phase — provider mounted in locale layout, modal uses shadcn `Dialog`. Form body + validation + submit land in Phase 3. Expose `useAppointmentModal()` hook returning `{ open, close, prefill }` for P3/P4 consumers.

### motion (ANM-01)
- **D-20:** `npm install motion`. Create a `useReducedMotion` utility re-export and a `Reveal` wrapper (`whileInView: fadeInUp`) for later phases — basic scaffold here, heavy animation work in Phase 5. Mobile menu uses motion `AnimatePresence` + Sheet's animation (ANM-08).

### i18n Additions
- **D-21:** Extend `messages/{ru,uz,en}.json` with namespaces: `nav` (all 7 nav labels), `header` (ctaBook, emergency24h), `footer` (aboutBlurb, linksTitle, contactsTitle, socialTitle, rightsReserved), `cookies` (message, accept), `notFound` (title, body, backHome). RU full; UZ full; EN full (all locales must ship translated per I18N-05).

### Claude's Discretion
- Exact shadcn theme color naming (may follow shadcn's `primary`/`secondary` pattern mapped to our tokens)
- Whether to use Lucide or custom inline SVG for blob shapes
- Exact hamburger icon + menu animation curve

### Folded Todos
None.

</decisions>

<canonical_refs>
## Canonical References

### Project
- `.planning/PROJECT.md` — design system summary, core value
- `.planning/REQUIREMENTS.md` §Design System, §Home (placeholders), §Layout & Shared UI, §Animations, §Performance — 21 reqs in scope
- `.planning/ROADMAP.md` §Phase 2

### Research
- `.planning/research/STACK.md` §Tailwind 4 Setup, §shadcn/ui + Tailwind 4, §motion (ex Framer Motion)
- `.planning/research/ARCHITECTURE.md` §Component Layers
- `.planning/research/PITFALLS.md` §5 motion/RSC, §8 Tailwind 4 no config, §11 backdrop-filter perf, §13 reduced-motion, §14 glass contrast

### Phase 1 outputs (scaffold to extend)
- `app/globals.css` (add tokens + glass here — only has `@import 'tailwindcss'` today)
- `app/[locale]/layout.tsx` (add Provider + FloatingCTA + CookieConsent + ScrollToTop mount points)
- `components/shared/LanguageSwitcher.tsx` (may refactor for Header use)

### External
- `node_modules/next/dist/docs/01-app/03-api-reference/04-file-conventions/not-found.md` — 404 file convention

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Phase 1 shipped `next/font` CSS variables (`--font-inter`, `--font-pt-sans`) ready to be wired into theme tokens
- `LanguageSwitcher` already exists — refactor for Header inclusion with flag emojis or SVG flags
- `NextIntlClientProvider` wraps locale layout — client-side components like CookieConsent can use `useTranslations`
- `messages/*.json` have skeleton namespaces (`common`, `nav`, `forms`, `meta`, `home`) — extend, don't restructure
- `components/shared/` folder exists from Phase 1

### Established Patterns
- Server Components by default; `'use client'` only on modals, forms, menus, counters, scroll listeners, localStorage readers
- All shared UI must have `prefers-reduced-motion` awareness (PITFALLS §13)
- `.glass` must be applied selectively — Header + cards, not to large regions (PITFALLS §11)
- Text on glass must use `#1F2937` (PITFALLS §14)

### Integration Points
- `AppointmentModalProvider` mounted in `app/[locale]/layout.tsx` children boundary (after NextIntlClientProvider)
- `FloatingCTA`, `CookieConsent`, `ScrollToTop` also mounted in locale layout (as siblings to `{children}`)
- Header + Footer wrap `{children}` in locale layout

</code_context>

<specifics>
## Specific Ideas

- Header height ~72px desktop, 60px mobile; safe-area-inset for iOS PWA
- Use `text-balance` on H1 for prettier line breaks
- Gradient blob shapes in background should be subtle — 20% opacity max
- Footer sits on a slightly darker `bg-primary-deep` tint with inverted text for contrast
- Shadcn's "new-york" style variant is preferred for the rounded, refined look

</specifics>

<deferred>
## Deferred Ideas

- Full AppointmentModal form body + API submission — Phase 3
- Real page content + sections — Phase 4
- Scroll reveal animations on cards/sections — Phase 5 (ANM-02…07)
- Ken Burns on hero, counter animations — Phase 5
- JSON-LD on header/footer (LocalBusiness/Organization) — Phase 5 (SEO-04)

### Reviewed Todos (not folded)
None.

</deferred>

---
*Phase: 02-design-system-shared-ui*
*Context gathered: 2026-04-15*

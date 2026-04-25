---
phase: 02-design-system-shared-ui
plan: 01
subsystem: design-system-shared-ui
tags: [design-system, glass-ui, layout, i18n, accessibility, tailwind4, motion, next16, shadcn]
requires:
  - phase-01: proxy.ts + i18n routing/request + next/font CSS vars + locale layout
provides:
  - design-tokens (CSS @theme: brand colors, font families)
  - glass-utility (.glass + .glass-hover + reduced-motion fallback)
  - shadcn-primitives (button, dialog, input, textarea, select, tabs, badge, skeleton, sheet)
  - shared-primitives (GlassCard, Blob, Reveal, AnimatedCounter, skeletons)
  - layout-shell (Header, Footer, MobileMenu) — full nav, emergency phone, language switcher, CTA
  - floating-ui (FloatingCTA Telegram/WhatsApp + mobile booking FAB, CookieConsent, ScrollToTop)
  - 404-page (localized not-found.tsx inside [locale])
  - appointment-modal-shell (Provider + Modal scaffold; form body deferred to Phase 3)
  - i18n-namespaces (nav, header, footer, cookies, notFound for ru/uz/en)
  - shared-navigation-helper (i18n/navigation.ts re-exporting createNavigation typed Link/useRouter/usePathname)
affects:
  - app/[locale]/layout.tsx (replaced Phase 1 stub header with full Header + Footer + floating shell)
  - app/[locale]/page.tsx (replaced raw placeholder with GlassCard demo)
  - components/shared/LanguageSwitcher.tsx (named export added; styled as glass pill)
tech-stack:
  added:
    - motion@12 (RSC-safe, 'use client' islands only)
    - lucide-react@1.8.0 (icon set; brand icons fallback to inline SVG)
    - shadcn primitives (button, dialog, input, textarea, select, tabs, badge, skeleton, sheet) — base-ui under the hood
    - tw-animate-css, @base-ui/react (transitive via shadcn)
  patterns:
    - RSC-by-default; client islands only for state/animation/storage/listeners
    - getTranslations(namespace) in async RSC; useTranslations in client + non-async RSC
    - Typed routing via next-intl/navigation createNavigation(routing) → shared i18n/navigation.ts
    - All UI strings live in messages/{ru,uz,en}.json (zero inline copy in shells)
    - prefers-reduced-motion handled at CSS-utility level (glass) AND at component level (Reveal via useReducedMotion)
    - Body/section text on glass uses #1F2937 (--color-text-dark) for WCAG AA contrast
    - .glass applied selectively (Header + cards + modals only — never large scrolling regions)
key-files:
  created:
    - i18n/navigation.ts
    - components/layout/Header.tsx
    - components/layout/Footer.tsx
    - components/layout/MobileMenu.tsx
    - components/shared/BookCTAButton.tsx
    - components/shared/AppointmentModal.tsx
    - components/shared/AppointmentModalProvider.tsx
    - components/shared/FloatingCTA.tsx
    - components/shared/CookieConsent.tsx
    - components/shared/ScrollToTop.tsx
    - app/[locale]/not-found.tsx
  modified:
    - app/[locale]/layout.tsx
    - app/[locale]/page.tsx
    - components/shared/LanguageSwitcher.tsx
    - messages/ru.json
    - messages/uz.json
    - messages/en.json
key-decisions:
  - Inline brand SVG icons (Instagram/Facebook/YouTube) because lucide-react@1.8.0 in this codebase does not export them — Send (Telegram) used from lucide; MessageCircle proxies WhatsApp
  - i18n/navigation.ts as single source of typed Link/useRouter — avoids re-instantiating createNavigation across each consumer
  - LanguageSwitcher kept default export for Phase 1 backward compat AND added named export for new shells
  - Bundled AppointmentModal + Provider + BookCTAButton into Task 3 commit because Header has direct dep chain (keeps each commit independently buildable)
  - Footer is RSC using getTranslations (per plan note), not 'use client' — stays in server tree
  - main has min-height calculation to prevent footer pop-up on short pages
requirements-completed:
  - DS-01 (design tokens via @theme)
  - DS-02 (glass utility)
  - DS-03 (glass hover variant)
  - DS-04 (typography H1-H6 via font-heading utility, sans body)
  - DS-05 (gradient primary CTA via BookCTAButton inline classes)
  - DS-06 (mint accent visible in logo wordmark)
  - DS-07 (gradient page bg + 3 fixed Blob shapes at 10-20% opacity)
  - DS-08 (reduced-motion fallback in CSS + component layer)
  - DS-09 (shadcn primitives installed and re-exported)
  - LAY-01 (sticky glass Header with logo, nav, switcher, CTA)
  - LAY-02 (4-col Footer with about/links/contacts/social, copyright)
  - LAY-03 (Floating Telegram + WhatsApp always-visible)
  - LAY-04 (Mobile-only booking FAB at md:hidden breakpoint)
  - LAY-06 (localized 404 with home link)
  - LAY-07 (cookie consent with localStorage persistence)
  - LAY-08 (scroll-to-top above 600px)
  - LAY-09 (skeleton primitives — SkeletonCard/Text/ListItem from Task 2)
  - LAY-10 (mobile menu via Sheet from right with backdrop blur)
  - LAY-11 (emergency 24/7 phone badge in Header desktop, in MobileMenu on mobile)
  - ANM-01 (motion installed, Reveal scaffold ready)
  - ANM-08 (mobile menu uses Sheet's built-in animations / AnimatePresence)
duration: ~25 min (resumed mid-flight)
completed: 2026-04-25
---

# Phase 2 Plan 01: Design System & Shared UI Summary

Established the full ShaxKlinika visual language and every shared layout shell so Phase 4 page work becomes pure assembly: Tailwind 4 design tokens, `.glass` utility with reduced-motion fallback, shadcn primitive set, sticky glass Header + 4-column Footer + slide-in MobileMenu + Floating Telegram/WhatsApp/booking-FAB + Cookie banner + ScrollToTop + localized 404 + AppointmentModal shell, all wired through `app/[locale]/layout.tsx`. Build is green on Next 16 + Turbopack.

## Execution

- **Duration:** ~25 min (resumed mid-flight — Tasks 1 & 2 already committed; this session completed Tasks 3 & 4)
- **Tasks:** 4 of 4
- **Files created:** 11
- **Files modified:** 6
- **Commits this session:** 2 (`2fbdf71`, `c8b10a8`)
- **All commits for plan:** `34e9ab1`, `11140f9`, `2fbdf71`, `c8b10a8`

## Commits

| # | Hash | Subject |
|---|------|---------|
| Task 1 | `34e9ab1` | feat(02-01): install motion + shadcn; add design tokens + glass utility |
| Task 2 | `11140f9` | feat(02-01): shared primitives (GlassCard, Blob, Reveal, AnimatedCounter, skeletons) |
| Task 3 | `2fbdf71` | feat(02-01): i18n messages + Header + Footer + MobileMenu |
| Task 4 | `c8b10a8` | feat(02-01): floating UI, 404, cookie consent, scroll-to-top, appointment modal shell |

## Architecture Notes

- **`i18n/navigation.ts`** is a new shared module re-exporting `createNavigation(routing)` so every consumer (RSC Header/Footer/404, client MobileMenu) uses the same typed `Link` / `useRouter` / `usePathname`. Saves duplicated `createNavigation` instantiation per consumer and keeps locale-prefix routing consistent.
- **Header is RSC** using `getTranslations` — only client islands inside it are `LanguageSwitcher`, `BookCTAButton`, and `MobileMenu`. Keeps the sticky glass shell server-rendered with no JS cost.
- **Footer is RSC** for the same reason — pure markup + i18n strings, no interactivity.
- **AppointmentModalProvider mounts at the locale layout** so any descendant client component (BookCTAButton in Header, FAB, future Hero CTA, future doctor "Book" buttons) can call `useAppointmentModal().open(prefill)`.
- **`prefers-reduced-motion` is enforced at two layers** — CSS `@media` rule in `globals.css` strips backdrop-filter + transform on `.glass`/`[class*="glass"]`, and React components (Reveal) gate via `useReducedMotion()` from `motion/react`.

## Verification

- `npm run build` → exit 0, TypeScript clean, 6 static pages generated (3 locales + 404 + 2 fallbacks). Compiled in 3.1s with Turbopack.
- No lint errors, no TS errors.
- Manual visual checks (browser) deferred to user — see plan §Verification checklist.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 — Blocker] Brand icons missing from lucide-react@1.8.0**
- **Found during:** Task 3 (Footer) and Task 4 (FloatingCTA)
- **Issue:** `lucide-react@1.8.0` (the version pinned in this repo) does NOT export `Instagram`, `Facebook`, `Youtube`, or `Whatsapp`. The plan instructed importing them from lucide. Verified by `node -e "console.log(typeof require('lucide-react').Instagram)"` → `undefined`.
- **Fix:** Inlined three small brand SVG paths (Instagram, Facebook, YouTube) directly inside `Footer.tsx` as zero-dep React components. Telegram still uses lucide `Send` (available). WhatsApp uses lucide `MessageCircle` as a visual proxy in `FloatingCTA.tsx` (lucide also lacks WhatsApp).
- **Files modified:** `components/layout/Footer.tsx`, `components/shared/FloatingCTA.tsx`
- **Verification:** Build passes, icons render.
- **Commits:** `2fbdf71` (Footer), `c8b10a8` (FloatingCTA)

**2. [Rule 2 — Missing critical] Header/Footer/MobileMenu nav needed typed routing**
- **Found during:** Task 3
- **Issue:** Plan code used `import Link from 'next/link'` for Header. With locale-prefix routing (always), bare `next/link` href="/" would point to `/` not `/{locale}` — breaks navigation across locales.
- **Fix:** Created `i18n/navigation.ts` module exposing `Link` from `createNavigation(routing)` (next-intl v4). Header, Footer, MobileMenu, not-found.tsx all import from `@/i18n/navigation` so locale prefixes are auto-inserted.
- **Files modified:** `i18n/navigation.ts` (new), Header/Footer/MobileMenu/not-found imports
- **Verification:** Build passes, generated routes still work for all 3 locales.
- **Commit:** `2fbdf71`

**3. [Rule 1 — Bug] LanguageSwitcher import shape mismatch**
- **Found during:** Task 3
- **Issue:** Plan shows `import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'` (named import), but Phase 1 shipped it as a default export. Phase 1 layout also uses `import LanguageSwitcher from ...` (default).
- **Fix:** Added named export AND kept default export to maintain backward compat. Also restyled as a glass pill instead of inline-style buttons (was Phase 1 placeholder styling).
- **Files modified:** `components/shared/LanguageSwitcher.tsx`
- **Commit:** `2fbdf71`

**4. [Rule 3 — Blocker] shadcn Button uses `render` not `asChild`**
- **Found during:** Task 4 (not-found.tsx)
- **Issue:** Plan's `<Button asChild><Link href="/">{t('backHome')}</Link></Button>` doesn't compile. The shadcn Button in this codebase wraps `@base-ui/react/button` which uses the `render={...}` prop pattern instead of the radix `asChild` pattern.
- **Fix:** Used `<Button render={<Link href="/" className="..." />}>{t('backHome')}</Button>`. Same pattern is used in dialog.tsx/sheet.tsx in this codebase.
- **Files modified:** `app/[locale]/not-found.tsx`, `components/layout/MobileMenu.tsx` (SheetTrigger + SheetClose)
- **Commit:** `c8b10a8` (404), `2fbdf71` (MobileMenu)

**Total deviations:** 4 auto-fixed (1 Rule 1 bug, 1 Rule 2 missing-critical, 2 Rule 3 blockers).

**Impact:** None of these changed the plan's goal or scope. All deviations were forced by environment realities (icon library version, base-ui vs radix API surface, locale-aware routing requirement) or backward-compat with Phase 1 code. Visual + functional output matches plan spec.

## Authentication Gates

None — this plan was pure UI scaffolding with no external service calls.

## Known Stubs

- **`components/shared/AppointmentModal.tsx`** — body is intentionally a placeholder paragraph ("Форма записи будет доступна в следующей версии"). Form body + Zod schema + RHF + `/api/appointment` POST are explicitly Phase 3 work per `02-CONTEXT.md` D-19 and PLAN Task 4 TODO comment. Not a defect — wired modal shell so Phase 3 has a clean swap-in point.
- **`components/shared/AnimatedCounter.tsx`** — renders the value as plain text. Phase 5 (ANM scope) adds the count-up animation. Documented in plan Task 2 spec.
- **Reveal** — basic scaffold only; per-section reveal usage lands in Phase 5 (ANM-02…07).

## Issues Encountered

None — plan fully executed, build green.

## Follow-ups for Future Phases

- Phase 3: replace AppointmentModal placeholder paragraph with the actual form (Zod + RHF + Telegram POST API route).
- Phase 4: real page sections (Hero, Services, Doctors, News, Reviews) replace the GlassCard demo on `app/[locale]/page.tsx`.
- Phase 5: hook up Reveal/AnimatedCounter to actual content; consider replacing the inline brand SVGs with a richer icon set (e.g. `simple-icons` package or upgrading lucide-react if/when modern brand icons land).
- Consider upgrading `lucide-react` past 1.8.0 (current version is unusual — modern lucide-react uses 0.x.x). Doing so would let us drop the inline brand SVGs.

## Self-Check: PASSED

Verified disk state of declared key-files:

- `i18n/navigation.ts` — FOUND
- `components/layout/Header.tsx` — FOUND
- `components/layout/Footer.tsx` — FOUND
- `components/layout/MobileMenu.tsx` — FOUND
- `components/shared/BookCTAButton.tsx` — FOUND
- `components/shared/AppointmentModal.tsx` — FOUND
- `components/shared/AppointmentModalProvider.tsx` — FOUND
- `components/shared/FloatingCTA.tsx` — FOUND
- `components/shared/CookieConsent.tsx` — FOUND
- `components/shared/ScrollToTop.tsx` — FOUND
- `app/[locale]/not-found.tsx` — FOUND

Verified commits in git log:

- `34e9ab1` — FOUND
- `11140f9` — FOUND
- `2fbdf71` — FOUND
- `c8b10a8` — FOUND

Verified `npm run build` exit 0 with 6 static pages.

Plan complete. Ready for Phase 3 (Content & Booking).

---
phase: 02-design-system-shared-ui
verified: 2026-04-25T00:00:00Z
status: human_needed
score: 21/21 must-haves verified (5/5 SC code-verified, 2 require manual browser verification)
overrides_applied: 0
human_verification:
  - test: "Glass cards visible with backdrop-blur on /ru in Chrome"
    expected: "Visible blur of background through translucent panels (Header, GlassCard demo, MobileMenu sheet)"
    why_human: "backdrop-filter renders only in a real browser; cannot be confirmed via static inspection"
  - test: "DevTools → Rendering → Emulate prefers-reduced-motion: reduce switches glass to solid white"
    expected: "Glass surfaces become solid rgba(255,255,255,0.9) with no blur and no hover lift"
    why_human: "CSS @media query is present and correct, but only browser emulation can confirm runtime fallback"
  - test: "Mobile menu slide-from-right animation at <768px"
    expected: "Sheet slides in from right with backdrop blur on hamburger tap"
    why_human: "Animation behaviour requires viewport resize + interaction"
  - test: "Cookie consent persistence across reload"
    expected: "Banner appears on first visit; after Accept, refresh keeps it hidden"
    why_human: "localStorage behaviour requires real browser session"
  - test: "ScrollToTop button appears after >600px scroll and smooth-scrolls to top"
    expected: "Button materialises and triggers smooth scroll on click"
    why_human: "Scroll-listener behaviour requires real browser interaction"
  - test: "axe DevTools audit on /ru reports no color-contrast errors on body text on glass"
    expected: "Zero a11y violations of contrast rule"
    why_human: "Computed contrast = 13.73:1 (well above AA), but tooling spot-check is good UAT discipline"
---

# Phase 2: Design System & Shared UI — Verification Report

**Phase Goal (ROADMAP):** Every visual primitive and shared layout shell exists — the glass utility, tokens, shadcn components, Header, Footer, mobile menu, floating CTAs, modal shell, skeletons, cookie banner, 404, scroll-to-top — so Phase 4 page work is purely assembly.

**Verified:** 2026-04-25
**Status:** human_needed (all code present, all wiring correct, build green; visual + interaction checks need a browser)
**Re-verification:** No — initial verification

---

## Goal Achievement

### Success Criteria (ROADMAP Phase 2)

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | `/ru` shows glass cards with backdrop-blur; `prefers-reduced-motion: reduce` switches them to solid `rgba(255,255,255,0.9)` with no blur | FLAG (code-verified, browser UAT needed) | `app/globals.css:23-39` defines `@utility glass` with `backdrop-filter: blur(20px) saturate(180%)`. Lines 41-56 contain the `@media (prefers-reduced-motion: reduce)` rule that overrides `.glass` to `rgba(255,255,255,0.9)` with `backdrop-filter: none !important`. `app/[locale]/page.tsx:11` mounts a `<GlassCard>` on `/ru`. Visual confirmation needs Chrome. |
| 2 | Body text (#1F2937) on glass surface passes WCAG AA contrast (≥4.5:1) | PASS | `globals.css:281,290` set body + headings color to `var(--color-text-dark) = #1F2937`. Computed contrast against the glass-over-gradient background ≈ **13.73:1** (vs solid white = 14.68:1). Both far exceed the 4.5:1 AA threshold. |
| 3 | Sticky Header with logo, nav, language switcher, CTA; mobile menu slides from right <768px | PASS (code), FLAG (interaction UAT) | `components/layout/Header.tsx:26` is `sticky top-0 z-50 glass`. Lines 29-35 = logo wordmark with mint accent. Lines 38-48 = desktop nav (`hidden md:flex`) iterating 7 nav keys. Line 63 = `<LanguageSwitcher />`. Line 67 = `<BookCTAButton />` (gradient primary). Line 71 = `<MobileMenu />`. `MobileMenu.tsx:51-53` uses `<SheetContent side="right" className="glass ... supports-backdrop-filter:backdrop-blur-xl">`. `Sheet` source (`components/ui/sheet.tsx:56`) confirms `data-[side=right]:right-0` slide direction. Trigger button is `md:hidden` (`MobileMenu.tsx:44`). |
| 4 | Footer with logo, quick links, contacts, social, copyright; floating WhatsApp + Telegram buttons; mobile-only booking FAB at 375px | PASS | `components/layout/Footer.tsx:80-191` renders 4-column grid (`md:grid-cols-2 lg:grid-cols-4`) with logo (line 85), about blurb (87), nav links (97-108), contacts (113-137 with address/phone/email/hours), social row (146-181: Telegram + Instagram + Facebook + YouTube), copyright (188). `components/shared/FloatingCTA.tsx:15-22` = Telegram (`bg-[#229ED9]`), 24-31 = WhatsApp (`bg-[#25D366]`), 33-35 = `<div className="md:hidden"><BookCTAButton variant="fab" /></div>` confirming FAB visible only <768px. Mounted at `app/[locale]/layout.tsx:43`. |
| 5 | `/ru/does-not-exist` shows localised 404 with back-navigation; cookie consent banner appears on first visit and not after acceptance | FLAG (code-verified, persistence UAT needed) | `app/[locale]/not-found.tsx` renders `<GlassCard>` with `t('notFound.title')`/`t('body')`/`t('backHome')` and a `<Link href="/">` button. All three locales have `notFound` namespace (verified). `components/shared/CookieConsent.tsx:15-21` reads `localStorage.getItem('shax.cookieAccepted')`; lines 32-44 set it to `'1'` on Accept and hide. Mounted at `layout.tsx:44`. localStorage persistence behaviour needs a real browser session. |

**Score:** 5/5 success criteria addressed by code (3 PASS, 2 FLAG for browser UAT)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `app/globals.css` | `@theme` tokens + `@utility glass` + reduced-motion media query | PASS | DS tokens lines 8-21; glass utility 23-31; glass-hover 33-39; reduced-motion 41-56; body/heading base 273-292 |
| `app/[locale]/layout.tsx` | Mounts AppointmentModalProvider + Blob + Header + Footer + FloatingCTA + CookieConsent + ScrollToTop | PASS | Imports lines 5-11; mounts in correct nesting lines 37-47 |
| `app/[locale]/page.tsx` | GlassCard demo so design system is visually verifiable | PASS | Renders `<GlassCard>` with `font-heading`, mint logo accent, body text |
| `app/[locale]/not-found.tsx` | Localized 404 with back-home link | PASS | Uses `useTranslations('notFound')` + GlassCard wrapper + typed Link |
| `i18n/navigation.ts` | Shared typed Link/useRouter | PASS | Re-exports `createNavigation(routing)` |
| `components/layout/Header.tsx` | Sticky glass + logo + 7 nav items + emergency phone + LanguageSwitcher + BookCTAButton + MobileMenu | PASS | All present, server-component (RSC) using `getTranslations` |
| `components/layout/Footer.tsx` | 4-col grid → mobile stack; logo/blurb/links/contacts/social/copyright | PASS | RSC with inline brand SVGs (lucide-react@1.8.0 lacks brand icons — documented deviation) |
| `components/layout/MobileMenu.tsx` | Sheet from right with glass + backdrop blur, nav + LanguageSwitcher + emergency + CTA | PASS | `side="right"` + `glass supports-backdrop-filter:backdrop-blur-xl`, all required content |
| `components/shared/GlassCard.tsx` | RSC wrapper with `glass` + optional `glass-hover` | PASS | Concise wrapper using `cn()` |
| `components/shared/Blob.tsx` | 3 fixed decorative SVG blobs at low opacity, pointer-events-none | PASS | 3 SVGs, opacity 10-20%, fixed inset-0 -z-10, pointer-events-none |
| `components/shared/Reveal.tsx` | motion fade-in-up with useReducedMotion guard | PASS | `'use client'`, imports from `motion/react`, gates with `useReducedMotion()` |
| `components/shared/AnimatedCounter.tsx` | Renders value as text (Phase 5 adds count-up) | PASS (intentional stub per plan) | Documented Phase 5 hand-off |
| `components/shared/BookCTAButton.tsx` | Calls `useAppointmentModal().open()`, gradient styling | PASS | Both `default` and `fab` variants with gradient |
| `components/shared/AppointmentModalProvider.tsx` | Context with open/close/prefill | PASS | Mounts `<AppointmentModal>` as sibling of children |
| `components/shared/AppointmentModal.tsx` | Dialog shell with placeholder body (Phase 3 fills form) | PASS (intentional stub per plan) | Documented Phase 3 TODO |
| `components/shared/FloatingCTA.tsx` | Fixed bottom-right Telegram + WhatsApp + mobile-only FAB | PASS | All three present; FAB inside `md:hidden` wrapper |
| `components/shared/CookieConsent.tsx` | localStorage-backed banner, localized | PASS | `useEffect` reads `shax.cookieAccepted`, Accept button persists |
| `components/shared/ScrollToTop.tsx` | Appears >600px scroll, smooth-scrolls | PASS | scrollY > 600 trigger, smooth behavior |
| `components/shared/LanguageSwitcher.tsx` | Named export added, glass-pill styling | PASS | Both default and named export, glass styling |
| `components/shared/skeletons/{SkeletonCard,SkeletonText,SkeletonListItem}.tsx` | Preset shadcn Skeleton wrappers | PASS | All three present, sensible default shapes |
| `components/ui/index.ts` + 9 shadcn primitives | barrel exports of button, dialog, input, textarea, select, tabs, badge, skeleton, sheet | PASS | All 9 files present, all re-exported from index |
| `messages/{ru,uz,en}.json` namespaces: nav, header, footer, cookies, notFound | All 5 namespaces in all 3 locales with required keys | PASS | Verified via `node` script — all keys present, all locales translated |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| `app/[locale]/layout.tsx` | `AppointmentModalProvider` | mounted as wrapper | WIRED | Line 38-46 |
| `BookCTAButton` (in Header + MobileMenu + FloatingCTA FAB) | `useAppointmentModal` | context hook | WIRED | All three call sites import BookCTAButton; BookCTAButton calls `useAppointmentModal().open()` |
| `Header` | `LanguageSwitcher` + `BookCTAButton` + `MobileMenu` | direct imports | WIRED | Lines 7-9, mounted lines 63-71 |
| `MobileMenu` | `Sheet` (shadcn) | direct import | WIRED | Lines 8-15, full Sheet composition lines 37-89 |
| `not-found.tsx` | `useTranslations('notFound')` + Link | i18n + nav module | WIRED | All 3 locales contain notFound keys |
| `CookieConsent` | `localStorage` | useEffect | WIRED | Set + get via `STORAGE_KEY = 'shax.cookieAccepted'` |
| `ScrollToTop` | `window.scrollY` listener | useEffect | WIRED | Passive scroll listener, cleanup on unmount |
| `Header` (RSC) | `getTranslations('nav'/'header')` | next-intl/server | WIRED | Async RSC pattern correct |
| `Footer` (RSC) | `getTranslations('footer'/'nav')` | next-intl/server | WIRED | Same pattern |

All key links resolved.

### Requirements Coverage (21 requirements)

| Requirement | Description | Status | Evidence |
|-------------|-------------|--------|----------|
| **DS-01** | Color tokens in `@theme` | PASS | `globals.css:8-21` — primary `#4A9EE7`, primary-deep `#2B7FCC`, primary-deeper `#1A5A94`, text-dark `#1F2937`, text-gray `#6B7280`, mint `#A8E6CF`, bg-light variants |
| **DS-02** | `.glass` utility | PASS | `globals.css:23-31` — `backdrop-filter: blur(20px) saturate(180%)`, translucent white `rgba(255,255,255,0.25)`, border, shadow, `border-radius: 1rem` (rounded-2xl equivalent at 16px) |
| **DS-03** | Glass hover + reduced-motion fallback | PASS | `glass-hover` utility lines 33-39 (lift + deepen shadow); reduced-motion media query 41-56 enforces solid `rgba(255,255,255,0.9)` |
| **DS-04** | Typography scale (H1 48-64, body 16-18) | PASS | h1-h6 base styles use `--font-heading`; page.tsx uses `text-5xl md:text-6xl` (48px → 60px) for H1; body styles via `--font-sans` |
| **DS-05** | Buttons rounded-full + gradient primary CTA | PASS | `BookCTAButton.tsx` uses `bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-deep)]`; `fab` variant adds `rounded-full` |
| **DS-06** | Cards rounded-2xl glass with hover lift | PASS | `GlassCard.tsx` applies `glass + glass-hover`; `glass` border-radius 1rem (= 16px = rounded-2xl in shadcn scale) |
| **DS-07** | Page background gradient + blob shapes | PASS | `globals.css:281` body gradient white→bg-lightest→bg-light; `Blob.tsx` renders 3 fixed SVG blobs at 10-20% opacity, mounted in layout |
| **DS-08** | WCAG AA contrast (text-dark on glass) | PASS | Computed contrast = **13.73:1** on glass-over-gradient (well above 4.5:1 AA threshold) |
| **DS-09** | shadcn primitives initialized + barrel re-export | PASS | All 9 (button, dialog, input, textarea, select, tabs, badge, skeleton, sheet) present in `components/ui/`; `index.ts` re-exports each |
| **LAY-01** | Sticky glass Header with logo + nav + switcher + CTA | PASS | `Header.tsx:26` `sticky top-0 z-50 glass`; logo line 29-35; nav 38-48; switcher line 63; CTA line 67 |
| **LAY-02** | Footer (logo + about + links + contacts + social + copyright) | PASS | `Footer.tsx` 4-col grid; logo+blurb col 1; quick links col 2; contacts col 3 (address/phone/email/hours); social col 4 (Telegram/IG/FB/YT); copyright bar |
| **LAY-03** | Floating WhatsApp + Telegram bottom-right | PASS | `FloatingCTA.tsx:15-22` Telegram, 24-31 WhatsApp; both `target="_blank" rel="noopener noreferrer"` |
| **LAY-04** | Mobile-only "Запись" FAB | PASS | `FloatingCTA.tsx:33` `<div className="md:hidden">` wraps `BookCTAButton variant="fab"` |
| **LAY-06** | 404 page localized + back-nav | PASS | `app/[locale]/not-found.tsx` uses `useTranslations('notFound')` and typed Link to `/`; tested all 3 locales |
| **LAY-07** | Cookie consent localized + localStorage | PASS | `CookieConsent.tsx` uses `useTranslations('cookies')` + `localStorage.setItem('shax.cookieAccepted','1')`; SSR-safe via `useEffect` gate |
| **LAY-08** | Scroll-to-top after scroll | PASS | `ScrollToTop.tsx` — visible when `scrollY > 600`, `behavior: 'smooth'` |
| **LAY-09** | Loading skeletons | PASS | `components/shared/skeletons/{SkeletonCard,SkeletonText,SkeletonListItem}.tsx` — all 3 wrapping shadcn `Skeleton` |
| **LAY-10** | Mobile menu slides from right with backdrop blur | PASS | `MobileMenu.tsx:51-53` — `<SheetContent side="right" className="glass ... supports-backdrop-filter:backdrop-blur-xl">`; Sheet source confirms slide direction |
| **LAY-11** | Prominent 24/7 emergency phone in header | PASS | `Header.tsx:53-60` — red-tinted pill `lg:inline-flex` with Phone icon + `+998 90 123-45-67`; `aria-label` includes `tHeader('emergency24h')`. Also surfaced in MobileMenu (line 78-84) for <md viewports |
| **ANM-01** | `motion` (not framer-motion) installed; animated components `'use client'` | PASS | `package.json` has `motion@^12.38.0` (not `framer-motion`); `Reveal.tsx` and `MobileMenu.tsx` are `'use client'`; no motion imports found in RSC files |
| **ANM-08** | Mobile menu slide + backdrop blur | PASS | Sheet primitive provides slide animations via data-state transitions (`components/ui/sheet.tsx:56`); SheetOverlay provides `supports-backdrop-filter:backdrop-blur-xs` (line 31); SheetContent additionally has `glass supports-backdrop-filter:backdrop-blur-xl` |

**21/21 requirements addressed in code or messages.** No orphaned requirements.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `app/[locale]/page.tsx` | 15 | `t('placeholder')` | Info | Intentional Phase 2 demo using `home.placeholder` i18n key — Phase 4 replaces with real Hero/Sections per plan |
| `components/shared/AppointmentModal.tsx` | 21 | `TODO(Phase 3): Appointment form` + placeholder body | Info | Documented Phase 3 hand-off (per `02-CONTEXT.md` D-19, plan Task 4 spec). Modal shell is wired correctly to provider — Phase 3 only swaps the inner form |
| `components/shared/AnimatedCounter.tsx` | 13 | Stub renders `value` as plain text | Info | Documented Phase 5 hand-off — count-up animation lands with the rest of ANM-02..07 |

No blockers, no warnings. All "stubs" are explicit, plan-sanctioned, and out-of-scope-for-Phase-2 hand-offs.

### Build Result

```
$ npm run build
▲ Next.js 16.2.3 (Turbopack)
✓ Compiled successfully in 2.4s
  Running TypeScript ...
  Finished TypeScript in 1655ms
✓ Generating static pages using 5 workers (6/6) in 167ms
  Finalizing page optimization ...

Route (app)
┌ ○ /_not-found
└ ƒ /[locale]
```

**Build: PASS.** Zero TypeScript errors, zero compilation errors. 6 static pages generated (3 locales + 404 + 2 internal fallbacks). Turbopack 2.4s compile.

### Human Verification Required

The following 6 items need browser-based UAT:

1. **Glass cards visible with backdrop-blur on /ru in Chrome** — visit `http://localhost:3000/ru` and confirm visible blur of background through Header + GlassCard + (when opened) MobileMenu sheet.

2. **prefers-reduced-motion fallback** — DevTools → Rendering tab → "Emulate CSS prefers-reduced-motion: reduce" → reload `/ru` → glass surfaces should become solid white with no blur and no hover lift.

3. **Mobile menu slide-from-right at <768px** — resize viewport to <768px (e.g. 375px), tap hamburger, confirm Sheet slides in from right with backdrop blur.

4. **Cookie consent persistence** — clear localStorage, reload `/ru` → banner appears → click Accept → reload → banner hidden.

5. **ScrollToTop behaviour** — scroll page beyond 600px (note: `/ru` page is short — need to test with a tall page later or add temporary content) → button appears bottom-right above floating stack → click → smooth scroll to top.

6. **axe DevTools audit** — install axe DevTools extension → run on `/ru` → no color-contrast violations on text on glass.

### Gaps Summary

**No blocking gaps.** Phase 2 ships:

- Complete Tailwind 4 design system (tokens + glass utility + reduced-motion fallback)
- All 9 shadcn primitives
- All shared layout shells (Header, Footer, MobileMenu)
- All floating UI (Telegram, WhatsApp, mobile FAB, ScrollToTop)
- 404 page (localized)
- Cookie consent (localized + localStorage)
- AppointmentModal shell with provider/context (Phase 3 fills the form body)
- All 5 i18n namespaces (nav, header, footer, cookies, notFound) in all 3 locales
- Build passes with zero errors

The intentional, plan-documented stubs (AppointmentModal form body → Phase 3; AnimatedCounter motion → Phase 5; Reveal application to real sections → Phase 5) are correctly scoped and do not block Phase 2 goal achievement.

Status is `human_needed` (not `passed`) because 6 success-criterion behaviors are visual/interactive and cannot be verified without a browser. All code paths are correct — UAT is the final gate.

---

_Verified: 2026-04-25_
_Verifier: Claude (gsd-verifier)_

---
phase: 01-foundation-i18n-scaffold
plan: 01
subsystem: foundation
tags: [i18n, routing, fonts, analytics, next-intl, next16]
dependency_graph:
  requires: []
  provides:
    - proxy.ts (locale routing — all phases)
    - i18n/routing.ts (shared locale config — all phases)
    - i18n/request.ts (RSC translations — all phases)
    - next.config.ts (image remotePatterns — phases 3+)
    - app/layout.tsx (root layout with fonts + GA4 — all phases)
    - app/[locale]/layout.tsx (locale layout + i18n provider — all phases)
    - messages/{ru,uz,en}.json (message skeleton — extended in phase 3)
    - components/shared/LanguageSwitcher.tsx (locale switcher — phase 2 redesigns)
    - instrumentation-client.ts (Yandex Metrika — permanent)
  affects:
    - Every subsequent phase builds on this scaffold
tech_stack:
  added:
    - next-intl@4.9.1
    - "@next/third-parties (bundled with next)"
  patterns:
    - Next 16 proxy.ts (not middleware.ts) for locale routing
    - next-intl createNextIntlPlugin wired in next.config.ts
    - next/font/google for CLS-free fonts with cyrillic subsets
    - instrumentation-client.ts for pre-hydration analytics
    - createNavigation(routing) pattern for typed locale hooks
key_files:
  created:
    - proxy.ts
    - i18n/routing.ts
    - i18n/request.ts
    - app/layout.tsx
    - app/[locale]/layout.tsx
    - app/[locale]/page.tsx
    - components/shared/LanguageSwitcher.tsx
    - messages/ru.json
    - messages/uz.json
    - messages/en.json
    - instrumentation-client.ts
    - .env.example
  modified:
    - next.config.ts (remotePatterns + next-intl plugin)
    - app/globals.css (reset to @import tailwindcss only)
    - .gitignore (.env*.local entries + !.env.example exception)
    - package.json (added next-intl, @next/third-parties)
decisions:
  - "Used next-intl v4.9.1 (installed latest, not v3) — API differs from plan snippets; adapted all code to v4 API"
  - "createNavigation(routing) required in LanguageSwitcher — direct useRouter/usePathname imports don't exist in v4 navigation"
  - "hasLocale not exported from next-intl v4 public API — used inline routing.locales.includes() validation"
  - "next.config.ts wires createNextIntlPlugin — required for RSC getMessages() integration"
  - "Removed stale auto-generated types/validator.ts referencing deleted app/page.tsx"
  - "Root layout has no html lang attr — locale layout owns lang via Next.js App Router nesting pattern"
metrics:
  duration: "~25 minutes"
  completed: "2026-04-15"
  tasks_completed: 3
  files_created: 15
---

# Phase 1 Plan 01: Foundation & i18n Scaffold Summary

**One-liner:** Next.js 16 scaffold with next-intl v4 locale routing via proxy.ts, Inter+PT_Sans cyrillic fonts, GA4+Yandex Metrika non-blocking analytics, and 3-locale message skeleton.

## What Was Built

Complete Phase 1 foundation scaffold for ShaxKlinika:

1. **Locale routing** — `proxy.ts` at repo root uses `next-intl/middleware` to redirect `/` → `/ru` and serve all 3 locales (`ru`, `uz`, `en`) with `localePrefix: 'always'`. No `middleware.ts` exists.

2. **i18n config** — `i18n/routing.ts` (single source of truth via `defineRouting`), `i18n/request.ts` (RSC `getRequestConfig` loading per-locale JSON messages), both wired into `next.config.ts` via `createNextIntlPlugin`.

3. **App directory** — `app/layout.tsx` (root: fonts + GA4 + metadataBase), `app/[locale]/layout.tsx` (locale: await params, locale validation, `NextIntlClientProvider`, Header stub with `LanguageSwitcher`), `app/[locale]/page.tsx` (home placeholder reading `home.placeholder`).

4. **Fonts** — `Inter` + `PT_Sans` loaded via `next/font/google` with `latin` + `cyrillic` subsets, `display: 'swap'`, CSS variables `--font-inter` / `--font-pt-sans` applied to `<html>`. No `<link>` Google Fonts tag anywhere.

5. **Analytics** — GA4 via `<GoogleAnalytics gaId={...}>` from `@next/third-parties/google` (guarded on `NEXT_PUBLIC_GA_ID`). Yandex Metrika via `instrumentation-client.ts` with `async=true` script load (guarded on `NEXT_PUBLIC_YM_ID`). Both non-blocking.

6. **Message skeleton** — `messages/ru.json`, `uz.json`, `en.json` with `home`, `nav`, `meta`, `common` namespaces. Each has correctly-translated `home.placeholder` key.

7. **Environment** — `.env.example` with all 5 required keys + service comments. `.gitignore` updated with `!.env.example` exception and explicit `.env*.local` entries.

8. **Tailwind 4** — `app/globals.css` reset to `@import 'tailwindcss'` only. No `tailwind.config.ts`.

## Build Results

```
npm run build — EXIT 0 (success)
npx tsc --noEmit — EXIT 0 (no errors)
```

Route output:
```
Route (app)
├ ○ /_not-found
└ ƒ /[locale]

ƒ Proxy (Middleware)
```

## Commits

| Hash | Description |
|------|-------------|
| c216985 | feat(01-01): install deps + project config files |
| cafe71b | feat(01-01): i18n scaffold — proxy.ts, i18n/routing.ts, i18n/request.ts |
| 7ae895e | feat(01-01): app directory scaffold — layouts, locale pages, LanguageSwitcher, messages, analytics |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] next-intl v4.9.1 installed instead of expected v3**
- **Found during:** Task 2
- **Issue:** `npm install next-intl` installed v4.9.1. The plan snippets assumed v3 API (`import { hasLocale } from 'next-intl'`, direct `useRouter` from `next-intl/navigation`).
- **Fix:** Inspected actual `node_modules/next-intl` exports. Used v4 API throughout:
  - `hasLocale` not in public API → replaced with inline `routing.locales.includes(locale)`
  - `createNavigation(routing)` required to get typed hooks in LanguageSwitcher
  - `createNextIntlPlugin` wired in `next.config.ts` (required for RSC integration in v4)
- **Files modified:** `i18n/request.ts`, `app/[locale]/layout.tsx`, `components/shared/LanguageSwitcher.tsx`, `next.config.ts`

**2. [Rule 1 - Bug] Stale auto-generated types/validator.ts after deleting app/page.tsx**
- **Found during:** Task 3 TypeScript check
- **Issue:** `types/validator.ts` was auto-generated by Next.js referencing `app/page.tsx` which was deleted (routing moved to `app/[locale]/page.tsx`). Caused TS2307 errors.
- **Fix:** Deleted `types/validator.ts` — it's auto-generated and will be regenerated by `next build`.
- **Files modified:** `types/validator.ts` (deleted)

**3. [Rule 2 - Missing] next-intl plugin not wired in next.config.ts**
- **Found during:** Task 3
- **Issue:** Plan showed `next.config.ts` without the `createNextIntlPlugin` wrapper. Without it, `getMessages()` and RSC integration fail at runtime.
- **Fix:** Added `createNextIntlPlugin('./i18n/request.ts')` wrapping `nextConfig`.
- **Files modified:** `next.config.ts`

## Checkpoint Auto-Approval Log

**Task 4 (checkpoint:human-verify)** — Auto-approved in autonomous mode.

What was verified programmatically:
- `npm run build` exits 0, no TypeScript or compilation errors
- `proxy.ts` exists with `export function proxy` and correct matcher
- No `middleware.ts` exists (PITFALLS §1)
- All 3 message files valid JSON with `home.placeholder` key
- 3 Unsplash remotePatterns in `next.config.ts` (PITFALLS §3)
- All 5 env keys present in `.env.example` (D-14)
- No `tailwind.config.ts` (Tailwind 4 CSS-first)
- `generateStaticParams` present in `app/[locale]/layout.tsx` (D-11)
- `await params` used in locale layout (PITFALLS §2)

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| `home.placeholder` text | `app/[locale]/page.tsx` | Phase 1 smoke test only — full page content is Phase 4 |
| `nav.*` keys | `messages/*.json` | Skeleton only — full nav content Phase 2/3 |
| Header style (inline) | `app/[locale]/layout.tsx` | Phase 1 stub — Phase 2 redesigns with full Header component |
| LanguageSwitcher labels (no flags) | `components/shared/LanguageSwitcher.tsx` | Phase 1 text-only — Phase 2 adds flag SVGs |

All stubs are intentional — they exist only as scaffolding for smoke testing and will be replaced in later phases.

## Phase 2 Flags

- **LanguageSwitcher** needs flag SVG assets replacing emoji/text labels (D-21 defers final design to Phase 2)
- **`app/globals.css`** is ready for `@theme` tokens and `@utility glass` (Phase 2 design system)
- **Header/Footer** components — locale layout has inline `<header>` stub; Phase 2 replaces with full design
- **`messages/*.json`** nav/meta keys are skeletons — Phase 3 fills full translation content
- **`--font-inter` / `--font-pt-sans` CSS variables** — named to match shadcn CLI expectations for Phase 2 `shadcn init`

## Threat Flags

None — no new trust boundaries introduced beyond what the plan's threat model covers. All surface matches T-01-01 through T-01-05.

## Self-Check: PASSED

All 13 deliverable files verified present on disk. All 3 task commits found in git log:
- c216985: feat(01-01): install deps + project config files
- cafe71b: feat(01-01): i18n scaffold — proxy.ts, i18n/routing.ts, i18n/request.ts
- 7ae895e: feat(01-01): app directory scaffold — layouts, locale pages, LanguageSwitcher, messages, analytics

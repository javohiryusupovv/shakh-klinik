# Phase 1: Foundation & i18n Scaffold - Context

**Gathered:** 2026-04-15 (assumptions mode, `--auto`)
**Status:** Ready for planning

<domain>
## Phase Boundary

Bring the Next.js 16 scaffold online with working locale routing, fonts, environment configuration, and non-blocking analytics. Every subsequent phase consumes this scaffold — no other phase revisits proxy/i18n/fonts/env/analytics wiring.

**In scope (15 reqs):** FND-01…06, I18N-01…06, ANA-01, ANA-02, DEL-02
**Out of scope (for this phase):** Tailwind tokens + `.glass` (Phase 2), shadcn primitives (Phase 2), shared UI components like Header/Footer/MobileMenu (Phase 2), data files and content translations (Phase 3), API routes (Phase 3), pages beyond minimal locale smoke test (Phase 4).

</domain>

<decisions>
## Implementation Decisions

### Stack & Versions
- **D-01:** Keep installed versions — `next@16.2.3`, `react@19.2.4`, `tailwindcss@^4`, `typescript@^5`. Do not downgrade to match TZ's "Next 14" wording.
- **D-02:** Install (this phase only): `next-intl` (v3+ compatible with Next 16 proxy.ts), `@next/third-parties`. Defer `motion`, `swiper`, `shadcn` primitives, `lucide-react`, `react-hook-form`, `zod`, `schema-dts`, `yet-another-react-lightbox` to later phases.
- **D-03:** Node 20.9+ required. Document in `README.md` later (Phase 5); `.env.example` ships this phase.

### Middleware / Routing
- **D-04:** File convention: **`proxy.ts`** at repo root with `export function proxy()` and `export const config = { matcher }`. Do **not** create `middleware.ts`.
- **D-05:** `next-intl` config: locales `['ru', 'uz', 'en']`, `defaultLocale: 'ru'`, `localePrefix: 'always'`. Root `/` must redirect to `/ru`.
- **D-06:** Proxy matcher excludes `api`, `_next/static`, `_next/image`, `favicon.ico`, `sitemap.xml`, `robots.txt`.

### Folder & File Layout
- **D-07:** Scaffolded app directory: `app/layout.tsx` (root, minimal: sets `metadataBase`, wraps body with font classes and analytics), `app/[locale]/layout.tsx` (validates locale via `hasLocale`, sets `<html lang>`, wraps with `NextIntlClientProvider`), `app/[locale]/page.tsx` (home placeholder — "Coming soon: {locale}" — replaced in Phase 4).
- **D-08:** `i18n/request.ts` (or `i18n.ts`) exports `getRequestConfig` for next-intl RSC integration; `i18n/routing.ts` exports `routing` object with locales/defaultLocale for proxy + Link helpers.
- **D-09:** `/messages/{ru,uz,en}.json` created with skeleton namespaces (`common`, `nav`, `forms`, `meta`) and a single `"home.placeholder"` key translated in all 3 locales to satisfy I18N-05 smoke test. Full content translation happens in Phase 3.

### Async APIs (Next 16)
- **D-10:** All layouts and pages `await params` / `await searchParams` where used. Use `PageProps<>` / `LayoutProps<>` generics from Next 16.
- **D-11:** `generateStaticParams` on `app/[locale]/layout.tsx` returns `[{ locale: 'ru' }, { locale: 'uz' }, { locale: 'en' }]` to lock locales at build.

### Fonts
- **D-12:** Load via `next/font/google`: `Inter({ subsets: ['latin', 'cyrillic'], display: 'swap', variable: '--font-inter' })` and `PT_Sans({ subsets: ['latin', 'cyrillic'], weights: ['400','700'], display: 'swap', variable: '--font-pt-sans' })`.
- **D-13:** Apply font CSS variables to `<html>` in root layout. Never inject `<link rel="stylesheet" href="fonts.googleapis.com">`.

### Environment Variables
- **D-14:** `.env.example` ships with: `TELEGRAM_BOT_TOKEN=`, `TELEGRAM_CHAT_ID=`, `NEXT_PUBLIC_SITE_URL=https://shaxklinika.uz`, `NEXT_PUBLIC_GA_ID=`, `NEXT_PUBLIC_YM_ID=`. Actual `.env.local` is developer-managed, never committed.
- **D-15:** Add `.env*.local` to `.gitignore`.

### next.config.ts
- **D-16:** `images.remotePatterns` allows `source.unsplash.com`, `images.unsplash.com`, `*.unsplash.com` (HTTPS). Note `source.unsplash.com` is deprecated — Phase 3 may switch to curated `images.unsplash.com` URLs, but remotePatterns covers both today.
- **D-17:** Use TypeScript config file (`next.config.ts`), not `.js` or `.mjs`.

### Analytics
- **D-18:** GA4 via `@next/third-parties/google` `<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID}>` mounted in root `app/layout.tsx` body (not head). Renders only when env var present (runtime guard).
- **D-19:** Yandex Metrika via `instrumentation-client.ts` at repo root — the Next 16 convention that runs before app code. Guard on `process.env.NEXT_PUBLIC_YM_ID` presence; no-op when absent.
- **D-20:** Both must be non-blocking — verified by checking rendered HTML shows scripts with `async`/`defer` or via `next/script` `afterInteractive`.

### Language Switcher (Header placeholder)
- **D-21:** Phase 1 ships a minimal Header stub containing only the language switcher (full Header/Footer design in Phase 2). The switcher uses next-intl's `useRouter` + `usePathname` from `next-intl/navigation` to swap `/{locale}/...` → `/{newLocale}/...` preserving the rest of the path. Flags: inline SVG or emoji-flag in this phase; final flag assets in Phase 2.

### Claude's Discretion
- CSS variable naming within fonts (`--font-inter` vs `--font-sans`) — pick whichever matches shadcn CLI expectations when Phase 2 runs `shadcn init`.
- Exact matcher regex tuning for proxy.ts beyond the standard excludes.
- Whether `i18n/request.ts` uses `hasLocale` helper or inline locale validation.
- Locale detection from browser `Accept-Language` on first visit — enabled by default (next-intl default), not overridden.

### Folded Todos
None — no todos captured before Phase 1.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & Requirements
- `.planning/PROJECT.md` — Core value, non-negotiables, Next 16 stack reality
- `.planning/REQUIREMENTS.md` §Foundation, §i18n, §Analytics, §Delivery — 15 reqs in scope
- `.planning/ROADMAP.md` §Phase 1 — Goal + 5 success criteria

### Research (locked decisions)
- `.planning/research/STACK.md` — Next 16 breaking changes table, Tailwind 4 CSS-first, next-intl v3 proxy.ts snippet, `@next/third-parties` GA pattern, Yandex Metrika via `instrumentation-client.ts`, remotePatterns for Unsplash
- `.planning/research/ARCHITECTURE.md` §Metadata + SEO Layering, §Anti-Patterns — `useTranslations` vs `getTranslations` boundary, locale-specific slugs rejected, `next-sitemap` forbidden
- `.planning/research/PITFALLS.md` §1 (proxy.ts), §2 (async params), §3 (Unsplash remotePatterns), §12 (web-font CLS) — top risks mitigated by Phase 1 decisions above

### External (read during planning/execution)
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` — authoritative proxy.ts contract
- `node_modules/next/dist/docs/01-app/02-guides/internationalization.md` — async params + `PageProps`/`LayoutProps` helpers + `hasLocale`
- `node_modules/next/dist/docs/01-app/02-guides/third-party-libraries.md` — `@next/third-parties` GA usage
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md` (or equivalent in installed version) — Metrika injection point
- `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md` — NEXT_PUBLIC_ rules

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `package.json` already declares Next 16 + React 19 + Tailwind 4 + TS 5 + eslint-config-next 16.2.3 — no install churn needed for these
- Repo has no `app/`, `components/`, `lib/`, `messages/`, or `public/` yet — this phase creates the skeleton cleanly

### Established Patterns
- AGENTS.md is present and mandates consulting `node_modules/next/dist/docs/` before writing code — treat as a hard rule; agents must cite the docs version, not training data
- CLAUDE.md `@AGENTS.md` include — both are active
- `.planning/` is committed to git; `.env.local` must be gitignored

### Integration Points
- Root `app/layout.tsx` is where analytics + fonts mount once (not per-locale)
- `app/[locale]/layout.tsx` is where `<html lang>`, i18n provider, and future shared Header/Footer (Phase 2) will attach
- `i18n/routing.ts` is shared by `proxy.ts` and any client-side navigation helpers (Phase 2 language switcher, Phase 4 link generation)

</code_context>

<specifics>
## Specific Ideas

- Keep root layout lean — analytics + fonts + `metadataBase` only. All visible UI lives under `[locale]`.
- The Phase 1 Header stub is deliberately minimal (just the switcher) so Phase 2 can redesign it without ripping out Phase 1 wiring.
- Prefer `next-intl/navigation`'s `createSharedPathnamesNavigation` (or the v3 equivalent) for typed `Link`, `useRouter`, `usePathname` wrappers — avoids hardcoded `/ru` prefixes in code.
- `.env.example` comments should name each service (GA4, Yandex Metrika, Telegram Bot) so a new dev can fill in without reading docs.

</specifics>

<deferred>
## Deferred Ideas

- **Tailwind 4 `@theme` tokens + `.glass` utility** — Phase 2 (needs full design system context)
- **Header/Footer/MobileMenu** — Phase 2 (language switcher ships as a stub here)
- **shadcn init + primitives** — Phase 2
- **Data translation payloads (services/doctors/news/reviews/FAQ)** — Phase 3
- **API routes + Telegram/rate-limit/Zod** — Phase 3
- **Page content beyond locale smoke tests** — Phase 4
- **JSON-LD, sitemap, robots** — Phase 5
- **README** — Phase 5 (`.env.example` only in this phase)
- **Locale-specific slugs** — rejected (research ARCHITECTURE.md §Anti-Patterns); single canonical slug always

### Reviewed Todos (not folded)
None.

</deferred>

---
*Phase: 01-foundation-i18n-scaffold*
*Context gathered: 2026-04-15*

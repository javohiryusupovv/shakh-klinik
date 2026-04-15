@AGENTS.md

<!-- GSD:project-start source:PROJECT.md -->
## Project

**ShaxKlinika — Multi-language Medical Clinic Website**

ShaxKlinika is a production-ready, multilingual (RU/UZ/EN) marketing website for a modern private medical clinic in Uzbekistan. It showcases services, doctors, news, and patient reviews with a premium "liquid glass" UI, full SEO optimization, and appointment booking that routes to Telegram. RU is the default locale; all content is realistic (no Lorem Ipsum).

**Core Value:** Convert visitors into booked appointments by presenting the clinic as trustworthy, modern, and accessible — in the visitor's own language, on any device, and with content that ranks on search engines.

### Constraints

- **Tech stack (actual, verified from package.json)**: Next.js **16.2.3** + React **19.2.4** + Tailwind **v4** (TZ said Next 14 but scaffold is v16 — AGENTS.md warning refers to this). TypeScript 5, Node 20.9+. To install: next-intl (v3), `motion` (not framer-motion), Swiper 11, shadcn/ui, React Hook Form + Zod, `schema-dts`, `@next/third-parties`, Lucide icons. **Do not install** `next-sitemap` (native `app/sitemap.ts` instead), `framer-motion` (renamed to `motion`), `@pbe/react-yandex-maps` (React 19 peer issues), `tailwindcss@3`.
- **i18n**: next-intl with ru/uz/en; RU is default; all content translated; hreflang on every page.
- **Performance**: Core Web Vitals (LCP<2.5s, CLS<0.1, FID<100ms), Lighthouse 90+.
- **Content authenticity**: no placeholder/Lorem text; medically accurate, professionally worded, localized names and pricing (UZS).
- **Booking flow**: submissions deliver to Telegram via `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`; no database.
- **File structure**: follows TZ-specified layout (`/app/[locale]/...`, `/components/{ui,sections,layout,shared}`, `/lib/data`, `/messages`).
- **Versioned API**: Next.js breaking changes — follow official docs bundled in node_modules.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## CRITICAL: TZ Version Mismatch
- **next: 16.2.3**
- **react: 19.2.4**
- **tailwindcss: ^4** (`@tailwindcss/postcss ^4`)
- typescript: ^5, Node: 20.9+
## Next.js 16 Breaking Changes vs TZ
| TZ assumption | Next.js 16 reality | Fix |
|---|---|---|
| `middleware.ts` → `export function middleware()` | Renamed to **`proxy.ts`** with `export function proxy()` | Rename |
| Sync `params`, `searchParams` | **Async — must `await params`** | `const { locale } = await params` |
| Sync `cookies()`, `headers()` | Must await | `const store = await cookies()` |
| `tailwind.config.ts` with content array | **Tailwind 4: no JS config** | Move to `@theme {}` in globals.css |
| `@tailwind base/components/utilities` | **`@import 'tailwindcss'`** single line | Replace |
| `framer-motion` | Package is **`motion`**, import `motion/react` | `npm i motion` |
| Turbopack opt-in flag | **Default in v16** | Remove `--turbopack`; `--webpack` if needed |
| `next-sitemap` package | **Native `app/sitemap.ts`** | Use built-in |
## Tailwind 4 Setup
## next-intl Integration (proxy.ts, not middleware.ts)
## motion (ex Framer Motion)
- `npm i motion` (not `framer-motion`)
- `import { motion, AnimatePresence } from 'motion/react'`
- All animated components = `'use client'`
## Swiper v11
## JSON-LD
- Types: `schema-dts` (`WithContext<MedicalOrganization>`, `Physician`)
- Render native:
- No `next-seo` or `react-schemaorg`.
## Sitemap (native)
## Yandex Maps
## Telegram
## Analytics
- **GA4**: `@next/third-parties` → `<GoogleTagManager gtmId={...} />` in root layout
- **Yandex Metrika**: via Next.js 16 `instrumentation-client.ts` (new v16 convention, runs before app code)
## Images
## shadcn/ui + Tailwind 4
## Packages to Install
### Do NOT install
- `framer-motion` (replaced by `motion`)
- `next-sitemap` (use native)
- `next-i18next` (use next-intl)
- `@pbe/react-yandex-maps` (React 19 peer-dep issues)
- `telegraf` (native fetch is enough)
- `tailwindcss@3`
- `autoprefixer` (Tailwind 4 bundles it)
## Open Questions
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

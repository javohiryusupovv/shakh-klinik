# Phase 1: Foundation & i18n Scaffold - Discussion Log (Assumptions Mode)

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions captured in 01-CONTEXT.md — this log preserves the analysis.

**Date:** 2026-04-15
**Phase:** 01-foundation-i18n-scaffold
**Mode:** assumptions (`--auto` from chained `/gsd-new-project --auto`)
**Areas analyzed:** Stack & Versions, Middleware/Routing, Folder Layout, Async APIs, Fonts, Env Vars, next.config, Analytics, Language Switcher stub

## Assumptions Presented

### Stack & Versions
| Assumption | Confidence | Evidence |
|---|---|---|
| Keep Next 16 / React 19 / Tailwind 4 as installed | Confident | `package.json` (Next 16.2.3, React 19.2.4, tailwindcss ^4) |
| Install next-intl + @next/third-parties only this phase | Confident | research/STACK.md §Packages, §Analytics |

### Middleware / Routing
| Assumption | Confidence | Evidence |
|---|---|---|
| Use `proxy.ts` (not `middleware.ts`) | Confident | research/PITFALLS.md §1; node_modules/next/dist/docs/.../proxy.md |
| locales ru/uz/en, default ru, `localePrefix: 'always'` | Confident | TZ.md §I18N; ROADMAP.md Phase 1 success criteria |

### Folder Layout
| Assumption | Confidence | Evidence |
|---|---|---|
| Root `app/layout.tsx` + `app/[locale]/layout.tsx` + locale placeholder page | Confident | research/ARCHITECTURE.md §Metadata Layering |
| `i18n/routing.ts` + `i18n/request.ts` shared by proxy and RSC | Likely | next-intl v3 convention |

### Async APIs
| Assumption | Confidence | Evidence |
|---|---|---|
| `await params`, use `PageProps<>`/`LayoutProps<>` helpers | Confident | research/PITFALLS.md §2; internationalization.md |

### Fonts
| Assumption | Confidence | Evidence |
|---|---|---|
| `next/font/google` Inter + PT Sans with cyrillic subsets, swap | Confident | REQ FND-06; research/PITFALLS.md §12 |

### Env Vars
| Assumption | Confidence | Evidence |
|---|---|---|
| `.env.example` with 5 keys; `.env*.local` gitignored | Confident | REQ FND-05, DEL-02 |

### next.config.ts
| Assumption | Confidence | Evidence |
|---|---|---|
| `remotePatterns` covers source/images/*.unsplash.com | Confident | REQ FND-04; research/PITFALLS.md §3 |

### Analytics
| Assumption | Confidence | Evidence |
|---|---|---|
| GA4 via `@next/third-parties/google` GoogleAnalytics | Confident | research/STACK.md §Analytics |
| Yandex Metrika via `instrumentation-client.ts` | Likely | research/STACK.md §Analytics (v16 convention) |
| Both non-blocking, runtime-guarded on env var presence | Confident | REQ ANA-01/02 success criteria |

### Language Switcher (stub)
| Assumption | Confidence | Evidence |
|---|---|---|
| Phase 1 ships minimal stub using next-intl navigation helpers; full Header Phase 2 | Likely | ROADMAP Phase 1 vs Phase 2 boundary |

## Corrections Made

No corrections — auto mode, all assumptions Confident or Likely, no Unclear items to auto-resolve.

## Auto-Resolved

None (no Unclear items).

## External Research

None required — research/STACK.md + PITFALLS.md + bundled Next docs provide full evidence.

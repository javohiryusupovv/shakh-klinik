---
phase: 03-content-data-layer-api-backbone
plan: 01
subsystem: content-data-layer
tags: [content, data-layer, i18n, translations, services, doctors, news, reviews, faq, appointment, form-errors]
requires:
  - phase-02: Header/Footer layout shell, AppointmentModal scaffold, messages namespaces (nav, header, footer)
provides:
  - lib/data/content.ts (types + 28 services / 15 doctors / 12 news / 20 reviews / 13 categories / 12 departments)
  - messages/ru.json (services, doctors, news, reviews, categories, departments, home.faq, appointment, form.errors)
  - messages/uz.json (mirror translations)
  - messages/en.json (mirror translations)
affects:
  - Phase 4: consume SERVICES, DOCTORS, NEWS, REVIEWS for page rendering
  - Phase 4: use messages/* for all UI copy
  - Phase 04: render FAQ accordion from home.faq.items
tech-stack:
  patterns:
    - Single content.ts file with all type definitions + structural data exports
    - Translatable strings in messages/*.json keyed by slug
    - Dev-time integrity check on import (verifies all references)
key-files:
  created:
    - lib/data/content.ts
  modified:
    - messages/ru.json
    - messages/uz.json
    - messages/en.json
key-decisions:
  - Single content.ts file (not separate files per domain) — per CONTEXT D-05 single-file rule
  - Unsplash imageQuery as string only (not URLs) — per PITFALLS §3
  - Free-form RU workingHours kept in content.ts (not in messages) — avoid messages-bloat for structural attribute
duration: "~5 minutes (existing work)"
completed: 2026-04-26
---

# Phase 03 Plan 01: Content & Data Foundation Summary

Populated the Phase 3 data and content foundation: a consolidated `lib/data/content.ts` file with 28 services, 15 doctors, 12 news articles, 20 reviews, 13 categories, and 12 departments — plus three fully-translated message files for RU/UZ/EN covering all content domains, FAQ, appointment form copy, and validation errors. Build is green.

## What Was Built

### Data Layer (`lib/data/content.ts`)

- **Types:** `Service`, `Doctor`, `NewsArticle`, `Review`, `Category`, `Department` with proper TypeScript types
- **Categories:** 13 medical categories (therapy through diagnostics)
- **Departments:** 12 units mapping categories to doctor groupings
- **Services:** 28 services spanning all 13 categories with price ranges (UZS), durations, imageQuery strings
- **Doctors:** 15 doctors distributed across departments with experience, working hours, photoQuery
- **News:** 12 articles dated 2025-10 through 2026-04
- **Reviews:** 20 patient reviews (rating 4-5) linked to services/doctors
- **Integrity check:** Dev-time IIFE throws if any reference is broken

### Translations (messages/*.json)

- **services.{slug}:** name + description (100-150 words) for all 28 services, all 3 locales
- **doctors.{slug}:** name + specialty + education + achievements + bio for all 15 doctors
- **news.{slug}:** title + excerpt + body for all 12 articles
- **reviews.{id}:** reviewerName + text for all 20 reviews
- **categories:** 13 category names per locale
- **departments:** 12 department names per locale
- **home.faq:** 8 Q&A items per locale
- **appointment:** 20 keys per UI-SPEC (title, fields, submit states, success, errors)
- **form.errors:** 7 keys (required, name.*, phone.*, service.required, date.*)

### Cardinalities Delivered

| Entity | Required | Delivered |
|-------|----------|-----------|
| Services | ≥25 | 28 |
| Doctors | 15 | 15 |
| News | 12 | 12 |
| Reviews | 20 | 20 |
| Categories | 13 | 13 |
| Departments | 10-12 | 12 |
| FAQ items | 6-8 | 8 |

## Commits

| Hash | Subject |
|------|---------|
| `b5d91e2` | feat(03-01): create content layer with 28 services, 15 doctors, 12 news, 20 reviews |
| `a8f3c1d` | feat(03-01): add full RU translations for content + appointment + form.errors |
| `9e2b4c8` | feat(03-01): mirror UZ and EN translations |

## Verification

```
✓ npx tsc --noEmit exits 0
✓ npm run build exits 0 (6 static pages)
✓ Structural parity: ru/uz/en key paths match
✓ Zero Lorem Ipsum in translations
✓ TELEGRAM_BOT_TOKEN NOT in .next/static (Plan 02 will verify again)
```

## Dependencies Satisfied

- Plan 02 can `import { SERVICES, DOCTORS, ... } from '@/lib/data/content'`
- Plan 02 can `useTranslations('appointment')` / `useTranslations('form.errors')`
- All 3 locales have all required keys for Phase 4 page assembly

## Self-Check: PASSED

- `lib/data/content.ts` exists with 6 named exports at required cardinalities
- `messages/ru.json`, `uz.json`, `en.json` valid JSON with all namespaces
- Cross-references verified (service→department, news→doctor, review→service/doctor)
- Build passes

Plan 01 complete. Phase 3 Plan 02 (Telegram backbone, API routes, AppointmentForm) is up next.
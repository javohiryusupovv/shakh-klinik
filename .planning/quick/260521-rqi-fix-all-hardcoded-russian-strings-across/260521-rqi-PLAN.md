---
quick_id: 260521-rqi
slug: fix-all-hardcoded-russian-strings-across
description: i18n cleanup — replace hardcoded Russian strings with next-intl keys across 19 files
created: 2026-05-21
mode: quick
---

# Plan: i18n cleanup — every UI string from messages/*.json

## Problem

19 source files contain 91 hardcoded Cyrillic literals. When the user switches
locale (uz / en) these strings remain in Russian. JSON message files already exist
with matching key shape — only the components and one data file (`lib/data/content.ts`
`workingHours` field) bypass next-intl.

## Affected files (inventory, full set)

| File | Hardcoded literals |
|---|---|
| `app/[locale]/contact/page.tsx` | 12 |
| `app/[locale]/news/page.tsx` | 1 |
| `app/[locale]/doctors/page.tsx` | 3 |
| `app/[locale]/doctors/[slug]/page.tsx` | 5 |
| `app/[locale]/services/page.tsx` | 5 |
| `app/[locale]/services/[slug]/page.tsx` | 3 |
| `components/home/Hero.tsx` | 12 (4 slides × title/subtitle/cta) |
| `components/home/AboutSection.tsx` | 5 |
| `components/home/CTASection.tsx` | 2 |
| `components/home/Stats.tsx` | 4 (labels) + 1 suffix |
| `components/home/LatestNews.tsx` | 1 |
| `components/home/PopularServices.tsx` | 2 |
| `components/home/WhyChooseUs.tsx` | 15 (6 items + heading + sub + CTA) |
| `components/home/FeaturedDoctors.tsx` | 1 |
| `components/home/Reviews.tsx` | 1 |
| `components/shared/AppointmentButton.tsx` | 1 (default prop) |
| `components/shared/LanguageSwitcher.tsx` | 1 ('Русский' label) |
| `components/services/CategoryFilter.tsx` | 1 ('Все') |
| `components/services/ServiceCard.tsx` | 1 ('мин') |
| `lib/data/content.ts` | 15 (`workingHours` per doctor) |

## Architecture

**Keep:** `messages/{uz,ru,en}.json` already contain locale-keyed content
(309 leaves, identical shape across files). All three files are loaded by
next-intl based on the active locale.

**Add new top-level namespaces:**
- `contact` — headings, address, hours, map heading, consultation CTA copy
- `home.hero` — 4 slide records (title/subtitle/cta)
- `home.about` — heading + body paragraphs
- `home.cta` — heading + body
- `home.stats` — 4 stat labels + suffix
- `home.latestNews` — heading
- `home.popularServices` — heading
- `home.whyChooseUs` — 6 feature items + heading + sub + CTA
- `home.featuredDoctors` — heading
- `home.reviews` — heading
- `pages.news.title`, `pages.doctors.title`, `pages.services.{title,subtitle,allCategories,empty}`
- `doctors.detail.{experienceYears,education,achievements,bio,workingHours}` (section labels)
- `doctors.workingHours` — keyed by doctor slug, locale-specific hour string
- `services.detail.{price,duration,minutes}` and `services.minutes` short form
- `common.allFilter` — for "Все" / "All" / "Hammasi"
- `languageSwitcher.{ru,uz,en}` — language label localised in current locale (already present in `nav`? verify, else add)

**Doctor `workingHours` strategy:**
Remove `workingHours: string` from `Doctor` type and per-doctor records in
`lib/data/content.ts`. Move to `messages/*.json` under `doctors.<slug>.workingHours`
so each locale carries its own translation (Пн-Пт / Du-Ju / Mon-Fri).

## Tasks

### Task 1 — Extend messages/*.json with new keys
- Add new namespaces (`contact`, `home.hero`, `home.about`, `home.cta`, `home.stats`,
  `home.latestNews`, `home.popularServices`, `home.whyChooseUs`, `home.featuredDoctors`,
  `home.reviews`, `pages`, `doctorsDetail`, `servicesDetail`, `common.allFilter`) to all
  three message files with proper RU / UZ / EN translations.
- Append `workingHours` field to each doctor record in `messages/{uz,ru,en}.json`
  under `doctors.<slug>.workingHours`.
- **Verify:** `python3 -c "import json; [json.load(open(f)) for f in ('messages/uz.json','messages/ru.json','messages/en.json')]"` succeeds and all three files have the same key set.

### Task 2 — Refactor `lib/data/content.ts`
- Remove `workingHours: string` from `Doctor` interface.
- Remove `workingHours: '...'` from every doctor record (15 records, lines 398–496).
- **Verify:** `tsc --noEmit` (or `npm run build`) passes.

### Task 3 — Replace hardcoded strings in components
For each file in inventory:
- Add `useTranslations()` (client components) or `getTranslations()` (server components).
- Replace literal with `t('key')` call.
- For `Hero.tsx` slides: read array from `t.raw('home.hero.slides')`.
- For `WhyChooseUs.tsx` features: read array via `t.raw('home.whyChooseUs.items')`.
- For `Stats.tsx` STATS array: pull label from `t('home.stats.labels.<id>')` at render time, or use `t.raw('home.stats.items')`.
- For `LanguageSwitcher.tsx`: keep static `ru/uz/en` label map (it shows native names — not translated). Move 'Русский' literal to a constant.
- For `app/[locale]/doctors/[slug]/page.tsx`: read `workingHours` via `t('doctors.<slug>.workingHours')` (already in messages thanks to Task 1).
- **Verify:** `npm run lint` clean; `grep -rn -E '[А-Яа-яЁё]' --include="*.tsx" --include="*.ts" app/ components/ lib/` returns 0 results outside test files.

### Task 4 — Build + spot-check
- Run `npm run build` (or `next build`) and confirm no failures.
- Spot-check by reading 3 modified files to confirm `t()` calls match the keys added.

## Must-haves (verification)

1. `grep -rn -E '[А-Яа-яЁё]' --include="*.tsx" --include="*.ts" app/ components/ lib/` returns **0** matches.
2. All three `messages/*.json` files parse as valid JSON and have identical key sets.
3. `npm run build` exits 0.
4. No file imports `lib/data/content.ts`' removed `workingHours` field.

## Out of scope

- Re-translating existing content already in `messages/*.json` (it's correct).
- Refactoring how categories / departments / news / reviews are keyed — those are already locale-aware.
- Adding a 4th language.

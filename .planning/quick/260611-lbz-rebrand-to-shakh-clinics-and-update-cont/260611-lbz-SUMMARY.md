---
quick_id: 260611-lbz
title: Rebrand to "Shakh Clinics" and update contact email to shakh.clinic@mail.ru
status: complete
completed: 2026-06-11
commit: 4451f21
---

# Quick Task 260611-lbz: Summary

## One-liner

Replaced all brand-name variants with the unified "Shakh Clinics" Latin wordmark across all three locales, manifest, and contact page; updated contact email to shakh.clinic@mail.ru.

## Replacements per file

| File | Brand replacements | Email replacements | Total |
|------|-------------------|--------------------|-------|
| `messages/ru.json` | 39 | 1 | 40 |
| `messages/uz.json` | 45 | 1 | 46 |
| `messages/en.json` | 45 | 1 | 46 |
| `app/manifest.ts` | 2 | 0 | 2 |
| `app/[locale]/contact/page.tsx` | 1 | 2 | 3 |
| **Total** | **132** | **5** | **137** |

## Brand replacements breakdown (in execution order)

| Step | From | To | Files hit |
|------|------|----|-----------|
| 1 (first) | `Shakh Clinic` | `Shakh Clinics` | ru.json (5), uz.json (5), en.json (20), contact/page.tsx (1) |
| 2 | `ShaxKlinika` | `Shakh Clinics` | ru.json (24), uz.json (25), en.json (24), manifest.ts (1) |
| 3 | `ShakhClinic` | `Shakh Clinics` | en.json (1) |
| 4 | `ШахКлиника` (Cyrillic no space) | `Shakh Clinics` | ru.json (1) |
| 5 | `Shax Klinika` | `Shakh Clinics` | uz.json (15), manifest.ts (1) |
| 6 | `Шах Клиника` (Cyrillic with space) | `Shakh Clinics` | ru.json (9) |

## Verification results

- **Old brand variants gone**: PASS — `grep -rn "ShaxKlinika|ShakhClinic|Shax Klinika|ШахКлиника|Шах Клиника" messages app/manifest.ts app/[locale]/contact/page.tsx` returned no matches.
- **No singular `Shakh Clinic` remains**: PASS — `grep -rn "Shakh Clinic[^s]" messages app` returned no matches.
- **Clinicss guard**: PASS — `grep -rn "Clinicss" messages app` returned no matches. The ordering trap was avoided.
- **JSON validity**: PASS — `node -e "require('./messages/ru.json');require('./messages/uz.json');require('./messages/en.json')"` exited 0.
- **Old email gone**: PASS — `grep -rn "shaxklinika.uz|info@shaxklinika" app messages` returned no matches.
- **New email present**: 4 occurrences confirmed (`mailto:` href + visible text in contact page, + `seo.org.email` in ru/uz/en message files).

## Deviations from Plan

None — plan executed exactly as written. All replacements applied via a Node.js UTF-8 script (`split/join`) to avoid macOS `sed -i` encoding risk on Cyrillic tokens.

## Commit

`4451f21` — feat(brand): rebrand to "Shakh Clinics" and update contact email

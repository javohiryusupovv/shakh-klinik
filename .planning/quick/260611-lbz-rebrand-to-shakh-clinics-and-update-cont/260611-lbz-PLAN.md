---
quick_id: 260611-lbz
title: Rebrand to "Shakh Clinics" and update contact email to shakh.clinic@mail.ru
status: ready
created: 2026-06-11
mode: quick
---

# Quick Task 260611-lbz: Rebrand → "Shakh Clinics" + new email

## Goal

Unify the clinic's displayed brand name to **"Shakh Clinics"** across all
locales and update the contact email to **shakh.clinic@mail.ru**. This finishes
the production-domain transition (shakh-clinics.ru) so the brand wordmark,
`siteName` (which feeds Open Graph `og:site_name` on Telegram/Facebook/WhatsApp
previews), titles, legal name, and PWA manifest are all consistent.

Decisions (locked by user):
- Brand → `Shakh Clinics` (single Latin wordmark for ALL locales, including RU)
- Email → `shakh.clinic@mail.ru`

## Tasks

### Task 1 — Unify brand name to "Shakh Clinics"

- **files:** `messages/ru.json`, `messages/uz.json`, `messages/en.json`,
  `app/manifest.ts`, `app/[locale]/contact/page.tsx`
- **action:** Replace every brand variant with `Shakh Clinics`. **Apply in this
  exact order** — the singular `Shakh Clinic` rule MUST run first, otherwise
  later rules emit `Shakh Clinics` and the singular rule would corrupt it to
  `Shakh Clinicss`:
  1. `Shakh Clinic`  → `Shakh Clinics`   (run FIRST; also fixes "Shakh Clinic on Yandex Maps")
  2. `ShaxKlinika`   → `Shakh Clinics`
  3. `ShakhClinic`   → `Shakh Clinics`   (en shortName, no space)
  4. `ШахКлиника`    → `Shakh Clinics`   (ru shortName, Cyrillic no space)
  5. `Shax Klinika`  → `Shakh Clinics`
  6. `Шах Клиника`   → `Shakh Clinics`   (ru, Cyrillic with space)
  - Use a UTF-8-safe method (Edit tool, or a node script reading/writing with
    utf-8). Do NOT use macOS `sed -i` on the Cyrillic tokens — encoding risk.
  - manifest `name` and `short_name` both → `Shakh Clinics`.
  - Leave the `lib/data/content.ts` line-2 file header comment alone (internal
    code comment, not user-facing).
- **verify:**
  - `grep -rn "ShaxKlinika\|ShakhClinic\|Shax Klinika\|ШахКлиника\|Шах Клиника" messages app/manifest.ts app/[locale]/contact/page.tsx` → NO matches.
  - `grep -rn "Shakh Clinic\b" messages app` → NO matches (only the plural "Shakh Clinics" should remain).
  - `grep -rn "Clinicss" messages app` → NO matches (no double-s corruption).
  - All three message files remain valid JSON: `node -e "require('./messages/ru.json');require('./messages/uz.json');require('./messages/en.json')"` exits 0.
- **done:** Brand reads `Shakh Clinics` everywhere user-facing; JSON valid.

### Task 2 — Update contact email to shakh.clinic@mail.ru

- **files:** `app/[locale]/contact/page.tsx`, `messages/ru.json`,
  `messages/uz.json`, `messages/en.json`
- **action:** Replace `info@shaxklinika.uz` with `shakh.clinic@mail.ru`:
  - `contact/page.tsx:60` — both the `mailto:` href and the visible link text.
  - `email` field (line ~713) in all three message files.
- **verify:**
  - `grep -rn "shaxklinika.uz\|info@shaxklinika" app messages` → NO matches.
  - `grep -rn "shakh.clinic@mail.ru" app messages` → shows 4 occurrences (2 in contact page href+text, 3 json... = href+text counts as 2 lines? at minimum: contact page + 3 json).
- **done:** Email is `shakh.clinic@mail.ru` everywhere; `mailto:` updated.

## must_haves

**Truths:**
- Brand displays as `Shakh Clinics` in all locales and in OG `og:site_name`.
- Contact email is `shakh.clinic@mail.ru` site-wide.
- All three `messages/*.json` files parse as valid JSON.

**Artifacts:**
- `messages/{ru,uz,en}.json`, `app/manifest.ts`, `app/[locale]/contact/page.tsx` updated.

**Key links:**
- `messages/*.json` `seo.siteName` → consumed by `lib/seo/metadata.ts` → OG/Twitter cards.

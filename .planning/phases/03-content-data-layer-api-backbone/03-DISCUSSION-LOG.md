# Phase 3: Content Data Layer & API Backbone - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-25
**Phase:** 03-content-data-layer-api-backbone
**Areas discussed:** Content sourcing, File structure, Standard defaults (covers Telegram, images, rate-limit, doctor names, prices, reviews flow)

---

## Gray Area Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Kontent manbai | Who writes the 25+ services, 15 doctors, 12 articles, 20 reviews? | ✓ |
| Shifokorlar + narxlar | Fictional names + Tashkent UZS ranges or real clinic data? | (covered by standard defaults) |
| Telegram xabar formati | Plain text vs HTML formatted, required/optional fields | (covered by standard defaults) |
| Rasm strategiyasi | Unsplash placeholder vs pre-downloaded curated set vs no images | (covered by standard defaults) |

**User's choice:** Kontent manbai — and added critical scope note: "1 qismdek qilamiz va iloji bo'lsa bitta constants file ichida yozib quyaylik keyinchalik o'zgartirishga oson bo'lishi uchun" (let's do it as one piece and put it all in one constants file so it's easy to change later).

**Notes:** The "one constants file" preference reframed the data-structure question and was treated as a primary constraint, so a separate gray-area discussion wasn't needed for it.

---

## Content Sourcing

| Option | Description | Selected |
|--------|-------------|----------|
| Claude — hammasi | Claude generates all content in 3 languages at real Tashkent clinic standard | ✓ |
| Hybrid: struktura + real ma'lumot | Claude builds structure + sample content, user replaces with real data later | |
| Faqat RU, keyin tarjima | Claude writes RU first, UZ/EN comes in a later pass | |

**User's choice:** "Claude — hammasi" (recommended)
**Notes:** All three locales ship together so UAT is meaningful in any language. User retains right to swap any field for real clinic data later by editing the single content file.

---

## File Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Bitta /lib/data/content.ts | All data in one named-exports file (~800-1200 lines) — easiest to edit | ✓ |
| Per-domain fayllar + index | services.ts/doctors.ts/news.ts/reviews.ts + index.ts re-export | |
| Messages JSON ichida hammasi | Data lives entirely in messages JSON, no TS structure | |

**User's choice:** "Bitta /lib/data/content.ts fayl" (recommended, aligns with their stated preference)
**Notes:** TypeScript safety preserved; numeric/structural fields stay in TS while translatable strings stay in `messages/*.json` keyed by slug. Splitting between TS and JSON is non-negotiable per next-intl pattern from Phase 1.

---

## Standard Defaults (Bulk Acceptance)

| Option | Description | Selected |
|--------|-------------|----------|
| Standart yondashuv | Fictional UZ/RU doctor names, Tashkent UZS ranges, HTML Telegram with bold labels and emoji headers, Unsplash images per Phase 1 config, in-memory rate limit, "PENDING MODERATION" Telegram-only review flow with manual moderation | ✓ |
| Mening qarorim boshqacha | User wants to override one or more defaults | |

**User's choice:** "Ha, hammasini Claude qaror qilsin"
**Notes:** Bulk-accepted; covered Telegram message format, image strategy, rate-limit storage, doctor name conventions, pricing approach, and review submission flow in a single confirmation. All locked as decisions D-08..D-19 in CONTEXT.md.

---

## Claude's Discretion

- Specific UZS price values per service (within realistic Tashkent private-clinic range)
- Doctor experience years and education institutions (realistic Uzbekistan medical universities like ТашМИ, СамГМУ)
- News article topics, dates within last 6 months, author attribution
- Reviewer names (mix of common Uzbek and Russian first/last names)
- Telegram emoji choices and exact line ordering within messages
- Service category icons and slug strings

## Deferred Ideas

- Real clinic data replacement post-launch (user edits content.ts)
- Distributed rate limiting (Vercel KV / Upstash Redis)
- Review moderation admin UI
- Multi-photo galleries per service/doctor
- Translation QA / linguist review pass
- Email fallback for Telegram outage

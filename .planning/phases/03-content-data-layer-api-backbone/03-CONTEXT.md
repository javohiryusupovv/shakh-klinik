# Phase 3: Content Data Layer & API Backbone - Context

**Gathered:** 2026-04-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Populate every static data source (services, doctors, news, reviews) with realistic 3-language content, ship the three POST API routes (`/api/appointment`, `/api/contact`, `/api/review`) that validate with Zod, rate-limit at 5 req/min, and deliver formatted HTML messages to the configured Telegram chat. Wire the existing `AppointmentModalProvider` so any section can open the modal pre-filled with service/doctor context. No marketing pages are built here — Phase 4 assembles them from this content.

</domain>

<decisions>
## Implementation Decisions

### Content sourcing
- **D-01:** Claude generates 100% of the realistic content in all three locales (RU/UZ/EN) — service descriptions, doctor bios, news articles, reviews, FAQ. No placeholders, no Lorem. The user can replace any field with real clinic data later by editing the single content file.
- **D-02:** Doctor names follow Uzbek/Russian conventions (e.g., `Каримов Шерзод Алишерович`, `Юлдашева Дилноза Бахтиёровна`). Specialties cover the 13 categories listed in TZ.
- **D-03:** Pricing uses realistic Tashkent private-clinic UZS ranges (`priceMin` / `priceMax`). User can replace with real prices later.
- **D-04:** No pre-launch translation review pass — RU/UZ/EN ship together so UAT in any locale is meaningful.

### File structure (single-file-first)
- **D-05:** All four data domains live in **one file**: `lib/data/content.ts` with named exports (`SERVICES`, `DOCTORS`, `NEWS`, `REVIEWS`) plus `CATEGORIES` and `DEPARTMENTS` lookup arrays. User explicitly requested consolidation for ease of editing later.
- **D-06:** Type definitions live alongside the data in the same file (`Service`, `Doctor`, `NewsArticle`, `Review`) so a single open-and-edit gives the full data surface.
- **D-07:** Translatable strings (name, description, bio, body, review text, FAQ Q/A) live in `messages/{ru,uz,en}.json` keyed by slug. Numeric/structural fields (slug, category, price, date, image query) live in `content.ts`. This split is non-negotiable per next-intl pattern established in Phase 1.

### Telegram delivery
- **D-08:** `lib/telegram.ts` starts with `import 'server-only'` (PITFALLS §4 — token must never reach client bundle).
- **D-09:** Messages use Telegram `parse_mode=HTML` with bold field labels (`<b>Имя:</b> ...`), one field per line, emoji headers per route type (📅 appointment, 📞 contact, ⭐ review). RU labels in the Telegram message regardless of submission locale (clinic staff reads RU).
- **D-10:** The submitted form's locale is included in the message (`<b>Locale:</b> ru`) so staff can call back in the right language.
- **D-11:** Reviews include a `🛑 PENDING MODERATION` prefix per RVW spec. Submitted reviews are NOT auto-published to the site — they only land in Telegram. Staff manually copy approved reviews into `content.ts`.

### Validation & API contract
- **D-12:** `lib/validations.ts` exports Zod schemas shared between client (RHF resolver) and server routes — single source of truth. Phone regex enforces `+998 XX XXX-XX-XX`.
- **D-13:** All three routes return `{ success: true }` (200) on success, `{ error: string, fieldErrors: Record<string, string[]> }` (422) on validation fail, `{ error: 'rate_limited' }` (429) when over limit, `{ error: 'telegram_failed' }` (502) when Telegram delivery fails.
- **D-14:** Form error messages display per-locale via `messages/*.json` (`form.errors.*` namespace). Server returns Zod issue codes; client maps to translated strings.

### Rate limiting
- **D-15:** `lib/rateLimit.ts` is an in-memory `Map<ip, timestamps[]>` keyed by `X-Forwarded-For` (fallback `request.ip`), 5 req per 60 s sliding window. Single-instance limitation accepted for v1 — Vercel's serverless cold-starts may reset the map; this is a known tradeoff documented in code, not blocked.

### AppointmentModal wiring
- **D-16:** Phase 2's shell is replaced (not refactored) — the `AppointmentModal` body becomes a real RHF form with Zod resolver, submitting to `/api/appointment`. The provider context already exists and supports `prefill: { serviceSlug?, doctorSlug? }`. This phase implements the modal body, success state, error state, and field-level error display.
- **D-17:** Modal mounts the dialog at the page level (already done via `AppointmentModalProvider` in `app/[locale]/layout.tsx`). All section CTAs use the existing `BookCTAButton` from Phase 2.

### Image strategy
- **D-18:** Continue with Unsplash via `imageQuery` field on data records. Phase 1 already configured `remotePatterns` for `source.unsplash.com`, `images.unsplash.com`, `*.unsplash.com` (PITFALLS §3). Any image rendering happens in Phase 4 — Phase 3 just stores the query strings.

### FAQ (HOME-09)
- **D-19:** 6-8 FAQ entries live in `messages/{ru,uz,en}.json` under `home.faq.items[]` (each entry: `q`, `a`). Topics: booking, insurance, consultation length, referrals, pediatric care, payment, working hours, emergency. Phase 4 renders the accordion.

### Claude's Discretion
- Specific prices per service (real Tashkent market range)
- Specific doctor experience years and education institutions (realistic Uzbekistan medical universities)
- Article topics and dates within the last 6 months
- Review reviewer names (mix of Uzbek/Russian common names)
- Telegram emoji choices and exact message line ordering
- Service category icons and slugs

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project specs
- `.planning/PROJECT.md` — Vision, "no Lorem" constraint, Telegram-only submission decision, static TS data files (no CMS) decision
- `.planning/REQUIREMENTS.md` — All Phase 3 requirements (SRV-01..02, DOC-01..02, NWS-01..02, RVW-01..02, HOME-09, API-01..07, LAY-05) with acceptance criteria
- `.planning/ROADMAP.md` §"Phase 3: Content Data Layer & API Backbone" — Goal, success criteria, dependency on Phase 2

### Pitfalls (Next.js 16 + Tailwind 4 environment)
- `.planning/research/PITFALLS.md` §1 (proxy.ts) — already handled in Phase 1, reference for routing
- `.planning/research/PITFALLS.md` §3 (Unsplash redirects) — affects image queries stored in `content.ts`
- `.planning/research/PITFALLS.md` §4 (TELEGRAM_BOT_TOKEN leak) — `import 'server-only'` mandatory in `lib/telegram.ts`

### Prior phase context
- `.planning/phases/01-foundation-i18n-scaffold/01-CONTEXT.md` — next-intl v4 message JSON pattern, `proxy.ts` locale routing, env var conventions
- `.planning/phases/01-foundation-i18n-scaffold/01-01-SUMMARY.md` — files shipped in Phase 1
- `.planning/phases/02-design-system-shared-ui/02-CONTEXT.md` — Glass utility, design tokens, modal/provider architecture
- `.planning/phases/02-design-system-shared-ui/02-01-SUMMARY.md` — `AppointmentModalProvider` and `AppointmentModal` shell already in place; Phase 3 replaces the shell body

### Project conventions
- `CLAUDE.md` and `AGENTS.md` — Next.js 16 breaking changes (async params, no tailwind.config.ts, motion not framer-motion); GSD workflow enforcement
- `node_modules/next/dist/docs/` — Authoritative Next.js 16 API for route handlers (POST handler signature, Request/Response types)
- `node_modules/next-intl/dist/` — next-intl v4 server-side translation API (`getTranslations`, message JSON structure)
- `node_modules/zod/lib/` — Zod schema definition and error format for `fieldErrors` shape

### Environment
- `.env.local` (gitignored) — `TELEGRAM_BOT_TOKEN=8789149068:...`, `TELEGRAM_CHAT_ID=1019151252` already configured. Bot identity: `@shax_klinika_bot`. Test message verified end-to-end on 2026-04-25.
- `.env.example` — Public template; no secrets. Update only if new env vars introduced.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `components/shared/AppointmentModal.tsx` — Phase 2 shell using shadcn `Dialog` with `glass` class. Body is a `<p>` placeholder that this phase replaces with a real RHF form.
- `components/shared/AppointmentModalProvider.tsx` — Already wraps the locale layout, exposes `useAppointmentModal()` returning `{ open, close, prefill }`. Prefill type already supports `serviceSlug`/`doctorSlug` — no changes needed.
- `components/shared/BookCTAButton.tsx` — Already calls `open()`. Phase 4 sections will use it; this phase doesn't touch it unless prefill semantics change.
- `components/ui/{button,dialog,input,textarea,select}.tsx` — shadcn primitives ready for the form.
- `lib/utils.ts` — `cn()` helper.
- `messages/{ru,uz,en}.json` — Existing namespaces: `home`, `nav`, `header`, `footer`, `cookies`, `notFound`, `meta`, `common`. Phase 3 adds: `services`, `doctors`, `news`, `reviews`, `home.faq`, `appointment`, `contact`, `review`, `form.errors`.
- `i18n/navigation.ts` (created in Phase 2) — typed locale-aware Link, used by any UI that links to dynamic content.

### Established Patterns
- All translatable strings live in `messages/*.json` keyed by feature namespace; component code uses `useTranslations(namespace)` (RSC: `getTranslations`).
- Server-only modules use `import 'server-only'` at top (no current example yet — `lib/telegram.ts` will be first).
- Tailwind 4 CSS-first; no `tailwind.config.ts`. Design tokens in `app/globals.css` `@theme`.
- Files use named exports preferentially; default exports only for Next.js page/layout/route conventions.

### Integration Points
- **App router POST handlers**: `app/api/{appointment,contact,review}/route.ts` — must export async `POST(request: Request)`, return `Response.json(...)`. Next.js 16 keeps this contract from prior versions but request/cookies/headers now async.
- **AppointmentModal body replacement**: Edit `components/shared/AppointmentModal.tsx` — keep the dialog wrapper, replace `<p>` with the form. The `prefill` prop already exists on the component.
- **Provider mount**: Already in `app/[locale]/layout.tsx` (Phase 2). No changes needed.
- **Service/Doctor select dropdowns** in modal: import `SERVICES`/`DOCTORS` from `lib/data/content.ts`; show translated `name` via `useTranslations('services')`.

</code_context>

<specifics>
## Specific Ideas

- User explicitly preferred a **single consolidated content file** over per-domain modules: "1 qismdek qilamiz va iloji bo'lsa bitta constants file ichida yozib quyaylik keyinchalik o'zgartirishga oson bo'lishi uchun" → drives D-05/D-06.
- User signaled this should ship as **one cohesive plan/wave** ("1 qismdek qilamiz" = "let's do it as one piece"), not split across multiple plans. Planner should aim for a single 03-01-PLAN.md covering content + API + modal body.
- Telegram setup is **live and verified** — bot token, chat ID, end-to-end test message confirmed on 2026-04-25. No additional infrastructure work needed; Phase 3 just calls `sendMessage`.

</specifics>

<deferred>
## Deferred Ideas

- **Real clinic content replacement** — User will swap fictional doctor/price data with real clinic info post-launch by editing `lib/data/content.ts` directly. Out of Phase 3 scope.
- **Distributed rate limiting (Vercel KV / Upstash Redis)** — In-memory map accepted for v1; upgrade if traffic grows. Backlog candidate.
- **Review moderation UI** — No admin panel; reviews flow through Telegram for manual triage. Future milestone if needed.
- **Multi-photo galleries per service/doctor** — Single image query field for v1. Gallery is its own page (Phase 4).
- **Translation QA pass / linguist review** — Claude generates all three locales; user does post-launch review if needed. Not blocking Phase 3.
- **Email fallback for Telegram outage** — Currently a 502 error if Telegram is down. Add later if reliability becomes a concern.

</deferred>

---

*Phase: 03-content-data-layer-api-backbone*
*Context gathered: 2026-04-25*

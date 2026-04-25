---
phase: 3
slug: content-data-layer-api-backbone
status: draft
shadcn_initialized: true
preset: base-nova (style) · neutral (baseColor) · CSS variables · base-ui primitives · lucide icons
created: 2026-04-25
---

# Phase 3 — UI Design Contract

> Visual and interaction contract for the Phase 3 UI surface: the **Appointment Modal form body**. Phase 3 is otherwise content/API only; the modal body is the single new component executor will ship. All design tokens, the `glass` utility, the Dialog shell, shadcn primitives (Input, Select, Button, Textarea), the Provider/`useAppointmentModal` context, the `BookCTAButton`, and the `prefers-reduced-motion` fallback already exist from Phase 2 and are NOT redesigned here.

---

## Scope Statement

**In scope (single component surface):**
- `components/shared/AppointmentForm.tsx` — new client component containing the React Hook Form + Zod-resolver form rendered inside the existing Dialog body in `AppointmentModal.tsx`.
- The form's interaction states: idle, focused, submitting, success, error (general + per-field).
- Translations (RU/UZ/EN) for the new `appointment` and `form.errors` namespaces in `messages/{ru,uz,en}.json`.

**Explicitly out of scope (already locked or owned by other phases):**
- The Dialog wrapper / `glass` class on the modal — Phase 2 (D-19, D-03).
- `AppointmentModalProvider` and `useAppointmentModal()` shape — Phase 2 (locked).
- `BookCTAButton` — Phase 2.
- `lib/validations.ts` Zod schema rules — Phase 3 backend (CONTEXT D-12, single source of truth for what the form validates).
- Telegram message format — Phase 3 backend (CONTEXT D-09).
- `lib/data/content.ts` SERVICES/DOCTORS shape — Phase 3 data layer (D-05/D-06).
- Marketing pages, contact form, review form pages — Phase 4.
- Page-transition / scroll-reveal animations — Phase 5.

**No new design tokens are introduced. No new utilities are added to `globals.css`.**

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn (initialized in Phase 2) |
| Preset | `style: base-nova` · `baseColor: neutral` · `cssVariables: true` (from `components.json`) |
| Component library | `@base-ui/react` primitives (Input, Select) wrapped by shadcn `components/ui/*` |
| Icon library | lucide-react (already a dependency, used by existing shadcn components) |
| Font | `--font-sans` = Inter (body, labels, inputs) · `--font-heading` = PT Sans (DialogTitle only — already wired by Phase 2 via `h1..h6` selector; the form body itself uses Inter) |
| Form library | `react-hook-form` v7 + `@hookform/resolvers/zod` (planner installs in Phase 3) |
| Date input | Native `<input type="date">` wrapped with shadcn `Input` styling; `min={today}` to forbid past dates. No third-party date picker — keeps bundle small and matches CONTEXT scope ("UI surface intentionally minimal") |
| Phone input | Native `<input type="tel">` with `inputMode="tel"`, controlled-mask formatter (`+998 XX XXX-XX-XX`) implemented inline; no third-party mask library |

---

## Spacing Scale

The form reuses Phase 2 spacing — no exceptions for this phase.

| Token | Value | Usage in this phase |
|-------|-------|---------------------|
| xs | 4px | Gap between label and field error message |
| sm | 8px | Vertical gap between label and input (label row → control row) |
| md | 16px | Vertical gap between adjacent form fields (field group → field group) |
| lg | 24px | Top padding under DialogHeader before first field; bottom padding above submit button |
| xl | 32px | Reserved for success-state vertical centering inside Dialog body |
| 2xl | 48px | Not used in this phase |
| 3xl | 64px | Not used in this phase |

**Touch target minimum:** all inputs and the submit button are ≥ 44px tall on mobile (shadcn `Input` ships at `h-8 = 32px` which fails this — executor MUST override with `h-11 md:h-10` on form inputs to meet WCAG 2.5.5 / iOS HIG 44px).

**Form layout:** single column on all viewports; full-width controls; submit button full-width on mobile (`w-full md:w-auto md:self-end`).

---

## Typography

3 sizes, 2 weights — strictly inside the form body. DialogTitle styling is owned by Phase 2 and not respecified here.

| Role | Size | Weight | Line Height | Token / utility |
|------|------|--------|-------------|-----------------|
| Field label | 14px | 600 (semibold) | 1.4 | `text-sm font-semibold` |
| Field input text + select value + body copy (success message, helper) | 16px | 400 (regular) | 1.5 | `text-base` |
| Field error message + submit-disabled hint | 13px | 400 | 1.4 | `text-[13px]` (one-off — Tailwind `text-xs=12px` is too small for medical-context error legibility) |

**Why 13px for errors:** Tailwind's `text-xs` (12px) fails WCAG-recommended 14px minimum for body text; 13px is the smallest size that retains scannability against the glass background while staying visually subordinate to the 14px label. This is the only typography exception to the 14/16 scale.

**Font family:** all form text uses `--font-sans` (Inter). PT Sans is reserved for headings and is already applied to `DialogTitle` by the global `h1..h6` selector — do not re-apply.

---

## Color

The form reuses Phase 2's color split — no new tokens. The 60/30/10 mapping below is for the **modal body specifically** (the modal sits on top of the page-level gradient, so percentages reset inside the dialog).

| Role | Value | Usage in this phase |
|------|-------|---------------------|
| Dominant (60%) | `rgba(255,255,255,0.25)` (the `glass` background of the Dialog itself) — fallback `rgba(255,255,255,0.9)` under reduced-motion | Modal surface; no additional surface inside |
| Secondary (30%) | `var(--color-text-dark)` `#1F2937` (label text) and `var(--color-text-gray)` `#6B7280` (helper text, placeholder, optional-field marker) | All static text |
| Accent (10%) | Gradient `from-[var(--color-primary)] to-[var(--color-primary-deep)]` (`#4A9EE7 → #2B7FCC`) | **Reserved for: submit button only.** Plus focus-ring `focus-visible:ring-[var(--color-primary)]/50` on inputs/select. No other accent surfaces, badges, or icons. |
| Success | `var(--color-mint)` `#A8E6CF` background tint at 30% opacity (`bg-[var(--color-mint)]/30`) + `var(--color-text-dark)` text + `text-[var(--color-primary-deeper)]` (`#1A5A94`) for the checkmark icon | Success-state confirmation panel only |
| Destructive | shadcn `--destructive` token (`oklch(0.577 0.245 27.325)` ≈ `#dc2626`) — already wired on `Input` via `aria-invalid:border-destructive` | Field error border, error message text, general error banner background tint |

**Accent reserved for (explicit list):**
1. Submit button background gradient
2. Input/Select focus ring (50% opacity)
3. Loading spinner color during submit

**Never use accent for:** field borders (idle), labels, helper text, dialog backdrop, success state.

**Contrast verification (WCAG AA on glass surface):**
- `#1F2937` label text on `rgba(255,255,255,0.25)` glass over white-gradient page: ≥ 12:1 ✓
- `#6B7280` helper text: ≥ 4.5:1 only at 16px+ — therefore helper text is `text-base` (16px), NOT `text-sm` (14px). This is enforced in the typography table above.
- White text on submit button gradient `#4A9EE7→#2B7FCC`: ≥ 4.5:1 ✓ (verified for the deeper end which is the contrast-limiting stop)

---

## Copywriting Contract

All visible strings live in `messages/{ru,uz,en}.json` under two new namespaces: `appointment` (form-specific copy) and `form.errors` (Zod-issue-code → translated string mapping, also reused by the Phase 4 contact + review forms — naming it `form.errors` not `appointment.errors` is intentional cross-phase prep per CONTEXT D-14).

### `appointment` namespace (RU is canonical; UZ + EN mirror keys 1:1)

| Key | RU (canonical) | UZ | EN |
|-----|----------------|----|----|
| `title` | Запись на прием | Qabulga yozilish | Book an appointment |
| `subtitle` | Заполните форму — мы перезвоним в течение 15 минут | Formani to'ldiring — 15 daqiqa ichida qayta qo'ng'iroq qilamiz | Fill out the form — we'll call you back within 15 minutes |
| `fields.name.label` | Ваше имя | Ismingiz | Your name |
| `fields.name.placeholder` | Шерзод Каримов | Sherzod Karimov | Sherzod Karimov |
| `fields.phone.label` | Телефон | Telefon | Phone |
| `fields.phone.placeholder` | +998 90 123-45-67 | +998 90 123-45-67 | +998 90 123-45-67 |
| `fields.phone.helper` | Формат: +998 XX XXX-XX-XX | Format: +998 XX XXX-XX-XX | Format: +998 XX XXX-XX-XX |
| `fields.service.label` | Услуга | Xizmat | Service |
| `fields.service.placeholder` | Выберите услугу | Xizmatni tanlang | Select a service |
| `fields.doctor.label` | Врач (необязательно) | Shifokor (ixtiyoriy) | Doctor (optional) |
| `fields.doctor.placeholder` | Любой свободный | Bo'sh bo'lgan har qanday | Any available |
| `fields.date.label` | Желаемая дата | Istalgan sana | Preferred date |
| `fields.date.helper` | Можно выбрать сегодня или позже | Bugun yoki keyinroq tanlash mumkin | Today or later |
| `submit.idle` | Записаться | Yozilish | Book now |
| `submit.submitting` | Отправляем… | Yuborilmoqda… | Submitting… |
| `success.heading` | Заявка принята | Ariza qabul qilindi | Request received |
| `success.body` | Мы свяжемся с вами в течение 15 минут на указанный номер. Окно закроется автоматически. | 15 daqiqa ichida ko'rsatilgan raqam orqali siz bilan bog'lanamiz. Oyna avtomatik yopiladi. | We'll call you within 15 minutes on the number you provided. This window will close automatically. |
| `success.closeNow` | Закрыть | Yopish | Close |
| `errors.general` | Не удалось отправить заявку. Проверьте подключение и попробуйте ещё раз. | Arizani yuborib bo'lmadi. Internetni tekshirib, qayta urinib ko'ring. | We couldn't submit your request. Check your connection and try again. |
| `errors.rateLimited` | Слишком много попыток. Подождите минуту и попробуйте снова. | Juda ko'p urinish. Bir daqiqa kuting va qayta urinib ko'ring. | Too many attempts. Please wait a minute and try again. |
| `errors.telegramDown` | Сервис временно недоступен. Позвоните нам по телефону +998 90 123-45-67. | Xizmat vaqtincha mavjud emas. Bizga +998 90 123-45-67 raqami orqali qo'ng'iroq qiling. | Service temporarily unavailable. Please call us at +998 90 123-45-67. |

### `form.errors` namespace (Zod issue codes → strings, shared with Phase 4 forms)

| Key | RU | UZ | EN |
|-----|----|----|----|
| `required` | Обязательное поле | Majburiy maydon | This field is required |
| `name.tooShort` | Имя должно содержать минимум 2 символа | Ism kamida 2 ta belgidan iborat bo'lishi kerak | Name must be at least 2 characters |
| `name.tooLong` | Имя слишком длинное | Ism juda uzun | Name is too long |
| `phone.invalid` | Введите номер в формате +998 XX XXX-XX-XX | +998 XX XXX-XX-XX formatida raqam kiriting | Enter a number in the format +998 XX XXX-XX-XX |
| `service.required` | Выберите услугу из списка | Ro'yxatdan xizmatni tanlang | Please select a service |
| `date.invalid` | Выберите корректную дату | To'g'ri sana tanlang | Please select a valid date |
| `date.past` | Дата не может быть в прошлом | Sana o'tmishda bo'lishi mumkin emas | Date cannot be in the past |

### Top-of-template summary (required by template)

| Element | Copy (RU canonical) |
|---------|---------------------|
| Primary CTA | `appointment.submit.idle` → "Записаться" (verb + implicit noun "appointment"). Active state cycles to `submit.submitting` while in flight. |
| Empty state heading | N/A — the form is the empty state; no list/grid component appears. |
| Empty state body | N/A. |
| Error state | General banner pulls from `appointment.errors.general` / `errors.rateLimited` / `errors.telegramDown` based on response shape (see Server Error Mapping below). Per-field errors pull from `form.errors.*`. |
| Destructive confirmation | None — no destructive actions in this phase. The Dialog's built-in close (X / Esc / backdrop) does not require confirmation: the form is short, low-friction, and the user can re-open at any time. |

---

## Component Inventory

The single component shipped is `AppointmentForm`. Below is its complete state and field contract. The planner uses this to write executor tasks; the executor implements without re-asking design questions.

### Component: `<AppointmentForm prefill={...} onSuccess={...} />`

**File:** `components/shared/AppointmentForm.tsx`
**Mounts inside:** `components/shared/AppointmentModal.tsx` (replaces the placeholder `<p>` on line 22-24).
**Client component:** yes (`'use client'` — uses RHF, `useState`, `useTransition`).

### Field Inventory (in tab order)

| # | Field | Control | Required | Validation source | Width | Notes |
|---|-------|---------|----------|-------------------|-------|-------|
| 1 | Name | shadcn `Input` (`type="text"`, `autoComplete="name"`) | yes | `appointmentSchema.name` (Zod, lib/validations.ts) | full | `autoFocus` on mount unless `prefill` exists, in which case focus the first un-prefilled field |
| 2 | Phone | shadcn `Input` (`type="tel"`, `inputMode="tel"`, `autoComplete="tel"`) | yes | `appointmentSchema.phone` regex `+998 XX XXX-XX-XX` | full | Live mask on input (`onChange` formats digits → masked string); helper text under field |
| 3 | Service | shadcn `Select` populated from `SERVICES` (lib/data/content.ts) — labels via `useTranslations('services')` keyed by slug | yes | `appointmentSchema.serviceSlug` | full | Pre-selected if `prefill.serviceSlug` matches; max-height 240px scroll for 25+ items |
| 4 | Doctor | shadcn `Select` populated from `DOCTORS` — labels via `useTranslations('doctors')` keyed by slug. First option: "Любой свободный" (translated, value=`""`) | no | `appointmentSchema.doctorSlug.optional()` | full | Pre-selected if `prefill.doctorSlug` matches |
| 5 | Date | native `<input type="date">` styled with shadcn `Input` className | yes | `appointmentSchema.preferredDate` (ISO date, ≥ today) | full | `min={new Date().toISOString().slice(0,10)}` |
| 6 | Submit | shadcn `Button` (custom gradient — see Color section) | — | — | full mobile, auto desktop right-aligned | Disabled while RHF `isSubmitting` OR form is invalid AFTER first submit attempt (not before — see Validation UX below) |

### State Machine

The form is a 4-state machine. Only one state is rendered at a time inside the Dialog body.

```
idle ──submit──> submitting ──200──> success ──(3s timer or close click)──> [Dialog closes; on next open, resets to idle]
                              │
                              ├──422──> idle (with fieldErrors painted)
                              ├──429──> idle (with general banner: errors.rateLimited)
                              └──502/network──> idle (with general banner: errors.telegramDown or errors.general)
```

| State | Visible UI | Allowed user actions |
|-------|------------|----------------------|
| **idle** | All 5 fields + submit button. If returning from a failed submit, fields retain values; a general error banner shows above the first field; per-field errors show below their field. | Type in fields, change selects, click submit, close dialog |
| **submitting** | All 5 fields are `readOnly` and visually dimmed (`opacity-60 pointer-events-none`); submit button shows `appointment.submit.submitting` text + spinner; button stays full-width, no width jump | Click cancel/close (cancels in-flight request via `AbortController`) |
| **success** | Form is unmounted and replaced by a centered confirmation panel: a `bg-[var(--color-mint)]/30` rounded-2xl box (16px padding, 12px gap between elements), containing a `<CheckCircle2>` lucide icon (size-12, `text-[var(--color-primary-deeper)]`), an h3 with `appointment.success.heading` (text-xl, font-semibold), a paragraph with `appointment.success.body` (text-base, color `--color-text-dark`), and a ghost `Button` with `appointment.success.closeNow`. A 3-second timer (cleared on unmount) calls `onClose()`. | Click "Закрыть" to dismiss immediately, or wait for the 3s auto-close, or close via X/Esc/backdrop |
| **error (within idle)** | Same as idle, plus a destructive-tinted banner (`bg-destructive/10 border border-destructive/30 text-destructive` rounded-md, 12px padding) above the first field showing the localized message | Same as idle |

### Server Error Mapping (HTTP → UI)

This mapping is fixed and the executor must implement exactly this branching. Aligns with CONTEXT D-13.

| HTTP status | Response shape | UI behavior |
|-------------|----------------|-------------|
| 200 | `{ success: true }` | Transition to `success` state; start 3s auto-close timer |
| 422 | `{ error: 'validation_failed', fieldErrors: { fieldName: [issueCode, ...] } }` | Stay in `idle`; for each entry in `fieldErrors`, call `form.setError(fieldName, { message: t('form.errors.' + issueCode[0]) })`; do NOT show general banner |
| 429 | `{ error: 'rate_limited' }` | Stay in `idle`; show general banner with `appointment.errors.rateLimited` |
| 502 | `{ error: 'telegram_failed' }` | Stay in `idle`; show general banner with `appointment.errors.telegramDown` |
| network error / fetch reject / non-JSON | — | Stay in `idle`; show general banner with `appointment.errors.general` |

### Validation UX (RHF mode)

- **Mode:** `mode: 'onTouched'` — validate a field on first blur, then re-validate on every change. This avoids the hostile "every field is red the moment you open the modal" anti-pattern while still giving fast feedback once a user has interacted.
- **Submit attempt:** `revalidate on submit`. After first submit attempt, switch to `mode: 'onChange'` for that session (achieved via `reValidateMode: 'onChange'`).
- **Disable submit button:** only after a failed submit attempt while form is still invalid. Before first submit, button is enabled — clicking it triggers full validation and surfaces all errors at once.
- **Server-returned `fieldErrors`** override client validation messages until the user edits that field again.

### Loading Spinner

- Lucide `<Loader2 className="size-4 animate-spin" />` placed inside the submit button, 8px to the left of the button label.
- The `animate-spin` Tailwind utility is automatically neutralized by the existing `prefers-reduced-motion` block in `globals.css` (line 51-55: `* { animation-duration: 0.01ms !important }`). Verify this is sufficient — if the spinner appears static-yet-visible under reduced motion, swap to a static `<Loader2>` icon (no animation) inside a `useReducedMotion` conditional.

### Prefill Behavior (CONTEXT D-16, D-17)

When `prefill={ serviceSlug, doctorSlug }` is provided by `useAppointmentModal()`:
- The matching `<SelectItem>` is set as the form's `defaultValues.serviceSlug` / `defaultValues.doctorSlug`.
- A small `text-[var(--color-text-gray)] text-sm` line below the DialogTitle reads (translated): "Запись к: {doctorName}" or "Услуга: {serviceName}" so the user understands the context they arrived with. Translation key: `appointment.prefillNotice.service` and `appointment.prefillNotice.doctor` (both take ICU `{name}` arg).

---

## Accessibility Contract

Mandatory and verifiable. The auditor will check these explicitly.

| Concern | Implementation |
|---------|---------------|
| Focus trap | Inherited from shadcn `Dialog` (Phase 2). No additional work. |
| Initial focus | First non-prefilled required field. RHF `setFocus()` in a `useEffect` after mount. |
| Tab order | DOM order matches visual order: name → phone → service trigger → doctor trigger → date → submit → (Dialog close X is last via `tabIndex` already handled by Radix/base-ui). |
| Esc closes | Inherited from Dialog. Verify it ALSO aborts an in-flight submit (via `AbortController`), not just hides the modal. |
| `aria-invalid` | Set on every input where RHF reports an error. shadcn `Input` already styles `aria-invalid:border-destructive` (see `components/ui/input.tsx` line 12). |
| `aria-describedby` | Each input with an error has `aria-describedby="{fieldId}-error"`; the error `<p>` has matching `id`. Each input with helper text similarly references `{fieldId}-helper`. |
| Required marker | Visible asterisk `*` in `text-destructive` after the label text, plus `aria-required="true"` on the input. Not relying on color alone. |
| Phone `inputMode` | `inputMode="tel"` triggers numeric keyboard on iOS/Android. |
| Date `min` attribute | Native validation prevents picking past dates as a defense-in-depth even if Zod also rejects them. |
| Error announcement | General error banner has `role="alert" aria-live="polite"` so screen readers announce 422/429/502 responses. |
| Success announcement | Success heading wrapped in `role="status" aria-live="polite"`. |
| Loading state | Submit button gets `aria-busy="true"` while submitting; `aria-disabled="true"` while disabled. |
| Color contrast | All text combinations enumerated in the Color section meet WCAG AA. |
| Touch target | All controls ≥ 44px tall on viewports < 768px (shadcn's default `h-8` is overridden as documented in Spacing). |

---

## Motion & Reduced Motion

Phase 3 introduces no new motion. Existing motion sources:
1. shadcn Dialog open/close transition (already managed by base-ui, already neutralized by `globals.css` line 41-56 under `prefers-reduced-motion`).
2. Submit button spinner (Tailwind `animate-spin`, neutralized by line 51-55 catch-all).
3. Success state mount — render directly with no `motion` wrapper. If a planner suggests adding a `<Reveal>` or `motion.div` here, push back: the success state is short-lived and any added motion competes with the auto-close timer for user attention.

No `motion/react` imports in `AppointmentForm.tsx`. This is a content-heavy phase; animation polish is Phase 5.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | Already-installed `Button`, `Dialog`, `Input`, `Select` (Phase 2 — `components/ui/*`) | not required (vetted in Phase 2) |
| third-party registries | none | not applicable |

**No new shadcn `add` commands required for Phase 3 UI.** Planner installs npm packages only: `react-hook-form`, `@hookform/resolvers`, `zod` (zod likely already present — planner verifies before installing).

---

## Component-to-Requirement Traceability

| Requirement | Where addressed in this UI-SPEC |
|-------------|--------------------------------|
| LAY-05 (Appointment modal posts to `/api/appointment`, reachable from every section via provider) | Component Inventory > `AppointmentForm` + Server Error Mapping table |
| API-07 (routes return `{ success }` or `{ error, fieldErrors }`) | Server Error Mapping table |
| HOME-09 (FAQ copy in messages JSON) | Out of scope for UI-SPEC — content-only requirement, no UI surface in Phase 3 (Phase 4 builds the accordion) |
| SRV-02, DOC-02, NWS-02, RVW-02 (translated content in messages JSON) | Out of scope for UI-SPEC — content-only; no new visual contract needed beyond the existing Phase 2 typography scale |

---

## Open Questions for Planner / Executor

None. Every design decision needed to implement the Appointment Modal form body is locked above.

If during execution a question arises that this contract does not answer (e.g. "what should happen if the user closes the modal mid-submit?" — answer: abort via `AbortController`, no toast, next open resets to idle), it indicates a gap in this spec; raise it as a UI-SPEC amendment rather than improvising.

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending

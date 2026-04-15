---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: planning
stopped_at: Phase 1 context gathered (assumptions mode)
last_updated: "2026-04-15T16:14:18.531Z"
last_activity: 2026-04-15 — Roadmap created; all 110 v1 requirements mapped across 5 phases
progress:
  total_phases: 5
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-15)

**Core value:** Convert visitors into booked appointments by presenting the clinic as trustworthy, modern, and accessible — in the visitor's own language, on any device, and with content that ranks on search engines.
**Current focus:** Phase 1 — Foundation & i18n Scaffold

## Current Position

Phase: 1 of 5 (Foundation & i18n Scaffold)
Plan: 0 of TBD in current phase
Status: Ready to plan
Last activity: 2026-04-15 — Roadmap created; all 110 v1 requirements mapped across 5 phases

Progress: [░░░░░░░░░░] 0%

## Performance Metrics

**Velocity:**

- Total plans completed: 0
- Average duration: -
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**

- Last 5 plans: none yet
- Trend: -

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Roadmap]: Coarse granularity → 5 phases; sequential execution; YOLO auto-advance
- [Roadmap]: HOME-09 (FAQ copy) assigned to Phase 3 (content data layer) — copy lives in messages JSON alongside other content
- [Roadmap]: LAY-11 (emergency phone) assigned to Phase 4 — it is a page-level UI detail, not a shared shell component

### Pending Todos

None yet.

### Blockers/Concerns

- [Phase 1 risk]: `proxy.ts` must be in repo root (not `middleware.ts`) — silent failure if wrong filename
- [Phase 1 risk]: Async `params` / `cookies()` / `headers()` are Promises in Next.js 16 — await everywhere
- [Phase 3 risk]: `TELEGRAM_BOT_TOKEN` must never reach the client bundle — `import 'server-only'` in `/lib/telegram.ts`
- [Phase 4 risk]: Swiper must be loaded via `dynamic({ ssr: false })` to avoid hydration mismatch and CLS spike
- [Phase 4 risk]: `source.unsplash.com` deprecated — all three Unsplash host patterns must be in `remotePatterns`

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| *(none)* | | | |

## Session Continuity

Last session: 2026-04-15T16:14:18.529Z
Stopped at: Phase 1 context gathered (assumptions mode)
Resume file: .planning/phases/01-foundation-i18n-scaffold/01-CONTEXT.md

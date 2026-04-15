# Pitfalls Research — ShaxKlinika

**Stack (installed):** Next.js 16.2.3 · React 19.2.4 · Tailwind 4.2.2 · TS 5 · Node 20.9+
**Confidence:** HIGH (verified against bundled `node_modules/next/dist/docs/`)

**Critical:** TZ assumes Next 14; reality is Next 16. Every pitfall below accounts for this.

## Critical

### 1. `middleware.ts` deprecated — use `proxy.ts`
In Next 16 the file convention renamed. TZ's `middleware.ts` is silently ignored → locale routing never fires → `<html lang>` wrong → hreflang broken.

**Fix:** Name file `proxy.ts`, export `function proxy(request)`. Codemod: `npx @next/codemod@canary middleware-to-proxy .`

**Detect:** Visit `/` in dev — if no redirect to `/ru/`, proxy isn't firing.

**Phase:** P1 Foundation.

### 2. `params` / `searchParams` are Promises
`cookies()`, `headers()`, `params` all async in v16. Sync access crashes every dynamic route.

**Fix:**
```ts
export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
}
```
Same for `generateMetadata`. Use `PageProps<>` / `LayoutProps<>` helpers.

**Phase:** P1 + every dynamic route.

### 3. `source.unsplash.com` redirects fail `next/image`
TZ uses `source.unsplash.com/...` — this service was soft-deprecated in 2022, redirects to `images.unsplash.com`. Next.js validates `remotePatterns` against redirect destination. If missing → 400 in prod.

**Fix:**
```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'source.unsplash.com' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: '*.unsplash.com' },
  ]
}
```
Consider pre-downloading a curated set instead — `source.unsplash.com` rate-limits without API key.

**Phase:** P1 config + every image phase.

### 4. `TELEGRAM_BOT_TOKEN` leaking to client
Any accidental import of `/lib/telegram.ts` in a client tree, or `NEXT_PUBLIC_` prefix → bot token in browser bundle.

**Fix:**
- `import 'server-only'` at top of `/lib/telegram.ts` (build error on client import)
- Rate-limit all 3 form routes (in-memory `X-Forwarded-For` map, 5/min)
- Never use `NEXT_PUBLIC_TELEGRAM_*`

**Detect:** `grep -r "TELEGRAM_BOT_TOKEN" .next/static/` after build — any hit = leak.

**Phase:** P5 API routes.

### 5. motion (Framer Motion) only works in Client Components
Every file importing `motion` must start with `'use client'`. Default in v16 is RSC.

**Fix:** Narrow `'use client'` to the animated component only, not the whole section. Pattern:
```tsx
// sections/StatsSection.tsx — RSC
import AnimatedCounter from '@/components/shared/AnimatedCounter'

// components/shared/AnimatedCounter.tsx
'use client'
import { motion } from 'motion/react'
```

**Phase:** P2 design system + all animation phases.

### 6. Swiper SSR hydration mismatch
Swiper touches `window` at import. RSC HTML ≠ hydrated output → hydration errors + CLS reflow.

**Fix:**
```tsx
'use client'
import dynamic from 'next/dynamic'
const HeroSwiper = dynamic(() => import('@/components/shared/SwiperCarousel'), { ssr: false })

<Suspense fallback={<HeroSkeleton />}>
  <HeroSwiper slides={slides} />
</Suspense>
```
Skeleton must match rendered height or it causes its own CLS.

**Phase:** Home hero, doctors slider, reviews slider.

## Moderate

### 7. Image CLS without explicit dimensions
Always provide `width` + `height`. Hero: `1920×800`, doctor portrait: `400×500`. `priority` on LCP image. For masonry: `fill` + `position:relative` with explicit container height.

### 8. Tailwind 4 has no `tailwind.config.ts`
TZ's config file is silently ignored. `.glass`, `bg-primary`, font tokens never apply.

**Fix:** CSS-first — `@theme { --color-primary: ... }` and `@utility glass { ... }` in `globals.css`. Do NOT create `tailwind.config.ts`.

**Phase:** P2 design system (before anything else).

### 9. JSON-LD XSS + schema validation
`JSON.stringify` doesn't escape `<`. Doctor bios/reviews may contain it.

**Fix:**
```ts
dangerouslySetInnerHTML={{
  __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
}}
```
Use `schema-dts`. Test every schema with Google Rich Results Test. Key requirements:
- `LocalBusiness.openingHoursSpecification` → ISO day names (`Monday`, not `Пн`)
- `Review.itemReviewed` references `MedicalOrganization`
- `Physician.medicalSpecialty` from Schema.org controlled vocabulary

**Phase:** P7 SEO.

### 10. Sitemap hreflang — self-reference + `x-default`
Google requires page to appear in its own alternate set. Missing self-ref = errors.

**Do not install `next-sitemap`** (conflicts with native `app/sitemap.ts`, overwrites it and strips hreflang).

```ts
alternates: {
  languages: {
    ru: `${base}/ru${page}`,  // self-ref
    uz: `${base}/uz${page}`,
    en: `${base}/en${page}`,
    'x-default': `${base}/ru${page}`,
  }
}
```

**Phase:** P7 SEO.

### 11. `backdrop-filter` kills low-end Android
`.glass` on Header + every card + modals saturates GPU on budget Redmi/Galaxy A (primary UZ device segment) → LCP >2.5s, jank.

**Fix:**
- Apply `.glass` selectively — Header once, cards max 6-8 visible, never off-screen
- `@media (prefers-reduced-motion: reduce)` fallback → solid `rgba(255,255,255,0.9)` without blur
- Test with Chrome DevTools "Mid-tier Mobile" CPU throttle after every glass addition

**Phase:** P2 design system + validate each UI phase.

### 12. Web-font CLS without `next/font`
`<link>` to Google Fonts = render-blocking + FOUT + CLS.

**Fix:**
```ts
import { Inter, PT_Sans } from 'next/font/google'
const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap' })
```
Apply class to `<html>` in root layout. Never use `<link>` Google Fonts tag.

**Phase:** P1/P4 layout.

## Minor

### 13. Animations without `prefers-reduced-motion`
Medical patients (elderly, chronically ill) especially sensitive.

**Fix:**
```tsx
const shouldReduce = useReducedMotion()
<motion.div initial={shouldReduce ? false : { opacity: 0, y: 20 }} ... />
```
CSS safety net: `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }`

### 14. Glass contrast WCAG failure
`rgba(255,255,255,0.25)` + `#6B7280` body = <4.5:1. Use `#1F2937` for primary body; `#6B7280` only for secondary labels ≥18px. Test with axe on actual rendered pages.

### 15. `generateMetadata` locale mismatch
If translation lookup silently fails, `<title>` in RU while page renders UZ → Search Console hreflang errors.

**Fix:** Same translation loader in `generateMetadata` and page. Guard: `hasLocale(locale) || notFound()`. `alternates.languages` must match sitemap exactly.

### 16. Review moderation with no DB
TZ says "pending moderation" but no database. Risk: immediately visible (bad) or silently discarded (bad UX).

**Fix:** `/api/review` → Telegram with "PENDING MODERATION:" prefix → staff adds approved review to `/lib/data/reviews.ts` → redeploy. Form shows explicit pending message in all 3 languages. No optimistic UI.

## Phase-Mapped Summary

| Phase | Pitfalls |
|---|---|
| P1 Foundation | #1 proxy.ts, #2 async params, #3 remotePatterns, #12 next/font |
| P2 Design System | #5 motion/RSC, #8 Tailwind 4 CSS-first, #11 glass perf, #13 reduced-motion, #14 contrast |
| P4 Layout | #6 Swiper SSR (header hasn't; modals use Dialog), #12 fonts |
| P5 API | #4 server-only token, rate limiting, #16 review moderation UX |
| P6 Pages | #6 Swiper SSR (hero/doctors/reviews), #7 image CLS, #15 metadata locale match |
| P7 SEO | #9 JSON-LD XSS + validation, #10 sitemap hreflang self-ref, no next-sitemap |
| P8 Polish | performance validation with mobile throttle; Lighthouse 90+ target |

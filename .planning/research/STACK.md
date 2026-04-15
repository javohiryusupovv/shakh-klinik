# Stack Research — ShaxKlinika

**Confidence:** HIGH (framework/CSS verified from installed node_modules); MEDIUM (uninstalled libs)

## CRITICAL: TZ Version Mismatch

TZ says "Next.js 14" but installed stack (per `package.json`) is:

- **next: 16.2.3**
- **react: 19.2.4**
- **tailwindcss: ^4** (`@tailwindcss/postcss ^4`)
- typescript: ^5, Node: 20.9+

AGENTS.md warning "this Next.js version has breaking changes" refers to v16. **All implementation must target Next.js 16**.

## Next.js 16 Breaking Changes vs TZ

| TZ assumption | Next.js 16 reality | Fix |
|---|---|---|
| `middleware.ts` → `export function middleware()` | Renamed to **`proxy.ts`** with `export function proxy()` | Rename |
| Sync `params`, `searchParams` | **Async — must `await params`** | `const { locale } = await params` |
| Sync `cookies()`, `headers()` | Must await | `const store = await cookies()` |
| `tailwind.config.ts` with content array | **Tailwind 4: no JS config** | Move to `@theme {}` in globals.css |
| `@tailwind base/components/utilities` | **`@import 'tailwindcss'`** single line | Replace |
| `framer-motion` | Package is **`motion`**, import `motion/react` | `npm i motion` |
| Turbopack opt-in flag | **Default in v16** | Remove `--turbopack`; `--webpack` if needed |
| `next-sitemap` package | **Native `app/sitemap.ts`** | Use built-in |

## Tailwind 4 Setup

```css
/* app/globals.css */
@import 'tailwindcss';

@theme {
  --color-primary: #4A9EE7;
  --color-deep-blue: #2B7FCC;
  --color-mint: #A8E6CF;
  --color-text-dark: #1F2937;
  --color-text-gray: #6B7280;
  --color-bg-light: #E8F4FD;
}

@utility glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(74, 158, 231, 0.15);
  border-radius: 1rem;
  transition: all 0.3s ease;
}
```

```js
// postcss.config.mjs
export default { plugins: { '@tailwindcss/postcss': {} } }
```

No `tailwind.config.ts`.

## next-intl Integration (proxy.ts, not middleware.ts)

```ts
// proxy.ts
import createIntlMiddleware from 'next-intl/middleware'

const intlMiddleware = createIntlMiddleware({
  locales: ['ru', 'uz', 'en'],
  defaultLocale: 'ru',
  localePrefix: 'always'
})

export function proxy(request) { return intlMiddleware(request) }

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}
```

Server translations: `await getTranslations({ locale, namespace })` in RSC / `generateMetadata`. Client: `useTranslations()`.

## motion (ex Framer Motion)

- `npm i motion` (not `framer-motion`)
- `import { motion, AnimatePresence } from 'motion/react'`
- All animated components = `'use client'`

## Swiper v11

```tsx
'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
```

## JSON-LD

- Types: `schema-dts` (`WithContext<MedicalOrganization>`, `Physician`)
- Render native:
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{
  __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
}} />
```
- No `next-seo` or `react-schemaorg`.

## Sitemap (native)

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap { /* ... */ }
```

## Yandex Maps

Plain iframe (no package, no API key for widget embed):
```tsx
<iframe src="https://yandex.com/map-widget/v1/?ll=69.279737,41.299496&z=15" loading="lazy" />
```

`@pbe/react-yandex-maps` has React 19 peer-dep issues — don't install.

## Telegram

Native fetch, no package:
```ts
await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
  cache: 'no-store'
})
```

## Analytics

- **GA4**: `@next/third-parties` → `<GoogleTagManager gtmId={...} />` in root layout
- **Yandex Metrika**: via Next.js 16 `instrumentation-client.ts` (new v16 convention, runs before app code)

## Images

Add Unsplash to `next.config.ts` remotePatterns:
```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'source.unsplash.com' } // NOTE: deprecated, see PITFALLS
  ]
}
```

## shadcn/ui + Tailwind 4

```bash
npx shadcn@latest init        # select Tailwind 4
npx shadcn@latest add dialog button input textarea select tabs badge skeleton
```

CSS variables (`--background`, `--foreground`) in `@layer base`. No separate `tw-animate` package — shadcn bundles animations via CSS.

## Packages to Install

```bash
npm install \
  next-intl \
  motion \
  swiper \
  lucide-react \
  react-hook-form @hookform/resolvers zod \
  schema-dts \
  @next/third-parties
```

### Do NOT install

- `framer-motion` (replaced by `motion`)
- `next-sitemap` (use native)
- `next-i18next` (use next-intl)
- `@pbe/react-yandex-maps` (React 19 peer-dep issues)
- `telegraf` (native fetch is enough)
- `tailwindcss@3`
- `autoprefixer` (Tailwind 4 bundles it)

## Open Questions

1. next-intl version compatible with Next 16 `proxy.ts` — verify after install
2. `motion/react` subpath — verify exports after install
3. `swiper/react` + `swiper/modules` still correct in v11 — verify
4. shadcn init CLI Tailwind 4 prompt behavior

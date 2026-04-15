# Features Research — ShaxKlinika

**Domain:** Multilingual medical clinic marketing website (Uzbekistan, RU default)
**Confidence:** MEDIUM-HIGH

## Key Findings

- TZ covers all true table stakes for the Uzbek/CIS clinic market.
- Three features deserve conscious decisions: emergency contact prominence, FAQ section, and explicit "no online payment v1" communication.
- Telegram-first is correct CIS booking channel (~80% urban UZ penetration). WhatsApp secondary.
- Most dangerous anti-feature is any patient data storage — route to Telegram, no persistence. UZ Personal Data Law (ZRU-547, 2019) applies to name+phone.
- Yandex Maps (not Google) mandatory for Uzbek market.
- Appointment modal is highest-priority component after design system — every CTA depends on it.

## Table Stakes

| Feature | Why | Complexity |
|---|---|---|
| Russian default locale | Lingua franca for urban UZ audience | Low |
| Uzbek (Latin) locale | Government mandate, younger demo, UZ SEO | Low |
| Service catalog with UZS prices | CIS patients price-check before calling | Medium |
| Doctor profiles (photo+credentials) | #1 trust signal in CIS medical | Medium |
| Multiple phone numbers in header | Uzbeks call first; visibility = credibility | Low |
| Appointment CTA on every page | Core conversion | Medium |
| Yandex Maps embed | Dominant in UZ; Google unreliable outside center | Low |
| Working hours displayed | Missing hours = distrust | Low |
| Telegram contact channel | ~80% urban UZ penetration | Low |
| WhatsApp floating button | Secondary, 35+ demo | Low |
| Mobile-first responsive (360px) | 70%+ UZ traffic mobile, Android budget | Medium |
| About section / clinic story | Institutional trust narrative | Low |
| Patient reviews / testimonials | Word-of-mouth culture | Medium |
| Photo gallery of space | Reduces booking anxiety | Medium |
| News / blog section | Freshness signal + organic SEO | Medium |
| SSL + .uz domain | Basic trust | Low |
| Per-locale SEO metadata | hreflang per page | Medium |
| JSON-LD structured data | Google/Yandex rich snippets | High |
| Cookie consent banner | UZ ZRU-547 compliance gesture | Low |
| 404 with nav-back | Basic UX | Low |

## Differentiators

| Feature | Value | Complexity |
|---|---|---|
| Liquid glass UI | Stands out vs generic WP clinic templates | High |
| All content in 3 languages | UZ content beats competitors | High |
| Price transparency (UZS ranges) | Builds trust, attracts comparison shoppers | Medium |
| Animated stats counter | Social proof at-a-glance | Low |
| Doctor filter by department | Reduces friction | Low |
| Service filter by category | Table stakes at 25+ services | Low |
| Review submission with moderation | Ongoing UGC social proof | Medium |
| Telegram bot form delivery | Converts call-avoiders | Medium |
| Yandex Metrika + GA dual tracking | Full CIS+intl picture | Low |
| BreadcrumbList JSON-LD | Rich snippets | Low |
| Related news on article pages | SEO + dwell time | Low |
| Framer Motion page transitions | Premium feel | Medium |
| Ken Burns hero slider | Visual engagement | Medium |

## Missing from TZ — Decisions Required

| Feature | Recommendation |
|---|---|
| Emergency 24h phone badge in hero | **Add v1** — red accent, low effort, high signal |
| FAQ accordion on home | **Add v1** — 6-8 questions, cheap trust builder |
| Insurance partnerships list | **Defer v2** |
| Checkup package price calculator | **Defer v2** (incompatible with static data) |
| Before/after gallery tab | **Conditional** — only if service list includes aesthetics |
| Promo banner | **Covered** by news articles |
| Online prescreening | **Do not build** — friction |
| Telemedicine CTA | **Do not build v1** |

## Anti-Features

| Anti-Feature | Why Avoid |
|---|---|
| Patient portal / auth | ZRU-547 liability, no business case |
| Online payment | PCI/merchant out of v1 scope |
| Real-time doctor calendar | Requires backend sync |
| CMS / admin panel | Static TS data = deliberate architecture |
| Video consultation | Separate product |
| Live chat widget (JivoSite) | Staffing + LCP penalty kills Lighthouse 90+ |
| Auto-published reviews | Spam risk in medical context |
| Google Maps | Slow in UZ, poor coverage |
| SMS OTP | Overkill for marketing CTA |
| PII database storage | Zero-liability via Telegram-only |
| Automated test suite | TZ excludes |

## Feature Dependencies

```
Appointment modal
  ← services.ts (dropdown), doctors.ts (optional), /api/appointment,
    TELEGRAM_BOT_TOKEN+CHAT_ID, RHF+Zod, i18n keys
  → blocks every CTA on every page

Contact form
  ← /api/contact, Telegram env, Yandex iframe, i18n

Review submission
  ← /api/review, Telegram env, pending-UX, i18n

Doctor detail (/doctors/[slug])
  ← doctors.ts slug, /lib/seo.ts Physician schema, pre-fill appt modal

Service detail (/services/[slug])
  ← services.ts (slug, price, duration, dept), MedicalProcedure schema

News article (/news/[slug])
  ← news.ts (slug, category, author), Article schema, related news query

Gallery
  ← lightbox lib (NOT shadcn — yet-another-react-lightbox),
    next/image lazy+blur, tab state

JSON-LD/SEO
  ← all data files populated, next-intl generateMetadata,
    next-sitemap w/ hreflang alternates

i18n
  ← ru/uz/en JSON complete before any page,
    middleware.ts, ALL static data translated

Analytics
  ← env vars, next/script afterInteractive, non-blocking LCP
```

## MVP Priority Order

1. Design system + i18n scaffold
2. Appointment modal + API
3. Home page
4. Services + detail
5. Doctors + detail
6. Contact page (needed for LocalBusiness JSON-LD)
7. Reviews page
8. Gallery
9. News + articles
10. SEO finalization

## UZ/CIS Market Notes

- Language: RU first, UZ second growing, EN rare domestic. UZ must be fully polished.
- Booking: Telegram dominant, WhatsApp 35+ secondary, Viber declining.
- Maps: Yandex only. Google unreliable.
- Phone: `+998 XX XXX-XX-XX`. Zod: `/^\+998[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/`
- Currency: "150 000 сум" (thin space, сум suffix). Never $ or ₽. ~1 USD ≈ 12,700 UZS (2026).
- Search: Yandex primary for RU content, Google secondary.
- Trust: certificates, years, patient count — credential-conscious market.
- Mobile: Android dominant (Galaxy A, Redmi). Test at 360px. Avoid -webkit only.
- Internet: avg 15-25 Mbps Tashkent. next/image mandatory.

## Open Questions for Phase Research

1. **Lightbox lib**: `yet-another-react-lightbox` (MIT, maintained) recommended
2. **Yandex Maps**: Static iframe (no key, lazy-load) preferred over JS API
3. **next-intl**: v3.x for Next 14 App Router — verify with docs before implementation
4. **Telegram Bot**: pre-create via @BotFather, operational dependency
5. **source.unsplash.com**: DEPRECATED since 2022 — needs alternative (picsum, static Unsplash IDs, or pre-downloaded set)

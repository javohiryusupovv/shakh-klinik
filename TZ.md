PROJECT: ShaxKlinika - Multi-language Medical Clinic Website

GOAL: Build a complete production-ready medical clinic website with 3 languages (RU default, UZ, EN), full SEO optimization, liquid glass UI effects, sliders, and animations. Generate ALL content yourself (services, doctors, news, reviews, descriptions) — do not use placeholder text like "Lorem ipsum". Make content realistic and medically appropriate for a modern private clinic in Uzbekistan.

=== TECH STACK ===
- Next.js 14 (App Router) + TypeScript
- TailwindCSS + Framer Motion
- next-intl for i18n
- Swiper.js for sliders
- shadcn/ui components
- React Hook Form + Zod
- Lucide React icons
- next-sitemap for SEO

=== DESIGN SYSTEM ===
Colors:
- White: #FFFFFF
- Light Blue backgrounds: #E8F4FD, #D1E9FB, #F0F8FF
- Primary Blue: #4A9EE7
- Deep Blue: #2B7FCC, #1A5A94
- Text Dark: #1F2937
- Text Gray: #6B7280
- Accent Mint: #A8E6CF (subtle medical accent)

Typography:
- Headings: Inter Bold / PT Sans Bold
- Body: Inter Regular
- Sizes: H1 48-64px, H2 36-48px, H3 24-32px, body 16-18px

Liquid Glass Effect (apply to cards, buttons, navbar):
.glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(74, 158, 231, 0.15);
  border-radius: 1rem;
  transition: all 0.3s ease;
}
.glass:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(74, 158, 231, 0.3);
}

Buttons: rounded-full, glass effect, gradient on primary CTAs
Cards: rounded-2xl, glass effect, hover lift
Background: subtle gradient (white to light blue), occasional blob shapes for depth

=== I18N ===
- Library: next-intl
- Default locale: ru
- Locales: ru, uz, en
- URL: /ru/..., /uz/..., /en/...
- Translation files: /messages/ru.json, uz.json, en.json
- Language switcher in header (with flags)
- ALL content must be translated to all 3 languages
- hreflang tags on every page

=== PAGES ===

1. HOME (/)
   - Hero slider (Swiper, 4 slides, autoplay 5s, fade transition)
     * Slide 1: "Современная медицина для всей семьи" + CTA
     * Slide 2: "Опытные врачи европейского уровня" + CTA
     * Slide 3: "Передовое оборудование" + CTA
     * Slide 4: "24/7 экстренная помощь" + CTA
   - About section (clinic intro, 3-4 paragraphs)
   - "Why choose us" — 6 feature cards (glass, hover animation):
     * Опытные врачи, Современное оборудование, Удобное расположение, 
       Доступные цены, Индивидуальный подход, Конфиденциальность
   - Popular services grid (8 services, glass cards)
   - Statistics counter (animate on scroll):
     * 15+ лет опыта, 50,000+ пациентов, 40+ врачей, 25+ направлений
   - Top doctors slider (6 doctors)
   - Latest news (3 cards)
   - Reviews slider
   - CTA section: "Запишитесь на прием"

2. SERVICES (/services)
   Generate 25+ realistic medical services across categories:
   - Терапия (Прием терапевта, ЭКГ, Капельницы)
   - Кардиология (Консультация кардиолога, ЭхоКГ, Холтер)
   - Неврология (Консультация невролога, ЭЭГ, УЗДГ сосудов)
   - Гинекология (Прием гинеколога, УЗИ малого таза, Кольпоскопия)
   - Урология (Прием уролога, УЗИ почек)
   - Эндокринология (Консультация, Анализы гормонов)
   - Офтальмология (Проверка зрения, Подбор очков)
   - ЛОР (Консультация, Промывание, Аудиометрия)
   - Дерматология (Прием дерматолога, Удаление новообразований)
   - Стоматология (Лечение, Чистка, Имплантация)
   - Лабораторная диагностика (Общий анализ крови, Биохимия, Гормоны)
   - УЗИ диагностика
   - МРТ/КТ
   
   Each service: name, description (100-150 words), duration, price range (in UZS), 
   responsible department. Filter by category. Detail page for each.

3. GALLERY (/gallery)
   Tabs: Клиника, Оборудование, Команда, Мероприятия
   Use placeholder images from Unsplash (medical theme): 
   https://source.unsplash.com/800x600/?clinic,hospital,doctor,medical
   Masonry layout, lightbox on click, lazy loading.

4. NEWS (/news)
   Generate 12 realistic news articles, examples:
   - "Открытие нового отделения кардиологии"
   - "Новое МРТ оборудование Siemens 3 Tesla в нашей клинике"
   - "День открытых дверей: бесплатные консультации"
   - "Профилактика сезонных заболеваний: советы наших врачей"
   - "Наша клиника получила сертификат ISO 9001"
   - "Скидка 20% на полный чек-ап в марте"
   - "Новый врач-кардиолог в нашей команде"
   - "Вакцинация: что нужно знать"
   - "Здоровое питание: рекомендации диетолога"
   - "Профилактика заболеваний сердца"
   - "Открытие детского отделения"
   - "Партнерство с европейскими клиниками"
   
   Each: title, date, category, cover image, full content (300-500 words), 
   author. Pagination, related news.

5. DOCTORS (/doctors)
   Generate 15 realistic doctor profiles with Uzbek/Russian names:
   Examples:
   - Каримов Шерзод Алишерович — Кардиолог, 18 лет опыта
   - Юсупова Гульнара Рустамовна — Гинеколог, 22 года опыта
   - Абдуллаев Бахтиёр Хасанович — Невролог, 15 лет опыта
   - Рахимова Дилноза Фарходовна — Терапевт, 12 лет опыта
   - Турсунов Жасур Икромович — Уролог, 20 лет опыта
   - Ismoilova Nargiza Akmalovna — ЛОР-врач, 14 лет опыта
   - (and 9 more across different specialties)
   
   Each: photo (Unsplash placeholder: https://source.unsplash.com/400x500/?doctor,physician), 
   full name, specialty, experience, education, achievements, bio (150-200 words), 
   working hours, "Записаться на прием" button. Filter by department.

6. REVIEWS (/reviews)
   Generate 20 realistic patient reviews (varied ratings 4-5 stars):
   Examples:
   - "Очень довольна приемом у доктора Каримова. Внимательный, профессиональный..."
   - "Спасибо всему персоналу за заботу. Современная клиника..."
   - "Прошла полный чек-ап. Все организовано на высшем уровне..."
   
   Each: name (first name + initial), rating (stars), date, text (50-150 words), 
   service/doctor name. Slider on home, full grid on /reviews. 
   Form to submit new review (saved but pending moderation).

7. CONTACT (/contact)
   - Address: г. Ташкент, ул. Амира Темура, 108 (placeholder)
   - Phones: +998 71 200-00-00, +998 90 123-45-67
   - Email: info@shaxklinika.uz
   - Working hours: Пн-Сб 8:00-20:00, Вс 9:00-15:00
   - Embedded Yandex Map (Tashkent coordinates)
   - Contact form: Name, Phone, Email, Service (dropdown), Message
   - Social: Telegram, Instagram, Facebook, YouTube
   - Form submission to Telegram bot (env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)

=== COMMON COMPONENTS ===
- Header (sticky, glass effect, logo, nav, language switcher, "Запись" CTA button)
- Footer (logo, about, quick links, contacts, social, copyright)
- Floating WhatsApp/Telegram button (bottom right)
- Floating "Запись на прием" button on mobile
- Appointment modal (opens from CTAs): Name, Phone, Service, Doctor (optional), Date
- Loading skeletons
- 404 page
- Cookie consent banner
- Scroll-to-top button

=== ANIMATIONS (Framer Motion) ===
- Page transitions: fade + slide
- Scroll reveals: whileInView with fadeInUp, staggered children
- Hero slider: Ken Burns effect on slide images
- Cards: hover lift + glow
- Buttons: scale on click, ripple effect
- Counters: animate from 0 on scroll
- Smooth scroll
- Mobile menu: slide from right with backdrop blur

=== SEO REQUIREMENTS ===
- Next.js metadata API on every page (unique title, description per language)
- Open Graph + Twitter Card meta tags
- JSON-LD structured data:
  * MedicalOrganization (root layout)
  * Physician (each doctor)
  * MedicalProcedure (each service)
  * Article (each news post)
  * Review (each review)
  * BreadcrumbList
  * LocalBusiness (with address, hours, geo)
- sitemap.xml (multilingual with hreflang)
- robots.txt
- Canonical URLs
- hreflang tags (ru, uz, en, x-default)
- Semantic HTML (header, nav, main, article, section, aside, footer)
- next/image for all images with proper alt text in current language
- Lazy loading
- Core Web Vitals optimized (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- Lighthouse score target: 90+ across all categories
- SEO-friendly URLs with slugs
- One H1 per page, proper H2-H6 hierarchy
- 301 redirects setup
- Mobile-first responsive design
- Compression enabled

Page-specific meta examples (RU):
- Home: "ShaxKlinika — Современная многопрофильная клиника в Ташкенте"
- Services: "Медицинские услуги в Ташкенте | ShaxKlinika"
- Doctors: "Опытные врачи Ташкента | ShaxKlinika"

=== RESPONSIVE BREAKPOINTS ===
- Mobile: 320-767px
- Tablet: 768-1023px
- Desktop: 1024px+
- Large: 1440px+

=== FILE STRUCTURE ===
/app
  /[locale]
    /layout.tsx
    /page.tsx
    /services
      /page.tsx
      /[slug]/page.tsx
    /gallery/page.tsx
    /news
      /page.tsx
      /[slug]/page.tsx
    /doctors
      /page.tsx
      /[slug]/page.tsx
    /reviews/page.tsx
    /contact/page.tsx
  /api
    /contact/route.ts (Telegram bot)
    /appointment/route.ts
    /review/route.ts
  /sitemap.ts
  /robots.ts
/components
  /ui (shadcn components)
  /sections (HeroSlider, ServicesGrid, DoctorsSlider, etc.)
  /layout (Header, Footer, MobileMenu)
  /shared (GlassCard, AnimatedCounter, AppointmentModal)
/lib
  /data (services.ts, doctors.ts, news.ts, reviews.ts — all generated content)
  /utils.ts
  /seo.ts (JSON-LD generators)
  /telegram.ts
/messages
  /ru.json
  /uz.json
  /en.json
/public
  /images
  /icons
  /favicon set
i18n.ts
middleware.ts (next-intl)
next.config.js
tailwind.config.ts

=== ENVIRONMENT VARIABLES ===
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_SITE_URL=https://shaxklinika.uz
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_YM_ID=

=== DELIVERABLES ===
1. Complete Next.js project, runnable with `npm install && npm run dev`
2. ALL content generated and translated to RU/UZ/EN (no Lorem Ipsum)
3. Static data files (TS) for services, doctors, news, reviews
4. Full SEO implementation
5. Responsive across all breakpoints
6. README.md with setup instructions, env vars, deploy guide
7. Ready to deploy to Vercel

=== IMPORTANT NOTES ===
- Use Unsplash placeholder URLs for all images: https://source.unsplash.com/[size]/?[keywords]
- Generate REALISTIC content — this is a real medical clinic, not a demo
- Keep medical content accurate and professional
- Use Uzbek/Russian names for doctors and reviewers
- Prices in UZS (Uzbekistan Som), example ranges: 50,000 - 500,000 sum
- Phone format: +998 XX XXX-XX-XX
- All forms must validate properly with helpful error messages in current language
- Make it BEAUTIFUL — this is a premium clinic website, not a template
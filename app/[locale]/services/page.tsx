'use client'

import { useState, useMemo } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Search, Tag, CheckCircle2, ChevronRight } from 'lucide-react'
import {
  DENTAL_CATEGORIES,
  DENTAL_SERVICES,
  getDentalServicesByCategory,
  formatDentalPrice,
  type Locale,
} from '@/lib/data/dental-services'
import { Link } from '@/i18n/navigation'

// ── Kategoriya icon/rang xaritalash ──────────────────────────────────────────
const CAT_META: Record<string, { emoji: string; gradient: string; lightBg: string }> = {
  therapy:      { emoji: '🦷', gradient: 'from-[#4A9EE7] to-[#2B7FCC]', lightBg: 'bg-blue-50'   },
  orthopedics:  { emoji: '👑', gradient: 'from-[#7B5EE7] to-[#5B3FCC]', lightBg: 'bg-purple-50' },
  surgery:      { emoji: '🔬', gradient: 'from-[#E74A7B] to-[#CC2B55]', lightBg: 'bg-rose-50'   },
  orthodontics: { emoji: '✨', gradient: 'from-[#3DC87B] to-[#28A85E]', lightBg: 'bg-emerald-50'},
}

export default function ServicesPage() {
  const locale      = useLocale() as Locale
  const tPages      = useTranslations('pages.services')
  const [active, setActive]   = useState<string>('all')
  const [query,  setQuery]    = useState('')

  // Qidiruv + kategoriya filtri
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const cats = active === 'all' ? DENTAL_CATEGORIES : DENTAL_CATEGORIES.filter(c => c.id === active)
    return cats.map(cat => {
      const services = getDentalServicesByCategory(cat.id).filter(s =>
        !q || s.name[locale].toLowerCase().includes(q)
      )
      return { cat, services }
    }).filter(({ services }) => services.length > 0)
  }, [active, query, locale])

  const totalCount = DENTAL_SERVICES.length

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f7ff] to-white">

      {/* ── Hero band ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#1A5A94 0%,#2B7FCC 55%,#4A9EE7 100%)' }}
      >
        {/* декоративные круги */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

        <div className="container mx-auto px-6 py-16 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm mb-5">
            <Tag className="w-3.5 h-3.5" />
            <span>{tPages('subtitle')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            {tPages('title')}
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto mb-8">
            {totalCount} {locale === 'ru' ? 'позиций' : locale === 'uz' ? 'ta xizmat' : 'services'} · {locale === 'ru' ? 'цены в ₽' : locale === 'uz' ? '₽ da narxlar' : 'prices in ₽'}
          </p>

          {/* ── Qidiruv ── */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={locale === 'ru' ? 'Поиск услуги…' : locale === 'uz' ? 'Xizmat qidirish…' : 'Search service…'}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-gray-800 placeholder-gray-400 shadow-lg outline-none focus:ring-2 focus:ring-[#4A9EE7]/40 text-sm"
            />
          </div>
        </div>
      </div>

      {/* ── Kategoriya tabs ────────────────────────────────────────────── */}
      <div className="sticky top-[92px] z-40 mx-2 mt-5">
        <div className="container mx-auto">
          <div className="rounded-full bg-white/92 backdrop-blur-xl border border-[#4A9EE7]/14 shadow-[0_4px_28px_rgba(0,0,0,0.09),0_1px_6px_rgba(74,158,231,0.08)] px-4">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
              {/* Барча / Hammasi */}
              <button
                onClick={() => setActive('all')}
                className={`shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active === 'all'
                    ? 'bg-[#2B7FCC] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tPages('allCategories')}
              </button>

              {DENTAL_CATEGORIES.map(cat => {
                const meta = CAT_META[cat.id]
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActive(cat.id)}
                    className={`shrink-0 flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      active === cat.id
                        ? `bg-gradient-to-r ${meta.gradient} text-white shadow-md`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{meta.emoji}</span>
                    {cat.name[locale]}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Narxnoma ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-10 space-y-10 max-w-4xl">

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>{locale === 'ru' ? 'Ничего не найдено' : locale === 'uz' ? 'Hech narsa topilmadi' : 'Nothing found'}</p>
          </div>
        )}

        {filtered.map(({ cat, services }) => {
          const meta = CAT_META[cat.id] ?? { emoji: '•', gradient: 'from-gray-400 to-gray-600', lightBg: 'bg-gray-50' }
          return (
            <section key={cat.id} data-aos="fade-up">
              {/* Kategoriya sarlavhasi */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${meta.gradient} shadow-md`}>
                  {meta.emoji}
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-gray-800">
                    {cat.name[locale]}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {services.length} {locale === 'ru' ? 'позиций' : locale === 'uz' ? 'ta' : 'items'}
                  </p>
                </div>
              </div>

              {/* Narxlar jadvali */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
                {services.map((s, idx) => {
                  const isFree = s.price === 'free'
                  return (
                    <div
                      key={s.id}
                      className={`flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-blue-50/60 ${
                        idx !== services.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      {/* Nomi */}
                      <div className="flex items-start gap-2.5 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-[#4A9EE7] shrink-0 mt-0.5 opacity-70" />
                        <span className="text-sm text-gray-700 leading-snug">
                          {s.name[locale]}
                        </span>
                      </div>

                      {/* Narx */}
                      <div className="shrink-0">
                        {isFree ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                            {locale === 'ru' ? 'Бесплатно' : locale === 'uz' ? 'Bepul' : 'Free'}
                          </span>
                        ) : (
                          <span className="text-[#2B7FCC] font-bold text-sm whitespace-nowrap">
                            {formatDentalPrice(s, locale)}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}

        {/* ── Pastki CTA ── */}
        <div className="pt-4 pb-8 text-center text-sm text-gray-400">
          {locale === 'ru'
            ? '* Цены указаны в российских рублях (₽). Для точной стоимости обратитесь на консультацию.'
            : locale === 'uz'
            ? '* Narxlar rus rublida (₽) ko\'rsatilgan. Aniq narx uchun konsultatsiyaga murojaat qiling.'
            : '* Prices are in Russian rubles (₽). For an exact quote, please book a consultation.'}
        </div>

        <div className="flex justify-center pb-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,#4A9EE7 0%,#1A5A94 100%)' }}
          >
            {locale === 'ru' ? 'Записаться на приём' : locale === 'uz' ? 'Qabulga yozilish' : 'Book Appointment'}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  )
}

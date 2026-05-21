'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getLatestNews } from '@/lib/services'
import { GlassCard } from '@/components/shared/GlassCard'

export function LatestNews() {
  const tNews = useTranslations('news')
  const tSection = useTranslations('home.latestNews')
  const news = getLatestNews(3)

  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-heading text-center mb-12" data-aos="fade-up">{tSection('heading')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((article, i) => (
          <Link
            key={article.slug}
            href={`/news/${article.slug}`}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <GlassCard hover={false} className="p-5 cursor-pointer">
              <p className="text-sm text-[var(--color-text-gray)] mb-2">{article.date}</p>
              <h3 className="font-semibold text-lg mb-2">
                {tNews(`${article.slug}.title`)}
              </h3>
              <p className="text-[var(--color-text-gray)] text-sm line-clamp-2">
                {tNews(`${article.slug}.excerpt`)}
              </p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  )
}
'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getLatestNews } from '@/lib/services'
import { NewsCard } from '@/components/shared/NewsCard'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ArrowRight } from 'lucide-react'

export function LatestNews() {
  const tNews = useTranslations('news')
  const tSection = useTranslations('home.latestNews')
  const news = getLatestNews(3)

  return (
    <section className="py-16 bg-gradient-to-b from-[var(--color-bg-lightest)] to-white">
      <div className="container mx-auto px-6">
        <SectionHeading title={tSection('heading')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {news.map((article, i) => (
            <NewsCard
              key={article.slug}
              slug={article.slug}
              date={article.date}
              title={tNews(`${article.slug}.title`)}
              excerpt={tNews(`${article.slug}.excerpt`)}
              readMoreLabel={tSection('readMore')}
              delay={i * 100}
            />
          ))}
        </div>

        {/* Barcha yangiliklar linki */}
        <div className="text-center mt-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
          >
            {tSection('allNewsCta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

import { useTranslations } from 'next-intl'
import { NEWS } from '@/lib/data/content'
import { GlassCard } from '@/components/shared/GlassCard'
import Link from 'next/link'

export default function NewsPage() {
  const t = useTranslations('news')
  const tPage = useTranslations('pages.news')

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading mb-8" data-aos="fade-up">{tPage('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEWS.map((article, i) => (
          <Link
            key={article.slug}
            href={`/news/${article.slug}`}
            data-aos="fade-up"
            data-aos-delay={(i % 6) * 80}
          >
            <GlassCard hover={false} className="p-6 cursor-pointer">
              <p className="text-sm text-[var(--color-text-gray)] mb-2">{article.date}</p>
              <h3 className="text-xl font-semibold mb-2">{t(`${article.slug}.title`)}</h3>
              <p className="text-[var(--color-text-gray)] line-clamp-3">{t(`${article.slug}.excerpt`)}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </main>
  )
}
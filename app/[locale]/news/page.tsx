import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { NEWS } from '@/lib/data/content'
import { GlassCard } from '@/components/shared/GlassCard'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/lib/seo/JsonLd'
import { breadcrumbJsonLd } from '@/lib/seo/schemas'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo' })
  return buildMetadata({
    locale,
    path: 'news',
    title: t('news.title'),
    description: t('news.description'),
    keywords: t('keywords'),
    siteName: t('siteName'),
    ogImageAlt: t('ogImageAlt'),
  })
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'news' })
  const tPage = await getTranslations({ locale, namespace: 'pages.news' })
  const tBc = await getTranslations({ locale, namespace: 'seo.breadcrumb' })

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-heading mb-8" data-aos="fade-up">
        {tPage('title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEWS.map((article, i) => (
          <Link
            key={article.slug}
            href={`/news/${article.slug}`}
            data-aos="fade-up"
            data-aos-delay={(i % 6) * 80}
          >
            <GlassCard hover={false} className="p-6 cursor-pointer">
              <p className="text-sm text-[var(--color-text-gray)] mb-2">
                {article.date}
              </p>
              <h3 className="text-xl font-semibold mb-2">
                {t(`${article.slug}.title`)}
              </h3>
              <p className="text-[var(--color-text-gray)] line-clamp-3">
                {t(`${article.slug}.excerpt`)}
              </p>
            </GlassCard>
          </Link>
        ))}
      </div>
      <JsonLd
        id="ld-news-breadcrumb"
        data={breadcrumbJsonLd(locale, [
          { name: tBc('home'), path: '' },
          { name: tBc('news'), path: 'news' },
        ])}
      />
    </main>
  )
}

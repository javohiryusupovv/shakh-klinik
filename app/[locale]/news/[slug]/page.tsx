import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getNewsBySlug, getAllNews } from '@/lib/services'
import { GlassCard } from '@/components/shared/GlassCard'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/lib/seo/JsonLd'
import { newsArticleJsonLd, breadcrumbJsonLd } from '@/lib/seo/schemas'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const news = getAllNews()
  return news.map(n => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const article = getNewsBySlug(slug)
  if (!article) return {}

  const tSeo = await getTranslations({ locale, namespace: 'seo' })
  const tArticle = await getTranslations({ locale, namespace: 'news.' + slug })
  const title = tArticle('title')
  const excerpt = tArticle('excerpt')

  return buildMetadata({
    locale,
    path: `news/${slug}`,
    title,
    description: excerpt,
    siteName: tSeo('siteName'),
    ogImageAlt: title,
    type: 'article',
    publishedTime: article.date,
  })
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug, locale } = await params
  const article = getNewsBySlug(slug)

  if (!article) {
    notFound()
  }

  const t = await getTranslations('news.' + slug)
  const tDetail = await getTranslations('newsDetail')
  const tBc = await getTranslations({ locale, namespace: 'seo.breadcrumb' })
  const tSeo = await getTranslations({ locale, namespace: 'seo' })
  const tDoctors = await getTranslations({ locale, namespace: 'doctors' })
  const title = t('title')
  const excerpt = t('excerpt')
  const body = t('body')
  const authorName = (() => {
    try {
      return tDoctors(`${article.authorSlug}.name`)
    } catch {
      return tSeo('siteName')
    }
  })()

  return (
    <main className="container mx-auto px-6 py-12 max-w-3xl">
      <Link
        href={`/${locale}/news`}
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/70 backdrop-blur-md border border-[#4A9EE7]/20 text-[#1F2937] text-sm font-medium transition-colors hover:bg-white/90"
      >
        <ArrowLeft className="w-4 h-4" />
        {tDetail('backToNews')}
      </Link>

      <p className="text-sm text-[var(--color-text-gray)] mb-4">{article.date}</p>
      <h1 className="text-4xl font-heading mb-8">{title}</h1>

      <GlassCard className="p-8 mb-8">
        <div className="prose prose-lg max-w-none">
          {body.split('\n\n').map((paragraph: string, i: number) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </GlassCard>

      <JsonLd
        id="ld-news-article"
        data={newsArticleJsonLd(
          locale,
          {
            slug,
            title,
            excerpt,
            body,
            date: article.date,
            authorName,
          },
          tSeo('siteName')
        )}
      />
      <JsonLd
        id="ld-news-article-breadcrumb"
        data={breadcrumbJsonLd(locale, [
          { name: tBc('home'), path: '' },
          { name: tBc('news'), path: 'news' },
          { name: title, path: `news/${slug}` },
        ])}
      />
    </main>
  )
}
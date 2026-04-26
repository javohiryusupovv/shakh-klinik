import { useTranslations } from 'next-intl'
import { notFound } from 'next/navigation'
import { getNewsBySlug, getAllNews } from '@/lib/services'
import { GlassCard } from '@/components/shared/GlassCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const news = getAllNews()
  return news.map(n => ({ slug: n.slug }))
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const article = getNewsBySlug(slug)
  
  if (!article) {
    notFound()
  }
  
  const t = useTranslations('news.' + slug)

  return (
    <main className="container mx-auto px-6 py-12 max-w-3xl">
      <p className="text-sm text-[var(--color-text-gray)] mb-4">{article.date}</p>
      <h1 className="text-4xl font-heading mb-8">{t('title')}</h1>
      
      <GlassCard className="p-8 mb-8">
        <div className="prose prose-lg max-w-none">
          {t('body').split('\n\n').map((paragraph: string, i: number) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </GlassCard>
    </main>
  )
}
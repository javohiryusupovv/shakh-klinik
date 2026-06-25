import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { HeroWrapper } from '@/components/home/HeroWrapper'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { PopularServices } from '@/components/home/PopularServices'
import { Stats } from '@/components/home/Stats'
import { FeaturedDoctors } from '@/components/home/FeaturedDoctors'
import { LatestNews } from '@/components/home/LatestNews'
import { Reviews } from '@/components/home/Reviews'
import { FAQ } from '@/components/home/FAQ'
import { CTASection } from '@/components/home/CTASection'
import { ImplantStages } from '@/components/home/ImplantStages'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/lib/seo/JsonLd'
import { faqJsonLd, breadcrumbJsonLd, type FAQItem } from '@/lib/seo/schemas'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo' })
  return buildMetadata({
    locale,
    path: '',
    title: t('home.title'),
    description: t('home.description'),
    keywords: t('keywords'),
    siteName: t('siteName'),
    ogImageAlt: t('ogImageAlt'),
  })
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const tFaq = await getTranslations({ locale, namespace: 'home.faq' })
  const tBc = await getTranslations({ locale, namespace: 'seo.breadcrumb' })
  const faqItems = tFaq.raw('items') as FAQItem[] | { q: string; a: string }[]
  const normalized: FAQItem[] = Array.isArray(faqItems)
    ? faqItems.map((it) =>
        'q' in it
          ? { question: it.q, answer: it.a }
          : it
      )
    : []

  return (
    <main>
      <HeroWrapper />
      <WhyChooseUs />
      <ImplantStages />
      <PopularServices />
      <Stats />
      <FeaturedDoctors />
      <LatestNews />
      <Reviews />
      <FAQ />
      <CTASection />
      <JsonLd id="ld-home-faq" data={faqJsonLd(normalized)} />
      <JsonLd
        id="ld-home-breadcrumb"
        data={breadcrumbJsonLd(locale, [{ name: tBc('home'), path: '' }])}
      />
    </main>
  )
}
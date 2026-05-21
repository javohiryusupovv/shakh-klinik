import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
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
    path: 'services',
    title: t('services.title'),
    description: t('services.description'),
    keywords: t('keywords'),
    siteName: t('siteName'),
    ogImageAlt: t('ogImageAlt'),
  })
}

export default async function ServicesLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const tBc = await getTranslations({ locale, namespace: 'seo.breadcrumb' })
  return (
    <>
      {children}
      <JsonLd
        id="ld-services-breadcrumb"
        data={breadcrumbJsonLd(locale, [
          { name: tBc('home'), path: '' },
          { name: tBc('services'), path: 'services' },
        ])}
      />
    </>
  )
}

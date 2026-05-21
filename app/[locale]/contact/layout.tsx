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
    path: 'contact',
    title: t('contact.title'),
    description: t('contact.description'),
    keywords: t('keywords'),
    siteName: t('siteName'),
    ogImageAlt: t('ogImageAlt'),
  })
}

export default async function ContactLayout({
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
        id="ld-contact-breadcrumb"
        data={breadcrumbJsonLd(locale, [
          { name: tBc('home'), path: '' },
          { name: tBc('contact'), path: 'contact' },
        ])}
      />
    </>
  )
}

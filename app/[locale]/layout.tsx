import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AppointmentModalProvider } from '@/components/shared/AppointmentModalProvider'
import { FloatingCTA } from '@/components/shared/FloatingCTA'
import { CookieConsent } from '@/components/shared/CookieConsent'
import { ScrollToTop } from '@/components/shared/ScrollToTop'
import { SplashScreen } from '@/components/shared/SplashScreen'
import { AOSInit } from '@/components/shared/AOSInit'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/lib/seo/JsonLd'
import { medicalClinicJsonLd, organizationJsonLd, type OrgInfo } from '@/lib/seo/schemas'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo' })

  return {
    ...buildMetadata({
      locale,
      path: '',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      keywords: t('keywords'),
      siteName: t('siteName'),
      ogImageAlt: t('ogImageAlt'),
    }),
    title: {
      default: t('defaultTitle'),
      template: `%s | ${t('siteName')}`,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'seo' })
  const org: OrgInfo = {
    legalName: t('org.legalName'),
    description: t('org.description'),
    addressLocality: t('org.addressLocality'),
    addressRegion: t('org.addressRegion'),
    addressCountry: t('org.addressCountry'),
    streetAddress: t('org.streetAddress'),
    postalCode: t('org.postalCode'),
    phone: t('org.phone'),
    email: t('org.email'),
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <AppointmentModalProvider>
        <AOSInit />
        <SplashScreen />
        <div className="min-h-screen bg-gradient-to-b from-white via-[#F8FAFC] to-[#E8F4FD]">
          <Header />
          <main className="relative">{children}</main>
          <Footer />
          <FloatingCTA />
          <CookieConsent />
          <ScrollToTop />
        </div>
        <JsonLd id="ld-clinic" data={medicalClinicJsonLd(locale, org)} />
        <JsonLd id="ld-organization" data={organizationJsonLd(locale, org)} />
      </AppointmentModalProvider>
    </NextIntlClientProvider>
  )
}
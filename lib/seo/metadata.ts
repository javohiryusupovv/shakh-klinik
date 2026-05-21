import type { Metadata } from 'next'
import {
  alternatesFor,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  OG_LOCALE_MAP,
  LOCALES,
} from './config'

export interface BuildMetadataInput {
  locale: string
  path?: string
  title: string
  description: string
  keywords?: string
  siteName: string
  ogImageAlt: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  publishedTime?: string
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    locale,
    path = '',
    title,
    description,
    keywords,
    siteName,
    ogImageAlt,
    image = OG_IMAGE_PATH,
    type = 'website',
    noindex = false,
    publishedTime,
  } = input

  const alternates = alternatesFor(path)
  const canonical = alternates.canonical(locale)
  const ogLocale = OG_LOCALE_MAP[locale] ?? 'ru_RU'
  const ogLocaleAlternate = LOCALES
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE_MAP[l] ?? l)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: alternates.languages,
    },
    openGraph: {
      type,
      siteName,
      title,
      description,
      url: canonical,
      locale: ogLocale,
      alternateLocale: ogLocaleAlternate,
      images: [
        {
          url: image,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: ogImageAlt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  }
}

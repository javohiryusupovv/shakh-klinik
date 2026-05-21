import { routing } from '@/i18n/routing'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shaxklinika.uz'
).replace(/\/$/, '')

export const LOCALES = routing.locales
export const DEFAULT_LOCALE = routing.defaultLocale

export const OG_IMAGE_PATH = '/og-default.jpg'
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export const OG_LOCALE_MAP: Record<string, string> = {
  ru: 'ru_RU',
  uz: 'uz_UZ',
  en: 'en_US',
}

export function localizedUrl(locale: string, path = ''): string {
  const clean = path.replace(/^\//, '').replace(/\/$/, '')
  return `${SITE_URL}/${locale}${clean ? '/' + clean : ''}`
}

export function alternatesFor(path = ''): {
  canonical: (locale: string) => string
  languages: Record<string, string>
} {
  const languages: Record<string, string> = {}
  for (const l of LOCALES) {
    languages[l] = localizedUrl(l, path)
  }
  languages['x-default'] = localizedUrl(DEFAULT_LOCALE, path)
  return {
    canonical: (locale: string) => localizedUrl(locale, path),
    languages,
  }
}

import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ru', 'uz', 'en'],
  defaultLocale: 'ru',
  localeDetection: false,
  localePrefix: 'always',
})

// Convenience re-exports for use in generateStaticParams and other files
export const locales = routing.locales
export const defaultLocale = routing.defaultLocale

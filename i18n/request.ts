import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  // Inline locale validation — hasLocale is not exported from next-intl v4 public API
  const locale =
    requested && (routing.locales as readonly string[]).includes(requested)
      ? requested
      : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

'use client'

// D-21: Language switcher using next-intl/navigation createNavigation
// next-intl v4 requires createNavigation(routing) to get typed hooks
import { createNavigation } from 'next-intl/navigation'
import { useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

const { useRouter, usePathname } = createNavigation(routing)

const LOCALE_LABELS: Record<string, string> = {
  ru: 'RU',
  uz: 'UZ',
  en: 'EN',
}

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function handleLocaleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale as 'ru' | 'uz' | 'en' })
  }

  return (
    <nav aria-label="Language switcher" style={{ display: 'flex', gap: '0.5rem' }}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          aria-current={loc === locale ? 'true' : undefined}
          style={{
            fontWeight: loc === locale ? 'bold' : 'normal',
            cursor: loc === locale ? 'default' : 'pointer',
            background: 'none',
            border: 'none',
            padding: '0.25rem 0.5rem',
            fontSize: '0.875rem',
          }}
        >
          {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
        </button>
      ))}
    </nav>
  )
}

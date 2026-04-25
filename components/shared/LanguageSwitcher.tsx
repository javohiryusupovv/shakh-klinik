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

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function handleLocaleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale as 'ru' | 'uz' | 'en' })
  }

  return (
    <nav
      aria-label="Language switcher"
      className="flex items-center gap-1 rounded-full border border-white/40 bg-white/30 px-1 py-0.5 text-xs"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale
        return (
          <button
            key={loc}
            type="button"
            onClick={() => handleLocaleChange(loc)}
            aria-current={active ? 'true' : undefined}
            className={
              active
                ? 'cursor-default rounded-full bg-[var(--color-primary)] px-2 py-0.5 font-semibold text-white'
                : 'cursor-pointer rounded-full px-2 py-0.5 font-medium text-[var(--color-text-dark)] hover:bg-white/60'
            }
          >
            {LOCALE_LABELS[loc] ?? loc.toUpperCase()}
          </button>
        )
      })}
    </nav>
  )
}

// Backward compatibility — Phase 1 layout imports default export
export default LanguageSwitcher

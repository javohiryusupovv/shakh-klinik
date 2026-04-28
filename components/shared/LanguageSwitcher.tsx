'use client'

import { useState } from 'react'
import { createNavigation } from 'next-intl/navigation'
import { useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { ChevronDown, Globe2 } from 'lucide-react'

const { useRouter, usePathname } = createNavigation(routing)

const LOCALE_FLAGS: Record<string, string> = {
  ru: '🇷🇺',
  uz: '🇺🇿',
  en: '🇬🇧',
}

const LOCALE_NAMES: Record<string, string> = {
  ru: 'Русский',
  uz: "O'zbek",
  en: 'English',
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  function handleLocaleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale as 'ru' | 'uz' | 'en' })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/30 text-sm font-medium text-[#1F2937] hover:bg-white/60 transition-all"
      >
        <Globe2 className="w-4 h-4 text-[#4A9EE7]" />
        <span>{LOCALE_FLAGS[locale]}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full -mt-56 py-2 w-52 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl z-50 overflow-hidden">
            {routing.locales.map((loc) => {
              const active = loc === locale
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleLocaleChange(loc)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all ${
                    active 
                      ? 'bg-gradient-to-r from-[#4A9EE7]/20 to-[#A8E6CF]/20 text-[#4A9EE7]' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{LOCALE_FLAGS[loc]}</span>
                  <span className="font-medium text-sm">{LOCALE_NAMES[loc]}</span>
                  {active && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-[#4A9EE7]" />
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSwitcher
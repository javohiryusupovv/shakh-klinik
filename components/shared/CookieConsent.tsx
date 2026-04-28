'use client'

// Cookie banner — fixed bottom on first visit, persisted in localStorage.
// Renders nothing during SSR (state only set after mount) → no hydration flash.
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'shax.cookieAccepted'

export function CookieConsent() {
  const t = useTranslations('cookies')
  const [show, setShow] = useState(true)

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY) === '1'
      setShow(!accepted)
    } catch {
      setShow(false)
    }
  }, [])

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="glass fixed right-4 bottom-4 left-4 z-40 flex items-center gap-3 p-4 md:right-6 md:bottom-6 md:left-auto md:max-w-md"
    >
      <p className="flex-1 text-sm text-[var(--color-text-dark)]">{t('message')}</p>
      <Button
        onClick={() => {
          try {
            localStorage.setItem(STORAGE_KEY, '1')
          } catch {
            /* noop */
          }
          setShow(false)
        }}
        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-deep)] text-white hover:from-[var(--color-primary-deep)] hover:to-[var(--color-primary-deeper)]"
      >
        {t('accept')}
      </Button>
    </div>
  )
}

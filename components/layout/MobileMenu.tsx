'use client'

// Mobile slide-out menu — uses shadcn Sheet (base-ui Dialog under the hood) — ANM-08
// Sheet handles its own AnimatePresence internally; we just compose content
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Menu, Phone } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { BookCTAButton } from '@/components/shared/BookCTAButton'

const NAV_KEYS = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'doctors', href: '/doctors' },
  { key: 'news', href: '/news' },
  { key: 'reviews', href: '/reviews' },
  { key: 'gallery', href: '/gallery' },
  { key: 'contacts', href: '/contacts' },
] as const

export function MobileMenu() {
  const tNav = useTranslations('nav')
  const tHeader = useTranslations('header')
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={tHeader('menuOpen')}
            className="md:hidden"
          />
        }
      >
        <Menu />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="glass flex flex-col gap-6 p-6 supports-backdrop-filter:backdrop-blur-xl"
      >
        <SheetHeader className="p-0">
          <SheetTitle className="text-lg">
            Shax<span className="text-[var(--color-mint)]">Klinika</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1">
          {NAV_KEYS.map(({ key, href }) => (
            <SheetClose
              key={key}
              render={
                <Link
                  href={href}
                  className="rounded-lg px-3 py-2 text-base font-medium text-[var(--color-text-dark)] transition-colors hover:bg-white/60 hover:text-[var(--color-primary-deep)]"
                />
              }
            >
              {tNav(key)}
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-white/40 pt-4">
          <a
            href="tel:+998901234567"
            className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
          >
            <Phone className="h-4 w-4" />
            <span>{tHeader('emergency24h')} · +998 90 123-45-67</span>
          </a>
          <LanguageSwitcher />
          <BookCTAButton className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Footer — RSC. 4-column grid → stacked on mobile.
// Background: solid dark primary tint with inverted text for contrast (D-13 + specifics).
// Brand icons (Instagram/Facebook/YouTube) inlined as SVG — current lucide-react@1.8.0
// does not export them. Telegram uses lucide `Send`.
// DEVIATION: plan said "Lucide icons: Send, Instagram, Facebook, Youtube" — see SUMMARY.
import { getTranslations } from 'next-intl/server'
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Link } from '@/i18n/navigation'

const NAV_KEYS = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'doctors', href: '/doctors' },
  { key: 'news', href: '/news' },
  { key: 'reviews', href: '/reviews' },
  { key: 'gallery', href: '/gallery' },
  { key: 'contacts', href: '/contacts' },
] as const

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  )
}

export async function Footer() {
  const tFooter = await getTranslations('footer')
  const tNav = await getTranslations('nav')
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 bg-[var(--color-primary-deeper)] text-white">
      <div className="container mx-auto grid gap-10 px-6 py-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {/* Column 1 — About */}
        <div className="space-y-3">
          <p className="font-heading text-xl font-bold tracking-tight">
            Shakh <span className="text-[var(--color-mint)]">Clinic</span>
          </p>
          <p className="text-sm leading-relaxed text-white/80">
            {tFooter('aboutBlurb')}
          </p>
        </div>

        {/* Column 2 — Quick links */}
        <div className="space-y-3">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            {tFooter('linksTitle')}
          </h3>
          <ul className="space-y-2 text-sm">
            {NAV_KEYS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="text-white/80 transition-colors hover:text-[var(--color-mint)]"
                >
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contacts */}
        <div className="space-y-3">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            {tFooter('contactsTitle')}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-mint)]" />
              <span>{tFooter('address')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-mint)]" />
              <a href="tel:+998901234567" className="hover:text-white">
                +998 90 123-45-67
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-mint)]" />
              <a href="mailto:info@shaxklinika.uz" className="hover:text-white">
                info@shaxklinika.uz
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-mint)]" />
              <span>{tFooter('hours')}</span>
            </li>
          </ul>
        </div>

        {/* Column 4 — Social */}
        <div className="space-y-3">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
            {tFooter('socialTitle')}
          </h3>
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/shaxklinika"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-[var(--color-mint)] hover:text-[var(--color-primary-deeper)]"
            >
              <Send className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/shaxklinika"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-[var(--color-mint)] hover:text-[var(--color-primary-deeper)]"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com/shaxklinika"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-[var(--color-mint)] hover:text-[var(--color-primary-deeper)]"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/@shaxklinika"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-[var(--color-mint)] hover:text-[var(--color-primary-deeper)]"
            >
              <YoutubeIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-4 text-center text-xs text-white/60">
          © {year} ShaxKlinika. {tFooter('rightsReserved')}
        </div>
      </div>
    </footer>
  )
}

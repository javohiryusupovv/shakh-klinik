'use client'

// Floating bottom-right column: Telegram + WhatsApp always; mobile-only booking FAB.
// Uses lucide `Send` for Telegram + `MessageCircle` for WhatsApp (no brand icon
// in lucide-react@1.8.0 — MessageCircle is a reasonable visual proxy).
import { Send, MessageCircle } from 'lucide-react'
import { BookCTAButton } from './BookCTAButton'

export function FloatingCTA() {
  return (
    <div
      className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6"
      aria-label="Quick contact"
    >
      <a
        href="https://t.me/shaxklinika"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      >
        <Send className="h-5 w-5" />
      </a>
      <a
        href="https://wa.me/998901234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <div className="md:hidden">
        <BookCTAButton variant="fab" className="h-12 px-5 shadow-lg" />
      </div>
    </div>
  )
}

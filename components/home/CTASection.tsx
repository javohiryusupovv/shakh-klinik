'use client'

import { BookCTAButton } from '@/components/shared/BookCTAButton'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-deep)]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">
          Заботьтесь о своём здоровье сегодня
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Запишитесь на консультацию прямо сейчас и получите комплексное обследование со скидкой 20%
        </p>
        <BookCTAButton />
      </div>
    </section>
  )
}
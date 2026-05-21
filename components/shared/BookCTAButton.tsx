'use client'

import { useAppointmentModal } from './AppointmentModalProvider'
import { useTranslations } from 'next-intl'
import { CalendarPlus } from 'lucide-react'

export function BookCTAButton({
  className,
}: {
  className?: string
}) {
  const { open } = useAppointmentModal()
  const t = useTranslations('header')
  
  return (
    <button
      onClick={() => open()}
      className={`
        group px-5 py-2.5
        bg-gradient-to-r from-[#4A9EE7] via-[#5BB0F0] to-[#2B7FCC]
        text-white rounded-full text-sm font-semibold
        overflow-hidden transition-all duration-300
        hover:scale-[1.02]
        ${className ?? ''}
      `}
    >
      <span className="relative flex items-center gap-1.5">
        <CalendarPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
        {t('ctaBook')}
      </span>
    </button>
  )
}
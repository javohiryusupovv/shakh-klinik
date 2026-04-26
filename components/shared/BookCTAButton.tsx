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
        group relative px-8 py-4 
        bg-gradient-to-r from-[#4A9EE7] via-[#5BB0F0] to-[#2B7FCC] 
        text-white rounded-full text-lg font-semibold 
        overflow-hidden transition-all duration-300
        hover:shadow-[0_0_30px_rgba(74,158,231,0.5)]
        hover:scale-105
        ${className ?? ''}
      `}
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <span className="relative flex items-center gap-2">
        <CalendarPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
        {t('ctaBook')}
      </span>
    </button>
  )
}
'use client'

import { useTranslations } from 'next-intl'
import { useAppointmentModal } from './AppointmentModalProvider'
import { CalendarPlus } from 'lucide-react'

interface AppointmentButtonProps {
  doctorSlug?: string
  serviceSlug?: string
  className?: string
  text?: string
}

export function AppointmentButton({
  doctorSlug,
  serviceSlug,
  className = '',
  text,
}: AppointmentButtonProps) {
  const tAppointment = useTranslations('appointment')
  const label = text ?? tAppointment('buttonDefault')
  const { open } = useAppointmentModal()

  return (
    <button
      onClick={() => open({ doctorSlug, serviceSlug })}
      className={`
        px-8 py-4
        bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-deep)]
        text-white rounded-full text-lg font-semibold
        hover:opacity-90 transition-opacity
        ${className}
      `}
    >
      <span className="flex items-center gap-2">
        <CalendarPlus className="w-5 h-5" />
        {label}
      </span>
    </button>
  )
}
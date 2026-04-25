'use client'
import { Button } from '@/components/ui/button'
import { useAppointmentModal } from './AppointmentModalProvider'
import { useTranslations } from 'next-intl'

export function BookCTAButton({
  variant = 'default',
  className,
}: {
  variant?: 'default' | 'fab'
  className?: string
}) {
  const { open } = useAppointmentModal()
  const t = useTranslations('header')
  return (
    <Button
      onClick={() => open()}
      className={
        variant === 'fab'
          ? `rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-deep)] text-white shadow-lg hover:shadow-xl ${className ?? ''}`
          : `bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-deep)] text-white hover:from-[var(--color-primary-deep)] hover:to-[var(--color-primary-deeper)] ${className ?? ''}`
      }
    >
      {t('ctaBook')}
    </Button>
  )
}

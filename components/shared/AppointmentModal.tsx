'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useTranslations } from 'next-intl'

export function AppointmentModal({
  isOpen,
  onClose,
  prefill,
}: {
  isOpen: boolean
  onClose: () => void
  prefill: { serviceSlug?: string; doctorSlug?: string } | null
}) {
  const t = useTranslations('header')
  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('ctaBook')}</DialogTitle>
        </DialogHeader>
        {/* TODO(Phase 3): Appointment form with Zod + RHF + /api/appointment */}
        <p className="text-sm text-[var(--color-text-gray)]">
          Форма записи будет доступна в следующей версии.
        </p>
      </DialogContent>
    </Dialog>
  )
}

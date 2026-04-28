'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useTranslations } from 'next-intl'
import { Loader2, Send } from 'lucide-react'

export function AppointmentModal({
  isOpen,
  onClose,
  prefill,
}: {
  isOpen: boolean
  onClose: () => void
  prefill: { serviceSlug?: string; doctorSlug?: string } | null
}) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const t = useTranslations('header')

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
    const digits = formatted.replace(/\D/g, '')
    if (digits.length > 0 && digits.length !== 10) {
      setPhoneError('10 ta raqam kiriting')
    } else {
      setPhoneError('')
    }
  }

  const isValidPhone = (value: string) => {
    const digits = value.replace(/\D/g, '')
    return digits.length === 10
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!isValidPhone(phone)) {
      setPhoneError('10 ta raqam kiriting')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          serviceSlug: prefill?.serviceSlug,
          doctorSlug: prefill?.doctorSlug,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Xatolik yuz berdi')
        return
      }

      setSuccess(true)
      setPhoneError('')
      setTimeout(() => {
        setFullName('')
        setPhone('')
        setSuccess(false)
        onClose()
      }, 2000)
    } catch {
      setError('Network xatoligi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('ctaBook')}</DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="text-center py-8">
            <p className="text-2xl mb-2">✅</p>
            <p className="text-green-600 font-medium">
              So'rovingiz qabul qilindi!
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Tez orada operatorlar bilan bog'lanamiz
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Ism familiya
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#4A9EE7] focus:ring-2 focus:ring-[#4A9EE7]/20 outline-none transition-all"
                placeholder="Ism familiyangiz"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Telefon raqam
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-lg">
                  <span className="text-lg">🇷🇺</span>
                  <span className="text-gray-400">+7</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  className={`w-full pl-16 pr-4 py-2.5 rounded-xl border transition-all outline-none ${
                    phoneError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-gray-200 focus:border-[#4A9EE7] focus:ring-2 focus:ring-[#4A9EE7]/20'
                  }`}
                  placeholder="495 123-45-67"
                />
              </div>
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#4A9EE7] to-[#2B7FCC] text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Yuborilmoqda...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Yuborish
                </>
              )}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
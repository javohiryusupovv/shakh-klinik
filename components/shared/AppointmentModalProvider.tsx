'use client'
import { createContext, useContext, useState } from 'react'
import { AppointmentModal } from './AppointmentModal'

type Prefill = { serviceSlug?: string; doctorSlug?: string }
type ModalCtx = { open: (p?: Prefill) => void; close: () => void; prefill: Prefill | null }

const Ctx = createContext<ModalCtx | null>(null)

export function AppointmentModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [prefill, setPrefill] = useState<Prefill | null>(null)
  const open = (p?: Prefill) => { setPrefill(p ?? null); setIsOpen(true) }
  const close = () => setIsOpen(false)
  return (
    <Ctx.Provider value={{ open, close, prefill }}>
      {children}
      <AppointmentModal isOpen={isOpen} onClose={close} prefill={prefill} />
    </Ctx.Provider>
  )
}

export function useAppointmentModal() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAppointmentModal must be used inside AppointmentModalProvider')
  return ctx
}

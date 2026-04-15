'use client'
// motion imports only in 'use client' files (PITFALLS §5)
import { motion, useReducedMotion } from 'motion/react'

export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const reduced = useReducedMotion()
  // PITFALLS §13 — if reduced-motion preferred, skip animation entirely
  if (reduced) return <>{children}</>
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

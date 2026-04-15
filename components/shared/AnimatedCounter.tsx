'use client'
// motion imports only in 'use client' files (PITFALLS §5)
// Phase 5 replaces this stub with count-up animation using motion animate + useInView

export function AnimatedCounter({
  value,
  suffix = '',
}: {
  value: number
  suffix?: string
}) {
  // Stub: renders final value as text. Phase 5 adds animation.
  return (
    <span>
      {value}
      {suffix}
    </span>
  )
}

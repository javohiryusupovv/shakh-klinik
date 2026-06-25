import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  /** Sarlavha ustidagi kichik badge matni (ixtiyoriy) */
  badge?: string
  /** Asosiy sarlavha */
  title: string
  /** Sarlavha ostidagi tavsif matni (ixtiyoriy) */
  subtitle?: string
  /** Matn hizalanishi */
  align?: 'left' | 'center'
  /** Tashqi qo'shimcha CSS sinflar */
  className?: string
  /** AOS animatsiya delay (ms) */
  delay?: number
}

/**
 * SectionHeading — barcha seksiyalar uchun yagona sarlavha komponenti.
 *
 * Ishlatish:
 * ```tsx
 * <SectionHeading
 *   badge="Yangiliklar"
 *   title={t('heading')}
 *   subtitle={t('subheading')}
 * />
 * ```
 */
export function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
  delay = 0,
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <div
      className={cn(isCenter && 'text-center', 'mb-10', className)}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] inline-block" />
          {badge}
        </span>
      )}

      <h2
        className={cn(
          'text-3xl md:text-4xl font-heading font-bold text-[var(--color-text-dark)] leading-tight text-balance',
          subtitle ? 'mb-3' : 'mb-0',
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'text-[var(--color-text-gray)] text-lg leading-relaxed',
            isCenter && 'max-w-2xl mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

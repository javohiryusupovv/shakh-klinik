import { Link } from '@/i18n/navigation'
import { ArrowRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NewsCardProps {
  slug: string
  date: string
  title: string
  excerpt: string
  categoryLabel?: string
  readMoreLabel?: string
  delay?: number
  className?: string
}

export function NewsCard({
  slug,
  date,
  title,
  excerpt,
  categoryLabel,
  readMoreLabel = 'Читать',
  delay = 0,
  className,
}: NewsCardProps) {
  const formatted = new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Month extract for accent display
  const month = new Date(date).toLocaleDateString('ru-RU', { month: 'short' }).toUpperCase()
  const day   = new Date(date).getDate()

  return (
    <Link
      href={`/news/${slug}`}
      data-aos="fade-up"
      data-aos-delay={delay}
      className={cn('block group h-full', className)}
    >
      <div
        className="rounded-2xl bg-white h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
        style={{
          border: '1.5px solid rgba(43,127,204,0.10)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        {/* Top accent bar with date badge */}
        <div
          className="relative px-5 pt-5 pb-4 flex items-start gap-4"
          style={{ background: 'linear-gradient(135deg,#EBF5FF 0%, #F8FCFF 100%)' }}
        >
          {/* Date block */}
          <div
            className="flex flex-col items-center justify-center w-12 h-12 rounded-xl shrink-0 text-white text-center"
            style={{ background: 'linear-gradient(135deg,#2B7FCC 0%,#1A5A94 100%)', boxShadow: '0 4px 12px rgba(26,90,148,0.30)' }}
          >
            <span className="text-lg font-bold leading-none">{day}</span>
            <span className="text-[9px] uppercase tracking-wider leading-none mt-0.5 opacity-80">{month}</span>
          </div>

          {/* Category badge */}
          {categoryLabel && (
            <span className="inline-block self-start mt-1 px-2.5 py-0.5 rounded-full bg-[#2B7FCC]/10 text-[#2B7FCC] text-xs font-semibold">
              {categoryLabel}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-[#1F2937] text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#2B7FCC] transition-colors duration-200">
            {title}
          </h3>
          <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-2 flex-1">
            {excerpt}
          </p>
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3.5 flex items-center justify-between border-t border-[#2B7FCC]/08"
        >
          <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <time dateTime={date}>{formatted}</time>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#2B7FCC] group-hover:gap-2 transition-all duration-200">
            {readMoreLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

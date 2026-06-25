import { useTranslations } from 'next-intl'
import {
  Stethoscope,
  Award,
  Clock,
  Pill,
  Smartphone,
  HeartPulse,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { WHY_REASONS_META, type WhyIconKey } from '@/lib/data/site-data'

const ICON_MAP: Record<WhyIconKey, LucideIcon> = {
  Stethoscope,
  Award,
  Clock,
  Pill,
  Smartphone,
  HeartPulse,
}

type ReasonText = { title: string; desc: string }

export function WhyChooseUs() {
  const t = useTranslations('home.whyChooseUs')
  const texts = t.raw('items') as ReasonText[]

  const reasons = WHY_REASONS_META.map((meta, i) => ({
    ...meta,
    Icon: ICON_MAP[meta.iconKey],
    ...texts[i],
  }))

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#f0f7ff] container-full">
      <div className="container mx-auto px-6">
        <SectionHeading
          badge={t('badge')}
          title={t('heading')}
          subtitle={t('subheading')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.Icon
            return (
              <div
                key={i}
                className="group relative rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: `1.5px solid ${reason.color}22`,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
                }}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 100}
              >
                {/* Subtle top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-60"
                  style={{ background: `linear-gradient(90deg, ${reason.color}, transparent)` }}
                />

                {/* 3D icon tile */}
                <div
                  className="w-13 h-13 mb-5 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(145deg, ${reason.bgColor} 0%, ${reason.color}25 100%)`,
                    boxShadow: `
                      0 6px 16px ${reason.color}30,
                      0 2px 6px rgba(0,0,0,0.08),
                      inset 0 1.5px 1.5px rgba(255,255,255,0.6),
                      inset 0 -1px 2px rgba(0,0,0,0.06)
                    `,
                    width: '52px',
                    height: '52px',
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: reason.color }} strokeWidth={1.75} />
                </div>

                {/* Number */}
                <div
                  className="absolute top-5 right-5 text-5xl font-heading font-black leading-none select-none pointer-events-none"
                  style={{ color: `${reason.color}0D` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <h3 className="text-base font-semibold mb-2 text-[#1F2937]">{reason.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{reason.desc}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg,#4A9EE7 0%,#1A5A94 100%)' }}
          >
            {t('allServicesCta')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

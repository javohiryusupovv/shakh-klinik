import { useTranslations } from 'next-intl'
import { GlassCard } from '@/components/shared/GlassCard'
import { Button } from '@/components/ui/button'
import {
  Stethoscope,
  Award,
  Clock,
  Pill,
  Smartphone,
  HeartPulse,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

const REASON_META = [
  { icon: Stethoscope, color: '#4A9EE7' },
  { icon: Award, color: '#2B7FCC' },
  { icon: Clock, color: '#A8E6CF' },
  { icon: Pill, color: '#4A9EE7' },
  { icon: Smartphone, color: '#2B7FCC' },
  { icon: HeartPulse, color: '#A8E6CF' },
] as const

type ReasonText = { title: string; desc: string }

export function WhyChooseUs() {
  const t = useTranslations('home.whyChooseUs')
  const texts = t.raw('items') as ReasonText[]
  const reasons = REASON_META.map((meta, i) => ({ ...meta, ...texts[i] }))

  return (
    <section className="py-20 container mx-auto px-6">
      <h2 className="text-4xl font-heading text-center mb-4" data-aos="fade-up">{t('heading')}</h2>
      <p className="text-[#6B7280] text-center text-lg mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="80">
        {t('subheading')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, i) => (
          <GlassCard
            key={i}
            hover={false}
            className="p-7 text-center cursor-pointer"
            glow={reason.color === '#A8E6CF' ? 'mint' : 'primary'}
            data-aos="fade-up"
            data-aos-delay={(i % 3) * 100}
          >
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${reason.color}15` }}
            >
              <reason.icon className="w-8 h-8" style={{ color: reason.color }} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#1F2937]">{reason.title}</h3>
            <p className="text-sm text-[#6B7280]">{reason.desc}</p>
          </GlassCard>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/services">
          <Button size="lg" className="gap-2">
            {t('allServicesCta')} <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Stethoscope,
  Heart,
  Brain,
  Baby,
  Droplets,
  Sparkles,
  Eye,
  Smile,
  Activity,
  UtensilsCrossed,
  Bone,
  Microscope,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getServiceBySlug, getAllServices } from '@/lib/services'
import { AppointmentButton } from '@/components/shared/AppointmentButton'
import { GlassCard } from '@/components/shared/GlassCard'
import type { CategoryId } from '@/lib/data/content'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const services = getAllServices()
  return services.map(s => ({ slug: s.slug }))
}

const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  therapy: Stethoscope,
  cardiology: Heart,
  neurology: Brain,
  gynecology: Baby,
  urology: Droplets,
  pediatrics: Baby,
  dermatology: Sparkles,
  ophthalmology: Eye,
  dentistry: Smile,
  endocrinology: Activity,
  gastroenterology: UtensilsCrossed,
  orthopedics: Bone,
  diagnostics: Microscope,
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug, locale } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const t = await getTranslations('services.' + slug)
  const tDetail = await getTranslations('servicesDetail')
  const Icon = CATEGORY_ICONS[service.categoryId] ?? Stethoscope

  function formatPrice(min: number, max: number): string {
    return `${min.toLocaleString()} – ${max.toLocaleString()} UZS`
  }

  return (
    <main>
      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A9EE7]/25 via-[#A8E6CF]/15 to-[#2B7FCC]/20">
          <div className="absolute -top-16 -left-10 w-72 h-72 rounded-full bg-[#4A9EE7]/15 blur-3xl" />
          <div className="absolute -bottom-20 -right-10 w-96 h-96 rounded-full bg-[#A8E6CF]/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-[#2B7FCC]/10 blur-2xl" />
        </div>

        <div className="relative container mx-auto px-6 pt-8 pb-16 md:pt-10 md:pb-20">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-[#4A9EE7]/20 text-[#1F2937] text-sm font-medium transition-colors hover:bg-white/90"
          >
            <ArrowLeft className="w-4 h-4" />
            {tDetail('backToServices')}
          </Link>

          <div className="flex flex-col items-center text-center mt-10">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/80 backdrop-blur-md border border-[#4A9EE7]/20 flex items-center justify-center mb-6">
              <Icon className="w-10 h-10 md:w-12 md:h-12 text-[#4A9EE7]" strokeWidth={1.8} />
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#1F2937] leading-tight max-w-3xl">
              {t('name')}
            </h1>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <GlassCard className="p-8 mb-8">
          <p className="text-lg text-[var(--color-text-dark)] leading-relaxed whitespace-pre-line">
            {t('description')}
          </p>
        </GlassCard>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <GlassCard className="p-5">
            <p className="text-sm text-[var(--color-text-gray)] mb-1">{tDetail('priceLabel')}</p>
            <p className="text-2xl font-semibold text-[var(--color-primary)]">
              {formatPrice(service.priceMin, service.priceMax)}
            </p>
          </GlassCard>
          <GlassCard className="p-5">
            <p className="text-sm text-[var(--color-text-gray)] mb-1">{tDetail('durationLabel')}</p>
            <p className="text-2xl font-semibold">
              {service.durationMinutes} {tDetail('minutesShort')}
            </p>
          </GlassCard>
        </div>

        <AppointmentButton serviceSlug={slug} />
      </div>
    </main>
  )
}

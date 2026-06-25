'use client'

import {
  MessageCircle,
  Camera,
  ScanFace,
  ClipboardList,
  Syringe,
  Settings2,
  Stethoscope,
  Award,
  Smile,
  UserRound,
  Crown,
  CalendarCheck,
  CalendarPlus,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useAppointmentModal } from '@/components/shared/AppointmentModalProvider'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { IMPLANT_STAGE_META } from '@/lib/data/site-data'

// ─── Icon registry (matches IMPLANT_STAGE_META iconKeys) ─────────────────────

const STAGE_ICON_MAP: Record<string, LucideIcon> = {
  MessageCircle,
  Camera,
  ScanFace,
  ClipboardList,
  Syringe,
  Settings2,
  Stethoscope,
  Award,
  Smile,
  UserRound,
  Crown,
  CalendarCheck,
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface StageTranslation {
  title: string
  items: string[]
}

// ─── 3D Icon Tile ─────────────────────────────────────────────────────────────

function Icon3D({
  iconKey,
  accent,
  gradientTop,
}: {
  iconKey: string
  accent: string
  gradientTop: string
}) {
  const IconComponent = STAGE_ICON_MAP[iconKey] ?? Award
  return (
    <div
      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
      style={{
        background: `linear-gradient(145deg, ${gradientTop} 0%, ${accent} 100%)`,
        boxShadow: `
          0 8px 20px ${accent}50,
          0 3px 8px rgba(0,0,0,0.14),
          inset 0 1.5px 1.5px rgba(255,255,255,0.42),
          inset 0 -1px 2px rgba(0,0,0,0.14)
        `,
      }}
    >
      <IconComponent className="w-5 h-5 text-white" strokeWidth={1.75} />
    </div>
  )
}

// ─── Stage item row ───────────────────────────────────────────────────────────

function StageItem({
  iconKey,
  label,
  accent,
  gradientTop,
}: {
  iconKey: string
  label: string
  accent: string
  gradientTop: string
}) {
  return (
    <li className="flex items-center gap-3">
      <Icon3D iconKey={iconKey} accent={accent} gradientTop={gradientTop} />
      <span className="text-[13px] text-[#374151] font-medium leading-snug">{label}</span>
    </li>
  )
}

// ─── Stage card ───────────────────────────────────────────────────────────────

function StageCard({
  stageNum,
  stageLabel,
  title,
  items,
  iconKeys,
  accent,
  gradientTop,
  lightBg,
  borderColor,
  delay,
}: {
  stageNum: number
  stageLabel: string
  title: string
  items: string[]
  iconKeys: readonly string[]
  accent: string
  gradientTop: string
  lightBg: string
  borderColor: string
  delay: number
}) {
  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{
        border: `1.5px solid ${borderColor}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
      }}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* ── Stage badge row ── */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 border-b min-w-0"
        style={{
          background: `linear-gradient(90deg, ${lightBg} 0%, #fff 100%)`,
          borderColor,
        }}
      >
        {/* Number bubble */}
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 leading-none"
          style={{
            background: `linear-gradient(135deg, ${gradientTop}, ${accent})`,
            boxShadow: `0 3px 8px ${accent}50`,
          }}
        >
          {stageNum}
        </span>

        <span
          className="hidden sm:inline text-[11px] font-semibold uppercase tracking-widest shrink-0"
          style={{ color: accent }}
        >
          {stageLabel}
        </span>

        <span className="hidden sm:inline text-gray-200 text-sm shrink-0">·</span>

        <span className="font-heading font-bold text-[#1F2937] text-sm truncate">{title}</span>
      </div>

      {/* ── Items grid (2 columns) ── */}
      <ul className="grid grid-cols-2 gap-x-3 gap-y-3 px-4 py-4">
        {items.map((label, i) => (
          <StageItem
            key={i}
            iconKey={iconKeys[i] ?? 'Award'}
            label={label}
            accent={accent}
            gradientTop={gradientTop}
          />
        ))}
      </ul>
    </div>
  )
}

// ─── Online Booking card ──────────────────────────────────────────────────────

function InstallmentCard({
  title,
  benefits,
  ctaLabel,
}: {
  title: string
  benefits: string[]
  ctaLabel: string
}) {
  const { open } = useAppointmentModal()

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col lg:w-72 shrink-0"
      style={{
        background: 'linear-gradient(155deg, #1e6bb8 0%, #1A5A94 45%, #0c3666 100%)',
        boxShadow: '0 12px 40px rgba(26,90,148,0.40), 0 4px 12px rgba(0,0,0,0.15)',
      }}
      data-aos="fade-left"
      data-aos-delay="300"
    >
      {/* Ambient orbs */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(74,158,231,0.35), transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 -left-10 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(114,196,248,0.18), transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col h-full p-6 gap-6">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'rgba(255,255,255,0.15)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 2px 6px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <CalendarPlus className="w-5 h-5 text-white" strokeWidth={1.75} />
          </div>
          <h3 className="font-heading font-bold text-white text-xl leading-tight">{title}</h3>
        </div>

        {/* Benefits */}
        <ul className="flex flex-col gap-4 flex-1">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
              <CheckCircle2
                className="w-4 h-4 shrink-0"
                style={{ color: '#4ADEAB' }}
                strokeWidth={2}
              />
              {b}
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <button
          onClick={() => open()}
          className="group mt-auto flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-white text-[#1A5A94] hover:bg-[#4A9EE7] hover:text-white active:scale-[0.98]"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ImplantStages() {
  const t = useTranslations('home.implantStages')
  const stages = t.raw('stages') as StageTranslation[]
  const benefits = t.raw('installmentBenefits') as string[]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#EBF5FF] to-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge={t('badge')}
          title={t('heading')}
          subtitle={t('subheading')}
          align="center"
        />

        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* ── Left: 3 stage cards stacked vertically ── */}
          <div className="flex-1 flex flex-col gap-4">
            {stages.map((stage, i) => {
              const meta = IMPLANT_STAGE_META[i]
              return (
                <StageCard
                  key={i}
                  stageNum={meta.stageNum}
                  stageLabel={t('stageLabel')}
                  title={stage.title}
                  items={stage.items}
                  iconKeys={meta.iconKeys}
                  accent={meta.accent}
                  gradientTop={meta.gradientTop}
                  lightBg={meta.lightBg}
                  borderColor={meta.borderColor}
                  delay={i * 100}
                />
              )
            })}
          </div>

          {/* ── Right: Online booking card ── */}
          <InstallmentCard
            title={t('installmentTitle')}
            benefits={benefits}
            ctaLabel={t('installmentCta')}
          />
        </div>
      </div>
    </section>
  )
}

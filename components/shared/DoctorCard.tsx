'use client'

import Image, { type StaticImageData } from 'next/image'
import { Link } from '@/i18n/navigation'
import { CalendarPlus, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppointmentModal } from '@/components/shared/AppointmentModalProvider'

interface DoctorCardProps {
  slug: string
  photo: string | StaticImageData
  name: string
  specialty: string
  experienceYears: number
  experienceLabel: string
  delay?: number
  className?: string
}

export function DoctorCard({
  slug,
  photo,
  name,
  specialty,
  experienceYears,
  experienceLabel,
  delay = 0,
  className,
}: DoctorCardProps) {
  const { open } = useAppointmentModal()

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className={cn(
        'group mx-auto flex w-full max-w-[380px] flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 sm:max-w-none',
        className,
      )}
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        border: '1.5px solid rgba(26,90,148,0.08)',
      }}
    >
      {/* ── Photo area ── */}
      <Link href={`/doctors/${slug}`} className="relative block aspect-[4/3] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/3]">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Experience badge — top right */}
        <div className="absolute right-3 top-3 z-10">
          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-white sm:text-xs"
            style={{
              background: 'rgba(26,90,148,0.85)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {experienceYears} {experienceLabel}
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.6), transparent)' }}
        />
      </Link>

      {/* ── Info section ── */}
      <div className="flex flex-col gap-2.5 p-3.5 sm:p-4">
        {/* Name & specialty */}
        <div>
          <h3 className="mb-0.5 text-[15px] font-bold leading-snug text-[#1F2937] sm:text-base">
            {name}
          </h3>
          <p className="text-sm font-medium leading-snug text-[#1A5A94]">
            {specialty}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* CTA button */}
        <button
          onClick={() => open()}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] sm:py-3"
          style={{ background: 'linear-gradient(135deg, #4A9EE7 0%, #1A5A94 100%)' }}
        >
          <CalendarPlus className="w-4 h-4" />
          Записаться
        </button>
      </div>
    </div>
  )
}

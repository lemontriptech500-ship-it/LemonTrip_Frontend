import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui'

export const PAGE_HERO_IMAGES = {
  flight: '/herosection_bgimage.webp?hero-v=20260908',
  hotel: '/hotels.webp',
  bus: '/buses.webp',
  train: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1800&q=85',
  visa: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1800&q=85',
  offer: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=85',
  travel: '/hero_new.png',
} as const

interface FlightPageHeroProps {
  title: string
  subtitle?: string
  /** Kept for existing call sites; all page heroes now share one size. */
  compact?: boolean
  children?: React.ReactNode
  backgroundImage?: string
}

export function FlightPageHero({
  title,
  subtitle,
  children,
  backgroundImage = PAGE_HERO_IMAGES.flight,
}: FlightPageHeroProps) {
  return (
    <>
      <section className="relative min-h-[272px] bg-neutral-900 pb-10 pt-[92px] sm:pt-[116px] lg:pt-[120px]">
        {/* Background — clipped to the banner */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#042d1b]/90 via-[#042d1b]/60 to-[#042d1b]/30" />
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute right-8 top-1/2 z-10 hidden h-16 w-[280px] -translate-y-1/2 opacity-90 xl:block">
          <Image src="/website_logo.webp" alt="" fill sizes="280px" className="object-contain object-right" />
        </div>

        <Container as="div" className="relative z-10">
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{subtitle}</p>
          )}
        </Container>
      </section>

      {children && (
        <Container as="div" className="relative z-10 -mt-10">
          {children}
        </Container>
      )}
    </>
  )
}


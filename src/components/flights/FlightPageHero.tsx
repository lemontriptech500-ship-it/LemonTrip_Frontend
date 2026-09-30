import React from 'react'
import { Container } from '@/components/ui'

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
  backgroundImage = '/herosection_bgimage2.png?hero-v=20260908',
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


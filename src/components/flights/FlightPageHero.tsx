import React from 'react'
import { Container } from '@/components/ui'

interface FlightPageHeroProps {
  title: string
  subtitle?: string
  /** Slimmer banner for checkout steps and simple list pages */
  compact?: boolean
  children?: React.ReactNode
}

export function FlightPageHero({ title, subtitle, compact = false, children }: FlightPageHeroProps) {
  return (
    <>
      <section
        className={`relative bg-neutral-900 ${
          compact
            ? 'pb-10 pt-[104px] sm:pt-[128px] lg:pt-[132px]'
            : 'pb-24 pt-[112px] sm:pt-[136px] lg:pt-[140px]'
        }`}
      >
        {/* Background — clipped to the banner */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/herosection_bgimage.webp?hero-v=20260908')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#042d1b]/90 via-[#042d1b]/60 to-[#042d1b]/30" />
        </div>

        <Container as="div" className="relative z-10">
          <h1
            className={`font-semibold tracking-tight text-white ${
              compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
            }`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">{subtitle}</p>
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
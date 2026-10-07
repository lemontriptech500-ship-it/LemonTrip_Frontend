import React from 'react'
import { Plane } from 'lucide-react'
import { TravelSearchWidget } from '@/components/search/TravelSearchWidget'

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] bg-neutral-900 pb-10 lg:h-[100svh] lg:min-h-[100svh] lg:pb-0">
      {/* Background — clipped to the hero box */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat md:hidden"
          style={{ backgroundImage: "url('/heroooo.png')", backgroundPosition: '62% center' }}
          role="img"
          aria-label="LemonTrip aircraft in a mountain landscape"
        />
        <div
          className="absolute inset-0 hidden bg-cover bg-no-repeat md:block"
          style={{ backgroundImage: "url('/heroooo.png')", backgroundPosition: 'center center' }}
          role="img"
          aria-label="Aircraft on the runway at dusk"
        />
        <div className="absolute inset-0 bg-[rgba(6,59,36,0.06)]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[rgba(3,31,24,0.34)] via-[rgba(3,31,24,0.08)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      {/* Copy */}
      <div className="relative z-10 mx-auto flex flex-col items-center px-4 pt-[108px] text-center sm:px-6 sm:pt-[112px]">
        <div className="max-w-[900px] text-white">
          <p className="mb-2 flex items-center justify-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)] sm:text-xs">
            <Plane size={14} aria-hidden="true" />
            Your journey begins here
            <Plane size={14} className="rotate-180" aria-hidden="true" />
          </p>
          <h1 className="font-heading text-[54px] font-extrabold leading-[0.9] tracking-[-0.065em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)] sm:text-[80px] md:text-[104px] lg:text-[124px] xl:text-[140px]">
            LemonTrip
          </h1>
          <p className="mx-auto mt-3 max-w-[620px] text-sm leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)] sm:text-base lg:text-lg">
            More than a destination. It’s a LemonTrip.
          </p>
        </div>
      </div>

      {/* Keep the search card in the hero on larger screens; let it flow below the copy on phones. */}
      <div className="relative z-20 mx-4 mt-8 max-w-[1100px] sm:mx-6 lg:absolute lg:inset-x-8 lg:bottom-[18px] lg:mx-auto lg:mt-0">
        <TravelSearchWidget />
      </div>
    </section>
  )
}

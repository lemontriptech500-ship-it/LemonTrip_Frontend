import React from 'react'
import {
  BadgeCheck,
  Globe2,
  Headphones,
  ShieldCheck,
  Tag,
} from 'lucide-react'
import { TravelSearchWidget } from '@/components/search/TravelSearchWidget'

const TRUST_ITEMS = [
  { icon: ShieldCheck, line1: 'Trusted Booking', line2: 'Experience' },
  { icon: Tag, line1: 'Best Deals', line2: 'Always' },
  { icon: Globe2, line1: 'Trips for', line2: 'Every Traveller' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-neutral-900 pb-8 max-md:overflow-visible lg:h-[100svh] lg:min-h-[100svh] lg:pb-0">
      {/* Full-bleed scenic image */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-neutral-900 max-md:bottom-auto max-md:h-[100svh]">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat md:hidden"
          style={{
            backgroundImage: "url('/mobilehero.jpeg')",
            backgroundPosition: 'center 100%',
            backgroundSize: 'auto calc(100% + 200px)',
          }}
          role="img"
          aria-label="LemonTrip aircraft in a mountain landscape"
        />
        <div
          className="absolute inset-0 hidden bg-cover bg-no-repeat md:block"
          style={{
            backgroundImage: "url('/Golden Sunset Airliner Over Coastal Bay.png')",
            backgroundPosition: 'center 87%',
          }}
          role="img"
          aria-label="Aircraft on the runway at dusk"
        />
        {/* Left-side scrim keeps the headline legible without dulling the sunset */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[rgba(3,24,30,0.55)] via-[rgba(3,24,30,0.15)] to-transparent lg:block" />
        <div className="absolute inset-0 bg-[rgba(3,31,24,0.1)] max-md:bg-[rgba(3,31,24,0.14)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Desktop hero copy */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1280px] px-14 lg:block lg:pt-[112px]">
        <p className="text-[13px] font-medium tracking-[0.28em] text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          EXPLORE • BOOK • TRAVEL • REPEAT
        </p>

        <div className="relative mt-4 w-fit">
          <h1 className="font-heading text-[clamp(2.75rem,min(5vw,8.5vh),5rem)] font-semibold leading-[1] tracking-[-0.03em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.4)]">
            Your
            <br />
            <span className="text-[var(--yellow)]">Journey</span> Begins
            <br />
            Here.
          </h1>

        </div>

        <p className="mt-4 max-w-[400px] text-base leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
          Discover flights, stays and experiences for every kind of traveller. More than a
          destination. It’s a LemonTrip.
        </p>

        {/* Trust badges */}
        <ul className="mt-5 flex items-center gap-6 text-white">
          {TRUST_ITEMS.map(({ icon: Icon, line1, line2 }, i) => (
            <li key={line1} className="flex items-center gap-6">
              {i > 0 && <span className="h-9 w-px bg-white/30" aria-hidden />}
              <div className="flex items-center gap-3">
                <Icon size={26} strokeWidth={1.6} className="shrink-0 text-[var(--yellow)]" />
                <span className="text-[13px] font-medium leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                  {line1}
                  <br />
                  {line2}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile hero copy (unchanged) */}
      <div
        className="absolute inset-x-0 z-10 mx-auto max-w-[560px] px-5 text-white lg:hidden"
        style={{ top: '88px' }}
      >
        <h1 className="text-center font-heading text-[clamp(2.5rem,9vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.48)]">
          Book your journey.
        </h1>
        <p className="mt-5 text-[17px] leading-[1.55] text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
          Flights, hotels, buses, trains, holiday packages and visas from LemonTrip, at prices you
          can compare.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-3 text-[14px] font-medium">
          <div className="flex items-center gap-2">
            <BadgeCheck size={20} className="shrink-0 text-[var(--yellow)]" />
            Best price guarantee
          </div>
          <div className="flex items-center gap-2">
            <Headphones size={20} className="shrink-0 text-[var(--yellow)]" />
            24/7 support
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <ShieldCheck size={20} className="shrink-0 text-[var(--yellow)]" />
            Safe &amp; secure booking
          </div>
        </div>
      </div>

      {/* Search card */}
      <div className="relative z-20 mx-4 mt-0 max-w-[960px] sm:mx-6 max-md:mt-[calc(100svh-190px)] lg:absolute lg:inset-x-8 lg:bottom-[28px] lg:mx-auto lg:mt-0">
        <TravelSearchWidget />
      </div>
    </section>
  )
}
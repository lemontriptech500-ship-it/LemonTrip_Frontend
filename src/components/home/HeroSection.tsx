import React from 'react'
import { BadgeCheck, Headset, ShieldCheck } from 'lucide-react'
import { TravelSearchWidget } from '@/components/search/TravelSearchWidget'

/**
 * HeroSection v3
 * - Header floats over the hero (absolute), so the hero content has
 *   top padding to clear it.
 * - Overflow clipping is on the background wrapper only, so the widget
 *   can straddle the bottom edge (keep this — it fixes the old clipping bug).
 * - Headline + one-line trust row restored on the left. Copy is a
 *   placeholder: edit freely.
 * - Add ~pb-16 / mt-16 to the section after the hero so the widget
 *   overlap doesn't collide with it.
 */

const TRUST = [
  { icon: BadgeCheck, label: 'Best price guarantee' },
  { icon: Headset, label: '24/7 support' },
  { icon: ShieldCheck, label: 'Safe & secure booking' },
]

export function HeroSection() {
  return (
    <section className="relative bg-neutral-900 pb-10 sm:min-h-[640px] lg:h-[100svh] lg:min-h-[100svh] lg:pb-0">
      {/* Background — clipped to the hero box */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/herosection_bgimage2.png?hero-v=20260908')" }}
          role="img"
          aria-label="Aircraft on the runway at dusk"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#042d1b]/85 via-[#042d1b]/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Copy */}
      <div className="relative z-10 px-4 pt-[152px] sm:px-6 sm:pt-[200px] lg:pl-[6vw] lg:pr-8">
        <div className="max-w-[760px] text-white">
          <h1 className="text-display !font-semibold tracking-tight">
            Book your journey.
          </h1>
          <p className="mt-4 max-w-[520px] text-base leading-relaxed text-white/85 md:text-lg">
            Flights, hotels, buses, trains, holiday packages and visas from LemonTrip, at prices you can compare.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/90">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon size={18} className="text-[var(--yellow)]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Widget: in flow on mobile, straddles the hero's bottom edge on desktop */}
      <div className="relative z-20 mx-4 mt-8 max-w-[1100px] sm:mx-6 lg:absolute lg:inset-x-8 lg:bottom-[40px] lg:mx-auto lg:mt-0">        <TravelSearchWidget />
      </div>
    </section>
  )
}
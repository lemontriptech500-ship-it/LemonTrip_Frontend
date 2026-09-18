import React from 'react'
import { TravelSearchWidget } from '@/components/search/TravelSearchWidget'

/**
 * HeroSection
 * ------------------------------------------------------------
 * BUG FIX: the floating search widget was still being clipped at
 * the bottom no matter how compact the forms got, because
 * `overflow-hidden` was on the same <section> the widget needed
 * to overflow past. A parent can't clip overflow AND let a child
 * spill outside its box — those are contradictory. Moved
 * `overflow-hidden` onto a new inner wrapper that contains ONLY
 * the background photo + gradients (which do need to stay clipped
 * to the hero's box); the search widget is now a sibling of that
 * wrapper, not nested inside it, so it renders fully regardless
 * of how tall any given tab's form is.
 *
 * NEW: added a bottom fade — the background photo now dissolves
 * into white toward the base of the hero (matching the reference),
 * instead of cutting off with a hard edge. This sits as its own
 * layer above the photo and the left-to-right dark overlay, only
 * covering the lower portion of the section.
 *
 * Everything else (text inset, headline weight/italic, trust
 * badges) is unchanged from the last version.
 */

const TRUST_BADGES = ['Best Price Guarantee', '24/7 Customer Support', 'Safe & Secure Travel']

export function HeroSection() {
  return (
    <section
      className="relative min-h-[620px] bg-[#063b24] pb-16 sm:min-h-[640px] lg:h-[calc(100svh-260px)] lg:min-h-[620px] lg:pb-0"
    >
      {/* Background layer — clipped to the hero's box */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero.png?hero-v=20260908')" }}
          role="img"
          aria-label="Traveller overlooking a green mountain valley"
        />
        {/* Directional fade — dark on the left where the text sits,
            fading out toward the right so the photo still reads */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042d1b]/95 via-[#042d1b]/70 to-[#042d1b]/10" />

        {/* Bottom fade — dissolves the photo into white so it blends
            into the section below instead of cutting off sharply */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-white/70 to-white sm:h-40 lg:h-48" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-4 pt-16 sm:px-6 sm:pt-20 lg:pl-16 lg:pr-8 lg:pt-20 xl:pl-24">
        <div className="mx-auto w-full max-w-[760px] text-left text-white lg:mx-0">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm sm:text-xs">
            ✦ Premium Travel Experience
          </span>

          <h1 className="!font-semibold text-display tracking-tight text-white">
            Travel Beyond{' '}
            <span className="text-[var(--color-primary)]">Expectations.</span>
          </h1>

          <p className="mt-5 max-w-[540px] text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
            Discover the world with reliable travel solutions, curated experiences and
            technology-driven service from LemonTrip.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5 sm:gap-3">
            {TRUST_BADGES.map((label) => (
              <span
                key={label}
                className="rounded-xl bg-white px-3.5 py-2.5 text-[11px] font-bold text-[var(--color-secondary)] shadow-sm sm:text-xs"
              >
                ✓ {label}
              </span>
            ))}
          </div>
        </div>
      </div>
              
      {/* The longer mobile forms need their own document flow. Floating the
          card only from desktop prevents it from covering the hero copy. */}
      <div className="relative z-20 mx-4 mt-8 max-w-[1100px] sm:mx-6 lg:absolute lg:inset-x-8 lg:bottom-[-40px] lg:mx-auto lg:mt-0">
        <TravelSearchWidget />
      </div>
    </section>
  )
}

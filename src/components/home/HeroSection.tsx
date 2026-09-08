import React from 'react'
import { TravelSearchWidget } from '@/components/search/TravelSearchWidget'

export function HeroSection() {
  return (
    <section className="relative h-[560px] overflow-hidden bg-[#063b24] sm:h-[540px] lg:h-[440px] xl:h-[458px]">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.png?hero-v=20260908')" }}
        role="img"
        aria-label="Traveller overlooking a green mountain valley"
      >
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-5">
        <div className="flex w-full max-w-[940px] flex-1 flex-col items-center justify-center text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#168CC8] sm:text-[11px] md:text-xs md:mb-4">
            Enterprise Travel Solutions
          </p>
          <h1 className="mb-3 max-w-3xl text-[clamp(2.2rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white md:mb-4 lg:text-[3.5rem]">
            Streamline Your Business<br />Travel
          </h1>
          <p className="max-w-[750px] px-2 text-sm leading-relaxed text-white/90 md:text-base">
            Book flights, hotels, trains, buses, and holiday packages all in one place. Need a visa? We&apos;ve got you covered with expert assistance.
          </p>
        </div>

        <div className="w-full max-w-[1100px]">
          <TravelSearchWidget />
        </div>
      </div>
    </section>
  )
}

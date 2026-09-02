import React from 'react'
import { Container } from '@/components/ui'
import { TravelSearchWidget } from '@/components/search/TravelSearchWidget'

export function HeroSection() {
  return (
    <section className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[540px]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/hero.png"
          alt="Mountain valley landscape with traveler"
          className="h-full w-full object-cover"
          style={{ objectPosition: '70% center' }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-between py-4 sm:py-5 lg:py-6">
        <div className="mx-auto flex w-full max-w-[940px] flex-1 flex-col items-center justify-center px-4 pt-6 text-center sm:px-6 lg:px-8">
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

        <div className="mt-4 w-full md:mt-5">
          <div className="mx-auto max-w-[1100px] px-2 md:px-4">
            <TravelSearchWidget />
          </div>
        </div>
      </div>
    </section>
  )
}

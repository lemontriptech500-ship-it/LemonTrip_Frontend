import React from 'react'
import { Container } from '@/components/ui'
import { TravelSearchWidget } from '@/components/search/TravelSearchWidget'

export function HeroSection() {
  return (
    <section className="relative h-[60vh]">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/hero.png"
          alt="Mountain valley landscape with traveler"
          className="h-full w-full object-cover"
          style={{ objectPosition: '70% center' }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-between py-6">
        <div className="w-full max-w-[940px] mx-auto px-4 flex flex-1 flex-col items-center justify-center pt-6 text-center">
          <p className="text-[#168CC8] text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3 md:mb-4">
            Enterprise Travel Solutions
          </p>
          <h1 className="text-white text-[36px] md:text-[52px] font-extrabold leading-[1.1] mb-4 md:mb-5 max-w-3xl">
            Streamline Your Business<br />Travel
          </h1>
          <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-[750px] px-2">
            Book flights, hotels, trains, buses, and holiday packages all in one place. Need a visa? We&apos;ve got you covered with expert assistance.
          </p>
        </div>

        <div className="w-full mt-6 md:mt-8">
          <div className="max-w-[1100px] mx-auto px-2 md:px-4">
            <TravelSearchWidget />
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { Container } from '@/components/ui'
import { TravelSearchWidget } from '../search/TravelSearchWidget'

export function HeroSection() {
  return (
    <section className="relative overflow-visible pb-16 pt-20 lg:pb-20 lg:pt-28">
      <img
        src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=2200&q=88"
        alt="Mountain landscape at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-text-primary)]/70 via-[var(--color-text-primary)]/50 to-[var(--color-text-primary)]/70" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-10 max-w-3xl text-white">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
            Enterprise Travel Solutions
          </p>
          <h1 className="text-display mb-6 text-white">
            Streamline Your Business Travel
          </h1>
          <p className="text-body-lg text-white/85">
            Book flights, hotels, trains, buses, and holiday packages all in one place. Need a visa? We&apos;ve got you covered with expert assistance.
          </p>
        </div>

        <div className="relative z-20 w-full">
          <TravelSearchWidget />
        </div>
      </Container>
    </section>
  )
}

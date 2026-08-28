import React from 'react'
import { Container } from '@/components/ui'
import { TravelSearchWidget } from '../search/TravelSearchWidget'

export function HeroSection() {
  return (
    <section className="relative overflow-visible pb-12 pt-20 lg:pb-16 lg:pt-28">
      <img
        src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=2200&q=88"
        alt="Mountain landscape at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[var(--color-text-primary)]/65" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-10 max-w-3xl text-white">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
            Plan less. Travel more.
          </p>
          <h1 className="text-display mb-6">
            Your next great escape starts here.
          </h1>
          <p className="text-body-lg text-white/85">
            Book flights, hotels, trains, buses, and holiday packages all in one place. Need a visa? We&apos;ve got you covered with expert assistance.
          </p>
        </div>

        {/* Search Widget Container */}
        <div className="relative z-20 w-full">
          <TravelSearchWidget />
        </div>
      </Container>
    </section>
  )
}

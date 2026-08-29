import React from 'react'
import { Container } from '@/components/ui'
import { TravelSearchWidget } from '../search/TravelSearchWidget'

export function HeroSection() {
  return (
    <section className="relative overflow-visible min-h-screen flex flex-col">
      <img
        src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=2200&q=88"
        alt="Mountain landscape at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-text-primary)]/75 via-[var(--color-text-primary)]/50 to-[var(--color-text-primary)]/80" />

      <Container className="relative z-10 flex flex-col items-center text-center flex-1 justify-center py-32">
        <div className="mb-10 max-w-3xl text-white animate-fade-in-up">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-secondary)]">
            Enterprise Travel Solutions
          </p>
          <h1 className="text-display mb-6 text-white">
            Streamline Your Business Travel
          </h1>
          <p className="text-body-lg text-white/85 max-w-2xl mx-auto">
            Book flights, hotels, trains, buses, and holiday packages all in one place. Need a visa? We&apos;ve got you covered with expert assistance.
          </p>
        </div>

        <div className="relative z-20 w-full animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <TravelSearchWidget />
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
    </section>
  )
}

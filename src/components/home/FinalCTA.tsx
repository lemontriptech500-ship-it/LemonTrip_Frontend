import React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { ArrowRight } from 'lucide-react'

/** FinalCTA — premium version: dark green panel with soft yellow glow. */
export function FinalCTA() {
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <div className="surface-dark relative overflow-hidden rounded-[var(--radius-2xl)] px-6 py-14 text-center shadow-[var(--shadow-xl)] sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[rgba(255,210,0,0.16)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[rgba(17,128,71,0.35)] blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow">Start planning</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              Ready for your next <span className="text-highlight">adventure?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">
              Join thousands of travelers who trust LemonTrip for their bookings. Start planning your journey today.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/flights"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-7 text-sm font-bold text-[var(--green-dark)] transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green-dark)]"
              >
                Explore Flights <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/packages"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-white/30 px-7 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green-dark)]"
              >
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
import React from 'react'
import Link from 'next/link'
import { Container, Button } from '@/components/ui'

export function FinalCTA() {
  return (
    <section className="py-24 bg-[var(--color-accent)] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <Container className="relative z-10 text-center">
        <h2 className="text-display text-white mb-6">
          Ready for your next adventure?
        </h2>
        <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-10">
          Join thousands of travelers who trust LemonTrip for their bookings. Start planning your journey today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-[var(--color-text-primary)] hover:bg-[var(--color-secondary-soft)]" asChild>
            <Link href="/flights">Explore Flights</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
            <Link href="/packages">Explore Destinations</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}

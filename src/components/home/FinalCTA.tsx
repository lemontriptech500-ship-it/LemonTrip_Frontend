import React from 'react'
import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-20 bg-[var(--color-secondary-soft)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-secondary)]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--color-primary)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <Container className="relative z-10 text-center">
        <h2 className="text-display text-[var(--color-text-primary)] mb-5">
          Ready for your next adventure?
        </h2>
        <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
          Join thousands of travelers who trust LemonTrip for their bookings. Start planning your journey today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button size="lg" icon={<ArrowRight size={16} />} iconPosition="right" asChild>
            <Link href="/flights">Explore Flights</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/packages">Explore Destinations</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}

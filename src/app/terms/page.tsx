import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the LemonTrip terms of service for using our travel services and website.',
}

export default function TermsPage() {
  return (
    <>
      <FlightPageHero
        backgroundImage={PAGE_HERO_IMAGES.travel}
        title="Terms of Service"
        subtitle="By using LemonTrip, you agree to use our website and travel services lawfully and to provide accurate information for bookings and support requests."
      />
      <main className="section-gap bg-[var(--color-background)]">
        <Container className="max-w-3xl">
          <section className="space-y-6 text-body text-[var(--color-text-secondary)]">
            <div>
              <h2 className="text-h2 text-[var(--color-text-primary)]">Bookings and payments</h2>
              <p className="mt-2">Availability, prices, supplier terms, cancellations, and refunds may vary by travel product and are shown during the booking process. A booking is confirmed only after the required payment and verification steps complete successfully.</p>
              <p className="mt-2">Questions about a booking can be raised through the support channels provided on the website.</p>
            </div>
            <div>
              <h2 className="text-h2 text-[var(--color-text-primary)]">Acceptable use</h2>
              <p className="mt-2">Do not misuse the website, submit misleading information, interfere with the service, or attempt unauthorized access.</p>
            </div>
            <div>
              <h2 className="text-h2 text-[var(--color-text-primary)]">Contact</h2>
              <p className="mt-2">For questions about these terms, contact lemontripindia@gmail.com.</p>
            </div>
          </section>
        </Container>
      </main>
    </>
  )
}

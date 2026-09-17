import type { Metadata } from 'next'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the LemonTrip terms of service for using our travel services and website.',
}

export default function TermsPage() {
  return (
    <main className="section-gap bg-[var(--color-background)]">
      <Container className="max-w-3xl">
        <h1 className="text-display">Terms of Service</h1>
        <p className="mt-4 text-body-lg text-[var(--color-text-secondary)]">
          By using LemonTrip, you agree to use our website and travel services lawfully and to provide accurate information for bookings and support requests.
        </p>
        <section className="mt-10 space-y-6 text-body text-[var(--color-text-secondary)]">
          <div>
            <h2 className="text-h2 text-[var(--color-text-primary)]">Bookings and payments</h2>
            <p className="mt-2">Availability, prices, supplier terms, cancellations, and refunds may vary by travel product and are shown during the booking process.</p>
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
  )
}

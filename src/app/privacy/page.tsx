import type { Metadata } from 'next'
import { Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the LemonTrip privacy policy and learn how we handle your information.',
}

export default function PrivacyPage() {
  return (
    <main className="section-gap bg-[var(--color-background)]">
      <Container className="max-w-3xl">
        <h1 className="text-display">Privacy Policy</h1>
        <p className="mt-4 text-body-lg text-[var(--color-text-secondary)]">
          LemonTrip respects your privacy and uses your information only to provide travel services, process bookings, respond to support requests, and improve our website.
        </p>
        <section className="mt-10 space-y-6 text-body text-[var(--color-text-secondary)]">
          <div>
            <h2 className="text-h2 text-[var(--color-text-primary)]">Information we collect</h2>
            <p className="mt-2">We may collect contact details, account information, booking details, and messages you submit through our services.</p>
          </div>
          <div>
            <h2 className="text-h2 text-[var(--color-text-primary)]">How we use information</h2>
            <p className="mt-2">We use this information to provide requested services, communicate about bookings, prevent misuse, and meet legal obligations.</p>
          </div>
          <div>
            <h2 className="text-h2 text-[var(--color-text-primary)]">Contact</h2>
            <p className="mt-2">For privacy questions, contact lemontripindia@gmail.com.</p>
          </div>
        </section>
      </Container>
    </main>
  )
}

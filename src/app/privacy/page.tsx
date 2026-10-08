import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the LemonTrip privacy policy and learn how we handle your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <FlightPageHero
        backgroundImage={PAGE_HERO_IMAGES.travel}
        title="Privacy Policy"
        subtitle="LemonTrip respects your privacy and uses your information only to provide travel services, process bookings, respond to support requests, and improve our website."
      />
      <main className="section-gap bg-[var(--color-background)]">
        <Container className="max-w-3xl">
          <section className="space-y-6 text-body text-[var(--color-text-secondary)]">
            <div>
              <h2 className="text-h2 text-[var(--color-text-primary)]">Information we collect</h2>
              <p className="mt-2">We may collect contact details, account information, booking details, and messages you submit through our services.</p>
            </div>
            <div>
              <h2 className="text-h2 text-[var(--color-text-primary)]">How we use information</h2>
              <p className="mt-2">We use this information to provide requested services, manage your account, process bookings, communicate important updates, prevent misuse, and meet legal obligations. LemonTrip does not sell personal information.</p>
            </div>
            <div>
              <h2 className="text-h2 text-[var(--color-text-primary)]">Your choices</h2>
              <p className="mt-2">You can review or update your profile details from your account. Contact support if you need help accessing, correcting, or deleting information associated with your account.</p>
            </div>
            <div>
              <h2 className="text-h2 text-[var(--color-text-primary)]">Contact</h2>
              <p className="mt-2">For privacy questions, contact lemontripindia@gmail.com.</p>
            </div>
          </section>
        </Container>
      </main>
    </>
  )
}

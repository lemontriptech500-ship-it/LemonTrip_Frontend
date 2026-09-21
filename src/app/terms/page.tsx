import { Container, Card } from '@/components/ui'

export const metadata = {
  title: 'Terms of Service',
  description: 'LemonTrip terms of service.',
}

export default function TermsPage() {
  return <div className="section-gap bg-[var(--color-background)]"><Container><Card className="mx-auto max-w-3xl p-6 sm:p-10"><p className="text-label text-[var(--color-primary-dark)]">LemonTrip</p><h1 className="mt-2 text-h1">Terms of Service</h1><p className="mt-5 text-body text-[var(--color-text-secondary)]">By using LemonTrip, you agree to provide accurate booking information and to use the platform lawfully. Supplier availability, prices, cancellation policies, and payment terms are shown during the relevant booking flow.</p><h2 className="mt-8 text-h3">Bookings and payments</h2><p className="mt-2 text-body text-[var(--color-text-secondary)]">A booking is confirmed only after the required payment and verification steps complete successfully. Questions about a booking can be raised through the support channels provided on the website.</p></Card></Container></div>
}

import { Container, Card } from '@/components/ui'

export const metadata = {
  title: 'Privacy Policy',
  description: 'LemonTrip privacy policy.',
}

export default function PrivacyPage() {
  return <div className="section-gap bg-[var(--color-background)]"><Container><Card className="mx-auto max-w-3xl p-6 sm:p-10"><p className="text-label text-[var(--color-primary-dark)]">LemonTrip</p><h1 className="mt-2 text-h1">Privacy Policy</h1><p className="mt-5 text-body text-[var(--color-text-secondary)]">We use the information you provide to manage your account, process bookings, support travel services, and communicate important updates. LemonTrip does not sell personal information.</p><h2 className="mt-8 text-h3">Information and choices</h2><p className="mt-2 text-body text-[var(--color-text-secondary)]">You can review or update your profile details from your account. Contact support if you need help accessing, correcting, or deleting information associated with your account.</p></Card></Container></div>
}

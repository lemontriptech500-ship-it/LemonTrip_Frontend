import type { Metadata } from 'next'
import { Container, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your LemonTrip account and bookings.',
}

export default function ProfilePage() {
  return (
    <Container className="section-gap">
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <Badge variant="warning">Coming Soon</Badge>
        <h1 className="text-h1 text-[var(--color-text-primary)]">My Profile</h1>
        <p className="text-body text-[var(--color-text-secondary)] max-w-md">
          The User Dashboard is under construction. Check back soon.
        </p>
      </div>
    </Container>
  )
}

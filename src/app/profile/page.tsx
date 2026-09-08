import type { Metadata } from 'next'
import ProfileContent from '@/components/profile/ProfileContent'

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your LemonTrip account and bookings.',
}

export default function ProfilePage() {
  return <ProfileContent />
}

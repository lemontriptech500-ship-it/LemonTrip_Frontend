import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hotel Booking – Find & Book Hotels',
  description: 'Find and book hotels with LemonTrip for comfortable stays and easier travel planning.',
}

export default function HotelsLayout({ children }: { children: React.ReactNode }) {
  return children
}

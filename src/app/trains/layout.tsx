import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Train Booking – Book Train Tickets',
  description: 'Search and book train tickets with LemonTrip for smooth rail journeys across India.',
}

export default function TrainsLayout({ children }: { children: React.ReactNode }) {
  return children
}

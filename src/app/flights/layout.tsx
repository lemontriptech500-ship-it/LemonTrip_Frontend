import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flight Booking – Compare & Book Flights',
  description: 'Compare and book flights with LemonTrip for simple, reliable travel planning.',
}

export default function FlightsLayout({ children }: { children: React.ReactNode }) {
  return children
}

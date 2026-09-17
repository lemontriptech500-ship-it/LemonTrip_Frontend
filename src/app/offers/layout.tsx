import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Offers & Deals',
  description: 'Discover current travel offers across flights, hotels, packages, and visa services with LemonTrip.',
}

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return children
}

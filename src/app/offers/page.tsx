import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { OffersGallery } from '@/components/offers/OffersGallery'
import { FlightPageHero, PAGE_HERO_IMAGES } from '@/components/flights/FlightPageHero'
import { featuredOffers } from '@/data/offers'

export const metadata: Metadata = {
  title: 'Offers',
  description: 'Discover current promotions across flights, stays, packages, and visa support.',
}

export const dynamic = 'force-dynamic'

export default function OffersPage() {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  const activeOffers = featuredOffers.filter((offer) => !offer.validTill || offer.validTill >= today)

  return (
    <div className="bg-[var(--color-background)] pb-16 sm:pb-20">
      <FlightPageHero
        compact
        backgroundImage={PAGE_HERO_IMAGES.offer}
        title="Offers for your next getaway"
        subtitle="Find a little more room in your travel budget with deals across flights, stays, and experiences."
      />

      <Container className="pt-10 sm:pt-14">
        <OffersGallery offers={activeOffers} />
      </Container>
    </div>
  )
}

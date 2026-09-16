import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { TravelBenefits } from '@/components/home/TravelBenefits'
import { PopularDestinations } from '@/components/home/PopularDestinations'
import { QuickCategories } from '@/components/home/QuickCategories'
import { FeaturedOffers } from '@/components/home/FeaturedOffers'
import { TrendingDestinations } from '@/components/home/TrendingDestinations'
import { PopularPackages } from '@/components/home/PopularPackages'
import { VisaHighlight } from '@/components/home/VisaHighlight'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { TrustSection } from '@/components/home/TrustSection'
import { BlogPreview } from '@/components/home/BlogPreview'
import { FinalCTA } from '@/components/home/FinalCTA'

export const metadata: Metadata = {
  title: 'LemonTrip – Flights, Hotels, Tours & Visa',
  description: 'Book flights, hotels, tours, buses and travel packages with LemonTrip. Explore easy travel booking and visa services.',
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'LemonTrip',
              url: 'https://lemontrip.in/',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'LemonTrip',
              url: 'https://lemontrip.in/',
            },
          ]),
        }}
      />
      <div className="flex flex-col w-full">
      <HeroSection />
      <TravelBenefits />
      <PopularDestinations />
      <QuickCategories />
      <FeaturedOffers />
      <TrendingDestinations />
      <PopularPackages />
      <VisaHighlight />
      <WhyChooseUs />
      <TrustSection />
      <BlogPreview />
      <FinalCTA />
      </div>
    </>
  )
}

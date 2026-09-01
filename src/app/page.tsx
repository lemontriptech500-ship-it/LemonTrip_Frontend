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
  title: 'Home',
  description: 'LemonTrip — Your smart travel companion for flights, hotels, trains, buses, packages and visa services.',
}

export default function HomePage() {
  return (
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
  )
}

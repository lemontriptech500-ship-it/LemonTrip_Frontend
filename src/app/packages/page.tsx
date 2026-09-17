import type { Metadata } from 'next'
import { Container, SectionHeading } from '@/components/ui'
import { searchPackages } from '@/services/packageService'
import { PackageCard } from '@/components/packages/PackageCard'

export const metadata: Metadata = {
  title: 'Travel Packages & Tours',
  description: 'Explore curated travel packages and tours with LemonTrip.',
}

export const dynamic = 'force-dynamic'

export default async function PackagesPage() {
  const { packages } = await searchPackages({})
  const nationalPackages = packages.filter((pkg) => pkg.category === 'national')
  const internationalPackages = packages.filter((pkg) => pkg.category === 'international')
  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading
          title="Tours & Packages"
          description="Choose from national escapes across India and international holidays around the world."
        />
        <section className="mt-10">
          <h2 className="text-h2">National Tours</h2>
          <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">Discover India, from heritage cities and spiritual journeys to beaches and mountain escapes.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {nationalPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
          </div>
        </section>
        <section className="mt-14">
          <h2 className="text-h2">International Tours</h2>
          <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">Plan memorable holidays beyond India with curated international packages.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {internationalPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
          </div>
        </section>
      </Container>
    </div>
  )
}
import { Container, SectionHeading } from '@/components/ui'
import { searchPackages } from '@/services/packageService'
import { PackageCard } from '@/components/packages/PackageCard'

export const dynamic = 'force-dynamic'

export default async function PackagesPage() {
  const { packages: popularPackages } = await searchPackages({})
  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container>
        <SectionHeading
          title="Holiday Packages"
          description="Explore curated getaways with handpicked stays and experiences."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {popularPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </Container>
    </div>
  )
}
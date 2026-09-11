import Link from 'next/link'
import { Clock, MapPin, CheckCircle2 } from 'lucide-react'
import { Button, Card, Container, SectionHeading } from '@/components/ui'
import { searchPackages } from '@/services/packageService'

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
            <Card key={pkg.id} className="overflow-hidden" hover padding="none">
              <div className={`relative h-52 ${pkg.imageFallbackColor}`}>
                {pkg.imageUrl && <img src={pkg.imageUrl} alt={`${pkg.destination} travel package`} className="h-full w-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,62,80,0.50)] to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-3 py-1 text-sm font-bold text-[var(--green-dark)] shadow-sm">
                  {pkg.startingPrice}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <Clock size={14} />
                  <span>{pkg.duration}</span>
                </div>
                <h2 className="mt-2 text-h3">{pkg.destination}</h2>
                <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">{pkg.description}</p>
                <div className="mt-4 space-y-1.5">
                  {pkg.highlights.slice(0, 3).map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-xs text-[var(--color-text-primary)]">
                      <CheckCircle2 size={14} className="text-[var(--color-success)] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-5" fullWidth variant="outline" asChild>
                  <Link href={`/packages/${pkg.id}`}>View package</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}

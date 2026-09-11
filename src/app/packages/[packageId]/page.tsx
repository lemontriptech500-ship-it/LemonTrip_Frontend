import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Button, Card, Container, Badge } from '@/components/ui'
import { getPackageById } from '@/services/packageService'

export const dynamic = 'force-dynamic'

export default async function PackageDetailsPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params
  const pkg = await getPackageById(packageId)

  if (!pkg) {
    return (
      <div className="section-gap">
        <Container>
          <Card className="text-center py-12">
            <h1 className="text-h2 text-[var(--color-text-primary)] mb-2">Package not found</h1>
            <p className="text-[var(--color-text-secondary)] mb-6">This travel package is no longer available.</p>
            <Button asChild>
              <Link href="/packages">Back to packages</Link>
            </Button>
          </Card>
        </Container>
      </div>
    )
  }

  return (
    <div className="section-gap bg-[var(--color-background)]">
      <Container className="max-w-4xl">
        <Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}>
          <Link href="/packages">Back to packages</Link>
        </Button>

        <Card className="mt-6 overflow-hidden" padding="none">
          <div className={`relative h-72 ${pkg.imageFallbackColor}`}>
            {pkg.imageUrl && <img src={pkg.imageUrl} alt={`${pkg.destination} travel package`} className="h-full w-full object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,62,80,0.60)] to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Badge variant="neutral" className="mb-2 bg-[var(--color-surface)]/90">{pkg.duration}</Badge>
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">{pkg.destination}</h1>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">{pkg.description}</p>

            <h2 className="mt-8 text-h3">Package Highlights</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {pkg.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)]">
                  <CheckCircle2 size={16} className="text-[var(--color-success)] shrink-0" />
                  <span className="text-sm text-[var(--color-text-primary)]">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-5 rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
              <div>
                <p className="text-caption text-[var(--color-text-secondary)]">Starting from</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">{pkg.startingPrice}</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-warning-bg)] border border-[rgba(22, 160, 133, 0.20)">
                <AlertCircle size={16} className="text-[var(--color-warning)]" />
                <span className="text-sm font-medium text-[var(--color-warning)]">Booking coming soon</span>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  )
}

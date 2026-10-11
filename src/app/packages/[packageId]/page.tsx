import Link from 'next/link'
import { ArrowLeft, BedDouble, CalendarDays, Check, CircleHelp, Clock3, MapPin, Plane, Users } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { getPackageById } from '@/services/packageService'
import { TravelRazorpayCheckout } from '@/components/booking/TravelRazorpayCheckout'
import { PackageGalleryCarousel } from '@/components/packages/PackageGalleryCarousel'
import { getPackageImages } from '@/data/packageImages'

export const dynamic = 'force-dynamic'

type PackageCopy = {
  overview: string
  location: string
  bestFor: string
  itinerary: string[]
  included: string[]
  excluded: string[]
  important: string[]
}

function parsePackageDescription(description: string): PackageCopy {
  const lines = description.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  const afterHeading = (names: string[]) => {
    const index = lines.findIndex((line) => names.some((name) => line.toLowerCase().replace(/:$/, '') === name.toLowerCase()))
    if (index < 0) return []
    const stop = lines.findIndex((line, next) => next > index && /^(location|price|best for|day-wise itinerary|itinerary|what'?s included|included|not included|excluded|stay details|additional notes|important)(?:\s*:|$)/i.test(line))
    return lines.slice(index + 1, stop < 0 ? lines.length : stop)
  }
  const field = (name: string) => lines.find((line) => line.toLowerCase().startsWith(`${name.toLowerCase()}:`))?.slice(name.length + 1).trim() ?? ''
  const parseList = (values: string[]) => values.map((line) => line.replace(/^[-•]\s*/, '').trim()).filter(Boolean)
  const overview = afterHeading(['Overview'])[0] ?? description.split(/\r?\n/).find((line) => line.trim()) ?? ''
  const itinerary = parseList([...afterHeading(['Day-wise itinerary', 'Itinerary']), ...lines.filter((line) => /^Day\s+\d+\s*[:—-]/i.test(line))])
  return {
    overview,
    location: field('Location'),
    bestFor: field('Best for'),
    itinerary: [...new Set(itinerary)],
    included: parseList([...afterHeading(["What's included", 'Included']), ...lines.filter((line) => /^Included:/i.test(line)).map((line) => line.replace(/^Included:\s*/i, '').split(/;\s*/)).flat()]),
    excluded: parseList([...afterHeading(['Not included', 'Excluded']), ...lines.filter((line) => /^Excluded:/i.test(line)).map((line) => line.replace(/^Excluded:\s*/i, '').split(/;\s*/)).flat()]),
    important: lines.filter((line) => /^(Important|Additional notes):/i.test(line)).map((line) => line.replace(/^(Important|Additional notes):\s*/i, '')),
  }
}

function DetailList({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  if (!items.length) return null
  const List = ordered ? 'ol' : 'ul'
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
      <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h2>
      <List className="mt-4 space-y-3">
        {items.map((item, index) => <li key={`${title}-${index}`} className="flex gap-3 text-sm leading-6 text-[var(--color-text-secondary)]">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-primary-soft)] text-xs font-bold text-[var(--color-primary)]">{ordered ? index + 1 : <Check size={14} />}</span>
          <span>{item}</span>
        </li>)}
      </List>
    </section>
  )
}

export default async function PackageDetailsPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params
  const pkg = await getPackageById(packageId)

  if (!pkg) {
    return <div className="section-gap"><Container><Card className="py-12 text-center">
      <h1 className="mb-2 text-h2">Package not found</h1>
      <p className="mb-6 text-[var(--color-text-secondary)]">This travel package is no longer available.</p>
      <Button asChild><Link href="/packages">Back to packages</Link></Button>
    </Card></Container></div>
  }

  const parsedCopy = parsePackageDescription(pkg.description)
  const copy: PackageCopy = {
    overview: pkg.shortDescription || parsedCopy.overview,
    location: pkg.location || parsedCopy.location,
    bestFor: pkg.bestFor || parsedCopy.bestFor,
    itinerary: pkg.itinerary?.length ? pkg.itinerary.map((day) => `${day.day}: ${day.title}${day.description ? ` — ${day.description}` : ''}`) : parsedCopy.itinerary,
    included: pkg.inclusions?.length ? pkg.inclusions : parsedCopy.included,
    excluded: pkg.exclusions?.length ? pkg.exclusions : parsedCopy.excluded,
    important: pkg.notes?.length ? pkg.notes : parsedCopy.important,
  }
  const amount = Number(pkg.startingPrice.replace(/[^0-9.]/g, ''))
  const price = Number.isFinite(amount) && amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : pkg.startingPrice
  const images = getPackageImages(pkg)

  return (
    <main className="bg-[var(--color-background)] pb-16">
      <Container className="max-w-6xl pt-4 sm:pt-8">
        <Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}><Link href="/packages">All holiday packages</Link></Button>

        <div className={`mt-4 rounded-3xl ${pkg.imageFallbackColor}`}>
          <PackageGalleryCarousel images={images} title={pkg.destination} duration={pkg.duration} category={pkg.category === 'international' ? 'International' : 'Domestic'} />
          {copy.location && <p className="mt-3 flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><MapPin size={16} />{copy.location}</p>}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <section className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Clock3, label: 'Duration', value: pkg.duration },
                { icon: BedDouble, label: 'Accommodation', value: pkg.accommodationDetails || 'Details confirmed in the written quote' },
                { icon: Plane, label: 'Meals & transfers', value: [pkg.mealPlan, pkg.transportDetails].filter(Boolean).join(' ') || 'Details confirmed in the written quote' },
              ].map(({ icon: Icon, label, value }) => <div key={label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <Icon size={18} className="text-[var(--color-primary)]" /><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">{label}</p><p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">{value}</p>
              </div>)}
            </section>

            <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">About this package</h2>
              <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">{copy.overview}</p>
              {copy.bestFor && <p className="mt-4 text-sm text-[var(--color-text-secondary)]"><strong className="text-[var(--color-text-primary)]">Best for:</strong> {copy.bestFor}</p>}
            </section>

            <DetailList title="Top experiences" items={pkg.highlights} />
            <DetailList title="Itinerary" items={copy.itinerary} ordered />
            {(copy.included.length > 0 || copy.excluded.length > 0) && <div className="grid gap-5 md:grid-cols-2">
              <DetailList title="Package includes" items={copy.included} />
              <DetailList title="Package excludes" items={copy.excluded} />
            </div>}
            {pkg.cancellationPolicy && <p className="text-sm leading-6 text-[var(--color-text-secondary)]"><strong>Cancellation:</strong> {pkg.cancellationPolicy}</p>}
            {pkg.termsAndConditions && <p className="text-sm leading-6 text-[var(--color-text-secondary)]"><strong>Terms:</strong> {pkg.termsAndConditions}</p>}
            {copy.important.length > 0 && <aside className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              <CircleHelp size={19} className="mt-0.5 shrink-0" /> <div><strong>Good to know</strong>{copy.important.map((note) => <p key={note} className="mt-1">{note}</p>)}</div>
            </aside>}
          </div>

          <aside className="h-fit rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Package price</p>
            <p className="mt-1 text-3xl font-bold text-[var(--color-text-primary)]">{price}<span className="ml-1 text-sm font-medium text-[var(--color-text-secondary)]">/ person</span></p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{pkg.duration}{copy.location ? ` · ${copy.location}` : ''}</p>
            <div className="my-5 space-y-3 border-y border-[var(--color-border)] py-4 text-sm text-[var(--color-text-secondary)]">
              <p className="flex gap-2"><CalendarDays size={16} className="shrink-0" />Choose your preferred departure date during booking.</p>
              <p className="flex gap-2"><Users size={16} className="shrink-0" />Price shown per traveller; final details are confirmed before payment.</p>
            </div>
            <TravelRazorpayCheckout itemType="package" itemId={pkg.id} amount={amount} quantityLabel="Travellers" label={`${pkg.destination} package`} />
          </aside>
        </div>
      </Container>
    </main>
  )
}

import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, BedDouble, CalendarDays, Check, CircleHelp,
  Clock3, MapPin, Plane, Users, X,
} from 'lucide-react'
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

function SectionHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail?: string }) {
  return <div className="mb-5">
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--green-2)]">{eyebrow}</p>
    <h2 className="mt-1 font-heading text-3xl font-semibold tracking-tight text-[var(--green-dark)] sm:text-4xl">{title}</h2>
    {detail && <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">{detail}</p>}
  </div>
}

function Itinerary({ items }: { items: string[] }) {
  if (!items.length) return null
  return <section id="itinerary" className="scroll-mt-24">
    <SectionHeading eyebrow="The journey" title="Your day-by-day itinerary" detail="A suggested flow for your trip. The final schedule is confirmed with your written quote." />
    <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-[var(--line)]">
      {items.map((item, index) => {
        const match = item.match(/^(Day\s*\d+)\s*[:—-]\s*(.*)$/i)
        const day = match?.[1] ?? `Day ${index + 1}`
        const body = match?.[2] ?? item
        const [title, ...descriptionParts] = body.split(/:\s*/, 2)
        const description = descriptionParts.join(': ')
        return <li key={`${day}-${index}`} className="relative flex gap-4 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-[var(--shadow-xs)] sm:gap-5 sm:p-5">
          <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-4 border-white bg-[var(--yellow)] text-xs font-extrabold text-[var(--green-dark)] shadow-sm">{String(index + 1).padStart(2, '0')}</span>
          <div className="pt-0.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--green-2)]">{day}</p>
            <h3 className="mt-1 font-heading text-xl font-semibold text-[var(--green-dark)] sm:text-2xl">{title}</h3>
            {description && <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">{description}</p>}
          </div>
        </li>
      })}
    </ol>
  </section>
}

function IncludedCard({ title, items, excluded = false }: { title: string; items: string[]; excluded?: boolean }) {
  if (!items.length) return null
  const Icon = excluded ? X : Check
  return <section className={`rounded-3xl border p-5 sm:p-6 ${excluded ? 'border-[var(--line)] bg-[#f2f5f3]' : 'border-[#d6e9dc] bg-[#f2f8f3]'}`}>
    <div className="flex items-center gap-3">
      <span className={`grid h-10 w-10 place-items-center rounded-2xl ${excluded ? 'bg-white text-[var(--muted)]' : 'bg-[var(--green-dark)] text-[var(--yellow)]'}`}><Icon size={18} /></span>
      <h3 className="font-heading text-2xl font-semibold text-[var(--green-dark)]">{title}</h3>
    </div>
    <ul className="mt-5 space-y-3">
      {items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--color-text-secondary)]"><Icon size={16} className={`mt-1 shrink-0 ${excluded ? 'text-[var(--muted)]' : 'text-[var(--green-2)]'}`} /><span>{item}</span></li>)}
    </ul>
  </section>
}

export default async function PackageDetailsPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params
  const pkg = await getPackageById(packageId)

  if (!pkg) {
    return <div className="px-4 pb-16 pt-28 sm:px-6"><Container><Card className="py-12 text-center">
      <h1 className="mb-2 text-h2">Package not found</h1>
      <p className="mb-6 text-[var(--color-text-secondary)]">This travel package is no longer available.</p>
      <Button asChild><Link href="/packages">Back to packages</Link></Button>
    </Card></Container></div>
  }

  const parsedCopy = parsePackageDescription(pkg.description)
  const copy: PackageCopy = {
    // Keep the fuller editorial overview in the package description when one exists.
    overview: parsedCopy.overview || pkg.shortDescription || pkg.description,
    location: pkg.location || parsedCopy.location,
    bestFor: pkg.bestFor || parsedCopy.bestFor,
    itinerary: pkg.itinerary?.length ? pkg.itinerary.map((day) => `${day.day} — ${day.title}${day.description ? `: ${day.description}` : ''}`) : parsedCopy.itinerary,
    included: pkg.inclusions?.length ? pkg.inclusions : parsedCopy.included,
    excluded: pkg.exclusions?.length ? pkg.exclusions : parsedCopy.excluded,
    important: pkg.notes?.length ? pkg.notes : parsedCopy.important,
  }
  const amount = Number(pkg.startingPrice.replace(/[^0-9.]/g, ''))
  const price = Number.isFinite(amount) && amount > 0 ? `₹${amount.toLocaleString('en-IN')}` : pkg.startingPrice
  const images = getPackageImages(pkg)
  const tripFacts = [
    { icon: Clock3, label: 'Duration', value: pkg.duration },
    { icon: BedDouble, label: 'Stay', value: pkg.accommodationDetails || 'Stay details confirmed in your quote' },
    { icon: Plane, label: 'Meals & travel', value: [pkg.mealPlan, pkg.transportDetails].filter(Boolean).join(' · ') || 'Details confirmed in your quote' },
  ]

  return (
    <main className="pb-20">
      <div className="bg-gradient-to-b from-[#eaf2ec] via-[var(--color-background)] to-[var(--color-background)] px-4 pb-8 pt-[88px] sm:px-6 sm:pb-12 sm:pt-[104px]">
        <Container className="max-w-6xl">
          <Link href="/packages" className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-xs font-semibold text-[var(--green-dark)] shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--green-2)]"><ArrowLeft size={15} />All holiday packages</Link>
          <PackageGalleryCarousel images={images} title={pkg.destination} duration={pkg.duration} category={pkg.category === 'international' ? 'International' : 'Domestic'} location={copy.location} />
        </Container>
      </div>

      <Container className="max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start lg:gap-10">
          <div className="order-2 space-y-10 lg:order-1">
            <section id="overview" className="scroll-mt-24">
              <SectionHeading eyebrow="A little about the trip" title="The experience" />
              <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[var(--shadow-sm)] sm:p-7">
                <p className="text-[15px] leading-7 text-[var(--color-text-secondary)] sm:text-base sm:leading-8">{copy.overview}</p>
                {copy.bestFor && <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[var(--line)] pt-4 text-sm"><span className="rounded-full bg-[var(--yellow-soft)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--green-dark)]">A good fit for</span><span className="text-[var(--color-text-secondary)]">{copy.bestFor}</span></div>}
              </div>
            </section>

            <section id="highlights" className="scroll-mt-24">
              <SectionHeading eyebrow="Make it memorable" title="Top experiences" />
              <div className="grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((highlight, index) => <div key={highlight} className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-[var(--shadow-xs)]"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--yellow-soft)] text-xs font-bold text-[var(--green-dark)]">{String(index + 1).padStart(2, '0')}</span><p className="pt-1 text-sm leading-6 text-[var(--color-text-secondary)]">{highlight}</p></div>)}
              </div>
            </section>

            <Itinerary items={copy.itinerary} />

            {(copy.included.length > 0 || copy.excluded.length > 0) && <section id="included" className="scroll-mt-24">
              <SectionHeading eyebrow="Know what to expect" title="Included in your trip" />
              <div className="grid gap-4 md:grid-cols-2">
                <IncludedCard title="Package includes" items={copy.included} />
                <IncludedCard title="Package excludes" items={copy.excluded} excluded />
              </div>
            </section>}

            {(copy.important.length > 0 || pkg.cancellationPolicy || pkg.termsAndConditions) && <section className="rounded-3xl border border-[#eadfba] bg-[#fffaf0] p-5 sm:p-6">
              <div className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--yellow-soft)] text-[var(--green-dark)]"><CircleHelp size={18} /></span><div><h2 className="font-heading text-2xl font-semibold text-[var(--green-dark)]">Good to know</h2>
                {copy.important.map((note) => <p key={note} className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{note}</p>)}
                {pkg.cancellationPolicy && <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]"><strong className="text-[var(--ink)]">Cancellation:</strong> {pkg.cancellationPolicy}</p>}
                {pkg.termsAndConditions && <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]"><strong className="text-[var(--ink)]">Terms:</strong> {pkg.termsAndConditions}</p>}
              </div></div>
            </section>}
          </div>

          <aside className="order-1 lg:sticky lg:top-24 lg:order-2">
            <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[var(--shadow-lg)]">
              <div className="bg-[var(--green-dark)] px-5 py-5 text-white sm:px-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--yellow)]">Your trip at a glance</p>
                <div className="mt-2 flex items-end justify-between gap-3"><div><p className="font-heading text-3xl font-semibold">{price}</p><p className="text-xs text-white/70">per traveller · {pkg.startingPrice.toLowerCase().includes('sample') ? 'illustrative price' : 'starting price'}</p></div><span className="mb-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{pkg.duration}</span></div>
              </div>
              <div className="space-y-4 p-5 sm:p-6">
                {copy.location && <p className="flex items-start gap-2 text-sm font-medium text-[var(--green-dark)]"><MapPin size={16} className="mt-0.5 shrink-0 text-[var(--green-2)]" />{copy.location}</p>}
                <div className="space-y-3 border-y border-[var(--line)] py-4">
                  {tripFacts.map(({ icon: Icon, label, value }) => <div key={label} className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[var(--color-background-soft)] text-[var(--green-2)]"><Icon size={16} /></span><div><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">{label}</p><p className="mt-0.5 text-xs leading-5 text-[var(--ink)]">{value}</p></div></div>)}
                </div>
                <div className="space-y-3 text-xs leading-5 text-[var(--color-text-secondary)]">
                  <p className="flex gap-2"><CalendarDays size={15} className="mt-0.5 shrink-0 text-[var(--green-2)]" />Choose your preferred departure date during booking.</p>
                  <p className="flex gap-2"><Users size={15} className="mt-0.5 shrink-0 text-[var(--green-2)]" />Final availability and package details are confirmed before payment.</p>
                </div>
                <div className="pt-1"><TravelRazorpayCheckout itemType="package" itemId={pkg.id} amount={amount} quantityLabel="Travellers" label={`Continue with ${pkg.destination}`} /></div>
                <p className="text-center text-[10px] text-[var(--muted)]">No dates are reserved until confirmed by LemonTrip.</p>
              </div>
            </div>
            <Link href="/contact" className="mt-3 flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-xs font-semibold text-[var(--green-dark)] transition hover:border-[var(--green-2)] hover:shadow-sm">Need help planning this trip?<span className="flex items-center gap-1 text-[var(--green-2)]">Talk to us <ArrowRight size={14} /></span></Link>
          </aside>
        </div>
      </Container>
    </main>
  )
}

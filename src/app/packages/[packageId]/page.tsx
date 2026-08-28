import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Clock } from 'lucide-react'
import { Button, Card, Container } from '@/components/ui'
import { popularPackages } from '@/data/packages'

export default async function PackageDetailsPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params
  const pkg = popularPackages.find((item) => item.id === packageId)
  if (!pkg) return <div className="section-gap"><Container><Card><h1 className="text-h2">Package not found</h1><Button className="mt-6" asChild><Link href="/packages">Back to packages</Link></Button></Card></Container></div>
  return <div className="section-gap bg-[var(--color-surface-secondary)]"><Container className="max-w-4xl"><Button variant="ghost" size="sm" asChild icon={<ArrowLeft size={16} />}><Link href="/packages">Back to packages</Link></Button><Card className="mt-6 overflow-hidden" padding="none"><div className={`relative h-72 ${pkg.imageFallbackColor}`}>{pkg.imageUrl && <img src={pkg.imageUrl} alt={`${pkg.destination} travel package`} className="h-full w-full object-cover" />}<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /><h1 className="absolute bottom-6 left-6 text-3xl font-bold text-white">{pkg.destination}</h1></div><div className="p-6 sm:p-8"><p className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><Clock size={16} />{pkg.duration}</p><p className="mt-4 max-w-2xl leading-relaxed text-[var(--color-text-secondary)]">{pkg.description}</p><h2 className="mt-8 text-xl font-bold">Package highlights</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{pkg.highlights.map((highlight) => <p key={highlight} className="flex items-center gap-2 text-sm"><CheckCircle2 size={17} className="text-[var(--color-success)]" />{highlight}</p>)}</div><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border-light)] pt-6"><p className="text-2xl font-bold">{pkg.startingPrice}</p><Button disabled>Booking coming soon</Button></div></div></Card></Container></div>
}

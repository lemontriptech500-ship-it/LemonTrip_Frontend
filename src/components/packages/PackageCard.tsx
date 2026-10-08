'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Clock, CheckCircle2, ShoppingCart, Check, Sparkles, MapPin, Compass } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { useCartStore } from '@/store/cartStore'
import type { HolidayPackage } from '@/data/packages'

interface PackageCardProps {
  pkg: HolidayPackage
  featured?: boolean
}

/**
 * Stopgap: extracts a numeric amount from strings like
 * "From INR 129,900 (Sample)" so the cart has a real number to total.
 * TODO: replace with a numeric `price` field from the backend once
 * the packages table exposes one (like hotels.starting_price).
 */
function parsePackagePrice(startingPrice: string): number {
  const match = startingPrice.match(/[\d,]+/)
  if (!match) return 0
  return Number(match[0].replace(/,/g, '')) || 0
}

export function PackageCard({ pkg, featured = false }: PackageCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [justAdded, setJustAdded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: `package-${pkg.id}`,
      type: 'package',
      name: pkg.destination,
      description: `${pkg.duration} · ${pkg.description}`,
      price: parsePackagePrice(pkg.startingPrice),
      imageUrl: pkg.imageUrl,
      details: {
        packageId: pkg.id,
        duration: pkg.duration,
      },
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <Card className={`group h-full overflow-hidden rounded-2xl border-[var(--color-border)] ${featured ? 'flex flex-col md:grid md:grid-cols-[1.1fr_1fr]' : 'flex flex-col'}`} hover padding="none">
      <Link href={`/packages/${pkg.id}`} aria-label={`Explore ${pkg.destination}`} className={`relative block shrink-0 overflow-hidden ${featured ? 'h-72 md:h-full md:min-h-[410px]' : 'h-72 sm:h-80'} bg-[var(--color-secondary-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--yellow)] ${pkg.imageFallbackColor}`}>
        <div className="absolute inset-0 flex items-center justify-center"><Compass size={64} strokeWidth={1} aria-hidden="true" className="text-[var(--green-2)]" /></div>
        {pkg.imageUrl && !imageFailed && (
          // Package images may come from any host supplied by the catalog API.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pkg.imageUrl} alt="" loading="lazy" onError={() => setImageFailed(true)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062d1b]/70 via-transparent to-black/10" />
        <div className="absolute inset-x-4 top-4 flex flex-wrap items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[var(--green-dark)]"><MapPin size={13} aria-hidden="true" />{pkg.category === 'national' ? 'India' : 'International'}</span>
          {pkg.badge && <span className="inline-flex items-center gap-1 rounded-full bg-[var(--yellow)] px-3 py-1.5 text-xs font-bold text-[var(--green-dark)]"><Sparkles size={12} aria-hidden="true" />{pkg.badge}</span>}
        </div>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-[#063b24]/65 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"><Clock size={14} aria-hidden="true" />{pkg.duration}</span>
      </Link>
      <div className={`flex flex-1 flex-col p-6 ${featured ? 'sm:p-9' : 'sm:p-7'}`}>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[var(--green-2)]">{featured ? 'In the spotlight' : 'Discover somewhere new'}</p>
        <h3 className="font-heading text-3xl font-semibold leading-tight text-[var(--green-dark)]"><Link href={`/packages/${pkg.id}`} className="hover:text-[var(--green-2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--green-2)]">{pkg.destination}</Link></h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--color-text-secondary)]">{pkg.description}</p>
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {pkg.highlights.slice(0, 3).map(highlight => <li key={highlight} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]"><CheckCircle2 size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--green-2)]" /><span>{highlight}</span></li>)}
        </ul>
        <div className="mt-auto pt-6">
          <div className="border-t border-[var(--color-border-light)] pt-4"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">Package price</p><p className="mt-1 text-base font-bold text-[var(--green-dark)]">{pkg.startingPrice}</p></div>
          <div className="mt-4 flex flex-col gap-2 xs:flex-row xs:gap-2.5">
            <Button className="flex-1 rounded-lg" variant="secondary" icon={<ArrowRight size={15} />} iconPosition="right" asChild><Link href={`/packages/${pkg.id}`}>View trip</Link></Button>
            <Button className="flex-1 rounded-lg" variant="outline" onClick={handleAddToCart} aria-label={`Add ${pkg.destination} to cart`}>
              {justAdded ? <span className="flex items-center justify-center gap-1.5"><Check size={14} aria-hidden="true" />Added</span> : <span className="flex items-center justify-center gap-1.5"><ShoppingCart size={14} aria-hidden="true" />Add to cart</span>}
            </Button>
          </div>
          <span role="status" className="sr-only">{justAdded ? `${pkg.destination} added to cart` : ''}</span>
        </div>
      </div>
    </Card>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Clock, CheckCircle2, ShoppingCart, Check, Sparkles } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { useCartStore } from '@/store/cartStore'
import type { HolidayPackage } from '@/data/packages'

interface PackageCardProps {
  pkg: HolidayPackage
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

export function PackageCard({ pkg }: PackageCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [justAdded, setJustAdded] = useState(false)

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
    <Card className="group flex h-full min-h-[32.5rem] flex-col overflow-hidden lg:min-h-0" hover padding="none">
      <div className={`relative h-52 overflow-hidden ${pkg.imageFallbackColor}`}>
        {pkg.imageUrl && (
          <img src={pkg.imageUrl} alt={`${pkg.destination} travel package`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062d1b]/85 via-[#062d1b]/10 to-black/20" />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span className="rounded-full border border-white/25 bg-[#063b24]/75 px-3 py-1 text-[11px] font-semibold uppercase text-white backdrop-blur-sm">
            {pkg.category === 'national' ? 'India' : 'International'}
          </span>
          {pkg.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--yellow)] px-3 py-1 text-[11px] font-bold text-[var(--green-dark)]">
              <Sparkles size={12} aria-hidden="true" /> {pkg.badge}
            </span>
          )}
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-white/90">
            <Clock size={14} aria-hidden="true" />
            <span>{pkg.duration}</span>
          </div>
          <span className="shrink-0 rounded-md bg-white px-3 py-1.5 text-sm font-bold text-[var(--green-dark)] shadow-sm">
            {pkg.startingPrice}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="min-h-12 line-clamp-2 text-h3 leading-snug">{pkg.destination}</h2>
        <p className="mt-2 min-h-[3.75rem] line-clamp-3 text-body-sm text-[var(--color-text-secondary)]">{pkg.description}</p>
        <div className="mt-4 min-h-[4.5rem] space-y-1.5">
          {pkg.highlights.slice(0, 3).map((highlight) => (
            <span key={highlight} className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-[var(--color-text-primary)]">
              <CheckCircle2 size={13} className="shrink-0 text-[var(--green)]" />
              <span className="truncate">{highlight}</span>
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2.5 pt-5">
          <Button className="flex-1" variant="outline" icon={<ArrowRight size={15} />} iconPosition="right" asChild>
            <Link href={`/packages/${pkg.id}`}>View trip</Link>
          </Button>
          <Button className="flex-1" onClick={handleAddToCart}>
            {justAdded ? (
              <span className="flex items-center justify-center gap-1.5">
                <Check size={14} /> Added
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <ShoppingCart size={14} /> Add to Cart
              </span>
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
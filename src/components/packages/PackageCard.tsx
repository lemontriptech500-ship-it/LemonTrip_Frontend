'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Clock, CheckCircle2, ShoppingCart, Check } from 'lucide-react'
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
    <Card className="overflow-hidden" hover padding="none">
      <div className={`relative h-52 ${pkg.imageFallbackColor}`}>
        {pkg.imageUrl && (
          <img src={pkg.imageUrl} alt={`${pkg.destination} travel package`} className="h-full w-full object-cover" />
        )}
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

        <div className="mt-5 flex flex-col gap-2">
          <Button fullWidth variant="outline" asChild>
            <Link href={`/packages/${pkg.id}`}>View package</Link>
          </Button>
          <Button fullWidth onClick={handleAddToCart}>
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
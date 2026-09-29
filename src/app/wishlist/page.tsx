'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Heart, ShoppingCart } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { FlightPageHero } from '@/components/flights/FlightPageHero' // generic banner, reused
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'

export default function WishlistPage() {
  const { items, removeItem, hasHydrated } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)

  // Don't show a count until the persisted store has loaded, otherwise
  // it flashes "0 items saved" for a moment on refresh.
  const subtitle = !hasHydrated
    ? 'Loading your saved items...'
    : items.length === 0
      ? 'Save flights, hotels and more to find them here later.'
      : `${items.length} item${items.length === 1 ? '' : 's'} saved`

  return (
    <div className="bg-[var(--color-background)] pb-20">
      <FlightPageHero compact title="Your Wishlist" subtitle={subtitle} />

      <Container className="pt-10">
        {hasHydrated && items.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-16 text-center">
            <Heart size={56} className="text-[var(--color-border)]" />
            <h2 className="text-h2 text-[var(--color-text-primary)]">Your Wishlist is Empty</h2>
            <p className="text-body text-[var(--color-text-secondary)] max-w-md">
              Save flights, hotels, and more while browsing — tap the heart icon to add them here.
            </p>
            <Button asChild>
              <Link href="/flights">Browse Flights</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row gap-4"
              >
                {item.imageUrl && (
                  <div className="relative w-full sm:w-28 h-28 rounded-[var(--radius-md)] overflow-hidden shrink-0 bg-[var(--color-surface-secondary)]">
                    <Image src={item.imageUrl} alt={item.name} fill sizes="112px" className="object-cover" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-label text-[var(--color-primary)]">{item.type}</span>
                      <h3 className="text-h4 mt-0.5">{item.name}</h3>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-bg)] transition-colors"
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {item.description && (
                    <p className="text-body-sm text-[var(--color-text-secondary)] mt-1.5 line-clamp-2">{item.description}</p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    {typeof item.price === 'number' && (
                      <span className="text-base font-bold text-[var(--color-text-primary)]">
                        {formatCurrency(item.price)}
                      </span>
                    )}

                    <Button
                      size="sm"
                      icon={<ShoppingCart size={14} />}
                      onClick={() => {
                        addToCart({
                          id: item.id,
                          type: item.type,
                          name: item.name,
                          description: item.description ?? '',
                          price: item.price ?? 0,
                          imageUrl: item.imageUrl,
                          details: item.details,
                        })
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
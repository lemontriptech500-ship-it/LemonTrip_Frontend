'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Heart, ShoppingCart } from 'lucide-react'
import { Button, Container, SectionHeading } from '@/components/ui'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'

export default function WishlistPage() {
  const { items, removeItem, hasHydrated } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)

  if (hasHydrated && items.length === 0) {
    return (
      <Container className="section-gap">
        <div className="flex flex-col items-center gap-5 py-20 text-center">
          <Heart size={56} className="text-[var(--color-border)]" />
          <h1 className="text-h1 text-[var(--color-text-primary)]">Your Wishlist is Empty</h1>
          <p className="text-body text-[var(--color-text-secondary)] max-w-md">
            Save flights, hotels, and more while browsing — tap the heart icon to add them here.
          </p>
          <Button asChild>
            <Link href="/flights">Browse Flights</Link>
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="section-gap">
      <SectionHeading
        title="Your Wishlist"
        description={`${items.length} item${items.length === 1 ? '' : 's'} saved`}
      />

      <div className="mt-8 grid grid-cols-1 gap-4">
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
    </Container>
  )
}
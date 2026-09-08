'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button, Container, SectionHeading } from '@/components/ui'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <Container className="section-gap">
        <div className="flex flex-col items-center gap-5 py-20 text-center">
          <ShoppingBag size={56} className="text-[var(--color-border)]" />
          <h1 className="text-h1 text-[var(--color-text-primary)]">Your Cart is Empty</h1>
          <p className="text-body text-[var(--color-text-secondary)] max-w-md">
            Browse our travel options and add items to your cart to get started.
          </p>
          <div className="flex gap-3 mt-2">
            <Button asChild>
              <Link href="/flights">Browse Flights</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/hotels">Browse Hotels</Link>
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="section-gap">
      <SectionHeading
        title="Your Cart"
        description={`${totalItems()} item${totalItems() > 1 ? 's' : ''} in your cart`}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row gap-4"
            >
              {item.imageUrl && (
                <div className="w-full sm:w-28 h-28 rounded-[var(--radius-md)] overflow-hidden shrink-0 bg-[var(--color-surface-secondary)]">
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
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {item.description && (
                  <p className="text-body-sm text-[var(--color-text-secondary)] mt-1.5 line-clamp-2">{item.description}</p>
                )}

                {item.details && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                    {Object.entries(item.details).map(([key, value]) => (
                      <span key={key} className="text-caption text-[var(--color-text-muted)]">
                        {key}: <span className="font-medium text-[var(--color-text-secondary)]">{value}</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-[var(--radius-sm)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface-secondary)] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-[var(--radius-sm)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface-secondary)] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-base font-bold text-[var(--color-text-primary)]">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors py-2"
          >
            Clear entire cart
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] sticky top-24">
            <h3 className="text-h3 mb-5">Order Summary</h3>

            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-secondary)] truncate pr-4">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium text-[var(--color-text-primary)] shrink-0">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--color-border)] pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-body font-medium text-[var(--color-text-primary)]">Total</span>
                <span className="text-xl font-bold text-[var(--color-text-primary)]">{formatCurrency(totalPrice())}</span>
              </div>
            </div>

            <Button fullWidth size="lg" icon={<ArrowRight size={16} />} iconPosition="right" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>

            <p className="text-caption text-[var(--color-text-muted)] text-center mt-3">
              Demo checkout — no real payment processed
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

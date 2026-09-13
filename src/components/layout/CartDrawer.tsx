'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCartStore()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-[rgba(44,62,80,0.40)] backdrop-blur-sm" onClick={closeCart} />
      <div className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-[var(--color-surface)] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[var(--color-primary)]" />
            <h2 className="text-h3">Your Cart</h2>
            <span className="text-sm text-[var(--color-text-muted)]">({totalItems()})</span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-secondary)] transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={48} className="text-[var(--color-border)]" />
              <p className="text-body text-[var(--color-text-secondary)]">Your cart is empty</p>
              <Button variant="outline" size="sm" onClick={closeCart} asChild>
  <Link href="/packages">Browse Packages</Link>
</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-label text-[var(--color-primary)]">{item.type}</span>
                      <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{item.name}</h3>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-bg)] transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {item.description && (
                    <p className="text-xs text-[var(--color-text-secondary)] mb-3 line-clamp-2">{item.description}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-[var(--radius-sm)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface-secondary)] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-[var(--radius-sm)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface-secondary)] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-body text-[var(--color-text-secondary)]">Total</span>
              <span className="text-lg font-bold text-[var(--color-text-primary)]">{formatCurrency(totalPrice())}</span>
            </div>
            <Button fullWidth size="lg" asChild>
              <Link href="/cart" onClick={closeCart}>View Cart & Checkout</Link>
            </Button>
            <button
              onClick={clearCart}
              className="w-full mt-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors py-2"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import { UserCircle, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui'
import { useCartStore } from '@/store/cartStore'

export function AccountEntry() {
  const isAuthenticated = false
  const totalItems = useCartStore((state) => state.totalItems())
  const openCart = useCartStore((state) => state.openCart)

  return (
    <div className="hidden sm:flex items-center gap-2">
      <button
        onClick={openCart}
        className="relative p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-secondary)] transition-colors"
        aria-label="Open cart"
      >
        <ShoppingBag size={20} className="text-[var(--color-text-primary)]" />
        {totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-bold flex items-center justify-center">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </button>

      {isAuthenticated ? (
        <Link href="/profile">
          <Button variant="ghost" size="sm" icon={<UserCircle size={20} />}>
            My Account
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/login" tabIndex={-1}>
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup" tabIndex={-1}>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}

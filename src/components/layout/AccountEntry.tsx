'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui'
import { useCartStore } from '@/store/cartStore'

export function AccountEntry() {
  const totalItems = useCartStore((state) => state.totalItems)

  return (
    <div className="hidden sm:flex items-center gap-3">
      <button
        className="relative p-2 rounded-md hover:bg-[rgba(44,62,80,0.04)] transition-colors"
        aria-label="Open cart"
      >
        <ShoppingBag size={20} className="text-[#263746]" />
        {totalItems() > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-bold flex items-center justify-center">
            {totalItems() > 9 ? '9+' : totalItems()}
          </span>
        )}
      </button>

      <Link
        href="/login"
        className="text-sm font-medium text-[#263746] hover:text-[var(--color-primary)] transition-colors px-2 py-1"
      >
        Login
      </Link>
      <Link href="/signup">
        <Button variant="primary" size="sm" className="rounded-full px-5 bg-[#FAD311] text-[#263746] hover:bg-[#E0C010]">
          Sign Up
        </Button>
      </Link>
    </div>
  )
}

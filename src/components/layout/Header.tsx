'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Heart } from 'lucide-react'
import { Container } from '@/components/ui'
import { SITE_NAME } from '@/constants'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'
import { AccountEntry } from './AccountEntry'

/**
 * Header
 * ------------------------------------------------------------
 * FIX: the main bar had both a min-h and vertical padding (py-2),
 * which stacked on top of each other — items-center already
 * centers content within min-h, so the extra py padded the bar
 * out taller than the reference. Switched min-h → a fixed h and
 * dropped the py so the bar height matches the reference exactly
 * at each breakpoint (72px → 80px → 88px).
 */

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { toggleCart, totalItems, hasHydrated } = useCartStore()
  const cartCount = hasHydrated ? totalItems() : 0

  const { totalItems: totalWishlistItems, hasHydrated: wishlistHydrated } = useWishlistStore()
  const wishlistCount = wishlistHydrated ? totalWishlistItems() : 0

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'shadow-sm border-b border-[rgba(16,35,26,0.08)]'
          : 'border-b border-transparent'
      }`}
      role="banner"
    >
      <div className="bg-[var(--green-dark)] text-[#eaf7ef]">
        <Container as="div" className="flex min-h-8 flex-col gap-1 py-1.5 text-[10px] sm:flex-row sm:items-center sm:justify-between sm:py-0 sm:text-[12px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-5">
            <span className="flex items-center gap-2">
              <span aria-hidden="true">✉</span>
              <a href="mailto:info@lemontrip.com" className="transition hover:text-[var(--yellow)]">info@lemontrip.com</a>
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true">☎</span>
              <a href="tel:+919876543210" className="transition hover:text-[var(--yellow)]">+91 98765 43210</a>
            </span>
          </div>

          <div className="hidden items-center gap-3 text-[12px] font-medium text-[#edf4ef] sm:flex">
            <span>Follow Us:</span>
            <span className="flex items-center gap-2 text-[#f2f7f3]">
              <span aria-hidden="true">f</span>
              <span aria-hidden="true">◎</span>
              <span aria-hidden="true">𝕏</span>
              <span aria-hidden="true">▶</span>
            </span>
          </div>
        </Container>
      </div>

      <div className="border-b border-[#e7efe9] bg-white/[.98] text-[var(--ink)] backdrop-blur-sm">
        <Container
          as="div"
          className="flex h-[60px] items-center justify-between gap-3 sm:h-[80px] sm:gap-5 lg:h-[75px] lg:gap-6"
        >
          {/* Logo — no more boxed background, just the mark on white,
              sized up slightly so it carries the same visual weight
              as the reference's wordmark + tagline lockup. */}
          <Link
            href="/"
            className="relative inline-flex h-[42px] w-[140px] shrink-0 items-center sm:h-[52px] sm:w-[168px] lg:h-[62px] lg:w-[196px]"
            aria-label={`${SITE_NAME} — Go to homepage`}
          >
            <Image
              src="/lemonTripLogo.jpeg"
              alt={`${SITE_NAME} Logo`}
              fill
              sizes="(max-width: 640px) 140px, (max-width: 1024px) 168px, 196px"
              className="object-contain object-left"
              priority
            />
          </Link>

          <DesktopNavigation />
          <AccountEntry />

          <Link
            href="/wishlist"
            aria-label={`Open wishlist${wishlistCount > 0 ? `, ${wishlistCount} item${wishlistCount === 1 ? '' : 's'}` : ''}`}
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--green)] transition hover:border-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--yellow)]"
          >
            <Heart size={18} aria-hidden="true" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--yellow)] px-1 text-[10px] font-bold leading-none text-[var(--green-dark)]">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={toggleCart}
            aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} item${cartCount === 1 ? '' : 's'}` : ''}`}
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--green)] transition hover:border-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--yellow)]"
          >
            <ShoppingBag size={18} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--yellow)] px-1 text-[10px] font-bold leading-none text-[var(--green-dark)]">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
          <MobileNavigation />
        </Container>
      </div>
    </header>
  )
}
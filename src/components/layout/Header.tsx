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

      <div className="border-b border-[#e7efe9] bg-[rgba(255,255,255,0.96)] text-[var(--ink)] backdrop-blur-sm">
        <Container as="div" className="flex min-h-[56px] items-center justify-between gap-2 py-1.5 sm:min-h-[64px] sm:gap-4 sm:py-0 lg:min-h-[72px] lg:gap-5">
          <Link
            href="/"
            className="relative inline-flex h-[40px] w-[132px] shrink-0 items-center rounded-[12px] bg-white/90 p-0 shadow-none sm:h-[48px] sm:w-[158px] lg:h-[58px] lg:w-[190px]"
            aria-label={`${SITE_NAME} — Go to homepage`}
          >
            <Image
              src="/lemonTripLogo.jpeg"
              alt={`${SITE_NAME} Logo`}
              fill
              sizes="(max-width: 640px) 132px, (max-width: 1024px) 158px, 190px"
              className="object-contain"
            />
          </Link>

          <DesktopNavigation />
          <AccountEntry />

          <Link
            href="/wishlist"
            aria-label={`Open wishlist${wishlistCount > 0 ? `, ${wishlistCount} item${wishlistCount === 1 ? '' : 's'}` : ''}`}
            className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--green)] bg-white text-[var(--green)] transition hover:bg-[var(--green)] hover:text-[var(--yellow)] xl:h-10 xl:w-10"
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
            className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--green)] bg-white text-[var(--green)] transition hover:bg-[var(--green)] hover:text-[var(--yellow)] xl:h-10 xl:w-10"
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
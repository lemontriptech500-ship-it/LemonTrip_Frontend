'use client'

import React from 'react'
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
import { AuthModal } from '@/components/auth/AuthModal'

/**
 * Header
 * ------------------------------------------------------------
 * The login / register pop-up (<AuthModal />) is mounted here once
 * and opened from AccountEntry and MobileNavigation.
 */

export function Header() {
  const { toggleCart, totalItems, hasHydrated } = useCartStore()
  const cartCount = hasHydrated ? totalItems() : 0

  const { totalItems: totalWishlistItems, hasHydrated: wishlistHydrated } = useWishlistStore()
  const wishlistCount = wishlistHydrated ? totalWishlistItems() : 0

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 w-full" role="banner">
        {/* Fixed green glass treatment stays unchanged on scroll and hover. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border-b border-white/10 bg-[#063b24]/90 backdrop-blur-md"
        />
        {/* Top contact strip */}
        <div className="relative">
          <Container
            as="div"
            className="flex min-h-8 flex-col gap-1 py-1.5 text-[10px] text-white sm:flex-row sm:items-center sm:justify-between sm:py-0 sm:text-[12px]"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-5">
              <span className="flex items-center gap-2">
                <span aria-hidden="true">✉</span>
                <a href="mailto:info@lemontrip.com">
                  info@lemontrip.com
                </a>
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true">☎</span>
                <a href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </span>
            </div>

            <div className="hidden items-center gap-3 text-[12px] font-medium opacity-90 sm:flex">
              <span>Follow Us:</span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true">f</span>
                <span aria-hidden="true">◎</span>
                <span aria-hidden="true">𝕏</span>
                <span aria-hidden="true">▶</span>
              </span>
            </div>
          </Container>
        </div>

        {/* Main nav bar */}
        <div className="relative">
          <Container
            as="div"
            className="flex h-[60px] items-center justify-between gap-1.5 sm:h-[80px] sm:gap-5 lg:h-[75px] lg:gap-6"
          >
            <Link
              href="/"
              className="relative inline-flex h-[42px] w-[136px] shrink-0 items-center sm:h-[56px] sm:w-[184px] lg:h-[66px] lg:w-[224px]"
              aria-label={`${SITE_NAME} — Go to homepage`}
            >
              <Image
                src="/website_logo.webp"
                alt={`${SITE_NAME} Logo`}
                fill
                sizes="(max-width: 640px) 136px, (max-width: 1024px) 184px, 224px"
                className="relative origin-left scale-[1.1] object-contain object-left"
                priority
              />
            </Link>

            <DesktopNavigation />
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <AccountEntry />

              <Link
                href="/wishlist"
                aria-label={`Open wishlist${wishlistCount > 0 ? `, ${wishlistCount} item${wishlistCount === 1 ? '' : 's'}` : ''}`}
                className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm"
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
                className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm"
              >
                <ShoppingBag size={18} aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--yellow)] px-1 text-[10px] font-bold leading-none text-[var(--green-dark)]">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
              <MobileNavigation />
            </div>
          </Container>
        </div>
      </header>

      {/* Login / register pop-up — rendered in a portal, opened via useAuthModalStore */}
      <AuthModal />
    </>
  )
}
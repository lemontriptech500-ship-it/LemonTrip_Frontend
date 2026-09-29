'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
 * Glassy header: always translucent + blurred; only the opacity of
 * the white glass layer increases once scrolled.
 *
 * ROUTE-AWARE: the unscrolled style (white text on a clear glass
 * layer) only works over a dark banner. Any route listed in
 * HERO_ROUTES (and its sub-pages, e.g. /flights/[id]/payment) has a
 * dark banner behind the header. Any other route uses the "scrolled"
 * style (dark text, denser glass).
 *
 * When you add a banner to a new page, add its path to HERO_ROUTES.
 *
 * The login / register pop-up (<AuthModal />) is mounted here once
 * and opened from AccountEntry and MobileNavigation.
 */

// Routes that start with a dark banner behind the header ('/' = home only)
const HERO_ROUTES = [
  '/',
  '/flights',
  '/hotels',
  '/buses',
  '/trains',
  '/packages',
  '/services',
  '/visa',
  '/offers',
  '/blog',
  '/wishlist',
]

function hasHeroBanner(pathname: string) {
  return HERO_ROUTES.some((route) =>
    route === '/' ? pathname === '/' : pathname === route || pathname.startsWith(route + '/')
  )
}

export function Header() {
  const pathname = usePathname()
  const hasHero = hasHeroBanner(pathname)

  const [pastThreshold, setPastThreshold] = useState(false)
  // No banner behind the header? Always use the solid / dark-text style.
  const isScrolled = pastThreshold || !hasHero

  const { toggleCart, totalItems, hasHydrated } = useCartStore()
  const cartCount = hasHydrated ? totalItems() : 0

  const { totalItems: totalWishlistItems, hasHydrated: wishlistHydrated } = useWishlistStore()
  const wishlistCount = wishlistHydrated ? totalWishlistItems() : 0

  useEffect(() => {
    const handleScroll = () => {
      setPastThreshold(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 w-full" role="banner">
        {/* Glass layer — always translucent + blurred; only its opacity
            and shadow increase on scroll. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 backdrop-blur-md transition-all duration-500 ${
            isScrolled
              ? 'bg-white/80 border-b border-[rgba(16,35,26,0.08)] shadow-sm'
              : 'bg-white/[0.06] border-b border-white/10'
          }`}
        />

        {/* Top contact strip */}
        <div className="relative">
          <Container
            as="div"
            className={`flex min-h-8 flex-col gap-1 py-1.5 text-[10px] transition-colors duration-500 sm:flex-row sm:items-center sm:justify-between sm:py-0 sm:text-[12px] ${
              isScrolled ? 'text-[var(--ink)]' : 'text-white'
            }`}
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-5">
              <span className="flex items-center gap-2">
                <span aria-hidden="true">✉</span>
                <a href="mailto:info@lemontrip.com" className="transition hover:text-[var(--yellow)]">
                  info@lemontrip.com
                </a>
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true">☎</span>
                <a href="tel:+919876543210" className="transition hover:text-[var(--yellow)]">
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
              className="relative inline-flex h-[38px] w-[112px] shrink-0 items-center sm:h-[52px] sm:w-[168px] lg:h-[62px] lg:w-[196px]"
              aria-label={`${SITE_NAME} — Go to homepage`}
            >
              <Image
                src="/website_logo.webp"
                alt={`${SITE_NAME} Logo`}
                fill
                sizes="(max-width: 640px) 112px, (max-width: 1024px) 168px, 196px"
                className="relative object-contain object-left"
                priority
              />
            </Link>

            <DesktopNavigation isScrolled={isScrolled} />
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <AccountEntry isScrolled={isScrolled} />

              <Link
                href="/wishlist"
                aria-label={`Open wishlist${wishlistCount > 0 ? `, ${wishlistCount} item${wishlistCount === 1 ? '' : 's'}` : ''}`}
                className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
                  isScrolled
                    ? 'border-[var(--color-border)] bg-white text-[var(--green)] hover:border-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--yellow)]'
                    : 'border-white/40 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-white/20'
                }`}
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
                className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
                  isScrolled
                    ? 'border-[var(--color-border)] bg-white text-[var(--green)] hover:border-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--yellow)]'
                    : 'border-white/40 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-white/20'
                }`}
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
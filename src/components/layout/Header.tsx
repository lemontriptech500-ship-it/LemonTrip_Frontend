'use client'

import React from 'react'
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
 * Routes whose page starts with a hero banner.
 * On these routes the header floats transparently on top of the banner
 * (same style as the home page). Add more prefixes here as needed.
 */
const OVERLAY_ROUTES = ['/flights', '/hotels', '/trains','/buses','/packages','/visa','/offers','/blog','/contact']

/**
 * Header
 * ------------------------------------------------------------
 * The login / register pop-up (<AuthModal />) is mounted here once
 * and opened from AccountEntry and MobileNavigation.
 */
export function Header() {
  const pathname = usePathname()
  const isOverlayHeader =
    pathname === '/' || OVERLAY_ROUTES.some((route) => pathname.startsWith(route))
  const { toggleCart, totalItems, hasHydrated } = useCartStore()
  const cartCount = hasHydrated ? totalItems() : 0

  const { totalItems: totalWishlistItems, hasHydrated: wishlistHydrated } = useWishlistStore()
  const wishlistCount = wishlistHydrated ? totalWishlistItems() : 0

  return (
    <>
      <header
        className={isOverlayHeader
          ? 'absolute inset-x-0 top-0 z-50 w-full'
          : 'relative z-50 w-full bg-[var(--green-dark)] shadow-[0_4px_16px_rgba(0,0,0,0.12)] lg:pb-4'}
        role="banner"
      >
        {/* Main nav bar */}
        <div className="relative">
          <Container
            as="div"
            className={`flex h-[58px] items-center justify-between gap-1.5 sm:h-[64px] sm:gap-4 lg:h-[66px] lg:gap-5 ${isOverlayHeader ? 'lg:relative lg:grid lg:grid-cols-[160px_minmax(0,1fr)_auto]' : ''}`}
          >
            <Link
              href="/"
              className="relative order-last inline-flex h-[44px] w-[136px] shrink-0 items-center xs:h-[52px] xs:w-[158px] sm:h-[46px] sm:w-[150px] lg:order-first lg:h-[52px] lg:w-[160px]"
              aria-label={`${SITE_NAME} — Go to homepage`}
            >
              <Image
                src="/web_logo_news.png"
                alt="Official LemonTrip travel booking logo"
                width={2172}
                height={724}
                sizes="(max-width: 374px) 136px, (max-width: 639px) 158px, (max-width: 1023px) 150px, 160px"
                className="h-full w-full object-contain object-center"
                priority
              />
            </Link>

            <DesktopNavigation />
            <div className={`flex shrink-0 items-center gap-2 sm:gap-3 lg:translate-y-4 ${isOverlayHeader ? 'lg:col-start-3' : ''}`}>
              <Link href="/contact" className="hidden h-8 items-center rounded-full bg-[var(--yellow)] px-4 text-xs font-bold text-[var(--green-dark)] shadow-[0_6px_18px_rgba(255,210,26,0.22)] transition hover:brightness-105 lg:inline-flex">
                Contact Us
              </Link>
              <span className="hidden text-xs font-semibold tracking-wide text-white/90 lg:inline" aria-label="Language: English">EN</span>
              <AccountEntry />

              <Link
                href="/wishlist"
                aria-label={`Open wishlist${wishlistCount > 0 ? `, ${wishlistCount} item${wishlistCount === 1 ? '' : 's'}` : ''}`}
                className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm"
              >
                <Heart size={15} aria-hidden="true" />
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
                className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm"
              >
                <ShoppingBag size={15} aria-hidden="true" />
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
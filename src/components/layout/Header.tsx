'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Heart, Headphones, BriefcaseBusiness } from 'lucide-react'
import { Container } from '@/components/ui'
import { SITE_NAME } from '@/constants'
import { hasOverlayHeader } from '@/constants/pageHeaders'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'
import { AccountEntry } from './AccountEntry'
import { AuthModal } from '@/components/auth/AuthModal'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const overlay = hasOverlayHeader(pathname)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  const { toggleCart, totalItems, hasHydrated } = useCartStore()
  const cartCount = hasHydrated ? totalItems() : 0
  const { totalItems: totalWishlistItems, hasHydrated: wishlistHydrated } = useWishlistStore()
  const wishlistCount = wishlistHydrated ? totalWishlistItems() : 0
  const iconClass = 'relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--yellow)]'

  return <>
    {!overlay && <div className="site-header-spacer print:hidden" aria-hidden="true" />}
    <header data-compact={scrolled} className="site-header fixed inset-x-0 top-0 z-50 w-full text-white print:hidden" role="banner">
      <div aria-hidden="true" className={cn(
        'pointer-events-none absolute inset-0 transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none',
        scrolled || !overlay ? 'bg-[var(--green-dark)] shadow-lg' : 'bg-gradient-to-b from-[#031f18]/95 to-[#063b24]/85'
      )} />
      <Container className="site-header-utility relative flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex h-12 w-[130px] shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--yellow)] sm:w-[150px]" aria-label={`${SITE_NAME} — Go to homepage`}>
          <Image src="/web_logo_news.png" alt="LemonTrip" width={2172} height={724} sizes="(max-width: 639px) 130px, 150px" className="h-full w-full object-contain" priority />
        </Link>
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <Link href="/bookings" className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 lg:inline-flex">
            <BriefcaseBusiness size={19} aria-hidden="true" /><span>My Bookings<span className="block text-[10px] font-normal text-white/65">Manage your trips</span></span>
          </Link>
          <Link href="/contact" className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 lg:inline-flex">
            <Headphones size={19} aria-hidden="true" /><span>Help & Support</span>
          </Link>
          <Link href="/wishlist" aria-label={`Open wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`} className={cn(iconClass, 'hidden sm:inline-flex')}>
            <Heart size={18} aria-hidden="true" />
            {wishlistCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--yellow)] px-1 text-[10px] font-bold text-[var(--green-dark)]">{wishlistCount > 99 ? '99+' : wishlistCount}</span>}
          </Link>
          <button type="button" onClick={toggleCart} aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} items` : ''}`} className={iconClass}>
            <ShoppingBag size={18} aria-hidden="true" />
            {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--yellow)] px-1 text-[10px] font-bold text-[var(--green-dark)]">{cartCount > 99 ? '99+' : cartCount}</span>}
          </button>
          <AccountEntry />
          <MobileNavigation />
        </div>
      </Container>
      <Container className="relative max-md:!px-0">
        <DesktopNavigation />
      </Container>
    </header>
    <AuthModal />
  </>
}

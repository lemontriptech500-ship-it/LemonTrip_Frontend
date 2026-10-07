'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck, Headphones, ShieldCheck, Heart, ShoppingBag } from 'lucide-react'
import { TravelSearchWidget } from '@/components/search/TravelSearchWidget'

const NAV_LINKS = [
  { label: 'Flights', href: '/flights' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'Packages', href: '/packages' },
  { label: 'Visas', href: '/visas' },
  { label: 'Offers', href: '/offers' },
]

export function HeroSection() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-neutral-900 pb-8 max-md:overflow-visible lg:h-[100svh] lg:min-h-[100svh] lg:pb-0">
      {/* Full-bleed scenic image (no frame, no rounded corners). */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-neutral-900 max-md:bottom-auto max-md:h-[100svh]">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat md:hidden"
          style={{
            backgroundImage: "url('/mobilehero.jpeg')",
            backgroundPosition: 'center 100%',
            backgroundSize: 'auto calc(100% + 200px)',
          }}
          role="img"
          aria-label="LemonTrip aircraft in a mountain landscape"
        />
        <div
          className="absolute inset-0 hidden bg-cover bg-no-repeat md:block"
          style={{
            backgroundImage: "url('/Sunset Airliner Over Coastal Mountains (1).png')",
            backgroundPosition: 'center 87%',
          }}
          role="img"
          aria-label="Aircraft on the runway at dusk"
        />
        <div className="absolute inset-0 bg-[rgba(6,59,36,0.06)] max-md:bg-[rgba(3,31,24,0.14)]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[rgba(3,31,24,0.34)] via-[rgba(3,31,24,0.08)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      {/* Glass header floating over the hero. */}
      <header className="fixed inset-x-0 top-0 z-50 w-full">
        <div
          className={`flex w-full items-center justify-between gap-3 border-b px-4 py-3 text-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 md:px-8 lg:px-12 ${
            scrolled ? 'border-white/15 bg-neutral-900/55' : 'border-white/25 bg-white/10'
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="LemonTrip home"
            className="inline-flex h-[46px] w-[138px] shrink-0 items-center rounded-xl border border-white/90 bg-[var(--green-dark)] px-2 shadow-[0_6px_20px_rgba(0,0,0,0.2)] lg:h-[52px] lg:w-[156px]"
          >
            <Image
              src="/web_logo_news.png"
              alt="LemonTrip"
              width={2172}
              height={724}
              className="h-full w-full object-contain object-left"
              priority
            />
          </Link>

          {/* Center nav pill */}
          <nav className="hidden items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2 py-1 backdrop-blur-md md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-full bg-[var(--yellow)] px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:brightness-95 sm:inline-flex"
            >
              Contact Us
            </Link>
            <span className="hidden text-sm font-semibold sm:inline">EN</span>
            <Link
              href="/signup"
              className="rounded-full bg-[var(--yellow)] px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:brightness-95"
            >
              Sign Up
            </Link>
            <button
              type="button"
              aria-label="Wishlist"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <Heart size={18} />
            </button>
            <button
              type="button"
              aria-label="Cart"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Desktop hero title and supporting copy. */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1100px] grid-cols-1 gap-5 px-4 lg:grid lg:w-[calc(100%-4rem)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:px-0 lg:pt-[168px]">
        <div className="text-left text-white">
          <h1 className="hidden max-w-[900px] font-heading text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)] lg:block">
            LemonTrip: Your
            <br />
            Journey Begins Here.
          </h1>
        </div>

        <p className="hidden max-w-[360px] text-left text-sm leading-relaxed text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)] sm:text-base lg:mt-8 lg:block lg:justify-self-start">
          Discover flights, stays and experiences for every kind of traveler. More than a destination. It’s a LemonTrip.
        </p>
      </div>

      {/* Mobile hero copy. */}
      <div
        className="absolute inset-x-0 z-10 mx-auto max-w-[560px] px-5 text-white lg:hidden"
        style={{ top: '88px' }}
      >
        <h1 className="text-center font-heading text-[clamp(2.5rem,9vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.48)]">
          Book your journey.
        </h1>
        <p className="mt-5 text-[17px] leading-[1.55] text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
          Flights, hotels, buses, trains, holiday packages and visas from LemonTrip, at prices you can compare.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-3 text-[14px] font-medium">
          <div className="flex items-center gap-2">
            <BadgeCheck size={20} className="shrink-0 text-[var(--yellow)]" />
            Best price guarantee
          </div>
          <div className="flex items-center gap-2">
            <Headphones size={20} className="shrink-0 text-[var(--yellow)]" />
            24/7 support
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <ShieldCheck size={20} className="shrink-0 text-[var(--yellow)]" />
            Safe &amp; secure booking
          </div>
        </div>
      </div>

      {/* Search card: pinned in the hero on large screens, flows below the copy on phones. */}
      <div className="relative z-20 mx-4 mt-0 max-w-[960px] sm:mx-6 max-md:mt-[calc(100svh-190px)] lg:absolute lg:inset-x-8 lg:bottom-[28px] lg:mx-auto lg:mt-0">
        <TravelSearchWidget />
      </div>
    </section>
  )
}
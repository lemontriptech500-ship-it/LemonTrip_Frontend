'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { SITE_NAME } from '@/constants'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'
import { AccountEntry } from './AccountEntry'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

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
        <Container as="div" className="flex h-auto min-h-10 flex-col gap-1 py-2 text-[11px] sm:flex-row sm:items-center sm:justify-between sm:py-0 sm:text-[13px]">
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
        <Container as="div" className="flex min-h-[64px] items-center justify-between gap-3 py-2 sm:min-h-[76px] sm:gap-6 sm:py-0 lg:min-h-[84px]">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center rounded-[12px] bg-white/90 p-0 shadow-none"
            aria-label={`${SITE_NAME} — Go to homepage`}
          >
            <img
              src="/lemonTripLogo.jpeg"
              alt={`${SITE_NAME} Logo`}
              className="h-[46px] w-auto max-w-[220px] object-contain sm:h-[56px] lg:h-[68px]"
            />
          </Link>

          <DesktopNavigation />
          <AccountEntry />
          <MobileNavigation />
        </Container>
      </div>
    </header>
  )
}

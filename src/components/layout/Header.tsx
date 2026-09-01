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
          ? 'bg-[#063b24] text-[#FFD21A] shadow-sm border-b border-[#FFD21A]/20'
          : 'bg-[#063b24] text-[#FFD21A] border-b border-transparent'
      }`}
      role="banner"
    >
      <Container as="div" className="flex h-[76px] items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center shrink-0"
          aria-label={`${SITE_NAME} — Go to homepage`}
        >
          <img
            src="/lemonTripLogo.jpeg"
            alt={`${SITE_NAME} Logo`}
            className="h-14 w-auto object-contain"
          />
        </Link>

        <DesktopNavigation />

        <AccountEntry />
        <MobileNavigation />
      </Container>
    </header>
  )
}

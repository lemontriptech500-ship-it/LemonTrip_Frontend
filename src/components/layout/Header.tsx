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
      className={`sticky top-0 z-50 w-full flex flex-col transition-all duration-200 ${
        isScrolled
          ? 'bg-white shadow-md border-b border-[var(--color-border)]'
          : 'bg-white/95 backdrop-blur-sm border-b border-[var(--color-border-light)]'
      }`}
      role="banner"
    >
      <Container as="div" className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 shrink-0"
          aria-label={`${SITE_NAME} — Go to homepage`}
        >
          <img
            src="/lemonTripLogo.jpeg"
            alt={`${SITE_NAME} Logo`}
            className="h-10 w-[120px] rounded-md object-cover object-center sm:w-[140px]"
          />
        </Link>

        <div className="flex-1 flex justify-center px-4">
          <DesktopNavigation />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <AccountEntry />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  )
}

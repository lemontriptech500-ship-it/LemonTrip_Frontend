import React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui'
import { SITE_NAME } from '@/constants'
import { UtilityBar } from './UtilityBar'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'
import { AccountEntry } from './AccountEntry'

// ============================================================
// Header — Main application header.
// Composes UtilityBar, Brand, Navigation, and Account actions.
// ============================================================

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-sm" role="banner">
      <UtilityBar />
      
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm">
        <Container as="div" className="flex h-16 items-center justify-between">
          
          {/* Left: Brand Logo */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 shrink-0"
            aria-label={`${SITE_NAME} — Go to homepage`}
          >
            <img
              src="/lemonTripLogo.jpeg"
              alt={`${SITE_NAME} Logo`}
              className="h-11 w-[136px] rounded-md object-cover object-center sm:w-[156px]"
            />
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="flex-1 flex justify-center px-4">
            <DesktopNavigation />
          </div>

          {/* Right: Account & Mobile Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <AccountEntry />
            <MobileNavigation />
          </div>
          
        </Container>
      </div>
    </header>
  )
}

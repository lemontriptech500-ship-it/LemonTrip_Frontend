'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useAuthModalStore } from '@/store/authModalStore'

type Props = {
  href: string
  mode: 'signin' | 'signup'
  /** true = protected link: logged-in users navigate normally,
   *  logged-out users get the sign-in modal instead */
  requireAuth?: boolean
  children: React.ReactNode
}

export function FooterAuthLink({ href, mode, requireAuth = false, children }: Props) {
  const openAuthModal = useAuthModalStore((state) => state.open)
  const { isAuthenticated, hasHydrated } = useAuthStore()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // ctrl/cmd/shift/middle-click keeps normal browser behaviour
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    // logged-in user clicking a protected link (e.g. My Profile): just navigate
    if (requireAuth && hasHydrated && isAuthenticated) return

    e.preventDefault()
    openAuthModal(mode)
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="group inline-flex items-center gap-1 text-sm text-[rgba(253,254,255,0.85)] hover:text-[var(--color-primary)] transition-colors"
    >
      <span className="border-b border-transparent group-hover:border-[var(--color-primary)] transition-all">
        {children}
      </span>
      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  )
}
'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'

// ============================================================
// AppShell — Root layout wrapper.
// Composes Header + page content + Footer.
// Every page rendered by the root layout.tsx passes through here.
// ============================================================

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const isAuthRoute = pathname === '/login' || pathname === '/signup'

  if (isAuthRoute) {
    return <main id="main-content" className="min-h-screen" tabIndex={-1}>{children}</main>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

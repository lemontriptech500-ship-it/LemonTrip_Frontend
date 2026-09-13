'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getCurrentUser } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'
import { Header } from './Header'
import { Footer } from './Footer'
import { CartDrawer } from './CartDrawer'
import { GlobalChatbot } from '@/components/chat/GlobalChatbot'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const token = useAuthStore((state) => state.token)
  const setUser = useAuthStore((state) => state.login)

  useEffect(() => {
    if (!token) return
    getCurrentUser()
      .then((user) => setUser(user, token))
      .catch(() => undefined)
  }, [setUser, token])

  const isAuthRoute = pathname === '/login' || pathname === '/signup'

  if (isAuthRoute) {
    return <><main id="main-content" className="min-h-screen" tabIndex={-1}>{children}</main><GlobalChatbot /></>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <CartDrawer />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <GlobalChatbot />
    </div>
  )
}

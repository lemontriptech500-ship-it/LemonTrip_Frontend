import React from 'react'
import Link from 'next/link'
import { UserCircle } from 'lucide-react'
import { Button } from '@/components/ui'

// ============================================================
// AccountEntry — Header account actions.
// Prepared for future authentication state.
// ============================================================

export function AccountEntry() {
  // Hardcoded UI-only state for Module 2.
  // In Module 8, this will connect to a real auth provider context.
  const isAuthenticated = false 

  if (isAuthenticated) {
    return (
      <div className="hidden sm:flex items-center">
        <Link href="/profile">
          <Button variant="ghost" size="sm" icon={<UserCircle size={20} />}>
            My Account
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="hidden sm:flex items-center gap-2">
      <Link href="/login" tabIndex={-1}>
        <Button variant="ghost" size="sm" className="font-semibold text-[var(--color-accent)]">
          Login
        </Button>
      </Link>
      <Link href="/signup" tabIndex={-1}>
        <Button variant="primary" size="sm">
          Sign Up
        </Button>
      </Link>
    </div>
  )
}

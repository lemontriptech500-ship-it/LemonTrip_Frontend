'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useAuthModalStore } from '@/store/authModalStore'

export function AccountEntry() {
  const router = useRouter()
  const { user, isAuthenticated, hasHydrated, logout } = useAuthStore()
  const openAuthModal = useAuthModalStore((state) => state.open)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    router.push('/')
  }

  // Avoid a flash of the wrong state before the persisted store rehydrates
  if (!hasHydrated) {
    return <div className="hidden h-8 w-[72px] lg:block" aria-hidden="true" />
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="hidden items-center gap-2 lg:flex">
        {/* Opens the pop-up on the "Create account" tab instead of /signup */}
        <button
          type="button"
          onClick={() => openAuthModal('signup')}
          className="inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[var(--yellow)] px-4 text-xs font-bold text-[var(--green-dark)] shadow-[0_8px_18px_rgba(255,210,26,0.25)]"
        >
          Sign Up
        </button>
      </div>
    )
  }

  return (
    <div className="relative hidden lg:block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Account menu"
        className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white/10 text-white backdrop-blur-sm"
      >
        {user.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
        ) : (
          <User size={18} aria-hidden="true" />
        )}
      </button>

      {/* Dropdown always renders on a solid white card regardless of
          isScrolled — it's an overlay on top of the page, not part of
          the glass header itself, so its own text colors stay fixed. */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-lg)]">
          <p className="text-sm font-bold text-[var(--ink)]">{user.name}</p>
          <p className="mt-0.5 truncate text-xs text-[var(--color-text-secondary,#6b7a70)]">{user.email}</p>

          <div className="my-3 border-t border-[var(--color-border-light)]" />

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-[var(--radius-md)] px-2 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:bg-[var(--color-background-soft)]"
          >
            <User size={16} aria-hidden="true" />
            My profile
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-2 rounded-[var(--radius-md)] px-2 py-2 text-left text-sm font-medium text-[var(--color-text-primary)] transition hover:bg-[var(--color-background-soft)]"
          >
            <span aria-hidden="true">↪</span>
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

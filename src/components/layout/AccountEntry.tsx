'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useAuthModalStore } from '@/store/authModalStore'

interface AccountEntryProps {
  /** See DesktopNavigation for the full explanation — true once the
   *  header has scrolled off the hero photo onto its light glass
   *  background. Only the outlined "Login" button and the avatar
   *  fallback ring need to switch; "Book Now" already sits on a solid
   *  yellow chip so it stays legible on both backgrounds untouched. */
  isScrolled?: boolean
}

export function AccountEntry({ isScrolled = true }: AccountEntryProps) {
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
    return <div className="hidden h-9 w-[76px] xl:block xl:h-10" aria-hidden="true" />
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="hidden items-center gap-2 xl:flex xl:gap-3">
        {/* Opens the login pop-up (AuthModal) instead of navigating to /login */}
        <button
          type="button"
          onClick={() => openAuthModal('signin')}
          className={
            isScrolled
              ? 'inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border border-[var(--green)] bg-white px-3 text-sm font-bold text-[var(--green)] transition hover:bg-[var(--green)] hover:text-white xl:h-10 xl:px-5'
              : 'inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border border-white/50 bg-white/10 px-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 xl:h-10 xl:px-5'
          }
        >
          Login
        </button>
        {/* Opens the pop-up on the "Create account" tab instead of /signup */}
        <button
          type="button"
          onClick={() => openAuthModal('signup')}
          className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] bg-[var(--yellow)] px-4 text-sm font-bold text-[var(--green-dark)]  transition hover:brightness-95 xl:h-10 xl:px-6"
        >
          Book Now
        </button>
      </div>
    )
  }

  return (
    <div className="relative hidden xl:block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Account menu"
        className={
          isScrolled
            ? 'inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--green)] bg-[var(--green-dark)] text-white transition hover:brightness-110 xl:h-10 xl:w-10'
            : 'inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white/70 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 xl:h-10 xl:w-10'
        }
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
        <div className="absolute right-0 top-full mt-2 w-64 rounded-[12px] border border-[#e7efe9] bg-white p-4   ">
          <p className="text-sm font-bold text-[var(--ink)]">{user.name}</p>
          <p className="mt-0.5 truncate text-xs text-[var(--color-text-secondary,#6b7a70)]">{user.email}</p>

          <div className="my-3 border-t border-[#e7efe9]" />

          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-[8px] px-1 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[#f4f8f5]"
          >
            <User size={16} aria-hidden="true" />
            My profile
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-2 rounded-[8px] px-1 py-2 text-left text-sm font-medium text-[var(--ink)] transition hover:bg-[#f4f8f5]"
          >
            <span aria-hidden="true">↪</span>
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
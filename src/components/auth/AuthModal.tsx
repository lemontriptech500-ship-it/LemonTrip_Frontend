'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'
import { useAuthModalStore } from '@/store/authModalStore'
import { LoginForm } from '@/components/auth/LoginForm'
import { SignupForm } from '@/components/auth/SignupForm'

const PERKS = ['One place for every itinerary', 'Faster checkout on every booking', 'Save trips to your wishlist']

/**
 * AuthModal
 * ------------------------------------------------------------
 * Login / Register pop-up (MakeMyTrip style). Rendered in a portal
 * on <body> so it sits above the header and hero on every page.
 * Mount ONCE (in Header.tsx) and open it with
 * useAuthModalStore().open('signin' | 'signup').
 *
 * Esc / clicking the dim background / the X button closes it. Page
 * scroll is locked while it is open and focus returns to the button
 * that opened it.
 *
 * SIZE: to make it bigger or smaller change `max-w-[720px]` (dialog)
 * and `w-[260px]` (brand panel) below.
 */
export function AuthModal() {
  const { isOpen, mode, redirectTo, close, setMode } = useAuthModalStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!isOpen) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    dialogRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [isOpen, close])

  if (!mounted || !isOpen) return null

  const handleSuccess = () => {
    close()
    if (redirectTo) router.push(redirectTo)
  }

  const isSignin = mode === 'signin'

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      {/* Dimmed, blurred backdrop */}
      <div
        className="absolute inset-0 bg-[#042d1b]/60 backdrop-blur-sm animate-in fade-in"
        onClick={close}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        tabIndex={-1}
        className="relative z-10 flex max-h-[90vh] w-full max-w-[920px] overflow-hidden rounded-2xl bg-[var(--color-surface)] shadow-2xl outline-none animate-in fade-in zoom-in-95"
      >
        {/* Brand panel (hidden on small screens) */}
        <aside className="relative hidden w-[420px] shrink-0 overflow-hidden bg-neutral-900 md:block">
        <div
  className="absolute inset-0 bg-cover bg-[position:70%_center]"
  style={{ backgroundImage: "url('/hero.png?hero-v=20260908')" }}
  aria-hidden="true"
/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#042d1b]/95 via-[#042d1b]/70 to-[#042d1b]/40" aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-end p-6 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--yellow)]">
              {isSignin ? 'Welcome back' : 'Join LemonTrip'}
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight">Go further with every journey.</h2>
            <ul className="mt-4 space-y-2.5 text-[13px] text-white/90">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--green-dark)]">
                    <Check size={10} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Form panel */}
        <div className="min-w-0 flex-1 overflow-y-auto p-5 sm:p-6">
          {/* Tabs + close button share one row so they never overlap */}
          <div className="mb-4 flex items-center gap-3">
            <div
              role="tablist"
              aria-label="Sign in or create account"
              className="grid flex-1 grid-cols-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-1"
            >
              {(['signin', 'signup'] as const).map((tab) => {
                const active = mode === tab
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setMode(tab)}
                    className={`rounded-full px-3 py-1.5 text-[13px] font-semibold transition ${
                      active
                        ? 'bg-[var(--color-primary)] text-[var(--green-dark)] shadow-sm'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {tab === 'signin' ? 'Sign in' : 'Create account'}
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] ring-1 ring-[var(--color-border)] transition hover:text-[var(--color-error)]"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <h2 id="auth-modal-title" className="text-xl font-bold text-[var(--color-text-primary)]">
            {isSignin ? 'Sign in to LemonTrip' : 'Create your account'}
          </h2>
          <p className="mb-4 mt-0.5 text-[13px] text-[var(--color-text-secondary)]">
            {isSignin
              ? 'Pick up where your next journey left off.'
              : 'Book faster and keep every trip in one place.'}
          </p>

          {isSignin ? (
            <LoginForm compact onSuccess={handleSuccess} onNavigate={close} />
          ) : (
            <SignupForm compact onSuccess={handleSuccess} />
          )}

          <p className="mt-4 text-center text-[11px] text-[var(--color-text-muted)]">
            By continuing, you agree to our{' '}
            <a href="/terms" onClick={close} className="font-medium text-[var(--color-primary)] hover:underline">Terms</a>{' '}
            and{' '}
            <a href="/privacy" onClick={close} className="font-medium text-[var(--color-primary)] hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}
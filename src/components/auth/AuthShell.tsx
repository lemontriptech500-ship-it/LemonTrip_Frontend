'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { SITE_NAME } from '@/constants'

interface AuthShellProps {
  mode: 'signin' | 'signup'
  children: React.ReactNode
}

export function AuthShell({ mode, children }: AuthShellProps) {
  const isSignIn = mode === 'signin'

  return (
    <div className="h-[100dvh] overflow-hidden bg-[var(--color-background-soft)] p-3 sm:p-6">
      <Container className="flex h-full items-center justify-center">
        <div className="mx-auto grid h-full max-h-[720px] w-full max-w-5xl min-h-0 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="relative hidden min-h-0 overflow-hidden bg-[var(--color-text-primary)] lg:block">
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=85"
              alt="Mountain lake viewed from a scenic travel overlook"
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-[var(--color-text-primary)]/65" />
            <div className="relative flex h-full flex-col justify-between p-10 text-white">
              <Link href="/" className="inline-flex items-center rounded-lg bg-white px-2 py-1" aria-label={`${SITE_NAME} home`}>
                <img src="/lemonTripLogo.jpeg" alt={`${SITE_NAME} Logo`} className="h-9 w-36 object-cover object-center" />
              </Link>
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-secondary)]">Travel starts with a plan</p>
                <h2 className="max-w-sm text-4xl font-extrabold leading-tight">Go further with every journey.</h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80">
                  Keep your trips, stays, and travel plans close at hand with one simple LemonTrip account.
                </p>
                <div className="mt-8 space-y-3 text-sm text-white/90">
                  <p className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[var(--color-secondary)]" /> One place for every itinerary</p>
                  <p className="flex items-center gap-3"><ShieldCheck size={18} className="text-[var(--color-secondary)]" /> Clear, secure demo experience</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="min-h-0 overflow-hidden p-4 sm:p-7 lg:p-9">
            <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]" >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to home
            </Link>
            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-primary)]">{isSignIn ? 'Welcome back' : 'Start exploring'}</p>
              <h1 className="mt-2 text-h1 text-[var(--color-text-primary)]">{isSignIn ? 'Sign in to LemonTrip' : 'Create your account'}</h1>
              <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">
                {isSignIn ? 'Pick up where your next journey left off.' : 'Save your travel plans and make booking simpler.'}
              </p>
            </div>
            <div className="mx-auto w-full max-w-md">{children}</div>
            <p className="mt-5 border-t border-[var(--color-border-light)] pt-3 text-center text-xs leading-relaxed text-[var(--color-text-secondary)]">
              This frontend account experience is a demo. No credentials are sent to a server.
            </p>
          </main>
        </div>
      </Container>
    </div>
  )
}

export function AuthSwitch({ mode }: { mode: 'signin' | 'signup' }) {
  const isSignIn = mode === 'signin'
  return (
    <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
      {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
      <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-bold text-[var(--color-accent)] hover:bg-transparent hover:text-[var(--color-accent-hover)]">
        <Link href={isSignIn ? '/signup' : '/login'}>{isSignIn ? 'Create one' : 'Sign in'}</Link>
      </Button>
    </p>
  )
}

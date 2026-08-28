'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, ShieldCheck, Plane } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { SITE_NAME } from '@/constants'

interface AuthShellProps {
  mode: 'signin' | 'signup'
  children: React.ReactNode
}

export function AuthShell({ mode, children }: AuthShellProps) {
  const isSignIn = mode === 'signin'

  return (
    <div className="min-h-[100dvh] bg-[var(--color-background)]">
      {/* Top bar */}
      <div className="border-b border-[var(--color-border-light)] bg-white">
        <Container className="flex h-14 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2" aria-label={`${SITE_NAME} home`}>
            <img src="/lemonTripLogo.jpeg" alt={`${SITE_NAME} Logo`} className="h-9 w-32 object-cover object-center" />
          </Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
            <ArrowLeft size={14} aria-hidden="true" />
            Back to home
          </Link>
        </Container>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-sm p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-4">
                <Plane size={12} />
                <span>{isSignIn ? 'Welcome back' : 'Get started'}</span>
              </div>
              <h1 className="text-h1 text-[var(--color-text-primary)]">
                {isSignIn ? 'Sign in to LemonTrip' : 'Create your account'}
              </h1>
              <p className="mt-2 text-body-sm text-[var(--color-text-secondary)]">
                {isSignIn ? 'Pick up where your next journey left off.' : 'Save your travel plans and make booking simpler.'}
              </p>
            </div>

            {children}
          </div>

          {/* Trust signals */}
          <div className="mt-6 flex items-center justify-center gap-6 text-caption text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} />
              Secure
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              No spam
            </span>
          </div>

          {/* Demo notice */}
          <p className="mt-4 text-center text-xs leading-relaxed text-[var(--color-text-muted)]">
            This is a frontend demo. No credentials are sent to a server.
          </p>
        </div>
      </div>
    </div>
  )
}

export function AuthSwitch({ mode }: { mode: 'signin' | 'signup' }) {
  const isSignIn = mode === 'signin'
  return (
    <p className="mt-5 text-center text-sm text-[var(--color-text-secondary)]">
      {isSignIn ? "Don't have an account?" : 'Already have an account?'}{' '}
      <Button variant="ghost" size="sm" asChild className="h-auto p-0 font-semibold text-[var(--color-primary)] hover:bg-transparent hover:text-[var(--color-primary-hover)]">
        <Link href={isSignIn ? '/signup' : '/login'}>{isSignIn ? 'Create one' : 'Sign in'}</Link>
      </Button>
    </p>
  )
}

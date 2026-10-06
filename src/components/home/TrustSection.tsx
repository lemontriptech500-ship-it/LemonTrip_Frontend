import React from 'react'
import { Container } from '@/components/ui'

type TrustIcon = 'secure' | 'payment' | 'support' | 'pricing'

function TrustIllustration({ type }: { type: TrustIcon }) {
  const green = 'var(--green-dark)'
  const yellow = 'var(--yellow-soft)'

  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
      {type === 'secure' && <>
        <path d="m32 5 21 9v16c0 14-9 23-21 29C20 53 11 44 11 30V14l21-9Z" fill="var(--white)" stroke={green} strokeWidth="4" strokeLinejoin="round" />
        <path d="m22 32 7 7 14-15" stroke={green} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </>}
      {type === 'payment' && <>
        <rect x="7" y="12" width="43" height="32" rx="6" fill="var(--white)" stroke={green} strokeWidth="4" />
        <path d="M9 22h39M15 31h15" stroke={green} strokeWidth="4" strokeLinecap="round" />
        <path d="M37 42v-4a7 7 0 0 1 14 0v4" stroke={green} strokeWidth="4" strokeLinecap="round" />
        <rect x="34" y="41" width="20" height="17" rx="4" fill={yellow} stroke={green} strokeWidth="3" />
        <circle cx="44" cy="48" r="2" fill={green} />
      </>}
      {type === 'support' && <>
        <path d="M10 33v-5a22 22 0 0 1 44 0v6" stroke={green} strokeWidth="5" strokeLinecap="round" />
        <rect x="7" y="29" width="10" height="17" rx="5" fill={yellow} stroke={green} strokeWidth="3" />
        <path d="M53 33v7a10 10 0 0 1-10 10h-4" stroke={green} strokeWidth="4" strokeLinecap="round" />
        <circle cx="37" cy="50" r="4" fill={green} />
        <circle cx="43" cy="42" r="12" fill={yellow} />
        <path d="m38 42 5-2-1-4 2-1 3 5 4 2-1 2-5-1-3 3-2-1 2-3-3 1-1-1Z" fill={green} />
      </>}
      {type === 'pricing' && <>
        <path d="m7 29 22-22 22 2 5 22-22 22L7 29Z" fill="var(--white)" stroke={green} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="42" cy="17" r="3" fill={yellow} />
        <circle cx="45" cy="43" r="11" fill={green} />
        <path d="m40 43 4 4 7-8" stroke={yellow} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m54 5 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill={yellow} />
      </>}
    </svg>
  )
}

const trustPoints = [
  { icon: 'secure' as const, title: 'Secure Booking', detail: 'Your data is protected' },
  { icon: 'payment' as const, title: 'Protected Payments', detail: 'Safe & encrypted' },
  { icon: 'support' as const, title: 'Travel Support', detail: 'Assistance when needed' },
  { icon: 'pricing' as const, title: 'Transparent Pricing', detail: 'No hidden fees' },
]

export function TrustSection() {
  return (
    <section aria-label="Booking assurances" className="bg-[var(--color-surface)] py-3 sm:py-4">
      <Container>
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-soft)] divide-x divide-y divide-[var(--color-border)] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {trustPoints.map(({ icon, title, detail }) => (
            <div key={title} className="flex min-h-20 items-center justify-center gap-3 px-3 py-3 sm:px-4 lg:px-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-[var(--green-dark)]">
                <TrustIllustration type={icon} />
              </div>
              <div className="min-w-0">
                <h4 className="mb-0.5 text-xs font-bold leading-tight text-[var(--green-dark)] sm:text-sm">{title}</h4>
                <p className="text-[11px] leading-snug text-[var(--color-text-secondary)] sm:text-xs">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

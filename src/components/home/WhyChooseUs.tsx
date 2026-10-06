import React from 'react'
import { Container, SectionHeading } from '@/components/ui'

type FeatureIcon = 'travel' | 'booking' | 'visa' | 'payments' | 'support' | 'information'

function FeatureIllustration({ type }: { type: FeatureIcon }) {
  const stroke = 'var(--green-dark)'
  const yellow = 'var(--yellow-soft)'

  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" aria-hidden="true">
      {type === 'travel' && <>
        <circle cx="31" cy="42" r="13" fill="var(--yellow-soft)" stroke={stroke} strokeWidth="3" />
        <path d="M19 42h24M31 29c4 4 6 8 6 13s-2 9-6 13m0-26c-4 4-6 8-6 13s2 9 6 13" stroke={stroke} strokeWidth="2" />
        <path d="m9 40 9-11 3 2-5 9 13-7 3 3-16 13-7-1 6-8-6 3Z" fill={yellow} stroke={yellow} strokeWidth="2" strokeLinejoin="round" />
        <path d="m36 16 15-5-6 8 8 4-2 3-11-2-7 7-3-2 3-9-5-4 1-3 7 3Z" fill={stroke} />
      </>}
      {type === 'booking' && <>
        <rect x="13" y="14" width="36" height="39" rx="5" fill="var(--yellow-soft)" stroke={stroke} strokeWidth="3" />
        <path d="M22 10v9m18-9v9M14 25h34" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
        <path d="M22 33h6m8 0h5M22 42h6m8 0h3" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <circle cx="47" cy="46" r="11" fill={yellow} />
        <path d="m42 46 3 3 6-7" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </>}
      {type === 'visa' && <>
        <path d="m14 14 27-5 8 39-27 5-8-39Z" fill={stroke} />
        <circle cx="31" cy="29" r="9" stroke="var(--yellow-soft)" strokeWidth="2" />
        <path d="M22 29h18m-9-9c3 3 4 6 4 9s-1 6-4 9m0-18c-3 3-4 6-4 9s1 6 4 9" stroke="var(--yellow-soft)" strokeWidth="1.5" />
        <rect x="34" y="38" width="22" height="16" rx="3" fill={yellow} stroke={stroke} strokeWidth="2" />
        <text x="37" y="49" fill={stroke} fontSize="8" fontWeight="800">VISA</text>
        <path d="m49 13 2-5m5 11 5-2m-6 9 4 1" stroke={yellow} strokeWidth="2.5" strokeLinecap="round" />
      </>}
      {type === 'payments' && <>
        <path d="m32 7 21 9v15c0 13-9 22-21 27C20 53 11 44 11 31V16l21-9Z" fill={stroke} />
        <path d="m32 13 15 6v12c0 9-6 16-15 21-9-5-15-12-15-21V19l15-6Z" stroke="var(--yellow-soft)" strokeWidth="2" />
        <rect x="25" y="29" width="14" height="12" rx="3" fill={yellow} />
        <path d="M28 29v-4a4 4 0 0 1 8 0v4" stroke={yellow} strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="35" r="1.5" fill={stroke} />
      </>}
      {type === 'support' && <>
        <path d="M13 33v-5a19 19 0 0 1 38 0v5" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
        <rect x="9" y="29" width="9" height="16" rx="4" fill={yellow} stroke={stroke} strokeWidth="2" />
        <rect x="46" y="29" width="9" height="16" rx="4" fill={yellow} stroke={stroke} strokeWidth="2" />
        <circle cx="32" cy="31" r="12" fill="#f2c79d" />
        <path d="M20 30c1-13 23-17 25 1-4-2-7-6-8-9-4 5-10 8-17 8Z" fill={stroke} />
        <path d="M17 55c2-10 8-15 15-15s13 5 15 15" fill={stroke} />
        <path d="M23 34h.5m16-.5h.5" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="40" y="43" width="19" height="13" rx="5" fill={yellow} />
        <circle cx="46" cy="49" r="1" fill={stroke} /><circle cx="51" cy="49" r="1" fill={stroke} />
      </>}
      {type === 'information' && <>
        <rect x="13" y="8" width="34" height="48" rx="4" fill="var(--white)" stroke={stroke} strokeWidth="3" />
        <path d="M21 20h18M21 28h18M21 36h12" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <circle cx="47" cy="44" r="11" fill={yellow} />
        <path d="M47 43v7m0-12h.1" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="m54 29 3-3m-1 10 4-1" stroke={yellow} strokeWidth="2.5" strokeLinecap="round" />
      </>}
    </svg>
  )
}

/**
 * WhyChooseUs
 * ------------------------------------------------------------
 * `align="center"` now works — SectionHeading has a centered
 * variant (title + description stacked, center-aligned) for
 * exactly this kind of "intro, then symmetric grid" section.
 *
 * The icon tiles use the shared yellow and deep-green brand colors.
 */

const features = [
  {
    id: 1,
    icon: 'travel' as const,
    title: 'Multiple Travel Services',
    description: 'Flights, hotels, trains, buses, and packages all in one unified platform.',
  },
  {
    id: 2,
    icon: 'booking' as const,
    title: 'Easy Booking Experience',
    description: 'A seamless, fast, and intuitive booking process designed for your convenience.',
  },
  {
    id: 3,
    icon: 'visa' as const,
    title: 'Visa Assistance',
    description: 'Comprehensive guidance and tracking for your international visa applications.',
  },
  {
    id: 4,
    icon: 'payments' as const,
    title: 'Secure Payments',
    description: 'Industry-standard encryption to keep your transactions and data safe.',
  },
  {
    id: 5,
    icon: 'support' as const,
    title: '24/7 Customer Support',
    description: 'Our dedicated team is here to assist you anytime, anywhere.',
  },
  {
    id: 6,
    icon: 'information' as const,
    title: 'Transparent Information',
    description: 'No hidden fees. We believe in complete transparency for all your bookings.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="section-gap bg-[var(--color-surface)]">
      <Container>
        <SectionHeading
          title="Why Choose LemonTrip"
          description="We are committed to providing you with the best travel booking experience."
          align="center"
        />

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            return (
              <div
                key={feature.id}
                className="flex min-h-28 gap-4 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-surface)] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border)] hover:shadow-[var(--shadow-md)]"
              >
                <div className="shrink-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-[var(--green-dark)]">
                    <FeatureIllustration type={feature.icon} />
                  </div>
                </div>
                <div>
                  <h3 className="text-h3 mb-1.5">{feature.title}</h3>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Globe2, FileText, CheckCircle, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui'

const FEATURES = [
  'Tourist & Business Visas',
  'Document Checklists',
  'Application Tracking',
  'Expert Guidance',
]

/**
 * VisaHighlight — premium version:
 * dark green stage with glow + dot pattern, glass feature tiles,
 * rounded photo with a floating caption chip, pill CTA.
 */
export function VisaHighlight() {
  return (
    <section className="section-gap bg-[var(--color-background)]">
      <Container>
        <div className="surface-dark relative overflow-hidden rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full bg-[rgba(255,210,0,0.16)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[rgba(17,128,71,0.4)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          <div className="relative flex flex-col items-center gap-10 p-7 sm:p-10 lg:flex-row lg:gap-14 lg:p-14">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-3.5 py-1.5 text-xs font-extrabold text-[var(--green-dark)] shadow-[0_8px_22px_rgba(255,210,0,0.25)]">
                <Globe2 size={15} aria-hidden="true" />
                LemonTrip Visa Services
              </span>

              <h2 className="mt-6 max-w-2xl text-3xl font-extrabold leading-[1.1] text-white sm:text-5xl">
                Visa planning, <span className="text-highlight">made simple.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
                Find the right service, prepare your documents, and follow your application with expert guidance at
                every step.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 rounded-[var(--radius-md)] border border-white/15 bg-white/[0.07] px-4 py-3 backdrop-blur-md"
                  >
                    <CheckCircle size={18} className="shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/visa"
                className="mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-7 text-sm font-bold text-[var(--green-dark)] shadow-[0_10px_30px_rgba(255,210,0,0.25)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--green-dark)]"
              >
                Explore Visa Services <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-2xl)] border border-white/25 bg-[var(--color-surface)] shadow-[var(--shadow-xl)] lg:aspect-[4/4.6] lg:w-[360px] lg:shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1000&q=85"
                alt="Traveller preparing documents for an international journey"
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,58,41,0.85)] via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-[var(--radius-lg)] border border-white/20 bg-white/15 px-4 py-3 text-white backdrop-blur-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--green-dark)]">
                  <FileText size={18} aria-hidden="true" />
                </span>
                <span className="text-sm font-bold">Support for every step</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
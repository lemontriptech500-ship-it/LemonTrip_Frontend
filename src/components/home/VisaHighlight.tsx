import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import { Globe2, FileText, CheckCircle, ArrowRight } from 'lucide-react'

/**
 * A focused visa promotion with clear hierarchy, concise copy,
 * and a bright destination image against the LemonTrip palette.
 */

const FEATURES = [
  'Tourist & Business Visas',
  'Document Checklists',
  'Application Tracking',
  'Expert Guidance',
]

export function VisaHighlight() {
  return (
    <section className="section-gap bg-[var(--color-background-soft)]">
      <Container>
        <div className="relative flex flex-col items-center gap-9 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[var(--green-dark)] to-[var(--green)] p-6 shadow-[0_24px_64px_rgba(6,59,36,0.18)] sm:p-8 md:p-10 lg:flex-row lg:gap-12 lg:p-12">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gradient-to-br from-[rgba(255,210,26,0.08)] to-transparent blur-3xl" />

          <div className="relative z-10 flex-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--yellow)] px-3 py-1 text-xs font-bold text-[var(--green-dark)] shadow-sm">
              <Globe2 size={16} />
              <span>LemonTrip Visa Services</span>
            </div>

            <h2 className="text-h2 mb-4 max-w-2xl text-white">
              Visa planning, <span className="text-[var(--yellow)]">made simple.</span>
            </h2>

            <p className="mb-6 max-w-xl text-base leading-relaxed text-white/80">
              Find the right service, prepare your documents, and follow your application with expert guidance at every step.
            </p>

            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[var(--yellow)]" />
                  <span className="text-sm font-medium text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              iconPosition="right"
              icon={<ArrowRight size={16} />}
              asChild
            >
              <Link
                href="/visa"
                className="inline-flex items-center gap-2 rounded-[inherit] bg-[var(--yellow)] px-5 py-2.5 font-semibold text-[var(--green-dark)] transition hover:bg-[var(--yellow)]/90"
              >
                Explore Visa Services
              </Link>
            </Button>
          </div>

          <div className="relative z-10 block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/30 bg-[var(--color-surface)] shadow-xl lg:aspect-[4/4.2] lg:w-[340px] lg:shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1000&q=85"
              alt="Traveller preparing documents for an international journey"
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,59,36,0.82)] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-semibold text-white">
              <FileText size={16} aria-hidden="true" />
              Support for every step
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import { Globe2, FileText, CheckCircle, ArrowRight } from 'lucide-react'

/**
 * VisaHighlight
 * ------------------------------------------------------------
 * Fixes + restyle:
 *  - Fixed a malformed arbitrary-value gradient
 *    (`from-[rgba(39, 174, 96, 0.60) to-transparent`) that was
 *    missing its closing bracket and had spaces inside rgba(),
 *    which meant it silently never applied.
 *  - Fixed the Button/Link having two conflicting sets of
 *    color classes (Button said yellow-bg/green-text, the Link
 *    inside it said green-bg/yellow-text). Styling now lives in
 *    one place only, on the Link, since that's the actual
 *    rendered element with `asChild`.
 *  - Restored a text hierarchy: previously the heading, body
 *    copy, AND the feature checklist were all solid yellow, so
 *    nothing stood out from anything else. Now only the heading
 *    keeps the yellow accent; body copy and the checklist are
 *    white/light so the eye has somewhere to land.
 *  - Card corners bumped to rounded-2xl and the photo's border
 *    switched from a light gray (--color-border, which read oddly
 *    against the dark green card) to a subtle white border,
 *    consistent with the dark-card treatment used elsewhere.
 */

const FEATURES = [
  'Tourist & Business Visas',
  'Document Checklists',
  'Application Tracking',
  'Expert Guidance',
]

export function VisaHighlight() {
  return (
    <section className="bg-[var(--green-dark)] py-16">
      <Container>
        <div className="relative flex flex-col items-center gap-10 overflow-hidden rounded-2xl border border-[var(--yellow)]/40 bg-[var(--green-dark)] p-8 shadow-[0_18px_45px_rgba(6,59,36,0.25)] md:p-12 lg:flex-row lg:p-14">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gradient-to-br from-[rgba(255,210,26,0.08)] to-transparent blur-3xl" />

          <div className="relative z-10 flex-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--yellow)] px-3 py-1 text-xs font-bold text-[var(--green-dark)] shadow-sm">
              <Globe2 size={14} />
              <span>LemonTrip Visa Services</span>
            </div>

            <h2 className="text-h1 mb-5 text-[var(--yellow)]">
              Global Travel, Simplified Visas.
            </h2>

            <p className="text-body mb-6 max-w-lg text-white/85">
              Don&apos;t let visa complexities delay your travel plans. Explore requirements, check
              necessary documents, and track your application progress all in one place.
            </p>

            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-[var(--yellow)]" />
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

          <div className="relative z-10 hidden aspect-square w-full overflow-hidden rounded-2xl border-4 border-white/15 bg-[var(--color-surface)] shadow-lg lg:flex lg:w-[360px]">
            <Image
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1000&q=85"
              alt="Traveller preparing documents for an international journey"
              fill
              sizes="360px"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,59,36,0.75)] to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
              <FileText size={18} aria-hidden="true" />
              Travel documentation, simplified
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
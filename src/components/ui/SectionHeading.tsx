import React from 'react'
import Link from 'next/link'

/**
 * SectionHeading
 * ------------------------------------------------------------
 * Matches the ".section-head" pattern from the reference
 * index.html: a serif title on the left, a short muted
 * description on the right (stacked on mobile), and an
 * optional "View All" style link/action.
 *
 * This replaces any prior underline-accent heading style.
 * Used by PopularDestinations, FeaturedOffers, and any other
 * home section that needs a title + description row.
 *
 * align="center" (e.g. WhyChooseUs) switches to a stacked,
 * centered intro — title, then description directly beneath it,
 * both center-aligned — for sections that lead into a symmetric
 * grid rather than a left-aligned content block.
 */

interface SectionHeadingProps {
  title: string
  description?: string
  action?: {
    label: string
    href: string
  }
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ title, description, action, align = 'left', className = '' }: SectionHeadingProps) {
  if (align === 'center') {
    return (
      <div className={`mx-auto flex max-w-[640px] flex-col items-center gap-3 text-center ${className}`}>
        <h2 className="text-h2 text-[var(--color-text-primary)]">{title}</h2>
        {description && (
          <p className="text-body text-[var(--color-text-muted)]">{description}</p>
        )}
        {action && (
          <Link
            href={action.href}
            className="text-sm font-semibold text-[var(--color-primary-dark)] transition hover:underline"
          >
            {action.label} →
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <h2 className="text-h2 text-[var(--color-text-primary)]">{title}</h2>

      <div className="flex flex-col items-start gap-2 sm:items-end">
        {description && (
          <p className="max-w-[420px] text-body text-[var(--color-text-muted)] sm:text-right">
            {description}
          </p>
        )}
        {action && (
          <Link
            href={action.href}
            className="text-sm font-semibold text-[var(--color-primary-dark)] transition hover:underline"
          >
            {action.label} →
          </Link>
        )}
      </div>
    </div>
  )
}
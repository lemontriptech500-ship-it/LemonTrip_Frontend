import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * SectionHeading — premium version:
 * optional eyebrow label, bold title, yellow accent bar,
 * and a pill-style "view all" action.
 */

interface SectionHeadingProps {
  title: string
  description?: string
  eyebrow?: string
  action?: {
    label: string
    href: string
  }
  align?: 'left' | 'center'
  className?: string
}

function ActionLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white px-4 py-2 text-sm font-bold text-[var(--green-dark)] transition-colors hover:border-[var(--green-dark)] hover:bg-[var(--green-dark)] hover:text-white"
    >
      {label}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  )
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  action,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  if (align === 'center') {
    return (
      <div className={`mx-auto flex max-w-[640px] flex-col items-center gap-3 text-center ${className}`}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="text-h2 text-[var(--color-text-primary)]">{title}</h2>
        <div className="h-1 w-14 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
        {description && <p className="text-body text-[var(--color-text-muted)]">{description}</p>}
        {action && <ActionLink {...action} />}
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="text-h2 text-[var(--color-text-primary)]">{title}</h2>
        <div className="mt-4 h-1 w-14 rounded-full bg-[var(--color-primary)]" aria-hidden="true" />
      </div>

      <div className="flex flex-col items-start gap-3 sm:items-end">
        {description && (
          <p className="max-w-[420px] text-body text-[var(--color-text-muted)] sm:text-right">{description}</p>
        )}
        {action && <ActionLink {...action} />}
      </div>
    </div>
  )
}
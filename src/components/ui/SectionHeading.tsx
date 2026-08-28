import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SectionHeadingProps } from '@/types'

// ============================================================
// SectionHeading — Consistent section title + optional description
// and optional "View All" / action link.
// ============================================================

export function SectionHeading({
  title,
  description,
  align = 'left',
  action,
}: SectionHeadingProps) {
  const alignStyles = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <div className={cn('flex flex-col gap-2', alignStyles[align])}>
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <h2 className="text-h2 text-[var(--color-text-primary)]">{title}</h2>

        {action && (
          <Link
            href={action.href}
            className={cn(
              'inline-flex shrink-0 items-center gap-1',
              'text-body-sm font-semibold text-[var(--color-primary)]',
              'hover:text-[var(--color-primary-dark)] transition-colors',
            )}
          >
            {action.label}
            <ArrowRight size={14} aria-hidden />
          </Link>
        )}
      </div>

      {description && (
        <p className="text-body text-[var(--color-text-secondary)] max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}

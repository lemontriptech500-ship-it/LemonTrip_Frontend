import React from 'react'
import { cn } from '@/lib/utils'
import type { BadgeVariant } from '@/types'

// ============================================================
// Badge — Semantic status indicator / label chip.
// ============================================================

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-border)] text-[var(--color-text-secondary)]',
  success: 'bg-[var(--color-success-bg)] text-[var(--color-success)]',
  warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning)]',
  error: 'bg-[var(--color-error-bg)] text-[var(--color-error)]',
  info: 'bg-[var(--color-info-bg)] text-[var(--color-info)]',
  neutral: 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]',
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5',
        'text-xs font-medium leading-none',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

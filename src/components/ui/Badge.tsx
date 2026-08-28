import React from 'react'
import { cn } from '@/lib/utils'
import type { BadgeVariant } from '@/types'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
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
        'inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5',
        'text-xs font-semibold leading-none',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

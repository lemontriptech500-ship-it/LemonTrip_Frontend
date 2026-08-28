import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import type { ButtonVariant } from '@/types'

// ============================================================
// EmptyState — Reusable empty state placeholder.
// Useful for empty lists, search results, or missing data.
// ============================================================

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: ButtonVariant
  }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center',
        className
      )}
    >
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]">
          {icon}
        </div>
      )}
      
      <h3 className="text-h4 text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-body text-[var(--color-text-secondary)] max-w-sm mb-6">
          {description}
        </p>
      )}
      
      {action && (
        <Button
          variant={action.variant || 'primary'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}

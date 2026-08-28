import React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'

// ============================================================
// ErrorState — Reusable error state with optional retry.
// ============================================================

export interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred while loading this content. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-error)]/20 bg-[var(--color-error-bg)] px-6 py-12 text-center',
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-error-bg)] text-[var(--color-error)]">
        <AlertCircle size={32} />
      </div>
      
      <h3 className="text-h4 text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      
      <p className="text-body text-[var(--color-text-secondary)] max-w-sm mb-6">
        {description}
      </p>
      
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="bg-white border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error-bg)] focus-visible:ring-[var(--color-error)]"
        >
          Try Again
        </Button>
      )}
    </div>
  )
}

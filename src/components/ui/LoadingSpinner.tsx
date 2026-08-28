import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================
// LoadingSpinner — Reusable loading indicator.
// ============================================================

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

export function LoadingSpinner({
  size = 'md',
  className,
  text,
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2
        size={sizeMap[size]}
        className="animate-spin text-[var(--color-primary)]"
        aria-label="Loading"
      />
      {text && (
        <p className="text-body-sm text-[var(--color-text-secondary)] animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}

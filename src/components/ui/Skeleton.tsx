import React from 'react'
import { cn } from '@/lib/utils'

// ============================================================
// Skeleton — Animated loading placeholder.
// ============================================================

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  /** Makes it a perfect circle (e.g., for avatars) */
  circle?: boolean
}

export function Skeleton({
  className,
  circle = false,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton-shimmer', // Defined in globals.css
        circle ? 'rounded-full' : 'rounded-[var(--radius-md)]',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
}

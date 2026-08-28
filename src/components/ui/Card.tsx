import React from 'react'
import { cn } from '@/lib/utils'

// ============================================================
// Card — Generic surface container.
// Intentionally content-agnostic so it can wrap Flight cards,
// Hotel cards, Offer cards, Destination cards, etc.
// Travel-specific card layouts are built in their own modules.
// ============================================================

interface CardProps {
  /** Padding preset. Defaults to 'md'. */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Elevation level via box-shadow. */
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  /** Lift the card on hover. */
  hover?: boolean
  /** Make the card fill a grid/flex parent. */
  fullHeight?: boolean
  className?: string
  children: React.ReactNode
  /** Forwarded to the root element for accessibility/testing */
  id?: string
  role?: string
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}

const shadowStyles = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

export function Card({
  padding = 'md',
  shadow = 'sm',
  hover = false,
  fullHeight = false,
  className,
  children,
  id,
  role,
}: CardProps) {
  return (
    <div
      id={id}
      role={role}
      className={cn(
        // Base surface
        'rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)]',
        // Padding
        paddingStyles[padding],
        // Shadow
        shadowStyles[shadow],
        // Hover lift
        hover && 'transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-md',
        // Full height
        fullHeight && 'h-full',
        className,
      )}
    >
      {children}
    </div>
  )
}

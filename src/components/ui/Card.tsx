import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  fullHeight?: boolean
  className?: string
  children: React.ReactNode
  id?: string
  role?: string
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
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
        'rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)]',
        paddingStyles[padding],
        shadowStyles[shadow],
        hover && 'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--color-border-strong)]',
        fullHeight && 'h-full',
        className,
      )}
    >
      {children}
    </div>
  )
}

'use client'

import React, { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { InputSize } from '@/types'

// ============================================================
// Select — Styled native select component.
// Includes custom dropdown arrow and standard form states.
// ============================================================

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  size?: InputSize
  optional?: boolean
  wrapperClassName?: string
  theme?: 'default' | 'dark-green'
}

const selectSizeStyles: Record<InputSize, string> = {
  sm: 'h-8  pl-3 pr-8 text-sm',
  md: 'h-10 pl-3 pr-10 text-sm',
  lg: 'h-12 pl-4 pr-12 text-base',
}

export function Select({
  label,
  helperText,
  error,
  size = 'md',
  optional = false,
  disabled = false,
  className,
  wrapperClassName,
  id: idProp,
  children,
  theme = 'default',
  ...props
}: SelectProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const helperId = `${id}-helper`
  const hasError = Boolean(error)
  const isDarkGreen = theme === 'dark-green'

  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-label',
            isDarkGreen ? 'text-[#FFD21A]' : 'text-[var(--color-text-primary)]',
            disabled && 'opacity-50',
          )}
        >
          {label}
          {optional && (
            <span className="ml-1 text-[var(--color-text-muted)] font-normal">
              (optional)
            </span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={id}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={helperText || error ? helperId : undefined}
          className={cn(
            'w-full appearance-none rounded-[var(--radius-md)] border bg-[var(--color-surface)]',
            isDarkGreen ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-text-primary)]',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
            selectSizeStyles[size],
            !hasError && [
              'border-[var(--color-border)]',
              'hover:border-[var(--color-secondary-hover)]',
              'focus-visible:border-[var(--color-primary)] focus-visible:ring-[rgba(39, 174, 96, 0.20)',
            ],
            hasError && [
              'border-[var(--color-error)]',
              'focus-visible:border-[var(--color-error)] focus-visible:ring-[rgba(192, 57, 43, 0.20)',
            ],
            disabled && 'cursor-not-allowed opacity-50 bg-[var(--color-surface-secondary)]',
            className,
          )}
          {...props}
        >
          {children}
        </select>

        {/* Custom Chevron icon */}
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute right-3 flex items-center justify-center',
            isDarkGreen ? 'text-[#FFD21A]' : 'text-[var(--color-text-muted)]',
            disabled && 'opacity-50'
          )}
        >
          <ChevronDown size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
        </span>
      </div>

      {(helperText || error) && (
        <p
          id={helperId}
          role={hasError ? 'alert' : undefined}
          className={cn(
            'text-caption',
            hasError
              ? 'text-[var(--color-error)]'
              : 'text-[var(--color-text-muted)]',
          )}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  )
}

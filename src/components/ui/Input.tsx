'use client'

import React, { useId } from 'react'
import { cn } from '@/lib/utils'
import type { InputSize } from '@/types'

// ============================================================
// Input — Generic text input component.
// Supports label, helper text, error, icons, sizes, and all
// standard input states. Intentionally travel-logic-free.
// ============================================================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label — rendered as <label> above the field */
  label?: string
  /** Helper text shown below the input */
  helperText?: string
  /** Error message — replaces helperText and applies error styles */
  error?: string
  /** Size preset */
  size?: InputSize
  /** Icon rendered on the left inside the input */
  leadingIcon?: React.ReactNode
  /** Icon or element rendered on the right inside the input */
  trailingIcon?: React.ReactNode
  /** Makes the label optional text visible */
  optional?: boolean
  /** Controlled wrapper className */
  className?: string
  /** Class applied to the root wrapper div */
  wrapperClassName?: string
}

const inputSizeStyles: Record<InputSize, string> = {
  sm: 'h-8  px-3 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base',
}

const iconSizeStyles: Record<InputSize, string> = {
  sm: 'h-8  w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

export function Input({
  label,
  helperText,
  error,
  size = 'md',
  leadingIcon,
  trailingIcon,
  optional = false,
  disabled = false,
  className,
  wrapperClassName,
  id: idProp,
  ...props
}: InputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const helperId = `${id}-helper`
  const hasError = Boolean(error)

  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-label text-[var(--color-text-primary)]',
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
        {/* Leading icon */}
        {leadingIcon && (
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute left-0 flex items-center justify-center',
              'text-[var(--color-text-muted)]',
              iconSizeStyles[size],
            )}
          >
            {leadingIcon}
          </span>
        )}

        <input
          id={id}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={helperText || error ? helperId : undefined}
          className={cn(
            // Base
            'w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)]',
            'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
            // Size
            inputSizeStyles[size],
            // Icon padding adjustments
            leadingIcon  && 'pl-10',
            trailingIcon && 'pr-10',
            // Default state
            !hasError && [
              'border-[var(--color-border)]',
              'hover:border-[var(--color-secondary-hover)]',
              'focus-visible:border-[var(--color-primary)] focus-visible:ring-[var(--color-primary)]/20',
            ],
            // Error state
            hasError && [
              'border-[var(--color-error)]',
              'focus-visible:border-[var(--color-error)] focus-visible:ring-[var(--color-error)]/20',
            ],
            // Disabled state
            disabled && 'cursor-not-allowed opacity-50 bg-[var(--color-surface-secondary)]',
            className,
          )}
          {...props}
        />

        {/* Trailing icon */}
        {trailingIcon && (
          <span
            className={cn(
              'absolute right-0 flex items-center justify-center',
              'text-[var(--color-text-muted)]',
              iconSizeStyles[size],
            )}
          >
            {trailingIcon}
          </span>
        )}
      </div>

      {/* Helper / Error text */}
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

'use client'

import React, { useId, forwardRef } from 'react'
import { cn } from '@/lib/utils'

// ============================================================
// Checkbox — Accessible checkbox with optional description.
// ============================================================

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
  wrapperClassName?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, description, error, disabled = false, className, wrapperClassName, id: idProp, ...props },
    ref
  ) => {
    const generatedId = useId()
    const id = idProp ?? generatedId
    const descriptionId = `${id}-description`
    const errorId = `${id}-error`
    const hasError = Boolean(error)

    return (
      <div className={cn('relative flex items-start', wrapperClassName)}>
        <div className="flex h-6 items-center">
          <input
            id={id}
            type="checkbox"
            ref={ref}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={cn(description && descriptionId, error && errorId)}
            className={cn(
              'peer h-4 w-4 shrink-0 rounded-[var(--radius-sm)] border bg-[var(--color-surface)]',
              'accent-[var(--color-primary)] text-[var(--color-primary)]', // accent for native checkbox styling
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
              !hasError && 'border-[var(--color-border)] hover:border-[var(--color-secondary-hover)]',
              hasError && 'border-[var(--color-error)]',
              disabled && 'cursor-not-allowed opacity-50 bg-[var(--color-surface-secondary)]',
              className
            )}
            {...props}
          />
        </div>
        
        {(label || description || error) && (
          <div className="ml-3 text-sm leading-6">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'font-medium text-[var(--color-text-primary)] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p id={descriptionId} className="text-[var(--color-text-secondary)] peer-disabled:opacity-50 text-caption">
                {description}
              </p>
            )}
            {error && (
              <p id={errorId} role="alert" className="text-[var(--color-error)] text-caption mt-1">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

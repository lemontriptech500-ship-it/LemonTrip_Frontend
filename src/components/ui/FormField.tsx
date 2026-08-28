import React from 'react'
import { cn } from '@/lib/utils'

// ============================================================
// FormField — Layout wrapper for form controls.
// Composes label, children (input), and validation messages.
// ============================================================

export interface FormFieldProps {
  label?: string
  htmlFor?: string
  helperText?: string
  error?: string
  optional?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({
  label,
  htmlFor,
  helperText,
  error,
  optional,
  children,
  className,
}: FormFieldProps) {
  const hasError = Boolean(error)

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-label text-[var(--color-text-primary)]"
        >
          {label}
          {optional && (
            <span className="ml-1 text-[var(--color-text-muted)] font-normal">
              (optional)
            </span>
          )}
        </label>
      )}

      {children}

      {(helperText || error) && (
        <p
          role={hasError ? 'alert' : undefined}
          className={cn(
            'text-caption mt-0.5',
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

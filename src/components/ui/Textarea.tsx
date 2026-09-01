'use client'

import React, { useId } from 'react'
import { cn } from '@/lib/utils'

// ============================================================
// Textarea — Generic multi-line text input component.
// Same API as Input for label/helperText/error.
// ============================================================

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  optional?: boolean
  wrapperClassName?: string
}

export function Textarea({
  label,
  helperText,
  error,
  optional = false,
  disabled = false,
  className,
  wrapperClassName,
  id: idProp,
  rows = 4,
  ...props
}: TextareaProps) {
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

      <textarea
        id={id}
        rows={rows}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={helperText || error ? helperId : undefined}
        className={cn(
          'w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)]',
          'px-3 py-2.5 text-sm',
          'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
          'transition-colors duration-150 resize-y',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
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
      />

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

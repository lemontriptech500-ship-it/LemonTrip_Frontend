import React from 'react'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================
// Alert — Inline feedback banner.
// ============================================================

export type AlertVariant = 'success' | 'warning' | 'error' | 'info'

export interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: React.ReactNode
  icon?: boolean
  onDismiss?: () => void
  className?: string
}

const variantStyles: Record<AlertVariant, { wrapper: string; icon: string; text: string }> = {
  success: {
    wrapper: 'bg-[var(--color-success-bg)] border-[var(--color-success)]',
    icon: 'text-[var(--color-success)]',
    text: 'text-[var(--color-success)]',
  },
  warning: {
    wrapper: 'bg-[var(--color-warning-bg)] border-[var(--color-warning)]',
    icon: 'text-[var(--color-warning)]',
    text: 'text-[var(--color-warning)]',
  },
  error: {
    wrapper: 'bg-[var(--color-error-bg)] border-[var(--color-error)]',
    icon: 'text-[var(--color-error)]',
    text: 'text-[var(--color-error)]',
  },
  info: {
    wrapper: 'bg-[var(--color-info-bg)] border-[var(--color-info)]',
    icon: 'text-[var(--color-info)]',
    text: 'text-[var(--color-info)]',
  },
}

const Icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
}

export function Alert({
  variant = 'info',
  title,
  children,
  icon = true,
  onDismiss,
  className,
}: AlertProps) {
  const styles = variantStyles[variant]
  const Icon = Icons[variant]

  return (
    <div
      role="alert"
      className={cn(
        'relative flex w-full items-start gap-3 rounded-[var(--radius-md)] border p-4',
        styles.wrapper,
        className
      )}
    >
      {icon && (
        <Icon className={cn('mt-0.5 shrink-0', styles.icon)} size={20} aria-hidden />
      )}
      
      <div className="flex-1">
        {title && (
          <h5 className={cn('mb-1 font-semibold leading-tight', styles.text)}>
            {title}
          </h5>
        )}
        <div className={cn('text-sm', title ? 'text-[var(--color-text-secondary)]' : styles.text)}>
          {children}
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            'ml-4 shrink-0 rounded-[var(--radius-sm)] p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            styles.text
          )}
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

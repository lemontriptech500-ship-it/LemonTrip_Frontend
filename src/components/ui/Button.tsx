import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ButtonVariant, ButtonSize } from '@/types'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  asChild?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] focus-visible:ring-[var(--color-primary)] shadow-sm',
  secondary:
    'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)] active:bg-[var(--color-secondary-hover)] focus-visible:ring-[var(--color-secondary)] shadow-sm',
  outline:
    'border border-[var(--color-border-strong)] bg-white text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] hover:border-[var(--color-text-muted)] focus-visible:ring-[var(--color-primary)]',
  ghost:
    'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)] focus-visible:ring-[var(--color-primary)]',
  danger:
    'bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90 active:bg-[var(--color-error)]/80 focus-visible:ring-[var(--color-error)] shadow-sm',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-[var(--radius-md)]',
  md: 'h-10 px-4 text-sm gap-2 rounded-[var(--radius-md)]',
  lg: 'h-11 px-6 text-sm gap-2 rounded-[var(--radius-lg)]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  const compClassName = cn(
    'inline-flex items-center justify-center font-semibold',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className,
  )

  const innerChildren = asChild && React.isValidElement(children)
    ? (children as React.ReactElement).props.children
    : children

  const innerContent = (
    <>
      {loading ? (
        <Loader2 size={16} className="animate-spin shrink-0" aria-hidden />
      ) : (
        iconPosition === 'left' && icon && (
          <span className="shrink-0" aria-hidden>
            {icon}
          </span>
        )
      )}
      {innerChildren && <span className="truncate">{innerChildren}</span>}
      {!loading && iconPosition === 'right' && icon && (
        <span className="shrink-0" aria-hidden>
          {icon}
        </span>
      )}
    </>
  )

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>
    return React.cloneElement(child, {
      className: cn(compClassName, child.props.className),
      ...props,
      children: innerContent,
    })
  }

  return (
    <button
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={compClassName}
      {...props}
    >
      {innerContent}
    </button>
  )
}

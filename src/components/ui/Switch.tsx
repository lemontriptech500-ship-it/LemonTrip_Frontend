'use client'

import React, { useId, forwardRef } from 'react'
import { cn } from '@/lib/utils'

// ============================================================
// Switch — Accessible toggle switch component.
// Styles are defined in globals.css for easier animation control.
// ============================================================

export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  description?: string
  wrapperClassName?: string
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      label,
      description,
      disabled = false,
      className,
      wrapperClassName,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = idProp ?? generatedId
    const descriptionId = `${id}-description`
    
    // Support uncontrolled state
    const [isControlled] = React.useState(checked !== undefined)
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false)
    
    const isChecked = isControlled ? checked : internalChecked

    const toggle = () => {
      if (disabled) return
      if (!isControlled) {
        setInternalChecked(!internalChecked)
      }
      onCheckedChange?.(!isChecked)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        toggle()
      }
    }

    return (
      <div className={cn('flex items-center gap-3', wrapperClassName)}>
        <button
          type="button"
          role="switch"
          id={id}
          ref={ref}
          aria-checked={isChecked}
          aria-disabled={disabled}
          aria-describedby={description ? descriptionId : undefined}
          disabled={disabled}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          data-checked={isChecked}
          data-disabled={disabled}
          className={cn(
            'switch-track focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
            className
          )}
          {...props}
        >
          <span 
            className="switch-thumb" 
            data-checked={isChecked}
            aria-hidden="true" 
          />
        </button>
        
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'text-label text-[var(--color-text-primary)] cursor-pointer',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
                onClick={(e) => {
                  e.preventDefault() // prevent double toggle if wrapping label
                  toggle()
                }}
              >
                {label}
              </label>
            )}
            {description && (
              <p id={descriptionId} className="text-caption text-[var(--color-text-secondary)]">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'

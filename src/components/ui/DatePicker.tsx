'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  label?: string
  value?: string
  onChange?: (date: string) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  minDate?: string
  className?: string
}

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  required = false,
  minDate,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    return { daysInMonth, startingDay }
  }

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const formatted = formatDate(selectedDate)
    onChange?.(formatted)
    setIsOpen(false)
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isDateDisabled = (day: number) => {
    if (!minDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date < new Date(minDate)
  }

  const isDateSelected = (day: number) => {
    if (!value) return false
    const date = parseDate(value)
    return (
      date.getDate() === day &&
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    )
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    )
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const displayValue = value ? parseDate(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-label text-[var(--color-text-primary)]">
          {label}
          {required && <span className="text-[var(--color-error)] ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'w-full h-11 px-3 rounded-[var(--radius-md)] border bg-[var(--color-surface)]',
            'text-left text-sm flex items-center gap-2',
            'transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(39,174,96,0.20)] focus-visible:border-[var(--color-primary)]',
            !disabled && 'hover:border-[var(--color-border-strong)] cursor-pointer',
            disabled && 'cursor-not-allowed opacity-50 bg-[var(--color-surface-secondary)]',
            isOpen && 'border-[var(--color-primary)] ring-2 ring-[rgba(39, 174, 96, 0.20)',
            !displayValue && 'text-[var(--color-text-muted)]'
          )}
        >
          <Calendar size={16} className="text-[var(--color-text-muted)] shrink-0" />
          <span className={cn(displayValue ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]')}>
            {displayValue || placeholder}
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-50 bg-[var(--color-surface)] rounded-[var(--radius-lg)] shadow-xl border border-[var(--color-border)] p-4 w-72 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePreviousMonth}
                className="p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-[var(--color-text-muted)] py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startingDay }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const disabled = isDateDisabled(day)
                const selected = isDateSelected(day)
                const today = isToday(day)

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => !disabled && handleDateSelect(day)}
                    disabled={disabled}
                    className={cn(
                      'h-8 w-full rounded-[var(--radius-sm)] text-sm font-medium transition-all',
                      'flex items-center justify-center',
                      disabled && 'text-[rgba(44, 62, 80, 0.20) cursor-not-allowed',
                      !disabled && !selected && 'text-[var(--color-text-primary)] hover:bg-[var(--color-primary-soft)]',
                      selected && 'bg-[var(--color-primary)] text-[var(--color-text-primary)]',
                      today && !selected && 'border border-[var(--color-primary)] text-[var(--color-primary)]'
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {/* Today Button */}
            <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
              <button
                type="button"
                onClick={() => {
                  onChange?.(formatDate(new Date()))
                  setIsOpen(false)
                }}
                className="w-full py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] rounded-[var(--radius-sm)] transition-colors"
              >
                Today
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react'
import { Alert, Button, Input } from '@/components/ui'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'
import { useAuthStore } from '@/store/authStore'
import * as authService from '@/services/authService'

interface SignupFormProps {
  /** Called after a successful registration. If omitted (the /signup page),
   *  the user is redirected to ?callbackUrl or /profile like before. */
  onSuccess?: () => void
  /** Tighter, two-column layout for the pop-up */
  compact?: boolean
}

export function SignupForm({ onSuccess, compact = false }: SignupFormProps) {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const finish = () => {
    if (onSuccess) {
      onSuccess()
      return
    }
    const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl')
    router.push(callbackUrl?.startsWith('/') && !callbackUrl.startsWith('//') ? callbackUrl : '/profile')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!form.name.trim()) return setError('Enter your name.')
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError('Enter a valid email address.')
    if (!form.phone.trim()) return setError('Enter your phone number.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')

    setLoading(true)
    const result = await authService.register({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
    })
    setLoading(false)

    if (result.success && result.user) {
      login(result.user, result.token)
      finish()
    } else {
      setError(result.error || 'Registration failed')
    }
  }

  const handleGoogleCredential = async (idToken: string) => {
    setError('')
    setLoading(true)
    try {
      const result = await authService.loginWithGoogle(idToken, 'signup')
      login(result.user, result.token)
      finish()
    } catch (googleError) {
      setError(googleError instanceof Error ? googleError.message : 'Google sign-up failed')
    } finally {
      setLoading(false)
    }
  }

  const nameField = (
    <Input
      label="Full name"
      autoComplete="name"
      placeholder="Your full name"
      value={form.name}
      onChange={(event) => update('name', event.target.value)}
      leadingIcon={<UserRound size={18} />}
      required
    />
  )
  const emailField = (
    <Input
      label="Email address"
      type="email"
      autoComplete="email"
      placeholder="you@example.com"
      value={form.email}
      onChange={(event) => update('email', event.target.value)}
      leadingIcon={<Mail size={18} />}
      required
    />
  )
  const phoneField = (
    <Input
      label="Phone number"
      type="tel"
      autoComplete="tel"
      placeholder="+91 98765 43210"
      value={form.phone}
      onChange={(event) => update('phone', event.target.value)}
      leadingIcon={<Phone size={18} />}
      required
    />
  )
  const passwordField = (
    <Input
      label="Create password"
      type={showPassword ? 'text' : 'password'}
      autoComplete="new-password"
      placeholder="At least 6 characters"
      value={form.password}
      onChange={(event) => update('password', event.target.value)}
      leadingIcon={<LockKeyhole size={18} />}
      trailingIcon={
        <button
          type="button"
          onClick={() => setShowPassword((visible) => !visible)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      required
    />
  )
  const confirmField = (
    <Input
      label="Confirm password"
      type={showPassword ? 'text' : 'password'}
      autoComplete="new-password"
      placeholder="Repeat your password"
      value={form.confirmPassword}
      onChange={(event) => update('confirmPassword', event.target.value)}
      required
    />
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      {error && <Alert variant="error" title="Registration error">{error}</Alert>}
      <GoogleSignInButton mode="signup" onCredential={handleGoogleCredential} />
      <div className="relative py-1 text-center text-xs text-[var(--color-text-secondary)] before:absolute before:left-0 before:right-0 before:top-1/2 before:border-t before:border-[var(--color-border)]">
        <span className="relative bg-[var(--color-surface)] px-3">or create with email</span>
      </div>

      {compact ? (
        // Pop-up: name | phone, email full width, password | confirm
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {nameField}
          {phoneField}
          <div className="sm:col-span-2">{emailField}</div>
          {passwordField}
          {confirmField}
        </div>
      ) : (
        <>
          {nameField}
          {emailField}
          {phoneField}
          {passwordField}
          {confirmField}
        </>
      )}

      {!compact && (
        <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
          By creating an account, you agree to keep your travel information accurate.
        </p>
      )}
      <Button type="submit" fullWidth size={compact ? undefined : 'lg'} loading={loading}>
        Create account
      </Button>
    </form>
  )
}
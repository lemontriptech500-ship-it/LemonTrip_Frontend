'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Alert, Button, Input } from '@/components/ui'
import { AuthShell, AuthSwitch } from '@/components/auth/AuthShell'
import { useAuthStore } from '@/store/authStore'
import * as authService from '@/services/authService'

export default function SignupPage() {
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
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    })
    setLoading(false)

    if (result.success && result.user) {
      login(result.user, result.token)
      router.push('/profile')
    } else {
      setError(result.error || 'Registration failed')
    }
  }

  return (
    <AuthShell mode="signup">
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        {error && <Alert variant="error" title="Registration error">{error}</Alert>}
        <Input
          label="Full name"
          autoComplete="name"
          placeholder="Your full name"
          value={form.name}
          onChange={(event) => update('name', event.target.value)}
          leadingIcon={<UserRound size={18} />}
          required
        />
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
        <Input
          label="Phone number"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={(event) => update('phone', event.target.value)}
          leadingIcon={<UserRound size={18} />}
          required
        />
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
        <Input
          label="Confirm password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Repeat your password"
          value={form.confirmPassword}
          onChange={(event) => update('confirmPassword', event.target.value)}
          required
        />
        <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
          By creating an account, you agree to keep your travel information accurate.
        </p>
        <Button type="submit" fullWidth size="lg" loading={loading}>
          Create account
        </Button>
      </form>
      <AuthSwitch mode="signup" />
    </AuthShell>
  )
}

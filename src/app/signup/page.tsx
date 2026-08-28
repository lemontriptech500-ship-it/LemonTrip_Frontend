'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Alert, Button, Input } from '@/components/ui'
import { AuthShell, AuthSwitch } from '@/components/auth/AuthShell'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.name.trim()) return setError('Enter your name.')
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError('Enter a valid email address.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    setError('Account creation is not connected yet. This is a frontend demo.')
  }

  return (
    <AuthShell mode="signup">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {error && <Alert variant="info" title="Demo account status">{error}</Alert>}
        
        <Input
          label="Full name"
          autoComplete="name"
          placeholder="Your full name"
          value={form.name}
          onChange={(event) => update('name', event.target.value)}
          leadingIcon={<UserRound size={16} />}
          required
        />
        
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(event) => update('email', event.target.value)}
          leadingIcon={<Mail size={16} />}
          required
        />
        
        <Input
          label="Create password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={form.password}
          onChange={(event) => update('password', event.target.value)}
          leadingIcon={<LockKeyhole size={16} />}
          trailingIcon={
            <button 
              type="button" 
              onClick={() => setShowPassword((visible) => !visible)} 
              aria-label={showPassword ? 'Hide password' : 'Show password'} 
              className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
          leadingIcon={<LockKeyhole size={16} />}
          required
        />
        
        <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
          By creating an account, you agree to keep your travel information accurate.
        </p>
        
        <Button type="submit" fullWidth size="lg">Create account</Button>
      </form>
      
      <AuthSwitch mode="signup" />
    </AuthShell>
  )
}

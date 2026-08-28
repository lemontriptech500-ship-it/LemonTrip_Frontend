'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { Alert, Button, Input } from '@/components/ui'
import { AuthShell, AuthSwitch } from '@/components/auth/AuthShell'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setError('Authentication is not connected yet. This is a frontend demo.')
  }

  return (
    <AuthShell mode="signin">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {error && <Alert variant="info" title="Demo account status">{error}</Alert>}
        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => { setEmail(event.target.value); setError('') }}
          leadingIcon={<Mail size={18} />}
          required
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => { setPassword(event.target.value); setError('') }}
          leadingIcon={<LockKeyhole size={18} />}
          trailingIcon={<button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
          required
        />
        <div className="flex justify-end">
          <button type="button" className="text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]">Forgot password?</button>
        </div>
        <Button type="submit" fullWidth size="lg">Sign in</Button>
      </form>
      <AuthSwitch mode="signin" />
    </AuthShell>
  )
}

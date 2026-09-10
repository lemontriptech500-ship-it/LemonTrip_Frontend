'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { Alert, Button, Input } from '@/components/ui'
import { AuthShell, AuthSwitch } from '@/components/auth/AuthShell'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'
import { useAuthStore } from '@/store/authStore'
import * as authService from '@/services/authService'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    const result = await authService.login({ email: email.trim().toLowerCase(), password })
    setLoading(false)

    if (result.success && result.user) {
      login(result.user, result.token)
      const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl')
      router.push(callbackUrl?.startsWith('/') && !callbackUrl.startsWith('//') ? callbackUrl : '/profile')
    } else {
      setError(result.error || 'Login failed')
    }
  }

  const handleGoogleCredential = async (idToken: string) => {
    setError('')
    setLoading(true)
    try {
      const result = await authService.loginWithGoogle(idToken)
      login(result.user, result.token)
      const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl')
      router.push(callbackUrl?.startsWith('/') && !callbackUrl.startsWith('//') ? callbackUrl : '/profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell mode="signin">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {error && <Alert variant="error" title="Login error">{error}</Alert>}
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
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" asChild className="h-auto p-0">
            <a href="/forgot-password">Forgot password?</a>
          </Button>
        </div>
        <Button type="submit" fullWidth size="lg" loading={loading}>
          Sign in
        </Button>
        <div className="relative py-1 text-center text-xs text-[var(--color-text-secondary)] before:absolute before:left-0 before:right-0 before:top-1/2 before:border-t before:border-[var(--color-border)]">
          <span className="relative bg-[var(--color-surface)] px-3">or continue with</span>
        </div>
        <GoogleSignInButton mode="signin" onCredential={handleGoogleCredential} />
      </form>
      <AuthSwitch mode="signin" />
    </AuthShell>
  )
}

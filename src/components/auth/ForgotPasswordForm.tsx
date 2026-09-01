'use client'

import { AuthShell } from '@/components/auth/AuthShell'
import { Button, Input, Alert } from '@/components/ui'
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import * as authService from '@/services/authService'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const result = await authService.forgotPassword(email)
    setStatus({ type: result.success ? 'success' : 'error', message: result.message })
    setLoading(false)
  }

  return (
    <AuthShell mode="signin">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {status && <Alert variant={status.type === 'success' ? 'info' : 'error'}>{status.message}</Alert>}
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leadingIcon={<Mail size={18} />}
          required
        />
        <Button type="submit" fullWidth size="lg" loading={loading}>
          Send Reset Link
        </Button>
        <div className="text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline">
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthShell>
  )
}

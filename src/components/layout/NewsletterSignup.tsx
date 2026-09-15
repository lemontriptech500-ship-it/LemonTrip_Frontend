'use client'

import { FormEvent, useState } from 'react'
import { CheckCircle2, Mail, Send } from 'lucide-react'
import { apiRequest } from '@/lib/apiClient'
import { Button } from '@/components/ui'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [mode, setMode] = useState<'subscribe' | 'unsubscribe'>('subscribe')
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus(null)
    setLoading(true)

    try {
      const result = await apiRequest<{ message: string }>(`/newsletter/${mode}`, {
        method: 'POST',
        body: JSON.stringify({ email, source: 'website-footer' }),
        suppressErrorLog: true,
      })
      setEmail('')
      setStatus({ type: 'success', message: result.message })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to subscribe right now.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-t border-[rgba(253,254,255,0.12)] pt-6">
      <div className="mb-3 flex items-center gap-2">
        <Mail size={16} className="text-[var(--color-primary)]" aria-hidden />
        <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">Travel Notes</h4>
      </div>
      <p className="mb-4 max-w-sm text-sm leading-relaxed text-[rgba(253,254,255,0.78)]">
        Get destination ideas, travel deals, and practical planning tips in your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row" noValidate>
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={loading}
          className="h-11 min-w-0 flex-1 rounded-[var(--radius-md)] border border-[rgba(253,254,255,0.25)] bg-[rgba(253,254,255,0.08)] px-3 text-sm text-[#FDFEFE] placeholder:text-[rgba(253,254,255,0.55)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(255,210,26,0.25)] disabled:opacity-60"
        />
        <Button type="submit" size="md" loading={loading} icon={mode === 'subscribe' ? <Send size={15} /> : undefined} className="shrink-0">
          {mode === 'subscribe' ? 'Subscribe' : 'Unsubscribe'}
        </Button>
      </form>
      {status && (
        <p
          role={status.type === 'error' ? 'alert' : 'status'}
          className={`mt-3 flex items-start gap-2 text-xs ${status.type === 'success' ? 'text-[#B9F6C5]' : 'text-[#FFB4AB]'}`}
        >
          {status.type === 'success' && <CheckCircle2 size={14} className="mt-0.5 shrink-0" aria-hidden />}
          <span>{status.message}</span>
        </p>
      )}
      <button
        type="button"
        onClick={() => { setMode((current) => current === 'subscribe' ? 'unsubscribe' : 'subscribe'); setStatus(null) }}
        className="mt-3 text-left text-[11px] text-[rgba(253,254,255,0.55)] underline-offset-2 hover:text-[#FDFEFE] hover:underline"
      >
        {mode === 'subscribe' ? 'Already subscribed? Unsubscribe' : 'Back to newsletter signup'}
      </button>
    </div>
  )
}

'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Bot, Loader2, MessageCircle, Send, X } from 'lucide-react'
import { apiRequest } from '@/lib/apiClient'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  answer: string
  conversationId: string | null
}

const welcomeMessage: ChatMessage = {
  role: 'assistant',
  content: 'Hi, I am LemonTrip support. Ask me about trips, bookings, visas, destinations, or how to use LemonTrip.',
}

export function GlobalChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function submit(event: FormEvent) {
    event.preventDefault()
    const message = input.trim()
    if (!message || loading) return
    setInput('')
    setError(null)
    const nextMessages = [...messages, { role: 'user' as const, content: message }]
    setMessages(nextMessages)
    setLoading(true)
    try {
      const result = await apiRequest<ChatResponse>('/chat', {
        method: 'POST',
        body: JSON.stringify({
          message,
          history: nextMessages.slice(-10),
          conversationId,
          liveContext: { page: pathname, search: Object.fromEntries(searchParams.entries()) },
        }),
        suppressErrorLog: true,
      })
      setMessages((current) => [...current, { role: 'assistant', content: result.answer }])
      setConversationId(result.conversationId)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Chat is temporarily unavailable.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <section className="mb-3 flex h-[min(600px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl" aria-label="LemonTrip travel assistant">
          <header className="flex items-center justify-between bg-[var(--color-secondary)] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--green-dark)]"><Bot size={19} /></span>
              <div><p className="font-bold">LemonTrip Assistant</p><p className="text-xs text-white/75">Travel support and planning</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/10" aria-label="Close chat"><X size={18} /></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--color-background)] p-4" aria-live="polite">
            {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${message.role === 'user' ? 'rounded-br-sm bg-[var(--color-secondary)] text-white' : 'rounded-bl-sm border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)]'}`}>{message.content}</p></div>)}
            {loading && <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"><Loader2 size={15} className="animate-spin" />Thinking...</div>}
            {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
            <div ref={endRef} />
          </div>
          <form onSubmit={submit} className="flex gap-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] p-3">
            <input value={input} onChange={(event) => setInput(event.target.value)} disabled={loading} maxLength={1200} placeholder="Ask about your trip..." aria-label="Message LemonTrip Assistant" className="min-w-0 flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]" />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--green-dark)] disabled:cursor-not-allowed disabled:opacity-50"><Send size={17} /></button>
          </form>
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close LemonTrip Assistant' : 'Open LemonTrip Assistant'} className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--green-dark)] shadow-lg transition hover:scale-105 hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]">
        {open ? <X size={23} /> : <MessageCircle size={23} />}
      </button>
    </div>
  )
}

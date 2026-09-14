'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Bot, Loader2, Send, X } from 'lucide-react'
import { apiRequest } from '@/lib/apiClient'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResponse {
  answer: string
  conversationId: string | null
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.89-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.002 5.45-4.437 9.884-9.889 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.143 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.684 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.479-8.413" />
    </svg>
  )
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
      <div className="flex flex-col items-end gap-3">
        <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close LemonTrip Assistant' : 'Open LemonTrip Assistant'} className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--green-dark)] shadow-lg transition hover:scale-105 hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]">
          {open ? <X size={23} /> : <Bot size={23} />}
        </button>
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" aria-label="Chat with LemonTrip on WhatsApp" title="Chat with LemonTrip on WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]">
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  )
}

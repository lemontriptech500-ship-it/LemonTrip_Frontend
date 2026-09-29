'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Loader2, Send, X } from 'lucide-react'
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

function RobotIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.5" y="8" width="15" height="11.5" rx="4" />
      <path d="M12 8V5.2" />
      <circle cx="12" cy="4" r="1.2" fill="currentColor" />
      <path d="M2.5 12.5v3M21.5 12.5v3" />
      <circle cx="9.3" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="13" r="1" fill="currentColor" stroke="none" />
      <path d="M10 16.2h4" />
    </svg>
  )
}

const welcomeMessage: ChatMessage = {
  role: 'assistant',
  content: 'Hi, I am LemonTrip support. Ask me about trips, bookings, visas, destinations, or how to use LemonTrip.',
}

function formatAssistantMessage(content: string): string {
  return content
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/^\s{0,3}#{1,6}\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/^\s*[-*_]{3,}\s*$/gm, '')
    .replace(/\|/g, '  ')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
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
  const [showTeaser, setShowTeaser] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  // Show the greeting bubble shortly after page load (once per page visit)
  useEffect(() => {
    const timer = setTimeout(() => setShowTeaser(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-close the greeting bubble after 6 seconds
  useEffect(() => {
    if (!showTeaser) return
    const timer = setTimeout(() => setShowTeaser(false), 6000)
    return () => clearTimeout(timer)
  }, [showTeaser])

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
          history: messages.slice(-10),
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
    <div className="fixed bottom-3 right-3 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <section className="mb-3 flex h-[min(460px,calc(100vh-11rem))] w-[min(340px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl" aria-label="LemonTrip travel assistant">
          <header className="flex items-center justify-between bg-[var(--color-secondary)] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--green-dark)]"><RobotIcon size={20} /></span>
              <div><p className="font-bold">LemonTrip Assistant</p><p className="text-xs text-white/75">Travel support and planning</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-white/10" aria-label="Close chat"><X size={18} /></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--color-background)] p-4" aria-live="polite">
            {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${message.role === 'user' ? 'rounded-br-sm bg-[var(--color-secondary)] text-white' : 'rounded-bl-sm border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)]'}`}>{message.role === 'assistant' ? formatAssistantMessage(message.content) : message.content}</p></div>)}
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
      {!open && showTeaser && (
        <div className="relative mb-3 w-[min(240px,calc(100vw-2rem))] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 pr-9 text-[13px] leading-snug text-[var(--color-text-primary)] shadow-xl">
          <button type="button" onClick={() => setShowTeaser(false)} aria-label="Dismiss message" className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/5 text-[var(--color-text-secondary)] hover:bg-black/10"><X size={13} /></button>
          <button type="button" onClick={() => { setShowTeaser(false); setOpen(true) }} className="text-left">
            Planning a trip? Chat with LemonTrip Assistant for quick help with flights, hotels and visas 👋
          </button>
          <span className="absolute -bottom-1.5 right-4 h-3 w-3 rotate-45 border-b border-r border-[var(--color-border)] bg-[var(--color-surface)]" aria-hidden="true" />
        </div>
      )}
      <div className="flex flex-col items-end gap-2 sm:gap-3">
        <button type="button" onClick={() => { setShowTeaser(false); setOpen((value) => !value) }} aria-label={open ? 'Close LemonTrip Assistant' : 'Open LemonTrip Assistant'} className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--green-dark)] shadow-lg transition hover:scale-105 hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] sm:h-14 sm:w-14">
          {open ? <X size={23} /> : <RobotIcon size={26} />}
        </button>
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" aria-label="Chat with LemonTrip on WhatsApp" title="Chat with LemonTrip on WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] sm:h-12 sm:w-12">
          <WhatsAppIcon />
        </a>
      </div>
    </div>
  )
}
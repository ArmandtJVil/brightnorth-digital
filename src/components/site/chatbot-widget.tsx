'use client'

import * as React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Msg = { role: 'user' | 'assistant'; content: string }

const QUICK_REPLIES = [
  'What services do you offer?',
  'How much does a website cost?',
  'How long does SEO take?',
  'Can you help with AI automation?',
]

const GREETING: Msg = {
  role: 'assistant',
  content:
    "Hi! I'm North, BrightNorth Digital's AI assistant. I can help with questions about our web development, SEO, marketing, AI solutions, branding, and hosting services. What can I help you with today?",
}

export function ChatbotWidget() {
  const [open, setOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Msg[]>([GREETING])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [unread, setUnread] = React.useState(true)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const reduce = useReducedMotion()

  // Auto-scroll to bottom on new messages / typing
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, loading, open])

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      setUnread(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  // Show a teaser pulse after a delay if the user hasn't opened the chat
  React.useEffect(() => {
    if (open) return
    const t = setTimeout(() => setUnread(true), 6000)
    return () => clearTimeout(t)
  }, [open])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const newMessages: Msg[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      const reply =
        data.reply ||
        data.message ||
        "I'm sorry, I couldn't process that. Please try again or contact us at hello@brightnorthdigital.com."
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please try again in a moment, or reach us at hello@brightnorthdigital.com.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      {/* Floating launcher button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#002e6d] to-[#0a4a9c] text-white shadow-navy transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
            aria-label="Open AI chat assistant"
          >
            <MessageSquare className="h-6 w-6" />
            {unread && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[0.55rem] font-bold text-white">
                  1
                </span>
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-5 z-[60] flex h-[min(34rem,85vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-border/60 bg-background shadow-navy sm:bottom-6 sm:right-6"
            role="dialog"
            aria-label="AI chat assistant"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between bg-gradient-to-br from-[#002e6d] to-[#0a4a9c] px-4 py-3.5 text-white">
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
              <div className="relative flex items-center gap-3">
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 text-brand" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a4a9c] bg-[#22c55e]" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold leading-tight">North AI Assistant</p>
                  <p className="text-[0.68rem] text-white/70">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="scroll-fancy flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}

              {loading && (
                <div className="flex items-start gap-2">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#002e6d] to-[#0a4a9c]">
                    <Sparkles className="h-3.5 w-3.5 text-brand" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-card px-3.5 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick replies — show only at the start */}
              {messages.length <= 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-brand/30 bg-brand-soft px-3 py-1.5 text-xs font-medium text-[#7a3d00] transition-colors hover:bg-brand hover:text-white dark:text-[#ffcf8d]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="border-t border-border bg-background p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything…"
                  disabled={loading}
                  className="flex-1 rounded-full border border-border bg-muted/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-brand transition-colors hover:bg-brand/90 disabled:opacity-40"
                  aria-label="Send message"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between px-1">
                <p className="text-[0.62rem] text-muted-foreground">
                  Powered by BrightNorth AI
                </p>
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1 text-[0.68rem] font-semibold text-brand hover:underline"
                >
                  Talk to a human <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex items-start gap-2', isUser && 'flex-row-reverse')}
    >
      {!isUser && (
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#002e6d] to-[#0a4a9c]">
          <Sparkles className="h-3.5 w-3.5 text-brand" />
        </span>
      )}
      <div
        className={cn(
          'max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-tr-sm bg-brand text-brand-foreground'
            : 'rounded-tl-sm border border-border bg-card text-foreground',
        )}
      >
        {msg.content}
      </div>
    </motion.div>
  )
}

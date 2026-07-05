'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Twitter, Facebook, Instagram, Send, Loader2, CheckCircle2, MapPin, Phone, Mail, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { footerLinks } from '@/lib/site-data'
import { Logo } from '@/components/site/navbar'
import { toast } from 'sonner'

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/brightnorth-digital' },
  { icon: Twitter, label: 'Twitter / X', href: 'https://twitter.com/brightnorthdig' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/brightnorthdigital' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/brightnorthdigital' },
]

export function Footer() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'done'>('idle')

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) { toast.error('Please enter your email.'); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      })
      const data = await res.json()
      if (res.status === 409) { toast.info("You're already subscribed!"); setStatus('done'); return }
      if (!res.ok) throw new Error(data.message || 'Something went wrong')
      setStatus('done')
      toast.success('Subscribed! Check your inbox for a welcome note.')
    } catch (err: any) {
      setStatus('idle')
      toast.error(err.message || 'Failed to subscribe')
    }
  }

  return (
    <footer className="relative mt-auto border-t border-border bg-[#060d1a] text-slate-300">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.18),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        {/* Newsletter */}
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              Get growth insights, monthly.
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Join 4,000+ founders and marketers getting practical tactics on web, AI, SEO, and growth. No spam — unsubscribe anytime.
            </p>
          </div>
          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 rounded-xl border border-brand/30 bg-brand/10 p-4"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0 text-brand" />
                <p className="text-sm text-white">You're subscribed! Welcome to BrightNorth Digital.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="border-white/15 bg-white/5 text-white placeholder:text-slate-500"
                />
                <Button type="submit" disabled={status === 'loading'} className="shrink-0 rounded-xl bg-brand text-brand-foreground shadow-brand hover:bg-brand/90">
                  {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="mr-1.5 h-4 w-4" /> Subscribe</>}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Links */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="brightness-0 invert">
              <Logo />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              A full-service digital agency helping ambitious businesses build smarter, market better, and grow faster through intelligent web, AI, and marketing.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-brand/40 hover:bg-brand hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Company" links={footerLinks.company} />
          <FooterCol title="Services" links={footerLinks.services} />
          <FooterCol title="Industries" links={footerLinks.industries} />
          <FooterCol title="Legal" links={footerLinks.legal} />
        </div>

        {/* Contact strip */}
        <div className="mt-12 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
          <a href="tel:+15550100123" className="flex items-center gap-2.5 text-sm text-slate-400 transition-colors hover:text-white">
            <Phone className="h-4 w-4 text-brand" /> +1 (555) 010-0123
          </a>
          <a href="mailto:hello@brightnorthdigital.com" className="flex items-center gap-2.5 text-sm text-slate-400 transition-colors hover:text-white">
            <Mail className="h-4 w-4 text-brand" /> hello@brightnorthdigital.com
          </a>
          <p className="flex items-center gap-2.5 text-sm text-slate-400">
            <MapPin className="h-4 w-4 text-brand" /> 120 Market Street, Suite 400, San Francisco, CA
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} BrightNorth Digital. All rights reserved. Build Smarter. Market Better. Grow Faster.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Mon–Fri, 8AM–6PM PT</span>
            <a
              href="#top"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-brand hover:bg-brand hover:text-white"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-slate-400 transition-colors hover:text-brand">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

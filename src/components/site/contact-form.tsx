'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

const services = [
  'Web Development', 'SEO', 'Digital Marketing', 'AI Solutions',
  'Branding & Design', 'Hosting & Care', 'Digital Consulting', 'Not sure yet',
]

const budgets = [
  'Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000 – $100,000', '$100,000+',
]

export function ContactForm() {
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success'>('idle')
  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: '',
  })

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in your name, email, and message.')
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Something went wrong')
      setStatus('success')
      toast.success("Message sent! We'll be in touch within one business day.")
    } catch (err: any) {
      setStatus('idle')
      toast.error(err.message || 'Failed to send message')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[24rem] flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
            className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-brand"
          >
            <CheckCircle2 className="h-11 w-11" />
          </motion.div>
          <h3 className="mt-6 font-display text-2xl font-bold text-foreground">Thank you, {form.name.split(' ')[0] || 'there'}!</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Your message is on its way to our team. A digital strategist will reach out within one business day to schedule your free session.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-[#ffd9a3]">
            <Sparkles className="h-3 w-3" /> Reference #BN-{Math.random().toString(36).slice(2, 7).toUpperCase()}
          </div>
          <Button
            onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' }) }}
            variant="outline"
            className="mt-6 rounded-xl"
          >
            Send another message
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={onSubmit}
          className="mt-6 space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full name *</Label>
              <Input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Jane Doe" className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jane@company.com" className="mt-1.5" required />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 (555) 000-0000" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Acme Inc." className="mt-1.5" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="service">Service of interest</Label>
              <Select value={form.service} onValueChange={(v) => update('service', v)}>
                <SelectTrigger id="service" className="mt-1.5"><SelectValue placeholder="Select a service" /></SelectTrigger>
                <SelectContent>
                  {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="budget">Estimated budget</Label>
              <Select value={form.budget} onValueChange={(v) => update('budget', v)}>
                <SelectTrigger id="budget" className="mt-1.5"><SelectValue placeholder="Select a range" /></SelectTrigger>
                <SelectContent>
                  {budgets.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="message">How can we help? *</Label>
            <Textarea
              id="message" value={form.message} onChange={(e) => update('message', e.target.value)}
              placeholder="Tell us about your project, goals, and timeline…"
              className="mt-1.5 min-h-[140px] resize-y" required
            />
          </div>
          <Button
            type="submit" disabled={status === 'submitting'}
            className="w-full rounded-xl bg-brand py-3 text-base font-bold text-brand-foreground shadow-brand hover:bg-brand/90"
          >
            {status === 'submitting' ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</>
            ) : (
              <>Send Message <Send className="ml-2 h-4 w-4" /></>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By submitting, you agree to our privacy policy. We'll never share your details.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

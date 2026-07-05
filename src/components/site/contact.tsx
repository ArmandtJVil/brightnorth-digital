'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, Loader2, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { SectionHeading, Reveal } from '@/components/site/reveal'
import { toast } from 'sonner'

const contactInfo = [
  { icon: Phone, label: 'Call us', value: '+1 (555) 010-0123', href: 'tel:+15550100123' },
  { icon: Mail, label: 'Email us', value: 'hello@brightnorthdigital.com', href: 'mailto:hello@brightnorthdigital.com' },
  { icon: MapPin, label: 'Visit us', value: '120 Market Street, Suite 400, San Francisco, CA', href: '#map' },
  { icon: Clock, label: 'Business hours', value: 'Mon–Fri, 8:00 AM – 6:00 PM PT', href: undefined },
]

const services = [
  'Web Development', 'SEO', 'Digital Marketing', 'AI Solutions',
  'Branding & Design', 'Hosting & Care', 'Digital Consulting', 'Not sure yet',
]

const budgets = [
  'Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000 – $100,000', '$100,000+',
]

export function Contact() {
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
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#002e6d]/[0.03] to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title={<>Let's build your <span className="text-gradient-brand">next big thing</span></>}
          description="Book a free, no-obligation strategy session. Tell us where you want to go — we'll show you how to get there."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Left: info + image + map */}
          <div className="space-y-6">
            <Reveal direction="right">
              <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-soft">
                <img
                  src="/images/contact-consultant.png"
                  alt="BrightNorth Digital consultant guiding business owners through a strategy discussion in a bright modern office"
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                  width={1344}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b33]/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl glass p-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-brand">
                    <MessageSquare className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-foreground">Live Chat & AI Assistant</p>
                    <p className="text-xs text-muted-foreground">Average response time: under 2 minutes</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-3 sm:grid-cols-2">
                {contactInfo.map((c) => (
                  <a
                    key={c.label}
                    href={c.href ?? undefined}
                    className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 transition-all hover:border-brand/40 hover:shadow-soft"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform group-hover:scale-110">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">{c.label}</p>
                      <p className="text-sm font-medium text-foreground">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={0.15}>
              <div id="map" className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
                <iframe
                  title="BrightNorth Digital office location map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-122.42%2C37.76%2C-122.39%2C37.79&layer=mapnik&marker=37.7749%2C-122.4194"
                  className="h-64 w-full border-0 grayscale-[0.2]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[28rem] flex-col items-center justify-center text-center"
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
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-[#7a3d00] dark:text-[#ffcf8d]">
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
                    className="space-y-4"
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
                      className="w-full rounded-xl bg-brand py-3 text-base text-brand-foreground shadow-brand hover:bg-brand/90"
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

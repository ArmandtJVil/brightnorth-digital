'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, Calculator, Loader2, PartyPopper, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SectionHeading, Reveal } from '@/components/site/reveal'
import { pricingTiers } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

/* Mirror of /api/pricing model for instant live preview */
const SERVICE_BASE: Record<string, number> = {
  'web-development': 9500, seo: 3500, 'digital-marketing': 4000,
  'ai-solutions': 7500, branding: 4800, hosting: 1800,
}
const SERVICE_LABELS: Record<string, string> = {
  'web-development': 'Web Development', seo: 'SEO', 'digital-marketing': 'Digital Marketing',
  'ai-solutions': 'AI Solutions', branding: 'Branding', hosting: 'Hosting & Care',
}
const SIZE = { starter: 0, standard: 3500, advanced: 9000, enterprise: 18000 }
const SIZE_LABELS: Record<string, string> = { starter: 'Starter (1–5 pages)', standard: 'Standard (6–15 pages)', advanced: 'Advanced (16+ pages)', enterprise: 'Enterprise (multi-site)' }
const SEO = { none: 0, starter: 1500, growth: 3500, authority: 6500 }
const SEO_LABELS: Record<string, string> = { none: 'None', starter: 'Local SEO', growth: 'Ongoing Technical + Content', authority: 'Full Authority Program' }
const AI = { none: 0, chatbot: 4500, assistant: 7000, custom: 14000 }
const AI_LABELS: Record<string, string> = { none: 'None', chatbot: 'AI Chatbot', assistant: 'AI Assistant', custom: 'Custom Model + Automation' }
const HOST = { none: 0, standard: 90, performance: 190, enterprise: 450 }
const HOST_LABELS: Record<string, string> = { none: 'None', standard: 'Standard', performance: 'Performance', enterprise: 'Enterprise' }
const BRAND = { none: 0, starter: 2500, complete: 5500, strategy: 9500 }
const BRAND_LABELS: Record<string, string> = { none: 'None', starter: 'Logo + Basics', complete: 'Full Identity + Guidelines', strategy: 'Strategy + Naming + Identity' }
const MAINT = { none: 0, essential: 150, professional: 350, premium: 750 }
const MAINT_LABELS: Record<string, string> = { none: 'None', essential: 'Essential', professional: 'Professional', premium: 'Premium' }

type Sel = {
  services: string[]
  websiteSize: keyof typeof SIZE
  seoPackage: keyof typeof SEO
  aiIntegrations: keyof typeof AI
  hosting: keyof typeof HOST
  branding: keyof typeof BRAND
  maintenance: keyof typeof MAINT
}

const DEFAULT_SEL: Sel = {
  services: ['web-development', 'seo'],
  websiteSize: 'standard',
  seoPackage: 'growth',
  aiIntegrations: 'none',
  hosting: 'performance',
  branding: 'none',
  maintenance: 'professional',
}

function compute(sel: Sel) {
  let oneTime = 0
  let monthly = 0
  const items: { label: string; amount: number; recurring?: boolean }[] = []
  sel.services.forEach((s) => {
    if (SERVICE_BASE[s] !== undefined) { oneTime += SERVICE_BASE[s]; items.push({ label: SERVICE_LABELS[s], amount: SERVICE_BASE[s] }) }
  })
  if (SIZE[sel.websiteSize] > 0) { oneTime += SIZE[sel.websiteSize]; items.push({ label: `Website scope — ${SIZE_LABELS[sel.websiteSize]}`, amount: SIZE[sel.websiteSize] }) }
  if (SEO[sel.seoPackage] > 0) { oneTime += SEO[sel.seoPackage]; items.push({ label: `SEO — ${SEO_LABELS[sel.seoPackage]}`, amount: SEO[sel.seoPackage] }) }
  if (AI[sel.aiIntegrations] > 0) { oneTime += AI[sel.aiIntegrations]; items.push({ label: `AI — ${AI_LABELS[sel.aiIntegrations]}`, amount: AI[sel.aiIntegrations] }) }
  if (BRAND[sel.branding] > 0) { oneTime += BRAND[sel.branding]; items.push({ label: `Branding — ${BRAND_LABELS[sel.branding]}`, amount: BRAND[sel.branding] }) }
  if (HOST[sel.hosting] > 0) { monthly += HOST[sel.hosting]; items.push({ label: `Hosting — ${HOST_LABELS[sel.hosting]}`, amount: HOST[sel.hosting], recurring: true }) }
  if (MAINT[sel.maintenance] > 0) { monthly += MAINT[sel.maintenance]; items.push({ label: `Maintenance — ${MAINT_LABELS[sel.maintenance]}`, amount: MAINT[sel.maintenance], recurring: true }) }
  const total = oneTime + monthly * 12
  return { oneTime, monthly, total, low: Math.round(total * 0.9), high: Math.round(total * 1.15), items }
}

function AnimatedPrice({ value }: { value: number }) {
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 90, damping: 20 })
  const [display, setDisplay] = React.useState('0')
  React.useEffect(() => { mv.set(value) }, [value, mv])
  React.useEffect(() => spring.on('change', (v) => setDisplay(Math.round(v).toLocaleString())), [spring])
  return <span>{display}</span>
}

function OptionRow({ label, value, options, labels, onChange }: {
  label: string; value: string; options: string[]; labels: Record<string, string>;
  onChange: (v: string) => void
}) {
  return (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="mt-2 grid grid-cols-2 gap-1.5 rounded-xl bg-muted/50 p-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={cn(
              'rounded-lg px-3 py-2 text-xs font-medium transition-all',
              value === o ? 'bg-background text-foreground shadow-soft' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {labels[o]}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Pricing() {
  const [sel, setSel] = React.useState<Sel>(DEFAULT_SEL)
  const [showSave, setShowSave] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  const estimate = React.useMemo(() => compute(sel), [sel])

  const toggleService = (slug: string) =>
    setSel((s) => ({
      ...s,
      services: s.services.includes(slug)
        ? s.services.filter((x) => x !== slug)
        : [...s.services, slug],
    }))

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast.error('Please enter your name and email to save your estimate.')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, ...sel }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Something went wrong')
      setSaved(true)
      toast.success('Estimate saved! We\'ll be in touch within one business day.')
    } catch (err: any) {
      toast.error(err.message || 'Failed to save estimate')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing & Plans"
          title={<>Transparent pricing, <span className="text-gradient-brand">tailored to you</span></>}
          description="Start with a package, then fine-tune with our interactive calculator. No hidden fees — just clear, value-based pricing."
        />

        {/* Tier cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-3xl border p-7 transition-all',
                  tier.featured
                    ? 'border-brand/40 bg-card shadow-navy lg:-translate-y-3'
                    : 'border-border/60 bg-card hover:border-brand/30 hover:shadow-soft',
                )}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-bold text-brand-foreground shadow-brand">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-foreground">{tier.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{tier.description}</p>
                <div className="mt-5 flex items-end gap-1.5">
                  <span className="font-display text-4xl font-extrabold text-foreground">{tier.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">/ {tier.period}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className={cn('mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full', tier.featured ? 'bg-brand text-brand-foreground' : 'bg-brand-soft text-brand')}>
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={tier.featured ? 'default' : 'outline'}
                  className={cn('mt-7 w-full rounded-xl', tier.featured && 'bg-brand text-brand-foreground shadow-brand hover:bg-brand/90')}
                >
                  <Link href="#contact">
                    {tier.price === 'Custom' ? 'Talk to Sales' : 'Get Started'}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Interactive calculator */}
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft">
            <div className="grid lg:grid-cols-[1.4fr_1fr]">
              {/* Controls */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Calculator className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">Project Cost Calculator</h3>
                    <p className="text-xs text-muted-foreground">Adjust the options — your estimate updates live.</p>
                  </div>
                </div>

                {/* Services */}
                <div className="mt-6">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Services</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.keys(SERVICE_BASE).map((slug) => (
                      <button
                        key={slug}
                        onClick={() => toggleService(slug)}
                        className={cn(
                          'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all',
                          sel.services.includes(slug)
                            ? 'border-transparent bg-gradient-to-r from-[#002e6d] to-[#0a4a9c] text-white shadow-navy'
                            : 'border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground',
                        )}
                      >
                        {SERVICE_LABELS[slug]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <OptionRow label="Website Size" value={sel.websiteSize} options={Object.keys(SIZE)} labels={SIZE_LABELS} onChange={(v) => setSel((s) => ({ ...s, websiteSize: v as any }))} />
                  <OptionRow label="SEO Package" value={sel.seoPackage} options={Object.keys(SEO)} labels={SEO_LABELS} onChange={(v) => setSel((s) => ({ ...s, seoPackage: v as any }))} />
                  <OptionRow label="AI Integrations" value={sel.aiIntegrations} options={Object.keys(AI)} labels={AI_LABELS} onChange={(v) => setSel((s) => ({ ...s, aiIntegrations: v as any }))} />
                  <OptionRow label="Branding" value={sel.branding} options={Object.keys(BRAND)} labels={BRAND_LABELS} onChange={(v) => setSel((s) => ({ ...s, branding: v as any }))} />
                  <OptionRow label="Hosting (monthly)" value={sel.hosting} options={Object.keys(HOST)} labels={HOST_LABELS} onChange={(v) => setSel((s) => ({ ...s, hosting: v as any }))} />
                  <OptionRow label="Maintenance (monthly)" value={sel.maintenance} options={Object.keys(MAINT)} labels={MAINT_LABELS} onChange={(v) => setSel((s) => ({ ...s, maintenance: v as any }))} />
                </div>
              </div>

              {/* Estimate panel */}
              <div className="relative border-t border-border bg-gradient-to-br from-[#002e6d] to-[#0a1830] p-6 text-white sm:p-8 lg:border-l lg:border-t-0">
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Estimated Investment</p>
                  <div className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
                    $<AnimatedPrice value={estimate.total} />
                  </div>
                  <p className="mt-1 text-sm text-white/60">
                    ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()} annualized
                  </p>

                  <div className="mt-5 space-y-2 rounded-2xl bg-white/5 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">One-time setup</span>
                      <span className="font-semibold">${estimate.oneTime.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Monthly recurring</span>
                      <span className="font-semibold">${estimate.monthly.toLocaleString()}/mo</span>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {!showSave ? (
                      <motion.div
                        key="cta"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      >
                        <Button
                          onClick={() => setShowSave(true)}
                          className="mt-5 w-full rounded-xl bg-brand text-brand-foreground shadow-brand hover:bg-brand/90"
                        >
                          Save This Estimate
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Button>
                        <p className="mt-2 text-center text-[0.68rem] text-white/50">
                          We'll email you a detailed breakdown — no spam, ever.
                        </p>
                      </motion.div>
                    ) : saved ? (
                      <motion.div
                        key="saved"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="mt-5 rounded-2xl bg-white/10 p-4 text-center"
                      >
                        <PartyPopper className="mx-auto h-8 w-8 text-brand" />
                        <p className="mt-2 font-display font-bold">Estimate saved!</p>
                        <p className="mt-1 text-xs text-white/70">Our team will reach out within one business day.</p>
                        <button onClick={() => { setShowSave(false); setSaved(false) }} className="mt-3 text-xs font-semibold text-brand underline">
                          Build another estimate
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        onSubmit={onSave} className="mt-5 space-y-2.5"
                      >
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="border-white/20 bg-white/10 text-white placeholder:text-white/40" />
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="border-white/20 bg-white/10 text-white placeholder:text-white/40" />
                        <Button type="submit" disabled={saving} className="w-full rounded-xl bg-brand text-brand-foreground shadow-brand hover:bg-brand/90">
                          {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
                          {saving ? 'Saving…' : 'Send My Estimate'}
                        </Button>
                        <button type="button" onClick={() => setShowSave(false)} className="block w-full text-center text-xs text-white/50 hover:text-white/80">
                          Back to calculator
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

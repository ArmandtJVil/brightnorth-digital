'use client'

import * as React from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { industries, type Industry } from '@/lib/site-data'
import { SectionHeading, Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

const filters = [
  { id: 'all', label: 'All Industries' },
  { id: 'b2b', label: 'B2B & Professional' },
  { id: 'consumer', label: 'Consumer' },
  { id: 'mission', label: 'Mission-Driven' },
] as const

const categoryMap: Record<string, Industry['slug']> = {
  // b2b
  legal: 'b2b', manufacturing: 'b2b', construction: 'b2b',
  finance: 'b2b', 'professional-services': 'b2b', government: 'b2b',
  // consumer
  healthcare: 'consumer', retail: 'consumer', hospitality: 'consumer',
  automotive: 'consumer', education: 'consumer',
  // mission
  'non-profit': 'mission',
} as any

export function Industries() {
  const [active, setActive] = React.useState<string>('all')

  const filtered = React.useMemo(
    () =>
      active === 'all'
        ? industries
        : industries.filter((i) => categoryMap[i.slug] === active),
    [active],
  )

  return (
    <section id="industries" className="relative overflow-hidden py-20 sm:py-28">
      {/* navy gradient backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#002e6d]/[0.04] via-transparent to-[#ff8a00]/[0.04]" />

      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries We Serve"
          title={<>Deep expertise across <span className="text-gradient-brand">17+ industries</span></>}
          description="We speak your industry's language — its regulations, buyer journeys, and growth levers — so every solution is relevant from day one."
        />

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  active === f.id
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {active === f.id && (
                  <motion.span
                    layoutId="industry-filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#002e6d] to-[#0a4a9c] shadow-navy"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((industry) => (
                <motion.div
                  key={industry.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-all group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                      <industry.icon className="h-5.5 w-5.5" />
                    </span>
                    <h3 className="font-display text-base font-bold text-foreground">{industry.name}</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{industry.blurb}</p>
                  <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}

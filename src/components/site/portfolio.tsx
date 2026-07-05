'use client'

import * as React from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight, TrendingUp, ChevronDown, Monitor, Smartphone, Tablet } from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

export type PortfolioProject = {
  id: string
  slug: string
  title: string
  client: string | null
  industry: string
  services: string[]
  technologies: string[]
  overview: string
  outcomes: string[]
  beforeMetric: string | null
  afterMetric: string | null
  featured: boolean
}

const accentGradients = [
  'from-[#002e6d] to-[#0a4a9c]',
  'from-[#ff8a00] to-[#ffb347]',
  'from-[#17a398] to-[#2dd4bf]',
  'from-[#6d4aff] to-[#9b7bff]',
  'from-[#f0b429] to-[#fbbf24]',
  'from-[#0c1b33] to-[#2b3e5f]',
]

export function Portfolio({ projects }: { projects: PortfolioProject[] }) {
  const allServices = React.useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => p.services.forEach((s) => set.add(s)))
    return ['All Work', ...Array.from(set)]
  }, [projects])

  const [active, setActive] = React.useState('All Work')
  const [expanded, setExpanded] = React.useState<string | null>(null)

  const filtered = React.useMemo(
    () => (active === 'All Work' ? projects : projects.filter((p) => p.services.includes(active))),
    [active, projects],
  )

  return (
    <section id="portfolio" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title={<>Results that <span className="text-gradient-brand">speak for themselves</span></>}
          description="A glimpse of the websites, AI solutions, and campaigns we've shipped for clients across industries."
        />

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {allServices.map((s) => (
              <button
                key={s}
                onClick={() => setActive(s)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all sm:text-sm',
                  active === s
                    ? 'bg-foreground text-background shadow-soft'
                    : 'border border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => {
                const isOpen = expanded === project.id
                const gradient = accentGradients[i % accentGradients.length]
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-brand/40 hover:shadow-navy"
                  >
                    {/* Cover — device mockup aesthetic */}
                    <div className={cn('relative h-44 overflow-hidden bg-gradient-to-br p-5', gradient)}>
                      <div className="absolute inset-0 bg-grid opacity-20" />
                      <div className="absolute right-4 top-4 flex gap-2">
                        {project.services.slice(0, 2).map((s) => (
                          <span key={s} className="rounded-full bg-white/20 px-2.5 py-1 text-[0.62rem] font-semibold text-white backdrop-blur-sm">
                            {s}
                          </span>
                        ))}
                      </div>
                      {/* Device mockups */}
                      <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
                        <div className="flex items-end gap-2">
                          <div className="flex h-16 w-24 items-center justify-center rounded-md border border-white/30 bg-white/10 backdrop-blur-sm">
                            <Monitor className="h-5 w-5 text-white/70" />
                          </div>
                          <div className="flex h-12 w-9 items-center justify-center rounded-md border border-white/30 bg-white/10 backdrop-blur-sm">
                            <Tablet className="h-3.5 w-3.5 text-white/70" />
                          </div>
                          <div className="flex h-10 w-5 items-center justify-center rounded border border-white/30 bg-white/10 backdrop-blur-sm">
                            <Smartphone className="h-3 w-3 text-white/70" />
                          </div>
                        </div>
                        <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.62rem] font-bold text-[#0c1b33]">
                          {project.industry}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-lg font-bold text-foreground">{project.title}</h3>
                          {project.client && (
                            <p className="text-xs text-muted-foreground">for {project.client}</p>
                          )}
                        </div>
                        <TrendingUp className="h-5 w-5 shrink-0 text-brand" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.overview}</p>

                      {/* Metrics */}
                      {(project.beforeMetric || project.afterMetric) && (
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="rounded-xl bg-muted/80 p-3 ring-1 ring-border/60">
                            <p className="text-[0.62rem] font-bold uppercase tracking-wide text-muted-foreground">Before</p>
                            <p className="mt-0.5 font-display text-lg font-bold text-foreground/70">{project.beforeMetric}</p>
                          </div>
                          <div className="rounded-xl bg-brand-soft p-3 ring-1 ring-brand/20">
                            <p className="text-[0.62rem] font-bold uppercase tracking-wide text-[#8a4400] dark:text-[#ffd9a3]">After</p>
                            <p className="mt-0.5 font-display text-lg font-bold text-brand">{project.afterMetric}</p>
                          </div>
                        </div>
                      )}

                      {/* Expandable outcomes */}
                      <button
                        onClick={() => setExpanded(isOpen ? null : project.id)}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all"
                        aria-expanded={isOpen}
                      >
                        {isOpen ? 'Hide details' : 'View outcomes'}
                        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-4 space-y-2 border-t border-border pt-4">
                              {project.outcomes.map((o, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                                  {o}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {project.technologies.map((t) => (
                                <span key={t} className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[0.62rem] font-medium text-muted-foreground">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}

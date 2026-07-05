'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading, Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

export type Testimonial = {
  id: string
  authorName: string
  authorRole: string
  company: string
  content: string
  rating: number
  industry: string
  service: string
  featured: boolean
}

const avatarColors = ['#002e6d', '#ff8a00', '#17a398', '#6d4aff', '#f0b429', '#0a4a9c']

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const featured = testimonials.filter((t) => t.featured)
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  const active = featured[index % featured.length] ?? testimonials[0]

  React.useEffect(() => {
    if (paused || featured.length <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % featured.length), 6000)
    return () => clearInterval(t)
  }, [paused, featured.length])

  const others = testimonials.filter((t) => t.id !== active?.id).slice(0, 4)

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#ff8a00]/[0.04] via-transparent to-[#002e6d]/[0.04]" />

      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client Success Stories"
          title={<>Partnerships that <span className="text-gradient-brand">drive real results</span></>}
          description="Don't take our word for it — hear from the businesses we've helped grow."
        />

        {/* Featured carousel */}
        <Reveal delay={0.1}>
          <div
            className="relative mt-12 overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-soft sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote className="absolute right-8 top-8 h-20 w-20 text-brand/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active?.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: active?.rating ?? 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-brand text-brand" />
                  ))}
                </div>

                <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                  “{active?.content}”
                </blockquote>

                <div className="mt-7 flex items-center gap-4">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: avatarColors[index % avatarColors.length] }}
                  >
                    {initials(active?.authorName ?? '')}
                  </span>
                  <div>
                    <p className="font-display font-bold text-foreground">{active?.authorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {active?.authorRole}, {active?.company}
                    </p>
                  </div>
                  <div className="ml-auto hidden text-right sm:block">
                    <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-[#7a3d00] dark:text-[#ffcf8d]">
                      {active?.industry}
                    </span>
                    <p className="mt-1.5 text-xs text-muted-foreground">{active?.service}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            {featured.length > 1 && (
              <div className="mt-8 flex items-center gap-2">
                <button
                  onClick={() => setIndex((i) => (i - 1 + featured.length) % featured.length)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIndex((i) => (i + 1) % featured.length)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="ml-3 flex gap-1.5">
                  {featured.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={cn(
                        'h-1.5 rounded-full transition-all',
                        i === index % featured.length ? 'w-6 bg-brand' : 'w-1.5 bg-border',
                      )}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* Smaller testimonial cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-brand/40 hover:shadow-soft">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-brand text-brand" />
                  ))}
                </div>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                  “{t.content}”
                </p>
                <div className="mt-4 flex items-center gap-2.5 border-t border-border pt-4">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[0.62rem] font-bold text-white"
                    style={{ background: avatarColors[(i + 1) % avatarColors.length] }}
                  >
                    {initials(t.authorName)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-foreground">{t.authorName}</p>
                    <p className="truncate text-[0.68rem] text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

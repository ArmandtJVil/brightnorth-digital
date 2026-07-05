'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Search,
  Users,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CountUp } from '@/components/site/reveal'
import { stats } from '@/lib/site-data'

function FloatingCard({
  className,
  children,
  delay = 0,
  depth = 30,
  mx,
  my,
}: {
  className?: string
  children: React.ReactNode
  delay?: number
  depth?: number
  mx: any
  my: any
}) {
  const reduce = useReducedMotion()
  const x = useTransform(mx, (v) => (reduce ? 0 : v * depth))
  const y = useTransform(my, (v) => (reduce ? 0 : v * depth))
  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const sx = useSpring(mvX, { stiffness: 120, damping: 18 })
  const sy = useSpring(mvY, { stiffness: 120, damping: 18 })

  const bgX = useTransform(sx, (v) => (reduce ? 0 : v * -12))
  const bgY = useTransform(sy, (v) => (reduce ? 0 : v * -12))

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      mvX.set(px)
      mvY.set(py)
    },
    [mvX, mvY],
  )

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
      onMouseMove={onMove}
    >
      {/* Animated gradient background */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(0,46,109,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.20),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(109,74,255,0.12),transparent_60%)] blur-2xl" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b opacity-60" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* Left: copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7a3d00] dark:text-[#ffcf8d]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Full-Service Digital Agency
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
          >
            Build Smarter.
            <br />
            Market Better.
            <br />
            <span className="text-gradient-warm">Grow Faster.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
          >
            BrightNorth Digital helps ambitious businesses grow through intelligent
            web development, AI-powered automation, data-driven marketing, and
            measurable digital strategies. From startups to enterprise, we build
            digital experiences that generate leads, improve efficiency, and
            accelerate long-term success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <Button asChild size="lg" className="w-full rounded-xl bg-brand px-7 text-base text-brand-foreground shadow-brand hover:bg-brand/90 sm:w-auto">
              <Link href="#contact">
                Book Your Free Strategy Session
                <ArrowRight className="ml-2 h-4.5 w-4.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full rounded-xl border-foreground/20 px-7 text-base sm:w-auto">
              <Link href="#services">Explore Our Services</Link>
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <div className="flex -space-x-2">
              {['#002e6d', '#ff8a00', '#17a398', '#6d4aff', '#f0b429'].map((c, i) => (
                <span
                  key={i}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-background text-[0.6rem] font-bold text-white"
                  style={{ background: c }}
                >
                  {['JM', 'SK', 'AL', 'RP', 'TC'][i]}
                </span>
              ))}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center gap-0.5 sm:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Trusted by 240+ businesses across 17+ industries
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: image + floating cards */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-lg lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-navy">
              <img
                src="/images/hero-office.png"
                alt="BrightNorth Digital team of developers, marketers, designers and AI specialists collaborating in a bright modern office around interactive analytics displays"
                className="aspect-[16/11] w-full object-cover"
                loading="eager"
                width={1344}
                height={768}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002e6d]/40 via-transparent to-transparent" />
            </div>

            {/* Floating: analytics card */}
            <FloatingCard
              mx={sx}
              my={sy}
              depth={26}
              delay={0.5}
              className="absolute -left-4 top-10 w-44 rounded-2xl glass p-3.5 shadow-soft sm:-left-8"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <TrendingUp className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[0.65rem] font-medium text-muted-foreground">Organic Traffic</p>
                  <p className="text-sm font-bold text-foreground">+248%</p>
                </div>
              </div>
              <div className="mt-2.5 flex h-10 items-end gap-1">
                {[35, 50, 42, 65, 58, 78, 70, 92].map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.8 + i * 0.07, duration: 0.5 }}
                    className="flex-1 rounded-sm bg-gradient-to-t from-brand to-[#ffb347]"
                  />
                ))}
              </div>
            </FloatingCard>

            {/* Floating: SEO rank card */}
            <FloatingCard
              mx={sx}
              my={sy}
              depth={-20}
              delay={0.65}
              className="absolute -right-3 top-24 w-44 rounded-2xl glass p-3.5 shadow-soft sm:-right-7"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#002e6d]/10 text-[#002e6d] dark:text-[#4d8dff]">
                  <Search className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[0.65rem] font-medium text-muted-foreground">Avg. Position</p>
                  <p className="text-sm font-bold text-foreground">#1.8</p>
                </div>
              </div>
              <p className="mt-2 text-[0.65rem] text-muted-foreground">Up from #14 in 90 days</p>
            </FloatingCard>

            {/* Floating: clients card */}
            <FloatingCard
              mx={sx}
              my={sy}
              depth={18}
              delay={0.8}
              className="absolute -bottom-5 left-8 w-48 rounded-2xl glass p-3.5 shadow-soft"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#17a398]/15 text-[#17a398]">
                  <Users className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[0.65rem] font-medium text-muted-foreground">Happy Clients</p>
                  <p className="text-sm font-bold text-foreground">240+ served</p>
                </div>
              </div>
              <div className="mt-2.5 flex -space-x-1.5">
                {['#002e6d', '#ff8a00', '#17a398', '#6d4aff', '#f0b429'].map((c, i) => (
                  <span key={i} className="h-5 w-5 rounded-full border-2 border-background" style={{ background: c }} />
                ))}
                <span className="ml-2 self-center text-[0.65rem] text-muted-foreground">+235 more</span>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:mt-24 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background px-6 py-8 text-center"
            >
              <div className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  decimals={s.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

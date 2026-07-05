'use client'

import * as React from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { TechLogo } from '@/components/site/tech-logos'

/* ---------- Scroll progress bar (top of page) ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const reduce = useReducedMotion()

  if (reduce) return null

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-brand via-[#ffb347] to-[#002e6d]"
      aria-hidden
    />
  )
}

/* ---------- Spotlight card (radial glow follows cursor) ---------- */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn('group relative overflow-hidden', className)}
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 spotlight group-hover:opacity-100" />
      {children}
    </div>
  )
}

/* ---------- Logo Marquee (infinite brand-logo scroller) ---------- */
export function LogoMarquee({
  logos,
  reverse = false,
  className,
}: {
  logos: TechLogo[]
  reverse?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const doubled = [...logos, ...logos]

  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center gap-14 pr-14',
          !reduce && (reverse ? 'animate-marquee-rev' : 'animate-marquee'),
        )}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-3 text-muted-foreground/50 transition-colors hover:text-brand"
            title={item.name}
          >
            <item.Logo className="h-8 w-8" />
            <span className="font-display text-lg font-semibold whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

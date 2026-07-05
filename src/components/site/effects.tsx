'use client'

import * as React from 'react'
import { motion, useScroll, useSpring, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

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

/* ---------- Tilt card (3D hover tilt that follows cursor) ---------- */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: React.ReactNode
  className?: string
  intensity?: number
}) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useTransform(my, [0, 1], [intensity, -intensity])
  const rotateY = useTransform(mx, [0, 1], [-intensity, intensity])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn('[transform-style:preserve-3d]', className)}
    >
      {children}
    </motion.div>
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
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 spotlight group-hover:opacity-100" />
      {children}
    </div>
  )
}

/* ---------- Marquee (infinite logo/skill scroller) ---------- */
export function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: string[]
  reverse?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const doubled = [...items, ...items]

  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center gap-10 pr-10',
          !reduce && (reverse ? 'animate-marquee-rev' : 'animate-marquee'),
        )}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-lg font-bold text-muted-foreground/40 transition-colors hover:text-brand whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

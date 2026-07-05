'use client'

import * as React from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { cn } from '@/lib/utils'

/* ---------- Reveal ---------- */
type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  as?: React.ElementType
}) {
  const reduce = useReducedMotion()
  const off = reduce ? { x: 0, y: 0 } : offsets[direction]
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...off }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* ---------- Stagger container ---------- */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ---------- CountUp ---------- */
export function CountUp({
  value,
  suffix = '',
  duration = 2,
  decimals = 0,
  className,
}: {
  value: number
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 })

  React.useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, value, mv])

  const [display, setDisplay] = React.useState('0')

  React.useEffect(() => {
    return spring.on('change', (latest) => {
      setDisplay(latest.toFixed(decimals))
    })
  }, [spring, decimals])

  if (reduce) {
    return (
      <span ref={ref} className={className}>
        {value.toFixed(decimals)}
        {suffix}
      </span>
    )
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#8a4400] dark:text-[#ffd9a3]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.7rem] md:leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}

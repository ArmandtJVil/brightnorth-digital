'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { navLinks } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="#top" className={cn('flex items-center gap-2.5', className)} aria-label="BrightNorth Digital home">
      {/* Brand mark: B + compass star */}
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#002e6d] to-[#0a4a9c] shadow-navy">
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M9 6h7.5a5.5 5.5 0 0 1 2.2 10.5A5.5 5.5 0 0 1 16.5 27H9V6Z"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M16 2.5l1.6 4.4 4.4 1.6-4.4 1.6L16 14.5l-1.6-4.4L10 8.5l4.4-1.6L16 2.5Z"
            fill="#ff8a00"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
          Bright<span className="text-brand">North</span>
        </span>
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Digital
        </span>
      </span>
    </Link>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const reduce = useReducedMotion()

  React.useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8',
          scrolled
            ? 'my-2 rounded-2xl border border-border/70 bg-background/80 py-2.5 shadow-soft backdrop-blur-xl'
            : 'my-3 rounded-2xl border border-transparent py-3.5',
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Toggle color theme"
          >
            {mounted && theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Button asChild className="hidden rounded-xl bg-brand px-5 text-brand-foreground shadow-brand hover:bg-brand/90 sm:inline-flex">
            <Link href="#contact">
              Free Strategy Session
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] border-border p-0">
              <SheetHeader className="border-b border-border px-6 py-5">
                <div className="flex items-center justify-between">
                  <SheetTitle asChild>
                    <span><Logo /></span>
                  </SheetTitle>
                  <SheetClose asChild>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent" aria-label="Close menu">
                      <X className="h-5 w-5" />
                    </button>
                  </SheetClose>
                </div>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto border-t border-border p-4">
                <SheetClose asChild>
                  <Button asChild className="w-full rounded-xl bg-brand text-brand-foreground shadow-brand hover:bg-brand/90">
                    <Link href="#contact">
                      Book Free Strategy Session
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            style={{ transformOrigin: 'left' }}
            className="mx-auto h-[2px] max-w-7xl bg-gradient-to-r from-transparent via-brand to-transparent"
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}

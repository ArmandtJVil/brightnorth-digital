'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { navLinks, serviceNavItems } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function Logo({ className, variant = 'default' }: { className?: string; variant?: 'default' | 'light' }) {
  return (
    <Link href="/" className={cn('group relative flex items-center', className)} aria-label="BrightNorth Digital home">
      {/* Glow behind logo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-3 inset-y-0 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,138,0,0.45),rgba(0,46,109,0.25)_55%,transparent_75%)] opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <Image
        src="/logo.png"
        alt="BrightNorth Digital logo"
        width={240}
        height={82}
        priority
        className={cn(
          'relative h-12 w-auto drop-shadow-[0_2px_8px_rgba(255,138,0,0.15)] sm:h-[3.4rem]',
          variant === 'light' && 'brightness-0 invert',
        )}
      />
    </Link>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [servicesOpen, setServicesOpen] = React.useState(false)
  const reduce = useReducedMotion()
  const pathname = usePathname()
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onServicesEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }
  const onServicesLeave = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }

  return (
    <motion.header
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          'mx-auto flex max-w-[1140px] items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8',
          scrolled
            ? 'my-2 rounded-2xl border border-border/70 bg-background/80 py-3 shadow-soft backdrop-blur-xl'
            : 'my-3 rounded-2xl border border-transparent py-4',
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={onServicesEnter}
            onMouseLeave={onServicesLeave}
          >
            <Link
              href="/services"
              className={cn(
                'inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground',
                (pathname === '/services' || pathname.startsWith('/services/')) ? 'text-foreground' : 'text-muted-foreground',
              )}
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', servicesOpen && 'rotate-180')} />
            </Link>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-2"
                >
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border/70 bg-background/95 p-2.5 shadow-navy backdrop-blur-xl">
                    <Link
                      href="/services"
                      className="col-span-2 mb-1 flex items-center justify-between rounded-xl bg-gradient-to-r from-[#002e6d] to-[#0a4a9c] px-4 py-3 text-white"
                    >
                      <div>
                        <p className="text-sm font-bold">View all services</p>
                        <p className="text-xs text-white/70">Explore our full digital capability</p>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    {serviceNavItems.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex items-start gap-2.5 rounded-xl p-2.5 transition-colors hover:bg-accent"
                      >
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand transition-transform group-hover:scale-110">
                          <s.icon className="h-4.5 w-4.5" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground">{s.shortName}</p>
                          <p className="text-xs leading-snug text-muted-foreground">{s.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other links */}
          {navLinks.filter((l) => l.label !== 'Services').map((link) => (
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
          <Button asChild className="hidden rounded-xl bg-brand px-5 font-bold text-brand-foreground shadow-brand hover:bg-brand/90 sm:inline-flex">
            <Link href="/contact">
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
            <SheetContent side="right" className="w-[340px] border-border p-0">
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
              <nav className="scroll-fancy flex max-h-[70vh] flex-col gap-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
                <SheetClose asChild>
                  <Link href="/services" className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent">
                    Services Overview
                  </Link>
                </SheetClose>
                <div className="px-3 pb-1 pt-2 text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">
                  All Services
                </div>
                {serviceNavItems.map((s) => (
                  <SheetClose asChild key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      <s.icon className="h-4 w-4 text-brand" />
                      {s.shortName}
                    </Link>
                  </SheetClose>
                ))}
                <div className="my-2 border-t border-border" />
                {navLinks.filter((l) => l.label !== 'Services').map((link) => (
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
                    <Link href="/#contact">
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
            className="mx-auto h-[2px] max-w-[1140px] bg-gradient-to-r from-transparent via-brand to-transparent"
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}

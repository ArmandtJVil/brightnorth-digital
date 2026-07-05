'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/site/reveal'

export function CtaBand() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-navy">
            <img
              src="/images/cta-bg.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              width={1344}
              height={768}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060d1a]/85 via-[#060d1a]/70 to-[#060d1a]/40" />
            <div className="relative flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-14">
              <div className="max-w-2xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl"
                >
                  Ready to build smarter, market better, and grow faster?
                </motion.h2>
                <p className="mt-3 text-base text-white/70 sm:text-lg">
                  Book your free 30-minute strategy session. No pressure, no jargon — just a clear plan for your next phase of growth.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-xl bg-brand px-7 text-base text-brand-foreground shadow-brand hover:bg-brand/90">
                  <Link href="#contact">
                    <Calendar className="mr-2 h-4.5 w-4.5" /> Book Free Session
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-white/30 bg-white/5 px-7 text-base text-white backdrop-blur-sm hover:bg-white/10 hover:text-white">
                  <Link href="#services">Explore Services <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

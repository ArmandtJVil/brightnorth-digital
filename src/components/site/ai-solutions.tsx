'use client'

import * as React from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { BrainCircuit, Sparkles, ArrowRight, Cpu, Cloud, Workflow } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { aiCapabilities } from '@/lib/site-data'
import { SectionHeading, Reveal, staggerContainer, staggerItem } from '@/components/site/reveal'

export function AiSolutions() {
  return (
    <section id="ai" className="relative overflow-hidden py-20 sm:py-28">
      {/* Dark premium backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#060d1a] via-[#0a1830] to-[#060d1a]" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.15]" />
      <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.25),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(77,141,255,0.22),transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: image + floating AI nodes */}
          <Reveal direction="right">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-brand/20 to-[#4d8dff]/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <img
                  src="/images/ai-solutions.png"
                  alt="Premium visualization of an intelligent business ecosystem connecting automation, cloud platforms, analytics, and AI services"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  width={1344}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/60 to-transparent" />
              </div>

              {/* Floating node chips */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -left-4 top-10 flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md"
              >
                <Cpu className="h-4 w-4 text-brand" />
                <span className="text-xs font-semibold text-white">Automation Engine</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="absolute -right-4 top-1/3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md"
              >
                <Cloud className="h-4 w-4 text-[#4d8dff]" />
                <span className="text-xs font-semibold text-white">Cloud Connected</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-4 left-1/4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md"
              >
                <Workflow className="h-4 w-4 text-[#2dd4bf]" />
                <span className="text-xs font-semibold text-white">Live Workflows</span>
              </motion.div>
            </div>
          </Reveal>

          {/* Right: copy + capabilities */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Artificial Intelligence"
              title={<span className="text-white">Put AI to work where it <span className="text-gradient-warm">moves the needle</span></span>}
              description="We design, build, and deploy AI that automates the busywork, surfaces insights, and elevates every customer interaction — responsibly and measurably."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {aiCapabilities.map((cap) => (
                <motion.div
                  key={cap.title}
                  variants={staggerItem}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all hover:border-brand/40 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                      <cap.icon className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="font-display text-sm font-bold text-white">{cap.title}</h3>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-300">{cap.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <Reveal delay={0.2}>
              <Button asChild className="mt-8 rounded-xl bg-brand px-6 text-brand-foreground shadow-brand hover:bg-brand/90">
                <Link href="#contact">
                  Explore AI for Your Business
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

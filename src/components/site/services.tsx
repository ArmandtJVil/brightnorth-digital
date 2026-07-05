'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { services } from '@/lib/site-data'
import { Reveal, SectionHeading, staggerContainer, staggerItem } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title={<>Services engineered for <span className="text-gradient-brand">every stage of growth</span></>}
          description="From your first website to enterprise AI automation, we cover the full digital spectrum with senior expertise and measurable outcomes."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.article
              key={service.slug}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-navy"
            >
              {/* Whole-card link to detail page */}
              <Link href={`/services/${service.slug}`} className="absolute inset-0 z-10" aria-label={`Learn more about ${service.name}`} />
              {/* Gradient glow on hover */}
              <div
                className={cn(
                  'pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30',
                  service.gradient,
                )}
              />

              <div className="relative">
                <div
                  className={cn(
                    'inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
                    service.gradient,
                  )}
                >
                  <service.icon className="h-7 w-7" />
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.shortDesc}
                </p>

                <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                      <Check className="h-3.5 w-3.5 shrink-0 text-brand" />
                      {f}
                    </li>
                  ))}
                </ul>

                <span
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2.5"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>

              {/* Bottom accent line */}
              <span className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-brand to-[#ffb347] transition-all duration-500 group-hover:w-full" />
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.15}>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-foreground/20 px-6 py-3 text-base font-semibold transition-colors hover:bg-accent"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { processSteps } from '@/lib/site-data'
import { SectionHeading, Reveal } from '@/components/site/reveal'

export function Process() {
  return (
    <section id="process" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Process"
          title={<>A proven 5-step path from <span className="text-gradient-brand">idea to impact</span></>}
          description="No black boxes. Just a transparent, collaborative process designed to minimize risk and maximize measurable outcomes."
        />

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-9 hidden h-0.5 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left' }}
            className="absolute left-0 right-0 top-9 hidden h-0.5 bg-gradient-to-r from-brand via-[#0a4a9c] to-brand lg:block"
          />

          <div className="grid gap-8 lg:grid-cols-5 lg:gap-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.12} direction="up">
                <div className="group relative text-center lg:text-left">
                  {/* Node */}
                  <div className="relative z-10 mx-auto mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center lg:mx-0">
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#002e6d] to-[#0a4a9c] opacity-10 transition-opacity group-hover:opacity-100" />
                    <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-brand shadow-soft transition-all duration-300 group-hover:border-transparent group-hover:text-white group-hover:shadow-brand">
                      <step.icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                    </span>
                    <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[0.65rem] font-bold text-white shadow">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>

                  <ul className="mt-4 space-y-1.5">
                    {step.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs font-medium text-foreground/75 lg:justify-start justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Process image strip */}
        <Reveal delay={0.2}>
          <div className="mt-16 overflow-hidden rounded-3xl border border-border/60 shadow-soft">
            <img
              src="/images/process-discovery.png"
              alt="BrightNorth Digital team running a discovery workshop with whiteboards, wireframes, and user flow diagrams"
              className="aspect-[21/8] w-full object-cover"
              loading="lazy"
              width={1344}
              height={768}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

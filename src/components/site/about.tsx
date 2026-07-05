'use client'

import { motion } from 'framer-motion'
import { Target, ShieldCheck, Gauge, Lightbulb, TrendingUp, HeartHandshake } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/site/reveal'

const values = [
  { icon: Lightbulb, title: 'Innovation', desc: 'We turn emerging tech into practical business advantage.' },
  { icon: ShieldCheck, title: 'Trust', desc: 'Transparent partnerships, honest reporting, long-term thinking.' },
  { icon: Target, title: 'Expertise', desc: 'Senior specialists across web, AI, marketing, and design.' },
  { icon: TrendingUp, title: 'Growth', desc: 'Every decision tied to measurable revenue and efficiency.' },
  { icon: Gauge, title: 'Performance', desc: 'Fast, secure, accessible experiences that convert.' },
  { icon: HeartHandshake, title: 'Partnership', desc: 'We act as an extension of your team, not a vendor.' },
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-20 top-1/3 -z-10 h-72 w-72 animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.12),transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 -z-10 h-80 w-80 animate-float rounded-full bg-[radial-gradient(circle,rgba(0,46,109,0.12),transparent_60%)] blur-2xl" />
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal direction="right">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl bg-brand/20 blur-2xl" />
              <div className="absolute -bottom-6 -right-4 h-32 w-32 rounded-full bg-[#002e6d]/15 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-soft">
                <img
                  src="/images/about-strategy.png"
                  alt="BrightNorth Digital professionals brainstorming around a digital strategy wall with user journeys, analytics, branding concepts, and AI workflows"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  width={1344}
                  height={768}
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-6 left-6 rounded-2xl glass p-4 shadow-soft"
              >
                <p className="text-3xl font-extrabold text-foreground font-display">12+</p>
                <p className="text-xs text-muted-foreground">years building<br />digital products</p>
              </motion.div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="About BrightNorth Digital"
              title={<>A full-service digital partner built for <span className="text-gradient-brand">measurable growth</span></>}
              description="BrightNorth Digital is a full-service digital agency dedicated to helping businesses thrive in an increasingly digital world. We combine creativity, technology, and data-driven strategies to build high-performing websites, improve search visibility, implement AI-powered solutions, and deliver measurable growth."
            />
            <Reveal delay={0.15}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Whether launching a new business, modernizing an established brand, or scaling
                digital operations, our team provides tailored solutions that create lasting value —
                and the reporting to prove it.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={0.1 + i * 0.05}>
                  <div className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 transition-all hover:border-brand/40 hover:shadow-soft">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform group-hover:scale-110">
                      <v.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-bold text-foreground">{v.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

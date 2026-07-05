import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Lightbulb, ShieldCheck, TrendingUp, Gauge, HeartHandshake, Users, Award, Globe, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: {
    absolute: "About BrightNorth Digital | Our Story, Team & Values | Digital Agency",
  },
  description:
    "BrightNorth Digital is a full-service digital agency helping ambitious businesses grow through intelligent web development, AI solutions, SEO, and marketing. Learn about our story, values, and the team behind our results.",
  keywords: [
    "about brightnorth digital",
    "digital agency",
    "web development company",
    "AI solutions provider",
    "SEO agency",
    "digital marketing agency",
    "our team",
    "agency values",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About BrightNorth Digital | Our Story, Team & Values",
    description:
      "A full-service digital agency helping ambitious businesses grow through intelligent web, AI, SEO, and marketing.",
    url: "/about",
    type: "website",
    images: [{ url: "/images/about-team.png", width: 1344, height: 768, alt: "BrightNorth Digital team collaborating in a modern office" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About BrightNorth Digital | Our Story, Team & Values",
    description:
      "A full-service digital agency helping ambitious businesses grow through intelligent web, AI, SEO, and marketing.",
    images: ["/images/about-team.png"],
  },
};

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "We turn emerging technology into practical, measurable business advantage — not novelty for its own sake." },
  { icon: ShieldCheck, title: "Trust", desc: "Transparent partnerships, honest reporting, and long-term thinking. We earn trust by doing what we say." },
  { icon: Target, title: "Expertise", desc: "Senior specialists across web, AI, marketing, and design. No juniors learning on your budget." },
  { icon: TrendingUp, title: "Growth", desc: "Every decision tied to measurable revenue and efficiency. Your success is the only metric that matters." },
  { icon: Gauge, title: "Performance", desc: "Fast, secure, accessible experiences that convert. Performance is a feature, not an afterthought." },
  { icon: HeartHandshake, title: "Partnership", desc: "We act as an extension of your team, not a vendor. Your goals become our goals." },
];

const stats = [
  { value: "12+", label: "Years building digital products" },
  { value: "240+", label: "Projects delivered" },
  { value: "98%", label: "Client retention rate" },
  { value: "17+", label: "Industries served" },
];

const team = [
  { name: "Sarah Mitchell", role: "Founder & CEO", bio: "15 years building digital products for startups and enterprise. Former lead engineer at two unicorn startups.", initials: "SM", color: "#002e6d" },
  { name: "James Carter", role: "Head of Engineering", bio: "Full-stack architect specializing in performant web apps and scalable systems. TypeScript evangelist.", initials: "JC", color: "#ff8a00" },
  { name: "Aisha Patel", role: "AI & Automation Lead", bio: "ML engineer turned business automator. Builds AI that ships, not just demos. PhD in Computer Science.", initials: "AP", color: "#17a398" },
  { name: "Marcus Chen", role: "SEO & Growth Director", bio: "10+ years ranking sites in competitive niches. Pioneer in AI-search optimization and content strategy.", initials: "MC", color: "#6d4aff" },
  { name: "Elena Rodriguez", role: "Creative Director", bio: "Award-winning designer crafting brands that feel inevitable. Former agency creative lead.", initials: "ER", color: "#f0b429" },
  { name: "David Okafor", role: "Digital Marketing Lead", bio: "Performance marketing specialist. Has managed over $20M in profitable ad spend across channels.", initials: "DO", color: "#0a4a9c" },
];

const faqs = [
  { q: "When was BrightNorth Digital founded?", a: "BrightNorth Digital was founded in 2013 by Sarah Mitchell, a former lead engineer who saw a gap between what businesses needed and what most agencies delivered. What started as a boutique web studio has grown into a full-service digital agency with specialists across web, AI, SEO, marketing, and branding." },
  { q: "Where is BrightNorth Digital located?", a: "We're headquartered at 120 Market Street, Suite 400, San Francisco, California. We serve clients across the United States and internationally, with a fully remote-capable team that has delivered engagements across multiple time zones." },
  { q: "How big is your team?", a: "We're a deliberately senior team of 18 specialists — small enough to be agile and accountable, large enough to cover the full digital spectrum. Every project is staffed with experienced practitioners, not juniors learning on your budget." },
  { q: "What makes BrightNorth Digital different from other agencies?", a: "Three things: we staff senior specialists (no junior hand-offs), we tie every decision to measurable business outcomes (not vanity metrics), and we build for the long term (clean code, documented systems, real partnerships). We'd rather turn down work than deliver something mediocre." },
  { q: "Do you work with startups or only enterprise clients?", a: "Both. We work with funded startups launching their first product, growing mid-market companies scaling their digital presence, and enterprise organizations modernizing legacy systems. Our pricing and engagement models adapt to your stage — what doesn't change is the quality of the work." },
  { q: "Can I see examples of your work?", a: "Yes. We have a portfolio of case studies across web development, AI solutions, SEO, marketing, and branding. Contact us and we'll share relevant examples matched to your industry and project type." },
];

export default function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);
  const faqSchema = buildFaqSchema(faqs);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd id="ld-breadcrumb" schema={breadcrumbSchema} />
      <JsonLd id="ld-faq" schema={faqSchema} />

      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[1140px] px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
          <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li className="text-border">/</li>
            <li className="font-semibold text-foreground">About</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-40 -top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(0,46,109,0.16),transparent_60%)] blur-2xl" />
            <div className="absolute -right-32 top-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.16),transparent_60%)] blur-2xl" />
          </div>
          <div className="mx-auto grid max-w-[1140px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffd9a3]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Our Story
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                We build digital experiences that <span className="text-gradient-brand">drive real growth</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                BrightNorth Digital is a full-service digital agency dedicated to helping businesses thrive
                in an increasingly digital world. We combine creativity, technology, and data-driven strategies
                to build high-performing websites, improve search visibility, implement AI-powered solutions,
                and deliver measurable growth — for startups to enterprise.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-base font-bold text-brand-foreground shadow-brand transition-colors hover:bg-brand/90 sm:w-auto">
                  Work With Us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/services" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-foreground/20 px-6 py-3 text-base font-semibold transition-colors hover:bg-accent sm:w-auto">
                  Explore Services
                </Link>
              </div>
            </div>
            <Reveal direction="left">
              <div className="relative">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-brand/20 to-[#4d8dff]/20 blur-2xl" />
                <div className="overflow-hidden rounded-3xl border border-border/60 shadow-navy">
                  <img
                    src="/images/about-team.png"
                    alt="BrightNorth Digital team collaborating around a large table with laptops, strategy documents, and a whiteboard in a bright modern office"
                    className="aspect-[4/3] w-full object-cover"
                    width={1344}
                    height={768}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="group relative bg-background px-6 py-8 text-center transition-colors hover:bg-brand-soft/30">
                    <div className="font-display text-4xl font-extrabold text-foreground transition-transform duration-300 group-hover:scale-110 sm:text-5xl">
                      {s.value}
                    </div>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffd9a3]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                How we started
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                From boutique studio to full-service partner
              </h2>
            </Reveal>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <Reveal delay={0.05}>
                <p>
                  BrightNorth Digital was founded in 2013 by Sarah Mitchell, a former lead engineer who saw
                  a growing gap between what businesses needed and what most digital agencies actually delivered.
                  Too many agencies were shipping beautiful websites that didn't perform, running marketing
                  campaigns optimized for clicks rather than revenue, and treating technology as a checkbox
                  rather than a competitive advantage.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  What started as a boutique web studio in San Francisco has grown into a full-service digital
                  agency with senior specialists across web development, AI solutions, SEO, digital marketing,
                  branding, and managed hosting. Along the way, we've stayed true to the principle that
                  inspired our founding: every project should deliver measurable business value, not just
                  a deliverable.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Today, we partner with ambitious businesses — from funded startups launching their first
                  product to enterprise organizations modernizing legacy systems. We've delivered 240+ projects
                  across 17+ industries, maintained a 98% client retention rate, and helped our clients achieve
                  an average 4.2x return on investment in their first year with us.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  But we're most proud of the relationships. Many of our clients have been with us for 5+ years,
                  trusting us not just with individual projects but with their ongoing digital strategy. That
                  kind of partnership is earned, not sold — and it's the standard we hold ourselves to every day.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <Reveal direction="up">
                <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card p-8">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand/10 blur-2xl" />
                  <Target className="h-10 w-10 text-brand" />
                  <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Our Mission</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    To help ambitious businesses grow by turning technology into a measurable competitive
                    advantage. We build digital experiences that don't just look exceptional — they generate
                    leads, improve efficiency, and accelerate long-term success.
                  </p>
                </div>
              </Reveal>
              <Reveal direction="up" delay={0.1}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card p-8">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#4d8dff]/10 blur-2xl" />
                  <Globe className="h-10 w-10 text-[#4d8dff]" />
                  <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Our Vision</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    A digital landscape where every business — regardless of size — has access to enterprise-grade
                    technology, intelligent automation, and marketing that actually works. We're building that
                    future one partnership at a time.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/20 py-16 sm:py-24">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffd9a3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  What drives us
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Values that shape every <span className="text-gradient-brand">decision</span>
                </h2>
                <p className="mt-3 text-muted-foreground">
                  These aren't posters on a wall — they're the principles we use to decide what to build, who to hire, and how we work.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06}>
                  <div className="group h-full rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform group-hover:scale-110">
                        <v.icon className="h-5.5 w-5.5" />
                      </span>
                      <h3 className="font-display text-lg font-bold text-foreground">{v.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Office image strip */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
                <img
                  src="/images/about-office.png"
                  alt="BrightNorth Digital modern open-plan office interior with natural light, plants, and collaborative workspace"
                  className="aspect-[21/8] w-full object-cover"
                  width={1344}
                  height={768}
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffd9a3]">
                  <Users className="h-3.5 w-3.5" />
                  Meet the team
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Senior specialists who <span className="text-gradient-brand">do the work</span>
                </h2>
                <p className="mt-3 text-muted-foreground">
                  No junior hand-offs. The people you meet are the people who build your project.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, i) => (
                <Reveal key={member.name} delay={i * 0.07}>
                  <div className="group h-full rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft">
                    <div className="flex items-center gap-4">
                      <span
                        className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold text-white shadow-lg transition-transform group-hover:scale-110"
                        style={{ background: member.color }}
                      >
                        {member.initials}
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-foreground">{member.name}</h3>
                        <p className="text-xs font-semibold text-brand">{member.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="bg-muted/20 py-16 sm:py-24">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffd9a3]">
                    <Award className="h-3.5 w-3.5" />
                    Why BrightNorth
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    An agency built for <span className="text-gradient-brand">measurable outcomes</span>
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    We're not the cheapest agency, and we're not trying to be. We're the agency that delivers
                    work you can build on for years — backed by senior expertise, honest reporting, and a
                    genuine investment in your success.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="space-y-4">
                  {[
                    "Senior specialists on every project — no junior hand-offs or learning on your budget",
                    "Measurable outcomes tied to revenue, not vanity metrics that look good in reports",
                    "Clean, documented, maintainable code your team can extend for years",
                    "Transparent reporting with monthly reviews and clear next steps",
                    "Long-term partnerships — 98% of our clients stay with us year over year",
                    "Full-spectrum expertise from web and AI to SEO, marketing, and branding",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <span className="text-sm leading-relaxed text-foreground/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Frequently asked questions
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Everything you need to know about working with us.
                </p>
              </div>
            </Reveal>
            <div className="mt-10 space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border/60 bg-card p-5">
                    <h3 className="font-display text-base font-bold text-foreground">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}

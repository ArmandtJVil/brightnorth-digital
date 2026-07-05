import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ContactForm } from "@/components/site/contact-form";
import { JsonLd } from "@/components/site/json-ld";
import { LOCAL_BUSINESS_SCHEMA, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: {
    absolute: "Contact BrightNorth Digital | Free Strategy Session | Digital Agency",
  },
  description:
    "Get in touch with BrightNorth Digital for web development, AI solutions, SEO, digital marketing, branding, and hosting. Book a free 30-minute strategy session or call +1 (555) 010-0123.",
  keywords: [
    "contact brightnorth digital",
    "digital agency contact",
    "free strategy session",
    "web development consultation",
    "SEO consultation",
    "AI solutions consultation",
    "hire digital agency",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact BrightNorth Digital | Free Strategy Session",
    description:
      "Book a free strategy session with BrightNorth Digital. Web, AI, SEO, marketing, branding & hosting.",
    url: "/contact",
    type: "website",
    images: [{ url: "/images/contact-consultant.png", width: 1344, height: 768, alt: "BrightNorth Digital consultant guiding business owners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact BrightNorth Digital | Free Strategy Session",
    description: "Book a free strategy session with BrightNorth Digital.",
    images: ["/images/contact-consultant.png"],
  },
};

const contactInfo = [
  { icon: Phone, label: "Call us", value: "+1 (555) 010-0123", href: "tel:+15550100123" },
  { icon: Mail, label: "Email us", value: "hello@brightnorthdigital.com", href: "mailto:hello@brightnorthdigital.com" },
  { icon: MapPin, label: "Visit us", value: "120 Market Street, Suite 400, San Francisco, CA", href: "#map" },
  { icon: Clock, label: "Business hours", value: "Mon–Fri, 8:00 AM – 6:00 PM PT", href: undefined },
];

const faqs = [
  { q: "How quickly will you respond to my inquiry?", a: "We respond to all inquiries within one business day — usually much faster. If you submit the contact form during business hours (Mon–Fri, 8 AM – 6 PM PT), you'll typically hear back within 2 hours. For urgent matters, call us directly at +1 (555) 010-0123." },
  { q: "What happens in a free strategy session?", a: "Your free 30-minute strategy session is a no-obligation conversation with a senior strategist. We'll discuss your business goals, current challenges, timeline, and budget. You'll leave with actionable recommendations — whether or not we end up working together. There's no pressure and no sales pitch." },
  { q: "Do you work with clients outside the United States?", a: "Yes. While we're headquartered in San Francisco, we serve clients across North America, Europe, and beyond. We have experience delivering remote-first engagements across multiple time zones and can adapt our communication cadence to your location." },
  { q: "What information should I include in my message?", a: "The more context you provide, the more productive our first conversation will be. Helpful details include: your business and industry, what you're looking to achieve, your current website or digital presence, your timeline, and an approximate budget range. But don't worry if you're not sure yet — we can help you figure it out." },
  { q: "Can I schedule a call instead of emailing?", a: "Absolutely. You can call us directly at +1 (555) 010-0123 during business hours, or submit the contact form with your preferred times and we'll schedule a call at your convenience. Many clients prefer a scheduled call so we can prepare relevant examples and ideas in advance." },
];

export default function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);
  const faqSchema = buildFaqSchema(faqs);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd id="ld-localbusiness" schema={LOCAL_BUSINESS_SCHEMA} />
      <JsonLd id="ld-breadcrumb" schema={breadcrumbSchema} />
      <JsonLd id="ld-faq" schema={faqSchema} />

      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[1140px] px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
          <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li className="text-border">/</li>
            <li className="font-semibold text-foreground">Contact</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-40 -top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(0,46,109,0.16),transparent_60%)] blur-2xl" />
            <div className="absolute -right-32 top-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.16),transparent_60%)] blur-2xl" />
          </div>
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ffd9a3]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Get In Touch
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Let's build your <span className="text-gradient-brand">next big thing</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Book a free, no-obligation 30-minute strategy session. Tell us where you want to go — we'll
              show you how to get there. Whether you need a new website, AI automation, SEO, or a full
              digital growth strategy, we're ready to help.
            </p>
          </div>
        </section>

        {/* Contact info cards */}
        <section className="pb-8">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.06}>
                  <a
                    href={c.href ?? undefined}
                    className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-brand/40 hover:shadow-soft"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform group-hover:scale-110">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[0.68rem] font-bold uppercase tracking-wide text-muted-foreground">{c.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{c.value}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Form + image */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
              {/* Left: image + live chat */}
              <div className="space-y-6">
                <Reveal direction="right">
                  <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-soft">
                    <img
                      src="/images/contact-consultant.png"
                      alt="BrightNorth Digital consultant guiding business owners through a strategy discussion in a bright modern office"
                      className="aspect-[16/10] w-full object-cover"
                      width={1344}
                      height={768}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl glass p-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-brand">
                        <MessageSquare className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-foreground">Live Chat & AI Assistant</p>
                        <p className="text-xs text-muted-foreground">Average response time: under 2 minutes</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="rounded-3xl border border-border/60 bg-card p-6">
                    <h3 className="font-display text-lg font-bold text-foreground">Prefer to talk directly?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Call us during business hours and you'll reach a real person — not a menu.
                    </p>
                    <a
                      href="tel:+15550100123"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-foreground/90"
                    >
                      <Phone className="h-4 w-4" /> +1 (555) 010-0123
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Right: form */}
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground">Send us a message</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Fill out the form below and a strategist will reach out within one business day.
                  </p>
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Map */}
        <section id="map" className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
                <iframe
                  title="BrightNorth Digital office location map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-122.42%2C37.76%2C-122.39%2C37.79&layer=mapnik&marker=37.7749%2C-122.4194"
                  className="h-80 w-full border-0 grayscale-[0.2]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* SEO content */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Partner with a digital agency that <span className="text-gradient-brand">delivers</span>
              </h2>
            </Reveal>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <Reveal delay={0.05}>
                <p>
                  Choosing the right digital partner is one of the most important decisions you'll make for
                  your business. The right agency doesn't just build a website or run a campaign — it becomes
                  an extension of your team, invested in your long-term growth and accountable for real results.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  At BrightNorth Digital, we've spent over a decade helping businesses across 17+ industries
                  navigate the digital landscape. From launching new brands to modernizing legacy systems,
                  implementing AI automation to scaling organic search traffic, we bring senior expertise and
                  measurable strategy to every engagement. When you contact us, you're not getting a sales
                  pitch — you're getting a genuine consultation with a specialist who wants to understand
                  your business.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Every project starts with a free, no-obligation strategy session. We'll discuss your goals,
                  your challenges, and your timeline, then provide honest recommendations — even if that means
                  recommending an approach different from what you initially had in mind. We'd rather build
                  trust than close a deal, which is why 98% of our clients stay with us year after year.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Ready to get started? Fill out the form above, call us at +1 (555) 010-0123, or use the live
                  chat in the bottom-right corner to talk to North, our AI assistant. However you reach out,
                  you'll hear back from a real human within one business day. Let's build something exceptional
                  together.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/20 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center">
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Contact FAQs
                </h2>
                <p className="mt-3 text-muted-foreground">Quick answers before you reach out.</p>
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

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0a1830] to-[#060d1a] p-8 text-center shadow-navy sm:p-12">
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
                <div className="pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.25),transparent_60%)] blur-3xl" />
                <div className="relative">
                  <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                    Still have questions?
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-base text-white/70">
                    Our team is ready to help. Book your free strategy session today — no pressure, no jargon, just a clear plan for growth.
                  </p>
                  <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3 text-base font-bold text-brand-foreground shadow-brand transition-colors hover:bg-brand/90 sm:w-auto">
                      Book Free Session <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a href="tel:+15550100123" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-7 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto">
                      <Phone className="h-4 w-4" /> Call Now
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

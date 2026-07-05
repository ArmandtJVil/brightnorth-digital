import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { LOCAL_BUSINESS_SCHEMA } from "@/lib/schema";
import { serviceDetails } from "@/lib/services-content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    absolute: "Digital Agency Services | Web, AI, SEO, Marketing & Branding | BrightNorth Digital",
  },
  description:
    "Explore BrightNorth Digital's full-service capabilities: web development, SEO, digital marketing, AI solutions, branding, and managed hosting. Tailored digital services that drive measurable growth.",
  keywords: [
    "digital agency services",
    "web development services",
    "SEO services",
    "digital marketing services",
    "AI solutions",
    "branding services",
    "managed hosting",
    "digital consulting",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Digital Agency Services | BrightNorth Digital",
    description:
      "Full-service digital capabilities: web development, AI solutions, SEO, digital marketing, branding, and managed hosting.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Agency Services | BrightNorth Digital",
    description:
      "Web, AI, SEO, marketing, branding & hosting — tailored digital services that drive measurable growth.",
  },
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* LocalBusiness schema — injected dynamically into <head> (Organization is site-wide via root layout) */}
      <JsonLd id="ld-localbusiness" schema={LOCAL_BUSINESS_SCHEMA} />

      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 lg:pt-40 lg:pb-16">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(0,46,109,0.16),transparent_60%)] blur-2xl" />
            <div className="absolute -right-32 top-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,138,0,0.18),transparent_60%)] blur-2xl" />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b opacity-50" />

          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7a3d00] dark:text-[#ffcf8d]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Our Services
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Everything you need to <span className="text-gradient-brand">grow online</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              BrightNorth Digital is a full-service digital agency. From high-performance websites and
              AI-powered automation to SEO, marketing, branding, and managed hosting — we deliver
              integrated solutions engineered for measurable business growth.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-base font-semibold text-brand-foreground shadow-brand transition-colors hover:bg-brand/90 sm:w-auto"
              >
                Book a Free Strategy Session
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-foreground/20 px-6 py-3 text-base font-semibold transition-colors hover:bg-accent sm:w-auto"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceDetails.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-navy"
                >
                  <div
                    className={cn(
                      'pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30',
                      service.gradient,
                    )}
                  />
                  <div className="relative flex flex-1 flex-col">
                    <div
                      className={cn(
                        'inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
                        service.gradient,
                      )}
                    >
                      <service.icon className="h-7 w-7" />
                    </div>
                    <h2 className="mt-5 font-display text-xl font-bold text-foreground">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.tagline}
                    </p>
                    <ul className="mt-5 space-y-1.5">
                      {service.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                          <Check className="h-3.5 w-3.5 shrink-0 text-brand" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2.5">
                      Explore service
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-brand to-[#ffb347] transition-all duration-500 group-hover:w-full" />
                </Link>
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

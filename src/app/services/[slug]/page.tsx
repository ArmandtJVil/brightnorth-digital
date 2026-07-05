import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight, Check, ChevronRight, Home, Sparkles,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import {
  buildServiceSchema, buildFaqSchema, buildBreadcrumbSchema,
} from "@/lib/schema";
import { serviceDetails, getServiceBySlug, serviceSlugs } from "@/lib/services-content";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = getServiceBySlug(slug);
    if (!service) {
      return { title: "Service Not Found" };
    }
    return {
      title: { absolute: service.metaTitle },
      description: service.metaDescription,
      keywords: service.keywords,
      alternates: { canonical: `/services/${service.slug}` },
      openGraph: {
        title: service.metaTitle,
        description: service.metaDescription,
        url: `/services/${service.slug}`,
        type: "article",
        images: [{ url: service.image, width: 1344, height: 768, alt: service.name }],
      },
      twitter: {
        card: "summary_large_image",
        title: service.metaTitle,
        description: service.metaDescription,
        images: [service.image],
      },
    } as Metadata;
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const serviceSchema = buildServiceSchema({
    name: service.name,
    description: service.tagline,
    slug: service.slug,
    image: service.image,
  });
  const faqSchema = buildFaqSchema(service.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.shortName, url: `/services/${service.slug}` },
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Dynamically injected JSON-LD schemas */}
      <JsonLd id="ld-service" schema={serviceSchema} />
      <JsonLd id="ld-faq" schema={faqSchema} />
      <JsonLd id="ld-breadcrumb" schema={breadcrumbSchema} />

      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[1140px] px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="inline-flex items-center gap-1 hover:text-foreground">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li className="font-semibold text-foreground">{service.shortName}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden py-10 sm:py-14">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className={cn('absolute -right-32 -top-20 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br opacity-10 blur-3xl', service.gradient)} />
          </div>
          <div className="mx-auto grid max-w-[1140px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7a3d00] dark:text-[#ffcf8d]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {service.shortName}
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                {service.heroHeadline}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {service.heroSubhead}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-base font-semibold text-brand-foreground shadow-brand transition-colors hover:bg-brand/90 sm:w-auto"
                >
                  Get a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-foreground/20 px-6 py-3 text-base font-semibold transition-colors hover:bg-accent sm:w-auto"
                >
                  Estimate Cost
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className={cn('absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br opacity-20 blur-2xl', service.gradient)} />
              <div className="overflow-hidden rounded-3xl border border-border/60 shadow-navy">
                <img
                  src={service.image}
                  alt={`${service.name} — BrightNorth Digital`}
                  className="aspect-[16/10] w-full object-cover"
                  width={1344}
                  height={768}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Intro + Long-form content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="font-display text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
              {service.intro}
            </p>
            <div className="mt-10 space-y-10">
              {service.sections.map((section) => (
                <article key={section.heading}>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((para, i) => (
                      <p key={i} className="text-base leading-relaxed text-muted-foreground">
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why choose our <span className="text-gradient-brand">{service.shortName}</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Real business outcomes, not just deliverables.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((b) => (
                <div key={b.title} className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-brand/40 hover:shadow-soft">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Check className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-bold text-foreground">{b.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features + Process */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Features */}
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Capabilities included
                </h2>
                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Process */}
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  How we work
                </h2>
                <div className="mt-6 space-y-5">
                  {service.process.map((p) => (
                    <div key={p.step} className="flex gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#002e6d] to-[#0a4a9c] font-display text-sm font-bold text-white shadow-navy">
                        {p.step}
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-foreground">{p.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#7a3d00] dark:text-[#ffcf8d]">
                <Sparkles className="h-3.5 w-3.5" /> FAQ
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {service.shortName} questions, answered
              </h2>
              <p className="mt-3 text-muted-foreground">
                Everything you need to know. Still curious? <Link href="/#contact" className="font-semibold text-brand hover:underline">Ask us directly</Link>.
              </p>
            </div>
            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border/60 bg-card px-5 data-[state=open]:border-brand/40">
                  <AccordionTrigger className="text-left font-display text-base font-bold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Related services */}
        {related.length > 0 && (
          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Related services
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-brand/40 hover:shadow-soft"
                  >
                    <span className={cn('inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-110', r.gradient)}>
                      <r.icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-bold text-foreground">{r.shortName}</h3>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{r.tagline}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}

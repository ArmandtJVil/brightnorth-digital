import type { Metadata } from "next";
import Link from "next/link";
import { Clock, CalendarDays, ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    absolute: "Digital Marketing, SEO, AI & Web Dev Blog | BrightNorth Digital",
  },
  description:
    "Practical, jargon-free insights on web development, SEO, digital marketing, AI, automation, and business growth — written by the BrightNorth Digital team. Read the latest strategies that drive results.",
  keywords: [
    "digital marketing blog",
    "SEO blog",
    "web development blog",
    "AI solutions blog",
    "automation blog",
    "business growth blog",
    "digital agency insights",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "BrightNorth Digital Blog | Web, AI, SEO & Marketing Insights",
    description:
      "Practical insights on web development, SEO, digital marketing, AI, and growth — written by practitioners.",
    url: "/blog",
    type: "website",
    images: [{ url: "/images/blog-header.png", width: 1344, height: 768, alt: "BrightNorth Digital knowledge center and content creation desk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrightNorth Digital Blog | Web, AI, SEO & Marketing Insights",
    description: "Practical insights on web development, SEO, digital marketing, AI, and growth.",
    images: ["/images/blog-header.png"],
  },
};

const categoryGradients: Record<string, string> = {
  'Web Development': 'from-[#002e6d] to-[#0a4a9c]',
  'SEO': 'from-[#ff8a00] to-[#ffb347]',
  'Digital Marketing': 'from-[#17a398] to-[#2dd4bf]',
  'Artificial Intelligence': 'from-[#6d4aff] to-[#9b7bff]',
  'Automation': 'from-[#f0b429] to-[#fbbf24]',
  'Business Growth': 'from-[#0c1b33] to-[#2b3e5f]',
};

function gradientFor(category: string) {
  return categoryGradients[category] || 'from-[#002e6d] to-[#ff8a00]';
}

function formatDate(d: Date | null) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const faqs = [
  { q: "What topics does the BrightNorth Digital blog cover?", a: "Our blog covers web development, search engine optimization (SEO), digital marketing, artificial intelligence, business automation, branding, cybersecurity, business growth, eCommerce, and industry insights. Every article is written by senior practitioners who do the work, not content writers guessing at trends." },
  { q: "How often do you publish new articles?", a: "We publish new articles weekly, typically on Tuesdays and Thursdays. Subscribe to our newsletter to get notified when new content goes live — and to receive exclusive insights we don't publish on the blog." },
  { q: "Are these articles written by experts or AI?", a: "Every article is written by a senior specialist in the relevant discipline — a real engineer, SEO strategist, marketer, or designer. We may use AI tools to assist with research and outlining, but the analysis, recommendations, and expertise are entirely human. We stand behind every word." },
  { q: "Can I use these strategies for my own business?", a: "Absolutely. Our articles are designed to be practical and actionable — we share the exact strategies we use for clients so you can apply them yourself. If you'd rather have us implement them for you, that's what we're here for. But there's no gatekeeping: the insights are free." },
];

export default async function BlogPage() {
  let posts: Array<{
    id: string; slug: string; title: string; excerpt: string; category: string;
    tags: string; readingTime: number; author: string; publishedAt: Date | null; featured: boolean;
  }> = [];

  try {
    posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true, slug: true, title: true, excerpt: true, category: true,
        tags: true, readingTime: true, author: true, publishedAt: true, featured: true,
      },
    });
  } catch (err) {
    console.error("[/blog] Failed to load posts:", err);
  }

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.id !== featured?.id);
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
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
            <li className="font-semibold text-foreground">Blog</li>
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
              <Sparkles className="h-3.5 w-3.5" />
              Knowledge Center
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Insights from the <span className="text-gradient-brand">BrightNorth team</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Practical, jargon-free articles on web development, SEO, AI, marketing, and growth —
              written by the people who do the work. No fluff, no gatekeeping, just strategies that
              actually drive results.
            </p>
          </div>
        </section>

        {/* Header image */}
        <section className="pb-12">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
                <img
                  src="/images/blog-header.png"
                  alt="BrightNorth Digital content editor's desk with monitor showing a blog article, notebook, coffee, and marketing books"
                  className="aspect-[21/8] w-full object-cover"
                  width={1344}
                  height={768}
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Category filter */}
        <section className="pb-8">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background">
                All Articles
              </span>
              {categories.map((c) => (
                <Link
                  key={c}
                  href={`/blog?category=${encodeURIComponent(c)}`}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured post */}
        {featured && (
          <section className="pb-12">
            <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
              <Reveal>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-brand/40 hover:shadow-navy"
                >
                  <div className="grid lg:grid-cols-2">
                    <div className={cn('relative h-56 overflow-hidden bg-gradient-to-br lg:h-full', gradientFor(featured.category))}>
                      <div className="absolute inset-0 bg-grid opacity-20" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#0c1b33]">
                        Featured · {featured.category}
                      </span>
                    </div>
                    <div className="p-6 sm:p-8">
                      <h2 className="font-display text-2xl font-bold leading-snug text-foreground group-hover:text-brand transition-colors">
                        {featured.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-4">{featured.excerpt}</p>
                      <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground/80">{featured.author}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readingTime} min read</span>
                        <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {formatDate(featured.publishedAt)}</span>
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2.5">
                        Read article <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          </section>
        )}

        {/* Post grid */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            {rest.length > 0 && (
              <>
                <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Latest articles</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <Reveal key={post.id} delay={i * 0.06}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft"
                      >
                        <div className={cn('relative h-36 overflow-hidden bg-gradient-to-br', gradientFor(post.category))}>
                          <div className="absolute inset-0 bg-grid opacity-20" />
                          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.62rem] font-bold text-[#0c1b33]">
                            {post.category}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-display text-base font-bold leading-snug text-foreground group-hover:text-brand transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{post.excerpt}</p>
                          <div className="mt-auto flex items-center gap-3 pt-4 text-[0.68rem] text-muted-foreground">
                            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readingTime} min</span>
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* SEO content */}
        <section className="bg-muted/20 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Insights that <span className="text-gradient-brand">move the needle</span>
              </h2>
            </Reveal>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <Reveal delay={0.05}>
                <p>
                  The digital landscape moves fast. New frameworks, algorithm updates, AI tools, and marketing
                  channels emerge constantly — and separating signal from noise is harder than ever. Our blog
                  exists to help you cut through the hype and focus on what actually drives results.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Every article we publish is written by a senior practitioner — an engineer who ships code, an
                  SEO strategist who ranks sites, a marketer who manages real ad spend, or a designer who builds
                  real brands. We share the exact strategies, frameworks, and tactics we use for our clients,
                  grounded in real-world experience rather than theory.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Whether you're a founder looking to understand what it takes to build a high-performing website,
                  a marketing leader exploring AI automation, or a business owner trying to improve your search
                  rankings, you'll find practical, actionable guidance here. No fluff, no gatekeeping, no
                  recycled advice — just the insights we wish we'd had when we started.
                </p>
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
                  Blog FAQs
                </h2>
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
      </main>
      <Footer />
    </div>
  );
}

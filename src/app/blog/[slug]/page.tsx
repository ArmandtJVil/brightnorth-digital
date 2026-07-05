import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, CalendarDays, ArrowLeft, ArrowRight, ChevronRight, Home } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

function formatDate(d: Date | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post = null;
  try {
    post = await db.blogPost.findUnique({
      where: { slug },
      select: { title: true, excerpt: true, category: true, tags: true, slug: true },
    });
  } catch {
    return { title: "Article Not Found" };
  }

  if (!post) return { title: "Article Not Found" };

  const title = `${post.title} | BrightNorth Digital`;
  const description = post.excerpt;

  return {
    title: { absolute: title },
    description,
    keywords: post.tags ? post.tags.split(",").map((t) => t.trim()) : [],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      tags: post.tags ? post.tags.split(",").map((t) => t.trim()) : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = null;
  let related: Array<{ slug: string; title: string; excerpt: string; category: string; readingTime: number; publishedAt: Date | null }> = [];

  try {
    post = await db.blogPost.findUnique({ where: { slug } });
    if (post) {
      const rel = await db.blogPost.findMany({
        where: { published: true, slug: { not: slug }, category: post.category },
        orderBy: { publishedAt: "desc" },
        take: 3,
        select: { slug: true, title: true, excerpt: true, category: true, readingTime: true, publishedAt: true },
      });
      related = rel;
    }
  } catch (err) {
    console.error("[/blog/[slug]] Failed to load post:", err);
  }

  if (!post) notFound();

  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const paragraphs = String(post.content || "").split("\n").filter(Boolean);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title.slice(0, 50), url: `/blog/${post.slug}` },
  ]);

  // Build FAQ schema from content if there are Q/A patterns, else a simple Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'BrightNorth Digital',
      logo: { '@type': 'ImageObject', url: 'https://brightnorthdigital.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://brightnorthdigital.com/blog/${post.slug}` },
    keywords: tags.join(', '),
    articleSection: post.category,
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd id="ld-breadcrumb" schema={breadcrumbSchema} />
      <JsonLd id="ld-article" schema={articleSchema} />

      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <li><Link href="/" className="inline-flex items-center gap-1 hover:text-foreground"><Home className="h-3.5 w-3.5" /> Home</Link></li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li className="font-semibold text-foreground line-clamp-1">{post.category}</li>
          </ol>
        </nav>

        {/* Header */}
        <article className="pt-8 sm:pt-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <span className={cn('inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white', gradientFor(post.category))}>
              {post.category}
            </span>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border py-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/80">{post.author}</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {formatDate(post.publishedAt)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readingTime} min read</span>
            </div>
          </div>

          {/* Body */}
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
              {paragraphs.map((para, i) => {
                const isHeading = para.startsWith('#');
                const text = para.replace(/^#+\s*/, '');
                if (isHeading) {
                  return <h2 key={i} className="font-display text-2xl font-bold text-foreground sm:text-3xl">{text}</h2>;
                }
                return <p key={i}>{para}</p>;
              })}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
                {tags.map((t) => (
                  <span key={t} className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Back link */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all hover:gap-2.5"
              >
                <ArrowLeft className="h-4 w-4" /> Back to all articles
              </Link>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="border-t border-border bg-muted/20 py-16 sm:py-20">
            <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Related articles</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft"
                  >
                    <div className={cn('relative h-28 overflow-hidden bg-gradient-to-br', gradientFor(r.category))}>
                      <div className="absolute inset-0 bg-grid opacity-20" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.62rem] font-bold text-[#0c1b33]">
                        {r.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-sm font-bold leading-snug text-foreground group-hover:text-brand transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{r.excerpt}</p>
                      <div className="mt-auto flex items-center gap-3 pt-3 text-[0.68rem] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {r.readingTime} min</span>
                        <span>{formatDate(r.publishedAt)}</span>
                      </div>
                    </div>
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

import { db } from "@/lib/db";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Industries } from "@/components/site/industries";
import { Process } from "@/components/site/process";
import { Portfolio, type PortfolioProject } from "@/components/site/portfolio";
import { AiSolutions } from "@/components/site/ai-solutions";
import { Testimonials, type Testimonial } from "@/components/site/testimonials";
import { Pricing } from "@/components/site/pricing";
import { Blog, type BlogPost } from "@/components/site/blog";
import { CtaBand } from "@/components/site/cta-band";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { LOCAL_BUSINESS_SCHEMA, buildFaqSchema } from "@/lib/schema";

const homepageFaqs = [
  { q: "What services does BrightNorth Digital offer?", a: "BrightNorth Digital is a full-service digital agency offering web development, search engine optimization (SEO), digital marketing, artificial intelligence solutions, branding and graphic design, managed hosting and website care, and digital consulting. We serve businesses from startups to enterprise across 17+ industries." },
  { q: "How much does a website or digital project cost?", a: "Project pricing depends on scope, features, and integrations. Marketing websites typically start at $3,500, custom web applications range higher, and ongoing services like SEO and hosting are billed monthly. Use our interactive pricing calculator for a real-time estimate, or book a free strategy session for a tailored quote." },
  { q: "How long does a project take?", a: "A focused marketing website takes 6-10 weeks, SEO results compound over 3-6 months, and AI solutions typically launch in 4-12 weeks depending on complexity. We provide detailed timelines after a discovery call and work in agile sprints so you see progress weekly." },
  { q: "Do you work with businesses outside the United States?", a: "Yes. While we're headquartered in San Francisco, California, we serve clients worldwide and have experience delivering remote-first engagements across multiple time zones." },
  { q: "Do you optimize for AI search engines like ChatGPT and Perplexity?", a: "Absolutely. Our SEO methodology includes AI-search optimization so your brand is cited in AI-generated answers across Google AI Overviews, ChatGPT, Perplexity, and Gemini — not just traditional search rankings." },
  { q: "How do I get started?", a: "Book a free, no-obligation 30-minute strategy session through our contact form. We'll discuss your goals, challenges, and timeline, then recommend the best path forward — whether that's a specific project or an ongoing partnership." },
];

async function getData() {
  try {
    const [projects, testimonials, posts] = await Promise.all([
      db.portfolioProject.findMany({
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: 8,
      }),
      db.testimonial.findMany({
        where: { approved: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: 8,
      }),
      db.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 7,
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          category: true,
          tags: true,
          coverImage: true,
          readingTime: true,
          author: true,
          publishedAt: true,
          featured: true,
        },
      }),
    ]);

    const serializedProjects: PortfolioProject[] = projects.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      client: p.client,
      industry: p.industry,
      services: p.services ? p.services.split(",").map((s) => s.trim()).filter(Boolean) : [],
      technologies: p.technologies ? p.technologies.split(",").map((s) => s.trim()).filter(Boolean) : [],
      overview: p.overview,
      outcomes: safeParseArray(p.outcomes),
      beforeMetric: p.beforeMetric,
      afterMetric: p.afterMetric,
      featured: p.featured,
    }));

    const serializedTestimonials: Testimonial[] = testimonials.map((t) => ({
      id: t.id,
      authorName: t.authorName,
      authorRole: t.authorRole,
      company: t.company,
      content: t.content,
      rating: t.rating,
      industry: t.industry,
      service: t.service,
      featured: t.featured,
    }));

    const serializedPosts: BlogPost[] = posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      tags: p.tags ? p.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      coverImage: p.coverImage,
      readingTime: p.readingTime,
      author: p.author,
      publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
      featured: p.featured,
    }));

    return { projects: serializedProjects, testimonials: serializedTestimonials, posts: serializedPosts };
  } catch (err) {
    console.error("[page] Failed to load data:", err);
    return { projects: [], testimonials: [], posts: [] };
  }
}

function safeParseArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const { projects, testimonials, posts } = await getData();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* LocalBusiness + homepage FAQ schema — injected dynamically into <head> */}
      <JsonLd id="ld-localbusiness" schema={LOCAL_BUSINESS_SCHEMA} />
      <JsonLd id="ld-faq-home" schema={buildFaqSchema(homepageFaqs)} />

      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Industries />
        <Process />
        {projects.length > 0 && <Portfolio projects={projects} />}
        <AiSolutions />
        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        <Pricing />
        {posts.length > 0 && <Blog posts={posts} />}
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

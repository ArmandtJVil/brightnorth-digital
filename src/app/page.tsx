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

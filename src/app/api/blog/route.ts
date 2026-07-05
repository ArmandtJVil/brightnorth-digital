import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Returns a list of published blog posts, newest first.
 * Full `content` is excluded for the list view (performance).
 *
 * Optional query params:
 *   ?category=<string>   filter by category (case-insensitive contains)
 *   ?featured=true       only featured posts
 *   ?limit=<number>      cap the number of posts (default 50, max 100)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featuredOnly = searchParams.get("featured") === "true";
    const limitParam = Number.parseInt(searchParams.get("limit") ?? "50", 10);
    const limit = Number.isFinite(limitParam)
      ? Math.min(Math.max(limitParam, 1), 100)
      : 50;

    const where: {
      published?: boolean;
      featured?: boolean;
      category?: { contains: string };
    } = {
      published: true,
    };
    if (featuredOnly) where.featured = true;
    if (category) where.category = { contains: category };

    const posts = await db.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: limit,
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
    });

    const serialized = posts.map((p) => ({
      ...p,
      tags: p.tags ? p.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    }));

    return NextResponse.json({ success: true, posts: serialized });
  } catch (err) {
    console.error("[/api/blog] Failed to fetch posts:", err);
    return NextResponse.json(
      { success: false, message: "Unable to load blog posts right now." },
      { status: 500 }
    );
  }
}

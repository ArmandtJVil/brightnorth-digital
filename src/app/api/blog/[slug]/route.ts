import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Returns a single published blog post by slug, including full content.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await db.blogPost.findUnique({
      where: { slug },
    });

    if (!post || !post.published) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 }
      );
    }

    const serialized = {
      ...post,
      tags: post.tags
        ? post.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };

    return NextResponse.json({ success: true, post: serialized });
  } catch (err) {
    console.error("[/api/blog/[slug]] Failed to fetch post:", err);
    return NextResponse.json(
      { success: false, message: "Unable to load this post right now." },
      { status: 500 }
    );
  }
}

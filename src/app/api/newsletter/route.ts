import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  source: z.string().max(60).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = NewsletterSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      { success: false, message: firstError?.message ?? "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const email = parsed.data.email.trim().toLowerCase();
  const source = parsed.data.source?.trim() || "website";

  try {
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing && existing.active) {
      return NextResponse.json(
        {
          success: false,
          message: "You're already on our list — thanks for being a subscriber!",
        },
        { status: 409 }
      );
    }

    if (existing && !existing.active) {
      await db.newsletterSubscriber.update({
        where: { email },
        data: { active: true, source, subscribedAt: new Date() },
      });
      return NextResponse.json(
        { success: true, message: "Welcome back! You've been resubscribed." },
        { status: 200 }
      );
    }

    await db.newsletterSubscriber.create({
      data: { email, source, active: true },
    });

    return NextResponse.json(
      { success: true, message: "Thanks for subscribing! Check your inbox to confirm." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/newsletter] Failed to subscribe:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong while subscribing. Please try again." },
      { status: 500 }
    );
  }
}

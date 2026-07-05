import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  budget: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10, "Please share a few details about your project."),
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

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      {
        success: false,
        message: firstError?.message ?? "Please check the form and try again.",
        errors: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })),
      },
      { status: 400 }
    );
  }

  const data = parsed.data;
  try {
    const record = await db.contactSubmission.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || null,
        company: data.company?.trim() || null,
        service: data.service?.trim() || null,
        budget: data.budget?.trim() || null,
        message: data.message.trim(),
        status: "new",
      },
    });

    return NextResponse.json(
      { success: true, id: record.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/contact] Failed to save submission:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong while submitting your message. Please try again." },
      { status: 500 }
    );
  }
}

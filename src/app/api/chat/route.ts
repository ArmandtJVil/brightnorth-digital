import { NextResponse } from "next/server";
import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";

/**
 * AI Chatbot endpoint for BrightNorth Digital.
 *
 * Uses z-ai-web-dev-sdk (server-side only) to power a conversational
 * assistant that helps website visitors with questions about services,
 * pricing, process, and how to get started.
 *
 * Conversation history is sent from the client and replayed here so the
 * model maintains context within a session.
 */

const SYSTEM_PROMPT = `You are North, the AI assistant for BrightNorth Digital — a full-service digital agency specializing in Web Development, Search Engine Optimization (SEO), Digital Marketing, Artificial Intelligence Solutions, Branding & Graphic Design, Hosting & Website Care, and Digital Consulting.

Your role is to help website visitors by answering questions about BrightNorth Digital's services, process, pricing, and how the agency can help their business grow.

Key facts about BrightNorth Digital:
- Tagline: "Build Smarter. Market Better. Grow Faster."
- Headquartered at 120 Market Street, Suite 400, San Francisco, CA
- Contact: hello@brightnorthdigital.com, +1 (555) 010-0123
- Business hours: Monday–Friday, 8:00 AM – 6:00 PM PT
- Serves businesses from startups to enterprise across 17+ industries
- Trusted by 240+ businesses with 98% client retention and 4.2x average ROI in year 1
- 12+ years building digital products

Services and typical starting investment:
- Web Development: custom, fast, accessible websites. Projects from ~$3,500 (focused site) to $100k+ (complex apps).
- SEO: technical SEO, content, link building, AI-search optimization (ChatGPT, Perplexity, Google AI Overviews). Results compound over 3–6 months.
- Digital Marketing: PPC, content, email, social, CRO. Paid media budgets typically start at $3,000–$5,000/month.
- AI Solutions: AI chatbots, assistants, workflow automation, predictive analytics. Chatbots from ~$4,500.
- Branding & Graphic Design: logo, identity, guidelines. From ~$2,500 (logo) to $9,500+ (full strategy).
- Hosting & Website Care: managed hosting, security, backups, performance. Plans from $90/month.

Process: Discovery → Strategy → Design → Development → Growth.

Guidelines:
- Be warm, concise, and genuinely helpful. Write in a professional but friendly tone.
- Keep answers short — usually 2–4 sentences. Use bullet points only when listing services or steps.
- When a visitor asks about cost, give the typical ranges above and invite them to use the pricing calculator or book a free strategy session.
- When a visitor seems ready to talk to a human or book, encourage them to use the contact form or book a free strategy session.
- If you don't know something specific, say so honestly and offer to connect them with the team.
- Never make up case studies, client names, or guarantees. Focus on typical outcomes and ranges.
- Do not discuss competitors. Stay focused on how BrightNorth Digital can help.
- Respond in the same language the visitor uses.`;

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const ChatSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
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

  const parsed = ChatSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      { success: false, message: firstError?.message ?? "Invalid messages." },
      { status: 400 }
    );
  }

  try {
    const zai = await ZAI.create();

    const messages = [
      { role: "assistant" as const, content: SYSTEM_PROMPT },
      ...parsed.data.messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: "disabled" },
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "I'm sorry, I couldn't generate a response just now. Could you rephrase that, or feel free to contact our team directly at hello@brightnorthdigital.com.";

    return NextResponse.json({ success: true, reply });
  } catch (err) {
    console.error("[/api/chat] Error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "I'm having trouble connecting right now. Please try again in a moment, or reach us at hello@brightnorthdigital.com.",
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/**
 * Pricing model — base prices per service (USD).
 *
 * Each service has a base price plus option-driven modifiers. The final
 * estimate is presented as a range: a low estimate (90% of computed total,
 * rounded) and a high estimate (115% of computed total, rounded). The
 * midpoint (`estimatedPrice`) is what we persist on the PricingRequest.
 */
const SERVICE_BASE_PRICES: Record<string, number> = {
  "web-development": 9500,
  seo: 3500,
  "digital-marketing": 4000,
  "ai-solutions": 7500,
  branding: 4800,
  hosting: 1800,
};

const WEBSITE_SIZE_MODIFIERS: Record<string, number> = {
  starter: 0, // 1–5 pages, no custom functionality
  standard: 3500, // 6–15 pages, blog/CMS
  advanced: 9000, // 16+ pages, integrations, custom post types
  enterprise: 18000, // large or multi-site, integrations, custom apps
};

const SEO_PACKAGE_MODIFIERS: Record<string, number> = {
  none: 0,
  starter: 1500, // local SEO + on-page basics
  growth: 3500, // ongoing technical + content
  authority: 6500, // full program with link building
};

const AI_INTEGRATIONS_MODIFIERS: Record<string, number> = {
  none: 0,
  chatbot: 4500, // standalone AI chatbot
  assistant: 7000, // AI assistant wired into your data
  custom: 14000, // bespoke model + workflow automation
};

const HOSTING_MODIFIERS: Record<string, number> = {
  none: 0,
  standard: 90, // per month
  performance: 190, // per month
  enterprise: 450, // per month
};

const BRANDING_MODIFIERS: Record<string, number> = {
  none: 0,
  starter: 2500, // logo + brand basics
  complete: 5500, // full visual identity + guidelines
  strategy: 9500, // positioning + naming + identity
};

const MAINTENANCE_MODIFIERS: Record<string, number> = {
  none: 0,
  essential: 150, // per month
  professional: 350, // per month
  premium: 750, // per month
};

const PricingSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(120).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email.").optional().or(z.literal("")),
  services: z
    .array(z.string())
    .min(1, "Please select at least one service.")
    .max(8, "Too many services selected."),
  websiteSize: z.enum(["starter", "standard", "advanced", "enterprise"]).optional(),
  seoPackage: z.enum(["none", "starter", "growth", "authority"]).optional(),
  aiIntegrations: z.enum(["none", "chatbot", "assistant", "custom"]).optional(),
  hosting: z.enum(["none", "standard", "performance", "enterprise"]).optional(),
  branding: z.enum(["none", "starter", "complete", "strategy"]).optional(),
  maintenance: z.enum(["none", "essential", "professional", "premium"]).optional(),
});

type PricingInput = z.infer<typeof PricingSchema>;

interface LineItem {
  label: string;
  amount: number;
  recurring?: boolean;
}

function labelForService(slug: string): string {
  const map: Record<string, string> = {
    "web-development": "Web Development",
    seo: "Search Engine Optimization",
    "digital-marketing": "Digital Marketing",
    "ai-solutions": "AI Solutions",
    branding: "Branding & Graphic Design",
    hosting: "Hosting & Website Care",
  };
  return map[slug] ?? slug;
}

function labelForOption(key: string): string {
  return key
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function buildEstimate(input: PricingInput) {
  const breakdown: LineItem[] = [];

  // Service base prices (one-time)
  for (const slug of input.services) {
    const base = SERVICE_BASE_PRICES[slug];
    if (base !== undefined) {
      breakdown.push({ label: labelForService(slug), amount: base });
    }
  }

  // One-time option modifiers
  if (input.websiteSize && WEBSITE_SIZE_MODIFIERS[input.websiteSize] > 0) {
    breakdown.push({
      label: `Website scope — ${labelForOption(input.websiteSize)}`,
      amount: WEBSITE_SIZE_MODIFIERS[input.websiteSize],
    });
  }
  if (input.seoPackage && SEO_PACKAGE_MODIFIERS[input.seoPackage] > 0) {
    breakdown.push({
      label: `SEO program — ${labelForOption(input.seoPackage)}`,
      amount: SEO_PACKAGE_MODIFIERS[input.seoPackage],
    });
  }
  if (input.aiIntegrations && AI_INTEGRATIONS_MODIFIERS[input.aiIntegrations] > 0) {
    breakdown.push({
      label: `AI integration — ${labelForOption(input.aiIntegrations)}`,
      amount: AI_INTEGRATIONS_MODIFIERS[input.aiIntegrations],
    });
  }
  if (input.branding && BRANDING_MODIFIERS[input.branding] > 0) {
    breakdown.push({
      label: `Branding — ${labelForOption(input.branding)}`,
      amount: BRANDING_MODIFIERS[input.branding],
    });
  }

  // Recurring monthly modifiers
  if (input.hosting && HOSTING_MODIFIERS[input.hosting] > 0) {
    breakdown.push({
      label: `Hosting — ${labelForOption(input.hosting)}`,
      amount: HOSTING_MODIFIERS[input.hosting],
      recurring: true,
    });
  }
  if (input.maintenance && MAINTENANCE_MODIFIERS[input.maintenance] > 0) {
    breakdown.push({
      label: `Maintenance — ${labelForOption(input.maintenance)}`,
      amount: MAINTENANCE_MODIFIERS[input.maintenance],
      recurring: true,
    });
  }

  const oneTime = breakdown
    .filter((b) => !b.recurring)
    .reduce((sum, b) => sum + b.amount, 0);

  const monthly = breakdown
    .filter((b) => b.recurring)
    .reduce((sum, b) => sum + b.amount, 0);

  // Annualise recurring for the headline figure (12 months).
  const annualisedRecurring = monthly * 12;

  const computedTotal = oneTime + annualisedRecurring;
  const lowEstimate = Math.round(computedTotal * 0.9);
  const highEstimate = Math.round(computedTotal * 1.15);
  const estimatedPrice = Math.round((lowEstimate + highEstimate) / 2);

  return {
    breakdown,
    oneTime,
    monthly,
    estimatedPrice,
    lowEstimate,
    highEstimate,
  };
}

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

  const parsed = PricingSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      {
        success: false,
        message: firstError?.message ?? "Please check your selections and try again.",
        errors: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })),
      },
      { status: 400 }
    );
  }

  const input = parsed.data;
  const estimate = buildEstimate(input);

  try {
    // Persist the request (best-effort — we still return the estimate if DB fails).
    await db.pricingRequest.create({
      data: {
        name: input.name?.trim() || "Anonymous",
        email: input.email?.trim().toLowerCase() || "anonymous@example.com",
        services: JSON.stringify(input.services),
        websiteSize: input.websiteSize ?? null,
        seoPackage: input.seoPackage ?? null,
        aiIntegrations: input.aiIntegrations ?? null,
        hosting: input.hosting ?? null,
        branding: input.branding ?? null,
        maintenance: input.maintenance ?? null,
        estimatedPrice: estimate.estimatedPrice,
      },
    });
  } catch (err) {
    console.error("[/api/pricing] Failed to persist pricing request:", err);
    // Non-fatal — still return the computed estimate to the user.
  }

  return NextResponse.json({
    success: true,
    estimatedPrice: estimate.estimatedPrice,
    lowEstimate: estimate.lowEstimate,
    highEstimate: estimate.highEstimate,
    oneTime: estimate.oneTime,
    monthly: estimate.monthly,
    breakdown: estimate.breakdown,
  });
}

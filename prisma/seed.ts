/**
 * BrightNorth Digital — Database seed script.
 *
 * Run with: `bun prisma/seed.ts`
 *
 * Idempotent: uses upsert on unique slugs/emails so re-running the seed
 * refreshes content without producing duplicates.
 */
import { db } from "../src/lib/db";

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

type ServiceSeed = {
  slug: string;
  name: string;
  icon: string;
  shortDesc: string;
  description: string;
  features: string[];
  order: number;
  featured: boolean;
};

const services: ServiceSeed[] = [
  {
    slug: "web-development",
    name: "Web Development",
    icon: "Code2",
    shortDesc:
      "Custom websites engineered for speed, security, accessibility, and conversions.",
    description:
      "We design and build bespoke websites and web applications that load fast, rank well, and convert visitors into customers. From marketing sites to complex headless commerce platforms, every project is engineered with Core Web Vitals, WCAG 2.2 accessibility, and scalable architecture in mind. Our engineering team works in TypeScript, Next.js, and modern headless CMS platforms so your team can update content without developer bottlenecks.",
    features: [
      "Responsive Design",
      "Core Web Vitals",
      "Accessibility WCAG 2.2",
      "Headless CMS",
      "E-commerce",
      "Performance Optimization",
    ],
    order: 1,
    featured: true,
  },
  {
    slug: "seo",
    name: "Search Engine Optimization",
    icon: "Search",
    shortDesc:
      "Ethical, data-driven SEO strategies that improve rankings, increase qualified traffic, and generate sustainable organic growth.",
    description:
      "Our SEO practice blends technical excellence with content strategy and authoritative link building. We begin with a deep technical audit, map keyword demand to your commercial intent, and ship prioritised fixes that move real metrics. Monthly reporting ties rankings, traffic, and revenue together so you can see exactly how organic search contributes to the bottom line.",
    features: [
      "Technical SEO Audits",
      "Keyword Research",
      "On-Page Optimization",
      "Link Building",
      "Local SEO",
      "AI-Search Optimization",
    ],
    order: 2,
    featured: true,
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    icon: "Megaphone",
    shortDesc:
      "Integrated digital marketing including paid ads, content, email, social media, and conversion optimization.",
    description:
      "We run integrated campaigns across paid search, paid social, email, and content channels — all wired into a single measurement framework. Whether you need to fill the pipeline next quarter or build a durable content engine, our strategists, designers, and analysts work as one team to deliver measurable pipeline and revenue growth.",
    features: [
      "Paid Advertising (PPC)",
      "Content Marketing",
      "Email Campaigns",
      "Social Media Management",
      "CRO",
      "Analytics & Reporting",
    ],
    order: 3,
    featured: true,
  },
  {
    slug: "ai-solutions",
    name: "Artificial Intelligence Solutions",
    icon: "BrainCircuit",
    shortDesc:
      "AI-powered solutions that automate tasks, enhance customer experiences, and unlock business insights.",
    description:
      "From AI assistants that deflect 60% of support tickets to predictive models that surface your highest-value leads, we help you deploy AI where it actually moves the needle. We handle data plumbing, model selection, prompt engineering, evaluation, and the human-in-the-loop workflows that keep AI trustworthy in production.",
    features: [
      "AI Chatbots",
      "AI Assistants",
      "Predictive Analytics",
      "Workflow Automation",
      "AI Content",
      "Customer Service AI",
    ],
    order: 4,
    featured: true,
  },
  {
    slug: "branding",
    name: "Branding & Graphic Design",
    icon: "Palette",
    shortDesc:
      "Memorable branding that establishes credibility, builds recognition, and strengthens trust.",
    description:
      "Your brand is the shortcut customers use to decide whether to trust you. We help you build that shortcut deliberately — from positioning and naming to logo systems, visual identity, and brand guidelines that scale across every channel and team member.",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Visual Identity",
      "Social Media Graphics",
      "Marketing Materials",
      "Brand Strategy",
    ],
    order: 5,
    featured: true,
  },
  {
    slug: "hosting",
    name: "Hosting & Website Care",
    icon: "Server",
    shortDesc:
      "Reliable hosting, proactive maintenance, backups, performance optimization, and security monitoring.",
    description:
      "Launch day is day one, not the finish line. Our managed hosting and care plans keep your site fast, secure, and online — with daily backups, uptime SLAs, performance tuning, and a human response team that actually answers when something goes wrong at 2 a.m.",
    features: [
      "Managed Hosting",
      "Daily Backups",
      "Security Monitoring",
      "Performance Tuning",
      "Uptime SLA",
      "24/7 Support",
    ],
    order: 6,
    featured: true,
  },
];

/* -------------------------------------------------------------------------- */
/* Industries                                                                   */
/* -------------------------------------------------------------------------- */

type IndustrySeed = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  order: number;
};

const industries: IndustrySeed[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "HeartPulse",
    description:
      "HIPAA-aware websites, patient portals, and marketing for clinics, dental practices, and allied health providers.",
    order: 1,
  },
  {
    slug: "legal",
    name: "Legal",
    icon: "Scale",
    description:
      "Lead-generating websites and SEO for law firms, with strict attention to bar-compliant messaging.",
    order: 2,
  },
  {
    slug: "retail",
    name: "Retail & eCommerce",
    icon: "ShoppingCart",
    description:
      "Headless commerce, conversion optimization, and omnichannel marketing for retail brands.",
    order: 3,
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: "Factory",
    description:
      "B2B websites, technical SEO, and quote-driven lead capture for manufacturers and distributors.",
    order: 4,
  },
  {
    slug: "construction",
    name: "Construction",
    icon: "HardHat",
    description:
      "Portfolio-driven websites and local SEO for general contractors, builders, and trades.",
    order: 5,
  },
  {
    slug: "education",
    name: "Education",
    icon: "GraduationCap",
    description:
      "Enrollment marketing, learning platforms, and parent communications for schools and ed-tech.",
    order: 6,
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    icon: "UtensilsCrossed",
    description:
      "Direct-booking websites, revenue-focused SEO, and reputation management for hotels and restaurants.",
    order: 7,
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: "Car",
    description:
      "Dealer websites, inventory SEO, and service-lane marketing automation for the auto industry.",
    order: 8,
  },
  {
    slug: "finance",
    name: "Finance",
    icon: "Landmark",
    description:
      "Compliant, conversion-focused websites for fintech, wealth management, and insurance firms.",
    order: 9,
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: "Briefcase",
    description:
      "Authority-building websites and thought-leadership content for consultancies and agencies.",
    order: 10,
  },
  {
    slug: "government",
    name: "Government",
    icon: "Building2",
    description:
      "Accessible, secure, WCAG-compliant websites for municipalities and public sector agencies.",
    order: 11,
  },
  {
    slug: "non-profit",
    name: "Non-Profit",
    icon: "HandHeart",
    description:
      "Donation-optimized websites, storytelling, and donor CRM integration for non-profits.",
    order: 12,
  },
];

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                 */
/* -------------------------------------------------------------------------- */

type TestimonialSeed = {
  authorName: string;
  authorRole: string;
  company: string;
  content: string;
  rating: number;
  industry: string;
  service: string;
  featured: boolean;
};

const testimonials: TestimonialSeed[] = [
  {
    authorName: "Rebecca Linwood",
    authorRole: "Chief Executive Officer",
    company: "Northbridge Legal Group",
    content:
      "BrightNorth Digital rebuilt our firm's website and within six months our organic traffic had increased by 240%. Lead quality is dramatically higher — we are now closing matters from inbound contact forms that previously would have gone to competitors. Their attention to bar-compliance and accessibility gave our partners real confidence.",
    rating: 5,
    industry: "Legal",
    service: "Search Engine Optimization",
    featured: true,
  },
  {
    authorName: "Marcus Delgado",
    authorRole: "Director of Digital Operations",
    company: "Harborview Health Systems",
    content:
      "The team delivered a HIPAA-aware patient portal that reduced our front-desk phone volume by 38% in the first quarter alone. Their healthcare experience showed in every decision they made — from consent flows to accessibility testing with real screen readers. A genuinely consultative partner.",
    rating: 5,
    industry: "Healthcare",
    service: "Web Development",
    featured: true,
  },
  {
    authorName: "Priya Anand",
    authorRole: "VP of Marketing",
    company: "Lumen & Cedar Retail",
    content:
      "We moved from a legacy platform to a headless commerce build and the difference is night and day. Page load times dropped from 4.2 seconds to under one second, and our mobile conversion rate climbed 64% in the first 60 days. BrightNorth handled migration, design, and performance work without missing a single SKU.",
    rating: 5,
    industry: "Retail & eCommerce",
    service: "Web Development",
    featured: true,
  },
  {
    authorName: "Daniel Okafor",
    authorRole: "Founder & CEO",
    company: "ForgeLine Manufacturing",
    content:
      "BrightNorth implemented an AI assistant on our sales site that deflects 60% of repetitive quote requests and qualifies the rest before they reach our team. We closed three six-figure deals in the first quarter that originated from AI-qualified conversations. The ROI was clear inside the first month.",
    rating: 5,
    industry: "Manufacturing",
    service: "Artificial Intelligence Solutions",
    featured: true,
  },
  {
    authorName: "Sophie Tremblay",
    authorRole: "Marketing Director",
    company: "Atlas Hospitality Group",
    content:
      "Our direct bookings are up 41% year over year, which directly reduces what we pay to online travel agencies. The team built a clean, fast booking flow and ran a focused local SEO program across all nine of our properties. Reporting is transparent and the people are responsive — exactly what a marketing leader needs.",
    rating: 5,
    industry: "Hospitality",
    service: "Digital Marketing",
    featured: false,
  },
  {
    authorName: "Ethan Whitaker",
    authorRole: "Executive Director",
    company: "Greenfield Community Foundation",
    content:
      "As a non-profit we needed a partner who understood both storytelling and budget reality. BrightNorth redesigned our brand and rebuilt our donation flow — online giving is up 72% and the new identity has transformed how donors talk about us. They treated our mission with the same seriousness as any enterprise client.",
    rating: 5,
    industry: "Non-Profit",
    service: "Branding & Graphic Design",
    featured: false,
  },
];

/* -------------------------------------------------------------------------- */
/* Portfolio Projects                                                           */
/* -------------------------------------------------------------------------- */

type PortfolioSeed = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  technologies: string[];
  overview: string;
  outcomes: string[];
  beforeMetric: string;
  afterMetric: string;
  featured: boolean;
};

const portfolio: PortfolioSeed[] = [
  {
    slug: "northbridge-legal-website-rebuild",
    title: "Northbridge Legal Group — Website Rebuild & SEO",
    client: "Northbridge Legal Group",
    industry: "Legal",
    services: ["Web Development", "Search Engine Optimization", "Branding & Graphic Design"],
    technologies: ["Next.js", "TypeScript", "Sanity CMS", "Vercel"],
    overview:
      "Northbridge is a 40-attorney commercial litigation firm with a dated website that did not reflect the firm's reputation. We rebuilt the site on a headless CMS, designed a new visual identity, and ran a six-month SEO program targeting high-intent practice-area keywords. The new site loads in under a second, meets WCAG 2.2 AA, and lets the marketing team publish without developer help.",
    outcomes: [
      "Organic traffic increased 240% within six months of launch",
      "Average page load time reduced from 3.8s to 0.9s",
      "Inbound contact form submissions grew 3.1x quarter over quarter",
      "Editorial workflow moved in-house — no developer required for new pages",
    ],
    beforeMetric: "3.8s load · 12k monthly visitors",
    afterMetric: "0.9s load · 41k monthly visitors",
    featured: true,
  },
  {
    slug: "lumen-cedar-headless-commerce",
    title: "Lumen & Cedar — Headless Commerce Migration",
    client: "Lumen & Cedar Retail",
    industry: "Retail & eCommerce",
    services: ["Web Development", "Digital Marketing", "Hosting & Website Care"],
    technologies: ["Next.js", "Shopify Hydrogen", "Stripe", "Algolia"],
    overview:
      "Lumen & Cedar operates eleven retail locations and a legacy Magento store that was buckling under holiday traffic. We migrated them to a headless Shopify Hydrogen storefront with Algolia-powered search and a redesigned PDP template focused on mobile conversion. The new store handles 8x peak traffic without scaling incidents.",
    outcomes: [
      "Mobile conversion rate climbed 64% in the first 60 days",
      "Average page load time dropped from 4.2s to under 1.0s",
      "Black Friday peak handled 8x prior-year traffic with zero downtime",
      "Search-driven revenue share grew from 6% to 19% of total",
    ],
    beforeMetric: "4.2s load · 1.2% mobile conversion",
    afterMetric: "0.9s load · 1.9% mobile conversion",
    featured: true,
  },
  {
    slug: "forgeline-ai-sales-assistant",
    title: "ForgeLine Manufacturing — AI Sales Assistant",
    client: "ForgeLine Manufacturing",
    industry: "Manufacturing",
    services: ["Artificial Intelligence Solutions", "Web Development"],
    technologies: ["OpenAI", "Next.js", "Postgres", "pgvector"],
    overview:
      "ForgeLine receives hundreds of repetitive quote requests each week, tying up engineering time. We deployed a domain-trained AI assistant that answers technical FAQs, qualifies RFQs against ForgeLine's catalog, and routes high-intent conversations to the sales team with a structured summary. The assistant is grounded in their product data to prevent hallucination.",
    outcomes: [
      "60% of repetitive quote requests deflected automatically",
      "Three six-figure deals closed from AI-qualified leads in Q1",
      "Average engineering response time on RFQs dropped from 3 days to 4 hours",
      "Sales team reclaimed approximately 22 hours per week",
    ],
    beforeMetric: "3-day RFQ response time",
    afterMetric: "4-hour RFQ response time",
    featured: true,
  },
  {
    slug: "atlas-hospitality-direct-booking",
    title: "Atlas Hospitality — Direct Booking Campaign",
    client: "Atlas Hospitality Group",
    industry: "Hospitality",
    services: ["Digital Marketing", "Search Engine Optimization", "Web Development"],
    technologies: ["Next.js", "Google Ads", "Meta Ads", "GA4"],
    overview:
      "Atlas operates nine boutique hotels and was losing margin to online travel agencies. We built a campaign that combined local SEO, paid social retargeting, and a redesigned direct-booking flow with member-rate incentives. The result was a measurable shift of bookings from OTAs back to the direct channel.",
    outcomes: [
      "Direct bookings up 41% year over year across nine properties",
      "OTA commission spend reduced by $312k annually",
      "Member program grew from 4k to 19k subscribers in 12 months",
      "Cost per acquisition on paid social dropped 38%",
    ],
    beforeMetric: "62% OTA · 38% direct",
    afterMetric: "48% OTA · 52% direct",
    featured: false,
  },
  {
    slug: "harborview-patient-portal",
    title: "Harborview Health Systems — Patient Portal",
    client: "Harborview Health Systems",
    industry: "Healthcare",
    services: ["Web Development", "Hosting & Website Care"],
    technologies: ["Next.js", "FHIR API", "Auth0", "AWS"],
    overview:
      "Harborview's call center was overwhelmed with appointment and prescription refill calls. We designed and built a HIPAA-aware patient portal that integrates with their EHR via FHIR APIs. Patients can now self-serve the top 12 call drivers, with a graceful fallback to live staff for anything complex.",
    outcomes: [
      "Front-desk phone volume reduced 38% in the first quarter",
      "92% of portal users completed their task without staff escalation",
      "No-show rate dropped 14% thanks to automated reminders",
      "Accessibility audit passed WCAG 2.2 AA on first review",
    ],
    beforeMetric: "1,800 calls/day · 22% no-show",
    afterMetric: "1,116 calls/day · 19% no-show",
    featured: false,
  },
  {
    slug: "greenfield-foundation-rebrand",
    title: "Greenfield Community Foundation — Brand & Donation Redesign",
    client: "Greenfield Community Foundation",
    industry: "Non-Profit",
    services: ["Branding & Graphic Design", "Web Development", "Digital Marketing"],
    technologies: ["Figma", "Next.js", "Stripe", "Mailchimp"],
    overview:
      "Greenfield's existing brand felt dated and their donation flow had a 68% abandonment rate. We refreshed the brand identity, rewrote the donor journey, and rebuilt the donation flow with one-click recurring giving. The new identity has been adopted across every donor touchpoint.",
    outcomes: [
      "Online giving increased 72% year over year",
      "Donation flow abandonment dropped from 68% to 31%",
      "Recurring donor sign-ups grew 3.4x",
      "Brand refresh rolled out across 14 donor touchpoints",
    ],
    beforeMetric: "68% donation abandonment",
    afterMetric: "31% donation abandonment",
    featured: false,
  },
];

/* -------------------------------------------------------------------------- */
/* Blog Posts                                                                   */
/* -------------------------------------------------------------------------- */

type BlogPostSeed = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readingTime: number;
  author: string;
  featured: boolean;
  publishedAt: Date;
};

const blogPosts: BlogPostSeed[] = [
  {
    slug: "core-web-vitals-2025-guide",
    title: "Core Web Vitals in 2025: What Still Matters (and What Doesn't)",
    excerpt:
      "INP replaced FID last year, but most sites still haven't caught up. Here is a practical guide to the metrics that actually move rankings in 2025 — and the ones you can safely stop obsessing over.",
    content: `Core Web Vitals have been a confirmed Google ranking signal for years now, but the specific metrics keep evolving. In 2025, the three numbers worth watching are Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). If your team is still talking about First Input Delay, it's time to update your playbook — FID was replaced by INP, which is a much better proxy for actual interactivity.

LCP measures how long it takes the largest visible element to render. The 2025 thresholds haven't shifted dramatically: under 2.5 seconds is good, between 2.5 and 4 seconds needs improvement, and anything over 4 seconds is poor. The biggest wins still come from serving correctly sized images, preloading your hero asset, and avoiding render-blocking JavaScript. If you're on a modern framework like Next.js, the Image component handles most of this automatically — but only if you actually use it.

INP is where most sites are still bleeding. It measures the latency of every interaction on the page and reports the worst (well, roughly the 98th percentile). Under 200 milliseconds is the target. The fix is rarely one thing — it's usually a combination of reducing JavaScript execution time, breaking up long tasks, and being smarter about how third-party scripts are loaded. We routinely see INP scores improve by 30–50% just by deferring non-critical analytics and tag manager scripts.

Finally, CLS remains the easiest metric to fix and the most embarrassing to fail. Reserve space for images and embeds, avoid injecting banners above existing content, and use the CSS content-visibility property thoughtfully. The threshold is still 0.1. If you're above it, you have visible layout shift that real users are noticing — fix it before you touch anything else.`,
    category: "Web Development",
    tags: ["performance", "core web vitals", "seo", "page speed"],
    readingTime: 6,
    author: "James Carter",
    featured: true,
    publishedAt: new Date("2025-09-12"),
  },
  {
    slug: "ai-search-optimization-strategy",
    title: "AI Search Is Here: How to Optimize for ChatGPT, Perplexity, and Google AI Overviews",
    excerpt:
      "Traffic from traditional search is plateauing while AI-mediated answers grow. Here's how to make sure your brand is cited — not buried — when an AI answers your customer's query.",
    content: `If you've watched your keyword rankings hold steady while organic traffic drifts down, you're not imagining it. AI answer engines like ChatGPT, Perplexity, Gemini, and Google's AI Overviews are absorbing clicks that used to flow to your site. The good news: being cited by an AI assistant is often worth more than a traditional ranking, because it comes with an implied endorsement.

The first thing to understand is that AI engines build their answers from the open web, but they weight sources differently than classic search engines do. They favor content that is structured, factually dense, and uses clear entity definitions. If your page answers "what is X" in the first paragraph and supports it with original data, you are far more likely to be cited than a competitor who buries the answer below 800 words of preamble.

Structured data matters more than ever. Schema.org markup, clean heading hierarchies, and tables of data that AI can extract and recombine all increase your odds of being the source an assistant reaches for. We've seen clients triple their AI-search referral traffic in 90 days just by adding proper FAQ and HowTo schema to existing content — no new writing required.

The longer-term play is to publish content that AI engines can't easily replace. Primary research, proprietary benchmarks, expert roundups, and tooling that produces unique outputs all become link-worthy and citation-worthy in a way that generic listicles never will be. The era of writing a thinner version of the top-ranking page is over. Originality is now a ranking signal.`,
    category: "SEO",
    tags: ["ai search", "seo", "llm", "content strategy"],
    readingTime: 7,
    author: "Sarah Mitchell",
    featured: true,
    publishedAt: new Date("2025-10-03"),
  },
  {
    slug: "paid-ad-budget-allocation-2025",
    title: "How to Allocate a Paid Media Budget Across Google, Meta, and LinkedIn in 2025",
    excerpt:
      "There's no single right answer, but there is a defensible framework. Here's how we think about splitting paid budgets based on funnel stage, deal size, and sales cycle.",
    content: `The question we get most often from new clients is some version of "how much should I spend on Google versus Meta versus LinkedIn?" The honest answer is that it depends on three variables: your average deal size, your sales cycle, and which stage of the funnel you're trying to fill. But that answer isn't very useful in a planning meeting, so we use a simple framework.

For low-cost consumer products with impulse-driven purchase paths — think retail, food delivery, mobile apps — we typically start with 60% Meta, 25% Google (Search plus Performance Max), and 15% TikTok or YouTube. The Meta budget funds prospecting creative; Google captures existing demand; video platforms build the brand pool that retargeting pulls from later.

For B2B services with deal sizes above $25k, the picture flips. LinkedIn becomes the primary prospecting channel because of how precisely you can target by job title and company. A reasonable starting split is 45% LinkedIn, 30% Google Search (high-intent keywords only), 15% Meta retargeting, and 10% programmatic display for account-based marketing. The mistake we see most often is B2B teams spending 80% of budget on Google Search and being frustrated that they can't scale — search volume simply isn't there for most B2B categories.

The most important budgeting principle, regardless of channel mix, is to fund each channel with enough to exit the learning phase. On Meta that's roughly $50/day per ad set; on LinkedIn it's $150–$300/day per campaign. Anything less and the algorithm never gets enough signal to optimize. We'd rather see a client run three channels well-funded than six channels all starving.`,
    category: "Digital Marketing",
    tags: ["paid ads", "ppc", "budget", "linkedin", "meta"],
    readingTime: 8,
    author: "Sarah Mitchell",
    featured: false,
    publishedAt: new Date("2025-08-21"),
  },
  {
    slug: "ai-chatbot-deflection-playbook",
    title: "The AI Chatbot Deflection Playbook: What Actually Works in Production",
    excerpt:
      "Most AI chatbots launch to great fanfare and quietly get turned off three months later. Here's how to design one that actually deflects tickets — and earns its keep.",
    content: `The first AI chatbot we deployed for a client deflected 0% of tickets. It was technically impressive — it answered questions correctly — but customers still escalated to a human. The lesson was that deflection isn't a technology problem; it's a design problem. Three years and dozens of deployments later, we have a playbook that consistently produces 40–60% deflection in production.

The single most important design decision is scope. The chatbot should be good at a small, well-defined set of tasks: looking up order status, answering billing FAQs, resetting a password, scheduling an appointment. Resist the urge to let it "answer anything." A bot that confidently answers 90% of questions and hallucinates the other 10% is worse than a bot that gracefully hands off when it's unsure. Build a confidence threshold and route below it.

Grounding is non-negotiable. Your chatbot should retrieve answers from a curated knowledge base — your help center, your policies, your product documentation — and cite those sources in the response. Pure generative responses are a liability. We use a retrieval pipeline that scores candidate passages, includes only the top three, and instructs the model to refuse if none of them are relevant. This single pattern eliminates most hallucination.

Finally, measure deflection correctly. Deflection is not "conversations that didn't reach a human." That metric is easy to game by making human handoff hard. Real deflection is "conversations where the customer's issue was resolved and they didn't open a follow-up ticket within 72 hours." Measure that, and you'll know whether your chatbot is actually earning its keep.`,
    category: "Artificial Intelligence",
    tags: ["ai", "chatbots", "customer service", "automation"],
    readingTime: 9,
    author: "James Carter",
    featured: false,
    publishedAt: new Date("2025-07-15"),
  },
  {
    slug: "marketing-automation-workflows",
    title: "Five Marketing Automation Workflows That Pay for Themselves",
    excerpt:
      "Automation is one of those things everyone talks about and few teams implement well. Here are five workflows we've shipped repeatedly because they reliably produce ROI within a quarter.",
    content: `Marketing automation has a reputation problem. Most teams have a marketing automation platform, most teams have it configured badly, and most teams have quietly given up on it. The good news is that you don't need a sprawling, dozens-of-workflows setup to see returns. Five well-built workflows typically pay for the entire platform.

The first is the welcome series for new email subscribers. Three emails over seven days: introduce the brand, share the best-performing content, make a soft offer. This sounds basic, but in our experience fewer than half of B2B companies have it running correctly. The workflow should branch based on the subscriber's source and interests, and it should suppress anyone who converts mid-series.

The second is the abandoned-cart or abandoned-form recovery. For e-commerce this is table stakes, but for B2B it's surprisingly underused. If a prospect starts filling out a demo request and abandons, a single follow-up email one hour later with the form pre-filled recovers 15–25% of those leads. The economics are absurdly favorable.

Third is the post-purchase or onboarding drip. After a customer buys or signs up, send a sequenced set of emails that helps them get value from the product as quickly as possible. This reduces churn, drives expansion revenue, and surfaces upsell opportunities. We typically see 8–12% of customers upgrade within 60 days of a well-tuned onboarding drip.

Fourth is the re-engagement workflow. Anyone who hasn't opened an email in 90 days goes into a three-email sequence: a "we miss you" note, a best-of roundup, and a final "should we keep in touch?" with a one-click preference center. This protects your sender reputation and gives you clean data on who is actually engaged.

Fifth is lead scoring with sales handoff. Score leads on behavior and demographic fit, and automatically route anyone above a threshold to the right sales rep with full context. The workflow itself is straightforward; the work is in defining the scoring model and keeping it tuned. Once it's running well, it typically increases sales-accepted lead volume by 20–30% within two quarters.`,
    category: "Automation",
    tags: ["automation", "email marketing", "marketing ops", "lead nurture"],
    readingTime: 8,
    author: "Sarah Mitchell",
    featured: false,
    publishedAt: new Date("2025-06-08"),
  },
  {
    slug: "agency-vs-in-house-marketing",
    title: "Agency vs. In-House Marketing: A Decision Framework That Actually Helps",
    excerpt:
      "Every growing company wrestles with this question, and the standard answer — 'it depends' — is useless. Here's a framework for making the call with confidence.",
    content: `"Should we build an in-house marketing team or work with an agency?" is one of the most common questions we hear from founders and CEOs. The conventional advice — "it depends on your needs" — is technically correct and practically useless. Over the years we've developed a decision framework that actually helps leaders make the call.

The first filter is throughput. If you need to ship more than two major campaigns per quarter across paid, organic, and email, you need roughly eight to twelve full-time marketing employees. Below that volume, an agency will almost always be more cost-effective. Above it, the math flips and a senior in-house team wins on both cost and institutional knowledge.

The second filter is specialization. Modern marketing rewards depth: a great paid-social buyer is not the same person as a great technical SEO, who is not the same person as a great lifecycle email marketer. A generalist in-house team will get you to "good enough" on every channel but rarely great on any of them. An agency lets you buy depth across channels without paying for 12 specialists. If your business model rewards being world-class on a single channel — say, content-led SEO for a SaaS company — hiring that one senior specialist in-house often beats a generalist agency relationship.

The third filter is institutional knowledge. If your product is highly technical, your sales cycle is long, and your customer needs change frequently, the institutional knowledge advantage of an in-house team is hard to overstate. An agency can build that knowledge, but it takes a year and the team will always have one foot out the door relative to full-time employees.

The honest answer for most companies is a hybrid: an in-house marketing lead who owns strategy and the agency relationship, supported by an agency that brings channel depth. We've seen this model outperform pure in-house or pure agency for companies between $5M and $100M of revenue, which is most of the companies we work with.`,
    category: "Business Growth",
    tags: ["agency", "in-house", "marketing strategy", "team building"],
    readingTime: 7,
    author: "James Carter",
    featured: false,
    publishedAt: new Date("2025-05-19"),
  },
];

/* -------------------------------------------------------------------------- */
/* Seeder                                                                       */
/* -------------------------------------------------------------------------- */

async function main() {
  console.log("→ Seeding services…");
  for (const s of services) {
    await db.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        shortDesc: s.shortDesc,
        description: s.description,
        icon: s.icon,
        features: s.features.join(", "),
        order: s.order,
        featured: s.featured,
      },
      create: {
        slug: s.slug,
        name: s.name,
        shortDesc: s.shortDesc,
        description: s.description,
        icon: s.icon,
        features: s.features.join(", "),
        order: s.order,
        featured: s.featured,
      },
    });
  }

  console.log("→ Seeding industries…");
  for (const i of industries) {
    await db.industry.upsert({
      where: { slug: i.slug },
      update: {
        name: i.name,
        description: i.description,
        icon: i.icon,
        order: i.order,
      },
      create: {
        slug: i.slug,
        name: i.name,
        description: i.description,
        icon: i.icon,
        order: i.order,
      },
    });
  }

  console.log("→ Seeding testimonials…");
  // Clear and re-create testimonials (no natural unique key).
  await db.testimonial.deleteMany({});
  for (const t of testimonials) {
    await db.testimonial.create({
      data: {
        authorName: t.authorName,
        authorRole: t.authorRole,
        company: t.company,
        content: t.content,
        rating: t.rating,
        industry: t.industry,
        service: t.service,
        featured: t.featured,
        approved: true,
      },
    });
  }

  console.log("→ Seeding portfolio projects…");
  for (const p of portfolio) {
    await db.portfolioProject.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        client: p.client,
        industry: p.industry,
        services: p.services.join(", "),
        technologies: p.technologies.join(", "),
        overview: p.overview,
        outcomes: JSON.stringify(p.outcomes),
        beforeMetric: p.beforeMetric,
        afterMetric: p.afterMetric,
        featured: p.featured,
      },
      create: {
        slug: p.slug,
        title: p.title,
        client: p.client,
        industry: p.industry,
        services: p.services.join(", "),
        technologies: p.technologies.join(", "),
        overview: p.overview,
        outcomes: JSON.stringify(p.outcomes),
        beforeMetric: p.beforeMetric,
        afterMetric: p.afterMetric,
        featured: p.featured,
      },
    });
  }

  console.log("→ Seeding blog posts…");
  for (const b of blogPosts) {
    await db.blogPost.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        tags: b.tags.join(", "),
        readingTime: b.readingTime,
        author: b.author,
        published: true,
        featured: b.featured,
        publishedAt: b.publishedAt,
      },
      create: {
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        tags: b.tags.join(", "),
        readingTime: b.readingTime,
        author: b.author,
        published: true,
        featured: b.featured,
        publishedAt: b.publishedAt,
      },
    });
  }

  const counts = {
    services: await db.service.count(),
    industries: await db.industry.count(),
    testimonials: await db.testimonial.count(),
    portfolio: await db.portfolioProject.count(),
    blog: await db.blogPost.count(),
  };

  console.log("\n✅ Seed complete:");
  console.table(counts);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

import {
  Code2, Search, Megaphone, BrainCircuit, Palette, Server,
  HeartPulse, Scale, ShoppingCart, Factory, HardHat, GraduationCap,
  UtensilsCrossed, Car, Landmark, Briefcase, Building2, HandHeart,
  Compass, Lightbulb, PenTool, Code, TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  shortDesc: string;
  description: string;
  features: string[];
  gradient: string;
};

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    icon: Code2,
    shortDesc:
      "Custom websites engineered for speed, security, accessibility, and conversions.",
    description:
      "Every project is designed with clean code, modern user experiences, and scalable architecture to support long-term business growth.",
    features: [
      "Responsive Design",
      "Core Web Vitals",
      "Accessibility WCAG 2.2",
      "Headless CMS",
      "E-commerce",
      "Performance Optimization",
    ],
    gradient: "from-[#002e6d] to-[#0a4a9c]",
  },
  {
    slug: "seo",
    name: "Search Engine Optimization",
    icon: Search,
    shortDesc:
      "Ethical, data-driven SEO strategies that improve rankings, increase qualified traffic, and generate sustainable organic growth.",
    description:
      "We optimize for Google, AI Overviews, ChatGPT, Gemini, and Perplexity so your business is discoverable everywhere search happens.",
    features: [
      "Technical SEO Audits",
      "Keyword Research",
      "On-Page Optimization",
      "Link Building",
      "Local SEO",
      "AI-Search Optimization",
    ],
    gradient: "from-[#ff8a00] to-[#ffb347]",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    icon: Megaphone,
    shortDesc:
      "Integrated digital marketing including paid ads, content, email, social media, and conversion optimization.",
    description:
      "Maximize return on investment with campaigns designed to attract, engage, and convert your ideal customers across every channel.",
    features: [
      "Paid Advertising (PPC)",
      "Content Marketing",
      "Email Campaigns",
      "Social Media Management",
      "Conversion Optimization",
      "Analytics & Reporting",
    ],
    gradient: "from-[#17a398] to-[#2dd4bf]",
  },
  {
    slug: "ai-solutions",
    name: "Artificial Intelligence",
    icon: BrainCircuit,
    shortDesc:
      "AI-powered solutions that automate repetitive tasks, enhance customer experiences, and unlock business insights.",
    description:
      "From intelligent chatbots to predictive analytics, we help you embed AI where it creates the most measurable value.",
    features: [
      "AI Chatbots",
      "AI Assistants",
      "Predictive Analytics",
      "Workflow Automation",
      "AI Content Solutions",
      "Customer Service AI",
    ],
    gradient: "from-[#6d4aff] to-[#9b7bff]",
  },
  {
    slug: "branding",
    name: "Branding & Graphic Design",
    icon: Palette,
    shortDesc:
      "Memorable branding that establishes credibility, builds recognition, and strengthens customer trust.",
    description:
      "Cohesive visual identities across digital and print platforms that make your business instantly recognizable.",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Visual Identity",
      "Social Media Graphics",
      "Marketing Materials",
      "Brand Strategy",
    ],
    gradient: "from-[#f0b429] to-[#fbbf24]",
  },
  {
    slug: "hosting",
    name: "Hosting & Website Care",
    icon: Server,
    shortDesc:
      "Reliable hosting, proactive maintenance, backups, performance optimization, and security monitoring.",
    description:
      "Keep your online presence operating at peak performance with 24/7 monitoring and expert support.",
    features: [
      "Managed Hosting",
      "Daily Backups",
      "Security Monitoring",
      "Performance Tuning",
      "Uptime SLA",
      "24/7 Support",
    ],
    gradient: "from-[#0c1b33] to-[#2b3e5f]",
  },
];

export type Industry = {
  slug: string;
  name: string;
  icon: LucideIcon;
  blurb: string;
};

export const industries: Industry[] = [
  { slug: "healthcare", name: "Healthcare", icon: HeartPulse, blurb: "HIPAA-aware patient portals, telehealth, and healthcare marketing." },
  { slug: "legal", name: "Legal", icon: Scale, blurb: "Authority-building websites and lead generation for law firms." },
  { slug: "retail", name: "Retail", icon: ShoppingCart, blurb: "Omnichannel commerce and conversion-focused storefronts." },
  { slug: "manufacturing", name: "Manufacturing", icon: Factory, blurb: "B2B platforms, catalogs, and supply-chain automation." },
  { slug: "construction", name: "Construction", icon: HardHat, blurb: "Project portfolios, estimating tools, and bid pipelines." },
  { slug: "education", name: "Education", icon: GraduationCap, blurb: "Learning platforms, enrollment funnels, and LMS integrations." },
  { slug: "hospitality", name: "Hospitality", icon: UtensilsCrossed, blurb: "Booking engines, reputation management, and experiences." },
  { slug: "automotive", name: "Automotive", icon: Car, blurb: "Inventory systems, service booking, and local SEO." },
  { slug: "finance", name: "Finance", icon: Landmark, blurb: "Secure fintech platforms and compliance-ready experiences." },
  { slug: "professional-services", name: "Professional Services", icon: Briefcase, blurb: "Consultancy websites that convert expertise into pipeline." },
  { slug: "government", name: "Government", icon: Building2, blurb: "Accessible, secure civic platforms built to WCAG 2.2 AA." },
  { slug: "non-profit", name: "Non-Profit", icon: HandHeart, blurb: "Donation platforms, storytelling, and volunteer engagement." },
];

export type ProcessStep = {
  step: string;
  title: string;
  icon: LucideIcon;
  description: string;
  points: string[];
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    icon: Compass,
    description:
      "We immerse ourselves in your business, audience, and goals to understand the real problems worth solving.",
    points: ["Stakeholder workshops", "Market & competitor research", "Goal definition & KPIs"],
  },
  {
    step: "02",
    title: "Strategy",
    icon: Lightbulb,
    description:
      "We craft a data-backed roadmap that aligns technology, marketing, and AI with measurable business outcomes.",
    points: ["Digital strategy", "Channel & tech stack plan", "Success metrics"],
  },
  {
    step: "03",
    title: "Design",
    icon: PenTool,
    description:
      "We design accessible, conversion-focused experiences rooted in your brand and validated with real users.",
    points: ["UX architecture", "Brand-aligned UI design", "Prototype testing"],
  },
  {
    step: "04",
    title: "Development",
    icon: Code,
    description:
      "We engineer fast, secure, scalable solutions with clean code, automation, and rigorous quality assurance.",
    points: ["Performant engineering", "Integrations & automation", "QA & launch"],
  },
  {
    step: "05",
    title: "Growth",
    icon: TrendingUp,
    description:
      "We optimize, measure, and scale — turning your launch into a compounding engine for long-term growth.",
    points: ["Analytics & CRO", "Continuous optimization", "Scaling roadmap"],
  },
];

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 240, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 4.2, suffix: "x", label: "Avg. ROI in Year 1" },
  { value: 17, suffix: "+", label: "Industries Served" },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/#industries" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#portfolio" },
  { label: "AI", href: "/#ai" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/#blog" },
];

export const serviceNavItems: { slug: string; name: string; shortName: string; icon: LucideIcon; desc: string }[] = [
  { slug: "web-development", name: "Web Development", shortName: "Web Development", icon: Code2, desc: "Fast, secure, conversion-focused websites." },
  { slug: "seo", name: "Search Engine Optimization", shortName: "SEO", icon: Search, desc: "Rank higher on Google & AI search." },
  { slug: "digital-marketing", name: "Digital Marketing", shortName: "Marketing", icon: Megaphone, desc: "Paid ads, content, email & social." },
  { slug: "ai-solutions", name: "Artificial Intelligence Solutions", shortName: "AI Solutions", icon: BrainCircuit, desc: "Chatbots, automation & analytics." },
  { slug: "branding", name: "Branding & Graphic Design", shortName: "Branding", icon: Palette, desc: "Logos, identity & visual systems." },
  { slug: "hosting", name: "Hosting & Website Care", shortName: "Hosting & Care", icon: Server, desc: "Managed hosting, security & support." },
];

export type AiCapability = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const aiCapabilities: AiCapability[] = [
  { title: "AI Chatbots", description: "24/7 conversational agents that resolve queries and qualify leads instantly.", icon: BrainCircuit },
  { title: "AI Assistants", description: "Custom copilots that help your team draft, research, and decide faster.", icon: Lightbulb },
  { title: "Business Automation", description: "Connect your tools and automate repetitive workflows end to end.", icon: TrendingUp },
  { title: "Predictive Analytics", description: "Forecast demand, churn, and revenue with models tuned to your data.", icon: Search },
  { title: "AI Content Solutions", description: "Scale on-brand content production with human-in-the-loop quality.", icon: PenTool },
  { title: "Customer Service AI", description: "Reduce response times and lift CSAT with intelligent support routing.", icon: Megaphone },
];

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Launch",
    price: "$3,500",
    period: "project",
    description: "For startups and small businesses needing a strong online foundation.",
    features: [
      "Up to 6-page responsive website",
      "Core SEO setup",
      "Analytics & tag manager",
      "Contact form integration",
      "2 rounds of revisions",
      "30 days post-launch support",
    ],
  },
  {
    name: "Growth",
    price: "$9,500",
    period: "project",
    description: "For growing businesses ready to scale with marketing and automation.",
    features: [
      "Custom website (up to 15 pages)",
      "Advanced SEO + content strategy",
      "AI chatbot integration",
      "Marketing automation setup",
      "Conversion optimization",
      "90 days post-launch support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored",
    description: "For established organizations with complex, multi-channel needs.",
    features: [
      "Custom software & integrations",
      "Dedicated AI solutions",
      "Multi-channel marketing",
      "SLA-backed hosting & care",
      "Dedicated account team",
      "Ongoing strategic partnership",
    ],
  },
];

export const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Process", href: "#process" },
    { label: "Client Success", href: "#testimonials" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { label: "Web Development", href: "#services" },
    { label: "SEO", href: "#services" },
    { label: "Digital Marketing", href: "#services" },
    { label: "AI Solutions", href: "#ai" },
    { label: "Branding", href: "#services" },
    { label: "Hosting & Care", href: "#services" },
  ],
  industries: [
    { label: "Healthcare", href: "#industries" },
    { label: "Legal", href: "#industries" },
    { label: "Retail & eCommerce", href: "#industries" },
    { label: "Finance", href: "#industries" },
    { label: "Education", href: "#industries" },
    { label: "Non-Profit", href: "#industries" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Accessibility Statement", href: "#" },
  ],
};

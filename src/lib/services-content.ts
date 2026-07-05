import { Code2, Search, Megaphone, BrainCircuit, Palette, Server, type LucideIcon } from "lucide-react";

export type ServiceSection = { heading: string; body: string[] };
export type Benefit = { title: string; desc: string };
export type Faq = { q: string; a: string };
export type ProcessStep = { step: string; title: string; desc: string };

export type ServiceDetail = {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  gradient: string;
  image: string;
  tagline: string;
  heroHeadline: string;
  heroSubhead: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  sections: ServiceSection[];
  benefits: Benefit[];
  features: string[];
  process: ProcessStep[];
  faqs: Faq[];
  relatedSlugs: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "web-development",
    name: "Web Development",
    shortName: "Web Development",
    icon: Code2,
    gradient: "from-[#002e6d] to-[#0a4a9c]",
    image: "/images/services/web-development.png",
    tagline: "Custom websites engineered for speed, security, accessibility, and conversions.",
    heroHeadline: "Web Development that turns visitors into customers",
    heroSubhead:
      "We build fast, secure, accessible websites that rank well, load instantly, and convert traffic into revenue. Every project is engineered with clean code, modern architecture, and a relentless focus on performance.",
    metaTitle: "Web Development Services | Custom, Fast & SEO-Ready Websites | BrightNorth Digital",
    metaDescription:
      "Custom web development services from BrightNorth Digital. We build fast, secure, accessible, conversion-focused websites and web apps using modern tech. Get a free strategy session today.",
    keywords: [
      "web development services",
      "custom website development",
      "responsive web design",
      "web application development",
      "enterprise web development",
      "headless CMS development",
      "e-commerce development",
    ],
    intro:
      "Your website is the foundation of your digital presence. At BrightNorth Digital, we engineer websites that don't just look exceptional — they perform. From Core Web Vitals to conversion rates, every line of code is written with measurable business outcomes in mind. Whether you're launching a new brand, modernizing a legacy platform, or scaling a complex web application, our team delivers solutions that are fast, secure, accessible, and built to grow with you.",
    sections: [
      {
        heading: "Why professional web development matters",
        body: [
          "A website is no longer a digital brochure — it's your hardest-working salesperson, your 24/7 storefront, and often the first impression a potential customer has of your business. Research shows that users form an opinion about your site in under 50 milliseconds, and that a one-second delay in load time can reduce conversions by up to 7%.",
          "Professional web development addresses these realities head-on. It combines performant engineering with thoughtful user experience, accessibility compliance, and search-engine readiness to create a digital asset that actively drives revenue rather than passively existing online. When your site loads fast, works on every device, and guides visitors toward a clear action, every marketing dollar works harder.",
          "At BrightNorth Digital, we treat web development as a strategic investment, not a one-time expense. Our sites are architected to scale, optimized for Core Web Vitals, and built on maintainable codebases your team can extend for years.",
        ],
      },
      {
        heading: "Our web development capabilities",
        body: [
          "We work across the full spectrum of modern web development. Our team builds marketing websites, complex web applications, headless commerce platforms, customer portals, and enterprise integrations using a modern technology stack that prioritizes performance and developer experience.",
          "Every project begins with a deep technical discovery — understanding your data, integrations, content workflows, and growth plans — so the architecture we design supports where you're going, not just where you are today. From there, we engineer a solution with clean, documented code, automated testing, and CI/CD pipelines that make ongoing evolution safe and predictable.",
          "We're framework-agnostic and choose the right tool for the job: React and Next.js for interactive experiences, headless CMS platforms like Sanity and Contentful for editorial flexibility, and robust backends with TypeScript, Node, and modern databases for applications that need to do real work.",
        ],
      },
      {
        heading: "Performance, accessibility, and SEO — built in from day one",
        body: [
          "Performance isn't an afterthought. We engineer for Core Web Vitals from the first commit, optimizing Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint so your site feels instant. We implement responsive images, code splitting, edge caching, and progressive enhancement as standard practice.",
          "Accessibility is non-negotiable. Every site we build conforms to WCAG 2.2 AA standards, with semantic HTML, keyboard navigation, screen-reader support, and sufficient color contrast. This isn't just about compliance — accessible sites reach more users and rank better in search.",
          "And because a beautiful site that can't be found is worthless, we bake technical SEO into every build: optimized metadata, structured data, clean URL structures, XML sitemaps, and server-side rendering where it matters. You launch ready to be indexed and ranked.",
        ],
      },
    ],
    benefits: [
      { title: "Blazing-fast performance", desc: "Core Web Vitals in the green, sub-second loads, and edge-cached delivery." },
      { title: "Conversion-focused UX", desc: "Information architecture and flows engineered to turn visitors into leads and customers." },
      { title: "Accessible by default", desc: "WCAG 2.2 AA compliance reaching more users and reducing legal risk." },
      { title: "Scalable architecture", desc: "Modular, documented code that grows with your business for years." },
      { title: "SEO-ready", desc: "Semantic markup, structured data, and technical SEO baked into every build." },
      { title: "Secure & maintainable", desc: "Best-practice security, automated tests, and CI/CD for safe, ongoing evolution." },
    ],
    features: [
      "Responsive Design",
      "Core Web Vitals Optimization",
      "WCAG 2.2 AA Accessibility",
      "Headless CMS Integration",
      "E-commerce Development",
      "Web Application Development",
      "API & Third-party Integrations",
      "Server-side Rendering",
      "Progressive Web Apps",
      "Performance Monitoring",
    ],
    process: [
      { step: "01", title: "Discovery & Architecture", desc: "We map your requirements, data, and integrations into a scalable technical architecture." },
      { step: "02", title: "Design & Prototyping", desc: "We design accessible, conversion-focused interfaces and validate them with real users." },
      { step: "03", title: "Engineering & QA", desc: "We build with clean, tested code and run rigorous QA across devices and browsers." },
      { step: "04", title: "Launch & Optimization", desc: "We deploy, monitor performance, and continuously optimize for speed and conversions." },
    ],
    faqs: [
      { q: "How long does a custom web development project take?", a: "A typical marketing website takes 6–10 weeks from kickoff to launch, depending on scope, number of pages, and integrations. Complex web applications or enterprise platforms can take 3–6 months. We provide a detailed timeline after a discovery call and use agile sprints so you see progress every week." },
      { q: "What technologies do you use?", a: "We use a modern, proven stack: React and Next.js for the frontend, TypeScript throughout, headless CMS platforms (Sanity, Contentful, Payload) for content, Node and serverless functions for APIs, and PostgreSQL or MySQL for databases. We choose the right tool for each project rather than forcing a one-size-fits-all approach." },
      { q: "Will my website be mobile-friendly and fast?", a: "Absolutely. Every site we build is mobile-first and engineered to pass Core Web Vitals. We optimize images, implement code splitting, use edge caching, and test on real devices. Most of our launches score 95+ on Lighthouse performance." },
      { q: "Do you offer ongoing maintenance and support?", a: "Yes. We offer managed hosting and website care plans that include security monitoring, daily backups, performance tuning, updates, and priority support. Most clients stay on a care plan so their site remains fast, secure, and up to date." },
      { q: "Can you rebuild or migrate an existing website?", a: "Yes, migrations are a significant part of our work. We handle content migrations, URL redirect mapping to preserve SEO equity, data transfers, and zero-downtime cutover. We also audit your existing site's performance and search rankings to ensure the new version improves on them." },
      { q: "How much does custom web development cost?", a: "Projects typically range from $8,000 for a focused marketing site to $100,000+ for complex web applications or enterprise platforms. Pricing depends on scope, integrations, and features. Use our interactive pricing calculator or book a free strategy session for a tailored estimate." },
    ],
    relatedSlugs: ["seo", "hosting", "ai-solutions"],
  },
  {
    slug: "seo",
    name: "Search Engine Optimization (SEO)",
    shortName: "SEO",
    icon: Search,
    gradient: "from-[#ff8a00] to-[#ffb347]",
    image: "/images/services/seo.png",
    tagline: "Ethical, data-driven SEO that improves rankings, traffic, and sustainable organic growth.",
    heroHeadline: "SEO that compounds into long-term organic growth",
    heroSubhead:
      "We help businesses rank higher on Google, get cited by AI search engines like ChatGPT and Perplexity, and turn organic traffic into revenue. Our strategies are ethical, data-driven, and built to compound over time.",
    metaTitle: "SEO Services | Rank Higher on Google & AI Search | BrightNorth Digital",
    metaDescription:
      "Data-driven SEO services from BrightNorth Digital. Technical SEO, content strategy, link building, and AI-search optimization (ChatGPT, Perplexity, Google AI Overviews). Grow organic traffic that converts.",
    keywords: [
      "seo services",
      "search engine optimization",
      "technical seo",
      "local seo",
      "ai search optimization",
      "seo audit",
      "link building",
      "content marketing seo",
    ],
    intro:
      "Search is where buying decisions begin — and increasingly, those searches are answered by AI. BrightNorth Digital delivers SEO strategies that improve your visibility across Google, Bing, Google AI Overviews, ChatGPT, Perplexity, and Gemini. We combine technical excellence, content authority, and ethical link building to drive qualified organic traffic that compounds month over month.",
    sections: [
      {
        heading: "The new SEO landscape: Google and AI search",
        body: [
          "Search is undergoing its biggest shift in a decade. Google AI Overviews now answer many queries directly in the results page, and an increasing share of research begins in AI assistants like ChatGPT, Perplexity, and Gemini. Traditional keyword optimization alone is no longer enough — your brand needs to be the source these systems cite.",
          "Our SEO methodology is built for this new reality. We optimize for both classic ranking signals and AI-search discoverability: structured data, clear topical authority, citation-worthy content, and a presence across the sources AI engines draw from. The result is visibility whether a user types a query into Google or asks an AI a question.",
          "We don't chase algorithm loopholes or use risky tactics. Our approach is sustainable, white-hat, and aligned with how search engines and AI systems actually evaluate and reward quality.",
        ],
      },
      {
        heading: "Technical SEO: the foundation of visibility",
        body: [
          "Before content can rank, search engines need to crawl, render, and understand your site. Our technical SEO audits examine site architecture, crawlability, indexation, Core Web Vitals, structured data, internal linking, and mobile usability — then we fix what's holding you back.",
          "We implement schema.org structured data (Organization, LocalBusiness, Service, FAQ, Breadcrumb, Article) so search engines and AI systems can parse your content with confidence. We optimize page speed, eliminate render-blocking resources, and ensure your site is fully indexable.",
          "For businesses with a physical presence, our local SEO expertise ensures you appear in the map pack and local results — managing Google Business Profile, citations, reviews, and location-specific landing pages.",
        ],
      },
      {
        heading: "Content authority and ethical link building",
        body: [
          "Rankings are won by relevance and authority. We develop content strategies that establish your business as the definitive answer in your space — built on keyword research, search intent analysis, and topical depth that satisfies both users and algorithms.",
          "Our content is written by subject-matter experts and structured for both readability and search, with proper heading hierarchy, internal linking, and FAQ sections that earn rich-result placements. Every piece is designed to rank, inform, and convert.",
          "We complement content with ethical, white-hat link building — digital PR, industry partnerships, and resource creation that earns authoritative backlinks naturally. No link farms, no PBNs, no shortcuts that put your domain at risk.",
        ],
      },
    ],
    benefits: [
      { title: "Higher rankings", desc: "Climb to page one for the keywords that drive qualified traffic and revenue." },
      { title: "AI-search visibility", desc: "Get cited by ChatGPT, Perplexity, and Google AI Overviews, not buried." },
      { title: "Qualified traffic", desc: "Attract visitors with real intent who are ready to convert." },
      { title: "Sustainable growth", desc: "White-hat strategies that compound over months and years, not days." },
      { title: "Technical excellence", desc: "Fast, crawlable, structured sites that search engines love." },
      { title: "Measurable ROI", desc: "Transparent reporting tied to traffic, leads, and revenue — not vanity metrics." },
    ],
    features: [
      "Technical SEO Audits",
      "Keyword & Intent Research",
      "On-Page Optimization",
      "Schema.org Structured Data",
      "AI-Search Optimization",
      "Local SEO & Google Business Profile",
      "Content Strategy & Creation",
      "Ethical Link Building",
      "Competitor Analysis",
      "SEO Reporting & Analytics",
    ],
    process: [
      { step: "01", title: "Audit & Research", desc: "We audit your site's technical health, analyze competitors, and identify high-value keywords." },
      { step: "02", title: "Strategy & Roadmap", desc: "We build a prioritized SEO roadmap covering technical fixes, content, and authority building." },
      { step: "03", title: "Execution", desc: "We implement technical optimizations, create content, and execute link-building campaigns." },
      { step: "04", title: "Measure & Scale", desc: "We track rankings, traffic, and conversions, then double down on what drives results." },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "SEO is a compounding investment. You'll typically see early movement in technical performance and keyword rankings within 4–8 weeks, meaningful traffic growth within 3–4 months, and significant, sustained results by 6–12 months. Local SEO and less competitive niches can move faster; highly competitive industries take longer. We set realistic expectations and report progress monthly." },
      { q: "Do you optimize for AI search engines like ChatGPT and Perplexity?", a: "Yes. AI-search optimization is a core part of our methodology. We structure content for citability, implement schema markup, build topical authority, and ensure your brand appears across the sources AI assistants draw from. As AI search grows, this becomes increasingly important — and most agencies aren't doing it yet." },
      { q: "Is your SEO approach white-hat and safe?", a: "Absolutely. We use only ethical, Google-compliant tactics. No link buying, no private blog networks, no keyword stuffing, no cloaking. Our approach aligns with search engine guidelines, which means our results are sustainable and your domain isn't at risk of penalties. Shortcuts might work briefly, but they inevitably backfire." },
      { q: "What's included in your SEO reporting?", a: "You get a custom dashboard and monthly report covering keyword rankings, organic traffic, conversions attributed to organic search, technical health, backlink growth, and AI-search visibility. We focus on metrics tied to revenue, not vanity numbers, and every report includes clear next steps." },
      { q: "Can you help with local SEO?", a: "Yes. We optimize Google Business Profiles, build and clean up local citations, manage review generation, and create location-specific landing pages. If you serve multiple locations, we build a scalable local SEO architecture that helps you rank in each market you operate in." },
      { q: "Do you offer SEO for new websites with no existing traffic?", a: "Yes — in fact, launching with SEO built in is the best approach. We handle keyword research, site architecture, technical foundation, content strategy, and initial authority building so your new site starts ranking from day one rather than playing catch-up later. Many of our most successful engagements begin at the launch stage." },
    ],
    relatedSlugs: ["web-development", "digital-marketing", "hosting"],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortName: "Digital Marketing",
    icon: Megaphone,
    gradient: "from-[#17a398] to-[#2dd4bf]",
    image: "/images/services/digital-marketing.png",
    tagline: "Integrated digital marketing that maximizes return on investment across every channel.",
    heroHeadline: "Digital marketing that turns ad spend into revenue",
    heroSubhead:
      "From paid advertising and content marketing to email and social, we build integrated campaigns that attract, engage, and convert your ideal customers — with transparent reporting tied to ROI, not vanity metrics.",
    metaTitle: "Digital Marketing Services | PPC, Social, Email & Content | BrightNorth Digital",
    metaDescription:
      "Integrated digital marketing services from BrightNorth Digital. Paid advertising (PPC), content marketing, email campaigns, social media management, and conversion optimization. Maximize your ROI.",
    keywords: [
      "digital marketing services",
      "ppc advertising",
      "paid social media ads",
      "content marketing",
      "email marketing",
      "social media management",
      "conversion rate optimization",
      "marketing analytics",
    ],
    intro:
      "Great marketing isn't about being everywhere — it's about being where your customers are, with the right message at the right moment. BrightNorth Digital builds integrated digital marketing programs that combine paid media, content, email, and social into a cohesive system designed to acquire customers efficiently and grow lifetime value. Every dollar is tracked, every channel is accountable.",
    sections: [
      {
        heading: "Integrated marketing beats channel silos",
        body: [
          "Most businesses market in disconnected pieces — an agency for ads, a freelancer for social, an in-house team for email. The result is wasted spend, inconsistent messaging, and attribution gaps that hide what's actually working. Integrated marketing solves this by treating your funnel as one connected system.",
          "We orchestrate paid, organic, email, and social so they reinforce each other. A prospect discovers you through a paid ad, deepens trust through content and social proof, and converts through a nurtured email sequence — with every touchpoint tracked and optimized as part of a single customer journey.",
          "This approach doesn't just improve efficiency; it compounds results. Channels that work together outperform the sum of their parts, and the data from each channel makes every other channel smarter.",
        ],
      },
      {
        heading: "Paid advertising engineered for ROI",
        body: [
          "Paid media — Google Ads, Meta, LinkedIn, TikTok, and programmatic — remains the fastest way to generate qualified demand. But without disciplined management, it's also the fastest way to burn budget. We run paid campaigns with ruthless attention to efficiency, creative testing, and audience refinement.",
          "Our approach combines rigorous conversion tracking, incrementality testing, and creative iteration. We don't just optimize for clicks — we optimize for revenue, tying every campaign back to actual customers and lifetime value so you know exactly what each channel contributes.",
          "Whether you need lead generation, e-commerce sales, or brand awareness, we build paid programs that scale profitably. And we're platform-agnostic, allocating budget to where your customers actually are rather than where it's convenient to manage.",
        ],
      },
      {
        heading: "Content, email, and social that build compounding assets",
        body: [
          "Paid media stops the moment you stop paying. Content, email, and social are compounding assets that keep working long after they're created. We build owned-media programs that reduce your dependence on paid acquisition over time.",
          "Our content marketing creates valuable, search-optimized resources that attract organic traffic and establish authority. Our email programs nurture leads and customers with lifecycle automation that increases retention and lifetime value. And our social media management builds community and brand presence where your audience spends time.",
          "Together, these channels create a marketing engine that grows more efficient every quarter — lowering customer acquisition costs and increasing the value of every customer you acquire.",
        ],
      },
    ],
    benefits: [
      { title: "Transparent ROI", desc: "Every channel tracked to revenue, not vanity metrics. Know what works." },
      { title: "Lower acquisition costs", desc: "Integrated channels and compounding content reduce dependence on paid media." },
      { title: "Faster results", desc: "Paid media generates qualified demand while organic builds in the background." },
      { title: "Consistent messaging", desc: "One cohesive strategy across every channel, reinforcing your brand." },
      { title: "Scalable systems", desc: "Automation and documented playbooks that scale without breaking." },
      { title: "Full-funnel coverage", desc: "Awareness, consideration, conversion, and retention — all working together." },
    ],
    features: [
      "Paid Advertising (Google, Meta, LinkedIn)",
      "Content Marketing & Strategy",
      "Email Marketing & Automation",
      "Social Media Management",
      "Conversion Rate Optimization (CRO)",
      "Landing Page Design",
      "Marketing Analytics & Attribution",
      "A/B Testing",
      "Audience & Persona Development",
      "Lifecycle & Retention Marketing",
    ],
    process: [
      { step: "01", title: "Strategy & Audiences", desc: "We define your audiences, channels, messaging, and the metrics that define success." },
      { step: "02", title: "Build & Launch", desc: "We set up tracking, build campaigns, create creative, and launch across channels." },
      { step: "03", title: "Optimize & Scale", desc: "We test creative, refine audiences, and reallocate budget to what performs." },
      { step: "04", title: "Report & Refine", desc: "We report on ROI tied to revenue and continuously refine the strategy." },
    ],
    faqs: [
      { q: "What digital marketing channels do you specialize in?", a: "We're a full-funnel agency covering paid advertising (Google Ads, Meta, LinkedIn, TikTok), content marketing, email marketing and automation, social media management, conversion rate optimization, and marketing analytics. Rather than specializing in one channel, we orchestrate them into an integrated system — because that's what drives real ROI." },
      { q: "How do you measure marketing ROI?", a: "We implement rigorous conversion tracking and attribution — connecting ad spend, campaigns, and channels to actual leads, customers, and revenue. You get a custom dashboard showing cost per acquisition, return on ad spend, and channel-level ROI. We focus on metrics tied to business outcomes, not vanity numbers like impressions or followers." },
      { q: "What's a realistic budget for digital marketing?", a: "Effective paid media campaigns typically start at $3,000–$5,000/month in ad spend plus management. Content and SEO programs often start at $2,500/month. Full integrated programs usually range from $5,000–$15,000/month depending on scope and channels. We'll recommend a budget that aligns with your goals during a free strategy session." },
      { q: "How quickly will I see results?", a: "Paid media can generate qualified traffic within days of launch, though optimization to profitable efficiency typically takes 4–8 weeks of testing. Content and SEO compound over 3–6 months. Email and social build steadily. We set channel-specific expectations and report progress monthly so you always know where you stand." },
      { q: "Do you create the ad creative and content?", a: "Yes. Our team includes designers, copywriters, and video producers who create ad creative, landing pages, blog content, email sequences, and social posts. You can also supply your own creative — we'll advise on what performs and help optimize it. Either way, creative testing is a core part of our methodology." },
      { q: "Can you work with our existing marketing team?", a: "Absolutely. Many of our clients have in-house marketers we partner with — extending their capacity, providing specialist expertise, or taking on execution while they focus on strategy. We integrate with your team, tools, and workflows rather than creating silos." },
    ],
    relatedSlugs: ["seo", "branding", "web-development"],
  },
  {
    slug: "ai-solutions",
    name: "Artificial Intelligence Solutions",
    shortName: "AI Solutions",
    icon: BrainCircuit,
    gradient: "from-[#6d4aff] to-[#9b7bff]",
    image: "/images/services/ai-solutions.png",
    tagline: "AI-powered solutions that automate tasks, enhance experiences, and unlock business insights.",
    heroHeadline: "Put AI to work where it moves the needle",
    heroSubhead:
      "From intelligent chatbots and AI assistants to predictive analytics and workflow automation, we design, build, and deploy AI that creates measurable business value — responsibly and transparently.",
    metaTitle: "AI Solutions & Business Automation | Chatbots, Assistants & Analytics | BrightNorth Digital",
    metaDescription:
      "AI solutions from BrightNorth Digital. Custom AI chatbots, AI assistants, predictive analytics, workflow automation, and AI content solutions. Automate tasks and unlock insights, responsibly.",
    keywords: [
      "ai solutions",
      "ai chatbots",
      "ai assistants",
      "business automation",
      "predictive analytics",
      "workflow automation",
      "ai content solutions",
      "customer service ai",
    ],
    intro:
      "AI is no longer experimental — it's a practical lever for efficiency, customer experience, and competitive advantage. BrightNorth Digital helps businesses identify where AI creates real value, then designs, builds, and deploys solutions that integrate with your data and workflows. From conversational AI to predictive models, we make AI work for your business — responsibly, transparently, and with measurable returns.",
    sections: [
      {
        heading: "Where AI creates real business value",
        body: [
          "Not every problem needs AI — and forcing AI where it doesn't belong wastes money and frustrates users. The businesses winning with AI focus it on three high-value areas: automating repetitive work, enhancing customer experiences, and surfacing insights from data that humans can't easily see.",
          "We start every AI engagement with a value assessment, identifying the specific processes, interactions, and decisions where AI can reduce cost, increase revenue, or improve experience. We quantify the expected impact before building anything, so you invest only where returns are clear.",
          "This pragmatic approach is why our AI solutions actually get used and actually deliver ROI — instead of becoming expensive experiments that never make it past a pilot.",
        ],
      },
      {
        heading: "Conversational AI: chatbots and assistants",
        body: [
          "AI chatbots and assistants have matured from frustrating rule-based bots into genuinely helpful interfaces. We build conversational AI that understands natural language, accesses your real business data, and resolves queries or qualifies leads 24/7 — across web, messaging, and voice channels.",
          "Our chatbots integrate with your knowledge base, CRM, and backend systems so they can answer questions accurately, book appointments, process requests, and escalate to humans when needed. We design them to reflect your brand voice and continuously improve through monitoring and retraining.",
          "For internal teams, we build AI assistants — copilots that help your staff draft content, research, summarize documents, and make decisions faster, securely connected to your company's data.",
        ],
      },
      {
        heading: "Automation, analytics, and responsible AI",
        body: [
          "Beyond conversation, we deploy AI across workflow automation — connecting your tools, eliminating manual data entry, routing work intelligently, and triggering actions based on predicted needs. These automations quietly save thousands of hours and dramatically improve consistency.",
          "Our predictive analytics capabilities turn your data into foresight — forecasting demand, predicting churn, identifying upsell opportunities, and surfacing anomalies before they become problems. We make your data actionable, not just reportable.",
          "Throughout, we build responsibly: transparent about how models work, rigorous about data privacy and security, thoughtful about bias and accuracy, and always designed with a human-in-the-loop where stakes are high. AI should augment your team, not replace their judgment where it matters most.",
        ],
      },
    ],
    benefits: [
      { title: "24/7 customer engagement", desc: "AI chatbots resolve queries and qualify leads around the clock, instantly." },
      { title: "Operational efficiency", desc: "Automate repetitive work so your team focuses on high-value tasks." },
      { title: "Data-driven foresight", desc: "Predictive analytics turn your data into decisions, not just reports." },
      { title: "Scalable without headcount", desc: "Handle more customers and volume without proportionally adding staff." },
      { title: "Consistent experiences", desc: "AI never has an off day — every interaction meets your standard." },
      { title: "Responsible & secure", desc: "Transparent, privacy-respecting AI with humans in the loop where it counts." },
    ],
    features: [
      "AI Chatbots & Virtual Assistants",
      "AI Copilots for Internal Teams",
      "Business Workflow Automation",
      "Predictive Analytics & Forecasting",
      "AI Content Generation",
      "Customer Service AI",
      "Document Processing & Extraction",
      "Custom Model Integration",
      "Knowledge Base & RAG Systems",
      "AI Strategy & Value Assessment",
    ],
    process: [
      { step: "01", title: "Value Assessment", desc: "We identify where AI creates measurable ROI and prioritize accordingly." },
      { step: "02", title: "Design & Architecture", desc: "We design the solution, data flows, and integrations with your systems." },
      { step: "03", title: "Build & Train", desc: "We build, integrate, and train the AI on your data with rigorous testing." },
      { step: "04", title: "Deploy & Improve", desc: "We launch, monitor performance, and continuously refine the models." },
    ],
    faqs: [
      { q: "What kinds of AI solutions do you build?", a: "We build AI chatbots and virtual assistants, internal AI copilots, workflow automations, predictive analytics models, AI-powered content systems, customer service AI, document processing, and custom model integrations. We also offer AI strategy and value assessments to help you identify the highest-ROI opportunities before building." },
      { q: "How do you ensure AI answers are accurate?", a: "Accuracy is our top priority. We use retrieval-augmented generation (RAG) so AI grounds answers in your verified data rather than inventing them, implement guardrails and confidence thresholds, and design human-in-the-loop escalation for high-stakes queries. Every solution is tested rigorously before launch and monitored continuously, with feedback loops that improve accuracy over time." },
      { q: "Is my data secure when using AI?", a: "Yes. We use enterprise-grade AI providers with strict data policies — your data is never used to train public models. We implement proper access controls, encryption, and audit logging, and can deploy models in your own environment for sensitive use cases. We're transparent about data flows and compliant with regulations like GDPR and HIPAA where applicable." },
      { q: "How quickly can we deploy an AI chatbot?", a: "A basic AI chatbot trained on your knowledge base can launch in 2–4 weeks. More sophisticated solutions with CRM integrations, custom workflows, or predictive features typically take 6–12 weeks. We work in sprints so you see a working prototype early and refine based on real usage before full launch." },
      { q: "Will AI replace our customer service team?", a: "Our approach is augmentation, not replacement. AI handles the repetitive, high-volume queries — freeing your human agents to focus on complex, empathetic, high-value interactions. Most clients see AI resolving 40–70% of routine queries while improving overall CSAT, because customers get instant answers and agents have more time for the conversations that need a human touch." },
      { q: "How much do AI solutions cost?", a: "AI chatbots typically start at $4,500 for implementation plus a monthly operating cost. Custom AI assistants and automation projects range from $7,000–$25,000+. Predictive analytics and custom model work depends on data complexity. We provide a clear estimate after a value assessment, and we only recommend building where the expected ROI justifies the investment." },
    ],
    relatedSlugs: ["web-development", "digital-marketing", "hosting"],
  },
  {
    slug: "branding",
    name: "Branding & Graphic Design",
    shortName: "Branding & Design",
    icon: Palette,
    gradient: "from-[#f0b429] to-[#fbbf24]",
    image: "/images/services/branding.png",
    tagline: "Memorable branding that establishes credibility, recognition, and trust.",
    heroHeadline: "Branding that makes your business unmistakable",
    heroSubhead:
      "From logo design and visual identity to complete brand strategy and guidelines, we create cohesive brands that build recognition, establish credibility, and strengthen trust across every touchpoint.",
    metaTitle: "Branding & Graphic Design Services | Logo, Identity & Guidelines | BrightNorth Digital",
    metaDescription:
      "Branding and graphic design services from BrightNorth Digital. Logo design, brand guidelines, visual identity, social media graphics, and marketing materials. Build a brand customers remember.",
    keywords: [
      "branding services",
      "logo design",
      "brand identity design",
      "brand guidelines",
      "graphic design services",
      "visual identity",
      "brand strategy",
      "marketing collateral design",
    ],
    intro:
      "Your brand is more than a logo — it's the accumulated experience people have with your business, and the feeling that experience leaves behind. BrightNorth Digital creates brands with intention: distinctive visual identities, clear positioning, and cohesive systems that make your business instantly recognizable and consistently trusted across every channel and touchpoint.",
    sections: [
      {
        heading: "Why branding is a strategic investment",
        body: [
          "In crowded markets, products and services are increasingly easy to replicate — but brands are not. A strong brand commands premium pricing, reduces customer acquisition costs, builds loyalty that survives competitive pressure, and creates emotional connections that turn customers into advocates.",
          "Research consistently shows that consistent brand presentation across platforms can increase revenue by up to 23%, and that customers are willing to pay more from brands they trust. Branding isn't a cost center; it's one of the highest-leverage investments a business can make.",
          "We approach branding strategically — starting with positioning and audience, then expressing that strategy through visual and verbal systems that work everywhere from a favicon to a billboard.",
        ],
      },
      {
        heading: "From logo to complete brand system",
        body: [
          "A logo is the tip of the iceberg. A complete brand system includes positioning, messaging, color palette, typography, imagery style, iconography, voice and tone, and the rules that govern how they all work together. We design comprehensive systems, not just marks.",
          "Every brand we create is delivered with detailed brand guidelines — a documented system your team and partners can use to maintain consistency as you grow. This protects your brand's integrity whether content is created by us, your in-house team, or an outside agency.",
          "We also design the full range of brand expressions: logos and lockups, business cards and stationery, social media templates, presentation decks, sales collateral, packaging, and digital assets. Your brand looks cohesive everywhere it appears.",
        ],
      },
      {
        heading: "Rebranding and brand evolution",
        body: [
          "Established businesses often need to evolve their brand without losing the equity they've built. We're experts in thoughtful rebranding — modernizing visual identities, refining positioning, and extending brands into new markets while preserving recognition and trust.",
          "Our rebranding process includes a thorough audit of existing brand equity, stakeholder interviews, competitive analysis, and a carefully managed transition plan. We help you evolve deliberately, not abruptly — so your brand grows with your business rather than holding it back.",
          "Whether you're a startup defining your identity for the first time or an established company ready for the next chapter, we build brands designed to last and flexible enough to grow.",
        ],
      },
    ],
    benefits: [
      { title: "Instant recognition", desc: "Distinctive, memorable branding that makes you unmistakable in your market." },
      { title: "Premium positioning", desc: "A brand that justifies premium pricing and elevates perceived value." },
      { title: "Consistent everywhere", desc: "Documented guidelines keep your brand cohesive across every channel." },
      { title: "Trust & credibility", desc: "Professional branding signals reliability before a word is read." },
      { title: "Customer loyalty", desc: "Emotional brand connections turn one-time buyers into advocates." },
      { title: "Future-proof system", desc: "Flexible brand systems that grow and evolve with your business." },
    ],
    features: [
      "Logo & Visual Identity Design",
      "Brand Strategy & Positioning",
      "Brand Guidelines & Style Guides",
      "Typography & Color Systems",
      "Marketing Collateral Design",
      "Social Media Graphics & Templates",
      "Presentation & Sales Deck Design",
      "Packaging Design",
      "Brand Voice & Messaging",
      "Rebranding & Brand Evolution",
    ],
    process: [
      { step: "01", title: "Discover & Position", desc: "We research your audience, market, and competitors to define positioning." },
      { step: "02", title: "Concept & Design", desc: "We explore directions and design a distinctive, cohesive brand system." },
      { step: "03", title: "Refine & Document", desc: "We refine the chosen direction and document it in brand guidelines." },
      { step: "04", title: "Launch & Extend", desc: "We roll the brand out across touchpoints and train your team." },
    ],
    faqs: [
      { q: "What's included in a branding project?", a: "A complete branding project typically includes brand strategy and positioning, logo design (primary and variations), color palette, typography system, imagery direction, brand guidelines document, and core collateral (business cards, letterhead, social templates). We tailor each engagement to your needs — whether you need a full brand from scratch or an evolution of an existing one." },
      { q: "How long does a branding project take?", a: "A focused logo and identity project takes 3–5 weeks. A complete brand strategy and system typically takes 6–10 weeks. Larger rebranding engagements for established companies can take 12+ weeks, especially when stakeholder alignment is involved. We work in collaborative stages with checkpoints so you're involved throughout." },
      { q: "Do you do rebranding for existing businesses?", a: "Yes, rebranding is a significant part of our work. We're careful to preserve the brand equity you've built while modernizing and elevating your identity. Our process includes auditing existing equity, stakeholder interviews, and a managed transition plan so your rebrand strengthens recognition rather than resetting it." },
      { q: "Will I own the brand files and fonts?", a: " Absolutely. You own all final deliverables outright — logo files, guidelines, collateral, and source files. For fonts and stock imagery, we ensure proper licensing is in your name. We provide files in every format you'll need, now and in the future, and document where each asset lives." },
      { q: "Can you create ongoing design assets after the brand is done?", a: "Yes. Many clients continue working with us for ongoing design support — social media graphics, marketing collateral, presentations, ad creative, and campaign assets. Having designed your brand, we're uniquely positioned to extend it consistently. We offer flexible monthly retainers or project-based engagements." },
      { q: "How much does branding cost?", a: "Logo and basic identity projects start at $2,500. Complete brand systems with strategy and guidelines typically range from $5,500–$9,500. Comprehensive rebranding for established companies can range from $10,000–$25,000+. We provide a detailed proposal after understanding your goals, and we scope to your budget without compromising the strategic foundation." },
    ],
    relatedSlugs: ["web-development", "digital-marketing", "seo"],
  },
  {
    slug: "hosting",
    name: "Hosting & Website Care",
    shortName: "Hosting & Care",
    icon: Server,
    gradient: "from-[#0c1b33] to-[#2b3e5f]",
    image: "/images/services/hosting.png",
    tagline: "Reliable hosting, proactive maintenance, backups, and security monitoring.",
    heroHeadline: "Hosting and care that keeps your site fast, secure, and always on",
    heroSubhead:
      "Your website needs constant care to stay fast, secure, and available. We provide managed hosting, proactive maintenance, daily backups, performance tuning, and 24/7 security monitoring — so you can focus on your business, not your infrastructure.",
    metaTitle: "Managed Website Hosting & Care Plans | Security, Backups & Support | BrightNorth Digital",
    metaDescription:
      "Managed website hosting and care plans from BrightNorth Digital. Daily backups, security monitoring, performance optimization, uptime SLA, and 24/7 expert support. Keep your site fast and secure.",
    keywords: [
      "managed website hosting",
      "website maintenance plans",
      "website care plans",
      "website security monitoring",
      "website backups",
      "performance optimization",
      "uptime monitoring",
      "wordpress care plans",
    ],
    intro:
      "A website is never finished — it requires ongoing care to remain fast, secure, and available. BrightNorth Digital's managed hosting and website care plans handle the infrastructure, security, performance, and updates that keep your digital presence operating at peak performance. With proactive monitoring, daily backups, and expert support, we give you peace of mind and a site that never stops working for your business.",
    sections: [
      {
        heading: "Why managed hosting and care matter",
        body: [
          "An unmonitored website is a liability. Security vulnerabilities emerge daily, software updates pile up, performance degrades as content grows, and outages happen without warning. For most businesses, managing this in-house is expensive, distracting, and risky — one missed update can lead to a breach, and one slow page can cost conversions every day.",
          "Managed hosting and care shifts this burden to specialists who monitor your site continuously, address issues before they become problems, and keep your infrastructure optimized. It's typically more affordable than handling it in-house, and far more reliable.",
          "For businesses where the website drives revenue, care isn't optional — it's the difference between a site that performs and one that quietly loses you customers.",
        ],
      },
      {
        heading: "Performance, security, and reliability",
        body: [
          "Our hosting infrastructure is built for speed and reliability. We use SSD storage, edge caching, CDN delivery, and modern server configurations to deliver sub-second load times globally. We tune your specific site for optimal Core Web Vitals and monitor performance continuously.",
          "Security is layered and proactive. We implement firewalls, malware scanning, brute-force protection, SSL management, and automated vulnerability patching. We monitor for threats 24/7 and respond to incidents immediately — most issues are resolved before you ever notice them.",
          "Reliability is guaranteed with uptime SLAs, redundant infrastructure, and rapid incident response. Daily automated backups with off-site storage mean your site can be restored in minutes if ever needed, and we test restores regularly so they work when it counts.",
        ],
      },
      {
        heading: "Updates, edits, and expert support",
        body: [
          "Software evolves, and so should your site. Our care plans include regular updates to your CMS, plugins, frameworks, and server environment — tested in a staging environment before deployment to ensure nothing breaks. We handle the technical upkeep so your team doesn't have to.",
          "Most plans also include a monthly allowance of content edits and small development tasks — updating copy, swapping images, adding a page, adjusting a form. Your site stays current without the friction of a new project every time you need a small change.",
          "And when you need help, our team is a message away. No tickets lost in a queue, no offshore support reading from a script — just the same experts who built and know your site, available to help you make the most of it.",
        ],
      },
    ],
    benefits: [
      { title: "Blazing performance", desc: "Edge-cached, SSD-backed hosting tuned for sub-second loads." },
      { title: "Proactive security", desc: "Firewalls, malware scanning, and 24/7 monitoring keep threats out." },
      { title: "Daily backups", desc: "Automated off-site backups mean your site is always recoverable." },
      { title: "Uptime SLA", desc: "Reliable infrastructure with guaranteed uptime and rapid response." },
      { title: "Expert support", desc: "Direct access to the team that built your site — no call centers." },
      { title: "Always current", desc: "We handle updates, patches, and small edits so your site never stagnates." },
    ],
    features: [
      "Managed Cloud Hosting",
      "Daily Off-site Backups",
      "24/7 Security Monitoring",
      "Malware Scanning & Removal",
      "Firewall & DDoS Protection",
      "SSL Certificate Management",
      "Performance Optimization",
      "CDN & Edge Caching",
      "Uptime Monitoring & SLA",
      "Monthly Content Edits",
      "Software & Plugin Updates",
      "Staging Environment",
    ],
    process: [
      { step: "01", title: "Onboard & Migrate", desc: "We migrate your site to our managed infrastructure with zero downtime." },
      { step: "02", title: "Harden & Optimize", desc: "We secure, optimize, and configure backups and monitoring." },
      { step: "03", title: "Monitor & Maintain", desc: "We monitor 24/7, apply updates, and keep everything running smoothly." },
      { step: "04", title: "Report & Support", desc: "We report on performance and security, and handle your edit requests." },
    ],
    faqs: [
      { q: "What does a website care plan include?", a: "Our care plans include managed hosting, daily off-site backups, 24/7 security monitoring, malware scanning, firewall protection, SSL management, performance optimization, CDN, uptime monitoring with SLA, regular software and plugin updates, a staging environment, a monthly allowance of content edits, and priority expert support. Plans are tiered based on traffic, complexity, and edit allowance." },
      { q: "Can you host a site you didn't build?", a: "Yes. We regularly take over hosting and care for sites built by other agencies or in-house teams. We start with a thorough audit of the site's health, security, and performance, migrate it to our managed infrastructure with zero downtime, and then maintain it ongoing. Many of our longest-running care clients came to us from other providers." },
      { q: "How fast will my website be?", a: "Our hosting is optimized for performance — SSD storage, edge caching, CDN delivery, and server-level tuning. Most sites we host score 90+ on Lighthouse performance and load in under 2 seconds globally. We also tune your specific site for Core Web Vitals and can optimize images, code, and databases to keep things fast as you grow." },
      { q: "What happens if my site goes down?", a: "Our monitoring detects outages within minutes, often before you notice. On-call engineers respond immediately, and most issues are resolved quickly. Our infrastructure is redundant, and we maintain tested backups so we can restore your site rapidly if ever needed. Care plans include an uptime SLA, and we communicate transparently throughout any incident." },
      { q: "Do you handle website updates and edits?", a: "Yes. Care plans include a monthly allowance of content edits — updating copy, swapping images, adding blog posts, adjusting forms, and similar small tasks. Larger development work is scoped separately. This means your site stays current without the overhead of a new project for every small change, and you always have experts on hand to help." },
      { q: "How much do hosting and care plans cost?", a: "Plans start at $90/month for standard sites, $190/month for performance-tier hosting with more resources and edits, and $450+/month for enterprise or high-traffic sites. We'll recommend the right tier based on your traffic, complexity, and support needs. There are no long-term contracts — you can adjust or cancel with 30 days' notice." },
    ],
    relatedSlugs: ["web-development", "seo", "ai-solutions"],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}

export const serviceSlugs = serviceDetails.map((s) => s.slug);

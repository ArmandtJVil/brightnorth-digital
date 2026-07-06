# BrightNorth Digital

> **Build Smarter. Market Better. Grow Faster.**

A premium, enterprise-grade website for BrightNorth Digital — a full-service digital agency specializing in Web Development, SEO, Digital Marketing, AI Solutions, Branding, Hosting, and Digital Consulting.

Built with Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, Prisma, and Framer Motion. Dark-mode-only design with characterful typography (Bricolage Grotesque + Hanken Grotesk), an integrated AI chatbot, dynamic SEO schema injection, and per-route meta optimization.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database](#database)
- [API Routes](#api-routes)
- [SEO & Schema](#seo--schema)
- [AI Chatbot](#ai-chatbot)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

BrightNorth Digital's website serves as a flagship example of modern digital craftsmanship — combining exceptional design, compelling storytelling, advanced engineering, and search-first architecture. Every page reinforces the agency's reputation as an innovative, trusted, and results-driven technology partner.

The site is **dark-mode only** with a distinctive visual identity built on deep navy (`#002E6D`) and vibrant orange (`#FF8A00`) brand colors, a glow-enhanced logo, scroll progress bar, spotlight cards, and a technology logo marquee.

## Tech Stack

| Layer            | Technology                                             |
| ---------------- | ------------------------------------------------------ |
| Framework        | [Next.js 16](https://nextjs.org) (App Router)          |
| Language         | TypeScript 5                                           |
| Styling          | Tailwind CSS 4 + [shadcn/ui](https://ui.shadcn.com)   |
| Database         | Prisma ORM (PostgreSQL — Neon/Vercel Postgres recommended) |
| Animations       | Framer Motion                                          |
| AI               | Google Gemini (`@google/generative-ai`) — chatbot     |
| Icons            | Lucide React + custom SVG brand logos                  |
| Fonts            | Bricolage Grotesque (display) + Hanken Grotesk (body) |
| Package Manager  | Bun                                                    |
| Validation       | Zod                                                    |
| Toasts           | Sonner                                                 |

## Features

### Pages & Routes

- **`/`** — Homepage with hero (parallax floating cards, animated stats, tech logo marquee), services, industries (interactive filtering), process, AI solutions, testimonials carousel, interactive pricing calculator, and contact form.
- **`/services`** — Services overview with all six capabilities.
- **`/services/[slug]`** — Six individual service detail pages with long-form SEO content, benefits, features, process, FAQ accordions, and related services (statically generated).
- **`/about`** — Company story, mission & vision, values, team, stats, and FAQ.
- **`/contact`** — Contact info cards, contact form (with success animation), map, and FAQ.
- **`/blog`** — Blog listing with featured post, category filters, and article grid.
- **`/blog/[slug]`** — Individual article pages with full content, tags, and related posts (statically generated).

### Interactive Elements

- **AI Chatbot ("North")** — Floating chat widget on every page, powered by z-ai-web-dev-sdk with a BrightNorth-specific system prompt, conversation memory, typing indicator, and quick replies.
- **Pricing Calculator** — Live cost estimator mirroring the API pricing model, with animated price counter and a save-to-database flow.
- **Interactive Filtering** — Industries (by category) with animated layout transitions.
- **Scroll Progress Bar** — Gradient bar at the top tracking scroll position.
- **Spotlight Cards** — Cursor-following radial glow on service cards.
- **Logo Glow** — Warm orange/navy halo behind the header logo.

### Animations & Effects

- Mouse-parallax floating glass cards (hero)
- Count-up statistics
- Infinite tech-logo marquee
- Animated gradient borders on pricing tiers
- Floating aurora background blobs
- Spring-animated dropdowns and modals
- Staggered reveal-on-scroll throughout
- Full `prefers-reduced-motion` support

### Backend & Data

- **Prisma + PostgreSQL** with 8 models: ContactSubmission, NewsletterSubscriber, PricingRequest, BlogPost, PortfolioProject, Testimonial, Service, Industry.
- **5 API routes** with Zod validation and error handling.
- **Seed script** populating services, industries, testimonials, portfolio projects, and blog posts.

## Project Structure

```
brightnorth-digital/
├── prisma/
│   ├── schema.prisma          # Database schema (8 models)
│   └── seed.ts                # Seed script
├── public/
│   ├── logo.png               # Official BrightNorth Digital logo
│   ├── logo.svg
│   ├── robots.txt
│   └── images/                # AI-generated brand imagery
│       ├── hero-office.png
│       ├── about-team.png
│       ├── about-office.png
│       ├── blog-header.png
│       ├── cta-bg.png
│       ├── contact-consultant.png
│       ├── process-discovery.png
│       ├── ai-solutions.png
│       ├── about-strategy.png
│       └── services/          # Per-service detail images
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (dark mode, fonts, schema)
│   │   ├── page.tsx           # Homepage
│   │   ├── globals.css        # Brand theme, animations, utilities
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── api/
│   │       ├── chat/route.ts       # AI chatbot endpoint
│   │       ├── contact/route.ts    # Contact form submissions
│   │       ├── newsletter/route.ts # Newsletter signups
│   │       ├── pricing/route.ts    # Pricing estimate calculator
│   │       └── route.ts
│   ├── components/
│   │   ├── ui/               # shadcn/ui component library
│   │   └── site/             # Custom site components
│   │       ├── navbar.tsx          # Sticky nav with Services dropdown + logo glow
│   │       ├── hero.tsx            # Parallax hero + tech logo marquee
│   │       ├── about.tsx
│   │       ├── services.tsx        # Spotlight service cards
│   │       ├── industries.tsx      # Interactive filtering
│   │       ├── process.tsx         # 5-step journey
│   │       ├── ai-solutions.tsx    # Dark immersive section
│   │       ├── testimonials.tsx    # Auto-rotating carousel
│   │       ├── pricing.tsx         # Live calculator
│   │       ├── contact.tsx         # Homepage contact section
│   │       ├── contact-form.tsx    # Reusable form (success animation)
│   │       ├── cta-band.tsx
│   │       ├── footer.tsx          # Newsletter + links + sticky bottom
│   │       ├── chatbot-widget.tsx  # AI assistant floating widget
│   │       ├── effects.tsx         # ScrollProgress, SpotlightCard, LogoMarquee
│   │       ├── tech-logos.tsx      # 12 custom SVG brand logos
│   │       ├── json-ld.tsx         # Dynamic schema injection component
│   │       └── reveal.tsx          # Reveal, CountUp, SectionHeading
│   └── lib/
│       ├── db.ts              # Prisma client
│       ├── utils.ts           # cn() helper
│       ├── site-data.ts       # Services, industries, nav links, pricing
│       ├── services-content.ts # Long-form SEO content per service
│       └── schema.ts          # JSON-LD schema generators
├── .env                       # DATABASE_URL (gitignored)
├── .gitignore
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json            # shadcn/ui config
├── Caddyfile                  # Gateway config
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+ or [Bun](https://bun.sh) 1.0+
- A **PostgreSQL** database (local, or hosted on [Neon](https://neon.tech), [Supabase](https://supabase.com), or Vercel Postgres)
- A Z.ai account for the AI chatbot (see [Environment Variables](#environment-variables))

### Installation

```bash
# Clone the repository
git clone https://github.com/ArmandtJVil/brightnorth-digital.git
cd brightnorth-digital

# Install dependencies
bun install
# or
npm install
```

### Set up the database

The project uses **PostgreSQL** via Prisma. Create a `.env` file with your connection string:

```bash
# Local PostgreSQL
echo 'DATABASE_URL="postgresql://user:password@localhost:5432/brightnorth"' > .env

# Or use a hosted PostgreSQL (recommended — works for both local dev & Vercel):
# echo 'DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.dev/brightnorth?sslmode=require"' > .env
```

Then create the schema and seed the content:

```bash
# Push the schema to create all tables
bun run db:push

# Generate the Prisma client
bun run db:generate

# Seed the database with services, industries, testimonials, portfolio, and blog posts
bun run prisma/seed.ts
```

### Run the development server

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Database

The project uses Prisma ORM with **PostgreSQL**. For local development you can run PostgreSQL directly, or use a free hosted database (Neon, Supabase) that also works when you deploy to Vercel. The schema is defined in `prisma/schema.prisma` with `provider = "postgresql"`.

### Models

| Model                  | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `ContactSubmission`    | Inbound contact form submissions                              |
| `NewsletterSubscriber` | Email newsletter signups                                      |
| `PricingRequest`       | Saved pricing estimates from the calculator                   |
| `BlogPost`             | Blog articles (long-form content with categories and tags)    |
| `PortfolioProject`     | Case studies / client projects                                |
| `Testimonial`          | Client testimonials with ratings                              |
| `Service`              | Service catalogue (web, SEO, marketing, AI, branding, hosting)|
| `Industry`             | Industry verticals served                                     |

### Seeding

The seed script (`prisma/seed.ts`) populates:
- 6 services with features and descriptions
- 12 industries
- 6 testimonials with measurable outcomes
- 6 portfolio projects with before/after metrics
- 6 blog posts with genuine long-form content

```bash
bun run prisma/seed.ts
```

## API Routes

All routes are located in `src/app/api/` and return JSON responses.

| Route                | Method | Description                                              |
| -------------------- | ------ | ------------------------------------------------------- |
| `/api/contact`       | POST   | Submit contact form (Zod-validated, persists to DB)     |
| `/api/newsletter`    | POST   | Subscribe to newsletter (dedup + reactivate)            |
| `/api/pricing`       | POST   | Calculate project estimate (live pricing engine)        |
| `/api/chat`          | POST   | AI chatbot conversation (z-ai-web-dev-sdk LLM)          |
| `/api/blog`          | GET    | List published blog posts                               |
| `/api/blog/[slug]`   | GET    | Fetch a single blog post by slug                        |

### Example: Contact form

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "I'd like to discuss a web development project."
  }'
```

### Example: AI Chatbot

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "What services do you offer?" }
    ]
  }'
```

## SEO & Schema

The site is built search-first with comprehensive SEO:

### Per-Route Meta Tags

Every page generates unique meta titles, descriptions, canonical URLs, Open Graph, and Twitter Card tags via Next.js `generateMetadata`:

- Homepage, About, Contact, Blog, Services — each with a unique title and canonical
- Service detail pages (`/services/[slug]`) — unique meta per service
- Blog articles (`/blog/[slug]`) — unique meta per article

### JSON-LD Structured Data

Schemas are **dynamically injected into the document `<head>`** via a reusable `<JsonLd>` client component when the relevant components render:

| Schema             | Where it appears                          |
| ------------------ | ----------------------------------------- |
| `Organization`     | Site-wide (root layout)                   |
| `ProfessionalService` (LocalBusiness) | Homepage, Contact page |
| `Service`          | Each service detail page                  |
| `FAQPage`          | Homepage, About, Contact, Blog, service pages |
| `BreadcrumbList`   | About, Contact, Blog, service & article detail pages |
| `BlogPosting`      | Each blog article detail page             |

### Additional SEO Features

- Semantic HTML5 throughout
- Optimized heading hierarchy
- Descriptive alt text on all images
- `robots.txt` configured
- Lazy-loaded images
- Mobile-first responsive design
- Core Web Vitals optimized (sub-second loads, edge caching ready)

## AI Chatbot

The site includes **"North"**, an AI assistant available on every page via a floating widget in the bottom-right corner.

### How it works

- **Frontend** (`chatbot-widget.tsx`): A premium chat panel with message history, animated typing indicator, quick-reply chips, and a "Talk to a human" link.
- **Backend** (`/api/chat`): Uses `z-ai-web-dev-sdk` with a detailed system prompt covering BrightNorth Digital's services, pricing, process, and tone guidelines. Supports multi-turn conversation context (up to 20 messages).

The chatbot helps visitors with questions about services, pricing, timelines, and how to get started — escalating to the contact form when a human conversation is needed.

## Available Scripts

```bash
bun run dev          # Start dev server on port 3000
bun run build        # Production build
bun run start        # Start production server
bun run lint         # Run ESLint
bun run db:push      # Push schema changes to the database
bun run db:generate  # Regenerate the Prisma client
bun run db:migrate   # Create and apply a migration
bun run db:reset     # Reset the database (destructive)
```

## Environment Variables

Create a `.env` file in the project root for local development, and add the same variables in your Vercel project settings for production.

### Database

```env
DATABASE_URL="postgresql://user:password@host:5432/brightnorth?sslmode=require"
```

A hosted PostgreSQL connection string from [Neon](https://neon.tech), [Supabase](https://supabase.com), or Vercel Postgres works for both local dev and production.

### AI Chatbot (Google Gemini)

The chatbot (`/api/chat`) uses Google Gemini via the `@google/generative-ai` SDK with the `gemini-1.5-flash` model. It requires a single environment variable:

```env
GEMINI_API_KEY="your-gemini-api-key"
```

**Get a free API key:**
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with a Google account
3. Click **"Create API key"**
4. Copy the key and add it as `GEMINI_API_KEY` in your `.env` (local) and in Vercel → Settings → Environment Variables (production)

The free tier includes generous usage (15 requests/minute, 1,500/day) which is plenty for a website chatbot.

### Summary table

| Variable          | Required | Description                                  |
| ----------------- | -------- | -------------------------------------------- |
| `DATABASE_URL`    | ✅ Yes   | PostgreSQL connection string (Prisma)        |
| `GEMINI_API_KEY`  | ✅ Yes   | Google Gemini API key (free at aistudio.google.com) |

> **Note:** The `.env` file is gitignored and never committed.

## Deployment

### Vercel (recommended)

1. **Push** the repository to GitHub (already done: [ArmandtJVil/brightnorth-digital](https://github.com/ArmandtJVil/brightnorth-digital))
2. **Import** the project at [vercel.com/new](https://vercel.com/new)
3. **Add environment variables** in Vercel → Settings → Environment Variables:
   - `DATABASE_URL` — your hosted PostgreSQL connection string
   - `GEMINI_API_KEY` — your free Google Gemini API key (from [aistudio.google.com/apikey](https://aistudio.google.com/apikey))
4. **Create the database schema & seed it** — run these locally with your production `DATABASE_URL` in `.env`:
   ```bash
   bun run db:push          # Creates all tables in PostgreSQL
   bun run prisma/seed.ts   # Seeds services, industries, testimonials, portfolio, blog posts
   ```
5. **Deploy** — Vercel will build and deploy automatically. The blog, testimonials, and all data-driven pages will work once the database is seeded.

> ⚠️ **Important:** SQLite does **not** work on Vercel (the serverless filesystem is read-only). The schema is configured for PostgreSQL — use a hosted PostgreSQL provider like [Neon](https://neon.tech) (free tier recommended).

### Other platforms

The app is a standard Next.js 16 application and can be deployed to any Node.js-compatible host with a PostgreSQL database:

```bash
bun run build
bun run start
```

Ensure `DATABASE_URL` and `GEMINI_API_KEY` are set in your hosting provider's environment.

## Brand Identity

| Element         | Value                                           |
| --------------- | ----------------------------------------------- |
| Primary Navy    | `#002E6D` (trust, stability)                    |
| Accent Orange   | `#FF8A00` / `#FFB700` (energy, optimism)        |
| Display Font    | [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) |
| Body Font       | [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) |
| Tagline         | Build Smarter. Market Better. Grow Faster.      |
| Mode            | Dark only                                       |

## License

This project is proprietary to BrightNorth Digital. All rights reserved.

---

**BrightNorth Digital** — Build Smarter. Market Better. Grow Faster.

Questions? [hello@brightnorthdigital.com](mailto:hello@brightnorthdigital.com) · [+1 (555) 010-0123](tel:+15550100123)

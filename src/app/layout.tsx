import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/site/theme-provider";
import { JsonLd } from "@/components/site/json-ld";
import { ORGANIZATION_SCHEMA } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://brightnorthdigital.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BrightNorth Digital | Web, AI, SEO & Digital Marketing Agency",
    template: "%s | BrightNorth Digital",
  },
  description:
    "BrightNorth Digital helps ambitious businesses grow through intelligent web development, AI-powered automation, data-driven marketing, and measurable digital strategies. Build Smarter. Market Better. Grow Faster.",
  keywords: [
    "digital agency",
    "web development",
    "SEO",
    "digital marketing",
    "AI solutions",
    "business automation",
    "branding",
    "hosting",
    "digital consulting",
    "custom software development",
  ],
  authors: [{ name: "BrightNorth Digital" }],
  creator: "BrightNorth Digital",
  publisher: "BrightNorth Digital",
  alternates: { canonical: "/" },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "BrightNorth Digital | Build Smarter. Market Better. Grow Faster.",
    description:
      "Full-service digital agency delivering web development, AI solutions, SEO, digital marketing, branding, and automation that drive measurable growth.",
    url: SITE_URL,
    siteName: "BrightNorth Digital",
    images: [
      {
        url: "/images/hero-office.png",
        width: 1344,
        height: 768,
        alt: "BrightNorth Digital team collaborating in a bright modern office",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrightNorth Digital | Digital Agency",
    description:
      "Build Smarter. Market Better. Grow Faster. Web, AI, SEO & digital marketing that drives measurable growth.",
    images: ["/images/hero-office.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jakarta.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Organization schema — injected dynamically into <head>, persists site-wide */}
          <JsonLd id="ld-organization" schema={ORGANIZATION_SCHEMA} />
          {children}
          <Toaster />
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

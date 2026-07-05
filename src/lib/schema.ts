/**
 * Schema.org JSON-LD generators — server-safe (no client-only code).
 * These build plain JS objects that can be passed to the <JsonLd> client
 * component for dynamic injection into the document <head>.
 */

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BrightNorth Digital',
  url: 'https://brightnorthdigital.com',
  logo: 'https://brightnorthdigital.com/logo.png',
  description:
    'Full-service digital agency specializing in web development, AI solutions, SEO, digital marketing, branding, and automation.',
  slogan: 'Build Smarter. Market Better. Grow Faster.',
  areaServed: 'Worldwide',
  knowsAbout: [
    'Web Development',
    'Search Engine Optimization',
    'Digital Marketing',
    'Artificial Intelligence',
    'Business Automation',
    'Branding',
    'Hosting',
    'Digital Consulting',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+1-555-010-0123',
    email: 'hello@brightnorthdigital.com',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://www.linkedin.com/company/brightnorth-digital',
    'https://twitter.com/brightnorthdig',
    'https://www.facebook.com/brightnorthdigital',
    'https://www.instagram.com/brightnorthdigital',
  ],
}

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'BrightNorth Digital',
  image: 'https://brightnorthdigital.com/images/hero-office.png',
  '@id': 'https://brightnorthdigital.com',
  url: 'https://brightnorthdigital.com',
  telephone: '+1-555-010-0123',
  email: 'hello@brightnorthdigital.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '120 Market Street, Suite 400',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94103',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  areaServed: 'Worldwide',
  sameAs: [
    'https://www.linkedin.com/company/brightnorth-digital',
    'https://twitter.com/brightnorthdig',
    'https://www.facebook.com/brightnorthdigital',
    'https://www.instagram.com/brightnorthdigital',
  ],
}

export function buildServiceSchema(service: {
  name: string
  description: string
  slug: string
  image: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: `https://brightnorthdigital.com/services/${service.slug}`,
    image: `https://brightnorthdigital.com${service.image}`,
    provider: {
      '@type': 'Organization',
      name: 'BrightNorth Digital',
      url: 'https://brightnorthdigital.com',
    },
    areaServed: 'Worldwide',
  }
}

export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://brightnorthdigital.com${item.url}`,
    })),
  }
}

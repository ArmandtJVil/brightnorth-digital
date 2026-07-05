'use client'

import * as React from 'react'

// Re-export server-safe schema generators so consumers can import everything
// from a single module. The builders themselves live in @/lib/schema (server-safe).
export {
  ORGANIZATION_SCHEMA,
  LOCAL_BUSINESS_SCHEMA,
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/lib/schema'

/**
 * JsonLd — dynamically injects a JSON-LD <script type="application/ld+json">
 * tag into the document <head> when the component renders, and removes it on unmount.
 *
 * - If a script with the same id already exists, its content is updated in place
 *   (prevents duplicates across client-side navigations).
 * - Schema objects are serialized to JSON and set as the script's textContent.
 *
 * Usage:
 *   <JsonLd id="organization" schema={organizationSchema} />
 *   <JsonLd id="faq" schema={faqSchema} />
 */
export function JsonLd({
  id,
  schema,
}: {
  id: string
  schema: Record<string, unknown> | Record<string, unknown>[]
}) {
  // Memoize the serialized JSON so the effect only re-runs when content changes.
  const json = React.useMemo(() => JSON.stringify(schema), [schema])

  React.useEffect(() => {
    let el = document.getElementById(id) as HTMLScriptElement | null

    if (!el) {
      el = document.createElement('script')
      el.id = id
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }

    if (el.textContent !== json) {
      el.textContent = json
    }

    return () => {
      const current = document.getElementById(id)
      if (current && current.textContent === json) {
        current.remove()
      }
    }
  }, [id, json])

  return null
}

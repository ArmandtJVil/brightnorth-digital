'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight, Loader2, X, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { SectionHeading, Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  coverImage: string | null
  readingTime: number
  author: string
  publishedAt: string | null
  featured: boolean
}

const categoryGradients: Record<string, string> = {
  'Web Development': 'from-[#002e6d] to-[#0a4a9c]',
  'SEO': 'from-[#ff8a00] to-[#ffb347]',
  'Digital Marketing': 'from-[#17a398] to-[#2dd4bf]',
  'Artificial Intelligence': 'from-[#6d4aff] to-[#9b7bff]',
  'Automation': 'from-[#f0b429] to-[#fbbf24]',
  'Business Growth': 'from-[#0c1b33] to-[#2b3e5f]',
}

function formatDate(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function gradientFor(category: string) {
  return categoryGradients[category] || 'from-[#002e6d] to-[#ff8a00]'
}

export function Blog({ posts }: { posts: BlogPost[] }) {
  const categories = React.useMemo(() => {
    const set = new Set(posts.map((p) => p.category))
    return ['All Articles', ...Array.from(set)]
  }, [posts])

  const [active, setActive] = React.useState('All Articles')
  const [openSlug, setOpenSlug] = React.useState<string | null>(null)
  const [fullPost, setFullPost] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)

  const filtered = React.useMemo(
    () => (active === 'All Articles' ? posts : posts.filter((p) => p.category === active)),
    [active, posts],
  )

  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = filtered.filter((p) => p.id !== featured?.id)

  const openPost = async (slug: string) => {
    setOpenSlug(slug)
    setFullPost(null)
    setLoading(true)
    try {
      const res = await fetch(`/api/blog/${slug}`)
      const data = await res.json()
      setFullPost(data.post ?? data)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  if (posts.length === 0) return null

  return (
    <section id="blog" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Knowledge Center"
          title={<>Insights from the <span className="text-gradient-brand">BrightNorth team</span></>}
          description="Practical, jargon-free articles on web development, SEO, AI, marketing, and growth — written by the people who do the work."
        />

        {/* Category filter */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all sm:text-sm',
                  active === c
                    ? 'bg-foreground text-background shadow-soft'
                    : 'border border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Featured + grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Featured post */}
          {featured && active === 'All Articles' && (
            <Reveal>
              <button
                onClick={() => openPost(featured.slug)}
                className="group block h-full w-full overflow-hidden rounded-3xl border border-border/60 bg-card text-left transition-all hover:border-brand/40 hover:shadow-navy"
              >
                <div className={cn('relative h-48 overflow-hidden bg-gradient-to-br', gradientFor(featured.category))}>
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#0c1b33]">
                    Featured · {featured.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold leading-snug text-foreground group-hover:text-brand transition-colors">
                    {featured.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{featured.author}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readingTime} min</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {formatDate(featured.publishedAt)}</span>
                  </div>
                </div>
              </button>
            </Reveal>
          )}

          {/* Rest grid */}
          <div className={cn('grid gap-6', active === 'All Articles' && 'lg:grid-cols-1')}>
            {rest.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.06}>
                <button
                  onClick={() => openPost(post.slug)}
                  className="group flex w-full items-stretch gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:border-brand/40 hover:shadow-soft"
                >
                  <div className={cn('relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br sm:block', gradientFor(post.category))}>
                    <div className="absolute inset-0 bg-grid opacity-20" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[0.62rem] font-bold uppercase tracking-wide text-brand">{post.category}</span>
                    <h3 className="mt-1 font-display text-base font-bold leading-snug text-foreground group-hover:text-brand transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-2 flex items-center gap-3 text-[0.68rem] text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readingTime} min</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="rounded-xl">
              <a href="#blog">View all articles <ArrowRight className="ml-1.5 h-4 w-4" /></a>
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Article reader modal */}
      <Dialog open={!!openSlug} onOpenChange={(o) => !o && setOpenSlug(null)}>
        <DialogContent className="max-h-[88vh] max-w-3xl overflow-hidden p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{fullPost?.title ?? 'Article'}</DialogTitle>
            <DialogDescription>Full article content</DialogDescription>
          </DialogHeader>
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-7 w-7 animate-spin text-brand" />
            </div>
          ) : fullPost ? (
            <div className="scroll-fancy max-h-[88vh] overflow-y-auto">
              <div className={cn('relative h-40 bg-gradient-to-br', gradientFor(fullPost.category))}>
                <div className="absolute inset-0 bg-grid opacity-20" />
                <button
                  onClick={() => setOpenSlug(null)}
                  className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                  aria-label="Close article"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="absolute bottom-4 left-6 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#0c1b33]">
                  {fullPost.category}
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <h1 className="font-display text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">{fullPost.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground/80">{fullPost.author}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {fullPost.readingTime} min read</span>
                  <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {formatDate(fullPost.publishedAt)}</span>
                </div>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                  {String(fullPost.content || '').split('\n').filter(Boolean).map((para: string, i: number) => (
                    <p key={i} className={para.startsWith('#') ? 'font-display text-lg font-bold text-foreground' : ''}>
                      {para.replace(/^#+\s*/, '')}
                    </p>
                  ))}
                </div>
                {fullPost.tags && fullPost.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border pt-5">
                    {fullPost.tags.map((t: string) => (
                      <span key={t} className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[0.68rem] font-medium text-muted-foreground">#{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}

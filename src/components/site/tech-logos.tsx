/**
 * Brand SVG logos for the tech-stack marquee.
 * Monochrome (white) so they glow subtly on the dark background.
 * Simplified, recognizable marks — not exact copyrighted artwork.
 */
import * as React from 'react'

type LogoProps = { className?: string }

export type TechLogo = {
  name: string
  Logo: React.FC<LogoProps>
}

const Svg = ({ children, className, viewBox = '0 0 128 128' }: { children: React.ReactNode; className?: string; viewBox?: string }) => (
  <svg viewBox={viewBox} className={className} fill="currentColor" aria-hidden="true">
    {children}
  </svg>
)

export const techLogos: TechLogo[] = [
  {
    name: 'React',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="11" />
        <g fill="none" stroke="currentColor" strokeWidth="7">
          <ellipse cx="64" cy="64" rx="60" ry="24" />
          <ellipse cx="64" cy="64" rx="60" ry="24" transform="rotate(60 64 64)" />
          <ellipse cx="64" cy="64" rx="60" ry="24" transform="rotate(120 64 64)" />
        </g>
      </Svg>
    ),
  },
  {
    name: 'Next.js',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="8" />
        <path d="M44 38v52h10V58l34 32h8V38h-10v32L52 38z" />
      </Svg>
    ),
  },
  {
    name: 'TypeScript',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 128">
        <rect x="6" y="6" width="116" height="116" rx="16" fill="none" stroke="currentColor" strokeWidth="7" />
        <path d="M40 64h28M54 64v34" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <path d="M94 60c-6-4-20-6-20 4 0 9 24 6 24 18 0 12-16 12-24 5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      </Svg>
    ),
  },
  {
    name: 'Node.js',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 128">
        <path d="M64 6L14 35v58l50 29 50-29V35z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
        <path d="M50 78c0 8 6 12 16 12 11 0 16-4 16-11 0-7-5-9-16-12-13-3-18-6-18-14 0-8 7-13 17-13 10 0 16 4 17 11" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      </Svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 80">
        <path d="M64 4c-16 0-26 8-30 24 6-8 13-11 21-9 4.5 1.1 7.7 4.5 11.2 8.2C71.7 33 78 40 94 40c16 0 26-8 30-24-6 8-13 11-21 9-4.5-1.1-7.7-4.5-11.2-8.2C86.3 11 80 4 64 4zM34 40c-16 0-26 8-30 24 6-8 13-11 21-9 4.5 1.1 7.7 4.5 11.2 8.2C41.7 69 48 76 64 76c16 0 26-8 30-24-6 8-13 11-21 9-4.5-1.1-7.7-4.5-11.2-8.2C56.3 47 50 40 34 40z" />
      </Svg>
    ),
  },
  {
    name: 'Prisma',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 128">
        <path d="M104 24L40 112l8-86c1-8 9-12 15-6z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
        <path d="M104 24L52 96l-20 26c-4 5-1 10 5 8z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
      </Svg>
    ),
  },
  {
    name: 'OpenAI',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 128">
        <path d="M112 54a30 30 0 00-3-24 31 31 0 00-33-15 30 30 0 00-23-11A31 31 0 0024 44a30 30 0 00-4 29 30 30 0 003 24 31 31 0 0033 15 30 30 0 0023 11 31 31 0 0029-40 30 30 0 004-29zM69 109a23 23 0 01-15-5l1-1 24-14v-2-34l10 6v30a23 23 0 01-20 26zM34 91a23 23 0 01-3-15l1 1 24 14 1 1 34-20v11l-34 20a23 23 0 01-23-12zM27 49a23 23 0 0112-10l1 1v28l1 1 34 20-10 6-34-20a23 23 0 01-4-26zM95 58a23 23 0 01-12 32l-1-1-34-20v-1-35l10-6 34 20a23 23 0 013 11z" />
      </Svg>
    ),
  },
  {
    name: 'Python',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 128">
        <path d="M64 6c-16 0-28 6-28 16v12h32v4H26c-10 0-18 12-18 28s8 28 18 28h10V84c0-10 8-18 18-18h28c8 0 14-6 14-14V22C92 12 80 6 64 6zm-14 16a5 5 0 110 10 5 5 0 010-10z" />
        <path d="M64 122c16 0 28-6 28-16V94H60v-4h42c10 0 18-12 18-28s-8-28-18-28h-10v16c0 10-8 18-18 18H46c-8 0-14 6-14 14v30c0 10 12 16 32 16zm14-16a5 5 0 110-10 5 5 0 010 10z" opacity="0.7" />
      </Svg>
    ),
  },
  {
    name: 'PostgreSQL',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 128">
        <path d="M104 30c-3-14-16-22-32-20-14 2-24 10-28 22-4 14 2 30 14 38 4 3 6 7 5 12-2 6-8 8-14 6-8-3-14-10-16-20-2-10 0-22 6-32" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 98c8 10 22 14 36 10 16-4 26-16 28-32 2-14-4-26-14-32" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    ),
  },
  {
    name: 'GraphQL',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 128">
        <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round">
          <path d="M64 8l48 28v56l-48 28-48-28V36z" />
          <path d="M64 8l48 84H16zM64 120V8M16 36l96 56M112 36L16 92" opacity="0.5" />
        </g>
        <circle cx="64" cy="8" r="8" />
        <circle cx="112" cy="36" r="8" />
        <circle cx="112" cy="92" r="8" />
        <circle cx="64" cy="120" r="8" />
        <circle cx="16" cy="92" r="8" />
        <circle cx="16" cy="36" r="8" />
      </Svg>
    ),
  },
  {
    name: 'Vercel',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 115">
        <path d="M64 0l64 115H0z" />
      </Svg>
    ),
  },
  {
    name: 'Figma',
    Logo: ({ className }) => (
      <Svg className={className} viewBox="0 0 128 192">
        <g fill="none" stroke="currentColor" strokeWidth="10">
          <path d="M48 8h32a16 16 0 010 32H48a16 16 0 010-32z" />
          <path d="M40 96a16 16 0 0116-16h24v32H56a16 16 0 01-16-16z" />
          <path d="M40 48a16 16 0 0116-16h24v32H56a16 16 0 01-16-16z" />
          <path d="M40 144a16 16 0 0116-16h24v16a16 16 0 11-32 0z" />
          <circle cx="96" cy="48" r="16" />
        </g>
      </Svg>
    ),
  },
]

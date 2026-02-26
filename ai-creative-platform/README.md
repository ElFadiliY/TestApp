# AdGenAI - AI-Powered Ad Creative Generation Platform

A full-featured ad creative generation platform similar to [adcreative.ai](https://www.adcreative.ai), built with Next.js 16, React, TypeScript, and Tailwind CSS.

## Features

- **AI Creative Generation** - Multi-step wizard to generate ad creatives with AI scoring
- **Multi-Platform Support** - Templates for Facebook, Instagram, Google Ads, LinkedIn, TikTok, YouTube, Pinterest, and X/Twitter
- **Brand Management** - Create and manage multiple brand profiles with colors, fonts, and identity
- **Template Library** - 12+ templates across social media, display, story, and email formats
- **Creative Gallery** - Browse, search, filter, and batch-manage generated creatives
- **Project Management** - Organize campaigns into projects with status tracking
- **Dashboard Analytics** - Overview stats, recent creatives, and active projects
- **Settings** - Profile, billing, notifications, API keys, and security settings
- **Beautiful Landing Page** - Hero, features, how-it-works, templates preview, and pricing sections

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Utilities**: clsx

## Getting Started

```bash
cd ai-creative-platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to access the dashboard.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles & animations
│   └── dashboard/
│       ├── layout.tsx              # Dashboard layout (sidebar + topbar)
│       ├── page.tsx                # Dashboard home
│       ├── generate/page.tsx       # AI creative generation wizard
│       ├── creatives/page.tsx      # Creative library/gallery
│       ├── templates/page.tsx      # Template library
│       ├── brands/page.tsx         # Brand management
│       ├── projects/page.tsx       # Project management
│       └── settings/page.tsx       # Account settings
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── TemplatesPreview.tsx
│   │   ├── Pricing.tsx
│   │   └── Footer.tsx
│   └── dashboard/
│       ├── Sidebar.tsx
│       └── TopBar.tsx
└── lib/
    ├── types.ts                    # TypeScript interfaces
    └── mock-data.ts                # Demo data & helpers
```

## Key Pages

| Route | Description |
|---|---|
| `/` | Marketing landing page |
| `/dashboard` | Dashboard overview with stats |
| `/dashboard/generate` | 4-step creative generation wizard |
| `/dashboard/creatives` | Gallery with grid/list views, search, and filters |
| `/dashboard/templates` | Template library with platform filtering |
| `/dashboard/brands` | Brand profile CRUD with color pickers |
| `/dashboard/projects` | Campaign/project management |
| `/dashboard/settings` | Account, billing, notifications, API, security |

## Extending with Real AI

To connect real AI generation, you would:

1. Add an API route at `app/api/generate/route.ts`
2. Integrate with OpenAI DALL-E, Stability AI, or similar for image generation
3. Use GPT-4 / Claude for ad copy generation
4. Add a database (Prisma + PostgreSQL) for persistence
5. Add authentication (NextAuth.js / Clerk)
6. Add file storage (AWS S3 / Cloudflare R2) for creative assets

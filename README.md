# Mezan

The org-intelligence platform that turns your headcount, roles, and reporting lines
into a living, interactive map.

This repo contains two surfaces:

| Route   | What it is                                                            |
| ------- | -------------------------------------------------------------------- |
| `/`     | Marketing landing page (hero, features, pricing, FAQ, etc.)          |
| `/app`  | The interactive org-chart application                                |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or
[http://localhost:3000/app](http://localhost:3000/app) for the interactive chart.

## Tech

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion** for animation

## Project structure

```
app/
  layout.tsx          Root layout (fonts, metadata)
  page.tsx            Landing page — composes the marketing sections
  globals.css         Design tokens, utilities, keyframes
  app/page.tsx        The interactive org-chart app
components/
  site/               Landing-page sections (Navbar, Hero, Pricing, ...)
  *.tsx               Org-chart components (OrgTree, NodeCard, ...)
context/              Org-chart state
data/                 Seed data
```

## Build

```bash
npm run build
```

Both routes are statically prerendered.

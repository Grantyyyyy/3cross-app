# 3Cross App Catalog

A browsable directory of the web applications built for **3Cross** — for internal
reference, client handoff, and portfolio use. Built with **Next.js (App Router)**,
**TypeScript**, and **Tailwind CSS**.

Currently lists: **BB Homebuyer**, **SS Lawnops**, **BB Internal**, **Worklog**,
and the **Seasonal Services Website**. Content is drawn from the actual project
repos (siblings of this folder under `~/work`).

## Features

- **Homepage index** (`/`) — every app as a card with monogram, category, status
  badge, tagline, and tech stack.
- **Live search & filter** — text search across names/descriptions/tech, plus
  filter chips for category and status.
- **Per-app detail pages** (`/apps/[slug]`) — full description, key features, tech
  stack, status, screenshots, source repo, and a launch link. Statically
  generated via `generateStaticParams`.
- **About page** (`/about`) — what the catalog is and how it's built.
- **SEO** — per-page `title`/`description`/Open Graph via the Next.js Metadata API.
- **Responsive** — mobile and desktop layouts throughout.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (statically prerenders every page)
npm start        # serve the production build
npm run lint     # eslint
```

> If `npm start` ever throws `Cannot find module './NNN.js'`, the `.next` folder
> is stale — run `rm -rf .next && npm run build` and start again.

## Editing the catalog

**All content lives in [`data/apps.ts`](data/apps.ts).** No other file needs
editing to add or update an app. Each entry is a typed `AppEntry`:

```ts
{
  slug: "bb-homebuyer",          // URL slug (/apps/bb-homebuyer), must be unique
  name: "BB Homebuyer",
  tagline: "One-line summary.",  // shown on cards + detail hero
  category: "Real Estate CRM",   // reuse existing values so filters stay tidy
  status: "In Development",       // "Live" | "In Development" | "Maintenance"
  accent: "#2563eb",             // brand color for the monogram tile + accents
  monogram: "BB",                // 1–2 letters in the logo tile
  link: "https://…",             // launch URL; "" => "Not yet deployed"
  repo: "bb-homebuyer-lite-clone", // sibling folder under ~/work
  description: "Full paragraph…",
  features: ["…", "…"],
  techStack: ["Laravel 11", "Vue 3"],
  screenshots: [
    { type: "image", src: "/screenshots/bbh-home.png", label: "…" }, // real image in /public
    { type: "mock", label: "Dashboard" },                            // branded placeholder
  ],
}
```

Adding an app to the array automatically gives it a card on the homepage, a
statically generated detail page, and entries in the search/filter indexes.

### Screenshots

Real imagery harvested from each project repo lives in
[`public/screenshots/`](public/screenshots/) and populates **BB Homebuyer**,
**SS Lawnops**, and the **Seasonal Services Website**. **BB Internal** and
**Worklog** had no usable UI images, so they use a generated branded placeholder
(`type: "mock"`). To swap in real images: drop a file into `public/screenshots/`
and set a screenshot entry to
`{ type: "image", src: "/screenshots/your-file.png", label: "…" }`.

> **Before handoff — two fields need a human pass:**
> - **`status`** — every app except the Seasonal Services Website is set to
>   `In Development` as a safe default. Update each to its real state.
> - **`link`** — only the Seasonal Services Website has a live URL; the rest are
>   `""` and render as "Not yet deployed". Add each production URL as apps ship.

## Project structure

```
app/
  layout.tsx              # root layout, site metadata, header/footer
  page.tsx                # homepage (hero + catalog)
  about/page.tsx          # about page
  apps/[slug]/page.tsx    # per-app detail (generateStaticParams + metadata)
  not-found.tsx           # 404
  globals.css             # Tailwind entry + small utilities
components/               # Header, Footer, AppCard, CatalogBrowser, etc.
data/apps.ts              # THE DATA — edit this to manage listings
public/screenshots/       # real app imagery
legacy/                   # the previous vanilla HTML/CSS/JS version (archived)
```

## Deploying

Deploy to **Vercel** (zero-config) or any host that runs a Next.js build. The
site is fully static (every route is prerendered), so it can also be exported and
served from any static host.

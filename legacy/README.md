# 3Cross App Catalog

A clean, browsable directory of the web applications built for **3Cross** — for
internal reference, client handoff, and portfolio use. Think Clutch / Product
Hunt, scoped to 3Cross's app portfolio.

Currently lists: **BB Homebuyer**, **SS Lawnops**, **BB Internal**, **Worklog**, and
the **Seasonal Services Website**. Content is drawn from the actual project repos
(siblings of this folder under `~/work`).

## Features

- **Homepage index** — every app as a card with logo, category, status, and tech.
- **Search & filter** — live text search plus filter chips for category and status.
- **Per-app profile pages** — full description, key features, tech stack, status,
  screenshots, and a launch link.
- **Zero build step** — plain HTML/CSS/JS. Open the file or host the folder anywhere.

## Running locally

It's a static site. Either open `index.html` directly, or serve the folder:

```bash
# Python (built in on most machines)
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing the catalog

**All content lives in [`data.js`](data.js).** No other file needs editing to add
or update an app. Each app is an object:

```js
{
  id: "bb-homebuyer",        // URL slug, must be unique
  name: "BB Homebuyer",
  tagline: "One-line summary.",
  category: "CRM",           // reuse existing values so filters stay tidy
  status: "Live",            // "Live" | "In Development" | "Maintenance"
  accent: "#2563eb",         // brand color used for logo + accents
  monogram: "BB",            // 1–2 letters shown in the logo tile
  link: "https://…",         // launch / access URL
  description: "Full paragraph…",
  features: ["…", "…"],
  techStack: ["Next.js", "PostgreSQL"],
  screenshots: [
    { type: "mock", label: "Dashboard" },                       // generated SVG placeholder
    { type: "image", src: "assets/screenshots/x.png", label: "…" } // a real image
  ],
}
```

### Screenshots

Real imagery harvested from each project repo already populates **BB Homebuyer**
(its buyer-facing screens), **SS Lawnops** (real in-app job photos), and the
**Seasonal Services Website** (site photography) — see `assets/screenshots/`.
**BB Internal** and **Worklog** had no usable UI images, so they fall back to a
generated branded SVG placeholder (the first screenshot also becomes the card
banner). To swap in more/real images:

1. Drop image files into `assets/screenshots/`.
2. In `data.js`, set a screenshot entry to
   `{ type: "image", src: "assets/screenshots/your-file.png", label: "…" }`
   (or `{ type: "mock", label: "…" }` to use the generated placeholder).

> **Before handoff — two fields need a human pass:**
> - **`status`** — every app except the Seasonal Services Website is set to
>   `In Development` as a safe default. Update each to its real state
>   (`Live` / `In Development` / `Maintenance`).
> - **`link`** — only the Seasonal Services Website has a live URL
>   (`seasonalservices365.com`); the rest are `""` and render as
>   "Not yet deployed". Add each production URL as the apps ship.
>
> Descriptions, features, and tech stacks were extracted from each project's
> source and should be accurate, but are worth a quick review.

## Deploying

Upload the folder to any static host — **Netlify, Vercel, GitHub Pages, S3/CloudFront**,
etc. No server or build is required. Routing is hash-based (`#/app/<id>`), so it
works even on hosts without rewrite rules.

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell (header, footer, mount point). |
| `styles.css` | All styling. |
| `data.js` | **The data** — edit this to manage listings. |
| `app.js` | Rendering, routing, search/filter, SVG placeholders. |

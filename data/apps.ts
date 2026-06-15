/**
 * 3Cross App Catalog — data source
 * -------------------------------------------------------------
 * This single file drives the entire site. To add or edit an app,
 * change the `apps` array below — no other files need to be touched.
 *
 * Content is drawn from the actual project repositories (siblings of
 * this folder under ~/work). Two fields still need a human pass before
 * client handoff:
 *   • status — set per the real deployment state.
 *   • link   — add the production URL once each app is deployed
 *              (leave "" for "Not yet deployed").
 */

export type AppStatus = "Live" | "In Development" | "Maintenance";

export interface Screenshot {
  /** "image" renders a real file from /public; "mock" renders a branded placeholder. */
  type: "image" | "mock";
  /** Path under /public, e.g. "/screenshots/foo.png". Required when type === "image". */
  src?: string;
  label: string;
}

export interface AppEntry {
  /** URL slug — must be unique. Used as /apps/[slug]. */
  slug: string;
  name: string;
  /** One-line summary shown on cards and detail hero. */
  tagline: string;
  category: string;
  status: AppStatus;
  /** Brand color (hex) used for the monogram tile and accents. */
  accent: string;
  /** 1–2 letters shown in the logo tile. */
  monogram: string;
  /** Production launch URL. "" => "Not yet deployed". */
  link: string;
  /** Sibling repository folder under ~/work (for local reference). */
  repo: string;
  /** Full description shown on the detail page. */
  description: string;
  features: string[];
  techStack: string[];
  screenshots: Screenshot[];
}

export const apps: AppEntry[] = [
  {
    slug: "bb-homebuyer",
    name: "BB Homebuyer",
    tagline:
      "Real-estate CRM for custom home builders — capture leads, schedule tours, collect deposits.",
    category: "Real Estate CRM",
    status: "Live",
    accent: "#2563eb",
    monogram: "BB",
    link: "https://bb-lite.buffalobuiltusa.com",
    repo: "bb-homebuyer-lite-clone",
    description:
      "BB Homebuyer is a lead-management and sales platform for custom home builders. " +
      "Prospective buyers browse available properties, submit inquiries, schedule tours, " +
      "and pay refundable reservation deposits, while sales agents manage inventory and " +
      "move every lead through a Kanban sales pipeline — from first inquiry to closed " +
      "deal — inside a single admin console.",
    features: [
      "Property listings with price/bed/status filters and detailed property pages",
      "Lead capture with a drag-and-drop pipeline (new → contacted → tour → deposit → closed)",
      "Calendly tour scheduling with webhook sync back to each inquiry",
      "Stripe deposit payments with receipts and admin-side refunds",
      "Authenticated buyer dashboard tracking inquiries, tours, and payment status",
      "Admin CMS for properties, home-model showcases, and project gallery",
    ],
    techStack: [
      "Laravel 11",
      "Vue 3",
      "Inertia.js",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Stripe",
    ],
    screenshots: [
      { type: "image", src: "/screenshots/bbh-home.png", label: "Buyer-facing home" },
      { type: "image", src: "/screenshots/bbh-portfolio.png", label: "Property portfolio" },
    ],
  },
  {
    slug: "ss-lawnops",
    name: "SS Lawnops",
    tagline:
      "Field-service operations for lawn-care businesses — dispatch, track, and report in real time.",
    category: "Field Service",
    status: "Live",
    accent: "#16a34a",
    monogram: "SS",
    link: "https://lawnops.buffalobuiltusa.com",
    repo: "ss_lawnops_clone",
    description:
      "SS Lawnops is a field-service management platform for lawn-care and landscaping " +
      "operations. Dispatchers schedule one-off and recurring jobs and assign them to " +
      "crews; crew members clock in/out, view assignments, and upload before/after photos " +
      "from the field; and admins track completion, revenue, and service history across " +
      "every client.",
    features: [
      "Job scheduling and crew dispatch with real-time status (scheduled, in progress, completed, skipped)",
      "Crew clock in/out time tracking with automatic duration and timecards",
      "Recurring schedule generation that auto-creates job instances",
      "Client and service management with contract vs. à-la-carte pricing",
      "On-site photo capture for before/after work documentation",
      "Revenue and service reporting with CSV export and Twilio SMS “on the way” alerts",
    ],
    techStack: [
      "Laravel 13",
      "React 19",
      "Inertia.js",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Twilio",
    ],
    screenshots: [
      { type: "image", src: "/screenshots/lawnops-lawn.jpg", label: "On-site job photo" },
      { type: "image", src: "/screenshots/lawnops-jobsite.jpg", label: "On-site job photo" },
    ],
  },
  {
    slug: "bb-internal",
    name: "BB Internal",
    tagline:
      "Construction operations platform consolidating pricing, vendors, projects, and field workflows.",
    category: "Internal Tool",
    status: "In Development",
    accent: "#7c3aed",
    monogram: "BB",
    link: "https://internal.buffalobuiltusa.com",
    repo: "bb-internal-clone",
    description:
      "BB Internal is the back-office operations platform for a custom home builder, built " +
      "to replace manual spreadsheet workflows. It centralizes the company's price book, " +
      "trade-partner directory, and labor/equipment rates, and adds a project takeoff " +
      "calculator that auto-computes material quantities from structural dimensions — " +
      "giving office staff and field crews a single source of truth.",
    features: [
      "Employee time-card portal with live clock in/out and weekly admin oversight",
      "Searchable trade-partner & vendor directory with admin CRUD",
      "Centralized price book (19 categories) with material costs and preferred vendors",
      "Admin-managed labor and equipment rate tables",
      "Project management with a dimension-driven takeoff/estimation calculator",
      "Role-based access — admins edit pricing/rates, crews get read-only operational data",
    ],
    techStack: [
      "Laravel 12",
      "React 19",
      "Inertia.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "SQLite",
    ],
    screenshots: [
      { type: "mock", label: "Price book" },
      { type: "mock", label: "Project takeoff" },
    ],
  },
  {
    slug: "worklog",
    name: "Worklog",
    tagline:
      "Team time-tracking and worklog management with real-time dashboards and allocation analytics.",
    category: "Time Tracking",
    status: "Live",
    accent: "#ea580c",
    monogram: "WL",
    link: "https://worklog.buffalobuiltusa.com",
    repo: "3cross-worklog",
    description:
      "Worklog is a team time-tracking and worklog application. Members log hours against " +
      "tasks, categories, and companies; admins define expected allocations and compare " +
      "plan-vs-actual; and everyone gets real-time dashboards summarizing where time goes. " +
      "It supports multi-company work, spreadsheet import, and role-based reporting for " +
      "billing and planning.",
    features: [
      "Time-entry logging with date, start/end times, tasks, and categories (plus bulk duplicate/archive)",
      "Task and category management with multi-company support",
      "Dashboards with daily/weekly summaries and top categories/companies",
      "Allocations — define expected time and track plan-vs-actual variance",
      "Reports with category/company breakdowns and date-range filtering",
      "User & role management with invitations, resets, and permissions",
    ],
    techStack: [
      "Laravel 13",
      "React 19",
      "Inertia.js",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "PHPSpreadsheet",
    ],
    screenshots: [
      { type: "mock", label: "Time-entry view" },
      { type: "mock", label: "Hours dashboard" },
    ],
  },
  {
    slug: "seasonal-services-website",
    name: "Seasonal Services Website",
    tagline:
      "Marketing site for Seasonal Services — custom landscaping & professional lawn care.",
    category: "Marketing Site",
    status: "Live",
    accent: "#0f766e",
    monogram: "SS",
    link: "https://www.seasonalservices365.com",
    repo: "ss_website_revamp",
    description:
      "A rebuilt marketing website for Seasonal Services LLC, a family-owned landscaping " +
      "and property-maintenance company serving residential, commercial, HOA, and " +
      "municipal clients across the Buffalo–Sheridan region of Wyoming. The site showcases " +
      "service lines and packages, location-specific landing pages, a 3D landscape-design " +
      "showcase, and an MDX-powered blog, with SEO structured data throughout.",
    features: [
      "Six service lines with expandable sub-services and detail pages",
      "Three tiered service packages (Basic, Standard, Premium) with CTAs",
      "3D landscape-design showcase highlighting pre-build renders",
      "Location landing pages for Buffalo, Sheridan, and nearby Wyoming cities",
      "Audience-specific pages (residential, commercial, HOA, municipal, new builds)",
      "MDX content blog with JSON-LD SEO and an auto-generated sitemap",
    ],
    techStack: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "MDX", "GSAP"],
    screenshots: [
      { type: "image", src: "/screenshots/seasonal-frontyard.jpg", label: "Portfolio project" },
      { type: "image", src: "/screenshots/seasonal-aerial.jpg", label: "Landscape design" },
    ],
  },
];

// ---- Derived helpers -------------------------------------------------------

export function getApp(slug: string): AppEntry | undefined {
  return apps.find((a) => a.slug === slug);
}

export const categories: string[] = Array.from(
  new Set(apps.map((a) => a.category)),
).sort();

export const statuses: AppStatus[] = ["Live", "In Development", "Maintenance"];

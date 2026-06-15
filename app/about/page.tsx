import type { Metadata } from "next";
import Link from "next/link";
import { apps, categories } from "@/data/apps";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the 3Cross App Catalog — a directory documenting the web applications built for client 3Cross.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="eyebrow mb-5">About</p>
      <h1 className="text-balance text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
        A single home for the 3Cross portfolio.
      </h1>

      <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-muted text-pretty">
        <p>
          The <span className="font-medium text-ink">3Cross App Catalog</span> is a
          single place to browse the web applications built for client 3Cross. It
          serves three audiences: the internal team needing a quick reference, the
          client receiving a handoff, and anyone reviewing the work as a portfolio.
        </p>
        <p>
          Each listing documents what an app does, the features it ships, the
          technology behind it, its current status, and — where deployed — a link to
          launch it. The homepage searches across names, descriptions, and tech, and
          filters by category or status.
        </p>
        <p>
          The catalog currently documents{" "}
          <span className="font-medium text-ink">{apps.length} applications</span>{" "}
          across {categories.length} categories: {categories.join(", ")}.
        </p>
      </div>

      <hr className="my-12 border-ink/[0.08]" />

      <div className="mt-14">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-canvas shadow-subtle transition hover:bg-ink-soft"
        >
          Browse the catalog
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

function DefItem({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-l-2 border-ink/[0.08] pl-4 sm:flex-row sm:gap-4">
      <dt className="shrink-0 font-mono text-[12px] text-ink sm:w-52">{term}</dt>
      <dd className="text-[15px] leading-relaxed text-ink-muted">{children}</dd>
    </div>
  );
}

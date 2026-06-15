import { apps, categories, statuses } from "@/data/apps";
import CatalogBrowser from "@/components/CatalogBrowser";

export default function HomePage() {
  const liveCount = apps.filter((a) => a.status === "Live").length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink/[0.06]">
        <div className="bg-dots pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-content px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Internal reference · Client handoff · Portfolio
            </p>
            <h1 className="text-balance text-[2.75rem] font-semibold leading-[1.05] tracking-tightest text-ink sm:text-6xl">
              Every app built for 3Cross,
              <span className="text-ink-muted"> in one place.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty">
              A curated directory of 3Cross&apos;s web applications — each with its
              features, tech stack, status, and a launch link. Search and filter to
              find exactly what you need.
            </p>
          </div>

          {/* Stats */}
          <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
            <Stat label="Applications" value={apps.length} />
            <Stat label="Live" value={liveCount} />
            <Stat label="Categories" value={categories.length} />
          </dl>
        </div>
      </section>

      {/* Catalog */}
      <section className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-16">
        <CatalogBrowser apps={apps} categories={categories} statuses={statuses} />
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1">
      <dd className="text-3xl font-semibold tracking-tight text-ink tabular-nums">
        {value}
      </dd>
      <dt className="eyebrow">{label}</dt>
    </div>
  );
}

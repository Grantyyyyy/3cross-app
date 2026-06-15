import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apps, getApp } from "@/data/apps";
import Monogram from "@/components/Monogram";
import StatusBadge from "@/components/StatusBadge";
import ScreenshotFrame from "@/components/ScreenshotFrame";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return { title: "App not found" };

  return {
    title: app.name,
    description: app.tagline,
    openGraph: {
      title: app.name,
      description: app.tagline,
      type: "website",
      images: app.screenshots.find((s) => s.type === "image")?.src,
    },
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink/[0.06]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64"
          style={{
            background: `radial-gradient(60% 100% at 20% 0%, ${app.accent}14, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-content px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10">
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition hover:text-ink"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>{" "}
            All apps
          </Link>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-5">
              <Monogram
                monogram={app.monogram}
                accent={app.accent}
                className="h-16 w-16 text-2xl"
              />
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="eyebrow normal-case tracking-[0.04em]">
                    {app.category}
                  </span>
                  <StatusBadge status={app.status} />
                </div>
                <h1 className="text-balance text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
                  {app.name}
                </h1>
                <p className="mt-3 max-w-xl text-lg text-ink-muted text-pretty">
                  {app.tagline}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {app.link ? (
                <a
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-canvas shadow-subtle transition hover:bg-ink-soft"
                >
                  Launch app
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl border border-ink/[0.08] px-5 py-2.5 text-sm font-medium text-ink-muted">
                  Not yet deployed
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-content gap-12 px-5 py-14 sm:px-8 lg:grid-cols-3 lg:gap-16">
        {/* Main column */}
        <div className="lg:col-span-2">
          <Section label="Overview">
            <p className="text-[17px] leading-relaxed text-ink-soft text-pretty">
              {app.description}
            </p>
          </Section>

          <Section label="Key features" className="mt-14">
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {app.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: app.accent }}
                  />
                  <span className="text-[15px] leading-relaxed text-ink-soft">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Preview" className="mt-14">
            <div className="grid gap-5 sm:grid-cols-2">
              {app.screenshots.map((shot, i) => (
                <figure key={`${shot.label}-${i}`}>
                  <ScreenshotFrame
                    shot={shot}
                    app={app}
                    priority={i === 0}
                    className="aspect-[16/10] w-full rounded-xl border border-ink/[0.08] shadow-subtle"
                  />
                  <figcaption className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    {shot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div>
            <h2 className="eyebrow mb-4">Tech stack</h2>
            <ul className="flex flex-wrap gap-1.5">
              {app.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-ink/[0.08] bg-surface px-2.5 py-1 font-mono text-[12px] text-ink-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <dl className="rounded-2xl border border-ink/[0.08] bg-surface p-5 shadow-subtle">
            <Row label="Status">
              <StatusBadge status={app.status} />
            </Row>
            <Row label="Category" divider>
              <span className="text-sm font-medium text-ink">{app.category}</span>
            </Row>
            <Row label="Repository" divider>
              <code className="rounded-md bg-ink/[0.04] px-1.5 py-0.5 font-mono text-[12px] text-ink-soft">
                {app.repo}
              </code>
            </Row>
            <Row label="Access" divider>
              {app.link ? (
                <a
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-ink underline-offset-4 hover:underline"
                >
                  Live ↗
                </a>
              ) : (
                <span className="text-sm text-ink-muted">Not deployed</span>
              )}
            </Row>
          </dl>
        </aside>
      </div>
    </article>
  );
}

function Section({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="eyebrow mb-4">{label}</h2>
      {children}
    </section>
  );
}

function Row({
  label,
  children,
  divider,
}: {
  label: string;
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-2.5 ${
        divider ? "border-t border-ink/[0.06]" : ""
      }`}
    >
      <dt className="text-sm text-ink-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

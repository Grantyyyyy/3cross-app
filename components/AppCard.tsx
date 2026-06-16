import Link from "next/link";
import type { AppEntry, Screenshot } from "@/data/apps";
import Monogram from "@/components/Monogram";
import StatusBadge from "@/components/StatusBadge";
import ScreenshotFrame from "@/components/ScreenshotFrame";

export default function AppCard({ app }: { app: AppEntry }) {
  const preview: Screenshot = { type: "mock", label: app.name };

  return (
    <Link
      href={`/apps/${app.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/[0.08] bg-surface shadow-subtle transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ink/[0.12] hover:shadow-lift"
    >
      {/* Preview */}
      <div className="relative overflow-hidden">
        <ScreenshotFrame
          shot={preview}
          app={app}
          hideLabel
          className="aspect-[16/10] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/[0.04]" />
        <div className="absolute left-4 top-4">
          <StatusBadge status={app.status} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center gap-3">
          <Monogram
            monogram={app.monogram}
            accent={app.accent}
            icon={app.icon}
            iconDark={app.iconDark}
            name={app.name}
            className="h-10 w-10 text-[15px]"
          />
          <div className="min-w-0">
            <h3 className="truncate font-medium tracking-tight text-ink">
              {app.name}
            </h3>
            <p className="eyebrow normal-case tracking-[0.04em]">{app.category}</p>
          </div>
        </div>

        <p className="mt-auto text-[13.5px] leading-relaxed text-ink-muted text-pretty">
          {app.tagline}
        </p>
      </div>

      {/* Accent hairline reveal on hover */}
      <span
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
        style={{ backgroundColor: app.accent }}
      />
    </Link>
  );
}

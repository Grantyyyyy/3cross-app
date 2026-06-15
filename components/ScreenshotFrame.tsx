import Image from "next/image";
import type { AppEntry, Screenshot } from "@/data/apps";

interface ScreenshotFrameProps {
  shot: Screenshot;
  app: Pick<AppEntry, "monogram" | "accent" | "name">;
  /** Pass true when the image is above the fold (e.g. card banner / hero). */
  priority?: boolean;
  className?: string;
}

/**
 * Renders a real screenshot, or — for `type: "mock"` entries — a refined branded
 * placeholder so apps without UI imagery still look intentional.
 */
export default function ScreenshotFrame({
  shot,
  app,
  priority = false,
  className,
}: ScreenshotFrameProps) {
  const wrapper = `relative overflow-hidden bg-ink/[0.03] ${className ?? ""}`;

  if (shot.type === "image" && shot.src) {
    return (
      <div className={wrapper}>
        <Image
          src={shot.src}
          alt={`${app.name} — ${shot.label}`}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={`${wrapper} flex items-center justify-center`}
      style={{
        background: `radial-gradient(120% 120% at 50% 0%, ${app.accent}12, transparent 70%)`,
      }}
      role="img"
      aria-label={`${app.name} — ${shot.label} (placeholder)`}
    >
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--ink) / 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink) / 0.035) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <span
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-semibold tracking-tight"
          style={{
            color: app.accent,
            backgroundColor: `${app.accent}16`,
            boxShadow: `inset 0 0 0 1px ${app.accent}26`,
          }}
        >
          {app.monogram}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {shot.label}
        </span>
      </div>
    </div>
  );
}

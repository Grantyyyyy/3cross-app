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
 * Renders a real screenshot, or — for `type: "mock"` entries — a branded
 * gradient placeholder so apps without UI imagery still look intentional.
 */
export default function ScreenshotFrame({
  shot,
  app,
  priority = false,
  className,
}: ScreenshotFrameProps) {
  const wrapper = `relative overflow-hidden ${className ?? ""}`;

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
        background: `linear-gradient(135deg, ${app.accent}22, ${app.accent}0a)`,
      }}
      role="img"
      aria-label={`${app.name} — ${shot.label} (placeholder)`}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <span
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-semibold text-white shadow-sm"
          style={{ background: `linear-gradient(135deg, ${app.accent}, ${app.accent}cc)` }}
        >
          {app.monogram}
        </span>
        <span className="text-sm font-medium text-slate-500">{shot.label}</span>
      </div>
    </div>
  );
}

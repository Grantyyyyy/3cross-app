import type { AppStatus } from "@/data/apps";

const DOT: Record<AppStatus, string> = {
  Live: "bg-emerald-500",
  "In Development": "bg-amber-500",
  Maintenance: "bg-sky-500",
};

const RING: Record<AppStatus, string> = {
  Live: "shadow-[0_0_0_3px_rgba(16,185,129,0.15)]",
  "In Development": "shadow-[0_0_0_3px_rgba(245,158,11,0.15)]",
  Maintenance: "shadow-[0_0_0_3px_rgba(14,165,233,0.15)]",
};

/** Minimal status pill: a haloed dot + muted label. */
export default function StatusBadge({ status }: { status: AppStatus }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-2.5 py-1 text-[12px] font-medium text-ink-soft">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]} ${RING[status]}`} />
      {status}
    </span>
  );
}

import type { AppStatus } from "@/data/apps";

const STYLES: Record<AppStatus, string> = {
  Live: "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
  "In Development": "bg-amber-100 text-amber-700 ring-amber-600/20",
  Maintenance: "bg-sky-100 text-sky-700 ring-sky-600/20",
};

const DOT: Record<AppStatus, string> = {
  Live: "bg-emerald-500",
  "In Development": "bg-amber-500",
  Maintenance: "bg-sky-500",
};

export default function StatusBadge({ status }: { status: AppStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${STYLES[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} />
      {status}
    </span>
  );
}

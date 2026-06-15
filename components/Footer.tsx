import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-ink/[0.06]">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ink text-[13px] font-semibold tracking-tight text-canvas">
            3×
          </span>
          <p className="text-sm text-ink-muted">
            Web applications built for{" "}
            <span className="font-medium text-ink">3Cross</span>.
          </p>
        </div>
        <nav className="flex items-center gap-6 text-sm text-ink-muted">
          <Link href="/" className="transition hover:text-ink">
            Apps
          </Link>
          <Link href="/about" className="transition hover:text-ink">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}

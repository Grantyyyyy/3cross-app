import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-bold text-white">
            3×
          </span>
          <span className="text-base font-semibold tracking-tight text-ink">
            3Cross App Catalog
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium text-slate-600">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 transition hover:bg-slate-100 hover:text-ink"
          >
            Apps
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 transition hover:bg-slate-100 hover:text-ink"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

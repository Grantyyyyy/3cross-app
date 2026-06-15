import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/[0.06] bg-surface/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ink text-[13px] font-semibold tracking-tight text-canvas transition group-hover:scale-105">
            3×
          </span>
          <span className="text-[15px] font-medium tracking-tight text-ink">
            3Cross
            <span className="text-ink-muted"> Catalog</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-ink-muted">
          <Link
            href="/"
            className="rounded-full px-3.5 py-1.5 font-medium transition hover:bg-ink/[0.04] hover:text-ink"
          >
            Apps
          </Link>
          <Link
            href="/about"
            className="rounded-full px-3.5 py-1.5 font-medium transition hover:bg-ink/[0.04] hover:text-ink"
          >
            About
          </Link>
          <span className="mx-1 h-4 w-px bg-ink/10" aria-hidden="true" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

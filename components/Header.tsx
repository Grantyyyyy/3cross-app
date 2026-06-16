import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/[0.06] bg-surface/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ink text-canvas transition group-hover:scale-105">
            <svg
              viewBox="12 14 40 34"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <rect x="16.4" y="24" width="3.2" height="22" rx="0.4" />
              <rect x="13" y="29" width="10" height="3.2" rx="0.4" />
              <rect x="30.2" y="16" width="3.6" height="30" rx="0.4" />
              <rect x="25" y="23" width="14" height="3.6" rx="0.4" />
              <rect x="44.4" y="24" width="3.2" height="22" rx="0.4" />
              <rect x="41" y="29" width="10" height="3.2" rx="0.4" />
            </svg>
          </span>
          <span className="text-[15px] font-medium tracking-tight text-ink">
            3Cross
            <span className="text-ink-muted"> Directory Website</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-ink-muted">
          <Link
            href="/"
            className="rounded-full px-3.5 py-1.5 font-medium transition hover:bg-ink/[0.04] hover:text-ink"
          >
            Apps
          </Link>
          <span className="mx-1 h-4 w-px bg-ink/10" aria-hidden="true" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

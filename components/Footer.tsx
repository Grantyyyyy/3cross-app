import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-ink/[0.06]">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ink text-canvas">
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
          <p className="text-sm text-ink-muted">
            Web applications built for{" "}
            <span className="font-medium text-ink">3Cross</span>.
          </p>
        </div>
        <nav className="flex items-center gap-6 text-sm text-ink-muted">
          <Link href="/" className="transition hover:text-ink">
            Apps
          </Link>
        </nav>
      </div>
    </footer>
  );
}

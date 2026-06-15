import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
        <p>
          A directory of web applications built for{" "}
          <span className="font-medium text-slate-700">3Cross</span>.
        </p>
        <nav className="flex items-center gap-4">
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

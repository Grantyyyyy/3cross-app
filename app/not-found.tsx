import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-ink-muted text-pretty">
        The app or page you&apos;re looking for doesn&apos;t exist in the catalog.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-medium text-canvas shadow-subtle transition hover:bg-ink-soft"
      >
        Back to catalog
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </div>
  );
}

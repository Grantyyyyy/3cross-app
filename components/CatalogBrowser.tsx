"use client";

import { useMemo, useState } from "react";
import type { AppEntry, AppStatus } from "@/data/apps";
import AppCard from "@/components/AppCard";

interface CatalogBrowserProps {
  apps: AppEntry[];
  statuses: AppStatus[];
}

export default function CatalogBrowser({
  apps,
  statuses,
}: CatalogBrowserProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return apps.filter((app) => {
      if (status !== "All" && app.status !== status) return false;
      if (!q) return true;
      const haystack = [
        app.name,
        app.tagline,
        app.description,
        app.category,
        ...app.techStack,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [apps, query, status]);

  const dirty = status !== "All" || query !== "";

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-sm">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps, tech, descriptions…"
            aria-label="Search apps"
            className="w-full rounded-xl border border-ink/[0.08] bg-surface py-2.5 pl-10 pr-4 text-sm text-ink shadow-subtle outline-none transition placeholder:text-ink-muted/70 focus:border-ink/20"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <FilterGroup
            label="Status"
            value={status}
            options={["All", ...statuses]}
            onChange={setStatus}
          />
        </div>
      </div>

      {/* Meta row */}
      <div className="mb-6 flex items-center justify-between border-b border-ink/[0.06] pb-4">
        <p className="text-sm text-ink-muted">
          <span className="font-medium text-ink tabular-nums">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "application" : "applications"}
        </p>
        {dirty && (
          <button
            onClick={() => {
              setQuery("");
              setStatus("All");
            }}
            className="text-sm font-medium text-ink-muted underline-offset-4 transition hover:text-ink hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app, i) => (
            <div
              key={app.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i * 50, 300)}ms` }}
            >
              <AppCard app={app} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-ink/15 px-6 py-20 text-center">
          <p className="text-sm font-medium text-ink">No applications match your filters.</p>
          <p className="mt-1 text-sm text-ink-muted">
            Try a different search term or clear the filters.
          </p>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="eyebrow mr-1">{label}</span>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-[13px] font-medium transition ${
              active
                ? "bg-ink text-canvas"
                : "text-ink-muted hover:bg-ink/[0.04] hover:text-ink"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

interface MonogramProps {
  monogram: string;
  accent: string;
  /** Tailwind size + text classes, e.g. "h-12 w-12 text-lg". */
  className?: string;
}

/**
 * Brand tile — a soft tinted square with the app's monogram in its accent color.
 * Tinted rather than saturated for a more refined, minimal feel.
 */
export default function Monogram({ monogram, accent, className }: MonogramProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[0.7em] font-semibold tracking-tight ${
        className ?? "h-12 w-12 text-lg"
      }`}
      style={{
        color: accent,
        backgroundColor: `${accent}14`,
        boxShadow: `inset 0 0 0 1px ${accent}24`,
      }}
      aria-hidden="true"
    >
      {monogram}
    </span>
  );
}

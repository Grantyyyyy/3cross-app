interface MonogramProps {
  monogram: string;
  accent: string;
  /** Tailwind size + text classes, e.g. "h-12 w-12 text-lg". */
  className?: string;
}

/** Brand tile showing an app's 1–2 letter monogram on its accent color. */
export default function Monogram({ monogram, accent, className }: MonogramProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl font-semibold text-white shadow-sm ${
        className ?? "h-12 w-12 text-lg"
      }`}
      style={{
        background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
      }}
      aria-hidden="true"
    >
      {monogram}
    </span>
  );
}

import Image from "next/image";

interface MonogramProps {
  monogram: string;
  accent: string;
  /** Optional brand logo (path under /public). Renders instead of the monogram. */
  icon?: string;
  /** App name, used for the icon's alt text. */
  name?: string;
  /** Tailwind size + text classes, e.g. "h-12 w-12 text-lg". */
  className?: string;
}

/**
 * Brand tile. Renders the app's logo when `icon` is set; otherwise a soft tinted
 * square with the app's monogram in its accent color.
 */
export default function Monogram({
  monogram,
  accent,
  icon,
  name,
  className,
}: MonogramProps) {
  const base = `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[0.7em] font-semibold tracking-tight ${
    className ?? "h-12 w-12 text-lg"
  }`;

  if (icon) {
    return (
      <span className={`relative ${base}`}>
        <Image
          src={icon}
          alt={name ? `${name} logo` : ""}
          fill
          sizes="80px"
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={base}
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

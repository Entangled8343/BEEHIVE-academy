import { cn } from "@/lib/utils";

const palette = [
  "bg-honey-300 text-navy-900",
  "bg-sky-200 text-sky-900",
  "bg-pink-200 text-pink-900",
  "bg-emerald-200 text-emerald-900",
  "bg-violet-200 text-violet-900",
  "bg-orange-200 text-orange-900",
  "bg-lime-200 text-lime-900",
  "bg-navy-200 text-navy-900",
];

export function initials(name: string) {
  const parts = name
    .replace(/^(Miss|Teacher|Prof\.|Lic\.|Don|Doña)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function colorFor(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
}

const sizes = {
  xs: "size-7 text-[11px]",
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  lg: "size-14 text-lg",
  xl: "size-20 text-2xl",
  "2xl": "size-28 text-4xl",
};

/** Adultos: círculo. Alumnos: hexágono (motivo de panal). */
export function Avatar({
  name,
  size = "md",
  kid = false,
  className,
  ring = false,
}: {
  name: string;
  size?: keyof typeof sizes;
  kid?: boolean;
  className?: string;
  ring?: boolean;
}) {
  const inner = (
    <span
      className={cn(
        "grid shrink-0 place-items-center font-display font-semibold select-none",
        kid ? "hex" : "rounded-full",
        sizes[size],
        colorFor(name),
        !ring && className,
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
  if (!ring) return inner;
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center bg-white p-[3px]",
        kid ? "hex" : "rounded-full",
        className,
      )}
    >
      {inner}
    </span>
  );
}

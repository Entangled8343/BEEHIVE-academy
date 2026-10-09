import { cn } from "@/lib/utils";

/** Abejita de la marca (inspirada en el logo). */
export function Bee({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-10", flip && "-scale-x-100", className)}
      aria-hidden
    >
      <ellipse cx="17" cy="30" rx="13" ry="10" fill="#E3E5F2" stroke="#fff" strokeWidth="3" />
      <ellipse cx="47" cy="30" rx="13" ry="10" fill="#E3E5F2" stroke="#fff" strokeWidth="3" />
      <path d="M26 12 Q24 6 20 5" stroke="#2B2C6E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M38 12 Q40 6 44 5" stroke="#2B2C6E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="5" r="2.6" fill="#2B2C6E" />
      <circle cx="44" cy="5" r="2.6" fill="#2B2C6E" />
      <rect x="21" y="11" width="22" height="46" rx="11" fill="#F7D23E" stroke="#fff" strokeWidth="3" />
      <rect x="23" y="27" width="18" height="3.6" rx="1.2" fill="#2B2C6E" />
      <rect x="23" y="34" width="18" height="3.6" rx="1.2" fill="#2B2C6E" />
      <rect x="23" y="41" width="18" height="3.6" rx="1.2" fill="#2B2C6E" />
    </svg>
  );
}

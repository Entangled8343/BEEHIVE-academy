import { cn } from "@/lib/utils";

/** Mundito de la marca Mundo Montessori (el primer círculo del logo). */
export function GlobeMascot({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("size-10", flip && "-scale-x-100", className)} aria-hidden>
      <circle cx="32" cy="32" r="27" fill="#91C2C9" stroke="#fff" strokeWidth="3" />
      <path
        d="M14 22c4-5 9-7 14-6 3 1 3 4 1 6-2 1-1 4 1 5 3 2 2 6-1 8-3 2-3 6-1 9-3 0-6-3-7-7-1-3-4-4-6-6-2-3-2-6-1-9z"
        fill="#76A842"
      />
      <path d="M38 14c4 0 9 3 11 7-2 1-5 0-7 1-2 2-5 1-6-1-1-3 0-6 2-7z" fill="#76A842" />
      <path d="M41 30c3-1 7 0 9 3 1 3 0 7-2 10-2 3-5 4-7 2-1-2 0-4-1-6-1-3-2-7 1-9z" fill="#76A842" />
      <circle cx="49" cy="12" r="5" fill="#E8796A" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

import { cn } from "@/lib/utils";

/** Cometa y estrellas al estilo de las ilustraciones del Curie-verse (trazo blanco irregular). */
export function Comet({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("size-12", flip && "-scale-x-100", className)} aria-hidden>
      <path
        d="M3 6 L22 18 L19 9 L34 22 L33 15 L44 28 Q53 31 56 39 Q58 50 49 55 Q39 59 33 51 Z"
        fill="#215238"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M14 14 L30 25 L29 20 L40 31" fill="none" stroke="#2f6a4b" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 34 Q47 29 53 35 Q59 42 54 49 Q48 55 41 50 Q34 43 40 34 Z" fill="#cfeee6" stroke="#fff" strokeWidth="2.2" />
      <g fill="#8fa89c">
        <path d="M43 38 l3 -1 l1 3 l-3 1 z" />
        <path d="M49 42 l3 0 l0 3 l-3 0 z" />
        <path d="M44 46 l2 -1 l2 2 l-2 1 z" />
      </g>
    </svg>
  );
}

export function Star({ className, tone = "sage" }: { className?: string; tone?: "sage" | "night" | "green" }) {
  const fill = tone === "sage" ? "#9dbbad" : tone === "green" ? "#2f6a4b" : "#131d3b";
  return (
    <svg viewBox="0 0 40 40" className={cn("size-6", className)} aria-hidden>
      <path
        d="M20 3 L24.5 15 L37 15.5 L27 23.5 L30.5 36 L20 28.5 L9.5 36 L13 23.5 L3 15.5 L15.5 15 Z"
        fill={fill}
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

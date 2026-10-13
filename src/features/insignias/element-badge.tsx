import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeDef } from "@/mocks";

/** Insignia estilo tabla periódica (Curie): número atómico, símbolo y nombre del logro. */
export function ElementBadge({
  badge,
  size = "md",
  showLabel = true,
  showStatus = true,
}: {
  badge: BadgeDef;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showStatus?: boolean;
}) {
  const dims = { sm: "size-16", md: "size-20", lg: "size-24" }[size];
  const symbol = { sm: "text-2xl", md: "text-3xl", lg: "text-4xl" }[size];
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={cn(
          "relative grid place-items-center rounded-2xl shadow-soft",
          dims,
          badge.earned ? cn(badge.color, "text-white ring-2 ring-white") : "border-2 border-dashed border-primary-200 bg-primary-50 text-primary-300",
        )}
      >
        <span className="absolute top-1.5 left-2 text-[10px] font-bold opacity-80">{badge.atomicNumber}</span>
        {!badge.earned ? <Lock className="absolute top-1.5 right-1.5 size-3" /> : null}
        <span className={cn("font-display leading-none font-semibold", symbol)}>{badge.symbol}</span>
        <span className="absolute inset-x-1 bottom-1.5 truncate text-[9px] font-semibold tracking-wide uppercase opacity-90">
          {badge.name}
        </span>
      </div>
      {showLabel ? (
        <>
          <p className={cn("mt-2 text-[13px] leading-tight font-bold", badge.earned ? "text-primary-900" : "text-primary-400")}>
            {badge.name}
          </p>
          {!showStatus ? null : badge.earned && badge.earnedOn ? (
            <p className="text-[11px] font-semibold text-primary-400">{badge.earnedOn}</p>
          ) : (
            <p className="text-[11px] font-semibold text-primary-300">Por descubrir</p>
          )}
        </>
      ) : null}
    </div>
  );
}

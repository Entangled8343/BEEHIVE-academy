import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeDef } from "@/mocks";
import { badgeIcons } from "./badge-hex";

/** Logro en círculo, como los tres círculos del logo de Mundo Montessori. */
export function CircleBadge({
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
  const Icon = badgeIcons[badge.icon];
  const dims = { sm: "size-14", md: "size-20", lg: "size-24" }[size];
  const icon = { sm: "size-6", md: "size-8", lg: "size-10" }[size];
  return (
    <div className="flex flex-col items-center text-center">
      {badge.earned ? (
        <div className={cn("grid place-items-center rounded-full bg-white p-[3px] shadow-soft", dims)}>
          <div className={cn("grid size-full place-items-center rounded-full", badge.color)}>
            <div className="grid size-[74%] place-items-center rounded-full bg-white/25">
              <Icon className={cn(icon, "text-white drop-shadow")} strokeWidth={2.4} />
            </div>
          </div>
        </div>
      ) : (
        <div className={cn("relative grid place-items-center rounded-full border-2 border-dashed border-primary-200 bg-primary-50", dims)}>
          <Icon className={cn(icon, "text-primary-200")} strokeWidth={2.2} />
          <span className="absolute -right-0.5 -bottom-0.5 grid size-6 place-items-center rounded-full bg-white text-primary-300 shadow-soft">
            <Lock className="size-3.5" />
          </span>
        </div>
      )}
      {showLabel ? (
        <>
          <p className={cn("mt-2 text-[13px] leading-tight font-bold", badge.earned ? "text-primary-900" : "text-primary-400")}>
            {badge.name}
          </p>
          {!showStatus ? null : badge.earned && badge.earnedOn ? (
            <p className="text-[11px] font-semibold text-primary-400">{badge.earnedOn}</p>
          ) : (
            <p className="text-[11px] font-semibold text-primary-300">Por lograr</p>
          )}
        </>
      ) : null}
    </div>
  );
}

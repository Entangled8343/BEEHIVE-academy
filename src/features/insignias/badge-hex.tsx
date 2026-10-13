import {
  BookOpen,
  Calculator,
  Clock,
  Flag,
  Heart,
  Leaf,
  Lightbulb,
  Lock,
  Medal,
  Music,
  Palette,
  Star,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeDef } from "@/mocks";

const icons = {
  clock: Clock,
  book: BookOpen,
  calc: Calculator,
  heart: Heart,
  star: Star,
  palette: Palette,
  trophy: Trophy,
  leaf: Leaf,
  lightbulb: Lightbulb,
  flag: Flag,
  music: Music,
  medal: Medal,
};

export function BadgeHex({
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
  const Icon = badge.earned ? icons[badge.icon] : Lock;
  const dims = { sm: "size-14", md: "size-20", lg: "size-24" }[size];
  const icon = { sm: "size-6", md: "size-8", lg: "size-10" }[size];
  return (
    <div className="flex flex-col items-center text-center">
      <div className={cn("hex grid place-items-center bg-white p-[3px] shadow-soft", dims)}>
        <div
          className={cn(
            "hex grid size-full place-items-center",
            badge.earned ? badge.color : "bg-primary-100",
          )}
        >
          <div className="hex grid size-[78%] place-items-center bg-white/25">
            <Icon className={cn(icon, badge.earned ? "text-white drop-shadow" : "text-primary-300")} strokeWidth={2.4} />
          </div>
        </div>
      </div>
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

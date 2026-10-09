import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { events } from "@/mocks";

const kindColor: Record<string, string> = {
  actividad: "bg-pink-500",
  evento: "bg-honey-500",
  excursion: "bg-orange-500",
  reunion: "bg-violet-500",
  entrega: "bg-sky-500",
};

export function MonthGrid() {
  // Octubre 2026: el 1 cae jueves (columna 4 con semana de lunes a domingo).
  const lead = [28, 29, 30];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const trail = [1];
  const byDay = new Map<number, (typeof events)[number][]>();
  events.forEach((e) => byDay.set(e.day, [...(byDay.get(e.day) ?? []), e]));
  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="grid size-9 place-items-center rounded-full bg-navy-50 text-navy-700">
          <ChevronLeft className="size-5" />
        </span>
        <p className="font-display text-xl font-semibold">Octubre 2026</p>
        <span className="grid size-9 place-items-center rounded-full bg-navy-50 text-navy-700">
          <ChevronRight className="size-5" />
        </span>
      </div>
      <div className="grid grid-cols-7 text-center text-xs font-bold text-navy-400">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <span key={i} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {lead.map((d) => (
          <span key={`l${d}`} className="grid h-11 place-items-center text-sm font-semibold text-navy-200 sm:h-14">
            {d}
          </span>
        ))}
        {days.map((d) => {
          const ev = byDay.get(d);
          const today = d === 9;
          const weekend = (d + 3) % 7 === 0 || (d + 3) % 7 === 6;
          return (
            <span
              key={d}
              className={cn(
                "relative flex h-11 flex-col items-center justify-center rounded-2xl text-sm font-bold sm:h-14",
                today && "bg-navy-800 text-white",
                !today && ev && "bg-honey-100",
                !today && !ev && weekend && "text-navy-300",
              )}
            >
              {d}
              {ev ? (
                <span className="mt-0.5 flex gap-0.5">
                  {ev.map((e) => (
                    <span key={e.title} className={cn("size-1.5 rounded-full", kindColor[e.kind])} />
                  ))}
                </span>
              ) : null}
            </span>
          );
        })}
        {trail.map((d) => (
          <span key={`t${d}`} className="grid h-11 place-items-center text-sm font-semibold text-navy-200 sm:h-14">
            {d}
          </span>
        ))}
      </div>
    </Card>
  );
}

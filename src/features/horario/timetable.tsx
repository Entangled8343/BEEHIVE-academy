import { Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { subjectColors, timetable } from "@/mocks";

/** Horario semanal de una sección: lista del día en celular, cuadrícula completa en PC. */
export function Timetable() {
  if (!timetable) return null;
  const { days, periods, grid, todayIndex, nowPeriod } = timetable;
  return (
    <>
      {/* Celular: día de hoy */}
      <div className="lg:hidden">
        <div className="scrollbar-none -mx-4 mb-4 flex gap-2 overflow-x-auto px-4">
          {days.map((d, i) => (
            <span
              key={d}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-bold",
                i === todayIndex ? "bg-primary-800 text-white" : "bg-white text-primary-700 shadow-soft ring-1 ring-primary-100",
              )}
            >
              {d}
              {i === todayIndex ? " · hoy" : ""}
            </span>
          ))}
        </div>
        <Card className="divide-y divide-primary-100 overflow-hidden">
          {periods.map((p, r) => {
            const slot = grid[r]?.[todayIndex];
            if (!slot) return null;
            const now = r === nowPeriod;
            if (slot.kind === "receso") {
              return (
                <div key={p.time} className="flex items-center gap-3 bg-primary-50/60 px-4 py-2 text-sm font-semibold text-primary-500">
                  <span className="w-24">
                    {p.time} – {p.end}
                  </span>
                  Receso
                </div>
              );
            }
            return (
              <div key={p.time} className={cn("flex items-center gap-3 px-4 py-3", now && "bg-accent-100")}>
                <div className="w-14 shrink-0 font-display text-sm leading-tight text-primary-600">
                  {p.time}
                  <br />
                  <span className="text-primary-400">{p.end}</span>
                </div>
                <span className={cn("h-10 w-1.5 shrink-0 rounded-full", (subjectColors[slot.subject] ?? "bg-primary-100").split(" ")[0])} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{slot.subject}</p>
                  <p className="truncate text-xs font-semibold text-primary-500">
                    {slot.teacher} · {slot.room}
                  </p>
                </div>
                {now ? <Pill tone="green">Ahora</Pill> : null}
              </div>
            );
          })}
        </Card>
      </div>

      {/* PC: semana completa */}
      <Card className="hidden overflow-hidden lg:block">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-28 bg-primary-50 px-3 py-3 text-left text-xs font-bold text-primary-500 uppercase">Hora</th>
              {days.map((d, i) => (
                <th
                  key={d}
                  className={cn("px-2 py-3 text-left font-bold", i === todayIndex ? "bg-primary-800 text-white" : "bg-primary-50 text-primary-800")}
                >
                  {d}
                  {i === todayIndex ? <span className="ml-1.5 text-xs font-semibold text-accent-300">hoy</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((p, r) => {
              const row = grid[r] ?? [];
              if (row[0]?.kind === "receso") {
                return (
                  <tr key={p.time}>
                    <td className="border-t border-primary-100 px-3 py-1.5 text-xs font-semibold text-primary-400">
                      {p.time} – {p.end}
                    </td>
                    <td colSpan={days.length} className="border-t border-primary-100 bg-primary-50/60 py-1.5 text-center text-xs font-bold tracking-widest text-primary-400 uppercase">
                      Receso
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={p.time}>
                  <td className="border-t border-primary-100 px-3 py-2 align-top font-display text-primary-600">
                    {p.time}
                    <span className="block text-xs text-primary-400">{p.end}</span>
                  </td>
                  {row.map((slot, c) => {
                    const now = c === todayIndex && r === nowPeriod;
                    return (
                      <td key={c} className={cn("border-t border-primary-100 p-1.5", c === todayIndex && "bg-accent-50")}>
                        <div
                          className={cn(
                            "rounded-xl px-2.5 py-2",
                            subjectColors[slot.subject] ?? "bg-primary-100 text-primary-700",
                            now && "ring-2 ring-primary-800",
                          )}
                        >
                          <p className="truncate text-[13px] font-bold">{slot.subject}</p>
                          <p className="flex items-center gap-1 truncate text-[11px] font-semibold opacity-80">
                            <MapPin className="size-3 shrink-0" /> {slot.room}
                          </p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="flex items-center gap-1.5 border-t border-primary-100 px-4 py-3 text-xs font-semibold text-primary-500">
          <Clock className="size-3.5" /> Los cambios de horario o de aula se notifican a alumnos y familias.
        </p>
      </Card>
    </>
  );
}

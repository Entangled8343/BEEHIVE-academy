import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { school, teacherTimetable, users } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Mi horario" };

const sectionColors: Record<string, string> = {
  "9° A": "bg-violet-100 text-violet-800",
  "9° B": "bg-sky-100 text-sky-800",
  "10° A": "bg-emerald-100 text-emerald-800",
  "11° A": "bg-orange-100 text-orange-800",
};

export default function TeacherSchedule() {
  requireModule("horario");
  const tt = teacherTimetable;
  if (!tt) return null;
  const classes = tt.grid.flat().filter((s) => s && s.section && s.subject === "Física").length;
  return (
    <div>
      <PageHeader title="Mi horario" subtitle={`${users.maestro.name} · ${classes} clases por semana · ${school.currentPeriod}`} />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-20 bg-primary-50 px-3 py-3 text-left text-xs font-bold text-primary-500 uppercase">Hora</th>
              {tt.days.map((d, i) => (
                <th key={d} className={cn("px-2 py-3 text-left font-bold", i === 1 ? "bg-primary-800 text-white" : "bg-primary-50 text-primary-800")}>
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tt.periods.map((p, r) => (
              <tr key={p}>
                <td className="border-t border-primary-100 px-3 py-2 font-display text-primary-600">{p}</td>
                {(tt.grid[r] ?? []).map((slot, c) => (
                  <td key={c} className={cn("border-t border-primary-100 p-1.5", c === 1 && "bg-accent-50")}>
                    {slot ? (
                      <div
                        className={cn(
                          "rounded-xl px-2.5 py-2",
                          slot.kind === "club"
                            ? "bg-accent-300 text-primary-900"
                            : slot.section
                              ? sectionColors[slot.section] ?? "bg-primary-100"
                              : "bg-slate-100 text-slate-700",
                        )}
                      >
                        <p className="truncate text-[13px] font-bold">
                          {slot.section ? `${slot.section} · ` : ""}
                          {slot.subject}
                        </p>
                        <p className="truncate text-[11px] font-semibold opacity-80">{slot.room}</p>
                      </div>
                    ) : (
                      <div className="h-11 rounded-xl border-2 border-dashed border-primary-100" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(sectionColors).map(([s, cls]) => (
          <span key={s} className={cn("rounded-full px-3 py-1 text-xs font-bold", cls)}>
            {s}
          </span>
        ))}
        <span className="rounded-full bg-accent-300 px-3 py-1 text-xs font-bold text-primary-900">Club de Ciencias</span>
      </div>
    </div>
  );
}

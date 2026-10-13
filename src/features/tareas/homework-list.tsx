import Link from "next/link";
import { CalendarClock, CheckCircle2, Paperclip, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { homework, subjectColors } from "@/mocks";
import { hasModule } from "@/schools";

const statusPill = {
  pendiente: { tone: "orange", label: "Pendiente" },
  entregada: { tone: "blue", label: "Entregada" },
  calificada: { tone: "green", label: "Calificada" },
  devuelta: { tone: "red", label: "Devuelta" },
  atrasada: { tone: "red", label: "Atrasada" },
} as const;

/** Lista de tareas de un alumno (la usan familias y alumnos). */
export function HomeworkList({ childId, basePath }: { childId: string; basePath: string }) {
  const list = homework.filter((h) => h.childId === childId);
  const count = (s: string) => list.filter((h) => h.status === s).length;
  return (
    <>
      <Tabs
        className="mb-5"
        active={0}
        items={[
          { label: "Pendientes", count: count("pendiente") },
          { label: "Entregadas", count: count("entregada") },
          { label: "Calificadas", count: count("calificada") },
          ...(hasModule("extracurricular") ? [{ label: "Extracurricular", count: 2 }] : []),
        ]}
      />
      <div className="grid gap-3 lg:grid-cols-2">
        {list.map((h) => {
          const st = statusPill[h.status];
          return (
            <Link key={h.id} href={`${basePath}/${h.id}`}>
              <Card className="h-full p-4 transition-shadow hover:shadow-lift">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-bold",
                      subjectColors[h.subject] ?? "bg-primary-100 text-primary-700",
                    )}
                  >
                    {h.subject}
                  </span>
                  <Pill tone={st.tone}>{st.label}</Pill>
                </div>
                <h3 className="mt-3 text-lg leading-snug font-semibold">{h.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-primary-600">{h.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-primary-600">
                  {h.status === "calificada" ? (
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <Star className="size-4 fill-accent-400 text-accent-500" /> {h.score} · {h.band}
                    </span>
                  ) : h.status === "entregada" ? (
                    <span className="flex items-center gap-1.5 text-sky-700">
                      <CheckCircle2 className="size-4" /> {h.dueRelative}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-orange-700">
                      <CalendarClock className="size-4" /> {h.dueRelative} · {h.due}
                    </span>
                  )}
                  {h.attachments ? (
                    <span className="flex items-center gap-1">
                      <Paperclip className="size-4" /> {h.attachments}
                    </span>
                  ) : null}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}

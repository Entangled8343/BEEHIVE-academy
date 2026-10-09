import { Check, Clock, Save, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { roster2A } from "@/mocks";

export const metadata = { title: "Asistencia" };

type Status = "presente" | "ausente" | "tarde" | "justificada";

const statusOf = (i: number): Status =>
  i === 4 ? "justificada" : i === 11 ? "justificada" : i === 7 ? "tarde" : i === 18 ? "ausente" : "presente";

const styles: Record<Status, { cls: string; label: string; icon: React.ReactNode }> = {
  presente: { cls: "bg-emerald-500 text-white", label: "Presente", icon: <Check className="size-5" strokeWidth={3} /> },
  ausente: { cls: "bg-rose-500 text-white", label: "Ausente", icon: <X className="size-5" strokeWidth={3} /> },
  tarde: { cls: "bg-amber-400 text-navy-900", label: "Tarde", icon: <Clock className="size-5" strokeWidth={2.6} /> },
  justificada: { cls: "bg-sky-500 text-white", label: "Justificada", icon: <span className="text-xs font-black">J</span> },
};

export default function AttendancePage() {
  const counts = roster2A.reduce(
    (acc, _, i) => ({ ...acc, [statusOf(i)]: (acc[statusOf(i)] ?? 0) + 1 }),
    {} as Record<Status, number>,
  );
  return (
    <div>
      <PageHeader
        title="Pasar lista"
        subtitle="2° A · Viernes 9 de octubre"
        action={
          <Button size="sm" variant="soft" className="hidden sm:inline-flex">
            Marcar todos presentes
          </Button>
        }
      />
      <div className="mb-4 grid grid-cols-4 gap-2">
        {(Object.keys(styles) as Status[]).map((s) => (
          <div key={s} className="rounded-2xl bg-white p-2.5 text-center shadow-soft ring-1 ring-navy-100/70">
            <p className="font-display text-2xl font-semibold">{counts[s] ?? 0}</p>
            <p className="text-[11px] font-bold text-navy-500">{styles[s].label}</p>
          </div>
        ))}
      </div>
      <p className="mb-3 text-sm font-semibold text-navy-600">Toca a cada alumno para cambiar su estado.</p>
      <Card className="divide-y divide-navy-100 lg:grid lg:grid-cols-2 lg:divide-y-0">
        {roster2A.map((name, i) => {
          const st = statusOf(i);
          return (
            <div key={name} className="flex items-center gap-3 px-4 py-2.5 lg:border-b lg:border-navy-100">
              <span className="w-5 text-right text-xs font-bold text-navy-300">{i + 1}</span>
              <Avatar name={name} size="sm" kid />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{name}</p>
                {st === "justificada" ? (
                  <p className="text-xs font-semibold text-sky-700">Reportado por la familia · Cita médica</p>
                ) : st === "tarde" ? (
                  <p className="text-xs font-semibold text-amber-700">Llegó 7:25 a. m.</p>
                ) : null}
              </div>
              <span className={cn("grid size-10 place-items-center rounded-full shadow-soft", styles[st].cls)}>
                {styles[st].icon}
              </span>
            </div>
          );
        })}
      </Card>
      <div className="sticky bottom-[calc(4.75rem+env(safe-area-inset-bottom))] mt-4 lg:bottom-4">
        <Button block size="lg" className="shadow-lift">
          <Save /> Guardar asistencia
        </Button>
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-navy-500">
        <Pill tone="green" size="sm">Sin señal</Pill> Se guarda en el teléfono y se envía al volver la conexión.
      </p>
    </div>
  );
}

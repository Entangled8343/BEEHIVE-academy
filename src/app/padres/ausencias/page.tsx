import { CalendarDays, CheckCircle2, FileUp, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/field";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { ListRow } from "@/components/ui/tiles";
import { cn } from "@/lib/utils";
import { absenceDefaults, absenceReports, children } from "@/mocks";

export const metadata = { title: "Reportar ausencia" };

const reasons = ["Enfermedad", "Cita médica", "Viaje familiar", "Asunto familiar", "Otro"];

export default function AbsencePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Reportar ausencia" subtitle="La maestra lo verá al pasar lista" back="/padres" />
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-3">
          <p className="mb-2 text-sm font-bold text-primary-800">¿Quién faltará?</p>
          <div className="grid grid-cols-2 gap-2">
            {children.map((c, i) => (
              <div
                key={c.id}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border-2 p-2.5",
                  i === 0 ? "border-primary-800 bg-primary-50" : "border-primary-100 bg-white",
                )}
              >
                <Avatar name={c.name} size="sm" kid />
                <div className="min-w-0">
                  <p className="truncate font-bold">{c.shortName}</p>
                  <p className="truncate text-xs font-semibold text-primary-500">{c.grade}</p>
                </div>
                {i === 0 ? <CheckCircle2 className="ml-auto size-5 shrink-0 text-primary-800" /> : null}
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Field label="Desde">
              <div className="relative">
                <Input defaultValue={absenceDefaults.from} readOnly />
                <CalendarDays className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-primary-400" />
              </div>
            </Field>
            <Field label="Hasta">
              <div className="relative">
                <Input defaultValue={absenceDefaults.to} readOnly />
                <CalendarDays className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-primary-400" />
              </div>
            </Field>
          </div>

          <p className="mt-5 mb-2 text-sm font-bold text-primary-800">Motivo</p>
          <div className="flex flex-wrap gap-2">
            {reasons.map((r, i) => (
              <span
                key={r}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-bold",
                  i === absenceDefaults.reason ? "bg-primary-800 text-white" : "bg-primary-50 text-primary-700",
                )}
              >
                {r}
              </span>
            ))}
          </div>

          <Field label="Detalles (opcional)" className="mt-5">
            <Textarea defaultValue={absenceDefaults.details} />
          </Field>

          <button className="mt-4 flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-primary-200 p-4 text-left">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary-50 text-primary-700">
              <FileUp className="size-5" />
            </span>
            <span>
              <span className="block font-bold">Adjuntar constancia médica</span>
              <span className="text-xs font-semibold text-primary-500">Foto o PDF · opcional</span>
            </span>
          </button>

          <Button block size="lg" className="mt-5">
            <Send /> Enviar reporte
          </Button>
        </Card>

        <section className="lg:col-span-2">
          <SectionTitle>Reportes recientes</SectionTitle>
          <Card className="divide-y divide-primary-100">
            {absenceReports.map((r) => (
              <ListRow key={r.title} title={r.title} subtitle={r.subtitle} trailing={<Pill tone="green">Justificada</Pill>} />
            ))}
          </Card>
        </section>
      </div>
    </div>
  );
}

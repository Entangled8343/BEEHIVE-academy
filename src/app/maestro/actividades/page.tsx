import { CalendarHeart, Clock, FileSignature, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/field";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { MonthGrid } from "@/features/calendario/month-grid";
import { activityForm as f, monthlyActivities, rosterLabel, school } from "@/mocks";

export const metadata = { title: "Actividades del mes" };


export default function MonthlyActivitiesPage() {
  return (
    <div>
      <PageHeader title="Actividades del mes" subtitle={`${rosterLabel} · ${school.monthLabel}`} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-pink-100 text-pink-700">
              <CalendarHeart className="size-5" />
            </span>
            <p className="font-display text-lg font-semibold">Nueva actividad</p>
          </div>
          <div className="space-y-4">
            <Field label="Título">
              <Input defaultValue={f.title} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fecha">
                <Input defaultValue={f.date} readOnly />
              </Field>
              <Field label="Hora">
                <div className="relative">
                  <Input defaultValue={f.time} readOnly />
                  <Clock className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-primary-400" />
                </div>
              </Field>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-bold text-primary-800">Categoría</p>
              <div className="flex flex-wrap gap-2">
                {f.categories.map((c, i) => (
                  <span
                    key={c}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-sm font-bold",
                      i === f.category ? "bg-primary-800 text-white" : "bg-primary-50 text-primary-700",
                    )}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <Field label="Descripción para las familias">
              <Textarea defaultValue={f.description} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 rounded-2xl border-2 border-dashed border-primary-200 p-3 text-sm font-bold text-primary-700">
                <ImagePlus className="size-5" /> Imagen
              </button>
              <button className="flex items-center gap-2 rounded-2xl border-2 border-accent-300 bg-accent-50 p-3 text-sm font-bold text-primary-800">
                <FileSignature className="size-5" /> Pedir permiso
              </button>
            </div>
            <Button block>Publicar actividad</Button>
          </div>
        </Card>
        <div className="space-y-5">
          <MonthGrid />
          <section>
            <SectionTitle>Publicadas</SectionTitle>
            <Card className="divide-y divide-primary-100">
              {monthlyActivities.map((m) => (
                <div key={m.title} className="flex items-center gap-3 px-4 py-3">
                  <span className="w-12 font-display text-sm font-semibold text-primary-500">{m.date}</span>
                  <p className="flex-1 font-bold">{m.title}</p>
                  <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", m.color)}>{m.category}</span>
                </div>
              ))}
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

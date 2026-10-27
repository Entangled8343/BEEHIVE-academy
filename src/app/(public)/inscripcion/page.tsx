import { ArrowRight, CalendarDays, Check, FileText, Lock } from "lucide-react";
import { Mascot } from "@/components/brand/mascot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { enrollmentForm as f } from "@/mocks";
import { schoolConfig } from "@/schools";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Pre-inscripción" };

const steps = ["Alumno", "Familia", "Documentos", "Confirmar"];

export default function EnrollmentForm() {
  requireModule("preinscripcion");
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <div className="mb-6 flex items-center gap-3">
        <Mascot className="size-12" />
        <div>
          <p className="text-sm font-bold tracking-widest text-accent-700 uppercase">Año escolar {f.year}</p>
          <h1 className="text-3xl leading-tight font-semibold lg:text-4xl">Pre-inscripción</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card className="p-5 lg:p-8">
          <ol className="mb-8 grid grid-cols-4 gap-2">
            {steps.map((s, i) => (
              <li key={s} className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className={cn(
                    "grid size-10 place-items-center font-display font-semibold",
                    schoolConfig.brand.kidAvatar === "circle" ? "rounded-full" : "hex",
                    i === 0 ? "bg-accent-400 text-primary-900" : "bg-primary-100 text-primary-400",
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn("text-xs font-bold", i === 0 ? "text-primary-900" : "text-primary-400")}>{s}</span>
              </li>
            ))}
          </ol>

          <h2 className="text-xl font-semibold">Datos del alumno</h2>
          <p className="mb-5 text-sm text-primary-600">Paso 1 de 4 · Toma unos 5 minutos</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombres">
              <Input defaultValue={f.first} />
            </Field>
            <Field label="Apellidos">
              <Input defaultValue={f.last} />
            </Field>
            <Field label="Fecha de nacimiento">
              <div className="relative">
                <Input defaultValue={f.birth} />
                <CalendarDays className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-primary-400" />
              </div>
            </Field>
            <Field label="Grado al que aplica" hint={f.gradeHint}>
              <Select defaultValue="p1">
                <option value="p1">{f.gradeOption}</option>
              </Select>
            </Field>
            <Field label="Colegio o CDI anterior (si aplica)" className="sm:col-span-2">
              <Input placeholder={f.previousSchool} />
            </Field>
            <div className="sm:col-span-2">
              <p className="mb-1.5 text-sm font-bold text-primary-800">¿Tiene hermanos en {schoolConfig.shortName}?</p>
              <div className="flex gap-2">
                {["No", "Sí"].map((o, i) => (
                  <span
                    key={o}
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-bold",
                      i === 0 ? "bg-primary-800 text-white" : "bg-primary-50 text-primary-700",
                    )}
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>
            <Field label="Alergias, condiciones o necesidades especiales" className="sm:col-span-2">
              <Textarea placeholder="Cuéntanos lo que debemos saber para acompañarle mejor" />
            </Field>
          </div>
          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-primary-500">
              <Lock className="size-3.5" /> Tus datos están protegidos
            </p>
            <Button size="lg">
              Siguiente <ArrowRight />
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="pattern-dark bg-primary-800 p-5 text-white ring-0">
            <p className="font-display text-lg font-semibold text-accent-400">¿Cómo funciona?</p>
            <ol className="mt-3 space-y-3">
              {f.steps.map(([t, d], i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-400 text-sm font-bold text-primary-900">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-bold">{t}</span>
                    <span className="text-sm text-primary-200">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Card>
          <Card className="p-5">
            <p className="font-display text-lg font-semibold">Ten a mano</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-primary-700">
              {f.documents.map((d) => (
                <li key={d} className="flex items-center gap-2">
                  <FileText className="size-4 text-accent-600" /> {d}
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <Check className="size-4" /> Puedes tomarles foto con el celular
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}

import { ArrowRight, CalendarDays, Check, FileText, Lock } from "lucide-react";
import { Bee } from "@/components/brand/bee";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export const metadata = { title: "Pre-inscripción 2027" };

const steps = ["Alumno", "Familia", "Documentos", "Confirmar"];

export default function EnrollmentForm() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <div className="mb-6 flex items-center gap-3">
        <Bee className="size-12" />
        <div>
          <p className="text-sm font-bold tracking-widest text-honey-700 uppercase">Año escolar 2027</p>
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
                    "hex grid size-10 place-items-center font-display font-semibold",
                    i === 0 ? "bg-honey-400 text-navy-900" : "bg-navy-100 text-navy-400",
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn("text-xs font-bold", i === 0 ? "text-navy-900" : "text-navy-400")}>{s}</span>
              </li>
            ))}
          </ol>

          <h2 className="text-xl font-semibold">Datos del alumno</h2>
          <p className="mb-5 text-sm text-navy-600">Paso 1 de 4 · Toma unos 5 minutos</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombres">
              <Input defaultValue="Lucía Valentina" />
            </Field>
            <Field label="Apellidos">
              <Input defaultValue="Ortega Ruiz" />
            </Field>
            <Field label="Fecha de nacimiento">
              <div className="relative">
                <Input defaultValue="14 / 03 / 2023" />
                <CalendarDays className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-navy-400" />
              </div>
            </Field>
            <Field label="Grado al que aplica" hint="Según la edad al 1 de febrero de 2027">
              <Select defaultValue="p1">
                <option value="p1">Preescolar I (3 años)</option>
              </Select>
            </Field>
            <Field label="Colegio o CDI anterior (si aplica)" className="sm:col-span-2">
              <Input placeholder="Ej. CDI Los Pinitos" />
            </Field>
            <div className="sm:col-span-2">
              <p className="mb-1.5 text-sm font-bold text-navy-800">¿Tiene hermanos en Beehive?</p>
              <div className="flex gap-2">
                {["No", "Sí"].map((o, i) => (
                  <span
                    key={o}
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-bold",
                      i === 0 ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-700",
                    )}
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>
            <Field label="Alergias, condiciones o necesidades especiales" className="sm:col-span-2">
              <Textarea placeholder="Cuéntanos lo que debemos saber para cuidarla mejor" />
            </Field>
          </div>
          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-navy-500">
              <Lock className="size-3.5" /> Tus datos están protegidos
            </p>
            <Button size="lg">
              Siguiente <ArrowRight />
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="honeycomb-navy bg-navy-800 p-5 text-white ring-0">
            <p className="font-display text-lg font-semibold text-honey-400">¿Cómo funciona?</p>
            <ol className="mt-3 space-y-3">
              {[
                ["Envía tu solicitud", "Recibes un código para ver el estado."],
                ["Revisamos los documentos", "Te avisamos si falta algo."],
                ["Visita y entrevista", "Agenda el día que te quede mejor."],
                ["Respuesta y matrícula", "Te enviamos el acceso al portal."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-honey-400 text-sm font-bold text-navy-900">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-bold">{t}</span>
                    <span className="text-sm text-navy-200">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Card>
          <Card className="p-5">
            <p className="font-display text-lg font-semibold">Ten a mano</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-navy-700">
              {["Partida de nacimiento", "Tarjeta de vacunas", "Cédula del padre, madre o tutor", "Foto del niño o niña"].map((d) => (
                <li key={d} className="flex items-center gap-2">
                  <FileText className="size-4 text-honey-600" /> {d}
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

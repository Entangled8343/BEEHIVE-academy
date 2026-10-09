import { BookOpen, FileText, GripVertical, Link2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";

export const metadata = { title: "Temario" };

const weeks = [
  { week: "Semana 1 · 5–9 oct", topic: "Los municipios de Masaya", objective: "Ubica en el mapa los 9 municipios del departamento.", resources: 2, done: true },
  { week: "Semana 2 · 12–16 oct", topic: "Nuestras tradiciones: el Güegüense", objective: "Reconoce el Güegüense como patrimonio cultural.", resources: 3, done: false },
  { week: "Semana 3 · 19–23 oct", topic: "El volcán Masaya y los recursos naturales", objective: "Describe la importancia del parque nacional.", resources: 1, done: false },
  { week: "Semana 4 · 26–30 oct", topic: "Mi comunidad y sus servicios", objective: "Identifica los servicios públicos de su barrio.", resources: 0, done: false },
];

export default function SyllabusPage() {
  return (
    <div>
      <PageHeader
        title="Temario"
        subtitle="Las familias ven el temario publicado en la app"
        action={
          <Button variant="honey" size="sm" className="hidden sm:inline-flex">
            Publicar temario
          </Button>
        }
      />
      <div className="mb-5 grid grid-cols-3 gap-2 sm:max-w-2xl">
        <Select defaultValue="a">
          <option value="a">2° A</option>
        </Select>
        <Select defaultValue="b">
          <option value="b">Estudios Sociales</option>
        </Select>
        <Select defaultValue="c">
          <option value="c">IV Corte</option>
        </Select>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          {weeks.map((w) => (
            <Card key={w.week} className="flex gap-3 p-4">
              <GripVertical className="mt-1 size-5 shrink-0 text-navy-200" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-bold tracking-wide text-honey-700 uppercase">{w.week}</p>
                  {w.done ? <Pill tone="green" size="sm">Visto</Pill> : null}
                </div>
                <p className="mt-1 font-display text-lg leading-snug font-semibold">{w.topic}</p>
                <p className="text-sm text-navy-600">{w.objective}</p>
                {w.resources ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Pill tone="navy" size="sm">
                      <FileText /> Guía.pdf
                    </Pill>
                    {w.resources > 1 ? (
                      <Pill tone="violet" size="sm">
                        <Link2 /> Video
                      </Pill>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </Card>
          ))}
          <button className="flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-navy-200 py-4 font-bold text-navy-600">
            <Plus className="size-5" /> Agregar semana
          </button>
        </div>

        <Card className="self-start p-5 lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-honey-200 text-honey-700">
              <BookOpen className="size-5" />
            </span>
            <p className="font-display text-lg font-semibold">Nuevo tema</p>
          </div>
          <div className="space-y-4">
            <Field label="Semana">
              <Select defaultValue="s">
                <option value="s">Semana 4 · 26–30 oct</option>
              </Select>
            </Field>
            <Field label="Tema">
              <Input defaultValue="Mi comunidad y sus servicios" />
            </Field>
            <Field label="Objetivo de aprendizaje">
              <Textarea defaultValue="Identifica los servicios públicos de su barrio y su importancia." />
            </Field>
            <button className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-navy-200 p-3 text-left">
              <Upload className="size-5 text-navy-500" />
              <span className="text-sm font-bold text-navy-700">Subir PDF, imagen o enlace</span>
            </button>
            <Button block>Guardar tema</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

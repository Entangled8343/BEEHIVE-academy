import { BookOpen, FileText, GripVertical, Link2, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { syllabus } from "@/mocks";

export const metadata = { title: "Temario" };


export default function SyllabusPage() {
  return (
    <div>
      <PageHeader
        title="Temario"
        subtitle="Las familias ven el temario publicado en la app"
        action={
          <Button variant="accent" size="sm" className="hidden sm:inline-flex">
            Publicar temario
          </Button>
        }
      />
      <div className="mb-5 grid grid-cols-3 gap-2 sm:max-w-2xl">
        <Select defaultValue="f0">
          <option value="f0">{syllabus.filters[0]}</option>
        </Select>
        <Select defaultValue="f1">
          <option value="f1">{syllabus.filters[1]}</option>
        </Select>
        <Select defaultValue="f2">
          <option value="f2">{syllabus.filters[2]}</option>
        </Select>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          {syllabus.weeks.map((w) => (
            <Card key={w.week} className="flex gap-3 p-4">
              <GripVertical className="mt-1 size-5 shrink-0 text-primary-200" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-bold tracking-wide text-accent-700 uppercase">{w.week}</p>
                  {w.done ? <Pill tone="green" size="sm">Visto</Pill> : null}
                </div>
                <p className="mt-1 font-display text-lg leading-snug font-semibold">{w.topic}</p>
                <p className="text-sm text-primary-600">{w.objective}</p>
                {w.resources ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Pill tone="primary" size="sm">
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
          <button className="flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-primary-200 py-4 font-bold text-primary-600">
            <Plus className="size-5" /> Agregar semana
          </button>
        </div>

        <Card className="self-start p-5 lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-accent-200 text-accent-700">
              <BookOpen className="size-5" />
            </span>
            <p className="font-display text-lg font-semibold">Nuevo tema</p>
          </div>
          <div className="space-y-4">
            <Field label="Semana">
              <Select defaultValue="s">
                <option value="s">{syllabus.newTopic.week}</option>
              </Select>
            </Field>
            <Field label="Tema">
              <Input defaultValue={syllabus.newTopic.topic} />
            </Field>
            <Field label="Objetivo de aprendizaje">
              <Textarea defaultValue={syllabus.newTopic.objective} />
            </Field>
            <button className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-primary-200 p-3 text-left">
              <Upload className="size-5 text-primary-500" />
              <span className="text-sm font-bold text-primary-700">Subir PDF, imagen o enlace</span>
            </button>
            <Button block>Guardar tema</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

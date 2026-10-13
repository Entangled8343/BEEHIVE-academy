import { notFound } from "next/navigation";
import { Camera, FileText, ImagePlus, Info, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Textarea } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { homework, homeworkDetail, subjectColors } from "@/mocks";
import { LabPhoto, NotebookPhoto } from "./photos";

/** Detalle de tarea y entrega con fotos. La usan familias (por sus hijos) y alumnos (por sí mismos). */
export function HomeworkSubmit({ id, back, student = false }: { id: string; back: string; student?: boolean }) {
  const h = homework.find((x) => x.id === id);
  if (!h) notFound();
  const detail = homeworkDetail.id === h.id ? homeworkDetail : null;
  const Photo = detail?.photo === "laboratorio" ? LabPhoto : NotebookPhoto;
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Entregar tarea" back={back} eyebrow={detail?.childLabel} />
      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", subjectColors[h.subject] ?? "bg-primary-100 text-primary-700")}>
              {h.subject}
            </span>
            <Pill tone="orange">{h.dueRelative}</Pill>
          </div>
          <h2 className="mt-3 text-2xl leading-tight font-semibold">{h.title}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-primary-700">{h.description}</p>
          {detail ? (
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-primary-50 p-3">
              <span className="grid size-10 place-items-center rounded-xl bg-rose-500 text-white">
                <FileText className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{detail.attachment.name}</p>
                <p className="text-xs font-semibold text-primary-500">Material de apoyo · {detail.attachment.size}</p>
              </div>
            </div>
          ) : null}
          <div className="mt-4 flex items-center gap-3 border-t border-primary-100 pt-4">
            <Avatar name={h.teacher} size="sm" />
            <div>
              <p className="text-sm font-bold">{h.teacher}</p>
              <p className="text-xs font-semibold text-primary-500">Fecha de entrega: {h.due}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-3">
          <h3 className="text-lg font-semibold">{student ? "Mi entrega" : "Fotos de la tarea"}</h3>
          <p className="text-sm text-primary-600">Toma fotos claras de cada página o sube tu documento. Máximo 10 archivos.</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Photo variant={0} />
            <Photo variant={1} />
            <button className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/50 text-primary-600">
              <ImagePlus className="size-7" />
              <span className="text-xs font-bold">Agregar</span>
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button variant="soft" size="sm">
              <Camera /> Tomar foto
            </Button>
            <Button variant="soft" size="sm">
              <FileText /> {student ? "Subir archivo" : "Subir PDF"}
            </Button>
          </div>
          <Field label={student ? "Comentario para el docente (opcional)" : "Mensaje para la maestra (opcional)"} className="mt-5">
            <Textarea defaultValue={detail?.parentNote} />
          </Field>
          <p className="mt-3 flex items-start gap-2 rounded-2xl bg-accent-50 p-3 text-xs font-semibold text-primary-700">
            <Info className="mt-0.5 size-4 shrink-0 text-accent-600" />
            {student
              ? "Tu familia también puede ver lo que entregas. Las fotos se optimizan para subir rápido."
              : "Las fotos se optimizan automáticamente para que suban rápido aunque tengas poca señal."}
          </p>
          <Button block size="lg" className="mt-4">
            <Send /> Entregar tarea
          </Button>
        </Card>
      </div>
    </div>
  );
}

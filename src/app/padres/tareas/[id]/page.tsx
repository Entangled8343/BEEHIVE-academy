import { notFound } from "next/navigation";
import { Camera, FileText, ImagePlus, Info, Send, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Textarea } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { homework, subjectColors } from "@/mocks";

export function generateStaticParams() {
  return homework.map((h) => ({ id: h.id }));
}

/** Simula la foto de un cuaderno (en producción: la foto comprimida que sube el padre). */
function NotebookPhoto({ variant }: { variant: number }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#fdfcf7] shadow-soft ring-1 ring-navy-100">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent 0 13px, #c9d6ef 13px 14px)",
          backgroundPosition: "0 18px",
        }}
      />
      <div className="absolute inset-y-0 left-4 w-px bg-rose-300" />
      <div className="absolute top-5 right-3 left-6 space-y-[14px]">
        {[80, 95, 70, 88, 60].map((w, i) => (
          <div
            key={i}
            className="h-[3px] rounded-full bg-navy-700/70"
            style={{ width: `${(w + variant * 7) % 100}%` }}
          />
        ))}
      </div>
      {variant === 1 ? (
        <div className="absolute right-4 bottom-5 grid size-14 place-items-center rounded-full bg-honey-300 text-2xl">
          🦆
        </div>
      ) : null}
      <button
        className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-navy-900/70 text-white"
        aria-label="Quitar foto"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

export default async function HomeworkDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const h = homework.find((x) => x.id === id);
  if (!h) notFound();
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Entregar tarea" back="/padres/tareas" eyebrow="Mateo · 2° A" />
      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-bold",
                subjectColors[h.subject] ?? "bg-navy-100 text-navy-700",
              )}
            >
              {h.subject}
            </span>
            <Pill tone="orange">{h.dueRelative}</Pill>
          </div>
          <h2 className="mt-3 text-2xl leading-tight font-semibold">{h.title}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-navy-700">{h.description}</p>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-navy-50 p-3">
            <span className="grid size-10 place-items-center rounded-xl bg-rose-500 text-white">
              <FileText className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">El-patito-feo.pdf</p>
              <p className="text-xs font-semibold text-navy-500">Material de apoyo · 1.2 MB</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-navy-100 pt-4">
            <Avatar name={h.teacher} size="sm" />
            <div>
              <p className="text-sm font-bold">{h.teacher}</p>
              <p className="text-xs font-semibold text-navy-500">Fecha de entrega: {h.due}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-3">
          <h3 className="text-lg font-semibold">Fotos de la tarea</h3>
          <p className="text-sm text-navy-600">Toma fotos claras de cada página. Máximo 10 fotos o PDF.</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <NotebookPhoto variant={0} />
            <NotebookPhoto variant={1} />
            <button className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-navy-200 bg-navy-50/50 text-navy-600">
              <ImagePlus className="size-7" />
              <span className="text-xs font-bold">Agregar</span>
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button variant="soft" size="sm">
              <Camera /> Tomar foto
            </Button>
            <Button variant="soft" size="sm">
              <FileText /> Subir PDF
            </Button>
          </div>
          <Field label="Mensaje para la maestra (opcional)" className="mt-5">
            <Textarea defaultValue="Mateo lo hizo solito, solo le ayudamos con la letra del dibujo 😊" />
          </Field>
          <p className="mt-3 flex items-start gap-2 rounded-2xl bg-honey-50 p-3 text-xs font-semibold text-navy-700">
            <Info className="mt-0.5 size-4 shrink-0 text-honey-600" />
            Las fotos se optimizan automáticamente para que suban rápido aunque tengas poca señal.
          </p>
          <Button block size="lg" className="mt-4">
            <Send /> Entregar tarea
          </Button>
        </Card>
      </div>
    </div>
  );
}

import { ChevronLeft, ChevronRight, MessageSquareText, Plus, RotateCcw, Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { LabReportPhoto, MapPhoto } from "@/features/tareas/photos";
import { cn } from "@/lib/utils";
import { review, submissions } from "@/mocks";

export const metadata = { title: "Revisar entregas" };

export default function ReviewPage() {
  const current = submissions[review.current]!;
  const [delivered, total, reviewed] = review.progress;
  const stars = Math.round((review.score / review.maxScore) * 5);
  return (
    <div>
      <PageHeader
        title="Revisar entregas"
        subtitle={`${review.title} · ${review.subject}`}
        action={
          <Button size="sm" className="hidden sm:inline-flex">
            <Plus /> Nueva tarea
          </Button>
        }
      />
      <div className="mb-5 flex items-center gap-3">
        <Progress value={(delivered / total) * 100} className="flex-1" barClassName="bg-emerald-500" />
        <span className="text-sm font-bold text-primary-600">
          {delivered} de {total} entregaron · {reviewed} revisadas
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <Card className="hidden divide-y divide-primary-100 self-start overflow-hidden lg:block">
          {submissions.map((s) => (
            <div key={s.student} className={cn("flex items-center gap-3 px-4 py-3", s.student === current.student && "bg-accent-100")}>
              <Avatar name={s.student} size="sm" kid />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{s.student}</p>
                <p className="text-xs font-semibold text-primary-500">{s.time}</p>
              </div>
              {s.late ? (
                <Pill tone="orange" size="sm">
                  Tarde
                </Pill>
              ) : null}
            </div>
          ))}
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Avatar name={current.student} size="md" kid />
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-semibold">{current.student}</p>
              <p className="text-sm font-semibold text-primary-600">
                Entregado {current.time} · {review.submittedBy}
              </p>
            </div>
            <div className="flex gap-1.5">
              <span className="grid size-10 place-items-center rounded-full bg-primary-50 text-primary-700">
                <ChevronLeft className="size-5" />
              </span>
              <span className="grid size-10 place-items-center rounded-full bg-primary-800 text-white">
                <ChevronRight className="size-5" />
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {review.photo === "laboratorio" ? (
              <>
                <LabReportPhoto variant={0} />
                <LabReportPhoto variant={1} />
              </>
            ) : (
              <>
                <MapPhoto tint="#fde68a" />
                <MapPhoto tint="#bbf7d0" />
              </>
            )}
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-2xl bg-primary-50 p-3 text-sm">
            <MessageSquareText className="mt-0.5 size-4 shrink-0 text-primary-500" />
            <p className="text-primary-700">
              <b>Comentario de la entrega:</b> {review.note}
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[180px_1fr]">
            <div>
              <p className="mb-1.5 text-sm font-bold">Nota (/{review.maxScore})</p>
              <div className="flex h-14 items-center justify-center rounded-2xl border-2 border-primary-700 font-display text-3xl font-semibold ring-4 ring-accent-300">
                {review.score}
              </div>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={cn("size-6", i <= stars ? "fill-accent-400 text-accent-500" : "text-primary-200")} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-bold">Comentario para el alumno y su familia</p>
              <Textarea defaultValue={review.comment} className="min-h-28" />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
            <Button variant="outline">
              <RotateCcw /> Devolver
            </Button>
            <Button>Calificar y siguiente</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

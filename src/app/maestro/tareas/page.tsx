import { ChevronLeft, ChevronRight, MessageSquareText, Plus, RotateCcw, Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { submissions } from "@/mocks";

export const metadata = { title: "Revisar entregas" };

function MapPhoto({ tint }: { tint: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#fbfaf4] ring-1 ring-navy-100">
      <svg viewBox="0 0 200 150" className="absolute inset-0 size-full">
        <path
          d="M40 30 L110 18 L160 40 L170 95 L130 130 L60 125 L28 85 Z"
          fill={tint}
          stroke="#2b2c6e"
          strokeWidth="2.5"
        />
        <path d="M110 18 L100 75 L170 95 M100 75 L60 125 M100 75 L28 85" stroke="#2b2c6e" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="75" r="4" fill="#ef5b4c" />
        <text x="104" y="70" fontSize="9" fontWeight="700" fill="#1d1e55">
          Masaya
        </text>
      </svg>
    </div>
  );
}

export default function ReviewPage() {
  const current = submissions[3]!;
  return (
    <div>
      <PageHeader
        title="Revisar entregas"
        subtitle="Mapa de Masaya y sus municipios · Estudios Sociales"
        action={
          <Button size="sm" className="hidden sm:inline-flex">
            <Plus /> Nueva tarea
          </Button>
        }
      />
      <div className="mb-5 flex items-center gap-3">
        <Progress value={(17 / 24) * 100} className="flex-1" barClassName="bg-emerald-500" />
        <span className="text-sm font-bold text-navy-600">17 de 24 entregaron · 10 revisadas</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <Card className="hidden divide-y divide-navy-100 self-start overflow-hidden lg:block">
          {submissions.map((s) => (
            <div
              key={s.student}
              className={cn("flex items-center gap-3 px-4 py-3", s.student === current.student && "bg-honey-100")}
            >
              <Avatar name={s.student} size="sm" kid />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{s.student}</p>
                <p className="text-xs font-semibold text-navy-500">{s.time}</p>
              </div>
              {s.late ? <Pill tone="orange" size="sm">Tarde</Pill> : null}
            </div>
          ))}
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Avatar name={current.student} size="md" kid />
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-semibold">{current.student}</p>
              <p className="text-sm font-semibold text-navy-600">Entregado {current.time} · por su mamá</p>
            </div>
            <div className="flex gap-1.5">
              <span className="grid size-10 place-items-center rounded-full bg-navy-50 text-navy-700">
                <ChevronLeft className="size-5" />
              </span>
              <span className="grid size-10 place-items-center rounded-full bg-navy-800 text-white">
                <ChevronRight className="size-5" />
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <MapPhoto tint="#fde68a" />
            <MapPhoto tint="#bbf7d0" />
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-2xl bg-navy-50 p-3 text-sm">
            <MessageSquareText className="mt-0.5 size-4 shrink-0 text-navy-500" />
            <p className="text-navy-700">
              <b>Nota de la familia:</b> Mateo lo hizo solito, solo le ayudamos con la letra del dibujo 😊
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[180px_1fr]">
            <div>
              <p className="mb-1.5 text-sm font-bold">Nota (/10)</p>
              <div className="flex h-14 items-center justify-center rounded-2xl border-2 border-navy-700 font-display text-3xl font-semibold ring-4 ring-honey-300">
                9
              </div>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={cn("size-6", i <= 4 ? "fill-honey-400 text-honey-500" : "text-navy-200")} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-bold">Comentario para la familia</p>
              <Textarea defaultValue="¡Muy bien, Mateo! Ubicaste todos los municipios. Revisa la ortografía de Nindirí. 🐝" className="min-h-28" />
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

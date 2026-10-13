import { ChevronLeft, ChevronRight, Droplets, Moon, Send, ShoppingBag, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { ChildSwitcher } from "@/features/familia/child-switcher";
import { dailyAgenda } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Agenda diaria" };

export default function DailyAgendaPage() {
  requireModule("agendaDiaria");
  const a = dailyAgenda;
  if (!a) return null;
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Agenda diaria" subtitle="Cómo le fue hoy en el colegio" />
      <ChildSwitcher active={a.childId} basePath="/padres/agenda" />

      <div className="mb-4 flex items-center justify-between rounded-full bg-white p-1.5 shadow-soft ring-1 ring-primary-100">
        <span className="grid size-9 place-items-center rounded-full bg-primary-50 text-primary-700">
          <ChevronLeft className="size-5" />
        </span>
        <p className="font-bold">{a.date}</p>
        <span className="grid size-9 place-items-center rounded-full bg-primary-50 text-primary-300">
          <ChevronRight className="size-5" />
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="pattern-light flex items-center gap-4 bg-accent-100 p-5 ring-accent-200">
          <span className="grid size-20 shrink-0 place-items-center rounded-full bg-accent-400 text-5xl shadow-soft">
            😄
          </span>
          <div>
            <p className="text-xs font-bold tracking-wide text-accent-700 uppercase">Estado de ánimo</p>
            <p className="font-display text-3xl font-semibold">{a.mood}</p>
            <p className="text-sm font-semibold text-primary-600">Publicado a las {a.publishedAt}</p>
          </div>
        </Card>

        <Card className="p-5">
          <p className="mb-3 font-display text-lg font-semibold">Comidas</p>
          <div className="space-y-3">
            {a.meals.map((m) => (
              <div key={m.label}>
                <div className="mb-1 flex justify-between text-sm font-bold">
                  <span>{m.label}</span>
                  <span className="text-primary-600">{m.amount}</span>
                </div>
                <Progress value={m.value} barClassName="bg-emerald-500" />
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <span className="grid size-10 place-items-center rounded-2xl bg-violet-100 text-violet-700">
              <Moon className="size-5" />
            </span>
            <p className="mt-2 text-xs font-bold text-primary-500">Siesta</p>
            <p className="font-display text-xl font-semibold">{a.nap}</p>
          </Card>
          <Card className="p-4">
            <span className="grid size-10 place-items-center rounded-2xl bg-sky-100 text-sky-700">
              <Droplets className="size-5" />
            </span>
            <p className="mt-2 text-xs font-bold text-primary-500">Baño</p>
            <p className="font-display text-xl font-semibold">{a.bathroom}</p>
          </Card>
        </div>

        <Card className="p-5">
          <p className="mb-2 flex items-center gap-2 font-display text-lg font-semibold">
            <ShoppingBag className="size-5 text-rose-500" /> Necesito para mañana
          </p>
          <div className="flex flex-wrap gap-2">
            {a.needs.map((n) => (
              <Pill key={n} tone="red">
                {n}
              </Pill>
            ))}
          </div>
        </Card>

        <Card className="p-5 md:col-span-2">
          <p className="mb-2 flex items-center gap-2 font-display text-lg font-semibold">
            <Sparkles className="size-5 text-accent-600" /> Lo que hicimos hoy
          </p>
          <p className="text-[15px] leading-relaxed text-primary-800">{a.activities}</p>
          <div className="mt-4 flex gap-3 rounded-2xl bg-primary-50 p-4">
            <Avatar name={a.teacher} size="sm" />
            <div>
              <p className="text-sm font-bold">{a.teacher}</p>
              <p className="text-sm text-primary-700">{a.teacherNote}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Input placeholder="Responder a la maestra…" className="h-11" />
            <button
              className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-800 text-white"
              aria-label="Enviar"
            >
              <Send className="size-5" />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

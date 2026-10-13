import { Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { agendaRoster } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Agenda diaria" };

const kids = agendaRoster ?? [];const moods = ["😄", "🙂", "😄", "😴", "😄", "🙂", "😢", "😄", "🙂", "😄"];
const meal = ["Todo", "Mitad", "Todo", "Poco", "Todo", "Todo", "Mitad", "Todo", "Casi todo", "Todo"];
const nap = ["45m", "30m", "50m", "1h", "—", "40m", "35m", "45m", "50m", "30m"];

function Chip({ value, tone }: { value: string; tone: "green" | "amber" | "rose" }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 min-w-16 items-center justify-center rounded-full px-2.5 text-xs font-bold",
        tone === "green" && "bg-emerald-100 text-emerald-800",
        tone === "amber" && "bg-amber-100 text-amber-800",
        tone === "rose" && "bg-rose-100 text-rose-700",
      )}
    >
      {value}
    </span>
  );
}

const toneOf = (v: string) => (v === "Todo" || v === "Casi todo" ? "green" : v === "Mitad" ? "amber" : "rose");

export default function TeacherAgendaPage() {
  requireModule("agendaDiaria");
  return (
    <div>
      <PageHeader
        title="Agenda diaria"
        subtitle="Preescolar II A · Llénala rápido para toda la clase"
        action={
          <Button variant="accent" size="sm" className="hidden sm:inline-flex">
            <Send /> Publicar a familias
          </Button>
        }
      />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-primary-100 bg-primary-50/70 text-left text-xs font-bold text-primary-600 uppercase">
                <th className="px-4 py-3">Alumno</th>
                <th className="px-2 py-3 text-center">Ánimo</th>
                <th className="px-2 py-3 text-center">Merienda</th>
                <th className="px-2 py-3 text-center">Almuerzo</th>
                <th className="px-2 py-3 text-center">Siesta</th>
                <th className="px-2 py-3 text-center">Baño</th>
                <th className="px-4 py-3">Nota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100">
              {kids.map((k, i) => (
                <tr key={k}>
                  <td className="px-4 py-2.5">
                    <span className="flex items-center gap-2">
                      <Avatar name={k} size="xs" kid />
                      <span className="font-bold whitespace-nowrap">{k}</span>
                    </span>
                  </td>
                  <td className="px-2 text-center text-2xl">{moods[i]}</td>
                  <td className="px-2 text-center">
                    <Chip value={meal[(i + 3) % meal.length]!} tone={toneOf(meal[(i + 3) % meal.length]!)} />
                  </td>
                  <td className="px-2 text-center">
                    <Chip value={meal[i]!} tone={toneOf(meal[i]!)} />
                  </td>
                  <td className="px-2 text-center font-bold text-primary-700">{nap[i]}</td>
                  <td className="px-2 text-center font-bold text-primary-700">{(i % 3) + 1}</td>
                  <td className="px-4 text-primary-500">
                    {i === 0 ? "Ayudó a recoger los juguetes 💛" : i === 6 ? "Extrañó a mamá en la mañana" : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="mt-4 p-4">
        <p className="mb-2 text-sm font-bold">Actividad del día (para todos)</p>
        <p className="rounded-2xl bg-primary-50 p-3 text-[15px] text-primary-800">
          Pintamos con esponjas y aprendimos la letra M de mamá. Cantamos la canción de los colores en inglés.
        </p>
      </Card>
      <Button block size="lg" variant="accent" className="mt-4 sm:hidden">
        <Send /> Publicar a familias
      </Button>
    </div>
  );
}

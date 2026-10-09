import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MonthGrid } from "@/features/calendario/month-grid";
import { monthlyActivities } from "@/mocks";

export const metadata = { title: "Calendario" };

export default function CalendarPage() {
  return (
    <div>
      <PageHeader title="Calendario" subtitle="Eventos del colegio y actividades del mes" />
      <Tabs className="mb-5" active={0} items={[{ label: "Mes" }, { label: "Agenda" }, { label: "Solo 2° A" }]} />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <MonthGrid />
        </div>
        <section className="lg:col-span-2">
          <SectionTitle>Actividades de octubre</SectionTitle>
          <div className="space-y-3">
            {monthlyActivities.map((m) => (
              <Card key={m.title} className="flex gap-3 p-4">
                <div className="grid w-14 shrink-0 place-items-center self-start rounded-2xl bg-navy-800 py-2 text-white">
                  <span className="text-[10px] font-bold uppercase">{m.date.split(" ")[0]}</span>
                  <span className="font-display text-xl leading-none font-semibold">{m.date.split(" ")[1]}</span>
                </div>
                <div className="min-w-0">
                  <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", m.color)}>{m.category}</span>
                  <p className="mt-1 font-bold leading-snug">{m.title}</p>
                  <p className="text-sm text-navy-600">{m.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

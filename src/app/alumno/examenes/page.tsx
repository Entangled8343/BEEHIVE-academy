import { BookOpen, CalendarClock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { exams, school, subjectColors } from "@/mocks";

export const metadata = { title: "Exámenes" };

export default function StudentExams() {
  const list = exams ?? [];
  const week = list.filter((e) => Number(e.date) < 20);
  const finals = list.filter((e) => Number(e.date) >= 20);
  const Row = ({ e }: { e: (typeof list)[number] }) => (
    <Card className="flex gap-4 p-4">
      <div className="grid w-14 shrink-0 place-items-center self-start rounded-2xl bg-primary-800 py-2 text-white">
        <span className="text-[10px] font-bold uppercase">{e.day}</span>
        <span className="font-display text-2xl leading-none">{e.date}</span>
        <span className="text-[10px] font-semibold text-primary-200">oct</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", subjectColors[e.subject] ?? "bg-primary-100")}>{e.subject}</span>
          <Pill tone={e.type.startsWith("Prueba") ? "blue" : "violet"} size="sm">
            {e.type}
          </Pill>
        </div>
        <p className="mt-2 font-bold leading-snug">{e.topics}</p>
        {e.room ? (
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary-500">
            <MapPin className="size-3.5" /> {e.room}
          </p>
        ) : null}
      </div>
      <Button variant="soft" size="icon-sm" aria-label="Ver temario" className="self-center">
        <BookOpen />
      </Button>
    </Card>
  );
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Exámenes" subtitle={`Calendario de evaluaciones · ${school.currentPeriod}`} />
      <Card className="pattern-dark mb-6 flex items-center gap-4 bg-night-800 p-5 text-white ring-0">
        <span className="grid size-14 place-items-center rounded-2xl bg-accent-400 text-primary-900">
          <CalendarClock className="size-7" />
        </span>
        <div>
          <p className="font-display text-2xl text-white">Semana de exámenes del IV corte</p>
          <p className="text-sm font-semibold text-primary-200">Del lunes 26 al viernes 30 de octubre · faltan 13 días</p>
        </div>
      </Card>
      <SectionTitle>Esta semana</SectionTitle>
      <div className="space-y-3">
        {week.map((e) => (
          <Row key={e.subject + e.date} e={e} />
        ))}
      </div>
      <SectionTitle className="mt-6">Exámenes del IV corte</SectionTitle>
      <div className="space-y-3">
        {finals.map((e) => (
          <Row key={e.subject + e.date} e={e} />
        ))}
      </div>
    </div>
  );
}

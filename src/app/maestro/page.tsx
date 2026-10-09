import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Inbox,
  MessageCircle,
  NotebookPen,
  Smile,
  UserX,
} from "lucide-react";
import { Bee } from "@/components/brand/bee";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { IconTile, ListRow } from "@/components/ui/tiles";
import { cn } from "@/lib/utils";
import { school, submissions, teacherToday as t } from "@/mocks";

export const metadata = { title: "Hoy" };

export default function TeacherToday() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-navy-500">{school.today}</p>
          <h1 className="text-[26px] leading-tight font-semibold lg:text-3xl">¡Hola, Miss Karla!</h1>
          <p className="font-semibold text-navy-600">
            {t.section} · {t.students} alumnos · {school.currentPeriod}
          </p>
        </div>
        <Bee className="size-12 shrink-0 rotate-12" flip />
      </div>

      <Link
        href="/maestro/asistencia"
        className="honeycomb flex items-center gap-4 rounded-3xl bg-honey-400 p-4 shadow-soft"
      >
        <IconTile className="bg-navy-800 text-honey-400" size="lg">
          <ClipboardCheck />
        </IconTile>
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl leading-tight font-semibold">Pasar lista de hoy</p>
          <p className="text-sm font-bold text-navy-800">2 ausencias ya reportadas por las familias</p>
        </div>
        <ArrowRight className="size-6 shrink-0 text-navy-900" />
      </Link>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Entregas por revisar", value: t.submissionsToReview, icon: Inbox, cls: "bg-sky-100 text-sky-700", href: "/maestro/tareas" },
          { label: "Ausencias reportadas", value: t.absencesReported, icon: UserX, cls: "bg-rose-100 text-rose-600", href: "/maestro/asistencia" },
          { label: "Mensajes nuevos", value: t.unreadMessages, icon: MessageCircle, cls: "bg-violet-100 text-violet-700", href: "/maestro" },
          { label: "Tareas activas", value: 4, icon: NotebookPen, cls: "bg-emerald-100 text-emerald-700", href: "/maestro/tareas" },
        ].map((s) => (
          <Link key={s.label} href={s.href} className="rounded-3xl bg-white p-4 shadow-soft ring-1 ring-navy-100/70">
            <IconTile className={s.cls}>
              <s.icon />
            </IconTile>
            <p className="mt-3 font-display text-3xl font-semibold">{s.value}</p>
            <p className="text-sm leading-tight font-bold text-navy-600">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <SectionTitle
            action={
              <ButtonLink href="/maestro/tareas" variant="ghost" size="sm">
                Revisar todas
              </ButtonLink>
            }
          >
            Entregas recientes
          </SectionTitle>
          <Card className="divide-y divide-navy-100">
            {submissions.slice(0, 5).map((s) => (
              <ListRow
                key={s.student}
                href="/maestro/tareas"
                icon={<Avatar name={s.student} size="sm" kid />}
                title={s.student}
                subtitle={`${s.task} · ${s.time}`}
                trailing={s.late ? <Pill tone="orange">Tarde</Pill> : <Pill tone="blue">{s.files} fotos</Pill>}
              />
            ))}
          </Card>
        </section>

        <section className="lg:col-span-2">
          <SectionTitle>Horario de hoy</SectionTitle>
          <Card className="p-4">
            <ol className="relative space-y-1">
              {t.schedule.map((c, i) => (
                <li
                  key={c.time}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5",
                    i === 2 && "bg-honey-100",
                  )}
                >
                  <span className="w-12 font-display text-sm font-semibold text-navy-500">{c.time}</span>
                  <span className={cn("size-2.5 rounded-full", i < 2 ? "bg-navy-200" : i === 2 ? "bg-honey-500" : "bg-navy-600")} />
                  <span className="flex-1 font-bold">{c.subject}</span>
                  {c.room ? <span className="text-xs font-semibold text-navy-400">{c.room}</span> : null}
                </li>
              ))}
            </ol>
          </Card>
          <Link
            href="/maestro/agenda"
            className="mt-4 flex items-center gap-3 rounded-3xl bg-white p-4 shadow-soft ring-1 ring-navy-100/70"
          >
            <IconTile className="bg-honey-200 text-honey-700">
              <Smile />
            </IconTile>
            <div className="flex-1">
              <p className="font-bold">Agenda diaria · Preescolar II A</p>
              <p className="text-sm text-navy-600">Apoyo a Miss Andrea · 12 de 18 listos</p>
            </div>
            <ArrowRight className="size-5 text-navy-400" />
          </Link>
        </section>
      </div>
    </div>
  );
}

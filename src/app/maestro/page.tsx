import Link from "next/link";
import { ArrowRight, ClipboardCheck, Inbox, MessageCircle, NotebookPen, Sparkles } from "lucide-react";
import { Mascot } from "@/components/brand/mascot";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { IconTile, ListRow } from "@/components/ui/tiles";
import { cn } from "@/lib/utils";
import { school, submissions, teacherToday as t, users } from "@/mocks";

export const metadata = { title: "Hoy" };

export default function TeacherToday() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-primary-500">{school.today}</p>
          <h1 className="text-[26px] leading-tight font-semibold lg:text-3xl">¡Hola, {users.maestro.greeting}!</h1>
          <p className="font-semibold text-primary-600">
            {t.sectionsLabel} · {school.currentPeriod}
          </p>
        </div>
        <Mascot className="size-12 shrink-0 rotate-12" flip />
      </div>

      <Link href="/maestro/asistencia" className="pattern-light flex items-center gap-4 rounded-3xl bg-accent-400 p-4 shadow-soft">
        <IconTile className="bg-primary-800 text-accent-400" size="lg">
          <ClipboardCheck />
        </IconTile>
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl leading-tight font-semibold">Pasar lista de hoy</p>
          <p className="text-sm font-bold text-primary-800">
            {t.absencesReported} ausencias ya reportadas por las familias
          </p>
        </div>
        <ArrowRight className="size-6 shrink-0 text-primary-900" />
      </Link>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Entregas por revisar", value: t.submissionsToReview, icon: Inbox, cls: "bg-sky-100 text-sky-700", href: "/maestro/tareas" },
          { label: "Ausencias reportadas", value: t.absencesReported, icon: ClipboardCheck, cls: "bg-rose-100 text-rose-600", href: "/maestro/asistencia" },
          { label: "Mensajes nuevos", value: t.unreadMessages, icon: MessageCircle, cls: "bg-violet-100 text-violet-700", href: "/maestro" },
          { label: "Tareas activas", value: t.activeHomework, icon: NotebookPen, cls: "bg-emerald-100 text-emerald-700", href: "/maestro/tareas" },
        ].map((s) => (
          <Link key={s.label} href={s.href} className="rounded-3xl bg-white p-4 shadow-soft ring-1 ring-primary-100/70">
            <IconTile className={s.cls}>
              <s.icon />
            </IconTile>
            <p className="mt-3 font-display text-3xl font-semibold">{s.value}</p>
            <p className="text-sm leading-tight font-bold text-primary-600">{s.label}</p>
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
          <Card className="divide-y divide-primary-100">
            {submissions.slice(0, 5).map((s) => (
              <ListRow
                key={s.student}
                href="/maestro/tareas"
                icon={<Avatar name={s.student} size="sm" kid />}
                title={s.student}
                subtitle={`${s.task} · ${s.time}`}
                trailing={s.late ? <Pill tone="orange">Tarde</Pill> : <Pill tone="blue">{s.files} archivos</Pill>}
              />
            ))}
          </Card>
        </section>

        <section className="lg:col-span-2">
          <SectionTitle>Horario de hoy</SectionTitle>
          <Card className="p-4">
            <ol className="relative space-y-1">
              {t.schedule.map((c, i) => (
                <li key={c.time} className={cn("flex items-center gap-3 rounded-2xl px-3 py-2.5", i === 2 && "bg-accent-100")}>
                  <span className="w-12 font-display text-sm font-semibold text-primary-500">{c.time}</span>
                  <span className={cn("size-2.5 rounded-full", i < 2 ? "bg-primary-200" : i === 2 ? "bg-accent-500" : "bg-primary-600")} />
                  <span className="flex-1 font-bold">{c.subject}</span>
                  {c.room ? <span className="text-xs font-semibold text-primary-400">{c.room}</span> : null}
                </li>
              ))}
            </ol>
          </Card>
          {t.sideCard ? (
            <Link href={t.sideCard.href} className="mt-4 flex items-center gap-3 rounded-3xl bg-white p-4 shadow-soft ring-1 ring-primary-100/70">
              <IconTile className="bg-accent-200 text-accent-700">
                <Sparkles />
              </IconTile>
              <div className="flex-1">
                <p className="font-bold">{t.sideCard.title}</p>
                <p className="text-sm text-primary-600">{t.sideCard.subtitle}</p>
              </div>
              <ArrowRight className="size-5 text-primary-400" />
            </Link>
          ) : null}
        </section>
      </div>
    </div>
  );
}

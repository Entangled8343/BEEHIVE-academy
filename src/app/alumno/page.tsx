import Link from "next/link";
import { ArrowRight, CalendarClock, Flame, GraduationCap, MapPin, NotebookPen, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Comet, Star } from "@/components/brand/comet";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { IconTile, ListRow } from "@/components/ui/tiles";
import { BadgeTile } from "@/features/insignias/badge-tile";
import { cn } from "@/lib/utils";
import { badges, band, clubs, exams, focusChildId, grades, homework, school, studentHome, subjectColors, timetable, users } from "@/mocks";

export const metadata = { title: "Inicio" };

export default async function StudentHome() {
  const t = await getTranslations("alumnoInicio");
  const pending = homework.filter((h) => h.childId === focusChildId && h.status === "pendiente");
  const avg = grades.reduce((s, g) => s + (g.cortes[2] ?? 0), 0) / grades.length;
  const earned = badges.filter((b) => b.earned);
  const next = timetable?.grid[timetable.nowPeriod + 1]?.[timetable.todayIndex];
  const nextTime = timetable?.periods[timetable.nowPeriod + 1]?.time;
  const myClub = clubs?.find((c) => c.enrolled);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold text-primary-500">{school.today}</p>
        <h1 className="text-[28px] leading-tight lg:text-4xl">{t("saludo", { name: users.alumno.greeting })}</h1>
      </div>

      {studentHome ? (
        <Card className="pattern-dark relative overflow-hidden bg-night-900 p-5 text-white ring-0 lg:p-6">
          <Comet className="absolute -top-2 right-3 size-20 opacity-90" />
          <Star className="absolute right-28 bottom-4 size-5" />
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-300 uppercase">{t("ahora")}</p>
          <p className="mt-1 font-display text-3xl text-white">{studentHome.nextClass.subject}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-primary-100">
            <span>{studentHome.nextClass.time}</span>
            <span className="flex items-center gap-1">
              <MapPin className="size-4" /> {studentHome.nextClass.room}
            </span>
            <span>{studentHome.nextClass.teacher}</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            {next ? (
              <p className="text-sm font-semibold text-primary-200">
                {t("siguiente")}: <b className="text-white">{next.subject}</b> · {nextTime}
              </p>
            ) : null}
            <ButtonLink href="/alumno/horario" variant="accent" size="sm">
              {t("verHorario")} <ArrowRight />
            </ButtonLink>
          </div>
        </Card>
      ) : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: t("pendientes"), value: String(pending.length), icon: NotebookPen, cls: "bg-orange-100 text-orange-700" },
          { label: t("proximoExamen"), value: exams?.[0] ? `${exams[0].day} ${exams[0].date}` : "—", hint: exams?.[0]?.subject, icon: CalendarClock, cls: "bg-violet-100 text-violet-700" },
          { label: t("promedio"), value: avg.toFixed(0), hint: band(avg).code, icon: GraduationCap, cls: "bg-emerald-100 text-emerald-700" },
          { label: t("racha"), value: t("dias", { n: studentHome?.streak ?? 0 }), icon: Flame, cls: "bg-rose-100 text-rose-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-3xl bg-white p-4 shadow-soft ring-1 ring-primary-100/70">
            <IconTile className={s.cls} size="sm">
              <s.icon />
            </IconTile>
            <p className="mt-2 font-display text-2xl">{s.value}</p>
            <p className="text-xs leading-tight font-bold text-primary-600">
              {s.label}
              {s.hint ? <span className="font-semibold text-primary-400"> · {s.hint}</span> : null}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <SectionTitle
            action={
              <ButtonLink href="/alumno/tareas" variant="ghost" size="sm">
                {t("verTodas")}
              </ButtonLink>
            }
          >
            {t("misTareas")}
          </SectionTitle>
          <Card className="divide-y divide-primary-100">
            {pending.slice(0, 4).map((h) => (
              <ListRow
                key={h.id}
                href={`/alumno/tareas/${h.id}`}
                icon={
                  <span className={cn("grid size-11 shrink-0 place-items-center rounded-2xl text-xs font-bold", subjectColors[h.subject] ?? "bg-primary-100")}>
                    {h.subject.slice(0, 3)}
                  </span>
                }
                title={h.title}
                subtitle={`${h.subject} · ${h.dueRelative}`}
              />
            ))}
          </Card>

          {exams ? (
            <>
              <SectionTitle className="mt-6">{t("examenes")}</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-3">
                {exams.slice(0, 3).map((e) => (
                  <Card key={e.subject + e.date} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="grid w-12 place-items-center rounded-2xl bg-primary-800 py-1.5 text-white">
                        <span className="text-[10px] font-bold uppercase">{e.day}</span>
                        <span className="font-display text-xl leading-none">{e.date}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-bold">{e.subject}</p>
                        <p className="text-xs font-semibold text-primary-500">{e.type}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : null}
        </section>

        <div className="space-y-6 lg:col-span-2">
          <section>
            <SectionTitle
              action={
                <Link href="/alumno/insignias" className="text-sm font-bold text-primary-600">
                  {t("verTodas")}
                </Link>
              }
            >
              {t("elementos")}
            </SectionTitle>
            <Card className="p-5">
              <p className="mb-4 text-sm font-semibold text-primary-600">{t("elementosSub", { n: earned.length, total: badges.length })}</p>
              <div className="grid grid-cols-4 gap-2">
                {earned.slice(0, 4).map((b) => (
                  <BadgeTile key={b.id} badge={b} size="sm" showLabel={false} />
                ))}
              </div>
            </Card>
          </section>
          {myClub ? (
            <section>
              <SectionTitle>{t("clubHoy")}</SectionTitle>
              <Link href="/alumno/clubes" className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-soft ring-1 ring-primary-100/70">
                <IconTile className="bg-accent-200 text-accent-700">
                  <Sparkles />
                </IconTile>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{myClub.name}</p>
                  <p className="text-sm text-primary-600">{myClub.schedule}</p>
                </div>
                <Pill tone="green">✓</Pill>
              </Link>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

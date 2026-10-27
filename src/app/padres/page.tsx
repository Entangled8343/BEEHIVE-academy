import { CalendarDays, Car, CheckCircle2, ChevronRight, DoorOpen, MessageCircle, NotebookPen, QrCode, UserX, Wallet } from "lucide-react";
import Link from "next/link";
import { Mascot } from "@/components/brand/mascot";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { IconTile, ListRow } from "@/components/ui/tiles";
import { TodoIcon } from "@/features/familia/todo-icon";
import { children, events, parentTodo, pickup, school, users } from "@/mocks";
import { hasModule, schoolConfig } from "@/schools";

export const metadata = { title: "Inicio" };

export default function ParentHome() {
  const month = school.monthLabel.slice(0, 3);
  const quick = [
    { href: "/padres/ausencias", label: "Reportar ausencia", icon: UserX, cls: "bg-rose-100 text-rose-600" },
    hasModule("retiro")
      ? { href: "/padres/retiro", label: "¿Quién recoge?", icon: Car, cls: "bg-accent-200 text-accent-700" }
      : null,
    { href: "/padres/mensajes", label: "Escribir a docentes", icon: MessageCircle, cls: "bg-sky-100 text-sky-700" },
    hasModule("estadoCuenta")
      ? { href: "/padres/estado-cuenta", label: "Estado de cuenta", icon: Wallet, cls: "bg-emerald-100 text-emerald-700" }
      : { href: "/padres/calendario", label: "Calendario", icon: CalendarDays, cls: "bg-violet-100 text-violet-700" },
  ].filter((q) => q !== null);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-primary-500">{school.today}</p>
          <h1 className="text-[26px] leading-tight font-semibold lg:text-3xl">¡Buenos días, {users.padre.greeting}!</h1>
        </div>
        <Mascot className="size-12 shrink-0 -rotate-12" />
      </div>

      {hasModule("retiro") ? (
        <Link href="/padres/retiro" className="pattern-light flex items-center gap-4 rounded-3xl bg-accent-400 p-4 shadow-soft">
          <IconTile className="bg-primary-800 text-accent-400" size="lg">
            <Car />
          </IconTile>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold tracking-wide text-primary-800/70 uppercase">Hoy recoge</p>
            <p className="font-display text-xl leading-tight font-semibold text-primary-900">
              {pickup.today.person} · {pickup.today.relationship}
            </p>
            <p className="text-sm font-bold text-primary-800">
              {pickup.today.time} · {pickup.today.children.join(" y ")}
            </p>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-primary-900">
            <QrCode className="size-6" />
          </span>
        </Link>
      ) : null}

      <section>
        <SectionTitle>Mis hijos</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {children.map((c) => (
            <Card key={c.id} className="overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <Avatar name={c.name} size="lg" kid />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl leading-tight font-semibold">{c.shortName}</p>
                  <p className="text-sm font-semibold text-primary-600">
                    {c.grade} {c.section} · {c.teacherLabel}
                  </p>
                </div>
                <Link
                  href={`/padres/hijos/${c.id}`}
                  className="grid size-10 place-items-center rounded-full bg-primary-50 text-primary-700"
                  aria-label={`Perfil de ${c.shortName}`}
                >
                  <ChevronRight className="size-5" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 px-4">
                <Pill tone="green">
                  <CheckCircle2 /> Llegó {c.arrivedAt}
                </Pill>
                <Pill tone={c.pendingHomework > 1 ? "orange" : "accent"}>
                  <NotebookPen /> {c.pendingHomework} {c.pendingHomework === 1 ? "tarea" : "tareas"}
                </Pill>
                {c.allergies ? <Pill tone="red">{c.allergies}</Pill> : null}
                {c.leavesAlone ? (
                  <Pill tone="blue">
                    <DoorOpen /> Sale sola
                  </Pill>
                ) : null}
              </div>
              <div className="mt-4 grid grid-cols-2 divide-x divide-primary-100 border-t border-primary-100">
                <div className="p-4">
                  <p className="text-xs font-bold text-primary-500">Asistencia</p>
                  <p className="font-display text-xl font-semibold">{c.attendanceRate}%</p>
                  <Progress value={c.attendanceRate} className="mt-1.5 h-2" barClassName="bg-emerald-500" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold text-primary-500">{schoolConfig.copy.badgesShort}</p>
                  <p className="font-display text-xl font-semibold">
                    {c.badges} {{ element: "⚛️", circle: "🌱", hex: "🏅" }[schoolConfig.brand.badgeStyle]}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-primary-500">2 nuevas este mes</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <SectionTitle>Para hoy</SectionTitle>
          <Card className="divide-y divide-primary-100 overflow-hidden">
            {parentTodo.map((item) => (
              <ListRow
                key={item.title}
                href={item.href}
                icon={<TodoIcon icon={item.icon} />}
                title={item.title}
                subtitle={item.subtitle}
                trailing={
                  item.trailing === "dot" ? (
                    <span className="size-2.5 rounded-full bg-rose-500" />
                  ) : item.trailing ? (
                    <Pill tone={item.trailing.tone}>{item.trailing.label}</Pill>
                  ) : undefined
                }
              />
            ))}
          </Card>
        </section>

        <div className="space-y-6 lg:col-span-2">
          <section>
            <SectionTitle>Acciones rápidas</SectionTitle>
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-2">
              {quick.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="flex flex-col items-center gap-2 rounded-3xl bg-white p-3 text-center shadow-soft ring-1 ring-primary-100/70 lg:flex-row lg:text-left"
                >
                  <IconTile className={a.cls}>
                    <a.icon />
                  </IconTile>
                  <span className="text-xs leading-tight font-bold text-primary-800 lg:text-sm">{a.label}</span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle
              action={
                <ButtonLink href="/padres/calendario" variant="ghost" size="sm">
                  Ver todo
                </ButtonLink>
              }
            >
              Próximos eventos
            </SectionTitle>
            <Card className="divide-y divide-primary-100">
              {events.slice(1, 4).map((e) => (
                <div key={e.title + e.day} className="flex items-center gap-3 px-4 py-3">
                  <div className="grid w-12 shrink-0 place-items-center rounded-2xl bg-primary-800 py-1.5 text-white">
                    <span className="text-[10px] font-bold uppercase">{month}</span>
                    <span className="font-display text-lg leading-none font-semibold">{e.day}</span>
                  </div>
                  <p className="font-bold text-primary-900">{e.title}</p>
                </div>
              ))}
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

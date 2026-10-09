import {
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronRight,
  FileSignature,
  Megaphone,
  MessageCircle,
  NotebookPen,
  QrCode,
  Smile,
  UserX,
} from "lucide-react";
import Link from "next/link";
import { Bee } from "@/components/brand/bee";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { IconTile, ListRow } from "@/components/ui/tiles";
import { children, events, pickup, school, users } from "@/mocks";

export const metadata = { title: "Inicio" };

export default function ParentHome() {
  const firstName = users.padre.name.split(" ").slice(0, 2).join(" ");
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-navy-500">{school.today}</p>
          <h1 className="text-[26px] leading-tight font-semibold lg:text-3xl">
            ¡Buenos días, {firstName}!
          </h1>
        </div>
        <Bee className="size-12 shrink-0 -rotate-12" />
      </div>

      {/* Retiro de hoy */}
      <Link
        href="/padres/retiro"
        className="honeycomb flex items-center gap-4 rounded-3xl bg-honey-400 p-4 shadow-soft"
      >
        <IconTile className="bg-navy-800 text-honey-400" size="lg">
          <Car />
        </IconTile>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold tracking-wide text-navy-800/70 uppercase">Hoy recoge</p>
          <p className="font-display text-xl leading-tight font-semibold text-navy-900">
            {pickup.today.person} · {pickup.today.relationship}
          </p>
          <p className="text-sm font-bold text-navy-800">
            {pickup.today.time} · {pickup.today.children.join(" y ")}
          </p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-navy-900">
          <QrCode className="size-6" />
        </span>
      </Link>

      {/* Hijos */}
      <section>
        <SectionTitle>Mis hijos</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {children.map((c) => (
            <Card key={c.id} className="overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <Avatar name={c.name} size="lg" kid />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl leading-tight font-semibold">{c.shortName}</p>
                  <p className="text-sm font-semibold text-navy-600">
                    {c.grade} {c.section} · {c.teacher}
                  </p>
                </div>
                <Link
                  href={`/padres/hijos/${c.id}`}
                  className="grid size-10 place-items-center rounded-full bg-navy-50 text-navy-700"
                  aria-label={`Perfil de ${c.shortName}`}
                >
                  <ChevronRight className="size-5" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 px-4">
                <Pill tone="green">
                  <CheckCircle2 /> Llegó {c.arrivedAt}
                </Pill>
                <Pill tone={c.pendingHomework > 1 ? "orange" : "honey"}>
                  <NotebookPen /> {c.pendingHomework} {c.pendingHomework === 1 ? "tarea" : "tareas"}
                </Pill>
                {c.allergies ? <Pill tone="red">{c.allergies}</Pill> : null}
              </div>
              <div className="mt-4 grid grid-cols-2 divide-x divide-navy-100 border-t border-navy-100">
                <div className="p-4">
                  <p className="text-xs font-bold text-navy-500">Asistencia</p>
                  <p className="font-display text-xl font-semibold">{c.attendanceRate}%</p>
                  <Progress value={c.attendanceRate} className="mt-1.5 h-2" barClassName="bg-emerald-500" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold text-navy-500">Insignias</p>
                  <p className="font-display text-xl font-semibold">{c.badges} 🏅</p>
                  <p className="mt-0.5 text-xs font-semibold text-navy-500">2 nuevas este mes</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Pendientes */}
        <section className="lg:col-span-3">
          <SectionTitle>Para hoy</SectionTitle>
          <Card className="divide-y divide-navy-100 overflow-hidden">
            <ListRow
              href="/padres/autorizaciones"
              icon={
                <IconTile className="bg-orange-100 text-orange-600">
                  <FileSignature />
                </IconTile>
              }
              title="Firmar permiso: Excursión al Volcán Masaya"
              subtitle="Mateo · antes del jueves 15 de octubre"
              trailing={<Pill tone="orange">Pendiente</Pill>}
            />
            <ListRow
              href="/padres/comunicados"
              icon={
                <IconTile className="bg-rose-100 text-rose-600">
                  <Megaphone />
                </IconTile>
              }
              title="Comunicado importante de Dirección"
              subtitle="Excursión al Parque Nacional Volcán Masaya"
              trailing={<span className="size-2.5 rounded-full bg-rose-500" />}
            />
            <ListRow
              href="/padres/agenda"
              icon={
                <IconTile className="bg-honey-200 text-honey-700">
                  <Smile />
                </IconTile>
              }
              title="Agenda diaria de Sofía"
              subtitle="Comió casi todo, durmió 45 min · 12:10 p. m."
            />
            <ListRow
              href="/padres/tareas"
              icon={
                <IconTile className="bg-sky-100 text-sky-700">
                  <NotebookPen />
                </IconTile>
              }
              title="Lectura: El patito feo"
              subtitle="Mateo · Lengua y Literatura · vence el lunes"
            />
          </Card>
        </section>

        <div className="space-y-6 lg:col-span-2">
          {/* Acciones rápidas */}
          <section>
            <SectionTitle>Acciones rápidas</SectionTitle>
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-2">
              {[
                { href: "/padres/ausencias", label: "Reportar ausencia", icon: UserX, cls: "bg-rose-100 text-rose-600" },
                { href: "/padres/retiro", label: "¿Quién recoge?", icon: Car, cls: "bg-honey-200 text-honey-700" },
                { href: "/padres/mensajes", label: "Escribir a la maestra", icon: MessageCircle, cls: "bg-sky-100 text-sky-700" },
                { href: "/padres/calendario", label: "Calendario", icon: CalendarDays, cls: "bg-violet-100 text-violet-700" },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="flex flex-col items-center gap-2 rounded-3xl bg-white p-3 text-center shadow-soft ring-1 ring-navy-100/70 lg:flex-row lg:text-left"
                >
                  <IconTile className={a.cls}>
                    <a.icon />
                  </IconTile>
                  <span className="text-xs leading-tight font-bold text-navy-800 lg:text-sm">{a.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Próximos eventos */}
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
            <Card className="divide-y divide-navy-100">
              {events.slice(1, 4).map((e) => (
                <div key={e.title} className="flex items-center gap-3 px-4 py-3">
                  <div className="grid w-12 shrink-0 place-items-center rounded-2xl bg-navy-800 py-1.5 text-white">
                    <span className="text-[10px] font-bold uppercase">Oct</span>
                    <span className="font-display text-lg leading-none font-semibold">{e.day}</span>
                  </div>
                  <p className="font-bold text-navy-900">{e.title}</p>
                </div>
              ))}
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  Atom,
  CalendarCheck,
  GraduationCap,
  HeartHandshake,
  Palette,
  Trophy,
  UserPlus,
  Users,
  Backpack,
} from "lucide-react";
import { Comet, Star } from "@/components/brand/comet";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/tiles";
import { school } from "@/mocks";
import { schoolConfig } from "@/schools";

const audiences = [
  {
    title: "Familias",
    icon: Users,
    href: "/padres",
    cls: "bg-accent-200 text-primary-800",
    items: ["Tareas, notas y horario de cada hijo", "Estado de cuenta y pagos", "Permisos, ausencias y retiro seguro"],
  },
  {
    title: "Alumnos",
    icon: Backpack,
    href: "/alumno",
    cls: "bg-sky-100 text-sky-800",
    items: [`Usuario propio desde ${schoolConfig.studentLoginFromGrade ?? 4}° grado`, "Entregar tareas y ver sus notas", "Horario, exámenes, clubes y elementos"],
  },
  {
    title: "Docentes",
    icon: GraduationCap,
    href: "/maestro",
    cls: "bg-violet-100 text-violet-700",
    items: ["Asistencia y libro de notas", "Tareas, temario y actividades", "Comunicación con familias"],
  },
];

const values = [
  { label: "Science", icon: Atom },
  { label: "Art", icon: Palette },
  { label: "Sports", icon: Trophy },
  { label: "Humanism", icon: HeartHandshake },
];

/** Portada del portal (colegios con sitio web propio): acceso por perfil y admisiones. */
export function PortalHome() {
  return (
    <main>
      <section className="pattern-dark relative overflow-hidden bg-night-900 text-white">
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 text-center lg:px-8 lg:pt-20 lg:pb-28">
          <p className="text-xs font-semibold tracking-[0.3em] text-accent-300 uppercase">Portal académico</p>
          <h1 className="mt-3 text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
            Nuestro <span className="italic">Curie‑verse</span>
          </h1>
          <svg viewBox="0 0 300 12" className="mx-auto mt-3 h-3 w-56" aria-hidden>
            <path d="M2 8 C 80 2, 200 2, 298 6" stroke="#8edcaa" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
          <p className="mx-auto mt-5 max-w-xl text-lg text-primary-100">{schoolConfig.copy.portalSubtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/ingresar" variant="accent" size="lg">
              Ingresar al portal <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/inscripcion" size="lg" className="bg-white/10 text-white ring-2 ring-white/30 hover:bg-white/20">
              <UserPlus /> Admisiones {school.year + 1}
            </ButtonLink>
          </div>
        </div>
        <Comet className="absolute top-16 left-[6%] hidden size-28 -rotate-6 md:block" />
        <Star className="absolute top-24 right-[10%] hidden size-12 md:block" />
        <Star className="absolute right-[8%] bottom-6 size-7" tone="green" />
        <Star className="absolute bottom-8 left-[8%] size-8" tone="night" />
      </section>

      <section className="pattern-light mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <h2 className="text-center text-3xl text-primary-800 lg:text-4xl">
          Un portal para cada <span className="italic">protagonista</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-primary-600">
          Cada estudiante es protagonista de su educación, acompañado por el binomio familia-escuela.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {audiences.map((a) => (
            <Card key={a.title} className="flex flex-col p-6">
              <IconTile className={a.cls} size="lg">
                <a.icon />
              </IconTile>
              <h3 className="mt-4 text-2xl text-primary-800">{a.title}</h3>
              <ul className="mt-3 flex-1 space-y-2 text-sm text-primary-700">
                {a.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-500" />
                    {i}
                  </li>
                ))}
              </ul>
              <Link href={a.href} className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                Ver demostración <ArrowRight className="size-4" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 lg:px-8">
        <div className="grid gap-6 overflow-hidden rounded-[2rem] bg-primary-800 p-8 text-white lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-accent-300 uppercase">Admisiones {school.year + 1}</p>
            <h2 className="mt-2 text-3xl text-white lg:text-4xl">
              Únete a la <span className="italic">Curie‑osidad</span>
            </h2>
            <p className="mt-2 max-w-xl text-primary-100">
              Pre-inscripción en línea con documentos desde el celular, seguimiento de la solicitud y cita para
              la prueba de ubicación y entrevista.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/inscripcion" variant="accent" size="lg">
              <UserPlus /> Pre-inscripción
            </ButtonLink>
            <ButtonLink href="/agenda-tu-cita" size="lg" className="bg-white/10 text-white ring-2 ring-white/30 hover:bg-white/20">
              <CalendarCheck /> Agendar visita
            </ButtonLink>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {values.map((v) => (
            <div key={v.label} className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-soft ring-1 ring-primary-100/70">
              <IconTile className="bg-primary-50 text-primary-700">
                <v.icon />
              </IconTile>
              <span className="font-display text-xl text-primary-800">{v.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Bell,
  CalendarCheck,
  Car,
  GraduationCap,
  HandHeart,
  Languages,
  MapPin,
  NotebookPen,
  Phone,
  Puzzle,
  Smile,
  Users,
} from "lucide-react";
import { Bee } from "@/components/brand/bee";
import { LogoCircle } from "@/components/brand/logo";
import { Scene, type SceneName } from "@/components/brand/scene";
import { WhatsAppIcon } from "@/components/brand/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { IconTile } from "@/components/ui/tiles";
import { school } from "@/mocks";

function HexPhoto({ scene, className }: { scene: SceneName; className?: string }) {
  return (
    <div className={`hex bg-white p-1.5 shadow-lift ${className ?? ""}`}>
      <Scene name={scene} className="hex size-full" />
    </div>
  );
}

export function BeehiveLanding() {
  return (
    <main>
      {/* Hero */}
      <section className="pattern-dark relative overflow-hidden bg-primary-800 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 lg:grid-cols-2 lg:px-8 lg:pt-16 lg:pb-24">
          <div>
            <Pill tone="solid-accent" className="mb-5">
              🐝 Matrícula 2027 abierta
            </Pill>
            <h1 className="text-[40px] leading-[1.05] font-semibold text-white sm:text-5xl lg:text-6xl">
              Aquí los pequeños <span className="text-accent-400">descubren</span>,{" "}
              <span className="text-accent-400">aprenden</span> y{" "}
              <span className="text-accent-400">disfrutan</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-primary-100">
              Preescolar y primaria con educación integral e inclusiva en Masaya. Un ambiente seguro y
              feliz, con las familias siempre conectadas.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/inscripcion" variant="accent" size="lg">
                Pre-inscríbete <ArrowRight />
              </ButtonLink>
              <ButtonLink
                href="/agenda-tu-cita"
                size="lg"
                className="bg-white/10 text-white ring-2 ring-white/30 hover:bg-white/20"
              >
                <CalendarCheck /> Agenda tu visita
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-primary-100">
              <span className="flex items-center gap-2">
                <Baby className="size-5 text-accent-400" /> Preescolar I, II y III
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap className="size-5 text-accent-400" /> Primaria 1° a 6°
              </span>
            </div>
          </div>

          <div className="relative mx-auto h-[340px] w-[340px] sm:h-[420px] sm:w-[420px]">
            <HexPhoto scene="desfile" className="absolute top-0 left-[18%] size-[46%]" />
            <HexPhoto scene="lectura" className="absolute top-[24%] left-[58%] size-[40%]" />
            <HexPhoto scene="ciencia" className="absolute top-[52%] left-[6%] size-[40%]" />
            <HexPhoto scene="naturaleza" className="absolute top-[58%] left-[46%] size-[38%]" />
            <div className="absolute top-[34%] left-[20%] grid size-[32%] place-items-center rounded-full bg-white p-1.5 shadow-lift">
              <LogoCircle className="size-full" priority />
            </div>
            <Bee className="absolute top-[6%] right-[6%] size-12 rotate-12" />
            <Bee className="absolute bottom-[2%] left-[2%] size-10 -rotate-12" flip />
          </div>
        </div>
        <svg viewBox="0 0 1440 60" className="absolute bottom-0 block h-8 w-full lg:h-12" preserveAspectRatio="none" aria-hidden>
          <path d="M0 60 C 360 0 1080 0 1440 60 Z" fill="#fffdf6" />
        </svg>
      </section>

      {/* Niveles */}
      <section id="niveles" className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <p className="text-center text-sm font-bold tracking-widest text-accent-700 uppercase">Nuestros niveles</p>
        <h2 className="mt-2 text-center text-3xl font-semibold lg:text-4xl">Una colmena para cada etapa</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            {
              title: "Preescolar",
              ages: "3 a 5 años",
              scene: "arte" as const,
              items: ["I, II y III Nivel", "Aprendizaje a través del juego", "Agenda diaria para las familias", "Inglés con canciones y juegos"],
            },
            {
              title: "Primaria",
              ages: "1° a 6° grado",
              scene: "aula" as const,
              items: ["Programa MINED + enfoque bilingüe", "Ciencias, lectura y valores", "Computación y deporte", "Seguimiento de notas en línea"],
            },
          ].map((l) => (
            <Card key={l.title} className="overflow-hidden">
              <Scene name={l.scene} className="h-40" />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{l.title}</h3>
                  <Pill tone="accent">{l.ages}</Pill>
                </div>
                <ul className="mt-4 grid gap-2 text-[15px] font-semibold text-primary-700">
                  {l.items.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="hex size-3 shrink-0 bg-accent-400" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Por qué */}
      <section id="por-que" className="bg-accent-50">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
          <h2 className="text-center text-3xl font-semibold lg:text-4xl">¿Por qué Beehive?</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { icon: Puzzle, title: "Educación inclusiva", text: "Cada niño aprende a su ritmo, con atención personalizada.", cls: "bg-pink-100 text-pink-700" },
              { icon: Languages, title: "Inglés desde pequeños", text: "Exposición diaria al inglés desde preescolar.", cls: "bg-violet-100 text-violet-700" },
              { icon: Users, title: "Grupos pequeños", text: "Más tiempo de calidad con cada alumno.", cls: "bg-sky-100 text-sky-700" },
              { icon: HandHeart, title: "Valores y familia", text: "Formamos niños felices, seguros y solidarios.", cls: "bg-emerald-100 text-emerald-700" },
            ].map((f) => (
              <Card key={f.title} className="p-5">
                <IconTile className={f.cls} size="lg">
                  <f.icon />
                </IconTile>
                <h3 className="mt-4 text-lg leading-tight font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-primary-600">{f.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Familias conectadas */}
      <section id="familias" className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-widest text-accent-700 uppercase">Portal Beehive</p>
            <h2 className="mt-2 text-3xl font-semibold lg:text-4xl">Las familias, siempre conectadas</h2>
            <p className="mt-3 text-lg text-primary-700">
              Desde el celular o la computadora, sin descargar nada: tareas, notas, agenda diaria, avisos y
              quién recoge a tus hijos.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: NotebookPen, t: "Tareas y entregas" },
                { icon: GraduationCap, t: "Notas por corte" },
                { icon: Smile, t: "Agenda diaria" },
                { icon: Car, t: "Retiro seguro con QR" },
                { icon: Bell, t: "Avisos al instante" },
                { icon: CalendarCheck, t: "Calendario escolar" },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft ring-1 ring-primary-100/70">
                  <IconTile size="sm" className="bg-accent-200 text-primary-800">
                    <f.icon />
                  </IconTile>
                  <span className="text-sm font-bold">{f.t}</span>
                </div>
              ))}
            </div>
            <ButtonLink href="/ingresar" className="mt-6" size="lg">
              Entrar al portal <ArrowRight />
            </ButtonLink>
          </div>
          <div className="relative mx-auto w-[280px]">
            <div className="rounded-[2.75rem] bg-primary-900 p-3 shadow-lift">
              <div className="overflow-hidden rounded-[2.2rem] bg-surface">
                <div className="flex items-center gap-2 px-4 pt-5 pb-3">
                  <LogoCircle className="size-8" />
                  <p className="font-display font-semibold">¡Hola, María José!</p>
                </div>
                <div className="pattern-light mx-3 rounded-2xl bg-accent-400 p-3">
                  <p className="text-[10px] font-bold text-primary-800/70 uppercase">Hoy recoge</p>
                  <p className="font-display font-semibold">Ana López · Abuela</p>
                  <p className="text-xs font-bold">12:30 p. m.</p>
                </div>
                <div className="m-3 space-y-2">
                  {[
                    ["Sofía · Preescolar II", "Llegó 7:12 a. m.", "bg-emerald-100 text-emerald-800"],
                    ["Mateo · 2° grado", "3 tareas", "bg-orange-100 text-orange-700"],
                  ].map(([n, s, c]) => (
                    <div key={n} className="rounded-2xl bg-white p-3 shadow-soft">
                      <p className="text-sm font-bold">{n}</p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${c}`}>{s}</span>
                    </div>
                  ))}
                  <div className="rounded-2xl bg-white p-3 shadow-soft">
                    <p className="text-sm font-bold">Agenda de Sofía 😄</p>
                    <div className="mt-1.5 h-1.5 rounded-full bg-primary-100">
                      <div className="h-1.5 w-4/5 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-4 border-t border-primary-100 px-3 py-3">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={`mx-auto h-2 w-8 rounded-full ${i === 0 ? "bg-accent-400" : "bg-primary-100"}`} />
                  ))}
                </div>
              </div>
            </div>
            <Bee className="absolute -top-4 -right-6 size-14 rotate-12" />
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="bg-primary-50/60">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold lg:text-4xl">Vida en la colmena</h2>
            <span className="text-sm font-bold text-primary-600">{school.instagram}</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {(["desfile", "deporte", "ciencia", "naturaleza"] as const).map((s, i) => (
              <Scene
                key={s}
                name={s}
                className="aspect-square rounded-3xl"
                label={["Desfile patrio", "Juegos deportivos", "Feria científica", "Nuestro huerto"][i]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 lg:p-8">
            <h2 className="text-3xl font-semibold">¡Ven a conocernos!</h2>
            <p className="mt-2 text-primary-700">Agenda una visita guiada y conoce nuestras aulas y maestras.</p>
            <div className="mt-6 space-y-4">
              <p className="flex gap-3">
                <IconTile size="sm" className="bg-accent-200 text-primary-800">
                  <MapPin />
                </IconTile>
                <span className="font-semibold">{school.address}</span>
              </p>
              <p className="flex items-center gap-3">
                <IconTile size="sm" className="bg-accent-200 text-primary-800">
                  <Phone />
                </IconTile>
                <span className="font-semibold">{school.whatsapp}</span>
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/agenda-tu-cita" variant="primary">
                <CalendarCheck /> Agendar visita
              </ButtonLink>
              <ButtonLink href={school.whatsappLink} className="bg-[#25D366] text-white hover:bg-[#1fb457]">
                <WhatsAppIcon className="size-5" /> WhatsApp
              </ButtonLink>
            </div>
          </Card>
          <div className="relative min-h-72 overflow-hidden rounded-3xl bg-[#e8efe2] shadow-soft ring-1 ring-primary-100/70">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
              <path d="M0 120 H400 M0 210 H400 M110 0 V300 M260 0 V300" stroke="#fff" strokeWidth="14" />
              <path d="M0 60 L400 170" stroke="#f7d23e" strokeWidth="10" />
              <rect x="140" y="140" width="90" height="50" rx="8" fill="#cfe3c2" />
              <rect x="290" y="30" width="80" height="70" rx="8" fill="#cfe3c2" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <div className="grid size-16 place-items-center rounded-full bg-primary-800 p-1 shadow-lift">
                <LogoCircle className="size-full" />
              </div>
              <div className="mx-auto h-4 w-1 rounded-b bg-primary-800" />
            </div>
            <Link
              href="/#contacto"
              className="absolute right-3 bottom-3 left-3 rounded-2xl bg-white/95 p-3 text-sm font-bold shadow-soft"
            >
              📍 Gasolinera Uno San Jerónimo · Abrir en Google Maps
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

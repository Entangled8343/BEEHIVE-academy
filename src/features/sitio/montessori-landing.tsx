import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  Car,
  Flower2,
  HandHeart,
  Hand,
  Leaf,
  MapPin,
  NotebookPen,
  Phone,
  Puzzle,
  Shapes,
  Smile,
  Sprout,
  Sun,
  Earth,
  BookOpenText,
} from "lucide-react";
import { GlobeMascot } from "@/components/brand/globe";
import { Scene, type SceneName } from "@/components/brand/scene";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/social-icons";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { IconTile } from "@/components/ui/tiles";
import { school } from "@/mocks";
import { MontessoriMark } from "./montessori-chrome";

/** Los tres colores de los círculos del logo. */
const ring = { blue: "bg-[#91C2C9]", green: "bg-[#C0D84E]", yellow: "bg-[#FBE176]" } as const;

function CirclePhoto({ scene, tone, className }: { scene: SceneName; tone: keyof typeof ring; className?: string }) {
  return (
    <div className={`rounded-full p-2.5 shadow-lift ${ring[tone]} ${className ?? ""}`}>
      <Scene name={scene} className="size-full rounded-full ring-4 ring-white" />
    </div>
  );
}

export function MontessoriLanding() {
  return (
    <main>
      {/* Portada clara, con los círculos del logo */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-[#91C2C9]/25" aria-hidden />
        <div className="pointer-events-none absolute top-40 -right-20 size-64 rounded-full bg-[#FBE176]/35" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 size-56 rounded-full bg-[#E8796A]/15" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 lg:grid-cols-2 lg:px-8 lg:pt-14 lg:pb-20">
          <div>
            <Pill tone="solid-accent" className="mb-5">
              🌱 Matrícula 2027 abierta
            </Pill>
            <h1 className="text-[38px] leading-[1.08] sm:text-5xl lg:text-[56px]">
              Un mundo preparado para que cada niño <span className="text-primary-600">crezca a su ritmo</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-primary-700">
              Comunidad Infantil, Casa de Niños y Taller para niños de 2 a 9 años, con la pedagogía Montessori y las
              familias siempre conectadas.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/inscripcion" variant="accent" size="lg">
                Pre-inscríbete <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/agenda-tu-cita" variant="outline" size="lg">
                <CalendarCheck /> Agenda tu visita
              </ButtonLink>
            </div>
            <p className="mt-8 font-script text-[34px] leading-tight text-primary-800">
              «Ayúdame a hacerlo por mí mismo»
            </p>
            <p className="text-sm font-bold text-primary-500">María Montessori</p>
          </div>

          <div className="relative mx-auto h-[330px] w-[340px] sm:h-[420px] sm:w-[440px]">
            <CirclePhoto scene="naturaleza" tone="blue" className="absolute top-[14%] left-0 size-[46%]" />
            <CirclePhoto scene="arte" tone="green" className="absolute top-0 left-[30%] size-[44%]" />
            <CirclePhoto scene="lectura" tone="yellow" className="absolute top-[26%] left-[56%] size-[42%]" />
            <div className="absolute bottom-0 left-[14%] grid w-[70%] place-items-center rounded-[2rem] bg-white px-6 py-4 shadow-lift">
              <MontessoriMark className="h-14 w-auto" priority />
              <p className="mt-1 font-script text-[30px] leading-none text-primary-900">Mundo Montessori</p>
            </div>
            <GlobeMascot className="absolute top-[2%] right-[4%] size-12 rotate-12" />
          </div>
        </div>
      </section>

      {/* Ambientes */}
      <section id="ambientes" className="bg-primary-50/70">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
          <p className="text-center text-sm font-bold tracking-widest text-accent-700 uppercase">Nuestros ambientes</p>
          <h2 className="mt-2 text-center text-3xl lg:text-4xl">Un ambiente para cada etapa</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Comunidad Infantil",
                ages: "2 a 3 años",
                scene: "naturaleza" as const,
                dot: ring.blue,
                items: ["Vida práctica y lenguaje", "Movimiento y autonomía", "Agenda diaria para las familias"],
              },
              {
                title: "Casa de Niños",
                ages: "3 a 6 años",
                scene: "arte" as const,
                dot: ring.green,
                items: ["Material sensorial y matemático", "Lectoescritura con letras de lija", "Inglés con canciones y juegos"],
              },
              {
                title: "Taller",
                ages: "6 a 9 años · 1° a 3°",
                scene: "aula" as const,
                dot: ring.yellow,
                items: ["Cultura Cósmica y botánica", "Programa MINED con enfoque Montessori", "Avances y notas en línea"],
              },
            ].map((l) => (
              <Card key={l.title} className="overflow-hidden">
                <Scene name={l.scene} className="h-36" />
                <div className="p-6">
                  <h3 className="text-2xl">{l.title}</h3>
                  <Pill tone="accent" className="mt-2">
                    {l.ages}
                  </Pill>
                  <ul className="mt-4 grid gap-2 text-[15px] font-semibold text-primary-700">
                    {l.items.map((i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className={`size-3 shrink-0 rounded-full ${l.dot}`} /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Método */}
      <section id="metodo" className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <h2 className="text-center text-3xl lg:text-4xl">Así aprenden en Mundo Montessori</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-primary-700">
          Ambientes preparados, materiales concretos y guías que acompañan sin apurar. Cada niño elige su trabajo y avanza
          a su ritmo.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {[
            { icon: Hand, title: "Vida práctica", text: "Servir, vestirse, cuidar las plantas y el ambiente.", cls: "bg-[#FBE176]/50 text-amber-800" },
            { icon: Shapes, title: "Sensorial", text: "Colores, formas y texturas para afinar los sentidos.", cls: "bg-[#C0D84E]/40 text-lime-800" },
            { icon: BookOpenText, title: "Lenguaje", text: "De las letras de lija a la lectura y la escritura.", cls: "bg-[#E8796A]/20 text-rose-700" },
            { icon: Puzzle, title: "Matemática", text: "Material dorado: del concreto a lo abstracto.", cls: "bg-[#91C2C9]/35 text-cyan-800" },
            { icon: Earth, title: "Cultura Cósmica", text: "Geografía, botánica, historia y ciencias.", cls: "bg-emerald-100 text-emerald-800" },
          ].map((f) => (
            <Card key={f.title} className="p-5">
              <IconTile className={`rounded-full ${f.cls}`} size="lg">
                <f.icon />
              </IconTile>
              <h3 className="mt-4 text-lg leading-tight">{f.title}</h3>
              <p className="mt-1 text-sm text-primary-600">{f.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Familias conectadas */}
      <section id="familias" className="bg-accent-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold tracking-widest text-accent-700 uppercase">Portal de familias</p>
            <h2 className="mt-2 text-3xl lg:text-4xl">Las familias, siempre conectadas</h2>
            <p className="mt-3 text-lg text-primary-700">
              Desde el celular o la computadora, sin descargar nada: agenda diaria, avances, avisos, pagos y quién recoge a
              tus hijos.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: Smile, t: "Agenda diaria" },
                { icon: Sprout, t: "Logros de independencia" },
                { icon: NotebookPen, t: "Trabajos y avances" },
                { icon: Car, t: "Retiro seguro con QR" },
                { icon: Bell, t: "Avisos al instante" },
                { icon: CalendarCheck, t: "Calendario y actividades" },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft ring-1 ring-primary-100/70">
                  <IconTile size="sm" className="rounded-full bg-accent-200 text-primary-800">
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
                  <MontessoriMark className="h-6 w-auto" />
                  <p className="font-display font-semibold">¡Hola, Gabriela!</p>
                </div>
                <div className="pattern-light mx-3 rounded-2xl bg-accent-300 p-3">
                  <p className="text-[10px] font-bold text-primary-800/70 uppercase">Hoy recoge</p>
                  <p className="font-display font-semibold">Teresa Rocha · Abuela</p>
                  <p className="text-xs font-bold">12:15 p. m.</p>
                </div>
                <div className="m-3 space-y-2">
                  {[
                    ["Emilia · Casa de Niños", "Llegó 7:20 a. m.", "bg-emerald-100 text-emerald-800"],
                    ["Lucas · Taller I", "2 trabajos", "bg-orange-100 text-orange-700"],
                  ].map(([n, s, c]) => (
                    <div key={n} className="rounded-2xl bg-white p-3 shadow-soft">
                      <p className="text-sm font-bold">{n}</p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${c}`}>{s}</span>
                    </div>
                  ))}
                  <div className="rounded-2xl bg-white p-3 shadow-soft">
                    <p className="text-sm font-bold">Agenda de Emilia 😄</p>
                    <div className="mt-1.5 h-1.5 rounded-full bg-primary-100">
                      <div className="h-1.5 w-4/5 rounded-full bg-accent-500" />
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
            <GlobeMascot className="absolute -top-4 -right-6 size-14 rotate-12" />
          </div>
        </div>
      </section>

      {/* Summer Camp */}
      <section id="summer-camp" className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#8C9ECF] p-6 text-white lg:p-10">
          <Sun className="absolute -top-6 -right-6 size-40 text-[#FBE176]/70" aria-hidden />
          <p className="font-script text-4xl leading-none">Summer Camp</p>
          <h2 className="mt-2 text-3xl text-white lg:text-4xl">Explore, play &amp; enjoy nature</h2>
          <p className="mt-2 max-w-xl font-semibold text-white/90">
            Para niños de 2 a 9 años, de 8:00 a. m. a 12:00 m., con merienda saludable incluida. Las familias reservan y
            reciben los avisos en el portal.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { icon: Flower2, t: "Gardening & Practical Life" },
              { icon: Leaf, t: "STEAM & Experiments" },
              { icon: HandHeart, t: "Cooking, Arts & Crafts" },
              { icon: Smile, t: "Sports & Dancing" },
            ].map((f) => (
              <div key={f.t} className="flex items-center gap-3 rounded-2xl bg-white/15 p-3 ring-1 ring-white/25">
                <f.icon className="size-6 shrink-0 text-[#FBE176]" />
                <span className="text-sm font-bold">{f.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="bg-primary-50/60">
        <div className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl lg:text-4xl">Vida en Mundo Montessori</h2>
            <span className="flex items-center gap-1.5 text-sm font-bold text-primary-600">
              <InstagramIcon className="size-4" /> {school.instagram}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {(["naturaleza", "ciencia", "arte", "deporte"] as const).map((s, i) => (
              <figure key={s} className="text-center">
                <Scene name={s} className="aspect-square rounded-full ring-4 ring-white" />
                <figcaption className="mt-2 text-sm font-bold text-primary-700">
                  {["Nuestro huerto", "Experimentos STEAM", "Rincón de arte", "Summer Camp"][i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 lg:p-8">
            <h2 className="text-3xl">¡Ven a conocer el ambiente!</h2>
            <p className="mt-2 text-primary-700">Agenda una visita guiada y conoce nuestros ambientes y a las guías.</p>
            <div className="mt-6 space-y-4">
              <p className="flex items-center gap-3">
                <IconTile size="sm" className="rounded-full bg-accent-200 text-primary-800">
                  <MapPin />
                </IconTile>
                <span className="font-semibold">Managua, Nicaragua</span>
              </p>
              <p className="flex items-center gap-3">
                <IconTile size="sm" className="rounded-full bg-accent-200 text-primary-800">
                  <Phone />
                </IconTile>
                <span className="font-semibold">2276-0542 · 8888-7027</span>
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
          <div className="relative min-h-72 overflow-hidden rounded-3xl bg-[#e6f1e9] shadow-soft ring-1 ring-primary-100/70">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
              <path d="M0 120 H400 M0 210 H400 M110 0 V300 M260 0 V300" stroke="#fff" strokeWidth="14" />
              <path d="M0 60 L400 170" stroke="#C0D84E" strokeWidth="10" />
              <circle cx="185" cy="165" r="34" fill="#cfe3c2" />
              <circle cx="330" cy="65" r="30" fill="#cfe3c2" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <div className="grid h-14 place-items-center rounded-full bg-white px-3 shadow-lift">
                <MontessoriMark className="h-8 w-auto" />
              </div>
              <div className="mx-auto h-4 w-1 rounded-b bg-primary-800" />
            </div>
            <Link
              href="/#contacto"
              className="absolute right-3 bottom-3 left-3 rounded-2xl bg-white/95 p-3 text-sm font-bold shadow-soft"
            >
              📍 Mundo Montessori · Abrir en Google Maps
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

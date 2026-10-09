import Link from "next/link";
import { AlertTriangle, ArrowRight, ClipboardCheck, Megaphone, UserPlus, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { IconTile, StatTile } from "@/components/ui/tiles";
import { enrollmentPipeline, school } from "@/mocks";

export const metadata = { title: "Panel" };

const attendanceBySection = [
  { s: "Preescolar I A", v: 94 },
  { s: "Preescolar II A", v: 97 },
  { s: "Preescolar III A", v: 92 },
  { s: "1° A", v: 96 },
  { s: "2° A", v: 92 },
  { s: "3° A", v: 98 },
  { s: "4° A", v: 95 },
  { s: "5° A", v: 89 },
  { s: "6° A", v: 93 },
];

export default function AdminDashboard() {
  const funnel = enrollmentPipeline.map((p) => ({ stage: p.stage, n: p.items.length * 4 + 1, tone: p.tone }));
  const maxN = Math.max(...funnel.map((f) => f.n));
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={school.today} title="Panel de Dirección" subtitle="Resumen del colegio en tiempo real" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Estudiantes" value="214" hint="Preescolar 86 · Primaria 128" icon={<IconTile size="sm" className="bg-navy-100 text-navy-700"><Users /></IconTile>} />
        <StatTile label="Asistencia hoy" value="95%" hint="11 ausentes · 8 justificados" icon={<IconTile size="sm" className="bg-emerald-100 text-emerald-700"><ClipboardCheck /></IconTile>} />
        <StatTile label="Pre-inscripciones 2027" value="38" hint="+6 esta semana" icon={<IconTile size="sm" className="bg-honey-200 text-honey-700"><UserPlus /></IconTile>} />
        <StatTile label="Comunicado volcán" value="71%" hint="leído por las familias" icon={<IconTile size="sm" className="bg-rose-100 text-rose-600"><Megaphone /></IconTile>} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <SectionTitle>Asistencia por sección · hoy</SectionTitle>
          <Card className="space-y-3 p-5">
            {attendanceBySection.map((a) => (
              <div key={a.s} className="grid grid-cols-[120px_1fr_44px] items-center gap-3">
                <span className="truncate text-sm font-bold">{a.s}</span>
                <Progress value={a.v} className="h-3" barClassName={a.v < 90 ? "bg-orange-400" : "bg-emerald-500"} />
                <span className="text-right font-display font-semibold">{a.v}%</span>
              </div>
            ))}
          </Card>
        </section>

        <div className="space-y-6 lg:col-span-2">
          <section>
            <SectionTitle
              action={
                <ButtonLink href="/admin/inscripciones" variant="ghost" size="sm">
                  Ver tablero
                </ButtonLink>
              }
            >
              Admisiones 2027
            </SectionTitle>
            <Card className="space-y-3 p-5">
              {funnel.map((f) => (
                <div key={f.stage}>
                  <div className="mb-1 flex justify-between text-sm font-bold">
                    <span>{f.stage}</span>
                    <span>{f.n}</span>
                  </div>
                  <div className="h-3 rounded-full bg-navy-50">
                    <div className={`h-3 rounded-full ${f.tone}`} style={{ width: `${(f.n / maxN) * 100}%` }} />
                  </div>
                </div>
              ))}
            </Card>
          </section>

          <section>
            <SectionTitle>Atención</SectionTitle>
            <Card className="divide-y divide-navy-100">
              {[
                { t: "2 docentes no han pasado lista", s: "5° A y 6° A", tone: "orange" as const },
                { t: "1 alumno sin aviso de retiro", s: "Bruno Sandino · 1° A", tone: "red" as const },
                { t: "Notas III corte sin publicar", s: "Computación · 4° A", tone: "orange" as const },
              ].map((x) => (
                <Link key={x.t} href="/admin" className="flex items-center gap-3 px-4 py-3">
                  <AlertTriangle className={x.tone === "red" ? "size-5 text-rose-500" : "size-5 text-orange-500"} />
                  <div className="flex-1">
                    <p className="font-bold">{x.t}</p>
                    <p className="text-sm text-navy-600">{x.s}</p>
                  </div>
                  <ArrowRight className="size-4 text-navy-300" />
                </Link>
              ))}
            </Card>
          </section>
          <div className="flex flex-wrap gap-2">
            <Pill tone="gray">Base de datos 4% usada</Pill>
            <Pill tone="gray">Archivos 1.2 GB / 5 GB</Pill>
            <Pill tone="green">Respaldo de anoche ✓</Pill>
          </div>
        </div>
      </div>
    </div>
  );
}

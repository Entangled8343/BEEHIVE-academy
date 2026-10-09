import { notFound } from "next/navigation";
import { Cake, Car, GraduationCap, HeartPulse, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { Tabs } from "@/components/ui/tabs";
import { IconTile, ListRow } from "@/components/ui/tiles";
import { BadgeHex } from "@/features/insignias/badge-hex";
import { badges, children, pickup } from "@/mocks";

export function generateStaticParams() {
  return children.map((c) => ({ id: c.id }));
}

export default async function ChildProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const child = children.find((c) => c.id === id);
  if (!child) notFound();
  const earned = badges.filter((b) => b.earned).length;

  return (
    <div>
      <PageHeader title="Perfil del alumno" back="/padres" />

      <Card className="honeycomb-navy relative overflow-hidden bg-navy-800 text-white ring-0">
        <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
          <Avatar name={child.name} size="2xl" kid ring />
          <div className="min-w-0 flex-1">
            <h2 className="text-3xl font-semibold text-white">{child.name}</h2>
            <p className="mt-1 font-bold text-honey-300">
              {child.grade} {child.section} · {child.level}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Pill tone="solid-honey">
                <Cake /> {child.age} años
              </Pill>
              <Pill className="bg-white/12 text-white">
                <GraduationCap /> {child.teacher}
              </Pill>
            </div>
          </div>
          <div className="grid w-full grid-cols-3 gap-2 sm:w-auto">
            {[
              { label: "Asistencia", value: `${child.attendanceRate}%` },
              { label: "Insignias", value: earned },
              { label: "Promedio", value: child.level === "Primaria" ? "92" : "L" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/10 px-3 py-2.5 text-center">
                <p className="font-display text-2xl font-semibold text-white">{s.value}</p>
                <p className="text-[11px] font-bold text-navy-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Tabs
        className="mt-5 mb-5"
        active={0}
        items={[{ label: "Insignias" }, { label: "Resumen" }, { label: "Salud" }, { label: "Contactos" }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <Card className="p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Panal de insignias</h3>
                <p className="text-sm font-semibold text-navy-600">
                  {earned} de {badges.length} logradas este año
                </p>
              </div>
              <IconTile className="bg-honey-200 text-honey-700">
                <Sparkles />
              </IconTile>
            </div>
            <Progress value={(earned / badges.length) * 100} className="mb-6" />
            <div className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-4 xl:grid-cols-6">
              {badges.map((b) => (
                <BadgeHex key={b.id} badge={b} />
              ))}
            </div>
          </Card>
        </section>

        <div className="space-y-6">
          <section>
            <SectionTitle>Salud</SectionTitle>
            <Card>
              <CardHeader
                icon={
                  <IconTile className="bg-rose-100 text-rose-600">
                    <HeartPulse />
                  </IconTile>
                }
                title={child.allergies ?? "Sin alergias registradas"}
                subtitle="Visible solo para la familia y sus docentes"
              />
              <div className="flex flex-wrap gap-2 p-5 pt-3">
                <Pill tone="gray">Tipo de sangre O+</Pill>
                <Pill tone="gray">Pediatra: Dra. Ruiz</Pill>
              </div>
            </Card>
          </section>
          <section>
            <SectionTitle>Pueden recogerlo</SectionTitle>
            <Card className="divide-y divide-navy-100">
              {pickup.authorized.map((p) => (
                <ListRow
                  key={p.name}
                  icon={<Avatar name={p.name} size="sm" />}
                  title={p.name}
                  subtitle={p.relationship}
                  trailing={<ShieldCheck className="size-5 text-emerald-600" />}
                />
              ))}
              <ListRow
                href="/padres/retiro"
                icon={
                  <IconTile size="sm" className="bg-honey-200 text-honey-700">
                    <Car />
                  </IconTile>
                }
                title="Administrar personas autorizadas"
              />
            </Card>
          </section>
          <section>
            <SectionTitle>Contacto de emergencia</SectionTitle>
            <Card>
              <ListRow
                icon={
                  <IconTile size="sm" className="bg-sky-100 text-sky-700">
                    <Phone />
                  </IconTile>
                }
                title="Roberto Martínez · Papá"
                subtitle="8845-1290"
              />
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

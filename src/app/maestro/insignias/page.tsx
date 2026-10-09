import { CheckCircle2, Zap } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { BadgeHex } from "@/features/insignias/badge-hex";
import { cn } from "@/lib/utils";
import { badges, roster2A } from "@/mocks";

export const metadata = { title: "Insignias" };

export default function AwardBadgePage() {
  const all = badges.map((b) => ({ ...b, earned: true }));
  return (
    <div>
      <PageHeader title="Otorgar insignia" subtitle="Reconoce los logros de tus alumnos" />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-3">
          <Card className="p-5">
            <p className="mb-4 font-display text-lg font-semibold">1. Elige la insignia</p>
            <div className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-4">
              {all.slice(0, 8).map((b) => (
                <div key={b.id} className={cn("rounded-3xl py-2", b.id === "lector" && "bg-honey-100 ring-2 ring-honey-400")}>
                  <BadgeHex badge={b} size="sm" showStatus={false} />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <p className="mb-3 font-display text-lg font-semibold">2. ¿A quién?</p>
            <div className="flex flex-wrap gap-2">
              {roster2A.slice(0, 12).map((n, i) => (
                <span
                  key={n}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full py-1 pr-3 pl-1 text-sm font-bold",
                    [1, 4, 8].includes(i) ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-700",
                  )}
                >
                  <Avatar name={n} size="xs" kid />
                  {n.split(" ")[0]}
                </span>
              ))}
            </div>
            <Field label="Motivo (lo verá la familia)" className="mt-4">
              <Input defaultValue="Leyó 5 libros del rincón de lectura este mes 📚" />
            </Field>
            <Button block className="mt-4">
              Otorgar a 3 alumnos
            </Button>
          </Card>
        </div>

        <div className="space-y-5 lg:col-span-2">
          <Card className="honeycomb-navy bg-navy-800 p-5 text-white ring-0">
            <p className="flex items-center gap-2 font-display text-lg font-semibold text-honey-400">
              <Zap className="size-5" /> Automáticas
            </p>
            <p className="mt-1 text-sm text-navy-100">
              El sistema las entrega cada noche cuando se cumplen las reglas.
            </p>
            <ul className="mt-3 space-y-2 text-sm font-semibold">
              {["Abejita Puntual · 20 días a tiempo", "Panal Completo · 10 tareas a tiempo", "Abeja de Oro · AA en todo el corte"].map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-honey-400" /> {r}
                </li>
              ))}
            </ul>
          </Card>
          <section>
            <SectionTitle>Entregadas esta semana</SectionTitle>
            <Card className="divide-y divide-navy-100">
              {[
                ["Camila Castillo", "Abeja Solidaria"],
                ["Mateo Martínez", "Panal Completo"],
                ["Regina Gaitán", "Néctar Lector"],
                ["Thiago Jarquín", "Abejita Puntual"],
              ].map(([n, b]) => (
                <div key={n} className="flex items-center gap-3 px-4 py-3">
                  <Avatar name={n!} size="sm" kid />
                  <p className="flex-1 font-bold">{n}</p>
                  <Pill tone="honey">{b}</Pill>
                </div>
              ))}
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

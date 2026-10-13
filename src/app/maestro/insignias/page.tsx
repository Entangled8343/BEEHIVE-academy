import { CheckCircle2, Zap } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { BadgeTile } from "@/features/insignias/badge-tile";
import { cn } from "@/lib/utils";
import { badgeAward, badges, roster } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Insignias" };

export default function AwardBadgePage() {
  requireModule("insignias");
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
                <div key={b.id} className={cn("rounded-3xl py-2", b.id === badgeAward.selectedId && "bg-accent-100 ring-2 ring-accent-400")}>
                  <BadgeTile badge={b} size="sm" showStatus={false} />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <p className="mb-3 font-display text-lg font-semibold">2. ¿A quién?</p>
            <div className="flex flex-wrap gap-2">
              {roster.slice(0, 12).map((n, i) => (
                <span
                  key={n}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full py-1 pr-3 pl-1 text-sm font-bold",
                    badgeAward.selected.includes(i) ? "bg-primary-800 text-white" : "bg-primary-50 text-primary-700",
                  )}
                >
                  <Avatar name={n} size="xs" kid />
                  {n.split(" ")[0]}
                </span>
              ))}
            </div>
            <Field label="Motivo (lo verá la familia)" className="mt-4">
              <Input defaultValue={badgeAward.reason} />
            </Field>
            <Button block className="mt-4">
              Otorgar a {badgeAward.selected.length} alumnos
            </Button>
          </Card>
        </div>

        <div className="space-y-5 lg:col-span-2">
          <Card className="pattern-dark bg-primary-800 p-5 text-white ring-0">
            <p className="flex items-center gap-2 font-display text-lg font-semibold text-accent-400">
              <Zap className="size-5" /> Automáticas
            </p>
            <p className="mt-1 text-sm text-primary-100">
              El sistema las entrega cada noche cuando se cumplen las reglas.
            </p>
            <ul className="mt-3 space-y-2 text-sm font-semibold">
               {badgeAward.rules.map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-accent-400" /> {r}
                </li>
              ))}
            </ul>
          </Card>
          <section>
            <SectionTitle>Entregadas esta semana</SectionTitle>
            <Card className="divide-y divide-primary-100">
              {badgeAward.recent.map(([n, b]) => (
                <div key={n} className="flex items-center gap-3 px-4 py-3">
                  <Avatar name={n!} size="sm" kid />
                  <p className="flex-1 font-bold">{n}</p>
                  <Pill tone="accent">{b}</Pill>
                </div>
              ))}
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

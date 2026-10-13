import { Atom } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Progress } from "@/components/ui/progress";
import { BadgeTile } from "@/features/insignias/badge-tile";
import { badges } from "@/mocks";
import { schoolConfig } from "@/schools";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Elementos" };

export default function StudentBadges() {
  requireModule("insignias");
  const earned = badges.filter((b) => b.earned);
  const latest = earned.find((b) => b.id === "cu") ?? earned[0];
  return (
    <div>
      <PageHeader title={schoolConfig.copy.badgesTitle} subtitle="Cada logro es un elemento nuevo en tu tabla periódica" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-display text-xl">
              {earned.length} de {badges.length} {schoolConfig.copy.badgesSubtitle}
            </p>
            <Atom className="size-6 text-primary-500" />
          </div>
          <Progress value={(earned.length / badges.length) * 100} className="mb-6" barClassName="bg-accent-500" />
          <div className="grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 xl:grid-cols-6">
            {badges.map((b) => (
              <BadgeTile key={b.id} badge={b} />
            ))}
          </div>
        </Card>
        {latest ? (
          <Card className="pattern-dark self-start bg-night-900 p-6 text-center text-white ring-0">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent-300 uppercase">Último descubrimiento</p>
            <div className="mt-4 flex justify-center">
              <BadgeTile badge={latest} size="lg" showLabel={false} />
            </div>
            <p className="mt-4 font-display text-2xl text-white">{latest.name}</p>
            <p className="mt-1 text-sm text-primary-100">{latest.description}</p>
            <p className="mt-3 text-xs font-semibold text-primary-300">Otorgado el {latest.earnedOn} · tu familia recibió un aviso</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

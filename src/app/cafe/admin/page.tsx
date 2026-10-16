import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { StatTile } from "@/components/ui/tiles";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Panel de la cafetería" };

/** Panel: ventas e IVA del día, facturas emitidas, pendientes y estado de los controles fiscales. */
export default function CafeDashboard() {
  const d = cafe.dashboard;
  const max = Math.max(...d.week.map((w) => w.v));
  return (
    <div>
      <PageHeader title="Panel de la cafetería" subtitle={`${cafe.today} · actualizado a las 12:30 p. m.`} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {d.stats.map((s) => (
          <StatTile key={s.label} label={s.label} value={s.value} hint={s.hint} className="[&>p:nth-child(2)]:text-2xl" />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="min-w-0 p-5 lg:col-span-2">
          <p className="font-display text-lg">Ventas de la semana</p>
          <p className="text-sm text-primary-600">Miles de córdobas, IVA incluido</p>
          <div className="mt-5 flex h-48 items-end gap-4">
            {d.week.map((w, i) => (
              <div key={w.d} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs font-bold text-primary-700 tabular-nums">{w.v.toFixed(1)}</span>
                <div
                  className={i === d.week.length - 1 ? "w-full rounded-t-xl bg-accent-400" : "w-full rounded-t-xl bg-primary-200"}
                  style={{ height: `${(w.v / max) * 100}%` }}
                />
                <span className="text-xs font-bold text-primary-500">{w.d}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-5">
          <section>
            <SectionTitle>Pendientes</SectionTitle>
            <Card className="divide-y divide-primary-100 overflow-hidden">
              {d.pending.map((p) => (
                <div key={p.label} className="flex items-center justify-between gap-3 px-4 py-3">
                  <p className="text-sm font-bold">{p.label}</p>
                  <Pill tone={p.tone}>{p.value}</Pill>
                </div>
              ))}
            </Card>
          </section>
          <section>
            <SectionTitle>Controles fiscales</SectionTitle>
            <Card className="divide-y divide-primary-100 overflow-hidden">
              {d.checks.map((c) => (
                <div key={c.label} className="flex items-start gap-3 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                  <div>
                    <p className="text-sm font-bold">{c.label}</p>
                    <p className="text-xs font-semibold text-primary-500">{c.detail}</p>
                  </div>
                </div>
              ))}
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

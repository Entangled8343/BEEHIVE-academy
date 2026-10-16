import { PackageMinus, PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { StatTile } from "@/components/ui/tiles";
import { stockStatus } from "@/features/cafe/labels";
import { categoryIcon, categoryTone } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafe, stockOf } from "@/mocks/cafe";

export const metadata = { title: "Inventario" };

/** Inventario del día: cada factura descuenta, cada anulación devuelve; entradas y ajustes con motivo. */
export default function Inventory() {
  const rows = cafe.products.map((p) => ({ p, ...stockOf(p) }));
  const low = rows.filter((r) => r.status === "por-agotarse").length;
  const out = rows.filter((r) => r.status === "agotado").length;
  const sold = rows.reduce((s, r) => s + r.p.sold, 0);
  return (
    <div>
      <PageHeader
        title="Inventario"
        subtitle={`${cafe.today} · se descuenta al facturar`}
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <PackageMinus /> Ajuste
            </Button>
            <Button>
              <PackagePlus /> Registrar entrada
            </Button>
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Productos activos" value={String(rows.length)} />
        <StatTile label="Unidades vendidas hoy" value={String(sold)} hint="Descontadas por las facturas" />
        <StatTile label="Por agotarse" value={String(low)} hint="Debajo del mínimo" />
        <StatTile label="Agotados" value={String(out)} hint="La caja ya no los ofrece" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_300px]">
        <Card className="min-w-0 overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead>
              <tr className="border-b border-primary-100 text-left text-xs font-bold tracking-wide text-primary-500 uppercase">
                <th className="px-3 py-3">Producto</th>
                <th className="px-2 py-3 text-right">Inicial</th>
                <th className="px-2 py-3 text-right">Entradas</th>
                <th className="px-2 py-3 text-right">Facturado</th>
                <th className="px-2 py-3 text-right">Ajustes</th>
                <th className="px-2 py-3 text-right">Quedan</th>
                <th className="px-3 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100 tabular-nums">
              {rows.map(({ p, available, status }) => {
                const Icon = categoryIcon[p.category];
                const st = stockStatus[status];
                return (
                  <tr key={p.name} className={cn(status === "agotado" && "bg-rose-50/60")}>
                    <td className="px-3 py-2">
                      <span className="flex items-center gap-2.5 font-bold whitespace-nowrap">
                        <span className={cn("grid size-8 shrink-0 place-items-center rounded-xl [&_svg]:size-4", categoryTone[p.category])}>
                          <Icon />
                        </span>
                        <span>
                          {p.name}
                          <span className="block text-xs font-semibold text-primary-500">mínimo {p.min}</span>
                        </span>
                      </span>
                    </td>
                    <td className="px-2 py-2 text-right">{p.opening}</td>
                    <td className="px-2 py-2 text-right">{p.received ? `+${p.received}` : "—"}</td>
                    <td className="px-2 py-2 text-right">−{p.sold}</td>
                    <td className="px-2 py-2 text-right">{p.adjusted ? `−${Math.abs(p.adjusted)}` : "—"}</td>
                    <td className="px-2 py-2 text-right font-display text-base">{available}</td>
                    <td className="px-3 py-2">
                      <Pill tone={st.tone}>{st.label}</Pill>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <section>
          <SectionTitle>Movimientos de hoy</SectionTitle>
          <Card className="divide-y divide-primary-100 overflow-hidden">
            {cafe.inventoryMoves.map((m) => (
              <div key={m.time + m.kind} className="flex items-start gap-3 px-4 py-3">
                <span className="w-14 shrink-0 text-xs font-bold text-primary-500">{m.time}</span>
                <div className="min-w-0">
                  <Pill tone={m.tone} size="sm">
                    {m.kind}
                  </Pill>
                  <p className="mt-1 text-sm text-primary-700">{m.detail}</p>
                </div>
              </div>
            ))}
          </Card>
          <p className="mt-3 px-1 text-xs font-semibold text-primary-500">
            Cada factura descuenta lo vendido y cada anulación lo devuelve. Las entradas y los ajustes quedan con usuario y motivo.
          </p>
        </section>
      </div>
    </div>
  );
}

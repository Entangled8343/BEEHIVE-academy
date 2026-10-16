import { CheckCircle2, Printer, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatTile } from "@/components/ui/tiles";
import { money } from "@/features/cafeteria/shared";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Cierre de caja" };

/** Cierre de caja: rango de facturas, IVA y exento por separado, formas de pago y arqueo del efectivo. */
export default function Closing() {
  const c = cafe.closing;
  const m = (v: number) => money(v, cafe.currency);
  return (
    <div>
      <PageHeader
        title="Cierre de caja"
        subtitle={`${c.day} · Caja 1 · Serie A`}
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer /> Imprimir
            </Button>
            <Button>
              <Send /> Enviar al contador
            </Button>
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Facturas del día" value={c.range} className="[&>p:nth-child(2)]:text-xl" />
        <StatTile label="Emitidas" value={String(c.invoices)} />
        <StatTile label="Anuladas" value={String(c.voided)} hint="Con motivo y autorización" />
        <StatTile label="Total del día" value={m(c.total)} className="[&>p:nth-child(2)]:text-2xl" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="p-5">
          <p className="font-display text-lg">Desglose fiscal</p>
          <div className="mt-3 space-y-2 text-sm tabular-nums">
            {c.rows.map((r) => (
              <div key={r.label} className="flex justify-between gap-2 font-semibold">
                <span>{r.label}</span>
                <span>{m(r.value)}</span>
              </div>
            ))}
            <div className="flex justify-between gap-2 border-t border-primary-100 pt-2 font-display text-lg">
              <span>Total</span>
              <span>{m(c.total)}</span>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <p className="font-display text-lg">Por forma de pago</p>
          <div className="mt-3 space-y-2 text-sm tabular-nums">
            {c.payments.map((p) => (
              <div key={p.label} className="flex justify-between gap-2 font-semibold">
                <span>{p.label}</span>
                <span>{m(p.value)}</span>
              </div>
            ))}
            <div className="flex justify-between gap-2 border-t border-primary-100 pt-2 font-display text-lg">
              <span>Total</span>
              <span>{m(c.payments.reduce((s, p) => s + p.value, 0))}</span>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <p className="font-display text-lg">Arqueo del efectivo</p>
          <div className="mt-3 space-y-2 text-sm tabular-nums">
            <div className="flex justify-between font-semibold">
              <span>Según facturas</span>
              <span>{m(c.cash.expected)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Contado en caja</span>
              <span>{m(c.cash.counted)}</span>
            </div>
            <div className="flex justify-between border-t border-primary-100 pt-2 font-bold text-emerald-700">
              <span>Diferencia</span>
              <span>{m(c.cash.counted - c.cash.expected)}</span>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-700">
            <CheckCircle2 className="size-5" /> Cerrado por {c.closedBy}
          </p>
        </Card>
      </div>
    </div>
  );
}

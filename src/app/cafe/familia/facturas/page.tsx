import { Download, Mail, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { IconTile } from "@/components/ui/tiles";
import { Invoice } from "@/features/cafe/invoice";
import { money } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafe, invoiceTotals } from "@/mocks/cafe";

export const metadata = { title: "Facturas" };

/** Facturas de la familia: una por compra, con el IVA desglosado y descarga en PDF. */
export default function FamilyInvoices() {
  const mine = cafe.invoices.filter((i) => i.customer === cafe.family.family);
  const selected = mine[0]!;
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Facturas" subtitle="Una factura por compra, con el IVA desglosado" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-4">
          <div className="flex gap-2">
            {["Todas", ...cafe.children.map((c) => c.short)].map((f, i) => (
              <span
                key={f}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-bold",
                  i === 0 ? "bg-primary-800 text-white" : "bg-white text-primary-600 ring-1 ring-primary-100",
                )}
              >
                {f}
              </span>
            ))}
          </div>
          <Card className="divide-y divide-primary-100 overflow-hidden">
            {mine.map((inv) => {
              const t = invoiceTotals(inv.lines);
              return (
                <div key={inv.number} className={cn("flex items-center gap-3 px-4 py-3", inv.number === selected.number && "bg-accent-50")}>
                  <IconTile size="sm" className="bg-emerald-100 text-emerald-700">
                    <Receipt />
                  </IconTile>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">No. {inv.number}</p>
                    <p className="truncate text-xs font-semibold text-primary-500">
                      {inv.student?.split(" · ")[0]} · {inv.date} · {inv.time}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-base whitespace-nowrap">{money(t.total, cafe.currency)}</p>
                    <p className="text-[11px] font-bold text-primary-500">IVA {money(t.iva, cafe.currency)}</p>
                  </div>
                </div>
              );
            })}
          </Card>
          <p className="px-1 text-xs font-semibold text-primary-500">
            Las recargas y los pagos de la cuenta del día generan un recibo. La factura se emite en cada compra.
          </p>
        </div>

        <section className="min-w-0">
          <SectionTitle>Factura {selected.number}</SectionTitle>
          <Invoice invoice={selected} />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button variant="soft">
              <Download /> PDF
            </Button>
            <Button variant="soft">
              <Mail /> Enviar por correo
            </Button>
          </div>
          <div className="mt-3 flex justify-center">
            <Pill tone="green">Emitida por el sistema autorizado</Pill>
          </div>
        </section>
      </div>
    </div>
  );
}

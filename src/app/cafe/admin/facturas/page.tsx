import Link from "next/link";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { cafe, invoiceTotals } from "@/mocks/cafe";

export const metadata = { title: "Facturas" };

const n = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Libro de ventas: numeración consecutiva por serie, IVA y exento por separado, anuladas a la vista. */
export default function InvoiceRegister() {
  const rows = cafe.invoices.filter((i) => i.date === "16/10/2026");
  const valid = rows.filter((r) => r.status === "emitida").map((r) => invoiceTotals(r.lines));
  const sum = (k: "base" | "iva" | "exempt" | "total") => valid.reduce((s, t) => s + t[k], 0);
  return (
    <div>
      <PageHeader
        title="Facturas"
        subtitle="Serie A · Caja 1 · hoy"
        action={
          <Button variant="outline">
            <FileSpreadsheet /> Libro de ventas en Excel
          </Button>
        }
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {["Hoy", "Serie A", "Serie B", "Anuladas", "Contingencia (C)"].map((f, i) => (
          <span
            key={f}
            className={cn("rounded-full px-4 py-1.5 text-sm font-bold", i === 0 ? "bg-primary-800 text-white" : "bg-white text-primary-600 ring-1 ring-primary-100")}
          >
            {f}
          </span>
        ))}
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-primary-100 text-left text-xs font-bold tracking-wide text-primary-500 uppercase">
              <th className="px-4 py-3">No.</th>
              <th className="px-4 py-3">Hora</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Pago</th>
              <th className="px-4 py-3 text-right">Gravado</th>
              <th className="px-4 py-3 text-right">IVA 15 %</th>
              <th className="px-4 py-3 text-right">Exento</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100 tabular-nums">
            {rows.map((r) => {
              const t = invoiceTotals(r.lines);
              const voided = r.status === "anulada";
              return (
                <tr key={r.number} className={cn(voided && "bg-rose-50/70 text-primary-400")}>
                  <td className={cn("px-4 py-3 font-bold", voided ? "line-through" : "text-primary-900")}>{r.number}</td>
                  <td className="px-4 py-3">{r.time}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold">{r.customer}</p>
                    <p className="text-xs">{r.student}</p>
                  </td>
                  <td className="px-4 py-3">{r.payment}</td>
                  <td className="px-4 py-3 text-right">{n(t.base)}</td>
                  <td className="px-4 py-3 text-right">{n(t.iva)}</td>
                  <td className="px-4 py-3 text-right">{n(t.exempt)}</td>
                  <td className="px-4 py-3 text-right font-bold">{n(t.total)}</td>
                  <td className="px-4 py-3">
                    {voided ? (
                      <Link href="/cafe/admin/facturas/anulada">
                        <Pill tone="red">Anulada · ver</Pill>
                      </Link>
                    ) : (
                      <Pill tone="green">Emitida</Pill>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-primary-200 font-bold tabular-nums">
              <td className="px-4 py-3" colSpan={4}>
                Total de las facturas mostradas (sin anuladas)
              </td>
              <td className="px-4 py-3 text-right">{n(sum("base"))}</td>
              <td className="px-4 py-3 text-right">{n(sum("iva"))}</td>
              <td className="px-4 py-3 text-right">{n(sum("exempt"))}</td>
              <td className="px-4 py-3 text-right">{n(sum("total"))}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </Card>
      <p className="mt-3 px-1 text-xs font-semibold text-primary-500">
        Los números no se pueden editar ni reutilizar. Una factura anulada se queda en el libro con su motivo.
      </p>
    </div>
  );
}

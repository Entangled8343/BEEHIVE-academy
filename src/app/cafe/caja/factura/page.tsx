import { ArrowRight, CheckCircle2, Printer, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Invoice } from "@/features/cafe/invoice";
import { RegisterHeader } from "@/features/cafe/register-header";
import { money } from "@/features/cafeteria/shared";
import { cafe, invoiceTotals } from "@/mocks/cafe";

export const metadata = { title: "Caja · Factura emitida" };

/** Venta cobrada: factura emitida con su número, saldo actualizado y aviso a la familia. */
export default function Issued() {
  const inv = cafe.invoices[0]!;
  const st = cafe.pos.student;
  const t = invoiceTotals(inv.lines);
  return (
    <div className="min-h-dvh bg-night-900">
      <RegisterHeader step="Venta registrada" />
      <div className="grid items-start gap-4 p-4 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <Invoice invoice={inv} className="max-w-[360px]" />
        </div>
        <div className="space-y-4">
          <Card className="p-5">
            <p className="flex items-center gap-2 font-display text-2xl font-semibold text-emerald-700">
              <CheckCircle2 className="size-7" /> Cobrado
            </p>
            <p className="mt-1 font-bold">Factura No. {inv.number}</p>
            <p className="text-sm text-primary-600">{inv.student}</p>
            <div className="mt-4 space-y-2 rounded-2xl bg-primary-50 p-3 text-sm font-bold">
              <div className="flex justify-between">
                <span className="text-primary-600">Total</span>
                <span>{money(t.total, cafe.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-600">Saldo nuevo de {st.short}</span>
                <span>{money(st.balance - t.total, cafe.currency)}</span>
              </div>
            </div>
            <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-primary-700">
              <Smartphone className="mt-0.5 size-4 shrink-0" /> La familia recibió la compra y la factura en su celular.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="soft">
                <Printer /> Imprimir
              </Button>
              <Button variant="success">
                Siguiente <ArrowRight />
              </Button>
            </div>
          </Card>
          <p className="px-1 text-xs font-semibold text-primary-200">
            El original se imprime para el cliente y la copia queda en el archivo del sistema. La familia también la ve en la app.
          </p>
        </div>
      </div>
    </div>
  );
}

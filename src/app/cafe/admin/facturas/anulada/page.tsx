import { KeyRound, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Invoice } from "@/features/cafe/invoice";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Factura anulada" };

/** Anulación: se conserva el original y la copia lleva el sello ANULADO, con motivo y quién autorizó. */
export default function VoidedInvoice() {
  const inv = cafe.invoices.find((i) => i.number === cafe.voided.number)!;
  const v = cafe.voided;
  return (
    <div>
      <PageHeader back="/cafe/admin/facturas" title={`Factura ${inv.number} anulada`} subtitle="Original y copia conservados" />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1fr_340px]">
        <div className="min-w-0">
          <p className="mb-2 text-center text-xs font-bold tracking-wide text-primary-500 uppercase">Original (se conserva)</p>
          <Invoice invoice={inv} copy="Original: cliente" stamp="ANULADO" />
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-center text-xs font-bold tracking-wide text-primary-500 uppercase">Copia del archivo</p>
          <Invoice invoice={inv} copy="Copia: archivo" stamp="ANULADO" />
        </div>
        <Card className="h-fit p-5">
          <Pill tone="red">Anulada</Pill>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-bold text-primary-500">Motivo</dt>
              <dd className="font-semibold">{v.reason}</dd>
            </div>
            <div>
              <dt className="font-bold text-primary-500">Autorizó</dt>
              <dd className="flex items-center gap-1.5 font-semibold">
                <KeyRound className="size-4 text-primary-500" /> {v.by}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-primary-500">Fecha y hora</dt>
              <dd className="font-semibold">{v.at}</dd>
            </div>
            <div>
              <dt className="font-bold text-primary-500">Nota</dt>
              <dd className="font-semibold">{v.replacement}</dd>
            </div>
          </dl>
          <p className="mt-4 flex items-start gap-2 rounded-2xl bg-primary-50 p-3 text-xs font-semibold text-primary-700">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" /> Solo una supervisora con su usuario y clave puede anular. El número no se borra ni se vuelve a usar,
            y el saldo se devuelve a la familia.
          </p>
        </Card>
      </div>
    </div>
  );
}

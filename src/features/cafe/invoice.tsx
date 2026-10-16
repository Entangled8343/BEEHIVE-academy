import { money } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafe, invoiceTotals, type CafeInvoice } from "@/mocks/cafe";

const num = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Factura con las formalidades fiscales: datos del emisor y RUC, número consecutivo por serie, fecha,
 * cliente, detalle, IVA desglosado aparte de lo exento, forma de pago y leyenda de autorización.
 * No lleva el nombre del alumno.
 */
export function Invoice({
  invoice,
  copy = "Original: cliente",
  stamp,
  className,
}: {
  invoice: CafeInvoice;
  copy?: string;
  stamp?: string;
  className?: string;
}) {
  const t = invoiceTotals(invoice.lines);
  const { issuer } = cafe;
  return (
    <div className={cn("relative mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl bg-white p-5 text-[12.5px] leading-snug text-slate-900 shadow-soft ring-1 ring-slate-200", className)}>
      <div className="text-center">
        <p className="font-display text-lg font-semibold">{issuer.tradeName}</p>
        <p className="font-semibold">{issuer.legalName}</p>
        <p className="font-bold">RUC {issuer.ruc}</p>
        <p>{issuer.address}</p>
        <p>{issuer.phone}</p>
      </div>

      <div className="my-3 border-t border-dashed border-slate-300" />
      <div className="flex items-baseline justify-between font-bold">
        <span className="text-[14px] tracking-wide">FACTURA</span>
        <span className="text-[14px]">No. {invoice.number}</span>
      </div>
      <div className="mt-1 grid grid-cols-2 gap-x-2">
        <span>Fecha: {invoice.date}</span>
        <span className="text-right">{invoice.time}</span>
        <span>Caja: {invoice.number.startsWith("A") ? "Caja 1" : "Caja 2"}</span>
        <span className="text-right">Cajera: {invoice.cashier}</span>
      </div>
      <p className="mt-1">Cliente: {invoice.customer}</p>

      <div className="my-3 border-t border-dashed border-slate-300" />
      <div className="grid grid-cols-[28px_1fr_auto] gap-x-2 font-bold">
        <span>Cant</span>
        <span>Descripción</span>
        <span className="text-right">Total</span>
      </div>
      {invoice.lines.map((l) => (
        <div key={l.item} className="grid grid-cols-[28px_1fr_auto] gap-x-2">
          <span>{l.qty}</span>
          <span>
            {l.item}
            {l.exempt ? " (E)" : ""}
          </span>
          <span className="text-right tabular-nums">{num(l.qty * l.price)}</span>
        </div>
      ))}

      <div className="my-3 border-t border-dashed border-slate-300" />
      <div className="space-y-0.5 tabular-nums">
        <Row label="Subtotal gravado" value={num(t.base)} />
        <Row label="IVA 15 %" value={num(t.iva)} />
        <Row label="Ventas exentas (E)" value={num(t.exempt)} />
        <div className="flex justify-between pt-1 text-[15px] font-bold">
          <span>TOTAL</span>
          <span>{money(t.total, cafe.currency)}</span>
        </div>
      </div>
      <p className="mt-1">Forma de pago: {invoice.payment}</p>

      <div className="my-3 border-t border-dashed border-slate-300" />
      <p className="text-center text-[11px]">{issuer.authorization}</p>
      <p className="mt-1 text-center text-[11px] font-bold uppercase">{copy}</p>

      {stamp ? (
        <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-xl border-4 border-rose-600 px-4 py-1 font-display text-4xl font-semibold tracking-widest text-rose-600 opacity-85">
          {stamp}
        </span>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

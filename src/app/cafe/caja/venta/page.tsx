import { Lock, Receipt, ShieldCheck, UserRound } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { restrictionTag } from "@/features/cafe/labels";
import { RegisterHeader } from "@/features/cafe/register-header";
import { categoryIcon, categoryTone, money } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafe, invoiceTotals, stockOf } from "@/mocks/cafe";

export const metadata = { title: "Caja · Venta" };

/** Venta: existencias, lo que la familia no permite, desglose de IVA y cobro con factura consecutiva que descuenta del inventario. */
export default function Sale() {
  const { pos } = cafe;
  const st = pos.student;
  const t = invoiceTotals(pos.ticket);
  const inTicket = new Set(pos.ticket.map((l) => l.item));
  const nextNumber = cafe.invoices[0]!.number;

  return (
    <div className="min-h-dvh bg-night-900">
      <RegisterHeader step="Paso 2 de 2 · Cobrar y facturar" />
      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {["Todo", "Almuerzos", "Bebidas", "Snacks", "Frutas"].map((c, i) => (
              <span
                key={c}
                className={cn("shrink-0 rounded-full px-4 py-2 text-sm font-bold", i === 0 ? "bg-accent-400 text-primary-900" : "bg-white/10 text-primary-100")}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 xl:grid-cols-4">
            {cafe.products.map((p) => {
              const Icon = categoryIcon[p.category];
              const selected = inTicket.has(p.name);
              const { available, status } = stockOf(p);
              const restricted = p.tags.find((tag) => st.restrictions.includes(tag));
              const soldOut = status === "agotado";
              const disabled = Boolean(restricted) || soldOut;
              return (
                <div
                  key={p.name}
                  className={cn(
                    "relative flex min-h-24 flex-col justify-between rounded-3xl bg-white p-3 ring-2 ring-transparent",
                    selected && "ring-accent-400",
                    disabled && "opacity-45",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={cn("grid size-9 shrink-0 place-items-center rounded-2xl [&_svg]:size-5", categoryTone[p.category])}>
                      <Icon />
                    </span>
                    {selected ? (
                      <span className="grid size-6 place-items-center rounded-full bg-accent-400 text-xs font-bold text-primary-900">1</span>
                    ) : restricted ? (
                      <Lock className="size-4 text-primary-500" />
                    ) : (
                      <span className={cn("text-[11px] font-bold", status === "por-agotarse" ? "text-orange-600" : "text-primary-400")}>
                        {soldOut ? "" : `Quedan ${available}`}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm leading-tight font-bold">{p.name}</p>
                    {restricted ? (
                      <p className="text-[11px] font-bold text-primary-500">No permitido: {restrictionTag[restricted].toLowerCase()}</p>
                    ) : soldOut ? (
                      <p className="text-[11px] font-bold text-rose-600">Agotado</p>
                    ) : (
                      <p className="text-sm font-semibold text-primary-600">{money(p.price, cafe.currency)}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="white" size="lg" className="h-14 rounded-3xl">
            <UserRound /> Venta a docente o visita (efectivo)
          </Button>
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-4">
            <Avatar name={st.name} size="xl" kid />
            <div className="min-w-0">
              <p className="font-display text-xl leading-tight font-semibold">{st.name}</p>
              <p className="font-bold text-primary-600">{st.grade}</p>
              <Pill tone="green" className="mt-1">
                <ShieldCheck /> Foto y clave correctas
              </Pill>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-primary-50 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-bold text-primary-600">Saldo prepago</p>
              <p className="font-display text-2xl">{money(st.balance, cafe.currency)}</p>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs font-bold text-primary-600">
              <span>Límite de hoy con esta compra</span>
              <span>
                {money(st.spentToday + t.total, cafe.currency)} de {money(st.dailyLimit, cafe.currency)}
              </span>
            </div>
            <Progress value={(t.total / st.dailyLimit) * 100} className="mt-1.5 h-2" />
          </div>
          <p className="mt-2 flex items-center gap-2 rounded-2xl bg-slate-100 p-3 text-sm font-bold text-slate-700">
            <Lock className="size-4 shrink-0" /> La familia no permite: {st.restrictions.map((r) => r.toLowerCase()).join(" y ")}
          </p>

          <div className="mt-4 space-y-1.5 text-sm">
            {pos.ticket.map((l) => (
              <div key={l.item} className="flex justify-between gap-2 font-bold">
                <span>
                  {l.qty} × {l.item}
                </span>
                <span>{money(l.qty * l.price, cafe.currency)}</span>
              </div>
            ))}
            <div className="space-y-0.5 border-t border-primary-100 pt-2 text-xs font-bold text-primary-600">
              <div className="flex justify-between">
                <span>Subtotal gravado</span>
                <span>{money(t.base, cafe.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA 15 %</span>
                <span>{money(t.iva, cafe.currency)}</span>
              </div>
            </div>
            <div className="flex justify-between gap-2 font-display text-lg">
              <span>Total</span>
              <span>{money(t.total, cafe.currency)}</span>
            </div>
            <p className="text-right text-xs font-bold text-primary-500">Saldo después: {money(st.balance - t.total, cafe.currency)}</p>
          </div>

          <Button block size="lg" variant="success" className="mt-3">
            <Receipt /> Cobrar y facturar {money(t.total, cafe.currency)}
          </Button>
          <p className="mt-2 text-center text-xs font-bold text-primary-500">Factura No. {nextNumber} · numeración consecutiva</p>
        </Card>
      </div>
    </div>
  );
}

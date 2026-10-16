import { CheckCircle2, FileImage, Landmark, Upload } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { money } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Recargar o pagar" };

const amounts = [200, 500, 1000];

/** Recarga de saldo o pago de la cuenta del día por transferencia, con foto del comprobante. */
export default function TopUp() {
  const diego = cafe.children.find((c) => c.mode === "cuenta-del-dia")!;
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Recargar o pagar" subtitle="Por transferencia, con la foto del comprobante" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="min-w-0 space-y-5 p-5 lg:col-span-2">
          <div className="grid grid-cols-2 gap-1 rounded-full bg-primary-50 p-1 text-sm font-bold">
            <span className="rounded-full bg-primary-800 py-2 text-center text-white">Recargar saldo</span>
            <span className="py-2 text-center text-primary-600">Pagar cuenta del día</span>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-primary-700">1. ¿Para quién?</p>
            <div className="flex gap-2">
              {cafe.children.map((c, i) => (
                <span
                  key={c.id}
                  className={cn(
                    "flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-bold ring-2",
                    i === 0 ? "bg-accent-50 ring-accent-400" : "bg-white ring-primary-100",
                  )}
                >
                  <Avatar name={c.name} size="xs" kid /> {c.short}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-primary-700">2. Monto</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {amounts.map((a) => (
                <span
                  key={a}
                  className={cn(
                    "rounded-2xl py-3 text-center font-display text-lg ring-2",
                    a === 500 ? "bg-accent-50 ring-accent-400" : "bg-white ring-primary-100",
                  )}
                >
                  {money(a, cafe.currency).replace(".00", "")}
                </span>
              ))}
              <span className="rounded-2xl bg-white py-3 text-center text-sm font-bold text-primary-600 ring-2 ring-primary-100">Otro</span>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-primary-700">3. Transfiera a la cafetería</p>
            <div className="flex items-start gap-3 rounded-2xl bg-primary-50 p-4">
              <Landmark className="mt-0.5 size-5 shrink-0 text-primary-600" />
              <div>
                <p className="text-sm font-bold">{cafe.bank.name}</p>
                <p className="text-sm text-primary-600">{cafe.bank.detail}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-bold text-primary-700">4. Suba la foto del comprobante</p>
            <div className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-primary-200 p-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                <FileImage className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">comprobante-16-oct.jpg</p>
                <p className="text-xs font-semibold text-primary-500">Listo para enviar</p>
              </div>
              <CheckCircle2 className="size-6 text-emerald-600" />
            </div>
          </div>

          <Button block size="lg" variant="accent">
            <Upload /> Enviar comprobante de {money(500, cafe.currency)}
          </Button>
          <p className="text-center text-xs font-semibold text-primary-500">
            La cafetería confirma la transferencia y el saldo se acredita el mismo día. Usted recibe un recibo en la app.
          </p>
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <p className="text-sm font-bold text-primary-600">Cuenta del día de {diego.short}</p>
            <p className="font-display text-3xl text-orange-700">{money(diego.dayAccount, cafe.currency)}</p>
            <p className="mt-1 text-xs font-semibold text-primary-500">Se paga hoy antes de las 6:00 p. m.</p>
            <Button block className="mt-3">
              <Landmark /> Pagar por transferencia
            </Button>
          </Card>
          <section>
            <SectionTitle>Recibos</SectionTitle>
            <Card className="divide-y divide-primary-100 overflow-hidden">
              {cafe.receipts.map((r) => (
                <div key={r.number} className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{r.concept}</p>
                    <p className="text-xs font-semibold text-primary-500">
                      {r.number} · {r.date}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-base whitespace-nowrap">{money(r.amount, cafe.currency)}</p>
                    <Pill tone={r.status === "confirmada" ? "green" : "orange"} size="sm">
                      {r.status === "confirmada" ? "Confirmado" : "Por confirmar"}
                    </Pill>
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

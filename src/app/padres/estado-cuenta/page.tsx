import { BellRing, Download, Landmark, Receipt, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { IconTile } from "@/components/ui/tiles";
import { cn } from "@/lib/utils";
import { account } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Estado de cuenta" };

const status = {
  pagado: { tone: "green", label: "Pagado" },
  pendiente: { tone: "orange", label: "Pendiente" },
  vencido: { tone: "red", label: "Vencido" },
} as const;

export default function AccountStatement() {
  requireModule("estadoCuenta");
  const acc = account;
  if (!acc) return null;
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Estado de cuenta" subtitle={`${acc.family} · ${acc.children.join(" y ")}`} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="min-w-0 space-y-5 lg:col-span-2">
          <Card className="pattern-dark overflow-hidden bg-primary-800 p-6 text-white ring-0">
            <p className="text-sm font-semibold text-primary-200">Saldo pendiente</p>
            <p className="mt-1 font-display text-5xl text-white">{acc.balance}</p>
            <p className="mt-2 text-sm font-semibold text-accent-300">Vence el {acc.dueDate}</p>
            <div className="mt-5 grid gap-2 sm:flex">
              <Button variant="accent">
                <Upload /> Subir comprobante
              </Button>
              <Button className="bg-white/10 text-white ring-2 ring-white/30 hover:bg-white/20">
                <Landmark /> Cómo pagar
              </Button>
            </div>
          </Card>

          <section>
            <SectionTitle>Movimientos</SectionTitle>
            <Card className="divide-y divide-primary-100 overflow-hidden">
              {acc.rows.map((r) => {
                const st = status[r.status];
                return (
                  <div key={r.concept} className="flex items-center gap-3 px-4 py-3.5">
                    <IconTile size="sm" className={cn(r.status === "pagado" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700")}>
                      <Receipt />
                    </IconTile>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold">{r.concept}</p>
                      <p className="text-xs font-semibold text-primary-500">
                        Vence {r.due}
                        {r.receipt ? ` · Recibo ${r.receipt}` : ""}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-base whitespace-nowrap sm:text-lg">
                        {acc.currency} {r.amount}
                      </p>
                      <Pill tone={st.tone} size="sm">
                        {st.label}
                      </Pill>
                    </div>
                    {r.receipt ? (
                      <Button variant="ghost" size="icon-sm" aria-label="Descargar recibo" className="max-sm:hidden">
                        <Download />
                      </Button>
                    ) : null}
                  </div>
                );
              })}
            </Card>
          </section>
        </div>

        <div className="space-y-5">
          <Card className="p-5">
            <p className="font-display text-lg">Formas de pago</p>
            <p className="mt-2 text-sm font-semibold text-primary-700">{acc.bank.name}</p>
            <p className="mt-1 text-sm text-primary-600">{acc.bank.account}</p>
            <p className="mt-3 rounded-2xl bg-primary-50 p-3 text-xs font-semibold text-primary-700">
              Sube la foto de tu comprobante y el colegio lo confirma. El recibo llega a tu correo.
            </p>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <IconTile className="bg-accent-200 text-accent-700">
              <BellRing />
            </IconTile>
            <div>
              <p className="font-bold">Recordatorios automáticos</p>
              <p className="text-sm text-primary-600">Te avisamos 3 días antes del vencimiento y el día del pago.</p>
            </div>
          </Card>
          <p className="px-1 text-xs font-semibold text-primary-500">{acc.monthly}. Montos de ejemplo.</p>
        </div>
      </div>
    </div>
  );
}

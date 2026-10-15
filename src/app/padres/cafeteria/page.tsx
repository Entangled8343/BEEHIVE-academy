import { Ban, BellRing, CalendarClock, Gauge, Landmark, Receipt, Upload, type LucideIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { IconTile } from "@/components/ui/tiles";
import { categoryIcon, categoryTone, money } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafeteria } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Cafetería" };

const controlIcon: Record<"limite" | "bloqueo" | "aviso" | "cuenta", LucideIcon> = {
  limite: Gauge,
  bloqueo: Ban,
  aviso: BellRing,
  cuenta: CalendarClock,
};

/** Cafetería para la familia: saldo prepago o cuenta del día, consumos y controles por hijo. */
export default function FamilyCafeteria() {
  requireModule("cafeteria");
  const caf = cafeteria;
  if (!caf) return null;
  const names = caf.wallets.map((w) => w.name).join(" y ");

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Cafetería" subtitle={`Saldo y consumos de ${names}`} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="min-w-0 space-y-5 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {caf.wallets.map((w) => {
              const prepaid = w.mode === "prepago";
              const amount = prepaid ? (w.balance ?? 0) : (w.dayAccount ?? 0);
              return (
                <Card key={w.childId} className="p-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={w.name} size="md" kid />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold">{w.name}</p>
                      <p className="text-sm font-semibold text-primary-500">{w.grade}</p>
                    </div>
                    <Pill tone={prepaid ? "green" : "accent"}>{prepaid ? "Prepago" : "Cuenta del día"}</Pill>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-primary-600">{prepaid ? "Saldo disponible" : "Por pagar hoy"}</p>
                  <p className={cn("font-display text-4xl", !prepaid && "text-orange-700")}>{money(amount, caf.currency)}</p>
                  <div className="mt-3 flex justify-between text-xs font-bold text-primary-600">
                    <span>Consumió hoy</span>
                    <span>
                      {money(w.spentToday, caf.currency)} de {money(w.dailyLimit, caf.currency)}
                    </span>
                  </div>
                  <Progress value={(w.spentToday / w.dailyLimit) * 100} className="mt-1.5 h-2" />
                  <Button block variant={prepaid ? "accent" : "primary"} className="mt-4">
                    {prepaid ? (
                      <>
                        <Upload /> Recargar saldo
                      </>
                    ) : (
                      <>
                        <Landmark /> Pagar {money(amount, caf.currency)}
                      </>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>

          <section>
            <SectionTitle>Consumos de hoy</SectionTitle>
            <Card className="divide-y divide-primary-100 overflow-hidden">
              {caf.today.map((t) => {
                const Icon = categoryIcon[t.category];
                return (
                  <div key={t.time + t.item} className="flex items-center gap-3 px-4 py-3">
                    <IconTile size="sm" className={categoryTone[t.category]}>
                      <Icon />
                    </IconTile>
                    <div className="min-w-0 flex-1">
                      <p className="leading-snug font-bold">{t.item}</p>
                      <p className="text-xs font-semibold text-primary-500">
                        {t.child} · {t.time}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-base whitespace-nowrap">{money(t.amount, caf.currency)}</p>
                      {t.onAccount ? (
                        <Pill tone="accent" size="sm">
                          Cuenta del día
                        </Pill>
                      ) : (
                        <Pill tone="green" size="sm">
                          Del saldo
                        </Pill>
                      )}
                    </div>
                  </div>
                );
              })}
            </Card>
          </section>

          <section>
            <SectionTitle>Recargas y pagos</SectionTitle>
            <Card className="divide-y divide-primary-100 overflow-hidden">
              {caf.movements.map((m) => (
                <div key={m.date + m.concept} className="flex items-center gap-3 px-4 py-3">
                  <IconTile size="sm" className="bg-emerald-100 text-emerald-700">
                    <Receipt />
                  </IconTile>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">{m.concept}</p>
                    <p className="text-xs font-semibold text-primary-500">{m.date}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-base whitespace-nowrap">{money(m.amount, caf.currency)}</p>
                    <Pill tone={m.status === "confirmada" ? "green" : "orange"} size="sm">
                      {m.status === "confirmada" ? "Confirmada" : "Por confirmar"}
                    </Pill>
                  </div>
                </div>
              ))}
            </Card>
          </section>
        </div>

        <div className="space-y-5">
          <section>
            <SectionTitle>Controles de la familia</SectionTitle>
            <Card className="divide-y divide-primary-100 overflow-hidden">
              {caf.controls.map((c) => {
                const Icon = controlIcon[c.kind];
                return (
                  <div key={c.kind} className="flex items-center gap-3 px-4 py-3.5">
                    <IconTile size="sm" className="bg-primary-100 text-primary-700">
                      <Icon />
                    </IconTile>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold">{c.title}</p>
                      <p className="text-sm text-primary-600">{c.detail}</p>
                    </div>
                  </div>
                );
              })}
              <div className="p-3">
                <Button block variant="soft" size="sm">
                  Cambiar controles
                </Button>
              </div>
            </Card>
          </section>
          <Card className="p-5">
            <p className="font-display text-lg">Cómo recargar o pagar</p>
            <p className="mt-2 text-sm font-semibold text-primary-700">{caf.bank.name}</p>
            <p className="mt-1 text-sm text-primary-600">{caf.bank.account}</p>
            <p className="mt-3 rounded-2xl bg-primary-50 p-3 text-xs font-semibold text-primary-700">
              Transfiera y suba la foto del comprobante. La cafetería lo confirma y el saldo o el pago se acredita el mismo día.
            </p>
          </Card>
          <p className="px-1 text-xs font-semibold text-primary-500">Montos y productos de ejemplo.</p>
        </div>
      </div>
    </div>
  );
}

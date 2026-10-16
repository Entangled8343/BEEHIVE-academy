import Link from "next/link";
import { CalendarCheck, KeyRound, Landmark, Receipt, Upload } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { IconTile } from "@/components/ui/tiles";
import { categoryIcon, categoryTone, money } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Cafetería" };

/** Inicio de la familia: saldo o cuenta del día de cada hijo y lo que compró hoy, cada compra con su factura. */
export default function CafeFamilyHome() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Hola, Andrea" subtitle={`${cafe.today} · Cafetería del colegio`} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="min-w-0 space-y-5 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cafe.children.map((c) => {
              const prepaid = c.mode === "prepago";
              const amount = prepaid ? c.balance : c.dayAccount;
              return (
                <Card key={c.id} className="p-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} size="md" kid />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold">{c.short}</p>
                      <p className="text-sm font-semibold text-primary-500">{c.grade}</p>
                    </div>
                    <Pill tone={prepaid ? "green" : "accent"}>{prepaid ? "Prepago" : "Cuenta del día"}</Pill>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-primary-600">{prepaid ? "Saldo disponible" : "Por pagar hoy"}</p>
                  <p className={cn("font-display text-4xl", !prepaid && "text-orange-700")}>{money(amount, cafe.currency)}</p>
                  <div className="mt-3 flex justify-between text-xs font-bold text-primary-600">
                    <span>Consumió hoy</span>
                    <span>
                      {money(c.spentToday, cafe.currency)} de {money(c.dailyLimit, cafe.currency)}
                    </span>
                  </div>
                  <Progress value={(c.spentToday / c.dailyLimit) * 100} className="mt-1.5 h-2" />
                  <ButtonLink href="/cafe/familia/recargar" block variant={prepaid ? "accent" : "primary"} className="mt-4">
                    {prepaid ? (
                      <>
                        <Upload /> Recargar saldo
                      </>
                    ) : (
                      <>
                        <Landmark /> Pagar {money(amount, cafe.currency)}
                      </>
                    )}
                  </ButtonLink>
                </Card>
              );
            })}
          </div>

          <section>
            <SectionTitle>Hoy en la cafetería</SectionTitle>
            <Card className="divide-y divide-primary-100 overflow-hidden">
              {cafe.todayItems.map((t) => {
                const Icon = categoryIcon[t.category];
                return (
                  <div key={t.invoice} className="flex items-center gap-3 px-4 py-3">
                    <IconTile size="sm" className={categoryTone[t.category]}>
                      <Icon />
                    </IconTile>
                    <div className="min-w-0 flex-1">
                      <p className="leading-snug font-bold">{t.item}</p>
                      <p className="text-xs font-semibold text-primary-500">
                        {t.child} · {t.time} · Factura {t.invoice}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-base whitespace-nowrap">{money(t.amount, cafe.currency)}</p>
                      <Pill tone={t.onAccount ? "accent" : "green"} size="sm">
                        {t.onAccount ? "Cuenta del día" : "Del saldo"}
                      </Pill>
                    </div>
                  </div>
                );
              })}
            </Card>
          </section>
        </div>

        <div className="space-y-5">
          <Link href="/cafe/familia/menu" className="block">
            <Card className="pattern-dark flex items-start gap-3 bg-primary-800 p-5 text-white ring-0">
              <IconTile className="bg-accent-400 text-primary-900">
                <CalendarCheck />
              </IconTile>
              <div>
                <p className="font-bold">Almuerzos de la próxima semana</p>
                <p className="text-sm text-primary-100">Pídalos hoy antes de las 3:00 p. m. y su hijo no hace fila.</p>
              </div>
            </Card>
          </Link>
          <Card className="flex items-start gap-3 p-5">
            <IconTile className="bg-primary-100 text-primary-700">
              <KeyRound />
            </IconTile>
            <div>
              <p className="font-bold">Cómo compran sus hijos</p>
              <p className="text-sm text-primary-600">
                En la caja buscan su sección, tocan su foto y escriben su clave de 4 dígitos. No necesitan carné ni celular.
              </p>
            </div>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <IconTile className="bg-emerald-100 text-emerald-700">
              <Receipt />
            </IconTile>
            <div>
              <p className="font-bold">Cada compra con su factura</p>
              <p className="text-sm text-primary-600">Las facturas quedan en la app y se pueden descargar en PDF.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

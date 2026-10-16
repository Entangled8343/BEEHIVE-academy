import { CheckCircle2, Clock, Soup } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { IconTile } from "@/components/ui/tiles";
import { money } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Menú de la semana" };

/** Menú de la próxima semana con pedido anticipado del almuerzo por hijo. */
export default function WeeklyMenu() {
  const orders = cafe.menu.reduce((n, d) => n + d.ordered.length, 0);
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Menú de la semana" subtitle="Del 19 al 23 de octubre · Almuerzo del día" />
      <p className="mb-4 flex items-center gap-2 rounded-2xl bg-accent-100 px-4 py-3 text-sm font-bold text-accent-700">
        <Clock className="size-4 shrink-0" /> Pedidos abiertos hasta hoy a las 3:00 p. m.
      </p>
      <div className="space-y-3">
        {cafe.menu.map((d) => (
          <Card key={d.day} className="p-4">
            <div className="flex items-start gap-3">
              <IconTile size="sm" className="bg-orange-100 text-orange-700">
                <Soup />
              </IconTile>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold tracking-wide text-primary-500 uppercase">{d.day}</p>
                <p className="font-bold leading-snug">{d.dish}</p>
              </div>
              <p className="font-display text-base whitespace-nowrap">{money(cafe.lunchPrice, cafe.currency)}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {cafe.children.map((c) => {
                const on = d.ordered.includes(c.short);
                return (
                  <span
                    key={c.id}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full py-1 pr-3 pl-1 text-sm font-bold ring-2",
                      on ? "bg-emerald-50 text-emerald-800 ring-emerald-400" : "bg-white text-primary-500 ring-primary-100",
                    )}
                  >
                    <Avatar name={c.name} size="xs" kid />
                    {c.short}
                    {on ? <CheckCircle2 className="size-4" /> : null}
                  </span>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-4 flex flex-wrap items-center gap-3 p-4">
        <div className="min-w-0 flex-1">
          <p className="font-bold">
            {orders} almuerzos · {money(orders * cafe.lunchPrice, cafe.currency)}
          </p>
          <p className="text-sm text-primary-600">Se cobran cada día del saldo o a la cuenta del día de cada hijo.</p>
        </div>
        <Button variant="accent">Confirmar pedidos</Button>
      </Card>
    </div>
  );
}

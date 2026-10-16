import { BookOpen, Plus, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { IconTile } from "@/components/ui/tiles";
import { money } from "@/features/cafeteria/shared";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Plan de contingencia" };

const steps = [
  ["Sin internet", "Cada tablet sigue facturando con su propia serie y sincroniza al volver la conexión."],
  ["Sin tablet o sin luz", "La cajera usa el talonario preimpreso de la Serie C, de una imprenta autorizada."],
  ["Original y copia", "El original se entrega al cliente y la copia se guarda en el talonario."],
  ["Al volver el sistema", "Se registran las facturas del talonario con su número para que el libro de ventas quede completo."],
];

/** Plan de contingencia: talonario preimpreso de respaldo y registro posterior de esas facturas. */
export default function Contingency() {
  const c = cafe.contingency;
  return (
    <div>
      <PageHeader
        title="Plan de contingencia"
        subtitle="Facturas preimpresas de respaldo"
        action={
          <Button>
            <Plus /> Registrar factura del talonario
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="flex items-start gap-3 p-5">
          <IconTile className="bg-emerald-100 text-emerald-700">
            <Wifi />
          </IconTile>
          <div>
            <p className="font-bold">Sistema en línea</p>
            <p className="text-sm text-primary-600">Última interrupción: {c.lastOutage}</p>
          </div>
        </Card>
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-start gap-3">
            <IconTile className="bg-accent-200 text-accent-700">
              <BookOpen />
            </IconTile>
            <div className="min-w-0 flex-1">
              <p className="font-bold">
                Talonario {c.book.series} · {c.book.range}
              </p>
              <p className="text-sm text-primary-600">{c.book.printer}</p>
            </div>
            <Pill tone="green">
              {c.book.registered} de {c.book.used} registradas
            </Pill>
          </div>
          <div className="mt-4 flex justify-between text-xs font-bold text-primary-600">
            <span>Usadas: {c.book.used}</span>
            <span>Disponibles: {500 - c.book.used}</span>
          </div>
          <Progress value={(c.book.used / 500) * 100} className="mt-1.5 h-2" />
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section>
          <SectionTitle>Qué hacer si falla el sistema</SectionTitle>
          <Card className="divide-y divide-primary-100 overflow-hidden">
            {steps.map(([title, text], i) => (
              <div key={title} className="flex items-start gap-3 px-4 py-3.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary-800 font-display text-white">{i + 1}</span>
                <div>
                  <p className="flex items-center gap-1.5 font-bold">
                    {i === 0 ? <WifiOff className="size-4 text-primary-500" /> : null}
                    {title}
                  </p>
                  <p className="text-sm text-primary-600">{text}</p>
                </div>
              </div>
            ))}
          </Card>
        </section>
        <section>
          <SectionTitle>Facturas del talonario registradas</SectionTitle>
          <Card className="divide-y divide-primary-100 overflow-hidden">
            {c.entries.map((e) => (
              <div key={e.number} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="font-bold">
                    {e.number} · {e.customer}
                  </p>
                  <p className="text-xs font-semibold text-primary-500">
                    Emitida {e.date} · {e.registered}
                  </p>
                </div>
                <p className="font-display text-base whitespace-nowrap">{money(e.total, cafe.currency)}</p>
              </div>
            ))}
          </Card>
        </section>
      </div>
    </div>
  );
}

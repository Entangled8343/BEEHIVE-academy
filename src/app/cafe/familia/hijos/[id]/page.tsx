import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Ban, BellRing, Camera, Gauge, KeyRound, Plus, Wallet, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { IconTile } from "@/components/ui/tiles";
import { money } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Controles" };

/** Cómo compra cada hijo: identificación en caja (foto y clave), forma de pago, límite, bloqueos, alergias y avisos. */
export default async function ChildControls({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const child = cafe.children.find((c) => c.id === id);
  if (!child) notFound();
  const prepaid = child.mode === "prepago";

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Controles" subtitle="Cómo compra cada hijo en la cafetería" />
      <div className="mb-5 flex gap-2">
        {cafe.children.map((c) => (
          <Link
            key={c.id}
            href={`/cafe/familia/hijos/${c.id}`}
            className={cn(
              "flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-bold ring-2",
              c.id === child.id ? "bg-accent-50 ring-accent-400" : "bg-white ring-primary-100",
            )}
          >
            <Avatar name={c.name} size="xs" kid /> {c.short} · {c.grade}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <p className="font-display text-lg">Cómo se identifica en la caja</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative">
              <Avatar name={child.name} size="2xl" kid />
              <span className="absolute -right-1 -bottom-1 grid size-9 place-items-center rounded-full bg-primary-800 text-white ring-4 ring-white">
                <Camera className="size-4" />
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-bold">Foto para la caja</p>
              <p className="text-sm text-primary-600">La cajera la ve en grande antes de cobrar.</p>
              <p className="mt-1 text-xs font-semibold text-primary-500">Actualizada el 10 de octubre</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-primary-50 p-3">
            <IconTile size="sm" className="bg-white text-primary-700">
              <KeyRound />
            </IconTile>
            <div className="min-w-0 flex-1">
              <p className="font-bold">Clave de 4 dígitos</p>
              <p className="text-sm font-bold tracking-[0.4em] text-primary-500">••••</p>
            </div>
            <Button variant="outline" size="sm">
              Cambiar
            </Button>
          </div>
          <p className="mt-3 text-sm text-primary-600">
            {child.short} busca su sección, toca su foto y escribe su clave. Tres intentos fallidos bloquean la compra y le avisamos.
          </p>
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <IconTile size="sm" className="bg-primary-100 text-primary-700">
                <Wallet />
              </IconTile>
              <p className="flex-1 font-bold">Forma de pago</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1 rounded-full bg-primary-50 p-1 text-sm font-bold">
              <span className={cn("rounded-full py-2 text-center", prepaid ? "bg-primary-800 text-white" : "text-primary-600")}>Prepago</span>
              <span className={cn("rounded-full py-2 text-center", !prepaid ? "bg-primary-800 text-white" : "text-primary-600")}>
                Cuenta del día
              </span>
            </div>
            <p className="mt-3 text-sm text-primary-600">
              {prepaid
                ? "Consume de un saldo que usted recarga por transferencia."
                : "Lo que consume se suma durante el día y se paga hoy antes de las 6:00 p. m. Si queda pendiente, mañana solo podrá comprar con saldo."}
            </p>
          </Card>

          <Card className="divide-y divide-primary-100 overflow-hidden">
            <Row icon={<Gauge />} title="Límite diario" detail={money(child.dailyLimit, cafe.currency)} />
            <div className="flex items-start gap-3 px-4 py-3.5">
              <IconTile size="sm" className="bg-primary-100 text-primary-700">
                <Ban />
              </IconTile>
              <div className="min-w-0 flex-1">
                <p className="font-bold">Productos bloqueados</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {child.blocked.map((b) => (
                    <Pill key={b} tone="gray">
                      {b} <X />
                    </Pill>
                  ))}
                  <Pill tone="primary">
                    <Plus /> Agregar
                  </Pill>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-rose-50/60 px-4 py-3.5">
              <IconTile size="sm" className="bg-rose-100 text-rose-700">
                <AlertTriangle />
              </IconTile>
              <div className="min-w-0 flex-1">
                <p className="font-bold">Alergias</p>
                <p className="text-sm text-primary-700">{child.allergies}</p>
                {child.allergies.startsWith("Alergia") ? (
                  <p className="mt-0.5 text-xs font-semibold text-rose-700">La caja no le deja comprar productos que la contengan.</p>
                ) : null}
              </div>
            </div>
            <Row icon={<BellRing />} title="Avisos" detail={child.notify} />
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <IconTile size="sm" className="bg-primary-100 text-primary-700">
        {icon}
      </IconTile>
      <div className="min-w-0 flex-1">
        <p className="font-bold">{title}</p>
        <p className="text-sm text-primary-600">{detail}</p>
      </div>
    </div>
  );
}

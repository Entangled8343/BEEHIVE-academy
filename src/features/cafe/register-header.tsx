import { LogoCircle } from "@/components/brand/logo";
import { cafe } from "@/mocks/cafe";

/** Encabezado de la caja: estación, serie de facturas, cajera y estado de la conexión. */
export function RegisterHeader({ step }: { step: string }) {
  return (
    <header className="pattern-dark flex flex-wrap items-center gap-3 px-5 py-4 text-white">
      <LogoCircle className="size-11" />
      <div className="min-w-0 flex-1">
        <p className="font-display text-xl font-semibold">Cafetería · {cafe.pos.station}</p>
        <p className="text-sm font-semibold text-primary-200">
          {cafe.today} · {cafe.pos.cashier}
        </p>
      </div>
      <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-primary-100">{step}</span>
      <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-primary-100">
        <span className="size-2 rounded-full bg-emerald-400" /> En línea
      </span>
    </header>
  );
}

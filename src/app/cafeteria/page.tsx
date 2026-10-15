import { AlertTriangle, Ban, CheckCircle2, Lock, ScanLine, Search, ShieldCheck, XCircle } from "lucide-react";
import { LogoCircle } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Progress } from "@/components/ui/progress";
import { categoryIcon, categoryTone, money } from "@/features/cafeteria/shared";
import { cn } from "@/lib/utils";
import { cafeteria, school } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Cafetería" };

const statTone = { accent: "text-accent-400", green: "text-emerald-400", orange: "text-orange-300" } as const;

const saleStatus = {
  saldo: { tone: "green", label: "Del saldo" },
  cuenta: { tone: "accent", label: "Cuenta del día" },
  rechazado: { tone: "red", label: "No se cobró" },
} as const;

/** Caja de la cafetería (tablet): se escanea el carné, se marcan los productos y se cobra del saldo o a la cuenta del día. */
export default function CafeteriaRegister() {
  requireModule("cafeteria");
  const caf = cafeteria;
  if (!caf) return null;
  const { pos } = caf;
  const st = pos.student;
  const total = pos.ticket.reduce((sum, t) => sum + t.qty * t.price, 0);
  const availableToday = st.dailyLimit - st.spentToday;
  const inTicket = new Set(pos.ticket.map((t) => t.item));

  return (
    <div className="min-h-dvh bg-night-900">
      <header className="pattern-dark flex items-center gap-3 px-5 py-4 text-white">
        <LogoCircle className="size-11" />
        <div className="flex-1">
          <p className="font-display text-xl font-semibold">Cafetería · {pos.station}</p>
          <p className="text-sm font-semibold text-primary-200">
            {school.today} · {pos.cashier}
          </p>
        </div>
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {pos.stats.map((s) => (
              <div key={s.label} className="rounded-3xl bg-white/8 p-4 text-white">
                <p className={cn("font-display text-3xl font-semibold", statTone[s.tone])}>{s.value}</p>
                <p className="text-sm font-bold text-primary-200">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {["Todo", ...pos.categories].map((c, i) => (
              <span
                key={c}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-bold",
                  i === 0 ? "bg-accent-400 text-primary-900" : "bg-white/10 text-primary-100",
                )}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 xl:grid-cols-4">
            {pos.products.map((p) => {
              const Icon = categoryIcon[p.category];
              const selected = inTicket.has(p.name);
              const blocked = p.flag === "bloqueado";
              const allergy = p.flag === "alergia";
              return (
                <div
                  key={p.name}
                  className={cn(
                    "relative flex min-h-24 flex-col justify-between rounded-3xl bg-white p-3 ring-2 ring-transparent",
                    selected && "ring-accent-400",
                    blocked && "opacity-45",
                    allergy && "bg-rose-50 ring-rose-400",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={cn("grid size-9 shrink-0 place-items-center rounded-2xl [&_svg]:size-5", categoryTone[p.category])}>
                      <Icon />
                    </span>
                    {selected ? (
                      <span className="grid size-6 place-items-center rounded-full bg-accent-400 text-xs font-bold text-primary-900">1</span>
                    ) : blocked ? (
                      <Lock className="size-4 text-primary-500" />
                    ) : allergy ? (
                      <AlertTriangle className="size-4 text-rose-600" />
                    ) : null}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm leading-tight font-bold">{p.name}</p>
                    {p.flagNote ? (
                      <p className={cn("text-[11px] font-bold", allergy ? "text-rose-700" : "text-primary-500")}>{p.flagNote}</p>
                    ) : (
                      <p className="text-sm font-semibold text-primary-600">{money(p.price, caf.currency)}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Card className="divide-y divide-primary-100 overflow-hidden">
            <p className="px-4 py-2.5 text-xs font-bold tracking-wide text-primary-500 uppercase">Últimas ventas</p>
            {pos.recent.map((r) => {
              const s = saleStatus[r.status];
              return (
                <div key={r.name} className="flex items-center gap-3 px-4 py-2.5">
                  <Avatar name={r.name} size="sm" kid />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {r.name} · {r.grade}
                    </p>
                    <p className="truncate text-xs font-semibold text-primary-500">{r.detail}</p>
                  </div>
                  {r.amount ? <p className="font-display text-base whitespace-nowrap">{money(r.amount, caf.currency)}</p> : null}
                  <Pill tone={s.tone} size="sm">
                    {r.status === "rechazado" ? <XCircle /> : <CheckCircle2 />} {s.label}
                  </Pill>
                </div>
              );
            })}
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-4">
              <Avatar name={st.name} size="xl" kid />
              <div className="min-w-0">
                <p className="font-display text-xl leading-tight font-semibold">{st.name}</p>
                <p className="font-bold text-primary-600">{st.grade}</p>
                <Pill tone="green" className="mt-1">
                  <ShieldCheck /> Carné escaneado
                </Pill>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-primary-50 p-3">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-bold text-primary-600">Saldo</p>
                <p className="font-display text-2xl">{money(st.balance, caf.currency)}</p>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-bold text-primary-600">
                <span>Puede gastar hoy</span>
                <span>
                  {money(availableToday, caf.currency)} de {money(st.dailyLimit, caf.currency)}
                </span>
              </div>
              <Progress value={(st.spentToday / st.dailyLimit) * 100} className="mt-1.5 h-2" />
            </div>

            {st.allergy ? (
              <p className="mt-3 flex items-center gap-2 rounded-2xl bg-rose-50 p-3 text-sm font-bold text-rose-700">
                <AlertTriangle className="size-5 shrink-0" /> {st.allergy}
              </p>
            ) : null}
            {st.blocked.length ? (
              <p className="mt-2 flex items-center gap-2 rounded-2xl bg-slate-100 p-3 text-sm font-bold text-slate-700">
                <Ban className="size-5 shrink-0" /> La familia bloqueó: {st.blocked.join(" y ").toLowerCase()}
              </p>
            ) : null}

            <div className="mt-4 space-y-1.5">
              {pos.ticket.map((t) => (
                <div key={t.item} className="flex justify-between gap-2 text-sm font-bold">
                  <span>
                    {t.qty} × {t.item}
                  </span>
                  <span>{money(t.qty * t.price, caf.currency)}</span>
                </div>
              ))}
              <div className="flex justify-between gap-2 border-t border-primary-100 pt-2 font-display text-lg">
                <span>Total</span>
                <span>{money(total, caf.currency)}</span>
              </div>
              <p className="text-right text-xs font-bold text-primary-500">
                Saldo después: {money(st.balance - total, caf.currency)}
              </p>
            </div>

            <Button block size="lg" variant="success" className="mt-3">
              Cobrar {money(total, caf.currency)}
            </Button>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Button size="lg" variant="accent" className="h-16 rounded-3xl">
              <ScanLine /> Escanear carné
            </Button>
            <Button size="lg" variant="white" className="h-16 rounded-3xl">
              <Search /> Buscar alumno
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

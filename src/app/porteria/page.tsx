import { AlertTriangle, CheckCircle2, DoorOpen, IdCard, KeyRound, RefreshCw, ScanLine, ShieldCheck } from "lucide-react";
import { LogoCircle } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { gateQueue, gateVerify, school, users } from "@/mocks";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Portería" };

export default function GatePage() {
  requireModule("retiro");
  const pending = gateQueue.filter((g) => g.status === "programado").length;
  const delivered = gateQueue.filter((g) => g.status === "entregado" || g.status === "sale-solo").length;
  const alerts = gateQueue.filter((g) => g.status === "alerta").length;
  return (
    <div className="min-h-dvh bg-night-900">
      <header className="pattern-dark flex items-center gap-3 px-5 py-4 text-white">
        <LogoCircle className="size-11" />
        <div className="flex-1">
          <p className="font-display text-xl font-semibold">Portería · Retiros de hoy</p>
          <p className="text-sm font-semibold text-primary-200">{school.today} · {users.porteria.name}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-primary-100">
          <RefreshCw className="size-3.5" /> Actualizado hace 3 s
        </span>
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Por entregar", value: pending, cls: "text-accent-400" },
              { label: "Entregados", value: delivered, cls: "text-emerald-400" },
              { label: "Alertas", value: alerts, cls: "text-rose-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-3xl bg-white/8 p-4 text-white">
                <p className={cn("font-display text-4xl font-semibold", s.cls)}>{s.value}</p>
                <p className="text-sm font-bold text-primary-200">{s.label}</p>
              </div>
            ))}
          </div>
          <Card className="divide-y divide-primary-100 overflow-hidden">
            {gateQueue.map((g) => (
              <div
                key={g.child}
                className={cn(
                  "flex items-center gap-3 px-4 py-3",
                  g.status === "alerta" && "bg-rose-50",
                  (g.status === "entregado" || g.status === "sale-solo") && "opacity-60",
                )}
              >
                <Avatar name={g.child} size="md" kid />
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{g.child}</p>
                  <p className="text-sm font-semibold text-primary-500">{g.grade}</p>
                </div>
                <div className="hidden min-w-0 flex-1 sm:block">
                  {g.status === "alerta" ? (
                    <p className="flex items-center gap-1.5 text-sm font-bold text-rose-700">
                      <AlertTriangle className="size-4" /> Sin aviso de retiro · llamar a la familia
                    </p>
                  ) : (
                    <>
                      <p className="text-sm font-bold">{g.person}</p>
                      <p className="text-xs font-semibold text-primary-500">
                        {g.relationship} · {g.time}
                      </p>
                    </>
                  )}
                </div>
                {g.status === "sale-solo" ? (
                  <Pill tone="blue">
                    <DoorOpen /> {g.method}
                  </Pill>
                ) : g.status === "entregado" ? (
                  <Pill tone="green">
                    <CheckCircle2 /> {g.method}
                  </Pill>
                ) : g.status === "alerta" ? (
                  <Pill tone="red">Alerta</Pill>
                ) : (
                  <Pill tone="accent">{g.time}</Pill>
                )}
              </div>
            ))}
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <p className="text-xs font-bold tracking-wide text-primary-500 uppercase">Verificar retiro</p>
            <div className="mt-3 flex items-center gap-4">
              <Avatar name={gateVerify.person} size="xl" />
              <div>
                <p className="font-display text-2xl leading-tight font-semibold">{gateVerify.person}</p>
                <p className="font-bold text-primary-600">{gateVerify.relationship}</p>
                <Pill tone="green" className="mt-1">
                  <ShieldCheck /> QR válido
                </Pill>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-primary-50 p-3 text-sm font-bold text-primary-700">
              <IdCard className="size-5" /> Cédula {gateVerify.cedula} · coincide
            </div>
            <p className="mt-4 mb-2 text-sm font-bold">Entregar a:</p>
            <div className="space-y-2">
              {gateVerify.children.map((c) => (
                <div key={c} className="flex items-center gap-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-2.5">
                  <Avatar name={c} size="sm" kid />
                  <p className="flex-1 text-sm font-bold">{c}</p>
                  <CheckCircle2 className="size-5 text-emerald-600" />
                </div>
              ))}
            </div>
            <Button block size="lg" variant="success" className="mt-4">
              Confirmar entrega
            </Button>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Button size="lg" variant="accent" className="h-16 rounded-3xl">
              <ScanLine /> Escanear QR
            </Button>
            <Button size="lg" variant="white" className="h-16 rounded-3xl">
              <KeyRound /> Código
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

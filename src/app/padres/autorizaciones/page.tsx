import { Bus, CalendarDays, CheckCircle2, Clock, MapPin, PenLine, ShieldCheck } from "lucide-react";
import { Scene } from "@/components/brand/scene";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { PageHeader } from "@/components/ui/page-header";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { permissionSlip as p } from "@/mocks";

export const metadata = { title: "Permisos" };

export default function PermissionSlipPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Permiso de salida" subtitle={p.due} back="/padres" />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <Scene name="volcan" className="h-36" label="Excursión educativa" />
          <div className="p-5">
            <Pill tone="orange">Pendiente de firma</Pill>
            <h2 className="mt-2 text-2xl leading-tight font-semibold">{p.title}</h2>
            <p className="mt-1 font-bold text-navy-600">{p.child}</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li className="flex gap-3">
                <CalendarDays className="size-5 shrink-0 text-navy-500" /> {p.date}
              </li>
              <li className="flex gap-3">
                <Clock className="size-5 shrink-0 text-navy-500" /> {p.schedule}
              </li>
              <li className="flex gap-3">
                <MapPin className="size-5 shrink-0 text-navy-500" /> {p.place}
              </li>
              <li className="flex gap-3">
                <Bus className="size-5 shrink-0 text-navy-500" /> {p.transport}
              </li>
            </ul>
            <p className="mt-4 text-sm font-bold text-navy-800">Llevar:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.bring.map((b) => (
                <Pill key={b} tone="honey">
                  {b}
                </Pill>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-lg font-semibold">Mi respuesta</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Autorizo", "No autorizo"].map((o, i) => (
              <div
                key={o}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border-2 p-3 font-bold",
                  i === 0 ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-navy-100 text-navy-600",
                )}
              >
                {i === 0 ? <CheckCircle2 className="size-5" /> : <span className="size-5 rounded-full border-2 border-navy-200" />}
                {o}
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field label="Nombre completo">
              <Input defaultValue="María José López" readOnly />
            </Field>
            <Field label="Cédula">
              <Input defaultValue="401-120690-0003F" readOnly />
            </Field>
          </div>
          <p className="mt-4 mb-1.5 flex items-center gap-1.5 text-sm font-bold text-navy-800">
            <PenLine className="size-4" /> Firma aquí con tu dedo
          </p>
          <div className="relative h-40 rounded-2xl border-2 border-dashed border-navy-200 bg-navy-50/40">
            <svg viewBox="0 0 320 140" className="absolute inset-0 size-full" aria-hidden>
              <path
                d="M40 92 C 55 40, 70 40, 72 88 S 95 120, 104 70 C 110 40, 122 48, 120 86 C 119 104, 138 104, 146 78 C 152 60, 160 62, 164 84 C 168 100, 180 96, 188 74 C 196 54, 206 66, 210 86 C 214 100, 232 96, 250 70 M 120 108 C 160 112, 220 106, 280 98"
                fill="none"
                stroke="#1d1e55"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute right-3 bottom-2 text-xs font-bold text-navy-400">Borrar</span>
          </div>
          <p className="mt-3 flex items-start gap-2 text-xs font-semibold text-navy-600">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            Se guardará una copia del permiso, la fecha y hora de tu firma. No se puede modificar después.
          </p>
          <Button block size="lg" variant="success" className="mt-4">
            Firmar y enviar
          </Button>
        </Card>
      </div>
    </div>
  );
}

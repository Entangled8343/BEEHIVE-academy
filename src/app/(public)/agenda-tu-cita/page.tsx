import { CalendarCheck, Clock, MapPin } from "lucide-react";
import { Scene } from "@/components/brand/scene";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { school } from "@/mocks";

export const metadata = { title: "Agenda tu cita" };

const days = [
  { d: "Lun", n: 12 },
  { d: "Mar", n: 13 },
  { d: "Mié", n: 14 },
  { d: "Jue", n: 15 },
  { d: "Vie", n: 16 },
  { d: "Lun", n: 19 },
];
const slots = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "1:00", "1:30", "2:00"];
const taken = new Set(["8:30", "10:00", "1:30"]);

export default function AppointmentPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Card className="overflow-hidden self-start">
          <Scene name="aula" className="h-40" label="Visita guiada · 30 min" />
          <div className="p-5">
            <h1 className="text-3xl leading-tight font-semibold">Agenda tu cita</h1>
            <p className="mt-2 text-navy-700">
              Conoce nuestras instalaciones, a las maestras y resuelve tus dudas sobre la matrícula 2027.
            </p>
            <div className="mt-4 space-y-2 text-sm font-semibold text-navy-700">
              <p className="flex gap-2">
                <Clock className="size-4 shrink-0 text-honey-600" /> Duración aproximada: 30 minutos
              </p>
              <p className="flex gap-2">
                <MapPin className="size-4 shrink-0 text-honey-600" /> {school.address}
              </p>
            </div>
          </div>
        </Card>

        <Card className="min-w-0 p-5 lg:p-8">
          <p className="font-display text-lg font-semibold">1. Elige el día</p>
          <div className="scrollbar-none -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            {days.map((d, i) => (
              <div
                key={d.n}
                className={cn(
                  "grid w-16 shrink-0 place-items-center rounded-2xl py-2.5",
                  i === 1 ? "bg-navy-800 text-white" : "bg-navy-50 text-navy-800",
                )}
              >
                <span className="text-xs font-bold uppercase opacity-80">{d.d}</span>
                <span className="font-display text-2xl font-semibold">{d.n}</span>
                <span className="text-[10px] font-bold opacity-70">oct</span>
              </div>
            ))}
          </div>

          <p className="mt-6 font-display text-lg font-semibold">2. Elige la hora</p>
          {[
            { label: "Mañana", items: slots.filter((s) => !s.startsWith("1:") && !s.startsWith("2:")) },
            { label: "Tarde", items: slots.filter((s) => s.startsWith("1:") || s.startsWith("2:")) },
          ].map((g) => (
            <div key={g.label} className="mt-3">
              <p className="mb-2 text-xs font-bold tracking-wide text-navy-500 uppercase">{g.label}</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className={cn(
                      "grid h-11 place-items-center rounded-full font-display font-semibold",
                      taken.has(s)
                        ? "bg-navy-50 text-navy-300 line-through"
                        : s === "9:00"
                          ? "bg-honey-400 text-navy-900 ring-2 ring-navy-800"
                          : "bg-white text-navy-800 ring-2 ring-navy-100",
                    )}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <p className="mt-6 font-display text-lg font-semibold">3. Tus datos</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Nombre completo">
              <Input defaultValue="Gabriela Vega" />
            </Field>
            <Field label="WhatsApp">
              <Input defaultValue="8890-1122" />
            </Field>
            <Field label="Correo electrónico">
              <Input defaultValue="gabriela.vega@correo.com" />
            </Field>
            <Field label="¿Para qué grado?">
              <Input defaultValue="Preescolar I" />
            </Field>
          </div>
          <div className="mt-6 flex flex-col gap-3 rounded-3xl bg-honey-100 p-4 sm:flex-row sm:items-center">
            <CalendarCheck className="size-6 shrink-0 text-navy-800" />
            <p className="flex-1 font-bold">Martes 13 de octubre · 9:00 a. m.</p>
            <Button>Confirmar cita</Button>
          </div>
          <p className="mt-3 text-xs font-semibold text-navy-500">
            Te enviaremos la confirmación por correo y un recordatorio un día antes.
          </p>
        </Card>
      </div>
    </main>
  );
}

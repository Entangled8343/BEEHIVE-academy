import { Delete, Lock, Search, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/features/cafe/register-header";
import { cn } from "@/lib/utils";
import { cafe } from "@/mocks/cafe";

export const metadata = { title: "Caja · Identificar alumno" };

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "borrar", "0", "ok"];

/** Identificación sin carné: sección → foto → clave de 4 dígitos que escribe el alumno. */
export default function IdentifyStudent() {
  const { pos } = cafe;
  const st = pos.student;
  return (
    <div className="min-h-dvh bg-night-900">
      <RegisterHeader step="Paso 1 de 2 · ¿Quién compra?" />
      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-4">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-primary-400">
            <Search className="size-5" />
            <span className="text-sm font-semibold">Buscar por nombre…</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {pos.sections.map((s) => (
              <span
                key={s}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-bold",
                  s === pos.selectedSection ? "bg-accent-400 text-primary-900" : "bg-white/10 text-primary-100",
                )}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 xl:grid-cols-4">
            {pos.classmates.map((name) => {
              const selected = name === st.name;
              return (
                <div
                  key={name}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-3xl bg-white p-3 text-center ring-4",
                    selected ? "ring-accent-400" : "ring-transparent",
                  )}
                >
                  <Avatar name={name} size="lg" kid />
                  <p className="text-sm leading-tight font-bold">{name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="p-5">
          <div className="flex flex-col items-center text-center">
            <Avatar name={st.name} size="2xl" kid />
            <p className="mt-3 font-display text-2xl leading-tight font-semibold">{st.name}</p>
            <p className="font-bold text-primary-600">{st.grade}</p>
            <p className="mt-3 text-sm font-bold text-primary-700">{st.short}, escribe tu clave</p>
            <div className="mt-2 flex gap-3">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={cn("size-4 rounded-full", i < 2 ? "bg-primary-800" : "bg-primary-100")} />
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {keys.map((k) => (
              <span
                key={k}
                className={cn(
                  "grid h-14 place-items-center rounded-2xl font-display text-2xl",
                  k === "ok" ? "bg-emerald-600 text-white" : k === "borrar" ? "bg-primary-50 text-primary-600" : "bg-primary-50 text-primary-900",
                )}
              >
                {k === "borrar" ? <Delete className="size-6" /> : k === "ok" ? <ShieldCheck className="size-6" /> : k}
              </span>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-2xl bg-primary-50 p-3 text-xs font-semibold text-primary-700">
            <Lock className="mt-0.5 size-4 shrink-0" /> La cajera confirma con la foto. Tres claves incorrectas bloquean la compra y avisan a la familia.
          </p>
        </Card>
      </div>
    </div>
  );
}

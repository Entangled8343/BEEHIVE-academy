import { Eye, ShieldCheck } from "lucide-react";
import { Bee } from "@/components/brand/bee";
import { LogoCircle, LogoWordmark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

export const metadata = { title: "Ingresar" };

/**
 * Réplica visual del <SignIn /> de Clerk con la apariencia de marca.
 * En la Fase 1 se reemplaza por el componente real (@clerk/nextjs, localización esES).
 */
export default function SignInPage() {
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <section className="honeycomb-navy relative hidden flex-col justify-between overflow-hidden bg-navy-800 p-12 text-white lg:flex">
        <LogoCircle className="size-16" priority />
        <div>
          <h1 className="text-5xl leading-tight font-semibold text-white">
            Bienvenidos al portal <span className="text-honey-400">Beehive</span>
          </h1>
          <p className="mt-4 max-w-md text-lg text-navy-100">
            Tareas, notas, agenda diaria, avisos y retiro seguro de tus hijos, en un solo lugar.
          </p>
        </div>
        <p className="font-display text-xl font-medium text-honey-300">Discover · Learn · Enjoy</p>
        <Bee className="absolute top-24 right-20 size-24 rotate-12" />
        <Bee className="absolute right-48 bottom-40 size-14 -rotate-12" flip />
      </section>

      <section className="honeycomb flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm rounded-[2rem] bg-white p-7 shadow-lift ring-1 ring-navy-100/70">
          <div className="flex justify-center">
            <LogoWordmark className="w-36" priority />
          </div>
          <h2 className="mt-4 text-center text-2xl font-semibold">Inicia sesión</h2>
          <p className="mt-1 text-center text-sm text-navy-600">¡Bienvenido de nuevo! Ingresa para continuar.</p>

          <div className="mt-6 space-y-4">
            <Field label="Correo electrónico">
              <Input defaultValue="mariajose@correo.com" type="email" />
            </Field>
            <Field label="Contraseña">
              <div className="relative">
                <Input defaultValue="beehive2026" type="password" />
                <Eye className="absolute top-1/2 right-4 size-5 -translate-y-1/2 text-navy-400" />
              </div>
            </Field>
            <Button block size="lg">
              Continuar
            </Button>
            <p className="text-center text-sm font-bold text-navy-700">¿Olvidaste tu contraseña?</p>
          </div>

          <div className="mt-6 rounded-2xl bg-honey-50 p-3 text-center text-xs font-semibold text-navy-700">
            El acceso es solo por invitación del colegio. ¿No recibiste la tuya? Escríbenos por WhatsApp.
          </div>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-navy-500">
          <ShieldCheck className="size-4" /> Acceso seguro con Clerk
        </p>
      </section>
    </main>
  );
}

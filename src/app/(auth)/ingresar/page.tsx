import Image from "next/image";
import { Eye, Globe, ShieldCheck } from "lucide-react";
import { Comet, Star } from "@/components/brand/comet";
import { LogoCircle, LogoWordmark, Tagline } from "@/components/brand/logo";
import { Mascot } from "@/components/brand/mascot";
import { MicrosoftIcon } from "@/components/brand/social-icons";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { users } from "@/mocks";
import { schoolConfig } from "@/schools";

export const metadata = { title: "Ingresar" };

/**
 * Réplica visual del <SignIn /> de Clerk con la apariencia de marca de cada colegio.
 * En la Fase 1 se reemplaza por el componente real (@clerk/nextjs, localización esES/enUS).
 */
export default function SignInPage() {
  const students = schoolConfig.studentLoginFromGrade !== null;
  const curie = schoolConfig.id === "curie";
  const microsoft = schoolConfig.microsoftSignIn;
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <section
        className={cn(
          "pattern-dark relative hidden flex-col justify-between overflow-hidden p-12 text-white lg:flex",
          curie ? "bg-night-900" : "bg-primary-800",
        )}
      >
        {schoolConfig.brand.wordmarkOnDark ? (
          <Image
            src={schoolConfig.brand.wordmarkOnDark}
            alt={schoolConfig.name}
            width={schoolConfig.brand.wordmarkSize?.[0] ?? 600}
            height={schoolConfig.brand.wordmarkSize?.[1] ?? 300}
            priority
            className="h-auto w-64"
          />
        ) : (
          <LogoCircle className="size-16" priority />
        )}
        <div>
          <h1 className="text-5xl leading-tight font-semibold text-white">
            {curie ? (
              <>
                Bienvenidos al <span className="text-accent-400 italic">Curie-verse</span>
              </>
            ) : (
              <>
                Bienvenidos al portal <span className="text-accent-400">{schoolConfig.shortName}</span>
              </>
            )}
          </h1>
          <p className="mt-4 max-w-md text-lg text-primary-100">{schoolConfig.copy.portalSubtitle}</p>
        </div>
        <Tagline className="text-xl font-medium text-accent-300" />
        {curie ? (
          <>
            <Comet className="absolute top-24 right-16 size-32 -rotate-6" />
            <Star className="absolute right-56 bottom-44 size-10" />
            <Star className="absolute top-1/2 right-24 size-6" tone="green" />
          </>
        ) : (
          <>
            <Mascot className="absolute top-24 right-20 size-24 rotate-12" />
            <Mascot className="absolute right-48 bottom-40 size-14 -rotate-12" flip />
          </>
        )}
      </section>

      <section className="pattern-light flex flex-col items-center justify-center px-4 py-10">
        {schoolConfig.locales.length > 1 ? (
          <div className="mb-4 flex items-center gap-1 self-center rounded-full bg-white p-1 text-xs font-bold shadow-soft ring-1 ring-primary-100 lg:self-end">
            <Globe className="ml-1.5 size-4 text-primary-500" />
            {schoolConfig.locales.map((l, i) => (
              <span key={l} className={cn("rounded-full px-2.5 py-1 uppercase", i === 0 ? "bg-primary-800 text-white" : "text-primary-600")}>
                {l}
              </span>
            ))}
          </div>
        ) : null}
        <div className="w-full max-w-sm rounded-[2rem] bg-white p-7 shadow-lift ring-1 ring-primary-100/70">
          <div className="flex justify-center">
            <LogoWordmark className="w-36" priority />
          </div>
          <h2 className="mt-4 text-center text-2xl font-semibold">Inicia sesión</h2>
          <p className="mt-1 text-center text-sm text-primary-600">¡Bienvenido de nuevo! Ingresa para continuar.</p>

          {microsoft ? (
            <div className="mt-6">
              <Button variant="outline" block size="lg">
                <MicrosoftIcon />
                Continuar con Microsoft
              </Button>
              <p className="mt-2 text-center text-xs font-semibold text-primary-600">
                Alumnos y docentes: con la misma cuenta de Office 365 que usan en Teams.
              </p>
              <div className="mt-5 flex items-center gap-3 text-xs font-bold text-primary-400">
                <span className="h-px flex-1 bg-primary-100" />o con tu correo<span className="h-px flex-1 bg-primary-100" />
              </div>
            </div>
          ) : null}

          <div className={cn("space-y-4", microsoft ? "mt-5" : "mt-6")}>
            <Field label={students ? "Correo o usuario" : "Correo electrónico"}>
              <Input defaultValue={users.padre.email} />
            </Field>
            <Field label="Contraseña">
              <div className="relative">
                <Input defaultValue="demo-2026" type="password" />
                <Eye className="absolute top-1/2 right-4 size-5 -translate-y-1/2 text-primary-400" />
              </div>
            </Field>
            <Button block size="lg">
              Continuar
            </Button>
            <p className="text-center text-sm font-bold text-primary-700">¿Olvidaste tu contraseña?</p>
          </div>

          <div className="mt-6 rounded-2xl bg-accent-50 p-3 text-center text-xs font-semibold text-primary-700">
            {microsoft
              ? "Alumnos y docentes entran con su cuenta de Office 365 del colegio. Familias: acceso por invitación."
              : students
              ? `Familias y docentes: acceso por invitación. Alumnos desde ${schoolConfig.studentLoginFromGrade}° grado: usuario entregado por el colegio.`
              : "El acceso es solo por invitación del colegio. ¿No recibiste la tuya? Escríbenos por WhatsApp."}
          </div>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary-500">
          <ShieldCheck className="size-4" /> Acceso seguro con Clerk
        </p>
      </section>
    </main>
  );
}

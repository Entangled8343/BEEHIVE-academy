import { Mascot } from "@/components/brand/mascot";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="pattern-light grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <Mascot className="mx-auto size-20" />
        <h1 className="mt-4 text-3xl font-semibold">Esta pantalla está en construcción</h1>
        <p className="mt-2 text-primary-600">Estamos trabajando en esta sección. Vuelve pronto.</p>
        <ButtonLink href="/" className="mt-6">
          Ir al inicio
        </ButtonLink>
      </div>
    </main>
  );
}

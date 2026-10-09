import { Bee } from "@/components/brand/bee";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="honeycomb grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <Bee className="mx-auto size-20" />
        <h1 className="mt-4 text-3xl font-semibold">Esta pantalla está en construcción</h1>
        <p className="mt-2 text-navy-600">La abejita todavía está trabajando aquí. Vuelve pronto.</p>
        <ButtonLink href="/" className="mt-6">
          Ir al inicio
        </ButtonLink>
      </div>
    </main>
  );
}

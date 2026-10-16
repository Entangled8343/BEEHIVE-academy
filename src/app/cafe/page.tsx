import Link from "next/link";
import { LayoutDashboard, ScanLine, Users } from "lucide-react";
import { LogoCircle } from "@/components/brand/logo";
import { requireModule } from "@/schools/guard";

export const metadata = { title: "Cafetería Curie" };

const views = [
  { href: "/cafe/familia", title: "Familias", text: "Saldo, cuenta del día, facturas y controles", icon: Users },
  { href: "/cafe/caja", title: "Caja", text: "Identificar al alumno, cobrar y facturar", icon: ScanLine },
  { href: "/cafe/admin", title: "Administración", text: "Facturas, inventario, cierre de caja y seguridad", icon: LayoutDashboard },
];

/** Entrada de la demo: elige qué vista abrir. */
export default function CafeHome() {
  requireModule("cafeteria");
  return (
    <main className="pattern-dark grid min-h-dvh place-items-center bg-night-900 px-4 py-10 text-white">
      <div className="w-full max-w-3xl text-center">
        <LogoCircle className="mx-auto size-20" />
        <h1 className="mt-5 text-5xl text-white">
          Cafetería <span className="text-accent-400 italic">Curie</span>
        </h1>
        <p className="mt-3 text-lg text-primary-100">Prepago o cuenta del día, facturación con controles de cumplimiento y caja sin carné.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {views.map((v) => (
            <Link key={v.href} href={v.href} className="rounded-3xl bg-white/8 p-5 text-left ring-1 ring-white/15 transition-colors hover:bg-white/14">
              <v.icon className="size-7 text-accent-400" />
              <p className="mt-3 font-display text-xl font-semibold text-white">{v.title}</p>
              <p className="mt-1 text-sm text-primary-100">{v.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

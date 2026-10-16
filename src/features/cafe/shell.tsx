"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  Home,
  LayoutDashboard,
  Package,
  Receipt,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { LogoCircle } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string; icon: LucideIcon; badge?: number };

const navs: Record<"familia" | "admin", { user: { name: string; label: string }; items: Item[] }> = {
  familia: {
    user: { name: "Andrea Solís", label: "Mamá de Valeria y Diego" },
    items: [
      { href: "/cafe/familia", label: "Inicio", icon: Home },
      { href: "/cafe/familia/recargar", label: "Recargar", icon: Wallet },
      { href: "/cafe/familia/menu", label: "Menú", icon: UtensilsCrossed },
      { href: "/cafe/familia/facturas", label: "Facturas", icon: Receipt },
      { href: "/cafe/familia/hijos/diego", label: "Controles", icon: SlidersHorizontal },
    ],
  },
  admin: {
    user: { name: "Lic. Rosa Méndez", label: "Supervisora de cafetería" },
    items: [
      { href: "/cafe/admin", label: "Panel", icon: LayoutDashboard },
      { href: "/cafe/admin/facturas", label: "Facturas", icon: Receipt, badge: 1 },
      { href: "/cafe/admin/cierre", label: "Cierre de caja", icon: Calculator },
      { href: "/cafe/admin/inventario", label: "Inventario", icon: Package, badge: 2 },
      { href: "/cafe/admin/productos", label: "Productos", icon: UtensilsCrossed },
      { href: "/cafe/admin/seguridad", label: "Seguridad", icon: ShieldCheck },
      { href: "/cafe/caja", label: "Abrir la caja", icon: ScanLine },
    ],
  },
};

function activeHref(pathname: string, items: Item[]) {
  return items
    .map((i) => i.href)
    .filter((h) => pathname === h || pathname.startsWith(h + "/"))
    .sort((a, b) => b.length - a.length)[0];
}

/** Marco de la plataforma de cafetería: barra lateral en PC y barra inferior en celular. */
export function CafeShell({ variant, children }: { variant: "familia" | "admin"; children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, items } = navs[variant];
  const current = activeHref(pathname, items);
  return (
    <div className="min-h-dvh">
      <aside className="pattern-dark fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-sidebar text-white lg:flex">
        <Link href={items[0]!.href} className="flex items-center gap-3 px-6 pt-6 pb-6">
          <LogoCircle className="size-12" />
          <div>
            <p className="font-display text-xl leading-none font-semibold text-white">Cafetería</p>
            <p className="font-display text-lg leading-tight text-accent-400 italic">Curie</p>
          </div>
        </Link>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-4">
          {items.map((item) => {
            const Icon = item.icon;
            const active = item.href === current;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-2xl px-3 text-[15px] font-semibold transition-colors",
                  active ? "bg-accent-400 text-primary-900" : "text-primary-100 hover:bg-white/8 hover:text-white",
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge ? (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent-400 px-1.5 text-[11px] font-bold text-primary-900">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="m-4 flex items-center gap-3 rounded-2xl bg-white/8 p-3">
          <Avatar name={user.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{user.name}</p>
            <p className="truncate text-xs text-primary-200">{user.label}</p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-primary-100/70 bg-surface/90 backdrop-blur lg:hidden">
          <div className="flex h-16 items-center gap-2.5 px-4">
            <LogoCircle className="size-10" />
            <div className="min-w-0 flex-1 leading-none">
              <p className="font-display text-[17px] font-semibold text-primary-900">
                Cafetería <span className="text-primary-600 italic">Curie</span>
              </p>
              <p className="mt-0.5 truncate text-[11px] font-bold text-primary-500">{user.label}</p>
            </div>
            <Avatar name={user.name} size="sm" />
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 pt-5 pb-28 lg:px-8 lg:pt-8 lg:pb-12">{children}</main>
      </div>

      <nav className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-primary-100 bg-white/95 backdrop-blur lg:hidden">
        <ul className="mx-auto grid max-w-md grid-cols-5 px-2 pt-1.5">
          {items.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = item.href === current;
            return (
              <li key={item.href}>
                <Link href={item.href} className="flex flex-col items-center gap-0.5 py-1 text-[11px] font-bold">
                  <span
                    className={cn(
                      "grid h-8 w-14 place-items-center rounded-full transition-colors",
                      active ? "bg-accent-400 text-primary-900" : "text-primary-400",
                    )}
                  >
                    <Icon className="size-[22px]" strokeWidth={active ? 2.4 : 2} />
                  </span>
                  <span className={cn("truncate", active ? "text-primary-900" : "text-primary-400")}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

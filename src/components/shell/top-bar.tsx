import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { LogoCircle } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { users, type Role } from "@/mocks";

const homes: Record<Role, string> = {
  padre: "/padres",
  maestro: "/maestro",
  admin: "/admin",
  porteria: "/porteria",
};

export function TopBar({ role }: { role: Role }) {
  const user = users[role];
  return (
    <header className="sticky top-0 z-20 border-b border-navy-100/70 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 lg:h-18 lg:px-8">
        <Link href={homes[role]} className="flex items-center gap-2.5 lg:hidden">
          <LogoCircle className="size-10" />
          <div className="leading-none">
            <p className="font-display text-[17px] font-semibold text-navy-900">
              Beehive <span className="text-honey-600">Academy</span>
            </p>
            <p className="mt-0.5 text-[11px] font-bold text-navy-500">{user.roleLabel}</p>
          </div>
        </Link>
        <div className="hidden max-w-md flex-1 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-navy-400 shadow-soft ring-1 ring-navy-100 lg:flex">
          <Search className="size-4" />
          <span className="text-sm">Buscar alumnos, tareas, comunicados…</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            className="relative grid size-11 place-items-center rounded-full bg-white text-navy-800 shadow-soft ring-1 ring-navy-100"
            aria-label="Notificaciones"
          >
            <Bell className="size-5" />
            <span className="absolute top-2 right-2.5 size-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          <div className="hidden items-center gap-3 lg:flex">
            <Avatar name={user.name} size="md" />
            <div className="leading-tight">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-xs text-navy-500">{user.roleLabel}</p>
            </div>
          </div>
          <Avatar name={user.name} size="md" className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}

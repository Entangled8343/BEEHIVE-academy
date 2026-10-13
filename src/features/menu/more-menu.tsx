import Link from "next/link";
import { LogOut, Settings, User, type LucideIcon } from "lucide-react";
import { Mascot } from "@/components/brand/mascot";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { IconTile, ListRow } from "@/components/ui/tiles";
import { hasModule, type ModuleKey } from "@/schools";

export type MoreItem = { href: string; label: string; icon: LucideIcon; cls: string; module?: ModuleKey };

/** Menú "Más" del celular: todos los módulos activos del colegio para el rol. */
export function MoreMenu({
  user,
  items,
  kid = false,
}: {
  user: { name: string; email: string };
  items: MoreItem[];
  kid?: boolean;
}) {
  const visible = items.filter((m) => !m.module || hasModule(m.module));
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Más opciones" />
      <Card className="mb-5 flex items-center gap-4 p-4">
        <Avatar name={user.name} size="lg" kid={kid} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-semibold">{user.name}</p>
          <p className="truncate text-sm font-semibold text-primary-600">{user.email}</p>
        </div>
        <Mascot className="size-10" />
      </Card>
      <div className="grid grid-cols-3 gap-3">
        {visible.map((m) => (
          <Link
            key={m.label}
            href={m.href}
            className="flex flex-col items-center gap-2 rounded-3xl bg-white px-2 py-4 text-center shadow-soft ring-1 ring-primary-100/70"
          >
            <IconTile className={m.cls} size="lg">
              <m.icon />
            </IconTile>
            <span className="text-[13px] leading-tight font-bold">{m.label}</span>
          </Link>
        ))}
      </div>
      <Card className="mt-5 divide-y divide-primary-100">
        <ListRow href="#" icon={<IconTile size="sm"><User /></IconTile>} title="Mi perfil y contraseña" />
        <ListRow href="#" icon={<IconTile size="sm"><Settings /></IconTile>} title="Notificaciones" subtitle="Push, correo y horas de silencio" />
        <ListRow href="/ingresar" icon={<IconTile size="sm" className="bg-rose-50 text-rose-600"><LogOut /></IconTile>} title="Cerrar sesión" />
      </Card>
    </div>
  );
}

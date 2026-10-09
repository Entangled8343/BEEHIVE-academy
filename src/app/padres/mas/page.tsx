import Link from "next/link";
import {
  Award,
  CalendarDays,
  FileSignature,
  GraduationCap,
  Images,
  LogOut,
  Megaphone,
  Settings,
  Smile,
  Sparkles,
  User,
  UserX,
} from "lucide-react";
import { Bee } from "@/components/brand/bee";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { IconTile, ListRow } from "@/components/ui/tiles";
import { users } from "@/mocks";

export const metadata = { title: "Más" };

const modules = [
  { href: "/padres/calificaciones", label: "Calificaciones", icon: GraduationCap, cls: "bg-sky-100 text-sky-700" },
  { href: "/padres/agenda", label: "Agenda diaria", icon: Smile, cls: "bg-honey-200 text-honey-700" },
  { href: "/padres/hijos/mateo", label: "Insignias", icon: Award, cls: "bg-violet-100 text-violet-700" },
  { href: "/padres/comunicados", label: "Comunicados", icon: Megaphone, cls: "bg-rose-100 text-rose-600" },
  { href: "/padres/calendario", label: "Calendario", icon: CalendarDays, cls: "bg-emerald-100 text-emerald-700" },
  { href: "/padres/galeria", label: "Galería", icon: Images, cls: "bg-pink-100 text-pink-700" },
  { href: "/padres/autorizaciones", label: "Permisos", icon: FileSignature, cls: "bg-orange-100 text-orange-700" },
  { href: "/padres/ausencias", label: "Ausencias", icon: UserX, cls: "bg-slate-100 text-slate-700" },
  { href: "/padres/tareas", label: "Extracurricular", icon: Sparkles, cls: "bg-lime-100 text-lime-800" },
];

export default function MorePage() {
  const u = users.padre;
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Más opciones" />
      <Card className="mb-5 flex items-center gap-4 p-4">
        <Avatar name={u.name} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-semibold">{u.name}</p>
          <p className="truncate text-sm font-semibold text-navy-600">{u.email}</p>
        </div>
        <Bee className="size-10" />
      </Card>
      <div className="grid grid-cols-3 gap-3">
        {modules.map((m) => (
          <Link
            key={m.label}
            href={m.href}
            className="flex flex-col items-center gap-2 rounded-3xl bg-white px-2 py-4 text-center shadow-soft ring-1 ring-navy-100/70"
          >
            <IconTile className={m.cls} size="lg">
              <m.icon />
            </IconTile>
            <span className="text-[13px] leading-tight font-bold">{m.label}</span>
          </Link>
        ))}
      </div>
      <Card className="mt-5 divide-y divide-navy-100">
        <ListRow href="/padres/mas" icon={<IconTile size="sm"><User /></IconTile>} title="Mi perfil y contraseña" />
        <ListRow href="/padres/mas" icon={<IconTile size="sm"><Settings /></IconTile>} title="Notificaciones" subtitle="Push, correo y horas de silencio" />
        <ListRow href="/ingresar" icon={<IconTile size="sm" className="bg-rose-50 text-rose-600"><LogOut /></IconTile>} title="Cerrar sesión" />
      </Card>
    </div>
  );
}

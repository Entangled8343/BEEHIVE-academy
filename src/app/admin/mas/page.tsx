import { BarChart3, CalendarDays, ClipboardList, GraduationCap, Images, Settings, Table2, Users, Wallet } from "lucide-react";
import { MoreMenu, type MoreItem } from "@/features/menu/more-menu";
import { users } from "@/mocks";

export const metadata = { title: "Más" };

const items: MoreItem[] = [
  { href: "/admin/estudiantes", label: "Estudiantes", icon: Users, cls: "bg-primary-100 text-primary-700" },
  { href: "/admin/personal", label: "Personal docente", icon: GraduationCap, cls: "bg-violet-100 text-violet-700" },
  { href: "/admin/calificaciones", label: "Calificaciones", icon: BarChart3, cls: "bg-sky-100 text-sky-700" },
  { href: "/admin/asistencia", label: "Asistencia", icon: ClipboardList, cls: "bg-emerald-100 text-emerald-700" },
  { href: "/admin/horarios", label: "Horarios", icon: Table2, cls: "bg-indigo-100 text-indigo-700", module: "horario" },
  { href: "/admin/cuentas", label: "Cobros y pagos", icon: Wallet, cls: "bg-accent-200 text-accent-700", module: "estadoCuenta" },
  { href: "/admin/calendario", label: "Calendario", icon: CalendarDays, cls: "bg-pink-100 text-pink-700" },
  { href: "/admin/galeria", label: "Galería", icon: Images, cls: "bg-orange-100 text-orange-700", module: "galeria" },
  { href: "/admin/ajustes", label: "Ajustes", icon: Settings, cls: "bg-slate-100 text-slate-700" },
];

export default function AdminMore() {
  return <MoreMenu user={users.admin} items={items} />;
}

import {
  Award,
  CalendarDays,
  Car,
  FileSignature,
  GraduationCap,
  Images,
  Megaphone,
  Smile,
  Sparkles,
  Table2,
  UserX,
  Wallet,
} from "lucide-react";
import { MoreMenu, type MoreItem } from "@/features/menu/more-menu";
import { focusChildId, users } from "@/mocks";
import { schoolConfig } from "@/schools";

export const metadata = { title: "Más" };

const items: MoreItem[] = [
  { href: "/padres/calificaciones", label: "Calificaciones", icon: GraduationCap, cls: "bg-sky-100 text-sky-700" },
  { href: "/padres/horario", label: "Horario", icon: Table2, cls: "bg-indigo-100 text-indigo-700", module: "horario" },
  { href: "/padres/agenda", label: "Agenda diaria", icon: Smile, cls: "bg-accent-200 text-accent-700", module: "agendaDiaria" },
  { href: `/padres/hijos/${focusChildId}`, label: schoolConfig.copy.badgesShort, icon: Award, cls: "bg-violet-100 text-violet-700", module: "insignias" },
  { href: "/padres/retiro", label: "¿Quién recoge?", icon: Car, cls: "bg-accent-200 text-accent-700", module: "retiro" },
  { href: "/padres/comunicados", label: "Comunicados", icon: Megaphone, cls: "bg-rose-100 text-rose-600" },
  { href: "/padres/calendario", label: "Calendario", icon: CalendarDays, cls: "bg-emerald-100 text-emerald-700" },
  { href: "/padres/galeria", label: "Galería", icon: Images, cls: "bg-pink-100 text-pink-700", module: "galeria" },
  { href: "/padres/autorizaciones", label: "Permisos", icon: FileSignature, cls: "bg-orange-100 text-orange-700", module: "permisos" },
  { href: "/padres/ausencias", label: "Ausencias", icon: UserX, cls: "bg-slate-100 text-slate-700" },
  { href: "/padres/estado-cuenta", label: "Estado de cuenta", icon: Wallet, cls: "bg-emerald-100 text-emerald-700", module: "estadoCuenta" },
  { href: "/padres/tareas", label: "Extracurricular", icon: Sparkles, cls: "bg-lime-100 text-lime-800", module: "extracurricular" },
];

export default function MorePage() {
  return <MoreMenu user={users.padre} items={items} />;
}

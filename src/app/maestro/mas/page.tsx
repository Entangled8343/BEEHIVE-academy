import { Award, BookOpen, CalendarHeart, GraduationCap, Images, Megaphone, Smile, Sparkles, Table2 } from "lucide-react";
import { MoreMenu, type MoreItem } from "@/features/menu/more-menu";
import { users } from "@/mocks";
import { schoolConfig } from "@/schools";

export const metadata = { title: "Más" };

const items: MoreItem[] = [
  { href: "/maestro/calificaciones", label: "Libro de notas", icon: GraduationCap, cls: "bg-sky-100 text-sky-700" },
  { href: "/maestro/temario", label: "Temario", icon: BookOpen, cls: "bg-violet-100 text-violet-700" },
  { href: "/maestro/horario", label: "Mi horario", icon: Table2, cls: "bg-indigo-100 text-indigo-700", module: "horario" },
  { href: "/maestro/agenda", label: "Agenda diaria", icon: Smile, cls: "bg-accent-200 text-accent-700", module: "agendaDiaria" },
  { href: "/maestro/actividades", label: "Actividades", icon: CalendarHeart, cls: "bg-pink-100 text-pink-700" },
  { href: "/maestro/insignias", label: schoolConfig.copy.badgesShort, icon: Award, cls: "bg-emerald-100 text-emerald-700", module: "insignias" },
  { href: "/maestro/extracurricular", label: "Extracurricular", icon: Sparkles, cls: "bg-lime-100 text-lime-800", module: "extracurricular" },
  { href: "/maestro/comunicados", label: "Comunicados", icon: Megaphone, cls: "bg-rose-100 text-rose-600" },
  { href: "/maestro/galeria", label: "Galería", icon: Images, cls: "bg-orange-100 text-orange-700", module: "galeria" },
];

export default function TeacherMore() {
  return <MoreMenu user={users.maestro} items={items} />;
}

import { Atom, CalendarClock, GraduationCap, NotebookPen, Sparkles, Table2 } from "lucide-react";
import { MoreMenu, type MoreItem } from "@/features/menu/more-menu";
import { users } from "@/mocks";

export const metadata = { title: "Más" };

const items: MoreItem[] = [
  { href: "/alumno/horario", label: "Horario", icon: Table2, cls: "bg-indigo-100 text-indigo-700", module: "horario" },
  { href: "/alumno/tareas", label: "Tareas", icon: NotebookPen, cls: "bg-orange-100 text-orange-700" },
  { href: "/alumno/calificaciones", label: "Calificaciones", icon: GraduationCap, cls: "bg-sky-100 text-sky-700" },
  { href: "/alumno/examenes", label: "Exámenes", icon: CalendarClock, cls: "bg-violet-100 text-violet-700" },
  { href: "/alumno/clubes", label: "Clubes", icon: Sparkles, cls: "bg-accent-200 text-accent-700", module: "clubes" },
  { href: "/alumno/insignias", label: "Elementos", icon: Atom, cls: "bg-emerald-100 text-emerald-700", module: "insignias" },
];

export default function StudentMore() {
  return <MoreMenu user={users.alumno} items={items} kid />;
}

import {
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  CalendarHeart,
  Car,
  ClipboardCheck,
  ClipboardList,
  FileSignature,
  GraduationCap,
  Home,
  Images,
  LayoutDashboard,
  Megaphone,
  MessageCircle,
  MoreHorizontal,
  NotebookPen,
  ScanLine,
  Settings,
  Smile,
  Sparkles,
  UserPlus,
  Users,
  UserX,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/mocks";

export type NavItem = { href: string; label: string; icon: LucideIcon; badge?: number };

export const sidebarNav: Record<Role, { title?: string; items: NavItem[] }[]> = {
  padre: [
    {
      items: [
        { href: "/padres", label: "Inicio", icon: Home },
        { href: "/padres/tareas", label: "Tareas", icon: NotebookPen, badge: 4 },
        { href: "/padres/calificaciones", label: "Calificaciones", icon: GraduationCap },
        { href: "/padres/agenda", label: "Agenda diaria", icon: Smile },
        { href: "/padres/hijos/mateo", label: "Insignias", icon: Award },
      ],
    },
    {
      title: "Día a día",
      items: [
        { href: "/padres/retiro", label: "¿Quién recoge?", icon: Car },
        { href: "/padres/ausencias", label: "Reportar ausencia", icon: UserX },
        { href: "/padres/autorizaciones", label: "Permisos", icon: FileSignature, badge: 1 },
        { href: "/padres/mensajes", label: "Mensajes", icon: MessageCircle, badge: 2 },
      ],
    },
    {
      title: "Colegio",
      items: [
        { href: "/padres/comunicados", label: "Comunicados", icon: Megaphone, badge: 1 },
        { href: "/padres/calendario", label: "Calendario", icon: CalendarDays },
        { href: "/padres/galeria", label: "Galería", icon: Images },
      ],
    },
  ],
  maestro: [
    {
      items: [
        { href: "/maestro", label: "Hoy", icon: LayoutDashboard },
        { href: "/maestro/asistencia", label: "Asistencia", icon: ClipboardCheck },
        { href: "/maestro/tareas", label: "Tareas y entregas", icon: NotebookPen, badge: 7 },
        { href: "/maestro/calificaciones", label: "Libro de notas", icon: GraduationCap },
        { href: "/maestro/temario", label: "Temario", icon: BookOpen },
      ],
    },
    {
      title: "Mi sección",
      items: [
        { href: "/maestro/agenda", label: "Agenda diaria", icon: Smile },
        { href: "/maestro/actividades", label: "Actividades del mes", icon: CalendarHeart },
        { href: "/maestro/insignias", label: "Insignias", icon: Award },
        { href: "/maestro/extracurricular", label: "Extracurricular", icon: Sparkles },
        { href: "/maestro/mensajes", label: "Mensajes", icon: MessageCircle, badge: 3 },
      ],
    },
    {
      title: "Colegio",
      items: [
        { href: "/maestro/comunicados", label: "Comunicados", icon: Megaphone },
        { href: "/maestro/galeria", label: "Galería", icon: Images },
      ],
    },
  ],
  admin: [
    {
      items: [
        { href: "/admin", label: "Panel", icon: LayoutDashboard },
        { href: "/admin/inscripciones", label: "Inscripciones", icon: UserPlus, badge: 3 },
        { href: "/admin/estudiantes", label: "Estudiantes", icon: Users },
        { href: "/admin/personal", label: "Personal docente", icon: GraduationCap },
      ],
    },
    {
      title: "Académico",
      items: [
        { href: "/admin/calificaciones", label: "Calificaciones", icon: BarChart3 },
        { href: "/admin/asistencia", label: "Asistencia", icon: ClipboardList },
        { href: "/porteria", label: "Portería", icon: ScanLine },
      ],
    },
    {
      title: "Comunicación",
      items: [
        { href: "/admin/comunicados", label: "Comunicados", icon: Megaphone },
        { href: "/admin/calendario", label: "Calendario", icon: CalendarDays },
        { href: "/admin/galeria", label: "Galería", icon: Images },
        { href: "/admin/ajustes", label: "Ajustes", icon: Settings },
      ],
    },
  ],
  porteria: [{ items: [{ href: "/porteria", label: "Retiros de hoy", icon: ScanLine }] }],
};

export const bottomNav: Record<Role, NavItem[]> = {
  padre: [
    { href: "/padres", label: "Inicio", icon: Home },
    { href: "/padres/tareas", label: "Tareas", icon: NotebookPen, badge: 4 },
    { href: "/padres/retiro", label: "Retiro", icon: Car },
    { href: "/padres/mensajes", label: "Mensajes", icon: MessageCircle, badge: 2 },
    { href: "/padres/mas", label: "Más", icon: MoreHorizontal },
  ],
  maestro: [
    { href: "/maestro", label: "Hoy", icon: LayoutDashboard },
    { href: "/maestro/asistencia", label: "Asistencia", icon: ClipboardCheck },
    { href: "/maestro/tareas", label: "Tareas", icon: NotebookPen, badge: 7 },
    { href: "/maestro/mensajes", label: "Mensajes", icon: MessageCircle, badge: 3 },
    { href: "/maestro/mas", label: "Más", icon: MoreHorizontal },
  ],
  admin: [
    { href: "/admin", label: "Panel", icon: LayoutDashboard },
    { href: "/admin/inscripciones", label: "Inscripción", icon: UserPlus, badge: 3 },
    { href: "/admin/comunicados", label: "Avisos", icon: Megaphone },
    { href: "/porteria", label: "Portería", icon: ScanLine },
    { href: "/admin/mas", label: "Más", icon: MoreHorizontal },
  ],
  porteria: [],
};

/** Barra inferior: el inicio solo se marca en su ruta exacta (o el perfil del hijo);
 * las secciones que no tienen botón propio marcan "Más". */
export function bottomActive(pathname: string, items: NavItem[]) {
  const [home, ...rest] = items;
  if (!home) return undefined;
  const sections = rest.slice(0, -1);
  const hit = sections
    .filter((i) => pathname === i.href || pathname.startsWith(i.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0];
  if (hit) return hit.href;
  if (pathname === home.href || pathname.startsWith(home.href + "/hijos")) return home.href;
  return rest.at(-1)?.href;
}

export function isActive(pathname: string, href: string, all: string[]) {
  const matches = all.filter((h) => pathname === h || pathname.startsWith(h + "/"));
  const best = matches.sort((a, b) => b.length - a.length)[0];
  return best === href;
}

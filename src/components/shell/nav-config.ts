import {
  Atom,
  Award,
  BarChart3,
  BookOpen,
  CalendarClock,
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
  Table2,
  UserPlus,
  Users,
  UserX,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { hasModule, schoolConfig, type ModuleKey } from "@/schools";
import { focusChildId, type Role } from "@/mocks";

/** `key` es la clave de traducción en messages/*.json → nav.* */
export type NavItem = { href: string; key: string; icon: LucideIcon; badge?: number; module?: ModuleKey };
type NavGroup = { titleKey?: string; items: NavItem[] };

const sidebarAll: Record<Role, NavGroup[]> = {
  padre: [
    {
      items: [
        { href: "/padres", key: "inicio", icon: Home },
        { href: "/padres/tareas", key: "tareas", icon: NotebookPen, badge: 4 },
        { href: "/padres/calificaciones", key: "calificaciones", icon: GraduationCap },
        { href: "/padres/horario", key: "horario", icon: Table2, module: "horario" },
        { href: "/padres/agenda", key: "agenda", icon: Smile, module: "agendaDiaria" },
        { href: `/padres/hijos/${focusChildId}`, key: "insignias", icon: Award, module: "insignias" },
      ],
    },
    {
      titleKey: "grupoDia",
      items: [
        { href: "/padres/retiro", key: "retiro", icon: Car, module: "retiro" },
        { href: "/padres/ausencias", key: "ausencias", icon: UserX },
        { href: "/padres/autorizaciones", key: "autorizaciones", icon: FileSignature, badge: 1, module: "permisos" },
        { href: "/padres/estado-cuenta", key: "estadoCuenta", icon: Wallet, badge: 1, module: "estadoCuenta" },
        { href: "/padres/cafeteria", key: "cafeteria", icon: UtensilsCrossed, module: "cafeteria" },
        { href: "/padres/mensajes", key: "mensajes", icon: MessageCircle, badge: 2, module: "mensajes" },
      ],
    },
    {
      titleKey: "grupoColegio",
      items: [
        { href: "/padres/comunicados", key: "comunicados", icon: Megaphone, badge: 1 },
        { href: "/padres/calendario", key: "calendario", icon: CalendarDays },
        { href: "/padres/galeria", key: "galeria", icon: Images, module: "galeria" },
      ],
    },
  ],
  alumno: [
    {
      items: [
        { href: "/alumno", key: "inicio", icon: Home },
        { href: "/alumno/horario", key: "horario", icon: Table2, module: "horario" },
        { href: "/alumno/tareas", key: "tareas", icon: NotebookPen, badge: 4 },
        { href: "/alumno/calificaciones", key: "calificaciones", icon: GraduationCap },
        { href: "/alumno/examenes", key: "examenes", icon: CalendarClock },
      ],
    },
    {
      titleKey: "grupoAlumno",
      items: [
        { href: "/alumno/clubes", key: "clubes", icon: Sparkles, module: "clubes" },
        { href: "/alumno/insignias", key: "insignias", icon: Atom, module: "insignias" },
      ],
    },
  ],
  maestro: [
    {
      items: [
        { href: "/maestro", key: "hoy", icon: LayoutDashboard },
        { href: "/maestro/asistencia", key: "asistencia", icon: ClipboardCheck },
        { href: "/maestro/tareas", key: "tareasEntregas", icon: NotebookPen, badge: 7 },
        { href: "/maestro/calificaciones", key: "libroNotas", icon: GraduationCap },
        { href: "/maestro/temario", key: "temario", icon: BookOpen },
        { href: "/maestro/horario", key: "horario", icon: Table2, module: "horario" },
      ],
    },
    {
      titleKey: "grupoSeccion",
      items: [
        { href: "/maestro/agenda", key: "agenda", icon: Smile, module: "agendaDiaria" },
        { href: "/maestro/actividades", key: "actividades", icon: CalendarHeart },
        { href: "/maestro/insignias", key: "insignias", icon: Award, module: "insignias" },
        { href: "/maestro/extracurricular", key: "extracurricular", icon: Sparkles, module: "extracurricular" },
        { href: "/maestro/mensajes", key: "mensajes", icon: MessageCircle, badge: 3, module: "mensajes" },
      ],
    },
    {
      titleKey: "grupoColegio",
      items: [
        { href: "/maestro/comunicados", key: "comunicados", icon: Megaphone },
        { href: "/maestro/galeria", key: "galeria", icon: Images, module: "galeria" },
      ],
    },
  ],
  admin: [
    {
      items: [
        { href: "/admin", key: "panel", icon: LayoutDashboard },
        { href: "/admin/inscripciones", key: "inscripciones", icon: UserPlus, badge: 3, module: "preinscripcion" },
        { href: "/admin/estudiantes", key: "estudiantes", icon: Users },
        { href: "/admin/personal", key: "personal", icon: GraduationCap },
      ],
    },
    {
      titleKey: "grupoAcademico",
      items: [
        { href: "/admin/calificaciones", key: "calificaciones", icon: BarChart3 },
        { href: "/admin/asistencia", key: "asistencia", icon: ClipboardList },
        { href: "/admin/horarios", key: "horarios", icon: Table2, module: "horario" },
        { href: "/porteria", key: "porteria", icon: ScanLine, module: "retiro" },
      ],
    },
    {
      titleKey: "grupoAdmin",
      items: [
        { href: "/admin/cuentas", key: "cuentas", icon: Wallet, module: "estadoCuenta" },
        { href: "/cafeteria", key: "cafeteria", icon: UtensilsCrossed, module: "cafeteria" },
        { href: "/admin/comunicados", key: "comunicados", icon: Megaphone },
        { href: "/admin/calendario", key: "calendario", icon: CalendarDays },
        { href: "/admin/galeria", key: "galeria", icon: Images, module: "galeria" },
        { href: "/admin/ajustes", key: "ajustes", icon: Settings },
      ],
    },
  ],
  porteria: [{ items: [{ href: "/porteria", key: "retiros", icon: ScanLine }] }],
};

const bottomAll: Record<Role, NavItem[]> = {
  padre: [
    { href: "/padres", key: "inicio", icon: Home },
    { href: "/padres/tareas", key: "tareas", icon: NotebookPen, badge: 4 },
    hasModule("estadoCuenta") && schoolConfig.parentQuickTab === "pagos"
      ? { href: "/padres/estado-cuenta", key: "pagos", icon: Wallet, badge: 1 }
      : { href: "/padres/retiro", key: "retiroCorto", icon: Car },
    { href: "/padres/mensajes", key: "mensajes", icon: MessageCircle, badge: 2 },
    { href: "/padres/mas", key: "mas", icon: MoreHorizontal },
  ],
  alumno: [
    { href: "/alumno", key: "inicio", icon: Home },
    { href: "/alumno/horario", key: "horario", icon: Table2 },
    { href: "/alumno/tareas", key: "tareas", icon: NotebookPen, badge: 4 },
    { href: "/alumno/calificaciones", key: "notas", icon: GraduationCap },
    { href: "/alumno/mas", key: "mas", icon: MoreHorizontal },
  ],
  maestro: [
    { href: "/maestro", key: "hoy", icon: LayoutDashboard },
    { href: "/maestro/asistencia", key: "asistencia", icon: ClipboardCheck },
    { href: "/maestro/tareas", key: "tareas", icon: NotebookPen, badge: 7 },
    { href: "/maestro/mensajes", key: "mensajes", icon: MessageCircle, badge: 3 },
    { href: "/maestro/mas", key: "mas", icon: MoreHorizontal },
  ],
  admin: [
    { href: "/admin", key: "panel", icon: LayoutDashboard },
    { href: "/admin/inscripciones", key: "inscripcion", icon: UserPlus, badge: 3 },
    { href: "/admin/comunicados", key: "avisos", icon: Megaphone },
    { href: "/porteria", key: "porteria", icon: ScanLine },
    { href: "/admin/mas", key: "mas", icon: MoreHorizontal },
  ],
  porteria: [],
};

const enabled = (i: NavItem) => !i.module || hasModule(i.module);
const badgesKey = { element: "elementos", circle: "logros", hex: "insignias" }[schoolConfig.brand.badgeStyle];
const localize = (i: NavItem): NavItem => (i.key === "insignias" ? { ...i, key: badgesKey } : i);

export const sidebarNav: Record<Role, NavGroup[]> = Object.fromEntries(
  Object.entries(sidebarAll).map(([role, groups]) => [
    role,
    groups.map((g) => ({ ...g, items: g.items.filter(enabled).map(localize) })).filter((g) => g.items.length),
  ]),
) as Record<Role, NavGroup[]>;

export const bottomNav: Record<Role, NavItem[]> = Object.fromEntries(
  Object.entries(bottomAll).map(([role, items]) => [role, items.filter(enabled).map(localize)]),
) as Record<Role, NavItem[]>;

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

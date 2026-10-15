export type SchoolId = "beehive" | "curie";
export type Locale = "es" | "en";

/** Módulos que se pueden activar o desactivar por colegio. */
export type ModuleKey =
  | "sitioPublico"
  | "preinscripcion"
  | "agendaDiaria"
  | "retiro"
  | "insignias"
  | "mensajes"
  | "permisos"
  | "galeria"
  | "extracurricular"
  | "portalAlumno"
  | "horario"
  | "clubes"
  | "estadoCuenta"
  | "cafeteria";

export type SchoolConfig = {
  id: SchoolId;
  /** Nombre completo, p. ej. "Escuela Universal Pierre y Marie Curie". */
  name: string;
  shortName: string;
  /** Dos líneas para el logotipo tipográfico. */
  nameLines: [string, string];
  tagline: string;
  levels: ("preescolar" | "primaria" | "secundaria")[];
  levelsLabel: string;
  locales: Locale[];
  /** Grado desde el cual los alumnos tienen usuario propio (null = solo familias). */
  studentLoginFromGrade: number | null;
  /** Alumnos y docentes pueden entrar con su cuenta de Microsoft 365 (Office 365) del colegio. */
  microsoftSignIn: boolean;
  modules: Record<ModuleKey, boolean>;
  brand: {
    logo: string;
    logoSize: [number, number];
    wordmark?: string;
    wordmarkSize?: [number, number];
    icon: string;
    appleIcon: string;
    themeColor: string;
    mascot: "bee" | "comet";
    kidAvatar: "hex" | "rounded";
    badgeStyle: "hex" | "element";
  };
  copy: {
    badgesTitle: string;
    badgesShort: string;
    badgesSubtitle: string;
    portalWelcome: string;
    portalSubtitle: string;
  };
};

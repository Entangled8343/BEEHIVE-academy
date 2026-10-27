export type SchoolId = "beehive" | "curie" | "montessori";
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
  /** Botón central de la barra inferior de las familias en el celular. */
  parentQuickTab: "pagos" | "retiro";
  modules: Record<ModuleKey, boolean>;
  brand: {
    logo: string;
    logoSize: [number, number];
    wordmark?: string;
    wordmarkSize?: [number, number];
    /** Logotipo completo en blanco para fondos oscuros. */
    wordmarkOnDark?: string;
    icon: string;
    appleIcon: string;
    themeColor: string;
    mascot: "bee" | "comet" | "globe";
    kidAvatar: "hex" | "rounded" | "circle";
    badgeStyle: "hex" | "element" | "circle";
  };
  copy: {
    badgesTitle: string;
    badgesShort: string;
    badgesSubtitle: string;
    portalWelcome: string;
    portalSubtitle: string;
    /** Textos de la pantalla de la docente para entregar insignias, si el colegio usa otras palabras. */
    award?: { title: string; subtitle: string; pick: string; button: string; automatic: string; recent: string };
  };
};

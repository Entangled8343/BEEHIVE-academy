import type { SchoolConfig } from "./types";

export const curie: SchoolConfig = {
  id: "curie",
  name: "Escuela Universal Pierre y Marie Curie",
  shortName: "Curie",
  nameLines: ["Escuela Universal", "Pierre y Marie Curie"],
  tagline: "Science · Art · Sports · Humanism",
  levels: ["primaria", "secundaria"],
  levelsLabel: "Primaria y Secundaria",
  locales: ["es", "en"],
  studentLoginFromGrade: 4,
  microsoftSignIn: true, // el colegio ya usa Teams y Office 365
  parentQuickTab: "pagos",
  modules: {
    sitioPublico: false, // ya tienen curie.edu.ni: el portal vive en un subdominio
    preinscripcion: true,
    agendaDiaria: false, // no tienen preescolar
    retiro: true,
    insignias: true,
    mensajes: true,
    permisos: true,
    galeria: true,
    extracurricular: true,
    portalAlumno: true,
    horario: true,
    clubes: true,
    estadoCuenta: true,
    cafeteria: true, // saldo prepago o cuenta del día; caja en tablet
  },
  brand: {
    logo: "/brand/curie/sello.png",
    logoSize: [776, 776],
    icon: "/brand/curie/icon-192.png",
    appleIcon: "/brand/curie/icon-180.png",
    themeColor: "#183F2B",
    mascot: "comet",
    kidAvatar: "rounded",
    badgeStyle: "element",
  },
  copy: {
    badgesShort: "Elementos",
    badgesTitle: "Elementos Curie",
    badgesSubtitle: "elementos descubiertos este año",
    portalWelcome: "Bienvenidos al Curie-verse",
    portalSubtitle: "Clases, tareas, notas, horario y clubes de alumnos, familias y docentes, en un solo lugar.",
  },
};

/**
 * Datos de ejemplo para el prototipo visual (Fase 0).
 * Todos los nombres son ficticios. En la Fase 1 estas funciones se reemplazan por la
 * capa de datos real (src/server/dal) manteniendo la misma forma.
 */

export const school = {
  name: "Beehive Academy",
  tagline: "Discover · Learn · Enjoy",
  city: "Masaya, Nicaragua",
  address: "Gasolinera Uno San Jerónimo 2c al este ½ al sur, Masaya",
  whatsapp: "+505 8739 9107",
  whatsappLink: "https://wa.me/50587399107",
  instagram: "@beehiveacademynic",
  today: "Viernes 9 de octubre",
  todayIso: "2026-10-09",
  year: 2026,
  currentPeriod: "IV Corte",
};

export type Role = "padre" | "maestro" | "admin" | "porteria";

export const users: Record<Role, { name: string; roleLabel: string; email: string }> = {
  padre: { name: "María José López", roleLabel: "Mamá de Sofía y Mateo", email: "mariajose@correo.com" },
  maestro: { name: "Miss Karla Gutiérrez", roleLabel: "Docente titular · 2° A", email: "karla@beehive.edu.ni" },
  admin: { name: "Lic. Patricia Morales", roleLabel: "Dirección", email: "direccion@beehive.edu.ni" },
  porteria: { name: "Don Julio Ramírez", roleLabel: "Portería", email: "porteria@beehive.edu.ni" },
};

export type Child = {
  id: string;
  name: string;
  shortName: string;
  level: "Preescolar" | "Primaria";
  grade: string;
  section: string;
  age: number;
  teacher: string;
  attendanceToday: "presente" | "ausente" | "tarde" | "pendiente";
  arrivedAt?: string;
  pendingHomework: number;
  attendanceRate: number;
  badges: number;
  allergies?: string;
};

export const children: Child[] = [
  {
    id: "sofia",
    name: "Sofía Martínez López",
    shortName: "Sofía",
    level: "Preescolar",
    grade: "Preescolar II",
    section: "A",
    age: 4,
    teacher: "Miss Andrea Rivas",
    attendanceToday: "presente",
    arrivedAt: "7:12 a. m.",
    pendingHomework: 1,
    attendanceRate: 97,
    badges: 6,
    allergies: "Alergia al maní",
  },
  {
    id: "mateo",
    name: "Mateo Martínez López",
    shortName: "Mateo",
    level: "Primaria",
    grade: "2° grado",
    section: "A",
    age: 7,
    teacher: "Miss Karla Gutiérrez",
    attendanceToday: "presente",
    arrivedAt: "7:05 a. m.",
    pendingHomework: 3,
    attendanceRate: 95,
    badges: 9,
  },
];

export const subjectColors: Record<string, string> = {
  "Lengua y Literatura": "bg-pink-100 text-pink-700",
  Matemática: "bg-sky-100 text-sky-800",
  "Ciencias Naturales": "bg-emerald-100 text-emerald-800",
  "Estudios Sociales": "bg-orange-100 text-orange-700",
  Inglés: "bg-violet-100 text-violet-700",
  "Educación Física": "bg-lime-100 text-lime-800",
  "Expresión Cultural y Artística": "bg-rose-100 text-rose-700",
  "Creciendo en Valores": "bg-honey-200 text-honey-700",
  Computación: "bg-slate-100 text-slate-700",
  "Preescolar II": "bg-honey-200 text-honey-700",
};

export type Homework = {
  id: string;
  childId: string;
  subject: string;
  title: string;
  description: string;
  due: string;
  dueRelative: string;
  status: "pendiente" | "entregada" | "calificada" | "devuelta" | "atrasada";
  score?: number;
  band?: string;
  feedback?: string;
  teacher: string;
  attachments?: number;
};

export const homework: Homework[] = [
  {
    id: "lectura-patito",
    childId: "mateo",
    subject: "Lengua y Literatura",
    title: "Lectura: El patito feo",
    description:
      "Leer el cuento en familia y escribir 5 oraciones sobre lo que más te gustó. Dibuja al patito al final de la página.",
    due: "Lunes 12 de octubre",
    dueRelative: "Vence el lunes",
    status: "pendiente",
    teacher: "Miss Karla Gutiérrez",
    attachments: 1,
  },
  {
    id: "sumas-llevando",
    childId: "mateo",
    subject: "Matemática",
    title: "Sumas llevando · pág. 34 y 35",
    description: "Resolver los ejercicios 1 al 12 del libro. Mostrar el procedimiento.",
    due: "Martes 13 de octubre",
    dueRelative: "Vence en 4 días",
    status: "pendiente",
    teacher: "Miss Karla Gutiérrez",
  },
  {
    id: "partes-planta",
    childId: "mateo",
    subject: "Ciencias Naturales",
    title: "Maqueta: partes de la planta",
    description: "Elaborar con material reciclado una planta señalando raíz, tallo, hojas, flor y fruto.",
    due: "Viernes 16 de octubre",
    dueRelative: "Vence en 1 semana",
    status: "pendiente",
    teacher: "Miss Karla Gutiérrez",
  },
  {
    id: "my-family",
    childId: "mateo",
    subject: "Inglés",
    title: "My family · vocabulary",
    description: "Draw your family and write the name of each member in English.",
    due: "Lunes 5 de octubre",
    dueRelative: "Entregada",
    status: "calificada",
    score: 95,
    band: "AA",
    feedback: "Excellent work, Mateo! Beautiful drawing. ⭐",
    teacher: "Teacher Daniel Obando",
  },
  {
    id: "mapa-masaya",
    childId: "mateo",
    subject: "Estudios Sociales",
    title: "Mapa de Masaya y sus municipios",
    description: "Colorear el mapa y ubicar los 9 municipios.",
    due: "Jueves 8 de octubre",
    dueRelative: "Entregada ayer",
    status: "entregada",
    teacher: "Miss Karla Gutiérrez",
  },
  {
    id: "vocales",
    childId: "sofia",
    subject: "Preescolar II",
    title: "Colorear las vocales A · E · I",
    description: "Colorear cada vocal con el color indicado y pegar papelitos de colores en la letra A.",
    due: "Lunes 12 de octubre",
    dueRelative: "Vence el lunes",
    status: "pendiente",
    teacher: "Miss Andrea Rivas",
  },
];

export type GradeRow = { subject: string; cortes: (number | null)[] };

export const mateoGrades: GradeRow[] = [
  { subject: "Lengua y Literatura", cortes: [92, 88, 94, null] },
  { subject: "Matemática", cortes: [85, 90, 87, null] },
  { subject: "Ciencias Naturales", cortes: [96, 93, 95, null] },
  { subject: "Estudios Sociales", cortes: [88, 84, 90, null] },
  { subject: "Inglés", cortes: [97, 95, 98, null] },
  { subject: "Educación Física", cortes: [100, 98, 100, null] },
  { subject: "Expresión Cultural y Artística", cortes: [95, 96, 94, null] },
  { subject: "Creciendo en Valores", cortes: [98, 97, 99, null] },
  { subject: "Computación", cortes: [78, 82, 85, null] },
];

export function band(score: number) {
  if (score >= 90) return { code: "AA", label: "Aprendizaje Avanzado", tone: "green" as const };
  if (score >= 76) return { code: "AS", label: "Aprendizaje Satisfactorio", tone: "blue" as const };
  if (score >= 60) return { code: "AF", label: "Aprendizaje Fundamental", tone: "orange" as const };
  return { code: "AI", label: "Aprendizaje Inicial", tone: "red" as const };
}

export const sofiaSkills = [
  { area: "Lenguaje y comunicación", skill: "Reconoce las vocales", level: "Logrado" },
  { area: "Lenguaje y comunicación", skill: "Expresa ideas con oraciones completas", level: "En proceso" },
  { area: "Pensamiento lógico", skill: "Cuenta objetos del 1 al 10", level: "Logrado" },
  { area: "Motricidad", skill: "Recorta siguiendo líneas rectas", level: "En proceso" },
  { area: "Socioafectivo", skill: "Comparte y espera su turno", level: "Logrado" },
  { area: "Inglés", skill: "Colors and numbers 1–10", level: "Logrado" },
];

export type BadgeDef = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: "clock" | "book" | "calc" | "heart" | "star" | "palette" | "trophy" | "leaf" | "lightbulb" | "flag" | "music" | "medal";
  earned: boolean;
  earnedOn?: string;
};

export const badges: BadgeDef[] = [
  { id: "puntual", name: "Abejita Puntual", description: "20 días seguidos llegando a tiempo", color: "bg-honey-400", icon: "clock", earned: true, earnedOn: "18 sep" },
  { id: "panal", name: "Panal Completo", description: "10 tareas entregadas a tiempo", color: "bg-sky-400", icon: "star", earned: true, earnedOn: "2 oct" },
  { id: "lector", name: "Néctar Lector", description: "Leyó 5 libros del rincón de lectura", color: "bg-pink-400", icon: "book", earned: true, earnedOn: "25 sep" },
  { id: "matematica", name: "Miel Matemática", description: "AA en Matemática en un corte", color: "bg-violet-400", icon: "calc", earned: true, earnedOn: "15 ago" },
  { id: "solidaria", name: "Abeja Solidaria", description: "Ayudó a un compañero en clase", color: "bg-rose-400", icon: "heart", earned: true, earnedOn: "11 sep" },
  { id: "ideas", name: "Polinizador de Ideas", description: "Proyecto destacado en la feria", color: "bg-amber-400", icon: "lightbulb", earned: true, earnedOn: "20 ago" },
  { id: "artista", name: "Abeja Artista", description: "3 actividades de arte extracurricular", color: "bg-emerald-400", icon: "palette", earned: true, earnedOn: "30 sep" },
  { id: "patria", name: "Abeja Patria", description: "Participó en el desfile patrio", color: "bg-navy-600", icon: "flag", earned: true, earnedOn: "14 sep" },
  { id: "deportista", name: "Abeja Veloz", description: "Participó en los juegos deportivos", color: "bg-lime-500", icon: "medal", earned: true, earnedOn: "28 ago" },
  { id: "naturaleza", name: "Abeja Verde", description: "Cuidó el huerto escolar un mes", color: "bg-green-500", icon: "leaf", earned: false },
  { id: "musical", name: "Abeja Musical", description: "Presentación en el acto cultural", color: "bg-fuchsia-400", icon: "music", earned: false },
  { id: "oro", name: "Abeja de Oro", description: "AA en todas las materias del corte", color: "bg-honey-500", icon: "trophy", earned: false },
];

export const announcements = [
  {
    id: "excursion-volcan",
    title: "Excursión al Parque Nacional Volcán Masaya",
    excerpt: "El martes 20 de octubre visitaremos el volcán con 2° y 3° grado. Firma el permiso antes del jueves 15.",
    date: "Hoy, 8:15 a. m.",
    from: "Dirección",
    audience: "2° y 3° grado",
    priority: "importante" as const,
    requiresAck: true,
    read: false,
  },
  {
    id: "reunion-padres",
    title: "Reunión de padres · entrega de notas III corte",
    excerpt: "Les esperamos el viernes 23 de octubre a las 5:00 p. m. en el salón de usos múltiples.",
    date: "Ayer",
    from: "Dirección",
    audience: "Todo el colegio",
    priority: "normal" as const,
    requiresAck: true,
    read: true,
  },
  {
    id: "feria-ciencias",
    title: "¡Feria Científica Beehive 2026! 🔬",
    excerpt: "El viernes 16 de octubre los alumnos presentarán sus proyectos. Familias bienvenidas de 9 a 11 a. m.",
    date: "Mar 6 oct",
    from: "Miss Karla Gutiérrez",
    audience: "2° A",
    priority: "normal" as const,
    requiresAck: false,
    read: true,
  },
  {
    id: "matricula-2027",
    title: "Matrícula 2027 abierta",
    excerpt: "Asegura el cupo de tus hijos para el próximo año con descuento por pronto pago hasta el 30 de noviembre.",
    date: "Lun 5 oct",
    from: "Dirección",
    audience: "Todo el colegio",
    priority: "normal" as const,
    requiresAck: false,
    read: true,
  },
];

export const events = [
  { day: 12, title: "Inicio semana de la lectura", kind: "actividad" },
  { day: 16, title: "Feria Científica", kind: "evento" },
  { day: 20, title: "Excursión Volcán Masaya (2° y 3°)", kind: "excursion" },
  { day: 23, title: "Reunión de padres", kind: "reunion" },
  { day: 28, title: "Día de la familia Beehive", kind: "evento" },
  { day: 30, title: "Entrega de proyectos de Ciencias", kind: "entrega" },
] as const;

export const monthlyActivities = [
  { date: "Lun 12", title: "Semana de la lectura", description: "Cada día un cuento leído por un papá o mamá invitado.", category: "Lectura", color: "bg-pink-100 text-pink-700" },
  { date: "Vie 16", title: "Feria Científica", description: "Presentación de proyectos: el ciclo del agua y las plantas.", category: "Ciencias", color: "bg-emerald-100 text-emerald-800" },
  { date: "Mar 20", title: "Excursión al Volcán Masaya", description: "Salida 7:30 a. m., regreso 12:00 m. Llevar gorra, agua y merienda.", category: "Excursión", color: "bg-orange-100 text-orange-700" },
  { date: "Mié 28", title: "Día de la familia Beehive", description: "Juegos tradicionales nicaragüenses y comida típica.", category: "Familia", color: "bg-honey-200 text-honey-700" },
];

export const dailyAgenda = {
  childId: "sofia",
  date: "Hoy, viernes 9 de octubre",
  mood: "Feliz",
  meals: [
    { label: "Desayuno", amount: "Todo", value: 100 },
    { label: "Merienda", amount: "La mitad", value: 50 },
    { label: "Almuerzo", amount: "Casi todo", value: 80 },
  ],
  nap: "45 minutos",
  bathroom: "2 veces",
  activities: "Pintamos con esponjas y aprendimos la letra M de mamá. ¡Sofía cantó la canción de los colores en inglés!",
  needs: ["Toallitas húmedas", "Muda de ropa extra"],
  teacherNote: "Sofía estuvo muy participativa hoy. Ayudó a recoger los juguetes. 💛",
  teacher: "Miss Andrea Rivas",
  publishedAt: "12:10 p. m.",
};

export const pickup = {
  today: {
    person: "Ana López",
    relationship: "Abuela",
    time: "12:30 p. m.",
    children: ["Sofía", "Mateo"],
    code: "482 913",
    status: "programado" as const,
  },
  authorized: [
    { name: "Roberto Martínez", relationship: "Papá", cedula: "401-150384-0002K", phone: "8845-1290", permanent: true },
    { name: "Ana López", relationship: "Abuela", cedula: "401-220861-0001B", phone: "8712-3344", permanent: true },
    { name: "Julio Ramírez", relationship: "Transporte escolar", cedula: "001-030379-0040M", phone: "8631-9988", permanent: true },
  ],
};

export const conversation = {
  with: "Miss Karla Gutiérrez",
  about: "Mateo · 2° A",
  officeHours: "Responde de 7:00 a. m. a 3:00 p. m.",
  messages: [
    { from: "maestra", text: "¡Buenos días, señora María José! Le cuento que Mateo leyó en voz alta frente a la clase hoy y lo hizo muy bien. 👏", time: "8:42 a. m." },
    { from: "padre", text: "¡Qué alegría, Miss! En casa estamos practicando todas las noches con los cuentos que nos envió.", time: "9:05 a. m." },
    { from: "maestra", text: "Se nota mucho 😊 Para la tarea del lunes pueden usar el libro de la biblioteca o el PDF adjunto.", time: "9:07 a. m.", attachment: "El-patito-feo.pdf" },
    { from: "padre", text: "Perfecto, muchas gracias. ¿Mateo necesita llevar algo para la feria científica?", time: "9:20 a. m." },
    { from: "maestra", text: "Solo su maqueta y una cartulina con el título del proyecto. ¡Lo demás lo tenemos en el aula!", time: "9:24 a. m." },
  ],
};

export const permissionSlip = {
  id: "excursion-volcan",
  title: "Excursión al Parque Nacional Volcán Masaya",
  child: "Mateo Martínez López · 2° A",
  date: "Martes 20 de octubre de 2026",
  schedule: "Salida 7:30 a. m. · Regreso 12:00 m.",
  place: "Parque Nacional Volcán Masaya",
  transport: "Bus contratado por el colegio, con 4 docentes acompañantes",
  bring: ["Gorra y bloqueador", "Botella de agua", "Merienda", "Uniforme deportivo"],
  due: "Firmar antes del jueves 15 de octubre",
};

export const albums = [
  { id: "desfile", title: "Desfile Patrio 2026", date: "14 sep", count: 48, scene: "desfile" as const, visibility: "Familias" },
  { id: "feria", title: "Feria de Ciencias", date: "21 ago", count: 32, scene: "ciencia" as const, visibility: "Familias" },
  { id: "lectura", title: "Semana de la lectura", date: "5 ago", count: 26, scene: "lectura" as const, visibility: "2° A" },
  { id: "deporte", title: "Juegos deportivos", date: "28 jul", count: 54, scene: "deporte" as const, visibility: "Familias" },
  { id: "arte", title: "Taller de arte", date: "10 jul", count: 18, scene: "arte" as const, visibility: "Preescolar" },
  { id: "huerto", title: "Nuestro huerto", date: "1 jul", count: 21, scene: "naturaleza" as const, visibility: "Público" },
];

export const roster2A = [
  "Valentina Aguilar", "Santiago Baltodano", "Camila Castillo", "Diego Chamorro", "Isabella Cruz",
  "Sebastián Dávila", "Luciana Espinoza", "Matías Flores", "Regina Gaitán", "Emiliano García",
  "Victoria Hernández", "Thiago Jarquín", "Ximena Lacayo", "Mateo Martínez", "Renata Mendoza",
  "Gael Montenegro", "Daniela Narváez", "Joaquín Ortega", "Mía Pérez", "Leonardo Quintero",
  "Abril Reyes", "Samuel Rocha", "Julieta Sandino", "Adrián Téllez",
];

export const teacherToday = {
  section: "2° A",
  students: 24,
  attendanceTaken: false,
  submissionsToReview: 7,
  absencesReported: 2,
  unreadMessages: 3,
  schedule: [
    { time: "7:00", subject: "Lengua y Literatura", room: "Aula 2A" },
    { time: "7:45", subject: "Matemática", room: "Aula 2A" },
    { time: "8:30", subject: "Receso", room: "" },
    { time: "9:00", subject: "Ciencias Naturales", room: "Laboratorio" },
    { time: "9:45", subject: "Estudios Sociales", room: "Aula 2A" },
    { time: "10:30", subject: "Creciendo en Valores", room: "Aula 2A" },
  ],
};

export const submissions = [
  { student: "Valentina Aguilar", task: "Mapa de Masaya", time: "Ayer 6:40 p. m.", files: 2, late: false },
  { student: "Diego Chamorro", task: "Mapa de Masaya", time: "Ayer 7:15 p. m.", files: 1, late: false },
  { student: "Isabella Cruz", task: "Mapa de Masaya", time: "Hoy 6:05 a. m.", files: 3, late: true },
  { student: "Mateo Martínez", task: "Mapa de Masaya", time: "Ayer 5:30 p. m.", files: 2, late: false },
  { student: "Renata Mendoza", task: "Mapa de Masaya", time: "Ayer 8:02 p. m.", files: 1, late: false },
  { student: "Gael Montenegro", task: "Mapa de Masaya", time: "Hoy 6:50 a. m.", files: 2, late: true },
  { student: "Abril Reyes", task: "Mapa de Masaya", time: "Ayer 4:12 p. m.", files: 1, late: false },
];

export const gradebook = {
  section: "2° A",
  subject: "Matemática",
  period: "IV Corte",
  assessments: [
    { name: "Tarea 1", max: 10 },
    { name: "Tarea 2", max: 10 },
    { name: "Prueba corta", max: 20 },
    { name: "Proyecto", max: 20 },
    { name: "Cuaderno", max: 10 },
    { name: "Examen", max: 30 },
  ],
  rows: [
    [10, 9, 18, 19, 10, 28], [8, 9, 15, 17, 9, 24], [10, 10, 19, 20, 10, 29], [7, 8, 14, 16, 8, 21],
    [9, 10, 17, 18, 9, 26], [6, 7, 12, 15, 8, 19], [10, 9, 18, 20, 10, 27], [9, 8, 16, 18, 9, 25],
    [10, 10, 20, 19, 10, 30], [8, 7, 13, 16, 7, 22], [9, 9, 17, 18, 10, 26], [5, 6, 11, 14, 7, 17],
    [10, 10, 19, 19, 9, 28], [9, 9, 17, 19, 10, 27], [8, 9, 16, 17, 9, null],
  ] as (number | null)[][],
};

export const enrollmentPipeline = [
  {
    stage: "Recibidas",
    tone: "bg-sky-500",
    items: [
      { child: "Lucía Ortega Ruiz", grade: "Preescolar I", guardian: "Karen Ruiz", when: "Hoy", docs: "2/3" },
      { child: "Andrés Blandón", grade: "1° grado", guardian: "Mario Blandón", when: "Ayer", docs: "3/3" },
      { child: "Elena Solórzano", grade: "Preescolar III", guardian: "Fátima Solórzano", when: "Ayer", docs: "1/3" },
    ],
  },
  {
    stage: "En revisión",
    tone: "bg-amber-500",
    items: [
      { child: "Nicolás Arana", grade: "3° grado", guardian: "Silvia Arana", when: "Hace 3 días", docs: "3/3" },
      { child: "Paula Somarriba", grade: "Preescolar II", guardian: "José Somarriba", when: "Hace 4 días", docs: "3/3" },
    ],
  },
  {
    stage: "Cita agendada",
    tone: "bg-violet-500",
    items: [
      { child: "Martina Vega", grade: "Preescolar I", guardian: "Gabriela Vega", when: "Lun 12 · 9:00", docs: "3/3" },
      { child: "Tomás Zelaya", grade: "4° grado", guardian: "Ernesto Zelaya", when: "Mar 13 · 10:30", docs: "3/3" },
    ],
  },
  {
    stage: "Aceptadas",
    tone: "bg-emerald-500",
    items: [
      { child: "Hanna Guevara", grade: "1° grado", guardian: "Claudia Guevara", when: "2 oct", docs: "3/3" },
      { child: "Iker Mairena", grade: "Preescolar III", guardian: "Lester Mairena", when: "30 sep", docs: "3/3" },
    ],
  },
];

export const gateQueue = [
  { child: "Sofía Martínez", grade: "Preescolar II A", person: "Ana López", relationship: "Abuela", time: "12:30", status: "programado" as const, method: "QR" },
  { child: "Mateo Martínez", grade: "2° A", person: "Ana López", relationship: "Abuela", time: "12:30", status: "programado" as const, method: "QR" },
  { child: "Camila Castillo", grade: "2° A", person: "Roberto Castillo", relationship: "Papá", time: "12:15", status: "entregado" as const, method: "Código" },
  { child: "Thiago Jarquín", grade: "2° A", person: "Transporte Don Julio", relationship: "Transporte", time: "12:20", status: "entregado" as const, method: "Lista" },
  { child: "Martina Reyes", grade: "Preescolar I A", person: "Laura Pérez", relationship: "Tía (una vez)", time: "12:40", status: "programado" as const, method: "QR" },
  { child: "Bruno Sandino", grade: "1° A", person: "—", relationship: "", time: "", status: "alerta" as const, method: "" },
];

import type { SceneName } from "@/components/brand/scene";

export type Role = "padre" | "alumno" | "maestro" | "admin" | "porteria";
export type Tone = "green" | "blue" | "orange" | "red" | "accent" | "primary" | "gray" | "violet" | "pink";

export type SchoolInfo = {
  today: string;
  todayShort: string;
  todayDay: number;
  monthLabel: string;
  year: number;
  currentPeriod: string;
  lastPublishedPeriod: string;
  address: string;
  whatsapp: string;
  whatsappLink: string;
  instagram: string;
};

export type User = { name: string; greeting: string; roleLabel: string; email: string };

export type Child = {
  id: string;
  name: string;
  shortName: string;
  level: "Preescolar" | "Primaria" | "Secundaria";
  grade: string;
  section: string;
  age: number;
  teacher: string;
  teacherLabel: string;
  arrivedAt: string;
  pendingHomework: number;
  attendanceRate: number;
  badges: number;
  average: string;
  allergies?: string;
  healthTags: string[];
  emergency: { name: string; relationship: string; phone: string };
  ownLogin?: boolean;
  leavesAlone?: boolean;
};

export type CafeteriaCategory = "Almuerzos" | "Bebidas" | "Snacks" | "Frutas";

export type TodoIcon = "permiso" | "comunicado" | "agenda" | "tarea" | "pago" | "examen";
export type TodoItem = {
  href: string;
  icon: TodoIcon;
  title: string;
  subtitle: string;
  trailing?: { tone: Tone; label: string } | "dot";
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

export type GradeRow = { subject: string; cortes: (number | null)[] };

export type BadgeIcon =
  | "clock"
  | "book"
  | "calc"
  | "heart"
  | "star"
  | "palette"
  | "trophy"
  | "leaf"
  | "lightbulb"
  | "flag"
  | "music"
  | "medal";

export type BadgeDef = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: BadgeIcon;
  earned: boolean;
  earnedOn?: string;
  /** Curie: símbolo y número del elemento de la tabla periódica. */
  symbol?: string;
  atomicNumber?: number;
};

export type Announcement = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  from: string;
  audience: string;
  priority: "importante" | "normal";
  requiresAck: boolean;
  read: boolean;
  attachment?: string;
  action?: string;
};

export type CalendarEvent = {
  day: number;
  title: string;
  kind: "actividad" | "evento" | "excursion" | "reunion" | "entrega" | "examen";
};

export type MonthlyActivity = {
  date: string;
  title: string;
  description: string;
  category: string;
  color: string;
};

export type ScheduleSlot = { subject: string; teacher?: string; room?: string; section?: string; kind?: "receso" | "club" };

export type MockData = {
  school: SchoolInfo;
  users: Record<Role, User>;
  children: Child[];
  focusChildId: string;
  parentTodo: TodoItem[];
  subjectColors: Record<string, string>;
  homework: Homework[];
  homeworkDetail: {
    id: string;
    childLabel: string;
    attachment: { name: string; size: string };
    parentNote: string;
    photo: "cuaderno" | "laboratorio";
  };
  grades: GradeRow[];
  gradesSummary: { periodLabel: string; best: string; bestScore: string; delta: string };
  badges: BadgeDef[];
  badgeAward: { selectedId: string; reason: string; selected: number[]; recent: [string, string][]; rules: string[] };
  announcements: Announcement[];
  announcementTabs: string[];
  events: CalendarEvent[];
  monthlyActivities: MonthlyActivity[];
  activityForm: { title: string; date: string; time: string; categories: string[]; category: number; description: string };
  dailyAgenda?: {
    childId: string;
    date: string;
    mood: string;
    meals: { label: string; amount: string; value: number }[];
    nap: string;
    bathroom: string;
    activities: string;
    needs: string[];
    teacherNote: string;
    teacher: string;
    publishedAt: string;
  };
  agendaRoster?: string[];
  pickup: {
    today: { person: string; relationship: string; time: string; children: string[]; code: string };
    authorized: { name: string; relationship: string; cedula: string; phone: string }[];
    note?: string;
  };
  absenceReports: { title: string; subtitle: string }[];
  absenceDefaults: { from: string; to: string; reason: number; details: string };
  threads: { name: string; about: string; last: string; time: string; unread: number }[];
  conversation: {
    with: string;
    about: string;
    officeHours: string;
    messages: { from: "maestra" | "padre"; text: string; time: string; attachment?: string }[];
  };
  permissionSlip: {
    title: string;
    child: string;
    date: string;
    schedule: string;
    place: string;
    transport: string;
    bring: string[];
    due: string;
    scene: SceneName;
    signer: { name: string; cedula: string };
  };
  albums: { id: string; title: string; date: string; count: number; scene: SceneName; visibility: string }[];
  roster: string[];
  rosterLabel: string;
  teacherToday: {
    sectionsLabel: string;
    students: number;
    submissionsToReview: number;
    absencesReported: number;
    unreadMessages: number;
    activeHomework: number;
    schedule: { time: string; subject: string; room: string }[];
    sideCard?: { title: string; subtitle: string; href: string };
  };
  submissions: { student: string; task: string; time: string; files: number; late: boolean }[];
  review: {
    title: string;
    subject: string;
    progress: [number, number, number];
    current: number;
    submittedBy: string;
    note: string;
    score: number;
    maxScore: number;
    comment: string;
    photo: "mapa" | "laboratorio";
  };
  syllabus: {
    filters: [string, string, string];
    weeks: { week: string; topic: string; objective: string; resources: number; done: boolean }[];
    newTopic: { week: string; topic: string; objective: string };
  };
  gradebook: {
    section: string;
    subject: string;
    period: string;
    assessments: { name: string; max: number }[];
    rows: (number | null)[][];
  };
  enrollmentPipeline: {
    stage: string;
    tone: string;
    items: { child: string; grade: string; guardian: string; when: string; docs: string }[];
  }[];
  enrollmentForm: {
    year: string;
    first: string;
    last: string;
    birth: string;
    gradeOption: string;
    gradeHint: string;
    previousSchool: string;
    documents: string[];
    steps: [string, string][];
  };
  appointment: { contact: string; phone: string; email: string; grade: string };
  gateQueue: {
    child: string;
    grade: string;
    person: string;
    relationship: string;
    time: string;
    status: "programado" | "entregado" | "alerta" | "sale-solo";
    method: string;
  }[];
  gateVerify: { person: string; relationship: string; cedula: string; children: string[] };
  admin: {
    stats: { label: string; value: string; hint: string; icon: "users" | "check" | "plus" | "megaphone" | "teachers" | "wallet" }[];
    attendanceBySection: { s: string; v: number }[];
    alerts: { t: string; s: string; tone: "orange" | "red" }[];
    usage: string[];
  };

  // Módulos de Curie (primaria y secundaria)
  timetable?: {
    section: string;
    periods: { time: string; end: string }[];
    days: string[];
    grid: ScheduleSlot[][];
    todayIndex: number;
    nowPeriod: number;
  };
  teacherTimetable?: { days: string[]; periods: string[]; grid: (ScheduleSlot | null)[][] };
  exams?: { date: string; day: string; subject: string; type: string; topics: string; room?: string }[];
  clubs?: {
    name: string;
    area: "Ciencia" | "Arte" | "Deporte" | "Humanismo" | "Idiomas";
    schedule: string;
    teacher: string;
    spots: string;
    enrolled: boolean;
    scene: SceneName;
  }[];
  account?: {
    family: string;
    currency: string;
    balance: string;
    dueDate: string;
    monthly: string;
    children: string[];
    rows: { concept: string; due: string; amount: string; status: "pagado" | "pendiente" | "vencido"; receipt?: string }[];
    bank: { name: string; account: string; holder: string };
  };
  cafeteria?: {
    currency: string;
    /** Prepago: consume de un saldo que la familia recarga. Cuenta del día: se acumula y la familia la paga ese día. */
    wallets: {
      childId: string;
      name: string;
      grade: string;
      mode: "prepago" | "cuenta-del-dia";
      balance?: number;
      dayAccount?: number;
      spentToday: number;
      dailyLimit: number;
    }[];
    today: { time: string; child: string; item: string; amount: number; category: CafeteriaCategory; onAccount?: boolean }[];
    controls: { kind: "limite" | "bloqueo" | "aviso" | "cuenta"; title: string; detail: string }[];
    movements: { date: string; concept: string; amount: number; status: "confirmada" | "por-confirmar" }[];
    bank: { name: string; account: string; holder: string };
    pos: {
      station: string;
      cashier: string;
      stats: { label: string; value: string; tone: "accent" | "green" | "orange" }[];
      categories: CafeteriaCategory[];
      products: { name: string; price: number; category: CafeteriaCategory; flag?: "bloqueado" | "alergia"; flagNote?: string }[];
      student: { name: string; grade: string; balance: number; spentToday: number; dailyLimit: number; allergy?: string; blocked: string[] };
      ticket: { item: string; qty: number; price: number }[];
      recent: { name: string; grade: string; detail: string; amount?: number; status: "saldo" | "cuenta" | "rechazado" }[];
    };
  };
  financeOverview?: { collected: string; rate: number; overdueFamilies: number; months: { m: string; v: number }[] };
  studentHome?: {
    nextClass: { subject: string; time: string; room: string; teacher: string };
    streak: number;
    stars: number;
  };
};

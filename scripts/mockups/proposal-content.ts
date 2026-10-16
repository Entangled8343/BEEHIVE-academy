/** Textos, colores y tipografías de cada propuesta en PDF. */
import type { ProposalId } from "./catalog";

export type ProposalTheme = {
  fontsHref: string;
  display: string;
  body: string;
  displayWeight: number;
  dark: string;
  darkText: string;
  darkMuted: string;
  accent: string;
  accentText: string;
  surface: string;
  text: string;
  muted: string;
  soft: string;
  softText: string;
  phoneFrame: string;
  patternDark: string;
  patternLight: string;
};

export type ProposalContent = {
  docTitle: string;
  footer: string;
  coverChip: string;
  coverTitle: string;
  coverTitleAccent: string;
  coverLead: string;
  coverPhones: [string, string];
  overviewTitle: string;
  roles: { tag: string; tagBg: string; tagFg: string; title: string; items: string[] }[];
  ribbon: string[];
  steps: [string, string][];
  tech: string[];
  note: string;
  /** Crédito discreto en el pie de cada página. */
  credit?: string;
  /** Láminas de texto después del resumen (p. ej. cumplimiento fiscal). */
  featurePages?: FeaturePage[];
};

export type FeaturePage = {
  chip: string;
  title: string;
  lead?: string;
  columns: 2 | 3 | 4;
  items: { title: string; text: string; tag?: string; featured?: boolean }[];
  note?: string;
};

const honeycomb = (color: string, opacity: number) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='98' viewBox='0 0 56 98'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23${color}' stroke-opacity='${opacity}' stroke-width='2'/%3E%3C/svg%3E")`;

const stars = (color: string, opacity: number) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='%23${color}' fill-opacity='${opacity}'%3E%3Ccircle cx='12' cy='18' r='1.1'/%3E%3Ccircle cx='64' cy='40' r='0.9'/%3E%3Ccircle cx='118' cy='22' r='1.3'/%3E%3Cpath d='M98 92l1.2 3.4 3.4 1.2-3.4 1.2L98 101.2l-1.2-3.4-3.4-1.2 3.4-1.2z'/%3E%3Ccircle cx='30' cy='96' r='1'/%3E%3Ccircle cx='76' cy='124' r='1.2'/%3E%3Cpath d='M40 58l0.8 2.2 2.2 0.8-2.2 0.8L40 64l-0.8-2.2-2.2-0.8 2.2-0.8z'/%3E%3C/g%3E%3C/svg%3E")`;

const curieTheme: ProposalTheme = {
  fontsHref:
    "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Poppins:wght@500;600;700&display=swap",
  display: '"Newsreader", Georgia, serif',
  body: '"Poppins", system-ui, sans-serif',
  displayWeight: 500,
  dark: "#131d3b",
  darkText: "#fbf7e2",
  darkMuted: "#cfe0d5",
  accent: "#8edcaa",
  accentText: "#12321f",
  surface: "#fbf7e2",
  text: "#12321f",
  muted: "#2f6a4b",
  soft: "#e4eee7",
  softText: "#183f2b",
  phoneFrame: "#0b2116",
  patternDark: stars("FFFFFF", 0.5),
  patternLight: stars("2F6A4B", 0.25),
};

export const themes: Record<ProposalId, ProposalTheme> = {
  beehive: {
    fontsHref:
      "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@600;700;800&display=swap",
    display: '"Fredoka", "Nunito", sans-serif',
    body: '"Nunito", system-ui, sans-serif',
    displayWeight: 600,
    dark: "#2b2c6e",
    darkText: "#ffffff",
    darkMuted: "#d2d3ef",
    accent: "#f7d23e",
    accentText: "#1d1e55",
    surface: "#fffdf6",
    text: "#1d1e55",
    muted: "#3a3c8c",
    soft: "#e8e9f7",
    softText: "#2b2c6e",
    phoneFrame: "#13143a",
    patternDark: honeycomb("FFFFFF", 0.07),
    patternLight: honeycomb("F7D23E", 0.35),
  },
  curie: curieTheme,
  // La cafetería usa la identidad de Curie.
  "curie-cafeteria": curieTheme,
};

export const contents: Record<ProposalId, ProposalContent> = {
  beehive: {
    docTitle: "Beehive Academy · Propuesta de interfaz",
    footer: "Beehive Academy · Propuesta de interfaz",
    coverChip: "Propuesta de interfaz · Octubre 2026",
    coverTitle: "Plataforma escolar",
    coverTitleAccent: "Beehive Academy",
    coverLead:
      "Web app para familias, docentes y dirección. Funciona en celular y en computadora desde el navegador: no hay que descargar nada.",
    coverPhones: ["familia-inicio", "docente-hoy"],
    overviewTitle: "¿Qué incluye la plataforma?",
    roles: [
      { tag: "Familias", tagBg: "#fdedac", tagFg: "#8a6400", title: "Padres y tutores", items: ["Tareas y entrega con fotos", "Notas por corte y boleta PDF", "Agenda diaria de preescolar", "¿Quién recoge? con QR", "Reportar ausencias", "Comunicados, calendario y galería", "Chat con la maestra", "Permisos con firma digital", "Insignias de sus hijos"] },
      { tag: "Docentes", tagBg: "#dbeafe", tagFg: "#075985", title: "Maestras", items: ["Su perfil y sus secciones", "Subir temario", "Crear y revisar tareas", "Libro de notas tipo Excel", "Pasar lista", "Actividades del mes", "Tareas extracurriculares", "Otorgar insignias", "Agenda diaria de la clase"] },
      { tag: "Dirección", tagBg: "#e8e9f7", tagFg: "#2b2c6e", title: "Administración", items: ["Panel con indicadores", "Pre-inscripciones y citas", "Alumnos, familias y personal", "Publicar y cerrar cortes", "Comunicados con acuse", "Galería y permisos de fotos", "Invitaciones a familias"] },
      { tag: "Portería y web", tagBg: "#dcfce7", tagFg: "#166534", title: "Seguridad y sitio", items: ["Retiros del día en vivo", "Verificación por QR o código", "Personas restringidas en rojo", "Bitácora de entregas", "Sitio web público", "Pre-inscripción en línea", "Agenda tu visita"] },
    ],
    ribbon: ["📱 Celular y 💻 PC", "Sin App Store ni Play Store", "🔔 Notificaciones", "Español (listo para inglés)", "🔒 Datos protegidos"],
    steps: [
      ["Aprobación del diseño", "Ajustes de colores, textos y pantallas con Dirección."],
      ["Base de datos y acceso", "Usuarios por invitación, roles y seguridad de la información."],
      ["Construcción de módulos", "Familias, docentes, dirección, portería y sitio web."],
      ["Pruebas reales", "Con maestras y familias piloto antes del lanzamiento."],
      ["Lanzamiento 2027", "Listo para el inicio de clases, con guías rápidas de uso."],
    ],
    tech: ["Web app en Vercel", "Base de datos Turso", "Acceso seguro con Clerk", "Notificaciones push y correo"],
    note: "Los nombres, datos e ilustraciones de esta propuesta son de ejemplo. Las fotos reales del colegio se agregarán solo con autorización de las familias.",
  },
  curie: {
    docTitle: "Escuela Universal Pierre y Marie Curie · Propuesta de plataforma",
    footer: "Escuela Universal Pierre y Marie Curie · Propuesta de plataforma",
    coverChip: "Propuesta de plataforma · Octubre 2026",
    coverTitle: "Portal académico",
    coverTitleAccent: "Curie‑verse",
    coverLead:
      "Una web app para alumnos, familias, docentes y Dirección, de primaria y secundaria, en español e inglés. Se usa desde el celular o la computadora, sin descargar nada.",
    coverPhones: ["alumno-inicio", "familia-inicio"],
    overviewTitle: "Un portal para cada protagonista",
    roles: [
      { tag: "Alumnos · 4° a 11°", tagBg: "#d2f2dc", tagFg: "#1f6b3f", title: "Estudiantes", items: ["Entran con su cuenta de Office 365", "Horario y clase en curso", "Entregar tareas con archivos", "Calificaciones por corte", "Calendario de exámenes", "Clubes: Science, Art, Sports, Humanism", "Elementos Curie (insignias)", "Español / English"] },
      { tag: "Familias", tagBg: "#fde7c7", tagFg: "#8a4b00", title: "Padres y tutores", items: ["Todos sus hijos en un lugar", "Tareas, notas y horario", "Estado de cuenta y comprobantes", "Permisos con firma digital", "Reportar ausencias", "¿Quién recoge? (primaria)", "Comunicados y calendario", "Mensajes con docentes"] },
      { tag: "60 docentes", tagBg: "#dbeafe", tagFg: "#075985", title: "Docentes", items: ["Varias secciones y materias", "Horario semanal", "Asistencia en segundos", "Libro de notas tipo Excel", "Crear y revisar tareas", "Temario y actividades", "Otorgar elementos", "Clubes que dirigen"] },
      { tag: "Dirección", tagBg: "#e4eee7", tagFg: "#183f2b", title: "Dirección y portería", items: ["Panel de 400 alumnos", "Admisiones y pruebas", "Cobros y pagos", "Publicar y cerrar cortes", "Horarios por sección", "Comunicados con acuse", "Portería con QR", "Respaldos diarios"] },
    ],
    ribbon: ["400 alumnos · 60 docentes", "🔑 Misma cuenta de Office 365", "Español / English (listo para Français)", "📱 Celular y 💻 PC", "🔒 Datos protegidos"],
    steps: [
      ["Revisión con Dirección", "Ajustes de pantallas, módulos y textos."],
      ["Configuración académica", "Grados, secciones, materias, docentes y horarios."],
      ["Construcción y datos", "Carga de 400 alumnos, familias y 60 docentes."],
      ["Piloto", "Una sección de primaria y una de secundaria."],
      ["Lanzamiento 2027", "Todo el colegio, con capacitación y guías."],
    ],
    tech: ["Web app en Vercel", "Base de datos Turso", "Acceso con Clerk y Office 365", "Notificaciones push y correo"],
    note: "Los nombres, montos e ilustraciones son de ejemplo. El sitio curie.edu.ni se mantiene; el portal vive en un subdominio (p. ej. portal.curie.edu.ni).",
    credit: "Desarrollado por ia360.work",
  },
  "curie-cafeteria": {
    docTitle: "Cafetería Curie · Propuesta de plataforma",
    footer: "Cafetería Curie · Propuesta de plataforma",
    coverChip: "Propuesta de plataforma · Octubre 2026",
    coverTitle: "Cafetería",
    coverTitleAccent: "Curie",
    coverLead:
      "Las familias pagan con saldo o con la cuenta del día, cada compra se factura como lo pide la DGI y la caja identifica a cada alumno sin carné.",
    coverPhones: ["cafe-familia-inicio", "cafe-controles"],
    overviewTitle: "Una plataforma solo para la cafetería",
    roles: [
      { tag: "Familias", tagBg: "#fde7c7", tagFg: "#8a4b00", title: "Padres y tutores", items: ["Prepago o cuenta del día", "Recargas por transferencia", "Factura de cada compra", "Foto y clave de cada hijo", "Límite diario y bloqueos", "Alergias", "Almuerzo pedido con anticipación", "Aviso en cada compra"] },
      { tag: "Caja · tablet", tagBg: "#d2f2dc", tagFg: "#1f6b3f", title: "Cajeras", items: ["Sin carné: sección, foto y clave", "Cobro en segundos", "Factura consecutiva por serie", "IVA desglosado", "Alertas de alergias", "Productos bloqueados", "Sigue facturando sin internet", "Ventas a docentes en efectivo"] },
      { tag: "Administración", tagBg: "#dbeafe", tagFg: "#075985", title: "Cafetería", items: ["Panel de ventas e IVA", "Confirmar recargas", "Cuentas del día pendientes", "Cierre de caja y arqueo", "Productos, precios e impuestos", "Menú de la semana", "Reportes en Excel"] },
      { tag: "Cumplimiento", tagBg: "#e4eee7", tagFg: "#183f2b", title: "DGI y contador", items: ["Usuario y clave por persona", "Respaldo diario automático", "Numeración inalterable", "Anulaciones con sello", "Talonario de contingencia", "Aviso previo a la DGI", "Libro de ventas para el contador"] },
    ],
    ribbon: ["📱 Celular, 📟 tablet y 💻 PC", "Sin carné ni celular para los alumnos", "IVA 15 % desglosado", "Prepago o cuenta del día", "🔒 Usuario y clave por persona"],
    featurePages: [
      {
        chip: "Facturación computarizada",
        title: "Lo que pide la DGI, resuelto",
        lead: "Cada requisito del sistema de facturación computarizada tiene su lugar en la plataforma.",
        columns: 4,
        items: [
          { title: "Usuario y clave", text: "Cada cajera, supervisora y administrador entra con su propio usuario y clave. Cada acción queda a su nombre." },
          { title: "Respaldo diario", text: "Copia automática cada noche, cifrada y guardada 30 días en otra ubicación." },
          { title: "Numeración consecutiva", text: "Cada caja tiene su serie. Los números no se editan, no se borran y no se reutilizan." },
          { title: "IVA por separado", text: "Cada factura y cada cierre muestran lo gravado, el IVA 15 % y lo exento por separado." },
          { title: "Anulaciones", text: "Se conserva el original y las copias con el sello ANULADO, el motivo y quién autorizó." },
          { title: "Contingencia", text: "Talonario preimpreso de imprenta autorizada y registro posterior de esas facturas en el sistema." },
          { title: "Cambios del sistema", text: "Ningún cambio en la factura, la numeración o los impuestos se activa sin registrar antes el aviso a la DGI." },
          { title: "Formalidades", text: "Emisor y RUC, dirección, número, fecha, cliente, detalle, totales y leyenda de autorización." },
        ],
        note: "El formato final de la factura, las series y el tratamiento del IVA de cada producto se definen con su contador antes de solicitar la autorización.",
      },
      {
        chip: "Sin carné",
        title: "¿Cómo sabemos que es el alumno?",
        lead: "Los alumnos no tienen carné, así que la caja combina lo que la cajera ve con lo que solo el alumno sabe.",
        columns: 3,
        items: [
          { title: "Foto + clave de 4 dígitos", tag: "Recomendado", featured: true, text: "La cajera elige la sección y toca la foto; el alumno escribe su clave. No necesita carné ni celular." },
          { title: "Solo foto, para los más pequeños", tag: "1° a 3° grado", text: "Lista de su sección con fotos grandes, límite diario más bajo y aviso a la familia en cada compra." },
          { title: "QR en el celular", tag: "Secundaria · opcional", text: "El alumno muestra un código desde la app, entrando con su cuenta de Office 365. Más rápido en horas pico." },
          { title: "Llavero o sticker con QR", tag: "Opcional", text: "Sin carné: un llavero o un sticker para la mochila, de bajo costo. Si se pierde, se desactiva desde la app." },
          { title: "Huella o reconocimiento facial", tag: "No recomendado al inicio", text: "Son datos biométricos de menores: requieren consentimiento expreso, equipos adicionales y más cuidado legal." },
          { title: "Siempre activo", tag: "Seguridad", text: "Límite diario, aviso a la familia en cada compra y bloqueo después de 3 claves incorrectas." },
        ],
      },
    ],
    steps: [
      ["Datos fiscales", "Razón social, RUC, series y formato de factura con su contador."],
      ["Autorización DGI", "Solicitud del sistema de facturación computarizada y talonario de contingencia."],
      ["Construcción", "Familias, caja, administración y reportes."],
      ["Piloto", "Una semana con un grado y la caja real."],
      ["Lanzamiento", "Fotos y claves de los alumnos, y capacitación a las cajeras."],
    ],
    tech: ["Web app en Vercel", "Base de datos Turso", "Acceso seguro con Clerk", "Respaldo diario cifrado"],
    note: "Los nombres, montos, RUC y números de factura son de ejemplo. Los requisitos de facturación se validan con su contador y con la DGI antes de la autorización.",
    credit: "Desarrollado por ia360.work",
  },
};

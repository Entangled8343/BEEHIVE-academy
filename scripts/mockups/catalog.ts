/** Catálogo de pantallas para la propuesta visual (Fase 0). */

export type Device = "movil" | "escritorio" | "tablet";

export type Shot = {
  slug: string;
  route: string;
  device: Device;
  section: Section;
  title: string;
  description: string;
  /** Captura de página completa (solo escritorio). */
  full?: boolean;
  /** Texto visible al que se desplaza la página antes de capturar. */
  scrollTo?: string;
};

export const sections = [
  "Sitio web público",
  "Acceso",
  "Familias",
  "Docentes",
  "Dirección y portería",
] as const;
export type Section = (typeof sections)[number];

export const shots: Shot[] = [
  // Sitio web público
  { slug: "sitio-inicio", route: "/", device: "escritorio", section: "Sitio web público", title: "Sitio web del colegio", description: "Página pública con niveles, galería, ubicación y botón de WhatsApp. Lleva directo a la pre-inscripción y a agendar visitas." },
  { slug: "sitio-inicio", route: "/", device: "movil", section: "Sitio web público", title: "Sitio web en el celular", description: "Diseñado primero para celular: rápido aunque haya poca señal." },
  { slug: "pre-inscripcion", route: "/inscripcion", device: "movil", section: "Sitio web público", title: "Pre-inscripción en línea", description: "Formulario por pasos. Los documentos se suben con fotos del celular." },
  { slug: "agenda-tu-cita", route: "/agenda-tu-cita", device: "movil", section: "Sitio web público", title: "Agenda tu visita", description: "Horarios disponibles y confirmación por correo con recordatorio.", scrollTo: "1. Elige el día" },
  { slug: "pre-inscripcion", route: "/inscripcion", device: "escritorio", section: "Sitio web público", title: "Pre-inscripción 2027", description: "La familia recibe un código para seguir el estado de su solicitud: recibida, en revisión, cita agendada y respuesta." },

  // Acceso
  { slug: "ingresar", route: "/ingresar", device: "escritorio", section: "Acceso", title: "Inicio de sesión seguro", description: "Acceso solo por invitación del colegio, con correo y contraseña y recuperación de acceso. Lo gestiona Clerk, un servicio especializado en seguridad." },
  { slug: "ingresar", route: "/ingresar", device: "movil", section: "Acceso", title: "Ingreso desde el celular", description: "Funciona en Chrome o Safari con un link. No hay que descargar nada de App Store ni Play Store." },

  // Familias
  { slug: "familia-inicio", route: "/padres", device: "movil", section: "Familias", title: "Inicio de la familia", description: "Todos los hijos de un vistazo: llegada, tareas, retiro de hoy y pendientes." },
  { slug: "familia-perfil-insignias", route: "/padres/hijos/mateo", device: "movil", section: "Familias", title: "Perfil e insignias", description: "Panal de insignias por logros: puntualidad, lectura, tareas a tiempo y más.", scrollTo: "Panal de insignias" },
  { slug: "familia-tareas", route: "/padres/tareas", device: "movil", section: "Familias", title: "Tareas", description: "Pendientes, entregadas y calificadas, por hijo y por materia." },
  { slug: "familia-entregar-tarea", route: "/padres/tareas/lectura-patito", device: "movil", section: "Familias", title: "Entregar tarea", description: "Fotos del cuaderno o PDF. Se optimizan solas para subir rápido.", scrollTo: "Fotos de la tarea" },
  { slug: "familia-calificaciones", route: "/padres/calificaciones", device: "movil", section: "Familias", title: "Calificaciones", description: "Notas por corte con la escala del MINED (AA, AS, AF, AI) y boleta en PDF." },
  { slug: "familia-retiro", route: "/padres/retiro", device: "movil", section: "Familias", title: "¿Quién recoge hoy?", description: "Aviso con QR o código de un solo día. Portería verifica foto y cédula." },
  { slug: "familia-ausencia", route: "/padres/ausencias", device: "movil", section: "Familias", title: "Reportar ausencia", description: "La maestra la ve al pasar lista; se puede adjuntar constancia médica." },
  { slug: "familia-agenda", route: "/padres/agenda", device: "movil", section: "Familias", title: "Agenda diaria (preescolar)", description: "Ánimo, comidas, siesta, actividades y lo que hace falta para mañana." },
  { slug: "familia-comunicados", route: "/padres/comunicados", device: "movil", section: "Familias", title: "Comunicados", description: "Avisos de Dirección y maestras con confirmación de lectura." },
  { slug: "familia-calendario", route: "/padres/calendario", device: "movil", section: "Familias", title: "Calendario y actividades del mes", description: "Eventos, excursiones, reuniones y entregas en un solo lugar." },
  { slug: "familia-galeria", route: "/padres/galeria", device: "movil", section: "Familias", title: "Galería privada", description: "Fotos de las actividades, visibles solo para las familias del colegio." },
  { slug: "familia-mensajes", route: "/padres/mensajes", device: "movil", section: "Familias", title: "Mensajes con la maestra", description: "Chat dentro de la plataforma, sin compartir números personales." },
  { slug: "familia-permiso-firma", route: "/padres/autorizaciones", device: "movil", section: "Familias", title: "Permisos con firma digital", description: "La familia firma con el dedo; queda registro con fecha y hora.", scrollTo: "Mi respuesta" },
  { slug: "familia-mas", route: "/padres/mas", device: "movil", section: "Familias", title: "Todos los módulos", description: "Menú con todas las secciones y ajustes de notificaciones." },
  { slug: "familia-inicio", route: "/padres", device: "escritorio", section: "Familias", title: "La misma plataforma en la computadora", description: "En PC el menú pasa a una barra lateral y la información se reparte en columnas." },
  { slug: "familia-calificaciones", route: "/padres/calificaciones", device: "escritorio", section: "Familias", title: "Calificaciones en la computadora", description: "Resumen del corte, avance respecto al anterior y descarga de la boleta." },

  // Docentes
  { slug: "docente-hoy", route: "/maestro", device: "movil", section: "Docentes", title: "El día de la maestra", description: "Pasar lista, entregas por revisar, ausencias reportadas y horario." },
  { slug: "docente-asistencia", route: "/maestro/asistencia", device: "movil", section: "Docentes", title: "Pasar lista en segundos", description: "Un toque por alumno. Las ausencias reportadas por las familias ya aparecen como justificadas." },
  { slug: "docente-revisar", route: "/maestro/tareas", device: "movil", section: "Docentes", title: "Revisar entregas", description: "Ver fotos, poner nota y comentario, y pasar al siguiente alumno." },
  { slug: "docente-actividades", route: "/maestro/actividades", device: "movil", section: "Docentes", title: "Actividades del mes", description: "Publicar actividades y, si hace falta, pedir permiso firmado." },
  { slug: "docente-insignias", route: "/maestro/insignias", device: "movil", section: "Docentes", title: "Otorgar insignias", description: "Reconocer logros. Algunas insignias se entregan solas cada noche." },
  { slug: "docente-temario", route: "/maestro/temario", device: "movil", section: "Docentes", title: "Subir el temario", description: "Temas por semana con objetivos y materiales; las familias lo ven publicado." },
  { slug: "docente-libro-notas", route: "/maestro/calificaciones", device: "escritorio", section: "Docentes", title: "Libro de notas", description: "Funciona como Excel: Enter baja de fila y se puede pegar desde Excel. Se guarda solo. Al publicar el corte, las notas se bloquean y las familias las ven." },
  { slug: "docente-agenda-diaria", route: "/maestro/agenda", device: "escritorio", section: "Docentes", title: "Agenda diaria de toda la clase", description: "La maestra de preescolar llena la agenda de todos en una sola pantalla y la publica a las familias." },
  { slug: "docente-revisar", route: "/maestro/tareas", device: "escritorio", section: "Docentes", title: "Revisión de tareas en la computadora", description: "Lista de entregas a la izquierda, revisión a la derecha. Se marcan las entregas tardías." },
  { slug: "docente-temario", route: "/maestro/temario", device: "escritorio", section: "Docentes", title: "Temario por corte", description: "Organizado por semanas, con PDF y enlaces de apoyo." },

  // Dirección y portería
  { slug: "direccion-panel", route: "/admin", device: "escritorio", section: "Dirección y portería", title: "Panel de Dirección", description: "Asistencia por sección, admisiones 2027, comunicados leídos y alertas del día." },
  { slug: "direccion-inscripciones", route: "/admin/inscripciones", device: "escritorio", section: "Dirección y portería", title: "Tablero de pre-inscripciones", description: "Cada solicitud avanza por etapas: recibida, en revisión, cita y aceptada. Al aceptarla se crea el alumno y se invita a la familia." },
  { slug: "porteria", route: "/porteria", device: "tablet", section: "Dirección y portería", title: "Portería (tablet)", description: "Lista de retiros del día actualizada al momento. Escanea el QR, verifica la cédula, confirma la entrega y la familia recibe el aviso al instante." },
  { slug: "direccion-panel", route: "/admin", device: "movil", section: "Dirección y portería", title: "Dirección desde el celular", description: "Los indicadores del colegio, en cualquier lugar." },
];

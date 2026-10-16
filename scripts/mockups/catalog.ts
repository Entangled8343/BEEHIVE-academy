/** Catálogo de pantallas para cada propuesta visual (portal de cada colegio y productos aparte). */
import type { SchoolId } from "../../src/schools/types";

/** Una propuesta por colegio, más productos aparte como la cafetería de Curie (se capturan con el build de Curie). */
export type ProposalId = SchoolId | "curie-cafeteria";

export type Device = "movil" | "escritorio" | "tablet";

export type Shot = {
  slug: string;
  route: string;
  device: Device;
  section: string;
  title: string;
  description: string;
  /** Captura de página completa (solo escritorio). */
  full?: boolean;
  /** Texto visible al que se desplaza la página antes de capturar. */
  scrollTo?: string;
  /** Idioma de la captura (cookie NEXT_LOCALE). */
  locale?: "es" | "en";
};

const beehiveSections = ["Sitio web público", "Acceso", "Familias", "Docentes", "Dirección y portería"];

const beehiveShots: Shot[] = [
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

const curieSections = ["Portal y admisiones", "Acceso", "Alumnos", "Familias", "Docentes", "Dirección y portería", "Cafetería · módulo opcional"];

const curieShots: Shot[] = [
  // Portal y admisiones
  { slug: "portal-inicio", route: "/", device: "escritorio", section: "Portal y admisiones", title: "Portal Curie", description: "Portada del portal académico con acceso para familias, alumnos y docentes. El sitio curie.edu.ni se mantiene y enlaza al portal." },
  { slug: "portal-inicio", route: "/", device: "movil", section: "Portal y admisiones", title: "Portal en el celular", description: "Funciona en Chrome o Safari con un link, sin descargar nada." },
  { slug: "pre-inscripcion", route: "/inscripcion", device: "movil", section: "Portal y admisiones", title: "Pre-inscripción en línea", description: "Formulario por pasos. Los documentos se suben con fotos del celular." },
  { slug: "agenda-tu-cita", route: "/agenda-tu-cita", device: "movil", section: "Portal y admisiones", title: "Prueba y entrevista", description: "La familia elige la fecha y recibe confirmación y recordatorio.", scrollTo: "1. Elige el día" },
  { slug: "pre-inscripcion", route: "/inscripcion", device: "escritorio", section: "Portal y admisiones", title: "Admisiones 2027", description: "Cada solicitud tiene un código de seguimiento: recibida, en revisión, prueba y entrevista, y respuesta." },

  // Acceso
  { slug: "ingresar", route: "/ingresar", device: "escritorio", section: "Acceso", title: "Una sola cuenta: la de Office 365", description: "Alumnos y docentes entran con el mismo correo de Office 365 que ya usan en Teams: sin contraseñas nuevas. Si alguien deja el colegio, al desactivarlo en Office 365 ya no puede entrar. Las familias entran por invitación. Lo gestiona Clerk, un servicio especializado en seguridad." },
  { slug: "ingresar", route: "/ingresar", device: "movil", section: "Acceso", title: "Un toque para entrar", description: "«Continuar con Microsoft» y listo. Cada usuario elige español o inglés; el francés se puede agregar después." },

  // Alumnos
  { slug: "alumno-inicio", route: "/alumno", device: "movil", section: "Alumnos", title: "Inicio del alumno", description: "Clase en curso, tareas pendientes, próximo examen, promedio y racha de puntualidad." },
  { slug: "alumno-inicio-en", route: "/alumno", device: "movil", locale: "en", section: "Alumnos", title: "Student home (English)", description: "La misma pantalla en inglés, con un toque en ES / EN." },
  { slug: "alumno-horario", route: "/alumno/horario", device: "movil", section: "Alumnos", title: "Mi horario", description: "Las clases del día con aula y docente. Marca la clase en curso." },
  { slug: "alumno-entregar", route: "/alumno/tareas/lab-densidad", device: "movil", section: "Alumnos", title: "Entregar tareas", description: "El alumno sube fotos o archivos. Su familia también ve la entrega.", scrollTo: "Mi entrega" },
  { slug: "alumno-calificaciones", route: "/alumno/calificaciones", device: "movil", section: "Alumnos", title: "Mis calificaciones", description: "Notas por corte con la escala del MINED (AA, AS, AF, AI)." },
  { slug: "alumno-examenes", route: "/alumno/examenes", device: "movil", section: "Alumnos", title: "Calendario de exámenes", description: "Pruebas y exámenes por corte, con temas y aula." },
  { slug: "alumno-clubes", route: "/alumno/clubes", device: "movil", section: "Alumnos", title: "Clubes", description: "Science, Art, Sports y Humanism: el alumno se inscribe desde el celular." },
  { slug: "alumno-elementos", route: "/alumno/insignias", device: "movil", section: "Alumnos", title: "Elementos Curie", description: "Cada logro es un elemento de la tabla periódica: Radiante (Ra), Curie-osidad (Cu), Francophone (Fr)…" },
  { slug: "alumno-tareas", route: "/alumno/tareas", device: "movil", section: "Alumnos", title: "Mis tareas", description: "Pendientes, entregadas y calificadas, con el comentario del docente." },
  { slug: "alumno-inicio", route: "/alumno", device: "escritorio", section: "Alumnos", title: "El portal del alumno en la computadora", description: "En PC el menú pasa a una barra lateral y la información se reparte en columnas." },
  { slug: "alumno-horario", route: "/alumno/horario", device: "escritorio", section: "Alumnos", title: "Horario semanal", description: "Toda la semana por materia, aula y docente. Los cambios se notifican a alumnos y familias." },

  // Familias
  { slug: "familia-inicio", route: "/padres", device: "movil", section: "Familias", title: "Inicio de la familia", description: "Primaria y secundaria juntos: llegada, tareas, pagos y pendientes de cada hijo." },
  { slug: "familia-estado-cuenta", route: "/padres/estado-cuenta", device: "movil", section: "Familias", title: "Estado de cuenta", description: "Saldo, mensualidades y recibos. La familia sube su comprobante desde el celular." },
  { slug: "familia-perfil", route: "/padres/hijos/valeria", device: "movil", section: "Familias", title: "Perfil del alumno", description: "Datos, salud, contactos de emergencia y los elementos que ha descubierto." },
  { slug: "familia-calificaciones", route: "/padres/calificaciones", device: "movil", section: "Familias", title: "Calificaciones", description: "Las mismas notas que ve el alumno, con boleta en PDF." },
  { slug: "familia-retiro", route: "/padres/retiro", device: "movil", section: "Familias", title: "¿Quién recoge hoy?", description: "Para primaria: aviso con QR o código. En secundaria se puede autorizar la salida sola." },
  { slug: "familia-permiso-firma", route: "/padres/autorizaciones", device: "movil", section: "Familias", title: "Permisos con firma digital", description: "La familia firma con el dedo y queda registro con fecha y hora.", scrollTo: "Mi respuesta" },
  { slug: "familia-comunicados", route: "/padres/comunicados", device: "movil", section: "Familias", title: "Comunicados", description: "Avisos de Dirección y docentes, con confirmación de lectura." },
  { slug: "familia-mensajes", route: "/padres/mensajes", device: "movil", section: "Familias", title: "Mensajes con docentes", description: "Chat dentro de la plataforma, sin compartir números personales." },
  { slug: "familia-calendario", route: "/padres/calendario", device: "movil", section: "Familias", title: "Calendario", description: "Exámenes, giras, reuniones y actividades del mes." },
  { slug: "familia-inicio", route: "/padres", device: "escritorio", section: "Familias", title: "La familia en la computadora", description: "Todo lo de sus hijos en un solo lugar: tareas, notas, horario, pagos, permisos y mensajes." },
  { slug: "familia-estado-cuenta", route: "/padres/estado-cuenta", device: "escritorio", section: "Familias", title: "Pagos sin filas", description: "Movimientos, recibos descargables y recordatorios automáticos antes de cada vencimiento." },

  // Docentes
  { slug: "docente-hoy", route: "/maestro", device: "movil", section: "Docentes", title: "El día del docente", description: "Sus secciones, entregas por revisar, ausencias reportadas y horario." },
  { slug: "docente-asistencia", route: "/maestro/asistencia", device: "movil", section: "Docentes", title: "Pasar lista", description: "Un toque por alumno. Las ausencias reportadas por las familias ya aparecen justificadas." },
  { slug: "docente-revisar", route: "/maestro/tareas", device: "movil", section: "Docentes", title: "Revisar entregas", description: "Ver archivos, poner nota y comentario, y pasar al siguiente." },
  { slug: "docente-insignias", route: "/maestro/insignias", device: "movil", section: "Docentes", title: "Otorgar elementos", description: "Reconocer logros. Algunos elementos se entregan solos cada noche." },
  { slug: "docente-actividades", route: "/maestro/actividades", device: "movil", section: "Docentes", title: "Actividades del mes", description: "Publicar actividades y pedir permiso firmado cuando haga falta." },
  { slug: "docente-temario", route: "/maestro/temario", device: "movil", section: "Docentes", title: "Temario", description: "Temas por semana con objetivos y materiales para alumnos y familias." },
  { slug: "docente-libro-notas", route: "/maestro/calificaciones", device: "escritorio", section: "Docentes", title: "Libro de notas", description: "Funciona como Excel y se guarda solo. Al publicar el corte, las notas se bloquean y las ven alumnos y familias." },
  { slug: "docente-horario", route: "/maestro/horario", device: "escritorio", section: "Docentes", title: "Horario del docente", description: "Sus secciones, aulas y clubes de la semana, por colores." },
  { slug: "docente-revisar", route: "/maestro/tareas", device: "escritorio", section: "Docentes", title: "Revisión en la computadora", description: "Lista de entregas a la izquierda y revisión a la derecha. Se marcan las entregas tardías." },

  // Dirección y portería
  { slug: "direccion-panel", route: "/admin", device: "escritorio", section: "Dirección y portería", title: "Panel de Dirección", description: "400 alumnos y 60 docentes de un vistazo: asistencia por grado, admisiones, pagos y alertas del día." },
  { slug: "direccion-cobros", route: "/admin/cuentas", device: "escritorio", section: "Dirección y portería", title: "Cobros y pagos", description: "Familias al día, comprobantes por revisar, recordatorios masivos y exportación a Excel." },
  { slug: "direccion-inscripciones", route: "/admin/inscripciones", device: "escritorio", section: "Dirección y portería", title: "Tablero de admisiones", description: "Cada solicitud avanza por etapas. Al aceptarla se crean el alumno y los accesos de la familia." },
  { slug: "porteria", route: "/porteria", device: "tablet", section: "Dirección y portería", title: "Portería (tablet)", description: "Retiros del día al momento: QR o código, verificación de cédula, alumnos de secundaria que salen solos y aviso inmediato a la familia." },
  { slug: "direccion-panel", route: "/admin", device: "movil", section: "Dirección y portería", title: "Dirección desde el celular", description: "Los indicadores del colegio, en cualquier lugar." },

  // Cafetería (módulo opcional)
  { slug: "familia-cafeteria", route: "/padres/cafeteria", device: "movil", section: "Cafetería · módulo opcional", title: "Saldo de cafetería", description: "Cada hijo con saldo prepago o con cuenta del día. La familia recarga o paga por transferencia." },
  { slug: "familia-cafeteria-hoy", route: "/padres/cafeteria", device: "movil", section: "Cafetería · módulo opcional", title: "Lo que consumió hoy", description: "Cada compra con hora y monto, y las recargas y pagos confirmados.", scrollTo: "Consumos de hoy" },
  { slug: "familia-cafeteria-controles", route: "/padres/cafeteria", device: "movil", section: "Cafetería · módulo opcional", title: "Controles de la familia", description: "Límite diario, productos bloqueados y avisos de cada compra o de saldo bajo.", scrollTo: "Controles de la familia" },
  { slug: "cafeteria-caja", route: "/cafeteria", device: "tablet", section: "Cafetería · módulo opcional", title: "Caja de la cafetería (tablet)", description: "Se escanea el carné y aparecen el saldo, lo que puede gastar hoy, alergias y productos bloqueados por la familia. Un toque por producto y se cobra del saldo o a la cuenta del día." },
];

const cafeSections = ["Familias", "Caja (tablet)", "Administración y cumplimiento"];

const cafeShots: Shot[] = [
  // Familias
  { slug: "cafe-familia-inicio", route: "/cafe/familia", device: "movil", section: "Familias", title: "Saldo o cuenta del día", description: "Cada hijo con su forma de pago: saldo prepago que se recarga, o cuenta del día que se paga ese mismo día." },
  { slug: "cafe-familia-hoy", route: "/cafe/familia", device: "movil", section: "Familias", title: "Lo que compró hoy", description: "Cada compra con hora, monto y número de factura, al momento.", scrollTo: "Hoy en la cafetería" },
  { slug: "cafe-recargar", route: "/cafe/familia/recargar", device: "movil", section: "Familias", title: "Recargar o pagar", description: "Por transferencia: la familia sube la foto del comprobante y la cafetería lo confirma." },
  { slug: "cafe-facturas", route: "/cafe/familia/facturas", device: "movil", section: "Familias", title: "Sus facturas", description: "Una factura por compra, con el IVA desglosado. Se descargan en PDF." },
  { slug: "cafe-factura-detalle", route: "/cafe/familia/facturas", device: "movil", section: "Familias", title: "La factura completa", description: "Emisor y RUC, número consecutivo, cliente, detalle e IVA por separado.", scrollTo: "Factura A-001245" },
  { slug: "cafe-controles", route: "/cafe/familia/hijos/diego", device: "movil", section: "Familias", title: "Foto y clave de cada hijo", description: "La familia sube la foto y define la clave de 4 dígitos con la que su hijo compra." },
  { slug: "cafe-controles-limites", route: "/cafe/familia/hijos/diego", device: "movil", section: "Familias", title: "Lo que no queremos que consuma", description: "Límite diario y restricciones que elige la familia: lactosa, altos en azúcar, gaseosas o productos específicos.", scrollTo: "Forma de pago" },
  { slug: "cafe-menu", route: "/cafe/familia/menu", device: "movil", section: "Familias", title: "Almuerzo pedido con anticipación", description: "Su hijo no hace fila y la cafetería prepara lo justo." },

  // Caja
  { slug: "cafe-caja-identificar", route: "/cafe/caja", device: "tablet", section: "Caja (tablet)", title: "1. ¿Quién compra?", description: "Sin carné: la cajera elige la sección, toca la foto y el alumno escribe su clave de 4 dígitos." },
  { slug: "cafe-caja-venta", route: "/cafe/caja/venta", device: "tablet", section: "Caja (tablet)", title: "2. Cobrar y facturar", description: "Lo que queda de cada producto, lo que la familia no permite, el límite del día, el IVA desglosado y el número de factura consecutivo." },
  { slug: "cafe-caja-factura", route: "/cafe/caja/factura", device: "tablet", section: "Caja (tablet)", title: "3. Factura emitida", description: "El original se imprime para el cliente, la copia queda en el archivo y la familia la ve en la app." },

  // Administración y cumplimiento
  { slug: "cafe-admin-panel", route: "/cafe/admin", device: "escritorio", section: "Administración y cumplimiento", title: "Panel de la cafetería", description: "Ventas e IVA del día, facturas emitidas y anuladas, pendientes y estado de los controles fiscales." },
  { slug: "cafe-admin-facturas", route: "/cafe/admin/facturas", device: "escritorio", section: "Administración y cumplimiento", title: "Libro de ventas", description: "Numeración consecutiva por serie, con gravado, IVA y exento por separado. Se exporta a Excel para el contador." },
  { slug: "cafe-admin-anulada", route: "/cafe/admin/facturas/anulada", device: "escritorio", section: "Administración y cumplimiento", title: "Anulaciones correctas", description: "Se conservan el original y la copia con el sello ANULADO, el motivo y la supervisora que autorizó." },
  { slug: "cafe-admin-inventario", route: "/cafe/admin/inventario", device: "escritorio", section: "Administración y cumplimiento", title: "Inventario", description: "Cada factura descuenta lo vendido y cada anulación lo devuelve. Entradas y ajustes con motivo, y aviso de productos por agotarse." },
  { slug: "cafe-admin-cierre", route: "/cafe/admin/cierre", device: "escritorio", section: "Administración y cumplimiento", title: "Cierre de caja", description: "Rango de facturas del día, desglose fiscal, formas de pago y arqueo del efectivo." },
  { slug: "cafe-admin-productos", route: "/cafe/admin/productos", device: "escritorio", section: "Administración y cumplimiento", title: "Productos y precios", description: "IVA 15 % o exento por producto, y características como lactosa o alto en azúcar para respetar lo que cada familia no permite." },
  { slug: "cafe-admin-seguridad", route: "/cafe/admin/seguridad", device: "escritorio", section: "Administración y cumplimiento", title: "Seguridad y cumplimiento", description: "Usuario y clave por persona, respaldo diario, bitácora y versiones del sistema con aviso previo de cambios." },
];

export const catalogs: Record<ProposalId, { sections: string[]; shots: Shot[] }> = {
  beehive: { sections: beehiveSections, shots: beehiveShots },
  curie: { sections: curieSections, shots: curieShots },
  "curie-cafeteria": { sections: cafeSections, shots: cafeShots },
};

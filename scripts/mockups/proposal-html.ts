import { sections, type Shot } from "./catalog";

export type RenderedShot = Shot & { file: string };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const css = `
@page { size: 1280px 720px; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #fffdf6; }
body { font-family: "Nunito", system-ui, sans-serif; color: #1d1e55; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3, .display { font-family: "Fredoka", "Nunito", sans-serif; font-weight: 600; }
.page { width: 1280px; height: 720px; position: relative; overflow: hidden; page-break-after: always; break-after: page; padding: 48px 56px; }
.honey { color: #f7d23e; }
.navy-bg { background: #2b2c6e; color: #fff; }
.comb { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='98' viewBox='0 0 56 98'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23FFFFFF' stroke-opacity='0.07' stroke-width='2'/%3E%3C/svg%3E"); background-size: 56px 98px; }
.comb-honey { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='98' viewBox='0 0 56 98'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%23F7D23E' stroke-opacity='0.35' stroke-width='2'/%3E%3C/svg%3E"); background-size: 56px 98px; }
.chip { display: inline-flex; align-items: center; gap: 6px; border-radius: 999px; padding: 6px 14px; font-weight: 800; font-size: 13px; background: #f7d23e; color: #1d1e55; }
.chip.soft { background: #e8e9f7; color: #2b2c6e; }
.footer { position: absolute; left: 56px; right: 56px; bottom: 22px; display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: #8d8fd0; }
.navy-bg .footer { color: #b2b4e2; }

/* Portada */
.cover { display: grid; grid-template-columns: 1fr 520px; gap: 24px; align-items: center; }
.cover-logo { width: 120px; height: 120px; }
.cover h1 { font-size: 62px; line-height: 1.02; color: #fff; margin-top: 22px; }
.cover .lead { font-size: 21px; color: #d2d3ef; margin-top: 18px; max-width: 560px; line-height: 1.4; }
.cover .eyebrow { margin-top: 26px; }
.cover-phones { position: relative; height: 620px; }
.cover-phones .phone { position: absolute; }
.cover-phones .p1 { left: 10px; top: 40px; transform: rotate(-6deg); }
.cover-phones .p2 { left: 250px; top: 10px; transform: rotate(5deg); }

/* Teléfono */
.phone { background: #13143a; border-radius: 34px; padding: 9px; box-shadow: 0 20px 50px -12px rgba(19,20,58,.45); }
.phone img { display: block; border-radius: 26px; }
.phone .notch { position: absolute; }

/* Páginas de celular */
.mobile-page { padding-top: 40px; }
.mobile-page .head { display: flex; align-items: center; gap: 14px; }
.mobile-page h2 { font-size: 32px; }
.mobile-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 18px; }
.mobile-item { display: flex; flex-direction: column; align-items: center; text-align: center; }
.mobile-item .phone img { width: 204px; height: 441px; object-fit: cover; object-position: top; }
.mobile-item h3 { font-size: 19px; margin-top: 12px; }
.mobile-item p { font-size: 13.5px; color: #3a3c8c; margin-top: 4px; max-width: 300px; line-height: 1.35; font-weight: 600; }

/* Páginas de escritorio / tablet */
.wide-page { display: grid; grid-template-columns: 300px 1fr; gap: 36px; align-items: center; }
.wide-page h2 { font-size: 34px; line-height: 1.08; margin-top: 14px; }
.wide-page .desc { font-size: 17px; line-height: 1.45; color: #3a3c8c; margin-top: 14px; font-weight: 600; }
.wide-page .device-label { margin-top: 22px; }
.browser { background: #fff; border-radius: 16px; box-shadow: 0 24px 60px -16px rgba(19,20,58,.35); overflow: hidden; border: 1px solid #e8e9f7; }
.browser .bar { height: 34px; display: flex; align-items: center; gap: 7px; padding: 0 14px; background: #f4f4fc; border-bottom: 1px solid #e8e9f7; }
.browser .dot { width: 11px; height: 11px; border-radius: 50%; }
.browser .url { margin-left: 14px; flex: 1; height: 22px; border-radius: 999px; background: #fff; border: 1px solid #e8e9f7; font-size: 11px; font-weight: 700; color: #8d8fd0; display: flex; align-items: center; padding-left: 12px; }
.browser img { display: block; width: 100%; }
.tablet { background: #13143a; border-radius: 30px; padding: 16px; box-shadow: 0 24px 60px -16px rgba(19,20,58,.45); }
.tablet img { display: block; width: 100%; border-radius: 14px; }

/* Resumen */
.overview h2 { font-size: 40px; margin-top: 10px; }
.roles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 26px; }
.role { background: #fff; border-radius: 26px; padding: 22px; box-shadow: 0 4px 16px -4px rgba(29,30,85,.1); border: 1px solid #e8e9f7; }
.role h3 { font-size: 22px; }
.role .tag { display: inline-block; font-size: 12px; font-weight: 800; padding: 3px 10px; border-radius: 999px; margin-bottom: 10px; }
.role ul { list-style: none; margin-top: 10px; display: grid; gap: 7px; }
.role li { font-size: 14px; font-weight: 700; color: #2b2c6e; display: flex; gap: 8px; align-items: flex-start; }
.role li::before { content: ""; flex: none; width: 10px; height: 11px; margin-top: 4px; background: #f7d23e; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); }
.ribbon { display: flex; gap: 12px; margin-top: 22px; flex-wrap: wrap; }
.ribbon span { background: #2b2c6e; color: #fff; border-radius: 999px; padding: 9px 16px; font-weight: 800; font-size: 14px; }

/* Cierre */
.steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-top: 30px; }
.step { background: rgba(255,255,255,.08); border-radius: 22px; padding: 18px; }
.step .n { width: 40px; height: 44px; display: grid; place-items: center; background: #f7d23e; color: #1d1e55; font-family: "Fredoka"; font-weight: 600; font-size: 20px; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); }
.step h3 { color: #fff; font-size: 18px; margin-top: 12px; line-height: 1.15; }
.step p { color: #d2d3ef; font-size: 13px; margin-top: 6px; font-weight: 600; line-height: 1.35; }
.note { margin-top: 26px; background: rgba(247,210,62,.14); border: 1px solid rgba(247,210,62,.4); color: #fbe27a; padding: 14px 18px; border-radius: 18px; font-weight: 700; font-size: 14px; }
`;

function phone(src: string, cls = "") {
  return `<div class="phone ${cls}"><img src="${src}" /></div>`;
}

function footer(page: number) {
  return `<div class="footer"><span>Beehive Academy · Propuesta de interfaz</span><span>${page}</span></div>`;
}

export function buildProposalHtml(rendered: RenderedShot[], logoSrc: string) {
  const pages: string[] = [];
  let n = 1;
  const byKey = (slug: string, device: string) => rendered.find((r) => r.slug === slug && r.device === device);

  const p1 = byKey("familia-inicio", "movil");
  const p2 = byKey("docente-hoy", "movil");
  pages.push(`
  <section class="page cover navy-bg comb">
    <div>
      <img class="cover-logo" src="${logoSrc}" />
      <div class="eyebrow"><span class="chip">Propuesta de interfaz · Octubre 2026</span></div>
      <h1>Plataforma escolar<br/><span class="honey">Beehive Academy</span></h1>
      <p class="lead">Web app para familias, docentes y dirección. Funciona en celular y en computadora desde el navegador: no hay que descargar nada.</p>
    </div>
    <div class="cover-phones">
      ${p1 ? phone(p1.file, "p1").replace("<img", '<img style="width:230px;height:497px;object-fit:cover;object-position:top"') : ""}
      ${p2 ? phone(p2.file, "p2").replace("<img", '<img style="width:230px;height:497px;object-fit:cover;object-position:top"') : ""}
    </div>
    ${footer(n++)}
  </section>`);

  pages.push(`
  <section class="page overview comb-honey">
    <span class="chip soft">Resumen</span>
    <h2>¿Qué incluye la plataforma?</h2>
    <div class="roles">
      <div class="role"><span class="tag" style="background:#fdedac;color:#8a6400">Familias</span><h3>Padres y tutores</h3>
        <ul><li>Tareas y entrega con fotos</li><li>Notas por corte y boleta PDF</li><li>Agenda diaria de preescolar</li><li>¿Quién recoge? con QR</li><li>Reportar ausencias</li><li>Comunicados, calendario y galería</li><li>Chat con la maestra</li><li>Permisos con firma digital</li><li>Insignias de sus hijos</li></ul></div>
      <div class="role"><span class="tag" style="background:#dbeafe;color:#075985">Docentes</span><h3>Maestras</h3>
        <ul><li>Su perfil y sus secciones</li><li>Subir temario</li><li>Crear y revisar tareas</li><li>Libro de notas tipo Excel</li><li>Pasar lista</li><li>Actividades del mes</li><li>Tareas extracurriculares</li><li>Otorgar insignias</li><li>Agenda diaria de la clase</li></ul></div>
      <div class="role"><span class="tag" style="background:#e8e9f7;color:#2b2c6e">Dirección</span><h3>Administración</h3>
        <ul><li>Panel con indicadores</li><li>Pre-inscripciones y citas</li><li>Alumnos, familias y personal</li><li>Publicar y cerrar cortes</li><li>Comunicados con acuse</li><li>Galería y permisos de fotos</li><li>Invitaciones a familias</li></ul></div>
      <div class="role"><span class="tag" style="background:#dcfce7;color:#166534">Portería y web</span><h3>Seguridad y sitio</h3>
        <ul><li>Retiros del día en vivo</li><li>Verificación por QR o código</li><li>Personas restringidas en rojo</li><li>Bitácora de entregas</li><li>Sitio web público</li><li>Pre-inscripción en línea</li><li>Agenda tu visita</li></ul></div>
    </div>
    <div class="ribbon"><span>📱 Celular y 💻 PC</span><span>Sin App Store ni Play Store</span><span>🔔 Notificaciones</span><span>Español (listo para inglés)</span><span>🔒 Datos protegidos</span></div>
    ${footer(n++)}
  </section>`);

  for (const section of sections) {
    const items = rendered.filter((r) => r.section === section);
    const mobile = items.filter((r) => r.device === "movil");
    const wide = items.filter((r) => r.device !== "movil");
    for (let i = 0; i < mobile.length; i += 3) {
      const chunk = mobile.slice(i, i + 3);
      pages.push(`
      <section class="page mobile-page">
        <div class="head"><h2>${esc(section)}</h2><span class="chip soft">📱 En el celular</span></div>
        <div class="mobile-grid">
          ${chunk
            .map(
              (s) => `<div class="mobile-item">${phone(s.file)}<h3>${esc(s.title)}</h3><p>${esc(s.description)}</p></div>`,
            )
            .join("")}
        </div>
        ${footer(n++)}
      </section>`);
    }
    for (const s of wide) {
      const frame =
        s.device === "tablet"
          ? `<div class="tablet"><img src="${s.file}" /></div>`
          : `<div class="browser"><div class="bar"><span class="dot" style="background:#ef5b4c"></span><span class="dot" style="background:#f7d23e"></span><span class="dot" style="background:#2fae7a"></span><span class="url">🔒 Beehive Academy · ${esc(s.route)}</span></div><img src="${s.file}" /></div>`;
      pages.push(`
      <section class="page wide-page">
        <div>
          <span class="chip">${esc(section)}</span>
          <h2>${esc(s.title)}</h2>
          <p class="desc">${esc(s.description)}</p>
          <div class="device-label"><span class="chip soft">${s.device === "tablet" ? "📟 Tablet" : "💻 Computadora"}</span></div>
        </div>
        <div>${frame}</div>
        ${footer(n++)}
      </section>`);
    }
  }

  pages.push(`
  <section class="page navy-bg comb">
    <img src="${logoSrc}" style="width:84px;height:84px" />
    <h2 style="font-size:44px;color:#fff;margin-top:16px">Próximos pasos</h2>
    <div class="steps">
      <div class="step"><div class="n">1</div><h3>Aprobación del diseño</h3><p>Ajustes de colores, textos y pantallas con Dirección.</p></div>
      <div class="step"><div class="n">2</div><h3>Base de datos y acceso</h3><p>Usuarios por invitación, roles y seguridad de la información.</p></div>
      <div class="step"><div class="n">3</div><h3>Construcción de módulos</h3><p>Familias, docentes, dirección, portería y sitio web.</p></div>
      <div class="step"><div class="n">4</div><h3>Pruebas reales</h3><p>Con maestras y familias piloto antes del lanzamiento.</p></div>
      <div class="step"><div class="n">5</div><h3>Lanzamiento 2027</h3><p>Listo para el inicio de clases, con guías rápidas de uso.</p></div>
    </div>
    <div class="ribbon" style="margin-top:26px"><span style="background:rgba(255,255,255,.12)">Web app en Vercel</span><span style="background:rgba(255,255,255,.12)">Base de datos Turso</span><span style="background:rgba(255,255,255,.12)">Acceso seguro con Clerk</span><span style="background:rgba(255,255,255,.12)">Notificaciones push y correo</span></div>
    <p class="note">Los nombres, datos e ilustraciones de esta propuesta son de ejemplo. Las fotos reales del colegio se agregarán solo con autorización de las familias.</p>
    ${footer(n++)}
  </section>`);

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"/>
<title>Beehive Academy · Propuesta de interfaz</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet">
<style>${css}</style></head>
<body>${pages.join("\n")}</body></html>`;
}

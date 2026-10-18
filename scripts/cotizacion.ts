/**
 * Cotización en PDF para Beehive Academy, con la identidad de la propuesta visual.
 *
 * Uso: pnpm cotizacion
 * Salida: docs/cotizaciones/cotizacion-beehive.html
 *         docs/cotizaciones/Beehive-Academy-Cotizacion.pdf
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import { themes } from "./mockups/proposal-content";

const executablePath =
  process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const outDir = path.resolve("docs/cotizaciones");
const t = themes.beehive;

// Todos los montos salen de estos valores para que las tablas no se contradigan.
const students = 164;
const minStudents = 150;
const months = 12;
const setupList = 2200;
const setupOff = 1000;
const feeList = 4;
const founderOff = 0.5;
const familyPart = 2;
const annualPrepayOff = 0.05;
const exchangeRate = 36.62;

const setup = setupList - setupOff;
const fee = feeList - founderOff;
const schoolPart = fee - familyPart;
const monthly = (perStudent: number) => perStudent * students;
const yearly = (perStudent: number) => perStudent * students * months;
const annual = yearly(fee);
const year1 = setup + annual;
const families = yearly(familyPart);
const schoolNet = setup + yearly(schoolPart);
const founderSavings = setupOff + yearly(founderOff);

const usd = (n: number, cents = false) =>
  "$" +
  n.toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 });
const less = (s: string) => "−" + s;

const css = `
@page { size: 816px 1056px; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: ${t.surface}; }
body { font-family: ${t.body}; color: ${t.text}; font-size: 12.5px; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3, .display { font-family: ${t.display}; font-weight: ${t.displayWeight}; }
.page { width: 816px; height: 1056px; position: relative; overflow: hidden; page-break-after: always; break-after: page; }
.body { padding: 26px 48px 0; }
.dark { background: ${t.dark}; color: ${t.darkText}; }
.pattern-dark { background-image: ${t.patternDark}; background-size: 56px 98px; }
.pattern-light { background-image: ${t.patternLight}; background-size: 56px 98px; }
.accent { color: ${t.accent}; }
.chip { display: inline-flex; align-items: center; border-radius: 999px; padding: 4px 12px; font-weight: 800; font-size: 11px; background: ${t.accent}; color: ${t.accentText}; }
.chip.soft { background: ${t.soft}; color: ${t.softText}; }
.chip.small { padding: 2px 9px; font-size: 10px; vertical-align: 1px; margin-left: 6px; }

.hero { padding: 30px 48px 28px; display: flex; justify-content: space-between; align-items: center; gap: 24px; }
.hero .brand { display: flex; align-items: center; gap: 20px; }
.hero .logo { width: 96px; height: 96px; border-radius: 50%; border: 3px solid ${t.accent}; }
.hero h1 { font-size: 34px; line-height: 1.05; margin-top: 10px; }
.hero .meta { display: grid; grid-template-columns: auto auto; gap: 4px 14px; font-size: 12px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.22); border-radius: 18px; padding: 14px 18px; }
.hero .meta dt { color: ${t.darkMuted}; font-weight: 700; }
.hero .meta dd { font-weight: 800; text-align: right; }

.parties { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.party { background: #fff; border: 1px solid ${t.soft}; border-radius: 16px; padding: 12px 16px; }
.party .label { font-size: 10.5px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: ${t.muted}; opacity: .8; }
.party .name { font-family: ${t.display}; font-weight: ${t.displayWeight}; font-size: 17px; margin-top: 2px; }
.party .sub { font-weight: 700; color: ${t.muted}; }

.intro { margin-top: 16px; font-size: 13.5px; font-weight: 600; color: ${t.softText}; }
h2 { font-size: 21px; margin-top: 22px; display: flex; align-items: center; gap: 10px; }
h2::before { content: ""; width: 14px; height: 16px; background: ${t.accent}; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); }
.lead { color: ${t.muted}; font-weight: 600; margin-top: 4px; }

.cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 12px; }
.card { background: #fff; border: 1px solid ${t.soft}; border-radius: 20px; padding: 18px 20px; }
.card h3 { font-size: 17px; }
.card .kind { font-size: 11px; font-weight: 800; color: ${t.muted}; }
.price { display: flex; align-items: baseline; gap: 10px; margin-top: 8px; }
.price .now { font-family: ${t.display}; font-weight: ${t.displayWeight}; font-size: 34px; line-height: 1; }
.price .was { font-weight: 800; color: ${t.muted}; text-decoration: line-through; opacity: .7; font-size: 15px; }
.price .unit { font-weight: 700; color: ${t.muted}; }
.lines { margin-top: 10px; border-top: 1px dashed ${t.soft}; padding-top: 8px; display: grid; gap: 3px; font-weight: 700; }
.lines div { display: flex; justify-content: space-between; }
.lines .off { color: #1d7a4f; }
ul.check { list-style: none; margin-top: 10px; display: grid; gap: 5px; }
ul.check li { display: flex; gap: 8px; font-weight: 600; color: ${t.softText}; }
ul.check li::before { content: ""; flex: none; width: 8px; height: 8px; margin-top: 5px; border-radius: 3px; background: ${t.accent}; }
ul.check.two { grid-template-columns: 1fr 1fr; gap: 8px 22px; margin-top: 0; }
ul.check.muted li::before { background: ${t.soft}; border: 1px solid ${t.muted}; }

table { width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 12px; background: #fff; border: 1px solid ${t.soft}; border-radius: 18px; overflow: hidden; }
th, td { padding: 8px 14px; text-align: right; font-variant-numeric: tabular-nums; }
th:first-child, td:first-child { text-align: left; }
thead th { background: ${t.soft}; font-size: 10.5px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; color: ${t.softText}; }
tbody td { border-top: 1px solid ${t.soft}; font-weight: 700; }
tbody tr:first-child td { border-top: 0; }
tr.off td { color: #1d7a4f; }
tr.total td { background: ${t.dark}; color: ${t.darkText}; font-weight: 800; }
tr.total td:first-child { font-family: ${t.display}; font-weight: ${t.displayWeight}; font-size: 14px; }
tr.sub td:first-child { padding-left: 30px; }
tr.school td { background: #fff7d1; font-weight: 800; }
tr.pick td { background: #fff7d1; }
td .note { display: block; font-size: 11px; font-weight: 600; color: ${t.muted}; }

.callout { margin-top: 12px; display: flex; gap: 14px; align-items: center; border-radius: 18px; padding: 14px 18px; background: #fff7d1; border: 1.5px solid ${t.accent}; }
.callout .big { font-family: ${t.display}; font-weight: ${t.displayWeight}; font-size: 28px; line-height: 1; white-space: nowrap; }
.callout p { font-weight: 700; color: ${t.softText}; }
.callout.dark { background: ${t.dark}; border-color: ${t.dark}; }
.callout.dark .big { color: ${t.accent}; }
.callout.dark p { color: ${t.darkMuted}; font-weight: 600; }
.callout.dark strong { color: ${t.darkText}; font-weight: 800; }

.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px; }
.stat { background: #fff; border: 1px solid ${t.soft}; border-radius: 16px; padding: 12px 14px; }
.stat .v { font-family: ${t.display}; font-weight: ${t.displayWeight}; font-size: 24px; line-height: 1.1; }
.stat .k { font-size: 11px; font-weight: 800; color: ${t.muted}; }
.stat.dark { background: ${t.dark}; border-color: ${t.dark}; }
.stat.dark .k { color: ${t.darkMuted}; }
.stat.honey { background: ${t.accent}; border-color: ${t.accent}; }

.steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px; }
.step { background: #fff; border: 1px solid ${t.soft}; border-radius: 16px; padding: 12px 14px; }
.step .when { font-size: 10.5px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; color: ${t.muted}; }
.step h3 { font-size: 14px; line-height: 1.2; margin-top: 3px; }

.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 12px; }
.cols h3 { font-size: 15px; }

.dev { margin-top: 18px; border-radius: 20px; padding: 18px 22px; display: grid; grid-template-columns: 1fr 250px; gap: 22px; align-items: center; }
.dev h3 { font-size: 19px; color: ${t.darkText}; }
.dev p { color: ${t.darkMuted}; font-weight: 600; margin-top: 6px; }
.dev .site { display: inline-block; margin-top: 10px; font-weight: 800; color: ${t.accent}; }
.dev .mark { text-align: center; border: 1px solid rgba(255,255,255,.25); border-radius: 16px; padding: 14px; background: rgba(255,255,255,.08); }
.dev .mark .name { font-family: ${t.display}; font-weight: ${t.displayWeight}; font-size: 30px; line-height: 1; color: ${t.darkText}; }
.dev .mark .tag { font-size: 11px; font-weight: 700; color: ${t.darkMuted}; margin-top: 6px; }

.sign { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 10px; }
.sign .who { font-weight: 800; }
.sign .line { margin-top: 34px; border-top: 1.5px solid ${t.text}; padding-top: 5px; display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: ${t.muted}; }

.footer { position: absolute; left: 48px; right: 48px; bottom: 20px; display: flex; justify-content: space-between; align-items: baseline; font-size: 10.5px; font-weight: 700; color: ${t.muted}; opacity: .8; }
.footer .end { display: flex; gap: 14px; align-items: baseline; }
.footer .credit { font-weight: 600; letter-spacing: .02em; opacity: .8; }
`;

const footer = (n: number, of: number) =>
  `<div class="footer"><span>Beehive Academy · Cotización de la plataforma escolar</span><span class="end"><span class="credit">Desarrollado por ia360.work</span><span>${n} de ${of}</span></span></div>`;

const page1 = `
<section class="page pattern-light">
  <header class="hero dark pattern-dark">
    <div class="brand">
      <img class="logo" src="../../public/brand/logo-circle.png" />
      <div>
        <span class="chip">Cotización · Octubre 2026</span>
        <h1>Plataforma escolar<br /><span class="accent">Beehive Academy</span></h1>
      </div>
    </div>
    <dl class="meta">
      <dt>Cotización</dt><dd>BH-2026-001</dd>
      <dt>Fecha</dt><dd>18 de octubre de 2026</dd>
      <dt>Válida hasta</dt><dd>15 de noviembre de 2026</dd>
    </dl>
  </header>

  <div class="body">
    <div class="parties">
      <div class="party"><p class="label">Para</p><p class="name">Beehive Academy</p><p class="sub">Dirección · Masaya, Nicaragua</p></div>
      <div class="party"><p class="label">Preparada por</p><p class="name">IA360</p><p class="sub">Diseño, desarrollo y soporte · ia360.work</p></div>
    </div>

    <p class="intro">
      Gracias por la confianza. Esta cotización cubre la puesta en marcha y el servicio de la plataforma que vieron en la
      propuesta de interfaz: una web app para familias, maestras, dirección, contabilidad y portería, que se usa desde el
      celular o la computadora sin descargar nada. Como colegio fundador, Beehive recibe precios especiales y congelados por dos años.
    </p>

    <h2>Inversión</h2>
    <div class="cards">
      <div class="card">
        <p class="kind">Pago único, al firmar</p>
        <h3>Implementación</h3>
        <div class="price"><span class="now">${usd(setup)}</span><span class="was">${usd(setupList)}</span></div>
        <div class="lines">
          <div><span>Precio regular</span><span>${usd(setupList)}</span></div>
          <div class="off"><span>Descuento de colegio fundador</span><span>${less(usd(setupOff))}</span></div>
        </div>
        <ul class="check">
          <li>Configuración de grados, secciones, materias y escala de notas</li>
          <li>Carga inicial de alumnos, familias y personal</li>
          <li>Invitaciones de acceso para todas las familias</li>
          <li>Capacitación a dirección, maestras, contabilidad y portería</li>
          <li>Acompañamiento la primera semana de clases</li>
        </ul>
      </div>
      <div class="card">
        <p class="kind">Por alumno al mes, pagada por adelantado</p>
        <h3>Cuota tecnológica</h3>
        <div class="price"><span class="now">${usd(fee, true)}</span><span class="was">${usd(feeList, true)}</span><span class="unit">por alumno</span></div>
        <div class="lines">
          <div><span>Precio regular</span><span>${usd(feeList, true)}</span></div>
          <div class="off"><span>Descuento de colegio fundador</span><span>${less(usd(founderOff, true))}</span></div>
        </div>
        <ul class="check">
          <li>Reparto sugerido: las familias aportan ${usd(familyPart, true)} y el colegio ${usd(schoolPart, true)}</li>
          <li>Usuarios de las maestras sin costo adicional</li>
          <li>Todos los módulos de la propuesta, incluido el estado de cuenta con comprobantes</li>
          <li>Servidores, respaldos diarios, soporte y actualizaciones</li>
          <li>Se paga por semestre, trimestre o año adelantado</li>
        </ul>
      </div>
    </div>

    <div class="callout dark">
      <span class="big">$0</span>
      <p><strong>Las maestras tienen su usuario sin ningún costo adicional.</strong> Cada maestra entra con su propia
      cuenta para tareas, notas, asistencia y agenda diaria. La cuota se cobra solo por alumno matriculado.</p>
    </div>

    <h2>Calendario de trabajo</h2>
    <div class="steps">
      <div class="step"><p class="when">Noviembre 2026</p><h3>Firma y pago de la implementación</h3></div>
      <div class="step"><p class="when">Nov. – dic.</p><h3>Configuración y carga de datos del colegio</h3></div>
      <div class="step"><p class="when">Enero 2027</p><h3>Pruebas con familias piloto y capacitación</h3></div>
      <div class="step"><p class="when">Febrero 2027</p><h3>Lanzamiento con el inicio de clases</h3></div>
    </div>

  </div>
  ${footer(1, 3)}
</section>`;

const page2 = `
<section class="page pattern-light">
  <div class="body" style="padding-top: 40px">
    <h2 style="margin-top: 0">Cuota tecnológica para ${students} alumnos</h2>
    <table>
      <thead><tr><th></th><th>Por alumno al mes</th><th>${students} alumnos al mes</th><th>Al año (${months} meses)</th></tr></thead>
      <tbody>
        <tr><td>Precio regular</td><td>${usd(feeList, true)}</td><td>${usd(monthly(feeList))}</td><td>${usd(yearly(feeList))}</td></tr>
        <tr class="off"><td>Descuento de colegio fundador</td><td>${less(usd(founderOff, true))}</td><td>${less(usd(monthly(founderOff)))}</td><td>${less(usd(yearly(founderOff)))}</td></tr>
        <tr class="total"><td>Cuota con descuento</td><td>${usd(fee, true)}</td><td>${usd(monthly(fee))}</td><td>${usd(annual)}</td></tr>
        <tr class="sub"><td>Aporte de las familias (sugerido)</td><td>${usd(familyPart, true)}</td><td>${usd(monthly(familyPart))}</td><td>${usd(families)}</td></tr>
        <tr class="sub school"><td>Parte del colegio</td><td>${usd(schoolPart, true)}</td><td>${usd(monthly(schoolPart))}</td><td>${usd(yearly(schoolPart))}</td></tr>
      </tbody>
    </table>
    <div class="callout">
      <span class="big">${usd(familyPart * months)} al año</span>
      <p>Sugerencia para las familias: una cuota tecnológica de ${usd(familyPart * months)} al año por alumno (unos
      C$ ${Math.round((familyPart * months * exchangeRate) / 10) * 10}), cobrada con la matrícula 2027. Así a Beehive le queda
      en ${usd(schoolPart, true)} por alumno al mes. Les entregamos el comunicado listo para enviar.</p>
    </div>

    <h2>Formas de pago</h2>
    <p class="lead">La implementación se paga al firmar. La cuota se paga por adelantado, en una de estas formas:</p>
    <table>
      <thead><tr><th>Forma de pago</th><th>Cuándo</th><th>Cada pago</th><th>Al año</th></tr></thead>
      <tbody>
        <tr class="pick"><td>Semestral <span class="chip small">Recomendada</span></td><td>Febrero y agosto</td><td>${usd(annual / 2)}</td><td>${usd(annual)}</td></tr>
        <tr><td>Trimestral</td><td>Febrero, mayo, agosto y noviembre</td><td>${usd(annual / 4)}</td><td>${usd(annual)}</td></tr>
        <tr><td>Anual por adelantado<span class="note">5 % de descuento adicional</span></td><td>Febrero</td><td>${usd(annual * (1 - annualPrepayOff), true)}</td><td>${usd(annual * (1 - annualPrepayOff), true)}</td></tr>
        <tr><td>Mensual<span class="note">Sin el descuento de colegio fundador</span></td><td>Cada mes</td><td>${usd(monthly(feeList))}</td><td>${usd(yearly(feeList))}</td></tr>
      </tbody>
    </table>

    <div class="cols">
      <div class="card">
        <h3>La cuota incluye</h3>
        <ul class="check">
          <li>Usuarios para todas las maestras, sin costo adicional</li>
          <li>Todos los módulos de la propuesta, incluido el estado de cuenta con comprobantes</li>
          <li>Servidores, base de datos y almacenamiento de fotos y archivos</li>
          <li>Respaldos diarios y protección de los datos</li>
          <li>Notificaciones en el celular y por correo</li>
          <li>Soporte en horario escolar por WhatsApp y correo</li>
          <li>Actualizaciones y mejoras sin costo adicional</li>
        </ul>
      </div>
      <div class="card">
        <h3>No incluye</h3>
        <ul class="check muted">
          <li>Módulos nuevos hechos a la medida (se cotizan aparte)</li>
          <li>Pasarela de pago en línea</li>
          <li>Equipos: tablet de portería, celulares o computadoras</li>
        </ul>
      </div>
    </div>
  </div>
  ${footer(2, 3)}
</section>`;

const page3 = `
<section class="page pattern-light">
  <div class="body" style="padding-top: 40px">
    <h2 style="margin-top: 0">Primer año con pago semestral</h2>
    <table>
      <thead><tr><th>Cuándo</th><th style="text-align:left">Concepto</th><th>Monto</th></tr></thead>
      <tbody>
        <tr><td>Al firmar, antes del 15 de noviembre de 2026</td><td style="text-align:left">Implementación</td><td>${usd(setup)}</td></tr>
        <tr><td>Febrero 2027, con el inicio de clases</td><td style="text-align:left">Cuota de febrero a julio</td><td>${usd(annual / 2)}</td></tr>
        <tr><td>Agosto 2027</td><td style="text-align:left">Cuota de agosto 2027 a enero 2028</td><td>${usd(annual / 2)}</td></tr>
        <tr class="total"><td>Total del primer año</td><td></td><td>${usd(year1)}</td></tr>
      </tbody>
    </table>
    <div class="stats">
      <div class="stat"><p class="v">${usd(year1)}</p><p class="k">Total del primer año</p></div>
      <div class="stat"><p class="v">${usd(families)}</p><p class="k">Lo aportan las familias</p></div>
      <div class="stat dark"><p class="v">${usd(schoolNet)}</p><p class="k">Costo neto para Beehive (unos ${usd(Math.round(schoolNet / months))} al mes)</p></div>
      <div class="stat honey"><p class="v">${usd(founderSavings)}</p><p class="k">Ahorro como colegio fundador en el primer año</p></div>
    </div>

    <h2>Condiciones</h2>
    <div class="card" style="margin-top: 12px">
      <ul class="check two">
        <li>Precios en dólares de EE. UU. No incluyen IVA.</li>
        <li>Precio congelado en los años escolares 2027 y 2028.</li>
        <li>Contrato mínimo de 2 años escolares. Si termina antes, se cobra el descuento de implementación (${usd(setupOff)}).</li>
        <li>La cuota se calcula con la matrícula al inicio de cada periodo de pago, con un mínimo de ${minStudents} alumnos.</li>
        <li>Pagos por transferencia bancaria contra factura.</li>
        <li>Los datos son del colegio y se pueden exportar cuando lo pidan.</li>
      </ul>
    </div>

    <div class="dev dark pattern-dark">
      <div>
        <h3>Desarrollado por IA360</h3>
        <p>IA360 diseña, construye, pone en marcha y mantiene la plataforma de Beehive Academy. Es el mismo equipo que
        preparó la propuesta de interfaz y el que les dará soporte: un solo responsable de principio a fin, sin intermediarios.</p>
        <span class="site">ia360.work</span>
      </div>
      <div class="mark"><p class="name">IA360</p><p class="tag">Responsable del proyecto</p></div>
    </div>

    <h2>Aceptación</h2>
    <div class="sign">
      <div><p class="who">Por Beehive Academy</p><div class="line"><span>Nombre y firma</span><span>Fecha</span></div></div>
      <div><p class="who">Por IA360</p><div class="line"><span>Nombre y firma</span><span>Fecha</span></div></div>
    </div>
  </div>
  ${footer(3, 3)}
</section>`;

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"/>
<title>Beehive Academy · Cotización</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${t.fontsHref}" rel="stylesheet">
<style>${css}</style></head>
<body>${page1}${page2}${page3}</body></html>`;

async function main() {
  await mkdir(outDir, { recursive: true });
  const htmlPath = path.join(outDir, "cotizacion-beehive.html");
  await writeFile(htmlPath, html);

  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.$$eval(".page", (pages) =>
    pages.flatMap((p, i) => {
      const bottom = p.getBoundingClientRect().bottom - 44;
      const last = p.querySelector(".body")?.lastElementChild?.getBoundingClientRect().bottom ?? 0;
      return last > bottom
        ? [`La página ${i + 1} se sale del margen (${Math.round(last - bottom)} px)`]
        : [];
    }),
  );
  await page.pdf({
    path: path.join(outDir, "Beehive-Academy-Cotizacion.pdf"),
    width: "816px",
    height: "1056px",
    printBackground: true,
  });
  await browser.close();

  console.log(`Cotización en ${path.relative(process.cwd(), outDir)}`);
  if (overflow.length) {
    console.error(overflow.join("\n"));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

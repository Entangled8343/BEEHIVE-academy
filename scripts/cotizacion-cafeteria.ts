/**
 * Cotización en PDF de la cafetería de Curie (versión recreo), con la identidad de Curie.
 *
 * Uso: pnpm cotizacion:cafeteria
 * Salida: docs/cotizaciones/cotizacion-cafeteria-curie.html
 *         docs/cotizaciones/Curie-Cafeteria-Cotizacion.pdf
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import { themes } from "./mockups/proposal-content";

const executablePath =
  process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const outDir = path.resolve("docs/cotizaciones");
const t = themes["curie-cafeteria"];

// Todos los montos salen de estos valores para que las tablas no se contradigan.
// Precios en dólares; cada factura se emite en córdobas al tipo de cambio oficial del día.
const setup = 600;
const setupShares = [50, 50] as const; // al firmar y a la entrega
const monthly = 90;
const months = 12;
const weeksToLaunch = 4;

const setupPayment = (i: 0 | 1) => (setup * setupShares[i]) / 100;
const year1 = setup + monthly * months;

const usd = (n: number) => "$" + n.toLocaleString("en-US");
const mint = "#e6f8ec";

const css = `
@page { size: 816px 1056px; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: ${t.surface}; }
body { font-family: ${t.body}; color: ${t.text}; font-size: 12px; line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3, .display { font-family: ${t.display}; font-weight: ${t.displayWeight}; }
.page { width: 816px; height: 1056px; position: relative; overflow: hidden; page-break-after: always; break-after: page; }
.body { padding: 24px 48px 0; }
.dark { background: ${t.dark}; color: ${t.darkText}; }
.pattern-dark { background-image: ${t.patternDark}; background-size: 140px 140px; }
.pattern-light { background-image: ${t.patternLight}; background-size: 140px 140px; }
.accent { color: ${t.accent}; font-style: italic; }
.chip { display: inline-flex; align-items: center; border-radius: 999px; padding: 4px 12px; font-weight: 700; font-size: 10.5px; background: ${t.accent}; color: ${t.accentText}; }

.hero { padding: 24px 48px 22px; display: flex; justify-content: space-between; align-items: center; gap: 24px; }
.hero .brand { display: flex; align-items: center; gap: 20px; }
.hero .logo { width: 92px; height: 92px; border-radius: 50%; }
.hero h1 { font-size: 40px; line-height: 1; margin-top: 10px; }
.hero .tag { margin-top: 6px; font-weight: 600; color: ${t.darkMuted}; }
.hero .meta { display: grid; grid-template-columns: auto auto; gap: 4px 14px; font-size: 11.5px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.22); border-radius: 18px; padding: 14px 18px; }
.hero .meta dt { color: ${t.darkMuted}; font-weight: 600; white-space: nowrap; }
.hero .meta dd { font-weight: 700; text-align: right; white-space: nowrap; }

.parties { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.party { background: #fff; border: 1px solid ${t.soft}; border-radius: 16px; padding: 12px 16px; }
.party .label { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: ${t.muted}; }
.party .name { font-family: ${t.display}; font-weight: ${t.displayWeight}; font-size: 18px; margin-top: 2px; }
.party .sub { font-weight: 600; color: ${t.muted}; }

.intro { margin-top: 14px; font-size: 13px; font-weight: 500; color: ${t.softText}; }
h2 { font-size: 23px; margin-top: 16px; display: flex; align-items: center; gap: 10px; }
h2::before { content: ""; width: 15px; height: 15px; background: ${t.accent}; clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%); }

.flow { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px; }
.flow .step { background: #fff; border: 1px solid ${t.soft}; border-radius: 16px; padding: 12px 14px; }
.flow .n { width: 26px; height: 26px; display: grid; place-items: center; border-radius: 50%; background: ${t.dark}; color: ${t.accent}; font-weight: 700; font-size: 12px; }
.flow h3 { font-size: 16px; line-height: 1.15; margin-top: 8px; }
.flow p { font-size: 11px; font-weight: 500; color: ${t.softText}; margin-top: 4px; }

.cards { display: grid; gap: 12px; margin-top: 12px; }
.cards.two { grid-template-columns: 1fr 1fr; }
.cards.three { grid-template-columns: repeat(3, 1fr); }
.card { background: #fff; border: 1px solid ${t.soft}; border-radius: 20px; padding: 16px 18px; }
.card h3 { font-size: 18px; }
.card .kind { font-size: 10.5px; font-weight: 700; color: ${t.muted}; }
.price { display: flex; align-items: baseline; gap: 8px; margin-top: 6px; }
.price .now { font-family: ${t.display}; font-weight: ${t.displayWeight}; font-size: 40px; line-height: 1; }
.price .unit { font-weight: 600; color: ${t.muted}; }
.lines { margin-top: 10px; border-top: 1px dashed ${t.soft}; padding-top: 8px; display: grid; gap: 3px; font-weight: 600; }
.lines div { display: flex; justify-content: space-between; }
ul.check { list-style: none; margin-top: 10px; display: grid; gap: 5px; }
ul.check li { display: flex; gap: 8px; font-weight: 500; color: ${t.softText}; }
ul.check li::before { content: ""; flex: none; width: 7px; height: 7px; margin-top: 5px; border-radius: 50%; background: ${t.muted}; }
ul.check.two { grid-template-columns: 1fr 1fr; gap: 7px 22px; margin-top: 0; }
ul.check.muted li::before { background: transparent; border: 1.5px solid ${t.muted}; }

.callout { margin-top: 12px; display: flex; gap: 14px; align-items: center; border-radius: 18px; padding: 13px 18px; background: ${mint}; border: 1.5px solid ${t.accent}; }
.callout .big { font-family: ${t.display}; font-weight: ${t.displayWeight}; font-size: 30px; line-height: 1; white-space: nowrap; }
.callout p { font-weight: 600; color: ${t.softText}; }

.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
.cols h3 { font-size: 17px; }

.dev { margin-top: 12px; border-radius: 20px; padding: 15px 22px; }
.dev h3 { font-size: 20px; color: ${t.darkText}; }
.dev p { color: ${t.darkMuted}; font-weight: 500; margin-top: 6px; }
.dev .site { margin-left: 8px; font-family: ${t.body}; font-size: 12.5px; font-weight: 700; font-style: normal; color: ${t.accent}; }

.sign { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 6px; }
.sign .who { font-weight: 700; }
.sign .line { margin-top: 34px; border-top: 1.5px solid ${t.text}; padding-top: 5px; display: flex; justify-content: space-between; font-size: 10.5px; font-weight: 600; color: ${t.muted}; }

.footer { position: absolute; left: 48px; right: 48px; bottom: 20px; display: flex; justify-content: space-between; align-items: baseline; font-size: 10px; font-weight: 600; color: ${t.muted}; opacity: .85; }
.footer .end { display: flex; gap: 14px; align-items: baseline; }
.footer .credit { font-weight: 500; letter-spacing: .02em; opacity: .85; }
`;

const footer = (n: number, of: number) =>
  `<div class="footer"><span>Cafetería Curie · Cotización de la versión recreo</span><span class="end"><span class="credit">Desarrollado por ia360.work</span><span>${n} de ${of}</span></span></div>`;

const page1 = `
<section class="page pattern-light">
  <header class="hero dark pattern-dark">
    <div class="brand">
      <img class="logo" src="../../public/brand/curie/sello.png" />
      <div>
        <span class="chip">Cotización · Noviembre 2026</span>
        <h1>Cafetería <span class="accent">Curie</span></h1>
        <p class="tag">Versión recreo: cobro rápido, saldo de las familias y factura de cada compra</p>
      </div>
    </div>
    <dl class="meta">
      <dt>Cotización</dt><dd>CUR-CAF-001</dd>
      <dt>Fecha</dt><dd>2 de noviembre de 2026</dd>
      <dt>Válida hasta</dt><dd>30 de noviembre de 2026</dd>
    </dl>
  </header>

  <div class="body">
    <div class="parties">
      <div class="party"><p class="label">Para</p><p class="name">Cafetería del colegio</p><p class="sub">Escuela Universal Pierre y Marie Curie</p></div>
      <div class="party"><p class="label">Preparada por</p><p class="name">IA360</p><p class="sub">Diseño, desarrollo y soporte · ia360.work</p></div>
    </div>

    <p class="intro">
      Una plataforma sencilla para una cafetería pequeña que atiende a los estudiantes en el recreo de 45 minutos:
      cobrar rápido y sin filas por el vuelto, con el saldo que las familias recargan desde el celular y la factura de
      cada compra.
    </p>

    <h2>Así funciona en el recreo</h2>
    <div class="flow">
      <div class="step"><span class="n">1</span><h3>Antes del recreo</h3><p>La familia recarga el saldo: por transferencia, con la foto del comprobante, o en efectivo en la caja.</p></div>
      <div class="step"><span class="n">2</span><h3>En la fila</h3><p>La cajera toca la sección y la foto del alumno. No hace falta carné.</p></div>
      <div class="step"><span class="n">3</span><h3>Cobro en segundos</h3><p>Toca los productos, se descuenta del saldo y se emite la factura.</p></div>
      <div class="step"><span class="n">4</span><h3>En casa</h3><p>La familia ve la compra, la factura y el saldo en su celular.</p></div>
    </div>

    <h2>Qué incluye</h2>
    <div class="cards three">
      <div class="card">
        <p class="kind">En el celular</p>
        <h3>Familias</h3>
        <ul class="check">
          <li>Saldo y compras de cada hijo</li>
          <li>Recargas con foto del comprobante</li>
          <li>Límite diario por hijo</li>
          <li>Productos que la familia no permite</li>
          <li>La factura de cada compra</li>
        </ul>
      </div>
      <div class="card">
        <p class="kind">En una tablet o un celular</p>
        <h3>Caja</h3>
        <ul class="check">
          <li>Alumno por sección y foto</li>
          <li>Botones grandes con los productos</li>
          <li>Cobro con saldo o en efectivo</li>
          <li>Factura consecutiva con IVA desglosado</li>
          <li>Impresa solo cuando se pida</li>
        </ul>
      </div>
      <div class="card">
        <p class="kind">Para la dueña</p>
        <h3>Administración</h3>
        <ul class="check">
          <li>Productos y precios</li>
          <li>Existencias que bajan con cada venta</li>
          <li>Recargas por confirmar</li>
          <li>Cierre del recreo en un minuto</li>
          <li>Reporte en Excel para el contador</li>
        </ul>
      </div>
    </div>

    <div class="callout">
      <span class="big">${weeksToLaunch} semanas</span>
      <p>Desde la firma hasta el primer recreo con la plataforma: productos y alumnos, construcción, pruebas y
      capacitación. Recomendamos arrancar con el inicio de clases 2027.</p>
    </div>
  </div>
  ${footer(1, 2)}
</section>`;

const page2 = `
<section class="page pattern-light">
  <div class="body" style="padding-top: 36px">
    <h2 style="margin-top: 0">Inversión</h2>
    <div class="cards two">
      <div class="card">
        <p class="kind">Pago único</p>
        <h3>Implementación</h3>
        <div class="price"><span class="now">${usd(setup)}</span></div>
        <div class="lines">
          <div><span>Al firmar (${setupShares[0]} %)</span><span>${usd(setupPayment(0))}</span></div>
          <div><span>A la entrega (${setupShares[1]} %)</span><span>${usd(setupPayment(1))}</span></div>
        </div>
        <ul class="check">
          <li>Productos, precios y existencias cargados</li>
          <li>Alumnos por sección, con su foto</li>
          <li>Capacitación a la dueña y a las cajeras</li>
          <li>Acompañamiento en los primeros recreos</li>
        </ul>
      </div>
      <div class="card">
        <p class="kind">Servicio mensual</p>
        <h3>Mensualidad</h3>
        <div class="price"><span class="now">${usd(monthly)}</span><span class="unit">al mes</span></div>
        <ul class="check">
          <li>Servidores, base de datos y respaldo diario</li>
          <li>Soporte por WhatsApp en horario escolar</li>
          <li>Actualizaciones y mejoras</li>
          <li>Usuarios para la dueña y las cajeras</li>
          <li>App para todas las familias, sin costo por usuario</li>
        </ul>
      </div>
    </div>

    <div class="callout">
      <span class="big">${usd(year1)}</span>
      <p>en el primer año: ${usd(setup)} de implementación y ${months} mensualidades de ${usd(monthly)}, desde el primer
      recreo con la plataforma.</p>
    </div>

    <div class="cols">
      <div class="card">
        <h3>Para más adelante</h3>
        <ul class="check muted">
          <li>Facturar sin internet (por ahora, un celular con datos de respaldo)</li>
          <li>Menú de la semana con pedido de almuerzos</li>
          <li>QR o llavero para identificar al alumno</li>
        </ul>
      </div>
      <div class="card">
        <h3>Lo que aporta la cafetería</h3>
        <ul class="check muted">
          <li>Una tablet o un celular Android e internet en la caja</li>
          <li>Impresora térmica, solo si van a imprimir facturas</li>
          <li>El trámite de autorización de la facturación, con su contador</li>
        </ul>
      </div>
    </div>

    <h2>Condiciones</h2>
    <div class="card" style="margin-top: 12px">
      <ul class="check two">
        <li>Precios en dólares de EE. UU. Se facturan en córdobas al tipo de cambio oficial del Banco Central del día de la factura.</li>
        <li>La mensualidad se mantiene durante el primer año.</li>
        <li>Contrato mínimo de ${months} meses.</li>
        <li>Pagos por transferencia bancaria contra factura.</li>
        <li>Los datos son de la cafetería y se pueden exportar cuando lo pidan.</li>
      </ul>
    </div>

    <div class="dev dark pattern-dark">
      <h3>Desarrollado por IA360 <span class="site">ia360.work</span></h3>
      <p>Diseña, construye, pone en marcha y da soporte a la plataforma: un solo responsable, sin intermediarios.</p>
    </div>

    <div class="sign">
      <div><p class="who">Por la cafetería</p><div class="line"><span>Nombre y firma</span><span>Fecha</span></div></div>
      <div><p class="who">Por IA360</p><div class="line"><span>Nombre y firma</span><span>Fecha</span></div></div>
    </div>
  </div>
  ${footer(2, 2)}
</section>`;

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"/>
<title>Cafetería Curie · Cotización</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${t.fontsHref}" rel="stylesheet">
<style>${css}</style></head>
<body>${page1}${page2}</body></html>`;

async function main() {
  await mkdir(outDir, { recursive: true });
  const htmlPath = path.join(outDir, "cotizacion-cafeteria-curie.html");
  await writeFile(htmlPath, html);

  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.$$eval(".page", (pages) =>
    pages.flatMap((p, i) => {
      const bottom = p.getBoundingClientRect().bottom - 44;
      const last = p.querySelector(".body")?.lastElementChild?.getBoundingClientRect().bottom ?? 0;
      return last > bottom ? [`La página ${i + 1} se sale del margen (${Math.round(last - bottom)} px)`] : [];
    }),
  );
  await page.pdf({
    path: path.join(outDir, "Curie-Cafeteria-Cotizacion.pdf"),
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

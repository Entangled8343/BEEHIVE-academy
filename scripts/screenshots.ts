/**
 * Genera las capturas de la propuesta visual y el PDF para el cliente, por colegio.
 *
 * Uso (el build debe ser del mismo colegio):
 *   NEXT_PUBLIC_SCHOOL=curie pnpm build && pnpm start -p 3100      (en otra terminal)
 *   SCHOOL=curie BASE_URL=http://localhost:3100 pnpm screenshots
 *
 * Salida: docs/mockups/<colegio>/{movil,escritorio,tablet}/NN-slug.png
 *         docs/mockups/<colegio>/propuesta.html
 *         docs/mockups/<colegio>/<Colegio>-Propuesta.pdf
 */
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium, type Browser } from "playwright-core";
import type { SchoolId } from "../src/schools/types";
import { catalogs, type Device } from "./mockups/catalog";
import { contents, themes } from "./mockups/proposal-content";
import { buildProposalHtml, type RenderedShot } from "./mockups/proposal-html";

const base = process.env.BASE_URL ?? "http://localhost:3100";
const executablePath =
  process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const school = (process.env.SCHOOL ?? "beehive") as SchoolId;
const { sections, shots } = catalogs[school];
const outDir = path.resolve("docs/mockups", school);
const logos: Record<SchoolId, string> = { beehive: "public/brand/logo-circle.png", curie: "public/brand/curie/sello.png" };
const pdfNames: Record<SchoolId, string> = { beehive: "Beehive-Academy-Propuesta-UI.pdf", curie: "Curie-Propuesta-Plataforma.pdf" };

const viewports: Record<
  Device,
  { width: number; height: number; deviceScaleFactor: number; isMobile: boolean }
> = {
  movil: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
  escritorio: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false },
  tablet: { width: 1024, height: 768, deviceScaleFactor: 1.5, isMobile: true },
};

async function capture(browser: Browser) {
  const rendered: RenderedShot[] = [];
  const problems: string[] = [];
  const counters: Record<Device, number> = { movil: 0, escritorio: 0, tablet: 0 };

  for (const shot of shots) {
    const v = viewports[shot.device];
    const context = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: v.deviceScaleFactor,
      isMobile: v.isMobile,
      hasTouch: v.isMobile,
      locale: "es-NI",
    });
    if (shot.locale) {
      await context.addCookies([{ name: "NEXT_LOCALE", value: shot.locale, url: base }]);
    }
    const page = await context.newPage();
    page.on("pageerror", (e) => problems.push(`${shot.route} (${shot.device}): ${e.message}`));
    await page.goto(base + shot.route, { waitUntil: "load" });
    await page.waitForLoadState("networkidle", { timeout: 4000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 0) problems.push(`${shot.route} (${shot.device}): scroll horizontal de ${overflow}px`);

    if (shot.scrollTo) {
      const target = page.getByText(shot.scrollTo, { exact: true }).first();
      const box = await target.boundingBox();
      if (box) await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, box.y - 90));
    }
    if (shot.full) {
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      await page.setViewportSize({ width: v.width, height });
    }
    await page.waitForTimeout(250);

    const nn = String(++counters[shot.device]).padStart(2, "0");
    const rel = `${shot.device}/${nn}-${shot.slug}.png`;
    await page.screenshot({ path: path.join(outDir, rel) });
    rendered.push({ ...shot, file: rel });
    console.log("✓", rel);
    await context.close();
  }
  return { rendered, problems };
}

async function main() {
  await rm(outDir, { recursive: true, force: true });
  for (const d of Object.keys(viewports)) await mkdir(path.join(outDir, d), { recursive: true });

  const browser = await chromium.launch({ executablePath });
  const { rendered, problems } = await capture(browser);

  const logo = path.relative(outDir, path.resolve(logos[school]));
  const htmlPath = path.join(outDir, "propuesta.html");
  await writeFile(htmlPath, buildProposalHtml(rendered, sections, logo, themes[school], contents[school]));

  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: path.join(outDir, pdfNames[school]),
    width: "1280px",
    height: "720px",
    printBackground: true,
  });
  await browser.close();

  console.log(`\n${rendered.length} capturas + PDF en ${path.relative(process.cwd(), outDir)}`);
  if (problems.length) {
    console.error("\nProblemas encontrados:\n" + problems.map((p) => " - " + p).join("\n"));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

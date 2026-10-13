/**
 * Captura rápida de una ruta para revisión durante el desarrollo.
 * Uso: pnpm tsx scripts/shot.ts /padres movil out.png
 */
import { chromium } from "playwright-core";

const [route = "/", device = "movil", out = "shot.png"] = process.argv.slice(2);
const base = process.env.BASE_URL ?? "http://localhost:3000";
const executablePath =
  process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const viewports = {
  movil: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  escritorio: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  tablet: { width: 1024, height: 768, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true },
} as const;

async function main() {
  const browser = await chromium.launch({ executablePath });
  const v = viewports[device as keyof typeof viewports];
  const context = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: v.deviceScaleFactor,
    isMobile: v.isMobile,
    hasTouch: v.hasTouch,
    locale: "es-NI",
  });
  if (process.env.LOCALE) {
    await context.addCookies([{ name: "NEXT_LOCALE", value: process.env.LOCALE, url: base }]);
  }
  const page = await context.newPage();
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  if (overflow > 0) console.warn(`⚠ scroll horizontal de ${overflow}px en ${route} (${device})`);
  await page.screenshot({ path: out, fullPage: process.env.FULL === "1" });
  await browser.close();
  console.log("ok", out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

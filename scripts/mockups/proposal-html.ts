import type { Shot } from "./catalog";
import type { ProposalContent, ProposalTheme } from "./proposal-content";

export type RenderedShot = Shot & { file: string };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function css(t: ProposalTheme) {
  return `
@page { size: 1280px 720px; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: ${t.surface}; }
body { font-family: ${t.body}; color: ${t.text}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3, .display { font-family: ${t.display}; font-weight: ${t.displayWeight}; }
.page { width: 1280px; height: 720px; position: relative; overflow: hidden; page-break-after: always; break-after: page; padding: 48px 56px; }
.accent { color: ${t.accent}; }
.dark-bg { background: ${t.dark}; color: ${t.darkText}; }
.pattern-dark { background-image: ${t.patternDark}; background-size: ${t.patternDark.includes("140") ? "140px 140px" : "56px 98px"}; }
.pattern-light { background-image: ${t.patternLight}; background-size: ${t.patternLight.includes("140") ? "140px 140px" : "56px 98px"}; }
.chip { display: inline-flex; align-items: center; gap: 6px; border-radius: 999px; padding: 6px 14px; font-weight: 700; font-size: 13px; background: ${t.accent}; color: ${t.accentText}; }
.chip.soft { background: ${t.soft}; color: ${t.softText}; }
.footer { position: absolute; left: 56px; right: 56px; bottom: 22px; display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; font-weight: 600; color: ${t.muted}; opacity: .75; }
.footer .end { display: flex; align-items: baseline; gap: 16px; }
.footer .credit { font-size: 10.5px; font-weight: 500; letter-spacing: .02em; opacity: .7; }
.dark-bg .footer { color: ${t.darkMuted}; }

.cover { display: grid; grid-template-columns: 1fr 520px; gap: 24px; align-items: center; }
.cover-logo { width: 120px; height: 120px; }
.cover h1 { font-size: 62px; line-height: 1.02; color: ${t.darkText}; margin-top: 22px; }
.cover h1 .accent { font-style: ${t.displayWeight < 600 ? "italic" : "normal"}; }
.cover .lead { font-size: 20px; color: ${t.darkMuted}; margin-top: 18px; max-width: 560px; line-height: 1.45; }
.cover .eyebrow { margin-top: 26px; }
.cover-phones { position: relative; height: 620px; }
.cover-phones .phone { position: absolute; }
.cover-phones .p1 { left: 10px; top: 40px; transform: rotate(-6deg); }
.cover-phones .p2 { left: 250px; top: 10px; transform: rotate(5deg); }
.cover-phones img { width: 230px; height: 497px; object-fit: cover; object-position: top; }

/* Sin box-shadow con desenfoque: Chrome lo exporta al PDF como imagen con máscara y algunos visores
   (p. ej. Vista Previa de macOS) lo pintan como un rectángulo gris. */
.phone { background: ${t.phoneFrame}; border-radius: 34px; padding: 9px; }
.phone img { display: block; border-radius: 26px; }

.mobile-page { padding-top: 40px; }
.mobile-page .head { display: flex; align-items: center; gap: 14px; }
.mobile-page h2 { font-size: 32px; }
.mobile-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 18px; }
.mobile-item { display: flex; flex-direction: column; align-items: center; text-align: center; }
.mobile-item .phone img { width: 204px; height: 441px; object-fit: cover; object-position: top; }
.mobile-item h3 { font-size: 19px; margin-top: 12px; }
.mobile-item p { font-size: 13px; color: ${t.muted}; margin-top: 4px; max-width: 300px; line-height: 1.4; font-weight: 500; }

.wide-page { display: grid; grid-template-columns: 300px 1fr; gap: 36px; align-items: center; }
.wide-page h2 { font-size: 34px; line-height: 1.1; margin-top: 14px; }
.wide-page .desc { font-size: 16px; line-height: 1.5; color: ${t.muted}; margin-top: 14px; font-weight: 500; }
.wide-page .device-label { margin-top: 22px; }
.browser { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid ${t.soft}; }
.browser .bar { height: 34px; display: flex; align-items: center; gap: 7px; padding: 0 14px; background: ${t.soft}; }
.browser .dot { width: 11px; height: 11px; border-radius: 50%; }
.browser .url { margin-left: 14px; flex: 1; height: 22px; border-radius: 999px; background: #fff; font-size: 11px; font-weight: 600; color: ${t.muted}; display: flex; align-items: center; padding-left: 12px; }
.browser img { display: block; width: 100%; }
.tablet { background: ${t.phoneFrame}; border-radius: 30px; padding: 16px; }
.tablet img { display: block; width: 100%; border-radius: 14px; }

.overview h2 { font-size: 40px; margin-top: 10px; }
.roles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 24px; }
.role { background: #fff; border-radius: 26px; padding: 22px; border: 1px solid ${t.soft}; }
.role h3 { font-size: 22px; }
.role .tag { display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 999px; margin-bottom: 10px; }
.role ul { list-style: none; margin-top: 10px; display: grid; gap: 7px; }
.role li { font-size: 13.5px; font-weight: 600; color: ${t.softText}; display: flex; gap: 8px; align-items: flex-start; }
.role li::before { content: ""; flex: none; width: 9px; height: 9px; margin-top: 5px; border-radius: 3px; background: ${t.accent}; }
.ribbon { display: flex; gap: 12px; margin-top: 22px; flex-wrap: wrap; }
.ribbon span { background: ${t.dark}; color: ${t.darkText}; border-radius: 999px; padding: 9px 16px; font-weight: 600; font-size: 14px; }

.feature h2 { font-size: 38px; margin-top: 10px; }
.feature .lead { font-size: 16px; color: ${t.muted}; margin-top: 8px; max-width: 900px; font-weight: 500; line-height: 1.45; }
.fgrid { display: grid; gap: 16px; margin-top: 28px; }
.fcard { background: #fff; border-radius: 22px; padding: 22px 24px; border: 1px solid ${t.soft}; }
.fcard h3 { font-size: 23px; line-height: 1.15; }
.fcard p { font-size: 15px; color: ${t.softText}; margin-top: 10px; line-height: 1.5; font-weight: 500; }
.fcard .tag { display: inline-block; margin-bottom: 10px; font-size: 11.5px; font-weight: 700; padding: 3px 10px; border-radius: 999px; background: ${t.soft}; color: ${t.softText}; }
.fcard.featured { background: ${t.dark}; border-color: ${t.dark}; }
.fcard.featured h3 { color: ${t.darkText}; }
.fcard.featured p { color: ${t.darkMuted}; }
.fcard.featured .tag { background: ${t.accent}; color: ${t.accentText}; }
.fnote { margin-top: 20px; font-size: 14px; font-weight: 600; color: ${t.muted}; }
.steps { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-top: 30px; }
.step { background: rgba(255,255,255,.08); border-radius: 22px; padding: 18px; }
.step .n { width: 40px; height: 40px; display: grid; place-items: center; background: ${t.accent}; color: ${t.accentText}; font-family: ${t.display}; font-weight: 600; font-size: 20px; border-radius: 12px; }
.step h3 { color: ${t.darkText}; font-size: 18px; margin-top: 12px; line-height: 1.15; }
.step p { color: ${t.darkMuted}; font-size: 13px; margin-top: 6px; font-weight: 500; line-height: 1.4; }
.dark-bg .ribbon span { background: rgba(255,255,255,.12); }
.note { margin-top: 26px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.25); color: ${t.accent}; padding: 14px 18px; border-radius: 18px; font-weight: 600; font-size: 14px; }
`;
}

function phone(src: string, cls = "") {
  return `<div class="phone ${cls}"><img src="${src}" /></div>`;
}

export function buildProposalHtml(
  rendered: RenderedShot[],
  sections: string[],
  logoSrc: string,
  theme: ProposalTheme,
  c: ProposalContent,
) {
  const pages: string[] = [];
  let n = 1;
  const credit = c.credit ? `<span class="credit">${esc(c.credit)}</span>` : "";
  const footer = () => `<div class="footer"><span>${esc(c.footer)}</span><span class="end">${credit}<span>${n++}</span></span></div>`;
  const byKey = (slug: string) => rendered.find((r) => r.slug === slug && r.device === "movil");

  const [s1, s2] = c.coverPhones.map(byKey);
  pages.push(`
  <section class="page cover dark-bg pattern-dark">
    <div>
      <img class="cover-logo" src="${logoSrc}" />
      <div class="eyebrow"><span class="chip">${esc(c.coverChip)}</span></div>
      <h1>${esc(c.coverTitle)}<br/><span class="accent">${esc(c.coverTitleAccent)}</span></h1>
      <p class="lead">${esc(c.coverLead)}</p>
    </div>
    <div class="cover-phones">
      ${s1 ? phone(s1.file, "p1") : ""}
      ${s2 ? phone(s2.file, "p2") : ""}
    </div>
    ${footer()}
  </section>`);

  pages.push(`
  <section class="page overview pattern-light">
    <span class="chip soft">Resumen</span>
    <h2>${esc(c.overviewTitle)}</h2>
    <div class="roles">
      ${c.roles
        .map(
          (r) => `<div class="role"><span class="tag" style="background:${r.tagBg};color:${r.tagFg}">${esc(r.tag)}</span><h3>${esc(r.title)}</h3>
        <ul>${r.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`,
        )
        .join("")}
    </div>
    <div class="ribbon">${c.ribbon.map((r) => `<span>${esc(r)}</span>`).join("")}</div>
    ${footer()}
  </section>`);

  for (const f of c.featurePages ?? []) {
    pages.push(`
  <section class="page feature pattern-light">
    <span class="chip soft">${esc(f.chip)}</span>
    <h2>${esc(f.title)}</h2>
    ${f.lead ? `<p class="lead">${esc(f.lead)}</p>` : ""}
    <div class="fgrid" style="grid-template-columns: repeat(${f.columns}, 1fr)">
      ${f.items
        .map(
          (i) => `<div class="fcard${i.featured ? " featured" : ""}">${i.tag ? `<span class="tag">${esc(i.tag)}</span>` : ""}<h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`,
        )
        .join("")}
    </div>
    ${f.note ? `<p class="fnote">${esc(f.note)}</p>` : ""}
    ${footer()}
  </section>`);
  }

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
          ${chunk.map((s) => `<div class="mobile-item">${phone(s.file)}<h3>${esc(s.title)}</h3><p>${esc(s.description)}</p></div>`).join("")}
        </div>
        ${footer()}
      </section>`);
    }
    for (const s of wide) {
      const frame =
        s.device === "tablet"
          ? `<div class="tablet"><img src="${s.file}" /></div>`
          : `<div class="browser"><div class="bar"><span class="dot" style="background:#ef5b4c"></span><span class="dot" style="background:#f7d23e"></span><span class="dot" style="background:#2fae7a"></span><span class="url">🔒 ${esc(s.route)}</span></div><img src="${s.file}" /></div>`;
      pages.push(`
      <section class="page wide-page">
        <div>
          <span class="chip">${esc(section)}</span>
          <h2>${esc(s.title)}</h2>
          <p class="desc">${esc(s.description)}</p>
          <div class="device-label"><span class="chip soft">${s.device === "tablet" ? "📟 Tablet" : "💻 Computadora"}</span></div>
        </div>
        <div>${frame}</div>
        ${footer()}
      </section>`);
    }
  }

  pages.push(`
  <section class="page dark-bg pattern-dark">
    <img src="${logoSrc}" style="width:84px;height:84px" />
    <h2 style="font-size:44px;color:${theme.darkText};margin-top:16px">Próximos pasos</h2>
    <div class="steps">
      ${c.steps.map(([t, d], i) => `<div class="step"><div class="n">${i + 1}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}
    </div>
    <div class="ribbon" style="margin-top:26px">${c.tech.map((r) => `<span>${esc(r)}</span>`).join("")}</div>
    <p class="note">${esc(c.note)}</p>
    ${footer()}
  </section>`);

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"/>
<title>${esc(c.docTitle)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${theme.fontsHref}" rel="stylesheet">
<style>${css(theme)}</style></head>
<body>${pages.join("\n")}</body></html>`;
}

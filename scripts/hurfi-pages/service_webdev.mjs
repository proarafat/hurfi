#!/usr/bin/env node
/**
 * The Website Development service page in both languages, from one content file:
 *   content/service-webdev.mjs  ->  services/website-development/index.html   (English source page)
 *                                   zh/services/website-development/index.html (Chinese twin, hand-made)
 * Same layout in both languages. The Chinese page is written here (not by the dictionary), so whole
 * sentences with bold keywords and inline links are translated as sentences. zh_mirror.mjs lists this
 * page in HANDMADE and keeps the Chinese file as it is; scripts/site/build.mjs then builds / and /en/.
 * Styles: assets/css/webdev.css. Images: assets/img/opt/wd-*.webp (hero slider) and assets/img/locations/.
 *
 *   node scripts/hurfi-pages/service_webdev.mjs
 *
 * Idempotent: a second run changes nothing.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import * as P from "./content/service-webdev.mjs";
import { IMAGES } from "./content/service-cities-layout.mjs";
import { PRICING } from "../site/config.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const SITE = "https://hurfi.com";
const ORG_ID = SITE + "/#organization";
const rd = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8").replace(/\r\n/g, "\n");
const written = [];
function wr(rel, text) {
  const p = path.join(ROOT, rel);
  let eol = "\n";
  if (fs.existsSync(p)) {
    const raw = fs.readFileSync(p, "utf8");
    if (raw.replace(/\r\n/g, "\n") === text) return;
    if ((raw.match(/\r\n/g) || []).length > raw.split("\n").length / 2) eol = "\r\n";
  }
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, eol === "\n" ? text : text.replace(/\n/g, "\r\n"));
  written.push(rel);
}
const E = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The price in the copy must match the single source of truth.
const priceCfg = PRICING.items.find((i) => i.key === "website-development").price;
if (!P.COST.price.en.includes(priceCfg) || !P.COST.price.zh.includes(priceCfg)) throw new Error(`price in content (${P.COST.price.en}) differs from config.mjs (${priceCfg})`);

/* ------------------------------------------------------------ language */
const LANGS = {
  en: { key: "en", file: "services/website-development/index.html", url: SITE + "/services/website-development/", tpl: "services/seo/index.html" },
  zh: { key: "zh", file: "zh/services/website-development/index.html", url: SITE + "/zh/services/website-development/", tpl: "zh/services/seo/index.html" },
};
let L = LANGS.en;
const t = (x) => (x && typeof x === "object" && "en" in x ? x[L.key] : x);
/** site path in the current language (Chinese twins live under /zh/ in the source tree) */
const href = (u) => (L.key === "zh" && u.startsWith("/") && !u.startsWith("/assets/") && !u.startsWith("/zh/") ? "/zh" + u : u);
function linkTag(text, u) {
  if (/^https?:/.test(u)) {
    const rel = /hostinger\.com/.test(u) ? "sponsored noopener" : "noopener";
    return `<a href="${E(u)}" target="_blank" rel="${rel}">${text}</a>`;
  }
  return `<a href="${E(href(u))}">${text}</a>`;
}
/** inline markup: **bold** and [text](url) */
const md = (x) => E(t(x)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, a, u) => linkTag(a, u));
const plain = (x) => t(x).replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
const paras = (list, ind) => list.map((x) => `${ind}<p>${md(x)}</p>\n`).join("");

/* ------------------------------------------------------------ icons (stroke, 24px grid) */
const ICON = {
  layout: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
  factory: '<path d="M3 21V10l6 4V10l6 4V6l6 3v12z"/><path d="M7 17h2M12 17h2M17 17h1"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M11 21v-3h2v3"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.5 4.5L21 15"/><path d="M21 20v-5h-5"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13 7 4 4"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.4 11h11l2-8H6.2"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.6c2.8.2 5 2.3 5 5.4"/>',
  server: '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  check: '<path d="m5 12.5 4.2 4.2L19 7"/>',
  alert: '<path d="M12 3 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  out: '<path d="M7 17 17 7M9 7h8v8"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  wrench: '<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5"/><path d="M14.5 6.5 17 4l3 3-2.5 2.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
};
const icon = (n, cls = "wd-ic") => `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON[n]}</svg>`;

/* ------------------------------------------------------------ images */
function photo(key, cls, sizes) {
  const im = IMAGES[key];
  const alt = t(im.alt[0] !== undefined ? { en: im.alt[0], zh: im.alt[1] } : im.alt);
  const c = im.credit;
  const credit = c ? `<figcaption class="wd-credit">${L.key === "zh" ? "图片" : "Photo"}: <a href="${E(c.page)}" target="_blank" rel="noopener">${E(c.author)}</a>, <a href="${E(c.licenseUrl)}" target="_blank" rel="noopener">${E(c.license)}</a></figcaption>` : "";
  return `<figure class="${cls}"><img src="${im.src}" alt="${E(alt)}" width="${im.w}" height="${im.h}" loading="lazy" decoding="async"${sizes ? ` sizes="${sizes}"` : ""}>${credit}</figure>`;
}

/* ------------------------------------------------------------ sections */
const sec = (id, cls, inner) => `    <section class="wd-sec ${cls}" id="${id}" aria-labelledby="${id}-title">
      <div class="wd-wrap">
${inner}      </div>
    </section>
`;
let secNo = 0;
const eyebrow = () => `<p class="wd-eyebrow"><span>${String(++secNo).padStart(2, "0")}</span></p>`;

function hero() {
  const H = P.HERO;
  const slides = H.slides.map((s, i) => `            <figure class="wd-slide"><img src="/assets/img/opt/wd-${s.name}-960.webp" srcset="/assets/img/opt/wd-${s.name}-560.webp 560w, /assets/img/opt/wd-${s.name}-960.webp 960w" sizes="(max-width: 960px) 92vw, 560px" alt="${E(t(s.alt))}" width="960" height="600" ${i === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async"><figcaption>${E(t(s.label))}</figcaption></figure>\n`).join("");
  const dots = H.slides.map(() => "<i></i>").join("");
  const chips = H.chips.map((c, i) => `<li>${icon(["check", "chat", "server"][i])}${E(t(c))}</li>`).join("");
  const crumbs = [[{ en: "Home", zh: "首页" }, "/"], [{ en: "Services", zh: "服务" }, "/services/"]].map(([n, u]) => `<li><a href="${href(u)}">${E(t(n))}</a></li>`).join("") + `<li><span aria-current="page">${E(t(P.META.crumb))}</span></li>`;
  return `    <header class="wd-hero" aria-labelledby="wd-h1">
      <div class="wd-wrap wd-hero-grid">
        <div class="wd-hero-copy">
          <nav class="wd-crumbs" aria-label="${L.key === "zh" ? "面包屑导航" : "Breadcrumb"}"><ol>${crumbs}</ol></nav>
          <p class="wd-kicker">${E(t(H.kicker))}</p>
          <h1 id="wd-h1">${E(t(H.h1))}</h1>
          <p class="wd-lead">${md(H.paras[0])}</p>
${paras(H.paras.slice(1), "          ")}          <div class="wd-actions">
            <a class="wd-btn wd-btn--primary" href="${href("/book-consultation/")}#book-form">${E(t(H.cta))} ${icon("arrow", "wd-ic wd-ic--btn")}</a>
            <a class="wd-btn wd-btn--ghost" href="${href("/projects/")}">${E(t(H.cta2))}</a>
          </div>
          <ul class="wd-chips">${chips}</ul>
        </div>
        <div class="wd-hero-media">
          <div class="wd-browser" role="group" aria-label="${E(t(H.sliderLabel))}">
            <div class="wd-browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>${E(t(H.sliderLabel))}</span></div>
            <div class="wd-slides">
${slides}            </div>
          </div>
          <div class="wd-dots" aria-hidden="true">${dots}</div>
          <p class="wd-float" aria-hidden="true">${icon("check")}${E(t(H.floatNote))}</p>
        </div>
      </div>
    </header>
`;
}

function toc() {
  const items = [
    ["services", { en: "Services", zh: "服务内容" }], ["why-b2b-website", { en: "Why it matters", zh: "为什么重要" }],
    ["website-problems", { en: "Website problems", zh: "网站问题" }], ["export-ready-website", { en: "Export-ready checklist", zh: "出口网站要素" }],
    ["technology-options", { en: "Technology", zh: "技术选型" }], ["why-hurfi", { en: "Why Hurfi", zh: "选择 Hurfi" }],
    ["process", { en: "Process", zh: "建设流程" }], ["squoobee", { en: "Case study", zh: "项目案例" }],
    ["cost", { en: "Cost", zh: "费用" }], ["across-china", { en: "Across China", zh: "服务城市" }], ["faq", { en: "FAQ", zh: "常见问答" }],
  ];
  return `    <nav class="wd-toc" aria-label="${L.key === "zh" ? "本页目录" : "On this page"}">
      <div class="wd-wrap"><ul>${items.map(([id, n]) => `<li><a href="#${id}">${E(t(n))}</a></li>`).join("")}</ul></div>
    </nav>
`;
}

function services() {
  const S = P.SERVICES;
  const card = (c, i) => {
    const media = c.img ? photo(c.img, "wd-card-media") : "";
    const cls = ["wd-card", c.img ? "wd-card--media" : "", i === 0 ? "wd-span2" : "", c.wide ? "wd-card--wide" : ""].filter(Boolean).join(" ");
    if (c.wide) return `          <article class="${cls}">
            <div class="wd-card-side">${icon(c.icon, "wd-ic wd-ic--tile")}<h3>${E(t(c.h3))}</h3></div>
            <div class="wd-card-body">
${paras(c.paras, "              ")}            </div>
          </article>
`;
    return `          <article class="${cls}">${media}
            <div class="wd-card-body">
              ${icon(c.icon, "wd-ic wd-ic--tile")}
              <h3>${E(t(c.h3))}</h3>
${paras(c.paras, "              ")}            </div>
          </article>
`;
  };
  return sec(S.id, "wd-services", `        <div class="wd-head">
          ${eyebrow()}
          <h2 id="${S.id}-title">${E(t(S.h2))}</h2>
${paras(S.paras, "          ")}        </div>
        <div class="wd-bento">
${S.cards.map(card).join("")}        </div>
`);
}

function why() {
  const W = P.WHY;
  return sec(W.id, "wd-why", `        <div class="wd-why-grid">
          <div class="wd-head wd-head--left">
            ${eyebrow()}
            <h2 id="${W.id}-title">${E(t(W.h2))}</h2>
${paras(W.paras, "            ")}          </div>
          <div class="wd-qcard">
            <p class="wd-qcard-title">${icon("chat", "wd-ic wd-ic--tile")}${E(t(W.listIntro))}</p>
            <ol class="wd-qlist">
${W.list.map((q) => `              <li>${md(q)}</li>\n`).join("")}            </ol>
          </div>
        </div>
        <div class="wd-band">
          ${photo(W.img, "wd-band-media")}
          <div class="wd-band-copy">
${paras(W.after, "            ")}          </div>
        </div>
`);
}

function problems() {
  const R = P.PROBLEMS;
  const items = R.items.map((p, i) => `          <article class="wd-prob">
            <p class="wd-prob-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</p>
            <div>
              <h3>${icon("alert", "wd-ic wd-ic--warn")}${E(t(p.h3))}</h3>
${paras(p.paras, "              ")}            </div>
          </article>
`).join("");
  return sec(R.id, "wd-problems", `        <div class="wd-split">
          <div class="wd-split-aside">
            <div class="wd-sticky">
              ${eyebrow()}
              <h2 id="${R.id}-title">${E(t(R.h2))}</h2>
              ${photo(R.img, "wd-aside-media")}
            </div>
          </div>
          <div class="wd-prob-list">
${items}          </div>
        </div>
`);
}

function exportReady() {
  const X = P.EXPORT_READY, K = X.sketch;
  const items = X.items.map((it, i) => {
    let extra = "";
    if (it.rfq) extra = `              <p class="wd-fields-intro">${md(it.fieldsIntro)}</p>
              <ul class="wd-fields">${it.fields.map((f) => `<li>${E(t(f))}</li>`).join("")}</ul>
${paras(it.after, "              ")}`;
    return `          <li class="wd-ready-item">
            <span class="wd-ready-num" aria-hidden="true">${i + 1}</span>
            <div>
              <h3>${E(t(it.h3))}</h3>
${paras(it.paras, "              ")}${extra}            </div>
          </li>
`;
  }).join("");
  const sketch = `<div class="wd-sketch" aria-hidden="true">
              <div class="wd-sk-bar"><i></i><i></i><i></i></div>
              <div class="wd-sk-body">
                <div class="wd-sk-nav"><b></b><b></b><b></b><b></b><b class="is-cta"></b></div>
                <div class="wd-sk-product">
                  <div class="wd-sk-photo">${icon("factory", "wd-ic")}</div>
                  <div class="wd-sk-info"><b class="wd-sk-h"></b><b class="wd-sk-t"></b><span class="wd-sk-tag"><em>1</em>${E(t(K.specs))}</span><div class="wd-sk-table"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
                </div>
                <div class="wd-sk-row"><span class="wd-sk-pill"><em>2</em>${E(t(K.cert))}</span><span class="wd-sk-pill"><em>3</em>${E(t(K.moq))}</span></div>
                <div class="wd-sk-form"><i></i><i></i><i></i><span class="wd-sk-btn"><em>4</em>${E(t(K.quote))}</span></div>
              </div>
            </div>`;
  return sec(X.id, "wd-ready", `        <div class="wd-head">
          ${eyebrow()}
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
          <p>${md(X.intro)}</p>
        </div>
        <div class="wd-split wd-split--ready">
          <div class="wd-split-aside">
            <div class="wd-sticky">
            ${sketch}
            </div>
          </div>
          <ol class="wd-ready-list">
${items}          </ol>
        </div>
`);
}

function tech() {
  const X = P.TECH;
  const cards = X.cards.map((c) => `          <article class="wd-card wd-tech-card">
            <div class="wd-card-body">
              ${icon(c.icon, "wd-ic wd-ic--tile")}
              <h3>${E(t(c.h3))}</h3>
${paras(c.paras, "              ")}${c.tags ? `              <ul class="wd-tags">${c.tags.map((g) => `<li>${E(t(g))}</li>`).join("")}</ul>\n` : ""}            </div>
          </article>
`).join("");
  return sec(X.id, "wd-tech", `        <div class="wd-head">
          ${eyebrow()}
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "          ")}        </div>
        <div class="wd-grid3">
${cards}        </div>
`);
}

function choose() {
  const X = P.CHOOSE;
  const cards = X.cards.map((c) => {
    const cls = ["wd-card", "wd-why-card", c.hostinger ? "wd-span2 wd-card--host" : "", c.cta ? "wd-card--cta" : ""].filter(Boolean).join(" ");
    const badge = c.hostinger ? `<a class="wd-host-badge" href="https://www.hostinger.com?REFERRALCODE=DSZYASIRA579" target="_blank" rel="sponsored noopener"><img src="/assets/img/partners/hostinger-partner-brand-dark.svg" alt="${L.key === "zh" ? "Hostinger 官方合作伙伴机构徽章" : "Official Hostinger Agency Partner badge"}" width="160" height="60" loading="lazy" decoding="async"></a>` : "";
    const note = c.hostinger ? `              <p class="wd-note">${E(t(X.referralNote))}</p>\n` : "";
    const cta = c.cta ? `              <p><a class="wd-btn wd-btn--primary" href="${href(c.cta[1])}">${E(t(c.cta[0]))} ${icon("arrow", "wd-ic wd-ic--btn")}</a></p>\n` : "";
    return `          <article class="${cls}">
            <div class="wd-card-body">
              ${c.hostinger ? badge : icon(c.icon, "wd-ic wd-ic--tile")}
              <h3>${E(t(c.h3))}</h3>
${paras(c.paras, "              ")}${note}${cta}            </div>
          </article>
`;
  }).join("");
  return sec(X.id, "wd-choose", `        <div class="wd-head">
          ${eyebrow()}
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
        </div>
        <div class="wd-grid3">
${cards}        </div>
`);
}

function process_() {
  const X = P.PROCESS;
  const steps = X.steps.map((s, i) => `          <li class="wd-step">
            <p class="wd-step-num"><span>${E(t(X.stepLabel))}</span> ${String(i + 1).padStart(2, "0")}</p>
            <h3>${E(t(s.h3))}</h3>
${paras(s.paras, "            ")}          </li>
`).join("");
  return sec(X.id, "wd-process", `        <div class="wd-head">
          ${eyebrow()}
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
        </div>
        <ol class="wd-steps">
${steps}        </ol>
`);
}

function caseStudy() {
  const X = P.CASE;
  return sec(X.id, "wd-case", `        <div class="wd-case-grid">
          <figure class="wd-case-media">
            <div class="wd-browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>squoobee.com</span></div>
            <img src="/assets/img/projects/squoobee.webp" alt="${E(t(P.HERO.slides[0].alt))}" width="1200" height="750" loading="lazy" decoding="async">
          </figure>
          <div class="wd-case-copy">
            <p class="wd-kicker">${E(t(X.kicker))}</p>
            <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "            ")}            <ul class="wd-tags wd-tags--case">${X.features.map((f) => `<li>${icon("check", "wd-ic")}${E(t(f))}</li>`).join("")}</ul>
            <div class="wd-actions">
              <a class="wd-btn wd-btn--primary" href="https://squoobee.com" target="_blank" rel="noopener">${E(t(X.visit))} ${icon("out", "wd-ic wd-ic--btn")}</a>
            </div>
            <p class="wd-more">${md(X.more)}</p>
          </div>
        </div>
`);
}

function cost() {
  const X = P.COST;
  return sec(X.id, "wd-cost", `        <div class="wd-head">
          ${eyebrow()}
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
        </div>
        <div class="wd-cost-grid">
          <div class="wd-price">
            <p>${md(X.intro)}</p>
            <p class="wd-price-big">${E(t(X.price))}</p>
${paras(X.paras, "            ")}            <p><a class="wd-btn wd-btn--primary" href="${href("/book-consultation/")}#book-form">${E(t(X.cta))} ${icon("arrow", "wd-ic wd-ic--btn")}</a></p>
          </div>
          <div class="wd-factors">
            <p class="wd-factors-title">${md(X.factorsIntro)}</p>
            <ul>${X.factors.map((f) => `<li>${icon("plus", "wd-ic")}${E(t(f))}</li>`).join("")}</ul>
            <p>${md(X.after)}</p>
          </div>
        </div>
`);
}

function china() {
  const X = P.CHINA;
  const cards = X.cities.map((c) => `            <a class="wd-city" href="${href(c.url)}">${photo(c.img, "wd-city-media")}<span class="wd-city-name">${icon("pin", "wd-ic")}${E(t(c.name))}${icon("arrow", "wd-ic wd-ic--go")}</span></a>
`).join("");
  return sec(X.id, "wd-china", `        <div class="wd-china-grid">
          <div class="wd-head wd-head--left">
            ${eyebrow()}
            <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "            ")}            <p>${md(X.after)}</p>
          </div>
          <div class="wd-cities">
            <p class="wd-cities-title">${md(X.cityIntro)}</p>
${cards}          </div>
        </div>
`);
}

function redesign() {
  const X = P.REDESIGN;
  const box = (b, ic, cls) => `          <article class="wd-card wd-choice ${cls}">
            <div class="wd-card-body">
              ${icon(ic, "wd-ic wd-ic--tile")}
              <h3>${E(t(b.label))}</h3>
              <p>${md(b.text)}</p>
            </div>
          </article>
`;
  return sec(X.id, "wd-redesign", `        <div class="wd-head">
          ${eyebrow()}
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "          ")}        </div>
        <div class="wd-grid2">
${box(X.improve, "wrench", "wd-choice--improve")}${box(X.rebuild, "layout", "wd-choice--new")}        </div>
        <p class="wd-center-note">${icon("search", "wd-ic")}${md(X.after)}</p>
`);
}

function faq() {
  const X = P.FAQ;
  const items = X.items.map(([q, a], i) => `          <details class="wd-faq-item"${i === 0 ? " open" : ""}>
            <summary><span>${E(t(q))}</span>${icon("plus", "wd-ic wd-faq-ic")}</summary>
            <p>${md(a)}</p>
          </details>
`).join("");
  return sec(X.id, "wd-faq", `        <div class="wd-head">
          ${eyebrow()}
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
        </div>
        <div class="wd-faq-list">
${items}        </div>
`);
}

function final() {
  const X = P.FINAL;
  return `    <section class="wd-sec wd-final" id="${X.id}" aria-labelledby="${X.id}-title">
      <div class="wd-wrap">
        <div class="wd-final-card">
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "          ")}          <p class="wd-actions wd-actions--center"><a class="wd-btn wd-btn--light" href="${href("/book-consultation/")}#book-form">${E(t(X.cta))} ${icon("arrow", "wd-ic wd-ic--btn")}</a></p>
          <ul class="wd-contact">
            <li>${icon("phone", "wd-ic")}<strong>${E(t(X.phoneLabel))}</strong> <a href="tel:+8617792239260">+86 17792239260</a></li>
            <li>${icon("mail", "wd-ic")}<strong>${E(t(X.emailLabel))}</strong> <a href="mailto:yasir@hurfi.com">yasir@hurfi.com</a></li>
          </ul>
          <p class="wd-final-close">${md(X.closing)}</p>
        </div>
      </div>
    </section>
`;
}

function related() {
  const X = P.RELATED;
  return `    <section class="wd-sec wd-related" id="${X.id}" aria-labelledby="${X.id}-title">
      <div class="wd-wrap">
        <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
        <div class="wd-related-grid">
          <div class="wd-related-col">
            <h3>${icon("book", "wd-ic")}${E(t(X.guidesTitle))}</h3>
            <ul class="wd-linklist">${X.guides.map(([u, n]) => `<li><a href="${href(u)}">${E(t(n))}</a></li>`).join("")}</ul>
          </div>
          <div class="wd-related-col">
            <h3>${icon("factory", "wd-ic")}${E(t(X.industriesTitle))}</h3>
            <ul class="wd-tags wd-tags--links">${X.industries.map(([u, n]) => `<li><a href="${href(u)}">${E(t(n))}</a></li>`).join("")}</ul>
          </div>
          <div class="wd-related-col">
            <h3>${icon("grid", "wd-ic")}${E(t(X.servicesTitle))}</h3>
            <ul class="wd-svc-list">${X.services.map(([u, n, d]) => `<li><a href="${href(u)}"><strong>${E(t(n))}</strong><span>${E(t(d))}</span></a></li>`).join("")}</ul>
            <p><a class="wd-more-link" href="${href("/services/")}">${E(t(X.allServices))} ${icon("arrow", "wd-ic wd-ic--btn")}</a></p>
          </div>
        </div>
      </div>
    </section>
`;
}

/* ------------------------------------------------------------ head + JSON-LD */
const TPL_EN = rd(LANGS.en.tpl);
const GTM_HEAD = TPL_EN.slice(TPL_EN.indexOf("<head>\n") + 7, TPL_EN.indexOf("  <meta charset"));
const GTM_BODY = (() => { const b = TPL_EN.indexOf('<body data-page="service">\n') + 27; return TPL_EN.slice(b, TPL_EN.indexOf('  <header class="site-header">')); })();
const CSS_LINKS = [...TPL_EN.matchAll(/  <link rel="stylesheet" href="\/assets\/css\/(?:style|hurfi-pages)\.css\?v=[^"]+">\n/g)].map((m) => m[0]).join("");
const FONT_LINKS = TPL_EN.slice(TPL_EN.indexOf('  <link rel="preconnect" href="https://fonts.googleapis.com">'), TPL_EN.indexOf("  <link rel=\"stylesheet\" href=\"/assets/css/style.css"));
const ORG = (() => {
  for (const m of TPL_EN.matchAll(/<script type="application\/ld\+json">(\{.*?\})<\/script>/g)) {
    const o = JSON.parse(m[1].replace(/<\\\//g, "</"));
    if (o["@type"] === "Organization" && o["@id"] === ORG_ID) return o;
  }
  throw new Error("Organization JSON-LD not found in " + LANGS.en.tpl);
})();
const jsonld = (o) => `  <script type="application/ld+json">${JSON.stringify(o).replace(/<\//g, "<\\/")}</script>\n`;
const CSS_VER = crypto.createHash("sha1").update(rd("assets/css/webdev.css")).digest("hex").slice(0, 10);

function ld() {
  const page = SITE + P.META.path; // the build maps it to / (Chinese) or /en/ (English)
  const svc = P.SERVICES.cards.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t(c.h3) } }));
  return [
    ORG,
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: t({ en: "Home", zh: "首页" }), item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: t({ en: "Services", zh: "服务" }), item: SITE + "/services/" },
      { "@type": "ListItem", position: 3, name: t(P.META.crumb), item: page }] },
    { "@context": "https://schema.org", "@type": "Service", name: t(P.META.serviceName), serviceType: t(P.META.serviceName), url: page,
      description: t(P.META.description), provider: { "@id": ORG_ID }, areaServed: { "@type": "Country", name: "China" },
      audience: { "@type": "BusinessAudience", name: t({ en: "Chinese manufacturers, exporters and industrial suppliers", zh: "中国制造商、出口企业和工业供应商" }) },
      offers: { "@type": "Offer", priceCurrency: "CNY", price: priceCfg.replace(/[^\d]/g, ""), priceSpecification: { "@type": "PriceSpecification", minPrice: Number(priceCfg.replace(/[^\d]/g, "")), priceCurrency: "CNY" }, description: t(P.COST.price) },
      hasOfferCatalog: { "@type": "OfferCatalog", name: t(P.SERVICES.h2), itemListElement: svc } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: P.FAQ.items.map(([q, a]) => ({ "@type": "Question", name: t(q), acceptedAnswer: { "@type": "Answer", text: plain(a) } })) },
  ].map(jsonld).join("");
}

function head() {
  const zh = L.key === "zh";
  const title = E(t(P.META.title)), desc = E(t(P.META.description));
  const hreflang = `  <!-- hurfi:gen:hreflang:start -->
  <link rel="alternate" hreflang="en" href="${LANGS.en.url}">
  <link rel="alternate" hreflang="zh-Hans" href="${LANGS.zh.url}">
  <link rel="alternate" hreflang="x-default" href="${LANGS.en.url}">
  <!-- hurfi:gen:hreflang:end -->
`;
  return `<!DOCTYPE html>
${zh ? "<!-- Written by scripts/hurfi-pages/service_webdev.mjs (hand-made Chinese twin, kept as is by zh_mirror.mjs). Edit content/service-webdev.mjs and rerun; do not edit this file. -->\n" : ""}<html lang="${zh ? "zh-Hans" : "en"}"${zh ? ' data-static-lang="zh"' : ""}>
<head>
${GTM_HEAD}  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${zh ? `  <meta http-equiv="content-language" content="zh-CN">
  <meta http-equiv="Cache-Control" content="no-transform">
  <meta http-equiv="Cache-Control" content="no-siteapp">
  <meta name="applicable-device" content="pc,mobile">
` : ""}  <title>${title}</title>
  <meta name="description" content="${desc}">
${zh ? `  <meta name="keywords" content="${E(P.META.keywordsZh)}">\n` : ""}${FONT_LINKS}${CSS_LINKS}  <link rel="stylesheet" href="/assets/css/webdev.css?v=${CSS_VER}">
  <meta name="theme-color" content="#07090d">
  <link rel="icon" href="/assets/img/hurfi-icon.svg" type="image/svg+xml">
  <link rel="canonical" href="${L.url}">
${hreflang}  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta property="og:site_name" content="Hurfi">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${L.url}">
  <meta property="og:locale" content="${zh ? "zh_CN" : "en_US"}">
  <meta property="og:image" content="${SITE}/assets/img/locations/card-b2b-website.webp">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="530">
  <meta property="og:image:alt" content="${E(t({ en: IMAGES["card-web"].alt[0], zh: IMAGES["card-web"].alt[1] }))}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${SITE}/assets/img/locations/card-b2b-website.webp">
${ld()}</head>
<body data-page="service">
${GTM_BODY}`;
}

/* ------------------------------------------------------------ page */
function page() {
  const tpl = rd(L.tpl);
  const header = tpl.slice(tpl.indexOf('  <header class="site-header">'), tpl.indexOf("  <main>"));
  const tail = tpl.slice(tpl.indexOf('  <footer class="site-footer">'));
  secNo = 0;
  // data-own-pricing: the build skips its shared pricing block (the cost section is part of this page);
  // data-consult-slot: the build puts the shared consultation form there (after the closing call to action).
  const main = `  <main class="wd-page" data-own-pricing>
${hero()}${toc()}${services()}${why()}${problems()}${exportReady()}${tech()}${choose()}${process_()}${caseStudy()}${cost()}${china()}${redesign()}${faq()}${final()}    <div class="wd-consult" data-consult-slot></div>
${related()}  </main>
`;
  return head() + header + main + tail;
}

for (const k of ["en", "zh"]) { L = LANGS[k]; wr(L.file, page()); }
console.log(written.length ? `written: ${written.join(", ")}` : "no changes");

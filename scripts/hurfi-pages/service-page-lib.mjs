/**
 * Shared renderer for the hand-built service pages (English source page + hand-made Chinese twin, same
 * layout). Used by service_webdev.mjs and service_seo.mjs. Styles: assets/css/service-page.css.
 *
 * Content pairs are { en, zh } (T(en, zh) in the content files). Inline markup in both languages:
 *   **keyword**     bold keyword
 *   [text](/path/)  link; site paths are written once and mapped to /zh/... on the Chinese page
 * Header, footer and analytics snippets are copied from the Digital Marketing page (EN and zh twin).
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { IMAGES } from "./content/service-cities-layout.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(HERE, "..", "..");
export const SITE = "https://hurfi.com";
export const ORG_ID = SITE + "/#organization";
export const rd = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8").replace(/\r\n/g, "\n");
export const written = [];
export function wr(rel, text) {
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
export const E = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const T = (en, zh) => ({ en, zh });

/* ------------------------------------------------------------ language */
const TEMPLATE = { en: "services/digital-marketing/index.html", zh: "zh/services/digital-marketing/index.html" };
export function langsFor(pathname) {
  return {
    en: { key: "en", file: pathname.slice(1) + "index.html", url: SITE + pathname, tpl: TEMPLATE.en },
    zh: { key: "zh", file: "zh" + pathname + "index.html", url: SITE + "/zh" + pathname, tpl: TEMPLATE.zh },
  };
}
let L = { key: "en" };
export const setLang = (x) => { L = x; };
export const lang = () => L;
export const isZh = () => L.key === "zh";
export const t = (x) => (x && typeof x === "object" && "en" in x ? x[L.key] : x);
/** site path in the current language (Chinese twins live under /zh/ in the source tree) */
export const href = (u) => (L.key === "zh" && u.startsWith("/") && !u.startsWith("/assets/") && !u.startsWith("/zh/") ? "/zh" + u : u);
function linkTag(text, u) {
  if (/^https?:/.test(u)) {
    const rel = /hostinger\.com/.test(u) ? "sponsored noopener" : "noopener";
    return `<a href="${E(u)}" target="_blank" rel="${rel}">${text}</a>`;
  }
  return `<a href="${E(href(u))}">${text}</a>`;
}
/** inline markup: **bold** and [text](url) */
export const md = (x) => E(t(x)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, a, u) => linkTag(a, u));
export const plain = (x) => t(x).replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
export const paras = (list, ind) => (list || []).map((x) => `${ind}<p>${md(x)}</p>\n`).join("");

/* ------------------------------------------------------------ icons (stroke, 24px grid) */
export const ICON = {
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
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="m7 15 4-4 3 3 5-6"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
};
export const icon = (n, cls = "wd-ic") => `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON[n]}</svg>`;

/* ------------------------------------------------------------ images */
/** key of service-cities-layout IMAGES, or { src, w, h, alt: {en,zh}, srcset?, sizes?, credit? } */
export function photo(img, cls, sizes) {
  const im = typeof img === "string" ? IMAGES[img] : img;
  const alt = t(Array.isArray(im.alt) ? { en: im.alt[0], zh: im.alt[1] } : im.alt);
  const c = im.credit;
  const credit = c ? `<figcaption class="wd-credit">${L.key === "zh" ? "图片" : "Photo"}: <a href="${E(c.page)}" target="_blank" rel="noopener">${E(c.author)}</a>, <a href="${E(c.licenseUrl)}" target="_blank" rel="noopener">${E(c.license)}</a></figcaption>` : "";
  const cap = !c && im.caption ? `<figcaption class="wd-shot-cap">${E(t(im.caption))}</figcaption>` : "";
  const srcset = im.srcset ? ` srcset="${im.srcset}"` : "";
  const sz = sizes || im.sizes;
  return `<figure class="${cls}"><img src="${im.src}"${srcset} alt="${E(alt)}" width="${im.w}" height="${im.h}" loading="lazy" decoding="async"${sz ? ` sizes="${sz}"` : ""}>${credit}${cap}</figure>`;
}
export const imageAlt = (key) => t({ en: IMAGES[key].alt[0], zh: IMAGES[key].alt[1] });

/* ------------------------------------------------------------ section shells */
export const sec = (id, cls, inner) => `    <section class="wd-sec ${cls}" id="${id}" aria-labelledby="${id}-title">
      <div class="wd-wrap">
${inner}      </div>
    </section>
`;
let secNo = 0;
export const resetSec = () => { secNo = 0; };
export const eyebrow = () => `<p class="wd-eyebrow"><span>${String(++secNo).padStart(2, "0")}</span></p>`;
/** centred section head: eyebrow, h2, paragraphs */
export const head2 = (X, cls = "wd-head") => `        <div class="${cls}">
          ${eyebrow()}
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "          ")}        </div>
`;

/* ------------------------------------------------------------ shared blocks */
/** H: { kicker, h1, paras, cta, cta2:[text, path], chips:[[icon, text]], sliderLabel, floatNote, slides:[{src960, src560, alt, label}] } */
export function hero(H, crumb) {
  const slides = H.slides.map((s, i) => `            <figure class="wd-slide"><img src="${s.src960}" srcset="${s.src560} 560w, ${s.src960} 960w" sizes="(max-width: 960px) 92vw, 560px" alt="${E(t(s.alt))}" width="960" height="600" ${i === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async"><figcaption>${E(t(s.label))}</figcaption></figure>\n`).join("");
  const dots = H.slides.map(() => "<i></i>").join("");
  const chips = H.chips.map(([ic, c]) => `<li>${icon(ic)}${E(t(c))}</li>`).join("");
  const crumbs = [[{ en: "Home", zh: "首页" }, "/"], [{ en: "Services", zh: "服务" }, "/services/"]].map(([n, u]) => `<li><a href="${href(u)}">${E(t(n))}</a></li>`).join("") + `<li><span aria-current="page">${E(t(crumb))}</span></li>`;
  return `    <header class="wd-hero" aria-labelledby="wd-h1">
      <div class="wd-wrap wd-hero-grid">
        <div class="wd-hero-copy">
          <nav class="wd-crumbs" aria-label="${L.key === "zh" ? "面包屑导航" : "Breadcrumb"}"><ol>${crumbs}</ol></nav>
          <p class="wd-kicker">${E(t(H.kicker))}</p>
          <h1 id="wd-h1">${E(t(H.h1))}</h1>
          <p class="wd-lead">${md(H.paras[0])}</p>
${paras(H.paras.slice(1), "          ")}          <div class="wd-actions">
            <a class="wd-btn wd-btn--primary" href="${href("/book-consultation/")}#book-form">${E(t(H.cta))} ${icon("arrow", "wd-ic wd-ic--btn")}</a>
            <a class="wd-btn wd-btn--ghost" href="${href(H.cta2[1])}">${E(t(H.cta2[0]))}</a>
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

export const toc = (items) => `    <nav class="wd-toc" aria-label="${L.key === "zh" ? "本页目录" : "On this page"}">
      <div class="wd-wrap"><ul>${items.map(([id, n]) => `<li><a href="#${id}">${E(t(n))}</a></li>`).join("")}</ul></div>
    </nav>
`;

/** bento grid: the first card spans two columns, a card with wide:true spans the row */
export function bento(S, secCls) {
  const card = (c, i) => {
    const media = c.img ? photo(c.img, "wd-card-media") : "";
    const cls = ["wd-card", c.img ? "wd-card--media" : "", i === 0 || c.span2 ? "wd-span2" : "", c.wide ? "wd-card--wide" : ""].filter(Boolean).join(" ");
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
  return sec(S.id, secCls, `${head2(S)}        <div class="wd-bento">
${S.cards.map(card).join("")}        </div>
`);
}

/** numbered problem cards beside a sticky heading + photo */
export function problems(R) {
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
${paras(R.paras, "              ")}              ${photo(R.img, "wd-aside-media")}
            </div>
          </div>
          <div class="wd-prob-list">
${items}          </div>
        </div>
`);
}

/** cards: { icon, h3, paras, tags?, cta?:[text, path], badge?:html, note?, cls? } in a 3-column grid */
export function cardGrid(X, secCls, cardCls = "", gridCls = "wd-grid3") {
  const cards = X.cards.map((c) => `          <article class="${["wd-card", cardCls, c.cls || ""].filter(Boolean).join(" ")}">
            <div class="wd-card-body">
              ${c.badge || icon(c.icon, "wd-ic wd-ic--tile")}
              <h3>${E(t(c.h3))}</h3>
${paras(c.paras, "              ")}${c.tags ? `              <ul class="wd-tags">${c.tags.map((g) => `<li>${E(t(g))}</li>`).join("")}</ul>\n` : ""}${c.note ? `              <p class="wd-note">${E(t(c.note))}</p>\n` : ""}${c.cta ? `              <p><a class="wd-btn wd-btn--primary" href="${href(c.cta[1])}">${E(t(c.cta[0]))} ${icon("arrow", "wd-ic wd-ic--btn")}</a></p>\n` : ""}            </div>
          </article>
`).join("");
  return sec(X.id, secCls, `${head2(X)}        <div class="${gridCls}">
${cards}        </div>
`);
}

export function processSteps(X) {
  const steps = X.steps.map((s, i) => `          <li class="wd-step">
            <p class="wd-step-num"><span>${E(t(X.stepLabel))}</span> ${String(i + 1).padStart(2, "0")}</p>
            <h3>${E(t(s.h3))}</h3>
${paras(s.paras, "            ")}          </li>
`).join("");
  return sec(X.id, "wd-process", `${head2(X)}        <ol class="wd-steps">
${steps}        </ol>
`);
}

/** price card + a list of points ("factors" grid) */
export function priceBlock(X) {
  return sec(X.id, X.factorIcon ? "wd-cost wd-cost--terms" : "wd-cost", `${head2({ id: X.id, h2: X.h2 })}        <div class="wd-cost-grid">
          <div class="wd-price">
            <p>${md(X.intro)}</p>
            <p class="wd-price-big">${E(t(X.price))}</p>
${X.covers ? `            <ul class="wd-tags wd-tags--covers">${X.covers.map((c) => `<li>${icon("check", "wd-ic")}${E(t(c))}</li>`).join("")}</ul>
` : ""}${paras(X.paras, "            ")}            <p><a class="wd-btn wd-btn--primary" href="${href("/book-consultation/")}#book-form">${E(t(X.cta))} ${icon("arrow", "wd-ic wd-ic--btn")}</a></p>
          </div>
          <div class="wd-factors">
            <p class="wd-factors-title">${md(X.factorsIntro)}</p>
            <ul>${X.factors.map((f) => `<li>${icon(X.factorIcon || "plus", "wd-ic")}${E(t(f))}</li>`).join("")}</ul>
${paras(X.after ? [].concat(X.after) : [], "            ")}          </div>
        </div>
`);
}

export function china(X) {
  const cards = X.cities.map((c) => `            <div class="wd-city">${photo(c.img, "wd-city-media")}<a class="wd-city-name" href="${href(c.url)}">${icon("pin", "wd-ic")}${E(t(c.name))}${icon("arrow", "wd-ic wd-ic--go")}</a></div>
`).join("");
  return sec(X.id, "wd-china", `        <div class="wd-china-grid">
          <div class="wd-head wd-head--left">
            ${eyebrow()}
            <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "            ")}${paras(X.after ? [].concat(X.after) : [], "            ")}          </div>
          <div class="wd-cities">
            <p class="wd-cities-title">${md(X.cityIntro)}</p>
${cards}          </div>
        </div>
`);
}

export function faq(X) {
  const items = X.items.map(([q, a], i) => `          <details class="wd-faq-item"${i === 0 ? " open" : ""}>
            <summary><span>${E(t(q))}</span>${icon("plus", "wd-ic wd-faq-ic")}</summary>
            <p>${md(a)}</p>
          </details>
`).join("");
  return sec(X.id, "wd-faq", `${head2({ id: X.id, h2: X.h2 })}        <div class="wd-faq-list">
${items}        </div>
`);
}

export const final = (X) => `    <section class="wd-sec wd-final" id="${X.id}" aria-labelledby="${X.id}-title">
      <div class="wd-wrap">
        <div class="wd-final-card">
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "          ")}          <p class="wd-actions wd-actions--center"><a class="wd-btn wd-btn--light" href="${href("/book-consultation/")}#book-form">${E(t(X.cta))} ${icon("arrow", "wd-ic wd-ic--btn")}</a></p>
          <ul class="wd-contact">
            <li>${icon("phone", "wd-ic")}<strong>${E(t(X.phoneLabel))}</strong> <a href="tel:+8617792239260">+86 17792239260</a></li>
            <li>${icon("mail", "wd-ic")}<strong>${E(t(X.emailLabel))}</strong> <a href="mailto:yasir@hurfi.com">yasir@hurfi.com</a></li>
          </ul>
${X.closing ? `          <p class="wd-final-close">${md(X.closing)}</p>\n` : ""}        </div>
      </div>
    </section>
`;

export const related = (X) => `    <section class="wd-sec wd-related" id="${X.id}" aria-labelledby="${X.id}-title">
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

/* ------------------------------------------------------------ JSON-LD */
const TPL_EN = rd(TEMPLATE.en);
export const ORG = (() => {
  for (const m of TPL_EN.matchAll(/<script type="application\/ld\+json">(\{.*?\})<\/script>/g)) {
    const o = JSON.parse(m[1].replace(/<\\\//g, "</"));
    if (o["@type"] === "Organization" && o["@id"] === ORG_ID) return o;
  }
  throw new Error("Organization JSON-LD not found in " + TEMPLATE.en);
})();
const jsonld = (o) => `  <script type="application/ld+json">${JSON.stringify(o).replace(/<\//g, "<\\/")}</script>\n`;
export const breadcrumbLd = (pathname, crumb) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
  { "@type": "ListItem", position: 1, name: t({ en: "Home", zh: "首页" }), item: SITE + "/" },
  { "@type": "ListItem", position: 2, name: t({ en: "Services", zh: "服务" }), item: SITE + "/services/" },
  { "@type": "ListItem", position: 3, name: t(crumb), item: SITE + pathname }] });
export const faqLd = (X) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: X.items.map(([q, a]) => ({ "@type": "Question", name: t(q), acceptedAnswer: { "@type": "Answer", text: plain(a) } })) });

/* ------------------------------------------------------------ head + page */
const GTM_HEAD = TPL_EN.slice(TPL_EN.indexOf("<head>\n") + 7, TPL_EN.indexOf("  <meta charset"));
const GTM_BODY = (() => { const b = TPL_EN.indexOf('<body data-page="service">\n') + 27; return TPL_EN.slice(b, TPL_EN.indexOf('  <header class="site-header">')); })();
const CSS_LINKS = [...TPL_EN.matchAll(/  <link rel="stylesheet" href="\/assets\/css\/(?:style|hurfi-pages)\.css\?v=[^"]+">\n/g)].map((m) => m[0]).join("");
const FONT_LINKS = TPL_EN.slice(TPL_EN.indexOf('  <link rel="preconnect" href="https://fonts.googleapis.com">'), TPL_EN.indexOf("  <link rel=\"stylesheet\" href=\"/assets/css/style.css"));
const CSS_FILE = "assets/css/service-page.css";
const cssVer = () => crypto.createHash("sha1").update(rd(CSS_FILE)).digest("hex").slice(0, 10);

/**
 * page: { pathname, generator, content, meta:{title, description, keywordsZh}, og:{src,w,h,alt}, ld(): [objects], main(): html }
 * Writes the English page and the Chinese twin.
 */
export function writePage(page) {
  const LANGS = langsFor(page.pathname);
  for (const k of ["en", "zh"]) {
    setLang(LANGS[k]);
    const zh = k === "zh";
    const title = E(t(page.meta.title)), desc = E(t(page.meta.description));
    const og = page.og;
    const head = `<!DOCTYPE html>
${zh ? `<!-- Written by scripts/hurfi-pages/${page.generator} (hand-made Chinese twin, kept as is by zh_mirror.mjs). Edit ${page.content} and rerun; do not edit this file. -->\n` : ""}<html lang="${zh ? "zh-Hans" : "en"}"${zh ? ' data-static-lang="zh"' : ""}>
<head>
${GTM_HEAD}  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${zh ? `  <meta http-equiv="content-language" content="zh-CN">
  <meta http-equiv="Cache-Control" content="no-transform">
  <meta http-equiv="Cache-Control" content="no-siteapp">
  <meta name="applicable-device" content="pc,mobile">
` : ""}  <title>${title}</title>
  <meta name="description" content="${desc}">
${zh && page.meta.keywordsZh ? `  <meta name="keywords" content="${E(page.meta.keywordsZh)}">\n` : ""}${FONT_LINKS}${CSS_LINKS}  <link rel="stylesheet" href="/${CSS_FILE}?v=${cssVer()}">
  <meta name="theme-color" content="#07090d">
  <link rel="icon" href="/assets/img/hurfi-icon.svg" type="image/svg+xml">
  <link rel="canonical" href="${LANGS[k].url}">
  <!-- hurfi:gen:hreflang:start -->
  <link rel="alternate" hreflang="en" href="${LANGS.en.url}">
  <link rel="alternate" hreflang="zh-Hans" href="${LANGS.zh.url}">
  <link rel="alternate" hreflang="x-default" href="${LANGS.en.url}">
  <!-- hurfi:gen:hreflang:end -->
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta property="og:site_name" content="Hurfi">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${LANGS[k].url}">
  <meta property="og:locale" content="${zh ? "zh_CN" : "en_US"}">
  <meta property="og:image" content="${SITE}${og.src}">
  <meta property="og:image:width" content="${og.w}">
  <meta property="og:image:height" content="${og.h}">
  <meta property="og:image:alt" content="${E(typeof og.alt === "string" ? imageAlt(og.alt) : t(og.alt))}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${SITE}${og.src}">
${[ORG, ...page.ld()].map(jsonld).join("")}</head>
<body data-page="service">
${GTM_BODY}`;
    const tpl = rd(LANGS[k].tpl);
    const header = tpl.slice(tpl.indexOf('  <header class="site-header">'), tpl.indexOf("  <main>"));
    const tail = tpl.slice(tpl.indexOf('  <footer class="site-footer">'));
    resetSec();
    // data-own-pricing: the build skips its shared pricing block (the page has its own price section);
    // data-consult-slot: the build puts the shared consultation form there (after the closing call to action).
    wr(LANGS[k].file, head + header + `  <main class="wd-page" data-own-pricing>\n${page.main()}  </main>\n` + tail);
  }
}

#!/usr/bin/env node
/**
 * Service × city landing pages (/website-development-agency-shenzhen/, /seo-agency-guangzhou/, ...).
 *
 * Content: content/service-cities.mjs (English + Chinese pairs).
 * Writes:  the 8 pages (whole files, same template as build.py: header/footer copied from
 *          services/seo/index.html), the Chinese strings into content/zh-meta.json, a
 *          "service-cities" block on the 4 service pages, a "city-services" block on the
 *          Shenzhen and Guangzhou city guides, the sitemap entries and the llms.txt section.
 * Then run zh_mirror.mjs (build.py does both) for the /zh/ twins, hreflang and sitemap alternates.
 *
 *   node scripts/hurfi-pages/service_cities.mjs
 *
 * Idempotent: a second run changes nothing.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CITIES, SERVICES, PAGES, AREAS_NOTE, UPDATED } from "./content/service-cities.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const SITE = "https://hurfi.com";
const ORG_ID = SITE + "/#organization";

const rd = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8").replace(/\r\n/g, "\n");
const written = [];
function wr(rel, text) {
  text = text.replace(/href="\/book-consultation\/"/g, 'href="/book-consultation/#book-form"');
  const p = path.join(ROOT, rel);
  let eol = "\n";
  if (fs.existsSync(p)) {
    const raw = fs.readFileSync(p, "utf8");
    if (raw.replace(/\r\n/g, "\n") === text) return;
    if ((raw.match(/\r\n/g) || []).length > raw.split("\n").length / 2) eol = "\r\n";
  } else if (process.platform === "win32") eol = "\r\n"; // match the checkout (core.autocrlf)
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, eol === "\n" ? text : text.replace(/\n/g, "\r\n"));
  written.push(rel);
}

const E = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

/* ------------------------------------------------------------ Chinese pairs -> zh-meta.json */
const PAIRS = new Map();
/** English text of a [en, zh] pair (recording the pair) or a plain dictionary string. */
function t(x) {
  if (!Array.isArray(x)) return x;
  const [en, zh] = x;
  const k = en.trim().replace(/\s+/g, " ");
  if (PAIRS.has(k) && PAIRS.get(k) !== zh) console.warn(`! two translations for "${k}"`);
  PAIRS.set(k, zh);
  return en;
}
const pair = (en, zh) => t([en, zh]);

/* ------------------------------------------------------------ template (as build.py) */
const TPL = rd("services/seo/index.html");
const HEADER = TPL.slice(TPL.indexOf('  <header class="site-header">'), TPL.indexOf("  <main>"));
const TAIL = TPL.slice(TPL.indexOf('  <footer class="site-footer">'));
const CSS_LINK = TPL.match(/<link rel="stylesheet" href="\/assets\/css\/style\.css\?v=[^"]+">/)[0];
const HX_VER = rd("scripts/hurfi-pages/navdata.py").match(/^HX_VER = '([^']+)'/m)[1];
const HX_LINK = `<link rel="stylesheet" href="/assets/css/hurfi-pages.css?v=${HX_VER}">`;
const PY = rd("scripts/hurfi-pages/build.py");
const pyStr = (n) => PY.match(new RegExp("^" + n + ' = """([\\s\\S]*?)"""', "m"))[1];
const GTM_HEAD = pyStr("GTM_HEAD"), GTM_BODY = pyStr("GTM_BODY"), GTAG = pyStr("GTAG"), CLARITY = pyStr("CLARITY");
const OG_IMAGE = SITE + "/assets/img/og-default.png";

// The one full Organization node, identical on every page (taken from a page build.py wrote).
const ORG = (() => {
  const s = rd("locations/china/shenzhen/index.html");
  for (const m of s.matchAll(/<script type="application\/ld\+json">(\{.*?\})<\/script>/g)) {
    const o = JSON.parse(m[1].replace(/<\\\//g, "</"));
    if (o["@type"] === "Organization" && o["@id"] === ORG_ID) return o;
  }
  throw new Error("Organization JSON-LD not found");
})();
const jsonld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/<\//g, "<\\/")}</script>`;

function head(p) {
  const ld = p.ld.map((o) => "  " + jsonld(o) + "\n").join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
${GTM_HEAD}${GTAG}${CLARITY}  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${E(p.title)}</title>
  <meta name="description" content="${E(p.description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">
  ${CSS_LINK}
  ${HX_LINK}
  <meta name="theme-color" content="#07090d">
  <link rel="icon" href="/assets/img/hurfi-icon.svg" type="image/svg+xml">
  <link rel="canonical" href="${SITE}${p.path}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta property="og:site_name" content="Hurfi">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${E(p.title)}">
  <meta property="og:description" content="${E(p.description)}">
  <meta property="og:url" content="${SITE}${p.path}">
  <meta property="og:locale" content="en_US">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Hurfi — export marketing for Chinese manufacturers">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${E(p.title)}">
  <meta name="twitter:description" content="${E(p.description)}">
  <meta name="twitter:image" content="${OG_IMAGE}">
${ld}</head>
<body data-page="service">
${GTM_BODY}`;
}

/* ------------------------------------------------------------ blocks */
let ids = new Set();
function sid(base) {
  base = base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "sec";
  if (/^\d/.test(base)) base = "s-" + base;
  let k = base, i = 2;
  while (ids.has(k)) k = `${base}-${i++}`;
  ids.add(k);
  return k;
}
const ul = (items, cls = "hx-list") => `      <ul class="${cls}">\n${items.map((x) => `        <li>${E(t(x))}</li>\n`).join("")}      </ul>\n`;
const paras = (list, ind = "      ") => (list || []).map((x) => `${ind}<p>${E(t(x))}</p>\n`).join("");
const linkList = (items) => '<ul class="hx-linklist">' + items.map(([n, u]) => `<li><a href="${u}">${E(t(n))}</a></li>`).join("") + "</ul>";

function crumbsNav(items) {
  const li = items.map(([n, u], i) => (i === items.length - 1 ? `<li><span aria-current="page">${E(t(n))}</span></li>` : `<li><a href="${u}">${E(t(n))}</a></li>`)).join("");
  return `    <nav class="hx-crumbs" aria-label="Breadcrumb"><ol>${li}</ol></nav>\n`;
}

function hero(kicker, h1, lead, note) {
  return `    <header class="about-hero hx-hero">
      <div class="container">
        <p class="about-kicker">${E(kicker)}</p>
        <h1>${E(t(h1))}</h1>
        <p class="about-hero-lead">${E(t(lead))}</p>
        <p class="hx-hero-note">${E(t(note))}</p>
        <div class="cta-row hx-cta-row"><a class="btn" href="/book-consultation/#book-form">Book a Consultation</a><a class="btn btn-outline" href="/contact/">Contact us</a></div>
      </div>
    </header>
`;
}

function section(s) {
  const h2 = t(s.h2);
  const i = sid(h2);
  let out = `    <section class="brief hx-prose" aria-labelledby="${i}">\n      <h2 id="${i}">${E(h2)}</h2>\n`;
  out += paras(s.p);
  if (s.src) out += `      <p class="hx-src-note">${E(t(s.src.pre))} <a href="${s.src.url}" target="_blank" rel="noopener">${E(t(s.src.label))}</a></p>\n`;
  if (s.ul) out += ul(s.ul);
  for (const x of s.sub || []) {
    out += `      <h3>${E(t(x.h3))}</h3>\n` + paras(x.p);
    if (x.ul) out += ul(x.ul);
    out += paras(x.p2);
  }
  if (s.cards) {
    out += '      <div class="brief-grid">\n';
    for (const c of s.cards) {
      const name = t(c.t);
      out += `        <article class="brief-card"><h3>${c.u ? `<a href="${c.u}">${E(name)}</a>` : E(name)}</h3><p>${E(t(c.b))}</p></article>\n`;
    }
    out += "      </div>\n";
  }
  out += paras(s.p2);
  if (s.ul2) out += ul(s.ul2);
  return out + "    </section>\n";
}

function ctaBand(ident, h2, ps, extra = "") {
  return `    <section class="brief hx-cta-band" aria-labelledby="${ident}">
      <h2 id="${ident}">${E(t(h2))}</h2>
${paras(ps)}      <div class="cta-row hx-cta-row"><a class="btn" href="/book-consultation/#book-form">Book a Consultation</a><a class="btn btn-outline" href="/contact/">Contact us</a></div>
${extra}    </section>
`;
}

function processBlock(pr) {
  const h2 = t(pr.h2);
  const i = sid(h2);
  const li = pr.steps.map(([a, b]) => `        <li><strong>${E(t([a[0] + ".", a[1] + "："]))}</strong> ${E(t(b))}</li>\n`).join("");
  return `    <section class="brief hx-prose" aria-labelledby="${i}">\n      <h2 id="${i}">${E(h2)}</h2>\n      <ol class="hx-list hx-steps">\n${li}      </ol>\n    </section>\n`;
}

function faqBlock(title, faq) {
  const d = faq.map(([q, a], i) => `            <details${i === 0 ? " open" : ""}>
              <summary><span>${E(t(q))}</span><span class="rk-faq-icon" aria-hidden="true"></span></summary>
              <p>${E(t(a))}</p>
            </details>
`).join("");
  return `    <section class="rk-faq rk-faq-split hx-faq" aria-labelledby="rk-faq-title">
      <div class="rk-faq-grid">
        <div class="rk-faq-copy">
          <p class="rk-kicker">Questions</p>
          <h2 id="rk-faq-title">${E(t(title))}</h2>
          <div class="rk-faq-list">
${d}          </div>
        </div>
      </div>
    </section>
`;
}

/* ------------------------------------------------------------ names and links */
const urlOf = (pg) => `/${pg.slug}/`;
const find = (svc, city) => PAGES.find((p) => p.svc === svc && p.city === city);
/** "Website development agency in Shenzhen" / "深圳网站建设公司" */
function label(svc, city) {
  const [en, zh] = SERVICES[svc].agency, [cen, czh] = CITIES[city].name;
  return [`${en} in ${cen}`, `${czh}${zh}`];
}
const INS = JSON.parse(rd("scripts/hurfi-pages/content/insights.json"));
const insightTitle = (slug) => INS[slug] && INS[slug].h1;
const CITY_GUIDE = (city) => [`Guide for ${CITIES[city].name[0]} manufacturers`, `${CITIES[city].name[1]}制造业指南`];

/* ------------------------------------------------------------ pages */
function build(pg) {
  ids = new Set(["rk-faq-title", "midcta-title", "endcta-title", "related-title", "areas-title"]);
  const S = SERVICES[pg.svc], C = CITIES[pg.city];
  const url = urlOf(pg), abs = SITE + url;
  const cityName = t(C.name), title = t(pg.title), desc = t(pg.description), h1 = t(pg.h1);
  const myLabel = t(label(pg.svc, pg.city));
  const crumbs = [["Home", "/"], ["Services", "/services/"], [S.crumb, `/services/${pg.svc}/`], [C.name, url]];

  let main = hero(t([`${cityName} · ${S.crumb}`, `${C.name[1]} · ${S.lower[1]}`]), pg.h1, pg.lead, C.remote) + crumbsNav(crumbs);
  pg.sections.forEach((s, n) => {
    main += section(s);
    if (n === 1) main += ctaBand("midcta-title", S.mid[0], [S.mid[1]]);
  });
  main += processBlock(pg.process);
  main += `    <section class="brief hx-prose" aria-labelledby="areas-title">
      <h2 id="areas-title">${E(t(pg.areasH2))}</h2>
${paras([pg.areasP])}${ul(C.areas)}${paras([AREAS_NOTE])}    </section>
`;
  const lowerSvc = SERVICES[pg.svc].lower;
  main += faqBlock([`Questions about ${lowerSvc[0]} in ${C.name[0]}`, `关于${C.name[1]}${lowerSvc[1]}的常见问题`], pg.faq);

  const other = Object.keys(CITIES).find((c) => c !== pg.city);
  const sameCity = Object.keys(SERVICES).filter((k) => k !== pg.svc && find(k, pg.city)).map((k) => [label(k, pg.city), urlOf(find(k, pg.city))]);
  const related = [[S.page, `/services/${pg.svc}/`], [label(pg.svc, other), urlOf(find(pg.svc, other))], [CITY_GUIDE(pg.city), `/locations/china/${pg.city}/`],
    ["See finished websites, search and campaign work", "/projects/"]];
  const guides = S.guides.filter(insightTitle).map((g) => [insightTitle(g), `/insights/${g}/`]);
  if (pg.city === "guangzhou" && insightTitle("canton-fair-guide-for-exporters") && ["website-development", "digital-marketing"].includes(pg.svc))
    guides.push([insightTitle("canton-fair-guide-for-exporters"), "/insights/canton-fair-guide-for-exporters/"]);
  main += `    <section class="brief hx-related-block" aria-labelledby="related-title">
      <h2 id="related-title">${E(pair("Related services, pages and guides", "相关服务、页面与指南"))}</h2>
      <div class="hx-related-cols">
        <div><h3>${E(pair(`More Hurfi services in ${C.name[0]}`, `Hurfi 在${C.name[1]}的其他服务`))}</h3>${linkList(sameCity)}</div>
        <div><h3>${E(pair("Related pages", "相关页面"))}</h3>${linkList(related)}</div>
        <div><h3>Guides</h3>${linkList([...guides, ["All insights", "/insights/"]])}</div>
      </div>
    </section>
`;
  const contact = `      <p>${E(pair("Prefer to talk directly? Call or WeChat", "想直接沟通？请致电或添加微信"))} <a href="tel:+8617792239260">+86 17792239260</a>${E(pair(", or email", "，或发邮件至"))} <a href="mailto:yasir@hurfi.com">${E(pair("yasir@hurfi.com", "yasir@hurfi.com"))}</a>.</p>\n`;
  main += ctaBand("endcta-title", pg.end.h2, pg.end.p, contact);

  const crumbLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": abs + "#breadcrumb",
    itemListElement: crumbs.map(([n, u], i) => ({ "@type": "ListItem", position: i + 1, name: Array.isArray(n) ? n[0] : n, item: SITE + u })) };
  const area = { "@type": "City", name: C.name[0], containedInPlace: { "@type": "AdministrativeArea", name: C.region } };
  const ld = [
    ORG,
    crumbLd,
    { "@context": "https://schema.org", "@type": "WebPage", "@id": abs + "#webpage", url: abs, name: title, description: desc, inLanguage: "en",
      isPartOf: { "@type": "WebSite", "@id": SITE + "/#website", name: "Hurfi", url: SITE + "/" }, publisher: { "@id": ORG_ID }, breadcrumb: { "@id": abs + "#breadcrumb" },
      mainEntity: { "@id": abs + "#service" }, about: area, dateModified: UPDATED },
    { "@context": "https://schema.org", "@type": "Service", "@id": abs + "#service", name: myLabel, serviceType: S.crumb, description: desc, url: abs,
      provider: { "@id": ORG_ID }, areaServed: area,
      audience: { "@type": "BusinessAudience", audienceType: "Manufacturers, exporters and B2B companies" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: pg.faq.map(([q, a]) => ({ "@type": "Question", name: q[0], acceptedAnswer: { "@type": "Answer", text: a[0] } })) },
  ];
  let html = head({ title, description: desc, path: url, ld }) + HEADER + "  <main>\n" + main + "  </main>\n" + TAIL;
  // Keep what zh_mirror.mjs adds to the English page (hreflang block, runtime script version),
  // so running this script again without the mirror changes nothing.
  const rel = `${pg.slug}/index.html`;
  if (fs.existsSync(path.join(ROOT, rel))) {
    const prev = rd(rel);
    const hb = prev.match(/  <!-- hurfi:gen:hreflang:start -->\n[\s\S]*?  <!-- hurfi:gen:hreflang:end -->\n/);
    if (hb) html = html.replace(/(  <link rel="canonical"[^>]*>\n)/, (m) => m + hb[0]);
    const rs = prev.match(/\/assets\/js\/i18n-run\.js\?v=[a-z0-9]+/);
    if (rs) html = html.replace(/\/assets\/js\/i18n-run\.js\?v=[a-z0-9]+/, rs[0]);
  }
  wr(rel, html);
}

/* ------------------------------------------------------------ blocks on existing pages (as build.py set_block) */
function setBlock(s, name, content, before) {
  const start = `<!-- hurfi:gen:${name}:start -->`, end = `<!-- hurfi:gen:${name}:end -->`;
  const block = `    ${start}\n${content}    ${end}\n`;
  const a = s.indexOf("    " + start);
  if (a >= 0) {
    const b = s.indexOf("    " + end, a);
    return s.slice(0, a) + block + s.slice(b + end.length + 5);
  }
  const i = s.indexOf(before);
  if (i < 0) throw new Error(`anchor not found for ${name}: ${before}`);
  return s.slice(0, i) + block + s.slice(i);
}

function linkBlocks() {
  const cities = Object.keys(CITIES);
  for (const svc of Object.keys(SERVICES)) {
    const rel = `services/${svc}/index.html`;
    const L = SERVICES[svc].lower;
    const cap = L[0][0].toUpperCase() + L[0].slice(1);
    const items = cities.map((c) => find(svc, c)).filter(Boolean).map((p) => `        <li><a href="${urlOf(p)}">${E(t(label(svc, p.city)))}</a></li>\n`).join("");
    const body = `    <section class="brief hx-prose" aria-labelledby="svc-cities-title">
      <h2 id="svc-cities-title">${E(pair(`${cap} in Shenzhen and Guangzhou`, `深圳与广州的${L[1]}服务`))}</h2>
      <p>${E(pair("Local pages for manufacturers, exporters and B2B companies in two of China’s biggest manufacturing cities:", "面向中国两大制造业城市的制造商、出口企业和 B2B 公司的本地服务页面："))}</p>
      <ul class="hx-list">
${items}      </ul>
    </section>
`;
    wr(rel, setBlock(rd(rel), "service-cities", body, '    <section class="brief" aria-labelledby="other-title">'));
  }
  for (const city of cities) {
    const rel = `locations/china/${city}/index.html`;
    const [cen, czh] = CITIES[city].name;
    const items = Object.keys(SERVICES).map((svc) => find(svc, city)).filter(Boolean).map((p) => `        <li><a href="${urlOf(p)}">${E(t(label(p.svc, city)))}</a></li>\n`).join("");
    const body = `    <section class="brief hx-prose" aria-labelledby="city-svc-title">
      <h2 id="city-svc-title">${E(pair(`Hurfi services for ${cen} companies`, `Hurfi 为${czh}企业提供的服务`))}</h2>
      <p>${E(pair("A page for each service, written for local manufacturers, exporters and B2B companies:", "每项服务都有专门页面，面向本地制造商、出口企业和 B2B 公司："))}</p>
      <ul class="hx-list">
${items}      </ul>
    </section>
`;
    wr(rel, setBlock(rd(rel), "city-services", body, '    <section class="brief hx-related-block" aria-labelledby="related-title">'));
  }
}

/* ------------------------------------------------------------ sitemap, llms.txt, zh-meta */
function sitemap() {
  let s = rd("sitemap.xml");
  const after = "<loc>https://hurfi.com/services/social-media-management/</loc>";
  const i = s.indexOf(after);
  if (i < 0) throw new Error("sitemap anchor not found");
  let at = s.indexOf("</url>\n", i) + "</url>\n".length;
  for (const pg of PAGES) {
    if (s.includes(`<loc>${SITE}${urlOf(pg)}</loc>`)) continue;
    const entry = `  <url>\n    <loc>${SITE}${urlOf(pg)}</loc>\n    <lastmod>${UPDATED}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    s = s.slice(0, at) + entry + s.slice(at);
    at += entry.length;
  }
  wr("sitemap.xml", s);
}

function llms() {
  let s = rd("llms.txt");
  const head = "## Services in Shenzhen and Guangzhou\n";
  const body = head + PAGES.map((p) => `- [${p.title[0]}](${SITE}${urlOf(p)}): ${p.description[0]}`).join("\n") + "\n\n";
  const a = s.indexOf(head);
  if (a >= 0) s = s.slice(0, a) + body + s.slice(s.indexOf("\n## ", a + head.length) + 1);
  else s = s.replace("## Key pages\n", body + "## Key pages\n");
  wr("llms.txt", s);
}

function zhMeta() {
  const rel = "scripts/hurfi-pages/content/zh-meta.json";
  const m = JSON.parse(rd(rel));
  for (const [k, v] of PAIRS) {
    if (m[k] !== undefined && m[k] !== v) console.warn(`! zh-meta keeps its existing translation for "${k}"`);
    else m[k] = v;
  }
  wr(rel, JSON.stringify(m, null, 1) + "\n");
}

PAGES.forEach(build);
linkBlocks();
sitemap();
llms();
zhMeta();
for (const f of written) console.log("wrote", f);

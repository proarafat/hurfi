#!/usr/bin/env node
/**
 * Assembles the published site in dist/ (Netlify publishes dist/):
 *   - Simplified Chinese (zh-CN) is the default at /, from the zh/ twins zh_mirror.mjs builds.
 *   - English moves to /en/, from the English source pages at the repo root.
 *   - Old /zh/* URLs 301 to /*. No language redirect by IP or browser language.
 * and writes the shared content from config.mjs into every page of both languages (server-rendered,
 * so crawlers and visitors without JavaScript see it): header language links, footer, consultation
 * form (Netlify Forms), stats, trust lines, pricing, comparison, case study, client feedback,
 * self-hosted fonts, Baidu Tongji switch, hreflang / canonical / Open Graph / JSON-LD, sitemap, llms.txt.
 *
 *   node scripts/hurfi-pages/zh_mirror.mjs && node scripts/site/build.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import * as C from "./config.mjs";
import { INDUSTRY, INSIGHT, CITY_SERVICE } from "./trust-lines.mjs";
import { LOCALES } from "./locales.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const DIST = path.join(ROOT, "dist");
const SITE = C.SITE;
const ZH = LOCALES.find((l) => l.key === "zh"), EN = LOCALES.find((l) => l.key === "en");
const SKIP = new Set([".git", ".github", "node_modules", "dist", "scripts", "assets", "data", "netlify", "zh"]);
const rd = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8").replace(/\r\n/g, "\n");
const E = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const T = (o, L) => (o && typeof o === "object" ? o[L.key] ?? o.en : o);
const warn = [];

/* ------------------------------------------------------------ pages */
const pages = [];
(function walk(dir, rel) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!(rel === "" && (SKIP.has(e.name) || e.name.startsWith(".")))) walk(path.join(dir, e.name), rel + e.name + "/"); continue; }
    if (e.name === "index.html") pages.push("/" + rel);
  }
})(ROOT, "");
pages.sort();
const fileOf = (url, L) => (L.key === "zh" ? "zh" + url : url.slice(1)) + "index.html";
const HAS_ZH = new Set(pages.filter((u) => fs.existsSync(path.join(ROOT, fileOf(u, ZH)))));
// noindex pages without a twin (thank-you) get a Chinese version from ZH_PAGE_TEXT below.
const ZH_PAGE_TEXT = {
  "/thank-you/": [["Thank You | Hurfi", "提交成功 | Hurfi"], ["Hurfi has your inquiry and will follow up.", "我们已收到您的需求，会尽快与您联系。"], ["Inquiry sent", "已提交"],
    ["Hurfi has your inquiry.", "我们已收到您的需求。"], ["Your note is on its way. We follow up by WeChat, email, or WhatsApp, using the method you chose.", "我们会按您选择的方式，通过微信、邮件或 WhatsApp 与您联系。"],
    ["We read the note first.", "我们会先认真阅读您的需求。"], ["The reply comes from Yasir, or from Shahruk when the work is on the China side.", "回复来自 Yasir；涉及中国本地事务时，由 Shahruk 跟进。"],
    ["Nothing starts until the brief is clear.", "需求明确之前，不会开始任何工作。"], ["Scope, timing, and the way we talk are agreed before the work begins.", "工作范围、时间安排和沟通方式，都会在开工前确认。"],
    ["Back home", "返回首页"], ["Explore services", "了解服务"]],
};

/* ------------------------------------------------------------ URL mapping */
const isPagePath = (p) => p.startsWith("/") && !p.startsWith("//") && !/^\/(assets|en)(\/|$)/.test(p) && !/\.[a-z0-9]+$/i.test(p.split(/[?#]/)[0]);
const norm = (p) => { const b = p.split(/[?#]/)[0]; return b.endsWith("/") ? b : b + "/"; };
/** Map a site-relative path for a page in language L. */
function mapPath(p, L) {
  if (/^\/zh(\/|$)/.test(p)) return p.replace(/^\/zh/, "") || "/"; // explicit Chinese links stay Chinese
  if (!isPagePath(p)) return p;
  if (L.key === "en") return "/en" + p;
  return HAS_ZH.has(norm(p)) || ZH_PAGE_TEXT[norm(p)] || norm(p) === "/" ? p : "/en" + p; // no Chinese twin -> English
}
function mapUrl(u, L) {
  if (u.startsWith(SITE + "/")) return SITE + mapPath(u.slice(SITE.length), L);
  if (u === SITE) return SITE + mapPath("/", L);
  return u.startsWith("/") ? mapPath(u, L) : u;
}
const hrefOf = (p, L) => mapPath(p, L);

/* ------------------------------------------------------------ small HTML helpers */
function blockRange(html, openRe, tag) {
  const m = openRe.exec(html);
  if (!m) return null;
  const re = new RegExp(`<${tag}\\b|</${tag}>`, "g");
  re.lastIndex = m.index + 1;
  let depth = 1, x;
  while ((x = re.exec(html))) { depth += x[0][1] === "/" ? -1 : 1; if (!depth) return [m.index, x.index + x[0].length]; }
  return null;
}
function replaceBlock(html, openRe, tag, by) { const r = blockRange(html, openRe, tag); return r ? html.slice(0, r[0]) + by + html.slice(r[1]) : html; }
const ICON = {
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.9 7.6-3.8M8.2 13.1l7.6 3.8"/>',
};
const icon = (n) => `<span class="sc-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[n]}</svg></span>`;
const WX = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M9.5 4C5.4 4 2 6.9 2 10.4c0 2 1.1 3.8 2.9 5l-.7 2.6 2.8-1.4c.8.2 1.6.4 2.5.4.3 0 .6 0 .9-.1-.2-.6-.3-1.2-.3-1.8 0-3.3 3.1-6 6.9-6 .2 0 .5 0 .7.1C16.8 6.1 13.4 4 9.5 4zm-2 3.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm4.2 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM17 9.2c-3.2 0-5.8 2.2-5.8 5s2.6 5 5.8 5c.6 0 1.2-.1 1.7-.2l2.3 1.2-.6-2.1c1.4-.9 2.4-2.3 2.4-3.9 0-2.8-2.6-5-5.8-5zm-1.7 2.3a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zm3.4 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z"/></svg>';

/* ------------------------------------------------------------ shared blocks */
const S = {
  more: { en: "Learn more", zh: "了解详情" }, feature: { en: "Feature", zh: "对比项" }, visit: { en: "Visit", zh: "访问" },
};

function trustBlock(text, L, close) {
  const btn = close ? `\n        <a class="btn" href="${hrefOf("/book-consultation/", L)}#book-form">${E(T(C.OFFER.button, L))}</a>` : "";
  return `    <section class="hx-trust${close ? " hx-trust--close" : ""}" aria-label="${E(T(C.UI.trustLabel, L))}">
      <div class="hx-trust-card">${icon("shield")}<p>${E(text)}</p>${btn}
      </div>
    </section>
`;
}

function statsBlock(L) {
  const li = C.STATS.map((s) => { const n = parseInt(s.n, 10); return `  <li> <strong><span data-count="${n}">${n}</span>+</strong> <span>${E(s[L.key])}</span> </li>`; }).join("\n");
  return `<ul class="rk-meter" aria-label="${E(T(C.UI.statsLabel, L))}">\n${li}\n  </ul>\n  <p class="rk-meter-note">${E(T(C.STATS_NOTE, L))}</p>`;
}

function logosHead(L) {
  return `<div class="logos-head"><h2 class="logos-title">${E(T(C.LOGOS.title, L))}</h2><p>${E(T(C.LOGOS.sub, L))}</p></div>\n`;
}

function pricingBlock(L, current, compact) {
  const P = C.PRICING;
  const cards = P.items.map((it) => {
    const t = it[L.key];
    return `        <article class="hx-price-card${it.key === current ? " is-current" : ""}">${icon(it.icon)}<h3>${E(t.name)}</h3><p class="hx-price">${E(t.unit)}</p>${compact ? "" : `<p>${E(t.note)}</p>`}<a href="${hrefOf(`/services/${it.key}/`, L)}">${E(T(S.more, L))} <span aria-hidden="true">→</span></a></article>\n`;
  }).join("");
  const terms = T(P.terms, L).map((x) => `<li>${E(x)}</li>`).join("");
  return `    <section class="brief hx-pricing${compact ? " hx-pricing--compact" : ""}" aria-labelledby="pricing-title">
      <h2 id="pricing-title">${E(T(P.title, L))}</h2>
      <p>${E(T(P.lead, L))}</p>
      <div class="hx-price-grid">
${cards}      </div>
      <ul class="hx-price-terms" aria-label="${E(T(C.UI.termsLabel, L))}">${terms}</ul>
      <p class="hx-price-pos">${E(T(P.positioning, L))}</p>
      <p class="hx-price-cta"><a class="btn" href="${hrefOf("/book-consultation/", L)}#book-form">${E(T(C.OFFER.button, L))}</a></p>
    </section>
`;
}

function compareBlock(L) {
  const X = C.COMPARE;
  const head = T(X.cols, L).map((c, i) => `<th scope="col"${i === 0 ? ' class="is-us"' : ""}>${E(c)}</th>`).join("");
  const rows = X.rows.map((r) => `          <tr><th scope="row">${E(r[L.key])}</th>${r.v.map((v, i) => `<td class="is-${v}${i === 0 ? " is-us" : ""}">${E(T(X.val[v], L))}</td>`).join("")}</tr>\n`).join("");
  return `    <section class="brief hx-compare" aria-labelledby="cmp-title">
      <h2 id="cmp-title">${E(T(X.title, L))}</h2>
      <p>${E(T(X.lead, L))}</p>
      <div class="hx-compare-scroll" role="region" tabindex="0" aria-labelledby="cmp-title">
        <table class="hx-compare-table">
          <thead><tr><th scope="col"><span class="sr-only">${E(T(S.feature, L))}</span></th>${head}</tr></thead>
          <tbody>
${rows}          </tbody>
        </table>
      </div>
    </section>
`;
}

const CASE_IMG = fs.existsSync(path.join(ROOT, C.CASE.img.slice(1)));
function caseBlock(L, card) {
  const K = C.CASE;
  const fig = CASE_IMG ? `<figure class="hx-case-media"><img src="${K.img}" alt="${E(T(K.alt, L))}" width="${K.w}" height="${K.h}" loading="lazy" decoding="async"></figure>` : "";
  return `    <section class="brief hx-case${card ? " hx-case--card" : ""}" aria-labelledby="case-title">
      <div class="hx-case-grid">${fig}
        <div class="hx-case-copy">
          <p class="hx-case-kicker">${E(T(K.kicker, L))}</p>
          <h2 id="case-title">${E(T(K.title, L))}</h2>
          <p>${E(T(K.text, L))}</p>
          <p><a class="hx-case-link" href="${K.url}" target="_blank" rel="noopener">${E(T(K.link, L))} <span aria-hidden="true">↗</span></a></p>
        </div>
      </div>
    </section>
`;
}

// Client feedback: screenshots in assets/testimonials/ with captions in captions.json. Hidden when empty.
const FEED_DIR = path.join(ROOT, "assets", "testimonials");
const FEED = (() => {
  if (!fs.existsSync(FEED_DIR)) return [];
  let caps = {};
  try { caps = JSON.parse(fs.readFileSync(path.join(FEED_DIR, "captions.json"), "utf8")); } catch {}
  return fs.readdirSync(FEED_DIR).filter((f) => /\.(webp|png|jpe?g)$/i.test(f)).sort().map((f) => ({ f, cap: caps[f] || {} }));
})();
function feedbackBlock(L) {
  if (!FEED.length) return "";
  // captions.json: { "file.webp": { "en": "…", "zh": "…" } } — the caption is also the image's alt text
  const figs = FEED.map(({ f, cap }) => {
    const c = typeof cap[L.key] === "string" ? cap[L.key] : typeof cap.en === "string" ? cap.en : "";
    return `        <figure class="hx-feedback-shot"><img src="/assets/testimonials/${f}" alt="${E(c || T(C.FEEDBACK.lead, L))}" loading="lazy" decoding="async">${c ? `<figcaption>${E(c)}</figcaption>` : ""}</figure>\n`;
  }).join("");
  return `    <section class="brief hx-feedback" aria-labelledby="feedback-title">
      <h2 id="feedback-title">${E(T(C.FEEDBACK.title, L))}</h2>
      <p>${E(T(C.FEEDBACK.lead, L))}</p>
      <div class="hx-feedback-grid">
${figs}      </div>
    </section>
`;
}

/* ------------------------------------------------------------ consultation section (Netlify Forms) */
const F = {
  h2a: { en: "Your Business Deserves", zh: "您的工厂，" }, h2b: { en: "What's Next.", zh: "值得被海外买家看见。" },
  benefits: { en: ["A free US Buyer Audit of your website and listings", "3 fixes you can make yourself", "A clear plan and RMB quote, with no obligation"],
    zh: ["免费美国买家视角诊断（网站 + 店铺）", "3条您可以马上自己改进的建议", "清晰的方案与人民币报价，没有任何义务"] },
  role: { en: "Head of Strategy & Consulting, Hurfi", zh: "Hurfi 策略与咨询负责人" }, note: { en: "Let's discuss your goals and build a clear path forward.", zh: "一起梳理目标，规划清晰的出海路径。" },
  wxY: { en: "Connect with Yasir on WeChat", zh: "添加 Yasir 的微信" }, miniRole: { en: "China Client Relations Coordinator", zh: "中国客户关系协调" },
  chinaContact: { en: "China contact:", zh: "中国联系电话：" }, wxS: { en: "Connect on WeChat", zh: "添加微信" },
  formH: { en: "Tell Us About Your Project", zh: "告诉我们您的项目" }, formLead: { en: "Share your requirements and get your free US Buyer Audit.", zh: "填写需求，即可获得免费的美国买家视角诊断。" },
  honey: { en: "Don’t fill this out:", zh: "请勿填写：" },
  name: { en: "Full Name", zh: "姓名" }, nameP: { en: "Your full name", zh: "您的姓名" }, nameE: { en: "Enter your full name.", zh: "请填写您的姓名。" },
  email: { en: "Business Email", zh: "企业邮箱" }, emailE: { en: "Enter a valid business email.", zh: "请填写有效的企业邮箱。" },
  wa: { en: "WhatsApp Number", zh: "WhatsApp 号码" }, waP: { en: "+86 or +880", zh: "+86 或 +880" },
  wc: { en: "WeChat ID", zh: "微信号" }, wcP: { en: "Your WeChat ID", zh: "您的微信号" },
  co: { en: "Company / Brand Name", zh: "公司 / 品牌名称" }, coP: { en: "Your company name", zh: "公司名称" },
  svc: { en: "Service Interested In", zh: "感兴趣的服务" }, svcP: { en: "Select a service", zh: "请选择服务" }, svcE: { en: "Choose a service.", zh: "请选择一项服务。" },
  svcs: [["Business consulting", "业务咨询"], ["Website Development", "外贸网站建设"], ["SEO", "谷歌SEO"], ["Digital Marketing", "谷歌广告与数字营销"], ["Social Media Management", "海外社媒运营"], ["Other / Not sure", "其他 / 暂不确定"]],
  budget: { en: "Project Budget", zh: "项目预算" },
  budgets: { en: ["Under $1,000", "$1,000 – $3,000", "$3,000 – $5,000", "$5,000 – $10,000", "Above $10,000", "Not Sure Yet"],
    zh: ["¥8,000 以下", "¥8,000 – ¥20,000", "¥20,000 – ¥40,000", "¥40,000 – ¥80,000", "¥80,000 以上", "暂不确定"] },
  details: { en: "Project Details", zh: "项目详情" }, detailsP: { en: "Tell us about your business, your goals, and what you need help with...", zh: "请介绍您的业务、目标，以及需要我们协助的内容……" },
  detailsE: { en: "Tell us about the project.", zh: "请简单介绍一下您的项目。" },
  method: { en: "Preferred Contact Method", zh: "希望的联系方式" },
  fail: { en: "We could not send this inquiry. Email yasir@hurfi.com and try again.", zh: "提交未成功，请发邮件至 yasir@hurfi.com，或添加微信联系我们。" },
  send: { en: "Send Your Inquiry", zh: "提交需求" }, wait: { en: "Sending…", zh: "正在提交…" },
  done: { en: "Inquiry received", zh: "已收到您的需求" }, doneP: { en: "Hurfi has your project details and will follow up.", zh: "我们已收到您的项目信息，会尽快与您联系。" },
  close: { en: "Close", zh: "关闭" }, scan: { en: "Scan using WeChat to connect directly.", zh: "使用微信扫码，直接添加。" },
  qrAlt: { en: "WeChat QR code for", zh: "微信二维码：" },
  contactLine: { en: "Fastest reply: WhatsApp or email. WeChat works too.", zh: "建议优先通过微信联系，也可以致电或发邮件。" },
};
const WA_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3zm0 1.6a7.4 7.4 0 0 1 6.3 11.3l-.2.4.7 2.6-2.7-.7-.4.2A7.4 7.4 0 1 1 12 4.6z"/></svg>';
const MAIL_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.2 7h15.6L12 12.2z"/></svg>';

function contactButtons(L) {
  // Chinese pages: WeChat first, then phone, then email. English pages: WhatsApp and email first, WeChat second.
  const wx = `<button class="hx-contact-btn" type="button" data-open-modal="yasir-wechat">${WX}<span>${L.key === "zh" ? "微信" : "WeChat"}</span></button>`;
  const ph = `<a class="hx-contact-btn" href="${C.CONTACT.phoneCNHref}"><span>${C.CONTACT.phoneCN}</span></a>`;
  const em = `<a class="hx-contact-btn" href="mailto:${C.CONTACT.email}">${MAIL_SVG}<span>${C.CONTACT.email}</span></a>`;
  const wa = `<a class="hx-contact-btn" href="${C.CONTACT.whatsapp}" target="_blank" rel="noopener">${WA_SVG}<span>WhatsApp</span></a>`;
  return `<p class="hx-contact-line">${E(T(F.contactLine, L))}</p><div class="hx-contact-row">${L.key === "zh" ? wx + ph + em : wa + em + wx}</div>`;
}

function dialogs(L) {
  return C.CONTACT.wechat.map((w) => `      <dialog class="rk-consult-modal" id="${w.id}" aria-labelledby="${w.id}-title">
        <div class="rk-consult-modal-card">
          <button class="rk-consult-close" type="button" data-close-modal aria-label="${E(T(F.close, L))}">×</button>
          <h3 id="${w.id}-title">${E(T(w.name, L))}</h3>
          <p>${E(T(w.role, L))}</p>
          <img src="${w.qr}" alt="${E(T(F.qrAlt, L) + " " + T(w.name, L))}" width="720" height="960" loading="lazy" decoding="async">
          <p>${E(T(F.scan, L))}</p>
        </div>
      </dialog>
`).join("");
}

function consultBlock(L, url) {
  const t = (k) => E(T(F[k], L));
  const opts = F.svcs.map(([en, zh]) => `                <option value="${E(en)}">${E(L.key === "zh" ? zh : en)}</option>\n`).join("");
  const budgets = T(F.budgets, L).map((b) => `                <label><input type="radio" name="budget" value="${E(b)}"><span>${E(b)}</span></label>\n`).join("");
  const methods = (L.key === "zh" ? [["WeChat", "微信", WX], ["WhatsApp", "WhatsApp", WA_SVG], ["Email", "邮箱", MAIL_SVG]] : [["WhatsApp", "WhatsApp", WA_SVG], ["Email", "Email", MAIL_SVG], ["WeChat", "WeChat", WX]])
    .map(([v, l, svg], i) => `                <label><input type="radio" name="contact_method" value="${v}"${i === 0 ? " checked" : ""}><span>${svg}${E(l)}</span></label>\n`).join("");
  const benefits = T(F.benefits, L).map((b) => `            <li>${E(b)}</li>\n`).join("");
  return `    <section class="rk-consult" aria-labelledby="rk-consult-title">
      <div class="rk-consult-card">
        <div class="rk-consult-intro">
          <p class="rk-consult-badge">${E(T(C.OFFER.title, L))}</p>
          <h2 id="rk-consult-title">
            <span>${t("h2a")}</span>
            <em>${t("h2b")}</em>
          </h2>
          <p class="rk-consult-lead">${E(T(C.OFFER.text, L))}</p>
          <ul class="rk-consult-benefits">
${benefits}          </ul>
          ${contactButtons(L)}
          <article class="rk-consult-person">
            <figure class="rk-consult-portrait"><img src="/assets/team/yasir.webp" alt="${L.key === "zh" ? "Hurfi 策略与咨询负责人 Yasir Arafat" : "Yasir Arafat, Head of Strategy and Consulting at Hurfi"}" width="200" height="200" loading="lazy" decoding="async"></figure>
            <div>
              <h3>Yasir Arafat</h3>
              <p class="rk-consult-role">${t("role")}</p>
              <p class="rk-consult-note">${t("note")}</p>
              <button class="rk-consult-wechat" type="button" data-open-modal="yasir-wechat">${WX}${t("wxY")} <span aria-hidden="true">→</span></button>
            </div>
          </article>
          <article class="rk-consult-mini">
            <img src="/assets/team/sharuk.webp" alt="${L.key === "zh" ? "Hurfi 中国客户关系协调 Shahruk Karim Simanto" : "Shahruk Karim Simanto, China Client Relations Coordinator at Hurfi"}" width="104" height="104" loading="lazy" decoding="async">
            <div>
              <h3>Shahruk Karim Simanto</h3>
              <p>${t("miniRole")}</p>
              <p>${t("chinaContact")} <a href="${C.CONTACT.phoneCNHref}">${C.CONTACT.phoneCN}</a></p>
              <button class="rk-consult-mini-link" type="button" data-open-modal="shahruk-wechat">${WX}${t("wxS")} <span aria-hidden="true">↗</span></button>
            </div>
          </article>
        </div>

        <div class="rk-consult-form-wrap" id="book-form">
          <h3>${t("formH")}</h3>
          <p class="rk-consult-form-lead">${t("formLead")}</p>
          <form class="rk-consult-form" name="project-inquiry" method="POST" action="${hrefOf("/thank-you/", L)}" data-netlify="true" netlify-honeypot="bot-field" novalidate>
            <input type="hidden" name="form-name" value="project-inquiry">
            <input type="hidden" name="page" value="${E((L.prefix || "") + url)}">
            <input type="hidden" name="language" value="${L.code}">
            <p class="rk-consult-honey"><label>${t("honey")} <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
            <label class="rk-consult-field">${t("name")}
              <input type="text" name="name" required autocomplete="name" placeholder="${t("nameP")}" aria-describedby="consult-err-name">
              <span class="rk-consult-error" id="consult-err-name" hidden>${t("nameE")}</span>
            </label>
            <label class="rk-consult-field">${t("email")}
              <input type="email" name="email" required autocomplete="email" placeholder="you@company.com" aria-describedby="consult-err-email">
              <span class="rk-consult-error" id="consult-err-email" hidden>${t("emailE")}</span>
            </label>
            <label class="rk-consult-field">${L.key === "zh" ? t("wc") : t("wa")}
              ${L.key === "zh" ? `<input type="text" name="wechat" placeholder="${t("wcP")}" autocomplete="off">` : `<input type="tel" name="whatsapp" autocomplete="tel" inputmode="tel" placeholder="${t("waP")}">`}
            </label>
            <label class="rk-consult-field">${L.key === "zh" ? t("wa") : t("wc")}
              ${L.key === "zh" ? `<input type="tel" name="whatsapp" autocomplete="tel" inputmode="tel" placeholder="${t("waP")}">` : `<input type="text" name="wechat" placeholder="${t("wcP")}" autocomplete="off">`}
            </label>
            <label class="rk-consult-field rk-consult-span">${t("co")}
              <input type="text" name="company" autocomplete="organization" placeholder="${t("coP")}">
            </label>
            <label class="rk-consult-field">${t("svc")}
              <select name="service" required aria-describedby="consult-err-service">
                <option value="">${t("svcP")}</option>
${opts}              </select>
              <span class="rk-consult-error" id="consult-err-service" hidden>${t("svcE")}</span>
            </label>
            <fieldset class="rk-consult-choice">
              <legend>${t("budget")}</legend>
              <div class="rk-consult-pills">
${budgets}              </div>
            </fieldset>
            <label class="rk-consult-field">${t("details")}
              <textarea name="details" required rows="4" placeholder="${t("detailsP")}" aria-describedby="consult-err-details"></textarea>
              <span class="rk-consult-error" id="consult-err-details" hidden>${t("detailsE")}</span>
            </label>
            <fieldset class="rk-consult-choice">
              <legend>${t("method")}</legend>
              <div class="rk-consult-pills">
${methods}              </div>
            </fieldset>
            <p class="rk-consult-fail" hidden role="alert">${t("fail")}</p>
            <button class="rk-consult-submit" type="submit">
              <span class="rk-consult-send-label">${t("send")}</span>
              <span class="rk-consult-send-wait" hidden>${t("wait")}</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>
          <div class="rk-consult-done" hidden>
            <h3>${t("done")}</h3>
            <p>${t("doneP")}</p>
          </div>
        </div>
      </div>

${dialogs(L)}    </section>
`;
}

/* ------------------------------------------------------------ footer */
const FT = {
  nav: { en: "Navigation", zh: "导航" }, res: { en: "Resources", zh: "资源" }, city: { en: "City guides", zh: "城市指南" }, loc: { en: "Locations", zh: "办公地点" },
  contact: { en: "Contact", zh: "联系方式" }, legal: { en: "Legal", zh: "法律条款" },
  links: {
    nav: [["/", "Home", "首页"], ["/about/", "About", "关于我们"], ["/services/", "Services", "服务"], ["/projects/", "Projects", "项目案例"], ["/industries/", "Industries", "行业"], ["/locations/", "Locations", "地区"], ["/contact/", "Contact", "联系我们"], ["/brand-guidelines/", "Brand Guidelines", "品牌规范"]],
    res: [["/insights/", "Insights", "出海洞察"], ["/insights/manufacturer-website-rfq-checklist/", "RFQ website checklist", "询盘网站清单"], ["/insights/international-seo-checklist-for-exporters/", "International SEO checklist", "国际SEO清单"], ["/insights/industrial-product-page-seo/", "Industrial product page SEO", "工业产品页SEO"], ["/locations/china/", "China directory", "中国城市目录"]],
    city: [["/locations/china/shenzhen/", "Shenzhen", "深圳"], ["/locations/china/guangzhou/", "Guangzhou", "广州"], ["/locations/china/shanghai/", "Shanghai", "上海"], ["/locations/china/suzhou/", "Suzhou", "苏州"], ["/locations/china/ningbo/", "Ningbo", "宁波"], ["/locations/china/xian/", "Xi'an", "西安"], ["/locations/#city-guides", "All city guides", "全部城市指南"]],
    legal: [["/privacy-policy/", "Privacy Policy", "隐私政策"], ["/terms/", "Terms & Conditions", "条款与条件"], ["/refund-policy/", "Refund & Return Policy", "退款政策"]],
  },
  china: { en: "China", zh: "中国" }, bd: { en: "Bangladesh", zh: "孟加拉国" },
  partner: { en: "Official Hostinger® Agency Partner", zh: "Hostinger® 官方合作伙伴机构" }, partnerSub: { en: "Websites we build are hosted with priority Hostinger support.", zh: "我们建设的网站可托管在 Hostinger，并享有优先技术支持。" },
  rights: { en: "All rights reserved.", zh: "保留所有权利。" }, top: { en: "Back to top", zh: "返回顶部" }, bogura: { en: "Bogura", zh: "博格拉" }, xian: { en: "Xi'an", zh: "西安" },
};
function footerBlock(L) {
  const z = L.key === "zh";
  const list = (items) => items.map(([p, en, zh]) => { const [b, h] = p.split("#"); return `<li><a href="${hrefOf(b, L)}${h ? "#" + h : ""}">${E(z ? zh : en)}</a></li>`; }).join("");
  const wx = (w) => `<li><button type="button" class="footer-link-btn" data-open-modal="${w.id}">${z ? "微信" : "WeChat"}：${E(T(w.name, L))}</button></li>`;
  const contact = z
    ? wx(C.CONTACT.wechat[0]) + wx(C.CONTACT.wechat[1]) + `<li><a href="${C.CONTACT.phoneCNHref}">${C.CONTACT.phoneCN}</a></li><li><a href="mailto:${C.CONTACT.email}">${C.CONTACT.email}</a></li><li><a href="${C.CONTACT.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>`
    : `<li><a href="${C.CONTACT.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li><li><a href="mailto:${C.CONTACT.email}">${C.CONTACT.email}</a></li>` + wx(C.CONTACT.wechat[0]).replace("：", ": ") + `<li><a href="${C.CONTACT.phoneCNHref}">${C.CONTACT.phoneCN}</a></li>`;
  const social = `<li><a href="${C.CONTACT.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li><li><a href="${C.CONTACT.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a></li>`;
  return `<footer class="site-footer"><div class="footer-card"><div class="footer-top footer-top--6">` +
    `<nav aria-label="${E(T(FT.nav, L))}"><p class="footer-kicker">${E(T(FT.nav, L))}</p><ul class="footer-list">${list(FT.links.nav)}<li><a href="${hrefOf("/book-consultation/", L)}#book-form">${E(T(C.OFFER.button, L))}</a></li></ul></nav>` +
    `<nav aria-label="${E(T(FT.res, L))}"><p class="footer-kicker">${E(T(FT.res, L))}</p><ul class="footer-list">${list(FT.links.res)}</ul></nav>` +
    `<nav aria-label="${E(T(FT.city, L))}"><p class="footer-kicker">${E(T(FT.city, L))}</p><ul class="footer-list">${list(FT.links.city)}</ul></nav>` +
    `<div><p class="footer-kicker">${E(T(FT.loc, L))}</p>` +
    `<div class="footer-place"><p class="footer-place-name">${E(T(FT.china, L))}</p><p class="footer-address">${E(T(C.ADDRESS.cn, L))}</p><a class="footer-phone" href="${C.CONTACT.phoneCNHref}">${C.CONTACT.phoneCN}</a></div>` +
    `<div class="footer-place"><p class="footer-place-name">${E(T(FT.bd, L))}</p><p class="footer-address">${E(T(C.ADDRESS.bd, L))}</p><a class="footer-phone" href="${C.CONTACT.phoneBDHref}">${C.CONTACT.phoneBD}</a></div></div>` +
    `<nav aria-label="${E(T(FT.contact, L))}"><p class="footer-kicker">${E(T(FT.contact, L))}</p><ul class="footer-list">${contact}${social}</ul></nav>` +
    `<nav aria-label="${E(T(FT.legal, L))}"><p class="footer-kicker">${E(T(FT.legal, L))}</p><ul class="footer-list">${list(FT.links.legal)}</ul></nav></div>` +
    `<div class="footer-partner"><a class="footer-partner-badge" href="https://www.hostinger.com?REFERRALCODE=DSZYASIRA579" target="_blank" rel="sponsored noopener"><img src="/assets/img/partners/hostinger-partner-brand-dark.svg" alt="${E(T(FT.partner, L))}" width="120" height="45" loading="lazy" decoding="async"></a>` +
    `<p class="footer-partner-text"><strong>${E(T(FT.partner, L))}</strong> <span>${E(T(FT.partnerSub, L))}</span></p></div>` +
    `<div class="footer-meta"><p>© <span id="year">${new Date().getFullYear()}</span> Hurfi. <span>${E(T(FT.rights, L))}</span></p>` +
    `<div class="footer-clocks"><p><span>${E(T(FT.xian, L))}</span> <span aria-hidden="true">→</span> <time data-tz="Asia/Shanghai">--:--:--</time></p><p><span>${E(T(FT.bogura, L))}</span> <span aria-hidden="true">→</span> <time data-tz="Asia/Dhaka">--:--:--</time></p></div>` +
    `<button type="button" class="footer-top-btn">${E(T(FT.top, L))}</button></div><p class="footer-mark" aria-hidden="true">Hurfi Global</p></div></footer>`;
}

/* ------------------------------------------------------------ trust line for a page */
const DICT = (() => {
  // Chinese names of industries (from the two industries hubs) for the location lines.
  const en = rd("industries/index.html"), zh = fs.existsSync(path.join(ROOT, "zh/industries/index.html")) ? rd("zh/industries/index.html") : "";
  const pick = (s) => Object.fromEntries([...s.matchAll(/<a class="ind-card" href="(?:\/zh)?\/industries\/([a-z0-9-]+)\/"><h3>([^<]+)<\/h3>/g)].map((m) => [m[1], m[2].replace(/&amp;/g, "&")]));
  return { en: pick(en), zh: pick(zh) };
})();
const LOC_T = [
  { en: (p, a, b) => `${p} has many ${a} and ${b} factories chasing the same orders. US & Western buyers choose the one whose website answers their questions first.`,
    zh: (p, a, b) => `${p}有众多${a}与${b}工厂在争取同一批订单，欧美买家会选择网站能先回答他们问题的那一家。` },
  { en: (p, a, b) => `Buyers looking at ${p}'s ${a} and ${b} suppliers see dozens of similar factories, and they contact the one whose website answers their questions first.`,
    zh: (p, a, b) => `欧美买家在${p}的${a}和${b}供应商中会看到大量同类工厂，他们会联系网站率先把问题讲清楚的那一家。` },
  { en: (p, a, b) => `In ${p}, ${a} and ${b} makers sit side by side. US & Western buyers pick the factory whose website answers their questions before the others do.`,
    zh: (p, a, b) => `在${p}，${a}和${b}企业比邻而居，欧美买家会挑选网站抢先解答他们疑问的工厂。` },
];
const locIndex = {};
function locationLine(url, enHtml, zhHtml) {
  const crumb = (h) => ((h || "").match(/<span aria-current="page">([^<]+)<\/span>/) || [])[1];
  const main = enHtml.slice(enHtml.indexOf("<main"), enHtml.indexOf("</main>"));
  const inds = [...new Set([...main.matchAll(/href="\/industries\/([a-z0-9-]+)\/"/g)].map((m) => m[1]))].filter((s) => DICT.en[s] && DICT.zh[s]).slice(0, 2);
  const pEn = (crumb(enHtml) || "").replace(/&#x27;|&#39;/g, "'"), pZh = crumb(zhHtml) || pEn;
  if (!pEn || inds.length < 2) return null;
  const i = (locIndex.n = (locIndex.n || 0) + 1) % LOC_T.length;
  const lc = (s) => s.replace(/\b([A-Z])([a-z])/g, (m, a, b) => a.toLowerCase() + b).replace(/\bEv\b/i, "EV").replace(/\bcnc\b/i, "CNC").replace(/\boem\b/i, "OEM").replace(/\bodm\b/i, "ODM").replace(/\bhvac\b/i, "HVAC");
  return { en: LOC_T[i].en(pEn, lc(DICT.en[inds[0]]), lc(DICT.en[inds[1]])), zh: LOC_T[i].zh(pZh, DICT.zh[inds[0]], DICT.zh[inds[1]]) };
}
function trustFor(url, enHtml, zhHtml) {
  if (C.TRUST[url]) return { line: C.TRUST[url], where: "top" };
  if (CITY_SERVICE[url]) return { line: CITY_SERVICE[url], where: "top" };
  let m = url.match(/^\/industries\/([a-z0-9-]+)\/$/);
  if (m && INDUSTRY[m[1]]) return { line: INDUSTRY[m[1]], where: "top" };
  m = url.match(/^\/insights\/([a-z0-9-]+)\/$/);
  if (m && INSIGHT[m[1]]) return { line: INSIGHT[m[1]], where: "close" };
  if (/^\/locations\/china\/[a-z-]+\/$/.test(url)) { const l = locationLine(url, enHtml, zhHtml); if (l) return { line: l, where: "top" }; }
  return null;
}

/* ------------------------------------------------------------ assets versioning */
const ver = (rel) => crypto.createHash("sha1").update(fs.readFileSync(path.join(ROOT, rel))).digest("hex").slice(0, 10);
const FONTS_CSS = `<link rel="stylesheet" href="/assets/css/fonts.css?v=${ver("assets/css/fonts.css")}">`;
const SHARED_CSS = `<link rel="stylesheet" href="/assets/css/site-shared.css?v=${ver("assets/css/site-shared.css")}">`;
const BAIDU = C.BAIDU_TONGJI_ID
  ? `<script>var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.async=true;hm.src="https://hm.baidu.com/hm.js?${C.BAIDU_TONGJI_ID}";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();</script>\n`
  : "";

/* ------------------------------------------------------------ JSON-LD */
const SHARED_ID = /#(organization|website|professionalservice)$/;
function rewriteLd(json, L) {
  let o;
  try { o = JSON.parse(json); } catch { return json; }
  const walk = (n, shared) => {
    if (Array.isArray(n)) return n.map((x) => walk(x, shared));
    if (!n || typeof n !== "object") return n;
    shared = shared || SHARED_ID.test(n["@id"] || "") || ["Organization", "WebSite", "ProfessionalService"].includes(n["@type"]);
    const out = {};
    for (const [k, v] of Object.entries(n)) {
      if (typeof v === "string") {
        if (k === "inLanguage") out[k] = L.code;
        else if (!shared && ["@id", "url", "item", "mainEntityOfPage"].includes(k) && (v.startsWith(SITE + "/") || v === SITE)) {
          const [base, frag] = v.split("#"); out[k] = mapUrl(base, L) + (frag !== undefined ? "#" + frag : "");
        } else out[k] = v;
      } else out[k] = walk(v, shared);
    }
    // the one Organization node carries the new address (config.mjs)
    if (n["@type"] === "Organization" && Array.isArray(out.address)) out.address = [{ "@type": "PostalAddress", ...C.ADDRESS.cn.ld }, { "@type": "PostalAddress", ...C.ADDRESS.bd.ld }];
    return out;
  };
  return JSON.stringify(walk(o, false)).replace(/<\//g, "<\\/");
}

/* ------------------------------------------------------------ page transform */
const BANNED = /最|第一|唯一|顶级|首选|国家级|100%/;
function transform(html, url, L, enHtml, zhHtml) {
  const other = L.key === "zh" ? EN : ZH;
  const hasZh = HAS_ZH.has(url) || !!ZH_PAGE_TEXT[url];
  const selfUrl = SITE + (L.prefix || "") + url, zhUrl = SITE + url, enUrl = SITE + "/en" + url;
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  const [headPart, bodyPart] = [html.slice(0, html.indexOf("<body")), html.slice(html.indexOf("<body"))];
  let h = headPart;
  // <html lang>
  h = h.replace(/<html[^>]*>/, `<html lang="${L.code}" data-static-lang="${L.key}">`);
  // Google Fonts out, self-hosted fonts + shared CSS in
  h = h.replace(/[ \t]*<link[^>]*fonts\.(googleapis|gstatic)\.com[^>]*>\n?/g, "").replace(/[ \t]*<noscript>\s*<\/noscript>\n?/g, "");
  h = h.replace(/(<link rel="stylesheet" href="\/assets\/css\/style\.css\?v=[^"]+">)/, `${FONTS_CSS}\n  $1\n  ${SHARED_CSS}`);
  if (!h.includes("fonts.css")) h = h.replace("</head>", `  ${FONTS_CSS}\n  ${SHARED_CSS}\n</head>`);
  // canonical + hreflang
  h = h.replace(/[ \t]*<!-- hurfi:gen:hreflang:(start|end) -->\n/g, "").replace(/[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*">\n/g, "");
  const alts = hasZh && !noindex
    ? `  <link rel="alternate" hreflang="${ZH.hreflang}" href="${zhUrl}">\n  <link rel="alternate" hreflang="${EN.hreflang}" href="${enUrl}">\n  <link rel="alternate" hreflang="x-default" href="${zhUrl}">\n`
    : "";
  if (/<link rel="canonical"[^>]*>/.test(h)) h = h.replace(/[ \t]*<link rel="canonical"[^>]*>\n?/, `  <link rel="canonical" href="${selfUrl}">\n${alts}`);
  else h = h.replace("</head>", `  <link rel="canonical" href="${selfUrl}">\n${alts}</head>`);
  // Open Graph
  h = h.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${selfUrl}">`);
  h = h.replace(/[ \t]*<meta property="og:locale:alternate"[^>]*>\n/g, "");
  h = h.replace(/<meta property="og:locale" content="[^"]*">/, `<meta property="og:locale" content="${L.og}">${hasZh ? `\n  <meta property="og:locale:alternate" content="${other.og}">` : ""}`);
  // JSON-LD
  h = h.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (m, a, j, b) => a + rewriteLd(j, L) + b);
  if (BAIDU) h = h.replace("</head>", BAIDU + "</head>");

  let b = bodyPart;
  // links
  b = b.replace(/(\shref=")([^"]+)(")/g, (m, a, u, z) => a + (u.startsWith(SITE) || u.startsWith("/") ? mapUrl(u, L) : u) + z);
  // header: 中文 / EN links that keep the visitor on the same page
  const sw = `<div class="lang-switch lang-links" role="group" aria-label="${E(T(C.UI.language, L))}"><a href="${hasZh ? url : "/en" + url}" hreflang="${ZH.hreflang}" lang="${ZH.code}"${L.key === "zh" ? ' aria-current="true"' : ""}>${ZH.label}</a><a href="/en${url}" hreflang="${EN.hreflang}" lang="${EN.code}"${L.key === "en" ? ' aria-current="true"' : ""}>${EN.label}</a></div>`;
  if (/<div class="lang-switch"/.test(b)) b = replaceBlock(b, /<div class="lang-switch"[^>]*>/, "div", sw);
  else b = b.replace(/(<nav[^>]*data-site-nav)/, sw + "$1");
  b = b.replace(/<span class="badge badge-hot" aria-label="[^"]*">/g, `<span class="badge badge-hot" aria-label="${E(T(C.UI.hot, L))}">`);
  // footer (static, per language)
  b = replaceBlock(b, /<footer class="site-footer"[^>]*>/, "footer", footerBlock(L));
  const page = (b.match(/<body[^>]*data-page="([^"]*)"/) || [])[1] || "";
  const inMain = (fn) => { const s = b.indexOf("<main"), e = b.indexOf("</main>"); if (s < 0 || e < 0) return; b = b.slice(0, s) + fn(b.slice(s, e)) + b.slice(e); };
  // home + projects: stats, logos heading, no unverifiable ratings or quotes
  inMain((m) => {
    if (/<ul class="rk-meter"/.test(m)) {
      m = replaceBlock(m, /<ul class="rk-platforms"[^>]*>/, "ul", "");
      m = replaceBlock(m, /<ul class="rk-meter"[^>]*>/, "ul", statsBlock(L));
    }
    if (/<div class="rk-hero-logos"/.test(m) && !m.includes("logos-head")) m = m.replace(/(<div class="rk-hero-logos")/, logosHead(L) + "$1");
    if (/<section class="rk-voice"/.test(m)) m = replaceBlock(m, /<section class="rk-voice"[^>]*>/, "section", feedbackBlock(L));
    if (/<section class="rk-cmp"/.test(m)) m = replaceBlock(m, /<section class="rk-cmp"[^>]*>/, "section", compareBlock(L));
    // contact page: cards in the language's contact order (zh: WeChat/China first; en: WhatsApp and email first)
    if (url === "/contact/") {
      const r = blockRange(m, /<div class="desk-grid"[^>]*>/, "div");
      if (r) {
        const grid = m.slice(r[0], r[1]), open = grid.match(/^<div[^>]*>/)[0];
        let rest = grid.slice(open.length, -"</div>".length); const cards = [];
        let k;
        while ((k = blockRange(rest, /<article class="desk-card"[^>]*>/, "article"))) { cards.push(rest.slice(k[0], k[1])); rest = rest.slice(k[1]); }
        if (cards.length === 4) {
          const order = L.key === "zh" ? [1, 3, 0, 2] : [3, 0, 1, 2]; // 0 email, 1 China/WeChat, 2 Bangladesh, 3 WhatsApp + WeChat
          m = m.slice(0, r[0]) + open + "\n        " + order.map((i) => cards[i]).join("\n        ") + "\n      </div>" + m.slice(r[1]);
        }
      }
    }
    // existing consultation markup (home) is replaced by the shared one below
    m = replaceBlock(m, /<section class="rk-consult"[^>]*>/, "section", "");
    // Squoobee case study and feedback (projects), cards on home and website development
    if (url === "/projects/") {
      m = m.replace(/(<section class="proof-band")/, caseBlock(L, false) + "$1");
      if (FEED.length) m = m.replace(/(<section class="proof-band")/, feedbackBlock(L) + "$1");
    }
    if (url === "/") m = m.replace(/(<section class="rk-services")/, caseBlock(L, true) + "$1");
    if (url === "/services/website-development/") m = m.replace(/(<section class="proof-band")/, caseBlock(L, true) + "$1");
    // pricing: services hub, each service page, summary on home
    const svc = (url.match(/^\/services\/([a-z-]+)\/$/) || [])[1];
    if (url === "/services/" || svc) m = /<section class="rk-faq/.test(m) ? m.replace(/(<section class="rk-faq)/, pricingBlock(L, svc, false) + "$1") : m + pricingBlock(L, svc, false);
    if (url === "/") m = m.replace(/(<section class="rk-faq)/, pricingBlock(L, null, true) + "$1");
    // the page-specific trust line
    const tr = trustFor(url, enHtml, zhHtml);
    if (tr) {
      const block = trustBlock(T(tr.line, L), L, tr.where === "close");
      if (tr.where === "close") m = /<section class="brief hx-related-block"/.test(m) ? m.replace(/(    <section class="brief hx-related-block")/, block + "$1") : m + block;
      else if (url === "/") m = m.replace(/(<section class="rk-system")/, block + "$1");
      else if (/<nav class="hx-crumbs"/.test(m)) m = m.replace(/(<nav class="hx-crumbs"[\s\S]*?<\/nav>\n?)/, "$1" + block);
      else if (/<\/header>/.test(m)) m = m.replace(/(<\/header>\n?)/, "$1" + block);
      else m = m.replace(/(<main[^>]*>\n?)/, "$1" + block);
    }
    // consultation form on every page except 404 / thank-you
    if (page !== "404" && page !== "thanks") m = m.includes("data-consult-slot") ? m.replace(/(<[^>]*data-consult-slot[^>]*>)/, "$1\n" + consultBlock(L, url)) : m + consultBlock(L, url);
    // other inquiry forms (China directory): Netlify Forms instead of formsubmit.co
    m = m.replace(/<form class="rk-consult-form" name="([^"]+)" method="POST" action="https:\/\/formsubmit\.co\/[^"]*"([^>]*)>/g,
      (x, name, rest) => `<form class="rk-consult-form" name="${name}" method="POST" action="${hrefOf("/thank-you/", L)}" data-netlify="true" netlify-honeypot="bot-field"${rest}>\n            <input type="hidden" name="page" value="${E((L.prefix || "") + url)}">`);
    m = m.replace(/[ \t]*<input type="hidden" name="_(subject|template|captcha|cc|next)" value="[^"]*">\n/g, "");
    return m;
  });
  // CTA wording: the free consultation
  b = L.key === "zh" ? b.replace(/>(\s*)预约咨询/g, ">$1预约免费咨询") : b.replace(/>(\s*)Book a Consultation/gi, ">$1Book a free consultation");
  return h + b;
}

/* ------------------------------------------------------------ build */
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
const out = (rel, s) => { const p = path.join(DIST, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const report = { pages: 0, zh: 0, en: 0, fallback: [], banned: {} };
const redirects = [];
for (const url of pages) {
  const enHtml = rd(fileOf(url, EN));
  let zhHtml = HAS_ZH.has(url) ? rd(fileOf(url, ZH)) : null;
  if (!zhHtml && ZH_PAGE_TEXT[url]) {
    zhHtml = enHtml;
    for (const [a, z] of ZH_PAGE_TEXT[url]) zhHtml = zhHtml.split(a).join(z);
    // Chinese header from a Chinese page
    const zhHead = rd("zh/contact/index.html"), r = blockRange(zhHead, /<header class="site-header"[^>]*>/, "header");
    if (r) zhHtml = replaceBlock(zhHtml, /<header class="site-header"[^>]*>/, "header", zhHead.slice(r[0], r[1]));
  }
  out("en" + url + "index.html", transform(enHtml, url, EN, enHtml, zhHtml));
  report.en++;
  if (zhHtml) {
    const z = transform(zhHtml, url, ZH, enHtml, zhHtml);
    out(url.slice(1) + "index.html", z);
    report.zh++;
    const text = z.slice(z.indexOf("<main"), z.indexOf("</main>")).replace(/<[^>]+>/g, " ");
    const hits = text.match(new RegExp(BANNED.source, "g"));
    if (hits) report.banned[url] = hits.length;
  } else { report.fallback.push(url); redirects.push(`${url}    /en${url}    302`); }
  report.pages++;
}
// 404: Chinese first, with the English line
{
  let n = rd("404.html");
  const zh404 = [["This page drifted off.", "页面不存在"], ["The link does not match a Hurfi page. Head home, or contact us and say what you were looking for.", "该链接没有对应的页面。请返回首页，或联系我们告诉您要找的内容。（English: <a href=\"/en/\">hurfi.com/en/</a>）"], ["Back home", "返回首页"], ["Contact Hurfi", "联系我们"]];
  let z = n; for (const [a, b] of zh404) z = z.split(a).join(b);
  const fix404 = (s) => s.replace(/<link rel="canonical"[^>]*>\n?/, "").split('href="/en/404/"').join('href="/en/"').split('href="/404/"').join('href="/"');
  out("404.html", fix404(transform(z, "/404/", ZH, n, z)));
  out("en/404.html", fix404(transform(n, "/404/", EN, n, z)));
}
// copy static files
const copyDir = (src, dst) => fs.cpSync(path.join(ROOT, src), path.join(DIST, dst), { recursive: true });
copyDir("assets", "assets");
for (const f of fs.readdirSync(ROOT)) {
  if (/\.(txt|svg|ico|png|webmanifest|xml)$/.test(f) && !["sitemap.xml", "llms.txt"].includes(f)) fs.copyFileSync(path.join(ROOT, f), path.join(DIST, f));
}
if (fs.existsSync(path.join(ROOT, "_headers"))) fs.copyFileSync(path.join(ROOT, "_headers"), path.join(DIST, "_headers"));
// redirects: old /zh/ URLs to the root, then the repo's own rules
const ownRedirects = fs.existsSync(path.join(ROOT, "_redirects")) ? rd("_redirects") : "";
out("_redirects", `# Chinese-first (scripts/site/build.mjs): the old /zh/ URLs moved to the root.\n/zh    /    301\n/zh/*    /:splat    301\n/en    /en/    301\n# Pages without a Chinese version yet\n${redirects.join("\n")}\n\n${ownRedirects}`);

// sitemap with both languages and alternates
{
  const old = {};
  for (const m of rd("sitemap.xml").matchAll(/<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g)) {
    const g = (t) => (m[2].match(new RegExp(`<${t}>([^<]+)</${t}>`)) || [])[1];
    old[m[1]] = { lastmod: g("lastmod"), changefreq: g("changefreq"), priority: g("priority") };
  }
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  const today = new Date().toISOString().slice(0, 10);
  for (const url of pages) {
    const src = rd(fileOf(url, EN));
    if (/<meta name="robots" content="[^"]*noindex/i.test(src)) continue;
    const meta = old[SITE + url] || {}, zmeta = old[SITE + "/zh" + url] || meta;
    const hasZh = HAS_ZH.has(url);
    const alt = hasZh ? `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${SITE}${url}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE}/en${url}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${url}"/>\n` : "";
    const entry = (loc, m) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${m.lastmod || today}</lastmod>\n    <changefreq>${m.changefreq || "monthly"}</changefreq>\n    <priority>${m.priority || "0.6"}</priority>\n${alt}  </url>\n`;
    if (hasZh) xml += entry(SITE + url, zmeta);
    xml += entry(SITE + "/en" + url, meta);
  }
  out("sitemap.xml", xml + "</urlset>\n");
}
// llms.txt: Chinese first, then the English index with /en/ URLs
{
  const enTxt = rd("llms.txt").replace(/https:\/\/hurfi\.com(\/[^)\s]*)/g, (m, p) => SITE + mapPath(p, EN))
    .replace(/https:\/\/hurfi\.com\/en\/zh\//g, SITE + "/");
  const zhLines = ["/", "/about/", "/services/", "/services/website-development/", "/services/seo/", "/services/digital-marketing/", "/services/social-media-management/", "/projects/", "/industries/", "/locations/china/", "/insights/", "/contact/", "/book-consultation/"]
    .filter((u) => HAS_ZH.has(u)).map((u) => { const t = (rd(fileOf(u, ZH)).match(/<title>([^<]*)<\/title>/) || [])[1] || u; return `- [${t.replace(/&amp;/g, "&")}](${SITE}${u})`; }).join("\n");
  const price = C.PRICING.items.map((i) => `- ${i.zh.name}：${i.zh.unit}`).join("\n");
  out("llms.txt", `# Hurfi（中文）\n\n> Hurfi 是扎根中国（西安）的出海营销团队，拥有服务150多家欧美客户的实战经验，为中国制造企业提供外贸独立站、谷歌SEO、谷歌广告与海外社媒运营。网站默认中文，英文版在 ${SITE}/en/。\n\n## 主要页面\n${zhLines}\n\n## 人民币报价（起步价）\n${price}\n\n## 联系方式\n- 微信：Yasir Arafat、Shahruk Karim Simanto（二维码见网站）\n- 电话：${C.CONTACT.phoneCN}\n- 邮箱：${C.CONTACT.email}\n- 中国办公室：${C.ADDRESS.cn.zh}\n- 孟加拉国办公室：${C.ADDRESS.bd.en}\n\n---\n\n${enTxt}`);
}

// guard: no campus/university address anywhere in the output, no banned terms in config copy
const bad = [];
(function scan(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (e.name !== "img" && e.name !== "fonts") scan(p); continue; }
  if (!/\.(html|js|json|txt|xml)$/.test(e.name)) continue; const s = fs.readFileSync(p, "utf8"); if (/Haitianyuan|Polytechnical|西北工业大学|海天苑|长安校区/.test(s)) bad.push(path.relative(DIST, p)); } })(DIST);
if (bad.length) { console.error("Old campus address still in:", bad.slice(0, 10)); process.exit(1); }
const cfgZh = JSON.stringify([C.STATS, C.STATS_NOTE, C.LOGOS, C.OFFER, C.PRICING, C.COMPARE, C.CASE, C.TRUST, INDUSTRY, INSIGHT, CITY_SERVICE, F, FT], (k, v) => v).match(/[一-鿿][^"]*/g) || [];
const cfgBad = cfgZh.filter((s) => BANNED.test(s));
if (cfgBad.length) { console.error("Absolute terms in config copy:", cfgBad); process.exit(1); }
fs.writeFileSync(path.join(ROOT, "build-report.json"), JSON.stringify(report, null, 1));
console.log(`dist: ${report.zh} Chinese pages at /, ${report.en} English pages at /en/; ${report.fallback.length} without Chinese (302 to /en/): ${report.fallback.join(", ")}`);
console.log(`absolute terms left in Chinese page text: ${Object.values(report.banned).reduce((a, b) => a + b, 0)} on ${Object.keys(report.banned).length} pages (details in dist/.build-report.json)`);
if (warn.length) console.log(warn.join("\n"));

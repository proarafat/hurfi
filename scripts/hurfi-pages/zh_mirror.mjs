#!/usr/bin/env node
/*
 * Static Simplified Chinese mirror of the English site.
 *
 *   node scripts/hurfi-pages/zh_mirror.mjs            write /zh/** pages, hreflang, sitemap, edge paths
 *   node scripts/hurfi-pages/zh_mirror.mjs --report   coverage per page, writes nothing
 *   node scripts/hurfi-pages/zh_mirror.mjs --missing  untranslated strings (JSON) for pages below 100%
 *
 * Why: the 中文 switch used to translate in the browser only (assets/js/i18n.js), so
 * search engines saw English everywhere and Chinese queries never matched. This script
 * applies the same dictionary at build time and writes a real page per URL under /zh/,
 * with its own canonical, hreflang pairs, translated <title>/description and JSON-LD.
 *
 * Source of truth for wording: the zh dictionary in assets/js/i18n.js, plus
 * content/zh-meta.json for strings only search engines see (titles, descriptions).
 * The five hand-written pages in content/zh.json (/zh/, /zh/services/*) are kept as
 * they are; only their internal links are pointed at the Chinese mirror.
 *
 * build.py runs this as its last step. Re-running is idempotent.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const SITE = "https://hurfi.com";
const ZH_LANG = "zh-Hans";
// A page is mirrored only when the dictionary covers this share of its visible text.
// Below it the page would read as half English, which is worse than no zh page.
const MIN_COVERAGE = 0.9;

const args = new Set(process.argv.slice(2));
const REPORT = args.has("--report");
const MISSING = args.has("--missing");

const rd = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
function wr(rel, text) {
  const file = path.join(ROOT, rel);
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === text) return false;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
  console.log("wrote " + rel.replace(/\\/g, "/"));
  return true;
}

/* ------------------------------------------------------------ dictionary */

const DICT_RAW = { zh: null, fr: null }; // the dictionaries exactly as i18n.js ships them

function loadDict() {
  let src = rd("assets/js/i18n.js");
  const hook = "window.HURFI_I18N = {";
  if (!src.includes(hook)) throw new Error("i18n.js: export hook not found");
  src = src.replace(hook, "window.__DICTS = { zh: zh, fr: fr };\n  " + hook);
  const el = { getAttribute: () => null, lang: "en" };
  const sandbox = {
    window: {},
    document: { documentElement: el, body: null, title: "" },
    localStorage: { getItem: () => null, setItem() {} },
    NodeFilter: {},
  };
  vm.runInNewContext(src, sandbox, { filename: "i18n.js" });
  DICT_RAW.zh = { ...sandbox.window.__DICTS.zh };
  DICT_RAW.fr = { ...sandbox.window.__DICTS.fr };
  const zh = { ...sandbox.window.__DICTS.zh };
  const metaFile = path.join(HERE, "content", "zh-meta.json");
  if (fs.existsSync(metaFile)) {
    const extra = JSON.parse(fs.readFileSync(metaFile, "utf8"));
    for (const [k, v] of Object.entries(extra)) if (!k.startsWith("_")) zh[k] = v;
  }
  return zh;
}

/* ------------------------------------------------------------ html helpers */

const NAMED = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0", rsquo: "\u2019", lsquo: "\u2018",
  rdquo: "\u201d", ldquo: "\u201c", mdash: "\u2014", ndash: "\u2013", hellip: "\u2026", middot: "\u00b7",
  copy: "\u00a9", reg: "\u00ae", trade: "\u2122", rarr: "\u2192", larr: "\u2190", times: "\u00d7",
  bull: "\u2022", deg: "\u00b0", plusmn: "\u00b1", eacute: "\u00e9", yen: "\u00a5", euro: "\u20ac",
  laquo: "\u00ab", raquo: "\u00bb", thinsp: "\u2009", ensp: "\u2002", emsp: "\u2003", shy: "\u00ad",
};
function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return String.fromCodePoint(n);
    }
    return NAMED[e] !== undefined ? NAMED[e] : m;
  });
}
const escText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => escText(s).replace(/"/g, "&quot;");

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const RAW = new Set(["script", "style", "noscript", "textarea"]);
const TOKEN = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s"'>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*\/?>/gi;
const ATTR = /([^\s"'>\/=]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'>]+))?/g;

/**
 * Walk an HTML document the way the browser-side translator walks document.body:
 * every text node outside <script>/<style>/<noscript> and outside .lang-switch,
 * plus the translatable attributes. `onText(decoded)` returns a replacement or null;
 * `onTag(name, attrsString, isClose, ctx)` may return a rewritten tag.
 */
function walk(html, { onText, onTag }) {
  let out = "";
  let last = 0;
  let inBody = false;
  let rawUntil = null;
  let langDepth = 0; // >0 while inside .lang-switch
  let m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(html))) {
    const text = html.slice(last, m.index);
    if (rawUntil) {
      if (m[1] && m[0][1] === "/" && m[1].toLowerCase() === rawUntil) {
        out += text + m[0];
        rawUntil = null;
        last = TOKEN.lastIndex;
      }
      continue;
    }
    out += inBody && !langDepth && onText ? textOut(text, onText) : text;
    last = TOKEN.lastIndex;
    const tag = m[0];
    if (!m[1]) { out += tag; continue; } // comment / doctype
    const name = m[1].toLowerCase();
    const close = tag[1] === "/";
    if (name === "body") inBody = !close;
    if (langDepth) {
      if (name === "div") langDepth += close ? -1 : 1;
      out += tag;
      continue;
    }
    let rewritten = onTag ? onTag(name, m[2] || "", close, { inBody }) : null;
    out += rewritten == null ? tag : rewritten;
    if (!close && /\bclass\s*=\s*"[^"]*\blang-switch\b/.test(tag)) langDepth = name === "div" ? 1 : 0;
    if (!close && RAW.has(name) && !/\/>$/.test(tag)) rawUntil = name;
  }
  out += html.slice(last);
  return out;
}

function textOut(raw, onText) {
  if (!raw.trim()) return raw;
  // Keep the source whitespace around the phrase, as the browser translator does.
  const lead = raw.match(/^\s*/)[0];
  const trail = raw.slice(lead.length).match(/\s*$/)[0];
  const core = raw.slice(lead.length, raw.length - trail.length);
  const got = onText(decode(core));
  if (got == null) return raw;
  // English puts a space between a word and an inline link; Chinese does not. Drop a plain
  // space (never a line break) where the translation starts or ends with a Chinese character.
  const l = / +$/.test(lead) && !/\n/.test(lead) && CJK_EDGE.test(got[0] || "") ? "" : lead;
  const t = / +$/.test(trail) && !/\n/.test(trail) && CJK_EDGE.test(got[got.length - 1] || "") ? "" : trail;
  return l + escText(got) + t;
}
const CJK_EDGE = /[\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]/;

function attrs(str) {
  const list = [];
  let a;
  ATTR.lastIndex = 0;
  while ((a = ATTR.exec(str))) {
    let v = a[2];
    let q = '"';
    if (v != null && (v[0] === '"' || v[0] === "'")) { q = v[0]; v = v.slice(1, -1); }
    list.push({ name: a[1], value: v == null ? null : v, q });
  }
  return list;
}
function attrStr(list) {
  return list.map((a) => (a.value == null ? " " + a.name : " " + a.name + "=" + a.q + a.value + a.q)).join("");
}
const getAttr = (str, n) => (attrs(str).find((a) => a.name.toLowerCase() === n) || {}).value;

/* ------------------------------------------------------------ pages */

const SKIP_DIRS = new Set(["node_modules", "assets", "scripts", "data", "zh", "dist", "hurfi.com-Coverage-2026-11-15", ".git", ".github", "netlify"]);
// Not worth a Chinese twin: noindex utility pages.
const SKIP_PAGES = new Set(["/thank-you/"]);

function englishPages() {
  const out = [];
  (function dir(rel) {
    for (const e of fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (rel === "" && (SKIP_DIRS.has(e.name) || e.name.startsWith("."))) continue;
        dir(rel ? rel + "/" + e.name : e.name);
      } else if (e.name === "index.html") {
        const url = "/" + (rel ? rel + "/" : "");
        if (!SKIP_PAGES.has(url)) out.push(url);
      }
    }
  })("");
  return out.sort();
}
const fileOf = (url) => (url === "/" ? "index.html" : url.slice(1) + "index.html");

function isProse(v) {
  // Same filter as textNodes() in i18n.js: proper nouns, numbers and logo letters are not prose.
  return v.length > 1 && /[a-z\u4e00-\u9fff]/.test(v);
}

const TRANSLATABLE_ATTRS = new Set(["aria-label", "placeholder", "alt", "title", "data-label", "data-tip"]);

// Brand and product names that stay in Latin script on the Chinese pages.
const KEEP = new Set(["Hurfi", "Google", "Trustpilot", "Clutch", "LinkedIn", "WeChat", "Behance", "Instagram",
  "Facebook", "YouTube", "TikTok", "Alibaba", "Made-in-China", "Global Sources", "Hostinger", "GoodFirms", "Upwork", "Fiverr",
  // client logos (alt text)
  "Gapgastro", "Ghorsajan", "Wosny", "ZorgHulpGids", "Goli", "idsein", "Oppein", "BuyCellFix", "KaMatch", "Avidaze"]);

const PLACES = JSON.parse(rd("scripts/hurfi-pages/content/zh-places.json"));
const provKey = (p) => (p || "").toLowerCase().replace(/[^a-z]/g, "");

/** Chinese name of a place; `prov` disambiguates (Yulin, Shaanxi 榆林 vs Yulin, Guangxi 玉林). */
function place(name, prov) {
  const k = name.trim();
  if (prov && PLACES[k + "|" + provKey(prov)]) return PLACES[k + "|" + provKey(prov)];
  return PLACES[k];
}

// Sentence patterns that repeat once per city or province. Each returns undefined
// when a part is unknown, so the string is reported as missing instead of half-done.
const TEMPLATES = [
  [/^Hurfi helps B2B manufacturers and suppliers in (.+?), (.+) with websites, SEO, and digital marketing\.$/, (m) => {
    const p = place(m[2]), c = place(m[1], m[2]);
    if (!p || !c) return undefined;
    return "Hurfi 为" + (c === p ? c : p + c) + "的 B2B 制造商和供应商提供网站建设、SEO 和数字营销服务。";
  }],
  [/^(.+) city guide$/, (m) => place(m[1]) && place(m[1]) + "城市指南"],
  [/^(.+) in the (.+) guide$/, (m) => place(m[2]) && place(m[1], m[2]) && place(m[2]) + "指南中的" + place(m[1], m[2])],
  [/^(.+) in the China directory$/, (m) => place(m[1]) && "中国地区目录中的" + place(m[1])],
  [/^Talk to us about (.+)$/, (m) => place(m[1]) && "联系 Hurfi，聊聊" + place(m[1])],
  [/^Questions from (.+) manufacturers$/, (m) => place(m[1]) && place(m[1]) + "制造商常见问题"],
  [/^How Hurfi helps (.+) manufacturers$/, (m) => place(m[1]) && "Hurfi 如何帮助" + place(m[1]) + "制造商"],
  [/^Does Hurfi have an office in (.+)\?$/, (m) => place(m[1]) && "Hurfi 在" + place(m[1]) + "有办公室吗？"],
  [/^Challenges (.+) manufacturers face online$/, (m) => place(m[1]) && place(m[1]) + "制造商在线上面临的挑战"],
  [/^What (.+) makes, according to official data$/, (m) => place(m[1]) && "官方数据所呈现的" + place(m[1]) + "产业"],
  [/^Questions overseas buyers ask (.+) suppliers$/, (m) => place(m[1]) && "海外买家向" + place(m[1]) + "供应商提出的问题"],
  [/^Industrial zones and districts in (.+)$/, (m) => place(m[1]) && place(m[1]) + "的工业园区与行政区"],
  [/^(.+), China$/, (m) => place(m[1]) && "中国" + place(m[1])],
  [/^Source (\d+)$/, (m) => "来源 " + m[1]],
];

let CTX_PROV = null; // province of the directory card being walked (from id="city-<province>-<city>")

function lookup(zh, s) {
  const core = s.trim();
  const key = core.replace(/\s+/g, " ");
  if (CTX_PROV && PLACES[key + "|" + CTX_PROV]) return PLACES[key + "|" + CTX_PROV];
  const got = (PAGE_ZH && (PAGE_ZH[core] ?? PAGE_ZH[key])) ?? zh[core] ?? zh[key];
  if (got !== undefined) return got;
  // Already Chinese (no Latin lowercase left), or a brand name: nothing to translate.
  if (/[\u4e00-\u9fff]/.test(key) && !/[a-z]{2,}/.test(key)) return key;
  if (KEEP.has(key)) return key;
  if (PLACES[key] && !key.startsWith("_")) return PLACES[key];
  // "Guangdong · Electronics & Semiconductor", "Hubei · Central China"
  if (key.includes(" · ")) {
    const parts = key.split(" · ").map((p) => lookup(zh, p));
    if (parts.every((p) => p !== undefined)) return parts.join(" · ");
  }
  for (const [re, fn] of TEMPLATES) {
    const m = key.match(re);
    if (m) { const out = fn(m); if (out) return out; }
  }
  return undefined;
}

/** Track directory-card context so shared city names resolve to the right province. */
function trackCtx(name, attrString, close) {
  if (close) return;
  const id = /\bid="city-([a-z]+)-/.exec(attrString);
  if (id) CTX_PROV = id[1];
  else if (name === "section" || name === "main") CTX_PROV = null;
}

function coverage(html, zh) {
  let total = 0, hit = 0;
  const miss = [];
  CTX_PROV = null;
  walk(html, {
    onTag(name, a, close) { trackCtx(name, a, close); return null; },
    onText(t) {
      const key = t.trim().replace(/\s+/g, " ");
      if (!isProse(key)) return null;
      total++;
      if (lookup(zh, t) !== undefined) hit++;
      else miss.push(key);
      return null;
    },
  });
  return { total, hit, ratio: total ? hit / total : 0, miss };
}

function headMeta(html) {
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "").trim();
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
  return { title, desc };
}

/* ------------------------------------------------------------ main */

const zh = loadDict();
// Native Chinese for the core pages (content/zh-native.json): used before the dictionary, on those pages only.
const NATIVE = (() => { try { return JSON.parse(fs.readFileSync(path.join(HERE, "content", "zh-native.json"), "utf8")); } catch { return { pages: [], map: {}, meta: {} }; } })();
let PAGE_ZH = null;
function nativeFor(url) {
  if (!NATIVE.pages.includes(url)) return null;
  const m = { ...NATIVE.map }, meta = NATIVE.meta[url] || {};
  for (const k of ["title", "desc"]) if (meta[k]) m[meta[k][0]] = meta[k][1];
  return m;
}
const pages = englishPages();
// The home page and the four service pages used to have short hand-written Chinese versions (zh.json).
// Chinese is now the default site, so they get full twins like every other page (dictionary coverage is 100%).
// Pages whose Chinese twin is written by hand (whole sentences, bold keywords and inline links):
// zh_mirror keeps that file as it is (only English leftovers get the dictionary wording).
const HANDMADE = {
  "/services/website-development/": "/zh/services/website-development/", // scripts/hurfi-pages/service_webdev.mjs
  "/services/seo/": "/zh/services/seo/", // scripts/hurfi-pages/service_seo.mjs
};

const stats = pages.map((url) => {
  const html = rd(fileOf(url));
  PAGE_ZH = nativeFor(url);
  const c = coverage(html, zh);
  const { title, desc } = headMeta(html);
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  return { url, html, ...c, title, desc, noindex,
    titleOk: !title || lookup(zh, title) !== undefined, descOk: !desc || lookup(zh, desc) !== undefined };
});

if (REPORT || MISSING) {
  if (REPORT) {
    for (const s of stats) {
      console.log(`${(s.ratio * 100).toFixed(1).padStart(5)}%  ${String(s.total - s.hit).padStart(4)} missing  title:${s.titleOk ? "y" : "N"} desc:${s.descOk ? "y" : "N"}${s.noindex ? " noindex" : ""}  ${s.url}`);
    }
    const ok = stats.filter((s) => s.ratio >= MIN_COVERAGE).length;
    console.log(`\n${ok}/${stats.length} pages at >= ${MIN_COVERAGE * 100}% coverage`);
  } else {
    const out = {};
    for (const s of stats) {
      for (const k of s.miss) out[k] = (out[k] || 0) + 1;
      if (!s.titleOk) out[s.title] = (out[s.title] || 0) + 1;
      if (!s.descOk) out[s.desc] = (out[s.desc] || 0) + 1;
    }
    console.log(JSON.stringify(out, null, 1));
  }
  process.exit(0);
}

/* ------------------------------------------------------------ which pages get a twin */

const ZH_URL = {}; // English path -> Chinese path
for (const s of stats) {
  if (HANDMADE[s.url]) { ZH_URL[s.url] = HANDMADE[s.url]; continue; }
  if (s.noindex) continue;
  if (s.ratio < MIN_COVERAGE || !s.titleOk || !s.descOk) {
    console.log(`skip ${s.url}: ${(s.ratio * 100).toFixed(1)}% covered${s.titleOk ? "" : ", title"}${s.descOk ? "" : ", description"} untranslated`);
    continue;
  }
  ZH_URL[s.url] = "/zh" + s.url;
}

function zhHref(href) {
  const m = /^(\/[^?#]*)([?#].*)?$/.exec(href);
  if (!m) return null;
  let p = m[1];
  if (p === "/zh" || p.startsWith("/zh/")) return null;
  if (!p.endsWith("/") && !/\.[a-z0-9]+$/i.test(p)) p += "/";
  return ZH_URL[p] ? ZH_URL[p] + (m[2] || "") : null;
}
function zhAbs(u) {
  const m = /^https:\/\/hurfi\.com(\/[^#?]*)?([#?].*)?$/.exec(u);
  if (!m) return u;
  const z = zhHref((m[1] || "/") + (m[2] || ""));
  return z ? SITE + z : u;
}

/* ------------------------------------------------------------ body */

const attrMiss = {};
function translateBody(html) {
  CTX_PROV = null;
  return walk(html, {
    onTag(name, a, close, ctx) {
      trackCtx(name, a, close);
      if (close || !ctx.inBody) return null;
      const list = attrs(a);
      let changed = false;
      for (const at of list) {
        const n = at.name.toLowerCase();
        if (at.value == null) continue;
        if (TRANSLATABLE_ATTRS.has(n)) {
          const v = decode(at.value);
          if (!v.trim()) continue;
          const t = lookup(zh, v);
          if (t !== undefined) { at.value = escAttr(t); at.q = '"'; changed = true; }
          else if (/[a-z]{3,}/.test(v) && !/[一-鿿]/.test(v)) attrMiss[v] = (attrMiss[v] || 0) + 1;
        } else if (n === "href" && (name === "a" || name === "area")) {
          const z = zhHref(decode(at.value));
          if (z) { at.value = escAttr(z); changed = true; }
        }
      }
      if (!changed) return null;
      const selfClose = /\/>$/.test(a) ? "" : "";
      return "<" + name + attrStr(list) + selfClose + ">";
    },
    onText(t) {
      const key = t.trim().replace(/\s+/g, " ");
      const out = lookup(zh, t);
      return out === undefined || out === key ? null : out;
    },
  });
}


/* ------------------------------------------------------------ head */

const LD_SHARED_ID = /#(organization|website|professionalservice)$/;
const LD_SHARED_TYPE = new Set(["Organization", "WebSite", "ProfessionalService"]);
const LD_TEXT = new Set(["name", "headline", "description", "text", "alternativeHeadline", "caption", "abstract"]);
const LD_URL = new Set(["@id", "url", "item", "mainEntityOfPage"]);
let ldMiss = 0;
const LD_MISS = {};

function faqPairs(body) {
  const pairs = {};
  const strip = (s) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  for (const m of body.matchAll(/<details\b[^>]*>\s*<summary\b[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)) {
    pairs[strip(m[1])] = strip(m[2])
      .replace(/([\u3000-\u303f\u4e00-\u9fff\uff00-\uffef])\s+(?=[\u3000-\u303f\u4e00-\u9fff\uff00-\uffef])/g, "$1");
  }
  return pairs;
}

function rewriteLd(json, pairs) {
  let obj;
  try { obj = JSON.parse(json); } catch { return json; }
  let faqBroken = false;
  const isShared = (n) => LD_SHARED_ID.test(n["@id"] || "") || LD_SHARED_TYPE.has(n["@type"]);
  function node(n, shared, inFaq) {
    if (Array.isArray(n)) return n.map((x) => node(x, shared, inFaq));
    if (!n || typeof n !== "object") return n;
    shared = shared || isShared(n);
    inFaq = inFaq || n["@type"] === "FAQPage";
    const out = {};
    for (const [k, v] of Object.entries(n)) {
      if (typeof v !== "string" || shared) { out[k] = typeof v === "string" ? v : node(v, shared, inFaq); continue; }
      if (k === "inLanguage") out[k] = ZH_LANG;
      else if (LD_URL.has(k) && v.startsWith(SITE + "/")) out[k] = zhAbs(v);
      else if (LD_TEXT.has(k)) {
        let t = lookup(zh, v);
        if (t === undefined && inFaq && n["@type"] === "Answer") t = pairs.__q && pairs[pairs.__q];
        if (t === undefined) { if (inFaq) faqBroken = true; else { ldMiss++; LD_MISS[v] = 1; } t = v; }
        if (inFaq && n["@type"] === "Question" && k === "name") pairs.__q = t;
        out[k] = t;
      } else out[k] = v;
    }
    return out;
  }
  const res = node(obj, false, false);
  // Rich results must match the visible text; an FAQ we cannot match is left out.
  if (faqBroken) return null;
  return JSON.stringify(res);
}

function metaContent(html, attr, name) {
  const re = new RegExp('<meta ' + attr + '="' + name.replace(/[:.]/g, "\\$&") + '" content="([^"]*)"');
  const m = html.match(re);
  return m ? decode(m[1]) : null;
}

function zhHead(head, url, zurl, body) {
  const pairs = faqPairs(body);
  const { title, desc } = headMeta(head);
  const zTitle = lookup(zh, title);
  const zDesc = lookup(zh, desc);
  let h = head;
  h = h.replace(/<html lang="[^"]*"/, '<html lang="' + ZH_LANG + '" data-static-lang="zh"');
  h = h.replace(/<title>[\s\S]*?<\/title>/, "<title>" + escText(zTitle) + "</title>");
  const setMeta = (attr, name, fallback) => {
    const cur = metaContent(h, attr, name);
    if (cur == null) return;
    const t = lookup(zh, cur) ?? fallback;
    if (t == null) return;
    const re = new RegExp('(<meta ' + attr + '="' + name.replace(/[:.]/g, "\\$&") + '" content=")[^"]*(")');
    h = h.replace(re, (m0, a, b) => a + escAttr(t) + b);
  };
  setMeta("name", "description", zDesc);
  setMeta("property", "og:title", zTitle);
  setMeta("property", "og:description", zDesc);
  setMeta("name", "twitter:title", zTitle);
  setMeta("name", "twitter:description", zDesc);
  setMeta("property", "og:image:alt", null);
  setMeta("name", "twitter:image:alt", null);
  h = h.replace(/(<meta property="og:locale" content=")[^"]*(")/, "$1zh_CN$2");
  h = h.replace(/(<meta property="og:url" content=")[^"]*(")/, "$1" + SITE + zurl + "$2");
  // hreflang: drop whatever the English page carries, then write the pair for this URL.
  h = h.replace(/[ \t]*<!-- hurfi:gen:hreflang:start -->[\s\S]*?<!-- hurfi:gen:hreflang:end -->\r?\n?/, "");
  h = h.replace(/[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*">\r?\n?/g, "");
  h = h.replace(/(<link rel="canonical" href=")[^"]*(">)(\r?\n)?/, (m0, a, b, nl) =>
    a + SITE + zurl + b + (nl || "\n") + alternates(url, zurl));
  h = baiduHead(h);
  // fonts.googleapis.com is blocked or very slow inside mainland China. A render-blocking
  // stylesheet from it leaves the page blank until it times out, so load it without blocking;
  // the Chinese text uses system fonts anyway.
  h = h.replace(/<link href="(https:\/\/fonts\.googleapis\.com\/css2[^"]*)" rel="stylesheet">/, (m0, href) =>
    '<link rel="stylesheet" href="' + href + '" media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet" href="' + href + '"></noscript>');
  h = h.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)(\r?\n)?/g, (m0, a, json, b, nl) => {
    const out = rewriteLd(json, pairs);
    return out == null ? "" : a + out + b + (nl || "");
  });
  return h;
}

// Tags Baidu reads on Chinese pages (it ignores hreflang):
//   content-language zh-CN  - language of the page
//   no-transform/no-siteapp - do not transcode the page into a Baidu-hosted mobile copy
//   applicable-device       - one responsive page serves PC and mobile (Baidu 移动适配)
const BAIDU_META = [
  ['http-equiv="content-language"', '<meta http-equiv="content-language" content="zh-CN">'],
  ['content="no-transform"', '<meta http-equiv="Cache-Control" content="no-transform">'],
  ['content="no-siteapp"', '<meta http-equiv="Cache-Control" content="no-siteapp">'],
  ['name="applicable-device"', '<meta name="applicable-device" content="pc,mobile">'],
];
function baiduHead(h) {
  const nl = h.includes("\r\n") ? "\r\n" : "\n";
  const add = BAIDU_META.filter(([probe]) => !h.toLowerCase().includes(probe.toLowerCase())).map(([, tag]) => "  " + tag + nl).join("");
  if (!add) return h;
  return h.replace(/(<meta name="viewport"[^>]*>)(\r?\n)/, (m0, a, b) => a + b + add);
}

function alternates(en, zhPath) {
  return "  <!-- hurfi:gen:hreflang:start -->\n" +
    '  <link rel="alternate" hreflang="en" href="' + SITE + en + '">\n' +
    '  <link rel="alternate" hreflang="' + ZH_LANG + '" href="' + SITE + zhPath + '">\n' +
    '  <link rel="alternate" hreflang="x-default" href="' + SITE + en + '">\n' +
    "  <!-- hurfi:gen:hreflang:end -->\n";
}

/* ------------------------------------------------------------ write */

let written = 0;

/* ------------------------------------------------------------ runtime i18n bundle */
// assets/js/i18n.js holds every zh string (3.6 MB; its old fr block is unused) and stays the file
// translators edit. Pages load assets/js/i18n-run.js instead: the same code, with only the Chinese
// strings that scripts insert at runtime (static text is already Chinese). The site has no French
// version: FR_PAGES is empty, so the runtime never offers FR. The file name carries a content hash,
// so a changed dictionary is never served stale from the year-long cache.

const hash = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 10);
const jsUnescape = (s) => s.replace(/\\u([0-9a-fA-F]{4})/g, (m, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\(['"\\/])/g, "$1");

const RUNTIME = (() => {
  // Every string a script could put on the page: the JS files and the inline scripts.
  let blob = fs.readdirSync(path.join(ROOT, "assets", "js")).filter((f) => f.endsWith(".js") && !f.startsWith("i18n"))
    .map((f) => rd("assets/js/" + f)).join("\n");
  for (const s of stats) {
    for (const m of s.html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) if (!/ld\+json/.test(m[1])) blob += "\n" + m[2];
  }
  blob = decode(jsUnescape(blob));
  const zhRun = {};
  for (const [k, v] of Object.entries(DICT_RAW.zh)) if (k === "Language" || blob.includes(k)) zhRun[k] = v;

  let src = rd("assets/js/i18n.js");
  const a = src.indexOf("  var zh = {"), b = src.indexOf("  function map() {");
  if (a < 0 || b < a) throw new Error("i18n.js: dictionary block not found");
  const marker = "  var FR_PAGES = null, FR_SRC = null; // set in i18n-run.js";
  if (!src.includes(marker)) throw new Error("i18n.js: FR_PAGES marker not found");
  src = "/* Generated from assets/js/i18n.js by scripts/hurfi-pages/zh_mirror.mjs. Edit i18n.js and rerun; do not edit this file. */\n" +
    src.slice(0, a) + "  var zh = " + JSON.stringify(zhRun) + ";\n  var fr = {};\n\n" + src.slice(b);
  src = src.replace(marker, "  var FR_PAGES = {}, FR_SRC = null; // no French version");
  if (fs.existsSync(path.join(ROOT, "assets/js/i18n-fr.js"))) { fs.rmSync(path.join(ROOT, "assets/js/i18n-fr.js")); written++; }
  if (wr("assets/js/i18n-run.js", src)) written++;
  return { tag: "/assets/js/i18n-run.js?v=" + hash(src), zh: Object.keys(zhRun).length, kb: Math.round(Buffer.byteLength(src) / 1024) };
})();
const swapRuntime = (html) => html.replace(/\/assets\/js\/i18n(?:-run)?\.js\?v=[0-9a-z]+/g, RUNTIME.tag);

const extraFor = {
  // The directory search renders results from English data at runtime; give it the names.
  "/locations/china/": () => {
    const w = {};
    new Function("window", rd("assets/js/china-locations.js"))(w);
    const out = {};
    const put = (k, v) => { if (k && v && k !== v) out[k] = v; };
    for (const c of w.HURFI_CHINA.cities) {
      put(c.name, place(c.name));
      const amb = PLACES[c.name + "|" + provKey(c.provinceSlug)];
      if (amb) out[c.name + "|" + provKey(c.provinceSlug)] = amb;
      put(c.province, place(c.province));
      put(c.industrialRegion, place(c.industrialRegion));
      for (const s of c.industrialSectors) put(s, lookup(zh, s));
    }
    return "  <script>window.HURFI_ZH_EXTRA=" + JSON.stringify(out) + ";</script>\n";
  },
};

for (const s of stats) {
  const zurl = ZH_URL[s.url];
  const src = s.html;
  let en = swapRuntime(src);
  // English page: reciprocal hreflang (build.py writes it for the five hand-written pairs).
  if (zurl && !HANDMADE[s.url]) {
    const block = alternates(s.url, zurl);
    if (en.includes("<!-- hurfi:gen:hreflang:start -->")) {
      en = en.replace(/[ \t]*<!-- hurfi:gen:hreflang:start -->[\s\S]*?<!-- hurfi:gen:hreflang:end -->\r?\n/, block);
    } else {
      en = en.replace(/(<link rel="canonical" href="[^"]*">)(\r?\n)/, (m0, a, nl) => a + nl + block);
    }
  }
  if (en !== src && wr(fileOf(s.url), en)) written++;
  if (!zurl) continue;
  if (HANDMADE[s.url]) {
    const rel = fileOf(zurl);
    const cur = swapRuntime(rd(rel));
    // Chinese text passes through unchanged; English leftovers (link titles copied from
    // English pages) get the dictionary wording, and links point at the Chinese twins.
    const cut = cur.indexOf("</head>");
    if (wr(rel, baiduHead(cur.slice(0, cut)) + translateBody(cur.slice(cut)))) written++;
    continue;
  }

  // Chinese page.
  PAGE_ZH = nativeFor(s.url);
  const cut = en.indexOf("</head>");
  const bodyZh = translateBody(en.slice(cut));
  let headZh = zhHead(en.slice(0, cut), s.url, zurl, bodyZh);
  if (extraFor[s.url]) headZh += extraFor[s.url]();
  let page = headZh + bodyZh;
  page = page.replace('data-lang="en" aria-pressed="true"', 'data-lang="en" aria-pressed="false"')
    .replace('data-lang="zh" aria-pressed="false"', 'data-lang="zh" aria-pressed="true"');
  page = page.replace(/^(<!DOCTYPE html>\r?\n)/i, "$1<!-- Generated by scripts/hurfi-pages/zh_mirror.mjs from " + s.url +
    ". Edit the English page or the zh dictionaries, then rerun; do not edit this file. -->\n");
  if (wr(fileOf(zurl), page)) written++;
}

// Pages outside the mirror still load the runtime bundle, not the 3.6 MB source.
for (const rel of ["thank-you/index.html", "404.html"]) {
  if (!fs.existsSync(path.join(ROOT, rel))) continue;
  const cur = rd(rel);
  if (wr(rel, swapRuntime(cur))) written++;
}

/* ------------------------------------------------------------ sitemap */

{
  const rel = "sitemap.xml";
  const xml = rd(rel);
  const nl = xml.includes("\r\n") ? "\r\n" : "\n";
  const blocks = [];
  const re = /[ \t]*<url>[\s\S]*?<\/url>[ \t]*\r?\n?/g;
  const head = xml.slice(0, xml.search(/[ \t]*<url>/));
  let m;
  while ((m = re.exec(xml))) blocks.push(m[0].replace(/[ \t]*<xhtml:link [^>]*\/>\r?\n/g, ""));
  const locOf = (b) => (b.match(/<loc>([^<]+)<\/loc>/) || [])[1];
  const have = new Set(blocks.map(locOf));
  const out = [];
  const pairOf = {};
  for (const [en, z] of Object.entries(ZH_URL)) { pairOf[SITE + en] = [en, z]; pairOf[SITE + z] = [en, z]; }
  const withAlt = (b) => {
    const p = pairOf[locOf(b)];
    if (!p) return b;
    const links = [["en", p[0]], [ZH_LANG, p[1]], ["x-default", p[0]]]
      .map(([l, u]) => '    <xhtml:link rel="alternate" hreflang="' + l + '" href="' + SITE + u + '"/>' + nl).join("");
    return b.replace(/([ \t]*<\/url>)/, links + "$1");
  };
  for (const b of blocks) {
    const loc = locOf(b);
    if (loc && loc.startsWith(SITE + "/zh/") && !Object.values(ZH_URL).includes(loc.slice(SITE.length))) continue;
    out.push(withAlt(b));
    const p = pairOf[loc];
    if (p && loc === SITE + p[0] && !have.has(SITE + p[1])) {
      // A new Chinese URL is new content today (Asia/Dhaka, as in sitemap_lastmod.py).
      const today = new Date(Date.now() + 6 * 3600e3).toISOString().slice(0, 10);
      out.push(withAlt(b.replace("<loc>" + loc + "</loc>", "<loc>" + SITE + p[1] + "</loc>")
        .replace(/<lastmod>[^<]*<\/lastmod>/, "<lastmod>" + today + "</lastmod>")));
    }
  }
  let top = head.replace(/<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"(?: xmlns:xhtml="[^"]*")?>/,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">');
  const tail = xml.slice(xml.lastIndexOf("</url>") + "</url>".length).replace(/^[ \t]*\r?\n/, "");
  const next = top + out.join("") + tail;
  if (wr(rel, next)) written++;
}

/* ------------------------------------------------------------ edge function data */

{
  const body = "// Generated by scripts/hurfi-pages/zh_mirror.mjs. English path -> Chinese twin.\n" +
    "export default " + JSON.stringify(ZH_URL, null, 1) + ";\n";
  // No language redirect any more (Chinese is the default at /, scripts/site/build.mjs); the path list is not written.
  void body;
}

console.log(`i18n-run.js: ${RUNTIME.kb} KB (${RUNTIME.zh} runtime zh strings).`);
const zhCount = Object.keys(ZH_URL).length;
console.log(`${zhCount} English pages have a Chinese twin; ${written} file(s) changed.`);
if (ldMiss) console.log(`${ldMiss} JSON-LD text field(s) left in English, e.g. ${Object.keys(LD_MISS).slice(0, process.env.LD_ALL ? 99 : 4).map((x) => JSON.stringify((process.env.LD_ALL ? x : x.slice(0, 80)))).join(", ")}`);
if (process.env.ZH_DEBUG) console.log(JSON.stringify({ ld: Object.keys(LD_MISS), attr: Object.keys(attrMiss) }, null, 1));
const am = Object.keys(attrMiss);
if (am.length) console.log(`${am.length} attribute text(s) untranslated, e.g. ${am.slice(0, 5).map((x) => JSON.stringify(x)).join(", ")}`);

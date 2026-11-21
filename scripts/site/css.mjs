// Small CSS tools for build.mjs: parse a stylesheet, drop rules whose classes/ids appear nowhere on the
// site (unused CSS), and extract the rules a page needs above the fold (critical CSS).
// A rule is kept when at least one of its selectors only uses classes/ids that exist in the given token
// set; :not(), :is(), :where(), :has() arguments and attribute selectors are ignored (kept generously).

function scanTo(s, i, stops) {
  let q = null, paren = 0;
  for (; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === "\\") { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    if (c === "(") paren++;
    else if (c === ")") paren--;
    else if (!paren && stops.includes(c)) return i;
  }
  return -1;
}
function matchBrace(s, open) {
  let depth = 0, q = null;
  for (let i = open; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === "\\") { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    if (c === "{") depth++;
    else if (c === "}" && !--depth) return i;
  }
  return s.length - 1;
}
const GROUPS = new Set(["media", "supports", "container", "layer", "document"]);

export function parse(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const out = [];
  let i = 0;
  while (i < css.length) {
    const j = scanTo(css, i, "{;");
    if (j < 0) break;
    const prelude = css.slice(i, j).trim();
    if (css[j] === ";") { if (prelude) out.push({ type: "raw", text: prelude + ";" }); i = j + 1; continue; }
    const k = matchBrace(css, j);
    const body = css.slice(j + 1, k);
    const at = prelude.match(/^@([\w-]+)/);
    if (at && GROUPS.has(at[1].toLowerCase())) out.push({ type: "group", prelude, children: parse(body) });
    else if (at) out.push({ type: "raw", text: prelude + "{" + body + "}" });
    else if (prelude) out.push({ type: "rule", sel: prelude, body });
    i = k + 1;
  }
  return out;
}

function splitSelectors(sel) {
  const out = []; let depth = 0, cur = "";
  for (const c of sel) { if (c === "(") depth++; if (c === ")") depth--; if (c === "," && !depth) { out.push(cur); cur = ""; } else cur += c; }
  out.push(cur);
  return out.map((s) => s.trim()).filter(Boolean);
}
function stripFns(sel) {
  // remove :not(...) :is(...) :where(...) :has(...) arguments, attribute selectors and pseudo-element args
  let s = sel, prev;
  do { prev = s; s = s.replace(/:(not|is|where|has|matches|-webkit-any|-moz-any)\([^()]*\)/g, ""); } while (s !== prev);
  return s.replace(/\[[^\]]*\]/g, "");
}
export function selectorTokens(sel) {
  const s = stripFns(sel);
  return [...s.matchAll(/[.#](-?[_a-zA-Z][\w-]*)/g)].map((m) => m[1]);
}
function ruleUsed(sel, set) { return splitSelectors(sel).some((x) => selectorTokens(x).every((t) => set.has(t))); }

export function filter(nodes, set) {
  const out = [];
  for (const n of nodes) {
    if (n.type === "rule") { if (ruleUsed(n.sel, set)) out.push(n); }
    else if (n.type === "group") { const c = filter(n.children, set); if (c.length) out.push({ ...n, children: c }); }
    else out.push(n);
  }
  return out;
}
/** Critical subset: style rules (and the groups around them) only; @font-face / @keyframes etc. stay in the full sheet. */
export function critical(nodes, set) {
  const out = [];
  for (const n of nodes) {
    if (n.type === "rule") { if (ruleUsed(n.sel, set)) out.push(n); }
    else if (n.type === "group") { const c = critical(n.children, set); if (c.length) out.push({ ...n, children: c }); }
    else if (/^@(charset|import)/i.test(n.text) === false && /^:root|^@property/.test(n.text)) out.push(n);
  }
  return out;
}
export function stringify(nodes) {
  return nodes.map((n) => (n.type === "rule" ? `${n.sel}{${n.body.trim()}}` : n.type === "group" ? `${n.prelude}{${stringify(n.children)}}` : n.text)).join("\n");
}
/** class and id tokens used in an HTML string */
export function htmlTokens(html, set = new Set()) {
  for (const m of html.matchAll(/\sclass="([^"]*)"/g)) for (const c of m[1].split(/\s+/)) if (c) set.add(c);
  for (const m of html.matchAll(/\sid="([^"]*)"/g)) set.add(m[1]);
  return set;
}
/** every word-like token in a script (classes JS adds at runtime appear as string literals) */
export function jsTokens(js, set = new Set()) {
  for (const m of js.matchAll(/[A-Za-z_][\w-]*/g)) set.add(m[0]);
  return set;
}

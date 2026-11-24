// Daily Baidu link submission (百度普通收录 → API提交), run by .github/workflows/baidu-push.yml.
// Works against the LIVE site only: nothing is built or deployed, so it costs no Netlify build credits.
//
//   node scripts/baidu/push.mjs <state.json>
//
// 1. Reads the live Chinese sitemap (https://hurfi.com/sitemap-zh.xml) and the live content fingerprints
//    (https://hurfi.com/zh-pages.json, written by scripts/site/build.mjs on every deploy).
// 2. Queue = URLs still waiting from earlier days + URLs new to the sitemap + pages whose fingerprint
//    differs from the one recorded when they were last accepted. Accepted, unchanged pages are never re-sent.
// 3. Nothing queued, or Baidu's quota for today already used up → no request to Baidu at all.
// 4. Sends batches within Baidu's daily quota ("remain" in every answer). If a batch is bigger than the
//    quota left, Baidu refuses it with "over quota"; the batch is halved and tried again. What does not fit
//    today stays queued for tomorrow.
// 5. Writes the state file back only when something in it changed.
//
// The token comes only from the environment (GitHub Actions secret BAIDU_PUSH_TOKEN) and is never printed;
// the log shows counts, URL paths (public in the sitemap anyway) and Baidu's messages.
//
// Environment: BAIDU_PUSH_TOKEN, DRY_RUN=true (everything except the request to Baidu),
//              BAIDU_ENDPOINT and SITE_URL (overrides for local tests only).
import fs from "fs";
import path from "path";

const SITE = "https://hurfi.com";
const SITE_URL = (process.env.SITE_URL || SITE).replace(/\/$/, "");
const ENDPOINT = process.env.BAIDU_ENDPOINT || "http://data.zz.baidu.com/urls";
const TOKEN = (process.env.BAIDU_PUSH_TOKEN || "").trim();
const DRY = /^(1|true|yes)$/i.test(process.env.DRY_RUN || "");
const STATE_FILE = process.argv[2] || ".state/state.json";
const MAX_CALLS = 12; // requests to Baidu per run, at most
const MAX_BATCH = 2000; // Baidu accepts up to 2000 URLs per request

const now = new Date();
const today = new Date(now.getTime() + 8 * 3600e3).toISOString().slice(0, 10); // Beijing date: Baidu's quota day
const lines = [];
const log = (s) => { const t = TOKEN ? s.split(TOKEN).join("***") : s; console.log(t); lines.push(t); };
const short = (u) => u.replace(SITE, "") || "/";

function finish(code) {
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, "### Baidu push\n\n```\n" + lines.join("\n") + "\n```\n");
  process.exit(code);
}

async function get(url) {
  const res = await fetch(url, { headers: { "User-Agent": "hurfi-baidu-push (GitHub Actions)" }, signal: AbortSignal.timeout(30000) });
  return res;
}

// ---------------------------------------------------------------- state
let state = { version: 1, site: SITE, submitted: {}, pending: [], rejected: {}, dailyQuota: null, quotaUsedUpOn: null, runs: [] };
try { state = { ...state, ...JSON.parse(fs.readFileSync(STATE_FILE, "utf8")) }; } catch (e) { log(`state: none at ${STATE_FILE}, starting empty`); }
const material = () => JSON.stringify({ s: state.submitted, p: state.pending, r: state.rejected, q: state.dailyQuota, u: state.quotaUsedUpOn });
const before = material();

// ---------------------------------------------------------------- live sitemap + fingerprints
let urls;
try {
  const res = await get(`${SITE_URL}/sitemap-zh.xml`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  urls = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()).filter((u) => u.startsWith(SITE + "/") && !u.startsWith(SITE + "/en/"));
} catch (e) {
  log(`::error::Could not read ${SITE_URL}/sitemap-zh.xml (${e.message}). Queue left unchanged.`);
  finish(1);
}
if (!urls.length) { log("::error::sitemap-zh.xml has no Chinese URLs. Queue left unchanged."); finish(1); }
const inSitemap = new Set(urls);

let keys = null;
try {
  const res = await get(`${SITE_URL}/zh-pages.json`);
  if (res.ok) keys = (await res.json()).pages || null;
} catch (e) { /* handled below */ }
if (!keys) log("fingerprints: zh-pages.json not on the live site yet (comes with the next deploy); only new URLs are detected today");

// ---------------------------------------------------------------- queue
const pendingSet = new Set(state.pending.map((p) => p.url));
let added = 0, changed = 0, dropped = 0;
// pages removed from the sitemap: no longer queued or tracked
state.pending = state.pending.filter((p) => inSitemap.has(p.url) || (dropped++, false));
for (const u of Object.keys(state.submitted)) if (!inSitemap.has(u)) delete state.submitted[u];
for (const u of Object.keys(state.rejected)) if (!inSitemap.has(u)) delete state.rejected[u];
for (const u of urls) {
  if (pendingSet.has(u)) continue;
  const k = keys ? keys[u] : undefined;
  const rec = state.submitted[u], rej = state.rejected[u];
  if (rej) { // refused by Baidu before: try again only when the page changes
    if (k && rej.hash && k !== rej.hash) { delete state.rejected[u]; state.pending.push({ url: u, reason: "changed", since: today }); changed++; }
    else if (k && !rej.hash) rej.hash = k;
    continue;
  }
  if (!rec) { state.pending.push({ url: u, reason: "new", since: today }); added++; continue; }
  if (!k) continue;
  if (!rec.hash) { rec.hash = k; continue; } // first fingerprint for a page accepted earlier: record, don't re-send
  if (rec.hash !== k) { state.pending.push({ url: u, reason: "changed", since: today }); changed++; }
}
const queue = state.pending.map((p) => p.url);
log(`sitemap: ${urls.length} Chinese URLs; accepted earlier and unchanged: ${urls.length - queue.length - Object.keys(state.rejected).length}; queued: ${queue.length} (new today ${added}, changed today ${changed}${dropped ? `, removed from sitemap ${dropped}` : ""})`);

// ---------------------------------------------------------------- send
let posted = 0, accepted = 0, calls = 0, remain = null, failure = "", usedUp = false;
const rejectedNow = [];
if (!queue.length) {
  log("nothing to send: no request to Baidu");
} else if (state.quotaUsedUpOn === today) {
  log(`Baidu's quota for ${today} (Beijing) was already used up: no request today, ${queue.length} URL(s) stay queued`);
} else if (DRY) {
  const cap = Math.min(queue.length, state.dailyQuota || 50);
  log(`dry run: would send up to ${cap} of ${queue.length} queued URL(s), first: ${queue.slice(0, 3).map(short).join(", ")}`);
} else if (!TOKEN) {
  log(`::error::BAIDU_PUSH_TOKEN is not set (GitHub: Settings → Secrets and variables → Actions). ${queue.length} URL(s) stay queued.`);
  failure = "no token";
} else {
  let cap = Math.max(1, Math.min(queue.length, state.dailyQuota || 50, MAX_BATCH));
  let left = queue.slice();
  while (left.length && calls < MAX_CALLS && (remain === null || remain > 0)) {
    const batch = left.slice(0, remain === null ? cap : Math.min(cap, remain));
    let res, body = "", data = {};
    try {
      res = await fetch(`${ENDPOINT}?site=${encodeURIComponent(SITE)}&token=${encodeURIComponent(TOKEN)}`, {
        method: "POST", headers: { "Content-Type": "text/plain" }, body: batch.join("\n"), signal: AbortSignal.timeout(30000),
      });
      body = await res.text();
      try { data = JSON.parse(body); } catch (e) { /* not JSON */ }
    } catch (e) {
      failure = `network: ${e.message}`; calls++; break;
    }
    calls++;
    const msg = String(data.message || body).slice(0, 200);
    if (!res.ok || data.error) {
      if (/over quota/i.test(msg)) {
        if (batch.length > 1) { cap = Math.max(1, Math.floor(batch.length / 2)); log(`request ${calls}: ${batch.length} URLs is more than today's quota left; trying ${cap}`); continue; }
        usedUp = true; log(`request ${calls}: quota for today used up`); break;
      }
      failure = `HTTP ${res.status}: ${msg}`; break;
    }
    const bad = new Set([...(data.not_same_site || []), ...(data.not_valid || [])]);
    for (const u of batch) {
      if (bad.has(u)) { state.rejected[u] = { at: today, hash: keys?.[u] || null, reason: (data.not_same_site || []).includes(u) ? "not_same_site" : "not_valid" }; rejectedNow.push(u); continue; }
      state.submitted[u] = { hash: keys?.[u] || state.submitted[u]?.hash || null, at: today, source: "github-actions" };
    }
    const done = new Set(batch);
    state.pending = state.pending.filter((p) => !done.has(p.url));
    left = left.slice(batch.length);
    posted += batch.length;
    accepted += Number(data.success) || 0;
    remain = typeof data.remain === "number" ? data.remain : 0;
    cap = MAX_BATCH; // from here on Baidu's own "remain" sizes the next batch
    log(`request ${calls}: posted ${batch.length}, accepted ${data.success ?? "?"}, quota left today ${data.remain ?? "?"}`);
  }
  if (remain === 0) usedUp = true;
  if (usedUp) state.quotaUsedUpOn = today;
  // Baidu's daily quota = accepted today + what is left; remembered so tomorrow's first batch fits it
  if (remain !== null) state.dailyQuota = accepted + remain;
  else if (usedUp && accepted === 0 && !state.dailyQuota) state.dailyQuota = null;
}

const summary = { date: today, queued: queue.length, posted, accepted, rejected: rejectedNow.length, remain, stillQueued: state.pending.length, calls, ...(failure ? { failure: failure.replace(/token=[^&\s]+/g, "token=***") } : {}) };
log(`result: posted ${posted}, accepted ${accepted}, refused as invalid ${rejectedNow.length}${rejectedNow.length ? ` (${rejectedNow.map(short).join(", ")})` : ""}, Baidu quota left today ${remain ?? "?"}, still queued ${state.pending.length}, requests to Baidu ${calls}${failure ? `; stopped: ${summary.failure}` : ""}`);
if (state.pending.length && (usedUp || remain === 0)) log(`the ${state.pending.length} queued URL(s) go out on the next days, within Baidu's daily quota (${state.dailyQuota ?? "?"} a day so far)`);

// ---------------------------------------------------------------- save (only when something changed)
if (material() !== before && !DRY) {
  state.lastRun = { at: now.toISOString(), ...summary };
  state.runs = [...(state.runs || []), summary].slice(-120);
  fs.mkdirSync(path.dirname(path.resolve(STATE_FILE)), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 1) + "\n");
  log("state: saved");
} else log(DRY ? "state: dry run, not saved" : "state: unchanged, not saved");

if (failure) { log(`::error::Baidu push stopped: ${summary.failure}`); finish(1); }
finish(0);

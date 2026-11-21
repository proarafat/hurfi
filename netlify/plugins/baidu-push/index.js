// Netlify build plugin: after a successful PRODUCTION deploy, send new or changed Chinese page URLs to
// Baidu's link submission API (普通收录 → API提交), so Baidu crawls them sooner.
//
// - Off unless BAIDU_PUSH_TOKEN is set (scripts/site/config.mjs, or the Netlify environment variable).
// - Chinese URLs come from dist/sitemap.xml (everything not under /en/), in sitemap order.
// - "Changed" = the page's title, description or main text differs from what was last sent. Hashes of
//   sent pages are kept in the Netlify build cache, so the first deploy sends up to `limit` pages and
//   later deploys send only what changed (plus whatever did not fit the limit before).
// - Never fails the deploy: problems are logged and shown in the deploy summary.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { pathToFileURL } = require("url");

const CACHE_FILE = path.join(".netlify-cache", "baidu-push.json");
const SITE = "https://hurfi.com";

function pageKey(html) {
  const pick = (re) => ((html.match(re) || [])[1] || "");
  const main = pick(/<main[\s\S]*?>([\s\S]*?)<\/main>/i)
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  const text = [pick(/<title>([^<]*)<\/title>/i), pick(/<meta name="description" content="([^"]*)"/i), main].join("\n");
  return crypto.createHash("sha1").update(text).digest("hex");
}

function fileFor(dist, url) {
  const p = url.replace(SITE, "").split(/[?#]/)[0];
  return path.join(dist, decodeURI(p), p.endsWith("/") ? "index.html" : "");
}

module.exports = {
  async onSuccess({ constants, inputs, utils }) {
    const show = (title, summary) => { console.log(`[baidu-push] ${summary}`); utils.status.show({ title, summary }); };
    try {
      if (process.env.CONTEXT !== "production") return console.log(`[baidu-push] skipped (context: ${process.env.CONTEXT || "local"})`);
      let token = process.env.BAIDU_PUSH_TOKEN || "";
      if (!token) {
        try { token = (await import(pathToFileURL(path.resolve("scripts/site/config.mjs")).href)).BAIDU_PUSH_TOKEN || ""; } catch (e) { /* config not readable: stay off */ }
      }
      if (!token) return console.log("[baidu-push] off (BAIDU_PUSH_TOKEN is empty)");

      const dist = constants.PUBLISH_DIR;
      const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
      const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(SITE) && !u.startsWith(SITE + "/en/"));

      await utils.cache.restore(CACHE_FILE);
      let sent = {};
      try { sent = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8")); } catch (e) { /* first run */ }

      const keys = {};
      const changed = [];
      for (const u of urls) {
        const f = fileFor(dist, u);
        if (!fs.existsSync(f)) continue;
        keys[u] = pageKey(fs.readFileSync(f, "utf8"));
        if (sent[u] !== keys[u]) changed.push(u);
      }
      if (!changed.length) return show("Baidu push", `no new or changed Chinese pages (${urls.length} checked)`);

      const limit = Math.max(1, parseInt(inputs.limit, 10) || 50);
      const batch = changed.slice(0, limit);
      const res = await fetch(`http://data.zz.baidu.com/urls?site=${SITE}&token=${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: batch.join("\n"),
        signal: AbortSignal.timeout(20000),
      });
      const body = await res.text();
      let data = {};
      try { data = JSON.parse(body); } catch (e) { /* not JSON */ }
      if (!res.ok || data.error) return show("Baidu push failed", `HTTP ${res.status}: ${data.message || body.slice(0, 200)} (nothing recorded, will retry next deploy)`);

      const rejected = new Set([...(data.not_same_site || []), ...(data.not_valid || [])]);
      for (const u of batch) if (!rejected.has(u)) sent[u] = keys[u];
      fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
      fs.writeFileSync(CACHE_FILE, JSON.stringify(sent));
      await utils.cache.save(CACHE_FILE);
      show("Baidu push", `sent ${data.success ?? "?"} of ${batch.length} URL(s); ${changed.length - batch.length} waiting for the next deploy; Baidu quota left today: ${data.remain ?? "?"}${rejected.size ? `; rejected: ${[...rejected].join(", ")}` : ""}`);
    } catch (e) {
      show("Baidu push error", String((e && e.message) || e));
    }
  },
};

// Content fingerprint of a published page, used to tell when a Chinese page has really changed and should be
// sent to Baidu again. Only what a reader or a search engine sees as content counts: the title, the meta
// description and the text inside <main> (scripts, styles and markup removed, whitespace collapsed).
// Changes to CSS, scripts, analytics, header or footer do not change the key.
import crypto from "crypto";

export function pageKey(html) {
  const pick = (re) => ((html.match(re) || [])[1] || "");
  const main = pick(/<main[\s\S]*?>([\s\S]*?)<\/main>/i)
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  const text = [pick(/<title>([^<]*)<\/title>/i), pick(/<meta name="description" content="([^"]*)"/i), main].join("\n");
  return crypto.createHash("sha1").update(text).digest("hex");
}

// Send Chinese-speaking visitors to the Chinese twin of the page they asked for.
//
//   China, Hong Kong, Macao, Taiwan (by IP)       -> /zh/...
//   browser language Chinese, from any country    -> /zh/...
//   everyone else                                 -> the English page, unchanged
//   a choice made with the EN / 中文 / FR switch  -> always wins (cookie hurfi-lang)
//   ?lang=en on any URL                           -> English, and remembered
//
// Search engine crawlers are never redirected: every URL answers with its own language,
// and hreflang (in each page and in sitemap.xml) tells Google and Bing which one to show
// for an English or a Chinese query. Google advises against redirecting crawlers by locale.
//
// The site sits behind Cloudflare, so the visitor's country comes from CF-IPCountry
// (Netlify would only see Cloudflare's address); Netlify's own geo is the fallback.
import ZH from "./zh-paths.js";

const ZH_COUNTRIES = new Set(["CN", "HK", "MO", "TW"]);
const CRAWLER = /bot\b|bot\/|crawler|spider|slurp|mediapartners|adsbot|bingpreview|facebookexternalhit|embedly|pinterest|vkshare|whatsapp|telegram|slack|discord|lighthouse|pagespeed|gtmetrix|headless|python-requests|curl\/|wget|go-http|httpclient|okhttp|axios/i;
const YEAR = 60 * 60 * 24 * 365;

function topLanguage(header) {
  let best = "";
  let bestQ = -1;
  for (const part of (header || "").split(",")) {
    const [tag, ...params] = part.trim().split(";");
    if (!tag || tag === "*") continue;
    const qp = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    const q = qp ? parseFloat(qp.slice(2)) : 1;
    if (q > bestQ) { best = tag.toLowerCase(); bestQ = q; }
  }
  return best.split("-")[0];
}

// The English response must not be cached by Cloudflare, or a cached copy would reach a
// visitor from China without passing through this function.
async function english(context, cookie) {
  const res = await context.next();
  res.headers.set("Cloudflare-CDN-Cache-Control", "no-store");
  if (cookie) res.headers.append("Set-Cookie", cookie);
  return res;
}

export default async (request, context) => {
  if (request.method !== "GET" && request.method !== "HEAD") return;
  const url = new URL(request.url);
  let path = url.pathname;
  if (!path.endsWith("/")) {
    if (/\.[a-z0-9]+$/i.test(path)) return;
    path += "/";
  }
  const target = ZH[path];
  if (!target) return;

  if (url.searchParams.get("lang") === "en") {
    return english(context, `hurfi-lang=en; Path=/; Max-Age=${YEAR}; SameSite=Lax; Secure`);
  }
  const ua = request.headers.get("user-agent") || "";
  if (!ua || CRAWLER.test(ua)) return english(context);

  const chosen = context.cookies.get("hurfi-lang");
  if (chosen === "en" || chosen === "fr") return english(context);
  if (chosen !== "zh") {
    const country = (request.headers.get("cf-ipcountry") || (context.geo && context.geo.country && context.geo.country.code) || "").toUpperCase();
    if (!ZH_COUNTRIES.has(country) && topLanguage(request.headers.get("accept-language")) !== "zh") {
      return english(context);
    }
  }
  return new Response(null, {
    status: 302,
    headers: {
      Location: target + url.search,
      "Cache-Control": "private, no-store",
      "Cloudflare-CDN-Cache-Control": "no-store",
      Vary: "Accept-Language, Cookie",
    },
  });
};

export const config = {
  path: "/*",
  excludedPath: ["/zh/*", "/assets/*", "/*.xml", "/*.txt", "/*.json", "/*.webmanifest", "/*.svg", "/*.png", "/*.ico", "/*.html"],
  // If the function ever fails, serve the page as if it did not exist.
  onError: "bypass",
};

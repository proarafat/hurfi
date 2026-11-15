# Hurfi Website

B2B growth partner for Chinese manufacturers, suppliers and exporters.

**Live:** [hurfi.com](https://hurfi.com)
**Host:** Netlify. The publish directory is the repository root (`publish = "."`). A push to `main` deploys production.

> This file is in the publish directory. `_redirects` returns 404 for it, so it is not served publicly.

## How the site is built

- Every page is hand-maintained static HTML (`*/index.html`). The header, navigation and footer are written into each file.
- Shared behaviour lives in `assets/js/site.js` (menus, consult block and inquiry form, JSON-LD fallback), `assets/js/i18n.js` (client-side EN/中文/FR switch) and `assets/css/style.css`.
- New pages added in October 2026 (city guides, insights, `/zh/` pages, enriched sector pages) come from `scripts/hurfi-pages/build.py` and the JSON files in `scripts/hurfi-pages/content/`. See `scripts/hurfi-pages/README.md`.

## Chinese version (`/zh/`) and language routing

Every English page has a static Simplified Chinese twin at the same path under `/zh/`. Search engines index both and pick the right one per query through hreflang (`en`, `zh-Hans`, `x-default` → English) in each page and in `sitemap.xml`.

- **Generator:** `node scripts/hurfi-pages/zh_mirror.mjs` (also the last step of `npm run pages`). It applies the `zh` dictionary in `assets/js/i18n.js`, plus `scripts/hurfi-pages/content/zh-meta.json` (titles, descriptions, leftover body text) and `content/zh-places.json` (place names), to each English page. It also writes the reciprocal hreflang on the English page, the sitemap entries and `netlify/edge-functions/zh-paths.js`. The 5 hand-written pages in `content/zh.json` (`/zh/`, `/zh/services/*`) are kept; only their links and English leftovers are updated.
- **After editing an English page,** rerun the generator. `--report` shows dictionary coverage per page and `--missing` lists every untranslated string (JSON). Add those strings to `zh-meta.json`. A page below 90% coverage gets no Chinese twin until it is translated.
- **Never edit files under `/zh/` by hand** (except through `content/zh.json` for the 5 hand-written ones). The next run overwrites them.
- **Visitors:** `netlify/edge-functions/lang-redirect.js` sends a 302 to the `/zh/` twin when the visitor is in China, Hong Kong, Macao or Taiwan (Cloudflare `CF-IPCountry`), or when their browser's top language is Chinese. The EN / 中文 / FR switch sets the `hurfi-lang` cookie, and that choice always wins. `?lang=en` forces English and remembers it. Crawlers are never redirected.

## Do NOT run

| Command | Why |
|---|---|
| `npm run seo-DO-NOT-RUN` (`scripts/generate-seo.mjs`) | Cuts `sitemap.xml` to 13 URLs and overwrites `ai.txt`, `humans.txt` and JSON-LD |
| `npm run patch-DO-NOT-RUN` (`scripts/patch-pages.mjs`) | Rewrites the static header and navigation on every page |

Both scripts now exit immediately unless `HURFI_ALLOW_LEGACY=1` is set. `data/site.config.json` is their old input and is no longer the source of truth.

## Local preview

```powershell
python -m http.server 8080
# or: npx --yes serve .
```

`_redirects` rules (legacy 301s, 404 blocks) only work on Netlify, not in a local static server.

## Regenerate generated pages

```powershell
python scripts/hurfi-pages/build.py
```

It only rewrites the pages it owns, and only the marked `<!-- hurfi:gen:... -->` blocks inside existing pages. Update `sitemap.xml` `lastmod` for any page whose content changed. `python scripts/hurfi-pages/sitemap_lastmod.py` sets every `lastmod` from git history (content only: title, description, JSON-LD, `<main>`; ignores `?v=` bumps and header/footer). The 11 core pages (about, services, projects, industries, locations, locations/china, contact, book-consultation, privacy-policy, terms, refund-policy) carry static JSON-LD built from `assets/js/schema-data.js`; refresh it with `python scripts/hurfi-pages/build.py core-ld`. Every page with JSON-LD carries the same full Organization (`ORG` in build.py, `@id` https://hurfi.com/#organization, data from schema-data.js); other nodes reference it by `@id`, and site.js injects no runtime Organization/WebSite/ProfessionalService when it is present. A full `npm run pages` rebuild reproduces the live pages, including the GA4 tag and the Chinese Hostinger partner placements.

## Forms

The inquiry form posts to FormSubmit (`https://formsubmit.co/ajax/yasir@hurfi.com`, copy to `support@hurfi.com` via `_cc`). FormSubmit sends a one-time activation email to `yasir@hurfi.com` on the first submission; click it, or no inquiries are delivered. Spam controls: FormSubmit `_honey` field, the site honeypot, a 2.5-second minimum fill time, and FormSubmit's captcha on the no-JavaScript fallback.

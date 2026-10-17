# Hurfi Website

B2B growth partner for Chinese manufacturers, suppliers and exporters.

**Live:** [hurfi.com](https://hurfi.com)
**Host:** Netlify. The publish directory is the repository root (`publish = "."`). A push to `main` deploys production.

> This file is in the publish directory. `_redirects` returns 404 for it, so it is not served publicly.

## How the site is built

- Every page is hand-maintained static HTML (`*/index.html`). The header, navigation and footer are written into each file.
- Shared behaviour lives in `assets/js/site.js` (menus, consult block and inquiry form, JSON-LD fallback), `assets/js/i18n.js` (client-side EN/中文/FR switch) and `assets/css/style.css`.
- New pages added in October 2026 (city guides, insights, `/zh/` pages, enriched sector pages) come from `scripts/hurfi-pages/build.py` and the JSON files in `scripts/hurfi-pages/content/`. See `scripts/hurfi-pages/README.md`.

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

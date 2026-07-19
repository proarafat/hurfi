# Hurfi Website

B2B Growth & Digital Presence Partner for Chinese manufacturers, suppliers, and exporters.

**Live:** [hurfi.com](https://hurfi.com)  
**Repo:** [github.com/proarafat/hurfi](https://github.com/proarafat/hurfi)  
**Host:** Netlify (auto-deploy from `main`)

## Quick update + push

```powershell
git add .
git commit -m "your message"
git push
```

Netlify rebuilds automatically. The build runs `npm run build`, which regenerates SEO files from `data/site.config.json`.

## Dynamic SEO / AEO / GEO

| File | Purpose |
|------|---------|
| `data/site.config.json` | **Single source of truth** — pages, nav, meta, FAQs, services |
| `scripts/patch-pages.mjs` | Keeps HTML paths/scripts/forms consistent |
| `scripts/generate-seo.mjs` | Validates pages + generates sitemap/robots/llms/schema |
| `sitemap.xml` | Search engines (skips noindex pages) |
| `robots.txt` | Crawler rules + AI bots |
| `llms.txt` / `ai.txt` | AEO / GEO for answer engines |
| `404.html` | Custom Netlify 404 |
| `thank-you/` | Netlify Forms success page |
| `favicon.svg` | Brand favicon (`#0076F7`) |

### Add a new page (keeps SEO in sync)

1. Create the HTML folder/page
2. Add the page to `data/site.config.json` → `pages` (and `nav` if needed)
3. `git push` — Netlify runs `npm run build`
4. Sitemap, llms.txt, nav, and JSON-LD update automatically

## Local commands

```powershell
npm run build
npm run dev
```

## Forms

Contact and consultation forms use **Netlify Forms** (`netlify` + `data-netlify="true"`). After deploy, enable form notifications in the Netlify dashboard.

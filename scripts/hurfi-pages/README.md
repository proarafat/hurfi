# 08 — Generator README (`scripts/hurfi-pages/`)

A small Python 3 generator (standard library only) for the pages added in the SEO expansion.
It does **not** regenerate the site. It writes only the pages and blocks listed below.

## Files

| Path | Purpose |
|---|---|
| `scripts/hurfi-pages/build.py` | The generator |
| `content/sectors.json` | 12 menu sector pages: title, H1, lead, buyer checks, site work, gaps, search topics, FAQ, related pilot cities |
| `content/cities.json` | 4 pilot city pages: facts **with source ids**, sources (publisher, URL, checked date), sector links, approach, FAQ |
| `content/insights.json` | `/insights/` hub + 3 articles (sections, FAQ, publish date) |
| `content/zh.json` | 5 Simplified Chinese pages (`/zh/`, `/zh/services/*`) with their English alternates |
| `content/pages.json` | OEM/ODM rewrite, service-page additions, homepage title/H1 line, locations hub title |
| `assets/css/hurfi-pages.css` | Styles for generated blocks (`hx-` prefix); loaded after `style.css` |

`scripts/` is already 404-blocked on Netlify (`/scripts/*  /404.html  404!`), so none of this is public.

## Run

```powershell
cd D:\hurfi
python scripts\hurfi-pages\build.py      # or: npm run pages
```

It prints `wrote <file>` for each file whose bytes changed. A second run prints nothing (idempotent).

## What it writes

| Kind | Files | How |
|---|---|---|
| New pages (whole file) | `locations/china/{shenzhen,dongguan,wuxi,hefei}/`, `insights/` + 3 articles, `industries/oem-odm/`, `zh/` + 4 services | Header, nav, footer and scripts are copied at build time from `services/seo/index.html`, so they always match the live template |
| Existing pages (marked blocks only) | 12 sector pages, 4 service pages, `/`, `/locations/`, `/locations/china/`, `/industries/` | Inserts/replaces `<!-- hurfi:gen:NAME:start -->…<!-- hurfi:gen:NAME:end -->` blocks, a `hurfi:gen:jsonld` block in `<head>`, a `hurfi:gen:hreflang` block, and exact swaps of `<title>`, meta description, OG/Twitter title/description and H1 |

Unchanged lines keep their original line endings (CRLF/LF/mixed), so diffs stay small.

## Content rules the generator assumes

- `[text](/url/)` in any string becomes a link. Everything else is HTML-escaped.
- City facts must reference a source id (`["fact text", ["sz-1"]]`). The page shows numbered footnotes and a "Sources" list with the checked date. Update `checked` whenever you re-verify.
- FAQ arrays render both the visible `<details>` FAQ and a static `FAQPage` JSON-LD, so they always match.
- JSON-LD is compact (`"@type":"X"`), which lets `site.js` see it and skip its own JS-injected duplicates.

## Adding a page

- **Another city:** add an object to `cities.json` (same keys as Shenzhen, ≥600 words of city-specific text, official sources). Add its card anchor (`anchor`) — the directory card gets a "city guide" link automatically. Then add the URL to `sitemap.xml`.
- **Another article:** add an object to `insights.json`; the hub lists it automatically.
- **Another zh page:** add to `zh.json` with `en` set to the English URL, and add the reciprocal hreflang on the English page (`ZH_OF` in `build.py`).

## Do not

- Run `scripts/generate-seo.mjs` or `scripts/patch-pages.mjs` (quarantined; they exit unless `HURFI_ALLOW_LEGACY=1`).
- Edit inside `hurfi:gen` blocks by hand — the next build overwrites them. Edit the JSON instead.

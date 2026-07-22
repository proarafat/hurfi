#!/usr/bin/env node
/**
 * Normalizes all HTML pages for consistent header + assets + forms.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const PAGE_TYPES = {
  "/": "home",
  "/about/": "about",
  "/services/": "services",
  "/services/website-development/": "service",
  "/services/seo/": "service",
  "/services/digital-marketing/": "service",
  "/services/social-media-management/": "service",
  "/projects/": "projects",
  "/case-studies/": "case-studies",
  "/industries/": "industries",
  "/locations/": "locations",
  "/locations/china/": "location",
  "/contact/": "contact",
  "/book-consultation/": "conversion",
  "/thank-you/": "utility",
};

const ASSET_V = "20260723c";

const HEADER_BLOCK = `  <header class="site-header">
    <div class="container container-nav header-inner">
      <a class="logo" href="/" aria-label="Hurfi home"></a>
      <nav id="site-nav" class="site-nav" aria-label="Main" data-site-nav></nav>
    </div>
  </header>`;

const SCRIPT_BLOCK = `  <script src="/assets/js/site-data.js?v=${ASSET_V}"></script>
  <script src="/assets/js/schema-data.js?v=${ASSET_V}"></script>
  <script src="/assets/js/site.js?v=${ASSET_V}"></script>
</body>`;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function pathFromFile(file) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel === "404.html") return null;
  return "/" + rel.replace(/\/index\.html$/, "/");
}

for (const file of walk(root)) {
  let html = fs.readFileSync(file, "utf8");
  const pagePath = pathFromFile(file);
  let changed = false;

  // Match relative AND absolute CSS paths (bug: /assets/... was never versioned)
  html = html.replace(
    /href="[^"]*assets\/css\/style\.css(?:\?[^"]*)?"/g,
    `href="/assets/css/style.css?v=${ASSET_V}"`
  );

  if (!html.includes('rel="icon"')) {
    html = html.replace(
      "</head>",
      `  <meta name="theme-color" content="#0076F7">\n  <link rel="icon" href="/assets/img/hurfi-icon.svg" type="image/svg+xml">\n</head>`
    );
  } else {
    html = html.replace(/href="\/favicon\.svg"/g, 'href="/assets/img/hurfi-icon.svg"');
  }

  // Canonical header on every page that has one
  if (/<header\b[^>]*class="[^"]*site-header/.test(html)) {
    const next = html.replace(
      /<header\b[^>]*class="[^"]*site-header[^"]*"[^>]*>[\s\S]*?<\/header>/,
      HEADER_BLOCK
    );
    if (next !== html) {
      html = next;
      changed = true;
    }
  }

  if (pagePath && PAGE_TYPES[pagePath]) {
    const type = PAGE_TYPES[pagePath];
    const geo = pagePath === "/locations/china/" ? ' data-geo="China"' : "";
    if (!/data-page=/.test(html)) {
      html = html.replace(/<body([^>]*)>/, `<body$1 data-page="${type}"${geo}>`);
      html = html.replace(/<body\s+/, "<body ");
      changed = true;
    }
  }

  if (/data-netlify="true"/.test(html) && !/action="\/thank-you\/"/.test(html)) {
    html = html.replace(/<form\b/, '<form action="/thank-you/"');
    changed = true;
  }

  html = html.replace(
    /\s*<script>document\.getElementById\("year"\)[\s\S]*?<\/script>/g,
    ""
  );
  html = html.replace(
    /\s*<script src="[^"]*assets\/js\/(?:site-data|schema-data|site)\.js(?:\?[^"]*)?"><\/script>/g,
    ""
  );
  html = html.replace(/<\/body>/i, SCRIPT_BLOCK);

  fs.writeFileSync(file, html);
  console.log("✓", path.relative(root, file));
}

console.log("HTML normalize complete.");

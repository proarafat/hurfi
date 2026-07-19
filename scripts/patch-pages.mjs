#!/usr/bin/env node
/**
 * Normalizes all HTML pages:
 * - absolute /assets paths
 * - favicon + theme-color
 * - SEO script trio
 * - Netlify form thank-you action
 * - data-page on body when missing
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

const SCRIPT_BLOCK = `  <script src="/assets/js/site-data.js"></script>
  <script src="/assets/js/schema-data.js"></script>
  <script src="/assets/js/site.js"></script>
</body>`;

for (const file of walk(root)) {
  let html = fs.readFileSync(file, "utf8");
  const pagePath = pathFromFile(file);
  let changed = false;

  // Absolute CSS
  const cssFixed = html.replace(
    /href="(?:\.\.\/)*(?:assets\/css\/style\.css)"/g,
    'href="/assets/css/style.css"'
  );
  if (cssFixed !== html) {
    html = cssFixed;
    changed = true;
  }

  // Favicon + theme-color
  if (!html.includes('rel="icon"')) {
    html = html.replace(
      "</head>",
      `  <meta name="theme-color" content="#0076F7">\n  <link rel="icon" href="/favicon.svg" type="image/svg+xml">\n</head>`
    );
    changed = true;
  }

  // data-page
  if (pagePath && PAGE_TYPES[pagePath] && !/data-page=/.test(html)) {
    const type = PAGE_TYPES[pagePath];
    const geo =
      pagePath === "/locations/china/" ? ' data-geo="China"' : "";
    html = html.replace(/<body([^>]*)>/, `<body$1 data-page="${type}"${geo}>`);
    // clean double spaces in body tag
    html = html.replace(/<body\s+/, "<body ");
    changed = true;
  }

  // Normalize footer scripts (always)
  html = html.replace(
    /\s*<script>document\.getElementById\("year"\)[\s\S]*?<\/script>/g,
    ""
  );
  html = html.replace(
    /\s*<script src="[^"]*assets\/js\/(?:site-data|schema-data|site)\.js"><\/script>/g,
    ""
  );
  if (!/<\/body>/i.test(html)) {
    console.warn("No </body> in", file);
  } else {
    html = html.replace(/<\/body>/i, SCRIPT_BLOCK);
    changed = true;
  }

  // Form thank-you (Netlify)
  if (/data-netlify="true"/.test(html)) {
    if (!/action="\/thank-you\/"/.test(html)) {
      html = html.replace(/<form\b/, '<form action="/thank-you/"');
      changed = true;
    }
  }

  // Logo to absolute home
  html = html.replace(/<a class="logo" href="(?:\.\.\/)+">/g, '<a class="logo" href="/">');
  html = html.replace(/<a class="logo" href="\.\/">/g, '<a class="logo" href="/">');

  // Mark nav for dynamic rebuild
  if (!html.includes("data-site-nav") && /aria-label="Main"/.test(html)) {
    html = html.replace(
      /<nav aria-label="Main">/,
      '<nav aria-label="Main" data-site-nav>'
    );
    changed = true;
  }

  if (changed || html.includes("/assets/js/site.js")) {
    fs.writeFileSync(file, html);
    console.log("✓ patched", path.relative(root, file));
  }
}

console.log("HTML patch complete.");

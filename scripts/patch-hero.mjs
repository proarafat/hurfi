import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "index.html");
const chunkPath = path.join(root, "scripts", "_hero-chunk.html");

let html = fs.readFileSync(indexPath, "utf8");
const chunk = fs.readFileSync(chunkPath, "utf8");
const start = html.indexOf('<p class="hero-eyebrow');
const end = html.indexOf("</section>", start);
if (start < 0 || end < 0) {
  console.error("Could not find hero markers");
  process.exit(1);
}
html = html.slice(0, start) + chunk + html.slice(end);
fs.writeFileSync(indexPath, html);
console.log("Hero section patched.");

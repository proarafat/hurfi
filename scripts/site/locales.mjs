// Language registry. The first entry is the default and lives at the site root.
// To add a language later (fr, es …): add one entry here, its strings next to "en"/"zh" in config.mjs
// and trust-lines.mjs (key = `key`), and a source of translated pages (like zh/ from zh_mirror.mjs).
export const LOCALES = [
  { key: "zh", code: "zh-CN", hreflang: "zh-CN", prefix: "", label: "中文", og: "zh_CN", source: "zh" },
  { key: "en", code: "en", hreflang: "en", prefix: "/en", label: "EN", og: "en_US", source: "" },
];
export const DEFAULT = LOCALES[0];

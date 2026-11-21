// China Advertising Law guard for the published Chinese pages (build.mjs).
// 1. SAFE: rewrites that keep the meaning, applied to every rendered Chinese page (including pages the
//    content bot adds) before the check. Longest phrases first.
// 2. BANNED: anything still matching after the rewrites fails the build with the page URL and sentence.
//    Fix it in the source (zh-meta.json / zh-native.json / i18n.js), or add a safe rewrite here.

export const BANNED = /最|第一|唯一|顶级|首选|国家级|100%/;

export const SAFE = [
  // MOQ and specs
  ["最小起订量", "起订量"], ["最低起订量", "起订量"], ["最小订购量", "起订量"], ["最小订量", "起订量"], ["最低订单量", "起订量"], ["最小起订", "起订"], ["最低起订", "起订"],
  ["最大需量", "需量峰值"], ["最大内容绘制", "主要内容渲染"], ["最小线宽", "线宽下限"], ["最大宽度", "宽度上限"],
  // ordinals
  ["居全国第一", "居全国首位"], ["位居全国第一", "位居全国首位"], ["位居世界第一", "位居世界首位"], ["全球第一", "全球首位"], ["排名第一", "排名首位"], ["位居第一", "位居首位"], ["排第一", "排首位"],
  ["第一次", "首次"], ["第一步", "首先"], ["第一天", "首日"], ["第一周", "首周"], ["第一期", "首期"], ["第一封", "首封"], ["第一个", "首个"], ["第一道", "首道"],
  ["第一批", "首批"], ["第一手", "一手"], ["第一站", "首站"], ["第一块", "首块"], ["第一条", "首条"], ["第一份", "首份"], ["第一句", "首句"], ["第一项", "首项"], ["第一屏", "首屏"], ["第一印象", "首印象"],
  // advice and comparison words
  ["最佳实践", "推荐做法"], ["最佳做法", "推荐做法"], ["最常见", "常见"], ["最常用", "常用"], ["最先", "首先"], ["最为关键", "尤为关键"], ["最关键", "尤为关键"], ["最重要", "尤为重要"],
  ["最好是", "宜"], ["最近港口", "就近港口"], ["最近的港口", "就近的港口"], ["最终用户", "终端用户"], ["最终用途", "终端用途"], ["最后更新", "更新于"],
  ["最容易", "更容易"], ["最需要", "尤其需要"], ["最关心", "尤其关心"], ["最关注", "尤其关注"], ["最看重", "尤其看重"], ["最擅长", "擅长"], ["最低标准", "基本标准"], ["最低要求", "基本要求"],
  ["国家级", "国家"],
];

export function applySafe(html) {
  let n = 0;
  for (const [a, b] of SAFE) { const k = html.split(a).length - 1; if (k) { n += k; html = html.split(a).join(b); } }
  return { html, n };
}

/** Sentences in visible text, metadata, alt text and JSON-LD that still contain a banned term. */
export function findBanned(html) {
  const meta = [...html.matchAll(/<(?:meta[^>]+content|img[^>]+alt)="([^"]*)"/g)].map((m) => m[1]);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const text = html.replace(/<script\b[\s\S]*?<\/script>/g, " ").replace(/<style\b[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  const out = [];
  for (const chunk of [text, ...meta, ...ld]) {
    for (const m of chunk.matchAll(/[^。！？\n.!?]*(最|第一|唯一|顶级|首选|国家级|100%)[^。！？\n.!?]*/g)) {
      const s = m[0].replace(/\s+/g, " ").trim();
      if (s && !out.includes(s)) out.push(s.slice(0, 160));
    }
  }
  return out;
}

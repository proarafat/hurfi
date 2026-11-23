#!/usr/bin/env node
/**
 * The SEO service page in both languages, from one content file:
 *   content/service-seo.mjs  ->  services/seo/index.html   (English source page)
 *                                zh/services/seo/index.html (Chinese twin, hand-made)
 * Same layout in both languages; shared blocks in service-page-lib.mjs. zh_mirror.mjs lists this page in
 * HANDMADE and keeps the Chinese file as it is; scripts/site/build.mjs then builds / and /en/.
 * Images: assets/img/opt/sp-*.webp (screenshots from Hurfi's SEO work) and assets/img/locations/.
 *
 *   node scripts/hurfi-pages/service_seo.mjs
 *
 * Idempotent: a second run changes nothing.
 */
import * as P from "./content/service-seo.mjs";
import { PRICING } from "../site/config.mjs";
import { SITE, ORG_ID, E, t, md, paras, icon, photo, sec, eyebrow, hero, toc, bento, problems, cardGrid, processSteps,
  priceBlock, china, faq, final, related, breadcrumbLd, faqLd, writePage, written } from "./service-page-lib.mjs";

const priceCfg = PRICING.items.find((i) => i.key === "seo").price;
if (!P.COST.price.en.includes(priceCfg) || !P.COST.price.zh.includes(priceCfg)) throw new Error(`price in content (${P.COST.price.en}) differs from config.mjs (${priceCfg})`);

const HERO = { ...P.HERO, slides: P.HERO.slides.map((s) => ({ ...s, src960: `/assets/img/opt/sp-${s.name}-960.webp`, src560: `/assets/img/opt/sp-${s.name}-560.webp` })) };
const PROBLEMS = { ...P.PROBLEMS, img: P.SHOTS[P.PROBLEMS.img] };
const COST = { ...P.COST, factors: PRICING.terms.en.map((en, i) => ({ en, zh: PRICING.terms.zh[i] })) };
const SERVICES = { ...P.SERVICES, cards: P.SERVICES.cards.map((c) => ({ ...c, img: c.img ? P.SHOTS[c.img] : undefined })) };

const checklist = (X) => `            <div class="wd-checklist">
              <p class="wd-checklist-title">${md(X.listIntro)}</p>
              <ul>${X.list.map((x) => `<li>${icon("check", "wd-ic")}${md(x)}</li>`).join("")}</ul>
            </div>
`;
const callout = (x) => `            <p class="wd-callout">${icon("shield", "wd-ic")}<span>${md(x)}</span></p>\n`;

function aeo() {
  const X = P.AEO;
  return sec(X.id, "wd-aeo", `        <div class="wd-ai-grid">
          <div class="wd-head wd-head--left">
            ${eyebrow()}
            <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "            ")}            <div class="wd-answer" aria-hidden="true">
              <p class="wd-answer-q">${icon("search", "wd-ic")}${E(t(X.demo.q))}</p>
              <div class="wd-answer-a"><b></b><b></b><b class="is-short"></b><span>${icon("check", "wd-ic")}${E(t(X.demo.a))}</span></div>
            </div>
          </div>
          <div>
${checklist(X)}${callout(X.note)}          </div>
        </div>
`);
}

function geo() {
  const X = P.GEO;
  // heading and screenshot on the left; the work list, platforms, reading link and note on the right
  return sec(X.id, "wd-geo", `        <div class="wd-ai-grid">
          <div>
            <div class="wd-head wd-head--left">
              ${eyebrow()}
              <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "              ")}            </div>
            <div class="wd-shot-frame">
              <div class="wd-browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>AI Mode</span></div>
              ${photo(P.SHOTS.aimode, "wd-shot", "(max-width: 900px) 92vw, 520px")}
            </div>
          </div>
          <div>
${checklist(X)}            <p class="wd-platforms-text">${md(X.platformsText)}</p>
            <ul class="wd-tags wd-platforms">${X.platforms.map((p) => `<li>${icon("spark", "wd-ic")}${E(p)}</li>`).join("")}</ul>
            <p class="wd-more">${md(X.read)}</p>
${callout(X.note)}          </div>
        </div>
`);
}

function intl() {
  const W = P.INTL;
  // the photo band sits under the heading, beside the list (both columns end together)
  return sec(W.id, "wd-why wd-intl", `        <div class="wd-why-grid">
          <div class="wd-why-left">
            <div class="wd-head wd-head--left">
              ${eyebrow()}
              <h2 id="${W.id}-title">${E(t(W.h2))}</h2>
${paras(W.paras, "              ")}            </div>
            <div class="wd-band">
              ${photo(W.img, "wd-band-media")}
              <div class="wd-band-copy">
${paras(W.after, "                ")}              </div>
            </div>
          </div>
          <div class="wd-qcard">
            <p class="wd-qcard-title">${icon("globe", "wd-ic wd-ic--tile")}${E(t(W.listIntro))}</p>
            <ol class="wd-qlist">
${W.list.map((q) => `              <li>${md(q)}</li>\n`).join("")}            </ol>
          </div>
        </div>
`);
}

function ai() {
  const X = P.AI;
  const rows = [
    [{ en: "Clear product information", zh: "清晰的产品信息" }, "doc"], [{ en: "Descriptive headings", zh: "描述性标题" }, "layers"],
    [{ en: "Relevant entities", zh: "相关实体" }, "link"], [{ en: "Accessible technical content", zh: "易于获取的技术内容" }, "cpu"],
  ];
  return sec(X.id, "wd-ai", `        <div class="wd-ai-grid">
          <div class="wd-head wd-head--left">
            ${eyebrow()}
            <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "            ")}          </div>
          <div class="wd-ready-panel" aria-hidden="true">
            <p class="wd-ready-panel-title">${icon("spark", "wd-ic")}${E(t({ en: "AI search readiness", zh: "AI搜索准备度" }))}</p>
            <ul>${rows.map(([n, ic], i) => `<li>${icon(ic, "wd-ic")}<span>${E(t(n))}</span><i style="--w:${[92, 78, 64, 86][i]}%"></i></li>`).join("")}</ul>
            <p class="wd-ready-panel-foot">Google AI · ChatGPT · Gemini · Perplexity</p>
          </div>
        </div>
`);
}

const TOC = [
  ["seo-services", { en: "SEO services", zh: "SEO服务" }], ["aeo", { en: "AEO", zh: "AEO" }], ["geo", { en: "GEO", zh: "GEO" }],
  ["seo-problems", { en: "SEO problems", zh: "SEO问题" }], ["international-seo", { en: "International SEO", zh: "国际SEO" }],
  ["ai-search", { en: "AI search", zh: "AI搜索" }], ["process", { en: "Process", zh: "流程" }], ["why-hurfi", { en: "Why Hurfi", zh: "选择 Hurfi" }],
  ["pricing", { en: "Pricing", zh: "价格" }], ["across-china", { en: "Across China", zh: "服务城市" }], ["faq", { en: "FAQ", zh: "常见问答" }],
];

writePage({
  pathname: P.META.path, generator: "service_seo.mjs", content: "content/service-seo.mjs", meta: P.META,
  og: { src: "/assets/img/opt/sp-gsc-960.webp", w: 960, h: 600, alt: P.HERO.slides[0].alt },
  ld: () => {
    const page = SITE + P.META.path; // the build maps it to / (Chinese) or /en/ (English)
    const n = Number(priceCfg.replace(/[^\d]/g, ""));
    const names = [...P.SERVICES.cards.map((c) => c.h3), P.AEO.h2, P.GEO.h2];
    return [
      breadcrumbLd(P.META.path, P.META.crumb),
      { "@context": "https://schema.org", "@type": "Service", name: t(P.META.serviceName), serviceType: "Search engine optimization", url: page,
        description: t(P.META.description), provider: { "@id": ORG_ID }, areaServed: [{ "@type": "Country", name: "China" }, { "@type": "Place", name: "Global" }],
        audience: { "@type": "BusinessAudience", name: t({ en: "Chinese manufacturers, exporters and industrial suppliers", zh: "中国制造商、出口企业和工业供应商" }) },
        offers: { "@type": "Offer", priceCurrency: "CNY", price: String(n), description: t(P.COST.price),
          priceSpecification: { "@type": "UnitPriceSpecification", price: n, minPrice: n, priceCurrency: "CNY", unitText: "MONTH", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } } },
        hasOfferCatalog: { "@type": "OfferCatalog", name: t(P.SERVICES.h2), itemListElement: names.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t(x) } })) } },
      faqLd(P.FAQ),
    ];
  },
  main: () => `${hero(HERO, P.META.crumb)}${toc(TOC)}${bento(SERVICES, "wd-services")}${aeo()}${geo()}${problems(PROBLEMS)}${intl()}${ai()}${processSteps(P.PROCESS)}${cardGrid(P.CHOOSE, "wd-choose", "wd-why-card", "wd-grid2")}${priceBlock(COST)}${china(P.CHINA)}${faq(P.FAQ)}${final(P.FINAL)}    <div class="wd-consult" data-consult-slot></div>
${related(P.RELATED)}`,
});
console.log(written.length ? `written: ${written.join(", ")}` : "no changes");

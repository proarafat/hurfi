#!/usr/bin/env node
/**
 * The Website Development service page in both languages, from one content file:
 *   content/service-webdev.mjs  ->  services/website-development/index.html   (English source page)
 *                                   zh/services/website-development/index.html (Chinese twin, hand-made)
 * Same layout in both languages; shared blocks in service-page-lib.mjs. zh_mirror.mjs lists this page in
 * HANDMADE and keeps the Chinese file as it is; scripts/site/build.mjs then builds / and /en/.
 * Images: assets/img/opt/wd-*.webp (hero slider) and assets/img/locations/.
 *
 *   node scripts/hurfi-pages/service_webdev.mjs
 *
 * Idempotent: a second run changes nothing.
 */
import * as P from "./content/service-webdev.mjs";
import { PRICING } from "../site/config.mjs";
import { SITE, ORG_ID, E, t, href, md, paras, icon, photo, sec, eyebrow, head2, isZh, hero, toc, problems, cardGrid, processSteps,
  priceBlock, china, faq, final, related, bento, breadcrumbLd, faqLd, imageAlt, writePage, written } from "./service-page-lib.mjs";

// The price in the copy must match the single source of truth.
const priceCfg = PRICING.items.find((i) => i.key === "website-development").price;
if (!P.COST.price.en.includes(priceCfg) || !P.COST.price.zh.includes(priceCfg)) throw new Error(`price in content (${P.COST.price.en}) differs from config.mjs (${priceCfg})`);

const HERO = { ...P.HERO, cta2: [P.HERO.cta2, "/projects/"], chips: P.HERO.chips.map((c, i) => [["check", "chat", "server"][i], c]),
  slides: P.HERO.slides.map((s) => ({ ...s, src960: `/assets/img/opt/wd-${s.name}-960.webp`, src560: `/assets/img/opt/wd-${s.name}-560.webp` })) };

function why() {
  const W = P.WHY;
  return sec(W.id, "wd-why", `        <div class="wd-why-grid">
          <div class="wd-head wd-head--left">
            ${eyebrow()}
            <h2 id="${W.id}-title">${E(t(W.h2))}</h2>
${paras(W.paras, "            ")}          </div>
          <div class="wd-qcard">
            <p class="wd-qcard-title">${icon("chat", "wd-ic wd-ic--tile")}${E(t(W.listIntro))}</p>
            <ol class="wd-qlist">
${W.list.map((q) => `              <li>${md(q)}</li>\n`).join("")}            </ol>
          </div>
        </div>
        <div class="wd-band">
          ${photo(W.img, "wd-band-media")}
          <div class="wd-band-copy">
${paras(W.after, "            ")}          </div>
        </div>
`);
}

function exportReady() {
  const X = P.EXPORT_READY, K = X.sketch;
  const items = X.items.map((it, i) => {
    let extra = "";
    if (it.rfq) extra = `              <p class="wd-fields-intro">${md(it.fieldsIntro)}</p>
              <ul class="wd-fields">${it.fields.map((f) => `<li>${E(t(f))}</li>`).join("")}</ul>
${paras(it.after, "              ")}`;
    return `          <li class="wd-ready-item">
            <span class="wd-ready-num" aria-hidden="true">${i + 1}</span>
            <div>
              <h3>${E(t(it.h3))}</h3>
${paras(it.paras, "              ")}${extra}            </div>
          </li>
`;
  }).join("");
  const sketch = `<div class="wd-sketch" aria-hidden="true">
              <div class="wd-sk-bar"><i></i><i></i><i></i></div>
              <div class="wd-sk-body">
                <div class="wd-sk-nav"><b></b><b></b><b></b><b></b><b class="is-cta"></b></div>
                <div class="wd-sk-product">
                  <div class="wd-sk-photo">${icon("factory", "wd-ic")}</div>
                  <div class="wd-sk-info"><b class="wd-sk-h"></b><b class="wd-sk-t"></b><span class="wd-sk-tag"><em>1</em>${E(t(K.specs))}</span><div class="wd-sk-table"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
                </div>
                <div class="wd-sk-row"><span class="wd-sk-pill"><em>2</em>${E(t(K.cert))}</span><span class="wd-sk-pill"><em>3</em>${E(t(K.moq))}</span></div>
                <div class="wd-sk-form"><i></i><i></i><i></i><span class="wd-sk-btn"><em>4</em>${E(t(K.quote))}</span></div>
              </div>
            </div>`;
  return sec(X.id, "wd-ready", `        <div class="wd-head">
          ${eyebrow()}
          <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
          <p>${md(X.intro)}</p>
        </div>
        <div class="wd-split wd-split--ready">
          <div class="wd-split-aside">
            <div class="wd-sticky">
            ${sketch}
            </div>
          </div>
          <ol class="wd-ready-list">
${items}          </ol>
        </div>
`);
}

const HOST_BADGE = () => `<a class="wd-host-badge" href="https://www.hostinger.com?REFERRALCODE=DSZYASIRA579" target="_blank" rel="sponsored noopener"><img src="/assets/img/partners/hostinger-partner-brand-dark.svg" alt="${isZh() ? "Hostinger 官方合作伙伴机构徽章" : "Official Hostinger Agency Partner badge"}" width="160" height="60" loading="lazy" decoding="async"></a>`;
const choose = () => cardGrid({ ...P.CHOOSE, cards: P.CHOOSE.cards.map((c) => ({ ...c,
  cls: [c.hostinger ? "wd-span2 wd-card--host" : "", c.cta ? "wd-card--cta" : ""].filter(Boolean).join(" "),
  badge: c.hostinger ? HOST_BADGE() : "", note: c.hostinger ? P.CHOOSE.referralNote : null })) }, "wd-choose", "wd-why-card");

function caseStudy() {
  const X = P.CASE;
  return sec(X.id, "wd-case", `        <div class="wd-case-grid">
          <figure class="wd-case-media">
            <div class="wd-browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>squoobee.com</span></div>
            <img src="/assets/img/projects/squoobee.webp" alt="${E(t(P.HERO.slides[0].alt))}" width="1200" height="750" loading="lazy" decoding="async">
          </figure>
          <div class="wd-case-copy">
            <p class="wd-kicker">${E(t(X.kicker))}</p>
            <h2 id="${X.id}-title">${E(t(X.h2))}</h2>
${paras(X.paras, "            ")}            <ul class="wd-tags wd-tags--case">${X.features.map((f) => `<li>${icon("check", "wd-ic")}${E(t(f))}</li>`).join("")}</ul>
            <div class="wd-actions">
              <a class="wd-btn wd-btn--primary" href="https://squoobee.com" target="_blank" rel="noopener">${E(t(X.visit))} ${icon("out", "wd-ic wd-ic--btn")}</a>
            </div>
            <p class="wd-more">${md(X.more)}</p>
          </div>
        </div>
`);
}

function redesign() {
  const X = P.REDESIGN;
  const box = (b, ic, cls) => `          <article class="wd-card wd-choice ${cls}">
            <div class="wd-card-body">
              ${icon(ic, "wd-ic wd-ic--tile")}
              <h3>${E(t(b.label))}</h3>
              <p>${md(b.text)}</p>
            </div>
          </article>
`;
  return sec(X.id, "wd-redesign", `${head2(X)}        <div class="wd-grid2">
${box(X.improve, "wrench", "wd-choice--improve")}${box(X.rebuild, "layout", "wd-choice--new")}        </div>
        <p class="wd-center-note">${icon("search", "wd-ic")}${md(X.after)}</p>
`);
}

const TOC = [
  ["services", { en: "Services", zh: "服务内容" }], ["why-b2b-website", { en: "Why it matters", zh: "为什么重要" }],
  ["website-problems", { en: "Website problems", zh: "网站问题" }], ["export-ready-website", { en: "Export-ready checklist", zh: "出口网站要素" }],
  ["technology-options", { en: "Technology", zh: "技术选型" }], ["why-hurfi", { en: "Why Hurfi", zh: "选择 Hurfi" }],
  ["process", { en: "Process", zh: "建设流程" }], ["squoobee", { en: "Case study", zh: "项目案例" }],
  ["cost", { en: "Cost", zh: "费用" }], ["across-china", { en: "Across China", zh: "服务城市" }], ["faq", { en: "FAQ", zh: "常见问答" }],
];

writePage({
  pathname: P.META.path, generator: "service_webdev.mjs", content: "content/service-webdev.mjs", meta: P.META,
  og: { src: "/assets/img/locations/card-b2b-website.webp", w: 1200, h: 530, alt: "card-web" },
  ld: () => {
    const page = SITE + P.META.path; // the build maps it to / (Chinese) or /en/ (English)
    const n = Number(priceCfg.replace(/[^\d]/g, ""));
    return [
      breadcrumbLd(P.META.path, P.META.crumb),
      { "@context": "https://schema.org", "@type": "Service", name: t(P.META.serviceName), serviceType: t(P.META.serviceName), url: page,
        description: t(P.META.description), provider: { "@id": ORG_ID }, areaServed: { "@type": "Country", name: "China" },
        audience: { "@type": "BusinessAudience", name: t({ en: "Chinese manufacturers, exporters and industrial suppliers", zh: "中国制造商、出口企业和工业供应商" }) },
        offers: { "@type": "Offer", priceCurrency: "CNY", price: String(n), priceSpecification: { "@type": "PriceSpecification", minPrice: n, priceCurrency: "CNY" }, description: t(P.COST.price) },
        hasOfferCatalog: { "@type": "OfferCatalog", name: t(P.SERVICES.h2), itemListElement: P.SERVICES.cards.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t(c.h3) } })) } },
      faqLd(P.FAQ),
    ];
  },
  main: () => `${hero(HERO, P.META.crumb)}${toc(TOC)}${bento(P.SERVICES, "wd-services")}${why()}${problems(P.PROBLEMS)}${exportReady()}${cardGrid(P.TECH, "wd-tech", "wd-tech-card")}${choose()}${processSteps(P.PROCESS)}${caseStudy()}${priceBlock(P.COST)}${china(P.CHINA)}${redesign()}${faq(P.FAQ)}${final(P.FINAL)}    <div class="wd-consult" data-consult-slot></div>
${related(P.RELATED)}`,
});
console.log(written.length ? `written: ${written.join(", ")}` : "no changes");

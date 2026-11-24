// Content for /services/seo/ (English) and its Chinese twin (zh/services/seo/).
// English = the approved page copy, word for word (meta title and description as supplied).
// Chinese = a faithful translation of the same copy; bold keywords use the matching Chinese search terms.
// Pairs are T(English, Chinese). Inline markup: **keyword** (bold) and [text](/path/) (link; site paths
// are mapped to /zh/... on the Chinese page). Chinese copy follows the Advertising Law: no 最 / 第一 /
// 唯一 / 顶级 / 首选 / 100% (the build checks it), so "Best" in the English title has no Chinese equivalent.
// Written into the pages by scripts/hurfi-pages/service_seo.mjs.

const T = (en, zh) => ({ en, zh });
const SG = "https://developers.google.com/search/docs/fundamentals/seo-starter-guide";
const INTL_G = "https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites";

export const META = {
  path: "/services/seo/",
  title: T("Best B2B SEO Agency for Manufacturers | Get a Free Call – Hurfi", "B2B外贸谷歌SEO公司｜制造企业免费咨询 | Hurfi"),
  description: T(
    "Need a B2B SEO agency? Hurfi helps Chinese manufacturers improve Google visibility, reach overseas buyers and generate enquiries. Book a free SEO call.",
    "需要B2B SEO公司？Hurfi帮助中国制造企业提升谷歌曝光、触达海外买家并获取询盘。预约免费SEO咨询。"),
  keywordsZh: "谷歌SEO,外贸SEO,B2B SEO,国际SEO,AI搜索优化", // same as scripts/site/zh-keywords.mjs (the build uses that file)
  crumb: T("B2B SEO", "B2B外贸SEO"),
  serviceName: T("B2B SEO services", "B2B外贸SEO服务"),
};

export const HERO = {
  kicker: T("B2B SEO · AEO · GEO", "B2B外贸SEO · AEO · GEO"),
  h1: T("B2B SEO Agency for Chinese Manufacturers & Exporters", "面向中国制造商与出口企业的B2B外贸SEO公司"),
  paras: [
    T("Your next customer may already be searching for your products on Google or researching suppliers through AI-powered search tools. The question is whether they can find your company.",
      "您的下一位客户，可能已经在谷歌上搜索您的产品，或者正在用AI搜索工具调研供应商。问题在于，他们能不能找到您的公司。"),
    T("Hurfi is a **B2B SEO Agency** helping Chinese manufacturers, exporters, and industrial suppliers improve their visibility across Google Search and AI-driven discovery platforms.",
      "Hurfi 是一家**B2B外贸SEO公司**，帮助中国制造商、出口企业和工业供应商提升在谷歌搜索和AI驱动的发现平台上的曝光。"),
    T("Our services combine **Search Engine Optimization (SEO)**, **Answer Engine Optimization (AEO)**, and **Generative Engine Optimization (GEO)**. We focus on technical website health, relevant buyer searches, useful product information, and search visibility that supports your business goals.",
      "我们的服务结合了**搜索引擎优化（SEO）**、**答案引擎优化（AEO）**和**生成式引擎优化（GEO）**。我们关注网站的技术健康度、与买家相关的搜索、有用的产品信息，以及能支持您业务目标的搜索曝光。"),
  ],
  cta: T("Book a Free SEO Consultation", "预约免费SEO咨询"),
  cta2: [T("See our search work", "查看我们的搜索案例"), "/projects/"],
  chips: [["check", T("From ¥3,800 per month", "每月 ¥3,800 起")], ["chat", T("Free 30-minute SEO consultation", "30分钟免费SEO咨询")], ["shield", T("No long-term contract", "无长期合约")]],
  sliderLabel: T("Reports from our SEO work", "我们SEO工作中的报告截图"),
  floatNote: T("SEO · AEO · GEO", "SEO · AEO · GEO"),
  slides: [
    { name: "gsc", label: T("Google Search Console: clicks and impressions", "Google Search Console：点击与展示"), alt: T("Google Search Console performance report from Hurfi's SEO work", "Hurfi SEO 工作中的 Google Search Console 效果报告") },
    { name: "domain", label: T("Domain overview: SEO and AI search", "域名概览：SEO 与 AI 搜索"), alt: T("Domain overview with SEO and AI search visibility for a client website", "客户网站的域名概览：SEO 与 AI 搜索可见度") },
    { name: "audit", label: T("Technical SEO audit: site health", "技术SEO审计：网站健康度"), alt: T("Technical SEO audit showing the site health score and top issues", "技术SEO审计：网站健康分与主要问题") },
    { name: "organic", label: T("Organic keywords and traffic", "自然关键词与流量"), alt: T("Organic keywords and organic traffic report", "自然关键词与自然流量报告") },
    { name: "citations", label: T("AI citations across AI search tools", "各AI搜索工具中的引用"), alt: T("AI citations report: AI Overviews, ChatGPT, Perplexity, Gemini and Copilot", "AI 引用报告：AI Overviews、ChatGPT、Perplexity、Gemini 与 Copilot") },
  ],
};

const shot = (name, w, h, en, zh) => ({ src: `/assets/img/opt/sp-${name}-960.webp`, srcset: `/assets/img/opt/sp-${name}-560.webp 560w, /assets/img/opt/sp-${name}-960.webp 960w`, w, h, alt: T(en, zh) });
export const SHOTS = {
  cwv: shot("cwv", 960, 600, "Core Web Vitals report in Google Search Console", "Google Search Console 中的 Core Web Vitals 报告"),
  gbp: shot("gbp", 960, 600, "Google Business Profile interactions for a local business", "某本地企业的 Google 商家资料互动数据"),
  aimode: shot("aimode", 960, 600, "Google AI Mode answer that lists a client business", "列出客户企业的 Google AI 模式回答"),
  backlinks: shot("backlinks", 960, 600, "Backlink profile report from Hurfi's SEO work", "Hurfi SEO 工作中的外链概况报告"),
};

export const SERVICES = {
  id: "seo-services",
  h2: T("B2B SEO Services for Manufacturers & Exporters", "面向制造商与出口企业的B2B SEO服务"),
  paras: [
    T("B2B buyers search differently from everyday consumers. Procurement teams, engineers, and distributors often use technical terms, model numbers, materials, or manufacturing standards.",
      "B2B买家的搜索方式与普通消费者不同。采购团队、工程师和经销商常常使用技术术语、型号、材料或制造标准来搜索。"),
    T("Our **B2B SEO Services** focus on these searches rather than attracting visitors who have little interest in your products.",
      "我们的**B2B SEO服务**专注于这类搜索，而不是吸引对您的产品兴趣不大的访客。"),
  ],
  cards: [
    { icon: "wrench", img: "cwv", h3: T("Technical SEO Services", "技术SEO服务"), paras: [
      T("Technical issues can stop search engines from accessing or indexing important pages.", "技术问题可能导致搜索引擎无法访问或收录重要页面。"),
      T("Our **Technical SEO Services** include website audits, crawling and indexing checks, XML sitemaps, canonical tags, internal linking, structured data recommendations, mobile usability, and [website performance](/insights/export-website-speed-for-overseas-buyers/) reviews.",
        "我们的**技术SEO服务**包括网站审计、抓取与收录检查、XML站点地图、canonical标签、内部链接、结构化数据建议、手机端易用性，以及[网站性能](/insights/export-website-speed-for-overseas-buyers/)评估。"),
      T(`We follow established practices explained in [Google's SEO Starter Guide](${SG}).`, `我们遵循[谷歌《SEO新手指南》](${SG})中说明的成熟做法。`),
    ] },
    { icon: "doc", h3: T("On-Page SEO Optimization", "站内SEO优化"), paras: [
      T("Our **On-Page SEO Services** improve how website pages communicate with buyers and search engines.", "我们的**站内SEO服务**改进网站页面与买家和搜索引擎沟通的方式。"),
      T("We research relevant keywords, map search intent, optimize titles and descriptions, improve heading structures, and strengthen page content.", "我们研究相关关键词、梳理搜索意图、优化标题和描述、改进标题层级结构，并充实页面内容。"),
      T("For manufacturers, this includes optimizing technical product specifications, materials, applications, manufacturing capabilities, and supplier information.", "对制造企业来说，这包括优化产品技术规格、材料、应用、制造能力和供应商信息。"),
    ] },
    { icon: "link", h3: T("Off-Page SEO & Digital Authority", "站外SEO与网络权威度"), paras: [
      T("Off-page SEO helps businesses strengthen their online reputation beyond their own websites.", "站外SEO帮助企业在自身网站之外，增强网络上的声誉。"),
      T("Our approach considers relevant business mentions, industry references, legitimate citation opportunities, and suitable digital PR activities.", "我们的做法会考虑相关的企业提及、行业引用、正当的引用机会，以及合适的数字公关活动。"),
      T("We do not rely on purchased backlinks or manipulative link schemes. Specific outreach and authority-building activities depend on the agreed project scope.", "我们不依赖购买外链或操纵性的链接手段。具体的外联和权威度建设工作，取决于双方约定的项目范围。"),
    ] },
    { icon: "pin", img: "gbp", h3: T("Local SEO & Google Business Profile", "本地SEO与Google商家资料"), paras: [
      T("Our **Local SEO Services** support businesses with genuine location-based search requirements.", "我们的**本地SEO服务**面向确有基于地理位置的搜索需求的企业。"),
      T("Work may include Google Business Profile optimization for eligible businesses, local keyword research, business information consistency, relevant location pages, and local search performance monitoring.",
        "工作可能包括：为符合条件的企业优化 Google 商家资料（Google Business Profile）、本地关键词研究、企业信息一致性、相关的地区页面，以及本地搜索表现监测。"),
      T("We use real business locations and service coverage rather than creating misleading listings.", "我们使用真实的企业地址和服务范围，不会创建误导性的商家信息。"),
    ] },
    { icon: "globe", h3: T("International SEO Services", "国际SEO服务"), paras: [
      T("Our **International SEO Services** help Chinese exporters improve their relevance to overseas buyers.", "我们的**国际SEO服务**帮助中国出口企业提升与海外买家的相关性。"),
      T("We research search terminology in target markets and review multilingual website structures, country targeting, content localization, and [hreflang](/insights/what-is-international-seo/) requirements.",
        "我们研究目标市场的搜索用语，并检查多语言网站结构、国家定位、内容本地化和[hreflang](/insights/what-is-international-seo/)要求。"),
      T("Read our [international SEO checklist for Chinese exporters](/insights/international-seo-checklist-for-exporters/) for practical technical and content recommendations.",
        "实用的技术与内容建议，请阅读我们的[中国出口企业国际SEO清单](/insights/international-seo-checklist-for-exporters/)。"),
    ] },
    { icon: "bag", h3: T("Ecommerce & Industrial Product SEO", "电商与工业产品SEO"), paras: [
      T("Our ecommerce and **Manufacturing SEO Services** focus on category pages, product descriptions, technical specifications, and commercial buyer searches.", "我们的电商和**制造业SEO服务**聚焦分类页、产品描述、技术规格和具有采购意向的买家搜索。"),
      T("We help companies organize product families and create more useful pages for engineers, distributors, and procurement teams.", "我们帮助企业梳理产品系列，为工程师、经销商和采购团队打造更有用的页面。"),
      T("Learn more from our [industrial product page SEO guide](/insights/industrial-product-page-seo/).", "更多内容请参阅我们的[工业产品页SEO指南](/insights/industrial-product-page-seo/)。"),
    ] },
    { icon: "layers", wide: true, span2: true, h3: T("Content Strategy, Semantic SEO & Entity Optimization", "内容策略、语义SEO与实体优化"), paras: [
      T("A useful SEO strategy connects related topics instead of repeating the same keywords.", "有用的SEO策略会把相关主题联系起来，而不是重复堆砌同样的关键词。"),
      T("We develop content plans around products, applications, manufacturing processes, buyer questions, and search intent.", "我们围绕产品、应用、生产工艺、买家问题和搜索意图制定内容计划。"),
      T("Our **Semantic SEO Services** consider relevant entities, terminology, content relationships, and internal links to make website information clearer.", "我们的**语义SEO服务**会考虑相关实体、专业术语、内容之间的关系和内部链接，让网站信息更清晰。"),
    ] },
  ],
};

export const AEO = {
  id: "aeo",
  h2: T("Answer Engine Optimization (AEO) Services", "答案引擎优化（AEO）服务"),
  paras: [
    T("**Answer Engine Optimization (AEO)** helps organize website content so search and answer systems can identify clear, relevant responses to user questions.",
      "**答案引擎优化（AEO）**帮助整理网站内容，让搜索和问答系统能够识别出针对用户问题的清晰、相关的答案。"),
    T("Business buyers increasingly search through detailed questions about suppliers, specifications, materials, [certifications](/insights/certifications-page-for-export-websites/), and product applications.",
      "越来越多的企业买家，会就供应商、规格、材料、[认证](/insights/certifications-page-for-export-websites/)和产品应用提出详细的问题来搜索。"),
  ],
  listIntro: T("Our **AEO Services** include:", "我们的**AEO服务**包括："),
  list: [
    T("Question-focused content research", "以问题为中心的内容研究"), T("Clear answers and descriptive headings", "清晰的答案和描述性标题"),
    T("Useful FAQs based on customer intent", "基于客户意图的实用常见问题（FAQ）"), T("Structured content and relevant schema recommendations", "结构化内容及相关 Schema 标记建议"),
    T("Accurate company and product information", "准确的企业和产品信息"), T("Internal linking between related topics", "相关主题之间的内部链接"),
    T("Content improvements for answer-oriented searches", "针对问答型搜索的内容改进"),
  ],
  note: T("AEO can support traditional search features and AI-assisted answers. However, no website can guarantee selection by an answer engine.", "AEO可以支持传统搜索功能和AI辅助生成的答案。但任何网站都无法保证一定会被答案引擎选中。"),
  // decorative question-and-answer sketch (hidden from screen readers)
  demo: { q: T("Which supplier makes stainless steel valves to DIN standards?", "哪家供应商生产符合DIN标准的不锈钢阀门？"), a: T("Clear answer · Specifications · FAQ · Schema", "清晰答案 · 规格参数 · FAQ · Schema") },
};

export const GEO = {
  id: "geo",
  h2: T("Generative Engine Optimization (GEO) Services", "生成式引擎优化（GEO）服务"),
  paras: [
    T("**Generative Engine Optimization (GEO)** focuses on helping AI-powered discovery systems find, interpret, and reference useful business information.", "**生成式引擎优化（GEO）**的重点，是帮助AI驱动的发现系统找到、理解并引用有用的企业信息。"),
    T("Our **GEO Services** consider how brands, products, and services are represented across their websites and accessible information sources.", "我们的**GEO服务**会考虑品牌、产品和服务在自身网站及可访问的信息来源中是如何呈现的。"),
  ],
  listIntro: T("Relevant work includes:", "相关工作包括："),
  list: [
    T("AI search visibility assessment", "AI搜索可见度评估"), T("Brand and entity consistency", "品牌与实体信息一致性"), T("AI-readable content structure", "便于AI读取的内容结构"),
    T("Accurate product and service descriptions", "准确的产品和服务描述"), T("Source credibility and factual content reviews", "信息来源可信度与事实内容审核"),
    T("Relevant structured data recommendations", "相关的结构化数据建议"), T("AI Search monitoring and content improvements", "AI搜索监测与内容改进"),
  ],
  platformsText: T("Our approach considers Google AI Overviews, ChatGPT Search, Gemini, Perplexity, and other AI-assisted discovery experiences.", "我们的做法会考虑 Google AI Overviews（AI概览）、ChatGPT Search、Gemini、Perplexity 以及其他AI辅助的发现体验。"),
  platforms: ["Google AI Overviews", "ChatGPT Search", "Gemini", "Perplexity"],
  read: T("Read [AI Search for Manufacturers: What Actually Matters](/insights/ai-search-for-manufacturers/) for more information.", "更多信息请阅读[《制造商与AI搜索：真正重要的部分》](/insights/ai-search-for-manufacturers/)。"),
  note: T("GEO does not guarantee AI citations, recommendations, or placement.", "GEO并不保证获得AI引用、推荐或展示位置。"),
};

export const PROBLEMS = {
  id: "seo-problems",
  h2: T("Common SEO Problems We Help B2B Companies Solve", "我们帮助B2B企业解决的常见SEO问题"),
  img: "backlinks", // a key of SHOTS
  items: [
    { h3: T("Your Website Only Appears for Your Brand Name", "网站只在搜索品牌名时才出现"), paras: [
      T("Some manufacturers appear on Google when buyers search their company name but have limited visibility for non-branded product searches.", "有些制造企业，买家搜索公司名称时能在谷歌上找到，但在不含品牌名的产品搜索中曝光有限。"),
      T("We research relevant keywords and assess which product, category, or capability pages could better answer those searches.", "我们研究相关关键词，并评估哪些产品页、分类页或能力介绍页可以更好地回应这些搜索。"),
    ] },
    { h3: T("Important Product Pages Are Not Ranking", "重要的产品页没有排名"), paras: [
      T("Thin descriptions, missing specifications, unclear headings, and weak internal linking can limit the usefulness of product pages.", "描述单薄、缺少规格参数、标题不清晰、内部链接薄弱，都会降低产品页的实用价值。"),
      T("We review page content and search intent to identify improvements that help buyers understand technical information.", "我们检查页面内容和搜索意图，找出能帮助买家理解技术信息的改进点。"),
    ] },
    { h3: T("Overseas Buyers Cannot Find Your Business", "海外买家找不到您的企业"), paras: [
      T("A website may use Chinese market terminology that differs from the words international customers use.", "网站使用的可能是中国市场的用语，与海外客户实际使用的词并不一样。"),
      T("Our **SEO for Chinese Manufacturers** considers local search language, product terminology, industry standards, and target-market requirements.", "我们的**中国制造企业SEO**会考虑当地的搜索用语、产品术语、行业标准和目标市场的要求。"),
    ] },
    { h3: T("Your Website Gets Traffic but Few Enquiries", "网站有流量，询盘却很少"), paras: [
      T("Traffic alone does not measure business value.", "光看流量，并不能衡量商业价值。"),
      T("We examine whether visitors reach relevant product pages and can find appropriate contact or quotation options.", "我们会检查访客是否到达了相关的产品页，以及能否找到合适的联系或报价入口。"),
      T("Our [manufacturer RFQ checklist](/insights/manufacturer-website-rfq-checklist/) explains the information buyers may need before contacting a supplier.", "我们的[制造企业询盘（RFQ）清单](/insights/manufacturer-website-rfq-checklist/)说明了买家在联系供应商之前可能需要的信息。"),
    ] },
  ],
};

export const INTL = {
  id: "international-seo",
  h2: T("International SEO for Chinese Exporters", "面向中国出口企业的国际SEO"),
  paras: [
    T("Chinese manufacturers often serve buyers in North America, Europe, the [Middle East](/insights/market-pages-for-asean-middle-east-africa/), and other international markets.", "中国制造企业经常服务北美、欧洲、[中东](/insights/market-pages-for-asean-middle-east-africa/)以及其他国际市场的买家。"),
    T("Our **SEO for Exporters** starts with understanding where your business can realistically sell and which search terms buyers use.", "我们的**外贸企业SEO**，首先要弄清楚您的业务实际能卖到哪些市场，以及买家使用哪些搜索词。"),
  ],
  listIntro: T("Relevant work may include:", "相关工作可能包括："),
  list: [
    T("Target-country keyword research", "目标国家关键词研究"), T("Product and application keyword mapping", "产品与应用关键词映射"), T("English and multilingual content optimization", "英文及多语言内容优化"),
    T("International website structure", "国际化网站结构"), T("Hreflang and canonical recommendations", "Hreflang 与 canonical 设置建议"), T("Product specification optimization", "产品规格优化"),
    T("Website speed checks for overseas visitors", "面向海外访客的网站速度检测"), T("Google Search Console performance analysis", "Google Search Console 效果分析"),
  ],
  after: [
    T(`Google's official [international website guidance](${INTL_G}) explains how search engines handle language and regional versions.`, `谷歌官方的[多语言和多地区网站指南](${INTL_G})解释了搜索引擎如何处理不同语言和地区的版本。`),
    T("Our services target international buyers using Google, not domestic Baidu SEO.", "我们的服务面向使用谷歌的海外买家，而不是国内的百度SEO。"),
  ],
  img: "sz-yantian",
};

export const AI = {
  id: "ai-search",
  h2: T("AI Search Optimization for B2B Companies", "面向B2B企业的AI搜索优化"),
  paras: [
    T("Search behaviour is changing as buyers use Google AI features and AI assistants to research suppliers and products.", "随着买家使用谷歌的AI功能和AI助手来调研供应商和产品，搜索行为正在改变。"),
    T("Hurfi considers clear product information, descriptive headings, relevant entities, and accessible technical content when reviewing AI search readiness.", "在评估网站是否为AI搜索做好准备时，Hurfi 会考虑清晰的产品信息、描述性标题、相关实体，以及易于获取的技术内容。"),
    T("Accurate specifications, company information, and well-organized pages can help search systems interpret your website.", "准确的规格参数、企业信息和条理清晰的页面，可以帮助搜索系统理解您的网站。"),
    T("Our guide to [AI search for manufacturers](/insights/ai-search-for-manufacturers/) explains what matters without promising AI citations or placement.", "我们的[制造商AI搜索指南](/insights/ai-search-for-manufacturers/)说明了哪些因素真正重要，但不承诺AI引用或展示位置。"),
  ],
  img: "citations",
};

export const PROCESS = {
  id: "process",
  h2: T("Our B2B SEO Process", "我们的B2B SEO流程"),
  stepLabel: T("Step", "步骤"),
  steps: [
    { h3: T("Audit Current Search Performance", "审计当前的搜索表现"), paras: [
      T("We review the existing website, technical issues, important pages, target markets, and available Google Search Console information.", "我们检查现有网站、技术问题、重要页面、目标市场，以及现有的 Google Search Console 数据。"),
      T("This helps identify problems and prioritize relevant opportunities.", "这有助于发现问题，并确定相关机会的优先顺序。"),
    ] },
    { h3: T("Research and Optimize", "研究并优化"), paras: [
      T("We map buyer-focused keywords to appropriate pages, improve technical and on-page elements, and assess content gaps.", "我们把以买家为中心的关键词对应到合适的页面，改进技术和站内要素，并评估内容缺口。"),
      T("If your website structure cannot support the required improvements, our [B2B website development services](/services/website-development/) may be relevant.", "如果您的网站结构无法支撑所需的改进，我们的[B2B外贸网站建设服务](/services/website-development/)可能会有帮助。"),
    ] },
    { h3: T("Monitor and Report", "监测与报告"), paras: [
      T("We review clicks, impressions, indexing, website health, and relevant search performance trends.", "我们跟踪点击量、展示量、收录情况、网站健康度以及相关的搜索表现趋势。"),
      T("Reporting helps your team understand what changed, what needs more work, and where future efforts should focus.", "报告帮助您的团队了解哪些发生了变化、哪些还需要继续努力，以及后续工作应聚焦在哪里。"),
    ] },
  ],
};

export const CHOOSE = {
  id: "why-hurfi",
  h2: T("Why Choose Hurfi as Your B2B SEO Agency?", "为什么选择 Hurfi 作为您的B2B外贸SEO公司？"),
  cards: [
    { icon: "factory", h3: T("Focused on Manufacturers and Exporters", "专注制造商与出口企业"), paras: [
      T("Hurfi's services address the search requirements of Chinese factories, suppliers, and B2B companies seeking international buyers.", "Hurfi 的服务针对希望获得海外买家的中国工厂、供应商和B2B企业的搜索需求。"),
      T("Our approach considers procurement research, technical products, and the information buyers need before requesting quotations.", "我们的做法会考虑采购调研、技术型产品，以及买家在询价前需要的信息。"),
    ] },
    { icon: "code", h3: T("SEO and Website Development Together", "SEO与网站建设协同推进"), paras: [
      T("Hurfi combines SEO expertise with [website development](/services/website-development/) capabilities.", "Hurfi 把SEO专业能力与[网站建设](/services/website-development/)能力结合在一起。"),
      T("This helps when product pages, site structure, or technical limitations need attention before further optimization.", "当产品页、网站结构或技术限制需要先处理、再做进一步优化时，这一点很有帮助。"),
    ] },
    { icon: "chart", h3: T("Transparent Reporting and Responsible SEO", "透明的报告与负责任的SEO"), paras: [
      T("Our website displays [examples of previous search and website work](/projects/). These illustrate completed activities, not guaranteed results for new clients.", "我们的网站展示了[以往的搜索与网站工作案例](/projects/)。这些只说明已完成的工作，并不代表对新客户的效果保证。"),
      T("Hurfi does not promise specific rankings, traffic volumes, or enquiry counts. We also avoid purchased backlinks and methods that may put a domain at unnecessary risk.", "Hurfi 不承诺具体的排名、流量或询盘数量。我们也不使用购买的外链，以及可能给域名带来不必要风险的手段。"),
    ] },
    { icon: "chat", h3: T("Clear Communication and Consultation", "清晰的沟通与咨询"), paras: [
      T("Hurfi offers a [free consultation](/book-consultation/) and confirms project quotations in writing before work begins.", "Hurfi 提供[免费咨询](/book-consultation/)，并在开工前以书面形式确认项目报价。"),
      T("Our China client contact team supports communication with manufacturers and exporters.", "我们的中国客户联络团队负责与制造企业和出口企业沟通。"),
    ] },
  ],
};

export const COST = {
  id: "pricing",
  h2: T("B2B SEO Pricing in China", "中国B2B SEO价格"),
  intro: T("Hurfi's published Google SEO pricing starts at:", "Hurfi 公布的谷歌SEO价格起步为："),
  price: T("¥3,800 per month", "每月 ¥3,800 起"),
  paras: [
    T("The starting service covers technical, on-page, and content SEO aimed at overseas buyers. Final pricing depends on website size, competition, target markets, content requirements, and project scope.",
      "起步服务涵盖面向海外买家的技术SEO、站内SEO和内容SEO。实际价格取决于网站规模、竞争程度、目标市场、内容需求和项目范围。"),
  ],
  cta: T("Get a Free B2B SEO Consultation", "获取免费B2B SEO咨询"),
  factorsIntro: T("Monthly, quarterly, and annual payment options are available. Hurfi also publishes a no-long-term-contract policy.", "可按月、按季或按年付款。Hurfi 还公开承诺无长期合约。"),
  // payment terms: the published terms in scripts/site/config.mjs (PRICING.terms), shown as tiles
  factorIcon: "check",
  covers: [T("Technical SEO", "技术SEO"), T("On-page SEO", "站内SEO"), T("Content SEO", "内容SEO")],
};

export const CHINA = {
  id: "across-china",
  h2: T("B2B SEO Services Across China", "覆盖全国的B2B SEO服务"),
  paras: [
    T("Hurfi supports manufacturers, exporters, and B2B businesses across China through remote SEO services.", "Hurfi 通过远程SEO服务，支持全国各地的制造企业、出口企业和B2B企业。"),
    T("Our target markets include [Shenzhen](/locations/china/shenzhen/), [Guangzhou](/locations/china/guangzhou/), [Dongguan](/locations/china/dongguan/), [Shanghai](/locations/china/shanghai/), [Suzhou](/locations/china/suzhou/), [Wuxi](/locations/china/wuxi/), [Changzhou](/locations/china/changzhou/), [Ningbo](/locations/china/ningbo/), and other manufacturing hubs.",
      "我们的目标市场包括[深圳](/locations/china/shenzhen/)、[广州](/locations/china/guangzhou/)、[东莞](/locations/china/dongguan/)、[上海](/locations/china/shanghai/)、[苏州](/locations/china/suzhou/)、[无锡](/locations/china/wuxi/)、[常州](/locations/china/changzhou/)、[宁波](/locations/china/ningbo/)以及其他制造业重镇。"),
  ],
  cityIntro: T("Explore our dedicated SEO Agency Shenzhen and SEO Agency Guangzhou pages for city-specific information.", "如需了解具体城市的信息，请查看我们的深圳SEO和广州SEO专属页面。"),
  cities: [
    { img: "sz-huaqiangbei", name: T("SEO Agency Shenzhen", "深圳谷歌SEO"), url: "/seo-agency-shenzhen/" },
    { img: "gz-zhujiang", name: T("SEO Agency Guangzhou", "广州谷歌SEO"), url: "/seo-agency-guangzhou/" },
  ],
  after: T("Hurfi's China contact operations are based in Xi'an. We do not claim physical offices in every city we serve.", "Hurfi 的中国联络团队设在西安。我们不会声称在所服务的每座城市都设有实体办公室。"),
};

export const FAQ = {
  id: "faq",
  h2: T("Frequently Asked Questions About B2B SEO", "B2B SEO常见问题"),
  items: [
    [T("What does a B2B SEO agency do?", "B2B外贸SEO公司做什么？"),
      T("A **B2B SEO Agency** improves website visibility for searches made by business buyers. Its work may include keyword research, technical SEO, page optimization, content planning, and reporting. For manufacturers, the focus often includes product specifications, applications, sourcing requirements, and information procurement teams need before contacting suppliers.",
        "**B2B外贸SEO公司**提升网站在企业买家搜索中的曝光，工作可能包括关键词研究、技术SEO、页面优化、内容规划和报告。对制造企业而言，重点通常包括产品规格、应用、采购要求，以及采购团队在联系供应商之前需要的信息。")],
    [T("How much do B2B SEO services cost?", "B2B SEO服务多少钱？"),
      T("Hurfi's Google SEO services start from ¥3,800 per month. Pricing depends on website complexity, target markets, competition, and the amount of optimization required. A small manufacturer and a business with hundreds of product pages may need different levels of work. Final project costs are confirmed in writing.",
        "Hurfi 的谷歌SEO服务每月 ¥3,800 起。价格取决于网站复杂程度、目标市场、竞争程度和所需的优化工作量。一家小型制造企业和一家拥有数百个产品页的企业，所需的工作量可能不同。项目的实际费用会以书面形式确认。")],
    [T("How long does B2B SEO take to show results?", "B2B SEO多久能见效？"),
      T("SEO results vary according to website condition, competition, technical problems, and existing search visibility. Some changes may be reflected sooner, while competitive keywords and new content can require sustained work. Hurfi monitors available performance data rather than promising results within an unsupported timeline.",
        "SEO的效果因网站状况、竞争程度、技术问题和现有搜索曝光而异。有些改动可能较快体现，而竞争激烈的关键词和新内容可能需要持续投入。Hurfi 会跟踪现有的效果数据，而不是承诺在没有依据的时间内见效。")],
    [T("How can SEO help Chinese manufacturers find overseas buyers?", "SEO如何帮助中国制造企业找到海外买家？"),
      T("SEO helps manufacturers make relevant product and company pages discoverable through Google searches. Buyers may search using materials, applications, specifications, or supplier requirements. Optimizing pages around these needs can improve opportunities for qualified discovery, although traffic and enquiries depend on several additional business factors.",
        "SEO帮助制造企业让相关的产品页和企业页面能通过谷歌搜索被找到。买家可能会用材料、应用、规格或供应商要求来搜索。围绕这些需求优化页面，可以增加被合适买家发现的机会，但流量和询盘还取决于其他多项业务因素。")],
    [T("Does Hurfi provide international SEO?", "Hurfi 提供国际SEO吗？"),
      T("Yes. Hurfi provides **International SEO** for Chinese manufacturers and exporters targeting overseas markets. Work can involve market-specific keyword research, language planning, page structure, technical optimization, and performance monitoring. The objective is to make the website more relevant and accessible to buyers in the countries the business serves.",
        "提供。Hurfi 为面向海外市场的中国制造企业和出口企业提供**国际SEO**，工作可能包括针对具体市场的关键词研究、语言规划、页面结构、技术优化和效果监测。目标是让网站对企业所服务国家的买家来说更相关、更容易访问。")],
    [T("Can B2B SEO help generate RFQ enquiries?", "B2B SEO能带来询价（RFQ）吗？"),
      T("SEO can help potential buyers discover relevant product pages and reach quotation forms. Strong specifications, clear company information, and accessible contact options support the enquiry process. However, enquiry volume also depends on product demand, pricing, competition, website usability, and sales follow-up.",
        "SEO可以帮助潜在买家发现相关的产品页，并找到报价表单。完善的规格参数、清晰的企业信息和方便的联系方式，都有助于询盘流程。不过，询盘数量还取决于产品需求、价格、竞争、网站易用性和销售跟进。")],
    [T("Does Hurfi provide Baidu SEO?", "Hurfi 提供百度SEO吗？"),
      T("No. Hurfi's published SEO service focuses on Google and overseas buyer searches rather than domestic Baidu SEO. This approach is intended for Chinese manufacturers, exporters, and suppliers seeking visibility outside China. Businesses targeting domestic Chinese search users may require a separate Baidu-focused strategy.",
        "不提供。Hurfi 公布的SEO服务专注于谷歌和海外买家的搜索，而不是国内的百度SEO。这项服务面向希望在中国以外获得曝光的中国制造企业、出口企业和供应商。面向国内搜索用户的企业，可能需要另外制定以百度为主的策略。")],
    [T("Does Hurfi guarantee Google rankings?", "Hurfi 保证谷歌排名吗？"),
      T("No. Hurfi does not guarantee specific Google rankings, traffic volumes, or enquiry numbers. Search results depend on competition, website quality, algorithm changes, and other factors outside an agency's control. Hurfi focuses on relevant SEO work, transparent reporting, and identifying practical improvements.",
        "不保证。Hurfi 不保证具体的谷歌排名、流量或询盘数量。搜索结果取决于竞争、网站质量、算法变化以及其他服务机构无法控制的因素。Hurfi 专注于相关的SEO工作、透明的报告，以及找出切实可行的改进点。")],
  ],
};

export const FINAL = {
  id: "start",
  h2: T("Ready to Improve Your B2B Search Visibility?", "准备好提升您的B2B搜索曝光了吗？"),
  paras: [
    T("Your next international customer may already be searching for the products your factory manufactures.", "您的下一位海外客户，可能已经在搜索您工厂生产的产品。"),
    T("Hurfi can help you review your current website, identify relevant SEO opportunities, and plan improvements for overseas Google visibility.", "Hurfi 可以帮您评估现有网站、找出相关的SEO机会，并规划提升海外谷歌曝光的改进方案。"),
  ],
  cta: T("Book Your Free 30-Minute SEO Consultation", "预约30分钟免费SEO咨询"),
  phoneLabel: T("China Phone:", "中国电话："),
  emailLabel: T("Email:", "邮箱："),
};

// Extra internal links (titles are the linked pages' own headings).
export const RELATED = {
  id: "related",
  h2: T("Guides, industries and related services", "相关指南、行业与服务"),
  guidesTitle: T("SEO guides for manufacturers", "制造企业SEO指南"),
  guides: [
    ["/insights/international-seo-checklist-for-exporters/", T("An international SEO checklist for Chinese exporters", "面向中国出口企业的国际 SEO 清单")],
    ["/insights/what-is-international-seo/", T("What is international SEO?", "什么是国际 SEO？")],
    ["/insights/industrial-product-page-seo/", T("Product page SEO for industrial manufacturers", "工业制造企业的产品页 SEO")],
    ["/insights/ai-search-for-manufacturers/", T("AI search for manufacturers: what actually matters", "制造商与 AI 搜索：真正重要的部分")],
    ["/insights/export-website-speed-for-overseas-buyers/", T("Export website speed: making pages fast for overseas buyers", "外贸网站速度：让页面在海外买家那里加载得快")],
    ["/insights/manufacturer-website-rfq-checklist/", T("What a manufacturer website needs before buyers send an RFQ", "买家发询价前，制造企业网站需要具备什么")],
    ["/insights/choosing-an-export-marketing-agency/", T("How a manufacturer should choose an export marketing agency", "制造企业如何选择外贸营销机构")],
  ],
  industriesTitle: T("Industries we do SEO for", "我们服务的行业"),
  industries: [
    ["/industries/industrial-automation-robotics/", T("Industrial Automation & Robotics", "工业自动化与机器人")],
    ["/industries/electronics-semiconductor/", T("Electronics & Semiconductor", "电子与半导体")],
    ["/industries/chemicals-specialty-materials/", T("Chemicals & Specialty Materials", "化工与特种材料")],
    ["/industries/water-wastewater-technology/", T("Water & Wastewater Technology", "水与污水处理技术")],
    ["/industries/battery-energy-storage/", T("Battery & Energy Storage", "电池与储能")],
    ["/industries/laboratory-scientific-equipment/", T("Laboratory & Scientific Equipment", "实验室与科学设备")],
    ["/industries/", T("All industries", "全部行业")],
  ],
  servicesTitle: T("Other services", "其他服务"),
  services: [
    ["/services/website-development/", T("Website Development", "网站建设"), T("Professional B2B websites that help Chinese manufacturers and suppliers showcase products, capabilities, and build buyer trust.", "专业的B2B网站，帮中国制造商和供应商展示产品和能力，赢得买家信任。")],
    ["/services/digital-marketing/", T("Digital Marketing", "数字营销"), T("Campaigns that help Chinese B2B companies build awareness, attract buyers, and create real business opportunities.", "帮中国B2B企业提升知名度、吸引买家、带来真实商机的推广。")],
    ["/services/social-media-management/", T("Social Media Management", "社交媒体运营"), T("Strategic social presence for Chinese manufacturers, suppliers, and B2B brands — content that builds trust and visibility.", "为中国制造商、供应商和B2B品牌做有策略的社媒运营，用内容建立信任、提升曝光。")],
  ],
  allServices: T("All services", "全部服务"),
};

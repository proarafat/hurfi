// ONE source of truth for content shared across hurfi.com: numbers, contact details, address, prices,
// the free offer, CTAs and the fixed trust lines. scripts/site/build.mjs writes these into every page
// (both languages) at deploy time. Change a value here and it changes everywhere.
//
// Strings are { en, zh }. Chinese copy follows the China Advertising Law: no 最 / 第一 / 唯一 / 顶级 /
// 首选 / 国家级 / 100% style absolute terms (build.mjs fails the build if one slips in here).

export const SITE = "https://hurfi.com";

// Baidu Tongji (百度统计): paste the site ID to turn it on. Empty = the script is not loaded at all.
export const BAIDU_TONGJI_ID = "";

export const STATS = [
  { n: "300+", en: "Websites built", zh: "已交付网站" },
  { n: "150+", en: "US & Western clients", zh: "服务欧美客户" },
  { n: "5+", en: "Years of experience", zh: "年行业经验" },
  { n: "17+", en: "Team members", zh: "团队成员" },
];
export const STATS_NOTE = { en: "Every number here can be verified — ask us in a free call.", zh: "以上每一个数字，都可以在免费咨询中向我们核实。" };

export const LOGOS = {
  title: { en: "Brands we've worked with across the US & Western markets", zh: "我们服务过的欧美市场品牌" },
  sub: { en: "That's how we know what Western buyers check before they send an RFQ.", zh: "正因如此，我们清楚欧美买家在发询盘前会看什么。" },
};

export const OFFER = {
  title: { en: "Free US Buyer Audit", zh: "免费美国买家视角诊断" },
  text: { en: "We review your website and your Alibaba/Made-in-China listing the way a US buyer would, and give you 3 fixes you can do yourself.",
    zh: "我们以美国买家的视角检查您的网站和阿里巴巴/中国制造网店铺，并给出3条您可以自己马上改进的建议。" },
  button: { en: "Book a free consultation", zh: "预约免费咨询" },
};

export const CONTACT = {
  phoneCN: "+86 17792239260", phoneCNHref: "tel:+8617792239260",
  phoneBD: "+880 1925 026696", phoneBDHref: "tel:+8801925026696",
  whatsapp: "https://wa.me/8801859890002",
  email: "yasir@hurfi.com",
  instagram: "https://www.instagram.com/hurfi_global/",
  linkedin: "https://www.linkedin.com/company/hurfiglobal/",
  wechat: [
    { id: "yasir-wechat", name: { en: "Yasir Arafat", zh: "Yasir Arafat" }, role: { en: "Head of Strategy & Consulting", zh: "策略与咨询负责人" }, qr: "/assets/yasirarafating-wechat.jpeg" },
    { id: "shahruk-wechat", name: { en: "Shahruk Karim Simanto", zh: "Shahruk Karim Simanto" }, role: { en: "China Client Relations Coordinator", zh: "中国客户关系协调" }, qr: "/assets/Shahruk_Karim_Simanto_wechat.jpg" },
  ],
};

// No campus, university or building names anywhere on the site.
export const ADDRESS = {
  cn: { en: "Dongxiang Road, Chang'an District, Xi'an, Shaanxi 710129, China", zh: "陕西省西安市长安区东祥路 710129",
    ld: { streetAddress: "Dongxiang Road, Chang'an District", addressLocality: "Xi'an", addressRegion: "Shaanxi", postalCode: "710129", addressCountry: "CN" } },
  bd: { en: "Colony Chokforid Road, Bogura, Bangladesh", zh: "孟加拉国博格拉 Colony Chokforid Road",
    ld: { streetAddress: "Colony Chokforid Road", addressLocality: "Bogura", addressCountry: "BD" } },
};

export const PRICING = {
  title: { en: "Pricing in RMB", zh: "人民币报价" },
  lead: { en: "Starting prices. Your quote depends on scope, and we confirm it in writing before any work starts.",
    zh: "以下为起步价，具体报价视项目范围而定，开工前我们会书面确认。" },
  items: [
    { key: "website-development", icon: "monitor", price: "¥7,999", en: { name: "Export website", unit: "from ¥7,999 one-time", note: "B2B, mobile-ready, with an SEO foundation" },
      zh: { name: "外贸独立站", unit: "¥7,999 起（一次性）", note: "B2B网站，适配手机，打好SEO基础" } },
    { key: "seo", icon: "search", price: "¥3,800", en: { name: "Google SEO", unit: "from ¥3,800/month", note: "Technical, on-page and content SEO for overseas buyers" },
      zh: { name: "谷歌SEO", unit: "¥3,800/月 起", note: "面向海外买家的技术、页面与内容优化" } },
    { key: "digital-marketing", icon: "target", price: "¥3,000", en: { name: "Google Ads management", unit: "from ¥3,000/month + ad spend", note: "Campaigns aimed at qualified inquiries" },
      zh: { name: "谷歌广告代运营", unit: "¥3,000/月 起（广告费另计）", note: "以获取有效询盘为目标的广告投放" } },
    { key: "social-media-management", icon: "share", price: "¥2,800", en: { name: "Social media management", unit: "from ¥2,800/month", note: "LinkedIn, Instagram and Facebook" },
      zh: { name: "海外社媒运营", unit: "¥2,800/月 起", note: "LinkedIn、Instagram 与 Facebook" } },
  ],
  terms: { en: ["Monthly, quarterly or annual plans", "No long-term commitment", "Cancel anytime", "Free consultation"],
    zh: ["按月、按季或按年付费", "无长期合约", "可随时取消", "免费咨询"] },
  positioning: { en: "US-market expertise at typically 30–40% less than a comparable US agency.", zh: "美国市场经验 + 中国本地团队 + 人民币报价" },
};

export const COMPARE = {
  title: { en: "How Hurfi compares", zh: "Hurfi 与其他选择的对比" },
  lead: { en: "A plain feature comparison. Typical offers vary, so ask any agency for specifics.", zh: "以下为服务内容的客观对比。各家服务不尽相同，选择前请向服务商了解具体内容。" },
  cols: { en: ["Hurfi", "Typical local agency", "Typical US agency"], zh: ["Hurfi", "一般本地代理", "一般美国代理"] },
  rows: [
    { en: "Hands-on US-market experience", zh: "美国市场实战经验", v: ["yes", "varies", "yes"] },
    { en: "China-based team", zh: "中国本地团队", v: ["yes", "yes", "no"] },
    { en: "RMB pricing", zh: "人民币报价", v: ["yes", "yes", "no"] },
    { en: "Chinese + English support", zh: "中英文双语服务", v: ["yes", "varies", "varies"] },
    { en: "No long-term commitment", zh: "无长期合约", v: ["yes", "varies", "varies"] },
    { en: "Free consultation", zh: "免费咨询", v: ["yes", "varies", "varies"] },
  ],
  val: { yes: { en: "Yes", zh: "有" }, no: { en: "No", zh: "无" }, varies: { en: "Varies", zh: "视情况而定" } },
};

export const CASE = {
  name: "Squoobee", url: "https://squoobee.com", img: "/assets/img/projects/squoobee.webp", w: 1200, h: 750,
  kicker: { en: "Case study", zh: "项目案例" },
  title: { en: "Squoobee — online store for a US squishy-toy brand", zh: "Squoobee：面向美国市场的捏捏玩具品牌网店" },
  text: { en: "Squoobee — a squishy toy brand based in Zhangzhou, Fujian, selling directly to US customers. Online store with product categories, mystery boxes, seasonal collections, order tracking, WhatsApp chat, and a 'Make Your Own Squishy' custom-print upload flow for OEM orders.",
    zh: "Squoobee：总部位于福建漳州的捏捏玩具品牌，直接面向美国消费者销售。网站包含产品分类、盲盒、节日系列、订单追踪、WhatsApp咨询，以及支持客户上传设计图的“定制捏捏”OEM下单流程。" },
  alt: { en: "Squoobee online store home page", zh: "Squoobee 网店首页" },
  link: { en: "Visit squoobee.com", zh: "访问 squoobee.com" },
};

export const FEEDBACK = { title: { en: "What clients told us", zh: "客户反馈" }, lead: { en: "Screenshots of real messages from clients.", zh: "客户真实留言截图。" } };

// Fixed, page-specific trust lines (one per page, never repeated). Industry, location and insight
// lines are in trust-lines.mjs.
export const TRUST = {
  "/": { en: "150+ US & Western clients taught us what overseas buyers check before they send an RFQ. We build that into your export marketing.",
    zh: "我们服务过150多家欧美客户，深知海外买家在发询盘前会看什么，并把这些融入您的出海营销。" },
  "/about/": { en: "A China-based team with hands-on experience serving 150+ US & Western clients. We stand between your factory and your overseas buyer.",
    zh: "扎根中国的团队，拥有服务150多家欧美客户的实战经验，我们站在您的工厂与海外买家之间。" },
  "/services/website-development/": { en: "US buyers judge a supplier's website in seconds: certifications, real factory photos, clear specs, fast loading. We've built sites for 150+ US & Western clients, so we know which trust signals win the RFQ.",
    zh: "美国买家几秒钟内就会判断一个供应商网站：认证、工厂实拍、清晰参数、加载速度。我们为150多家欧美客户建过网站，清楚哪些信任信号能带来询盘。" },
  "/services/seo/": { en: "Western buyers rarely search your product name. They search specs, applications and problems. We learned these search patterns working with 150+ US & Western clients.",
    zh: "欧美买家很少直接搜索您的产品名，他们搜索的是参数、应用场景和要解决的问题。这些搜索习惯，来自我们服务150多家欧美客户的经验。" },
  "/services/digital-marketing/": { en: "US procurement teams ignore generic 'good quality, low price' ads. We write campaigns in the language they actually reply to.",
    zh: "美国采购团队会直接忽略“质量好、价格低”式的广告。我们用他们真正会回复的方式来策划广告。" },
  "/services/social-media-management/": { en: "On LinkedIn and Instagram, US buyers follow suppliers who show process, people and proof, not catalog dumps.",
    zh: "在LinkedIn和Instagram上，美国买家关注的是展示生产过程、团队与实证的供应商，而不是堆砌产品目录。" },
  "/services/": { en: "Four services, one team that has worked with 150+ US & Western clients: pick the one that removes your biggest gap with overseas buyers.",
    zh: "四项服务，由同一支服务过150多家欧美客户的团队完成：先解决您与海外买家之间差距较大的那一环。" },
  "/projects/": { en: "Real projects for brands selling to US & Western customers.", zh: "面向欧美客户销售的真实项目案例。" },
  "/contact/": { en: "Book a free call. We'll show you proof behind every number on this site and give your factory a free action plan based on what we've learned from 150+ US & Western clients.",
    zh: "预约免费咨询：我们会向您逐一展示本站每个数字背后的真实依据，并基于服务150多家欧美客户的经验，为您的工厂提供一份免费行动方案。" },
  "/book-consultation/": { en: "In the free call we walk you through the evidence behind every figure on this site, then hand your factory an action plan drawn from our work with 150+ US & Western clients.",
    zh: "在免费咨询中，我们会带您逐项查看本站数据背后的依据，并结合服务150多家欧美客户的经验，交给您一份工厂专属的行动方案。" },
  "/industries/": { en: "Each industry page lists what US & Western buyers verify in that sector, from certifications to tolerances, before they ask for a quote.",
    zh: "每个行业页面都列出了欧美买家在询价前会核实的内容，从认证到公差。" },
  "/locations/": { en: "Wherever your factory is, US & Western buyers compare it with nearby rivals online first. These guides show what wins that comparison.",
    zh: "无论工厂在哪里，欧美买家都会先在网上把您和周边同行做比较。这些指南告诉您如何在比较中胜出。" },
  "/locations/china/": { en: "China has thousands of factories for every product. US & Western buyers shortlist the ones whose websites answer their questions before they have to ask.",
    zh: "中国每类产品都有成千上万家工厂，欧美买家只会把网站能提前回答他们问题的工厂列入候选名单。" },
  "/insights/": { en: "These guides come from what US & Western buyers asked our clients, written for factory owners who sell abroad.",
    zh: "这些指南来自欧美买家向我们客户提出的真实问题，专为做出口的工厂老板撰写。" },
};

export const UI = {
  trustLabel: { en: "Why buyers trust this", zh: "为什么值得信任" },
  statsLabel: { en: "Hurfi track record", zh: "Hurfi 业绩" },
  hot: { en: "Hot", zh: "热门" },
  language: { en: "Language", zh: "语言" },
  termsLabel: { en: "Payment terms", zh: "付款方式" },
};

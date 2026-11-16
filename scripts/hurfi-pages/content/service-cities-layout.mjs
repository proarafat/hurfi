// Layout for the service × city pages: images, statistics bands, trust strip, Hurfi posts.
// Pairs are T(English, Chinese), as in service-cities.mjs.
//
// Photos come from Wikimedia Commons under the licence shown (author + licence are printed under
// each photo, as CC BY-SA requires) and were resized to WebP in assets/img/locations/.
// "card-*" images are Hurfi's own artwork (assets/img/card-img/), converted to WebP.

const T = (en, zh) => [en, zh];
const CC = "https://creativecommons.org/licenses/by-sa/4.0/";

export const IMAGES = {
  "sz-skyline": { src: "/assets/img/locations/sz-skyline.webp", w: 1200, h: 800,
    alt: T("Shenzhen skyline seen from Hong Kong across the wetlands of the Shenzhen River", "从香港隔深圳河湿地眺望深圳天际线"),
    credit: { author: "Sparktour", license: "CC BY-SA 4.0", licenseUrl: CC, page: "https://commons.wikimedia.org/wiki/File:Skyline_of_Shenzhen_from_Hong_Kong.jpg" } },
  "sz-huaqiangbei": { src: "/assets/img/locations/sz-huaqiangbei.webp", w: 960, h: 720,
    alt: T("Inside Huaqiang Electronics World, part of Shenzhen’s Huaqiangbei electronics market", "深圳华强北电子市场的华强电子世界内景"),
    caption: T("Huaqiangbei, Shenzhen’s electronics market.", "深圳华强北电子市场。"),
    credit: { author: "Mx. Granger", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", page: "https://commons.wikimedia.org/wiki/File:%E5%8D%8E%E5%BC%BA%E7%94%B5%E5%AD%90%E4%B8%96%E7%95%8C_1.jpg" } },
  "sz-yantian": { src: "/assets/img/locations/sz-yantian-port.webp", w: 960, h: 720,
    alt: T("Container terminals at Yantian Port in Shenzhen, seen from above", "俯瞰深圳盐田港集装箱码头"),
    caption: T("Yantian Port, one of Shenzhen’s main container ports.", "盐田港，深圳主要的集装箱港口之一。"),
    credit: { author: "Gigel.atat", license: "CC BY-SA 4.0", licenseUrl: CC, page: "https://commons.wikimedia.org/wiki/File:Yantian-port_from_above.jpg" } },
  "gz-skyline": { src: "/assets/img/locations/gz-skyline.webp", w: 1200, h: 800,
    alt: T("Canton Tower and the Guangzhou skyline along the Pearl River", "广州塔与珠江沿岸的广州天际线"),
    credit: { author: "Tim Wu", license: "CC BY-SA 4.0", licenseUrl: CC, page: "https://commons.wikimedia.org/wiki/File:Canton_Tower_20220626_(cropped).jpg" } },
  "gz-zhujiang": { src: "/assets/img/locations/gz-zhujiang-new-town.webp", w: 960, h: 720,
    alt: T("Zhujiang New Town, Guangzhou’s central business district, across the Pearl River", "隔珠江远眺广州中央商务区珠江新城"),
    caption: T("Zhujiang New Town, Guangzhou’s business district.", "广州商务区珠江新城。"),
    credit: { author: "钉钉", license: "CC BY-SA 4.0", licenseUrl: CC, page: "https://commons.wikimedia.org/wiki/File:Zhujiang_New_Town_2.jpg" } },
  "gz-cantonfair": { src: "/assets/img/locations/gz-canton-fair.webp", w: 960, h: 720,
    alt: T("The Canton Fair Complex in Pazhou, Guangzhou, seen from the Pearl River", "从珠江上看广州琶洲的广交会展馆"),
    caption: T("The Canton Fair Complex in Pazhou, where the Canton Fair is held every spring and autumn.", "琶洲广交会展馆，广交会每年春秋两季在此举办。"),
    credit: { author: "中少", license: "CC BY-SA 4.0", licenseUrl: CC, page: "https://commons.wikimedia.org/wiki/File:Canton_Fair_Complex_Area_A_and_Canton_Fair_Building.jpg" } },
  "gz-night": { src: "/assets/img/locations/gz-zhujiang-night.webp", w: 960, h: 720,
    alt: T("Zhujiang New Town and the Pearl River in Guangzhou at night", "夜色中的广州珠江新城与珠江"),
    caption: T("Guangzhou’s Zhujiang New Town at night.", "夜色中的广州珠江新城。"),
    credit: { author: "钉钉", license: "CC BY-SA 4.0", licenseUrl: CC, page: "https://commons.wikimedia.org/wiki/File:Zhujiang_New_Town_at_night.jpg" } },
  cnc: { src: "/assets/img/locations/factory-cnc.webp", w: 960, h: 720,
    alt: T("CNC milling machines on a factory floor", "工厂车间里的数控铣床"),
    caption: T("Machining centres on a factory floor: the capability a B2B website has to show.", "车间里的加工中心：这正是 B2B 网站需要展示的制造能力。"),
    credit: { author: "Ana 2016", license: "CC BY-SA 4.0", licenseUrl: CC, page: "https://commons.wikimedia.org/wiki/File:Milling_machines_in_the_Xcentric_Ripper_Int._factory.jpg" } },
  smt: { src: "/assets/img/locations/electronics-smt.webp", w: 960, h: 720,
    alt: T("An automatic SMT production line for electronics assembly", "用于电子组装的全自动 SMT 生产线"),
    caption: T("An SMT line for circuit-board assembly.", "用于电路板组装的 SMT 生产线。"),
    credit: { author: "Gpkp", license: "CC BY-SA 4.0", licenseUrl: CC, page: "https://commons.wikimedia.org/wiki/File:Electronica,_Bangalore_International_Exhibition_Centre_(2025)_257.jpg" } },
  "card-web": { src: "/assets/img/locations/card-b2b-website.webp", w: 1200, h: 530, alt: T("A B2B website shown on a laptop", "笔记本电脑上展示的 B2B 网站") },
  "card-seo": { src: "/assets/img/locations/card-seo.webp", w: 1200, h: 532, alt: T("Google search suggestions for SEO companies", "谷歌上搜索 SEO 公司的联想结果") },
  "card-dm": { src: "/assets/img/locations/card-digital-marketing.webp", w: 1200, h: 530, alt: T("The steps of a growth plan: idea, plan, register", "增长计划的步骤：构想、规划、落地") },
  "card-social": { src: "/assets/img/locations/card-social-content.webp", w: 1200, h: 530, alt: T("Hurfi’s channels: website, SEO, LinkedIn, Instagram, email and WhatsApp", "Hurfi 的渠道：网站、SEO、领英、Instagram、邮件和 WhatsApp") },
};

export const HERO_IMAGE = { shenzhen: "sz-skyline", guangzhou: "gz-skyline" };

// [icon, text] under the hero
export const TRUST = [
  ["clock", T("Free 30-minute strategy call", "30 分钟免费策略咨询")],
  ["users", T("Remote team in Xi’an and Bogura", "西安与博格拉的远程团队")],
  ["shield", T("Official Hostinger Agency Partner", "Hostinger 官方合作伙伴机构")],
  ["chart", T("Reports from your own accounts", "数据来自你自己的账户")],
];

// Per page: imgs = section index -> image key (sections without cards/sub-blocks become a text +
// image row, alternating sides); stats = section index -> figures band; posts = Hurfi's own posts.
export const LAYOUT = {
  "website-development-agency-shenzhen": { imgs: { 0: "sz-huaqiangbei", 2: "smt", 6: "card-web" },
    stats: { 2: { items: [
      [T("+6.2%", "+6.2%"), T("value added in computer, communications and electronic equipment manufacturing, 2025", "2025 年计算机、通信和其他电子设备制造业增加值增速")],
      [T("+29.4%", "+29.4%"), T("value added in automobile manufacturing, 2025", "2025 年汽车制造业增加值增速")],
      [T("+43.1%", "+43.1%"), T("output of industrial robots, 2025", "2025 年工业机器人产量增速")]],
      src: { pre: T("Sources:", "来源："), links: [
        [T("Shenzhen 2025 Statistical Bulletin", "2025 年深圳市国民经济和社会发展统计公报"), "https://tjj.sz.gov.cn/szstjjwzgkml/szstjjwzgkml/sjfb/tjgb/content/post_12805132.html"],
        [T("Shenzhen Industry and Information Technology Bureau indicators", "深圳市工业和信息化局指标数据"), "https://www.sz.gov.cn/szzt2010/sjfb/sjkd/content/post_12652612.html"]] } } },
    posts: ["great-products-need-a-digital-identity", "global-buyers-dont-just-search-they-verify", "beautiful-website-without-conversions"] },
  "seo-agency-shenzhen": { imgs: { 0: "card-seo", 2: "sz-huaqiangbei", 4: "sz-yantian", 5: "cnc" },
    posts: ["ready-to-get-discovered", "global-buyers-search-before-they-buy", "great-factory-means-nothing-if-buyers-cant-find-it"] },
  "digital-marketing-agency-shenzhen": { imgs: { 0: "card-dm", 1: "sz-yantian" },
    posts: ["attract-the-right-global-buyers", "we-turn-insights-into-strategy", "digital-growth-system-every-factory-needs"] },
  "social-media-management-agency-shenzhen": { imgs: { 0: "card-social" },
    posts: ["normal-people-vs-digital-marketer", "brand-not-built-by-one-thread", "make-your-brand-stand-tall-globally"] },
  "website-development-agency-guangzhou": { imgs: { 0: "gz-zhujiang", 1: "gz-cantonfair", 6: "card-web" },
    stats: { 1: { items: [
      [T("46.3%", "46.3%"), T("of industrial value added came from automobile, electronic products and petrochemical manufacturing, 2025", "2025 年汽车、电子产品和石油化工制造业占规模以上工业增加值的比重")],
      [T("¥825.66bn", "8256.6 亿元"), T("goods exports, 2025", "2025 年货物出口额")],
      [T("+17.8%", "+17.8%"), T("growth in goods exports, 2025", "2025 年货物出口增速")]] } },
    posts: ["missing-piece-strong-digital-presence", "world-doesnt-see-your-factory", "your-factory-is-powerful"] },
  "seo-agency-guangzhou": { imgs: { 0: "card-seo", 2: "gz-night" },
    posts: ["factory-has-everything-except-visibility", "youve-built-what-global-buyers-want", "visibility-does"] },
  "digital-marketing-agency-guangzhou": { imgs: { 0: "card-dm", 3: "gz-cantonfair" },
    posts: ["looking-for-international-buyers", "expanding-without-research", "its-time-to-go-global"] },
  "social-media-management-agency-guangzhou": { imgs: { 0: "card-social", 3: "gz-zhujiang" },
    posts: ["build-your-global-brand-bricks", "turn-your-factory-into-a-global-brand", "from-invisible-manufacturer-to-global-supplier"] },
};

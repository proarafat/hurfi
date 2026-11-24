// Chinese <meta name="keywords"> for every indexable Chinese page (Baidu still reads it).
// 3–5 phrases per page, taken from the page's own topic, title and H1; no invented terms, no repeats
// within a page, no absolute advertising terms. build.mjs writes them into the Chinese pages and warns
// about any indexable Chinese page that has none.

const page = {
  // core pages
  "/": ["外贸独立站", "谷歌SEO", "中国制造出海营销", "外贸网站建设", "海外询盘"],
  "/about/": ["Hurfi团队", "出海营销团队", "外贸营销服务", "中国制造出海"],
  "/services/": ["外贸网站建设", "谷歌SEO优化", "谷歌广告代运营", "海外社媒运营", "外贸推广服务"],
  "/services/website-development/": ["外贸网站建设", "B2B网站建设", "外贸独立站", "工厂网站建设", "产品目录网站"],
  "/services/seo/": ["谷歌SEO", "外贸SEO", "B2B SEO", "国际SEO", "AI搜索优化"],
  "/services/digital-marketing/": ["谷歌广告代运营", "B2B数字营销", "海外询盘获取", "外贸推广"],
  "/services/social-media-management/": ["海外社媒运营", "LinkedIn运营", "领英营销", "制造企业社媒推广"],
  "/projects/": ["外贸网站案例", "谷歌SEO案例", "外贸独立站案例", "出海营销案例"],
  "/contact/": ["联系Hurfi", "外贸营销咨询", "出海营销联系方式", "Hurfi微信"],
  "/book-consultation/": ["免费出海营销咨询", "外贸网站咨询", "谷歌SEO咨询", "免费美国买家视角诊断"],
  "/brand-guidelines/": ["Hurfi品牌规范", "Hurfi标志", "品牌颜色与字体"],
  "/privacy-policy/": ["Hurfi隐私政策", "个人信息保护", "网站隐私说明"],
  "/terms/": ["Hurfi服务条款", "网站使用条款", "项目合作条款"],
  "/refund-policy/": ["Hurfi退款政策", "退款与退还", "服务退款说明"],
  "/industries/": ["制造业出海营销", "行业外贸网站", "B2B行业营销", "工业品谷歌SEO"],
  "/insights/": ["外贸营销洞察", "出海营销指南", "外贸网站指南", "谷歌SEO指南"],
  "/locations/": ["中国制造业地区", "外贸网站建设城市", "制造业集群出海"],
  "/locations/china/": ["中国制造业城市", "产业集群出海", "各地外贸网站建设", "制造企业谷歌SEO"],

  // service × city pages
  "/website-development-agency-shenzhen/": ["深圳外贸网站建设", "深圳英文独立站", "深圳B2B网站开发", "深圳网站建设公司"],
  "/website-development-agency-guangzhou/": ["广州外贸网站建设", "广州英文独立站", "广州B2B网站开发", "广州网站建设公司"],
  "/seo-agency-shenzhen/": ["深圳谷歌SEO", "深圳SEO优化", "深圳外贸SEO", "深圳出口企业获客"],
  "/seo-agency-guangzhou/": ["广州谷歌SEO", "广州SEO优化", "广州外贸SEO", "广州出口企业获客"],
  "/digital-marketing-agency-shenzhen/": ["深圳海外数字营销", "深圳谷歌广告", "深圳外贸推广", "深圳询盘获取"],
  "/digital-marketing-agency-guangzhou/": ["广州海外数字营销", "广州谷歌广告", "广州外贸推广", "广州询盘获取"],
  "/social-media-management-agency-shenzhen/": ["深圳海外社媒代运营", "深圳LinkedIn运营", "深圳领英推广", "深圳外贸社媒"],
  "/social-media-management-agency-guangzhou/": ["广州海外社媒代运营", "广州LinkedIn推广", "广州领英运营", "广州外贸社媒"],

  // insights
  "/insights/ai-search-for-manufacturers/": ["AI搜索", "制造企业AI搜索", "生成式引擎优化", "AI搜索优化"],
  "/insights/canton-fair-guide-for-exporters/": ["广交会", "2026广交会时间", "广交会分期", "广交会采购指南"],
  "/insights/ce-marking-for-chinese-manufacturers/": ["CE认证", "CE标志", "欧盟CE认证指南", "中国制造商CE"],
  "/insights/certifications-page-for-export-websites/": ["认证页面", "外贸网站证书展示", "出口认证", "海外买家信任"],
  "/insights/china-export-markets-2025/": ["2025中国出口", "中国出口市场", "出口增长与下滑", "制造业出口趋势"],
  "/insights/choosing-an-export-marketing-agency/": ["外贸营销机构", "出口营销代理公司", "如何选择外贸营销公司", "外贸推广公司"],
  "/insights/cnc-machining-quote-comparison/": ["CNC加工报价", "数控加工报价比较", "CNC供应商选择", "机加工询价"],
  "/insights/commercial-energy-storage-procurement/": ["商业储能采购", "储能系统采购清单", "工商业储能", "储能供应商核查"],
  "/insights/export-website-speed-for-overseas-buyers/": ["外贸网站速度", "网站加载速度", "海外访问速度", "Core Web Vitals"],
  "/insights/factory-website-trust-signals/": ["工厂网站信任信号", "海外买家信任", "外贸网站优化", "工厂网站改进"],
  "/insights/google-ads-for-exporters/": ["谷歌广告", "外贸谷歌广告", "Google Ads设置", "工厂谷歌广告投放"],
  "/insights/incoterms-2020-explained/": ["Incoterms 2020", "国际贸易术语", "EXW", "FCA", "DDP"],
  "/insights/industrial-product-page-seo/": ["产品页SEO", "工业产品页优化", "工业品谷歌SEO", "产品页面优化"],
  "/insights/international-seo-checklist-for-exporters/": ["国际SEO清单", "出口企业国际SEO", "多语言SEO", "hreflang设置"],
  "/insights/linkedin-for-factory-export-sales/": ["领英外贸", "LinkedIn外贸开发", "工厂领英营销", "领英客户开发"],
  "/insights/manufacturer-website-rfq-checklist/": ["询价清单", "RFQ页面", "制造企业网站询盘", "外贸网站询价表单"],
  "/insights/market-pages-for-asean-middle-east-africa/": ["东盟市场", "中东市场", "非洲市场", "市场页面", "海外市场开发"],
  "/insights/overseas-buyer-inquiries/": ["海外询盘", "外贸询盘获取", "海外买家开发", "中国制造商询盘"],
  "/insights/pdf-catalogue-to-product-pages/": ["PDF产品目录", "产品目录网页化", "产品页面", "外贸网站产品目录"],
  "/insights/shipping-logistics-page-for-exporters/": ["物流页面", "外贸运输说明", "出口物流", "交货期说明"],
  "/insights/standing-out-in-an-industrial-cluster/": ["产业集群", "工厂差异化", "产业带营销", "同质化竞争"],
  "/insights/trade-show-follow-up-for-manufacturers/": ["展会跟进", "展会客户跟进", "展会后询价", "外贸展会营销"],
  "/insights/what-is-an-oem-manufacturer/": ["OEM制造商", "OEM与ODM区别", "OEM代工", "ODM"],
  "/insights/what-is-international-seo/": ["国际SEO", "什么是国际SEO", "多语言网站SEO", "出口企业SEO"],
};

// industry pages: the industry's search name + the page's topics (export website, Google SEO, export marketing, inquiries)
const industries = {
  "aerospace-aviation-supply-chain": "航空零部件", "agritech-agricultural-equipment": "农机设备", "apparel-footwear-production": "服装鞋类",
  "automotive-mobility-components": "汽车零部件", "battery-energy-storage": "储能电池", "chemicals-specialty-materials": "化工材料",
  "commercial-cleaning-hygiene-equipment": "商用清洁设备", "construction-materials-systems": "建材", "data-centers-digital-infrastructure": "数据中心设备",
  "electronics-semiconductor": "电子半导体", "environmental-circular-economy": "环保设备", "ev-e-mobility": "电动汽车",
  "food-processing-equipment": "食品机械", "furniture-interior-manufacturing": "家具", "industrial-automation-robotics": "工业机器人",
  "industrial-hvac-building-systems": "暖通空调设备", "industrial-machinery-cnc": "数控机床", "industrial-safety-testing": "检测设备",
  "industrial-software-data": "工业软件", "laboratory-scientific-equipment": "实验室仪器", "logistics-warehouse-technology": "仓储物流设备",
  "marine-shipbuilding-supply-chain": "船舶配套", "medical-devices-diagnostics": "医疗器械", "mining-mineral-processing-equipment": "矿山机械",
  "oem-odm": "OEM代工", "optics-photonics": "光学光电", "packaging-printing-manufacturing": "包装印刷",
  "pharma-bioprocess-manufacturing": "制药设备", "power-grid-electrical-equipment": "电气设备", "precision-manufacturing-components": "精密零部件",
  "smart-buildings-urban-infrastructure": "智慧建筑", "solar-renewable-power": "光伏", "textiles-technical-fabrics": "纺织面料",
  "water-wastewater-technology": "水处理设备",
};
for (const [slug, n] of Object.entries(industries)) page[`/industries/${slug}/`] = [`${n}外贸网站建设`, `${n}谷歌SEO`, `${n}出口营销`, `${n}海外询盘`];

// OEM / ODM reads better with its own phrases than with the industry pattern
page["/industries/oem-odm/"] = ["OEM代工厂外贸网站", "ODM制造商谷歌SEO", "OEM出口营销", "OEM与ODM海外询盘"];

// city and province guides: place + the page's topics, plus the page's own angle where it has one
const places = {
  anhui: "安徽", beijing: "北京", changsha: "长沙", changzhou: "常州", chengdu: "成都", chongqing: "重庆", dalian: "大连", dongguan: "东莞",
  foshan: "佛山", fujian: "福建", fuzhou: "福州", guangdong: "广东", guangzhou: "广州", hangzhou: "杭州", hefei: "合肥", henan: "河南",
  hubei: "湖北", huizhou: "惠州", hunan: "湖南", jiangsu: "江苏", jiaxing: "嘉兴", jinan: "济南", jinhua: "金华", kunshan: "昆山",
  liaoning: "辽宁", nanjing: "南京", nantong: "南通", ningbo: "宁波", qingdao: "青岛", quanzhou: "泉州", shandong: "山东", shanghai: "上海",
  shaoxing: "绍兴", shenyang: "沈阳", shenzhen: "深圳", sichuan: "四川", suzhou: "苏州", "taizhou-zhejiang": "台州", tianjin: "天津",
  weifang: "潍坊", wenzhou: "温州", wuhan: "武汉", wuhu: "芜湖", wuxi: "无锡", xiamen: "厦门", xian: "西安", yantai: "烟台",
  zhejiang: "浙江", zhengzhou: "郑州", zhongshan: "中山", zhuhai: "珠海",
};
const angle = {
  changzhou: "常州新能源企业出海", jinhua: "义乌供应商外贸网站", zhongshan: "中山灯具出口网站", hangzhou: "杭州B2B网站建设",
  shanghai: "上海工业网站建设", beijing: "北京科技企业出海", quanzhou: "泉州品牌出海",
};
for (const [slug, p] of Object.entries(places)) {
  page[`/locations/china/${slug}/`] = [`${p}外贸网站建设`, `${p}谷歌SEO`, `${p}外贸独立站`, `${p}制造企业出海`, ...(angle[slug] ? [angle[slug]] : [])];
}

export const ZH_KEYWORDS = page;

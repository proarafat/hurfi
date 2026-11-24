// Content for /services/website-development/ (English) and its Chinese twin (zh/services/website-development/).
// English = the approved page copy, word for word. Chinese = a faithful translation of the same copy.
// Pairs are T(English, Chinese). Inline markup in both languages:
//   **keyword**     bold keyword (kept from the approved copy; Chinese uses the matching Chinese search term)
//   [text](/path/)  link. Site paths are written once (English form) and mapped to /zh/... on the Chinese page.
// Chinese copy follows the Advertising Law: no 最 / 第一 / 唯一 / 顶级 / 首选 / 100% (the build checks it).
// Written into the pages by scripts/hurfi-pages/service_webdev.mjs.

const T = (en, zh) => ({ en, zh });

export const META = {
  path: "/services/website-development/",
  title: T("B2B Website Development for Chinese Manufacturers | Hurfi", "外贸B2B网站建设｜中国制造企业英文独立站 | Hurfi"),
  description: T(
    "B2B website development for Chinese manufacturers and exporters: product catalogues, spec pages, RFQ forms and mobile-ready English sites. From ¥7,999.",
    "Hurfi为中国制造企业和出口企业建设外贸B2B网站：产品目录、规格参数页、询盘表单和适配手机的英文独立站，¥7,999起。"),
  keywordsZh: "外贸网站建设,B2B网站建设,外贸独立站,工厂网站建设,产品目录网站", // same as scripts/site/zh-keywords.mjs (the build uses that file)
  crumb: T("B2B Website Development", "B2B外贸网站建设"),
  serviceName: T("B2B Website Development", "B2B外贸网站建设"),
};

export const HERO = {
  kicker: T("B2B Website Development", "B2B外贸网站建设"),
  h1: T("B2B Website Development Agency for Chinese Manufacturers & Exporters", "面向中国制造商与出口企业的B2B外贸网站建设公司"),
  paras: [
    T("Your website should help international buyers understand what you manufacture, review your capabilities, and contact your sales team without unnecessary steps.",
      "您的网站应当帮助海外买家了解您生产什么、查看您的制造能力，并且无需多余步骤就能联系到您的销售团队。"),
    T("Hurfi is a **B2B Website Development Agency** helping Chinese manufacturers, exporters, and industrial suppliers build professional websites for overseas markets. We develop product-focused websites with clear navigation, mobile-friendly layouts, technical information, and simple enquiry paths.",
      "Hurfi 是一家**B2B外贸网站建设公司**，帮助中国制造商、出口企业和工业供应商建设面向海外市场的专业网站。我们开发以产品为核心的网站：导航清晰、适配手机、技术信息完整、询盘路径简单。"),
    T("Whether you need a new factory website, a better product catalogue, or improvements to an existing site, our team can help you plan a website around your products and the buyers you want to reach.",
      "无论您需要新建工厂网站、优化产品目录，还是改进现有网站，我们的团队都可以围绕您的产品和目标买家，帮您规划网站。"),
  ],
  cta: T("Book a Free 30-Minute Strategy Call", "预约30分钟免费策略咨询"),
  cta2: T("See our projects", "查看项目案例"),
  // short facts taken from the copy below (price, consultation, Hostinger partnership)
  chips: [T("From ¥7,999 one-time", "¥7,999起（一次性）"), T("Free 30-minute consultation", "30分钟免费咨询"), T("Official Hostinger Agency Partner", "Hostinger 官方合作伙伴机构")],
  sliderLabel: T("Websites we delivered", "我们交付的网站"),
  floatNote: T("Mobile-ready · SEO foundation", "适配手机 · SEO基础"),
  slides: [
    { name: "squoobee", label: T("Squoobee online store", "Squoobee 网店"), alt: T("Squoobee online store home page, built by Hurfi", "Hurfi 建设的 Squoobee 网店首页") },
    { name: "voltdesk", label: T("Delivered website", "已交付网站"), alt: T("Home page of a website delivered by Hurfi", "Hurfi 交付的网站首页") },
    { name: "agency", label: T("Delivered website", "已交付网站"), alt: T("Home page of a website delivered by Hurfi", "Hurfi 交付的网站首页") },
    { name: "darling", label: T("Delivered website", "已交付网站"), alt: T("Home page of a website delivered by Hurfi", "Hurfi 交付的网站首页") },
    { name: "compara", label: T("Delivered website", "已交付网站"), alt: T("Home page of a website delivered by Hurfi", "Hurfi 交付的网站首页") },
  ],
};

export const SERVICES = {
  id: "services",
  h2: T("B2B Website Development Services for Manufacturers & Exporters", "面向制造商与出口企业的B2B外贸网站建设服务"),
  paras: [
    T("A manufacturing website needs more than a company introduction. International buyers may need to review specifications, production capabilities, certifications, minimum order quantities, and delivery information before contacting a supplier.",
      "制造企业的网站不能只有一段公司简介。海外买家在联系供应商之前，往往需要查看产品规格、生产能力、认证证书、起订量和交货信息。"),
    T("Our **B2B Website Development** services focus on making that information easy to find, understand, and act on.",
      "我们的**B2B外贸网站建设**服务，就是让这些信息容易找到、容易理解，并且方便买家采取下一步行动。"),
  ],
  cards: [
    { icon: "layout", img: "card-web", h3: T("B2B Website Design & Development", "B2B网站设计与开发"), paras: [
      T("We design and develop websites that present your business, products, and manufacturing capabilities in a clear structure.",
        "我们设计并开发网站，用清晰的结构展示您的企业、产品和制造能力。"),
      T("Pages are planned around how buyers search for suppliers, compare products, and request information. We also consider mobile usability, navigation, and the steps visitors take before submitting an enquiry.",
        "页面规划围绕买家如何寻找供应商、比较产品和索取信息展开。我们也会考虑手机端的易用性、网站导航，以及访客提交询盘之前要经过的步骤。"),
    ] },
    { icon: "factory", img: "cnc", h3: T("Manufacturing Website Development", "工厂网站建设"), paras: [
      T("Our **Manufacturing Website Development** service helps factories present their products, production processes, and technical capabilities to international customers.",
        "我们的**工厂网站建设**服务，帮助工厂向海外客户展示产品、生产流程和技术能力。"),
      T("A manufacturing website can include product categories, equipment information, real factory photographs, quality control details, and downloadable specification sheets.",
        "工厂网站可以包含产品分类、设备信息、真实的工厂照片、质量控制细节，以及可下载的规格书。"),
      T("The content should help potential buyers understand whether your factory can meet their requirements before they contact your team.",
        "这些内容应当帮助潜在买家在联系您的团队之前，就能判断您的工厂是否能满足他们的要求。"),
    ] },
    { icon: "building", h3: T("Corporate Website Development", "企业官网建设"), paras: [
      T("A professional corporate website gives buyers a clear view of your business.", "一个专业的企业官网，能让买家清楚地了解您的企业。"),
      T("We organize information about your company, services, team, manufacturing capabilities, and contact channels into a website that is easy to navigate.",
        "我们把公司介绍、服务、团队、制造能力和联系渠道等信息，整理成一个易于浏览的网站。"),
      T("This service is suitable for exporters, trading companies, industrial technology businesses, and organizations that need a stronger online company profile.",
        "这项服务适合出口企业、外贸公司、工业技术企业，以及需要加强线上企业形象的机构。"),
    ] },
    { icon: "grid", h3: T("Product Catalogue Website Development", "产品目录网站建设"), paras: [
      T("Buyers should not have to search through a large PDF to find basic product information.", "买家不应该为了找到基本的产品信息，而去翻一份庞大的PDF。"),
      T("Our **Product Catalogue Website Development** approach organizes products into relevant categories, with individual pages for specifications, images, available options, and related documentation.",
        "我们的**产品目录网站建设**方法，把产品归入相应的分类，并为每款产品设置独立页面，展示规格参数、图片、可选配置和相关资料。"),
      T("A clear catalogue makes it easier to compare products, find suitable models, and request quotations.", "清晰的产品目录，让买家更容易比较产品、找到合适的型号并申请报价。"),
      T("For a practical explanation of website catalogue structure, read our guide to [turning PDF catalogues into searchable product pages](/insights/pdf-catalogue-to-product-pages/).",
        "想具体了解网站产品目录的结构，可以阅读我们的指南：[把PDF产品目录变成可搜索的产品页面](/insights/pdf-catalogue-to-product-pages/)。"),
    ] },
    { icon: "target", h3: T("Landing Page Development", "着陆页开发"), paras: [
      T("Some products, industries, or marketing campaigns need a dedicated page.", "有些产品、行业或营销活动，需要一个专门的页面。"),
      T("We develop focused landing pages that explain a specific offer, product category, or manufacturing capability.", "我们开发主题聚焦的着陆页，专门介绍某个具体方案、某个产品类别或某项制造能力。"),
      T("Each page should have a clear message, supporting information, and a direct next step, such as requesting a quotation or contacting your sales team.",
        "每个页面都应有清晰的核心信息、支撑性的内容，以及直接的下一步行动，例如申请报价或联系您的销售团队。"),
    ] },
    { icon: "refresh", wide: true, h3: T("Website Redesign & Conversion Optimization", "网站改版与转化优化"), paras: [
      T("An older website does not always need to be replaced.", "旧网站不一定都需要推倒重来。"),
      T("We review its structure, product pages, mobile experience, and enquiry process to identify areas that may make it difficult for buyers to find information.",
        "我们会检查网站结构、产品页面、手机端体验和询盘流程，找出可能让买家难以找到信息的地方。"),
      T("Depending on what we find, we may recommend improving the existing website or planning a new build.", "根据检查结果，我们可能建议改进现有网站，也可能建议规划新建网站。"),
    ] },
  ],
};

export const WHY = {
  id: "why-b2b-website",
  h2: T("Why a Professional B2B Website Matters for Manufacturers", "为什么专业的B2B网站对制造企业很重要"),
  paras: [
    T("International buyers often research several suppliers before contacting one.", "海外买家通常会先调研好几家供应商，然后才联系其中一家。"),
    T("A professional **B2B Website Design** helps them evaluate products and understand a business without waiting for an initial sales conversation.",
      "专业的**B2B网站设计**能帮助买家评估产品、了解企业，而不必等到首次销售沟通。"),
  ],
  listIntro: T("A useful manufacturing website should answer questions such as:", "一个有用的工厂网站，应当回答这样一些问题："),
  list: [
    T("What products does the company manufacture?", "这家公司生产哪些产品？"),
    T("What materials, specifications, or options are available?", "有哪些材料、规格或可选配置？"),
    T("Does the factory provide [OEM or ODM services](/industries/oem-odm/)?", "工厂是否提供[OEM或ODM服务](/industries/oem-odm/)？"),
    T("What are its manufacturing and quality control capabilities?", "它的生产能力和质量控制能力如何？"),
    T("Are relevant [certificates](/insights/certifications-page-for-export-websites/) and technical documents available?", "是否提供相关的[认证证书](/insights/certifications-page-for-export-websites/)和技术文件？"),
    T("How can a buyer request pricing or samples?", "买家如何询价或索取样品？"),
    T("Who should the buyer contact for further information?", "想进一步了解时，买家应该联系谁？"),
  ],
  after: [
    T("Clear answers can reduce unnecessary back-and-forth and help visitors decide whether to contact your business.", "清楚的答案可以减少不必要的反复沟通，帮助访客决定是否联系您的企业。"),
    T("For Chinese exporters, a professional English website provides a company-owned place to share information with buyers discovered through [trade shows](/insights/trade-show-follow-up-for-manufacturers/), search engines, industry directories, and supplier platforms.",
      "对中国出口企业来说，一个专业的英文网站，是企业自有的信息阵地，可以向通过[展会](/insights/trade-show-follow-up-for-manufacturers/)、搜索引擎、行业目录和供应商平台认识的买家展示信息。"),
  ],
  img: "gz-cantonfair",
};

export const PROBLEMS = {
  id: "website-problems",
  h2: T("Common Website Problems We Help Manufacturers Solve", "我们帮助制造企业解决的常见网站问题"),
  img: "smt",
  items: [
    { h3: T("Overseas Buyers Cannot Find Product Information", "海外买家找不到产品信息"), paras: [
      T("Many factory websites display product photographs without enough technical detail.", "很多工厂网站只放产品照片，技术细节却不够。"),
      T("Buyers may still need dimensions, materials, specifications, compatible applications, or available configurations.", "买家可能还需要尺寸、材料、规格参数、适用场景或可选配置。"),
      T("We help organize product information into relevant categories and individual pages so visitors can review important details before making an enquiry.",
        "我们帮您把产品信息整理到相应的分类和独立页面中，让访客在发询盘之前就能查看重要细节。"),
    ] },
    { h3: T("Your Website Does Not Clearly Show Your Manufacturing Capabilities", "网站没有清楚展示您的制造能力"), paras: [
      T("A factory may offer [CNC machining](/industries/industrial-machinery-cnc/), [electronics assembly](/industries/electronics-semiconductor/), [precision components](/industries/precision-manufacturing-components/), or OEM manufacturing, but its website may not explain those capabilities.",
        "一家工厂也许能提供[数控加工](/industries/industrial-machinery-cnc/)、[电子组装](/industries/electronics-semiconductor/)、[精密零部件](/industries/precision-manufacturing-components/)或OEM代工，但它的网站可能并没有把这些能力讲清楚。"),
      T("We structure relevant pages around manufacturing processes, equipment, production information, quality procedures, and supported product types using details supplied by your business.",
        "我们根据贵公司提供的资料，围绕生产工艺、设备、生产信息、质量流程和可生产的产品类型来搭建相关页面。"),
      T("This gives potential customers a clearer understanding of what your company can provide.", "这样，潜在客户就能更清楚地了解贵公司能提供什么。"),
    ] },
    { h3: T("Visitors Leave Without Sending an Enquiry", "访客没有发询盘就离开了"), paras: [
      T("An enquiry form hidden at the bottom of a page is easy to miss.", "藏在页面底部的询盘表单很容易被忽略。"),
      T("We review how buyers move between product pages, company information, and contact options. Clear calls to action and relevant quotation forms can make the next step easier.",
        "我们会检查买家如何在产品页、公司信息和联系方式之间浏览。清晰的行动按钮和合适的报价表单，能让下一步更容易。"),
      T("Not every visitor will become a lead, but the website should not make enquiries unnecessarily difficult.", "并不是每位访客都会成为潜在客户，但网站不应让询盘变得不必要地困难。"),
      T("Our [manufacturer website RFQ checklist](/insights/manufacturer-website-rfq-checklist/) explains what buyers need before they submit a quotation request.",
        "我们的[制造企业网站询盘（RFQ）清单](/insights/manufacturer-website-rfq-checklist/)说明了买家在提交报价请求之前需要哪些信息。"),
    ] },
    { h3: T("Your Website Is Difficult to Use on Mobile", "网站在手机上不好用"), paras: [
      T("Buyers may open your website on a phone while travelling, attending an exhibition, or communicating with colleagues.", "买家可能在出差途中、参加展会时或与同事沟通时，用手机打开您的网站。"),
      T("Mobile-friendly layouts, readable text, working navigation, and accessible contact forms help visitors use the site across different devices.",
        "适配手机的版式、易读的文字、可正常使用的导航和方便填写的联系表单，能让访客在不同设备上顺利使用网站。"),
      T("[Website performance](/insights/export-website-speed-for-overseas-buyers/) matters too. Google's [Core Web Vitals guidance](https://web.dev/articles/vitals) explains the metrics used to assess loading performance, responsiveness, and visual stability.",
        "[网站性能](/insights/export-website-speed-for-overseas-buyers/)同样重要。谷歌的[Core Web Vitals（核心网页指标）指南](https://web.dev/articles/vitals)解释了用于评估加载性能、响应速度和视觉稳定性的各项指标。"),
    ] },
    { h3: T("Your Website Is Not Prepared for Search Visibility", "网站没有为搜索曝光做好准备"), paras: [
      T("A website with unclear headings, weak page structure, and limited product information may be difficult for search engines to understand.", "标题不清晰、页面结构薄弱、产品信息有限的网站，搜索引擎可能很难理解。"),
      T("We consider SEO-friendly URLs, descriptive headings, internal linking, mobile usability, and technical page health during development.", "开发过程中，我们会考虑利于SEO的网址、描述性标题、内部链接、手机端易用性和页面技术健康度。"),
      T("These elements create a useful foundation for future SEO, although rankings depend on additional factors.", "这些要素为今后的SEO打下有用的基础，但排名还取决于其他因素。"),
      T("Hurfi also provides [SEO services for Chinese manufacturers and exporters](/services/seo/) to support organic search visibility after website development.",
        "Hurfi 还提供[面向中国制造商和出口企业的SEO服务](/services/seo/)，在网站建成后帮助提升自然搜索曝光。"),
    ] },
  ],
};

export const EXPORT_READY = {
  id: "export-ready-website",
  h2: T("What Should an Export-Ready Manufacturing Website Include?", "一个适合出口的工厂网站应该包含什么？"),
  intro: T("A good **Export Website Development** project starts with the information overseas buyers actually need.", "好的**外贸出口网站建设**项目，从海外买家真正需要的信息开始。"),
  items: [
    { h3: T("Clear Product Categories and Specification Pages", "清晰的产品分类与规格参数页"), paras: [
      T("Each major product family should have a dedicated section. Individual product pages can include relevant dimensions, materials, models, applications, options, images, and downloadable datasheets.",
        "每个主要产品系列都应有专门的栏目。单个产品页面可以包含相关的尺寸、材料、型号、应用、可选配置、图片和可下载的数据表。"),
      T("If a company has a large catalogue, buyers should be able to navigate between related products without returning to the homepage each time.", "如果企业的产品目录很大，买家应能在相关产品之间直接切换，而不必每次都回到首页。"),
    ] },
    { h3: T("Factory Capabilities and Quality Information", "工厂能力与质量信息"), paras: [
      T("Your website should explain what your factory can manufacture and how it manages production quality.", "您的网站应当说明工厂能生产什么，以及如何管理生产质量。"),
      T("Useful content may include real photographs, machinery details, testing procedures, quality control processes, and relevant certificates.", "有用的内容可以包括真实照片、设备详情、检测流程、质量控制流程和相关证书。"),
      T("Certification names, scopes, and expiration dates must reflect genuine company documentation.", "证书名称、认证范围和有效期必须与企业真实的证书文件一致。"),
    ] },
    { h3: T("Commercial Information for International Buyers", "面向海外买家的商务信息"), paras: [
      T("Depending on your business, buyers may need information about minimum order quantities, sample availability, estimated lead times, supported markets, and accepted [Incoterms](/insights/incoterms-2020-explained/).",
        "根据您的业务情况，买家可能需要了解起订量、能否提供样品、预计交期、可服务的市场，以及接受的[国际贸易术语（Incoterms）](/insights/incoterms-2020-explained/)。"),
      T("You do not need to publish sensitive commercial information, but clear general guidance can make initial conversations more productive.", "您不必公开敏感的商务信息，但清楚的总体说明能让初次沟通更有成效。"),
    ] },
    { h3: T("Request-for-Quotation Forms", "询价（RFQ）表单"), rfq: true, paras: [
      T("An effective **RFQ Website Development** approach connects product information with an appropriate enquiry form.", "有效的**询盘型（RFQ）网站建设**方法，会把产品信息和合适的询盘表单连接起来。"),
    ], fieldsIntro: T("Depending on your products, useful fields may include:", "根据您的产品，有用的表单字段可能包括："),
    fields: [
      T("Product or model", "产品或型号"), T("Required quantity", "需求数量"), T("Application or project type", "应用场景或项目类型"),
      T("Technical drawing or file upload", "技术图纸或文件上传"), T("Destination market", "目标市场"), T("Expected delivery schedule", "期望交货时间"),
      T("Company name and business email", "公司名称和企业邮箱"),
    ],
    after: [T("These fields should match how your sales team qualifies enquiries. Requesting too much information can discourage potential buyers.", "这些字段应与销售团队筛选询盘的方式一致。要求填写的信息太多，可能会让潜在买家望而却步。")] },
    { h3: T("English Content Written for Buyers", "为买家撰写的英文内容"), paras: [
      T("An international website needs clear product descriptions, correct technical terminology, and readable English.", "面向海外的网站需要清晰的产品描述、准确的技术术语和通顺易读的英文。"),
      T("Content should explain products and capabilities accurately rather than rely on literal translations of promotional language.", "内容应准确说明产品和能力，而不是依赖宣传用语的直译。"),
      T("This is particularly important when engineers, purchasing managers, and distributors use your site to assess supplier suitability.", "当工程师、采购经理和经销商通过您的网站评估供应商是否合适时，这一点尤其重要。"),
      T("For businesses serving multiple countries, our [international SEO checklist for Chinese exporters](/insights/international-seo-checklist-for-exporters/) covers language targeting, website structure, and important technical considerations.",
        "如果您的业务覆盖多个国家，可以参考我们的[中国出口企业国际SEO清单](/insights/international-seo-checklist-for-exporters/)，其中介绍了语言定位、网站结构和重要的技术要点。"),
    ] },
  ],
  // labels on the page sketch (decorative, hidden from screen readers)
  sketch: { quote: T("Request a quote", "申请报价"), specs: T("Specifications", "规格参数"), cert: T("Certificates", "认证证书"), moq: T("MOQ · Lead time · Incoterms", "起订量 · 交期 · 贸易术语") },
};

export const TECH = {
  id: "technology-options",
  h2: T("Custom B2B Website Development & Technology Options", "定制B2B网站开发与技术选型"),
  paras: [
    T("Different businesses need different website systems.", "不同的企业需要不同的网站系统。"),
    T("A manufacturer with a limited product range may need a corporate website with a manageable catalogue. A distributor with extensive product data may require advanced filtering or integrations.",
      "产品线不多的制造商，可能只需要一个带有易于管理的产品目录的企业官网；产品数据量大的经销商，则可能需要高级筛选功能或系统集成。"),
    T("Hurfi's broader development capabilities include WordPress, Shopify, and custom web development technologies.", "Hurfi 的开发能力还涵盖 WordPress、Shopify 以及定制网站开发技术。"),
  ],
  cards: [
    { icon: "edit", h3: T("WordPress Website Development", "WordPress 网站建设"), paras: [
      T("WordPress can be suitable for B2B websites that need editable company pages, product information, articles, and ongoing content updates.", "WordPress 适合需要可编辑的公司页面、产品信息、文章以及持续更新内容的B2B网站。"),
      T("Its content management system allows authorized team members to maintain information without rebuilding the website for every routine change.", "它的内容管理系统让获得授权的团队成员可以自行维护信息，日常修改不必每次都重建网站。"),
    ] },
    { icon: "cart", h3: T("Shopify & B2B Ecommerce Development", "Shopify 与 B2B 电商网站开发"), paras: [
      T("Shopify may be appropriate when a business needs online ordering or ecommerce functionality.", "当企业需要在线下单或电商功能时，Shopify 可能是合适的选择。"),
      T("Not every manufacturing website requires an online checkout. For businesses selling custom products or negotiated bulk quantities, an RFQ-based website may be more suitable.",
        "并不是每个工厂网站都需要在线结账。对于销售定制产品或需要议价的大批量订单的企业，以询盘（RFQ）为核心的网站可能更合适。"),
      T("The platform should follow the actual buying process.", "平台的选择应当符合实际的采购流程。"),
    ] },
    { icon: "code", h3: T("Custom Website Development", "定制网站开发"), paras: [
      T("Some projects require functionality beyond a standard website setup.", "有些项目需要标准网站之外的功能。"),
      T("Hurfi's supplied development catalogue includes React, Next.js, Node.js, and PHP capabilities, along with booking systems and CRM integrations.", "Hurfi 提供的开发服务目录包括 React、Next.js、Node.js 和 PHP 开发能力，以及预约系统和CRM集成。"),
      T("The appropriate technology and integration scope should be confirmed during project planning.", "合适的技术方案和集成范围，应在项目规划阶段确认。"),
    ], tags: ["React", "Next.js", "Node.js", "PHP", T("Booking systems", "预约系统"), T("CRM integrations", "CRM集成")] },
  ],
};

export const CHOOSE = {
  id: "why-hurfi",
  h2: T("Why Choose Hurfi as Your B2B Website Development Agency?", "为什么选择 Hurfi 作为您的B2B外贸网站建设公司？"),
  cards: [
    { icon: "flag", h3: T("Focused on Chinese Manufacturers and Exporters", "专注中国制造商与出口企业"), paras: [
      T("Hurfi's website services are designed around manufacturers, industrial suppliers, and Chinese businesses that want to communicate with overseas buyers.", "Hurfi 的网站服务专为制造商、工业供应商，以及希望与海外买家沟通的中国企业而设计。"),
      T("We consider the information buyers need when reviewing products, checking factory capabilities, and preparing quotation requests.", "我们会考虑买家在查看产品、核实工厂能力和准备询价时需要哪些信息。"),
    ] },
    { icon: "search", h3: T("Website Development and SEO Working Together", "网站建设与SEO协同推进"), paras: [
      T("Hurfi provides both website development and search engine optimization.", "Hurfi 同时提供网站建设和搜索引擎优化（SEO）服务。"),
      T("This allows website structure, product information, and technical SEO requirements to be considered together.", "这样，网站结构、产品信息和技术SEO要求可以一并考虑。"),
      T("A search-friendly website does not guarantee rankings, but good foundations can make future optimization easier.", "对搜索友好的网站并不保证排名，但良好的基础能让后续优化更容易。"),
    ] },
    { icon: "users", h3: T("Product and Buyer-Focused Website Planning", "以产品和买家为中心的网站规划"), paras: [
      T("We focus on practical details: product navigation, technical information, [company credibility](/insights/factory-website-trust-signals/), and contact paths.", "我们关注实际的细节：产品导航、技术信息、[企业可信度](/insights/factory-website-trust-signals/)和联系路径。"),
      T("These elements help make the website a useful resource for prospective customers rather than just a digital company brochure.", "这些要素让网站成为潜在客户真正有用的资料来源，而不只是一本电子版企业宣传册。"),
    ] },
    { icon: "server", hostinger: true, h3: T("Hosting Support Through Hostinger", "通过 Hostinger 提供主机托管支持"), paras: [
      T("Hurfi is an Official Hostinger Agency Partner and a verified member of the Hostinger Partner Program.", "Hurfi 是 Hostinger 官方合作伙伴机构，也是 Hostinger 合作伙伴计划的认证成员。"),
      T("Eligible websites can be hosted on Hostinger, with deployment handled by our team. The partnership provides priority technical support for relevant hosted projects.",
        "符合条件的网站可以托管在 Hostinger 上，由我们的团队负责部署。这一合作关系为相关托管项目提供优先技术支持。"),
      T("You can review [Hostinger's official website](https://www.hostinger.com?REFERRALCODE=DSZYASIRA579) for information about its hosting services and platform.", "您可以访问[Hostinger 官方网站](https://www.hostinger.com?REFERRALCODE=DSZYASIRA579)，了解其主机服务和平台信息。"),
    ] },
    { icon: "chat", h3: T("Clear Consultation and Project Scope", "清晰的咨询流程与项目范围"), paras: [
      T("Before recommending development work, we review your existing website and the requirements of your business.", "在建议任何开发工作之前，我们会先评估您的现有网站和业务需求。"),
      T("You can discuss your priorities in a free 30-minute consultation. The project scope and quotation are then confirmed in writing before work begins.", "您可以在30分钟的免费咨询中谈谈您的优先事项。项目范围和报价会在开工前以书面形式确认。"),
    ], cta: [T("Discuss Your Website Project With Hurfi", "与 Hurfi 聊聊您的网站项目"), "/contact/"] },
  ],
  referralNote: T("Referral link", "推荐链接"),
};

export const PROCESS = {
  id: "process",
  h2: T("Our B2B Website Development Process", "我们的B2B外贸网站建设流程"),
  stepLabel: T("Step", "步骤"),
  steps: [
    { h3: T("Understand Your Business and Buyers", "了解您的业务和买家"), paras: [
      T("We start with your products, manufacturing capabilities, target markets, and current website.", "我们从您的产品、制造能力、目标市场和现有网站入手。"),
      T("We identify what buyers need to see and where they should be able to request more information.", "我们明确买家需要看到什么，以及他们应该在哪里能够索取更多信息。"),
    ] },
    { h3: T("Plan and Build the Website", "规划并搭建网站"), paras: [
      T("We organize the website around relevant product, company, trust, and enquiry pages.", "我们围绕相关的产品页、公司页、信任页和询盘页来组织网站。"),
      T("The build considers clear navigation and mobile usability so buyers can review information across devices.", "搭建时注重清晰的导航和手机端易用性，让买家在各种设备上都能查看信息。"),
    ] },
    { h3: T("Check Website Quality Before Launch", "上线前检查网站质量"), paras: [
      T("We review website performance, technical health, and the path from product discovery to enquiry.", "我们检查网站性能、技术健康度，以及从发现产品到发出询盘的整个路径。"),
      T("The goal is to identify usability or technical problems before the website becomes part of your sales and marketing activity.", "目的是在网站正式用于销售和营销之前，发现易用性或技术方面的问题。"),
    ] },
  ],
};

export const CASE = {
  id: "squoobee",
  kicker: T("Case study", "项目案例"),
  h2: T("A Real Website Development Project: Squoobee", "真实网站建设案例：Squoobee"),
  paras: [
    T("Squoobee is a product brand based in Zhangzhou, Fujian, serving customers in the US market.", "Squoobee 是一个总部位于福建漳州的产品品牌，服务美国市场的客户。"),
    T("Hurfi's published project showcases an online store with product categories, mystery boxes, seasonal collections, order tracking, and WhatsApp enquiries.",
      "Hurfi 公开展示的这个项目是一家网店，包含产品分类、盲盒、季节系列、订单追踪和 WhatsApp 咨询。"),
    T("It also includes a custom ordering feature that allows customers to upload their designs for OEM orders.", "网站还提供定制下单功能，客户可以上传自己的设计图来下OEM订单。"),
    T("This is an example of a product-focused ecommerce website rather than a typical industrial RFQ website. It demonstrates how website structure and functionality can change according to the business model.",
      "这是一个以产品为核心的电商网站案例，而不是典型的工业询盘（RFQ）网站。它说明了网站结构和功能会随商业模式而变化。"),
  ],
  features: [T("Product categories", "产品分类"), T("Mystery boxes", "盲盒"), T("Seasonal collections", "季节系列"), T("Order tracking", "订单追踪"), T("WhatsApp enquiries", "WhatsApp 咨询"), T("Design upload for OEM orders", "上传设计图下OEM订单")],
  visit: T("Visit the Squoobee Website", "访问 Squoobee 网站"),
  more: T("Explore additional examples on our [website development and digital projects page](/projects/).", "更多案例请查看我们的[网站建设与数字项目页面](/projects/)。"),
};

export const COST = {
  id: "cost",
  h2: T("B2B Website Development Cost in China", "B2B外贸网站建设费用（中国）"),
  intro: T("Hurfi's published starting price for an export-oriented B2B website is:", "Hurfi 公布的外贸B2B网站起步价为："),
  price: T("From ¥7,999 — One-Time", "¥7,999 起（一次性）"),
  paras: [
    T("The entry-level offering is described as a mobile-ready B2B website with an SEO foundation.", "入门方案是一个适配手机、打好SEO基础的B2B网站。"),
    T("The final cost depends on the project requirements, and Hurfi confirms the quotation in writing before work begins.", "实际费用取决于项目需求，Hurfi 会在开工前以书面形式确认报价。"),
  ],
  factorsIntro: T("Factors that can affect the price include:", "可能影响价格的因素包括："),
  factors: [
    T("Number of website pages", "网站页面数量"), T("Product catalogue size", "产品目录规模"), T("Custom design and functionality", "定制设计与功能"),
    T("Language requirements", "语言需求"), T("Content preparation", "内容准备"), T("Ecommerce features", "电商功能"),
    T("CRM or booking integrations", "CRM或预约系统集成"), T("Product data migration", "产品数据迁移"), T("Hosting and maintenance requirements", "主机托管与维护需求"),
  ],
  after: T("A corporate website with a small product catalogue will usually have different requirements from a custom B2B platform with extensive product data and business system integrations.",
    "一个只有少量产品目录的企业官网，与一个产品数据量大、需要对接业务系统的定制B2B平台，需求通常会有所不同。"),
  cta: T("Book a Free Consultation to Get a Website Quote", "预约免费咨询，获取网站报价"),
};

export const CHINA = {
  id: "across-china",
  h2: T("B2B Website Development Services Across China", "覆盖全国的B2B外贸网站建设服务"),
  paras: [
    T("Hurfi provides remote website development services to Chinese manufacturers, exporters, industrial suppliers, and B2B companies.", "Hurfi 为中国制造商、出口企业、工业供应商和B2B企业提供远程网站建设服务。"),
    T("Our primary market is China, including businesses operating in manufacturing and export hubs such as [Shenzhen](/locations/china/shenzhen/), [Guangzhou](/locations/china/guangzhou/), [Dongguan](/locations/china/dongguan/), [Suzhou](/locations/china/suzhou/), [Wuxi](/locations/china/wuxi/), [Changzhou](/locations/china/changzhou/), [Ningbo](/locations/china/ningbo/), [Hangzhou](/locations/china/hangzhou/), [Shanghai](/locations/china/shanghai/), and [Xi'an](/locations/china/xian/).",
      "我们的主要市场是中国，包括位于[深圳](/locations/china/shenzhen/)、[广州](/locations/china/guangzhou/)、[东莞](/locations/china/dongguan/)、[苏州](/locations/china/suzhou/)、[无锡](/locations/china/wuxi/)、[常州](/locations/china/changzhou/)、[宁波](/locations/china/ningbo/)、[杭州](/locations/china/hangzhou/)、[上海](/locations/china/shanghai/)和[西安](/locations/china/xian/)等制造业和出口重镇的企业。"),
  ],
  cityIntro: T("For businesses looking for city-specific services, explore our dedicated pages:", "如需了解具体城市的服务，请查看我们的专属页面："),
  cities: [
    { img: "sz-skyline", name: T("Website Development Agency in Shenzhen", "深圳外贸网站建设"), url: "/website-development-agency-shenzhen/" },
    { img: "gz-skyline", name: T("Website Development Agency in Guangzhou", "广州外贸网站建设"), url: "/website-development-agency-guangzhou/" },
  ],
  after: T("Hurfi's China contact operations are based in Xi'an. Working with a business in another Chinese city does not require a physical Hurfi office in that city.",
    "Hurfi 的中国联络团队设在西安。与其他城市的企业合作，并不需要 Hurfi 在当地设有实体办公室。"),
};

export const REDESIGN = {
  id: "redesign-or-new",
  h2: T("Should You Redesign Your Existing Website or Build a New One?", "现有网站该改版，还是重新建设？"),
  paras: [
    T("A website redesign is worth considering when your current site no longer explains your products properly, does not work well on mobile, or makes enquiries difficult.", "如果您现在的网站已经无法清楚说明产品、在手机上不好用，或者让询盘变得困难，就值得考虑改版。"),
    T("However, a complete rebuild is not always necessary.", "不过，并不总是需要彻底重建。"),
  ],
  improve: { label: T("Improve the current site", "改进现有网站"), text: T("If the website's technical foundation remains suitable, improving product pages, navigation, English content, or quotation forms may be enough.", "如果网站的技术基础仍然适用，改进产品页、导航、英文内容或报价表单可能就足够了。") },
  rebuild: { label: T("Build a new website", "新建网站"), text: T("A new website may make more sense when the platform cannot support required functionality, the structure is difficult to maintain, or extensive changes would cost more than rebuilding.", "如果平台无法支持所需功能、结构难以维护，或者大规模修改的成本比重建还高，新建网站可能更合理。") },
  after: T("Hurfi reviews the existing website before recommending a direction.", "Hurfi 会先评估现有网站，再建议方向。"),
};

export const FAQ = {
  id: "faq",
  h2: T("Frequently Asked Questions About B2B Website Development", "B2B外贸网站建设常见问题"),
  items: [
    [T("What does a B2B website development agency do?", "B2B外贸网站建设公司做什么？"),
      T("A **B2B Website Development Agency** designs and builds websites for companies that sell products or services to other businesses. This may include corporate pages, product catalogues, technical documentation, and enquiry forms. For manufacturers, the goal is to help potential buyers understand capabilities, assess products, and contact the right sales team.",
        "**B2B外贸网站建设公司**为向其他企业销售产品或服务的公司设计和建设网站，内容可能包括企业页面、产品目录、技术文档和询盘表单。对制造企业而言，目标是帮助潜在买家了解企业能力、评估产品，并联系到对应的销售人员。")],
    [T("How much does B2B website development cost in China?", "在中国做B2B外贸网站要多少钱？"),
      T("Hurfi's export-oriented B2B websites start from ¥7,999 as a one-time development price. The final quotation depends on the number of pages, product information, design requirements, integrations, and other project details. Custom features and ongoing services may carry additional costs. Hurfi confirms the scope and quotation before starting work.",
        "Hurfi 的外贸B2B网站一次性开发价格 ¥7,999 起。具体报价取决于页面数量、产品信息、设计需求、系统集成和其他项目细节。定制功能和持续服务可能产生额外费用。Hurfi 会在开工前确认项目范围和报价。")],
    [T("How long does it take to develop a manufacturing website?", "建设一个工厂网站需要多长时间？"),
      T("The development timeline depends on project complexity, content readiness, feedback, and required features. A small corporate website generally involves less work than a large product catalogue with custom integrations. Hurfi discusses the scope before work begins and confirms the expected delivery schedule as part of the project agreement.",
        "开发周期取决于项目复杂度、内容准备情况、反馈速度和所需功能。小型企业官网的工作量通常少于带有定制集成的大型产品目录网站。Hurfi 会在开工前沟通项目范围，并在项目协议中确认预计交付时间。")],
    [T("What should a manufacturing company website include?", "制造企业网站应该包含哪些内容？"),
      T("A manufacturing website should explain what the company makes, its capabilities, product specifications, quality procedures, and how buyers can request information. Useful additions include real factory photographs, relevant certifications, downloadable technical documents, and clear quotation forms. The exact structure depends on the products, target markets, and customer requirements.",
        "制造企业网站应当说明企业生产什么、具备哪些能力、产品规格、质量流程，以及买家如何索取信息。实用的补充内容包括真实的工厂照片、相关认证、可下载的技术文件和清晰的报价表单。具体结构取决于产品、目标市场和客户需求。")],
    [T("Can a B2B website generate quotation enquiries from overseas buyers?", "B2B网站能带来海外买家的询价吗？"),
      T("A B2B website can support quotation enquiries by making products, specifications, and contact options easy to find. Clear product pages and relevant RFQ forms help visitors submit useful information to the sales team. Results also depend on traffic quality, market demand, pricing, competitiveness, and how the business responds to enquiries.",
        "B2B网站可以通过让产品、规格和联系方式易于查找，来促进询价。清晰的产品页和合适的RFQ表单能帮助访客向销售团队提交有用的信息。效果还取决于流量质量、市场需求、价格、竞争力，以及企业如何回复询盘。")],
    [T("Is WordPress suitable for B2B manufacturing websites?", "WordPress 适合做B2B工厂网站吗？"),
      T("WordPress can be suitable for manufacturers that need corporate pages, product catalogues, technical resources, and regular content updates. It supports different website structures and integrations. However, businesses with extensive product data or advanced ordering requirements should assess whether WordPress, Shopify, or a custom system better fits their needs.",
        "对于需要企业页面、产品目录、技术资料和定期更新内容的制造商，WordPress 可以是合适的选择。它支持多种网站结构和系统集成。不过，产品数据量大或有高级下单需求的企业，应评估 WordPress、Shopify 还是定制系统更符合自身需要。")],
    [T("Do Chinese exporters need an English-language website?", "中国出口企业需要英文网站吗？"),
      T("An English-language website can help Chinese exporters communicate with international buyers who use English during supplier research. It allows manufacturers to present product information, company capabilities, and enquiry options in a consistent format. Companies targeting specific non-English-speaking markets may also benefit from additional language versions where commercially justified.",
        "英文网站可以帮助中国出口企业与在寻找供应商时使用英文的海外买家沟通。它让制造商能以统一的形式展示产品信息、企业能力和询盘方式。面向特定非英语市场的企业，在商业上合理的情况下，也可以增加其他语言版本。")],
    [T("What is the difference between a B2B website and an ecommerce website?", "B2B网站和电商网站有什么区别？"),
      T("A B2B website often supports longer buying decisions involving product specifications, quotations, samples, and negotiated terms. An ecommerce website commonly allows visitors to place orders through an online checkout. Some businesses need both. For custom manufacturers or bulk suppliers, an enquiry-focused website may fit the sales process better than direct online purchasing.",
        "B2B网站通常服务于周期更长的采购决策，涉及产品规格、报价、样品和商定条款。电商网站一般允许访客通过在线结账直接下单。有些企业两者都需要。对于定制型制造商或大批量供应商，以询盘为核心的网站可能比直接在线购买更符合销售流程。")],
    [T("Can Hurfi improve our existing manufacturing website?", "Hurfi 能改进我们现有的工厂网站吗？"),
      T("Yes. Hurfi's website service includes reviewing existing websites and identifying whether improvements or a new build would be more appropriate. Depending on the site's condition, work may focus on product organization, mobile usability, technical health, English content, or enquiry paths. Recommendations follow an assessment of the website and business requirements.",
        "可以。Hurfi 的网站服务包括评估现有网站，判断是改进更合适还是新建更合适。根据网站的实际情况，工作重点可能是产品梳理、手机端易用性、技术健康度、英文内容或询盘路径。所有建议都基于对网站和业务需求的评估。")],
    [T("Does Hurfi provide website development outside Shenzhen and Guangzhou?", "Hurfi 在深圳、广州以外的城市也提供网站建设吗？"),
      T("Yes. Hurfi supports Chinese manufacturers and B2B businesses remotely, including companies in other manufacturing and export hubs. Its China contact operation is based in Xi'an, with services available beyond that city. Businesses can discuss their website requirements through Hurfi's online consultation process, email, or China contact number.",
        "是的。Hurfi 以远程方式服务中国制造商和B2B企业，包括其他制造业和出口重镇的企业。Hurfi 的中国联络团队设在西安，服务范围不限于西安。企业可以通过 Hurfi 的在线咨询、邮件或中国联系电话沟通网站需求。")],
  ],
};

export const FINAL = {
  id: "start",
  h2: T("Build a B2B Website That Makes Buyer Enquiries Easier", "打造让买家更容易询盘的B2B网站"),
  paras: [
    T("Your products and manufacturing capabilities deserve to be presented clearly.", "您的产品和制造能力，值得被清楚地展示出来。"),
    T("Whether you need a new corporate website, a more organized product catalogue, or a better way to receive international enquiries, Hurfi can help you assess your requirements and plan the next steps.",
      "无论您需要新的企业官网、更有条理的产品目录，还是更好的海外询盘接收方式，Hurfi 都可以帮您评估需求、规划下一步。"),
  ],
  cta: T("Book a Free 30-Minute Strategy Call", "预约30分钟免费策略咨询"),
  phoneLabel: T("China Contact:", "中国联系电话："),
  emailLabel: T("Email:", "邮箱："),
  closing: T("Tell us what your company manufactures, which overseas markets you want to reach, and what you need your website to achieve.", "告诉我们贵公司生产什么、想进入哪些海外市场，以及希望网站实现什么目标。"),
};

// Extra internal links (titles are the linked pages' own headings).
export const RELATED = {
  id: "related",
  h2: T("Guides, industries and related services", "相关指南、行业与服务"),
  guidesTitle: T("Guides for planning your website", "网站规划指南"),
  guides: [
    ["/insights/pdf-catalogue-to-product-pages/", T("From PDF catalogue to product pages: making your range searchable", "从 PDF 目录到产品页：让您的产品范围可被搜索")],
    ["/insights/manufacturer-website-rfq-checklist/", T("What a manufacturer website needs before buyers send an RFQ", "买家发询价前，制造企业网站需要具备什么")],
    ["/insights/factory-website-trust-signals/", T("Why overseas buyers hesitate on factory websites — and what to fix", "海外买家为什么会在一家工厂网站上犹豫——以及该改什么")],
    ["/insights/industrial-product-page-seo/", T("Product page SEO for industrial manufacturers", "工业制造企业的产品页 SEO")],
    ["/insights/export-website-speed-for-overseas-buyers/", T("Export website speed: making pages fast for overseas buyers", "外贸网站速度：让页面在海外买家那里加载得快")],
    ["/insights/certifications-page-for-export-websites/", T("The certifications page: how exporters should present certificates to overseas buyers", "认证页面：出口企业该如何向海外买家展示证书")],
    ["/insights/choosing-an-export-marketing-agency/", T("How a manufacturer should choose an export marketing agency", "制造企业如何选择外贸营销机构")],
  ],
  industriesTitle: T("Industries we build websites for", "我们服务的行业"),
  industries: [
    ["/industries/oem-odm/", T("OEM & ODM", "OEM 与 ODM")],
    ["/industries/industrial-machinery-cnc/", T("Industrial Machinery & CNC", "工业机械与数控")],
    ["/industries/electronics-semiconductor/", T("Electronics & Semiconductor", "电子与半导体")],
    ["/industries/power-grid-electrical-equipment/", T("Power Grid & Electrical Equipment", "电网与电气设备")],
    ["/industries/medical-devices-diagnostics/", T("Medical Devices & Diagnostics", "医疗器械与诊断")],
    ["/industries/precision-manufacturing-components/", T("Precision Manufacturing & Components", "精密制造与零部件")],
    ["/industries/", T("All industries", "全部行业")],
  ],
  servicesTitle: T("Other services", "其他服务"),
  services: [
    ["/services/seo/", T("SEO", "SEO"), T("Search visibility strategies that help Chinese manufacturers, suppliers, and exporters get found by global buyers.", "帮中国制造商、供应商和出口企业被全球买家搜到的搜索优化。")],
    ["/services/digital-marketing/", T("Digital Marketing", "数字营销"), T("Campaigns that help Chinese B2B companies build awareness, attract buyers, and create real business opportunities.", "帮中国B2B企业提升知名度、吸引买家、带来真实商机的推广。")],
    ["/services/social-media-management/", T("Social Media Management", "社交媒体运营"), T("Strategic social presence for Chinese manufacturers, suppliers, and B2B brands — content that builds trust and visibility.", "为中国制造商、供应商和B2B品牌做有策略的社媒运营，用内容建立信任、提升曝光。")],
  ],
  allServices: T("All services", "全部服务"),
  credits: T("Photo credits", "图片来源"),
};

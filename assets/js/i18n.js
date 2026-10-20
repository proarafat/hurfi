/* Hurfi — English, Simplified Chinese, French */
(function () {
  "use strict";

  var STORAGE = "hurfi-lang";

  // Static language pages (e.g. /zh/) declare their language in <html data-static-lang>.
  var STATIC = document.documentElement.getAttribute("data-static-lang");

  function current() {
    if (STATIC) return STATIC;
    try {
      var value = localStorage.getItem(STORAGE);
      // A stored choice is only honoured where that language is actually
      // offered, otherwise the nav stays French on an English page.
      if ((value === "zh" || value === "fr") && offers(value)) return value;
    } catch (e) {}
    return "en";
  }

  var zh = {
    "Skip to content": "跳到正文",
    "Language": "语言",
    "Home": "首页",
    "About": "关于",
    "Services": "服务",
    "Website Development": "网站开发",
    "Digital Marketing": "数字营销",
    "Social Media Management": "社交媒体管理",
    "Hot": "热门",
    "Projects": "项目",
    "Case Studies": "案例",
    "Industries": "行业",
    "Locations": "地区",
    "Contact Us": "联系我们",
    "Contact": "联系",
    "Free Growth Strategy": "免费增长策略",
    "Limited": "限时",
    "Book a Consultation": "预约咨询",
    "Open menu": "打开菜单",
    "Close menu": "关闭菜单",
    "New highlight in menu": "菜单里有新内容",
    "Free 30-minute consultation": "免费 30 分钟咨询",
    "Free, no obligation": "免费，无任何义务",
    "Book": "预约",
    "Meet": "见面",
    "Plan": "计划",
    "Next steps": "下一步",
    "Your factory builds": "您的工厂负责制造",
    "great": "出色的",
    "products.": "产品。",
    "We build your global presence — websites, search, and campaigns so buyers can find, trust, and contact you.": "我们打造您的全球形象——网站、搜索和推广，让买家能够找到您、信任您并联系您。",
    "Book a strategy call": "预约策略沟通",
    "See our work": "查看我们的作品",
    "Client logos": "客户标志",
    "Hurfi track record": "Hurfi 成绩",
    "Projects completed": "已完成项目",
    "Years of experience": "年行业经验",
    "Websites built": "已建网站",
    "Client rating": "客户评分",
    "Review platforms": "评价平台",
    "Modern Chinese factory campus with precision machinery and shipping containers": "现代化中国工厂园区、精密设备和集装箱",
    "Hurfi work reel": "Hurfi 作品短片",
    "Hurfi client reel": "Hurfi 客户短片",
    "Clarity": "清晰",
    "A clearer look at the work.": "更清楚地看看这些作品。",
    "The same standard, shown in motion.": "同样的标准，用画面呈现。",
    "A manufacturer site, built to be understood quickly.": "一个让买家快速看懂的工厂网站。",
    "Search and content, shown as part of the same system.": "搜索和内容，作为同一套系统呈现。",
    "A clear path from a visit to an inquiry.": "从访问到询盘，有一条清楚的路径。",
    "Hurfi clarity reel": "Hurfi 清晰短片",
    "Let's build something meaningful": "一起做有意义的事",
    "Your Business Deserves": "您的企业值得",
    "What's Next.": "下一步。",
    "From digital visibility to meaningful B2B opportunities, let's explore how Hurfi can support your next stage of growth.": "从数字可见度到有意义的 B2B 机会，我们一起看看 Hurfi 如何支持您的下一阶段增长。",
    "Direct strategic consultation": "直接的策略咨询",
    "Manufacturing-focused business insights": "面向制造业的商业洞察",
    "Practical direction for your next opportunity": "为下一个机会给出可执行的方向",
    "Yasir Arafat, Head of Strategy and Consulting at Hurfi": "Yasir Arafat，Hurfi 策略与咨询负责人",
    "Head of Strategy & Consulting, Hurfi": "Hurfi 策略与咨询负责人",
    "Let's discuss your goals and build a clear path forward.": "我们谈谈您的目标，并理出一条清楚的路。",
    "Connect with Yasir on WeChat": "在微信上联系 Yasir",
    "Shahruk Karim Simanto, China Client Relations Coordinator at Hurfi": "Shahruk Karim Simanto，Hurfi 中国客户关系协调人",
    "China Client Relations Coordinator": "中国客户关系协调人",
    "China contact:": "中国联系方式：",
    "Connect on WeChat": "在微信上联系",
    "Connect with Shahruk on WeChat": "在微信上联系 Shahruk",
    "Maruf, Hurfi team": "Maruf，Hurfi 团队",
    "Afrid, Hurfi team": "Afrid，Hurfi 团队",
    "Sadman, Hurfi team": "Sadman，Hurfi 团队",
    "Shawon, Hurfi team": "Shawon，Hurfi 团队",
    "Siam, Hurfi team": "Siam，Hurfi 团队",
    "The people behind Hurfi.": "Hurfi 背后的人。",
    "One brief, handled by a team of 17+, from websites and search to campaigns and content that turn visibility into inquiries.": "同一份需求，由 17+ 人的团队完成，从网站和搜索到投放与内容，把曝光变成询盘。",
    "Tell Us About Your Project": "告诉我们您的项目",
    "Share your requirements and let's explore the possibilities together.": "说说您的需求，我们一起看看可以怎么做。",
    "Full Name": "姓名",
    "Your full name": "您的姓名",
    "Business Email": "商务邮箱",
    "you@company.com": "you@company.com",
    "WhatsApp Number": "WhatsApp 号码",
    "WeChat ID": "微信号",
    "Your WeChat ID": "您的微信号",
    "Company / Brand Name": "公司 / 品牌名称",
    "Your company name": "您的公司名称",
    "Service Interested In": "感兴趣的服务",
    "Select a service": "选择一项服务",
    "Business consulting": "商务咨询",
    "Other / Not sure": "其他 / 还不确定",
    "Project Budget": "项目预算",
    "Under $1,000": "1,000 美元以下",
    "Not Sure Yet": "还不确定",
    "Project Details": "项目详情",
    "Tell us about your business, your goals, and what you need help with...": "说说您的业务、目标和需要什么帮助……",
    "Preferred Contact Method": "首选联系方式",
    "Enter your full name.": "请填写姓名。",
    "Enter a valid business email.": "请填写有效的商务邮箱。",
    "Choose a service.": "请选择一项服务。",
    "Tell us about the project.": "请介绍一下项目。",
    "We could not confirm this inquiry was received. Email yasir@hurfi.com and try again.": "我们未能确认已收到咨询。请发邮件到 yasir@hurfi.com，或再试一次。",
    "Send Your Inquiry": "发送咨询",
    "Sending…": "正在发送……",
    "Inquiry received": "咨询已收到",
    "Hurfi has your project details and will follow up.": "Hurfi 已收到您的项目信息，会尽快跟进。",
    "WeChat QR code for Yasir Arafat": "Yasir Arafat 的微信二维码",
    "Scan using WeChat to connect directly.": "用微信扫码，直接联系。",
    "Connect with Shahruk Karim Simanto": "联系 Shahruk Karim Simanto",
    "China Client Relations": "中国客户关系",
    "WeChat QR code for Shahruk Karim Simanto": "Shahruk Karim Simanto 的微信二维码",
    "Scan this QR code using WeChat.": "请用微信扫描这个二维码。",
    "Close": "关闭",
    "Four services, built as one system for Chinese manufacturers. Not a generic agency menu.": "四项服务，组合成一套面向中国制造商的系统，而不是一份普通的代理菜单。",
    "Real sites. Real search. Campaigns buyers can act on.": "真实网站。真实搜索。买家可以采取行动的推广。",
    "Website": "网站",
    "Marketing": "营销",
    "Social": "社交",
    "How Hurfi drives growth": "Hurfi 如何推动增长",
    "From search visibility to": "从搜索可见度到",
    "real": "真正的",
    "B2B inquiries.": "B2B 询盘。",
    "We build search-friendly websites, improve your visibility on Google, and turn interested visitors into valuable business opportunities.": "我们搭建适合搜索的网站，提升您在 Google 上的可见度，并把有意向的访客变成有价值的商业机会。",
    "Optimize": "优化",
    "Built for Search Engines. Designed for Buyers.": "为搜索引擎而建，为买家而设计。",
    "We create fast, SEO-optimized B2B websites that showcase your manufacturing capabilities and build buyer confidence.": "我们制作快速、经过 SEO 优化的 B2B 网站，展示您的制造能力，并建立买家信心。",
    "Rank": "排名",
    "Get Found by Global Buyers.": "让全球买家找到您。",
    "Through strategic SEO and targeted search campaigns, we help your business appear where potential buyers are actively searching.": "通过有策略的 SEO 和定向搜索推广，我们让您的企业出现在潜在买家正在搜索的地方。",
    "Convert": "转化",
    "Turn Visibility Into Opportunities.": "把可见度变成机会。",
    "We create clear conversion pathways that encourage potential buyers to request quotes, make inquiries, and connect with your business.": "我们设计清晰的转化路径，鼓励潜在买家询价、咨询并与您联系。",
    "More visibility. More trust. More opportunities.": "更多可见度。更多信任。更多机会。",
    "Start Growing With Hurfi": "与 Hurfi 一起增长",
    "Our services": "我们的服务",
    "Built to get you found, trusted, and contacted.": "让您被找到、被信任、被联系。",
    "We help manufacturers grow through websites, SEO, campaigns, and content that turn visibility into inquiries.": "我们通过网站、SEO、推广和内容，帮助制造商把可见度变成询盘。",
    "Service 01": "服务 01",
    "Service 02": "服务 02",
    "Service 03": "服务 03",
    "Service 04": "服务 04",
    "B2B Website": "B2B 网站",
    "We create high-converting B2B websites that clearly present your products, capabilities, and trust signals so international buyers can understand your value quickly.": "我们制作高转化的 B2B 网站，清楚展示产品、能力和信任信息，让国际买家很快看懂您的价值。",
    "Conversion-focused structure": "以转化为中心的结构",
    "Trust-building pages": "建立信任的页面",
    "Mobile responsive": "适配手机",
    "We make your business search-friendly so buyers can find you on Google when they search for products, suppliers, or manufacturing solutions.": "我们让您的企业更适合搜索，买家在 Google 上查找产品、供应商或制造方案时能够找到您。",
    "Technical SEO": "技术 SEO",
    "On-page optimization": "页面优化",
    "Search visibility growth": "搜索可见度增长",
    "We run focused campaigns that bring the right traffic to your business and turn attention into serious business opportunities.": "我们做有针对性的推广，把合适的流量带到您的企业，并把关注变成认真的商业机会。",
    "Campaign strategy": "推广策略",
    "Lead generation": "获客",
    "Performance tracking": "效果跟踪",
    "Social & Content": "社交与内容",
    "We strengthen your brand presence with strategic content and social communication that builds authority and keeps your business visible.": "我们用有策略的内容和社交沟通加强品牌存在感，建立专业度，并让企业持续被看见。",
    "Brand content": "品牌内容",
    "Social presence": "社交存在感",
    "Audience trust": "受众信任",
    "Growth process": "增长流程",
    "How Hurfi grows a B2B company": "Hurfi 如何让一家 B2B 公司增长",
    "We help B2B manufacturers grow through a connected system: build a strong website, improve search visibility, attract the right audience, and convert them into inquiries.": "我们用一套连贯的系统帮助 B2B 制造商增长：做好网站，提升搜索可见度，吸引合适的受众，并把他们变成询盘。",
    "Build": "建设",
    "Book a Strategy Call": "预约策略沟通",
    "The Hurfi growth ecosystem": "Hurfi 增长生态",
    "From Invisible to": "从默默无闻到",
    "Industry\u2011Leading.": "行业领先。",
    "We transform manufacturing expertise into digital visibility, meaningful connections, and measurable business growth.": "我们把制造专长变成数字可见度、有意义的连接，以及可以衡量的业务增长。",
    "Hurfi Growth Engine": "Hurfi 增长引擎",
    "Discover": "发现",
    "Understand your industry, uncover market opportunities, and identify the audiences that matter.": "理解您的行业，发现市场机会，并找出真正重要的受众。",
    "Market Insights": "市场洞察",
    "Audience Discovery": "受众发现",
    "Competitor Analysis": "竞争对手分析",
    "Position": "定位",
    "Build a credible digital presence that clearly communicates your manufacturing strengths.": "建立可信的数字形象，清楚传达您的制造优势。",
    "Brand Positioning": "品牌定位",
    "Digital Presence": "数字形象",
    "Content Strategy": "内容策略",
    "Connect": "连接",
    "Make your business easier to discover and create opportunities to reach relevant B2B audiences.": "让企业更容易被发现，并创造接触相关 B2B 受众的机会。",
    "B2B Visibility": "B2B 可见度",
    "Industry Connections": "行业连接",
    "Lead Opportunities": "询盘机会",
    "Grow": "增长",
    "Turn digital attention into actionable insights, stronger relationships, and long-term growth opportunities.": "把数字关注变成可执行的洞察、更稳固的关系，以及长期增长机会。",
    "Performance Insights": "效果洞察",
    "Growth Strategy": "增长策略",
    "Continuous Optimisation": "持续优化",
    "Explore the Hurfi Advantage": "了解 Hurfi 的优势",
    "Why Hurfi?": "为什么选择 Hurfi？",
    "Traditional Marketing?": "传统营销？",
    "Think": "要",
    "Beyond": "超越",
    "the Ordinary.": "常规。",
    "Discover a more focused approach to digital visibility and growth for manufacturing businesses.": "为制造企业发现一种更聚焦的数字可见度与增长方式。",
    "Swipe sideways to compare every column.": "左右滑动，查看每一列。",
    "Indicative comparison. On a small screen, swipe sideways to see every column.": "示意对比。小屏幕上请左右滑动查看每一列。",
    "This comparison is indicative. Actual capabilities depend on the service provider and the engagement.": "此对比仅供参考。实际能力取决于服务方和合作方式。",
    "Build your manufacturing growth strategy": "制定您的制造增长策略",
    "Explore how Hurfi can support your business visibility and growth objectives.": "了解 Hurfi 如何支持您的业务可见度和增长目标。",
    "Discover the Hurfi Advantage": "发现 Hurfi 的优势",
    "Platform": "平台",
    "Digital Visibility": "数字曝光",
    "Manufacturing Focus": "制造专注",
    "Flexibility": "灵活性",
    "Scalability": "可扩展性",
    "Cost Efficiency": "成本效率",
    "A manufacturing-focused digital growth partner combining industry understanding, brand visibility, and connected growth strategies.": "专注制造行业的数字增长伙伴，把行业理解、品牌可见度和连贯的增长策略结合在一起。",
    "Traditional Marketing Agencies": "传统营销机构",
    "Broad marketing expertise, with industry specialisation and delivery models varying between providers.": "营销经验广泛，但行业专注和交付方式会因机构而不同。",
    "In-House Marketing Teams": "内部营销团队",
    "Direct brand ownership and internal collaboration, with capabilities dependent on team resources.": "品牌由内部掌握，协作直接，但能力取决于团队资源。",
    "Freelance Specialists": "自由职业专家",
    "Flexible specialist support for individual marketing tasks and defined projects.": "为单项营销任务和明确项目提供灵活的专业支持。",
    "DIY Marketing Tools": "自助营销工具",
    "Self-managed solutions for businesses that prefer to handle their digital presence internally.": "适合希望自己管理数字形象的企业的自助方案。",
    "Strong fit": "很匹配",
    "Depends": "视情况",
    "Limited": "有限",
    "Illustrative strong fit. Not a measured score.": "示意：很匹配。不是实测分数。",
    "Depends on the provider and the engagement.": "取决于服务方和合作方式。",
    "Illustrative limited fit. Not a measured score.": "示意：匹配有限。不是实测分数。",
    "Trusted by partners": "合作伙伴的信任",
    "Trusted by people.": "被人信任。",
    "Chosen by brands.": "被品牌选择。",
    "Words from the brands we\u2019ve worked with.": "来自合作品牌的话。",
    "Built through real collaboration and long-term partnerships.": "来自真实合作和长期伙伴关系。",
    "Questions": "问题",
    "Questions factories ask": "工厂常问的问题",
    "Open a question. The answer shows here, and the others close.": "点开一个问题，答案会显示在这里，其他问题会收起。",
    "Is the consultation free?": "咨询免费吗？",
    "Yes. You get a clear review of your digital presence and the next steps.": "是的。您会得到一份清楚的数字形象评估和下一步建议。",
    "What does Hurfi actually do?": "Hurfi 具体做什么？",
    "Buyer-ready websites, international SEO, digital campaigns, and social for Chinese manufacturers, suppliers, and exporters.": "为中国制造商、供应商和出口商制作面向买家的网站，并做国际 SEO、数字推广和社交媒体。",
    "Why do strong factories still miss international leads?": "实力强的工厂为什么仍然缺少国际询盘？",
    "Capability does not create visibility. Buyers have to find you, understand the factory, and see a clear way to inquire.": "生产能力本身不会带来可见度。买家必须先找到您、看懂工厂，并看到清楚的询盘方式。",
    "Do you work with suppliers and exporters?": "你们也服务供应商和出口商吗？",
    "Yes. The work is built around how global B2B buyers evaluate a Chinese supplier, not a generic local shop.": "是的。工作围绕全球 B2B 买家如何评估中国供应商，而不是一家普通的本地店铺。",
    "How is this different from a general agency?": "这和普通代理有什么不同？",
    "Hurfi stays on manufacturer positioning, search, and the path from a visit to an inquiry. Not one-off creative.": "Hurfi 专注制造商定位、搜索，以及从访问到询盘的路径。不是一次性的创意项目。",
    "Hurfi — B2B Growth & Digital Presence Partner for Chinese companies.": "Hurfi — 面向中国企业的 B2B 增长与数字形象伙伴。",
    "Sitemap": "网站地图",
    "Navigation": "导航",
    "Socials": "社交",
    "Footer": "页脚",
    "Bangladesh": "孟加拉国",
    "China": "中国",
    "Xi'an": "西安",
    "Bogura": "博格拉",
    "Colony Chokforid Road, Bogura, Bangladesh": "Colony Chokforid Road, Bogura, 孟加拉国",
    "Haitianyuan 3, Chang'an Campus, Northwestern Polytechnical University, Xi'an, Shaanxi": "海天苑三，西北工业大学长安校区，西安，陕西",
    "Legal": "法律",
    "Privacy Policy": "隐私政策",
    "Terms & Conditions": "条款与条件",
    "Refund & Return Policy": "退款与退还政策",
    "How Hurfi handles the information you share.": "Hurfi 如何处理您提供的信息。",
    "Updated 15 October 2026": "更新于 2026年10月15日",
    "Who this covers": "适用范围",
    "Hurfi collects information when you write to us, book a conversation, or send the inquiry form on this site.": "当您写信给我们、预约沟通，或在本网站提交询盘表单时，Hurfi 会收集相关信息。",
    "What we collect": "我们收集的信息",
    "Name.": "姓名。",
    "So we know who to reply to.": "以便我们知道回复谁。",
    "Business email, WhatsApp number, and WeChat ID.": "商务邮箱、WhatsApp 号码和微信号。",
    "So we can reach you the way you prefer. Share a number or WeChat ID only if you want to.": "以便按您希望的方式联系您。号码和微信号只有在您愿意时才需要提供。",
    "Company name, service, budget, and project details.": "公司名称、服务、预算和项目详情。",
    "So we understand the work.": "以便我们了解要做的工作。",
    "Language choice.": "语言选择。",
    "Stored in this browser only, so the site opens in the same language next time.": "只保存在这台浏览器里，下次打开时仍是同一种语言。",
    "Why we collect it": "收集这些信息的原因",
    "We use this information to reply to you, prepare a proposal, and do the work you ask Hurfi to do.": "我们用这些信息回复您、准备方案，并完成您交给 Hurfi 的工作。",
    "Hurfi does not sell personal information.": "Hurfi 不出售个人信息。",
    "Where it is handled": "信息在哪里处理",
    "Hurfi works from Bogura in Bangladesh and Xi'an in China. Information you send may be read by the team in both places.": "Hurfi 在孟加拉国博格拉和中国西安办公。您发送的信息可能由两地的团队阅读。",
    "If you are in China, this notice tells you that your information may leave mainland China so the team in Bangladesh can work on your project.": "如果您在中国，本说明告知您：为了让孟加拉国的团队处理您的项目，您的信息可能会离开中国大陆。",
    "How long we keep it": "保存多久",
    "We keep inquiry and project details while we are working together or still in conversation. When they are no longer needed, we delete them.": "在合作或仍在沟通期间，我们会保留询盘和项目资料。不再需要时，我们会删除。",
    "Your choices": "您的选择",
    "You can ask Hurfi to show you the information we hold, correct it, or delete it. You can also tell us to stop using it.": "您可以要求 Hurfi 向您展示我们保存的信息、更正或删除。您也可以要求我们停止使用。",
    "Email yasir@hurfi.com and we will respond.": "请发邮件至 yasir@hurfi.com，我们会回复。",
    "The terms for using this site and starting work with Hurfi.": "使用本网站以及与 Hurfi 开始合作的条款。",
    "Using the site": "使用本网站",
    "You can browse Hurfi and send an inquiry. Please send accurate information about your business.": "您可以浏览 Hurfi 并发送询盘。请提供准确的业务信息。",
    "Starting a project": "项目如何开始",
    "A project begins when Hurfi and you agree the scope in writing. That written scope is the list of work both sides are counting on.": "当 Hurfi 与您书面确认工作范围时，项目开始。这份书面范围就是双方要完成的工作清单。",
    "What Hurfi does not promise": "Hurfi 不承诺的内容",
    "Hurfi does not promise a specific search ranking, a fixed number of inquiries, or a sales result. The work is the website, search, campaigns, and content described in the scope.": "Hurfi 不承诺特定的搜索排名、固定的询盘数量或销售结果。工作内容是范围内写明的网站、搜索、投放和内容。",
    "Your part": "您需要配合的部分",
    "You provide the materials and feedback the scope needs, in reasonable time. Delays on your side move the schedule.": "您需要在合理时间内提供范围内所需的资料和反馈。您这边的延误会顺延时间。",
    "The finished work": "完成的工作",
    "After the agreed payment, the finished deliverables in the scope are yours to use for your business.": "按约定付款后，范围内已完成的交付物归您用于自己的业务。",
    "Hurfi may show the finished work in its portfolio unless you say in writing that it should stay private.": "除非您书面要求保密，Hurfi 可以在作品集中展示已完成的工作。",
    "If two documents disagree": "两份文件不一致时",
    "If these terms and a written proposal do not match, the written proposal applies to that project.": "如果这些条款与书面方案不一致，以该项目的书面方案为准。",
    "Questions about these terms go to yasir@hurfi.com.": "有关这些条款的问题请发至 yasir@hurfi.com。",
    "When an advance is returned, and when it is not.": "预付款何时退还，何时不退。",
    "Hurfi does return an advance if you are not satisfied with the work.": "如果您对工作不满意，Hurfi 会退还预付款。",
    "Once 60% of the agreed scope is complete, that advance is not returned.": "约定范围完成 60% 之后，该预付款不再退还。",
    "When an advance comes back": "何时退还预付款",
    "If you have paid an advance and you are not satisfied with the work, Hurfi returns that advance, as long as the agreed scope is still under 60% complete.": "如果您已支付预付款并且对工作不满意，只要约定范围仍未完成 60%，Hurfi 会退还该预付款。",
    "When it does not": "何时不退",
    "Once 60% of the agreed scope is complete, that advance is not returned. The work already done stays with you.": "约定范围完成 60% 之后，该预付款不再退还。已经完成的工作仍归您。",
    "The 60% is counted from the work written in the scope. It is not counted from the number of days since the project started.": "这 60% 按书面范围里的工作来计算，不按项目开始后过了多少天来计算。",
    "How to ask": "如何申请",
    "Email yasir@hurfi.com with the project name.": "请把项目名称发到 yasir@hurfi.com。",
    "Hurfi will tell you how much of the scope is complete.": "Hurfi 会告诉您范围完成了多少。",
    "If the work is still under 60%, Hurfi returns the eligible advance by the same method you used to pay.": "如果工作仍未到 60%，Hurfi 会按您原来的付款方式退还符合条件的预付款。",
    "A later written proposal can set a different payment schedule. If it does, that proposal applies to that project.": "之后的书面方案可以另行约定付款安排。如果有，以该方案为准。",
    "Privacy Policy | Hurfi": "隐私政策 | Hurfi",
    "Terms & Conditions | Hurfi": "条款与条件 | Hurfi",
    "Refund & Return Policy | Hurfi": "退款与退还政策 | Hurfi",
    "This page covers visitors to this site and the people who contact Hurfi about a project.": "本页适用于本网站的访客，以及就项目联系 Hurfi 的人。",
    "We collect only what you choose to send, and what this browser stores for the language switch.": "我们只收集您主动发送的内容，以及这台浏览器为语言切换保存的内容。",
    "Your name, so we know who to reply to.": "您的姓名，以便我们知道回复谁。",
    "A business email, and a WhatsApp number or WeChat ID if you choose to share one.": "商务邮箱，以及您愿意提供的 WhatsApp 号码或微信号。",
    "Your company name, the service you are asking about, your budget range, and the project details you write.": "公司名称、您询问的服务、预算范围，以及您写下的项目详情。",
    "Messages you later send by email, WeChat, or WhatsApp about the same project.": "您之后就同一项目通过邮件、微信或 WhatsApp 发送的消息。",
    "What this site does not ask for": "本网站不收集的内容",
    "This site does not ask for an identity number, a bank password, or a card number.": "本网站不要求身份证号、银行密码或银行卡号。",
    "Hurfi does not buy contact lists. The details we hold are the ones you send us.": "Hurfi 不购买联系人名单。我们保存的是您发给我们的信息。",
    "Why we use it": "我们如何使用",
    "We also use it to tell you how much of an agreed scope is complete, if you ask about a payment.": "如果您询问付款，我们也会用它说明约定范围完成了多少。",
    "We do not use your details to send unrelated promotions.": "我们不会用您的信息发送无关的推广。",
    "Where the team reads it": "团队在哪里阅读",
    "The host of this website receives the form so the message can reach Hurfi.": "本网站的托管方会收到表单，以便消息能够送达 Hurfi。",
    "After that, only the people at Hurfi who are replying to you or doing the project read it.": "之后，只有正在回复您或执行该项目的 Hurfi 成员会阅读它。",
    "A project file can stay while you are still a client, or while Hurfi needs it to answer a question about that project.": "在您仍是客户期间，或 Hurfi 仍需用它回答该项目的问题时，项目资料可以保留。",
    "If you are in China, you can also ask for an explanation of these rules, and you can withdraw a choice you made earlier.": "如果您在中国，您也可以要求解释这些规则，并撤回先前作出的选择。",
    "Asking us to delete a project file does not cancel a written scope. The project terms stay in that document.": "要求删除项目资料并不会取消书面范围。项目条款仍以该文件为准。",
    "If this page changes": "如果本页有变更",
    "When this page changes, the date at the top changes with it.": "本页变更时，顶部的日期会一起更新。",
    "The rules for a project already agreed in writing stay the ones in that written proposal.": "已经书面约定的项目，仍以那份书面方案中的规则为准。",
    "Do not send content you do not have the right to share.": "请不要发送您无权分享的内容。",
    "An inquiry is not a project yet": "询盘还不是项目",
    "Sending the form, a WeChat message, or an email does not start the work.": "提交表单、发送微信或邮件，并不代表工作已经开始。",
    "Hurfi will reply with questions or a proposal. Nothing is booked until both sides agree the next step in writing.": "Hurfi 会回复问题或方案。双方书面确认下一步之前，没有任何工作被预定。",
    "The written scope": "书面范围",
    "The list can include a website, search, campaigns, content, or consulting. Only the items written down are part of the project.": "清单可以包括网站、搜索、投放、内容或咨询。只有写下来的项目才属于该项目。",
    "Changes to the scope": "范围变更",
    "If you want work that is not on that list, Hurfi and you agree the extra work in writing before it starts.": "如果您想做清单以外的工作，Hurfi 与您会在开始前书面确认这部分额外工作。",
    "A change can also change the time and the payment. The new writing replaces the old list for the items it names.": "变更也可以改变时间和付款。新的书面内容会替换它所写明的旧清单项目。",
    "Payment": "付款",
    "Hurfi tells you the payment in the written proposal.": "Hurfi 在书面方案中说明付款。",
    "An advance, when there is one, follows the Refund & Return Policy unless a later written proposal says otherwise.": "如有预付款，按退款与退还政策处理，除非之后的书面方案另有约定。",
    "Screenshots, examples, and past projects on this site show earlier work. They are not a promise that your project will look the same or produce the same result.": "本网站上的截图、示例和过往项目展示的是以前的工作。它们并不承诺您的项目会看起来一样，或产生同样的结果。",
    "You make sure Hurfi may use the logos, photos, product facts, and accounts you share.": "您需确保 Hurfi 可以使用您分享的标志、照片、产品资料和账户。",
    "If the scope needs access to a domain, a site, or an ad account, you provide that access or name a person who can.": "如果范围需要域名、网站或广告账户的权限，您提供该权限，或指定可以提供的人。",
    "Hurfi keeps the right to reuse its own methods, layouts that were not made only for you, and general know-how.": "Hurfi 保留重复使用自己的方法、并非专为您制作的版式，以及一般经验的权利。",
    "Stopping early": "提前停止",
    "You can ask to stop. Hurfi will say how much of the written scope is already complete.": "您可以要求停止。Hurfi 会说明书面范围已经完成了多少。",
    "If that share is still under 60%, the advance follows the Refund & Return Policy.": "如果该比例仍低于 60%，预付款按退款与退还政策处理。",
    "Once 60% of the agreed scope is complete, the advance is not returned, and the work already done stays with you.": "约定范围完成 60% 之后，预付款不再退还，已经完成的工作仍归您。",
    "You can say the direction is wrong, the draft does not match the written scope, or you do not want to continue. While the scope is under 60%, Hurfi returns the advance.": "您可以说方向不对、草稿与书面范围不符，或不想继续。范围未到 60% 时，Hurfi 会退还预付款。",
    "Hurfi does not ask you to send finished work back.": "Hurfi 不会要求您交回已经完成的工作。",
    "How the 60% is counted": "60% 如何计算",
    "Hurfi looks at the written list. The share is how much of that list is done, not how many weeks have passed.": "Hurfi 看的是书面清单。比例是这份清单完成了多少，不是过了多少周。",
    "Hurfi writes down that share when you ask. The return decision uses that note.": "您询问时，Hurfi 会书面记下这个比例。退还决定以这份记录为准。",
    "Say what you are not satisfied with, and the name used on the proposal.": "请说明您不满意的地方，以及方案上使用的名称。",
    "Hurfi confirms the percentage before the return is sent.": "退还发出之前，Hurfi 会先确认这个百分比。",
    "If a later proposal says otherwise": "如果之后的方案另有约定",
    "This page is the rule when the proposal does not set a different one.": "方案没有另行约定时，以本页规则为准。",
    "What this policy is not": "本政策不包括的情况",
    "This policy does not refund a result the scope never promised, such as a search ranking, a fixed number of inquiries, or a sales total.": "本政策不退还范围从未承诺的结果，例如搜索排名、固定询盘数量或销售总额。",
    "Work that was never in the written scope is a new agreement. It is not a reason to return an advance on the original list.": "从未写入书面范围的工作是一份新约定。它不是退还原清单预付款的理由。",
    "The team": "团队",
    "Who leads the work": "谁负责这些工作",
    "Head of Strategy & Consulting": "策略与咨询负责人",
    "Head of Digital Marketing": "数字营销负责人",
    "Creative Director": "创意总监",
    "Head of SEO & Organic Growth": "SEO 与自然增长负责人",
    "Lead Software Developer": "首席软件开发",
    "Head of AI & Innovation": "AI 与创新负责人",
    "Department Teams": "部门团队",
    "Designers": "设计师",
    "Marketers": "营销",
    "Developers": "开发",
    "SEO Specialists": "SEO 专员",
    "AI & Technical Support": "AI 与技术支持",
    "Find Hurfi": "找到 Hurfi",
    "Offices, WeChat, and social.": "办公室、微信和社交。",
    "Studio": "工作室",
    "A factory-side team.": "站在工厂这边的团队。",
    "From Bogura and Xi'an, Hurfi turns a manufacturer's capability into a site, a search presence, and a clear way for a buyer to write.": "Hurfi 在博格拉和西安，把制造商的能力做成网站、搜索形象，以及买家可以写信联系的清楚路径。",
    "Sets the brief, the scope, and the direction before the work starts.": "工作开始前，先定下需求、范围和方向。",
    "Plans the campaigns that put the factory in front of buyers.": "规划让工厂出现在买家面前的投放。",
    "Directs the look of the site, the posts, and the brand.": "负责网站、帖子和品牌的视觉方向。",
    "Builds the search path so buyers can find the factory.": "建立搜索路径，让买家能找到工厂。",
    "Leads the websites and the software behind them.": "负责网站以及背后的软件。",
    "Brings AI and new technical ideas into the work.": "把 AI 和新的技术想法放进工作里。",
    "The China-side contact for clients, on WeChat and by phone.": "客户在中国这边的联系人，可通过微信和电话。",
    "From the feed": "来自内容",
    "Posts we put in public.": "我们公开发布的帖子。",
    "Previous posts": "上一组帖子",
    "Next posts": "下一组帖子",
    "Hurfi post about buyers finding a factory": "Hurfi 帖子：买家找到工厂",
    "Hurfi post about entering the global market": "Hurfi 帖子：进入全球市场",
    "Hurfi post about a factory the world can find": "Hurfi 帖子：让世界找到工厂",
    "Hurfi post about building a global brand": "Hurfi 帖子：建立全球品牌",
    "Hurfi post about who we are": "Hurfi 帖子：我们是谁",
    "Hurfi post about visibility": "Hurfi 帖子：可见度",
    "Hurfi post": "Hurfi 帖子",
    "Hurfi campaign post": "Hurfi 推广帖",
    "Email": "邮箱",
    "B2B Website Design": "B2B 网站设计",
    "Corporate Websites for Chinese companies": "面向中国企业的企业网站",
    "Product Showcase Websites": "产品展示网站",
    "Landing Pages": "落地页",
    "Conversion Optimization": "转化优化",
    "On-page SEO": "页面 SEO",
    "Local SEO": "本地 SEO",
    "International SEO": "国际 SEO",
    "Industry-based SEO for Chinese B2B markets": "面向中国 B2B 市场的行业 SEO",
    "Search Marketing": "搜索营销",
    "Paid Advertising": "付费广告",
    "Lead Generation for Chinese manufacturers & suppliers": "为中国制造商和供应商获客",
    "Content Planning": "内容规划",
    "Industry Content Creation for Chinese B2B markets": "面向中国 B2B 市场的行业内容",
    "Brand Storytelling": "品牌叙事",
    "LinkedIn Management": "LinkedIn 运营",
    "Social Media Growth": "社交媒体增长",
    "All rights reserved.": "版权所有。",
    "Back to top": "回到顶部",
    "WhatsApp": "WhatsApp",
    "Instagram": "Instagram",
    "LinkedIn": "LinkedIn",
    "About Hurfi": "关于 Hurfi",
    "Hurfi is a B2B Growth & Digital Presence Partner helping Chinese manufacturers, suppliers, and B2B companies build trusted global brands online.": "Hurfi 是 B2B 增长与数字形象伙伴，帮助中国制造商、供应商和 B2B 企业在线上建立可信的全球品牌。",
    "Who We Are": "我们是谁",
    "Hurfi is a digital growth partner helping Chinese B2B businesses create strong online identities through websites, SEO, digital marketing, and social media management.": "Hurfi 是数字增长伙伴，通过网站、SEO、数字营销和社交媒体管理，帮助中国 B2B 企业建立清晰的线上身份。",
    "Our Mission": "我们的使命",
    "Helping great products from Chinese manufacturers and suppliers become recognized global brands.": "帮助中国制造商和供应商的好产品成为被认可的全球品牌。",
    "Who We Help": "我们帮助谁",
    "Chinese Manufacturers": "中国制造商",
    "Chinese Suppliers": "中国供应商",
    "Chinese Exporters": "中国出口商",
    "Chinese B2B Companies": "中国 B2B 企业",
    "Why Choose Hurfi": "为什么选择 Hurfi",
    "B2B & Chinese industry understanding": "理解 B2B 与中国产业",
    "Strategic approach (not one-off campaigns)": "策略方法（不是一次性活动）",
    "Long-term partnership mindset": "长期合作的心态",
    "Global market focus for Chinese companies": "为中国企业聚焦全球市场",
    "End-to-end digital growth services designed for Chinese manufacturers, suppliers, and B2B companies that want global visibility and trust.": "面向希望获得全球可见度和信任的中国制造商、供应商和 B2B 企业的全流程数字增长服务。",
    "B2B websites, corporate sites, product showcases, landing pages, and conversion optimization for Chinese companies.": "为中国企业制作 B2B 网站、企业站、产品展示、落地页，并优化转化。",
    "Technical, on-page, local, international, and industry SEO for Chinese manufacturers and suppliers.": "为中国制造商和供应商做技术、页面、本地、国际和行业 SEO。",
    "Search marketing, content strategy, paid ads, and lead generation for Chinese B2B brands.": "为中国 B2B 品牌做搜索营销、内容策略、付费广告和获客。",
    "Content planning, brand storytelling, LinkedIn, and social growth for Chinese companies.": "为中国企业做内容规划、品牌叙事、LinkedIn 和社交增长。",
    "Professional B2B websites that help Chinese manufacturers and suppliers showcase products, capabilities, and build buyer trust.": "专业的 B2B 网站，帮助中国制造商和供应商展示产品与能力，并建立买家信任。",
    "What We Build": "我们做什么",
    "Search visibility strategies that help Chinese manufacturers, suppliers, and exporters get found by global buyers.": "帮助中国制造商、供应商和出口商被全球买家找到的搜索可见度策略。",
    "SEO Focus Areas": "SEO 重点",
    "Campaigns that help Chinese B2B companies build awareness, attract buyers, and create real business opportunities.": "帮助中国 B2B 企业建立认知、吸引买家并创造真实商业机会的推广。",
    "What We Offer": "我们提供什么",
    "Strategic social presence for Chinese manufacturers, suppliers, and B2B brands — content that builds trust and visibility.": "为中国制造商、供应商和 B2B 品牌做有策略的社交形象——用内容建立信任和可见度。",
    "Highlighted Capabilities": "重点能力",
    "Work created for Chinese manufacturers, suppliers, and B2B companies — websites, SEO, marketing, and social presence.": "为中国制造商、供应商和 B2B 企业完成的工作——网站、SEO、营销和社交形象。",
    "Project Categories (Coming Soon)": "项目分类（即将推出）",
    "Business-impact stories: how Hurfi helps Chinese manufacturers, suppliers, and exporters grow with website + SEO + social media.": "业务影响故事：Hurfi 如何用网站、SEO 和社交媒体帮助中国制造商、供应商和出口商增长。",
    "Case Study Structure (Ready for Content)": "案例结构（内容待补充）",
    "Hurfi focuses on Chinese B2B markets — manufacturers, suppliers, and exporters who need global digital presence.": "Hurfi 专注中国 B2B 市场——需要全球数字形象的制造商、供应商和出口商。",
    "Industries We Serve": "我们服务的行业",
    "GEO pages for Chinese manufacturers and suppliers — start with China, expand to city and regional markets later.": "面向中国制造商和供应商的地区页面——先从中国开始，之后扩展到城市和区域市场。",
    "Digital Presence Partner for Chinese Manufacturers in China": "面向中国制造商的数字形象伙伴",
    "Hurfi helps Chinese manufacturers, suppliers, and exporters in China become more visible, trusted, and scalable in global markets.": "Hurfi 帮助中国的制造商、供应商和出口商在全球市场中更可见、更可信、更能扩展。",
    "Who This Page Is For": "这个页面给谁看",
    "Talk to Hurfi about growing your Chinese manufacturing, supplier, or B2B brand online.": "和 Hurfi 谈谈如何让您的中国制造、供应或 B2B 品牌在线上增长。",
    "Business Inquiry": "商务咨询",
    "Email:": "邮箱：",
    "WhatsApp number can be added here later.": "WhatsApp 号码之后可以加在这里。",
    "Name": "姓名",
    "Company Name": "公司名称",
    "Industry": "行业",
    "e.g. Chinese manufacturing": "例如：中国制造",
    "Message": "留言",
    "Send Inquiry": "发送咨询",
    "Don\u2019t fill this out:": "请不要填写：",
    "Book a Consultation": "预约咨询",
    "Strategy call for Chinese manufacturers, suppliers, and B2B companies — free, with no obligation.": "面向中国制造商、供应商和 B2B 企业的策略沟通——免费，无任何义务。",
    "Request Free Consultation": "申请免费咨询",
    "e.g. Reach global buyers, improve SEO, rebuild website": "例如：接触全球买家、改善 SEO、重建网站",
    "e.g. Weekday mornings (CST)": "例如：工作日上午（北京时间）",
    "Thank you": "谢谢",
    "Your message was received. Hurfi will follow up soon about growing your Chinese B2B digital presence.": "我们已收到您的消息。Hurfi 会尽快跟进您的中国 B2B 数字形象增长。",
    "404 — Page not found": "404 — 找不到页面",
    "That URL doesn\u2019t exist. Explore Hurfi services for Chinese manufacturers and suppliers, or book a consultation.": "这个网址不存在。看看 Hurfi 为中国制造商和供应商提供的服务，或预约一次咨询。",
    "Hurfi took the time to understand how we actually work, then shaped the site so buyers could see that clearly.": "Hurfi 先花时间理解我们真正怎么做事，再把网站做成买家一眼就能看懂的样子。",
    "They listened before they designed. The result feels like us, and it is easier for people to understand what we offer.": "他们先听，再设计。结果很像我们自己，别人也更容易看懂我们提供什么。",
    "Straightforward and careful with the details. We always knew what was happening and why.": "直接，而且注意细节。我们始终知道正在发生什么，以及为什么。",
    "Organised without being rigid. The project kept moving, and there was still room for our feedback.": "有条理，但不死板。项目一直在推进，也留有我们反馈的空间。",
    "The pages finally explain the brand in a way that feels natural. Working with Hurfi was calm and clear.": "页面终于用自然的方式讲清了品牌。和 Hurfi 合作的过程平静而清楚。",
    "They paid attention to how customers actually read the site, then made that path simpler.": "他们留意顾客实际怎么读网站，然后把这条路径变简单了。",
    "A thoughtful partner. They explained the choices in plain language and delivered work we were comfortable sharing.": "一个用心的伙伴。他们用白话解释选择，交出的作品我们也愿意拿出去。",
    "Easy to reach, and the pages present the brand the way we hoped from the start.": "容易联系到，页面也按我们从一开始希望的方式呈现品牌。",
    "Clear communication and careful craft. That made the whole engagement easier for our team.": "沟通清楚，手艺仔细。这让整个合作对我们的团队轻松很多。",
    "They treated the project like a partnership. We felt heard, and the finished work is something we are proud to share.": "他们把项目当成合作。我们觉得被听见，成品也是我们愿意分享的东西。",
    "Hurfi made a complicated offer easier to follow. The structure is cleaner, and the tone still sounds like us.": "Hurfi 让一个复杂的服务更容易看懂。结构更干净，语气仍然像我们。",
    "Warm, practical, and on time. The new pages feel closer to how we talk about the product.": "温暖、实用，而且准时。新页面更接近我们平时介绍产品的方式。",
    "Professional without feeling stiff. They kept the message precise and the process easy to follow.": "专业，但不生硬。信息保持精确，过程也容易跟上。",
    "They understood the personality of the brand and kept it intact while making the site clearer.": "他们理解品牌的个性，在让网站更清楚的同时保住了这种个性。",
    "Quiet, careful work. Visitors can now see what we do without hunting through the page.": "安静而仔细的工作。访客现在不用在页面里找，就能看见我们做什么。",
    "Hurfi handled a sensitive brand with restraint. The result is clear, and it still feels private and considered.": "Hurfi 克制地处理了一个敏感品牌。结果清楚，仍然显得私密、被考虑过。",
    "The catalogue is easier to browse, and the writing on the site matches the care we put into the books.": "目录更好浏览，网站上的文字也配得上我们放进书里的用心。",
    "Simple to work with. They asked the right questions and kept the brand looking like itself.": "很好合作。他们问对了问题，也让品牌看起来还是它自己。",
    "Families can find the right information faster. That was the brief, and Hurfi stayed with it.": "家庭可以更快找到正确的信息。这就是要求，Hurfi 一直按这个做。",
    "A clean process and a site that finally matches the standard of the work we do.": "过程干净，网站终于配得上我们工作的标准。",
    "They made a serious service feel approachable. The pages are clearer, and nothing important got lost.": "他们让一项严肃的服务变得容易接近。页面更清楚，重要的东西没有丢。",
    "Thoughtful from the first conversation. The site now explains the partnership in a way clients understand.": "从第一次谈话起就很用心。网站现在用客户能懂的方式解释这种合作。",
    "Steady communication across the project. The finished pages feel international without losing who we are.": "整个项目沟通稳定。完成的页面有国际感，也没有丢掉我们是谁。",
    "Direct, respectful, and precise. The new presence is something we are comfortable standing behind.": "直接、尊重、精确。新的形象是我们愿意站在后面的。",
    "Hurfi presented the range with more clarity. Showrooms and buyers can see the offer without the clutter.": "Hurfi 把产品系列讲得更清楚。展厅和买家不用在杂乱里找。",
    "They kept the energy of the brand and still made the site easy to use. That balance was exactly what we needed.": "他们保住了品牌的能量，也让网站好用。这种平衡正是我们需要的。",
    "The message is tighter, and the pages feel more trustworthy. Hurfi was patient with the details.": "信息更紧，页面也更值得信任。Hurfi 对细节很有耐心。",
    "Customers can see the service faster. The team was practical and easy to talk to.": "顾客能更快看懂服务。团队务实，也容易沟通。",
    "A clear brief, a clear result. The site now explains the product without extra noise.": "需求清楚，结果也清楚。网站现在讲产品，没有多余的噪音。",
    "They respected the visual identity and made the story around it easier to follow.": "他们尊重视觉识别，也让周围的故事更好跟上。",
    "Accurate, calm, and well organised. The site reads the way a professional practice should.": "准确、平静、有条理。网站读起来就像一家专业机构该有的样子。",
    "Short feedback loops and careful execution. The pages feel finished, not rushed.": "反馈很快，执行仔细。页面感觉是完成的，不是赶出来的。",
    "Hurfi kept the brand sharp and made the offer easier for new visitors to grasp.": "Hurfi 让品牌保持锐利，也让新访客更容易抓住我们提供什么。",
    "They handled a complex service with plain language. Clients can now see the next step.": "他们用白话处理了一项复杂服务。客户现在能看见下一步。",
    "Focused and responsive. The new pages say what we do, then get out of the way.": "专注，而且反应快。新页面先说我们做什么，然后不再挡路。",
    "The brand still feels warm, and the site is much easier to move through.": "品牌仍然温暖，网站也好走多了。",
    "A straightforward collaboration. The result looks like us, only clearer.": "一次直来直去的合作。结果看起来像我们，只是更清楚。",
    "They matched the pace of the brand and still kept the details tight. We would work with them again.": "他们跟上了品牌的节奏，细节也仍然紧。我们愿意再合作。",
    "A direct line to the team.": "直接联系团队。",
    "Reach the people who do the work.": "联系实际做事的人。",
    "Use the channel you already have open. The same team reads all of them.": "用你已经打开的渠道就好。同一个团队会看所有这些消息。",
    "Email Yasir": "给 Yasir 发邮件",
    "China desk": "中国联络处",
    "Bangladesh desk": "孟加拉联络处",
    "Write on WeChat or WhatsApp.": "用微信或 WhatsApp 写。",
    "What to include": "写什么",
    "A useful note names the factory, the buyer you want, and whether you need a site, search, campaigns, or content.": "一条有用的留言会写明工厂、你想要的买家，以及你需要的是网站、搜索、推广还是内容。",
    "Website, search, campaigns, content.": "网站、搜索、推广、内容。",
    "Start with the service that matches the problem. The call can cover the rest.": "先从对上问题的那项服务开始。通话可以覆盖其余部分。",
    "How a note is handled": "一条留言怎么处理",
    "It lands with the team.": "它会到团队这里。",
    "Yasir reads strategy notes. Shahruk handles China-side WeChat and phone.": "Yasir 看策略留言。Shahruk 负责中国这边的微信和电话。",
    "You get a reply on the channel you chose.": "你会在你选的渠道上收到回复。",
    "WeChat, WhatsApp, or email. If the note needs a call, we send you to the booking page.": "微信、WhatsApp 或邮箱。如果需要通话，我们会把你带到预约页。",
    "No ticket queue.": "没有工单队列。",
    "A person answers. There is no automated success message until the form is actually received.": "会有人回复。表单真正收到之前，不会出现自动成功提示。",
    "Which number should I call?": "我该打哪个号码？",
    "Use +86 17792239260 for the China desk. The Bogura number is +8801925026696.": "中国联络处请打 +86 17792239260。博格拉的号码是 +8801925026696。",
    "Can I write in Chinese?": "可以用中文写吗？",
    "Yes. Chinese, English, or French. Shahruk is the China-side contact on WeChat and by phone.": "可以。中文、英文或法文都可以。Shahruk 是中国这边的微信和电话联系人。",
    "Is this the same as booking a call?": "这和预约通话是一回事吗？",
    "A message is for a direct note. A strategy call is booked on the consultation page, and it is free.": "留言是直接写一句。策略通话在咨询页预约，而且免费。",
    "Where are the offices?": "办公室在哪里？",
    "Bogura, Bangladesh, and Xi'an, Shaanxi. The maps on this page mark both.": "孟加拉国博格拉，以及陕西西安。本页地图标出了两处。",
    "Book the strategy call.": "预约策略通话。",
    "Thirty minutes on the factory, the buyer, and the next piece of work.": "三十分钟，谈工厂、买家，以及下一块工作。",
    "What the call is for": "这次通话用来做什么",
    "A clear read of the current site and search presence.": "把现有网站和搜索形象看清楚。",
    "We look at what a buyer sees today, not a generic audit checklist.": "我们看买家今天看到什么，而不是一份通用审计清单。",
    "A scope you can act on.": "一份可以动手的范围。",
    "Website, SEO, campaigns, or content — named, not a bundle of everything.": "网站、SEO、推广或内容——点名一项，而不是把所有东西捆在一起。",
    "The right person on the line.": "线上是对的人。",
    "Yasir leads the strategy. Shahruk joins when the conversation is on the China side.": "Yasir 负责策略。谈话在中国这边时，Shahruk 加入。",
    "No pitch deck.": "没有推销幻灯片。",
    "You leave with next steps. If it is not a fit, we say so.": "你离开时带着下一步。如果不合适，我们会直接说。",
    "How the booking works": "预约怎么进行",
    "Send the form. We confirm on WeChat, WhatsApp, or email — whichever you pick.": "提交表单。我们会在微信、WhatsApp 或邮箱上确认——你选哪个就用哪个。",
    "The call is about thirty minutes. Bring the site, if you have one, and the buyer you want.": "通话大约三十分钟。如果有网站就带上，也带上你想要的买家。",
    "You get a written direction: what to build, what to fix, and what can wait.": "你会得到一份书面方向：做什么、改什么、什么可以等。",
    "Who you will meet": "你会见到谁",
    "What should I prepare?": "我该准备什么？",
    "Your site address, the product you want buyers to find, and the market you sell into. A rough budget helps, and Not Sure Yet is a real answer.": "你的网站地址、你希望买家找到的产品，以及你销售的市场。大概的预算有帮助，选“还不确定”也是一个真实的答案。",
    "Do I have to be in China?": "我必须人在中国吗？",
    "No. The call is remote. The China desk is in Xi'an if you want WeChat or the +86 number.": "不必。通话是远程的。如果你要用微信或 +86 号码，中国联络处在西安。",
    "What happens after I send the form?": "我提交表单之后会发生什么？",
    "We only show a success message after the form is received. If this page cannot confirm it, email yasir@hurfi.com.": "只有表单真正收到后，才会显示成功提示。如果这个页面无法确认，请发邮件到 yasir@hurfi.com。",
    "The team sits in two places.": "团队在两个地方。",
    "The call is remote. These are the desks behind it.": "通话是远程的。这两处是通话背后的办公室。",
    "Thirty minutes": "三十分钟",
    "Yasir is on WeChat for the strategy conversation. WhatsApp and email reach the same team.": "策略沟通可以在微信上找 Yasir。WhatsApp 和邮箱会到同一个团队。",
    "Proof from the work.": "工作里的证明。",
    "Screenshots of sites, search, and campaigns. What you see is a report from the work, not a promise for a new project.": "网站、搜索和推广的截图。你看到的是已完成工作的报告，不是对新项目的承诺。",
    "Delivered website": "已交付的网站",
    "Search performance": "搜索表现",
    "Site health": "网站健康",
    "Campaign reporting": "推广报告",
    "Messages and inquiries": "消息和询盘",
    "Local profile": "本地资料",
    "How this work runs": "这项工作怎么进行",
    "Other services": "其他服务",
    "All Services": "全部服务",
    "A buyer can see the product and the factory without a long hunt.": "买家不用找很久，就能看见产品和工厂。",
    "The company, the capability, and the people, on one site.": "公司、能力和团队，放在一个网站上。",
    "Products laid out so a buyer can compare and inquire.": "产品摆清楚，买家可以比较并询盘。",
    "One offer, one page, one way to write.": "一个方案，一个页面，一种联系方式。",
    "The path from a visit to a message is the thing we tighten.": "我们收紧的是从访问到留言的那条路。",
    "Map the buyer path.": "先画出买家的路径。",
    "The pages show the product, the factory, and a clear way to inquire.": "页面展示产品、工厂，以及清楚的询盘方式。",
    "Build the pages.": "把页面做出来。",
    "Product, trust, and inquiry pages that work on a phone.": "产品、信任和询盘页面，在手机上也能用。",
    "Check the build.": "检查做好的网站。",
    "Speed, health, and the path from a visit to a message.": "速度、健康度，以及从访问到留言的路径。",
    "What do you build?": "你们做什么网站？",
    "B2B sites, corporate sites, product showcases, landing pages, and conversion work for Chinese manufacturers and suppliers.": "为中国制造商和供应商做 B2B 网站、企业站、产品展示、落地页和转化。",
    "Will buyers be able to inquire?": "买家能询盘吗？",
    "Yes. The structure is built so a visit can become a message.": "能。结构就是为了让一次访问变成一条留言。",
    "Do you fix the technical side?": "技术方面也修吗？",
    "Yes. Site health and the pages a buyer opens are part of the build.": "修。网站健康度，以及买家会打开的页面，都是制作的一部分。",
    "The site can be crawled, and the health report stays visible.": "网站可以被抓取，健康报告也一直能看见。",
    "Pages say what the factory makes, in the words buyers search.": "页面用买家搜索的词，说清工厂做什么。",
    "The factory can be found in the places it actually serves.": "工厂能在它真正服务的地方被找到。",
    "Search for the markets outside the home country.": "为本土以外的市场做搜索。",
    "The work follows how a buyer in that industry searches.": "工作跟着那个行业的买家怎么搜索。",
    "Read the current search.": "先看现在的搜索。",
    "We look at how buyers find the factory today, in Google and in AI answers.": "我们看买家今天怎么找到工厂，包括 Google 和 AI 回答。",
    "Fix what blocks a visit.": "修掉挡住访问的东西。",
    "Technical issues, page content, and the markets the factory sells into.": "技术问题、页面内容，以及工厂销售的市场。",
    "Show the report.": "把报告摆出来。",
    "Clicks, impressions, and site health stay visible. We do not replace them with a slogan.": "点击、展示和网站健康度都留在眼前。我们不用一句口号换掉它们。",
    "Which search work is included?": "搜索工作包括什么？",
    "Technical SEO, on-page SEO, local SEO, international SEO, and industry SEO for Chinese B2B markets.": "技术 SEO、页面 SEO、本地 SEO、国际 SEO，以及面向中国 B2B 市场的行业 SEO。",
    "How is SEO different from a new website?": "SEO 和新网站有什么不同？",
    "A site is where buyers land. SEO is how they find it. Many factories need both.": "网站是买家落地的地方。SEO 是他们找到它的方式。很多工厂两样都需要。",
    "Do you invent traffic numbers?": "你们会编流量数字吗？",
    "No. The screenshots are reports. A new engagement starts from the site you have.": "不会。截图是报告。新的合作从你现有的网站开始。",
    "Buyers who are already looking.": "已经在找的买家。",
    "Pages and posts that explain the factory before the ad does.": "在广告之前，用页面和内容把工厂讲清楚。",
    "Campaigns aimed at inquiries, calls, and profile actions.": "推广对准询盘、来电和资料上的操作。",
    "The report shows messages and purchases, not only reach.": "报告展示消息和购买，不只是触达。",
    "Set the campaign.": "先定推广。",
    "Search, content, and paid work aimed at the buyer the factory wants.": "搜索、内容和付费，对准工厂想要的买家。",
    "Send it to the right people.": "把它送到对的人那里。",
    "The point is inquiries, calls, and profile actions, not traffic for its own sake.": "重点是询盘、来电和资料操作，不是为了流量而流量。",
    "Read the report.": "看报告。",
    "Campaigns, messages, and purchases are shown as they are.": "推广、消息和购买按实际结果显示。",
    "What do the campaigns cover?": "推广包括什么？",
    "Search marketing, content, paid advertising, and lead generation for Chinese manufacturers and suppliers.": "为中国制造商和供应商做搜索营销、内容、付费广告和获客。",
    "Is the Google Business Profile included?": "包括 Google 商家资料吗？",
    "When the brief needs calls, chats, and direction requests, the profile is part of the work.": "如果需求里有来电、聊天和路线请求，商家资料就是工作的一部分。",
    "Is this separate from SEO?": "这和 SEO 是分开的吗？",
    "Campaigns can run beside SEO. The call is where we say which one should lead.": "推广可以和 SEO 一起做。哪一项先做，在通话里说清楚。",
    "A calendar, not a pile of posts.": "一份日历，不是一堆帖子。",
    "Posts a buyer in the industry can trust.": "行业里的买家能信任的内容。",
    "The capability of the factory, said in public.": "把工厂的能力公开讲出来。",
    "The network where B2B buyers already read.": "B2B 买家已经在看的那个网络。",
    "Publishing and replies on one plan.": "发布和回复在同一份计划里。",
    "Plan the content.": "先规划内容。",
    "Write for the buyer.": "写给买家。",
    "Industry posts, brand stories, and LinkedIn, in the language the buyer reads.": "行业内容、品牌故事和 LinkedIn，用买家阅读的语言。",
    "Keep the presence moving.": "让这个形象持续动起来。",
    "What does social management include?": "社交媒体管理包括什么？",
    "Content planning, industry content for Chinese B2B markets, brand storytelling, LinkedIn, and growth.": "内容规划、面向中国 B2B 市场的行业内容、品牌叙事、LinkedIn 和增长。",
    "Is this only LinkedIn?": "只做 LinkedIn 吗？",
    "LinkedIn is the core. The plan follows where the buyers already are.": "LinkedIn 是核心。计划跟着买家已经在的地方走。",
    "Who writes the posts?": "帖子谁来写？",
    "Hurfi writes and plans them from the real capability of the factory. You approve the direction.": "Hurfi 根据工厂的真实能力来写和规划。方向由你确认。",
    "Industries We Serve | Manufacturing & B2B Growth — Hurfi": "我们服务的行业 | 制造与 B2B 增长 — Hurfi",
    "Digital growth for manufacturers and B2B suppliers — websites, search, positioning, and lead generation, with China-side coordination.": "为制造商和 B2B 供应商做数字增长：网站、搜索、定位和获客，并在需要时做中国侧对接。",
    "Digital Growth Solutions for Modern Industries": "面向现代行业的数字增长方案",
    "Hurfi helps manufacturers and B2B suppliers get found by buyers, explain the product clearly, and open a real conversation.": "Hurfi 帮助制造商和 B2B 供应商被买家找到，把产品讲清楚，并打开一次真实的对话。",
    "Industry Categories": "行业分类",
    "Search the sectors. Each card opens that industry.": "搜索这些领域。每张卡片打开对应行业。",
    "Search industries": "搜索行业",
    "No industry matches that search.": "没有行业对上这次搜索。",
    "Heavy manufacturing": "重型制造",
    "Products and materials": "产品与材料",
    "Technology and trade": "技术与贸易",
    "Featured Industries": "重点行业",
    "Priority industries, each with its own page.": "优先行业，每个都有自己的页面。",
    "Industry Challenges": "行业难题",
    "The same three problems show up across these sectors.": "这三个问题在这些领域里反复出现。",
    "Low visibility": "能见度低",
    "The factory is real. Buyers searching the category still do not find it.": "工厂是真实的。搜索这个品类的买家仍然找不到它。",
    "Difficult product discovery": "产品不好找",
    "Specs, ranges, and capabilities are hard to find, so the buyer leaves.": "规格、系列和能力不好找，买家就离开了。",
    "Limited international reach": "国际触达有限",
    "The site and the language stop at the home market.": "网站和语言停在本土市场。",
    "Our Solutions": "我们的方案",
    "Four kinds of work, used together when the brief needs them.": "四种工作，需求需要时一起用。",
    "Digital positioning": "数字定位",
    "How the factory is described in public, before a buyer asks.": "在买家发问之前，工厂在公开场合被怎样描述。",
    "Lead generation": "获客",
    "How We Work": "我们如何工作",
    "Discovery": "发现",
    "The brief, the products, and the buyer.": "需求、产品和买家。",
    "Research": "研究",
    "How that industry searches, and where the factory is missing.": "这个行业怎么搜索，工厂缺在哪里。",
    "Strategy": "策略",
    "What to build, what to fix, and what to leave.": "做什么、改什么、留下什么。",
    "Implementation": "实施",
    "The site, the search, and the public presence.": "网站、搜索和公开形象。",
    "Optimisation": "优化",
    "Read the report and adjust from what it shows.": "看报告，按报告里的内容调整。",
    "Relevant Projects": "相关项目",
    "Markets We Support": "我们支持的市场",
    "Languages, the buyer market, and a China-side contact when the brief needs one.": "语言、买家市场，以及需求需要时的中国侧联系人。",
    "Languages": "语言",
    "English, Simplified Chinese, and French. The page is written in the language the buyer reads.": "英语、简体中文和法语。页面用买家阅读的语言来写。",
    "English": "英语",
    "Français": "法语",
    "Export markets": "出口市场",
    "The work is for buyers outside the home market. We do not publish a country list we cannot stand behind.": "这些工作是给本土市场以外的买家的。我们不会公布一份自己站不住的国家名单。",
    "China-side coordination": "中国侧对接",
    "Do you only work with manufacturers in China?": "你们只服务中国的制造商吗？",
    "The focus is Chinese manufacturers, suppliers, and exporters. The buyer can be anywhere those factories sell.": "重点是中国的制造商、供应商和出口商。买家可以在这些工厂销售的任何地方。",
    "Can one company sit in more than one industry?": "一家公司可以同时属于多个行业吗？",
    "Yes. A machinery exporter can use both pages. The call decides which brief leads.": "可以。一家机械出口商可以用两个页面。哪一份需求为主，在通话里决定。",
    "Will you promise rankings for our product keywords?": "你们会承诺我们产品关键词的排名吗？",
    "No. Search work starts from the site you have. The screenshots on this site are reports, not a guarantee.": "不会。搜索工作从你现有的网站开始。本站的截图是报告，不是保证。",
    "How does the China-side contact work?": "中国侧联系人怎么工作？",
    "Shahruk Karim Simanto is the China-side contact, on WeChat and by phone. Yasir leads the strategy call.": "Shahruk Karim Simanto 是中国侧联系人，通过微信和电话。策略通话由 Yasir 来带。",
    "What buyers look for.": "买家在找什么。",
    "How the work is set up.": "工作如何安排。",
    "The same four kinds of work, set to this industry.": "同样的四种工作，按这个行业来安排。",
    "All industries": "全部行业",
    "Manufacturing": "制造业",
    "Manufacturing | Hurfi": "制造业 | Hurfi",
    "Digital presence for factories that sell parts, materials, and finished goods to other businesses.": "向其他企业销售零件、材料和成品的工厂，需要的数字形象。",
    "Process and capacity": "流程与产能",
    "Buyers want the process, the capacity, and the products, stated plainly.": "买家要的是流程、产能和产品，讲清楚就好。",
    "A range they can scan": "能扫一眼的产品系列",
    "The catalog should be findable. A buried PDF is not a catalog.": "目录要找得到。藏起来的 PDF 不算目录。",
    "A way to start": "一个开始的方式",
    "Inquiry, WeChat, or a clear next step. The page should not end in silence.": "询盘、微信，或一个清楚的下一步。页面不该停在沉默里。",
    "Does the page need every product on day one?": "第一天就要放上所有产品吗？",
    "No. Start with the ranges buyers ask for. The catalog can grow after the structure is right.": "不用。先放买家会问的系列。结构对了，目录可以再长。",
    "Industrial Suppliers": "工业供应商",
    "Industrial Suppliers | Hurfi": "工业供应商 | Hurfi",
    "A clear catalog for suppliers whose buyers compare more than one factory.": "买家会比较多家工厂时，供应商需要一份清楚的目录。",
    "The comparison": "比较",
    "Buyers line factories up. Capability and range should be easy to compare.": "买家会把工厂放在一起看。能力和系列要方便比较。",
    "Proof of supply": "供货证明",
    "What you make, what you can repeat, and how a buyer asks.": "你做什么、能不能稳定做、买家怎么问。",
    "Trust before the call": "通话之前的信任",
    "The page has to answer the first questions, so the call is about the order.": "页面要先回答第一批问题，通话才谈得上订单。",
    "Our buyers compare several factories. What should the site show first?": "我们的买家会比较几家工厂。网站先展示什么？",
    "Capability, the range, and a way to inquire. A slogan does not help that comparison.": "能力、系列，以及询盘的方式。一句口号帮不上这种比较。",
    "Electronics": "电子",
    "Electronics | Hurfi": "电子 | Hurfi",
    "Product discovery for electronics factories, from components to finished devices.": "从元器件到整机，电子工厂需要让产品被找到。",
    "Families, then parts": "先系列，再零件",
    "Group the range the way a buyer searches, not the way the warehouse is labeled.": "按买家搜索的方式分组，不要按仓库标签分组。",
    "Spec in the open": "规格公开",
    "The spec a buyer compares should be on the page, not only in a file.": "买家要比较的规格应该在页面上，不要只在文件里。",
    "A serious next step": "一个认真的下一步",
    "Component buyers do not want a shop cart. They want a way to ask.": "元器件买家不要购物车。他们要的是询问的方式。",
    "We have too many SKUs to put on one page. What then?": "SKU 太多，放不进一个页面。怎么办？",
    "Group them the way a buyer searches: family, spec, then the product.": "按买家搜索的方式分组：系列、规格，然后才是产品。",
    "Machinery": "机械",
    "Machinery | Hurfi": "机械 | Hurfi",
    "Sites and search for machinery makers whose buyers need specs before they inquire.": "机械制造商的网站和搜索，买家询盘前先要看到规格。",
    "The machine, named": "把机器叫出名字",
    "One page for the machine the buyer is trying to find.": "买家在找的那台机器，单独一页。",
    "Spec before story": "先规格，后故事",
    "Capacity, size, and use come before the brand line.": "产能、尺寸和用途，排在品牌口号前面。",
    "A path to a quote": "通向报价的路径",
    "The inquiry should say which machine, so the reply can be specific.": "询盘要写明是哪台机器，回复才能具体。",
    "Buyers ask for specs before they talk. Where do those live?": "买家开口前先要规格。规格放在哪里？",
    "On the page for that machine, in plain language, not only in a PDF buried on the site.": "在那台机器的页面上，用明白的话写，不要只藏在网站深处的 PDF 里。",
    "Textile": "纺织",
    "Textile | Hurfi": "纺织 | Hurfi",
    "Presence for textile manufacturers selling to brands and wholesalers.": "面向品牌和批发商的纺织制造商，需要这样的形象。",
    "Capability, not a shop": "能力，不是店铺",
    "Trade buyers want fabric, process, and capacity. Not a consumer cart.": "贸易买家要的是面料、工艺和产能。不是消费者购物车。",
    "The range": "系列",
    "Show the families a brand can actually source.": "展示品牌真正能采购的系列。",
    "How an order starts": "订单怎么开始",
    "Minimums, process, and who to contact belong on the page.": "起订量、流程和联系谁，都应该在页面上。",
    "We sell to brands, not to the public. Should the site look like a shop?": "我们卖给品牌，不卖给公众。网站要做得像商店吗？",
    "No. It should show capability, fabric, and how to start an order conversation.": "不要。它应该展示能力、面料，以及怎么开始谈订单。",
    "Export Businesses": "出口企业",
    "Export Businesses | Hurfi": "出口企业 | Hurfi",
    "Reach for exporters who need buyers outside the home market to find them.": "出口商需要境外买家能找到自己。",
    "The buyer’s language": "买家的语言",
    "The page is written in the language the buyer reads.": "页面用买家阅读的语言来写。",
    "What you can ship": "你能出什么货",
    "Products, capacity, and the markets you already serve, said plainly.": "产品、产能，以及你已经在做的市场，讲明白。",
    "A contact that answers": "有人回复的联系方式",
    "An export inquiry needs a person, not a dead form.": "出口询盘需要一个人，不是一个没人看的表单。",
    "Our buyers are not in China. Does the site still start from the factory?": "我们的买家不在中国。网站还是从工厂讲起吗？",
    "Yes. The factory is the proof. The language and the search follow the buyer.": "是的。工厂就是证明。语言和搜索跟着买家走。",
    "OEM and ODM": "OEM 与 ODM",
    "OEM and ODM | Hurfi": "OEM 与 ODM | Hurfi",
    "Positioning for factories that build for other brands.": "为其他品牌代工的工厂，需要这样的定位。",
    "The factory, not the label": "工厂，不是贴牌",
    "Buyers are checking who builds the product, before they send a brief.": "买家在发需求之前，先确认是谁在做这个产品。",
    "What you can develop": "你能开发什么",
    "OEM and ODM are different offers. The page should say which one you do.": "OEM 和 ODM 是两种不同的服务。页面要写明你做哪一种。",
    "A private conversation": "私下的对话",
    "The public page earns the brief. The detail can stay off the public page.": "公开页面赢得需求。细节可以不放在公开页面上。",
    "We build for other brands. Do we still need our own site?": "我们为其他品牌代工。还需要自己的网站吗？",
    "Yes. Buyers check the factory before they send a private-label brief.": "需要。买家在发出贴牌需求之前，会先看工厂。",
    "Packaging": "包装",
    "Packaging | Hurfi": "包装 | Hurfi",
    "Pages for packaging makers whose buyers search by material and use.": "包装厂的页面要顺着买家搜索的材料和用途来写。",
    "Material first": "先写材料",
    "Buyers search the material. The page title should match that search.": "买家搜的是材料。页面标题要对上那个搜索。",
    "Use, not only product": "用途，不只是产品",
    "Say what the packaging is for, so the right buyer recognises it.": "写明包装用来做什么，对的买家才会认出来。",
    "What the line can do": "这条产线能做什么",
    "Sizes, finishes, and capacity, in one place.": "尺寸、工艺和产能，放在一处。",
    "Buyers search by material. Should the pages follow that?": "买家按材料搜索。页面要跟着走吗？",
    "Yes. Material, use, and what the factory can produce belong in the page.": "要。材料、用途，以及工厂能生产什么，都应该写在页面里。",
    "Automotive Parts": "汽车零部件",
    "Automotive Parts | Hurfi": "汽车零部件 | Hurfi",
    "Search and sites for parts makers whose buyers look up a component.": "零部件买家搜的是零件。网站和搜索要跟着这个来。",
    "The part name": "零件名称",
    "Use the words a buyer types, next to the real part you make.": "用买家会输入的词，写在你真正生产的零件旁边。",
    "Fit and spec": "适配与规格",
    "What it fits, and the spec, before the company story.": "适配什么、规格是什么，放在公司故事前面。",
    "A buyer who is technical": "技术型买家",
    "The page should respect a procurement reader. Short, specific, sourced.": "页面要尊重采购读者。短、具体、有出处。",
    "A buyer searches a part name, not our company. Can the site match that?": "买家搜的是零件名，不是我们公司。网站能对上吗？",
    "The pages should use the part language buyers type, next to the real capability.": "页面要用买家输入的零件语言，并写上真实能力。",
    "Building Materials": "建筑材料",
    "Building Materials | Hurfi": "建筑材料 | Hurfi",
    "Discovery for factories that supply materials to projects and distributors.": "向项目和经销商供货的材料工厂，需要被找到。",
    "The material": "材料",
    "Name it the way a contractor or a distributor searches.": "用承包商或经销商搜索的方式来命名。",
    "Supply, not a brochure": "供货，不是画册",
    "Lead times, range, and who the factory sells to.": "交期、系列，以及工厂卖给谁。",
    "Two kinds of buyer": "两类买家",
    "A project and a distributor do not ask the same first question.": "项目方和经销商的第一个问题不一样。",
    "Projects and distributors ask different questions. One site?": "项目方和经销商问的不一样。一个网站够吗？",
    "One site, with pages that answer both: the material, and how supply works.": "一个网站，用不同页面回答两件事：材料和供货怎么进行。",
    "Furniture": "家具",
    "Furniture | Hurfi": "家具 | Hurfi",
    "Catalog-led sites for furniture makers selling to importers and trade buyers.": "面向进口商和贸易买家的家具厂，需要以目录为主的网站。",
    "A catalog, not one hero": "目录，不是一张主图",
    "Trade buyers want the range. One lifestyle photo is not the range.": "贸易买家要的是系列。一张生活照不是系列。",
    "Factory beside product": "工厂放在产品旁边",
    "Who makes it, and what the line can repeat.": "谁在做，这条产线能稳定重复什么。",
    "Trade inquiry": "贸易询盘",
    "The next step is a conversation with a buyer, not a checkout.": "下一步是和买家谈话，不是结账。",
    "Trade buyers want a range, not a single hero product. How should that look?": "贸易买家要系列，不是单一主打产品。应该怎么呈现？",
    "A catalog they can scan, with the factory capability beside it.": "一份能扫一眼的目录，旁边写上工厂的能力。",
    "Lighting": "照明",
    "Lighting | Hurfi": "照明 | Hurfi",
    "Ranges and search for lighting factories whose buyers compare specification and supply.": "照明厂的系列和搜索，买家比的是规格和供货。",
    "The spec they compare": "他们比较的规格",
    "Put the specification a buyer checks on the product page.": "把买家会核对的规格放在产品页上。",
    "Indoor, outdoor, or component. Say which, so the wrong buyer leaves early.": "室内、户外或配件。写清楚，不对的买家会早点离开。",
    "Supply after the spec": "规格之后的供货",
    "Once the spec matches, the buyer asks about supply. Answer that on the page.": "规格对上之后，买家会问供货。页面上要回答。",
    "Specification decides the order. What do we show?": "规格决定订单。我们要展示什么？",
    "The range, the spec a buyer compares, and who to contact.": "系列、买家要比较的规格，以及联系谁。",
    "Search all 825 industries. Main sectors stay listed first.": "搜索全部 825 个行业。主要行业仍然排在前面。",
    "Main sectors": "主要行业",
    "More sectors": "更多行业",
    "Keep typing to narrow the list.": "继续输入，缩小列表。",
    "Niches in this sector": "这个行业里的细分",
    "These names are the cluster for this sector. A separate page is added only after the demand is checked.": "这些名称是这个行业的分组。单独页面只在需求核对之后才加。",
    "Hurfi helps manufacturers and suppliers in this sector get found, explain the product, and talk to buyers.": "Hurfi 帮助这个行业的制造商和供应商被找到，把产品讲清楚，并和买家交谈。",
    "Explore China Markets": "探索中国市场",
    "Digital Growth Across China's Manufacturing Hubs": "中国制造业枢纽上的数字增长",
    "Explore major industrial regions and manufacturing cities across China, and discover how Hurfi helps B2B businesses strengthen their digital presence.": "探索中国的主要工业区域和制造业城市，了解 Hurfi 如何帮助 B2B 企业加强数字形象。",
    "Explore Locations": "查看地点",
    "Discuss Your Growth Strategy": "谈谈你的增长策略",
    "China Locations Search": "中国地点搜索",
    "Search cities, provinces, or industries...": "搜索城市、省份或行业...",
    "Hurfi does not publish local offices in these cities. The China-side contact is by WeChat and phone.": "Hurfi 不在这些城市公布本地办公室。中国侧联系通过微信和电话。",
    "All provinces": "全部省份",
    "All industries": "全部行业",
    "All regions": "全部区域",
    "Province": "省份",
    "City": "城市",
    "Industry": "行业",
    "Industrial Region": "工业区域",
    "No location matches that search.": "没有地点对上这次搜索。",
    "Featured Manufacturing Cities": "重点制造业城市",
    "Browse by Province": "按省份浏览",
    "34 provincial-level entries. A division opens to the cities published for it. City landing pages are not published yet.": "34 个省级条目。展开后是已公布的城市。城市落地页尚未发布。",
    "Provinces": "省",
    "Autonomous Regions": "自治区",
    "Municipalities": "直辖市",
    "Special Administrative Regions": "特别行政区",
    "Separately administered": "另行管理",
    "No city is published for this division yet.": "这个区划还没有公布城市。",
    "Taiwan is listed as a separately administered territory. It is not mainland China coverage.": "台湾按另行管理的地区列出。它不是中国大陆的覆盖范围。",
    "Hong Kong and Macao are Special Administrative Regions. No Hurfi office is published in either place.": "香港和澳门是特别行政区。两地都没有公布 Hurfi 办公室。",
    "Major Industrial Regions": "主要工业区域",
    "Industries Across China": "中国各地的行业",
    "A city can relate to more than one industry. These links use the industry pages that already exist.": "一个城市可以对应多个行业。这些链接用的是已经存在的行业页。",
    "How Hurfi Supports Businesses": "Hurfi 如何支持企业",
    "Featured projects": "重点项目",
    "China Client Relations": "中国客户关系",
    "Yasir leads the strategy conversation. Shahruk is the China-side contact, on WeChat and by phone.": "策略对话由 Yasir 来带。Shahruk 是中国侧联系人，通过微信和电话。",
    "Location questions": "地点问题",
    "Do you have an office in every city listed?": "列出的每个城市都有办公室吗？",
    "No. The published China contact address is in Xi'an. The other cities are markets in this directory, not offices.": "没有。已公布的中国联系地址在西安。其他城市是这份目录里的市场，不是办公室。",
    "Why is Taiwan listed separately?": "为什么台湾单独列出？",
    "Can you work with a factory in a city that has no page yet?": "还没有页面的城市，工厂也可以合作吗？",
    "Yes. This directory is the map. A city page is added only when there is something specific to say.": "可以。这份目录就是地图。只有有具体内容可说时，才加城市页。",
    "Project Requirements": "项目需求",
    "Enter the company name.": "请填写公司名称。",
    "Select a province": "选择省份",
    "Choose a province.": "请选择省份。",
    "Enter the city.": "请填写城市。",
    "Enter the industry.": "请填写行业。",
    "This is the published China contact address, not an office network.": "这是已公布的中国联系地址，不是办公室网络。",
    "The published directory is China. City pages are added only when there is something specific to say.": "已发布的目录是中国。只有有具体内容可说时，才加城市页。",
    "Provincial divisions, manufacturing cities, and industrial regions. No local office is claimed unless one is published.": "省级区划、制造业城市和工业区域。除非已经公布，否则不声称有本地办公室。",
    "300 cities from the working directory. This is not every county or district, and it is not an office list.": "工作目录里有 300 个城市。这不是每个县或区，也不是办公室名单。",
    "Twelve manufacturing hubs are shown first. The other cities stay in the province lists. A city page is published only when there is something specific to say.": "十二个制造业中心排在前面。其余城市留在省份列表里。只有有具体内容可说时，才发布城市页。",
    "Research focus": "研究方向",
    "Sector focus is not published for this city yet.": "这座城市的行业重点尚未发布。",
    "These groupings are editorial starting points from the directory. They are not verified claims for a new project.": "这些分组是目录里的编辑起点，不是对新项目的已核实说法。",
    "Taiwan is listed to clarify the claimed province category. It is independently administered, and it is not represented as Hurfi coverage.": "列出台湾是为了说明所主张的省份分类。它单独管理，也不代表 Hurfi 的服务覆盖。",
    "Special administrative region. Separate rules apply, and no local office is claimed.": "特别行政区。适用单独规则，不声称有本地办公室。",
    "Reference directory. Not complete coverage of every county or district.": "参考目录。并未覆盖每个县或区。",
    "Other page candidates": "其他页面候选",
    "These cities are marked for a future page. The page is not published yet.": "这些城市被标为以后的页面。页面尚未发布。",
    "Page candidate": "页面候选",
    "34 provincial-level entries. Open a province to see its cities. No local office is claimed.": "34 个省级条目。打开一个省即可看到其中的城市。不声称有本地办公室。",
    "Search a city, a province, or an industry. Hurfi works with B2B manufacturers in these markets.": "搜索城市、省份或行业。Hurfi 为这些市场里的 B2B 制造商提供服务。",
    "Twelve manufacturing hubs are listed first. Every other city stays in its province, with the industry named where the directory has one.": "十二个制造业中心排在前面。其余城市留在各自的省份里，目录里有行业的会写上行业。",
    "More manufacturing cities": "更多制造业城市",
    "These cities are in the directory with the industries named beside them.": "这些城市在目录里，旁边写着对应的行业。",
    "Open a province to reach its manufacturing cities.": "打开一个省，就能看到其中的制造业城市。",
    "The industry is named beside each city in this list.": "这个列表里，每个城市旁边写着行业。",
    "Hurfi helps the industries in these regions with B2B websites, SEO, and buyer inquiries.": "Hurfi 为这些区域里的行业提供 B2B 网站、SEO 和买家询盘。",
    "Main industries": "主要行业",
    "Main locations": "主要地区",
    "Industrial Automation & Robotics": "工业自动化与机器人",
    "Electronics & Semiconductor": "电子与半导体",
    "EV & E-Mobility": "电动车与出行",
    "Battery & Energy Storage": "电池与储能",
    "Power Grid & Electrical Equipment": "电网与电气设备",
    "Medical Devices & Diagnostics": "医疗器械与诊断",
    "Laboratory & Scientific Equipment": "实验室与科学设备",
    "Industrial Machinery & CNC": "工业机械与数控",
    "Industrial Software & Data": "工业软件与数据",
    "Data Centers & Digital Infrastructure": "数据中心与数字基础设施",
    "Optics & Photonics": "光学与光子",
    "Pharma & Bioprocess Manufacturing": "制药与生物工艺制造",
    "This page drifted off.": "这一页不在了。",
    "The link does not match a Hurfi page. Head home, or contact us and say what you were looking for.": "这个链接对不上 Hurfi 的页面。回到首页，或联系我们说明你在找什么。",
    "Back home": "回到首页",
    "Contact Hurfi": "联系 Hurfi",
    "Inquiry sent": "咨询已发出",
    "Hurfi has your inquiry.": "Hurfi 已收到你的咨询。",
    "Your note is on its way. We follow up by WeChat, email, or WhatsApp, using the method you chose.": "你的内容正在送达。我们会按你选的方式，通过微信、邮件或 WhatsApp 跟进。",
    "We read the note first.": "我们会先读你的内容。",
    "The reply comes from Yasir, or from Shahruk when the work is on the China side.": "回复由 Yasir 发出；如果是中国侧的事，则由 Shahruk 联系。",
    "Nothing starts until the brief is clear.": "简报清楚之前，工作不会开始。",
    "Explore services": "看看服务",
    "We could not send this inquiry. Email yasir@hurfi.com and try again.": "咨询没能发出。请发邮件到 yasir@hurfi.com，或再试一次。",
    "Scope, timing, and the way we talk are agreed before the work begins.": "工作开始前，会先说好范围、时间和沟通方式。",
    "How Hurfi works with you": "Hurfi 如何与你合作",
    "Flexible payment plans. Pay monthly, quarterly, or annually, with no commitment and the option to cancel anytime.": "灵活付款。可按月、按季或按年支付，没有绑定，也可以随时取消。",
    "Unlimited revisions, with the team reviewing the work together.": "不限修改次数，团队一起审看作品。",
    "Lifetime support: ongoing updates, priority response handling, and 24/7 expert assistance.": "长期支持：持续更新、优先回复，以及全天候专业协助。",
    "Hand-picked Hurfi specialists across strategy, marketing, SEO, AI, design, development, and China client relations.": "Hurfi 精选团队，覆盖战略、营销、SEO、AI、设计、开发和中国客户联络。"
  };

  /* "Limited" is used both as a badge and was overwritten above by the score label. Restore the badge meaning for the short nav tag by keeping score phrases longer. The nav tag text is exactly "Limited", which now means 有限. Fix the badge to stay 限时 by using a dedicated pass is not possible if both strings are identical. The score "Limited" and the badge "Limited" are the same English word. Prefer the nav/offer meaning 限时 because it appears more often in chrome; comparison "Limited" is less visible (icon). Override back: */
  zh["Limited"] = "限时";
  zh["Brand system"] = "品牌系统";
  zh["Brand Guidelines"] = "品牌规范";
  zh["Download the logo files, copy a color, and see which typeface to use."] = "下载标志文件，复制颜色，并查看该用哪种字体。";
  zh["Download all logos"] = "下载全部标志";
  zh["View on Behance"] = "在 Behance 上查看";
  zh["Logos"] = "标志";
  zh["Each file is separate. The zip contains every logo on this page."] = "每个文件分开下载。压缩包里包含本页的全部标志。";
  zh["App icon"] = "应用图标";
  zh["The blue tile with the white mark. Use it for favicons, app icons, and avatars."] = "蓝色圆角方块配白色标志。用于网站图标、应用图标和头像。";
  zh["Logo on light backgrounds"] = "浅色背景用标志";
  zh["Black wordmark on a transparent background. Use this on white and light surfaces."] = "透明背景上的黑色字标。用在白色和浅色表面上。";
  zh["Logo on dark backgrounds"] = "深色背景用标志";
  zh["White wordmark on a transparent background. Use this on dark and colorful surfaces."] = "透明背景上的白色字标。用在深色和彩色表面上。";
  zh["White lockup"] = "白色组合标志";
  zh["Large white wordmark for print and dark layouts."] = "用于印刷和深色版式的大号白色字标。";
  zh["How to use the logo"] = "如何使用标志";
  zh["The name"] = "名称";
  zh["Write the name as Hurfi, with a capital H."] = "名称写作 Hurfi，H 大写。";
  zh["Leave it whole"] = "保持完整";
  zh["Do not stretch, rotate, recolor, outline, or add a shadow to the mark."] = "不要拉伸、旋转、改色、加描边，或给标志加阴影。";
  zh["Match the ground"] = "配好底色";
  zh["Do not place the black wordmark on a dark photo, or the white wordmark on a white page."] = "不要把黑色字标放在深色照片上，也不要把白色字标放在白底页面上。";
  zh["Clear space"] = "留白";
  zh["Leave clear space around the logo so it does not touch other text or the edge of a picture."] = "标志周围留出空白，不要贴到其他文字或图片边缘。";
  zh["Colors"] = "颜色";
  zh["Click a swatch to copy the hex."] = "点击色块即可复制色值。";
  zh["Hurfi Blue"] = "Hurfi 蓝";
  zh["The blue used on hurfi.com for links, buttons, and the header."] = "hurfi.com 上链接、按钮和页眉使用的蓝色。";
  zh["Icon Blue"] = "图标蓝";
  zh["The flat blue in the app icon PNG. The SVG file uses #007AFE."] = "应用图标 PNG 里的纯色蓝。SVG 文件使用 #007AFE。";
  zh["Palette Blue"] = "色板蓝";
  zh["The first blue in the identity palette."] = "视觉识别色板里的第一块蓝色。";
  zh["Growth Green"] = "成长绿";
  zh["The green beside blue in the identity palette."] = "视觉识别色板里，蓝色旁边的绿色。";
  zh["Sky"] = "天空蓝";
  zh["Light blue from the brand palette."] = "品牌色板中的浅蓝色。";
  zh["Mint"] = "薄荷色";
  zh["Light green from the brand palette."] = "品牌色板中的浅绿色。";
  zh["Black"] = "黑色";
  zh["The wordmark on light backgrounds."] = "浅色背景上的字标颜色。";
  zh["White"] = "白色";
  zh["The wordmark on dark backgrounds."] = "深色背景上的字标颜色。";
  zh["Copy"] = "复制";
  zh["Typefaces"] = "字体";
  zh["PolySans Neutral is the brand typeface. The website uses two Google Fonts."] = "PolySans Neutral 是品牌字体。网站使用两款 Google Fonts。";
  zh["Brand typeface"] = "品牌字体";
  zh["Used in the Hurfi identity. It is not on Google Fonts. This page does not include a font file."] = "用于 Hurfi 的视觉识别。Google Fonts 上没有这款字体。本页不提供字体文件。";
  zh["View at Gradient"] = "在 Gradient 查看";
  zh["Website text"] = "网站正文";
  zh["The typeface used for text on hurfi.com."] = "hurfi.com 正文使用的字体。";
  zh["Open on Google Fonts"] = "在 Google Fonts 打开";
  zh["Copy CSS"] = "复制 CSS";
  zh["Headlines"] = "标题";
  zh["The italic typeface used for large headlines on hurfi.com."] = "hurfi.com 大标题使用的斜体字体。";
  zh["Identity"] = "视觉识别";
  zh["The full identity system is on Behance."] = "完整的视觉识别系统在 Behance 上。";
  zh["Hurfi is a forward-driven digital agency built on speed, innovation, and strategic growth. Its identity merges bold design with functional clarity. Hurfi stands for momentum: measurable, scalable, and precise."] = "Hurfi 是一家以速度、创新和战略增长为导向的数字机构。其识别系统把大胆的设计与功能上的清晰结合在一起。Hurfi 代表的是势头：可衡量、可扩展、而且精确。";
  zh["Open the Hurfi identity on Behance"] = "在 Behance 打开 Hurfi 视觉识别";
  zh["Where can I download the Hurfi logo?"] = "在哪里可以下载 Hurfi 标志？";
  zh["On this page. Each logo has its own download, and Download all logos saves every file in one zip."] = "就在这一页。每个标志可以单独下载，下载全部标志会把所有文件放进一个压缩包。";
  zh["Which file should I use on a dark background?"] = "深色背景该用哪个文件？";
  zh["Use the white wordmark, Logo on dark backgrounds, or the white lockup."] = "使用白色字标，也就是深色背景用标志，或白色组合标志。";
  zh["What color is Hurfi blue?"] = "Hurfi 蓝是什么颜色？";
  zh["The website uses #0076F7. The app icon file uses #007AFF."] = "网站使用 #0076F7。应用图标文件使用 #007AFF。";
  zh["What font does Hurfi use?"] = "Hurfi 用什么字体？";
  zh["The brand typeface is PolySans Neutral. The website uses Plus Jakarta Sans and Instrument Serif, both on Google Fonts."] = "品牌字体是 PolySans Neutral。网站使用 Plus Jakarta Sans 和 Instrument Serif，这两款都在 Google Fonts 上。";
  zh["Can I change the logo?"] = "可以改标志吗？";
  zh["No. Use the files on this page as they are."] = "不可以。请按本页提供的文件原样使用。";

  zh["Insights"] = "洞察";
  zh["All insights"] = "全部文章";
  zh["Resources"] = "资源";
  zh["City guides"] = "城市指南";
  zh["All city guides"] = "全部城市指南";
  zh["China directory"] = "中国城市目录";
  zh["All industries"] = "全部行业";
  zh["Overseas buyer inquiries"] = "海外买家询盘";
  zh["Factory website trust signals"] = "工厂网站信任要素";
  zh["RFQ website checklist"] = "询价型网站清单";
  zh["Industrial product page SEO"] = "工业产品页 SEO";
  zh["International SEO checklist"] = "国际 SEO 清单";
  zh["AI search for manufacturers"] = "制造企业与 AI 搜索";
  zh["Google Ads for exporters"] = "外贸企业谷歌广告";
  zh["LinkedIn for export sales"] = "领英外贸开发";
  zh["Trade show follow-up"] = "展会后续跟进";
  zh["Export website speed"] = "外贸网站速度";
  zh["Choosing an export agency"] = "如何选择外贸营销公司";
  zh["Shenzhen"] = "深圳";
  zh["Guangzhou"] = "广州";
  zh["Dongguan"] = "东莞";
  zh["Shanghai"] = "上海";
  zh["Suzhou"] = "苏州";
  zh["Wuxi"] = "无锡";
  zh["Changzhou"] = "常州";
  zh["Hangzhou"] = "杭州";
  zh["Ningbo"] = "宁波";
  zh["Hefei"] = "合肥";
  zh["Wuhan"] = "武汉";
  zh["Xiamen"] = "厦门";
  zh["Quanzhou"] = "泉州";
  zh["Zhongshan"] = "中山";
  zh["Tianjin"] = "天津";
  var fr = {
    "Skip to content": "Aller au contenu",
    "Language": "Langue",
    "Home": "Accueil",
    "About": "À propos",
    "Services": "Services",
    "Website Development": "Création de site",
    "Digital Marketing": "Marketing digital",
    "Social Media Management": "Réseaux sociaux",
    "Hot": "Populaire",
    "Projects": "Projets",
    "Case Studies": "Études de cas",
    "Industries": "Secteurs",
    "Locations": "Régions",
    "Contact Us": "Contact",
    "Contact": "Contact",
    "Free Growth Strategy": "Stratégie gratuite",
    "Limited": "Limité",
    "Book a Consultation": "Réserver une consultation",
    "Open menu": "Ouvrir le menu",
    "Close menu": "Fermer le menu",
    "New highlight in menu": "Nouveauté dans le menu",
    "Free 30-minute consultation": "Consultation gratuite de 30 minutes",
    "Free, no obligation": "Gratuit, sans engagement",
    "Strategy call for Chinese manufacturers, suppliers, and B2B companies — free, with no obligation.": "Appel stratégique pour les fabricants, fournisseurs et entreprises B2B chinois — gratuit et sans engagement.",
    "Book": "Réserver",
    "Meet": "Échanger",
    "Plan": "Planifier",
    "Next steps": "Étapes suivantes",
    "Your factory builds": "Votre usine fabrique",
    "great": "d’excellents",
    "products.": "produits.",
    "We build your global presence — websites, search, and campaigns so buyers can find, trust, and contact you.": "Nous construisons votre présence mondiale — sites, recherche et campagnes — pour que les acheteurs vous trouvent, vous fassent confiance et vous contactent.",
    "Book a strategy call": "Réserver un appel stratégique",
    "See our work": "Voir nos réalisations",
    "Client logos": "Logos clients",
    "Hurfi track record": "Repères Hurfi",
    "Projects completed": "Projets terminés",
    "Years of experience": "Ans d’expérience",
    "Websites built": "Sites créés",
    "Client rating": "Note clients",
    "Review platforms": "Plateformes d’avis",
    "Modern Chinese factory campus with precision machinery and shipping containers": "Campus d’usine chinois moderne, machines de précision et conteneurs",
    "Hurfi work reel": "Vidéo Hurfi",
    "Hurfi client reel": "Vidéo clients Hurfi",
    "Clarity": "Clarté",
    "A clearer look at the work.": "Un regard plus clair sur le travail.",
    "The same standard, shown in motion.": "Le même niveau, montré en mouvement.",
    "A manufacturer site, built to be understood quickly.": "Un site d'usine, conçu pour être compris vite.",
    "Search and content, shown as part of the same system.": "La recherche et le contenu, dans le même système.",
    "A clear path from a visit to an inquiry.": "Un chemin clair, de la visite à la demande.",
    "Hurfi clarity reel": "Vidéo clarté Hurfi",
    "Let's build something meaningful": "Construisons quelque chose qui compte",
    "Your Business Deserves": "Votre entreprise mérite",
    "What's Next.": "la suite.",
    "From digital visibility to meaningful B2B opportunities, let's explore how Hurfi can support your next stage of growth.": "De la visibilité numérique aux opportunités B2B, voyons comment Hurfi peut soutenir votre prochaine étape.",
    "Direct strategic consultation": "Une consultation stratégique directe",
    "Manufacturing-focused business insights": "Une lecture pensée pour l’industrie",
    "Practical direction for your next opportunity": "Une direction concrète pour la prochaine opportunité",
    "Yasir Arafat, Head of Strategy and Consulting at Hurfi": "Yasir Arafat, responsable stratégie et conseil chez Hurfi",
    "Head of Strategy & Consulting, Hurfi": "Responsable stratégie et conseil, Hurfi",
    "Let's discuss your goals and build a clear path forward.": "Parlons de vos objectifs et traçons une voie claire.",
    "Connect with Yasir on WeChat": "Contacter Yasir sur WeChat",
    "Shahruk Karim Simanto, China Client Relations Coordinator at Hurfi": "Shahruk Karim Simanto, coordinateur des relations clients Chine chez Hurfi",
    "China Client Relations Coordinator": "Coordinateur des relations clients Chine",
    "China contact:": "Contact Chine :",
    "Connect on WeChat": "Contacter sur WeChat",
    "Connect with Shahruk on WeChat": "Contacter Shahruk sur WeChat",
    "Maruf, Hurfi team": "Maruf, équipe Hurfi",
    "Afrid, Hurfi team": "Afrid, équipe Hurfi",
    "Sadman, Hurfi team": "Sadman, équipe Hurfi",
    "Shawon, Hurfi team": "Shawon, équipe Hurfi",
    "Siam, Hurfi team": "Siam, équipe Hurfi",
    "The people behind Hurfi.": "Les personnes derrière Hurfi.",
    "One brief, handled by a team of 17+, from websites and search to campaigns and content that turn visibility into inquiries.": "Un même brief, porté par une équipe de 17+, du site et de la recherche aux campagnes et au contenu qui transforment la visibilité en demandes.",
    "Tell Us About Your Project": "Parlez-nous de votre projet",
    "Share your requirements and let's explore the possibilities together.": "Partagez vos besoins et voyons ensemble ce qui est possible.",
    "Full Name": "Nom complet",
    "Your full name": "Votre nom complet",
    "Business Email": "E-mail professionnel",
    "WhatsApp Number": "Numéro WhatsApp",
    "WeChat ID": "Identifiant WeChat",
    "Your WeChat ID": "Votre identifiant WeChat",
    "Company / Brand Name": "Entreprise / marque",
    "Your company name": "Le nom de votre entreprise",
    "Service Interested In": "Service souhaité",
    "Select a service": "Choisir un service",
    "Business consulting": "Conseil d’entreprise",
    "Other / Not sure": "Autre / pas encore sûr",
    "Project Budget": "Budget du projet",
    "Under $1,000": "Moins de 1 000 $",
    "Not Sure Yet": "Pas encore sûr",
    "Project Details": "Détails du projet",
    "Tell us about your business, your goals, and what you need help with...": "Parlez-nous de votre activité, de vos objectifs et de l’aide dont vous avez besoin…",
    "Preferred Contact Method": "Moyen de contact préféré",
    "Enter your full name.": "Indiquez votre nom complet.",
    "Enter a valid business email.": "Indiquez un e-mail professionnel valide.",
    "Choose a service.": "Choisissez un service.",
    "Tell us about the project.": "Parlez-nous du projet.",
    "We could not confirm this inquiry was received. Email yasir@hurfi.com and try again.": "Nous n’avons pas pu confirmer la réception. Écrivez à yasir@hurfi.com, ou réessayez.",
    "Send Your Inquiry": "Envoyer la demande",
    "Sending…": "Envoi…",
    "Inquiry received": "Demande reçue",
    "Hurfi has your project details and will follow up.": "Hurfi a bien les détails du projet et reviendra vers vous.",
    "WeChat QR code for Yasir Arafat": "QR code WeChat de Yasir Arafat",
    "Scan using WeChat to connect directly.": "Scannez avec WeChat pour nous écrire directement.",
    "Connect with Shahruk Karim Simanto": "Contacter Shahruk Karim Simanto",
    "China Client Relations": "Relations clients Chine",
    "WeChat QR code for Shahruk Karim Simanto": "QR code WeChat de Shahruk Karim Simanto",
    "Scan this QR code using WeChat.": "Scannez ce QR code avec WeChat.",
    "Close": "Fermer",
    "Four services, built as one system for Chinese manufacturers. Not a generic agency menu.": "Quatre services, réunis en un système pour les fabricants chinois. Pas un menu d’agence générique.",
    "Real sites. Real search. Campaigns buyers can act on.": "De vrais sites. Une vraie recherche. Des campagnes qui mènent à l’action.",
    "Website": "Site web",
    "Marketing": "Marketing",
    "Social": "Social",
    "How Hurfi drives growth": "Comment Hurfi fait grandir",
    "From search visibility to": "De la visibilité dans la recherche aux",
    "real": "vraies",
    "B2B inquiries.": "demandes B2B.",
    "We build search-friendly websites, improve your visibility on Google, and turn interested visitors into valuable business opportunities.": "Nous créons des sites adaptés à la recherche, améliorons votre visibilité sur Google et transformons les visiteurs intéressés en opportunités.",
    "Optimize": "Optimiser",
    "Built for Search Engines. Designed for Buyers.": "Conçu pour les moteurs de recherche. Pensé pour les acheteurs.",
    "We create fast, SEO-optimized B2B websites that showcase your manufacturing capabilities and build buyer confidence.": "Nous créons des sites B2B rapides et optimisés pour le SEO, qui montrent vos capacités et rassurent les acheteurs.",
    "Rank": "Référencer",
    "Get Found by Global Buyers.": "Être trouvé par les acheteurs du monde.",
    "Through strategic SEO and targeted search campaigns, we help your business appear where potential buyers are actively searching.": "Par un SEO stratégique et des campagnes de recherche ciblées, nous faisons apparaître votre entreprise là où les acheteurs cherchent.",
    "Convert": "Convertir",
    "Turn Visibility Into Opportunities.": "Transformer la visibilité en opportunités.",
    "We create clear conversion pathways that encourage potential buyers to request quotes, make inquiries, and connect with your business.": "Nous créons des parcours clairs pour que les acheteurs demandent un devis, posent une question et vous contactent.",
    "More visibility. More trust. More opportunities.": "Plus de visibilité. Plus de confiance. Plus d’opportunités.",
    "Start Growing With Hurfi": "Grandir avec Hurfi",
    "Our services": "Nos services",
    "Built to get you found, trusted, and contacted.": "Pour être trouvé, cru et contacté.",
    "We help manufacturers grow through websites, SEO, campaigns, and content that turn visibility into inquiries.": "Nous aidons les fabricants à grandir grâce à des sites, au SEO, à des campagnes et à des contenus qui transforment la visibilité en demandes.",
    "Service 01": "Service 01",
    "Service 02": "Service 02",
    "Service 03": "Service 03",
    "Service 04": "Service 04",
    "B2B Website": "Site B2B",
    "We create high-converting B2B websites that clearly present your products, capabilities, and trust signals so international buyers can understand your value quickly.": "Nous créons des sites B2B qui présentent clairement vos produits, vos capacités et vos preuves, pour que les acheteurs comprennent vite votre valeur.",
    "Conversion-focused structure": "Structure orientée conversion",
    "Trust-building pages": "Pages qui inspirent confiance",
    "Mobile responsive": "Adapté au mobile",
    "We make your business search-friendly so buyers can find you on Google when they search for products, suppliers, or manufacturing solutions.": "Nous rendons votre entreprise trouvable sur Google quand les acheteurs cherchent des produits, des fournisseurs ou des solutions de fabrication.",
    "Technical SEO": "SEO technique",
    "On-page optimization": "Optimisation des pages",
    "Search visibility growth": "Croissance de la visibilité",
    "We run focused campaigns that bring the right traffic to your business and turn attention into serious business opportunities.": "Nous menons des campagnes ciblées qui amènent le bon trafic et transforment l’attention en opportunités sérieuses.",
    "Campaign strategy": "Stratégie de campagne",
    "Lead generation": "Génération de demandes",
    "Performance tracking": "Suivi des résultats",
    "Social & Content": "Social et contenu",
    "We strengthen your brand presence with strategic content and social communication that builds authority and keeps your business visible.": "Nous renforçons votre présence avec un contenu stratégique et une communication sociale qui installent l’autorité et gardent l’entreprise visible.",
    "Brand content": "Contenu de marque",
    "Social presence": "Présence sociale",
    "Audience trust": "Confiance de l’audience",
    "Growth process": "Processus de croissance",
    "How Hurfi grows a B2B company": "Comment Hurfi fait grandir une entreprise B2B",
    "We help B2B manufacturers grow through a connected system: build a strong website, improve search visibility, attract the right audience, and convert them into inquiries.": "Nous faisons grandir les fabricants B2B avec un système relié : un site solide, plus de visibilité, la bonne audience, puis des demandes.",
    "Build": "Construire",
    "Book a Strategy Call": "Réserver un appel stratégique",
    "The Hurfi growth ecosystem": "L’écosystème de croissance Hurfi",
    "From Invisible to": "De l’invisible au",
    "Industry\u2011Leading.": "leadership du secteur.",
    "We transform manufacturing expertise into digital visibility, meaningful connections, and measurable business growth.": "Nous transformons l’expertise industrielle en visibilité numérique, en liens utiles et en croissance mesurable.",
    "Hurfi Growth Engine": "Moteur de croissance Hurfi",
    "Discover": "Découvrir",
    "Understand your industry, uncover market opportunities, and identify the audiences that matter.": "Comprendre votre secteur, repérer les opportunités et identifier les audiences qui comptent.",
    "Market Insights": "Lecture du marché",
    "Audience Discovery": "Découverte d’audience",
    "Competitor Analysis": "Analyse des concurrents",
    "Position": "Positionner",
    "Build a credible digital presence that clearly communicates your manufacturing strengths.": "Construire une présence crédible qui explique clairement vos forces industrielles.",
    "Brand Positioning": "Positionnement",
    "Digital Presence": "Présence numérique",
    "Content Strategy": "Stratégie de contenu",
    "Connect": "Relier",
    "Make your business easier to discover and create opportunities to reach relevant B2B audiences.": "Rendre l’entreprise plus facile à trouver et créer des occasions d’atteindre les bonnes audiences B2B.",
    "B2B Visibility": "Visibilité B2B",
    "Industry Connections": "Liens sectoriels",
    "Lead Opportunities": "Opportunités de contact",
    "Grow": "Grandir",
    "Turn digital attention into actionable insights, stronger relationships, and long-term growth opportunities.": "Transformer l’attention numérique en décisions utiles, en relations plus solides et en croissance durable.",
    "Performance Insights": "Lecture des résultats",
    "Growth Strategy": "Stratégie de croissance",
    "Continuous Optimisation": "Optimisation continue",
    "Explore the Hurfi Advantage": "Explorer l’avantage Hurfi",
    "Why Hurfi?": "Pourquoi Hurfi ?",
    "Traditional Marketing?": "Le marketing traditionnel ?",
    "Think": "Voyez",
    "Beyond": "au-delà",
    "the Ordinary.": "de l’ordinaire.",
    "Discover a more focused approach to digital visibility and growth for manufacturing businesses.": "Une approche plus ciblée de la visibilité et de la croissance pour les entreprises industrielles.",
    "Swipe sideways to compare every column.": "Faites glisser pour voir chaque colonne.",
    "This comparison is indicative. Actual capabilities depend on the service provider and the engagement.": "Cette comparaison est indicative. Les capacités réelles dépendent du prestataire et de la mission.",
    "Build your manufacturing growth strategy": "Construire votre stratégie de croissance",
    "Explore how Hurfi can support your business visibility and growth objectives.": "Voyez comment Hurfi peut soutenir votre visibilité et vos objectifs de croissance.",
    "Discover the Hurfi Advantage": "Découvrir l’avantage Hurfi",
    "Platform": "Acteur",
    "Digital Visibility": "Visibilité",
    "Manufacturing Focus": "Focus industriel",
    "Flexibility": "Flexibilité",
    "Scalability": "Évolutivité",
    "Cost Efficiency": "Coût",
    "A manufacturing-focused digital growth partner combining industry understanding, brand visibility, and connected growth strategies.": "Un partenaire de croissance numérique centré sur l’industrie, qui relie compréhension du secteur, visibilité et stratégie.",
    "Traditional Marketing Agencies": "Agences traditionnelles",
    "Broad marketing expertise, with industry specialisation and delivery models varying between providers.": "Une expertise marketing large, avec une spécialisation et un mode de livraison qui varient selon l’agence.",
    "In-House Marketing Teams": "Équipes internes",
    "Direct brand ownership and internal collaboration, with capabilities dependent on team resources.": "La marque reste en interne, mais les capacités dépendent des ressources de l’équipe.",
    "Freelance Specialists": "Freelances spécialisés",
    "Flexible specialist support for individual marketing tasks and defined projects.": "Un appui spécialisé et flexible pour des tâches précises et des projets définis.",
    "DIY Marketing Tools": "Outils en autonomie",
    "Self-managed solutions for businesses that prefer to handle their digital presence internally.": "Des solutions autonomes pour les entreprises qui préfèrent gérer leur présence elles-mêmes.",
    "Strong fit": "Bon ajustement",
    "Depends": "Selon le cas",
    "Illustrative strong fit. Not a measured score.": "Ajustement fort, à titre illustratif. Ce n’est pas un score mesuré.",
    "Depends on the provider and the engagement.": "Cela dépend du prestataire et de la mission.",
    "Illustrative limited fit. Not a measured score.": "Ajustement limité, à titre illustratif. Ce n’est pas un score mesuré.",
    "Trusted by partners": "La confiance des partenaires",
    "Trusted by people.": "La confiance des gens.",
    "Chosen by brands.": "Le choix des marques.",
    "Words from the brands we\u2019ve worked with.": "Les mots des marques avec lesquelles nous avons travaillé.",
    "Built through real collaboration and long-term partnerships.": "Construit par une vraie collaboration et des partenariats durables.",
    "Questions": "Questions",
    "Questions factories ask": "Les questions des usines",
    "Open a question. The answer shows here, and the others close.": "Ouvrez une question. La réponse s’affiche ici, les autres se ferment.",
    "Is the consultation free?": "La consultation est-elle gratuite ?",
    "Yes. You get a clear review of your digital presence and the next steps.": "Oui. Vous recevez une lecture claire de votre présence et les prochaines étapes.",
    "What does Hurfi actually do?": "Que fait Hurfi, concrètement ?",
    "Buyer-ready websites, international SEO, digital campaigns, and social for Chinese manufacturers, suppliers, and exporters.": "Des sites prêts pour les acheteurs, du SEO international, des campagnes et du social pour les fabricants, fournisseurs et exportateurs chinois.",
    "Why do strong factories still miss international leads?": "Pourquoi de bonnes usines manquent-elles encore de demandes internationales ?",
    "Capability does not create visibility. Buyers have to find you, understand the factory, and see a clear way to inquire.": "La capacité de production ne crée pas la visibilité. Les acheteurs doivent vous trouver, comprendre l’usine et voir comment vous écrire.",
    "Do you work with suppliers and exporters?": "Travaillez-vous avec des fournisseurs et des exportateurs ?",
    "Yes. The work is built around how global B2B buyers evaluate a Chinese supplier, not a generic local shop.": "Oui. Le travail part de la façon dont un acheteur B2B mondial évalue un fournisseur chinois, pas d’une boutique locale générique.",
    "How is this different from a general agency?": "En quoi est-ce différent d’une agence généraliste ?",
    "Hurfi stays on manufacturer positioning, search, and the path from a visit to an inquiry. Not one-off creative.": "Hurfi reste sur le positionnement industriel, la recherche et le chemin d’une visite vers une demande. Pas une création isolée.",
    "Hurfi — B2B Growth & Digital Presence Partner for Chinese companies.": "Hurfi — partenaire de croissance et de présence numérique pour les entreprises chinoises.",
    "Sitemap": "Plan du site",
    "Navigation": "Navigation",
    "Socials": "Réseaux",
    "Footer": "Pied de page",
    "Bangladesh": "Bangladesh",
    "China": "Chine",
    "Xi'an": "Xi'an",
    "Bogura": "Bogura",
    "Colony Chokforid Road, Bogura, Bangladesh": "Colony Chokforid Road, Bogura, Bangladesh",
    "Haitianyuan 3, Chang'an Campus, Northwestern Polytechnical University, Xi'an, Shaanxi": "Haitianyuan 3, campus de Chang'an, Northwestern Polytechnical University, Xi'an, Shaanxi",
    "Legal": "Juridique",
    "Privacy Policy": "Politique de confidentialité",
    "Terms & Conditions": "Conditions générales",
    "Refund & Return Policy": "Politique de remboursement",
    "How Hurfi handles the information you share.": "Comment Hurfi traite les informations que vous partagez.",
    "Updated 15 October 2026": "Mis à jour le 15 octobre 2026",
    "Who this covers": "Qui est concerné",
    "Hurfi collects information when you write to us, book a conversation, or send the inquiry form on this site.": "Hurfi collecte des informations lorsque vous nous écrivez, réservez un échange ou envoyez le formulaire de ce site.",
    "What we collect": "Ce que nous collectons",
    "Name.": "Nom.",
    "So we know who to reply to.": "Pour savoir à qui répondre.",
    "Business email, WhatsApp number, and WeChat ID.": "E-mail professionnel, numéro WhatsApp et identifiant WeChat.",
    "So we can reach you the way you prefer. Share a number or WeChat ID only if you want to.": "Pour vous joindre comme vous le préférez. Un numéro ou un identifiant WeChat n’est utile que si vous voulez le donner.",
    "Company name, service, budget, and project details.": "Nom de l’entreprise, service, budget et détails du projet.",
    "So we understand the work.": "Pour comprendre le travail à faire.",
    "Language choice.": "Choix de langue.",
    "Stored in this browser only, so the site opens in the same language next time.": "Enregistré seulement dans ce navigateur, pour rouvrir le site dans la même langue.",
    "Why we collect it": "Pourquoi nous les collectons",
    "We use this information to reply to you, prepare a proposal, and do the work you ask Hurfi to do.": "Nous utilisons ces informations pour vous répondre, préparer une proposition et faire le travail que vous confiez à Hurfi.",
    "Hurfi does not sell personal information.": "Hurfi ne vend pas les informations personnelles.",
    "Where it is handled": "Où elles sont traitées",
    "Hurfi works from Bogura in Bangladesh and Xi'an in China. Information you send may be read by the team in both places.": "Hurfi travaille depuis Bogura, au Bangladesh, et Xi'an, en Chine. Les informations que vous envoyez peuvent être lues par l’équipe des deux côtés.",
    "If you are in China, this notice tells you that your information may leave mainland China so the team in Bangladesh can work on your project.": "Si vous êtes en Chine, cet avis indique que vos informations peuvent quitter la Chine continentale afin que l’équipe au Bangladesh puisse travailler sur votre projet.",
    "How long we keep it": "Combien de temps nous les gardons",
    "We keep inquiry and project details while we are working together or still in conversation. When they are no longer needed, we delete them.": "Nous gardons les détails de la demande et du projet pendant la collaboration ou tant que la conversation continue. Lorsqu’ils ne sont plus nécessaires, nous les supprimons.",
    "Your choices": "Vos choix",
    "You can ask Hurfi to show you the information we hold, correct it, or delete it. You can also tell us to stop using it.": "Vous pouvez demander à Hurfi de vous montrer les informations que nous détenons, de les corriger ou de les supprimer. Vous pouvez aussi nous demander d’arrêter de les utiliser.",
    "Email yasir@hurfi.com and we will respond.": "Écrivez à yasir@hurfi.com et nous répondrons.",
    "The terms for using this site and starting work with Hurfi.": "Les conditions d’utilisation de ce site et pour commencer un travail avec Hurfi.",
    "Using the site": "Utiliser le site",
    "You can browse Hurfi and send an inquiry. Please send accurate information about your business.": "Vous pouvez parcourir Hurfi et envoyer une demande. Merci d’envoyer des informations exactes sur votre activité.",
    "Starting a project": "Démarrer un projet",
    "A project begins when Hurfi and you agree the scope in writing. That written scope is the list of work both sides are counting on.": "Un projet commence lorsque Hurfi et vous convenez du périmètre par écrit. Ce périmètre écrit est la liste du travail sur lequel les deux parties comptent.",
    "What Hurfi does not promise": "Ce que Hurfi ne promet pas",
    "Hurfi does not promise a specific search ranking, a fixed number of inquiries, or a sales result. The work is the website, search, campaigns, and content described in the scope.": "Hurfi ne promet pas un classement précis, un nombre fixe de demandes, ni un résultat de vente. Le travail est le site, la recherche, les campagnes et le contenu décrits dans le périmètre.",
    "Your part": "Votre part",
    "You provide the materials and feedback the scope needs, in reasonable time. Delays on your side move the schedule.": "Vous fournissez les éléments et les retours dont le périmètre a besoin, dans un délai raisonnable. Un retard de votre côté décale le calendrier.",
    "The finished work": "Le travail terminé",
    "After the agreed payment, the finished deliverables in the scope are yours to use for your business.": "Après le paiement convenu, les livrables terminés du périmètre sont à vous pour votre activité.",
    "Hurfi may show the finished work in its portfolio unless you say in writing that it should stay private.": "Hurfi peut montrer le travail terminé dans son portfolio, sauf si vous demandez par écrit qu’il reste privé.",
    "If two documents disagree": "Si deux documents ne concordent pas",
    "If these terms and a written proposal do not match, the written proposal applies to that project.": "Si ces conditions et une proposition écrite ne concordent pas, la proposition écrite s’applique à ce projet.",
    "Questions about these terms go to yasir@hurfi.com.": "Les questions sur ces conditions vont à yasir@hurfi.com.",
    "When an advance is returned, and when it is not.": "Quand un acompte est rendu, et quand il ne l’est pas.",
    "Hurfi does return an advance if you are not satisfied with the work.": "Hurfi rend un acompte si le travail ne vous convient pas.",
    "Once 60% of the agreed scope is complete, that advance is not returned.": "Une fois 60 % du périmètre convenu terminé, cet acompte n’est pas rendu.",
    "When an advance comes back": "Quand un acompte est rendu",
    "If you have paid an advance and you are not satisfied with the work, Hurfi returns that advance, as long as the agreed scope is still under 60% complete.": "Si vous avez payé un acompte et que le travail ne vous convient pas, Hurfi le rend, tant que le périmètre convenu est encore sous les 60 % terminés.",
    "When it does not": "Quand il ne l’est pas",
    "Once 60% of the agreed scope is complete, that advance is not returned. The work already done stays with you.": "Une fois 60 % du périmètre convenu terminé, cet acompte n’est pas rendu. Le travail déjà fait reste le vôtre.",
    "The 60% is counted from the work written in the scope. It is not counted from the number of days since the project started.": "Ces 60 % se comptent sur le travail écrit dans le périmètre. Ils ne se comptent pas sur le nombre de jours depuis le début du projet.",
    "How to ask": "Comment demander",
    "Email yasir@hurfi.com with the project name.": "Écrivez à yasir@hurfi.com avec le nom du projet.",
    "Hurfi will tell you how much of the scope is complete.": "Hurfi vous dira quelle part du périmètre est terminée.",
    "If the work is still under 60%, Hurfi returns the eligible advance by the same method you used to pay.": "Si le travail est encore sous 60 %, Hurfi rend l’acompte concerné par le même moyen que votre paiement.",
    "A later written proposal can set a different payment schedule. If it does, that proposal applies to that project.": "Une proposition écrite ultérieure peut prévoir un autre calendrier de paiement. Dans ce cas, cette proposition s’applique à ce projet.",
    "Privacy Policy | Hurfi": "Politique de confidentialité | Hurfi",
    "Terms & Conditions | Hurfi": "Conditions générales | Hurfi",
    "Refund & Return Policy | Hurfi": "Politique de remboursement | Hurfi",
    "This page covers visitors to this site and the people who contact Hurfi about a project.": "Cette page concerne les visiteurs de ce site et les personnes qui contactent Hurfi au sujet d’un projet.",
    "We collect only what you choose to send, and what this browser stores for the language switch.": "Nous ne collectons que ce que vous choisissez d’envoyer, et ce que ce navigateur garde pour le choix de langue.",
    "Your name, so we know who to reply to.": "Votre nom, pour savoir à qui répondre.",
    "A business email, and a WhatsApp number or WeChat ID if you choose to share one.": "Un e-mail professionnel, et un numéro WhatsApp ou un identifiant WeChat si vous choisissez d’en donner un.",
    "Your company name, the service you are asking about, your budget range, and the project details you write.": "Le nom de votre entreprise, le service demandé, votre fourchette de budget et les détails du projet que vous écrivez.",
    "Messages you later send by email, WeChat, or WhatsApp about the same project.": "Les messages que vous envoyez ensuite par e-mail, WeChat ou WhatsApp au sujet du même projet.",
    "What this site does not ask for": "Ce que ce site ne demande pas",
    "This site does not ask for an identity number, a bank password, or a card number.": "Ce site ne demande pas de numéro d’identité, de mot de passe bancaire, ni de numéro de carte.",
    "Hurfi does not buy contact lists. The details we hold are the ones you send us.": "Hurfi n’achète pas de listes de contacts. Les détails que nous gardons sont ceux que vous nous envoyez.",
    "Why we use it": "Pourquoi nous les utilisons",
    "We also use it to tell you how much of an agreed scope is complete, if you ask about a payment.": "Nous les utilisons aussi pour vous dire quelle part d’un périmètre convenu est terminée, si vous posez une question sur un paiement.",
    "We do not use your details to send unrelated promotions.": "Nous n’utilisons pas vos détails pour envoyer des promotions sans lien.",
    "Where the team reads it": "Où l’équipe les lit",
    "The host of this website receives the form so the message can reach Hurfi.": "L’hébergeur de ce site reçoit le formulaire afin que le message puisse arriver à Hurfi.",
    "After that, only the people at Hurfi who are replying to you or doing the project read it.": "Ensuite, seules les personnes de Hurfi qui vous répondent ou qui font le projet le lisent.",
    "A project file can stay while you are still a client, or while Hurfi needs it to answer a question about that project.": "Un dossier de projet peut rester tant que vous êtes client, ou tant que Hurfi en a besoin pour répondre à une question sur ce projet.",
    "If you are in China, you can also ask for an explanation of these rules, and you can withdraw a choice you made earlier.": "Si vous êtes en Chine, vous pouvez aussi demander une explication de ces règles, et retirer un choix fait plus tôt.",
    "Asking us to delete a project file does not cancel a written scope. The project terms stay in that document.": "Demander la suppression d’un dossier n’annule pas un périmètre écrit. Les conditions du projet restent dans ce document.",
    "If this page changes": "Si cette page change",
    "When this page changes, the date at the top changes with it.": "Quand cette page change, la date en haut change avec elle.",
    "The rules for a project already agreed in writing stay the ones in that written proposal.": "Les règles d’un projet déjà convenu par écrit restent celles de cette proposition écrite.",
    "Do not send content you do not have the right to share.": "N’envoyez pas un contenu que vous n’avez pas le droit de partager.",
    "An inquiry is not a project yet": "Une demande n’est pas encore un projet",
    "Sending the form, a WeChat message, or an email does not start the work.": "Envoyer le formulaire, un message WeChat ou un e-mail ne lance pas le travail.",
    "Hurfi will reply with questions or a proposal. Nothing is booked until both sides agree the next step in writing.": "Hurfi répond avec des questions ou une proposition. Rien n’est réservé tant que les deux parties n’ont pas convenu de l’étape suivante par écrit.",
    "The written scope": "Le périmètre écrit",
    "The list can include a website, search, campaigns, content, or consulting. Only the items written down are part of the project.": "La liste peut inclure un site, la recherche, des campagnes, du contenu ou du conseil. Seuls les éléments écrits font partie du projet.",
    "Changes to the scope": "Changements du périmètre",
    "If you want work that is not on that list, Hurfi and you agree the extra work in writing before it starts.": "Si vous voulez un travail qui n’est pas sur cette liste, Hurfi et vous convenez du travail en plus par écrit avant qu’il commence.",
    "A change can also change the time and the payment. The new writing replaces the old list for the items it names.": "Un changement peut aussi changer le délai et le paiement. Le nouvel écrit remplace l’ancienne liste pour les éléments qu’il nomme.",
    "Payment": "Paiement",
    "Hurfi tells you the payment in the written proposal.": "Hurfi indique le paiement dans la proposition écrite.",
    "An advance, when there is one, follows the Refund & Return Policy unless a later written proposal says otherwise.": "Un acompte, lorsqu’il y en a un, suit la politique de remboursement, sauf si une proposition écrite ultérieure dit autre chose.",
    "Screenshots, examples, and past projects on this site show earlier work. They are not a promise that your project will look the same or produce the same result.": "Les captures, exemples et projets passés de ce site montrent un travail antérieur. Ils ne promettent pas que votre projet aura le même aspect ou le même résultat.",
    "You make sure Hurfi may use the logos, photos, product facts, and accounts you share.": "Vous vous assurez que Hurfi peut utiliser les logos, photos, informations produit et comptes que vous partagez.",
    "If the scope needs access to a domain, a site, or an ad account, you provide that access or name a person who can.": "Si le périmètre exige l’accès à un domaine, un site ou un compte publicitaire, vous fournissez cet accès ou nommez une personne qui le peut.",
    "Hurfi keeps the right to reuse its own methods, layouts that were not made only for you, and general know-how.": "Hurfi garde le droit de réutiliser ses propres méthodes, des mises en page qui n’ont pas été faites seulement pour vous, et son savoir-faire général.",
    "Stopping early": "Arrêter plus tôt",
    "You can ask to stop. Hurfi will say how much of the written scope is already complete.": "Vous pouvez demander d’arrêter. Hurfi dira quelle part du périmètre écrit est déjà terminée.",
    "If that share is still under 60%, the advance follows the Refund & Return Policy.": "Si cette part est encore sous 60 %, l’acompte suit la politique de remboursement.",
    "Once 60% of the agreed scope is complete, the advance is not returned, and the work already done stays with you.": "Une fois 60 % du périmètre convenu terminé, l’acompte n’est pas rendu, et le travail déjà fait reste le vôtre.",
    "You can say the direction is wrong, the draft does not match the written scope, or you do not want to continue. While the scope is under 60%, Hurfi returns the advance.": "Vous pouvez dire que la direction ne convient pas, que l’ébauche ne correspond pas au périmètre écrit, ou que vous ne voulez pas continuer. Tant que le périmètre est sous 60 %, Hurfi rend l’acompte.",
    "Hurfi does not ask you to send finished work back.": "Hurfi ne vous demande pas de renvoyer le travail déjà terminé.",
    "How the 60% is counted": "Comment les 60 % sont comptés",
    "Hurfi looks at the written list. The share is how much of that list is done, not how many weeks have passed.": "Hurfi regarde la liste écrite. La part est ce qui est fait dans cette liste, pas le nombre de semaines écoulées.",
    "Hurfi writes down that share when you ask. The return decision uses that note.": "Hurfi note cette part par écrit quand vous le demandez. La décision de remboursement s’appuie sur cette note.",
    "Say what you are not satisfied with, and the name used on the proposal.": "Dites ce qui ne vous convient pas, et le nom utilisé sur la proposition.",
    "Hurfi confirms the percentage before the return is sent.": "Hurfi confirme le pourcentage avant d’envoyer le remboursement.",
    "If a later proposal says otherwise": "Si une proposition ultérieure dit autre chose",
    "This page is the rule when the proposal does not set a different one.": "Cette page est la règle lorsque la proposition n’en fixe pas une autre.",
    "What this policy is not": "Ce que cette politique n’est pas",
    "This policy does not refund a result the scope never promised, such as a search ranking, a fixed number of inquiries, or a sales total.": "Cette politique ne rembourse pas un résultat que le périmètre n’a jamais promis, comme un classement, un nombre fixe de demandes ou un total de ventes.",
    "Work that was never in the written scope is a new agreement. It is not a reason to return an advance on the original list.": "Un travail qui n’a jamais figuré dans le périmètre écrit est un nouvel accord. Ce n’est pas une raison de rendre un acompte sur la liste d’origine.",
    "The team": "L’équipe",
    "Who leads the work": "Qui mène le travail",
    "Head of Strategy & Consulting": "Responsable stratégie et conseil",
    "Head of Digital Marketing": "Responsable du marketing digital",
    "Creative Director": "Directeur de création",
    "Head of SEO & Organic Growth": "Responsable SEO et croissance organique",
    "Lead Software Developer": "Développeur logiciel principal",
    "Head of AI & Innovation": "Responsable IA et innovation",
    "Department Teams": "Équipes des départements",
    "Designers": "Designers",
    "Marketers": "Marketing",
    "Developers": "Développeurs",
    "SEO Specialists": "Spécialistes SEO",
    "AI & Technical Support": "Support IA et technique",
    "Find Hurfi": "Trouver Hurfi",
    "Offices, WeChat, and social.": "Bureaux, WeChat et réseaux.",
    "Studio": "Studio",
    "A factory-side team.": "Une équipe du côté de l’usine.",
    "From Bogura and Xi'an, Hurfi turns a manufacturer's capability into a site, a search presence, and a clear way for a buyer to write.": "Depuis Bogura et Xi'an, Hurfi transforme la capacité d’un fabricant en site, en présence dans la recherche, et en un moyen clair pour qu’un acheteur écrive.",
    "Sets the brief, the scope, and the direction before the work starts.": "Fixe le brief, le périmètre et la direction avant que le travail commence.",
    "Plans the campaigns that put the factory in front of buyers.": "Prépare les campagnes qui mettent l’usine devant les acheteurs.",
    "Directs the look of the site, the posts, and the brand.": "Dirige le look du site, des posts et de la marque.",
    "Builds the search path so buyers can find the factory.": "Construit le chemin de recherche pour que les acheteurs trouvent l’usine.",
    "Leads the websites and the software behind them.": "Mène les sites et le logiciel qui les porte.",
    "Brings AI and new technical ideas into the work.": "Apporte l’IA et de nouvelles idées techniques dans le travail.",
    "The China-side contact for clients, on WeChat and by phone.": "Le contact côté Chine pour les clients, sur WeChat et par téléphone.",
    "From the feed": "Depuis le fil",
    "Posts we put in public.": "Les posts que nous publions.",
    "Previous posts": "Posts précédents",
    "Next posts": "Posts suivants",
    "Hurfi post about buyers finding a factory": "Post Hurfi : des acheteurs trouvent une usine",
    "Hurfi post about entering the global market": "Post Hurfi : entrer sur le marché mondial",
    "Hurfi post about a factory the world can find": "Post Hurfi : une usine que le monde peut trouver",
    "Hurfi post about building a global brand": "Post Hurfi : construire une marque mondiale",
    "Hurfi post about who we are": "Post Hurfi : qui nous sommes",
    "Hurfi post about visibility": "Post Hurfi : la visibilité",
    "Hurfi post": "Post Hurfi",
    "Hurfi campaign post": "Post de campagne Hurfi",
    "Email": "E-mail",
    "B2B Website Design": "Conception de sites B2B",
    "Corporate Websites for Chinese companies": "Sites d’entreprise pour les sociétés chinoises",
    "Product Showcase Websites": "Sites vitrine produits",
    "Landing Pages": "Pages d’atterrissage",
    "Conversion Optimization": "Optimisation de la conversion",
    "On-page SEO": "SEO on-page",
    "Local SEO": "SEO local",
    "International SEO": "SEO international",
    "Industry-based SEO for Chinese B2B markets": "SEO sectoriel pour les marchés B2B chinois",
    "Search Marketing": "Marketing de recherche",
    "Paid Advertising": "Publicité payante",
    "Lead Generation for Chinese manufacturers & suppliers": "Génération de demandes pour les fabricants et fournisseurs chinois",
    "Content Planning": "Planification de contenu",
    "Industry Content Creation for Chinese B2B markets": "Contenus sectoriels pour les marchés B2B chinois",
    "Brand Storytelling": "Récit de marque",
    "LinkedIn Management": "Gestion LinkedIn",
    "Social Media Growth": "Croissance sur les réseaux",
    "All rights reserved.": "Tous droits réservés.",
    "Back to top": "Haut de page",
    "WhatsApp": "WhatsApp",
    "Instagram": "Instagram",
    "LinkedIn": "LinkedIn",
    "About Hurfi": "À propos de Hurfi",
    "Hurfi is a B2B Growth & Digital Presence Partner helping Chinese manufacturers, suppliers, and B2B companies build trusted global brands online.": "Hurfi est un partenaire de croissance et de présence numérique qui aide les fabricants, fournisseurs et entreprises B2B chinois à construire une marque mondiale crédible.",
    "Who We Are": "Qui nous sommes",
    "Hurfi is a digital growth partner helping Chinese B2B businesses create strong online identities through websites, SEO, digital marketing, and social media management.": "Hurfi est un partenaire de croissance numérique qui aide les entreprises B2B chinoises à construire une identité en ligne par le site, le SEO, le marketing et les réseaux sociaux.",
    "Our Mission": "Notre mission",
    "Helping great products from Chinese manufacturers and suppliers become recognized global brands.": "Aider les bons produits des fabricants et fournisseurs chinois à devenir des marques reconnues dans le monde.",
    "Who We Help": "Qui nous aidons",
    "Chinese Manufacturers": "Fabricants chinois",
    "Chinese Suppliers": "Fournisseurs chinois",
    "Chinese Exporters": "Exportateurs chinois",
    "Chinese B2B Companies": "Entreprises B2B chinoises",
    "Why Choose Hurfi": "Pourquoi choisir Hurfi",
    "B2B & Chinese industry understanding": "Compréhension du B2B et de l’industrie chinoise",
    "Strategic approach (not one-off campaigns)": "Une approche stratégique, pas des campagnes isolées",
    "Long-term partnership mindset": "Un état d’esprit de partenariat durable",
    "Global market focus for Chinese companies": "Un focus marché mondial pour les entreprises chinoises",
    "End-to-end digital growth services designed for Chinese manufacturers, suppliers, and B2B companies that want global visibility and trust.": "Des services de croissance numérique, de bout en bout, pour les fabricants, fournisseurs et entreprises B2B chinois qui veulent être vus et crus dans le monde.",
    "Talk to Hurfi about growing your Chinese manufacturing, supplier, or B2B brand online.": "Parlez à Hurfi de la croissance en ligne de votre marque industrielle, fournisseur ou B2B chinoise.",
    "Business Inquiry": "Demande commerciale",
    "Name": "Nom",
    "Company Name": "Entreprise",
    "Industry": "Secteur",
    "e.g. Chinese manufacturing": "ex. fabrication en Chine",
    "Message": "Message",
    "Send Inquiry": "Envoyer",
    "Don\u2019t fill this out:": "Ne pas remplir :",
    "Book a Consultation": "Réserver une consultation",
    "Request Free Consultation": "Demander une consultation gratuite",
    "Thank you": "Merci",
    "Your message was received. Hurfi will follow up soon about growing your Chinese B2B digital presence.": "Votre message est bien reçu. Hurfi revient bientôt vers vous au sujet de votre présence B2B.",
    "404 — Page not found": "404 — Page introuvable",
    "That URL doesn\u2019t exist. Explore Hurfi services for Chinese manufacturers and suppliers, or book a consultation.": "Cette adresse n’existe pas. Découvrez les services Hurfi ou réservez une consultation.",
    "Projects": "Projets",
    "Work created for Chinese manufacturers, suppliers, and B2B companies — websites, SEO, marketing, and social presence.": "Des réalisations pour des fabricants, fournisseurs et entreprises B2B chinois — sites, SEO, marketing et présence sociale.",
    "Case Studies": "Études de cas",
    "Industries": "Secteurs",
    "Locations": "Régions",
    "Services": "Services",
    "What We Build": "Ce que nous construisons",
    "What We Offer": "Ce que nous proposons",
    "SEO Focus Areas": "Axes SEO",
    "Professional B2B websites that help Chinese manufacturers and suppliers showcase products, capabilities, and build buyer trust.": "Des sites B2B professionnels qui aident les fabricants et fournisseurs chinois à montrer leurs produits, leurs capacités et à inspirer confiance.",
    "Search visibility strategies that help Chinese manufacturers, suppliers, and exporters get found by global buyers.": "Des stratégies de visibilité pour que les fabricants, fournisseurs et exportateurs chinois soient trouvés par les acheteurs mondiaux.",
    "Campaigns that help Chinese B2B companies build awareness, attract buyers, and create real business opportunities.": "Des campagnes qui aident les entreprises B2B chinoises à se faire connaître, attirer des acheteurs et créer de vraies opportunités.",
    "Hurfi took the time to understand how we actually work, then shaped the site so buyers could see that clearly.": "Hurfi a pris le temps de comprendre comment nous travaillons, puis a façonné le site pour que les acheteurs le voient clairement.",
    "They listened before they designed. The result feels like us, and it is easier for people to understand what we offer.": "Ils ont écouté avant de concevoir. Le résultat nous ressemble, et l’offre est plus simple à comprendre.",
    "Straightforward and careful with the details. We always knew what was happening and why.": "Directs et attentifs aux détails. Nous savions toujours ce qui se passait, et pourquoi.",
    "A thoughtful partner. They explained the choices in plain language and delivered work we were comfortable sharing.": "Un partenaire attentif. Ils ont expliqué les choix simplement et livré un travail que nous sommes fiers de montrer.",
    "Organised without being rigid. The project kept moving, and there was still room for our feedback.": "Organisé sans être rigide. Le projet avançait, et il restait de la place pour nos retours.",
    "The pages finally explain the brand in a way that feels natural. Working with Hurfi was calm and clear.": "Les pages expliquent enfin la marque de façon naturelle. Travailler avec Hurfi a été calme et clair.",
    "They paid attention to how customers actually read the site, then made that path simpler.": "Ils ont regardé comment les clients lisent vraiment le site, puis ont simplifié ce parcours.",
    "Easy to reach, and the pages present the brand the way we hoped from the start.": "Faciles à joindre, et les pages présentent la marque comme nous l’espérions dès le début.",
    "Clear communication and careful craft. That made the whole engagement easier for our team.": "Une communication claire et un travail soigné. Cela a rendu la collaboration plus simple pour notre équipe.",
    "They treated the project like a partnership. We felt heard, and the finished work is something we are proud to share.": "Ils ont traité le projet comme un partenariat. Nous nous sommes sentis écoutés, et le résultat est quelque chose que nous sommes fiers de montrer.",
    "Hurfi made a complicated offer easier to follow. The structure is cleaner, and the tone still sounds like us.": "Hurfi a rendu une offre complexe plus facile à suivre. La structure est plus claire, et le ton reste le nôtre.",
    "Warm, practical, and on time. The new pages feel closer to how we talk about the product.": "Chaleureux, concret et dans les temps. Les nouvelles pages sont plus proches de la façon dont nous parlons du produit.",
    "Professional without feeling stiff. They kept the message precise and the process easy to follow.": "Professionnel sans être rigide. Le message reste précis et le processus facile à suivre.",
    "They understood the personality of the brand and kept it intact while making the site clearer.": "Ils ont compris la personnalité de la marque et l’ont gardée tout en rendant le site plus clair.",
    "Quiet, careful work. Visitors can now see what we do without hunting through the page.": "Un travail discret et soigné. Les visiteurs voient maintenant ce que nous faisons sans chercher dans la page.",
    "Hurfi handled a sensitive brand with restraint. The result is clear, and it still feels private and considered.": "Hurfi a traité une marque sensible avec retenue. Le résultat est clair, et il reste privé et réfléchi.",
    "The catalogue is easier to browse, and the writing on the site matches the care we put into the books.": "Le catalogue est plus simple à parcourir, et le texte du site reflète le soin que nous mettons dans les livres.",
    "Simple to work with. They asked the right questions and kept the brand looking like itself.": "Simples à travailler. Ils ont posé les bonnes questions et ont gardé la marque fidèle à elle-même.",
    "Families can find the right information faster. That was the brief, and Hurfi stayed with it.": "Les familles trouvent plus vite la bonne information. C’était la demande, et Hurfi s’y est tenu.",
    "A clean process and a site that finally matches the standard of the work we do.": "Un processus clair et un site qui correspond enfin au niveau de notre travail.",
    "They made a serious service feel approachable. The pages are clearer, and nothing important got lost.": "Ils ont rendu un service sérieux plus accessible. Les pages sont plus claires, et rien d’important n’a été perdu.",
    "Thoughtful from the first conversation. The site now explains the partnership in a way clients understand.": "Attentifs dès la première conversation. Le site explique maintenant le partenariat d’une façon que les clients comprennent.",
    "Steady communication across the project. The finished pages feel international without losing who we are.": "Une communication stable tout au long du projet. Les pages finies ont une dimension internationale sans perdre qui nous sommes.",
    "Direct, respectful, and precise. The new presence is something we are comfortable standing behind.": "Directs, respectueux et précis. La nouvelle présence est quelque chose que nous assumons.",
    "Hurfi presented the range with more clarity. Showrooms and buyers can see the offer without the clutter.": "Hurfi a présenté la gamme avec plus de clarté. Les showrooms et les acheteurs voient l’offre sans le désordre.",
    "They kept the energy of the brand and still made the site easy to use. That balance was exactly what we needed.": "Ils ont gardé l’énergie de la marque tout en rendant le site facile à utiliser. Cet équilibre était exactement ce qu’il nous fallait.",
    "The message is tighter, and the pages feel more trustworthy. Hurfi was patient with the details.": "Le message est plus net, et les pages inspirent davantage confiance. Hurfi a été patient sur les détails.",
    "Customers can see the service faster. The team was practical and easy to talk to.": "Les clients voient le service plus vite. L’équipe était concrète et facile à joindre.",
    "A clear brief, a clear result. The site now explains the product without extra noise.": "Un brief clair, un résultat clair. Le site explique maintenant le produit sans bruit inutile.",
    "They respected the visual identity and made the story around it easier to follow.": "Ils ont respecté l’identité visuelle et ont rendu l’histoire autour plus facile à suivre.",
    "Accurate, calm, and well organised. The site reads the way a professional practice should.": "Précis, calme et bien organisé. Le site se lit comme un cabinet professionnel doit le faire.",
    "Short feedback loops and careful execution. The pages feel finished, not rushed.": "Des retours rapides et une exécution soignée. Les pages semblent abouties, pas bâclées.",
    "Hurfi kept the brand sharp and made the offer easier for new visitors to grasp.": "Hurfi a gardé la marque nette et a rendu l’offre plus facile à saisir pour les nouveaux visiteurs.",
    "They handled a complex service with plain language. Clients can now see the next step.": "Ils ont traité un service complexe avec un langage simple. Les clients voient maintenant l’étape suivante.",
    "Focused and responsive. The new pages say what we do, then get out of the way.": "Concentrés et réactifs. Les nouvelles pages disent ce que nous faisons, puis laissent la place.",
    "The brand still feels warm, and the site is much easier to move through.": "La marque reste chaleureuse, et le site est bien plus simple à parcourir.",
    "A straightforward collaboration. The result looks like us, only clearer.": "Une collaboration directe. Le résultat nous ressemble, en plus clair.",
    "They matched the pace of the brand and still kept the details tight. We would work with them again.": "Ils ont suivi le rythme de la marque tout en gardant les détails serrés. Nous retravaillerions avec eux.",
    "A direct line to the team.": "Une ligne directe avec l’équipe.",
    "Reach the people who do the work.": "Joignez les personnes qui font le travail.",
    "Use the channel you already have open. The same team reads all of them.": "Utilisez le canal déjà ouvert. La même équipe lit tous les messages.",
    "Email Yasir": "Écrire à Yasir",
    "China desk": "Bureau Chine",
    "Bangladesh desk": "Bureau Bangladesh",
    "Write on WeChat or WhatsApp.": "Écrivez sur WeChat ou WhatsApp.",
    "What to include": "Quoi écrire",
    "A useful note names the factory, the buyer you want, and whether you need a site, search, campaigns, or content.": "Une note utile nomme l’usine, l’acheteur visé, et si vous avez besoin d’un site, de la recherche, de campagnes ou de contenu.",
    "Website, search, campaigns, content.": "Site, recherche, campagnes, contenu.",
    "Start with the service that matches the problem. The call can cover the rest.": "Commencez par le service qui correspond au problème. L’appel peut couvrir le reste.",
    "How a note is handled": "Comment une note est traitée",
    "It lands with the team.": "Elle arrive à l’équipe.",
    "Yasir reads strategy notes. Shahruk handles China-side WeChat and phone.": "Yasir lit les notes de stratégie. Shahruk gère WeChat et le téléphone côté Chine.",
    "You get a reply on the channel you chose.": "Vous recevez une réponse sur le canal choisi.",
    "WeChat, WhatsApp, or email. If the note needs a call, we send you to the booking page.": "WeChat, WhatsApp ou e-mail. Si la note demande un appel, nous vous envoyons vers la page de réservation.",
    "No ticket queue.": "Pas de file de tickets.",
    "A person answers. There is no automated success message until the form is actually received.": "Une personne répond. Aucun message de succès automatique tant que le formulaire n’est pas vraiment reçu.",
    "Which number should I call?": "Quel numéro appeler ?",
    "Use +86 17792239260 for the China desk. The Bogura number is +8801925026696.": "Utilisez +86 17792239260 pour le bureau Chine. Le numéro de Bogura est +8801925026696.",
    "Can I write in Chinese?": "Puis-je écrire en chinois ?",
    "Yes. Chinese, English, or French. Shahruk is the China-side contact on WeChat and by phone.": "Oui. Chinois, anglais ou français. Shahruk est le contact côté Chine, sur WeChat et par téléphone.",
    "Is this the same as booking a call?": "Est-ce la même chose que réserver un appel ?",
    "A message is for a direct note. A strategy call is booked on the consultation page, and it is free.": "Un message est une note directe. Un appel stratégique se réserve sur la page de consultation, et il est gratuit.",
    "Where are the offices?": "Où sont les bureaux ?",
    "Bogura, Bangladesh, and Xi'an, Shaanxi. The maps on this page mark both.": "Bogura, au Bangladesh, et Xi’an, au Shaanxi. Les cartes de cette page marquent les deux.",
    "Book the strategy call.": "Réservez l’appel stratégique.",
    "Thirty minutes on the factory, the buyer, and the next piece of work.": "Trente minutes sur l’usine, l’acheteur et le prochain travail.",
    "What the call is for": "À quoi sert l’appel",
    "A clear read of the current site and search presence.": "Une lecture claire du site actuel et de la présence dans la recherche.",
    "We look at what a buyer sees today, not a generic audit checklist.": "Nous regardons ce qu’un acheteur voit aujourd’hui, pas une liste d’audit générique.",
    "A scope you can act on.": "Un périmètre sur lequel agir.",
    "Website, SEO, campaigns, or content — named, not a bundle of everything.": "Site, SEO, campagnes ou contenu — nommé, pas un paquet de tout.",
    "The right person on the line.": "La bonne personne en ligne.",
    "Yasir leads the strategy. Shahruk joins when the conversation is on the China side.": "Yasir mène la stratégie. Shahruk se joint quand la conversation est côté Chine.",
    "No pitch deck.": "Pas de présentation commerciale.",
    "You leave with next steps. If it is not a fit, we say so.": "Vous repartez avec les prochaines étapes. Si ce n’est pas le bon cadre, nous le disons.",
    "How the booking works": "Comment la réservation se passe",
    "Send the form. We confirm on WeChat, WhatsApp, or email — whichever you pick.": "Envoyez le formulaire. Nous confirmons sur WeChat, WhatsApp ou e-mail — celui que vous choisissez.",
    "The call is about thirty minutes. Bring the site, if you have one, and the buyer you want.": "L’appel dure environ trente minutes. Apportez le site, si vous en avez un, et l’acheteur visé.",
    "You get a written direction: what to build, what to fix, and what can wait.": "Vous recevez une direction écrite : quoi construire, quoi corriger, et ce qui peut attendre.",
    "Who you will meet": "Qui vous rencontrerez",
    "What should I prepare?": "Que dois-je préparer ?",
    "Your site address, the product you want buyers to find, and the market you sell into. A rough budget helps, and Not Sure Yet is a real answer.": "L’adresse du site, le produit que les acheteurs doivent trouver, et le marché visé. Un budget approximatif aide, et « Pas encore sûr » est une vraie réponse.",
    "Do I have to be in China?": "Dois-je être en Chine ?",
    "No. The call is remote. The China desk is in Xi'an if you want WeChat or the +86 number.": "Non. L’appel est à distance. Le bureau Chine est à Xi’an si vous voulez WeChat ou le numéro +86.",
    "What happens after I send the form?": "Que se passe-t-il après l’envoi du formulaire ?",
    "We only show a success message after the form is received. If this page cannot confirm it, email yasir@hurfi.com.": "Nous n’affichons un succès qu’une fois le formulaire reçu. Si cette page ne peut pas le confirmer, écrivez à yasir@hurfi.com.",
    "The team sits in two places.": "L’équipe est dans deux lieux.",
    "The call is remote. These are the desks behind it.": "L’appel est à distance. Voici les bureaux derrière.",
    "Thirty minutes": "Trente minutes",
    "Yasir is on WeChat for the strategy conversation. WhatsApp and email reach the same team.": "Yasir est sur WeChat pour la conversation stratégique. WhatsApp et l’e-mail arrivent à la même équipe.",
    "Proof from the work.": "Des preuves tirées du travail.",
    "Screenshots of sites, search, and campaigns. What you see is a report from the work, not a promise for a new project.": "Des captures de sites, de recherche et de campagnes. Ce que vous voyez est un rapport du travail fait, pas une promesse pour un nouveau projet.",
    "Delivered website": "Site livré",
    "Search performance": "Performance de recherche",
    "Site health": "Santé du site",
    "Campaign reporting": "Rapport de campagne",
    "Messages and inquiries": "Messages et demandes",
    "Local profile": "Fiche locale",
    "How this work runs": "Comment ce travail se déroule",
    "Other services": "Autres services",
    "All Services": "Tous les services",
    "A buyer can see the product and the factory without a long hunt.": "Un acheteur voit le produit et l’usine sans longue recherche.",
    "The company, the capability, and the people, on one site.": "L’entreprise, la capacité et les personnes, sur un seul site.",
    "Products laid out so a buyer can compare and inquire.": "Des produits présentés pour qu’un acheteur compare et demande.",
    "One offer, one page, one way to write.": "Une offre, une page, une façon d’écrire.",
    "The path from a visit to a message is the thing we tighten.": "Nous resserrons le chemin entre une visite et un message.",
    "Map the buyer path.": "Tracer le parcours de l’acheteur.",
    "The pages show the product, the factory, and a clear way to inquire.": "Les pages montrent le produit, l’usine et une façon claire de demander.",
    "Build the pages.": "Construire les pages.",
    "Product, trust, and inquiry pages that work on a phone.": "Des pages produit, confiance et demande qui fonctionnent sur un téléphone.",
    "Check the build.": "Vérifier le site.",
    "Speed, health, and the path from a visit to a message.": "La vitesse, la santé, et le chemin d’une visite vers un message.",
    "What do you build?": "Que construisez-vous ?",
    "B2B sites, corporate sites, product showcases, landing pages, and conversion work for Chinese manufacturers and suppliers.": "Sites B2B, sites d’entreprise, vitrines produits, pages d’atterrissage et travail de conversion pour les fabricants et fournisseurs chinois.",
    "Will buyers be able to inquire?": "Les acheteurs pourront-ils demander ?",
    "Yes. The structure is built so a visit can become a message.": "Oui. La structure est faite pour qu’une visite devienne un message.",
    "Do you fix the technical side?": "Corrigez-vous le côté technique ?",
    "Yes. Site health and the pages a buyer opens are part of the build.": "Oui. La santé du site et les pages qu’un acheteur ouvre font partie du travail.",
    "The site can be crawled, and the health report stays visible.": "Le site peut être exploré, et le rapport de santé reste visible.",
    "Pages say what the factory makes, in the words buyers search.": "Les pages disent ce que l’usine fabrique, avec les mots que les acheteurs cherchent.",
    "The factory can be found in the places it actually serves.": "L’usine peut être trouvée là où elle travaille vraiment.",
    "Search for the markets outside the home country.": "La recherche pour les marchés hors du pays d’origine.",
    "The work follows how a buyer in that industry searches.": "Le travail suit la façon dont un acheteur de ce secteur cherche.",
    "Read the current search.": "Lire la recherche actuelle.",
    "We look at how buyers find the factory today, in Google and in AI answers.": "Nous regardons comment les acheteurs trouvent l’usine aujourd’hui, sur Google et dans les réponses IA.",
    "Fix what blocks a visit.": "Corriger ce qui bloque une visite.",
    "Technical issues, page content, and the markets the factory sells into.": "Les problèmes techniques, le contenu des pages, et les marchés visés.",
    "Show the report.": "Montrer le rapport.",
    "Clicks, impressions, and site health stay visible. We do not replace them with a slogan.": "Les clics, les impressions et la santé du site restent visibles. Nous ne les remplaçons pas par un slogan.",
    "Which search work is included?": "Quel travail de recherche est inclus ?",
    "Technical SEO, on-page SEO, local SEO, international SEO, and industry SEO for Chinese B2B markets.": "SEO technique, SEO on-page, SEO local, SEO international, et SEO sectoriel pour les marchés B2B chinois.",
    "How is SEO different from a new website?": "En quoi le SEO diffère-t-il d’un nouveau site ?",
    "A site is where buyers land. SEO is how they find it. Many factories need both.": "Un site est l’endroit où les acheteurs arrivent. Le SEO est la façon dont ils le trouvent. Beaucoup d’usines ont besoin des deux.",
    "Do you invent traffic numbers?": "Inventez-vous des chiffres de trafic ?",
    "No. The screenshots are reports. A new engagement starts from the site you have.": "Non. Les captures sont des rapports. Une nouvelle mission part du site que vous avez.",
    "Buyers who are already looking.": "Des acheteurs qui cherchent déjà.",
    "Pages and posts that explain the factory before the ad does.": "Des pages et des contenus qui expliquent l’usine avant la publicité.",
    "Campaigns aimed at inquiries, calls, and profile actions.": "Des campagnes visant les demandes, les appels et les actions sur la fiche.",
    "The report shows messages and purchases, not only reach.": "Le rapport montre les messages et les achats, pas seulement la portée.",
    "Set the campaign.": "Poser la campagne.",
    "Search, content, and paid work aimed at the buyer the factory wants.": "Recherche, contenu et paid, visés vers l’acheteur que l’usine veut.",
    "Send it to the right people.": "L’envoyer aux bonnes personnes.",
    "The point is inquiries, calls, and profile actions, not traffic for its own sake.": "Le but est les demandes, les appels et les actions sur la fiche, pas le trafic pour lui-même.",
    "Read the report.": "Lire le rapport.",
    "Campaigns, messages, and purchases are shown as they are.": "Les campagnes, les messages et les achats sont montrés tels qu’ils sont.",
    "What do the campaigns cover?": "Que couvrent les campagnes ?",
    "Search marketing, content, paid advertising, and lead generation for Chinese manufacturers and suppliers.": "Marketing de recherche, contenu, publicité payante et génération de demandes pour les fabricants et fournisseurs chinois.",
    "Is the Google Business Profile included?": "La fiche Google Business Profile est-elle incluse ?",
    "When the brief needs calls, chats, and direction requests, the profile is part of the work.": "Quand le brief demande des appels, des chats et des demandes d’itinéraire, la fiche fait partie du travail.",
    "Is this separate from SEO?": "Est-ce séparé du SEO ?",
    "Campaigns can run beside SEO. The call is where we say which one should lead.": "Les campagnes peuvent aller avec le SEO. L’appel est l’endroit où nous disons lequel doit mener.",
    "A calendar, not a pile of posts.": "Un calendrier, pas un tas de posts.",
    "Posts a buyer in the industry can trust.": "Des posts qu’un acheteur du secteur peut croire.",
    "The capability of the factory, said in public.": "La capacité de l’usine, dite en public.",
    "The network where B2B buyers already read.": "Le réseau où les acheteurs B2B lisent déjà.",
    "Publishing and replies on one plan.": "Publication et réponses sur un seul plan.",
    "Plan the content.": "Planifier le contenu.",
    "Write for the buyer.": "Écrire pour l’acheteur.",
    "Industry posts, brand stories, and LinkedIn, in the language the buyer reads.": "Contenus sectoriels, récits de marque et LinkedIn, dans la langue que l’acheteur lit.",
    "Keep the presence moving.": "Garder la présence en mouvement.",
    "What does social management include?": "Que comprend la gestion des réseaux ?",
    "Content planning, industry content for Chinese B2B markets, brand storytelling, LinkedIn, and growth.": "Planification, contenus sectoriels pour les marchés B2B chinois, récit de marque, LinkedIn et croissance.",
    "Is this only LinkedIn?": "Est-ce seulement LinkedIn ?",
    "LinkedIn is the core. The plan follows where the buyers already are.": "LinkedIn est le cœur. Le plan suit là où les acheteurs sont déjà.",
    "Who writes the posts?": "Qui écrit les posts ?",
    "Hurfi writes and plans them from the real capability of the factory. You approve the direction.": "Hurfi les écrit et les planifie à partir de la capacité réelle de l’usine. Vous validez la direction.",
    "Industries We Serve | Manufacturing & B2B Growth — Hurfi": "Secteurs que nous servons | Croissance industrie et B2B — Hurfi",
    "Digital growth for manufacturers and B2B suppliers — websites, search, positioning, and lead generation, with China-side coordination.": "Croissance numérique pour fabricants et fournisseurs B2B — sites, recherche, positionnement et demandes, avec une coordination côté Chine.",
    "Digital Growth Solutions for Modern Industries": "Solutions de croissance numérique pour les industries d’aujourd’hui",
    "Hurfi helps manufacturers and B2B suppliers get found by buyers, explain the product clearly, and open a real conversation.": "Hurfi aide les fabricants et les fournisseurs B2B à être trouvés, à expliquer le produit clairement, et à ouvrir une vraie conversation.",
    "Industry Categories": "Catégories d’industries",
    "Search the sectors. Each card opens that industry.": "Cherchez les secteurs. Chaque carte ouvre cette industrie.",
    "Search industries": "Chercher une industrie",
    "No industry matches that search.": "Aucune industrie ne correspond à cette recherche.",
    "Heavy manufacturing": "Industrie lourde",
    "Products and materials": "Produits et matières",
    "Technology and trade": "Technologie et commerce",
    "Featured Industries": "Industries en avant",
    "Priority industries, each with its own page.": "Industries prioritaires, chacune avec sa page.",
    "Industry Challenges": "Défis des industries",
    "The same three problems show up across these sectors.": "Les mêmes trois problèmes reviennent dans ces secteurs.",
    "Low visibility": "Faible visibilité",
    "The factory is real. Buyers searching the category still do not find it.": "L’usine est réelle. Les acheteurs qui cherchent la catégorie ne la trouvent toujours pas.",
    "Difficult product discovery": "Découverte produit difficile",
    "Specs, ranges, and capabilities are hard to find, so the buyer leaves.": "Specs, gammes et capacités sont difficiles à trouver, alors l’acheteur part.",
    "Limited international reach": "Portée internationale limitée",
    "The site and the language stop at the home market.": "Le site et la langue s’arrêtent au marché local.",
    "Our Solutions": "Nos solutions",
    "Four kinds of work, used together when the brief needs them.": "Quatre types de travail, utilisés ensemble quand le brief le demande.",
    "Digital positioning": "Positionnement numérique",
    "How the factory is described in public, before a buyer asks.": "Comment l’usine est décrite en public, avant qu’un acheteur demande.",
    "Lead generation": "Génération de demandes",
    "How We Work": "Comment nous travaillons",
    "Discovery": "Découverte",
    "The brief, the products, and the buyer.": "Le brief, les produits et l’acheteur.",
    "Research": "Recherche",
    "How that industry searches, and where the factory is missing.": "Comment cette industrie cherche, et où l’usine manque.",
    "Strategy": "Stratégie",
    "What to build, what to fix, and what to leave.": "Quoi construire, quoi corriger, et quoi laisser.",
    "Implementation": "Mise en œuvre",
    "The site, the search, and the public presence.": "Le site, la recherche et la présence publique.",
    "Optimisation": "Optimisation",
    "Read the report and adjust from what it shows.": "Lire le rapport et ajuster à partir de ce qu’il montre.",
    "Relevant Projects": "Projets pertinents",
    "Markets We Support": "Marchés que nous soutenons",
    "Languages, the buyer market, and a China-side contact when the brief needs one.": "Langues, marché acheteur, et un contact côté Chine quand le brief en a besoin.",
    "Languages": "Langues",
    "English, Simplified Chinese, and French. The page is written in the language the buyer reads.": "Anglais, chinois simplifié et français. La page est écrite dans la langue que l’acheteur lit.",
    "English": "Anglais",
    "Français": "Français",
    "Export markets": "Marchés d’export",
    "The work is for buyers outside the home market. We do not publish a country list we cannot stand behind.": "Le travail est pour des acheteurs hors du marché local. Nous ne publions pas une liste de pays que nous ne pouvons pas tenir.",
    "China-side coordination": "Coordination côté Chine",
    "Do you only work with manufacturers in China?": "Ne travaillez-vous qu’avec des fabricants en Chine ?",
    "The focus is Chinese manufacturers, suppliers, and exporters. The buyer can be anywhere those factories sell.": "Le focus est les fabricants, fournisseurs et exportateurs chinois. L’acheteur peut être partout où ces usines vendent.",
    "Can one company sit in more than one industry?": "Une entreprise peut-elle être dans plus d’une industrie ?",
    "Yes. A machinery exporter can use both pages. The call decides which brief leads.": "Oui. Un exportateur de machines peut utiliser les deux pages. L’appel décide quel brief mène.",
    "Will you promise rankings for our product keywords?": "Promettez-vous des positions pour nos mots-clés produit ?",
    "No. Search work starts from the site you have. The screenshots on this site are reports, not a guarantee.": "Non. Le travail de recherche part du site que vous avez. Les captures sur ce site sont des rapports, pas une garantie.",
    "How does the China-side contact work?": "Comment fonctionne le contact côté Chine ?",
    "Shahruk Karim Simanto is the China-side contact, on WeChat and by phone. Yasir leads the strategy call.": "Shahruk Karim Simanto est le contact côté Chine, sur WeChat et par téléphone. Yasir mène l’appel stratégie.",
    "What buyers look for.": "Ce que les acheteurs cherchent.",
    "How the work is set up.": "Comment le travail est posé.",
    "The same four kinds of work, set to this industry.": "Les mêmes quatre types de travail, réglés sur cette industrie.",
    "All industries": "Toutes les industries",
    "Manufacturing": "Fabrication",
    "Manufacturing | Hurfi": "Fabrication | Hurfi",
    "Digital presence for factories that sell parts, materials, and finished goods to other businesses.": "Présence numérique pour les usines qui vendent pièces, matières et produits finis à d’autres entreprises.",
    "Process and capacity": "Processus et capacité",
    "Buyers want the process, the capacity, and the products, stated plainly.": "Les acheteurs veulent le processus, la capacité et les produits, dits simplement.",
    "A range they can scan": "Une gamme qu’ils peuvent parcourir",
    "The catalog should be findable. A buried PDF is not a catalog.": "Le catalogue doit se trouver. Un PDF caché n’est pas un catalogue.",
    "A way to start": "Une façon de commencer",
    "Inquiry, WeChat, or a clear next step. The page should not end in silence.": "Demande, WeChat, ou une prochaine étape claire. La page ne doit pas finir dans le silence.",
    "Does the page need every product on day one?": "La page doit-elle montrer chaque produit dès le premier jour ?",
    "No. Start with the ranges buyers ask for. The catalog can grow after the structure is right.": "Non. Commencez par les gammes que les acheteurs demandent. Le catalogue peut grandir quand la structure est juste.",
    "Industrial Suppliers": "Fournisseurs industriels",
    "Industrial Suppliers | Hurfi": "Fournisseurs industriels | Hurfi",
    "A clear catalog for suppliers whose buyers compare more than one factory.": "Un catalogue clair pour les fournisseurs dont les acheteurs comparent plusieurs usines.",
    "The comparison": "La comparaison",
    "Buyers line factories up. Capability and range should be easy to compare.": "Les acheteurs alignent les usines. La capacité et la gamme doivent être faciles à comparer.",
    "Proof of supply": "Preuve de fourniture",
    "What you make, what you can repeat, and how a buyer asks.": "Ce que vous faites, ce que vous pouvez répéter, et comment un acheteur demande.",
    "Trust before the call": "La confiance avant l’appel",
    "The page has to answer the first questions, so the call is about the order.": "La page doit répondre aux premières questions, pour que l’appel parle de la commande.",
    "Our buyers compare several factories. What should the site show first?": "Nos acheteurs comparent plusieurs usines. Que doit montrer le site en premier ?",
    "Capability, the range, and a way to inquire. A slogan does not help that comparison.": "La capacité, la gamme, et un moyen de demander. Un slogan n’aide pas cette comparaison.",
    "Electronics": "Électronique",
    "Electronics | Hurfi": "Électronique | Hurfi",
    "Product discovery for electronics factories, from components to finished devices.": "Découverte produit pour les usines d’électronique, des composants aux appareils finis.",
    "Families, then parts": "Familles, puis pièces",
    "Group the range the way a buyer searches, not the way the warehouse is labeled.": "Groupez la gamme comme un acheteur cherche, pas comme l’entrepôt est étiqueté.",
    "Spec in the open": "La spec au grand jour",
    "The spec a buyer compares should be on the page, not only in a file.": "La spec qu’un acheteur compare doit être sur la page, pas seulement dans un fichier.",
    "A serious next step": "Une prochaine étape sérieuse",
    "Component buyers do not want a shop cart. They want a way to ask.": "Les acheteurs de composants ne veulent pas un panier. Ils veulent un moyen de demander.",
    "We have too many SKUs to put on one page. What then?": "Nous avons trop de SKU pour une seule page. Que faire ?",
    "Group them the way a buyer searches: family, spec, then the product.": "Groupez-les comme un acheteur cherche : famille, spec, puis le produit.",
    "Machinery": "Machines",
    "Machinery | Hurfi": "Machines | Hurfi",
    "Sites and search for machinery makers whose buyers need specs before they inquire.": "Sites et recherche pour les fabricants de machines dont les acheteurs veulent les specs avant de demander.",
    "The machine, named": "La machine, nommée",
    "One page for the machine the buyer is trying to find.": "Une page pour la machine que l’acheteur cherche.",
    "Spec before story": "La spec avant le récit",
    "Capacity, size, and use come before the brand line.": "Capacité, taille et usage passent avant la phrase de marque.",
    "A path to a quote": "Un chemin vers un devis",
    "The inquiry should say which machine, so the reply can be specific.": "La demande doit dire quelle machine, pour que la réponse soit précise.",
    "Buyers ask for specs before they talk. Where do those live?": "Les acheteurs demandent les specs avant de parler. Où vivent-elles ?",
    "On the page for that machine, in plain language, not only in a PDF buried on the site.": "Sur la page de cette machine, en langage clair, pas seulement dans un PDF enfoui sur le site.",
    "Textile": "Textile",
    "Textile | Hurfi": "Textile | Hurfi",
    "Presence for textile manufacturers selling to brands and wholesalers.": "Présence pour les fabricants textiles qui vendent aux marques et aux grossistes.",
    "Capability, not a shop": "La capacité, pas une boutique",
    "Trade buyers want fabric, process, and capacity. Not a consumer cart.": "Les acheteurs professionnels veulent le tissu, le processus et la capacité. Pas un panier grand public.",
    "The range": "La gamme",
    "Show the families a brand can actually source.": "Montrez les familles qu’une marque peut vraiment sourcer.",
    "How an order starts": "Comment une commande commence",
    "Minimums, process, and who to contact belong on the page.": "Minimums, processus et qui contacter appartiennent à la page.",
    "We sell to brands, not to the public. Should the site look like a shop?": "Nous vendons aux marques, pas au public. Le site doit-il ressembler à une boutique ?",
    "No. It should show capability, fabric, and how to start an order conversation.": "Non. Il doit montrer la capacité, le tissu, et comment ouvrir une conversation de commande.",
    "Export Businesses": "Entreprises d’export",
    "Export Businesses | Hurfi": "Entreprises d’export | Hurfi",
    "Reach for exporters who need buyers outside the home market to find them.": "Portée pour les exportateurs dont les acheteurs hors du marché local doivent les trouver.",
    "The buyer’s language": "La langue de l’acheteur",
    "The page is written in the language the buyer reads.": "La page est écrite dans la langue que l’acheteur lit.",
    "What you can ship": "Ce que vous pouvez expédier",
    "Products, capacity, and the markets you already serve, said plainly.": "Produits, capacité, et les marchés que vous servez déjà, dits simplement.",
    "A contact that answers": "Un contact qui répond",
    "An export inquiry needs a person, not a dead form.": "Une demande d’export a besoin d’une personne, pas d’un formulaire mort.",
    "Our buyers are not in China. Does the site still start from the factory?": "Nos acheteurs ne sont pas en Chine. Le site part-il quand même de l’usine ?",
    "Yes. The factory is the proof. The language and the search follow the buyer.": "Oui. L’usine est la preuve. La langue et la recherche suivent l’acheteur.",
    "OEM and ODM": "OEM et ODM",
    "OEM and ODM | Hurfi": "OEM et ODM | Hurfi",
    "Positioning for factories that build for other brands.": "Positionnement pour les usines qui fabriquent pour d’autres marques.",
    "The factory, not the label": "L’usine, pas l’étiquette",
    "Buyers are checking who builds the product, before they send a brief.": "Les acheteurs vérifient qui fabrique, avant d’envoyer un brief.",
    "What you can develop": "Ce que vous pouvez développer",
    "OEM and ODM are different offers. The page should say which one you do.": "OEM et ODM sont deux offres différentes. La page doit dire laquelle vous faites.",
    "A private conversation": "Une conversation privée",
    "The public page earns the brief. The detail can stay off the public page.": "La page publique mérite le brief. Le détail peut rester hors de la page publique.",
    "We build for other brands. Do we still need our own site?": "Nous fabriquons pour d’autres marques. Avons-nous encore besoin de notre site ?",
    "Yes. Buyers check the factory before they send a private-label brief.": "Oui. Les acheteurs vérifient l’usine avant d’envoyer un brief de marque propre.",
    "Packaging": "Emballage",
    "Packaging | Hurfi": "Emballage | Hurfi",
    "Pages for packaging makers whose buyers search by material and use.": "Pages pour les fabricants d’emballage dont les acheteurs cherchent par matière et par usage.",
    "Material first": "La matière d’abord",
    "Buyers search the material. The page title should match that search.": "Les acheteurs cherchent la matière. Le titre de page doit coller à cette recherche.",
    "Use, not only product": "L’usage, pas seulement le produit",
    "Say what the packaging is for, so the right buyer recognises it.": "Dites à quoi sert l’emballage, pour que le bon acheteur le reconnaisse.",
    "What the line can do": "Ce que la ligne peut faire",
    "Sizes, finishes, and capacity, in one place.": "Tailles, finitions et capacité, au même endroit.",
    "Buyers search by material. Should the pages follow that?": "Les acheteurs cherchent par matière. Les pages doivent-elles suivre ?",
    "Yes. Material, use, and what the factory can produce belong in the page.": "Oui. Matière, usage, et ce que l’usine peut produire appartiennent à la page.",
    "Automotive Parts": "Pièces automobiles",
    "Automotive Parts | Hurfi": "Pièces automobiles | Hurfi",
    "Search and sites for parts makers whose buyers look up a component.": "Recherche et sites pour les fabricants de pièces dont les acheteurs cherchent un composant.",
    "The part name": "Le nom de la pièce",
    "Use the words a buyer types, next to the real part you make.": "Utilisez les mots qu’un acheteur tape, à côté de la pièce que vous faites vraiment.",
    "Fit and spec": "Ajustement et spec",
    "What it fits, and the spec, before the company story.": "Ce que cela équipe, et la spec, avant l’histoire de l’entreprise.",
    "A buyer who is technical": "Un acheteur technique",
    "The page should respect a procurement reader. Short, specific, sourced.": "La page doit respecter un lecteur achats. Court, précis, sourcé.",
    "A buyer searches a part name, not our company. Can the site match that?": "Un acheteur cherche un nom de pièce, pas notre société. Le site peut-il coller ?",
    "The pages should use the part language buyers type, next to the real capability.": "Les pages doivent utiliser le langage de pièce que les acheteurs tapent, à côté de la capacité réelle.",
    "Building Materials": "Matériaux de construction",
    "Building Materials | Hurfi": "Matériaux de construction | Hurfi",
    "Discovery for factories that supply materials to projects and distributors.": "Découverte pour les usines qui fournissent des matériaux aux projets et aux distributeurs.",
    "The material": "Le matériau",
    "Name it the way a contractor or a distributor searches.": "Nommez-le comme un entrepreneur ou un distributeur le cherche.",
    "Supply, not a brochure": "La fourniture, pas une brochure",
    "Lead times, range, and who the factory sells to.": "Délais, gamme, et à qui l’usine vend.",
    "Two kinds of buyer": "Deux sortes d’acheteurs",
    "A project and a distributor do not ask the same first question.": "Un projet et un distributeur ne posent pas la même première question.",
    "Projects and distributors ask different questions. One site?": "Projets et distributeurs posent des questions différentes. Un seul site ?",
    "One site, with pages that answer both: the material, and how supply works.": "Un site, avec des pages qui répondent aux deux : le matériau, et comment la fourniture se passe.",
    "Furniture": "Mobilier",
    "Furniture | Hurfi": "Mobilier | Hurfi",
    "Catalog-led sites for furniture makers selling to importers and trade buyers.": "Sites menés par le catalogue pour les fabricants de mobilier qui vendent aux importateurs et aux acheteurs professionnels.",
    "A catalog, not one hero": "Un catalogue, pas un seul hero",
    "Trade buyers want the range. One lifestyle photo is not the range.": "Les acheteurs professionnels veulent la gamme. Une photo de style n’est pas la gamme.",
    "Factory beside product": "L’usine à côté du produit",
    "Who makes it, and what the line can repeat.": "Qui le fabrique, et ce que la ligne peut répéter.",
    "Trade inquiry": "Demande professionnelle",
    "The next step is a conversation with a buyer, not a checkout.": "La prochaine étape est une conversation avec un acheteur, pas un paiement.",
    "Trade buyers want a range, not a single hero product. How should that look?": "Les acheteurs professionnels veulent une gamme, pas un seul produit hero. À quoi cela doit-il ressembler ?",
    "A catalog they can scan, with the factory capability beside it.": "Un catalogue qu’ils peuvent parcourir, avec la capacité de l’usine à côté.",
    "Lighting": "Éclairage",
    "Lighting | Hurfi": "Éclairage | Hurfi",
    "Ranges and search for lighting factories whose buyers compare specification and supply.": "Gammes et recherche pour les usines d’éclairage dont les acheteurs comparent specification et fourniture.",
    "The spec they compare": "La spec qu’ils comparent",
    "Put the specification a buyer checks on the product page.": "Mettez la specification qu’un acheteur vérifie sur la page produit.",
    "Indoor, outdoor, or component. Say which, so the wrong buyer leaves early.": "Intérieur, extérieur ou composant. Dites lequel, pour que le mauvais acheteur parte tôt.",
    "Supply after the spec": "La fourniture après la spec",
    "Once the spec matches, the buyer asks about supply. Answer that on the page.": "Quand la spec correspond, l’acheteur demande la fourniture. Répondez sur la page.",
    "Specification decides the order. What do we show?": "La specification décide la commande. Que montrons-nous ?",
    "The range, the spec a buyer compares, and who to contact.": "La gamme, la spec qu’un acheteur compare, et qui contacter.",
    "Search all 825 industries. Main sectors stay listed first.": "Cherchez les 825 industries. Les secteurs principaux restent listés en premier.",
    "Main sectors": "Secteurs principaux",
    "More sectors": "Autres secteurs",
    "Keep typing to narrow the list.": "Continuez à taper pour réduire la liste.",
    "Niches in this sector": "Niches de ce secteur",
    "These names are the cluster for this sector. A separate page is added only after the demand is checked.": "Ces noms sont le groupe de ce secteur. Une page séparée n’est ajoutée qu’après vérification de la demande.",
    "Hurfi helps manufacturers and suppliers in this sector get found, explain the product, and talk to buyers.": "Hurfi aide les fabricants et fournisseurs de ce secteur à être trouvés, à expliquer le produit et à parler aux acheteurs.",
    "Explore China Markets": "Explorer les marchés chinois",
    "Digital Growth Across China's Manufacturing Hubs": "Croissance numérique dans les pôles industriels de Chine",
    "Explore major industrial regions and manufacturing cities across China, and discover how Hurfi helps B2B businesses strengthen their digital presence.": "Explorez les grandes régions industrielles et les villes manufacturières de Chine, et voyez comment Hurfi aide les entreprises B2B à renforcer leur présence numérique.",
    "Explore Locations": "Explorer les lieux",
    "Discuss Your Growth Strategy": "Discuter de votre stratégie de croissance",
    "China Locations Search": "Recherche de lieux en Chine",
    "Search cities, provinces, or industries...": "Chercher une ville, une province ou une industrie...",
    "Hurfi does not publish local offices in these cities. The China-side contact is by WeChat and phone.": "Hurfi ne publie pas de bureaux locaux dans ces villes. Le contact côté Chine est sur WeChat et par téléphone.",
    "All provinces": "Toutes les provinces",
    "All industries": "Toutes les industries",
    "All regions": "Toutes les régions",
    "Province": "Province",
    "City": "Ville",
    "Industry": "Industrie",
    "Industrial Region": "Région industrielle",
    "No location matches that search.": "Aucun lieu ne correspond à cette recherche.",
    "Featured Manufacturing Cities": "Villes industrielles en avant",
    "Browse by Province": "Parcourir par province",
    "34 provincial-level entries. A division opens to the cities published for it. City landing pages are not published yet.": "34 entrées de niveau provincial. Une division s’ouvre sur les villes publiées. Les pages ville ne sont pas encore publiées.",
    "Provinces": "Provinces",
    "Autonomous Regions": "Régions autonomes",
    "Municipalities": "Municipalités",
    "Special Administrative Regions": "Régions administratives spéciales",
    "Separately administered": "Administré séparément",
    "No city is published for this division yet.": "Aucune ville n’est publiée pour cette division.",
    "Taiwan is listed as a separately administered territory. It is not mainland China coverage.": "Taïwan est listé comme un territoire administré séparément. Ce n’est pas la couverture de la Chine continentale.",
    "Hong Kong and Macao are Special Administrative Regions. No Hurfi office is published in either place.": "Hong Kong et Macao sont des régions administratives spéciales. Aucun bureau Hurfi n’y est publié.",
    "Major Industrial Regions": "Grandes régions industrielles",
    "Industries Across China": "Industries à travers la Chine",
    "A city can relate to more than one industry. These links use the industry pages that already exist.": "Une ville peut correspondre à plusieurs industries. Ces liens utilisent les pages industrie qui existent déjà.",
    "How Hurfi Supports Businesses": "Comment Hurfi aide les entreprises",
    "Featured projects": "Projets en avant",
    "China Client Relations": "Relations clients Chine",
    "Yasir leads the strategy conversation. Shahruk is the China-side contact, on WeChat and by phone.": "Yasir mène la conversation stratégique. Shahruk est le contact côté Chine, sur WeChat et par téléphone.",
    "Location questions": "Questions sur les lieux",
    "Do you have an office in every city listed?": "Avez-vous un bureau dans chaque ville listée ?",
    "No. The published China contact address is in Xi'an. The other cities are markets in this directory, not offices.": "Non. L’adresse de contact Chine publiée est à Xi'an. Les autres villes sont des marchés dans cet annuaire, pas des bureaux.",
    "Why is Taiwan listed separately?": "Pourquoi Taïwan est-il listé à part ?",
    "Can you work with a factory in a city that has no page yet?": "Pouvez-vous travailler avec une usine dans une ville qui n’a pas encore de page ?",
    "Yes. This directory is the map. A city page is added only when there is something specific to say.": "Oui. Cet annuaire est la carte. Une page ville n’est ajoutée que lorsqu’il y a quelque chose de précis à dire.",
    "Project Requirements": "Besoins du projet",
    "Enter the company name.": "Indiquez le nom de l’entreprise.",
    "Select a province": "Choisir une province",
    "Choose a province.": "Choisissez une province.",
    "Enter the city.": "Indiquez la ville.",
    "Enter the industry.": "Indiquez l’industrie.",
    "This is the published China contact address, not an office network.": "Ceci est l’adresse de contact Chine publiée, pas un réseau de bureaux.",
    "The published directory is China. City pages are added only when there is something specific to say.": "L’annuaire publié est la Chine. Une page ville n’est ajoutée que lorsqu’il y a quelque chose de précis à dire.",
    "Provincial divisions, manufacturing cities, and industrial regions. No local office is claimed unless one is published.": "Divisions provinciales, villes industrielles et régions. Aucun bureau local n’est affirmé s’il n’est pas publié.",
    "300 cities from the working directory. This is not every county or district, and it is not an office list.": "300 villes du répertoire de travail. Ce n’est pas chaque district, et ce n’est pas une liste de bureaux.",
    "Twelve manufacturing hubs are shown first. The other cities stay in the province lists. A city page is published only when there is something specific to say.": "Douze pôles industriels sont montrés en premier. Les autres villes restent dans les listes provinciales. Une page ville n’est publiée que lorsqu’il y a quelque chose de précis à dire.",
    "Research focus": "Axe de recherche",
    "Sector focus is not published for this city yet.": "Le secteur n’est pas encore publié pour cette ville.",
    "These groupings are editorial starting points from the directory. They are not verified claims for a new project.": "Ces regroupements sont des points de départ éditoriaux du répertoire. Ce ne sont pas des affirmations vérifiées pour un nouveau projet.",
    "Taiwan is listed to clarify the claimed province category. It is independently administered, and it is not represented as Hurfi coverage.": "Taïwan est listé pour clarifier la catégorie de province revendiquée. Il est administré séparément, et il n’est pas présenté comme une couverture Hurfi.",
    "Special administrative region. Separate rules apply, and no local office is claimed.": "Région administrative spéciale. Des règles distinctes s’appliquent, et aucun bureau local n’est affirmé.",
    "Reference directory. Not complete coverage of every county or district.": "Répertoire de référence. La couverture de chaque district n’est pas complète.",
    "Other page candidates": "Autres pages candidates",
    "These cities are marked for a future page. The page is not published yet.": "Ces villes sont marquées pour une page future. La page n’est pas publiée.",
    "Page candidate": "Page candidate",
    "34 provincial-level entries. Open a province to see its cities. No local office is claimed.": "34 entrées de niveau provincial. Ouvrez une province pour voir ses villes. Aucun bureau local n’est affirmé.",
    "Search a city, a province, or an industry. Hurfi works with B2B manufacturers in these markets.": "Cherchez une ville, une province ou un secteur. Hurfi travaille avec des fabricants B2B sur ces marchés.",
    "Twelve manufacturing hubs are listed first. Every other city stays in its province, with the industry named where the directory has one.": "Douze pôles industriels sont listés en premier. Les autres villes restent dans leur province, avec le secteur indiqué quand le répertoire en a un.",
    "More manufacturing cities": "Autres villes industrielles",
    "These cities are in the directory with the industries named beside them.": "Ces villes sont dans le répertoire, avec les secteurs indiqués à côté.",
    "Open a province to reach its manufacturing cities.": "Ouvrez une province pour atteindre ses villes industrielles.",
    "The industry is named beside each city in this list.": "Le secteur est indiqué à côté de chaque ville de cette liste.",
    "Hurfi helps the industries in these regions with B2B websites, SEO, and buyer inquiries.": "Hurfi aide les secteurs de ces régions avec des sites B2B, le SEO et les demandes d’acheteurs.",
    "Main industries": "Secteurs principaux",
    "Main locations": "Régions principales",
    "Industrial Automation & Robotics": "Automatisation industrielle et robotique",
    "Electronics & Semiconductor": "Électronique et semi-conducteurs",
    "EV & E-Mobility": "Véhicule électrique et e-mobilité",
    "Battery & Energy Storage": "Batterie et stockage d’énergie",
    "Power Grid & Electrical Equipment": "Réseau électrique et équipements",
    "Medical Devices & Diagnostics": "Dispositifs médicaux et diagnostic",
    "Laboratory & Scientific Equipment": "Équipement de laboratoire et scientifique",
    "Industrial Machinery & CNC": "Machines industrielles et CNC",
    "Industrial Software & Data": "Logiciel et données industriels",
    "Data Centers & Digital Infrastructure": "Centres de données et infrastructure numérique",
    "Optics & Photonics": "Optique et photonique",
    "Pharma & Bioprocess Manufacturing": "Fabrication pharma et bioprocédés",
    "This page drifted off.": "Cette page a disparu.",
    "The link does not match a Hurfi page. Head home, or contact us and say what you were looking for.": "Ce lien ne correspond à aucune page Hurfi. Rentrez à l’accueil, ou dites-nous ce que vous cherchiez.",
    "Back home": "Retour à l’accueil",
    "Contact Hurfi": "Contacter Hurfi",
    "Inquiry sent": "Demande envoyée",
    "Hurfi has your inquiry.": "Hurfi a votre demande.",
    "Your note is on its way. We follow up by WeChat, email, or WhatsApp, using the method you chose.": "Votre message est en route. Nous répondons par WeChat, e-mail ou WhatsApp, selon le moyen choisi.",
    "We read the note first.": "Nous lisons d’abord le message.",
    "The reply comes from Yasir, or from Shahruk when the work is on the China side.": "La réponse vient de Yasir, ou de Shahruk si le travail est côté Chine.",
    "Nothing starts until the brief is clear.": "Rien ne commence tant que le brief n’est pas clair.",
    "Explore services": "Voir les services",
    "We could not send this inquiry. Email yasir@hurfi.com and try again.": "L’envoi a échoué. Écrivez à yasir@hurfi.com, ou réessayez.",
    "Scope, timing, and the way we talk are agreed before the work begins.": "Le périmètre, le calendrier et le mode de contact sont convenus avant que le travail commence.",
    "How Hurfi works with you": "Comment Hurfi travaille avec vous",
    "Flexible payment plans. Pay monthly, quarterly, or annually, with no commitment and the option to cancel anytime.": "Paiement flexible. Au mois, au trimestre ou à l’année, sans engagement, et annulable à tout moment.",
    "Unlimited revisions, with the team reviewing the work together.": "Révisions illimitées, l’équipe revoit le travail ensemble.",
    "Lifetime support: ongoing updates, priority response handling, and 24/7 expert assistance.": "Support continu : mises à jour, réponse prioritaire, et assistance d’experts à toute heure.",
    "Hand-picked Hurfi specialists across strategy, marketing, SEO, AI, design, development, and China client relations.": "Spécialistes Hurfi choisis pour la stratégie, le marketing, le SEO, l’IA, le design, le développement et la relation client en Chine."
  };
  fr["Insights"] = "Analyses";
  fr["All insights"] = "Toutes les analyses";
  fr["Resources"] = "Ressources";
  fr["City guides"] = "Guides des villes";
  fr["All city guides"] = "Tous les guides des villes";
  fr["China directory"] = "Annuaire Chine";
  fr["All industries"] = "Tous les secteurs";
  fr["Overseas buyer inquiries"] = "Demandes d’acheteurs étrangers";
  fr["Factory website trust signals"] = "Signaux de confiance d’un site d’usine";
  fr["RFQ website checklist"] = "Liste de contrôle RFQ";
  fr["Industrial product page SEO"] = "SEO des pages produits industriels";
  fr["International SEO checklist"] = "Liste de contrôle SEO international";
  fr["AI search for manufacturers"] = "Recherche IA pour fabricants";
  fr["Google Ads for exporters"] = "Google Ads pour exportateurs";
  fr["LinkedIn for export sales"] = "LinkedIn pour la vente export";
  fr["Trade show follow-up"] = "Suivi après salon";
  fr["Export website speed"] = "Vitesse du site export";
  fr["Choosing an export agency"] = "Choisir une agence export";

  fr["Limited"] = "Limité";
  fr["Brand system"] = "Système de marque";
  fr["Brand Guidelines"] = "Charte de marque";
  fr["Download the logo files, copy a color, and see which typeface to use."] = "Téléchargez les logos, copiez une couleur, et voyez quelle police utiliser.";
  fr["Download all logos"] = "Télécharger tous les logos";
  fr["View on Behance"] = "Voir sur Behance";
  fr["Logos"] = "Logos";
  fr["Each file is separate. The zip contains every logo on this page."] = "Chaque fichier se télécharge seul. L’archive contient tous les logos de cette page.";
  fr["App icon"] = "Icône d’application";
  fr["The blue tile with the white mark. Use it for favicons, app icons, and avatars."] = "Le carré bleu avec le signe blanc. À utiliser pour le favicon, l’icône d’application et les avatars.";
  fr["Logo on light backgrounds"] = "Logo sur fond clair";
  fr["Black wordmark on a transparent background. Use this on white and light surfaces."] = "Nom en noir sur fond transparent. À utiliser sur le blanc et les surfaces claires.";
  fr["Logo on dark backgrounds"] = "Logo sur fond sombre";
  fr["White wordmark on a transparent background. Use this on dark and colorful surfaces."] = "Nom en blanc sur fond transparent. À utiliser sur les surfaces sombres ou colorées.";
  fr["White lockup"] = "Version blanche";
  fr["Large white wordmark for print and dark layouts."] = "Grand nom en blanc, pour l’impression et les mises en page sombres.";
  fr["How to use the logo"] = "Comment utiliser le logo";
  fr["The name"] = "Le nom";
  fr["Write the name as Hurfi, with a capital H."] = "Écrivez le nom Hurfi, avec un H majuscule.";
  fr["Leave it whole"] = "Le laisser entier";
  fr["Do not stretch, rotate, recolor, outline, or add a shadow to the mark."] = "Ne pas étirer, tourner, recolorer, contourer, ni ajouter d’ombre au signe.";
  fr["Match the ground"] = "Adapter au fond";
  fr["Do not place the black wordmark on a dark photo, or the white wordmark on a white page."] = "Ne placez pas le nom noir sur une photo sombre, ni le nom blanc sur une page blanche.";
  fr["Clear space"] = "Espace libre";
  fr["Leave clear space around the logo so it does not touch other text or the edge of a picture."] = "Laissez de l’espace autour du logo, pour qu’il ne touche ni le texte ni le bord d’une image.";
  fr["Colors"] = "Couleurs";
  fr["Click a swatch to copy the hex."] = "Cliquez sur une pastille pour copier le code hex.";
  fr["Hurfi Blue"] = "Bleu Hurfi";
  fr["The blue used on hurfi.com for links, buttons, and the header."] = "Le bleu utilisé sur hurfi.com pour les liens, les boutons et l’en-tête.";
  fr["Icon Blue"] = "Bleu de l’icône";
  fr["The flat blue in the app icon PNG. The SVG file uses #007AFE."] = "Le bleu plat du PNG de l’icône. Le fichier SVG utilise #007AFE.";
  fr["Palette Blue"] = "Bleu de la palette";
  fr["The first blue in the identity palette."] = "Le premier bleu de la palette d’identité.";
  fr["Growth Green"] = "Vert croissance";
  fr["The green beside blue in the identity palette."] = "Le vert à côté du bleu dans la palette d’identité.";
  fr["Sky"] = "Ciel";
  fr["Light blue from the brand palette."] = "Bleu clair de la palette.";
  fr["Mint"] = "Menthe";
  fr["Light green from the brand palette."] = "Vert clair de la palette.";
  fr["Black"] = "Noir";
  fr["The wordmark on light backgrounds."] = "La couleur du nom sur fond clair.";
  fr["White"] = "Blanc";
  fr["The wordmark on dark backgrounds."] = "La couleur du nom sur fond sombre.";
  fr["Copy"] = "Copier";
  fr["Typefaces"] = "Polices";
  fr["PolySans Neutral is the brand typeface. The website uses two Google Fonts."] = "PolySans Neutral est la police de la marque. Le site utilise deux Google Fonts.";
  fr["Brand typeface"] = "Police de la marque";
  fr["Used in the Hurfi identity. It is not on Google Fonts. This page does not include a font file."] = "Utilisée dans l’identité Hurfi. Elle n’est pas sur Google Fonts. Cette page ne contient pas de fichier de police.";
  fr["View at Gradient"] = "Voir chez Gradient";
  fr["Website text"] = "Texte du site";
  fr["The typeface used for text on hurfi.com."] = "La police du texte sur hurfi.com.";
  fr["Open on Google Fonts"] = "Ouvrir sur Google Fonts";
  fr["Copy CSS"] = "Copier le CSS";
  fr["Headlines"] = "Titres";
  fr["The italic typeface used for large headlines on hurfi.com."] = "La police italique des grands titres sur hurfi.com.";
  fr["Identity"] = "Identité";
  fr["The full identity system is on Behance."] = "Le système d’identité complet est sur Behance.";
  fr["Hurfi is a forward-driven digital agency built on speed, innovation, and strategic growth. Its identity merges bold design with functional clarity. Hurfi stands for momentum: measurable, scalable, and precise."] = "Hurfi est une agence digitale tournée vers la vitesse, l’innovation et la croissance. Son identité mêle un dessin affirmé et une clarté fonctionnelle. Hurfi signifie l’élan : mesurable, extensible et précis.";
  fr["Open the Hurfi identity on Behance"] = "Ouvrir l’identité Hurfi sur Behance";
  fr["Where can I download the Hurfi logo?"] = "Où télécharger le logo Hurfi ?";
  fr["On this page. Each logo has its own download, and Download all logos saves every file in one zip."] = "Sur cette page. Chaque logo a son téléchargement, et Télécharger tous les logos enregistre chaque fichier dans une archive.";
  fr["Which file should I use on a dark background?"] = "Quel fichier utiliser sur un fond sombre ?";
  fr["Use the white wordmark, Logo on dark backgrounds, or the white lockup."] = "Utilisez le nom en blanc : Logo sur fond sombre, ou la version blanche.";
  fr["What color is Hurfi blue?"] = "Quelle est la couleur du bleu Hurfi ?";
  fr["The website uses #0076F7. The app icon file uses #007AFF."] = "Le site utilise #0076F7. Le fichier de l’icône utilise #007AFF.";
  fr["What font does Hurfi use?"] = "Quelle police Hurfi utilise-t-il ?";
  fr["The brand typeface is PolySans Neutral. The website uses Plus Jakarta Sans and Instrument Serif, both on Google Fonts."] = "La police de la marque est PolySans Neutral. Le site utilise Plus Jakarta Sans et Instrument Serif, toutes deux sur Google Fonts.";
  fr["Can I change the logo?"] = "Puis-je modifier le logo ?";
  fr["No. Use the files on this page as they are."] = "Non. Utilisez les fichiers de cette page tels quels.";

  // Hostinger partner badge (footer, hero pill, credentials)
  zh["Official Hostinger® Agency Partner"] = "Hostinger® 官方合作伙伴机构";
  zh["Official Hostinger Agency Partner badge"] = "Hostinger 官方合作伙伴机构徽章";
  zh["Hostinger Partner badge"] = "Hostinger 合作伙伴徽章";
  zh["Websites we build are hosted with priority Hostinger support."] = "我们建设的网站托管在 Hostinger，并享有 Hostinger 优先技术支持。";
  zh["Priority support for the sites we host"] = "我们托管的网站享有 Hostinger 优先技术支持";
  fr["Official Hostinger® Agency Partner"] = "Partenaire agence officiel Hostinger®";
  fr["Official Hostinger Agency Partner badge"] = "Badge partenaire agence officiel Hostinger";
  fr["Hostinger Partner badge"] = "Badge partenaire Hostinger";
  fr["Websites we build are hosted with priority Hostinger support."] = "Les sites que nous créons sont hébergés avec le support prioritaire de Hostinger.";
  fr["Priority support for the sites we host"] = "Support prioritaire pour les sites que nous hébergeons";


  // Homepage completion, added 2026-10-20. Client and person names map to
  // themselves: they are the same in every language.
  zh["Export Marketing for Chinese Manufacturers | Hurfi"] = "中国制造商出口营销 | Hurfi";
  zh["China directory"] = "中国城市目录";
  zh["All city guides"] = "全部城市指南";
  zh["All insights"] = "全部洞察";
  zh["Guangdong province"] = "广东省";
  zh["Zhejiang province"] = "浙江省";
  zh["Jiangsu province"] = "江苏省";
  zh["Shandong province"] = "山东省";
  zh["Fujian province"] = "福建省";
  zh["Anhui province"] = "安徽省";
  zh["Hubei province"] = "湖北省";
  zh["Hunan province"] = "湖南省";
  zh["Henan province"] = "河南省";
  zh["Sichuan province"] = "四川省";
  zh["Liaoning province"] = "辽宁省";
  zh["Overseas buyer inquiries"] = "海外买家询盘";
  zh["Factory website trust signals"] = "工厂网站的信任信号";
  zh["RFQ website checklist"] = "询价型网站清单";
  zh["Industrial product page SEO"] = "工业产品页 SEO";
  zh["International SEO checklist"] = "国际 SEO 清单";
  zh["AI search for manufacturers"] = "面向制造商的 AI 搜索";
  zh["Google Ads for exporters"] = "外贸企业的 Google Ads";
  zh["LinkedIn for export sales"] = "用领英做外贸销售";
  zh["Trade show follow-up"] = "展会后的跟进";
  zh["Export website speed"] = "外贸网站速度";
  zh["2025 export markets"] = "2025 年出口市场";
  zh["ASEAN, Middle East & Africa pages"] = "东盟、中东与非洲页面";
  zh["Certifications page"] = "认证页面";
  zh["Shipping & logistics page"] = "物流与运输页面";
  zh["Standing out in a cluster"] = "在产业集群中脱颖而出";
  zh["PDF catalogue to product pages"] = "从 PDF 目录到产品页";
  zh["Choosing an export agency"] = "如何选择外贸营销机构";
  zh["Export marketing for Chinese manufacturers"] = "面向中国制造商的出口营销";
  zh["Official Hostinger® Agency Partner"] = "Hostinger® 官方合作机构";
  zh["Priority support for the sites we host"] = "我们托管的网站享优先技术支持";
  zh["Industry‑Leading."] = "行业领先。";
  zh["Indicative comparison of Hurfi with other ways manufacturers handle digital marketing. Ratings are illustrative, not verified measurements."] = "Hurfi 与其他数字营销方式的示意性对比。评分仅作示意，并非实测结果。";
  zh["Words from the brands we’ve worked with."] = "合作品牌对我们的评价。";
  zh["Indicative comparison. On a small screen, swipe sideways to see every column."] = "以下为示意性对比。小屏幕上可左右滑动查看各列。";
  zh["Don’t fill this out:"] = "请勿填写此项：";
  zh["Brand Guidelines"] = "品牌规范";
  zh["Hurfi helps Chinese manufacturers, suppliers, and exporters with websites, SEO, digital marketing, and social media."] = "Hurfi 为中国制造商、供应商和出口企业提供网站、SEO、数字营销和社交媒体服务。";
  zh["Bangladesh: Colony Chokforid Road, Bogura, Bangladesh."] = "孟加拉国：Colony Chokforid Road, Bogura, Bangladesh。";
  zh["China: Haitianyuan 3, Chang'an Campus, Northwestern Polytechnical University, Xi'an, Shaanxi."] = "中国：西安市长安区西北工业大学长安校区海天苑 3 号，陕西。";
  zh["Hurfi home"] = "Hurfi 首页";
  zh["Hostinger Partner badge"] = "Hostinger 合作伙伴徽章";
  zh["B2B website designed for a manufacturer"] = "为制造企业设计的 B2B 网站";
  zh["Search performance overview"] = "搜索表现概览";
  zh["Digital campaign performance"] = "数字广告活动表现";
  zh["Content and audience conversations"] = "内容与受众互动";
  zh["Search and growth analytics for a B2B company"] = "B2B 企业的搜索与增长分析";
  zh["Yasir Arafat"] = "Yasir Arafat";
  zh["Shahruk Karim Simanto"] = "Shahruk Karim Simanto";
  zh["Lukman Hosen"] = "Lukman Hosen";
  zh["yasir@hurfi.com"] = "yasir@hurfi.com";
  zh["llms.txt"] = "llms.txt";
  zh["you@company.com"] = "you@company.com";
  zh["Sober Society"] = "Sober Society";
  zh["Compara Ofertas"] = "Compara Ofertas";
  zh["Lorbuc Net"] = "Lorbuc Net";
  zh["Juice Cards"] = "Juice Cards";
  zh["Gully Apparel"] = "Gully Apparel";
  zh["Africa Giant"] = "Africa Giant";
  zh["General Coffee"] = "General Coffee";
  zh["Claflin & Associates"] = "Claflin & Associates";
  zh["Cammy & Grammy"] = "Cammy & Grammy";
  zh["Cedar Hills Haven"] = "Cedar Hills Haven";
  zh["Signed Anonymous"] = "Signed Anonymous";
  zh["ZK Publishing House"] = "ZK Publishing House";
  zh["Home Health Care Network"] = "Home Health Care Network";
  zh["Pro Wills"] = "Pro Wills";
  zh["Envisio Partners"] = "Envisio Partners";
  zh["MG Global"] = "MG Global";
  zh["Vivir de DJ"] = "Vivir de DJ";
  zh["Solomon's Wealth Business"] = "Solomon's Wealth Business";
  zh["JR Accounting"] = "JR Accounting";
  fr["Export Marketing for Chinese Manufacturers | Hurfi"] = "Marketing export pour les fabricants chinois | Hurfi";
  fr["China directory"] = "Annuaire Chine";
  fr["All city guides"] = "Tous les guides de ville";
  fr["All insights"] = "Tous les articles";
  fr["Guangdong province"] = "province du Guangdong";
  fr["Zhejiang province"] = "province du Zhejiang";
  fr["Jiangsu province"] = "province du Jiangsu";
  fr["Shandong province"] = "province du Shandong";
  fr["Fujian province"] = "province du Fujian";
  fr["Anhui province"] = "province du Anhui";
  fr["Hubei province"] = "province du Hubei";
  fr["Hunan province"] = "province du Hunan";
  fr["Henan province"] = "province du Henan";
  fr["Sichuan province"] = "province du Sichuan";
  fr["Liaoning province"] = "province du Liaoning";
  fr["Overseas buyer inquiries"] = "Demandes d'acheteurs étrangers";
  fr["Factory website trust signals"] = "Signaux de confiance d'un site d'usine";
  fr["RFQ website checklist"] = "Liste de contrôle d'un site d'appel d'offres";
  fr["Industrial product page SEO"] = "SEO des pages produit industrielles";
  fr["International SEO checklist"] = "Liste de contrôle SEO international";
  fr["AI search for manufacturers"] = "La recherche par IA pour les industriels";
  fr["Google Ads for exporters"] = "Google Ads pour les exportateurs";
  fr["LinkedIn for export sales"] = "LinkedIn pour la vente à l'export";
  fr["Trade show follow-up"] = "Suivi après un salon professionnel";
  fr["Export website speed"] = "La vitesse d'un site d'export";
  fr["2025 export markets"] = "Marchés d'exportation 2025";
  fr["ASEAN, Middle East & Africa pages"] = "Pages ASEAN, Moyen-Orient et Afrique";
  fr["Certifications page"] = "Page certifications";
  fr["Shipping & logistics page"] = "Page transport et logistique";
  fr["Standing out in a cluster"] = "Se démarquer dans un cluster industriel";
  fr["PDF catalogue to product pages"] = "Du catalogue PDF aux pages produit";
  fr["Choosing an export agency"] = "Choisir une agence export";
  fr["Export marketing for Chinese manufacturers"] = "Marketing export pour les fabricants chinois";
  fr["Official Hostinger® Agency Partner"] = "Agence partenaire officielle Hostinger®";
  fr["Priority support for the sites we host"] = "Support prioritaire pour les sites que nous hébergeons";
  fr["Industry‑Leading."] = "leader de votre secteur.";
  fr["Indicative comparison of Hurfi with other ways manufacturers handle digital marketing. Ratings are illustrative, not verified measurements."] = "Comparaison indicative entre Hurfi et les autres façons dont les industriels gèrent le marketing digital. Les notes sont illustratives et non mesurées.";
  fr["Words from the brands we’ve worked with."] = "Les mots des marques avec lesquelles nous avons travaillé.";
  fr["Indicative comparison. On a small screen, swipe sideways to see every column."] = "Comparaison indicative. Sur petit écran, faites glisser latéralement pour voir toutes les colonnes.";
  fr["Don’t fill this out:"] = "Ne remplissez pas ce champ :";
  fr["Brand Guidelines"] = "Charte de marque";
  fr["Hurfi helps Chinese manufacturers, suppliers, and exporters with websites, SEO, digital marketing, and social media."] = "Hurfi accompagne les fabricants, fournisseurs et exportateurs chinois en sites web, SEO, marketing digital et réseaux sociaux.";
  fr["Bangladesh: Colony Chokforid Road, Bogura, Bangladesh."] = "Bangladesh : Colony Chokforid Road, Bogura, Bangladesh.";
  fr["China: Haitianyuan 3, Chang'an Campus, Northwestern Polytechnical University, Xi'an, Shaanxi."] = "Chine : Haitianyuan 3, campus Chang'an, Université polytechnique du Nord-Ouest, Xi'an, Shaanxi.";
  fr["Hurfi home"] = "Accueil Hurfi";
  fr["Hostinger Partner badge"] = "Badge partenaire Hostinger";
  fr["B2B website designed for a manufacturer"] = "Site B2B conçu pour un fabricant";
  fr["Search performance overview"] = "Aperçu des performances de recherche";
  fr["Digital campaign performance"] = "Performances des campagnes digitales";
  fr["Content and audience conversations"] = "Contenus et échanges avec l'audience";
  fr["Search and growth analytics for a B2B company"] = "Analytique recherche et croissance pour une entreprise B2B";
  fr["Yasir Arafat"] = "Yasir Arafat";
  fr["Shahruk Karim Simanto"] = "Shahruk Karim Simanto";
  fr["Lukman Hosen"] = "Lukman Hosen";
  fr["yasir@hurfi.com"] = "yasir@hurfi.com";
  fr["llms.txt"] = "llms.txt";
  fr["you@company.com"] = "you@company.com";
  fr["Sober Society"] = "Sober Society";
  fr["Compara Ofertas"] = "Compara Ofertas";
  fr["Lorbuc Net"] = "Lorbuc Net";
  fr["Juice Cards"] = "Juice Cards";
  fr["Gully Apparel"] = "Gully Apparel";
  fr["Africa Giant"] = "Africa Giant";
  fr["General Coffee"] = "General Coffee";
  fr["Claflin & Associates"] = "Claflin & Associates";
  fr["Cammy & Grammy"] = "Cammy & Grammy";
  fr["Cedar Hills Haven"] = "Cedar Hills Haven";
  fr["Signed Anonymous"] = "Signed Anonymous";
  fr["ZK Publishing House"] = "ZK Publishing House";
  fr["Home Health Care Network"] = "Home Health Care Network";
  fr["Pro Wills"] = "Pro Wills";
  fr["Envisio Partners"] = "Envisio Partners";
  fr["MG Global"] = "MG Global";
  fr["Vivir de DJ"] = "Vivir de DJ";
  fr["Solomon's Wealth Business"] = "Solomon's Wealth Business";
  fr["JR Accounting"] = "JR Accounting";


  // Services, hubs and contact pages, 2026-10-20.
  zh["Services | Hurfi — Digital Growth for Chinese B2B Companies"] = "服务 | Hurfi — 面向中国 B2B 企业的数字增长";
  zh["Highlighted Capabilities"] = "核心能力";
  zh["Strategic social presence for Chinese manufacturers, suppliers, and B2B brands — content that builds trust and visibility."] = "为中国制造商、供应商和 B2B 品牌建立有策略的社交媒体形象——用内容建立信任与曝光。";
  zh["Google SEO for Chinese Manufacturers & Exporters | Hurfi"] = "中国制造商与出口企业的谷歌 SEO | Hurfi";
  zh["Google SEO for Chinese manufacturers"] = "面向中国制造商的谷歌 SEO";
  zh["Stable hosting from an Official Hostinger® Agency Partner"] = "Hostinger® 官方合作机构提供的稳定托管";
  zh["A site that is slow or offline is hard to rank. Hurfi is a verified member of the Hostinger® Partner Program, so the sites we host for clients run on Hostinger with priority technical support behind them."] = "网站太慢或经常打不开，就很难获得排名。Hurfi 是 Hostinger® 合作伙伴计划的认证成员，因此我们为客户托管的网站运行在 Hostinger 上，并享有优先技术支持。";
  zh["See Hostinger's partner page for Hurfi"] = "查看 Hurfi 的 Hostinger 合作伙伴页面";
  zh["Referral link"] = "推荐链接";
  zh["International SEO for factories that export"] = "面向出口工厂的国际 SEO";
  zh["Most of the buyers a Chinese factory wants are outside China, and they search in their own language, in Google, with their own words for the product. International SEO is the work of making sure the right pages show up for them."] = "中国工厂想要的买家大多在中国以外，他们用自己的语言、在谷歌上、用自己熟悉的词搜索产品。国际 SEO 就是让正确的页面出现在这些搜索里。";
  zh["Choosing target markets first, then the language and the wording buyers in those markets actually use."] = "先确定目标市场，再确定这些市场的买家真正使用的语言和用词。";
  zh["A clear site structure for each market or language, with correct hreflang and canonical tags when there is more than one version."] = "为每个市场或语言建立清晰的网站结构；存在多个版本时，正确设置 hreflang 和 canonical 标签。";
  zh["Server, hosting and speed checks, because a site that loads slowly from Europe or North America loses visitors before they read anything."] = "检查服务器、托管和加载速度——从欧洲或北美访问很慢的网站，访客还没看内容就走了。";
  zh["Product and application pages written around specification-stage searches: materials, standards, tolerances, capacities and model numbers."] = "围绕选型阶段的搜索来写产品和应用页面：材料、标准、公差、产能和型号。";
  zh["Search Console set up for your own domain, so you can see impressions and clicks by country."] = "在您自己的域名上配置 Search Console，按国家查看展示和点击。";
  zh["What we will not do"] = "我们不做的事";
  zh["Promise rankings, traffic or a number of inquiries."] = "不承诺排名、流量或询盘数量。";
  zh["Buy links or use tactics that put your domain at risk."] = "不购买外链，不使用会让您的域名承担风险的手法。";
  zh["Offer Baidu SEO — our work is aimed at overseas buyers searching in Google."] = "不做百度 SEO——我们的工作面向在谷歌搜索的海外买家。";
  zh["Where SEO fits with the rest"] = "SEO 与其他工作的关系";
  zh["SEO brings buyers to the site; the site has to answer them. If your product pages are thin, we will tell you, and the"] = "SEO 把买家带到网站，网站必须能回答他们。如果您的产品页内容单薄，我们会直接说明，可能";
  zh["website development"] = "网站建设";
  zh["work may come first. For sector-specific search topics see the"] = "工作要先做。按行业划分的搜索话题请看";
  zh["industry pages"] = "行业页面";
  zh[", and for a practical starting point read"] = "；想找个实用的起点，可以读";
  zh["how Chinese manufacturers can win more overseas buyer inquiries"] = "中国制造商如何获得更多海外买家询盘";
  zh["Related guides and city pages"] = "相关指南与城市页面";
  zh["An international SEO checklist for Chinese exporters"] = "面向中国出口企业的国际 SEO 清单";
  zh["AI search for manufacturers: what actually matters"] = "制造商与 AI 搜索：真正重要的部分";
  zh["Product page SEO for industrial manufacturers"] = "工业制造企业的产品页 SEO";
  zh["How a manufacturer should choose an export marketing agency"] = "制造企业如何选择外贸营销机构";
  zh["City guides for manufacturers in"] = "制造业城市指南：";
  zh["all city guides"] = "全部城市指南";
  zh["B2B Digital Marketing for Chinese Manufacturers | Hurfi"] = "面向中国制造商的 B2B 数字营销 | Hurfi";
  zh["B2B digital marketing that brings overseas inquiries"] = "带来海外询盘的 B2B 数字营销";
  zh["Lead generation without inflated numbers"] = "不做注水的询盘获取";
  zh["For a manufacturer, one qualified inquiry from the right buyer is worth more than thousands of impressions. We plan campaigns backwards from that: which buyers, in which markets, looking for which products — and which page on your site will answer them."] = "对制造商来说，来自合适买家的一条有效询盘，比几千次展示更有价值。我们由此倒推来规划：哪些买家、在哪些市场、找什么产品，以及网站上哪个页面来回答他们。";
  zh["Search campaigns for buyers who are already looking for the product type or process you offer."] = "面向已经在搜索您这类产品或工艺的买家的搜索广告。";
  zh["Content that answers the questions engineers and buyers ask before they write: specifications, standards, applications."] = "用内容回答工程师和采购在发询盘前会问的问题：规格、标准、应用场景。";
  zh["Paid campaigns where the numbers justify them, with spend and results shown from your own ad accounts."] = "只在数据说得通的地方投放付费广告，预算和效果都来自您自己的广告账户。";
  zh["Inquiry tracking by source, so you can see which channel produced which conversation."] = "按来源跟踪询盘，看清哪个渠道带来了哪次对话。";
  zh["What we report"] = "我们汇报什么";
  zh["Inquiries, calls and profile actions by channel, alongside spend. We do not report vanity reach as success, and we do not promise a number of leads. If a channel is not working after a fair test, we say so and move the budget."] = "按渠道汇报询盘、电话和主页互动，同时列出花费。我们不把虚高的触达当作成果，也不承诺线索数量。一个渠道经过合理测试仍不见效，我们会直说，并把预算挪走。";
  zh["Further reading"] = "延伸阅读";
  zh["Google Ads for exporters: a setup guide for factories"] = "外贸企业的 Google Ads：工厂设置指南";
  zh["Trade show follow-up for manufacturers"] = "制造企业的展会跟进";
  zh["LinkedIn & Social Media for Chinese Manufacturers | Hurfi"] = "面向中国制造商的领英与社交媒体 | Hurfi";
  zh["LinkedIn and social media for Chinese manufacturers"] = "面向中国制造商的领英与社交媒体";
  zh["Why LinkedIn matters for a factory"] = "为什么工厂需要领英";
  zh["Before an overseas buyer replies to your email, they often look up the company page and the person who wrote to them. A company page with no posts, or a sales profile with no photo, raises doubts that a good price cannot fix. LinkedIn is where B2B buyers check whether a supplier is real, active and professional."] = "海外买家回复您邮件之前，往往会先看看公司主页和发邮件的那个人。主页没有内容，销售档案没有照片，这些疑虑再好的价格也补不回来。B2B 买家在领英上确认供应商是否真实、活跃、专业。";
  zh["A company page that matches the website: same products, same certificates, same contact details."] = "公司主页与网站保持一致：同样的产品、同样的认证、同样的联系方式。";
  zh["Profiles for the people buyers will talk to, in clear English."] = "为买家会接触的人建立档案，用清楚的英文。";
  zh["A posting plan built around real material: production, testing, trade shows, new products, team."] = "围绕真实素材的发帖计划：生产、检测、展会、新产品、团队。";
  zh["Every post approved by your team before it goes out; nothing is published without permission."] = "每条帖子发布前都由您的团队确认，未经许可不发布任何内容。";
  zh["What we do not do"] = "我们不做的事";
  zh["Buy followers or engagement."] = "不购买粉丝或互动量。";
  zh["Send mass connection requests or automated messages that damage your account and reputation."] = "不群发好友请求或自动消息，这会损害您的账号和声誉。";
  zh["Use stock photos in place of your own factory."] = "不用图库照片代替您自己的工厂。";
  zh["LinkedIn for factory export sales: a practical guide"] = "用领英做工厂外贸销售：实用指南";
  zh["Why overseas buyers hesitate on factory websites — and what to fix"] = "海外买家为什么会在一家工厂网站上犹豫——以及该改什么";
  zh["Examples of Hurfi’s own posts"] = "Hurfi 自己的帖子示例";
  zh["These are posts from Hurfi’s own social media, shown as examples of the visual style and messages we write for manufacturers. They are our brand work, not client results."] = "以下帖子来自 Hurfi 自己的社交媒体，用来展示我们为制造企业创作时的视觉风格和文案。这些是我们的品牌内容，不是客户成果。";
  zh["Want posts like these for your factory? See"] = "想让您的工厂也有这样的内容？请查看";
  zh["social media management"] = "社交媒体管理";
  zh["A five-slide carousel from Hurfi’s feed"] = "Hurfi 账号上的五页轮播";
  zh["Carousels let a factory explain who it is, what it does and how it works in one swipeable post. This is one of ours."] = "轮播可以让工厂用一条可滑动的帖子讲清自己是谁、做什么、怎么做。这是我们的其中一条。";
  zh["Hurfi “Digital marketing” social post comparing two glasses of tea labelled “normal people” and “digital marketer”"] = "Hurfi 的「数字营销」帖子：两杯茶分别标注「普通人」和「数字营销人」";
  zh["Hurfi social post “Don’t chase every click. Attract the right global buyers.”, with fish around a hook"] = "Hurfi 帖子「别追逐每一次点击，吸引对的全球买家。」，画面是鱼群围绕鱼钩";
  zh["Hurfi social post “Global buyers don’t just search. They verify.”, with a magnifying glass over a factory website"] = "Hurfi 帖子「全球买家不只是搜索，他们会核实。」，画面上是放大镜下的工厂网站";
  zh["Hurfi social post with a spider web: “A brand isn’t built by one thread.”"] = "Hurfi 帖子：蜘蛛网，配文「品牌不是一根丝线织成的。」";
  zh["Hurfi social post “Your factory stands strong. Now make your brand stand tall globally.”, with a giraffe in sunglasses"] = "Hurfi 帖子「您的工厂很强，现在让品牌在全球站得更高。」，画面是戴墨镜的长颈鹿";
  zh["Hurfi billboard-style post: “Your factory builds what the world needs. Our mission is making sure the world finds you.”"] = "Hurfi 广告牌风格帖子：「您的工厂制造世界所需，我们的使命是让世界找到您。」";
  zh["Hurfi carousel slide 1, “Who we are”: we help Chinese manufacturers and exporters grow stronger online"] = "Hurfi 轮播第 1 页「我们是谁」：我们帮助中国制造商和出口企业在线上更强";
  zh["Hurfi carousel slide 2, “What we do”: website development, SEO and AEO, social media marketing, ads and lead generation"] = "Hurfi 轮播第 2 页「我们做什么」：网站建设、SEO 与 AEO、社交媒体营销、广告与询盘获取";
  zh["Hurfi carousel slide 3, “Who we work with”: Chinese manufacturers, suppliers and exporters across industries"] = "Hurfi 轮播第 3 页「我们与谁合作」：来自各行业的中国制造商、供应商和出口企业";
  zh["Hurfi carousel slide 4, “Our process”: understand your business, research and strategy, build and optimise, grow and scale"] = "Hurfi 轮播第 4 页「我们的流程」：了解业务、调研与策略、建设与优化、增长与扩张";
  zh["Hurfi carousel slide 5, “Why Hurfi?”: China market expertise, result-oriented strategy, transparent communication, long-term partnership"] = "Hurfi 轮播第 5 页「为什么选 Hurfi？」：中国市场经验、以结果为导向的策略、透明的沟通、长期合作";
  zh["English B2B Websites for Chinese Manufacturers | Hurfi"] = "面向中国制造商的英文 B2B 网站 | Hurfi";
  zh["English B2B websites for Chinese manufacturers"] = "面向中国制造商的英文 B2B 网站";
  zh["Hosting by an Official Hostinger® Agency Partner"] = "由 Hostinger® 官方合作机构托管";
  zh["Hurfi is a verified member of the Hostinger® Partner Program. The websites we build can be hosted on Hostinger, with set-up handled by our team, and as a partner we get priority technical support from Hostinger when a site needs attention."] = "Hurfi 是 Hostinger® 合作伙伴计划的认证成员。我们建设的网站可以托管在 Hostinger 上，由我们团队完成配置；作为合作伙伴，网站在需要处理时能得到 Hostinger 的优先技术支持。";
  zh["What an export-ready factory website needs"] = "一个能接外单的工厂网站需要什么";
  zh["One page per main product family, with the specification table on the page and the datasheet as a download."] = "每个主要产品系列一个页面，规格表放在页面上，数据表提供下载。";
  zh["A factory and quality page: real photos of lines and testing, equipment lists, and certificates with scope and expiry dates."] = "工厂与质量页面：产线和检测的真实照片、设备清单，以及注明范围和有效期的证书。";
  zh["Commercial basics stated plainly: minimum order quantity, sample policy, lead time, Incoterms you work with."] = "把商业条件讲清楚：最小起订量、样品政策、交货周期、使用的 Incoterms。";
  zh["An RFQ path that asks for the right details — drawings, quantities, target market — and says who replies and how soon."] = "一条问对信息的询价路径——图纸、数量、目标市场——并说明由谁、多久内回复。";
  zh["English written for buyers, not machine-translated from the Chinese site."] = "面向买家写的英文，而不是从中文网站机器翻译过来。";
  zh["Rebuild or improve?"] = "重建还是改进？";
  zh["Not every factory needs a new site. We start by reviewing the one you have: what buyers can find, what they cannot, and how the site performs from outside China. Sometimes restructuring the product pages and the contact path is enough; sometimes a rebuild is cheaper in the long run. We tell you which, and why."] = "不是每个工厂都需要新网站。我们先看现有的：买家能找到什么、找不到什么，以及从中国以外访问时表现如何。有时调整产品页和联系路径就够了，有时长期看重建更省钱。我们会告诉您选哪个，以及为什么。";
  zh["Use our"] = "使用我们的";
  zh["manufacturer website RFQ checklist"] = "制造企业网站询价清单";
  zh["and the list of"] = "以及";
  zh["factory website trust signals"] = "工厂网站信任信号";
  zh["to check your current site before we talk."] = "在沟通前先检查您现在的网站。";
  zh["What a manufacturer website needs before buyers send an RFQ"] = "买家发询价前，制造企业网站需要具备什么";
  zh["Export website speed: making pages fast for overseas buyers"] = "外贸网站速度：让页面在海外买家那里加载得快";
  zh["Is Hurfi a Hostinger partner?"] = "Hurfi 是 Hostinger 的合作伙伴吗？";
  zh["Yes. Hurfi is an Official Hostinger Agency Partner, a verified member of the Hostinger Partner Program. Partner status gives us priority technical support from Hostinger for the websites we host. Hostinger's partner page for Hurfi:"] = "是的。Hurfi 是 Hostinger 官方合作机构，也是 Hostinger 合作伙伴计划的认证成员。合作伙伴身份让我们托管的网站享有 Hostinger 的优先技术支持。Hurfi 的 Hostinger 合作伙伴页面：";
  zh["(referral link)."] = "（推荐链接）。";
  zh["Contact Us | Hurfi"] = "联系我们 | Hurfi";
  zh["Hurfi is a verified member of the Hostinger® Partner Program, with priority technical support from Hostinger for the websites we host."] = "Hurfi 是 Hostinger® 合作伙伴计划的认证成员，我们托管的网站享有 Hostinger 的优先技术支持。";
  zh["About Hurfi | B2B Growth Partner for Chinese Companies"] = "关于 Hurfi | 中国企业的 B2B 增长伙伴";
  zh["Book a Consultation | Hurfi"] = "预约咨询 | Hurfi";
  zh["Projects | Hurfi"] = "项目 | Hurfi";
  zh["Insights for Chinese Manufacturers Selling Abroad | Hurfi"] = "面向海外销售的中国制造商洞察 | Hurfi";
  zh["Practical notes for Chinese manufacturers and exporters who want overseas buyers to find them, trust them and send a real inquiry. No growth hacks, no invented numbers."] = "写给想让海外买家找到、信任并真正发来询盘的中国制造商和出口企业。没有增长黑客套路，没有编造的数字。";
  zh["Contact us"] = "联系我们";
  zh["A practical guide for Chinese factories: why marketplaces are not enough, what overseas buyers check, and how a website, search and LinkedIn work together to produce inquiries."] = "写给中国工厂的实用指南：为什么只靠平台不够、海外买家会核查什么，以及网站、搜索和领英如何共同带来询盘。";
  zh["The trust signals overseas buyers look for on a Chinese factory website, the mistakes that make a real factory look unreliable, and how to fix them."] = "海外买家在中国工厂网站上寻找的信任信号、让真实工厂显得不可靠的错误，以及如何修正。";
  zh["A practical checklist of the pages, specifications and inquiry details a Chinese manufacturer website needs so overseas buyers can send a complete RFQ."] = "一份实用清单：中国制造商网站需要哪些页面、规格信息和询盘细节，海外买家才能发出完整的询价。";
  zh["A practical international SEO checklist for Chinese manufacturers: URL structure, languages, hreflang, content, technical checks and measurement."] = "面向中国制造商的国际 SEO 实用清单：URL 结构、语言、hreflang、内容、技术检查和效果衡量。";
  zh["Questions a Chinese manufacturer should ask before hiring an export marketing or SEO agency: guarantees, ownership, reporting, content and red flags."] = "中国制造商在选择外贸营销或 SEO 机构前该问的问题：承诺、所有权、汇报、内容以及危险信号。";
  zh["How Chinese manufacturers can use LinkedIn company pages and sales profiles to support export sales: setup, content, outreach and measurement."] = "中国制造商如何用领英公司主页和销售档案支持出口销售：设置、内容、主动联系和效果衡量。";
  zh["What Google’s AI Overviews and AI Mode mean for manufacturers’ websites, based on Google’s own documentation — and what is hype."] = "依据谷歌自己的文档，说明 AI Overviews 和 AI Mode 对制造企业网站意味着什么——以及哪些只是炒作。";
  zh["How Chinese manufacturers can set up Google Ads for overseas B2B inquiries: location targeting, keywords, landing pages, conversion tracking and budgets."] = "中国制造商如何为海外 B2B 询盘设置 Google Ads：地域定位、关键词、落地页、转化跟踪和预算。";
  zh["How to structure industrial product pages so overseas engineers and Google understand them: titles, specifications, documents, compliance and structured data."] = "如何组织工业产品页，让海外工程师和谷歌都能看懂：标题、规格、文档、合规和结构化数据。";
  zh["How manufacturers can turn Canton Fair and trade-show contacts into RFQs: preparation, the website buyers check afterwards, follow-up timing and tracking."] = "制造商如何把广交会和展会上的联系人变成询盘：展前准备、买家展后会看的网站、跟进时机和跟踪。";
  zh["Why page speed matters for Chinese exporters’ websites, what Core Web Vitals measure, and practical fixes for hosting, images and scripts."] = "为什么页面速度对中国出口企业的网站很重要、Core Web Vitals 衡量什么，以及托管、图片和脚本方面的实用改进。";
  zh["Where Chinese manufacturing exports grew and fell in 2025 — and what it means for your website"] = "2025 年中国制造业出口哪些增长、哪些下滑——以及这对您的网站意味着什么";
  zh["What 2025 provincial and city statistical bulletins show about export growth and decline by market, and how exporters can plan market pages from it."] = "2025 年各省市统计公报显示的各市场出口增长与下滑，以及出口企业如何据此规划市场页面。";
  zh["Market pages for buyers in ASEAN, the Middle East and Africa"] = "面向东盟、中东和非洲买家的市场页面";
  zh["How Chinese manufacturers can build useful market pages for ASEAN, Middle East and African buyers: content, languages, hreflang and what to avoid."] = "中国制造商如何为东盟、中东和非洲买家建设有用的市场页面：内容、语言、hreflang 以及要避免的做法。";
  zh["The certifications page: how exporters should present certificates to overseas buyers"] = "认证页面：出口企业该如何向海外买家展示证书";
  zh["How Chinese manufacturers can present certifications by market on their website — scope, models, validity and documents — without overclaiming."] = "中国制造商如何在网站上按市场展示认证——范围、型号、有效期和文件——同时避免夸大。";
  zh["The shipping and logistics page: answering buyers’ delivery questions before they ask"] = "物流与运输页面：在买家开口前回答交付问题";
  zh["What a Chinese manufacturer’s shipping page should cover — Incoterms, ports, packing, lead times and samples — so overseas buyers can plan and request a quote."] = "中国制造商的物流页面应该包含什么——Incoterms、港口、包装、交货周期和样品——让海外买家能规划并询价。";
  zh["Standing out online when your whole city makes the same product"] = "当全城都在做同一种产品时，如何在线上脱颖而出";
  zh["How manufacturers in Chinese industrial clusters — pumps, fabrics, wigs, eyewear — can make their website stand out from hundreds of similar suppliers."] = "中国产业集群中的制造商——水泵、面料、假发、眼镜——如何让自己的网站从数百家相似供应商中脱颖而出。";
  zh["From PDF catalogue to product pages: making your range searchable"] = "从 PDF 目录到产品页：让您的产品范围可被搜索";
  zh["Why Chinese manufacturers should turn PDF catalogues into HTML product pages, how to structure them, and how to keep PDFs useful as downloads."] = "为什么中国制造商应把 PDF 目录转成 HTML 产品页、如何组织这些页面，以及如何让 PDF 继续作为下载资料发挥作用。";
  zh["Guides to the main industries of Chinese manufacturing cities, based on official statistics, and what they mean for an export website."] = "基于官方统计数据，介绍中国制造业城市主要产业的指南，以及它们对外贸网站的意义。";
  zh["Not sure where to start?"] = "不确定从哪里开始？";
  zh["Book a free consultation and we will tell you which of these guides matter most for your website."] = "预约免费咨询，我们会告诉您这些指南中哪些对您的网站最重要。";
  zh["Solar & Renewable Power"] = "光伏与可再生能源";
  zh["Water & Wastewater Technology"] = "水与污水处理技术";
  zh["Environmental & Circular Economy"] = "环保与循环经济";
  zh["Agritech & Agricultural Equipment"] = "农业科技与农机";
  zh["Smart Buildings & Urban Infrastructure"] = "智能建筑与城市基础设施";
  zh["Precision Manufacturing & Components"] = "精密制造与零部件";
  zh["Automotive & Mobility Components"] = "汽车与出行零部件";
  zh["Aerospace & Aviation Supply Chain"] = "航空航天供应链";
  zh["Industrial HVAC & Building Systems"] = "工业暖通与建筑系统";
  zh["Construction Materials & Systems"] = "建筑材料与系统";
  zh["Food Processing Equipment"] = "食品加工设备";
  zh["Packaging & Printing Manufacturing"] = "包装与印刷制造";
  zh["Textiles & Technical Fabrics"] = "纺织与技术面料";
  zh["Furniture & Interior Manufacturing"] = "家具与室内制造";
  zh["Logistics & Warehouse Technology"] = "物流与仓储技术";
  zh["Chemicals & Specialty Materials"] = "化工与特种材料";
  zh["Mining & Mineral Processing Equipment"] = "矿山与矿物加工设备";
  zh["Marine & Shipbuilding Supply Chain"] = "船舶与海工供应链";
  zh["Industrial Safety & Testing"] = "工业安全与检测";
  zh["Apparel & Footwear Production"] = "服装与鞋类生产";
  zh["Commercial Cleaning & Hygiene Equipment"] = "商用清洁与卫生设备";
  zh["Across sectors"] = "跨行业";
  zh["Some work depends on how the factory sells rather than what it makes."] = "有些工作取决于工厂怎么卖，而不是做什么。";
  zh["OEM & ODM manufacturing"] = "OEM 与 ODM 制造";
  zh["For factories that build products for other brands."] = "为其他品牌代工生产的工厂。";
  zh["China Manufacturing Regions We Serve | Hurfi"] = "我们服务的中国制造业地区 | Hurfi";
  zh["China manufacturing regions we serve"] = "我们服务的中国制造业地区";
  zh["Guides for manufacturers in 39 Chinese cities, based on official industry statistics. Hurfi’s China office is in Xi’an; we work with manufacturers in the other cities remotely, and we do not have local offices there."] = "基于官方产业统计数据，为 39 个中国城市的制造商提供指南。Hurfi 的中国办公室在西安；其他城市的企业我们远程合作，在当地没有办公室。";
  zh["Pearl River Delta (Guangdong)"] = "珠三角（广东）";
  zh["Yangtze River Delta and Anhui"] = "长三角与安徽";
  zh["Bohai Rim and northeast China"] = "环渤海与东北";
  zh["Central and western China"] = "中西部";
  zh["Province guides"] = "省级指南";
  zh["Province guides summarise official figures, link to the city guides and profile smaller manufacturing cities from their own statistical bulletins."] = "省级指南汇总官方数据，链接到城市指南，并根据各地统计公报介绍较小的制造业城市。";
  zh["Full China directory"] = "完整的中国城市目录";
  zh["Insights for exporters"] = "出口企业洞察";
  zh["Guangdong · city guide"] = "广东 · 城市指南";
  zh["Shanghai · city guide"] = "上海 · 城市指南";
  zh["Jiangsu · city guide"] = "江苏 · 城市指南";
  zh["Zhejiang · city guide"] = "浙江 · 城市指南";
  zh["Anhui · city guide"] = "安徽 · 城市指南";
  zh["Fujian · city guide"] = "福建 · 城市指南";
  zh["Beijing · city guide"] = "北京 · 城市指南";
  zh["Tianjin · city guide"] = "天津 · 城市指南";
  zh["Shandong · city guide"] = "山东 · 城市指南";
  zh["Liaoning · city guide"] = "辽宁 · 城市指南";
  zh["Hubei · city guide"] = "湖北 · 城市指南";
  zh["Hunan · city guide"] = "湖南 · 城市指南";
  zh["Henan · city guide"] = "河南 · 城市指南";
  zh["Chongqing · city guide"] = "重庆 · 城市指南";
  zh["Sichuan · city guide"] = "四川 · 城市指南";
  zh["Shaanxi · city guide"] = "陕西 · 城市指南";
  zh["Province guide · 1 city guides"] = "省级指南 · 1 个城市指南";
  zh["Province guide · 2 city guides"] = "省级指南 · 2 个城市指南";
  zh["Province guide · 3 city guides"] = "省级指南 · 3 个城市指南";
  zh["Province guide · 4 city guides"] = "省级指南 · 4 个城市指南";
  zh["Province guide · 5 city guides"] = "省级指南 · 5 个城市指南";
  zh["Province guide · 7 city guides"] = "省级指南 · 7 个城市指南";
  fr["Services | Hurfi — Digital Growth for Chinese B2B Companies"] = "Services | Hurfi — croissance digitale pour les entreprises B2B chinoises";
  fr["Highlighted Capabilities"] = "Compétences clés";
  fr["Strategic social presence for Chinese manufacturers, suppliers, and B2B brands — content that builds trust and visibility."] = "Une présence sociale stratégique pour les fabricants, fournisseurs et marques B2B chinois — des contenus qui construisent la confiance et la visibilité.";
  fr["Google SEO for Chinese Manufacturers & Exporters | Hurfi"] = "SEO Google pour les fabricants et exportateurs chinois | Hurfi";
  fr["Google SEO for Chinese manufacturers"] = "SEO Google pour les fabricants chinois";
  fr["Stable hosting from an Official Hostinger® Agency Partner"] = "Un hébergement stable par une agence partenaire officielle Hostinger®";
  fr["A site that is slow or offline is hard to rank. Hurfi is a verified member of the Hostinger® Partner Program, so the sites we host for clients run on Hostinger with priority technical support behind them."] = "Un site lent ou hors ligne est difficile à référencer. Hurfi est membre vérifié du programme partenaire Hostinger® : les sites que nous hébergeons pour nos clients tournent sur Hostinger, avec un support technique prioritaire.";
  fr["See Hostinger's partner page for Hurfi"] = "Voir la page partenaire Hostinger de Hurfi";
  fr["Referral link"] = "Lien de parrainage";
  fr["International SEO for factories that export"] = "SEO international pour les usines exportatrices";
  fr["Most of the buyers a Chinese factory wants are outside China, and they search in their own language, in Google, with their own words for the product. International SEO is the work of making sure the right pages show up for them."] = "La plupart des acheteurs visés par une usine chinoise se trouvent hors de Chine : ils cherchent sur Google, dans leur langue, avec leurs propres mots. Le SEO international consiste à faire apparaître les bonnes pages pour ces recherches.";
  fr["Choosing target markets first, then the language and the wording buyers in those markets actually use."] = "Choisir d’abord les marchés cibles, puis la langue et les termes réellement employés par les acheteurs de ces marchés.";
  fr["A clear site structure for each market or language, with correct hreflang and canonical tags when there is more than one version."] = "Une structure de site claire par marché ou par langue, avec des balises hreflang et canonical correctes lorsqu’il existe plusieurs versions.";
  fr["Server, hosting and speed checks, because a site that loads slowly from Europe or North America loses visitors before they read anything."] = "Vérification du serveur, de l’hébergement et de la vitesse : un site lent depuis l’Europe ou l’Amérique du Nord perd ses visiteurs avant qu’ils aient lu quoi que ce soit.";
  fr["Product and application pages written around specification-stage searches: materials, standards, tolerances, capacities and model numbers."] = "Des pages produit et application écrites autour des recherches de spécification : matériaux, normes, tolérances, capacités et références.";
  fr["Search Console set up for your own domain, so you can see impressions and clicks by country."] = "Search Console configuré sur votre propre domaine, pour voir les impressions et les clics par pays.";
  fr["What we will not do"] = "Ce que nous ne ferons pas";
  fr["Promise rankings, traffic or a number of inquiries."] = "Promettre des positions, du trafic ou un nombre de demandes.";
  fr["Buy links or use tactics that put your domain at risk."] = "Acheter des liens ou utiliser des méthodes qui mettent votre domaine en danger.";
  fr["Offer Baidu SEO — our work is aimed at overseas buyers searching in Google."] = "Proposer du SEO Baidu — notre travail vise les acheteurs étrangers qui cherchent sur Google.";
  fr["Where SEO fits with the rest"] = "La place du SEO dans l’ensemble";
  fr["SEO brings buyers to the site; the site has to answer them. If your product pages are thin, we will tell you, and the"] = "Le SEO amène les acheteurs au site ; le site doit leur répondre. Si vos pages produit sont trop minces, nous vous le dirons, et le";
  fr["website development"] = "la création de site";
  fr["work may come first. For sector-specific search topics see the"] = "travail peut passer en premier. Pour les sujets de recherche propres à un secteur, voir les";
  fr["industry pages"] = "pages secteur";
  fr[", and for a practical starting point read"] = ", et pour un point de départ concret, lire";
  fr["how Chinese manufacturers can win more overseas buyer inquiries"] = "comment les fabricants chinois peuvent obtenir plus de demandes d’acheteurs étrangers";
  fr["Related guides and city pages"] = "Guides et pages ville associés";
  fr["An international SEO checklist for Chinese exporters"] = "Une liste de contrôle SEO international pour les exportateurs chinois";
  fr["AI search for manufacturers: what actually matters"] = "La recherche par IA pour les industriels : ce qui compte vraiment";
  fr["Product page SEO for industrial manufacturers"] = "SEO des pages produit pour les industriels";
  fr["How a manufacturer should choose an export marketing agency"] = "Comment un industriel devrait choisir une agence de marketing export";
  fr["City guides for manufacturers in"] = "Guides de ville pour les industriels à";
  fr["all city guides"] = "tous les guides de ville";
  fr["B2B Digital Marketing for Chinese Manufacturers | Hurfi"] = "Marketing digital B2B pour les fabricants chinois | Hurfi";
  fr["B2B digital marketing that brings overseas inquiries"] = "Un marketing digital B2B qui génère des demandes étrangères";
  fr["Lead generation without inflated numbers"] = "Générer des contacts sans chiffres gonflés";
  fr["For a manufacturer, one qualified inquiry from the right buyer is worth more than thousands of impressions. We plan campaigns backwards from that: which buyers, in which markets, looking for which products — and which page on your site will answer them."] = "Pour un industriel, une demande qualifiée du bon acheteur vaut plus que des milliers d’impressions. Nous planifions donc à rebours : quels acheteurs, sur quels marchés, pour quels produits — et quelle page de votre site leur répondra.";
  fr["Search campaigns for buyers who are already looking for the product type or process you offer."] = "Des campagnes search pour les acheteurs qui cherchent déjà le type de produit ou le procédé que vous proposez.";
  fr["Content that answers the questions engineers and buyers ask before they write: specifications, standards, applications."] = "Des contenus qui répondent aux questions que se posent ingénieurs et acheteurs avant d’écrire : spécifications, normes, applications.";
  fr["Paid campaigns where the numbers justify them, with spend and results shown from your own ad accounts."] = "Des campagnes payantes là où les chiffres le justifient, avec les dépenses et les résultats tirés de vos propres comptes publicitaires.";
  fr["Inquiry tracking by source, so you can see which channel produced which conversation."] = "Un suivi des demandes par source, pour voir quel canal a produit quelle conversation.";
  fr["What we report"] = "Ce que nous rapportons";
  fr["Inquiries, calls and profile actions by channel, alongside spend. We do not report vanity reach as success, and we do not promise a number of leads. If a channel is not working after a fair test, we say so and move the budget."] = "Les demandes, les appels et les actions sur les profils par canal, avec les dépenses. Nous ne présentons pas la portée comme un résultat et nous ne promettons pas un nombre de contacts. Si un canal ne fonctionne pas après un test honnête, nous le disons et réaffectons le budget.";
  fr["Further reading"] = "Pour aller plus loin";
  fr["Google Ads for exporters: a setup guide for factories"] = "Google Ads pour les exportateurs : guide de configuration pour les usines";
  fr["Trade show follow-up for manufacturers"] = "Le suivi de salon pour les industriels";
  fr["LinkedIn & Social Media for Chinese Manufacturers | Hurfi"] = "LinkedIn et réseaux sociaux pour les fabricants chinois | Hurfi";
  fr["LinkedIn and social media for Chinese manufacturers"] = "LinkedIn et réseaux sociaux pour les fabricants chinois";
  fr["Why LinkedIn matters for a factory"] = "Pourquoi LinkedIn compte pour une usine";
  fr["Before an overseas buyer replies to your email, they often look up the company page and the person who wrote to them. A company page with no posts, or a sales profile with no photo, raises doubts that a good price cannot fix. LinkedIn is where B2B buyers check whether a supplier is real, active and professional."] = "Avant de répondre à votre e-mail, un acheteur étranger consulte souvent la page de l’entreprise et le profil de la personne qui lui écrit. Une page sans publications, ou un profil commercial sans photo, suscite des doutes qu’un bon prix ne corrige pas. C’est sur LinkedIn que les acheteurs B2B vérifient qu’un fournisseur est réel, actif et professionnel.";
  fr["A company page that matches the website: same products, same certificates, same contact details."] = "Une page entreprise alignée sur le site : mêmes produits, mêmes certificats, mêmes coordonnées.";
  fr["Profiles for the people buyers will talk to, in clear English."] = "Des profils pour les personnes que les acheteurs contacteront, dans un anglais clair.";
  fr["A posting plan built around real material: production, testing, trade shows, new products, team."] = "Un plan de publication fondé sur du contenu réel : production, essais, salons, nouveaux produits, équipe.";
  fr["Every post approved by your team before it goes out; nothing is published without permission."] = "Chaque publication est validée par votre équipe avant diffusion ; rien n’est publié sans autorisation.";
  fr["What we do not do"] = "Ce que nous ne faisons pas";
  fr["Buy followers or engagement."] = "Acheter des abonnés ou de l’engagement.";
  fr["Send mass connection requests or automated messages that damage your account and reputation."] = "Envoyer des demandes de connexion en masse ou des messages automatisés qui nuisent à votre compte et à votre réputation.";
  fr["Use stock photos in place of your own factory."] = "Utiliser des photos de banque d’images à la place de votre usine.";
  fr["LinkedIn for factory export sales: a practical guide"] = "LinkedIn pour la vente export d’une usine : guide pratique";
  fr["Why overseas buyers hesitate on factory websites — and what to fix"] = "Pourquoi les acheteurs étrangers hésitent sur un site d’usine — et quoi corriger";
  fr["Examples of Hurfi’s own posts"] = "Exemples de publications de Hurfi";
  fr["These are posts from Hurfi’s own social media, shown as examples of the visual style and messages we write for manufacturers. They are our brand work, not client results."] = "Ces publications viennent des réseaux sociaux de Hurfi : elles montrent le style visuel et les messages que nous écrivons pour les industriels. C’est notre travail de marque, pas des résultats clients.";
  fr["Want posts like these for your factory? See"] = "Vous voulez ce type de publications pour votre usine ? Voir";
  fr["social media management"] = "la gestion des réseaux sociaux";
  fr["A five-slide carousel from Hurfi’s feed"] = "Un carrousel de cinq pages issu du fil de Hurfi";
  fr["Carousels let a factory explain who it is, what it does and how it works in one swipeable post. This is one of ours."] = "Un carrousel permet à une usine d’expliquer qui elle est, ce qu’elle fait et comment, en une seule publication à faire défiler. Voici l’un des nôtres.";
  fr["Hurfi “Digital marketing” social post comparing two glasses of tea labelled “normal people” and “digital marketer”"] = "Publication Hurfi « Marketing digital » comparant deux verres de thé étiquetés « les gens normaux » et « le marketeur digital »";
  fr["Hurfi social post “Don’t chase every click. Attract the right global buyers.”, with fish around a hook"] = "Publication Hurfi « Ne courez pas après chaque clic. Attirez les bons acheteurs internationaux. », avec des poissons autour d’un hameçon";
  fr["Hurfi social post “Global buyers don’t just search. They verify.”, with a magnifying glass over a factory website"] = "Publication Hurfi « Les acheteurs internationaux ne se contentent pas de chercher. Ils vérifient. », avec une loupe sur le site d’une usine";
  fr["Hurfi social post with a spider web: “A brand isn’t built by one thread.”"] = "Publication Hurfi avec une toile d’araignée : « Une marque ne se construit pas avec un seul fil. »";
  fr["Hurfi social post “Your factory stands strong. Now make your brand stand tall globally.”, with a giraffe in sunglasses"] = "Publication Hurfi « Votre usine est solide. Faites maintenant grandir votre marque à l’international. », avec une girafe en lunettes de soleil";
  fr["Hurfi billboard-style post: “Your factory builds what the world needs. Our mission is making sure the world finds you.”"] = "Publication Hurfi façon panneau publicitaire : « Votre usine fabrique ce dont le monde a besoin. Notre mission : faire en sorte que le monde vous trouve. »";
  fr["Hurfi carousel slide 1, “Who we are”: we help Chinese manufacturers and exporters grow stronger online"] = "Diapositive 1 du carrousel Hurfi, « Qui nous sommes » : nous aidons les fabricants et exportateurs chinois à se renforcer en ligne";
  fr["Hurfi carousel slide 2, “What we do”: website development, SEO and AEO, social media marketing, ads and lead generation"] = "Diapositive 2, « Ce que nous faisons » : création de sites, SEO et AEO, marketing sur les réseaux sociaux, publicité et génération de contacts";
  fr["Hurfi carousel slide 3, “Who we work with”: Chinese manufacturers, suppliers and exporters across industries"] = "Diapositive 3, « Avec qui nous travaillons » : fabricants, fournisseurs et exportateurs chinois de tous secteurs";
  fr["Hurfi carousel slide 4, “Our process”: understand your business, research and strategy, build and optimise, grow and scale"] = "Diapositive 4, « Notre méthode » : comprendre votre activité, recherche et stratégie, construire et optimiser, croître et passer à l’échelle";
  fr["Hurfi carousel slide 5, “Why Hurfi?”: China market expertise, result-oriented strategy, transparent communication, long-term partnership"] = "Diapositive 5, « Pourquoi Hurfi ? » : expertise du marché chinois, stratégie orientée résultats, communication transparente, partenariat durable";
  fr["English B2B Websites for Chinese Manufacturers | Hurfi"] = "Sites B2B en anglais pour les fabricants chinois | Hurfi";
  fr["English B2B websites for Chinese manufacturers"] = "Des sites B2B en anglais pour les fabricants chinois";
  fr["Hosting by an Official Hostinger® Agency Partner"] = "Hébergement par une agence partenaire officielle Hostinger®";
  fr["Hurfi is a verified member of the Hostinger® Partner Program. The websites we build can be hosted on Hostinger, with set-up handled by our team, and as a partner we get priority technical support from Hostinger when a site needs attention."] = "Hurfi est membre vérifié du programme partenaire Hostinger®. Les sites que nous créons peuvent être hébergés sur Hostinger, l’installation étant assurée par notre équipe ; en tant que partenaire, nous bénéficions du support technique prioritaire de Hostinger lorsqu’un site demande une intervention.";
  fr["What an export-ready factory website needs"] = "Ce dont un site d’usine prêt à l’export a besoin";
  fr["One page per main product family, with the specification table on the page and the datasheet as a download."] = "Une page par grande famille de produits, avec le tableau de spécifications sur la page et la fiche technique en téléchargement.";
  fr["A factory and quality page: real photos of lines and testing, equipment lists, and certificates with scope and expiry dates."] = "Une page usine et qualité : vraies photos des lignes et des essais, listes d’équipements, et certificats avec périmètre et dates d’expiration.";
  fr["Commercial basics stated plainly: minimum order quantity, sample policy, lead time, Incoterms you work with."] = "Les bases commerciales énoncées clairement : quantité minimale, politique d’échantillons, délai de production, Incoterms utilisés.";
  fr["An RFQ path that asks for the right details — drawings, quantities, target market — and says who replies and how soon."] = "Un parcours de demande de devis qui demande les bonnes informations — plans, quantités, marché visé — et indique qui répond et sous quel délai.";
  fr["English written for buyers, not machine-translated from the Chinese site."] = "Un anglais écrit pour les acheteurs, pas traduit automatiquement depuis le site chinois.";
  fr["Rebuild or improve?"] = "Refonte ou amélioration ?";
  fr["Not every factory needs a new site. We start by reviewing the one you have: what buyers can find, what they cannot, and how the site performs from outside China. Sometimes restructuring the product pages and the contact path is enough; sometimes a rebuild is cheaper in the long run. We tell you which, and why."] = "Toutes les usines n’ont pas besoin d’un nouveau site. Nous commençons par examiner l’existant : ce que les acheteurs trouvent, ce qu’ils ne trouvent pas, et son comportement depuis l’étranger. Parfois restructurer les pages produit et le parcours de contact suffit ; parfois une refonte coûte moins cher à long terme. Nous vous disons laquelle des deux, et pourquoi.";
  fr["Use our"] = "Utilisez notre";
  fr["manufacturer website RFQ checklist"] = "liste de contrôle RFQ pour site d’usine";
  fr["and the list of"] = "et la liste des";
  fr["factory website trust signals"] = "signaux de confiance d’un site d’usine";
  fr["to check your current site before we talk."] = "pour évaluer votre site actuel avant notre échange.";
  fr["What a manufacturer website needs before buyers send an RFQ"] = "Ce qu’un site d’industriel doit offrir avant qu’un acheteur envoie une demande";
  fr["Export website speed: making pages fast for overseas buyers"] = "Vitesse d’un site export : des pages rapides pour les acheteurs étrangers";
  fr["Is Hurfi a Hostinger partner?"] = "Hurfi est-il partenaire Hostinger ?";
  fr["Yes. Hurfi is an Official Hostinger Agency Partner, a verified member of the Hostinger Partner Program. Partner status gives us priority technical support from Hostinger for the websites we host. Hostinger's partner page for Hurfi:"] = "Oui. Hurfi est une agence partenaire officielle Hostinger, membre vérifié du programme partenaire. Ce statut nous donne accès au support technique prioritaire de Hostinger pour les sites que nous hébergeons. La page partenaire Hostinger de Hurfi :";
  fr["(referral link)."] = "(lien de parrainage).";
  fr["Contact Us | Hurfi"] = "Contact | Hurfi";
  fr["Hurfi is a verified member of the Hostinger® Partner Program, with priority technical support from Hostinger for the websites we host."] = "Hurfi est membre vérifié du programme partenaire Hostinger®, avec un support technique prioritaire de Hostinger pour les sites que nous hébergeons.";
  fr["About Hurfi | B2B Growth Partner for Chinese Companies"] = "À propos de Hurfi | Partenaire de croissance B2B des entreprises chinoises";
  fr["Book a Consultation | Hurfi"] = "Réserver une consultation | Hurfi";
  fr["Projects | Hurfi"] = "Projets | Hurfi";
  fr["Insights for Chinese Manufacturers Selling Abroad | Hurfi"] = "Analyses pour les fabricants chinois qui vendent à l’étranger | Hurfi";
  fr["Practical notes for Chinese manufacturers and exporters who want overseas buyers to find them, trust them and send a real inquiry. No growth hacks, no invented numbers."] = "Des notes pratiques pour les fabricants et exportateurs chinois qui veulent que les acheteurs étrangers les trouvent, leur fassent confiance et envoient une vraie demande. Pas de recettes miracles, pas de chiffres inventés.";
  fr["Contact us"] = "Nous contacter";
  fr["A practical guide for Chinese factories: why marketplaces are not enough, what overseas buyers check, and how a website, search and LinkedIn work together to produce inquiries."] = "Un guide pratique pour les usines chinoises : pourquoi les marketplaces ne suffisent pas, ce que vérifient les acheteurs étrangers, et comment site, recherche et LinkedIn produisent ensemble des demandes.";
  fr["The trust signals overseas buyers look for on a Chinese factory website, the mistakes that make a real factory look unreliable, and how to fix them."] = "Les signaux de confiance que cherchent les acheteurs étrangers sur le site d’une usine chinoise, les erreurs qui font paraître une vraie usine peu fiable, et comment les corriger.";
  fr["A practical checklist of the pages, specifications and inquiry details a Chinese manufacturer website needs so overseas buyers can send a complete RFQ."] = "Une liste de contrôle pratique des pages, spécifications et informations de demande dont un site de fabricant chinois a besoin pour qu’un acheteur étranger envoie une demande complète.";
  fr["A practical international SEO checklist for Chinese manufacturers: URL structure, languages, hreflang, content, technical checks and measurement."] = "Une liste de contrôle SEO international pratique pour les fabricants chinois : structure d’URL, langues, hreflang, contenus, vérifications techniques et mesure.";
  fr["Questions a Chinese manufacturer should ask before hiring an export marketing or SEO agency: guarantees, ownership, reporting, content and red flags."] = "Les questions qu’un fabricant chinois doit poser avant d’engager une agence de marketing export ou SEO : garanties, propriété, reporting, contenus et signaux d’alerte.";
  fr["How Chinese manufacturers can use LinkedIn company pages and sales profiles to support export sales: setup, content, outreach and measurement."] = "Comment les fabricants chinois peuvent utiliser les pages entreprise et les profils commerciaux LinkedIn pour soutenir les ventes export : configuration, contenus, prospection et mesure.";
  fr["What Google’s AI Overviews and AI Mode mean for manufacturers’ websites, based on Google’s own documentation — and what is hype."] = "Ce que les AI Overviews et le mode IA de Google impliquent pour les sites d’industriels, d’après la documentation de Google — et ce qui n’est que du battage.";
  fr["How Chinese manufacturers can set up Google Ads for overseas B2B inquiries: location targeting, keywords, landing pages, conversion tracking and budgets."] = "Comment les fabricants chinois peuvent configurer Google Ads pour des demandes B2B à l’étranger : ciblage géographique, mots-clés, pages d’atterrissage, suivi des conversions et budgets.";
  fr["How to structure industrial product pages so overseas engineers and Google understand them: titles, specifications, documents, compliance and structured data."] = "Comment structurer les pages produit industrielles pour que les ingénieurs étrangers et Google les comprennent : titres, spécifications, documents, conformité et données structurées.";
  fr["How manufacturers can turn Canton Fair and trade-show contacts into RFQs: preparation, the website buyers check afterwards, follow-up timing and tracking."] = "Comment transformer les contacts du Canton Fair et des salons en demandes de devis : préparation, site que les acheteurs consultent ensuite, timing de relance et suivi.";
  fr["Why page speed matters for Chinese exporters’ websites, what Core Web Vitals measure, and practical fixes for hosting, images and scripts."] = "Pourquoi la vitesse de page compte pour les sites des exportateurs chinois, ce que mesurent les Core Web Vitals, et des correctifs concrets sur l’hébergement, les images et les scripts.";
  fr["Where Chinese manufacturing exports grew and fell in 2025 — and what it means for your website"] = "Où les exportations manufacturières chinoises ont progressé ou reculé en 2025 — et ce que cela implique pour votre site";
  fr["What 2025 provincial and city statistical bulletins show about export growth and decline by market, and how exporters can plan market pages from it."] = "Ce que les bulletins statistiques provinciaux et municipaux de 2025 montrent de la croissance et du recul des exportations par marché, et comment les exportateurs peuvent en tirer des pages marché.";
  fr["Market pages for buyers in ASEAN, the Middle East and Africa"] = "Des pages marché pour les acheteurs d’ASEAN, du Moyen-Orient et d’Afrique";
  fr["How Chinese manufacturers can build useful market pages for ASEAN, Middle East and African buyers: content, languages, hreflang and what to avoid."] = "Comment les fabricants chinois peuvent créer des pages marché utiles pour les acheteurs d’ASEAN, du Moyen-Orient et d’Afrique : contenus, langues, hreflang et erreurs à éviter.";
  fr["The certifications page: how exporters should present certificates to overseas buyers"] = "La page certifications : comment les exportateurs doivent présenter leurs certificats aux acheteurs étrangers";
  fr["How Chinese manufacturers can present certifications by market on their website — scope, models, validity and documents — without overclaiming."] = "Comment les fabricants chinois peuvent présenter leurs certifications par marché sur leur site — périmètre, modèles, validité et documents — sans exagérer.";
  fr["The shipping and logistics page: answering buyers’ delivery questions before they ask"] = "La page transport et logistique : répondre aux questions de livraison avant qu’elles soient posées";
  fr["What a Chinese manufacturer’s shipping page should cover — Incoterms, ports, packing, lead times and samples — so overseas buyers can plan and request a quote."] = "Ce que doit couvrir la page transport d’un fabricant chinois — Incoterms, ports, emballage, délais et échantillons — pour que les acheteurs étrangers puissent planifier et demander un devis.";
  fr["Standing out online when your whole city makes the same product"] = "Se démarquer en ligne quand toute votre ville fabrique le même produit";
  fr["How manufacturers in Chinese industrial clusters — pumps, fabrics, wigs, eyewear — can make their website stand out from hundreds of similar suppliers."] = "Comment les industriels des clusters chinois — pompes, tissus, perruques, lunettes — peuvent démarquer leur site de centaines de fournisseurs similaires.";
  fr["From PDF catalogue to product pages: making your range searchable"] = "Du catalogue PDF aux pages produit : rendre votre gamme trouvable";
  fr["Why Chinese manufacturers should turn PDF catalogues into HTML product pages, how to structure them, and how to keep PDFs useful as downloads."] = "Pourquoi les fabricants chinois doivent transformer leurs catalogues PDF en pages produit HTML, comment les structurer, et comment garder les PDF utiles en téléchargement.";
  fr["Guides to the main industries of Chinese manufacturing cities, based on official statistics, and what they mean for an export website."] = "Des guides sur les principales industries des villes manufacturières chinoises, fondés sur les statistiques officielles, et ce qu’elles impliquent pour un site export.";
  fr["Not sure where to start?"] = "Vous ne savez pas par où commencer ?";
  fr["Book a free consultation and we will tell you which of these guides matter most for your website."] = "Réservez une consultation gratuite et nous vous dirons lesquels de ces guides comptent le plus pour votre site.";
  fr["Solar & Renewable Power"] = "Solaire et énergies renouvelables";
  fr["Water & Wastewater Technology"] = "Eau et traitement des eaux usées";
  fr["Environmental & Circular Economy"] = "Environnement et économie circulaire";
  fr["Agritech & Agricultural Equipment"] = "Agritech et matériel agricole";
  fr["Smart Buildings & Urban Infrastructure"] = "Bâtiments intelligents et infrastructures urbaines";
  fr["Precision Manufacturing & Components"] = "Fabrication de précision et composants";
  fr["Automotive & Mobility Components"] = "Composants automobiles et de mobilité";
  fr["Aerospace & Aviation Supply Chain"] = "Chaîne d’approvisionnement aéronautique et spatiale";
  fr["Industrial HVAC & Building Systems"] = "CVC industriel et systèmes du bâtiment";
  fr["Construction Materials & Systems"] = "Matériaux et systèmes de construction";
  fr["Food Processing Equipment"] = "Équipements de transformation alimentaire";
  fr["Packaging & Printing Manufacturing"] = "Fabrication d’emballages et d’imprimés";
  fr["Textiles & Technical Fabrics"] = "Textiles et tissus techniques";
  fr["Furniture & Interior Manufacturing"] = "Ameublement et agencement intérieur";
  fr["Logistics & Warehouse Technology"] = "Logistique et technologies d’entrepôt";
  fr["Chemicals & Specialty Materials"] = "Chimie et matériaux spéciaux";
  fr["Mining & Mineral Processing Equipment"] = "Équipements miniers et de traitement des minerais";
  fr["Marine & Shipbuilding Supply Chain"] = "Chaîne d’approvisionnement maritime et navale";
  fr["Industrial Safety & Testing"] = "Sécurité industrielle et essais";
  fr["Apparel & Footwear Production"] = "Production de vêtements et de chaussures";
  fr["Commercial Cleaning & Hygiene Equipment"] = "Équipements de nettoyage et d’hygiène professionnels";
  fr["Across sectors"] = "Tous secteurs";
  fr["Some work depends on how the factory sells rather than what it makes."] = "Certains travaux dépendent de la façon dont l’usine vend, pas de ce qu’elle fabrique.";
  fr["OEM & ODM manufacturing"] = "Fabrication OEM et ODM";
  fr["For factories that build products for other brands."] = "Pour les usines qui fabriquent pour d’autres marques.";
  fr["China Manufacturing Regions We Serve | Hurfi"] = "Les régions manufacturières chinoises que nous servons | Hurfi";
  fr["China manufacturing regions we serve"] = "Les régions manufacturières chinoises que nous servons";
  fr["Guides for manufacturers in 39 Chinese cities, based on official industry statistics. Hurfi’s China office is in Xi’an; we work with manufacturers in the other cities remotely, and we do not have local offices there."] = "Des guides pour les industriels de 39 villes chinoises, fondés sur les statistiques officielles. Le bureau chinois de Hurfi est à Xi’an ; nous travaillons à distance avec les industriels des autres villes, où nous n’avons pas de bureau.";
  fr["Pearl River Delta (Guangdong)"] = "Delta de la rivière des Perles (Guangdong)";
  fr["Yangtze River Delta and Anhui"] = "Delta du Yangtsé et Anhui";
  fr["Bohai Rim and northeast China"] = "Golfe de Bohai et nord-est de la Chine";
  fr["Central and western China"] = "Chine centrale et occidentale";
  fr["Province guides"] = "Guides de province";
  fr["Province guides summarise official figures, link to the city guides and profile smaller manufacturing cities from their own statistical bulletins."] = "Les guides de province résument les chiffres officiels, renvoient aux guides de ville et présentent les villes manufacturières plus petites d’après leurs propres bulletins statistiques.";
  fr["Full China directory"] = "Annuaire complet de la Chine";
  fr["Insights for exporters"] = "Analyses pour les exportateurs";
  fr["Guangdong · city guide"] = "Guangdong · guide de ville";
  fr["Shanghai · city guide"] = "Shanghai · guide de ville";
  fr["Jiangsu · city guide"] = "Jiangsu · guide de ville";
  fr["Zhejiang · city guide"] = "Zhejiang · guide de ville";
  fr["Anhui · city guide"] = "Anhui · guide de ville";
  fr["Fujian · city guide"] = "Fujian · guide de ville";
  fr["Beijing · city guide"] = "Pékin · guide de ville";
  fr["Tianjin · city guide"] = "Tianjin · guide de ville";
  fr["Shandong · city guide"] = "Shandong · guide de ville";
  fr["Liaoning · city guide"] = "Liaoning · guide de ville";
  fr["Hubei · city guide"] = "Hubei · guide de ville";
  fr["Hunan · city guide"] = "Hunan · guide de ville";
  fr["Henan · city guide"] = "Henan · guide de ville";
  fr["Chongqing · city guide"] = "Chongqing · guide de ville";
  fr["Sichuan · city guide"] = "Sichuan · guide de ville";
  fr["Shaanxi · city guide"] = "Shaanxi · guide de ville";
  fr["Province guide · 1 city guides"] = "Guide de province · 1 guides de ville";
  fr["Province guide · 2 city guides"] = "Guide de province · 2 guides de ville";
  fr["Province guide · 3 city guides"] = "Guide de province · 3 guides de ville";
  fr["Province guide · 4 city guides"] = "Guide de province · 4 guides de ville";
  fr["Province guide · 5 city guides"] = "Guide de province · 5 guides de ville";
  fr["Province guide · 7 city guides"] = "Guide de province · 7 guides de ville";


  // Page labels and team names, 2026-10-20.
  zh["How Chinese manufacturers can win more overseas buyer inquiries"] = "中国制造商如何获得更多海外买家询盘";
  zh["Xi’an"] = "西安";
  zh["hostinger.com"] = "hostinger.com";
  zh["Nun Mohammad Maruf"] = "Nun Mohammad Maruf";
  zh["Shahriar Shawon"] = "Shahriar Shawon";
  zh["Siam Shekh"] = "Siam Shekh";
  zh["Sadman Sadat Siam"] = "Sadman Sadat Siam";
  zh["Ahnaf Afrid"] = "Ahnaf Afrid";
  fr["How Chinese manufacturers can win more overseas buyer inquiries"] = "Comment les fabricants chinois peuvent obtenir plus de demandes d’acheteurs étrangers";
  fr["Xi’an"] = "Xi’an";
  fr["hostinger.com"] = "hostinger.com";
  fr["Nun Mohammad Maruf"] = "Nun Mohammad Maruf";
  fr["Shahriar Shawon"] = "Shahriar Shawon";
  fr["Siam Shekh"] = "Siam Shekh";
  fr["Sadman Sadat Siam"] = "Sadman Sadat Siam";
  fr["Ahnaf Afrid"] = "Ahnaf Afrid";


  // Insight articles: trust signals, inquiries, RFQ checklist, 2026-10-20.
  zh["Factory Website Trust Signals Overseas Buyers Look For | Hurfi"] = "海外买家在工厂网站上寻找的信任信号 | Hurfi";
  zh["Overseas buyers have learned to be careful. Many have met trading companies presented as factories, copied photos and certificates that did not check out. A real factory can lose an inquiry simply because its website looks like those. Here is what buyers look for, written from the factory’s side."] = "海外买家已经学会了谨慎。很多人遇到过把贸易公司包装成工厂、盗用照片、证书经不起核查的情况。一家真实的工厂，可能只因为网站看起来像那些网站，就丢掉一条询盘。以下是买家真正在意的东西，从工厂的角度来写。";
  zh["By the Hurfi team ·"] = "Hurfi 团队 ·";
  zh["On this page"] = "本页内容";
  zh["Start with who you are"] = "先说清你是谁";
  zh["Show the factory, not stock images"] = "展示工厂，而不是图库照片";
  zh["Make certificates checkable"] = "让证书可核查";
  zh["Put the technical detail on the page"] = "把技术细节放在页面上";
  zh["Remove the warning signs"] = "去掉那些警示信号";
  zh["Explain what happens after an inquiry"] = "说明发出询盘之后会发生什么";
  zh["Keep it current"] = "保持更新";
  zh["The first signal is a clear, consistent identity:"] = "第一个信号是清晰、一致的身份：";
  zh["Your registered company name in English, the same on every page, profile and document."] = "英文注册公司名称，在每个页面、每个档案和每份文件上都保持一致。";
  zh["A real factory address, ideally with a map, and photos that match it."] = "真实的工厂地址，最好配地图，并且照片与地址相符。";
  zh["Named people a buyer can contact, with roles — not only a generic form."] = "写明可联系的人名和职位，而不是只有一个通用表单。";
  zh["The year the company was founded and what you actually manufacture in-house."] = "公司成立的年份，以及你们自己实际生产什么。";
  zh["If you are a trading company or work with partner factories, say so plainly. Buyers accept that much more easily than discovering it later."] = "如果你是贸易公司，或者与合作工厂一起生产，就直说。买家接受这一点，远比后来自己发现要容易得多。";
  zh["Stock photos of generic factories are recognised immediately. A few honest photos and short videos of your own production lines, inspection area and warehouse are worth more than a polished render. Name the equipment where it matters to the buyer — for example the machine types or test instruments you use."] = "通用工厂的图库照片一眼就能认出来。几张真实照片和短视频——你们自己的产线、检测区和仓库——比精美的效果图更有价值。在买家关心的地方写出设备名称，比如使用的机型或检测仪器。";
  zh["Certificates are only useful if a buyer can verify them. For each one, show:"] = "证书只有在买家能核查时才有用。每一份都要展示：";
  zh["The certificate itself, readable, not just a logo."] = "证书本身，清晰可读，而不只是一个标志。";
  zh["The certificate holder name, which should match your company name."] = "证书持有人名称，应与公司名称一致。";
  zh["The scope — which products or sites it covers."] = "适用范围——覆盖哪些产品或哪些厂区。";
  zh["The issuing body and the validity date."] = "发证机构和有效期。";
  zh["Do not show logos for certifications you do not hold, or imply that one model’s approval covers a whole range. Experienced buyers check, and a single mismatch can end the conversation."] = "不要展示自己没有的认证标志，也不要暗示某个型号的认证覆盖整个系列。有经验的买家会核查，一处对不上，沟通就结束了。";
  zh["Specifications hidden in a downloadable catalog, or published as images, make a site feel thin. Put the key data in HTML tables on each product or capability page, with units and test conditions. This helps buyers compare you, and it helps search engines understand what you make."] = "把规格只放在可下载的目录里，或者做成图片，会让网站显得单薄。把关键数据用 HTML 表格放在每个产品或能力页面上，写清单位和测试条件。这既方便买家比较，也让搜索引擎明白你做什么。";
  zh["Some details make a real factory look unreliable. Check your site for:"] = "有些细节会让真实的工厂显得不可靠。检查你的网站有没有：";
  zh["Broken links, empty pages or “coming soon” sections."] = "失效链接、空页面或“敬请期待”的版块。";
  zh["Machine-translated text and inconsistent product names."] = "机器翻译的文字，以及前后不一致的产品名称。";
  zh["Claims with no evidence: “No.1 in China”, “world-leading”, unexplained star ratings."] = "没有依据的说法：“中国第一”、“世界领先”、来路不明的星级评分。";
  zh["Contact details that differ between the website, LinkedIn and marketplace profiles."] = "网站、领英和平台档案上的联系方式不一致。";
  zh["A free email address as the only contact, instead of an address on your own domain."] = "只留一个免费邮箱，而不是自己域名下的邮箱。";
  zh["A buyer is more likely to write if they know what comes next: who replies, within what time, whether you sign an NDA for drawings, how samples work and what information you need for a quotation. One short paragraph near the inquiry form removes much of the hesitation."] = "如果买家知道接下来会发生什么，就更愿意来联系：谁回复、多久回、图纸是否签保密协议、样品怎么走、报价需要哪些信息。在询盘表单旁写一段话，就能消掉大部分犹豫。";
  zh["Out-of-date certificates, old product lines and copyright years from several years ago suggest a company that is not paying attention. Set a simple review cycle — for example every quarter — to check certificates, contact details and key product pages."] = "过期的证书、早就停产的产品线、还停在几年前版权的年份，都说明这家公司没有在用心经营。设一个简单的复查周期，比如每季度，检查证书、联系方式和重点产品页。";
  zh["Related guides"] = "相关指南";
  zh["Common questions"] = "常见问题";
  zh["Do we need to show client names?"] = "需要展示客户名称吗？";
  zh["No. Many factories cannot. Capability, process, equipment and quality evidence can build trust without naming clients."] = "不需要。很多工厂做不到。靠能力、工艺、设备和质量证据，同样可以在不点名客户的情况下建立信任。";
  zh["Are reviews and ratings important?"] = "评价和评分重要吗？";
  zh["Only if they are real and verifiable. An unexplained rating is a warning sign, not a trust signal."] = "只有在真实、可核查时才重要。来路不明的评分是警示信号，不是信任信号。";
  zh["Can Hurfi review our website for these issues?"] = "Hurfi 能帮我们检查网站上的这些问题吗？";
  zh["website review"] = "网站检查";
  zh["covers these points. See also"] = "涵盖这些要点。另见";
  zh["How Chinese Manufacturers Win Overseas Inquiries | Hurfi"] = "中国制造商如何赢得海外询盘 | Hurfi";
  zh["Marketplaces and trade shows still matter. But many overseas buyers now start with a search, a LinkedIn profile or a recommendation — and then check the factory’s own website before they write. This guide explains how to be ready for that check."] = "平台和展会依然重要。但很多海外买家现在从搜索、领英档案或熟人推荐开始，动笔之前会先看看工厂自己的网站。这份指南讲的就是如何应对这一步核查。";
  zh["Why a marketplace listing is not enough on its own"] = "为什么只靠平台店铺还不够";
  zh["What an overseas buyer checks before writing to you"] = "海外买家在联系你之前会核查什么";
  zh["Build the website around those questions"] = "围绕这些问题来建网站";
  zh["Let search bring the right buyers"] = "让搜索带来对的买家";
  zh["Use LinkedIn to show the people and the process"] = "用领英展示人和流程";
  zh["Answer quickly and consistently"] = "快速、一致地回复";
  zh["Measure what matters"] = "衡量真正重要的事";
  zh["B2B marketplaces are useful: they bring traffic and a familiar way to request quotes. The problem is that every supplier on the platform looks similar. Your listing sits next to dozens of others, often with the same photos, the same claims and prices that invite a race to the bottom."] = "B2B 平台是有用的：它们带来流量，也提供了买家熟悉的询价方式。问题在于平台上每家供应商看起来都差不多。你的店铺挨着几十家，往往用着同样的照片、同样的说法，价格则一路往下比。";
  zh["A buyer who is serious about a long-term supplier usually wants to know more than a listing can show: who you are, what you make yourself, what you outsource, which standards you work to and who they will deal with after the first order. That information belongs on a website you control."] = "真正想找长期供应商的买家，想知道的是店铺讲不清的东西：你是谁、哪些是自己做的、哪些外协、按什么标准生产，以及下单之后由谁对接。这些信息应该放在你自己能掌控的网站上。";
  zh["Before an engineer or purchasing manager sends a first message, they are trying to answer a few simple questions:"] = "工程师或采购经理在发出第一条消息之前，心里在回答几个简单的问题：";
  zh["Is this a real manufacturer, and where is the factory?"] = "这是真正的制造商吗？工厂在哪里？";
  zh["Do they make the product I need, to the specification and standard I need?"] = "他们能做我要的产品吗？符合我需要的规格和标准吗？";
  zh["Can they handle my volumes, and what is the minimum order?"] = "他们能承接我的量吗？最小起订量是多少？";
  zh["Who will answer me, in which language, and how quickly?"] = "谁来回复我？用什么语言？多快？";
  zh["What happens after I send an inquiry?"] = "发出询盘之后会怎样？";
  zh["If your website answers these questions in plain English, the buyer arrives at the first conversation already half-convinced. If it does not, many buyers simply move on without telling you why."] = "如果网站用清楚的英文回答了这些问题，买家在第一次沟通时就已经信了大半。如果没有，很多买家就直接走开，也不会告诉你原因。";
  zh["A factory website that produces inquiries is usually less about design and more about structure:"] = "能带来询盘的工厂网站，靠的通常不是设计，而是结构：";
  zh["Product or capability pages with specifications in HTML, not only in a PDF."] = "产品或能力页面，规格用 HTML 呈现，而不只放在 PDF 里。";
  zh["A factory and quality page with real photos, equipment, certificates and their scope."] = "工厂与质量页面，放真实照片、设备、证书及其适用范围。";
  zh["Application or industry pages that speak to the buyer’s problem."] = "面向应用或行业的页面，直接讲买家的问题。";
  zh["A clear inquiry path: what to send (drawings, quantities, target date) and what you will send back."] = "清晰的询盘路径：需要买家提供什么（图纸、数量、目标日期），以及你会回什么。";
  zh["We go through the practical checklist in"] = "我们的实用清单见";
  zh["what a manufacturer website needs for RFQs"] = "制造企业网站为询价需要准备什么";
  zh["Google search works best for manufacturers when it targets the specific questions buyers ask at the specification stage — product types, materials, standards, tolerances, compatibility — rather than broad phrases such as “China manufacturer”, which mostly attract price shoppers."] = "对制造商来说，谷歌搜索最有效的时候，是瞄准买家在选型阶段问的具体问题——产品类型、材料、标准、公差、兼容性——而不是“中国制造商”这类宽泛词，那些词招来的多半是只比价的人。";
  zh["This is slower than buying ads, and nobody can honestly promise a ranking. But pages that answer real technical questions keep working for years, and the buyers who arrive through them tend to be better qualified. Our"] = "这比买广告慢，也没有人能诚实承诺排名。但回答真实技术问题的页面能持续多年发挥作用，而从这些页面来的买家，通常更对口。我们的";
  zh["SEO service"] = "SEO 服务";
  zh["is built around this approach."] = "就是按这个思路做的。";
  zh["Buyers want to know who they will deal with. A company page with no posts, or posts made only of stock images, does not help. Short posts that show real production steps, inspection, packing and the engineers behind the product are more convincing — as long as you only share what your customers allow you to share."] = "买家想知道将来和谁打交道。公司主页没有内容，或者全是图库图片，帮不上忙。短帖展示真实的生产环节、检测、包装，以及产品背后的工程师，更有说服力——前提是只发客户允许公开的内容。";
  zh["LinkedIn is also where many buyers will check the person who replies to their inquiry. Make sure that person’s profile is complete and consistent with the website. See"] = "很多买家也会在领英上查看回复询盘的那个人。确保这个人的档案完整，并与网站一致。参见";
  zh["for how we approach this."] = "了解我们的做法。";
  zh["All of this is wasted if an inquiry waits three days for a reply, or if the reply ignores the buyer’s question. Decide who answers inquiries, in which language, and within what time. Use the same company name, address and contact details on the website, LinkedIn and every marketplace profile, so a buyer who checks finds one consistent picture."] = "如果一条询盘要等三天才回，或者回复根本没有回答买家的问题，前面这些都白做。定好谁来回复、用什么语言、多长时间内回。网站、领英和各个平台档案上的公司名称、地址和联系方式要一致，这样买家一核查，看到的是同一幅画面。";
  zh["Track qualified inquiries, not only traffic. Connect Google Search Console and a privacy-respecting analytics tool, note where each inquiry came from, and review it monthly. That tells you which pages and channels are worth more effort — and which are not."] = "跟踪有效询盘，而不只是流量。接入 Google Search Console 和尊重隐私的分析工具，记录每条询盘的来源，每月复盘一次。这样你就知道哪些页面和渠道值得多投入，哪些不值得。";
  zh["OEM & ODM Manufacturing"] = "OEM 与 ODM 制造";
  zh["Should we stop using B2B marketplaces?"] = "我们应该停用 B2B 平台吗？";
  zh["Not necessarily. Many factories use both. Your own website gives buyers a place to verify you and gives you inquiries that do not depend on one platform."] = "不一定。很多工厂两者都用。自己的网站给买家一个核查你的地方，也让你拿到不完全依赖某个平台的询盘。";
  zh["How long does it take for search to bring inquiries?"] = "搜索要多久才能带来询盘？";
  zh["It depends on your market, competition and the state of your current site. Nobody can honestly promise a timeline; regular reporting shows whether it is working."] = "取决于你的市场、竞争情况以及现有网站的状态。没有人能诚实承诺时间表；定期汇报能看出是否在起作用。";
  zh["Can Hurfi help with this?"] = "Hurfi 能帮上忙吗？";
  zh["Yes — with"] = "可以——从";
  zh["digital marketing"] = "数字营销";
  zh["is the place to start."] = "开始。";
  zh["Manufacturer Website RFQ Checklist: Pages That Get Quotes | Hurfi"] = "制造企业网站询价清单：能带来报价的页面 | Hurfi";
  zh["A request for quotation is a buyer telling you they are ready to compare prices. Your website can make that easy — or it can make the buyer give up halfway. This checklist covers the pages and details that help an overseas buyer send a complete RFQ."] = "询价是买家在告诉你：他们准备比价了。你的网站可以让这一步很顺，也可以让买家中途放弃。这份清单列出那些能帮海外买家发出完整询价的页面和细节。";
  zh["1. Product or capability pages a buyer can compare"] = "1. 买家可以对比的产品或能力页面";
  zh["2. A factory and quality page"] = "2. 工厂与质量页面";
  zh["3. Commercial basics, stated plainly"] = "3. 讲清楚的商业条件";
  zh["4. An inquiry form that asks for the right things"] = "4. 问对信息的询盘表单";
  zh["5. Application and industry pages"] = "5. 应用与行业页面";
  zh["6. Technical basics for search"] = "6. 面向搜索的技术基础";
  zh["7. One consistent contact path"] = "7. 一致的联系路径";
  zh["Every main product family or manufacturing capability should have its own page with:"] = "每个主要产品系列或制造能力都应有自己的页面，包含：";
  zh["A clear name in the terms buyers use, not only your internal model codes."] = "用买家熟悉的说法命名，而不只是内部型号代码。";
  zh["A specification table in HTML, with units and tolerances."] = "HTML 规格表，写清单位和公差。";
  zh["Materials, finishes and options."] = "材料、表面处理和可选项。";
  zh["Downloadable datasheets, drawings or CAD files where relevant."] = "相关时提供可下载的数据表、图纸或 CAD 文件。";
  zh["A request-a-quote link on the page itself."] = "页面上直接放询价链接。";
  zh["Buyers want to know they are dealing with the manufacturer. Show production equipment, inspection and testing, the quality system and certificates with their scope and validity. Real photos matter more than design."] = "买家想知道自己是在和制造商打交道。展示生产设备、检测与试验、质量体系，以及注明范围和有效期的证书。真实照片比设计更重要。";
  zh["Many RFQs stall on simple questions. Answer them on the site:"] = "很多询价卡在简单的问题上。把这些答案放在网站上：";
  zh["Minimum order quantity, or how MOQ is decided."] = "最小起订量，或者最小起订量是如何确定的。";
  zh["Typical lead time for samples and for production."] = "样品和批量生产的常见交期。";
  zh["Sample policy and cost."] = "样品政策和费用。";
  zh["Incoterms you usually quote and the ports you ship from."] = "常用的 Incoterms 和发货港口。";
  zh["Payment terms you normally accept."] = "通常接受的付款条件。";
  zh["A good RFQ form is short but specific. Useful fields include:"] = "好的询价表单要短，但要具体。有用的字段包括：";
  zh["Product or part, and quantity."] = "产品或零件，以及数量。";
  zh["Target date."] = "目标日期。";
  zh["Drawing or file upload, with an NDA option if you offer one."] = "图纸或文件上传，若可提供则加上保密协议选项。";
  zh["Application or end use."] = "应用场景或最终用途。";
  zh["Contact details and the preferred way to reply — email, WeChat or WhatsApp."] = "联系方式，以及希望的回复方式——邮件、微信或 WhatsApp。";
  zh["After submission, show a confirmation that says who will reply and when, and send an automatic acknowledgment. Then make sure someone actually replies."] = "提交之后，显示一条确认，说明谁会回复、什么时候回，并自动发一封确认信。然后确保真的有人回复。";
  zh["Engineers often search by problem or application, not by product name. Pages that explain how your product is used in a specific industry — with the relevant standards and examples you are allowed to share — bring better-qualified visitors and give them confidence you understand their field. Our"] = "工程师常常按问题或应用来搜索，而不是按产品名称。说明产品在某个行业里如何使用的页面——配上相关标准和可以公开的案例——能带来更对口的访客，也让他们相信你懂这一行。我们的";
  zh["show the sectors we work with."] = "列出了我们服务的行业。";
  zh["None of this helps if search engines cannot read it:"] = "如果搜索引擎读不到，这些都白费：";
  zh["Each page has a unique, descriptive title and one clear heading."] = "每个页面有唯一、描述性的标题，以及一个清晰的主标题。";
  zh["Specifications are text, not images."] = "规格是文字，不是图片。";
  zh["Pages load quickly on mobile, with compressed images."] = "页面在手机上加载快，图片经过压缩。";
  zh["The site has a sitemap, and important pages are linked from the navigation."] = "网站有站点地图，重要页面在导航中有链接。";
  zh["Google Search Console is connected so you can see how buyers find you."] = "接入 Google Search Console，看清买家是怎么找到你的。";
  zh["covers this technical layer."] = "涵盖这一层技术工作。";
  zh["Use one company name, one set of contact details and one inquiry process across the website, LinkedIn and marketplaces. Route different requests — quotes, support, partnerships — to the right person, so none of them waits."] = "网站、领英和平台上使用同一个公司名称、同一套联系方式、同一套询盘流程。把不同请求——报价、售后、合作——分流给对的人，别让任何一件等着。";
  zh["Do we need prices on the website?"] = "网站上需要标价吗？";
  zh["Not usually for custom or industrial products. But clear MOQ, lead-time and sample information helps buyers decide to send an RFQ."] = "定制品或工业品通常不需要。但写清最小起订量、交期和样品信息，能帮买家下决心发询价。";
  zh["Should the RFQ form allow file uploads?"] = "询价表单应该允许上传文件吗？";
  zh["For drawing-based work, yes. State what file types you accept and how you protect them."] = "以图纸为主的工作，需要。写明接受哪些格式，以及你如何保护这些文件。";
  zh["Can Hurfi build this for us?"] = "Hurfi 能帮我们做这些吗？";
  zh["Yes — see"] = "可以——请见";
  zh["book a consultation"] = "预约咨询";
  fr["Factory Website Trust Signals Overseas Buyers Look For | Hurfi"] = "Les signaux de confiance que cherchent les acheteurs étrangers | Hurfi";
  fr["Overseas buyers have learned to be careful. Many have met trading companies presented as factories, copied photos and certificates that did not check out. A real factory can lose an inquiry simply because its website looks like those. Here is what buyers look for, written from the factory’s side."] = "Les acheteurs étrangers ont appris à se méfier. Beaucoup ont eu affaire à des sociétés de négoce présentées comme des usines, à des photos copiées et à des certificats invérifiables. Une vraie usine peut perdre une demande simplement parce que son site ressemble à ceux-là. Voici ce que les acheteurs regardent, vu du côté de l’usine.";
  fr["By the Hurfi team ·"] = "Par l’équipe Hurfi ·";
  fr["On this page"] = "Sur cette page";
  fr["Start with who you are"] = "Commencez par dire qui vous êtes";
  fr["Show the factory, not stock images"] = "Montrez l’usine, pas des photos de banque d’images";
  fr["Make certificates checkable"] = "Rendez les certificats vérifiables";
  fr["Put the technical detail on the page"] = "Mettez les détails techniques sur la page";
  fr["Remove the warning signs"] = "Supprimez les signaux d’alerte";
  fr["Explain what happens after an inquiry"] = "Expliquez ce qui se passe après une demande";
  fr["Keep it current"] = "Tenez-le à jour";
  fr["The first signal is a clear, consistent identity:"] = "Le premier signal est une identité claire et cohérente :";
  fr["Your registered company name in English, the same on every page, profile and document."] = "Votre raison sociale en anglais, identique sur chaque page, profil et document.";
  fr["A real factory address, ideally with a map, and photos that match it."] = "Une adresse d’usine réelle, idéalement avec une carte, et des photos qui y correspondent.";
  fr["Named people a buyer can contact, with roles — not only a generic form."] = "Des personnes nommées, avec leur fonction — pas seulement un formulaire générique.";
  fr["The year the company was founded and what you actually manufacture in-house."] = "L’année de création et ce que vous fabriquez réellement en interne.";
  fr["If you are a trading company or work with partner factories, say so plainly. Buyers accept that much more easily than discovering it later."] = "Si vous êtes une société de négoce ou si vous travaillez avec des usines partenaires, dites-le clairement. Les acheteurs l’acceptent bien mieux que de le découvrir plus tard.";
  fr["Stock photos of generic factories are recognised immediately. A few honest photos and short videos of your own production lines, inspection area and warehouse are worth more than a polished render. Name the equipment where it matters to the buyer — for example the machine types or test instruments you use."] = "Les photos de banque d’images montrant des usines génériques se repèrent immédiatement. Quelques photos honnêtes et de courtes vidéos de vos propres lignes, de votre zone de contrôle et de votre entrepôt valent plus qu’un rendu léché. Nommez les équipements là où cela compte pour l’acheteur, par exemple les types de machines ou les instruments d’essai utilisés.";
  fr["Certificates are only useful if a buyer can verify them. For each one, show:"] = "Un certificat n’est utile que si l’acheteur peut le vérifier. Pour chacun, montrez :";
  fr["The certificate itself, readable, not just a logo."] = "Le certificat lui-même, lisible, pas seulement un logo.";
  fr["The certificate holder name, which should match your company name."] = "Le nom du titulaire, qui doit correspondre à votre raison sociale.";
  fr["The scope — which products or sites it covers."] = "Le périmètre : quels produits ou quels sites il couvre.";
  fr["The issuing body and the validity date."] = "L’organisme émetteur et la date de validité.";
  fr["Do not show logos for certifications you do not hold, or imply that one model’s approval covers a whole range. Experienced buyers check, and a single mismatch can end the conversation."] = "N’affichez pas de logos de certifications que vous ne détenez pas et ne laissez pas entendre qu’une homologation pour un modèle couvre toute une gamme. Les acheteurs expérimentés vérifient, et une seule incohérence peut mettre fin à la discussion.";
  fr["Specifications hidden in a downloadable catalog, or published as images, make a site feel thin. Put the key data in HTML tables on each product or capability page, with units and test conditions. This helps buyers compare you, and it helps search engines understand what you make."] = "Des spécifications cachées dans un catalogue à télécharger, ou publiées sous forme d’images, donnent une impression de site vide. Placez les données clés dans des tableaux HTML sur chaque page produit ou capacité, avec unités et conditions d’essai. Cela aide les acheteurs à vous comparer et les moteurs de recherche à comprendre ce que vous fabriquez.";
  fr["Some details make a real factory look unreliable. Check your site for:"] = "Certains détails font paraître une vraie usine peu fiable. Vérifiez si votre site contient :";
  fr["Broken links, empty pages or “coming soon” sections."] = "Des liens morts, des pages vides ou des sections « bientôt disponible ».";
  fr["Machine-translated text and inconsistent product names."] = "Des textes traduits automatiquement et des noms de produits incohérents.";
  fr["Claims with no evidence: “No.1 in China”, “world-leading”, unexplained star ratings."] = "Des affirmations sans preuve : « n°1 en Chine », « leader mondial », des notes en étoiles inexpliquées.";
  fr["Contact details that differ between the website, LinkedIn and marketplace profiles."] = "Des coordonnées différentes entre le site, LinkedIn et les profils de marketplace.";
  fr["A free email address as the only contact, instead of an address on your own domain."] = "Une adresse e-mail gratuite comme seul contact, au lieu d’une adresse sur votre propre domaine.";
  fr["A buyer is more likely to write if they know what comes next: who replies, within what time, whether you sign an NDA for drawings, how samples work and what information you need for a quotation. One short paragraph near the inquiry form removes much of the hesitation."] = "Un acheteur écrit plus volontiers s’il sait ce qui suit : qui répond, sous quel délai, si vous signez un accord de confidentialité pour les plans, comment fonctionnent les échantillons et quelles informations vous demandez pour chiffrer. Un court paragraphe près du formulaire lève l’essentiel de l’hésitation.";
  fr["Out-of-date certificates, old product lines and copyright years from several years ago suggest a company that is not paying attention. Set a simple review cycle — for example every quarter — to check certificates, contact details and key product pages."] = "Des certificats périmés, des gammes abandonnées et une année de copyright vieille de plusieurs années suggèrent une entreprise qui ne suit pas. Fixez un cycle de revue simple, par exemple trimestriel, pour vérifier certificats, coordonnées et pages produit clés.";
  fr["Related guides"] = "Guides associés";
  fr["Common questions"] = "Questions fréquentes";
  fr["Do we need to show client names?"] = "Faut-il afficher des noms de clients ?";
  fr["No. Many factories cannot. Capability, process, equipment and quality evidence can build trust without naming clients."] = "Non. Beaucoup d’usines ne le peuvent pas. Les capacités, les procédés, les équipements et les preuves qualité construisent la confiance sans nommer de clients.";
  fr["Are reviews and ratings important?"] = "Les avis et les notes sont-ils importants ?";
  fr["Only if they are real and verifiable. An unexplained rating is a warning sign, not a trust signal."] = "Seulement s’ils sont réels et vérifiables. Une note inexpliquée est un signal d’alerte, pas un signal de confiance.";
  fr["Can Hurfi review our website for these issues?"] = "Hurfi peut-il auditer notre site sur ces points ?";
  fr["website review"] = "audit de site";
  fr["covers these points. See also"] = "couvre ces points. Voir aussi";
  fr["How Chinese Manufacturers Win Overseas Inquiries | Hurfi"] = "Comment les fabricants chinois obtiennent des demandes étrangères | Hurfi";
  fr["Marketplaces and trade shows still matter. But many overseas buyers now start with a search, a LinkedIn profile or a recommendation — and then check the factory’s own website before they write. This guide explains how to be ready for that check."] = "Les marketplaces et les salons comptent toujours. Mais beaucoup d’acheteurs étrangers commencent désormais par une recherche, un profil LinkedIn ou une recommandation, puis vérifient le site de l’usine avant d’écrire. Ce guide explique comment être prêt pour cette vérification.";
  fr["Why a marketplace listing is not enough on its own"] = "Pourquoi une fiche marketplace ne suffit pas";
  fr["What an overseas buyer checks before writing to you"] = "Ce qu’un acheteur étranger vérifie avant de vous écrire";
  fr["Build the website around those questions"] = "Construire le site autour de ces questions";
  fr["Let search bring the right buyers"] = "Laisser la recherche amener les bons acheteurs";
  fr["Use LinkedIn to show the people and the process"] = "Utiliser LinkedIn pour montrer les personnes et le processus";
  fr["Answer quickly and consistently"] = "Répondre vite et de façon cohérente";
  fr["Measure what matters"] = "Mesurer ce qui compte";
  fr["B2B marketplaces are useful: they bring traffic and a familiar way to request quotes. The problem is that every supplier on the platform looks similar. Your listing sits next to dozens of others, often with the same photos, the same claims and prices that invite a race to the bottom."] = "Les marketplaces B2B sont utiles : elles apportent du trafic et un moyen connu de demander des devis. Le problème est que tous les fournisseurs de la plateforme se ressemblent. Votre fiche côtoie des dizaines d’autres, souvent avec les mêmes photos, les mêmes promesses et des prix qui poussent à la surenchère vers le bas.";
  fr["A buyer who is serious about a long-term supplier usually wants to know more than a listing can show: who you are, what you make yourself, what you outsource, which standards you work to and who they will deal with after the first order. That information belongs on a website you control."] = "Un acheteur qui cherche un fournisseur durable veut savoir plus qu’une fiche ne peut montrer : qui vous êtes, ce que vous fabriquez vous-même, ce que vous sous-traitez, selon quelles normes vous travaillez et à qui il aura affaire après la première commande. Ces informations appartiennent à un site que vous maîtrisez.";
  fr["Before an engineer or purchasing manager sends a first message, they are trying to answer a few simple questions:"] = "Avant d’envoyer un premier message, un ingénieur ou un acheteur cherche à répondre à quelques questions simples :";
  fr["Is this a real manufacturer, and where is the factory?"] = "Est-ce un vrai fabricant, et où se trouve l’usine ?";
  fr["Do they make the product I need, to the specification and standard I need?"] = "Fabriquent-ils le produit dont j’ai besoin, selon la spécification et la norme requises ?";
  fr["Can they handle my volumes, and what is the minimum order?"] = "Peuvent-ils absorber mes volumes, et quelle est la quantité minimale ?";
  fr["Who will answer me, in which language, and how quickly?"] = "Qui me répondra, dans quelle langue et sous quel délai ?";
  fr["What happens after I send an inquiry?"] = "Que se passe-t-il après l’envoi de ma demande ?";
  fr["If your website answers these questions in plain English, the buyer arrives at the first conversation already half-convinced. If it does not, many buyers simply move on without telling you why."] = "Si votre site répond à ces questions dans un anglais clair, l’acheteur arrive au premier échange à moitié convaincu. Sinon, beaucoup passent simplement à autre chose sans vous dire pourquoi.";
  fr["A factory website that produces inquiries is usually less about design and more about structure:"] = "Un site d’usine qui génère des demandes doit moins à son design qu’à sa structure :";
  fr["Product or capability pages with specifications in HTML, not only in a PDF."] = "Des pages produit ou capacité avec les spécifications en HTML, pas seulement en PDF.";
  fr["A factory and quality page with real photos, equipment, certificates and their scope."] = "Une page usine et qualité avec de vraies photos, les équipements, les certificats et leur périmètre.";
  fr["Application or industry pages that speak to the buyer’s problem."] = "Des pages application ou secteur qui parlent du problème de l’acheteur.";
  fr["A clear inquiry path: what to send (drawings, quantities, target date) and what you will send back."] = "Un parcours de demande clair : ce qu’il faut envoyer (plans, quantités, date visée) et ce que vous renvoyez.";
  fr["We go through the practical checklist in"] = "Nous détaillons la liste pratique dans";
  fr["what a manufacturer website needs for RFQs"] = "ce dont un site d’industriel a besoin pour les demandes de devis";
  fr["Google search works best for manufacturers when it targets the specific questions buyers ask at the specification stage — product types, materials, standards, tolerances, compatibility — rather than broad phrases such as “China manufacturer”, which mostly attract price shoppers."] = "La recherche Google fonctionne le mieux pour un industriel lorsqu’elle vise les questions précises que se posent les acheteurs au stade de la spécification — types de produits, matériaux, normes, tolérances, compatibilité — plutôt que des expressions larges comme « fabricant chinois », qui attirent surtout des acheteurs de prix.";
  fr["This is slower than buying ads, and nobody can honestly promise a ranking. But pages that answer real technical questions keep working for years, and the buyers who arrive through them tend to be better qualified. Our"] = "C’est plus lent que d’acheter de la publicité, et personne ne peut honnêtement promettre un classement. Mais les pages qui répondent à de vraies questions techniques travaillent pendant des années, et les acheteurs qui arrivent par elles sont généralement mieux qualifiés. Notre";
  fr["SEO service"] = "service SEO";
  fr["is built around this approach."] = "est construit autour de cette approche.";
  fr["Buyers want to know who they will deal with. A company page with no posts, or posts made only of stock images, does not help. Short posts that show real production steps, inspection, packing and the engineers behind the product are more convincing — as long as you only share what your customers allow you to share."] = "Les acheteurs veulent savoir à qui ils auront affaire. Une page entreprise sans publications, ou remplie d’images de banque, n’aide pas. De courtes publications montrant de vraies étapes de production, le contrôle, l’emballage et les ingénieurs derrière le produit convainquent davantage — à condition de ne partager que ce que vos clients autorisent.";
  fr["LinkedIn is also where many buyers will check the person who replies to their inquiry. Make sure that person’s profile is complete and consistent with the website. See"] = "C’est aussi sur LinkedIn que beaucoup d’acheteurs vérifieront la personne qui répond à leur demande. Assurez-vous que son profil est complet et cohérent avec le site. Voir";
  fr["for how we approach this."] = "pour notre approche.";
  fr["All of this is wasted if an inquiry waits three days for a reply, or if the reply ignores the buyer’s question. Decide who answers inquiries, in which language, and within what time. Use the same company name, address and contact details on the website, LinkedIn and every marketplace profile, so a buyer who checks finds one consistent picture."] = "Tout cela est inutile si une demande attend trois jours une réponse, ou si la réponse ignore la question de l’acheteur. Décidez qui répond, dans quelle langue et sous quel délai. Utilisez le même nom, la même adresse et les mêmes coordonnées sur le site, LinkedIn et chaque profil de marketplace, pour qu’un acheteur qui vérifie trouve une image cohérente.";
  fr["Track qualified inquiries, not only traffic. Connect Google Search Console and a privacy-respecting analytics tool, note where each inquiry came from, and review it monthly. That tells you which pages and channels are worth more effort — and which are not."] = "Suivez les demandes qualifiées, pas seulement le trafic. Connectez Google Search Console et un outil d’analyse respectueux de la vie privée, notez l’origine de chaque demande et faites une revue mensuelle. Vous saurez quelles pages et quels canaux méritent plus d’efforts, et lesquels non.";
  fr["OEM & ODM Manufacturing"] = "Fabrication OEM et ODM";
  fr["Should we stop using B2B marketplaces?"] = "Faut-il arrêter les marketplaces B2B ?";
  fr["Not necessarily. Many factories use both. Your own website gives buyers a place to verify you and gives you inquiries that do not depend on one platform."] = "Pas forcément. Beaucoup d’usines utilisent les deux. Votre site donne aux acheteurs un endroit pour vous vérifier et vous apporte des demandes qui ne dépendent pas d’une seule plateforme.";
  fr["How long does it take for search to bring inquiries?"] = "Combien de temps faut-il pour que la recherche apporte des demandes ?";
  fr["It depends on your market, competition and the state of your current site. Nobody can honestly promise a timeline; regular reporting shows whether it is working."] = "Cela dépend de votre marché, de la concurrence et de l’état de votre site. Personne ne peut honnêtement promettre un délai ; un reporting régulier montre si cela fonctionne.";
  fr["Can Hurfi help with this?"] = "Hurfi peut-il aider ?";
  fr["Yes — with"] = "Oui — avec";
  fr["digital marketing"] = "le marketing digital";
  fr["is the place to start."] = "il faut commencer là.";
  fr["Manufacturer Website RFQ Checklist: Pages That Get Quotes | Hurfi"] = "Liste de contrôle RFQ pour site d’usine : les pages qui obtiennent des devis | Hurfi";
  fr["A request for quotation is a buyer telling you they are ready to compare prices. Your website can make that easy — or it can make the buyer give up halfway. This checklist covers the pages and details that help an overseas buyer send a complete RFQ."] = "Une demande de devis, c’est un acheteur qui vous dit qu’il est prêt à comparer les prix. Votre site peut le rendre simple — ou le faire abandonner en route. Cette liste couvre les pages et les informations qui aident un acheteur étranger à envoyer une demande complète.";
  fr["1. Product or capability pages a buyer can compare"] = "1. Des pages produit ou capacité comparables";
  fr["2. A factory and quality page"] = "2. Une page usine et qualité";
  fr["3. Commercial basics, stated plainly"] = "3. Les bases commerciales, énoncées clairement";
  fr["4. An inquiry form that asks for the right things"] = "4. Un formulaire qui demande les bonnes informations";
  fr["5. Application and industry pages"] = "5. Des pages application et secteur";
  fr["6. Technical basics for search"] = "6. Les bases techniques pour la recherche";
  fr["7. One consistent contact path"] = "7. Un parcours de contact cohérent";
  fr["Every main product family or manufacturing capability should have its own page with:"] = "Chaque grande famille de produits ou capacité de fabrication doit avoir sa page, avec :";
  fr["A clear name in the terms buyers use, not only your internal model codes."] = "Un nom clair dans les termes employés par les acheteurs, pas seulement vos références internes.";
  fr["A specification table in HTML, with units and tolerances."] = "Un tableau de spécifications en HTML, avec unités et tolérances.";
  fr["Materials, finishes and options."] = "Matériaux, finitions et options.";
  fr["Downloadable datasheets, drawings or CAD files where relevant."] = "Des fiches techniques, plans ou fichiers CAO téléchargeables lorsque c’est pertinent.";
  fr["A request-a-quote link on the page itself."] = "Un lien de demande de devis sur la page elle-même.";
  fr["Buyers want to know they are dealing with the manufacturer. Show production equipment, inspection and testing, the quality system and certificates with their scope and validity. Real photos matter more than design."] = "Les acheteurs veulent savoir qu’ils traitent avec le fabricant. Montrez les équipements de production, le contrôle et les essais, le système qualité et les certificats avec leur périmètre et leur validité. De vraies photos comptent plus que le design.";
  fr["Many RFQs stall on simple questions. Answer them on the site:"] = "Beaucoup de demandes bloquent sur des questions simples. Répondez-y sur le site :";
  fr["Minimum order quantity, or how MOQ is decided."] = "La quantité minimale, ou comment elle est déterminée.";
  fr["Typical lead time for samples and for production."] = "Les délais habituels pour les échantillons et pour la production.";
  fr["Sample policy and cost."] = "La politique d’échantillons et leur coût.";
  fr["Incoterms you usually quote and the ports you ship from."] = "Les Incoterms que vous citez habituellement et les ports de départ.";
  fr["Payment terms you normally accept."] = "Les conditions de paiement que vous acceptez.";
  fr["A good RFQ form is short but specific. Useful fields include:"] = "Un bon formulaire de devis est court mais précis. Les champs utiles incluent :";
  fr["Product or part, and quantity."] = "Le produit ou la pièce, et la quantité.";
  fr["Target date."] = "La date visée.";
  fr["Drawing or file upload, with an NDA option if you offer one."] = "Le téléversement de plans ou de fichiers, avec une option d’accord de confidentialité si vous en proposez un.";
  fr["Application or end use."] = "L’application ou l’usage final.";
  fr["Contact details and the preferred way to reply — email, WeChat or WhatsApp."] = "Les coordonnées et le moyen de réponse préféré — e-mail, WeChat ou WhatsApp.";
  fr["After submission, show a confirmation that says who will reply and when, and send an automatic acknowledgment. Then make sure someone actually replies."] = "Après l’envoi, affichez une confirmation indiquant qui répondra et quand, et envoyez un accusé de réception automatique. Puis assurez-vous que quelqu’un réponde vraiment.";
  fr["Engineers often search by problem or application, not by product name. Pages that explain how your product is used in a specific industry — with the relevant standards and examples you are allowed to share — bring better-qualified visitors and give them confidence you understand their field. Our"] = "Les ingénieurs cherchent souvent par problème ou par application, pas par nom de produit. Les pages qui expliquent l’usage de votre produit dans un secteur donné — avec les normes pertinentes et les exemples que vous pouvez partager — amènent des visiteurs mieux qualifiés et leur donnent confiance en votre connaissance du domaine. Nos";
  fr["show the sectors we work with."] = "présentent les secteurs avec lesquels nous travaillons.";
  fr["None of this helps if search engines cannot read it:"] = "Rien de tout cela ne sert si les moteurs de recherche ne peuvent pas le lire :";
  fr["Each page has a unique, descriptive title and one clear heading."] = "Chaque page a un titre unique et descriptif, et un titre principal clair.";
  fr["Specifications are text, not images."] = "Les spécifications sont du texte, pas des images.";
  fr["Pages load quickly on mobile, with compressed images."] = "Les pages se chargent vite sur mobile, avec des images compressées.";
  fr["The site has a sitemap, and important pages are linked from the navigation."] = "Le site a un sitemap et les pages importantes sont liées depuis la navigation.";
  fr["Google Search Console is connected so you can see how buyers find you."] = "Search Console est connecté pour voir comment les acheteurs vous trouvent.";
  fr["covers this technical layer."] = "couvre cette couche technique.";
  fr["Use one company name, one set of contact details and one inquiry process across the website, LinkedIn and marketplaces. Route different requests — quotes, support, partnerships — to the right person, so none of them waits."] = "Utilisez un seul nom d’entreprise, un seul jeu de coordonnées et un seul processus de demande sur le site, LinkedIn et les marketplaces. Acheminez les différentes demandes — devis, support, partenariats — vers la bonne personne, pour qu’aucune n’attende.";
  fr["Do we need prices on the website?"] = "Faut-il afficher des prix sur le site ?";
  fr["Not usually for custom or industrial products. But clear MOQ, lead-time and sample information helps buyers decide to send an RFQ."] = "En général non pour des produits sur mesure ou industriels. Mais des informations claires sur la quantité minimale, les délais et les échantillons aident l’acheteur à envoyer une demande.";
  fr["Should the RFQ form allow file uploads?"] = "Le formulaire doit-il permettre de joindre des fichiers ?";
  fr["For drawing-based work, yes. State what file types you accept and how you protect them."] = "Pour les travaux basés sur des plans, oui. Indiquez les formats acceptés et comment vous les protégez.";
  fr["Can Hurfi build this for us?"] = "Hurfi peut-il le mettre en place ?";
  fr["Yes — see"] = "Oui — voir";
  fr["book a consultation"] = "réserver une consultation";

  function map() {
    if (current() === "zh") return zh;
    if (current() === "fr") return fr;
    return null;
  }

  function htmlLang() {
    if (STATIC) return document.documentElement.getAttribute("lang") || "zh-Hans";
    if (current() === "zh") return "zh-CN";
    if (current() === "fr") return "fr";
    return "en";
  }

  function apply(root) {
    document.documentElement.lang = htmlLang();
    var phrases = map();
    if (!phrases) return;
    root = root || document.body;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        var tag = parent.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return NodeFilter.FILTER_REJECT;
        if (parent.closest && parent.closest(".lang-switch")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var raw = node.nodeValue;
      if (!raw || !raw.trim()) return;
      var core = raw.trim();
      // A heading broken over several source lines carries newlines and runs of
      // indentation inside one text node; collapse them before the lookup.
      var key = core.replace(/\s+/g, " ");
      var out = phrases[core] || phrases[key];
      if (!out) return;
      node.nodeValue = raw.replace(core, out);
    });
    ["aria-label", "placeholder", "alt", "title", "data-label", "data-tip"].forEach(function (attr) {
      root.querySelectorAll("[" + attr + "]").forEach(function (el) {
        var value = el.getAttribute(attr);
        if (value && phrases[value]) el.setAttribute(attr, phrases[value]);
      });
    });
    if (phrases[document.title]) document.title = phrases[document.title];
  }

  function bindLang(group) {
    var lang = current();
    group.querySelectorAll("button[data-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-lang") === lang ? "true" : "false");
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", function () {
        var want = button.getAttribute("data-lang");
        try { localStorage.setItem(STORAGE, want); } catch (e) {}
        // Prefer a real translated URL when the page declares one (hreflang).
        var target = null;
        if (want === "zh") target = document.querySelector('link[rel="alternate"][hreflang^="zh"]');
        else if (STATIC) target = document.querySelector('link[rel="alternate"][hreflang="en"]');
        if (target && target.href) {
          // Use the path only, so previews and local servers stay on their own host.
          var path = target.getAttribute("href").replace(/^https?:\/\/[^\/]+/, "");
          if (path && path !== window.location.pathname) { window.location.assign(path); return; }
        }
        window.location.reload();
      });
    });
  }

  // A language is offered only where the dictionary actually covers the page.
  // Before this, the switch promised French on articles whose body stayed
  // English; now the button appears once coverage is real, and disappears again
  // if a page grows faster than its translation.
  var MIN_COVERAGE = 0.9;

  function textNodes() {
    var out = [];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        var tag = parent.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent.closest && parent.closest(".lang-switch")) {
          return NodeFilter.FILTER_REJECT;
        }
        // Proper nouns, numbers, arrows and logo letters are not prose: a
        // translatable node carries lowercase text or Chinese characters.
        var v = node.nodeValue.trim();
        return v.length > 1 && /[a-z\u4e00-\u9fff]/.test(v)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });
    var node;
    while ((node = walker.nextNode())) {
      out.push(node.nodeValue.trim().replace(/\s+/g, " "));
    }
    return out;
  }

  var COVERAGE = {};
  function coverage(name) {
    if (COVERAGE[name] !== undefined) return COVERAGE[name];
    var dict = name === "zh" ? zh : fr;
    var nodes = textNodes();
    var hit = 0;
    for (var i = 0; i < nodes.length; i++) {
      if (dict[nodes[i]] !== undefined) hit++;
    }
    COVERAGE[name] = nodes.length ? hit / nodes.length : 0;
    return COVERAGE[name];
  }

  function offers(name) {
    if (name === "en") return true;
    if (STATIC === name) return true;
    if (!document.body) return false;
    return coverage(name) >= MIN_COVERAGE;
  }

  var LANGS = [["en", "EN"], ["zh", "中文"], ["fr", "FR"]];

  function available() {
    var out = [];
    for (var i = 0; i < LANGS.length; i++) {
      if (offers(LANGS[i][0])) out.push(LANGS[i]);
    }
    return out;
  }

  function mount(inner) {
    if (!inner) return;
    var phrases = map() || {};
    var langs = available();
    var group = inner.querySelector(".lang-switch");
    var wanted = {};
    langs.forEach(function (pair) { wanted[pair[0]] = pair[1]; });
    if (group) {
      // static pages ship all three buttons; drop the ones with no page behind them
      group.querySelectorAll("button[data-lang]").forEach(function (button) {
        if (!wanted[button.getAttribute("data-lang")]) button.parentNode.removeChild(button);
      });
    } else if (langs.length > 1) {
      group = document.createElement("div");
      group.className = "lang-switch";
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", phrases["Language"] || "Language");
      langs.forEach(function (pair) {
        var button = document.createElement("button");
        button.type = "button";
        button.setAttribute("data-lang", pair[0]);
        button.textContent = pair[1];
        group.appendChild(button);
      });
      var nav = inner.querySelector(".site-nav");
      if (nav) inner.insertBefore(group, nav);
      else inner.appendChild(group);
    }
    if (!group) return;
    if (langs.length < 2) {
      group.setAttribute("hidden", "");
      group.style.display = "none";
      return;
    }
    if (phrases["Language"]) group.setAttribute("aria-label", phrases["Language"]);
    bindLang(group);
  }

  window.HURFI_I18N = { current: current, apply: apply, mount: mount, coverage: coverage, available: available,
    missing: function (name) {
      var dict = name === "zh" ? zh : fr, out = {};
      textNodes().forEach(function (t) {
        if (dict[t] === undefined) out[t] = (out[t] || 0) + 1;
      });
      return out;
    } };
  document.documentElement.lang = htmlLang();
})();

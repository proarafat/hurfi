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


  // Insight articles: AI search, certifications, product page SEO, 2026-10-20.
  zh["AI Search for Manufacturers: What Actually Matters | Hurfi"] = "制造企业如何应对 AI 搜索：真正重要的几点 | Hurfi";
  zh["Buyers increasingly see AI-generated summaries in Google before they see a list of links. Manufacturers ask whether they need special “AI optimisation”. Google’s own documentation gives a clear answer, and it is less dramatic than many sales pitches suggest."] = "买家在谷歌上越来越多地先看到 AI 生成的摘要，然后才看到链接列表。制造企业会问，是否需要做特别的“AI 优化”。谷歌自己的文档给出了明确答案，而且没有很多销售话术说得那么玄。";
  zh["What Google says about AI features"] = "谷歌对 AI 功能的说法";
  zh["Write pages that answer real buyer questions"] = "写能回答买家真实问题的页面";
  zh["Be clear about who you are"] = "把“你是谁”讲清楚";
  zh["Use structured data for accuracy, not tricks"] = "结构化数据用来求准确，不是耍花招";
  zh["Avoid the hype"] = "别被炒作带跑";
  zh["Measure what reaches you"] = "衡量真正到达你的东西";
  zh["What buyers ask AI assistants"] = "买家会问 AI 助手什么";
  zh["A practical checklist for your top pages"] = "重点页面的实用清单";
  zh["Keep facts consistent everywhere"] = "各处事实保持一致";
  zh["How to tell whether it is working"] = "如何判断是否有效";
  zh["How Hurfi helps"] = "Hurfi 怎么帮";
  zh["Google’s page on"] = "谷歌关于";
  zh["AI features and your website"] = "AI 功能与你的网站";
  zh["states that there are no additional requirements to appear in AI Overviews or AI Mode, and that no special schema.org structured data is needed. The same SEO foundations apply: pages must be indexable and eligible to be shown with a snippet."] = "页面指出：要出现在 AI 概览或 AI 模式中，没有任何额外要求，也不需要特殊的 schema.org 结构化数据。适用的还是同样的 SEO 基础：页面必须可被索引，并具备以摘要形式展示的资格。";
  zh["In other words, a manufacturer that does normal SEO well is already doing most of what is needed."] = "换句话说，把常规 SEO 做好的制造企业，已经完成了大部分该做的事。";
  zh["Diagram by Hurfi summarising this guide."] = "Hurfi 制作的指南结构图。";
  zh["AI summaries draw on pages that answer a question clearly. For a manufacturer, those questions are specific: what tolerance can you hold, which standard does this cable meet, what is the MOQ for custom packaging. Pages that answer them in plain text, with numbers and conditions, are useful to buyers and to AI systems alike."] = "AI 摘要取自那些把问题回答清楚的页面。对制造企业来说，这些问题很具体：你能做到什么公差、这款线缆符合哪个标准、定制包装的最小起订量是多少。用纯文字、带数字和条件把这些答清的页面，对买家有用，对 AI 系统也有用。";
  zh["Google’s 2025 post on"] = "谷歌 2025 年关于";
  zh["succeeding in AI search"] = "在 AI 搜索中取得成功";
  zh["gives the same advice: focus on making unique, non-commodity content that visitors will find helpful and satisfying."] = "给出的建议是一样的：专注于做出独特、非泛化的内容，让访客觉得有用、满意。";
  zh["Specifications in HTML text, not only images or PDFs"] = "规格用 HTML 文字呈现，而不只是图片或 PDF";
  zh["FAQs that match questions your sales team actually receives"] = "与销售团队真实收到的问题相符的常见问答";
  zh["Application pages that explain where and why a product is used"] = "说明产品用在哪里、为什么用的应用页面";
  zh["Summaries and buyers both benefit when the website makes the company clear: legal name, factory address, what you make yourself, certificates with scope, and who to contact. Inconsistent names or addresses across your site, LinkedIn and marketplace listings create doubt."] = "网站把公司讲清楚时，摘要和买家都受益：法定名称、工厂地址、哪些是自己生产的、附适用范围的证书，以及联系人。网站、领英和平台店铺上的名称或地址不一致，只会制造疑虑。";
  zh["Want a second opinion on your site?"] = "想让别人再看看你的网站吗？";
  zh["Book a free consultation and we will review your website against this guide, or send us a question through the contact form."] = "预约一次免费咨询，我们会按这份指南检查你的网站；也可以通过联系表单给我们留言提问。";
  zh["Structured data such as Organization, Product and FAQ markup helps search engines understand a page, but Google says it is not required for AI features. Use it to describe what is visibly on the page, accurately. Markup that does not match the page can cause problems rather than solve them."] = "Organization、Product、FAQ 这类结构化数据能帮助搜索引擎理解页面，但谷歌说 AI 功能并不要求它。用它来准确描述页面上看得见的内容。与页面不符的标记只会制造问题，而不是解决问题。";
  zh["Services promising guaranteed placement in AI answers"] = "承诺“保证出现在 AI 答案里”的服务";
  zh["Mass-generated pages written only for AI crawlers"] = "只为 AI 爬虫批量生成的页面";
  zh["Hidden text or keyword lists aimed at AI systems"] = "针对 AI 系统的隐藏文字或关键词堆砌";
  zh["Claims that a special file or markup is required to appear"] = "声称必须要有某个特殊文件或标记才能被展示";
  zh["Google says traffic from AI features is included in Search Console’s Performance report, within the “Web” search type. What matters for a manufacturer is still the same: qualified inquiries from the right buyers. Track RFQs by landing page so you can see which content works."] = "谷歌表示，来自 AI 功能的流量会计入 Search Console 的效果报告，归在“网页”搜索类型下。对制造企业来说，重要的仍然没变：来自对口买家的有效询盘。按落地页记录询价，就能看出哪些内容起作用。";
  zh["Buyers increasingly start supplier research by asking an AI assistant a long question — for example, “Which manufacturers make IP67 LED drivers with UL certification and a five-year warranty?” The answers these tools give draw on pages they can find and understand."] = "买家越来越常向 AI 助手提一个很长的问题来开始找供应商，比如：“哪些厂家生产带 UL 认证、五年质保的 IP67 LED 驱动电源？”这些工具给出的答案，来自它们能找到并读懂的页面。";
  zh["You cannot control which supplier an AI tool names. You can make sure your pages contain clear, specific answers to the questions buyers actually ask — specifications, certifications, minimum order quantities, lead times — so that they are good candidates to be found and cited. Google’s guidance for its AI features says the same SEO best practices apply as for search in general."] = "你无法控制 AI 工具点名哪家供应商。你能做到的是，让页面里包含对买家真实问题的清晰、具体答案——规格、认证、最小起订量、交期——这样你的页面才是有机会被找到、被引用的好候选。谷歌对其 AI 功能的说明也指出，适用的仍是与常规搜索相同的 SEO 最佳实践。";
  zh["Start with the ten pages that matter most for new buyers: your key product families, your capability page and your about page."] = "先从那十个对新买家最重要的页面开始：主要产品系列、能力页面，以及关于页面。";
  zh["Specifications are in HTML text, not only in images or PDFs."] = "规格写在 HTML 文字里，而不只在图片或 PDF 中。";
  zh["Certifications are named exactly, with the scope they cover."] = "认证名称写得准确，并注明适用范围。";
  zh["The page states who you are: company name, location, factory or trading company."] = "页面说明你是谁：公司名称、所在地、是工厂还是贸易公司。";
  zh["Common questions are answered on the page in plain language."] = "页面上用平实的语言回答了常见问题。";
  zh["The page is crawlable: no login, no blocking in robots.txt, and it is linked from other pages."] = "页面可以被抓取：不需要登录、robots.txt 里没有屏蔽，并且有其他页面链接过来。";
  zh["Structured data, where used, matches what is visible on the page."] = "使用结构化数据时，它与页面上可见的内容一致。";
  zh["AI tools and search engines compare information across sources. If your website says one capacity, your marketplace store another and your LinkedIn page a third, buyers — and machines — cannot tell which is right."] = "AI 工具和搜索引擎会跨来源比对信息。如果网站写一个产能、平台店铺写另一个、领英主页写第三个，买家和机器都分不清哪个是对的。";
  zh["Pick one set of facts — company name, address, year founded, certifications, capacities — and use it on your website, marketplace profiles, LinkedIn and trade-fair listings. Update all of them when something changes."] = "选定一套事实——公司名称、地址、成立年份、认证、产能——并统一用在网站、平台档案、领英和展会名录上。有任何变化，就一起更新。";
  zh["There is no separate report for every AI tool. Google says traffic from its AI features is included in Search Console’s Performance report, under the “Web” search type. Other assistants may appear as referral traffic in your analytics."] = "没有针对每个 AI 工具的单独报表。谷歌表示，来自其 AI 功能的流量计入 Search Console 效果报告的“网页”搜索类型。其他助手可能以引荐流量的形式出现在你的分析工具里。";
  zh["Watch three things over a few months: impressions and clicks for your key product pages in Search Console, referral visits from AI assistants in your analytics, and — most important — whether new inquiries mention finding you through search or an AI tool. Ask new contacts how they found you, and record the answer."] = "用几个月盯住三件事：Search Console 里重点产品页的展示和点击；分析工具里来自 AI 助手的引荐访问；以及最重要的一点——新询盘里有没有提到是通过搜索或 AI 工具找到你的。问新联系人是怎么找到你的，并记录下来。";
  zh["How Hurfi helps with this"] = "Hurfi 在这件事上怎么帮";
  zh["Hurfi offers four services for manufacturers selling abroad. Here is how each one relates to this guide."] = "Hurfi 为出口制造企业提供四项服务。下面是每一项与这份指南的关系。";
  zh["Pages built with clear HTML specifications and accurate structured data."] = "页面用清晰的 HTML 规格和准确的结构化数据构建。";
  zh["SEO focused on specific buyer questions, measured in your own Search Console."] = "SEO 聚焦买家的具体问题，并在你自己的 Search Console 里衡量效果。";
  zh["Campaigns for products where search demand exists, measured by inquiries."] = "在有搜索需求的产品上投广告，以询盘来衡量。";
  zh["Consistent company information and real content on LinkedIn."] = "领英上一致的公司信息和真实内容。";
  zh["Hurfi on social media"] = "Hurfi 的社交媒体";
  zh["A few of Hurfi’s own social media posts for manufacturers. They show our brand work and how we talk to factories; they are not client results."] = "Hurfi 自己面向制造企业发布的几条社媒内容。它们展示我们的品牌表达和与工厂沟通的方式，并非客户案例成果。";
  zh["Do we need special optimisation for Google’s AI Overviews?"] = "需要为谷歌 AI 概览做特殊优化吗？";
  zh["Google says there are no additional requirements to appear in AI Overviews or AI Mode beyond normal SEO best practices."] = "谷歌表示，除了常规的 SEO 最佳实践，出现在 AI 概览或 AI 模式中没有额外要求。";
  zh["Do we need special structured data for AI search?"] = "AI 搜索需要特殊的结构化数据吗？";
  zh["No. Google states that no special schema.org structured data is needed. Use structured data to describe your pages accurately."] = "不需要。谷歌说明并不需要特殊的 schema.org 结构化数据。结构化数据用来准确描述你的页面。";
  zh["Will AI search reduce our website traffic?"] = "AI 搜索会减少我们网站的流量吗？";
  zh["It may change how buyers reach you. Pages that answer specific technical questions remain valuable, and buyers still visit suppliers’ sites before sending an RFQ."] = "它可能改变买家找到你的方式。回答具体技术问题的页面依然有价值，买家在发询价之前也仍会访问供应商的网站。";
  zh["Should we write content for AI systems instead of people?"] = "应该为 AI 系统而不是为人写内容吗？";
  zh["No. Write for buyers. Google’s guidance focuses on helpful, people-first content."] = "不应该。为人写。谷歌的指引强调有用、以人为本的内容。";
  zh["Can an agency guarantee we appear in AI answers?"] = "代理公司能保证我们出现在 AI 答案里吗？";
  zh["No one can guarantee that. Be wary of anyone who does."] = "没有人能保证。谁这样保证，就要当心。";
  zh["What content works best for manufacturers?"] = "什么样的内容对制造企业最有效？";
  zh["Specific product, specification, application and FAQ pages that answer real buyer questions with numbers and conditions."] = "具体的产品、规格、应用和问答页面，用数字和条件回答买家的真实问题。";
  zh["How do we see AI traffic?"] = "怎么看到 AI 带来的流量？";
  zh["It is included in Search Console performance reports. Track inquiries by landing page in analytics."] = "它计入 Search Console 的效果报告。在分析工具里按落地页跟踪询盘。";
  zh["Does consistency across platforms matter?"] = "各平台之间的一致性重要吗？";
  zh["Yes. Use the same company name, address and product names on your website, LinkedIn and listings."] = "重要。网站、领英和平台店铺要用同一个公司名称、地址和产品名称。";
  zh["Can Hurfi help?"] = "Hurfi 能帮忙吗？";
  zh["Yes. Our SEO work covers the content, technical and structured-data basics that both classic and AI search rely on."] = "可以。我们的 SEO 工作涵盖内容、技术和结构化数据基础，这些都是常规搜索和 AI 搜索共同依赖的。";
  zh["External guidance quoted in this article, checked on the date shown. Links open the publisher’s own page."] = "本文引用的外部资料，均按标注日期核查。链接打开的是发布方自己的页面。";
  zh["Google Search Central."] = "Google Search Central。";
  zh[". Checked 16 October 2026."] = "。2026 年 10 月 16 日核查。";
  zh["Google Search Central Blog."] = "Google Search Central 博客。";
  zh["Top ways to ensure your content performs well in Google’s AI experiences on Search (May 2025)"] = "Top ways to ensure your content performs well in Google’s AI experiences on Search (May 2025)";
  zh["Creating helpful, reliable, people-first content"] = "Creating helpful, reliable, people-first content";
  zh["Put this guide to work"] = "把这份指南用起来";
  zh["A first consultation is free. We will look at your site and tell you which parts of this guide matter most for you."] = "首次咨询免费。我们会看你的网站，并告诉你在你的情况下这份指南里哪几点最关键。";
  zh["Diagram of the steps covered in this guide: 1. Keep pages crawlable; 2. Write specific answers; 3. Show who is behind it; 4. Keep data consistent; 5. Use structured data correctly; 6. Measure real inquiries."] = "本指南步骤示意图：1. 保证页面可抓取；2. 写具体的答案；3. 说明背后是谁；4. 保持数据一致；5. 正确使用结构化数据；6. 衡量真实询盘。";
  zh["Hurfi social post “A great factory means nothing if global buyers can’t find it.”"] = "Hurfi 社媒内容：“再好的工厂，如果海外买家找不到，也等于没有。”";
  zh["Hurfi social post: a hand holding a card that reads “We turn insights into a clear strategy”"] = "Hurfi 社媒内容：一只手举着卡片，上面写着“我们把洞察变成清晰的策略”。";
  zh["Hurfi social post “Ready to get discovered?”, with a hand lifting a cover off a factory scene"] = "Hurfi 社媒内容：“准备好被发现了？”画面是一只手掀开工厂场景上的盖布。";
  zh["The Certifications Page Export Buyers Look For | Hurfi"] = "出口买家想看到的认证页面 | Hurfi";
  zh["For many overseas buyers, certifications are the first filter: no right certificate, no RFQ. Yet many factory websites show a wall of logos with no detail. This guide explains how to build a certifications page that buyers trust, and how to link it to your products."] = "对很多海外买家来说，认证是第一道筛选：证书不对，就没有询价。但很多工厂网站只是堆一墙标志，没有任何细节。这份指南讲怎么做一个买家信得过的认证页面，以及怎么把它和产品页连起来。";
  zh["Why certifications decide the first call"] = "为什么认证决定第一次通话";
  zh["What the EU expects from manufacturers"] = "欧盟对制造商的要求";
  zh["Group certificates by market"] = "按市场归类证书";
  zh["Give the details buyers check"] = "给出买家会核查的细节";
  zh["Never overclaim"] = "绝不夸大";
  zh["Link certificates to products"] = "把证书和产品连起来";
  zh["Make documents easy to request"] = "让索取文件变得容易";
  zh["A simple layout that works"] = "一个简单好用的版式";
  zh["Common mistakes to avoid"] = "常见的错误";
  zh["Write it for people, not only for search"] = "为人写，而不只为搜索写";
  zh["A buyer in Europe, North America or the Middle East usually has to prove that what they import meets local rules. Before contacting you, they want to know whether your products already comply. If your site does not say, the easiest decision is to move on to a supplier whose site does."] = "欧洲、北美或中东的买家通常要证明进口的产品符合当地法规。在联系你之前，他们想知道你的产品是否已经合规。如果网站没有说明，最省事的决定就是换一家写清楚了的供应商。";
  zh["The European Commission’s"] = "欧盟委员会关于";
  zh["CE marking page"] = "CE 标志的页面";
  zh["explains that manufacturers are responsible for carrying out the conformity assessment, setting up the technical file, issuing the EU declaration of conformity and affixing the CE marking. Importers and distributors must make sure the products they place on the market meet the rules."] = "说明：制造商负责进行合格评定、建立技术文件、出具欧盟符合性声明并加贴 CE 标志。进口商和经销商必须确保其投放市场的产品符合规定。";
  zh["This is why European buyers ask for your declaration of conformity and test reports: their own responsibility depends on yours."] = "这就是为什么欧洲买家会要你的符合性声明和检测报告：他们自己的责任取决于你的责任。";
  zh["A list of logos is hard to use. Group your certificates by the market or buyer they matter to:"] = "一堆标志很难用。按证书对应的市场或买家归类：";
  zh["European Union: CE-related declarations and test reports, and other EU requirements that apply to your products."] = "欧盟：与 CE 相关的声明和检测报告，以及适用于你产品的其他欧盟要求。";
  zh["Other markets you sell to: the certificates or registrations each requires, as confirmed by the relevant authority."] = "你销售的其他市场：各自要求的证书或注册，并经相关主管机构确认。";
  zh["Quality and management systems: ISO or industry-specific certificates."] = "质量与管理体系：ISO 或行业专用证书。";
  zh["China: compulsory certification (CCC) and other domestic approvals where relevant."] = "中国：强制性产品认证（CCC）以及相关时的其他国内批准。";
  zh["Certificate name and number."] = "证书名称和编号。";
  zh["Issuing body or test laboratory."] = "发证机构或检测实验室。";
  zh["Scope: which products and models it covers."] = "范围：覆盖哪些产品和型号。";
  zh["Issue and expiry dates."] = "签发日期和到期日期。";
  zh["A downloadable copy or the option to request one."] = "可下载的副本，或提供索取入口。";
  zh["Only list certificates you hold, for the products they really cover. Do not imply that a quality-system certificate is a product certificate, or that a test report is a certification. A buyer who finds one overstatement will doubt everything else — and in regulated markets it can create legal problems for both of you."] = "只列出你确实持有、且确实覆盖该产品的证书。不要暗示体系证书就是产品证书，也不要把检测报告说成认证。买家一旦发现一处夸大，就会怀疑其余全部——在受监管的市场上，还可能给双方带来法律麻烦。";
  zh["On every product page, say which certificates cover that product and link to the certifications page. On the certifications page, link back to the products. Buyers then see compliance in context, and search engines see clear relationships between pages."] = "在每个产品页上写明该产品由哪些证书覆盖，并链接到认证页面。在认证页面上再链回产品。这样买家能在具体语境里看到合规情况，搜索引擎也能看清页面之间的关系。";
  zh["Where it fits the page and the information is accurate,"] = "在适合页面且信息准确的前提下，";
  zh["Product structured data"] = "产品结构化数据";
  zh["can describe your products to Google."] = "可以向谷歌描述你的产品。";
  zh["Certificates expire, scopes change and new models need testing. Give one person the job of checking the page every quarter. An expired certificate on your website tells a buyer you are not paying attention."] = "证书会到期，范围会变，新机型需要检测。指定一个人每季度检查这个页面。网站上挂着过期证书，等于告诉买家你没在用心。";
  zh["Some documents you may not want to publish openly. Offer them on request with a short form: the buyer’s company, market and products of interest. That request is itself a strong sales lead."] = "有些文件你可能不想公开。用一张短表单提供按需索取：买家公司、市场、关注的产品。这个索取动作本身就是一条高质量销售线索。";
  zh["Most manufacturers can use the same structure: a short introduction, then one block per market, then quality-system certificates, then a “request documents” form. Inside each market block, a table works well:"] = "多数制造企业可以用同样的结构：简短介绍，然后每个市场一块，再是体系证书，最后是“索取文件”表单。每个市场块里，用表格最清楚：";
  zh["Column 1: certificate or document name."] = "第 1 列：证书或文件名称。";
  zh["Column 2: products and models covered."] = "第 2 列：覆盖的产品和型号。";
  zh["Column 3: issuing body or laboratory."] = "第 3 列：发证机构或实验室。";
  zh["Column 4: valid until."] = "第 4 列：有效期至。";
  zh["Column 5: download or request link."] = "第 5 列：下载或索取链接。";
  zh["Keep the table in HTML, not as an image, so buyers can search it and read it on a phone."] = "表格要用 HTML，而不是图片，这样买家能搜索，也能在手机上阅读。";
  zh["Logos of certification marks the company does not hold."] = "展示公司并未持有的认证标志。";
  zh["Certificates issued to a different company, such as a trading partner, without saying so."] = "展示发给其他公司（比如贸易伙伴）的证书，却不加说明。";
  zh["Expired certificates still shown as current."] = "过期证书仍当作有效展示。";
  zh["Test reports presented as certifications."] = "把检测报告当成认证展示。";
  zh["Scanned certificates so blurred that the number cannot be read."] = "扫描件模糊到看不清证书编号。";
  zh["Google’s guidance on"] = "谷歌关于";
  zh["helpful, reliable, people-first content"] = "有用、可靠、以人为本的内容";
  zh["applies here too. A clear page that answers a buyer’s compliance questions is more useful — and more convincing — than a page of keywords."] = "在这里同样适用。一个清楚回答买家合规问题的页面，比堆满关键词的页面更有用，也更有说服力。";
  zh["A certifications page grouped by market and linked to every product page."] = "按市场归类的认证页面，并与每个产品页互链。";
  zh["Clean structure and internal links so product and compliance pages support each other in search."] = "清晰的结构和内链，让产品页与合规页在搜索中互相支撑。";
  zh["Campaign landing pages that show compliance for the market you target."] = "针对目标市场展示合规情况的广告落地页。";
  zh["Posts that explain new certifications and tests, without overclaiming."] = "介绍新认证与检测的帖子，不夸大。";
  zh["Should we show certificate logos?"] = "应该展示认证标志吗？";
  zh["You can, but always with the details: number, issuer, scope and validity. Logos alone do not answer buyers’ questions."] = "可以，但一定要配细节：编号、发证机构、范围、有效期。光有标志回答不了买家的问题。";
  zh["Who is responsible for CE marking?"] = "谁负责 CE 标志？";
  zh["The European Commission explains that the manufacturer carries out the conformity assessment, prepares the technical file, issues the declaration of conformity and affixes the CE marking."] = "欧盟委员会说明：由制造商进行合格评定、编制技术文件、出具符合性声明并加贴 CE 标志。";
  zh["Can we publish test reports?"] = "可以公开检测报告吗？";
  zh["You can publish them or offer them on request. Make clear which products and models they cover."] = "可以公开，也可以按需提供。要写清覆盖哪些产品和型号。";
  zh["We hold ISO 9001. Is that a product certificate?"] = "我们持有 ISO 9001，这是产品认证吗？";
  zh["No. It certifies a quality-management system. Present it as that, separately from product certifications."] = "不是。它认证的是质量管理体系。就按体系证书来呈现，与产品认证分开。";
  zh["Do we need a page per certificate?"] = "每张证书都需要一个页面吗？";
  zh["Usually one certifications page grouped by market is enough, plus the relevant certificates on each product page."] = "通常一个按市场归类的认证页面就够了，再在每个产品页上放相关证书。";
  zh["How often should we update it?"] = "多久更新一次？";
  zh["At least every quarter, and whenever a certificate is issued, renewed or expires."] = "至少每季度一次，以及每次证书签发、续期或到期时。";
  zh["Can Hurfi tell us which certificates we need?"] = "Hurfi 能告诉我们需要哪些证书吗？";
  zh["No. That is for your compliance team, test laboratories or authorities. We help you present what you hold clearly and accurately."] = "不能。这要由你的合规团队、检测实验室或主管机构来判断。我们帮你把已有的证书清楚、准确地呈现出来。";
  zh["European Commission."] = "欧盟委员会。";
  zh["CE marking"] = "CE 标志";
  zh["Introduction to Product structured data"] = "产品结构化数据入门";
  zh["Diagram of the steps covered in this guide: 1. List what you hold; 2. Group by market; 3. Add scope and models; 4. Show validity; 5. Offer documents; 6. Link to products."] = "本指南步骤示意图：1. 列出你持有的证书；2. 按市场归类；3. 补充范围和型号；4. 标明有效期；5. 提供文件；6. 链接到产品。";
  zh["Hurfi social post with jigsaw pieces: “Your factory has everything… except visibility.”"] = "Hurfi 社媒内容，拼图画面：“你的工厂什么都有……除了可见度。”";
  zh["Hurfi social post “A beautiful website without conversions…”, showing a car body balanced on bicycle wheels"] = "Hurfi 社媒内容：“好看的网站却带不来转化……”，画面是一副车身架在自行车轮上。";
  zh["Industrial Product Page SEO: What Buyers and Google Need | Hurfi"] = "工业产品页 SEO：买家和谷歌各自需要什么 | Hurfi";
  zh["For a manufacturer, the product page does most of the selling. It is where an engineer decides whether to send an RFQ, and where Google decides whether the page answers a search. This guide covers what a good industrial product page contains."] = "对制造企业来说，产品页承担了大部分销售工作。工程师在这里决定要不要发询价，谷歌在这里判断这个页面是否回答了某个搜索。这份指南讲一页好的工业产品页应该包含什么。";
  zh["Start with a descriptive title"] = "从描述性的标题开始";
  zh["Put specifications in HTML text"] = "把规格写成 HTML 文字";
  zh["Explain applications and limits"] = "说明应用和限制";
  zh["Be exact about compliance"] = "合规方面要精确";
  zh["Use structured data that matches the page"] = "使用与页面一致的结构化数据";
  zh["End with an RFQ path"] = "以询价路径收尾";
  zh["A product page outline you can reuse"] = "可以直接复用的产品页结构";
  zh["How to handle hundreds of variants"] = "如何处理上百个型号";
  zh["Common mistakes on factory product pages"] = "工厂产品页常见错误";
  zh["Who should review a product page"] = "产品页该由谁审核";
  zh["The title should say what the product is in the buyer’s words, with the most important specification or variant: for example “Stainless steel ball valve, DN15–DN100, PN40” rather than “Product 3”. Google’s"] = "标题应该用买家的说法讲清这是什么产品，并带上最重要的规格或型号，比如“不锈钢球阀，DN15–DN100，PN40”，而不是“产品 3”。谷歌的";
  zh["SEO Starter Guide"] = "SEO 入门指南";
  zh["recommends descriptive titles and notes that Google does not use the keywords meta tag."] = "建议使用描述性标题，并指出谷歌不使用 keywords 元标签。";
  zh["Engineers search for numbers: sizes, ratings, tolerances, materials, standards. If those numbers are only in an image or a PDF, they are harder for buyers to scan and for search engines to read. Publish a specification table on the page and keep the PDF as a download."] = "工程师是按数字搜索的：尺寸、额定值、公差、材料、标准。如果这些数字只存在于图片或 PDF 里，买家不好扫读，搜索引擎也不好读取。把规格表放在页面上，PDF 留作下载。";
  zh["Units and test conditions next to every value"] = "每个数值都注明单位和测试条件";
  zh["Variants in one table rather than separate thin pages"] = "型号放在一张表里，而不是拆成很多空页面";
  zh["Materials and finishes with the standards they meet"] = "材料和表面处理，注明符合的标准";
  zh["Drawings or dimension diagrams you own"] = "你自有的图纸或尺寸示意图";
  zh["Say where the product is used and where it should not be used. Application text helps buyers who search by problem rather than by product name, and honest limits build trust with engineers."] = "说明产品用在哪里，也用在哪里。应用说明能帮到那些按问题而不是按产品名搜索的买家，诚实地讲清限制也能赢得工程师的信任。";
  zh["List certificates for the product and market, with the holder and scope. For products sold in the EU that need CE marking, the"] = "按产品和市场列出证书，写明持有人和范围。对在欧盟销售且需要 CE 标志的产品，";
  zh["European Commission"] = "欧盟委员会";
  zh["explains that the manufacturer carries out the conformity assessment, sets up the technical file, issues the EU declaration of conformity and affixes the marking. Only claim what you hold."] = "说明由制造商进行合格评定、建立技术文件、出具欧盟符合性声明并加贴标志。只声明你确实持有的东西。";
  zh["documentation describes two types: Product snippets for pages that are not purchase pages, and merchant listings for pages where a product can be bought. Most B2B product pages fit the first. Mark up only what is visible on the page."] = "文档描述了两类：适用非购买页面的“产品摘要”，以及适用可直接购买页面的“商家信息”。多数 B2B 产品页属于第一类。只标记页面上看得见的内容。";
  zh["Every product page should end with a short form or a clear contact: what the buyer needs (quantity, specification, market, date) and who will answer. Track submissions by page so you know which products bring inquiries."] = "每个产品页都应以一张短表单或清晰的联系方式收尾：说明买家需要提供什么（数量、规格、市场、日期），以及谁来回复。按页面跟踪提交量，就知道哪些产品带来询盘。";
  zh["Most industrial product pages work well with the same basic outline. It gives buyers what they need in the order they look for it, and gives search engines clear text to work with."] = "多数工业产品页用同一套基本结构就能做好。它按买家的查找顺序给出需要的信息，也给搜索引擎留下清晰的文字。";
  zh["Title and one-line summary:"] = "标题和一句话概述：";
  zh["what the product is, its key specification and who it is for."] = "这是什么产品、关键规格、面向谁。";
  zh["Key specifications table:"] = "关键规格表：";
  zh["in HTML, with units, tolerances and test conditions."] = "用 HTML，含单位、公差和测试条件。";
  zh["where it is used, and where it should not be used."] = "用在哪里，以及不该用在哪里。";
  zh["Materials, options and customisation:"] = "材料、选项和定制：";
  zh["what can be changed and what cannot."] = "哪些可以改，哪些不能改。";
  zh["Compliance and documents:"] = "合规与文件：";
  zh["certificates, test reports and datasheets, with their scope."] = "证书、检测报告和数据表，并注明范围。";
  zh["Packaging, MOQ and lead time:"] = "包装、最小起订量和交期：";
  zh["typical ranges, clearly stated as such."] = "常见区间，并明确说明这是区间。";
  zh["RFQ path:"] = "询价路径：";
  zh["a short form or contact link with what information to include."] = "一张短表单或联系链接，并说明需要提供哪些信息。";
  zh["Industrial products often come in many sizes, materials and ratings. Creating a page for every variant usually produces hundreds of near-identical pages that do not help buyers and may be treated as low value."] = "工业产品往往有很多尺寸、材料和额定值。为每个型号单独建页，通常会产生几百个几乎相同的页面，对买家没帮助，还可能被判定为低价值。";
  zh["A better approach is one strong page per product family, with a variant table and filters. Create separate pages only for variants that buyers search for by name, or that have different applications, certifications or documents. Link variant pages back to the family page, and make sure each one has something unique to say."] = "更好的做法是每个产品系列做一个扎实的页面，配型号表和筛选。只为那些买家会按名称搜索、或者应用、认证、文件不同的型号单独建页。型号页要链回系列页，并确保每页都有独到内容。";
  zh["Specifications only in images or PDFs, so they cannot be searched or copied."] = "规格只在图片或 PDF 里，既不能搜索也不能复制。";
  zh["Titles that are only a model number, with no description of the product."] = "标题只有一个型号，完全不描述产品。";
  zh["Copying a competitor’s or a marketplace description word for word."] = "逐字照抄竞争对手或平台上的描述。";
  zh["Vague claims such as “high quality” and “best price” instead of measured values."] = "用“高品质”“最优价格”这类空话代替实测数值。";
  zh["CE or other marks shown without saying which directives or standards apply."] = "展示 CE 或其他标志，却不说适用哪些指令或标准。";
  zh["No visible way to ask a question or request a quote."] = "看不到提问或索要报价的入口。";
  zh["Product pages carry technical and legal weight. A wrong tolerance or an overstated certification can cost an order or create liability. Before a page is published, an engineer should check the specifications and applications, someone responsible for quality should check compliance statements, and a sales person should check that the page answers the questions buyers ask most."] = "产品页既有技术分量，也有法律分量。一个写错的公差或一句夸大的认证，可能丢掉订单，也可能带来责任。页面发布前，工程师应核对规格和应用，质量负责人应核对合规表述，销售人员应确认页面回答了买家最常问的问题。";
  zh["Record who reviewed each page and when. When a specification or certificate changes, update the page and the date, so buyers and search engines see current information."] = "记录每个页面由谁、何时审核。规格或证书有变化时，更新页面和日期，让买家和搜索引擎看到最新信息。";
  zh["Product page templates with specification tables, documents and RFQ forms."] = "含规格表、文件和询价表单的产品页模板。";
  zh["Titles, internal links and structured data for product and application searches."] = "针对产品和应用搜索的标题、内链和结构化数据。";
  zh["Ads that send each search to its matching product page."] = "把每个搜索词送到对应产品页的广告。";
  zh["Posts that introduce new products and link to their pages."] = "介绍新产品并链接到产品页的帖子。";
  zh["What makes an industrial product page rank?"] = "工业产品页靠什么排名？";
  zh["Clear relevance to the search — a descriptive title, specifications in text, application content — plus a site that is crawlable, fast and trusted."] = "与搜索高度相关——描述性标题、文字形式的规格、应用内容——再加上一个可抓取、速度快、可信的网站。";
  zh["Should every variant have its own page?"] = "每个型号都应该有独立页面吗？";
  zh["Usually not. Group minor variants in a table on one page. Give separate pages to products that buyers search for separately."] = "通常不需要。小差异的型号放在同一页的表格里。买家会单独搜索的产品，才单独建页。";
  zh["Are PDF datasheets bad for SEO?"] = "PDF 数据表对 SEO 有害吗？";
  zh["Not bad, but not enough. Put the key specifications on the HTML page and offer the PDF too."] = "不算有害，但不够。把关键规格放到 HTML 页面上，PDF 同时提供。";
  zh["Does Google use the keywords meta tag?"] = "谷歌使用 keywords 元标签吗？";
  zh["No. Google states that it does not use the keywords meta tag."] = "不使用。谷歌明确表示不使用 keywords 元标签。";
  zh["Which structured data should B2B product pages use?"] = "B2B 产品页应该用哪种结构化数据？";
  zh["Usually Product snippets markup, which Google describes for non-purchase pages. Mark up only what is visible."] = "通常用“产品摘要”标记，谷歌为这类非购买页面做了说明。只标记可见内容。";
  zh["Can we list CE or other certificates?"] = "可以列出 CE 或其他证书吗？";
  zh["Yes, if you hold them for that product. Name the product, scope and holder. The manufacturer is responsible for CE conformity assessment."] = "可以，前提是你确实为该产品持有。写明产品、范围和持有人。CE 合格评定由制造商负责。";
  zh["Should we show prices?"] = "应该标价吗？";
  zh["For configured or custom products, often not. Explain what affects price and invite an RFQ."] = "对配置型或定制品，通常不必。说明什么因素影响价格，并邀请对方询价。";
  zh["How long should a product page be?"] = "产品页应该多长？";
  zh["As long as it needs to answer the buyer’s questions. Specifications, applications, compliance and an RFQ form usually take more than a paragraph."] = "长到足以回答买家的问题。规格、应用、合规和询价表单，通常一两段话是不够的。";
  zh["Can Hurfi write our product pages?"] = "Hurfi 能写我们的产品页吗？";
  zh["Yes. We draft them from your documents with your engineers and you approve every technical statement."] = "可以。我们依据你的文件、与你的工程师一起起草，每一句技术表述都由你确认。";
  zh["Diagram of the steps covered in this guide: 1. Descriptive title; 2. Specifications in text; 3. Applications; 4. Compliance and documents; 5. Structured data; 6. RFQ form."] = "本指南步骤示意图：1. 描述性标题；2. 文字形式的规格；3. 应用；4. 合规与文件；5. 结构化数据；6. 询价表单。";
  zh["Hurfi social post “You’ve built what global buyers want. Now let them find it.”, with a magnifying-glass mascot"] = "Hurfi 社媒内容：“你已经做出了全球买家想要的东西。现在让他们找到它。”配一个放大镜吉祥物。";
  fr["AI Search for Manufacturers: What Actually Matters | Hurfi"] = "Recherche IA pour industriels : ce qui compte vraiment | Hurfi";
  fr["Buyers increasingly see AI-generated summaries in Google before they see a list of links. Manufacturers ask whether they need special “AI optimisation”. Google’s own documentation gives a clear answer, and it is less dramatic than many sales pitches suggest."] = "Les acheteurs voient de plus en plus de résumés générés par IA dans Google avant la liste de liens. Les industriels demandent s’ils ont besoin d’une « optimisation IA » particulière. La documentation de Google répond clairement, et de façon moins spectaculaire que bien des argumentaires commerciaux.";
  fr["What Google says about AI features"] = "Ce que dit Google des fonctionnalités d’IA";
  fr["Write pages that answer real buyer questions"] = "Écrire des pages qui répondent aux vraies questions";
  fr["Be clear about who you are"] = "Être clair sur qui vous êtes";
  fr["Use structured data for accuracy, not tricks"] = "Utiliser les données structurées pour la précision, pas pour la ruse";
  fr["Avoid the hype"] = "Éviter le battage";
  fr["Measure what reaches you"] = "Mesurer ce qui vous parvient";
  fr["What buyers ask AI assistants"] = "Ce que les acheteurs demandent aux assistants IA";
  fr["A practical checklist for your top pages"] = "Une liste pratique pour vos pages clés";
  fr["Keep facts consistent everywhere"] = "Garder des informations cohérentes partout";
  fr["How to tell whether it is working"] = "Comment savoir si cela fonctionne";
  fr["How Hurfi helps"] = "Comment Hurfi aide";
  fr["Google’s page on"] = "La page de Google sur";
  fr["AI features and your website"] = "les fonctionnalités d’IA et votre site";
  fr["states that there are no additional requirements to appear in AI Overviews or AI Mode, and that no special schema.org structured data is needed. The same SEO foundations apply: pages must be indexable and eligible to be shown with a snippet."] = "indique qu’il n’existe aucune exigence supplémentaire pour apparaître dans les aperçus IA ou le mode IA, et qu’aucune donnée structurée schema.org particulière n’est nécessaire. Les mêmes fondations SEO s’appliquent : les pages doivent être indexables et éligibles à un extrait.";
  fr["In other words, a manufacturer that does normal SEO well is already doing most of what is needed."] = "Autrement dit, un industriel qui fait bien le SEO classique fait déjà l’essentiel.";
  fr["Diagram by Hurfi summarising this guide."] = "Schéma de Hurfi résumant ce guide.";
  fr["AI summaries draw on pages that answer a question clearly. For a manufacturer, those questions are specific: what tolerance can you hold, which standard does this cable meet, what is the MOQ for custom packaging. Pages that answer them in plain text, with numbers and conditions, are useful to buyers and to AI systems alike."] = "Les résumés IA s’appuient sur des pages qui répondent clairement à une question. Pour un industriel, ces questions sont précises : quelle tolérance pouvez-vous tenir, quelle norme ce câble respecte-t-il, quelle est la quantité minimale pour un emballage sur mesure. Les pages qui y répondent en texte clair, avec chiffres et conditions, servent autant aux acheteurs qu’aux systèmes d’IA.";
  fr["Google’s 2025 post on"] = "L’article de Google de 2025 sur";
  fr["succeeding in AI search"] = "réussir dans la recherche IA";
  fr["gives the same advice: focus on making unique, non-commodity content that visitors will find helpful and satisfying."] = "donne le même conseil : se concentrer sur un contenu unique, non standardisé, que les visiteurs trouveront utile et satisfaisant.";
  fr["Specifications in HTML text, not only images or PDFs"] = "Des spécifications en texte HTML, pas seulement en images ou PDF";
  fr["FAQs that match questions your sales team actually receives"] = "Des FAQ qui correspondent aux questions réellement reçues par vos commerciaux";
  fr["Application pages that explain where and why a product is used"] = "Des pages application expliquant où et pourquoi un produit est utilisé";
  fr["Summaries and buyers both benefit when the website makes the company clear: legal name, factory address, what you make yourself, certificates with scope, and who to contact. Inconsistent names or addresses across your site, LinkedIn and marketplace listings create doubt."] = "Les résumés et les acheteurs y gagnent quand le site présente clairement l’entreprise : raison sociale, adresse de l’usine, ce que vous fabriquez vous-même, certificats avec leur périmètre et contact. Des noms ou adresses divergents entre le site, LinkedIn et les fiches marketplace créent le doute.";
  fr["Want a second opinion on your site?"] = "Un avis extérieur sur votre site ?";
  fr["Book a free consultation and we will review your website against this guide, or send us a question through the contact form."] = "Réservez une consultation gratuite : nous examinerons votre site au regard de ce guide, ou posez-nous une question via le formulaire de contact.";
  fr["Structured data such as Organization, Product and FAQ markup helps search engines understand a page, but Google says it is not required for AI features. Use it to describe what is visibly on the page, accurately. Markup that does not match the page can cause problems rather than solve them."] = "Les données structurées de type Organization, Product ou FAQ aident les moteurs à comprendre une page, mais Google indique qu’elles ne sont pas requises pour les fonctionnalités d’IA. Utilisez-les pour décrire fidèlement ce qui est visible sur la page. Un balisage qui ne correspond pas à la page crée des problèmes plutôt qu’il n’en résout.";
  fr["Services promising guaranteed placement in AI answers"] = "Les services promettant une présence garantie dans les réponses IA";
  fr["Mass-generated pages written only for AI crawlers"] = "Les pages générées en masse uniquement pour les robots d’IA";
  fr["Hidden text or keyword lists aimed at AI systems"] = "Le texte caché ou les listes de mots-clés destinés aux systèmes d’IA";
  fr["Claims that a special file or markup is required to appear"] = "L’affirmation qu’un fichier ou balisage spécial est nécessaire pour apparaître";
  fr["Google says traffic from AI features is included in Search Console’s Performance report, within the “Web” search type. What matters for a manufacturer is still the same: qualified inquiries from the right buyers. Track RFQs by landing page so you can see which content works."] = "Google indique que le trafic issu des fonctionnalités d’IA figure dans le rapport Performances de Search Console, sous le type de recherche « Web ». Ce qui compte pour un industriel reste identique : des demandes qualifiées venant des bons acheteurs. Suivez les demandes par page d’arrivée pour voir quel contenu fonctionne.";
  fr["Buyers increasingly start supplier research by asking an AI assistant a long question — for example, “Which manufacturers make IP67 LED drivers with UL certification and a five-year warranty?” The answers these tools give draw on pages they can find and understand."] = "Les acheteurs commencent de plus en plus leur recherche fournisseur en posant une longue question à un assistant IA — par exemple : « Quels fabricants produisent des drivers LED IP67 certifiés UL avec cinq ans de garantie ? » Les réponses de ces outils s’appuient sur des pages qu’ils peuvent trouver et comprendre.";
  fr["You cannot control which supplier an AI tool names. You can make sure your pages contain clear, specific answers to the questions buyers actually ask — specifications, certifications, minimum order quantities, lead times — so that they are good candidates to be found and cited. Google’s guidance for its AI features says the same SEO best practices apply as for search in general."] = "Vous ne pouvez pas choisir le fournisseur qu’un outil d’IA citera. Vous pouvez faire en sorte que vos pages contiennent des réponses claires et précises aux questions réellement posées — spécifications, certifications, quantités minimales, délais — pour qu’elles soient de bons candidats à la découverte et à la citation. Les recommandations de Google pour ses fonctionnalités d’IA indiquent que les mêmes bonnes pratiques SEO s’appliquent qu’en recherche classique.";
  fr["Start with the ten pages that matter most for new buyers: your key product families, your capability page and your about page."] = "Commencez par les dix pages les plus importantes pour un nouvel acheteur : vos grandes familles de produits, votre page capacités et votre page à propos.";
  fr["Specifications are in HTML text, not only in images or PDFs."] = "Les spécifications sont en texte HTML, pas seulement en images ou PDF.";
  fr["Certifications are named exactly, with the scope they cover."] = "Les certifications sont nommées exactement, avec leur périmètre.";
  fr["The page states who you are: company name, location, factory or trading company."] = "La page indique qui vous êtes : nom, localisation, usine ou société de négoce.";
  fr["Common questions are answered on the page in plain language."] = "Les questions courantes sont traitées sur la page, en langage simple.";
  fr["The page is crawlable: no login, no blocking in robots.txt, and it is linked from other pages."] = "La page est explorable : pas de connexion requise, pas de blocage dans robots.txt, et elle est liée depuis d’autres pages.";
  fr["Structured data, where used, matches what is visible on the page."] = "Les données structurées, lorsqu’elles sont utilisées, correspondent au contenu visible.";
  fr["AI tools and search engines compare information across sources. If your website says one capacity, your marketplace store another and your LinkedIn page a third, buyers — and machines — cannot tell which is right."] = "Les outils d’IA et les moteurs comparent les informations entre sources. Si votre site annonce une capacité, votre boutique marketplace une autre et votre page LinkedIn une troisième, acheteurs comme machines ne savent plus laquelle est juste.";
  fr["Pick one set of facts — company name, address, year founded, certifications, capacities — and use it on your website, marketplace profiles, LinkedIn and trade-fair listings. Update all of them when something changes."] = "Choisissez un seul jeu de faits — nom, adresse, année de création, certifications, capacités — et utilisez-le sur votre site, vos profils marketplace, LinkedIn et vos inscriptions en salon. Mettez tout à jour dès qu’un élément change.";
  fr["There is no separate report for every AI tool. Google says traffic from its AI features is included in Search Console’s Performance report, under the “Web” search type. Other assistants may appear as referral traffic in your analytics."] = "Il n’existe pas de rapport distinct par outil d’IA. Google indique que le trafic de ses fonctionnalités d’IA figure dans le rapport Performances de Search Console, sous « Web ». D’autres assistants peuvent apparaître comme trafic de référence dans votre outil d’analyse.";
  fr["Watch three things over a few months: impressions and clicks for your key product pages in Search Console, referral visits from AI assistants in your analytics, and — most important — whether new inquiries mention finding you through search or an AI tool. Ask new contacts how they found you, and record the answer."] = "Surveillez trois choses pendant quelques mois : impressions et clics de vos pages produit clés dans Search Console, visites de référence venant d’assistants IA dans votre outil d’analyse, et surtout : les nouvelles demandes mentionnent-elles une découverte via la recherche ou un outil d’IA ? Demandez à vos nouveaux contacts comment ils vous ont trouvés, et notez la réponse.";
  fr["How Hurfi helps with this"] = "Comment Hurfi aide sur ce point";
  fr["Hurfi offers four services for manufacturers selling abroad. Here is how each one relates to this guide."] = "Hurfi propose quatre services aux industriels qui vendent à l’export. Voici le lien de chacun avec ce guide.";
  fr["Pages built with clear HTML specifications and accurate structured data."] = "Des pages construites avec des spécifications HTML claires et des données structurées exactes.";
  fr["SEO focused on specific buyer questions, measured in your own Search Console."] = "Un SEO centré sur les questions précises des acheteurs, mesuré dans votre propre Search Console.";
  fr["Campaigns for products where search demand exists, measured by inquiries."] = "Des campagnes pour les produits où la demande existe, mesurées en demandes reçues.";
  fr["Consistent company information and real content on LinkedIn."] = "Des informations d’entreprise cohérentes et du contenu réel sur LinkedIn.";
  fr["Hurfi on social media"] = "Hurfi sur les réseaux sociaux";
  fr["A few of Hurfi’s own social media posts for manufacturers. They show our brand work and how we talk to factories; they are not client results."] = "Quelques publications de Hurfi destinées aux industriels. Elles montrent notre travail de marque et notre façon de parler aux usines ; ce ne sont pas des résultats clients.";
  fr["Do we need special optimisation for Google’s AI Overviews?"] = "Faut-il une optimisation spéciale pour les aperçus IA de Google ?";
  fr["Google says there are no additional requirements to appear in AI Overviews or AI Mode beyond normal SEO best practices."] = "Google indique qu’aucune exigence supplémentaire n’est requise pour apparaître dans les aperçus IA ou le mode IA au-delà des bonnes pratiques SEO habituelles.";
  fr["Do we need special structured data for AI search?"] = "Faut-il des données structurées spéciales pour la recherche IA ?";
  fr["No. Google states that no special schema.org structured data is needed. Use structured data to describe your pages accurately."] = "Non. Google indique qu’aucune donnée structurée schema.org particulière n’est nécessaire. Utilisez-les pour décrire fidèlement vos pages.";
  fr["Will AI search reduce our website traffic?"] = "La recherche IA va-t-elle réduire notre trafic ?";
  fr["It may change how buyers reach you. Pages that answer specific technical questions remain valuable, and buyers still visit suppliers’ sites before sending an RFQ."] = "Elle peut changer la façon dont les acheteurs vous atteignent. Les pages qui répondent à des questions techniques précises restent utiles, et les acheteurs visitent toujours les sites des fournisseurs avant d’envoyer une demande.";
  fr["Should we write content for AI systems instead of people?"] = "Faut-il écrire pour les systèmes d’IA plutôt que pour les personnes ?";
  fr["No. Write for buyers. Google’s guidance focuses on helpful, people-first content."] = "Non. Écrivez pour les acheteurs. Les recommandations de Google portent sur un contenu utile, centré sur les personnes.";
  fr["Can an agency guarantee we appear in AI answers?"] = "Une agence peut-elle garantir une présence dans les réponses IA ?";
  fr["No one can guarantee that. Be wary of anyone who does."] = "Personne ne peut le garantir. Méfiez-vous de qui le promet.";
  fr["What content works best for manufacturers?"] = "Quel contenu fonctionne le mieux pour un industriel ?";
  fr["Specific product, specification, application and FAQ pages that answer real buyer questions with numbers and conditions."] = "Des pages produit, spécifications, application et FAQ précises, qui répondent aux vraies questions avec chiffres et conditions.";
  fr["How do we see AI traffic?"] = "Comment voir le trafic venu de l’IA ?";
  fr["It is included in Search Console performance reports. Track inquiries by landing page in analytics."] = "Il figure dans les rapports de performances de Search Console. Suivez les demandes par page d’arrivée dans votre outil d’analyse.";
  fr["Does consistency across platforms matter?"] = "La cohérence entre plateformes compte-t-elle ?";
  fr["Yes. Use the same company name, address and product names on your website, LinkedIn and listings."] = "Oui. Utilisez le même nom, la même adresse et les mêmes noms de produits sur votre site, LinkedIn et vos fiches.";
  fr["Can Hurfi help?"] = "Hurfi peut-il aider ?";
  fr["Yes. Our SEO work covers the content, technical and structured-data basics that both classic and AI search rely on."] = "Oui. Notre travail SEO couvre les bases de contenu, techniques et de données structurées sur lesquelles reposent la recherche classique comme la recherche IA.";
  fr["External guidance quoted in this article, checked on the date shown. Links open the publisher’s own page."] = "Les sources externes citées dans cet article ont été vérifiées à la date indiquée. Les liens ouvrent la page de l’éditeur.";
  fr["Google Search Central."] = "Google Search Central.";
  fr[". Checked 16 October 2026."] = ". Vérifié le 16 octobre 2026.";
  fr["Google Search Central Blog."] = "Blog Google Search Central.";
  fr["Top ways to ensure your content performs well in Google’s AI experiences on Search (May 2025)"] = "Top ways to ensure your content performs well in Google’s AI experiences on Search (May 2025)";
  fr["Creating helpful, reliable, people-first content"] = "Creating helpful, reliable, people-first content";
  fr["Put this guide to work"] = "Mettez ce guide en pratique";
  fr["A first consultation is free. We will look at your site and tell you which parts of this guide matter most for you."] = "La première consultation est gratuite. Nous examinons votre site et vous indiquons quels points de ce guide comptent le plus pour vous.";
  fr["Diagram of the steps covered in this guide: 1. Keep pages crawlable; 2. Write specific answers; 3. Show who is behind it; 4. Keep data consistent; 5. Use structured data correctly; 6. Measure real inquiries."] = "Schéma des étapes de ce guide : 1. Pages explorables ; 2. Réponses précises ; 3. Montrer qui est derrière ; 4. Données cohérentes ; 5. Données structurées correctes ; 6. Mesurer les vraies demandes.";
  fr["Hurfi social post “A great factory means nothing if global buyers can’t find it.”"] = "Publication Hurfi : « Une excellente usine ne sert à rien si les acheteurs mondiaux ne la trouvent pas. »";
  fr["Hurfi social post: a hand holding a card that reads “We turn insights into a clear strategy”"] = "Publication Hurfi : une main tenant une carte « Nous transformons les analyses en stratégie claire ».";
  fr["Hurfi social post “Ready to get discovered?”, with a hand lifting a cover off a factory scene"] = "Publication Hurfi : « Prêt à être découvert ? », une main soulevant un voile sur une scène d’usine.";
  fr["The Certifications Page Export Buyers Look For | Hurfi"] = "La page certifications que cherchent les acheteurs à l’export | Hurfi";
  fr["For many overseas buyers, certifications are the first filter: no right certificate, no RFQ. Yet many factory websites show a wall of logos with no detail. This guide explains how to build a certifications page that buyers trust, and how to link it to your products."] = "Pour beaucoup d’acheteurs étrangers, les certifications sont le premier filtre : pas le bon certificat, pas de demande. Or beaucoup de sites d’usine affichent un mur de logos sans détail. Ce guide explique comment construire une page certifications digne de confiance, et comment la relier à vos produits.";
  fr["Why certifications decide the first call"] = "Pourquoi les certifications décident du premier appel";
  fr["What the EU expects from manufacturers"] = "Ce que l’UE attend des fabricants";
  fr["Group certificates by market"] = "Regrouper les certificats par marché";
  fr["Give the details buyers check"] = "Donner les détails que les acheteurs vérifient";
  fr["Never overclaim"] = "Ne jamais surpromettre";
  fr["Link certificates to products"] = "Relier les certificats aux produits";
  fr["Make documents easy to request"] = "Faciliter la demande de documents";
  fr["A simple layout that works"] = "Une mise en page simple et efficace";
  fr["Common mistakes to avoid"] = "Les erreurs courantes à éviter";
  fr["Write it for people, not only for search"] = "Écrire pour les personnes, pas seulement pour la recherche";
  fr["A buyer in Europe, North America or the Middle East usually has to prove that what they import meets local rules. Before contacting you, they want to know whether your products already comply. If your site does not say, the easiest decision is to move on to a supplier whose site does."] = "Un acheteur en Europe, en Amérique du Nord ou au Moyen-Orient doit généralement prouver que ce qu’il importe respecte les règles locales. Avant de vous contacter, il veut savoir si vos produits sont déjà conformes. Si votre site ne le dit pas, la décision la plus simple est de passer à un fournisseur dont le site le dit.";
  fr["The European Commission’s"] = "La page de la Commission européenne sur";
  fr["CE marking page"] = "le marquage CE";
  fr["explains that manufacturers are responsible for carrying out the conformity assessment, setting up the technical file, issuing the EU declaration of conformity and affixing the CE marking. Importers and distributors must make sure the products they place on the market meet the rules."] = "explique que le fabricant est responsable de l’évaluation de conformité, de la constitution du dossier technique, de l’établissement de la déclaration UE de conformité et de l’apposition du marquage CE. Les importateurs et distributeurs doivent s’assurer que les produits qu’ils mettent sur le marché respectent les règles.";
  fr["This is why European buyers ask for your declaration of conformity and test reports: their own responsibility depends on yours."] = "C’est pourquoi les acheteurs européens demandent votre déclaration de conformité et vos rapports d’essai : leur propre responsabilité dépend de la vôtre.";
  fr["A list of logos is hard to use. Group your certificates by the market or buyer they matter to:"] = "Une liste de logos est peu utilisable. Regroupez vos certificats par marché ou par type d’acheteur concerné :";
  fr["European Union: CE-related declarations and test reports, and other EU requirements that apply to your products."] = "Union européenne : déclarations liées au CE et rapports d’essai, ainsi que les autres exigences de l’UE applicables à vos produits.";
  fr["Other markets you sell to: the certificates or registrations each requires, as confirmed by the relevant authority."] = "Autres marchés où vous vendez : les certificats ou enregistrements exigés, confirmés par l’autorité compétente.";
  fr["Quality and management systems: ISO or industry-specific certificates."] = "Systèmes qualité et management : certificats ISO ou spécifiques au secteur.";
  fr["China: compulsory certification (CCC) and other domestic approvals where relevant."] = "Chine : certification obligatoire (CCC) et autres homologations nationales le cas échéant.";
  fr["Certificate name and number."] = "Le nom et le numéro du certificat.";
  fr["Issuing body or test laboratory."] = "L’organisme émetteur ou le laboratoire d’essai.";
  fr["Scope: which products and models it covers."] = "Le périmètre : quels produits et modèles sont couverts.";
  fr["Issue and expiry dates."] = "Les dates d’émission et d’expiration.";
  fr["A downloadable copy or the option to request one."] = "Une copie téléchargeable ou la possibilité d’en demander une.";
  fr["Only list certificates you hold, for the products they really cover. Do not imply that a quality-system certificate is a product certificate, or that a test report is a certification. A buyer who finds one overstatement will doubt everything else — and in regulated markets it can create legal problems for both of you."] = "Ne listez que les certificats que vous détenez, pour les produits qu’ils couvrent réellement. Ne laissez pas entendre qu’un certificat de système qualité est un certificat produit, ni qu’un rapport d’essai est une certification. Un acheteur qui repère une exagération doutera de tout le reste — et sur les marchés réglementés, cela peut créer des problèmes juridiques pour vous deux.";
  fr["On every product page, say which certificates cover that product and link to the certifications page. On the certifications page, link back to the products. Buyers then see compliance in context, and search engines see clear relationships between pages."] = "Sur chaque page produit, indiquez quels certificats couvrent ce produit et renvoyez à la page certifications. Sur la page certifications, renvoyez vers les produits. L’acheteur voit alors la conformité en contexte, et les moteurs voient des relations claires entre les pages.";
  fr["Where it fits the page and the information is accurate,"] = "Lorsque cela convient à la page et que l’information est exacte,";
  fr["Product structured data"] = "les données structurées produit";
  fr["can describe your products to Google."] = "peuvent décrire vos produits à Google.";
  fr["Certificates expire, scopes change and new models need testing. Give one person the job of checking the page every quarter. An expired certificate on your website tells a buyer you are not paying attention."] = "Les certificats expirent, les périmètres changent et les nouveaux modèles doivent être testés. Confiez à une personne la vérification trimestrielle de la page. Un certificat expiré sur votre site dit à l’acheteur que vous ne suivez pas.";
  fr["Some documents you may not want to publish openly. Offer them on request with a short form: the buyer’s company, market and products of interest. That request is itself a strong sales lead."] = "Certains documents ne sont pas à publier ouvertement. Proposez-les sur demande via un court formulaire : société, marché et produits concernés. Cette demande est en soi un bon signal commercial.";
  fr["Most manufacturers can use the same structure: a short introduction, then one block per market, then quality-system certificates, then a “request documents” form. Inside each market block, a table works well:"] = "La plupart des industriels peuvent suivre la même structure : une courte introduction, puis un bloc par marché, puis les certificats de système, puis un formulaire « demander les documents ». Dans chaque bloc marché, un tableau fonctionne bien :";
  fr["Column 1: certificate or document name."] = "Colonne 1 : nom du certificat ou du document.";
  fr["Column 2: products and models covered."] = "Colonne 2 : produits et modèles couverts.";
  fr["Column 3: issuing body or laboratory."] = "Colonne 3 : organisme émetteur ou laboratoire.";
  fr["Column 4: valid until."] = "Colonne 4 : valable jusqu’au.";
  fr["Column 5: download or request link."] = "Colonne 5 : lien de téléchargement ou de demande.";
  fr["Keep the table in HTML, not as an image, so buyers can search it and read it on a phone."] = "Gardez le tableau en HTML, pas en image, pour qu’il soit consultable et lisible sur téléphone.";
  fr["Logos of certification marks the company does not hold."] = "Des logos de marques de certification que l’entreprise ne détient pas.";
  fr["Certificates issued to a different company, such as a trading partner, without saying so."] = "Des certificats délivrés à une autre société, par exemple un partenaire commercial, sans le préciser.";
  fr["Expired certificates still shown as current."] = "Des certificats expirés présentés comme valides.";
  fr["Test reports presented as certifications."] = "Des rapports d’essai présentés comme des certifications.";
  fr["Scanned certificates so blurred that the number cannot be read."] = "Des certificats scannés si flous que le numéro est illisible.";
  fr["Google’s guidance on"] = "Les recommandations de Google sur";
  fr["helpful, reliable, people-first content"] = "un contenu utile, fiable et centré sur les personnes";
  fr["applies here too. A clear page that answers a buyer’s compliance questions is more useful — and more convincing — than a page of keywords."] = "s’appliquent ici aussi. Une page claire qui répond aux questions de conformité est plus utile — et plus convaincante — qu’une page de mots-clés.";
  fr["A certifications page grouped by market and linked to every product page."] = "Une page certifications regroupée par marché et reliée à chaque page produit.";
  fr["Clean structure and internal links so product and compliance pages support each other in search."] = "Une structure propre et des liens internes pour que pages produit et pages conformité se soutiennent dans la recherche.";
  fr["Campaign landing pages that show compliance for the market you target."] = "Des pages d’atterrissage publicitaires montrant la conformité pour le marché visé.";
  fr["Posts that explain new certifications and tests, without overclaiming."] = "Des publications présentant de nouvelles certifications et de nouveaux essais, sans exagération.";
  fr["Should we show certificate logos?"] = "Faut-il afficher les logos des certificats ?";
  fr["You can, but always with the details: number, issuer, scope and validity. Logos alone do not answer buyers’ questions."] = "Oui, mais toujours avec les détails : numéro, émetteur, périmètre et validité. Les logos seuls ne répondent pas aux questions.";
  fr["Who is responsible for CE marking?"] = "Qui est responsable du marquage CE ?";
  fr["The European Commission explains that the manufacturer carries out the conformity assessment, prepares the technical file, issues the declaration of conformity and affixes the CE marking."] = "La Commission européenne explique que le fabricant réalise l’évaluation de conformité, prépare le dossier technique, établit la déclaration de conformité et appose le marquage CE.";
  fr["Can we publish test reports?"] = "Peut-on publier les rapports d’essai ?";
  fr["You can publish them or offer them on request. Make clear which products and models they cover."] = "Vous pouvez les publier ou les proposer sur demande. Indiquez clairement les produits et modèles couverts.";
  fr["We hold ISO 9001. Is that a product certificate?"] = "Nous avons l’ISO 9001. Est-ce un certificat produit ?";
  fr["No. It certifies a quality-management system. Present it as that, separately from product certifications."] = "Non. Il certifie un système de management de la qualité. Présentez-le comme tel, séparément des certifications produit.";
  fr["Do we need a page per certificate?"] = "Faut-il une page par certificat ?";
  fr["Usually one certifications page grouped by market is enough, plus the relevant certificates on each product page."] = "En général, une page certifications regroupée par marché suffit, avec les certificats pertinents sur chaque page produit.";
  fr["How often should we update it?"] = "À quelle fréquence la mettre à jour ?";
  fr["At least every quarter, and whenever a certificate is issued, renewed or expires."] = "Au moins chaque trimestre, et à chaque émission, renouvellement ou expiration.";
  fr["Can Hurfi tell us which certificates we need?"] = "Hurfi peut-il nous dire quels certificats il nous faut ?";
  fr["No. That is for your compliance team, test laboratories or authorities. We help you present what you hold clearly and accurately."] = "Non. Cela relève de votre équipe conformité, des laboratoires ou des autorités. Nous vous aidons à présenter clairement et fidèlement ce que vous détenez.";
  fr["European Commission."] = "Commission européenne.";
  fr["CE marking"] = "marquage CE";
  fr["Introduction to Product structured data"] = "Introduction aux données structurées produit";
  fr["Diagram of the steps covered in this guide: 1. List what you hold; 2. Group by market; 3. Add scope and models; 4. Show validity; 5. Offer documents; 6. Link to products."] = "Schéma des étapes : 1. Lister ce que vous détenez ; 2. Regrouper par marché ; 3. Ajouter périmètre et modèles ; 4. Afficher la validité ; 5. Proposer les documents ; 6. Relier aux produits.";
  fr["Hurfi social post with jigsaw pieces: “Your factory has everything… except visibility.”"] = "Publication Hurfi avec des pièces de puzzle : « Votre usine a tout… sauf la visibilité. »";
  fr["Hurfi social post “A beautiful website without conversions…”, showing a car body balanced on bicycle wheels"] = "Publication Hurfi : « Un beau site sans conversions… », une carrosserie posée sur des roues de vélo.";
  fr["Industrial Product Page SEO: What Buyers and Google Need | Hurfi"] = "SEO des pages produit industrielles : ce dont les acheteurs et Google ont besoin | Hurfi";
  fr["For a manufacturer, the product page does most of the selling. It is where an engineer decides whether to send an RFQ, and where Google decides whether the page answers a search. This guide covers what a good industrial product page contains."] = "Pour un industriel, la page produit fait l’essentiel de la vente. C’est là qu’un ingénieur décide d’envoyer une demande, et que Google décide si la page répond à une recherche. Ce guide décrit ce que contient une bonne page produit industrielle.";
  fr["Start with a descriptive title"] = "Commencer par un titre descriptif";
  fr["Put specifications in HTML text"] = "Mettre les spécifications en texte HTML";
  fr["Explain applications and limits"] = "Expliquer les applications et les limites";
  fr["Be exact about compliance"] = "Être précis sur la conformité";
  fr["Use structured data that matches the page"] = "Utiliser des données structurées cohérentes avec la page";
  fr["End with an RFQ path"] = "Terminer par un parcours de demande";
  fr["A product page outline you can reuse"] = "Une structure de page produit réutilisable";
  fr["How to handle hundreds of variants"] = "Comment gérer des centaines de variantes";
  fr["Common mistakes on factory product pages"] = "Les erreurs courantes sur les pages produit d’usine";
  fr["Who should review a product page"] = "Qui doit relire une page produit";
  fr["The title should say what the product is in the buyer’s words, with the most important specification or variant: for example “Stainless steel ball valve, DN15–DN100, PN40” rather than “Product 3”. Google’s"] = "Le titre doit dire ce qu’est le produit dans les mots de l’acheteur, avec la spécification ou la variante la plus importante : par exemple « Vanne à boisseau sphérique inox, DN15–DN100, PN40 » plutôt que « Produit 3 ». Le";
  fr["SEO Starter Guide"] = "guide de démarrage SEO";
  fr["recommends descriptive titles and notes that Google does not use the keywords meta tag."] = "de Google recommande des titres descriptifs et précise que Google n’utilise pas la balise meta keywords.";
  fr["Engineers search for numbers: sizes, ratings, tolerances, materials, standards. If those numbers are only in an image or a PDF, they are harder for buyers to scan and for search engines to read. Publish a specification table on the page and keep the PDF as a download."] = "Les ingénieurs cherchent des chiffres : dimensions, caractéristiques nominales, tolérances, matériaux, normes. Si ces chiffres ne sont que dans une image ou un PDF, ils sont plus difficiles à parcourir pour l’acheteur et à lire pour les moteurs. Publiez un tableau de spécifications sur la page et gardez le PDF en téléchargement.";
  fr["Units and test conditions next to every value"] = "Unités et conditions d’essai à côté de chaque valeur";
  fr["Variants in one table rather than separate thin pages"] = "Les variantes dans un seul tableau plutôt que sur des pages vides séparées";
  fr["Materials and finishes with the standards they meet"] = "Matériaux et finitions avec les normes respectées";
  fr["Drawings or dimension diagrams you own"] = "Des plans ou schémas de dimensions que vous possédez";
  fr["Say where the product is used and where it should not be used. Application text helps buyers who search by problem rather than by product name, and honest limits build trust with engineers."] = "Dites où le produit s’utilise et où il ne faut pas l’utiliser. Un texte d’application aide les acheteurs qui cherchent par problème plutôt que par nom de produit, et des limites honnêtes gagnent la confiance des ingénieurs.";
  fr["List certificates for the product and market, with the holder and scope. For products sold in the EU that need CE marking, the"] = "Listez les certificats par produit et par marché, avec le titulaire et le périmètre. Pour les produits vendus dans l’UE nécessitant le marquage CE,";
  fr["European Commission"] = "la Commission européenne";
  fr["explains that the manufacturer carries out the conformity assessment, sets up the technical file, issues the EU declaration of conformity and affixes the marking. Only claim what you hold."] = "explique que le fabricant réalise l’évaluation de conformité, constitue le dossier technique, établit la déclaration UE de conformité et appose le marquage. Ne revendiquez que ce que vous détenez.";
  fr["documentation describes two types: Product snippets for pages that are not purchase pages, and merchant listings for pages where a product can be bought. Most B2B product pages fit the first. Mark up only what is visible on the page."] = "la documentation décrit deux types : les extraits produit pour les pages qui ne sont pas des pages d’achat, et les fiches marchand pour les pages où un produit peut être acheté. La plupart des pages produit B2B relèvent du premier. Ne balisez que ce qui est visible sur la page.";
  fr["Every product page should end with a short form or a clear contact: what the buyer needs (quantity, specification, market, date) and who will answer. Track submissions by page so you know which products bring inquiries."] = "Chaque page produit devrait se terminer par un court formulaire ou un contact clair : ce dont l’acheteur a besoin (quantité, spécification, marché, date) et qui répondra. Suivez les envois par page pour savoir quels produits apportent des demandes.";
  fr["Most industrial product pages work well with the same basic outline. It gives buyers what they need in the order they look for it, and gives search engines clear text to work with."] = "La plupart des pages produit industrielles fonctionnent bien avec la même structure de base. Elle donne aux acheteurs ce dont ils ont besoin dans l’ordre où ils le cherchent, et aux moteurs un texte clair.";
  fr["Title and one-line summary:"] = "Titre et résumé en une ligne :";
  fr["what the product is, its key specification and who it is for."] = "ce qu’est le produit, sa spécification clé et à qui il s’adresse.";
  fr["Key specifications table:"] = "Tableau des spécifications clés :";
  fr["in HTML, with units, tolerances and test conditions."] = "en HTML, avec unités, tolérances et conditions d’essai.";
  fr["where it is used, and where it should not be used."] = "où il s’utilise, et où il ne faut pas l’utiliser.";
  fr["Materials, options and customisation:"] = "Matériaux, options et personnalisation :";
  fr["what can be changed and what cannot."] = "ce qui peut être modifié et ce qui ne peut pas l’être.";
  fr["Compliance and documents:"] = "Conformité et documents :";
  fr["certificates, test reports and datasheets, with their scope."] = "certificats, rapports d’essai et fiches techniques, avec leur périmètre.";
  fr["Packaging, MOQ and lead time:"] = "Emballage, quantité minimale et délai :";
  fr["typical ranges, clearly stated as such."] = "des fourchettes habituelles, clairement présentées comme telles.";
  fr["RFQ path:"] = "Parcours de demande :";
  fr["a short form or contact link with what information to include."] = "un court formulaire ou un lien de contact indiquant quelles informations fournir.";
  fr["Industrial products often come in many sizes, materials and ratings. Creating a page for every variant usually produces hundreds of near-identical pages that do not help buyers and may be treated as low value."] = "Les produits industriels existent souvent en de nombreuses tailles, matières et caractéristiques. Créer une page par variante produit généralement des centaines de pages quasi identiques, inutiles pour l’acheteur et susceptibles d’être jugées de faible valeur.";
  fr["A better approach is one strong page per product family, with a variant table and filters. Create separate pages only for variants that buyers search for by name, or that have different applications, certifications or documents. Link variant pages back to the family page, and make sure each one has something unique to say."] = "Une meilleure approche : une page solide par famille de produits, avec un tableau de variantes et des filtres. Ne créez des pages distinctes que pour les variantes recherchées par leur nom, ou qui ont des applications, certifications ou documents différents. Reliez les pages de variantes à la page de famille, et assurez-vous que chacune apporte quelque chose d’unique.";
  fr["Specifications only in images or PDFs, so they cannot be searched or copied."] = "Des spécifications uniquement en images ou PDF, donc ni consultables ni copiables.";
  fr["Titles that are only a model number, with no description of the product."] = "Des titres réduits à une référence, sans description du produit.";
  fr["Copying a competitor’s or a marketplace description word for word."] = "Copier mot pour mot la description d’un concurrent ou d’une marketplace.";
  fr["Vague claims such as “high quality” and “best price” instead of measured values."] = "Des affirmations vagues comme « haute qualité » ou « meilleur prix » au lieu de valeurs mesurées.";
  fr["CE or other marks shown without saying which directives or standards apply."] = "Des marquages CE ou autres affichés sans indiquer les directives ou normes applicables.";
  fr["No visible way to ask a question or request a quote."] = "Aucun moyen visible de poser une question ou de demander un devis.";
  fr["Product pages carry technical and legal weight. A wrong tolerance or an overstated certification can cost an order or create liability. Before a page is published, an engineer should check the specifications and applications, someone responsible for quality should check compliance statements, and a sales person should check that the page answers the questions buyers ask most."] = "Une page produit a un poids technique et juridique. Une tolérance erronée ou une certification exagérée peut coûter une commande ou créer une responsabilité. Avant publication, un ingénieur doit vérifier spécifications et applications, un responsable qualité les mentions de conformité, et un commercial s’assurer que la page répond aux questions les plus fréquentes.";
  fr["Record who reviewed each page and when. When a specification or certificate changes, update the page and the date, so buyers and search engines see current information."] = "Notez qui a relu chaque page et quand. Lorsqu’une spécification ou un certificat change, mettez à jour la page et la date, pour que acheteurs et moteurs voient l’information actuelle.";
  fr["Product page templates with specification tables, documents and RFQ forms."] = "Des modèles de pages produit avec tableaux de spécifications, documents et formulaires de demande.";
  fr["Titles, internal links and structured data for product and application searches."] = "Des titres, liens internes et données structurées pour les recherches produit et application.";
  fr["Ads that send each search to its matching product page."] = "Des annonces qui envoient chaque recherche vers la page produit correspondante.";
  fr["Posts that introduce new products and link to their pages."] = "Des publications présentant les nouveautés et renvoyant à leurs pages.";
  fr["What makes an industrial product page rank?"] = "Qu’est-ce qui fait ranker une page produit industrielle ?";
  fr["Clear relevance to the search — a descriptive title, specifications in text, application content — plus a site that is crawlable, fast and trusted."] = "Une pertinence claire pour la recherche — titre descriptif, spécifications en texte, contenu d’application — et un site explorable, rapide et digne de confiance.";
  fr["Should every variant have its own page?"] = "Chaque variante doit-elle avoir sa page ?";
  fr["Usually not. Group minor variants in a table on one page. Give separate pages to products that buyers search for separately."] = "En général non. Regroupez les variantes mineures dans un tableau sur une page. Réservez des pages distinctes aux produits recherchés séparément.";
  fr["Are PDF datasheets bad for SEO?"] = "Les fiches PDF nuisent-elles au SEO ?";
  fr["Not bad, but not enough. Put the key specifications on the HTML page and offer the PDF too."] = "Pas nuisibles, mais insuffisantes. Placez les spécifications clés sur la page HTML et proposez aussi le PDF.";
  fr["Does Google use the keywords meta tag?"] = "Google utilise-t-il la balise meta keywords ?";
  fr["No. Google states that it does not use the keywords meta tag."] = "Non. Google indique ne pas utiliser la balise meta keywords.";
  fr["Which structured data should B2B product pages use?"] = "Quelles données structurées pour une page produit B2B ?";
  fr["Usually Product snippets markup, which Google describes for non-purchase pages. Mark up only what is visible."] = "En général le balisage « extraits produit », que Google décrit pour les pages hors achat. Ne balisez que le visible.";
  fr["Can we list CE or other certificates?"] = "Peut-on lister les certificats CE ou autres ?";
  fr["Yes, if you hold them for that product. Name the product, scope and holder. The manufacturer is responsible for CE conformity assessment."] = "Oui, si vous les détenez pour ce produit. Indiquez produit, périmètre et titulaire. L’évaluation de conformité CE incombe au fabricant.";
  fr["Should we show prices?"] = "Faut-il afficher les prix ?";
  fr["For configured or custom products, often not. Explain what affects price and invite an RFQ."] = "Pour des produits configurés ou sur mesure, souvent non. Expliquez ce qui influe sur le prix et invitez à demander un devis.";
  fr["How long should a product page be?"] = "Quelle longueur pour une page produit ?";
  fr["As long as it needs to answer the buyer’s questions. Specifications, applications, compliance and an RFQ form usually take more than a paragraph."] = "Assez longue pour répondre aux questions de l’acheteur. Spécifications, applications, conformité et formulaire demandent plus d’un paragraphe.";
  fr["Can Hurfi write our product pages?"] = "Hurfi peut-il rédiger nos pages produit ?";
  fr["Yes. We draft them from your documents with your engineers and you approve every technical statement."] = "Oui. Nous les rédigeons à partir de vos documents avec vos ingénieurs, et vous validez chaque affirmation technique.";
  fr["Diagram of the steps covered in this guide: 1. Descriptive title; 2. Specifications in text; 3. Applications; 4. Compliance and documents; 5. Structured data; 6. RFQ form."] = "Schéma des étapes : 1. Titre descriptif ; 2. Spécifications en texte ; 3. Applications ; 4. Conformité et documents ; 5. Données structurées ; 6. Formulaire de demande.";
  fr["Hurfi social post “You’ve built what global buyers want. Now let them find it.”, with a magnifying-glass mascot"] = "Publication Hurfi : « Vous avez fabriqué ce que les acheteurs mondiaux veulent. Maintenant, laissez-les le trouver. », avec une mascotte en forme de loupe.";


  zh["Huizhou Statistics Bureau and NBS Huizhou Survey Team (bulletin published in Huizhou Daily, 12 May 2026)."] = "惠州市统计局与国家统计局惠州调查队（公报发表于《惠州日报》，2026 年 5 月 12 日）。";
  fr["Huizhou Statistics Bureau and NBS Huizhou Survey Team (bulletin published in Huizhou Daily, 12 May 2026)."] = "Bureau des statistiques de Huizhou et équipe d’enquête de Huizhou du BNS (bulletin publié dans le Huizhou Daily, 12 mai 2026).";
  zh["2025年惠州国民经济和社会发展统计公报 (Huizhou 2025 Statistical Bulletin)"] = "2025年惠州国民经济和社会发展统计公报 (Huizhou 2025 Statistical Bulletin)";
  fr["2025年惠州国民经济和社会发展统计公报 (Huizhou 2025 Statistical Bulletin)"] = "2025年惠州国民经济和社会发展统计公报 (Bulletin statistique 2025 de Huizhou)";


  // Insight articles: international SEO, agency choice, market pages, 2026-10-20.
  zh["International SEO Checklist for Chinese Exporters | Hurfi"] = "中国出口企业的国际 SEO 清单 | Hurfi";
  zh["Selling abroad means being found in Google by buyers who search in their own language and their own words. This checklist covers the decisions that matter most for a Chinese manufacturer’s export website, in the order we usually work through them."] = "做出口，意味着要让用自己的语言、自己的说法搜索的买家在谷歌上找到你。这份清单按我们通常的工作顺序，讲中国制造企业出口网站最要紧的几个决定。";
  zh["1. Decide which markets come first"] = "1. 先确定优先市场";
  zh["2. Choose a URL structure you can maintain"] = "2. 选一个你能长期维护的网址结构";
  zh["3. Write each language version properly"] = "3. 每种语言都认真写";
  zh["4. Connect language versions with hreflang"] = "4. 用 hreflang 把各语言版本连起来";
  zh["5. Check the technical basics"] = "5. 检查技术基础";
  zh["6. Measure by market"] = "6. 按市场衡量";
  zh["7. Avoid the common hreflang mistakes"] = "7. 避开常见的 hreflang 错误";
  zh["8. Do not redirect buyers by IP address"] = "8. 不要按 IP 地址重定向买家";
  zh["9. Plan content per market, not just translation"] = "9. 按市场规划内容，而不只是翻译";
  zh["International SEO starts with a business decision, not a technical one. List the countries where you already have certification, logistics and someone who can answer buyers. Those are your first markets."] = "国际 SEO 的起点是商业决定，不是技术决定。列出那些你已经有认证、有物流、也有人能回复买家的国家。这些就是你的第一批市场。";
  zh["For each one, note the language buyers search in and the words they use for your product. A German engineer and an American buyer may describe the same part differently, and both differ from the term used in your Chinese catalogue."] = "对每个市场，记下买家搜索时用的语言，以及他们描述你产品时用的词。德国工程师和美国买家对同一个零件的说法可能不同，两者也不同于你中文目录里的叫法。";
  zh["Markets where your products are certified or can be certified soon"] = "产品已获认证、或很快能获认证的市场";
  zh["Markets where you can ship and support customers"] = "你能发货并提供支持的市场";
  zh["Markets where you have sales staff who can reply in the buyer’s language"] = "有能用买家语言回复的销售人员的市场";
  zh["Google’s guide to"] = "谷歌关于";
  zh["managing multi-regional and multilingual sites"] = "多地区、多语言网站的管理";
  zh["compares the main options: country-code domains (example.de), subdomains (de.example.com) and subdirectories (example.com/de/). Each has trade-offs in cost, maintenance and how strongly it signals a country."] = "比较了几种主要方案：国家域名（example.de）、子域名（de.example.com）和子目录（example.com/de/）。它们在成本、维护难度和“国家信号”强弱上各有取舍。";
  zh["For most manufacturers, one .com domain with language subdirectories is the simplest to run. It keeps all links and authority on one domain and is easy to host outside mainland China, which helps page speed for buyers abroad."] = "对多数制造企业来说，一个 .com 域名加语言子目录最好维护。所有链接和权重都集中在一个域名上，也方便把主机放在中国大陆以外，从而改善海外买家的访问速度。";
  zh["Use one domain unless you have a strong reason for country domains"] = "除非有充分理由，否则用一个域名";
  zh["Keep the same structure in every language (/en/products/…, /de/products/…)"] = "各语言保持相同结构（/en/products/…、/de/products/…）";
  zh["Do not rely on automatic redirects by IP address; let buyers choose the language"] = "不要依赖按 IP 的自动跳转，让买家自己选语言";
  zh["Machine translation of a Chinese catalogue rarely works. Terms get mistranslated, specifications lose their units and the pages miss the words buyers actually search for. Write the English version first, for overseas buyers, and translate from that."] = "把中文目录机器翻译，几乎行不通。术语会译错，规格会丢掉单位，页面也缺了买家真正搜索的词。先面向海外买家写好英文版，再从英文版翻译。";
  zh["Each language version should answer the same questions: what you make, to which specification and standard, how you prove quality, and how to send an RFQ."] = "每个语言版本都应回答同样的问题：你们做什么、按什么规格和标准、如何证明质量、怎么发询价。";
  zh["Use the buyer’s units and standard names"] = "使用买家的单位和标准名称";
  zh["Translate the RFQ form and confirmation messages too"] = "询价表单和确认信息也要翻译";
  zh["Have a native speaker or a technical reviewer check key pages"] = "让母语者或技术审校检查重点页面";
  zh["Hreflang annotations tell Google which page is the equivalent in another language or region. Google’s documentation on"] = "hreflang 标注告诉谷歌：哪一个页面是另一种语言或地区的对应版本。谷歌关于";
  zh["localized versions"] = "本地化版本";
  zh["sets two rules that are often missed: each language version must list itself as well as the others, and if two pages do not point to each other, the annotations are ignored."] = "定下两条常被忽略的规则：每个语言版本必须把自己和其他版本都列上；如果两个页面没有互相指向，标注就会被忽略。";
  zh["Use an x-default entry for the page buyers should see when no language matches."] = "用 x-default 指定在没有匹配语言时买家应该看到的页面。";
  zh["Pages load fast from your target markets — measure from outside China"] = "页面在目标市场加载要快——从中国境外测速";
  zh["Every product page has a unique, descriptive title and description"] = "每个产品页都有唯一、描述性的标题和描述";
  zh["Specifications are in HTML text, not only images or PDFs"] = "规格是 HTML 文字，而不只是图片或 PDF";
  zh["An XML sitemap lists every page you want indexed"] = "XML 站点地图列出所有希望被索引的页面";
  zh["Old URLs redirect to their new equivalents when you restructure"] = "改版时，旧网址跳转到对应的新网址";
  zh["The RFQ form works and sends to a monitored mailbox"] = "询价表单可用，并且发往有人查看的邮箱";
  zh["Set up"] = "把";
  zh["Search Console"] = "Search Console";
  zh["in your company’s own account. It shows impressions, clicks and the queries that brought them, and you can filter by country and page."] = "建在公司自己的账号下。它显示展示次数、点击和带来点击的查询词，并且可以按国家和页面筛选。";
  zh["Track RFQs by language and market in your analytics. Rankings are a means; qualified inquiries from the markets you chose are the goal."] = "在分析工具里按语言和市场跟踪询价。排名只是手段，来自你所选市场的有效询盘才是目的。";
  zh["Most hreflang problems on exporter sites are small and mechanical. Google’s guidelines say each language version must list itself as well as all other language versions, and that alternate URLs must be fully qualified, including https. A Spanish page that points to the English page, but not back to itself, breaks the set."] = "出口商网站上的 hreflang 问题多数很小，也很机械。谷歌的规范要求每个语言版本列出自己以及所有其他语言版本，并且备用网址必须是完整的，包含 https。一个西班牙语页面指向英文页，却没有指回自己，这一组就断了。";
  zh["Google also describes an x-default value for pages that serve no specific language, such as a language selector or a home page that redirects. Use it when you have such a page; do not invent one."] = "谷歌还说明了 x-default，用于不针对特定语言的页面，比如语言选择页或会跳转的首页。有这种页面就加上，没有就不要硬造一个。";
  zh["Every language version lists itself and every other version, with full https URLs."] = "每个语言版本都列出自己和其他所有版本，使用完整的 https 网址。";
  zh["The language codes are valid (for example en, es, de, pt-BR), not country names."] = "语言代码有效（如 en、es、de、pt-BR），不要用国家名称。";
  zh["Canonical tags point to the same-language page, not to the English page."] = "canonical 指向同语言的页面，而不是英文页。";
  zh["New language pages are added to the set on all existing versions, not just one."] = "新增语言页面时，要在所有已有版本上都补上，而不只是其中一个。";
  zh["It is tempting to send visitors from Germany to the German site automatically. Google’s advice on multi-regional sites is not to use IP analysis to adapt content, because location detection is unreliable and Google may not be able to crawl all variations of the site. Instead, give each version its own URL and add a visible language or region selector."] = "把德国访客自动送到德语站很诱人。但谷歌对多地区网站的建议是不要用 IP 分析来调整内容，因为定位并不可靠，而且谷歌可能抓不到网站的所有版本。更好的做法是每个版本各有网址，并加上显眼的语言或地区选择器。";
  zh["This also helps buyers. A purchasing manager in Dubai may prefer English; an engineer in Switzerland may want German or French. Let them choose, and remember their choice."] = "这对买家也有好处。迪拜的采购经理可能更愿意看英文，瑞士的工程师可能想看法语或德语。让他们自己选，并记住他们的选择。";
  zh["Translation alone rarely wins rankings in a new market. Buyers search with local terms, standards and units. A pump that is sold by flow rate in m³/h in Europe may be searched by GPM in the United States. A cable may need UL references for North America and CE or IEC references for Europe."] = "只靠翻译，很难在新市场拿到排名。买家是用当地的术语、标准和单位来搜索的。在欧洲按 m³/h 流量卖的泵，在美国可能是按 GPM 搜索。线缆在北美可能需要 UL 编号，在欧洲则需要 CE 或 IEC 编号。";
  zh["Before you translate, list the ten product pages that matter most in each market, and check which terms, units and certifications buyers there use. Then write — or adapt — those pages first. Smaller, better pages in a market beat a full but weak copy of the English site."] = "翻译之前，先列出每个市场最重要的十个产品页，查清当地买家使用哪些术语、单位和认证。然后优先写——或改写——这些页面。在某个市场里，少而好的页面胜过一次完整却薄弱的英文站照搬。";
  zh["Local units and standards on every specification table."] = "每张规格表都用当地的单位和标准。";
  zh["Market-specific certifications and documents linked from the product page."] = "产品页链接到该市场特有的认证和文件。";
  zh["Contact options that suit the market: business hours, languages and response times."] = "适合该市场的联系选项：工作时间、语言和响应时间。";
  zh["Language-ready site structure, translated RFQ forms and fast hosting for buyers abroad."] = "可承载多语言的网站结构、翻译好的询价表单，以及面向海外买家的快速主机。";
  zh["Market selection, keyword research per language, hreflang and Search Console reporting by country."] = "市场选择、按语言做关键词研究、hreflang，以及按国家的 Search Console 报告。";
  zh["Campaigns per country and language once the pages exist, measured by RFQs."] = "页面就绪后，按国家和语言投放广告，以询价衡量。";
  zh["LinkedIn content in English that supports the markets you chose."] = "用英文发布领英内容，支撑你选定的市场。";
  zh["What is international SEO?"] = "什么是国际 SEO？";
  zh["It is the work of making a website findable in search engines in more than one country or language: choosing a URL structure, writing each language version, connecting them with hreflang and measuring results by market."] = "就是让网站在多个国家或语言下都能被搜索引擎找到：选网址结构、写各语言版本、用 hreflang 连起来，并按市场衡量结果。";
  zh["Do we need a separate website for every country?"] = "每个国家都需要单独的网站吗？";
  zh["Usually not. Google documents several options; for most manufacturers, one domain with language subdirectories is the easiest to maintain."] = "通常不需要。谷歌列了几种方案；对多数制造企业，一个域名加语言子目录最好维护。";
  zh["Is machine translation good enough?"] = "机器翻译够用吗？";
  zh["Rarely for product pages. It often gets technical terms and units wrong and misses the words buyers search for. Translate from a well-written English version and have key pages reviewed."] = "产品页上很少够用。它常把术语和单位弄错，也漏掉买家搜索的词。请从一篇写得好的英文版翻译，并让重点页面经过审校。";
  zh["What happens if hreflang is wrong?"] = "hreflang 写错了会怎样？";
  zh["Google may ignore it. Each version must list itself and the others, and the links must go both ways."] = "谷歌可能会忽略它。每个版本必须列出自己和其他版本，而且链接要双向。";
  zh["Should we redirect visitors by IP address?"] = "应该按 IP 地址重定向访客吗？";
  zh["It is better to let visitors choose. Automatic redirects can stop buyers and search engines from reaching the version they need."] = "更好的做法是让访客自己选。自动跳转可能让买家和搜索引擎到不了他们需要的版本。";
  zh["Does hosting in China hurt international SEO?"] = "主机放在中国会影响国际 SEO 吗？";
  zh["It can make pages slow for buyers abroad. Many exporters host the export site outside mainland China for speed."] = "会让海外买家的访问变慢。很多出口企业把出口站放在中国大陆以外以提升速度。";
  zh["Which language should we start with?"] = "应该从哪种语言开始？";
  zh["English, for most exporters, because it covers many markets. Add other languages where you have buyers and staff who can reply."] = "多数出口企业从英文开始，因为它覆盖很多市场。在有买家、也有能回复的员工的市场，再加其他语言。";
  zh["How do we know it is working?"] = "怎么知道有没有效果？";
  zh["Search Console shows impressions and clicks by country and page; analytics shows inquiries by market. Look at both."] = "Search Console 显示按国家和页面的展示与点击；分析工具显示按市场的询盘。两者都要看。";
  zh["Can Hurfi do this for us?"] = "Hurfi 能帮我们做吗？";
  zh["Yes. Our SEO and website development services cover structure, content, hreflang and measurement for exporters."] = "可以。我们的 SEO 和网站开发服务为出口企业覆盖结构、内容、hreflang 和衡量。";
  zh["Managing multi-regional and multilingual sites"] = "管理多地区、多语言网站";
  zh["Tell Google about localized versions of your page"] = "让谷歌了解你页面的本地化版本";
  zh["Get started with Search Console"] = "Search Console 入门";
  zh["Learn about sitemaps"] = "了解站点地图";
  zh["Diagram of the steps covered in this guide: 1. Choose markets; 2. Pick URL structure; 3. Write for each language; 4. Add hreflang; 5. Check technical basics; 6. Measure in Search Console."] = "本指南步骤示意图：1. 选定市场；2. 确定网址结构；3. 为每种语言撰写；4. 添加 hreflang；5. 检查技术基础；6. 在 Search Console 中衡量。";
  zh["Hurfi social post “Expanding without research could be risky!”: a blue balloon floating between cactus plants"] = "Hurfi 社媒内容：“不做调研就扩张，可能有风险！”画面是一只蓝色气球飘在仙人掌之间。";
  zh["Hurfi social post “Global buyers search before they buy”: they look for trusted manufacturers, reliable suppliers and verified capabilities"] = "Hurfi 社媒内容：“全球买家在购买前会先搜索”：他们要找值得信任的制造商、可靠供应商和经过验证的能力。";
  zh["How to Choose an Export Marketing Agency | Hurfi"] = "如何选择出口营销代理公司 | Hurfi";
  zh["Choosing an agency to help you sell abroad is a significant decision for a factory. A good agency will make your company easier to find and easier to trust. A poor one can waste a year and leave you with accounts you do not own. These are the questions we would ask, including of ourselves."] = "对一家工厂来说，选择帮你做出口的代理公司是个重要决定。好的代理让你更容易被找到、更容易被信任。差的代理会浪费一年时间，还让你手里握着并不属于你的账号。下面是我们会问的问题，也包括问我们自己。";
  zh["Start with the outcome you want"] = "先想清你要的结果";
  zh["Be wary of guarantees"] = "对“保证”保持警惕";
  zh["Make sure you own everything"] = "确保一切都归你所有";
  zh["Ask how content gets written"] = "问清内容是怎么写出来的";
  zh["Agree what will be reported"] = "约定汇报什么";
  zh["Start with a defined first scope"] = "从范围明确的第一期开始";
  zh["Questions to ask before you sign"] = "签约前要问的问题";
  zh["Red flags in proposals"] = "方案里的危险信号";
  zh["How to compare two shortlisted agencies"] = "如何比较两家入围的代理";
  zh["Before speaking to agencies, write down what success looks like in a year: more qualified RFQs from certain countries, a site that passes buyer checks, or less dependence on one marketplace. An agency should ask you this in the first meeting. If it starts with a package price instead, be careful."] = "在接触代理之前，先写下一年后“成功”是什么样子：来自某些国家的有效询价更多、网站能通过买家核查，或者对某个平台的依赖减少。代理在第一次会谈就该问你这个问题。如果它一上来就报套餐价格，要留个心眼。";
  zh["Google’s own advice on"] = "谷歌自己关于";
  zh["hiring an SEO"] = "聘请 SEO 的建议";
  zh["states plainly that no one can guarantee a #1 ranking on Google. An agency that guarantees rankings or a fixed number of leads is either measuring something meaningless or promising something it cannot control."] = "明确说：没有人能保证在谷歌排第一。承诺排名或固定数量线索的代理，要么在衡量毫无意义的东西，要么在承诺它控制不了的事。";
  zh["A good agency commits to work, process and honest reporting instead."] = "好的代理承诺的是工作、流程和诚实的汇报。";
  zh["Guaranteed first-page rankings"] = "保证首页排名";
  zh["Guaranteed lead numbers regardless of product or price"] = "不管产品和价格，保证线索数量";
  zh["Large volumes of “backlinks” for a fixed fee"] = "固定价格买大量“外链”";
  zh["Reports full of impressions and reach but no inquiries"] = "报表满是展示和触达，却没有询盘";
  zh["Your domain, website, hosting account, Google Search Console, analytics and ad accounts should be registered to your company, with the agency given access. If you part ways, you keep the history and the assets."] = "域名、网站、主机账号、Google Search Console、分析工具和广告账号，都应注册在你公司名下，代理只是获得访问权限。将来分开时，历史和资产都留在你手里。";
  zh["Domain registered in your company’s name"] = "域名注册在公司名下";
  zh["Search Console and analytics owned by your company account"] = "Search Console 和分析工具归公司账号所有";
  zh["Ad accounts in your name, with your payment method"] = "广告账号在你名下，用你的支付方式";
  zh["Source files and content delivered to you"] = "源文件和内容交付给你";
  zh["For a manufacturer, content quality depends on technical accuracy. Ask who writes product pages, how they learn your products and who approves technical claims. Google’s guidance on"] = "对制造企业来说，内容质量取决于技术准确性。要问清谁写产品页、他们怎么了解你的产品、谁确认技术表述。谷歌关于";
  zh["helpful, people-first content"] = "有用、以人为本的内容";
  zh["suggests asking “Who, How, and Why” about each page; an agency should be able to answer those for the content it produces."] = "建议对每个页面问“谁、怎么做、为什么”；代理应该能对它产出的内容回答这三点。";
  zh["Mass-produced pages with little original information are a risk, not an asset. Google’s"] = "原创信息很少、批量生产的页面是风险，不是资产。谷歌的";
  zh["spam policies"] = "垃圾内容政策";
  zh["describe practices such as scaled content abuse — many pages generated mainly to manipulate rankings — and link spam."] = "描述了“规模化内容滥用”——主要为操纵排名而生成大量页面——以及链接垃圾等做法。";
  zh["Ask to see a sample report. The useful numbers for an exporter are qualified inquiries by source and market, search impressions and clicks for the products you care about, and the cost per qualified inquiry for paid campaigns."] = "要求看一份真实报表样例。对出口企业有用的数字是：按来源和市场的有效询盘、你关心的产品的搜索展示与点击，以及付费推广的每条有效询盘成本。";
  zh["Agree a monthly report and a quarterly review where the plan can change."] = "约定每月一份报告，每季度一次复盘，复盘时可以调整计划。";
  zh["A sensible first project is small enough to judge: fixing the main product pages, building an RFQ path, or setting up search tracking. You will learn more about an agency from three months of real work than from any proposal."] = "合理的第一期项目要小到可以评判：修好主要产品页、搭好询价路径，或者把搜索跟踪建立起来。三个月的实际工作，比任何方案书都更能让你了解一家代理。";
  zh["A short list of direct questions tells you more than a long sales deck. Ask every agency the same questions and compare the answers in writing."] = "几个直接的问题，比一份冗长的销售演示更能说明问题。对每家代理问同样的问题，把答案写下来比较。";
  zh["Who will do the work each month, and in which language do they write?"] = "每个月由谁来做这些工作？他们用什么语言写？";
  zh["Which of these tasks are done by people, and which by software or AI tools?"] = "这些工作里哪些由人完成，哪些由软件或 AI 工具完成？";
  zh["What will you need from our engineers and sales team, and how much of their time?"] = "需要我们工程师和销售团队提供什么？占用他们多少时间？";
  zh["Which reports will we get, and can we see an example from a similar engagement?"] = "我们会拿到哪些报告？能否看一份类似项目的样例？";
  zh["What happens to the website, domains, ad accounts and content if we stop working together?"] = "如果我们停止合作，网站、域名、广告账号和内容归谁？";
  zh["How will you handle technical claims, certifications and safety statements?"] = "你们怎么处理技术表述、认证和安全声明？";
  zh["Some warning signs come up again and again. Google’s spam policies describe link schemes and scaled content abuse — producing many pages mainly to manipulate rankings — as practices that can lead to lower rankings or removal from results. If a proposal promises hundreds of backlinks or “500 AI-written pages a month”, treat that as a risk, not a bonus."] = "有些危险信号反复出现。谷歌的垃圾内容政策把“链接方案”和“规模化内容滥用”——主要为操纵排名而产出大量页面——列为可能导致排名下降甚至被移出结果的做法。如果方案承诺几百条外链，或者“每月 500 篇 AI 写的页面”，请把它当风险，而不是赠品。";
  zh["Be cautious too of proposals that report only rankings for long lists of keywords nobody searches for, or traffic without inquiries. For a manufacturer, the useful numbers are qualified inquiries, RFQs and, eventually, orders."] = "对那些只汇报一长串没人搜索的关键词排名、或者只报流量不谈询盘的方案，也要当心。对制造企业来说，有用的数字是有效询盘、询价，以及最终的订单。";
  zh["Guaranteed first-page rankings or a fixed number of leads."] = "保证首页排名或固定线索数量。";
  zh["Bulk link building or “private networks”."] = "批量买外链或“私有网络”。";
  zh["Ownership of your domain or ad account held by the agency."] = "域名或广告账号的所有权在代理手里。";
  zh["No access to the analytics and Search Console data."] = "不给你分析工具和 Search Console 数据的访问权。";
  zh["When two agencies look similar, give each the same small paid task: for example, rewrite one key product page, or audit your top ten pages. Compare the quality of the work, how many questions they asked about your product, and how they handled technical details."] = "两家代理看起来差不多时，给每家一个相同的小付费任务：比如改写一个重点产品页，或者审查你最重要的十个页面。然后比较工作质量、他们问了多少关于你产品的问题，以及他们如何处理技术细节。";
  zh["An agency that asks for datasheets, test reports and examples of real buyer questions is usually one that will write pages buyers trust. An agency that delivers quickly without asking anything has probably written something generic."] = "会要数据表、检测报告和真实买家问题样例的代理，通常会写出买家信任的页面。什么都不问、很快就交稿的代理，多半写的是通用套话。";
  zh["Sites built in your own hosting and domain, with source files handed over."] = "在你自己的主机和域名上建站，并移交源文件。";
  zh["SEO reported from your own Search Console, with no ranking guarantees."] = "用你自己的 Search Console 汇报，不做排名保证。";
  zh["Ad accounts in your company name, reported by cost per qualified inquiry."] = "广告账号在公司名下，按每条有效询盘成本汇报。";
  zh["LinkedIn pages owned by your company, with the agency as an admin."] = "领英主页归公司所有，代理作为管理员。";
  zh["Can any agency guarantee Google rankings?"] = "有代理能保证谷歌排名吗？";
  zh["No. Google states that no one can guarantee a #1 ranking on Google. Treat guarantees as a warning sign."] = "没有。谷歌明确表示没有人能保证排名第一。把“保证”当作警示信号。";
  zh["Who should own our website and accounts?"] = "网站和账号该归谁？";
  zh["Your company. The agency should have access, not ownership, so you keep everything if you change agency."] = "归你公司。代理只应有访问权，而不是所有权，这样换代理时东西都在你手上。";
  zh["What should an agency report each month?"] = "代理每月应该汇报什么？";
  zh["Qualified inquiries by source and market, search impressions and clicks for priority products, and spend and cost per inquiry for paid campaigns."] = "按来源和市场的有效询盘、重点产品的搜索展示与点击，以及付费推广的花费和每条询盘成本。";
  zh["Is it a problem if an agency builds hundreds of pages quickly?"] = "代理快速做几百个页面，有问题吗？";
  zh["It can be. Pages with little original value can fall under Google’s spam policies on scaled content. Fewer, better pages are usually safer."] = "可能有问题。原创价值低的页面可能落入谷歌关于规模化内容的垃圾政策。少而好的页面通常更安全。";
  zh["Should the agency understand our industry?"] = "代理需要懂我们的行业吗？";
  zh["It should be willing to learn it and to work with your engineers. Ask how they will learn your products and who approves technical claims."] = "至少要愿意去学，并愿意和你的工程师合作。问他们打算怎么了解你的产品，谁确认技术表述。";
  zh["How long should the first contract be?"] = "第一份合同该多长？";
  zh["Long enough to do real work, short enough to judge. A defined first scope over a few months is reasonable."] = "长到能做实事，短到能判断效果。范围明确的几个月首期比较合理。";
  zh["Should we choose a Chinese agency or a foreign one?"] = "该选中国代理还是国外代理？";
  zh["Choose the one that can write naturally for your buyers and communicate well with your team. Ask to see English content they have written."] = "选那个能为你的买家写得自然、又能和你的团队顺畅沟通的。要求看他们写过的英文内容。";
  zh["What are signs of a good agency?"] = "好代理有哪些特征？";
  zh["They ask about your goals, admit what they cannot promise, put accounts in your name and show you real reporting."] = "会问你的目标、承认自己不能承诺什么、把账号放在你名下，并给你看真实报表。";
  zh["How does Hurfi work?"] = "Hurfi 是怎么做的？";
  zh["We start with a free consultation, agree a scope, keep accounts in your name and report from them every month. We do not guarantee rankings or lead numbers."] = "我们先做免费咨询，商定范围，账号始终在你名下，每月用这些账号的数据汇报。我们不保证排名，也不保证线索数量。";
  zh["Do you need an SEO?"] = "需要请 SEO 吗？";
  zh["Spam policies for Google web search"] = "谷歌网页搜索的垃圾内容政策";
  zh["Diagram of the steps covered in this guide: 1. Define the goal; 2. Check guarantees; 3. Confirm ownership; 4. Review content process; 5. Agree reporting; 6. Start small."] = "本指南步骤示意图：1. 明确目标；2. 核查保证；3. 确认所有权；4. 了解内容流程；5. 约定汇报；6. 从小处开始。";
  zh["Hurfi social post for local manufacturers: “Everything is under Ctrl”, with a keyboard Ctrl key"] = "Hurfi 面向本地制造企业的社媒内容：“一切尽在 Ctrl”，配一个键盘 Ctrl 键。";
  zh["Hurfi social post “The digital growth system every factory needs”: two hands holding a phone showing visibility and growth"] = "Hurfi 社媒内容：“每家工厂都需要的数字增长系统”：两只手拿着手机，屏幕上显示曝光与增长。";
  zh["Hurfi social post “According to our calculations…” with a calculator display reading “You deserve a better growth”"] = "Hurfi 社媒内容：“根据我们的计算……”，计算器屏幕上显示“你值得更好的增长”。";
  zh["Market Pages for ASEAN, Middle East & Africa Buyers | Hurfi"] = "面向东盟、中东与非洲买家的市场页面 | Hurfi";
  zh["Many Chinese manufacturers now sell more to ASEAN, the Middle East and Africa than before. Buyers in these regions search and compare suppliers online too, but they have their own questions. This guide explains how to build market pages that answer them — and how to avoid pages that only exist for search engines."] = "很多中国制造商现在对东盟、中东和非洲的销售比过去更多。这些地区的买家同样在网上搜索和比较供应商，但他们有自己关心的问题。这份指南讲怎么做出能回答这些问题的市场页面，以及怎么避免只为搜索引擎而存在的页面。";
  zh["Why these regions matter now"] = "为什么这些地区现在重要";
  zh["What buyers in these markets ask"] = "这些市场的买家会问什么";
  zh["What a good market page contains"] = "一个好的市场页面包含什么";
  zh["What to avoid: doorway pages"] = "要避免什么：门页";
  zh["Languages: English first, then where it helps"] = "语言：先英文，再考虑真正有用的";
  zh["URLs and hreflang"] = "网址与 hreflang";
  zh["Proof that travels"] = "经得起远距离检验的证据";
  zh["Connect the market page to the rest of the site"] = "把市场页面和网站其余部分连起来";
  zh["An outline for one market page"] = "单页市场页面结构";
  zh["Measure by market"] = "按市场衡量";
  zh["Several 2025 bulletins show growth in these markets. Nantong’s exports to ASEAN rose 20.9% and to Africa 15.8%. Hunan’s exports to ASEAN rose 5.5% while its exports to the United States fell 29.2%. Weifang made 62% of its trade with Belt and Road countries, and Hubei 54.9%."] = "几份 2025 年的统计公报显示这些市场在增长。南通对东盟出口增长 20.9%，对非洲增长 15.8%。湖南对东盟出口增长 5.5%，而对美国出口下降 29.2%。潍坊 62% 的贸易额来自共建“一带一路”国家，湖北为 54.9%。";
  zh["Questions vary by country and product, but some come up again and again:"] = "问题因国家和产品而异，但有几类反复出现：";
  zh["Can you deliver to my port or city, and on what terms?"] = "能送到我的港口或城市吗？什么条款？";
  zh["Do you have distributors, service partners or spare parts nearby?"] = "附近有经销商、服务伙伴或备件吗？";
  zh["Which certifications or registrations does my country require, and do you hold them?"] = "我的国家要求哪些认证或注册？你们有吗？";
  zh["Can you supply in smaller quantities to start?"] = "可以先小批量供货吗？";
  zh["Can I talk to someone in my language or time zone?"] = "能和我同语言或同时区的人沟通吗？";
  zh["The products you actually sell in that market, with links to their pages."] = "你确实在该市场销售的产品，并链接到对应页面。";
  zh["Standards, certificates and registrations that apply there — only those you hold."] = "当地适用的标准、证书和注册——只写你确实持有的。";
  zh["Delivery terms, ports and typical transit times."] = "交货条款、港口和常见运输时间。";
  zh["Service, spare parts and support arrangements."] = "服务、备件和支持安排。";
  zh["References or projects in the region you are allowed to show."] = "你获准公开的该地区案例或项目。";
  zh["Who answers inquiries, in which languages and hours."] = "询盘由谁回复，用哪些语言，什么时间。";
  zh["describe doorway abuse: pages created to rank for similar searches that lead users to less useful intermediate pages, including pages targeted at specific regions or cities that funnel users to one page. A page for every country with the same text and a new name is exactly that. One strong page for a market you serve is worth more than fifty thin ones."] = "描述了“门页滥用”：为在相似搜索中排名而创建的页面，把用户引向用处不大的中间页，包括针对特定地区或城市、再把用户导向同一个页面的做法。每个国家一个页面、文字相同只换个名字，正是这种。一个真正服务该市场的扎实页面，胜过五十个单薄页面。";
  zh["English works for many B2B buyers in these regions, but Arabic, French, Spanish, Portuguese, Vietnamese, Thai or Indonesian pages can help where buyers prefer them. Translate only what you can support: if a buyer writes in Arabic, someone must be able to answer."] = "在这些地区，英文对很多 B2B 买家够用；但在买家更偏好本地语言的市场上，阿拉伯语、法语、西班牙语、葡萄牙语、越南语、泰语或印尼语页面会有帮助。只翻译你能支撑的部分：如果买家写阿拉伯语，就得有人能回。";
  zh["multi-regional and multilingual sites"] = "多地区、多语言网站";
  zh["compares country domains, subdomains and subdirectories. For most manufacturers, subdirectories such as /ar/ or /fr/ on one domain are simplest to manage."] = "比较了国家域名、子域名和子目录。对多数制造企业，一个域名下用 /ar/ 或 /fr/ 这样的子目录最好管理。";
  zh["When you have language or regional versions, Google recommends using hreflang to"] = "当你有了语言或地区版本，谷歌建议用 hreflang";
  zh["tell it about localized versions"] = "告知本地化版本";
  zh["of a page, with an x-default for unmatched languages."] = "来标明同一页面的各版本，并用 x-default 处理无匹配语言的情况。";
  zh["Buyers far away need more proof, not less. Show real factory photos, testing, packing and loading; dated references in the region; and certificates with scope and validity. Avoid stock photos and claims you cannot support."] = "远方的买家需要更多证据，而不是更少。展示真实的工厂照片、检测、包装和装柜；带日期的当地案例；以及注明范围和有效期的证书。避免图库照片和无法支撑的说法。";
  zh["Link from the market page to each relevant product page, and back."] = "从市场页面链接到相关产品页，并从产品页链回来。";
  zh["Link to your certifications and shipping pages."] = "链接到认证页面和运输页面。";
  zh["Put a short, clear RFQ form on the page, with the questions buyers in that market usually answer."] = "在页面上放一张简短清晰的询价表单，问该市场买家通常会回答的问题。";
  zh["Add the page to your XML sitemap."] = "把页面加入 XML 站点地图。";
  zh["Heading: your product type and the market, written for buyers, not keywords."] = "标题：你的产品类型加市场，写给买家看，而不是堆关键词。";
  zh["Two or three sentences on what you supply there and to whom."] = "用两三句话说明你在那里供应什么、供应给谁。";
  zh["Products sold in the market, linked."] = "在该市场销售的产品，附链接。";
  zh["Rules and certificates that apply, linked to your certifications page."] = "适用的法规和证书，链接到认证页面。";
  zh["Delivery terms and ports, linked to your shipping page."] = "交货条款和港口，链接到运输页面。";
  zh["References and photos from the region."] = "该地区的案例和照片。";
  zh["Contact and RFQ form."] = "联系方式与询价表单。";
  zh["Track inquiries, sample requests and orders by country. Search Console shows queries and clicks by country. After a few months, keep improving the markets that respond and rethink the ones that do not."] = "按国家跟踪询盘、样品请求和订单。Search Console 可以按国家看查询和点击。几个月后，对反应好的市场继续加力，对没反应的重新考虑。";
  zh["Market pages with products, certifications, terms and references for each region."] = "每个地区一个市场页面，含产品、认证、条款和案例。";
  zh["Language versions with hreflang and country reporting in Search Console."] = "带 hreflang 的语言版本，并在 Search Console 中按国家汇报。";
  zh["Campaigns tested in chosen countries, tracked to RFQs."] = "在选定国家测试的广告，跟踪到询价为止。";
  zh["Social content for platforms used in each target market."] = "针对每个目标市场常用平台的社媒内容。";
  zh["Should we build a page for every country?"] = "应该为每个国家都建页面吗？";
  zh["No. Build strong pages for the markets you really serve. Thin, repeated country pages can count as doorway abuse under Google’s spam policies."] = "不应该。为你真正服务的市场做扎实的页面。单薄、重复的国家页面可能被谷歌按垃圾政策认定为门页滥用。";
  zh["Is English enough for the Middle East and Africa?"] = "中东和非洲用英文够吗？";
  zh["Often for B2B, but Arabic or French pages can help in some markets — if you can answer inquiries in those languages."] = "B2B 场景下常常够用，但在一些市场，阿拉伯语或法语页面会有帮助——前提是你能用这些语言回复询盘。";
  zh["What is hreflang?"] = "什么是 hreflang？";
  zh["An annotation that tells Google which pages are language or regional versions of each other, so it can show the right one."] = "一种标注，告诉谷歌哪些页面互为语言或地区版本，以便展示正确的那一版。";
  zh["Do we need local certifications?"] = "需要当地认证吗？";
  zh["Many markets have their own rules. Check with the authority in each market and list only certificates you hold."] = "很多市场有自己的规定。向各市场的主管机构核实，并且只列出你确实持有的证书。";
  zh["Should we show prices for these markets?"] = "这些市场要标价吗？";
  zh["Usually not exact prices, but MOQs, terms and lead times help buyers decide."] = "通常不必标确切价格，但最小起订量、条款和交期能帮买家做决定。";
  zh["Can Hurfi translate our pages?"] = "Hurfi 能翻译我们的页面吗？";
  zh["We plan and build language versions with proper translation and correct tags, and we review them with you."] = "我们会规划并搭建各语言版本，做正经的翻译和正确的标注，并和你一起审核。";
  zh["Can you guarantee rankings in these markets?"] = "能保证在这些市场排名吗？";
  zh["No. Nobody can. We report honestly from your own Search Console."] = "不能，没人能。我们用你自己的 Search Console 如实汇报。";
  zh["Nantong Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "南通市统计局（公报文本据 tjgb.hongheiku.com 转载）。";
  zh["2025年南通市国民经济和社会发展统计公报 (Nantong 2025 Statistical Bulletin)"] = "2025年南通市国民经济和社会发展统计公报 (Nantong 2025 Statistical Bulletin)";
  zh["Hunan Provincial Bureau of Statistics and NBS Hunan Survey Team."] = "湖南省统计局与国家统计局湖南调查总队。";
  zh["湖南省2025年国民经济和社会发展统计公报 (Hunan 2025 Statistical Bulletin, 25 March 2026)"] = "湖南省2025年国民经济和社会发展统计公报 (Hunan 2025 Statistical Bulletin, 25 March 2026)";
  zh["Weifang Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "潍坊市统计局（公报文本据 tjgb.hongheiku.com 转载）。";
  zh["2025年潍坊市国民经济和社会发展统计公报 (Weifang 2025 Statistical Bulletin)"] = "2025年潍坊市国民经济和社会发展统计公报 (Weifang 2025 Statistical Bulletin)";
  zh["Hubei Provincial Bureau of Statistics (bulletin as republished on the Qianjiang government portal; official page tjj.hubei.gov.cn did not load from the box)."] = "湖北省统计局（公报转载自潜江市政府门户；官网页面 tjj.hubei.gov.cn 在本机未能加载）。";
  zh["湖北省2025年国民经济和社会发展统计公报 (Hubei 2025 Statistical Bulletin)"] = "湖北省2025年国民经济和社会发展统计公报 (Hubei 2025 Statistical Bulletin)";
  zh["Diagram of the steps covered in this guide: 1. Choose the market; 2. List buyer questions; 3. Write real content; 4. Choose language and URL; 5. Add hreflang; 6. Measure inquiries."] = "本指南步骤示意图：1. 选定市场；2. 列出买家问题；3. 写真实内容；4. 确定语言和网址；5. 添加 hreflang；6. 衡量询盘。";
  zh["Hurfi social post “The world doesn’t see your factory until you give it a window”: visibility, trust, opportunities"] = "Hurfi 社媒内容：“你不开一扇窗，世界就看不见你的工厂”：可见度、信任、机会。";
  fr["International SEO Checklist for Chinese Exporters | Hurfi"] = "Liste de contrôle SEO international pour exportateurs chinois | Hurfi";
  fr["Selling abroad means being found in Google by buyers who search in their own language and their own words. This checklist covers the decisions that matter most for a Chinese manufacturer’s export website, in the order we usually work through them."] = "Vendre à l’étranger, c’est être trouvé sur Google par des acheteurs qui cherchent dans leur langue et avec leurs mots. Cette liste couvre les décisions les plus importantes pour le site export d’un industriel chinois, dans l’ordre où nous les traitons.";
  fr["1. Decide which markets come first"] = "1. Décider quels marchés viennent d’abord";
  fr["2. Choose a URL structure you can maintain"] = "2. Choisir une structure d’URL tenable";
  fr["3. Write each language version properly"] = "3. Rédiger correctement chaque version linguistique";
  fr["4. Connect language versions with hreflang"] = "4. Relier les versions avec hreflang";
  fr["5. Check the technical basics"] = "5. Vérifier les bases techniques";
  fr["6. Measure by market"] = "6. Mesurer par marché";
  fr["7. Avoid the common hreflang mistakes"] = "7. Éviter les erreurs hreflang courantes";
  fr["8. Do not redirect buyers by IP address"] = "8. Ne pas rediriger les acheteurs par adresse IP";
  fr["9. Plan content per market, not just translation"] = "9. Prévoir du contenu par marché, pas seulement une traduction";
  fr["International SEO starts with a business decision, not a technical one. List the countries where you already have certification, logistics and someone who can answer buyers. Those are your first markets."] = "Le SEO international commence par une décision commerciale, pas technique. Listez les pays où vous avez déjà les certifications, la logistique et quelqu’un pour répondre aux acheteurs. Ce sont vos premiers marchés.";
  fr["For each one, note the language buyers search in and the words they use for your product. A German engineer and an American buyer may describe the same part differently, and both differ from the term used in your Chinese catalogue."] = "Pour chacun, notez la langue de recherche et les mots employés pour votre produit. Un ingénieur allemand et un acheteur américain peuvent décrire la même pièce différemment, et tous deux diffèrent du terme de votre catalogue chinois.";
  fr["Markets where your products are certified or can be certified soon"] = "Les marchés où vos produits sont certifiés ou peuvent l’être bientôt";
  fr["Markets where you can ship and support customers"] = "Les marchés où vous pouvez livrer et accompagner les clients";
  fr["Markets where you have sales staff who can reply in the buyer’s language"] = "Les marchés où vous avez des commerciaux capables de répondre dans la langue de l’acheteur";
  fr["Google’s guide to"] = "Le guide de Google sur";
  fr["managing multi-regional and multilingual sites"] = "la gestion de sites multirégionaux et multilingues";
  fr["compares the main options: country-code domains (example.de), subdomains (de.example.com) and subdirectories (example.com/de/). Each has trade-offs in cost, maintenance and how strongly it signals a country."] = "compare les options principales : domaines nationaux (example.de), sous-domaines (de.example.com) et sous-répertoires (example.com/de/). Chacune a ses compromis en coût, maintenance et force du signal pays.";
  fr["For most manufacturers, one .com domain with language subdirectories is the simplest to run. It keeps all links and authority on one domain and is easy to host outside mainland China, which helps page speed for buyers abroad."] = "Pour la plupart des industriels, un seul domaine .com avec des sous-répertoires de langue est le plus simple. Tous les liens et l’autorité restent sur un domaine, et l’hébergement hors de Chine continentale est facile, ce qui améliore la vitesse pour les acheteurs étrangers.";
  fr["Use one domain unless you have a strong reason for country domains"] = "Un seul domaine, sauf raison forte d’avoir des domaines pays";
  fr["Keep the same structure in every language (/en/products/…, /de/products/…)"] = "Conserver la même structure dans chaque langue (/en/products/…, /de/products/…)";
  fr["Do not rely on automatic redirects by IP address; let buyers choose the language"] = "Ne pas compter sur des redirections automatiques par IP : laissez l’acheteur choisir la langue";
  fr["Machine translation of a Chinese catalogue rarely works. Terms get mistranslated, specifications lose their units and the pages miss the words buyers actually search for. Write the English version first, for overseas buyers, and translate from that."] = "La traduction automatique d’un catalogue chinois fonctionne rarement. Les termes sont mal rendus, les spécifications perdent leurs unités et les pages n’ont pas les mots réellement recherchés. Rédigez d’abord la version anglaise, pour les acheteurs étrangers, puis traduisez à partir d’elle.";
  fr["Each language version should answer the same questions: what you make, to which specification and standard, how you prove quality, and how to send an RFQ."] = "Chaque version doit répondre aux mêmes questions : ce que vous fabriquez, selon quelle spécification et quelle norme, comment vous prouvez la qualité, et comment envoyer une demande.";
  fr["Use the buyer’s units and standard names"] = "Utiliser les unités et les noms de normes de l’acheteur";
  fr["Translate the RFQ form and confirmation messages too"] = "Traduire aussi le formulaire de demande et les messages de confirmation";
  fr["Have a native speaker or a technical reviewer check key pages"] = "Faire relire les pages clés par un locuteur natif ou un relecteur technique";
  fr["Hreflang annotations tell Google which page is the equivalent in another language or region. Google’s documentation on"] = "Les annotations hreflang indiquent à Google quelle page est l’équivalent dans une autre langue ou région. La documentation de Google sur";
  fr["localized versions"] = "les versions localisées";
  fr["sets two rules that are often missed: each language version must list itself as well as the others, and if two pages do not point to each other, the annotations are ignored."] = "pose deux règles souvent oubliées : chaque version doit se lister elle-même ainsi que les autres, et si deux pages ne se pointent pas mutuellement, les annotations sont ignorées.";
  fr["Use an x-default entry for the page buyers should see when no language matches."] = "Utilisez une entrée x-default pour la page que l’acheteur doit voir quand aucune langue ne correspond.";
  fr["Pages load fast from your target markets — measure from outside China"] = "Les pages se chargent vite depuis vos marchés cibles — mesurez depuis l’extérieur de la Chine";
  fr["Every product page has a unique, descriptive title and description"] = "Chaque page produit a un titre et une description uniques et descriptifs";
  fr["Specifications are in HTML text, not only images or PDFs"] = "Les spécifications sont en texte HTML, pas seulement en images ou PDF";
  fr["An XML sitemap lists every page you want indexed"] = "Un sitemap XML liste chaque page à indexer";
  fr["Old URLs redirect to their new equivalents when you restructure"] = "Les anciennes URL redirigent vers leurs équivalents après restructuration";
  fr["The RFQ form works and sends to a monitored mailbox"] = "Le formulaire fonctionne et envoie vers une boîte relevée";
  fr["Set up"] = "Configurez";
  fr["Search Console"] = "Search Console";
  fr["in your company’s own account. It shows impressions, clicks and the queries that brought them, and you can filter by country and page."] = "sur le compte de votre entreprise. Il montre impressions, clics et requêtes à l’origine, avec des filtres par pays et par page.";
  fr["Track RFQs by language and market in your analytics. Rankings are a means; qualified inquiries from the markets you chose are the goal."] = "Suivez les demandes par langue et par marché dans votre outil d’analyse. Le classement est un moyen ; des demandes qualifiées venant des marchés choisis sont l’objectif.";
  fr["Most hreflang problems on exporter sites are small and mechanical. Google’s guidelines say each language version must list itself as well as all other language versions, and that alternate URLs must be fully qualified, including https. A Spanish page that points to the English page, but not back to itself, breaks the set."] = "La plupart des problèmes hreflang des sites exportateurs sont petits et mécaniques. Les règles de Google exigent que chaque version se liste elle-même et toutes les autres, et que les URL alternatives soient complètes, https inclus. Une page espagnole qui pointe vers l’anglaise sans se pointer elle-même casse l’ensemble.";
  fr["Google also describes an x-default value for pages that serve no specific language, such as a language selector or a home page that redirects. Use it when you have such a page; do not invent one."] = "Google décrit aussi la valeur x-default pour les pages sans langue spécifique, comme un sélecteur de langue ou une page d’accueil qui redirige. Utilisez-la si vous avez une telle page ; n’en inventez pas.";
  fr["Every language version lists itself and every other version, with full https URLs."] = "Chaque version se liste elle-même et toutes les autres, avec des URL https complètes.";
  fr["The language codes are valid (for example en, es, de, pt-BR), not country names."] = "Les codes de langue sont valides (par exemple en, es, de, pt-BR), pas des noms de pays.";
  fr["Canonical tags point to the same-language page, not to the English page."] = "Les balises canonical pointent vers la page de même langue, pas vers l’anglaise.";
  fr["New language pages are added to the set on all existing versions, not just one."] = "Les nouvelles pages de langue sont ajoutées à l’ensemble sur toutes les versions existantes, pas une seule.";
  fr["It is tempting to send visitors from Germany to the German site automatically. Google’s advice on multi-regional sites is not to use IP analysis to adapt content, because location detection is unreliable and Google may not be able to crawl all variations of the site. Instead, give each version its own URL and add a visible language or region selector."] = "Il est tentant d’envoyer automatiquement les visiteurs allemands vers le site allemand. Google déconseille, pour les sites multirégionaux, d’utiliser l’analyse d’IP pour adapter le contenu : la géolocalisation est peu fiable et Google risque de ne pas explorer toutes les variantes du site. Donnez plutôt à chaque version sa propre URL et un sélecteur de langue ou de région visible.";
  fr["This also helps buyers. A purchasing manager in Dubai may prefer English; an engineer in Switzerland may want German or French. Let them choose, and remember their choice."] = "Cela aide aussi les acheteurs. Un acheteur à Dubaï peut préférer l’anglais ; un ingénieur en Suisse peut vouloir l’allemand ou le français. Laissez-les choisir, et mémorisez leur choix.";
  fr["Translation alone rarely wins rankings in a new market. Buyers search with local terms, standards and units. A pump that is sold by flow rate in m³/h in Europe may be searched by GPM in the United States. A cable may need UL references for North America and CE or IEC references for Europe."] = "La traduction seule gagne rarement des positions sur un nouveau marché. Les acheteurs cherchent avec les termes, normes et unités locales. Une pompe vendue en m³/h en Europe peut être cherchée en GPM aux États-Unis. Un câble peut nécessiter des références UL en Amérique du Nord et CE ou IEC en Europe.";
  fr["Before you translate, list the ten product pages that matter most in each market, and check which terms, units and certifications buyers there use. Then write — or adapt — those pages first. Smaller, better pages in a market beat a full but weak copy of the English site."] = "Avant de traduire, listez les dix pages produit les plus importantes de chaque marché et vérifiez les termes, unités et certifications utilisés localement. Rédigez ou adaptez ensuite ces pages en priorité. Des pages moins nombreuses mais meilleures valent mieux qu’une copie complète et faible du site anglais.";
  fr["Local units and standards on every specification table."] = "Les unités et normes locales dans chaque tableau de spécifications.";
  fr["Market-specific certifications and documents linked from the product page."] = "Les certifications et documents propres au marché, liés depuis la page produit.";
  fr["Contact options that suit the market: business hours, languages and response times."] = "Des options de contact adaptées au marché : horaires, langues et délais de réponse.";
  fr["Language-ready site structure, translated RFQ forms and fast hosting for buyers abroad."] = "Une structure prête pour plusieurs langues, des formulaires traduits et un hébergement rapide pour les acheteurs étrangers.";
  fr["Market selection, keyword research per language, hreflang and Search Console reporting by country."] = "Choix des marchés, recherche de mots-clés par langue, hreflang et reporting Search Console par pays.";
  fr["Campaigns per country and language once the pages exist, measured by RFQs."] = "Des campagnes par pays et par langue une fois les pages prêtes, mesurées en demandes.";
  fr["LinkedIn content in English that supports the markets you chose."] = "Du contenu LinkedIn en anglais qui soutient les marchés choisis.";
  fr["What is international SEO?"] = "Qu’est-ce que le SEO international ?";
  fr["It is the work of making a website findable in search engines in more than one country or language: choosing a URL structure, writing each language version, connecting them with hreflang and measuring results by market."] = "C’est le travail qui rend un site trouvable dans les moteurs pour plusieurs pays ou langues : choisir une structure d’URL, rédiger chaque version, les relier par hreflang et mesurer les résultats par marché.";
  fr["Do we need a separate website for every country?"] = "Faut-il un site séparé par pays ?";
  fr["Usually not. Google documents several options; for most manufacturers, one domain with language subdirectories is the easiest to maintain."] = "En général non. Google documente plusieurs options ; pour la plupart des industriels, un domaine avec sous-répertoires de langue est le plus simple à maintenir.";
  fr["Is machine translation good enough?"] = "La traduction automatique suffit-elle ?";
  fr["Rarely for product pages. It often gets technical terms and units wrong and misses the words buyers search for. Translate from a well-written English version and have key pages reviewed."] = "Rarement pour des pages produit. Elle se trompe souvent sur les termes techniques et les unités, et manque les mots recherchés. Traduisez depuis une version anglaise bien écrite et faites relire les pages clés.";
  fr["What happens if hreflang is wrong?"] = "Que se passe-t-il si le hreflang est erroné ?";
  fr["Google may ignore it. Each version must list itself and the others, and the links must go both ways."] = "Google peut l’ignorer. Chaque version doit se lister et lister les autres, et les liens doivent être réciproques.";
  fr["Should we redirect visitors by IP address?"] = "Faut-il rediriger les visiteurs par IP ?";
  fr["It is better to let visitors choose. Automatic redirects can stop buyers and search engines from reaching the version they need."] = "Il vaut mieux laisser choisir. Les redirections automatiques peuvent empêcher acheteurs et moteurs d’atteindre la version voulue.";
  fr["Does hosting in China hurt international SEO?"] = "Héberger en Chine nuit-il au SEO international ?";
  fr["It can make pages slow for buyers abroad. Many exporters host the export site outside mainland China for speed."] = "Cela peut ralentir les pages pour les acheteurs étrangers. Beaucoup d’exportateurs hébergent le site export hors de Chine continentale pour la vitesse.";
  fr["Which language should we start with?"] = "Par quelle langue commencer ?";
  fr["English, for most exporters, because it covers many markets. Add other languages where you have buyers and staff who can reply."] = "L’anglais, pour la plupart des exportateurs, car il couvre de nombreux marchés. Ajoutez d’autres langues là où vous avez des acheteurs et du personnel pour répondre.";
  fr["How do we know it is working?"] = "Comment savoir si cela fonctionne ?";
  fr["Search Console shows impressions and clicks by country and page; analytics shows inquiries by market. Look at both."] = "Search Console montre impressions et clics par pays et par page ; l’outil d’analyse montre les demandes par marché. Regardez les deux.";
  fr["Can Hurfi do this for us?"] = "Hurfi peut-il s’en charger ?";
  fr["Yes. Our SEO and website development services cover structure, content, hreflang and measurement for exporters."] = "Oui. Nos services SEO et développement web couvrent structure, contenu, hreflang et mesure pour les exportateurs.";
  fr["Managing multi-regional and multilingual sites"] = "Gérer des sites multirégionaux et multilingues";
  fr["Tell Google about localized versions of your page"] = "Informer Google des versions localisées de votre page";
  fr["Get started with Search Console"] = "Débuter avec Search Console";
  fr["Learn about sitemaps"] = "En savoir plus sur les sitemaps";
  fr["Diagram of the steps covered in this guide: 1. Choose markets; 2. Pick URL structure; 3. Write for each language; 4. Add hreflang; 5. Check technical basics; 6. Measure in Search Console."] = "Schéma des étapes : 1. Choisir les marchés ; 2. Choisir la structure d’URL ; 3. Rédiger par langue ; 4. Ajouter hreflang ; 5. Vérifier les bases techniques ; 6. Mesurer dans Search Console.";
  fr["Hurfi social post “Expanding without research could be risky!”: a blue balloon floating between cactus plants"] = "Publication Hurfi : « S’étendre sans étude peut être risqué ! » : un ballon bleu flottant entre des cactus.";
  fr["Hurfi social post “Global buyers search before they buy”: they look for trusted manufacturers, reliable suppliers and verified capabilities"] = "Publication Hurfi : « Les acheteurs mondiaux cherchent avant d’acheter » : ils cherchent des fabricants de confiance, des fournisseurs fiables et des capacités vérifiées.";
  fr["How to Choose an Export Marketing Agency | Hurfi"] = "Comment choisir une agence de marketing export | Hurfi";
  fr["Choosing an agency to help you sell abroad is a significant decision for a factory. A good agency will make your company easier to find and easier to trust. A poor one can waste a year and leave you with accounts you do not own. These are the questions we would ask, including of ourselves."] = "Choisir une agence pour vendre à l’étranger est une décision importante pour une usine. Une bonne agence rend votre entreprise plus facile à trouver et à croire. Une mauvaise peut faire perdre un an et vous laisser des comptes qui ne vous appartiennent pas. Voici les questions que nous poserions, y compris à nous-mêmes.";
  fr["Start with the outcome you want"] = "Partez du résultat visé";
  fr["Be wary of guarantees"] = "Méfiez-vous des garanties";
  fr["Make sure you own everything"] = "Assurez-vous de tout posséder";
  fr["Ask how content gets written"] = "Demandez comment le contenu est rédigé";
  fr["Agree what will be reported"] = "Convenez de ce qui sera rapporté";
  fr["Start with a defined first scope"] = "Commencez par un premier périmètre défini";
  fr["Questions to ask before you sign"] = "Questions à poser avant de signer";
  fr["Red flags in proposals"] = "Les signaux d’alerte dans les propositions";
  fr["How to compare two shortlisted agencies"] = "Comment comparer deux agences finalistes";
  fr["Before speaking to agencies, write down what success looks like in a year: more qualified RFQs from certain countries, a site that passes buyer checks, or less dependence on one marketplace. An agency should ask you this in the first meeting. If it starts with a package price instead, be careful."] = "Avant de parler aux agences, écrivez à quoi ressemble le succès dans un an : plus de demandes qualifiées depuis certains pays, un site qui passe les vérifications des acheteurs, ou moins de dépendance à une marketplace. Une agence devrait vous poser cette question dès le premier rendez-vous. Si elle commence par un prix de forfait, méfiez-vous.";
  fr["Google’s own advice on"] = "Les recommandations de Google sur";
  fr["hiring an SEO"] = "le recrutement d’un SEO";
  fr["states plainly that no one can guarantee a #1 ranking on Google. An agency that guarantees rankings or a fixed number of leads is either measuring something meaningless or promising something it cannot control."] = "indiquent clairement que personne ne peut garantir la première position sur Google. Une agence qui garantit des classements ou un nombre fixe de prospects mesure soit quelque chose d’insignifiant, soit promet ce qu’elle ne maîtrise pas.";
  fr["A good agency commits to work, process and honest reporting instead."] = "Une bonne agence s’engage sur le travail, la méthode et un reporting honnête.";
  fr["Guaranteed first-page rankings"] = "Des classements en première page garantis";
  fr["Guaranteed lead numbers regardless of product or price"] = "Un nombre de prospects garanti quel que soit le produit ou le prix";
  fr["Large volumes of “backlinks” for a fixed fee"] = "De gros volumes de « backlinks » à prix fixe";
  fr["Reports full of impressions and reach but no inquiries"] = "Des rapports pleins d’impressions et de portée, sans demandes";
  fr["Your domain, website, hosting account, Google Search Console, analytics and ad accounts should be registered to your company, with the agency given access. If you part ways, you keep the history and the assets."] = "Votre domaine, site, hébergement, Search Console, outil d’analyse et comptes publicitaires doivent être enregistrés au nom de votre société, l’agence n’ayant qu’un accès. Si vous vous séparez, l’historique et les actifs restent à vous.";
  fr["Domain registered in your company’s name"] = "Domaine enregistré au nom de la société";
  fr["Search Console and analytics owned by your company account"] = "Search Console et analytics sur le compte de l’entreprise";
  fr["Ad accounts in your name, with your payment method"] = "Comptes publicitaires à votre nom, avec votre moyen de paiement";
  fr["Source files and content delivered to you"] = "Fichiers sources et contenus livrés";
  fr["For a manufacturer, content quality depends on technical accuracy. Ask who writes product pages, how they learn your products and who approves technical claims. Google’s guidance on"] = "Pour un industriel, la qualité du contenu dépend de l’exactitude technique. Demandez qui rédige les pages produit, comment l’agence apprend vos produits et qui valide les affirmations techniques. Les recommandations de Google sur";
  fr["helpful, people-first content"] = "un contenu utile et centré sur les personnes";
  fr["suggests asking “Who, How, and Why” about each page; an agency should be able to answer those for the content it produces."] = "suggèrent de se poser la question « qui, comment et pourquoi » pour chaque page ; une agence doit pouvoir y répondre pour le contenu qu’elle produit.";
  fr["Mass-produced pages with little original information are a risk, not an asset. Google’s"] = "Des pages produites en masse avec peu d’information originale sont un risque, pas un atout. Les";
  fr["spam policies"] = "règles anti-spam";
  fr["describe practices such as scaled content abuse — many pages generated mainly to manipulate rankings — and link spam."] = "décrivent des pratiques comme l’abus de contenu à grande échelle — de nombreuses pages générées surtout pour manipuler les classements — et le spam de liens.";
  fr["Ask to see a sample report. The useful numbers for an exporter are qualified inquiries by source and market, search impressions and clicks for the products you care about, and the cost per qualified inquiry for paid campaigns."] = "Demandez un exemple de rapport. Les chiffres utiles pour un exportateur sont les demandes qualifiées par source et par marché, les impressions et clics des produits qui comptent, et le coût par demande qualifiée pour les campagnes payantes.";
  fr["Agree a monthly report and a quarterly review where the plan can change."] = "Convenez d’un rapport mensuel et d’une revue trimestrielle où le plan peut évoluer.";
  fr["A sensible first project is small enough to judge: fixing the main product pages, building an RFQ path, or setting up search tracking. You will learn more about an agency from three months of real work than from any proposal."] = "Un premier projet raisonnable est assez petit pour être jugé : corriger les pages produit principales, construire un parcours de demande, ou mettre en place le suivi de recherche. Trois mois de travail réel vous apprendront plus qu’une proposition.";
  fr["A short list of direct questions tells you more than a long sales deck. Ask every agency the same questions and compare the answers in writing."] = "Une courte liste de questions directes en dit plus qu’une longue présentation commerciale. Posez les mêmes questions à chaque agence et comparez les réponses par écrit.";
  fr["Who will do the work each month, and in which language do they write?"] = "Qui fera le travail chaque mois, et dans quelle langue écrit-il ?";
  fr["Which of these tasks are done by people, and which by software or AI tools?"] = "Lesquelles de ces tâches sont faites par des humains, lesquelles par des logiciels ou des outils d’IA ?";
  fr["What will you need from our engineers and sales team, and how much of their time?"] = "De quoi aurez-vous besoin de nos ingénieurs et de notre équipe commerciale, et pour combien de temps ?";
  fr["Which reports will we get, and can we see an example from a similar engagement?"] = "Quels rapports recevrons-nous, et peut-on voir un exemple d’une mission similaire ?";
  fr["What happens to the website, domains, ad accounts and content if we stop working together?"] = "Que deviennent le site, les domaines, les comptes publicitaires et les contenus si nous arrêtons ?";
  fr["How will you handle technical claims, certifications and safety statements?"] = "Comment traiterez-vous les affirmations techniques, les certifications et les mentions de sécurité ?";
  fr["Some warning signs come up again and again. Google’s spam policies describe link schemes and scaled content abuse — producing many pages mainly to manipulate rankings — as practices that can lead to lower rankings or removal from results. If a proposal promises hundreds of backlinks or “500 AI-written pages a month”, treat that as a risk, not a bonus."] = "Certains signaux reviennent sans cesse. Les règles anti-spam de Google décrivent les schémas de liens et l’abus de contenu à grande échelle — produire de nombreuses pages surtout pour manipuler les classements — comme des pratiques pouvant entraîner une baisse de classement ou une exclusion des résultats. Si une proposition promet des centaines de backlinks ou « 500 pages écrites par IA par mois », considérez cela comme un risque, pas un bonus.";
  fr["Be cautious too of proposals that report only rankings for long lists of keywords nobody searches for, or traffic without inquiries. For a manufacturer, the useful numbers are qualified inquiries, RFQs and, eventually, orders."] = "Méfiez-vous aussi des propositions qui ne rapportent que des classements sur de longues listes de mots-clés que personne ne cherche, ou du trafic sans demandes. Pour un industriel, les chiffres utiles sont les demandes qualifiées, les devis et, à terme, les commandes.";
  fr["Guaranteed first-page rankings or a fixed number of leads."] = "Des classements garantis en première page ou un nombre fixe de prospects.";
  fr["Bulk link building or “private networks”."] = "L’achat massif de liens ou les « réseaux privés ».";
  fr["Ownership of your domain or ad account held by the agency."] = "La propriété de votre domaine ou compte publicitaire chez l’agence.";
  fr["No access to the analytics and Search Console data."] = "Aucun accès aux données analytics et Search Console.";
  fr["When two agencies look similar, give each the same small paid task: for example, rewrite one key product page, or audit your top ten pages. Compare the quality of the work, how many questions they asked about your product, and how they handled technical details."] = "Quand deux agences se ressemblent, confiez à chacune la même petite mission payante : par exemple réécrire une page produit clé ou auditer vos dix pages principales. Comparez la qualité du travail, le nombre de questions posées sur votre produit et la façon de traiter les détails techniques.";
  fr["An agency that asks for datasheets, test reports and examples of real buyer questions is usually one that will write pages buyers trust. An agency that delivers quickly without asking anything has probably written something generic."] = "Une agence qui demande des fiches techniques, des rapports d’essai et des exemples de vraies questions d’acheteurs écrira généralement des pages fiables. Une agence qui livre vite sans rien demander a probablement produit du générique.";
  fr["Sites built in your own hosting and domain, with source files handed over."] = "Des sites construits sur votre hébergement et votre domaine, avec remise des fichiers sources.";
  fr["SEO reported from your own Search Console, with no ranking guarantees."] = "Un SEO rapporté depuis votre propre Search Console, sans garantie de classement.";
  fr["Ad accounts in your company name, reported by cost per qualified inquiry."] = "Des comptes publicitaires au nom de la société, rapportés en coût par demande qualifiée.";
  fr["LinkedIn pages owned by your company, with the agency as an admin."] = "Des pages LinkedIn détenues par votre société, l’agence en administrateur.";
  fr["Can any agency guarantee Google rankings?"] = "Une agence peut-elle garantir des classements Google ?";
  fr["No. Google states that no one can guarantee a #1 ranking on Google. Treat guarantees as a warning sign."] = "Non. Google indique que personne ne peut garantir la première position. Considérez les garanties comme un signal d’alerte.";
  fr["Who should own our website and accounts?"] = "À qui doivent appartenir le site et les comptes ?";
  fr["Your company. The agency should have access, not ownership, so you keep everything if you change agency."] = "À votre société. L’agence doit avoir un accès, pas la propriété, pour que tout reste à vous en cas de changement.";
  fr["What should an agency report each month?"] = "Que doit rapporter une agence chaque mois ?";
  fr["Qualified inquiries by source and market, search impressions and clicks for priority products, and spend and cost per inquiry for paid campaigns."] = "Les demandes qualifiées par source et marché, impressions et clics des produits prioritaires, et dépenses et coût par demande pour les campagnes.";
  fr["Is it a problem if an agency builds hundreds of pages quickly?"] = "Est-ce un problème si une agence crée des centaines de pages rapidement ?";
  fr["It can be. Pages with little original value can fall under Google’s spam policies on scaled content. Fewer, better pages are usually safer."] = "Cela peut l’être. Des pages à faible valeur originale peuvent relever des règles anti-spam sur le contenu à grande échelle. Moins de pages, mais meilleures, est généralement plus sûr.";
  fr["Should the agency understand our industry?"] = "L’agence doit-elle connaître notre secteur ?";
  fr["It should be willing to learn it and to work with your engineers. Ask how they will learn your products and who approves technical claims."] = "Elle doit être prête à l’apprendre et à travailler avec vos ingénieurs. Demandez comment elle apprendra vos produits et qui valide les affirmations techniques.";
  fr["How long should the first contract be?"] = "Quelle durée pour le premier contrat ?";
  fr["Long enough to do real work, short enough to judge. A defined first scope over a few months is reasonable."] = "Assez long pour faire un vrai travail, assez court pour juger. Un premier périmètre défini sur quelques mois est raisonnable.";
  fr["Should we choose a Chinese agency or a foreign one?"] = "Faut-il choisir une agence chinoise ou étrangère ?";
  fr["Choose the one that can write naturally for your buyers and communicate well with your team. Ask to see English content they have written."] = "Choisissez celle qui écrit naturellement pour vos acheteurs et communique bien avec votre équipe. Demandez à voir du contenu anglais qu’elle a rédigé.";
  fr["What are signs of a good agency?"] = "Quels sont les signes d’une bonne agence ?";
  fr["They ask about your goals, admit what they cannot promise, put accounts in your name and show you real reporting."] = "Elle s’enquiert de vos objectifs, admet ce qu’elle ne peut promettre, met les comptes à votre nom et montre un reporting réel.";
  fr["How does Hurfi work?"] = "Comment travaillons-nous chez Hurfi ?";
  fr["We start with a free consultation, agree a scope, keep accounts in your name and report from them every month. We do not guarantee rankings or lead numbers."] = "Nous commençons par une consultation gratuite, convenons d’un périmètre, laissons les comptes à votre nom et rapportons depuis eux chaque mois. Nous ne garantissons ni classements ni volumes de prospects.";
  fr["Do you need an SEO?"] = "Faut-il un SEO ?";
  fr["Spam policies for Google web search"] = "Règles anti-spam pour la recherche Google";
  fr["Diagram of the steps covered in this guide: 1. Define the goal; 2. Check guarantees; 3. Confirm ownership; 4. Review content process; 5. Agree reporting; 6. Start small."] = "Schéma des étapes : 1. Définir l’objectif ; 2. Vérifier les garanties ; 3. Confirmer la propriété ; 4. Examiner la production de contenu ; 5. Convenir du reporting ; 6. Commencer petit.";
  fr["Hurfi social post for local manufacturers: “Everything is under Ctrl”, with a keyboard Ctrl key"] = "Publication Hurfi pour les industriels locaux : « Tout est sous Ctrl », avec une touche Ctrl de clavier.";
  fr["Hurfi social post “The digital growth system every factory needs”: two hands holding a phone showing visibility and growth"] = "Publication Hurfi : « Le système de croissance digitale dont chaque usine a besoin » : deux mains tenant un téléphone montrant visibilité et croissance.";
  fr["Hurfi social post “According to our calculations…” with a calculator display reading “You deserve a better growth”"] = "Publication Hurfi : « Selon nos calculs… » avec un écran de calculatrice affichant « Vous méritez une meilleure croissance ».";
  fr["Market Pages for ASEAN, Middle East & Africa Buyers | Hurfi"] = "Pages marché pour les acheteurs d’ASEAN, du Moyen-Orient et d’Afrique | Hurfi";
  fr["Many Chinese manufacturers now sell more to ASEAN, the Middle East and Africa than before. Buyers in these regions search and compare suppliers online too, but they have their own questions. This guide explains how to build market pages that answer them — and how to avoid pages that only exist for search engines."] = "Beaucoup d’industriels chinois vendent désormais davantage à l’ASEAN, au Moyen-Orient et en Afrique. Les acheteurs de ces régions comparent aussi les fournisseurs en ligne, mais ils ont leurs propres questions. Ce guide explique comment construire des pages marché qui y répondent — et comment éviter les pages qui n’existent que pour les moteurs.";
  fr["Why these regions matter now"] = "Pourquoi ces régions comptent aujourd’hui";
  fr["What buyers in these markets ask"] = "Ce que demandent les acheteurs de ces marchés";
  fr["What a good market page contains"] = "Ce que contient une bonne page marché";
  fr["What to avoid: doorway pages"] = "Ce qu’il faut éviter : les pages passerelles";
  fr["Languages: English first, then where it helps"] = "Langues : l’anglais d’abord, puis là où c’est utile";
  fr["URLs and hreflang"] = "URL et hreflang";
  fr["Proof that travels"] = "Des preuves qui voyagent";
  fr["Connect the market page to the rest of the site"] = "Relier la page marché au reste du site";
  fr["An outline for one market page"] = "Une structure pour une page marché";
  fr["Measure by market"] = "Mesurer par marché";
  fr["Several 2025 bulletins show growth in these markets. Nantong’s exports to ASEAN rose 20.9% and to Africa 15.8%. Hunan’s exports to ASEAN rose 5.5% while its exports to the United States fell 29.2%. Weifang made 62% of its trade with Belt and Road countries, and Hubei 54.9%."] = "Plusieurs bulletins de 2025 montrent la croissance de ces marchés. Les exportations de Nantong vers l’ASEAN ont augmenté de 20,9 % et vers l’Afrique de 15,8 %. Celles du Hunan vers l’ASEAN ont progressé de 5,5 % tandis que ses exportations vers les États-Unis reculaient de 29,2 %. Weifang a réalisé 62 % de son commerce avec les pays des Nouvelles routes de la soie, et le Hubei 54,9 %.";
  fr["Questions vary by country and product, but some come up again and again:"] = "Les questions varient selon le pays et le produit, mais certaines reviennent :";
  fr["Can you deliver to my port or city, and on what terms?"] = "Pouvez-vous livrer à mon port ou dans ma ville, et à quelles conditions ?";
  fr["Do you have distributors, service partners or spare parts nearby?"] = "Avez-vous des distributeurs, partenaires de service ou pièces de rechange à proximité ?";
  fr["Which certifications or registrations does my country require, and do you hold them?"] = "Quelles certifications ou enregistrements mon pays exige-t-il, et les détenez-vous ?";
  fr["Can you supply in smaller quantities to start?"] = "Pouvez-vous livrer de plus petites quantités pour commencer ?";
  fr["Can I talk to someone in my language or time zone?"] = "Puis-je parler à quelqu’un dans ma langue ou mon fuseau horaire ?";
  fr["The products you actually sell in that market, with links to their pages."] = "Les produits que vous vendez réellement sur ce marché, avec des liens vers leurs pages.";
  fr["Standards, certificates and registrations that apply there — only those you hold."] = "Les normes, certificats et enregistrements applicables — uniquement ceux que vous détenez.";
  fr["Delivery terms, ports and typical transit times."] = "Conditions de livraison, ports et délais de transit habituels.";
  fr["Service, spare parts and support arrangements."] = "Service, pièces de rechange et support.";
  fr["References or projects in the region you are allowed to show."] = "Des références ou projets dans la région que vous êtes autorisé à montrer.";
  fr["Who answers inquiries, in which languages and hours."] = "Qui répond aux demandes, dans quelles langues et à quelles heures.";
  fr["describe doorway abuse: pages created to rank for similar searches that lead users to less useful intermediate pages, including pages targeted at specific regions or cities that funnel users to one page. A page for every country with the same text and a new name is exactly that. One strong page for a market you serve is worth more than fifty thin ones."] = "décrivent l’abus de pages passerelles : des pages créées pour se classer sur des recherches similaires et mener vers des pages intermédiaires peu utiles, y compris des pages ciblant des régions ou villes précises pour renvoyer vers une seule page. Une page par pays avec le même texte et un nom différent en relève exactement. Une page solide pour un marché que vous servez vaut plus que cinquante pages creuses.";
  fr["English works for many B2B buyers in these regions, but Arabic, French, Spanish, Portuguese, Vietnamese, Thai or Indonesian pages can help where buyers prefer them. Translate only what you can support: if a buyer writes in Arabic, someone must be able to answer."] = "L’anglais convient à beaucoup d’acheteurs B2B de ces régions, mais des pages en arabe, français, espagnol, portugais, vietnamien, thaï ou indonésien aident là où les acheteurs les préfèrent. Ne traduisez que ce que vous pouvez assumer : si un acheteur écrit en arabe, quelqu’un doit pouvoir répondre.";
  fr["multi-regional and multilingual sites"] = "sites multirégionaux et multilingues";
  fr["compares country domains, subdomains and subdirectories. For most manufacturers, subdirectories such as /ar/ or /fr/ on one domain are simplest to manage."] = "compare domaines pays, sous-domaines et sous-répertoires. Pour la plupart des industriels, des sous-répertoires comme /ar/ ou /fr/ sur un seul domaine sont les plus simples.";
  fr["When you have language or regional versions, Google recommends using hreflang to"] = "Lorsque vous avez des versions linguistiques ou régionales, Google recommande d’utiliser hreflang pour";
  fr["tell it about localized versions"] = "l’informer des versions localisées";
  fr["of a page, with an x-default for unmatched languages."] = "d’une page, avec un x-default pour les langues non couvertes.";
  fr["Buyers far away need more proof, not less. Show real factory photos, testing, packing and loading; dated references in the region; and certificates with scope and validity. Avoid stock photos and claims you cannot support."] = "Les acheteurs lointains ont besoin de plus de preuves, pas de moins. Montrez de vraies photos d’usine, les essais, l’emballage et le chargement ; des références datées dans la région ; et des certificats avec périmètre et validité. Évitez les photos de banque d’images et les affirmations non étayées.";
  fr["Link from the market page to each relevant product page, and back."] = "Reliez la page marché à chaque page produit pertinente, et inversement.";
  fr["Link to your certifications and shipping pages."] = "Renvoie vers vos pages certifications et expédition.";
  fr["Put a short, clear RFQ form on the page, with the questions buyers in that market usually answer."] = "Placez sur la page un formulaire de demande court et clair, avec les questions auxquelles les acheteurs de ce marché répondent habituellement.";
  fr["Add the page to your XML sitemap."] = "Ajoutez la page à votre sitemap XML.";
  fr["Heading: your product type and the market, written for buyers, not keywords."] = "Titre : votre type de produit et le marché, écrit pour les acheteurs, pas pour les mots-clés.";
  fr["Two or three sentences on what you supply there and to whom."] = "Deux ou trois phrases sur ce que vous fournissez là-bas et à qui.";
  fr["Products sold in the market, linked."] = "Les produits vendus sur le marché, avec liens.";
  fr["Rules and certificates that apply, linked to your certifications page."] = "Les règles et certificats applicables, liés à votre page certifications.";
  fr["Delivery terms and ports, linked to your shipping page."] = "Conditions de livraison et ports, liés à votre page expédition.";
  fr["References and photos from the region."] = "Des références et photos de la région.";
  fr["Contact and RFQ form."] = "Contact et formulaire de demande.";
  fr["Track inquiries, sample requests and orders by country. Search Console shows queries and clicks by country. After a few months, keep improving the markets that respond and rethink the ones that do not."] = "Suivez demandes, échantillons et commandes par pays. Search Console montre requêtes et clics par pays. Après quelques mois, renforcez les marchés qui répondent et réexaminez les autres.";
  fr["Market pages with products, certifications, terms and references for each region."] = "Des pages marché avec produits, certifications, conditions et références par région.";
  fr["Language versions with hreflang and country reporting in Search Console."] = "Des versions linguistiques avec hreflang et un reporting par pays dans Search Console.";
  fr["Campaigns tested in chosen countries, tracked to RFQs."] = "Des campagnes testées dans les pays choisis, suivies jusqu’aux demandes.";
  fr["Social content for platforms used in each target market."] = "Du contenu social pour les plateformes utilisées dans chaque marché cible.";
  fr["Should we build a page for every country?"] = "Faut-il une page pour chaque pays ?";
  fr["No. Build strong pages for the markets you really serve. Thin, repeated country pages can count as doorway abuse under Google’s spam policies."] = "Non. Construisez des pages solides pour les marchés que vous servez vraiment. Des pages pays creuses et répétitives peuvent relever de l’abus de pages passerelles.";
  fr["Is English enough for the Middle East and Africa?"] = "L’anglais suffit-il pour le Moyen-Orient et l’Afrique ?";
  fr["Often for B2B, but Arabic or French pages can help in some markets — if you can answer inquiries in those languages."] = "Souvent en B2B, mais des pages en arabe ou en français aident sur certains marchés — si vous pouvez répondre dans ces langues.";
  fr["What is hreflang?"] = "Qu’est-ce que hreflang ?";
  fr["An annotation that tells Google which pages are language or regional versions of each other, so it can show the right one."] = "Une annotation qui indique à Google quelles pages sont des versions linguistiques ou régionales les unes des autres, pour afficher la bonne.";
  fr["Do we need local certifications?"] = "Faut-il des certifications locales ?";
  fr["Many markets have their own rules. Check with the authority in each market and list only certificates you hold."] = "De nombreux marchés ont leurs propres règles. Vérifiez auprès de l’autorité de chaque marché et ne listez que les certificats détenus.";
  fr["Should we show prices for these markets?"] = "Faut-il afficher des prix pour ces marchés ?";
  fr["Usually not exact prices, but MOQs, terms and lead times help buyers decide."] = "En général pas de prix exacts, mais quantité minimale, conditions et délais aident à décider.";
  fr["Can Hurfi translate our pages?"] = "Hurfi peut-il traduire nos pages ?";
  fr["We plan and build language versions with proper translation and correct tags, and we review them with you."] = "Nous planifions et construisons les versions linguistiques avec une vraie traduction et des balises correctes, puis les relisons avec vous.";
  fr["Can you guarantee rankings in these markets?"] = "Pouvez-vous garantir des classements sur ces marchés ?";
  fr["No. Nobody can. We report honestly from your own Search Console."] = "Non. Personne. Nous rapportons honnêtement depuis votre Search Console.";
  fr["Nantong Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "Bureau des statistiques de Nantong (texte du bulletin tel que reproduit par tjgb.hongheiku.com).";
  fr["2025年南通市国民经济和社会发展统计公报 (Nantong 2025 Statistical Bulletin)"] = "2025年南通市国民经济和社会发展统计公报 (Bulletin statistique 2025 de Nantong)";
  fr["Hunan Provincial Bureau of Statistics and NBS Hunan Survey Team."] = "Bureau provincial des statistiques du Hunan et équipe d’enquête du Hunan du BNS.";
  fr["湖南省2025年国民经济和社会发展统计公报 (Hunan 2025 Statistical Bulletin, 25 March 2026)"] = "湖南省2025年国民经济和社会发展统计公报 (Bulletin statistique 2025 du Hunan, 25 mars 2026)";
  fr["Weifang Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "Bureau des statistiques de Weifang (texte du bulletin tel que reproduit par tjgb.hongheiku.com).";
  fr["2025年潍坊市国民经济和社会发展统计公报 (Weifang 2025 Statistical Bulletin)"] = "2025年潍坊市国民经济和社会发展统计公报 (Bulletin statistique 2025 de Weifang)";
  fr["Hubei Provincial Bureau of Statistics (bulletin as republished on the Qianjiang government portal; official page tjj.hubei.gov.cn did not load from the box)."] = "Bureau provincial des statistiques du Hubei (bulletin republié sur le portail du gouvernement de Qianjiang ; la page officielle tjj.hubei.gov.cn ne se chargeait pas depuis la machine).";
  fr["湖北省2025年国民经济和社会发展统计公报 (Hubei 2025 Statistical Bulletin)"] = "湖北省2025年国民经济和社会发展统计公报 (Bulletin statistique 2025 du Hubei)";
  fr["Diagram of the steps covered in this guide: 1. Choose the market; 2. List buyer questions; 3. Write real content; 4. Choose language and URL; 5. Add hreflang; 6. Measure inquiries."] = "Schéma des étapes : 1. Choisir le marché ; 2. Lister les questions des acheteurs ; 3. Écrire un vrai contenu ; 4. Choisir langue et URL ; 5. Ajouter hreflang ; 6. Mesurer les demandes.";
  fr["Hurfi social post “The world doesn’t see your factory until you give it a window”: visibility, trust, opportunities"] = "Publication Hurfi : « Le monde ne voit pas votre usine tant que vous ne lui ouvrez pas une fenêtre » : visibilité, confiance, opportunités.";


  // Insight articles: site speed, PDF catalogue, Google Ads, 2026-10-20.
  zh["Export Website Speed: Why It Matters to Overseas Buyers | Hurfi"] = "出口网站速度：为什么海外买家在意 | Hurfi";
  zh["Many Chinese factory websites are fast inside China and slow everywhere else. For an overseas buyer on a phone, a slow product page is often the last page they see. This guide explains what to measure and the fixes that usually help most."] = "很多中国工厂的网站在国内很快，到了国外就慢。对用手机访问的海外买家来说，一个加载慢的产品页，经常是他们看到的最后一页。这份指南讲该测什么，以及通常最有效的改法。";
  zh["Why speed matters for exporters"] = "为什么速度对出口企业重要";
  zh["What Core Web Vitals measure"] = "Core Web Vitals 衡量的是什么";
  zh["Host where your buyers are"] = "把主机放在买家附近";
  zh["Compress and size images"] = "压缩图片并设定正确尺寸";
  zh["Remove what slows pages down"] = "去掉拖慢页面的东西";
  zh["Test, fix, re-test"] = "测速、修复、再测";
  zh["The thresholds to aim for"] = "应该达到的阈值";
  zh["Test from where your buyers are"] = "从买家所在地测速";
  zh["Quick wins for factory websites"] = "工厂网站的快速改进";
  zh["Keep it fast after launch"] = "上线之后也要保持快";
  zh["Buyers abroad reach your site over international connections. If the server is in mainland China or the page loads large images and many scripts, the wait can be long. Google’s guidance on"] = "海外买家是通过国际线路访问你网站的。如果服务器在中国大陆，或者页面加载大图和大量脚本，等待时间就会很长。谷歌关于";
  zh["page experience"] = "页面体验";
  zh["explains that it looks at signals such as Core Web Vitals alongside content relevance."] = "说明：谷歌在内容相关性之外，还会看 Core Web Vitals 这类信号。";
  zh["Web Vitals"] = "Web Vitals";
  zh["defines three core metrics and their “good” thresholds:"] = "定义了三个核心指标及其“良好”阈值：";
  zh["Largest Contentful Paint (loading): 2.5 seconds or less"] = "最大内容绘制（加载）：2.5 秒以内";
  zh["Interaction to Next Paint (responsiveness): 200 milliseconds or less"] = "交互到下次绘制（响应）：200 毫秒以内";
  zh["Cumulative Layout Shift (visual stability): 0.1 or less"] = "累积布局偏移（视觉稳定性）：0.1 以内";
  zh["Measure these from the countries where your buyers are, on mobile as well as desktop."] = "在买家所在的国家测这些指标，手机和桌面都要测。";
  zh["For an export site, hosting outside mainland China, or using a content delivery network with servers near your markets, usually makes the biggest difference. Keep a separate Chinese site in China if you need one for domestic buyers."] = "对出口站来说，把主机放在中国大陆以外，或者使用在市场附近有节点的 CDN，通常效果最明显。如果国内买家需要，可以另做一个放在中国境内的中文站。";
  zh["Use modern formats such as WebP"] = "使用 WebP 这类现代格式";
  zh["Resize images to the size they are displayed"] = "把图片缩放到实际显示尺寸";
  zh["Set width and height so the layout does not jump"] = "写明宽高，避免布局跳动";
  zh["Lazy-load images below the first screen"] = "首屏以下的图片延迟加载";
  zh["Replace heavy sliders with one clear image"] = "用一张清晰的图片替代笨重的轮播";
  zh["Chat widgets, tracking scripts, web fonts and video embeds add weight. Keep the ones you use and remove the rest. Scripts or fonts served from services that are slow or blocked in some regions can delay the whole page."] = "聊天插件、跟踪脚本、网页字体和视频嵌入都会增加负担。保留真正在用的，其余删掉。来自某些地区很慢或被屏蔽的服务的脚本或字体，会拖慢整个页面。";
  zh["Use Lighthouse or PageSpeed tools on your key product pages, fix the largest problems first and test again. Check Search Console’s Core Web Vitals report over time for real-user data."] = "对重点产品页用 Lighthouse 或 PageSpeed 工具，先解决最大的问题，然后重新测试。定期查看 Search Console 的 Core Web Vitals 报告，了解真实用户数据。";
  zh["web.dev gives clear targets for Core Web Vitals: Largest Contentful Paint (LCP) within 2.5 seconds, Interaction to Next Paint (INP) of 200 milliseconds or less, and Cumulative Layout Shift (CLS) of 0.1 or less."] = "web.dev 给出了明确的 Core Web Vitals 目标：最大内容绘制（LCP）在 2.5 秒以内，交互到下次绘制（INP）在 200 毫秒以内，累积布局偏移（CLS）在 0.1 以内。";
  zh["It also recommends measuring at the 75th percentile of page loads, separately for mobile and desktop. In practice this means most of your real visitors should get a good experience — not just you, testing from the office on a fast connection."] = "它还建议按页面加载的第 75 百分位来测，手机和桌面分开。实际含义是：大多数真实访客都应有良好体验，而不只是你在办公室用快网测得好看。";
  zh["A site that loads quickly in Shenzhen may be slow in Frankfurt or São Paulo, because of where it is hosted and how assets are delivered. Test key pages from the regions you sell to, using tools that let you choose a test location, and on mobile as well as desktop."] = "在深圳打开很快的网站，在法兰克福或圣保罗可能很慢，这取决于主机位置和资源分发方式。用可以选择测试地点的工具，从你销售的地区测重点页面，手机和桌面都要测。";
  zh["Chrome Lighthouse, which Google mentions as a tool for page-experience improvements, is useful for finding problems on a single page. Real-user data, when available, shows what visitors actually experience over time."] = "谷歌在讲页面体验改进时提到的 Chrome Lighthouse，适合查找单个页面的问题。真实用户数据（如果有）则反映访客长期的实际体验。";
  zh["Test your home page, a top product page and the RFQ page."] = "测首页、一个重点产品页和询价页面。";
  zh["Test from at least two target regions, on mobile and desktop."] = "至少从两个目标地区测，手机和桌面都测。";
  zh["Record results before and after each change, so you know what helped."] = "记录每次改动前后的结果，才知道是什么起了作用。";
  zh["Convert large JPEG and PNG product photos to WebP or AVIF, sized to how they are displayed."] = "把大的 JPEG、PNG 产品照片转成 WebP 或 AVIF，并缩放到实际显示尺寸。";
  zh["Set width and height on images so the layout does not jump as they load."] = "给图片写明宽高，避免加载过程中布局跳动。";
  zh["Lazy-load images below the first screen; do not lazy-load the main image."] = "首屏以下的图片延迟加载；主图不要延迟加载。";
  zh["Remove unused plugins, sliders, chat widgets and tracking scripts."] = "删掉不用的插件、轮播、聊天插件和跟踪脚本。";
  zh["Replace auto-playing background videos with a still image and an optional play button."] = "用一张静态图片加可选播放按钮，替换自动播放的背景视频。";
  zh["Use a CDN with locations near your buyers for images, CSS and JavaScript."] = "用在你买家附近有节点的 CDN 分发图片、CSS 和 JavaScript。";
  zh["Speed tends to slip over time as new images, plugins and tracking scripts are added. Set a simple rule: every new page is checked before it is published, and the key pages are re-tested every quarter from your main buyer regions."] = "随着新图片、插件和跟踪脚本不断增加，速度往往会慢慢变差。定一条简单的规则：每个新页面发布前都测一遍，重点页面每季度从主要买家地区重测一次。";
  zh["Write down a few limits your team can follow — for example, a maximum image width and file size, no auto-playing video, and no new third-party script without a reason. Small rules like these keep a fast site fast."] = "写下几条团队能遵守的限制——比如图片最大宽度和文件大小、不使用自动播放视频、没有理由不加新的第三方脚本。这类小规则能让快的网站一直快下去。";
  zh["Hosting advice, WebP images, lean templates and before-and-after speed tests."] = "主机建议、WebP 图片、精简模板，以及改动前后的速度测试。";
  zh["Core Web Vitals monitoring in Search Console as part of SEO work."] = "把 Search Console 里的 Core Web Vitals 监测纳入 SEO 工作。";
  zh["Fast landing pages so ad spend is not lost to slow loading."] = "快速落地页，避免广告预算浪费在加载缓慢上。";
  zh["Lightweight embeds so social content does not slow pages."] = "轻量的嵌入方式，让社媒内容不拖慢页面。";
  zh["Does website speed affect Google rankings?"] = "网站速度影响谷歌排名吗？";
  zh["Google uses page experience signals, including Core Web Vitals, alongside relevance. Speed alone will not rank a page, but slow pages lose buyers."] = "谷歌在相关性之外，也使用包括 Core Web Vitals 在内的页面体验信号。光靠速度快不能让页面排名，但慢页面会丢掉买家。";
  zh["What are good Core Web Vitals values?"] = "Core Web Vitals 什么数值算好？";
  zh["web.dev gives LCP of 2.5 seconds or less, INP of 200 milliseconds or less and CLS of 0.1 or less as good."] = "web.dev 认为 LCP 在 2.5 秒以内、INP 在 200 毫秒以内、CLS 在 0.1 以内即为良好。";
  zh["Our site is fast in China. Why is it slow abroad?"] = "我们网站在国内很快，为什么国外慢？";
  zh["Often because of server location, international connections, or scripts and fonts that load slowly outside China. Test from your target countries."] = "通常是因为服务器位置、国际线路，或者在中国境外加载很慢的脚本和字体。从目标国家测一测就知道了。";
  zh["Should we host our export site outside China?"] = "出口站应该放在中国境外吗？";
  zh["For most exporters, yes, or use a CDN with servers near your markets."] = "对多数出口企业来说，是的；或者使用在市场附近有节点的 CDN。";
  zh["What is the quickest fix?"] = "最快的改法是什么？";
  zh["Usually images: compress them, convert to WebP and size them correctly."] = "通常是图片：压缩、转成 WebP、设对尺寸。";
  zh["Do chat widgets slow sites down?"] = "聊天插件会拖慢网站吗？";
  zh["They can. Keep only the tools you actually use."] = "会。只保留真正在用的。";
  zh["How do we measure real-user speed?"] = "怎么衡量真实用户的速度？";
  zh["Search Console’s Core Web Vitals report shows field data when enough visits are recorded."] = "当访问量足够时，Search Console 的 Core Web Vitals 报告会显示实测数据。";
  zh["Does speed matter for B2B buyers?"] = "速度对 B2B 买家重要吗？";
  zh["Yes. Buyers often research on phones and between meetings, and they have many other suppliers to check."] = "重要。买家常用手机、在会议间隙查找，而且还有一堆其他供应商要看。";
  zh["Can Hurfi fix our site speed?"] = "Hurfi 能改善我们的网站速度吗？";
  zh["Yes. Our website development work includes hosting advice, image optimisation and script clean-up, with before-and-after measurements."] = "可以。我们的网站开发工作包括主机建议、图片优化和脚本清理，并给出改动前后的对比测量。";
  zh["web.dev (Google)."] = "web.dev（谷歌）。";
  zh["Understanding page experience in Google Search results"] = "了解谷歌搜索结果中的页面体验";
  zh["Diagram of the steps covered in this guide: 1. Measure from abroad; 2. Check Core Web Vitals; 3. Fix hosting; 4. Compress images; 5. Trim scripts; 6. Re-test."] = "本指南步骤示意图：1. 从境外测速；2. 检查 Core Web Vitals；3. 调整主机；4. 压缩图片；5. 精简脚本；6. 重新测试。";
  zh["Hurfi social post “The missing piece? A strong digital presence”, listing production capacity, quality products and years of experience"] = "Hurfi 社媒内容：“缺的那一块？一个有力的数字形象”，画面列出产能、优质产品和多年经验。";
  zh["Hurfi social post “Great products need a digital identity”, with a factory model on a gloved hand"] = "Hurfi 社媒内容：“好产品需要一个数字身份”，画面是一只戴手套的手托着工厂模型。";
  zh["Turn Your PDF Catalogue into Product Pages | Hurfi"] = "把 PDF 目录变成产品页面 | Hurfi";
  zh["Many factories put their whole range in one big PDF catalogue and link to it from the website. Buyers then have to download it, scroll and guess. Search engines can read PDFs, but a catalogue is no substitute for product pages. This guide explains how to turn a catalogue into pages buyers can find and compare."] = "很多工厂把全部产品做成一份大 PDF 目录，在网站上挂个链接。买家得下载、翻页、猜。搜索引擎确实能读 PDF，但目录替代不了产品页。这份指南讲怎么把目录变成买家能找到、能比较的页面。";
  zh["Can Google read PDFs?"] = "谷歌能读 PDF 吗？";
  zh["Why product pages work better"] = "为什么产品页效果更好";
  zh["Audit the catalogue first"] = "先盘点目录";
  zh["Group into families, not hundreds of thin pages"] = "按系列归组，而不是做几百个空页面";
  zh["Build one good template"] = "做一个好模板";
  zh["Keep PDFs as downloads"] = "PDF 保留为下载";
  zh["Write titles that match the product"] = "标题要贴合产品";
  zh["Describe products for search"] = "为搜索描述产品";
  zh["A worked example"] = "一个实际例子";
  zh["Keep pages and PDFs in step"] = "页面和 PDF 保持同步";
  zh["Link, publish and measure"] = "链接、发布、衡量";
  zh["Yes. Google’s list of"] = "能。谷歌列出的";
  zh["file types it can index"] = "可索引文件类型";
  zh["includes Adobe Portable Document Format (.pdf). But one PDF for hundreds of products gives search engines and buyers one long document instead of one clear page per product family."] = "包含 Adobe 便携文档格式（.pdf）。但把几百个产品塞进一个 PDF，给搜索引擎和买家的只是一份长文档，而不是每个产品系列一个清晰的页面。";
  zh["Each page can match the searches for that product type."] = "每个页面可以对应那一类产品的搜索。";
  zh["Buyers land directly on the product they need."] = "买家直接落到他们需要的产品上。";
  zh["Specification tables in HTML are easy to read on phones and to copy into comparisons."] = "HTML 规格表在手机上易读，也方便复制到对比表里。";
  zh["Each page can carry its own RFQ form, certificates and related products."] = "每个页面可以有自己的询价表单、证书和相关产品。";
  zh["You can see which products attract inquiries."] = "你能看出哪些产品带来询盘。";
  zh["List every product family, model and specification in the catalogue. Note what is out of date, what is missing and which families bring the most valuable inquiries. Start with those."] = "把目录里每个产品系列、型号和规格列出来。标出过时的、缺失的，以及哪几个系列带来最有价值的询盘。从这些开始。";
  zh["A page for every tiny variant often creates many near-duplicate pages. Usually one page per product family or series, with a model table, works better. Give a model its own page only when buyers search for it or it differs significantly."] = "为每个细微变型都建页，往往会产生大量近乎重复的页面。通常一个产品系列一页、配一张型号表更好。只有当买家会专门搜某个型号，或者它差别很大时，才单独建页。";
  zh["A clear H1 with the product type and key specification."] = "清晰的 H1，写明产品类型和关键规格。";
  zh["A short introduction: what it is, what it is for, who uses it."] = "简短介绍：是什么、做什么用、谁在用。";
  zh["A specification table in HTML."] = "HTML 规格表。";
  zh["Applications and options."] = "应用和选项。";
  zh["Certificates that cover the product."] = "覆盖该产品的证书。";
  zh["Downloads: datasheet, manual, drawings."] = "下载：数据表、手册、图纸。";
  zh["An RFQ form and related products."] = "询价表单和相关产品。";
  zh["PDFs remain useful: buyers forward them, print them and file them. Offer a datasheet PDF beside each product page, keep the file names descriptive and make sure the PDF and the page say the same thing."] = "PDF 仍然有用：买家会转发、打印、归档。在每个产品页旁提供数据表 PDF，文件名要有描述性，并确保 PDF 和页面说的是同一件事。";
  zh["title links"] = "标题链接";
  zh["asks for descriptive and concise text in each page’s title element. Use the product type and its main specification, not just a model code."] = "要求每个页面的 title 元素写得描述性且简洁。写明产品类型和主要规格，而不只是一个型号代码。";
  zh["Where it fits and the facts are accurate,"] = "在适合页面且事实准确的前提下，";
  zh["can describe your products to Google. Google’s documentation describes product snippets for pages where people cannot directly purchase the product — the situation of most B2B product pages."] = "可以向谷歌描述你的产品。谷歌的文档为“用户无法直接购买产品”的页面提供了“产品摘要”类型——多数 B2B 产品页正是这种情况。";
  zh["Imagine a 120-page pump catalogue with 15 series and 400 models. Instead of one PDF, the website gets 15 series pages, each with a model table, curves, materials, certificates and a datasheet download. Category pages group the series by application. The PDF stays available for buyers who want it."] = "设想一份 120 页的泵目录，15 个系列、400 个型号。不做成一个 PDF，而是在网站上做 15 个系列页，每页有型号表、性能曲线、材料、证书和数据表下载。分类页按应用把系列归组。PDF 仍保留，给需要的买家。";
  zh["The buyer searching for a specific type of pump now lands on the right series page, compares models in a table and sends an RFQ from that page — and you know which series it came from."] = "搜索特定泵型的买家现在会落到对应的系列页，在表格里比较型号，直接在该页发询价——而你能知道这条询盘来自哪个系列。";
  zh["Change specifications in one place first, then update the other."] = "改规格时先改一处，再更新另一处。";
  zh["Put a revision date on each datasheet."] = "每份数据表都标注修订日期。";
  zh["Remove discontinued models from both, or mark them clearly."] = "停产的型号从两边都删掉，或者明确标注。";
  zh["Check every quarter that downloads still open."] = "每季度检查下载链接是否还能打开。";
  zh["Link families from your category pages and from each other, add them to your XML sitemap and track which pages lead to inquiries. Add the next batch of families based on what you learn."] = "从分类页链接到各系列，并让系列之间互链，加入 XML 站点地图，跟踪哪些页面带来询盘。根据结果再加下一批系列。";
  zh["Product-family pages built from your catalogue, with HTML specification tables and PDF downloads."] = "按你的目录构建产品系列页，含 HTML 规格表和 PDF 下载。";
  zh["Titles, internal links and sitemaps so each product family can be found."] = "标题、内链和站点地图，让每个产品系列都能被找到。";
  zh["Landing pages for chosen product families in campaigns."] = "为选定产品系列做广告落地页。";
  zh["Posts that link to new product pages as they go live."] = "产品页上线时发布链接到它的帖子。";
  zh["Can Google index our PDF catalogue?"] = "谷歌能索引我们的 PDF 目录吗？";
  zh["Yes, Google can index PDFs. But product pages usually serve buyers and search better than one long catalogue."] = "能，谷歌可以索引 PDF。但产品页通常比一份长目录更能服务买家和搜索。";
  zh["Should we remove the PDF?"] = "要把 PDF 删掉吗？";
  zh["No. Keep it as a download, and keep it consistent with the product pages."] = "不用。保留作下载，并与产品页保持一致。";
  zh["How many pages do we need?"] = "需要多少个页面？";
  zh["Usually one per product family or series, with model tables. Start with the families that matter most."] = "通常每个产品系列一页，配型号表。从最重要的系列开始。";
  zh["Our catalogue is in Chinese. Can you help?"] = "我们的目录是中文的，能帮忙吗？";
  zh["Yes. We work from Chinese documents and write English pages with your team."] = "可以。我们基于中文文件，与你的团队一起写英文页面。";
  zh["How long does it take?"] = "需要多久？";
  zh["It depends on the range. We usually start with a template and the top families, then add the rest in batches."] = "取决于产品范围。我们通常先做模板和主要系列，再分批补上其余。";
  zh["Will this improve our rankings?"] = "这能提升排名吗？";
  zh["It usually helps buyers and search find the right product, but nobody can guarantee rankings."] = "通常能帮买家和搜索找到对的产品，但没人能保证排名。";
  zh["What about prices?"] = "价格怎么办？";
  zh["Most B2B product pages do not show prices; MOQs, lead times and an RFQ form work better."] = "多数 B2B 产品页不标价；最小起订量、交期和询价表单更管用。";
  zh["File types indexable by Google"] = "谷歌可索引的文件类型";
  zh["Influencing your title links in search results"] = "影响搜索结果中的标题链接";
  zh["Diagram of the steps covered in this guide: 1. Audit the catalogue; 2. Group into families; 3. Build a template; 4. Put specs in HTML; 5. Keep PDFs as downloads; 6. Link and measure."] = "本指南步骤示意图：1. 盘点目录；2. 按系列归组；3. 做模板；4. 规格放进 HTML；5. PDF 作下载；6. 链接与衡量。";
  zh["Google Ads for Exporters: A Setup Guide for Factories | Hurfi"] = "出口企业的谷歌广告：工厂投放设置指南 | Hurfi";
  zh["Google Ads can bring overseas buyers to a factory’s website within days, but it can also spend a budget on the wrong countries and the wrong searches. This guide covers the settings and checks that matter most for B2B exporters."] = "谷歌广告能在几天内把海外买家带到工厂网站，但也可能把预算花在错误的国家和错误的搜索上。这份指南讲 B2B 出口企业最要紧的设置和检查。";
  zh["Set up conversion tracking before spending"] = "花钱之前先设好转化跟踪";
  zh["Choose locations deliberately"] = "有意识地选择地区";
  zh["Use specific, B2B keywords"] = "使用具体的 B2B 关键词";
  zh["Send clicks to the right page"] = "把点击送到对的页面";
  zh["Start small and measure cost per qualified inquiry"] = "从小预算开始，衡量每条有效询盘的成本";
  zh["Review search terms every week"] = "每周查看搜索词";
  zh["Location settings: presence or interest"] = "地区设置：实际位置还是兴趣";
  zh["Negative keywords for B2B exporters"] = "B2B 出口企业的否定关键词";
  zh["Track leads, not just clicks"] = "跟踪线索，而不只是点击";
  zh["Budget and timing"] = "预算与节奏";
  zh["Decide what counts as a conversion: an RFQ form submission, a quote request email or a WhatsApp click. Track them in Google Analytics and import them into Google Ads. Google Analytics lists"] = "先确定什么算转化：提交询价表单、发送询价邮件，或点击 WhatsApp。在 Google Analytics 里跟踪，再导入 Google Ads。Google Analytics 列出了";
  zh["recommended events"] = "推荐事件";
  zh["for lead generation, including generate_lead for when a user submits a form or request."] = "用于线索获取，其中 generate_lead 用于用户提交表单或请求时。";
  zh["Without conversion tracking you cannot tell which keywords bring buyers, and automated bidding has nothing to learn from. Google Ads Help states that to use"] = "没有转化跟踪，你分不清哪些关键词带来买家，自动出价也没有数据可学。Google Ads 帮助说明，要使用";
  zh["Smart Bidding"] = "智能出价";
  zh["you need conversion tracking enabled, and some strategies rely on a minimum volume of conversion data."] = "必须先启用转化跟踪，某些策略还需要最低数量的转化数据。";
  zh["Google Ads offers advanced"] = "谷歌广告提供高级";
  zh["location options"] = "地区选项";
  zh[". The broad setting, “Presence or Interest”, reaches people in your target locations and people who have shown interest in them; “Presence” limits ads to people who are in or regularly in those locations."] = "。宽泛的设置“实际位置或兴趣”，会覆盖目标地区的用户以及对其表现出兴趣的用户；“实际位置”则只投放给在这些地区或经常在此的人。";
  zh["For an exporter, it is worth checking which setting fits. Google notes that the location mentioned in a search is considered first. Review the location report after the first weeks and exclude places you cannot serve."] = "对出口企业来说，值得确认哪种设置合适。谷歌指出，搜索中出现的地点会被优先考虑。头几周之后查看地区报告，排除你服务不到的地方。";
  zh["Target the countries where you can ship, certify and support"] = "只投你能发货、能认证、能提供支持的国家";
  zh["Exclude mainland China if your campaign is for overseas buyers only"] = "如果广告只面向海外买家，就排除中国大陆";
  zh["Check the location report and adjust"] = "查看地区报告并调整";
  zh["Broad product words attract consumers, students and competitors. Specific searches — product plus specification, standard, “manufacturer”, “supplier” or “OEM” — are more likely to come from buyers. Add negative keywords for retail, “free”, “DIY” and job searches."] = "宽泛的产品词会招来消费者、学生和同行。具体的搜索——产品加规格、标准、“制造商”“供应商”或“OEM”——更可能来自买家。加上零售、“免费”“DIY”和求职类的否定关键词。";
  zh["Each ad group should lead to the product page that matches the search, with specifications, proof and an RFQ form. Sending every click to the home page wastes money; the buyer has to search again."] = "每个广告组都应指向与搜索匹配的产品页，页面上有规格、证据和询价表单。把所有点击都送到首页是浪费钱——买家还得再找一遍。";
  zh["Begin with a test budget on a few products and markets. After a few weeks, judge results by the number of qualified inquiries and what each one cost — not by clicks or impressions. Mark which inquiries were real buyers in your CRM or a simple sheet; GA4’s close_convert_lead event can record leads that became customers."] = "先用测试预算，聚焦少数产品和市场。几周后，用有效询盘的数量和每条成本来判断，而不是看点击或展示。在 CRM 或一张简单的表里标出哪些询盘是真买家；GA4 的 close_convert_lead 事件可以记录成为客户的线索。";
  zh["The search terms report shows the actual searches that triggered your ads. Review it weekly at first, add negatives and move good terms into their own ad groups."] = "搜索词报告显示实际触发广告的搜索。起初每周查看，添加否定词，把好的词单独放进广告组。";
  zh["Google Ads offers broad geo targeting, called “Presence or Interest”, which reaches people in your target locations and also people who have shown interest in them. Google recommends broad targeting as a best practice on Search, but says to consider “Presence” when you only want to reach users in specific locations, not users elsewhere who are interested in them."] = "谷歌广告提供宽泛的地区定位，称为“实际位置或兴趣”，既覆盖目标地区的用户，也覆盖对其表现出兴趣的人。谷歌将宽泛定位列为搜索广告的最佳实践，但也说明：如果你只想触达特定地区的用户、而不想触达其他地区感兴趣的人，就应考虑“实际位置”。";
  zh["Exporters who can only serve buyers in certain countries — because of certification, voltage, shipping or distributor agreements — often fit that second case. Whichever setting you choose, check the location report after a few weeks and adjust based on where qualified inquiries actually come from."] = "只能服务某些国家买家的出口企业——因为认证、电压、运输或经销商协议——往往属于第二种情况。无论选哪种设置，几周后都查看地区报告，按有效询盘的实际来源调整。";
  zh["Industrial searches attract many clicks you do not want: job seekers, students, consumers looking for one unit, and people looking for repairs. A negative keyword list stops those searches triggering your ads."] = "工业类搜索会带来很多你不想要的点击：求职者、学生、想买一台的消费者，以及找维修的人。否定关键词列表能让这些搜索不再触发你的广告。";
  zh["Job and education terms: job, jobs, career, salary, course, training, PDF."] = "求职与教育类：job、jobs、career、salary、course、training、PDF。";
  zh["Consumer terms, if you do not sell single units: for home, DIY, near me, price of one."] = "如果你不零售单台，加上消费类词：for home、DIY、near me、price of one。";
  zh["Repair and second-hand terms, unless you offer those services: repair, used, second hand."] = "除非你提供相关服务，加上维修和二手类：repair、used、second hand。";
  zh["Competitor brand names, unless you have a deliberate competitor campaign."] = "竞品品牌名，除非你有专门的竞品投放计划。";
  zh["Set up a conversion for each meaningful action: RFQ form submissions, contact form submissions, email clicks and WhatsApp or phone clicks. In Google Analytics 4, the recommended event for a submitted form or request for information is generate_lead."] = "为每个有意义的动作设置转化：询价表单提交、联系表单提交、邮件点击，以及 WhatsApp 或电话点击。在 Google Analytics 4 中，提交表单或索取资料对应的推荐事件是 generate_lead。";
  zh["Then judge campaigns by cost per qualified inquiry, not cost per click. A campaign with expensive clicks that brings two real RFQs a month is better than a cheap campaign that brings none. Review leads with your sales team each month and mark which ones were real buyers."] = "然后用每条有效询盘的成本来评判，而不是每次点击成本。点击贵、但每月带来两条真实询价的活动，胜过一个便宜却什么也没带来的活动。每月和销售团队一起复核线索，标出哪些是真买家。";
  zh["Start with a budget you can sustain for at least two to three months, focused on one or two markets and a few product groups. Industrial buyers search less often than consumers, so it takes time to collect enough data to judge a campaign."] = "先定一个能持续两三个月的预算，聚焦一两个市场和少数产品组。工业买家的搜索频率低于消费者，因此需要时间才能积累足够数据来判断一个活动。";
  zh["Consider buyers’ time zones and working days when you review results, and make sure someone can answer inquiries quickly in those hours. An ad that brings an RFQ at 9 a.m. in Germany is wasted if the reply comes two days later."] = "看结果时要考虑买家的时区和工作日，并确保那些时段有人能快速回复询盘。德国早上 9 点带来的询价，如果两天后才回，就白费了。";
  zh["Landing pages per product that match the ad and end in a working RFQ form."] = "按产品做与广告匹配的落地页，并以可用的询价表单收尾。";
  zh["SEO for the same products, so search traffic continues when ads stop."] = "为同样的产品做 SEO，让广告停下后搜索流量仍在。";
  zh["Campaign setup, conversion tracking, location and keyword management, in your own account."] = "在你自己的账号里做活动设置、转化跟踪、地区和关键词管理。";
  zh["LinkedIn content that supports buyers who check you after clicking an ad."] = "用领英内容承接那些点了广告后回来核查你的买家。";
  zh["Is Google Ads useful for B2B manufacturers?"] = "谷歌广告对 B2B 制造商有用吗？";
  zh["It can be, for products with clear search demand and a landing page that answers buyers. It works best alongside SEO, not instead of it."] = "对有明确搜索需求、且有能回答买家问题的落地页的产品，是有用的。它最好是和 SEO 配合，而不是替代 SEO。";
  zh["What should count as a conversion?"] = "什么应该算转化？";
  zh["Actions that show buying intent: RFQ form submissions, quote request emails, WhatsApp or phone clicks. GA4 recommends a generate_lead event for form and request submissions."] = "体现购买意向的动作：提交询价表单、发送询价邮件、点击 WhatsApp 或电话。GA4 建议为表单和请求提交使用 generate_lead 事件。";
  zh["Do we need conversion tracking to use Smart Bidding?"] = "使用智能出价需要转化跟踪吗？";
  zh["Yes. Google Ads Help states that Smart Bidding needs conversion tracking enabled, and some strategies need a minimum amount of conversion data."] = "需要。Google Ads 帮助说明，智能出价需要启用转化跟踪，某些策略还需要最低数量的转化数据。";
  zh["Which location setting should we use?"] = "该用哪种地区设置？";
  zh["Google recommends “Presence or Interest” as a best practice on Search, but explains when “Presence” makes sense. Choose based on where you can actually sell, and check the location report."] = "谷歌将“实际位置或兴趣”列为搜索广告的最佳实践，同时说明了什么情况下“实际位置”更合适。根据你实际能卖到的地方来选，并查看地区报告。";
  zh["How much budget do we need?"] = "需要多少预算？";
  zh["Enough to collect meaningful data on a few products and markets. We set a test budget with you and judge it by cost per qualified inquiry."] = "足够在少数产品和市场上收集有意义的数据。我们会和你一起定测试预算，并按每条有效询盘成本来评判。";
  zh["Should we send ads to our home page?"] = "广告应该指向首页吗？";
  zh["No. Send each ad group to the product page that matches the search."] = "不应该。每个广告组都指向与搜索匹配的产品页。";
  zh["How do we stop irrelevant clicks?"] = "怎么减少无关点击？";
  zh["Use specific keywords, add negative keywords and review the search terms report weekly."] = "用具体关键词、添加否定词，并每周查看搜索词报告。";
  zh["Can you guarantee a number of leads from ads?"] = "能保证广告带来多少线索吗？";
  zh["No. Results depend on product, market, price and competition. We report honestly from your own account."] = "不能。结果取决于产品、市场、价格和竞争。我们用你自己的账号如实汇报。";
  zh["Can Hurfi manage our Google Ads?"] = "Hurfi 能管理我们的谷歌广告吗？";
  zh["Yes, through our digital marketing service. The account stays in your company’s name."] = "可以，通过我们的数字营销服务。账号始终在你公司名下。";
  zh["Google Ads Help."] = "Google Ads 帮助。";
  zh["About advanced location options"] = "关于高级地区选项";
  zh["About Smart Bidding"] = "关于智能出价";
  zh["Google Analytics Help."] = "Google Analytics 帮助。";
  zh["Recommended events"] = "推荐事件";
  zh["Diagram of the steps covered in this guide: 1. Track conversions first; 2. Set locations carefully; 3. Choose specific keywords; 4. Build matching landing pages; 5. Start with a test budget; 6. Review search terms weekly."] = "本指南步骤示意图：1. 先做转化跟踪；2. 谨慎设置地区；3. 选具体关键词；4. 做匹配的落地页；5. 用测试预算起步；6. 每周查看搜索词。";
  fr["Export Website Speed: Why It Matters to Overseas Buyers | Hurfi"] = "Vitesse d’un site export : pourquoi les acheteurs étrangers y tiennent | Hurfi";
  fr["Many Chinese factory websites are fast inside China and slow everywhere else. For an overseas buyer on a phone, a slow product page is often the last page they see. This guide explains what to measure and the fixes that usually help most."] = "Beaucoup de sites d’usine chinois sont rapides en Chine et lents ailleurs. Pour un acheteur étranger sur téléphone, une page produit lente est souvent la dernière qu’il voit. Ce guide explique quoi mesurer et les corrections les plus efficaces.";
  fr["Why speed matters for exporters"] = "Pourquoi la vitesse compte pour les exportateurs";
  fr["What Core Web Vitals measure"] = "Ce que mesurent les Core Web Vitals";
  fr["Host where your buyers are"] = "Héberger là où sont vos acheteurs";
  fr["Compress and size images"] = "Compresser et dimensionner les images";
  fr["Remove what slows pages down"] = "Supprimer ce qui ralentit les pages";
  fr["Test, fix, re-test"] = "Tester, corriger, retester";
  fr["The thresholds to aim for"] = "Les seuils à viser";
  fr["Test from where your buyers are"] = "Tester depuis chez vos acheteurs";
  fr["Quick wins for factory websites"] = "Les gains rapides pour un site d’usine";
  fr["Keep it fast after launch"] = "Rester rapide après la mise en ligne";
  fr["Buyers abroad reach your site over international connections. If the server is in mainland China or the page loads large images and many scripts, the wait can be long. Google’s guidance on"] = "Les acheteurs étrangers accèdent à votre site par des connexions internationales. Si le serveur est en Chine continentale, ou si la page charge de grandes images et de nombreux scripts, l’attente peut être longue. Les recommandations de Google sur";
  fr["page experience"] = "l’expérience de page";
  fr["explains that it looks at signals such as Core Web Vitals alongside content relevance."] = "expliquent que Google examine des signaux comme les Core Web Vitals en plus de la pertinence du contenu.";
  fr["Web Vitals"] = "Web Vitals";
  fr["defines three core metrics and their “good” thresholds:"] = "définit trois indicateurs clés et leurs seuils « bons » :";
  fr["Largest Contentful Paint (loading): 2.5 seconds or less"] = "Largest Contentful Paint (chargement) : 2,5 secondes ou moins";
  fr["Interaction to Next Paint (responsiveness): 200 milliseconds or less"] = "Interaction to Next Paint (réactivité) : 200 millisecondes ou moins";
  fr["Cumulative Layout Shift (visual stability): 0.1 or less"] = "Cumulative Layout Shift (stabilité visuelle) : 0,1 ou moins";
  fr["Measure these from the countries where your buyers are, on mobile as well as desktop."] = "Mesurez-les depuis les pays de vos acheteurs, sur mobile comme sur ordinateur.";
  fr["For an export site, hosting outside mainland China, or using a content delivery network with servers near your markets, usually makes the biggest difference. Keep a separate Chinese site in China if you need one for domestic buyers."] = "Pour un site export, héberger hors de Chine continentale, ou utiliser un réseau de diffusion avec des serveurs proches de vos marchés, fait généralement la plus grande différence. Gardez un site chinois séparé en Chine si vos acheteurs nationaux en ont besoin.";
  fr["Use modern formats such as WebP"] = "Utiliser des formats modernes comme WebP";
  fr["Resize images to the size they are displayed"] = "Redimensionner les images à leur taille d’affichage";
  fr["Set width and height so the layout does not jump"] = "Indiquer largeur et hauteur pour éviter les sauts de mise en page";
  fr["Lazy-load images below the first screen"] = "Charger en différé les images sous le premier écran";
  fr["Replace heavy sliders with one clear image"] = "Remplacer les carrousels lourds par une image claire";
  fr["Chat widgets, tracking scripts, web fonts and video embeds add weight. Keep the ones you use and remove the rest. Scripts or fonts served from services that are slow or blocked in some regions can delay the whole page."] = "Les widgets de chat, scripts de suivi, polices web et vidéos intégrées alourdissent la page. Gardez ceux que vous utilisez et retirez le reste. Des scripts ou polices servis par des services lents ou bloqués dans certaines régions peuvent retarder toute la page.";
  fr["Use Lighthouse or PageSpeed tools on your key product pages, fix the largest problems first and test again. Check Search Console’s Core Web Vitals report over time for real-user data."] = "Utilisez Lighthouse ou PageSpeed sur vos pages produit clés, corrigez d’abord les problèmes les plus importants et retestez. Consultez régulièrement le rapport Core Web Vitals de Search Console pour les données d’utilisateurs réels.";
  fr["web.dev gives clear targets for Core Web Vitals: Largest Contentful Paint (LCP) within 2.5 seconds, Interaction to Next Paint (INP) of 200 milliseconds or less, and Cumulative Layout Shift (CLS) of 0.1 or less."] = "web.dev donne des objectifs clairs pour les Core Web Vitals : un Largest Contentful Paint (LCP) sous 2,5 secondes, un Interaction to Next Paint (INP) de 200 millisecondes ou moins, et un Cumulative Layout Shift (CLS) de 0,1 ou moins.";
  fr["It also recommends measuring at the 75th percentile of page loads, separately for mobile and desktop. In practice this means most of your real visitors should get a good experience — not just you, testing from the office on a fast connection."] = "Il recommande aussi de mesurer au 75e percentile des chargements, séparément pour mobile et ordinateur. Concrètement, la majorité de vos visiteurs réels doit avoir une bonne expérience — pas seulement vous, depuis le bureau avec une bonne connexion.";
  fr["A site that loads quickly in Shenzhen may be slow in Frankfurt or São Paulo, because of where it is hosted and how assets are delivered. Test key pages from the regions you sell to, using tools that let you choose a test location, and on mobile as well as desktop."] = "Un site rapide à Shenzhen peut être lent à Francfort ou São Paulo, selon l’hébergement et la diffusion des ressources. Testez les pages clés depuis les régions où vous vendez, avec des outils permettant de choisir le lieu du test, sur mobile comme sur ordinateur.";
  fr["Chrome Lighthouse, which Google mentions as a tool for page-experience improvements, is useful for finding problems on a single page. Real-user data, when available, shows what visitors actually experience over time."] = "Chrome Lighthouse, que Google cite comme outil d’amélioration de l’expérience de page, aide à repérer les problèmes d’une page. Les données d’utilisateurs réels, lorsqu’elles existent, montrent ce que vivent vraiment les visiteurs dans le temps.";
  fr["Test your home page, a top product page and the RFQ page."] = "Testez votre page d’accueil, une page produit phare et la page de demande.";
  fr["Test from at least two target regions, on mobile and desktop."] = "Testez depuis au moins deux régions cibles, sur mobile et ordinateur.";
  fr["Record results before and after each change, so you know what helped."] = "Notez les résultats avant et après chaque changement, pour savoir ce qui a aidé.";
  fr["Convert large JPEG and PNG product photos to WebP or AVIF, sized to how they are displayed."] = "Convertissez les grosses photos produit JPEG et PNG en WebP ou AVIF, à la taille d’affichage.";
  fr["Set width and height on images so the layout does not jump as they load."] = "Indiquez largeur et hauteur des images pour éviter les sauts pendant le chargement.";
  fr["Lazy-load images below the first screen; do not lazy-load the main image."] = "Chargez en différé les images sous le premier écran ; ne différez pas l’image principale.";
  fr["Remove unused plugins, sliders, chat widgets and tracking scripts."] = "Retirez les extensions, carrousels, widgets de chat et scripts de suivi inutilisés.";
  fr["Replace auto-playing background videos with a still image and an optional play button."] = "Remplacez les vidéos de fond en lecture automatique par une image fixe avec un bouton de lecture optionnel.";
  fr["Use a CDN with locations near your buyers for images, CSS and JavaScript."] = "Utilisez un CDN avec des points de présence proches de vos acheteurs pour images, CSS et JavaScript.";
  fr["Speed tends to slip over time as new images, plugins and tracking scripts are added. Set a simple rule: every new page is checked before it is published, and the key pages are re-tested every quarter from your main buyer regions."] = "La vitesse se dégrade avec le temps, à mesure qu’on ajoute images, extensions et scripts de suivi. Fixez une règle simple : chaque nouvelle page est testée avant publication, et les pages clés sont retestées chaque trimestre depuis vos principales régions d’acheteurs.";
  fr["Write down a few limits your team can follow — for example, a maximum image width and file size, no auto-playing video, and no new third-party script without a reason. Small rules like these keep a fast site fast."] = "Écrivez quelques limites que votre équipe peut suivre — par exemple une largeur et un poids d’image maximaux, pas de vidéo en lecture automatique, pas de nouveau script tiers sans raison. Ces petites règles gardent un site rapide.";
  fr["Hosting advice, WebP images, lean templates and before-and-after speed tests."] = "Conseils d’hébergement, images WebP, modèles légers et tests de vitesse avant/après.";
  fr["Core Web Vitals monitoring in Search Console as part of SEO work."] = "Le suivi des Core Web Vitals dans Search Console, intégré au travail SEO.";
  fr["Fast landing pages so ad spend is not lost to slow loading."] = "Des pages d’atterrissage rapides pour que le budget publicitaire ne se perde pas dans le chargement.";
  fr["Lightweight embeds so social content does not slow pages."] = "Des intégrations légères pour que le contenu social ne ralentisse pas les pages.";
  fr["Does website speed affect Google rankings?"] = "La vitesse du site influence-t-elle le classement Google ?";
  fr["Google uses page experience signals, including Core Web Vitals, alongside relevance. Speed alone will not rank a page, but slow pages lose buyers."] = "Google utilise des signaux d’expérience de page, dont les Core Web Vitals, en plus de la pertinence. La vitesse seule ne classe pas une page, mais les pages lentes font perdre des acheteurs.";
  fr["What are good Core Web Vitals values?"] = "Quelles sont de bonnes valeurs Core Web Vitals ?";
  fr["web.dev gives LCP of 2.5 seconds or less, INP of 200 milliseconds or less and CLS of 0.1 or less as good."] = "web.dev considère comme bons un LCP de 2,5 secondes ou moins, un INP de 200 millisecondes ou moins et un CLS de 0,1 ou moins.";
  fr["Our site is fast in China. Why is it slow abroad?"] = "Notre site est rapide en Chine. Pourquoi lent à l’étranger ?";
  fr["Often because of server location, international connections, or scripts and fonts that load slowly outside China. Test from your target countries."] = "Souvent à cause de l’emplacement du serveur, des connexions internationales, ou de scripts et polices lents hors de Chine. Testez depuis vos pays cibles.";
  fr["Should we host our export site outside China?"] = "Faut-il héberger le site export hors de Chine ?";
  fr["For most exporters, yes, or use a CDN with servers near your markets."] = "Pour la plupart des exportateurs, oui, ou utilisez un CDN avec des serveurs proches de vos marchés.";
  fr["What is the quickest fix?"] = "Quelle correction est la plus rapide ?";
  fr["Usually images: compress them, convert to WebP and size them correctly."] = "En général les images : les compresser, les convertir en WebP et les dimensionner correctement.";
  fr["Do chat widgets slow sites down?"] = "Les widgets de chat ralentissent-ils le site ?";
  fr["They can. Keep only the tools you actually use."] = "Ils le peuvent. Ne gardez que les outils réellement utilisés.";
  fr["How do we measure real-user speed?"] = "Comment mesurer la vitesse réelle des utilisateurs ?";
  fr["Search Console’s Core Web Vitals report shows field data when enough visits are recorded."] = "Le rapport Core Web Vitals de Search Console affiche des données de terrain lorsque le nombre de visites est suffisant.";
  fr["Does speed matter for B2B buyers?"] = "La vitesse compte-t-elle pour les acheteurs B2B ?";
  fr["Yes. Buyers often research on phones and between meetings, and they have many other suppliers to check."] = "Oui. Les acheteurs font souvent leurs recherches sur téléphone, entre deux réunions, et ont beaucoup d’autres fournisseurs à examiner.";
  fr["Can Hurfi fix our site speed?"] = "Hurfi peut-il améliorer la vitesse de notre site ?";
  fr["Yes. Our website development work includes hosting advice, image optimisation and script clean-up, with before-and-after measurements."] = "Oui. Notre travail de développement web inclut conseils d’hébergement, optimisation d’images et nettoyage de scripts, avec mesures avant/après.";
  fr["web.dev (Google)."] = "web.dev (Google).";
  fr["Understanding page experience in Google Search results"] = "Comprendre l’expérience de page dans les résultats Google";
  fr["Diagram of the steps covered in this guide: 1. Measure from abroad; 2. Check Core Web Vitals; 3. Fix hosting; 4. Compress images; 5. Trim scripts; 6. Re-test."] = "Schéma des étapes : 1. Mesurer depuis l’étranger ; 2. Vérifier les Core Web Vitals ; 3. Corriger l’hébergement ; 4. Compresser les images ; 5. Alléger les scripts ; 6. Retester.";
  fr["Hurfi social post “The missing piece? A strong digital presence”, listing production capacity, quality products and years of experience"] = "Publication Hurfi : « La pièce manquante ? Une forte présence digitale », avec capacité de production, produits de qualité et années d’expérience.";
  fr["Hurfi social post “Great products need a digital identity”, with a factory model on a gloved hand"] = "Publication Hurfi : « Les bons produits ont besoin d’une identité digitale », un modèle d’usine sur une main gantée.";
  fr["Turn Your PDF Catalogue into Product Pages | Hurfi"] = "Transformer votre catalogue PDF en pages produit | Hurfi";
  fr["Many factories put their whole range in one big PDF catalogue and link to it from the website. Buyers then have to download it, scroll and guess. Search engines can read PDFs, but a catalogue is no substitute for product pages. This guide explains how to turn a catalogue into pages buyers can find and compare."] = "Beaucoup d’usines rassemblent toute leur gamme dans un gros catalogue PDF lié depuis le site. L’acheteur doit alors télécharger, faire défiler et deviner. Les moteurs lisent les PDF, mais un catalogue ne remplace pas des pages produit. Ce guide explique comment transformer un catalogue en pages que les acheteurs trouvent et comparent.";
  fr["Can Google read PDFs?"] = "Google peut-il lire les PDF ?";
  fr["Why product pages work better"] = "Pourquoi les pages produit fonctionnent mieux";
  fr["Audit the catalogue first"] = "Auditer d’abord le catalogue";
  fr["Group into families, not hundreds of thin pages"] = "Regrouper par familles, pas des centaines de pages creuses";
  fr["Build one good template"] = "Construire un bon modèle";
  fr["Keep PDFs as downloads"] = "Garder les PDF en téléchargement";
  fr["Write titles that match the product"] = "Des titres qui correspondent au produit";
  fr["Describe products for search"] = "Décrire les produits pour la recherche";
  fr["A worked example"] = "Un exemple concret";
  fr["Keep pages and PDFs in step"] = "Garder pages et PDF alignés";
  fr["Link, publish and measure"] = "Relier, publier, mesurer";
  fr["Yes. Google’s list of"] = "Oui. La liste de Google des";
  fr["file types it can index"] = "types de fichiers indexables";
  fr["includes Adobe Portable Document Format (.pdf). But one PDF for hundreds of products gives search engines and buyers one long document instead of one clear page per product family."] = "inclut le format Adobe Portable Document Format (.pdf). Mais un seul PDF pour des centaines de produits donne aux moteurs et aux acheteurs un long document, au lieu d’une page claire par famille de produits.";
  fr["Each page can match the searches for that product type."] = "Chaque page peut correspondre aux recherches de ce type de produit.";
  fr["Buyers land directly on the product they need."] = "Les acheteurs arrivent directement sur le produit dont ils ont besoin.";
  fr["Specification tables in HTML are easy to read on phones and to copy into comparisons."] = "Les tableaux de spécifications en HTML sont lisibles sur téléphone et faciles à copier dans un comparatif.";
  fr["Each page can carry its own RFQ form, certificates and related products."] = "Chaque page peut avoir son formulaire de demande, ses certificats et ses produits liés.";
  fr["You can see which products attract inquiries."] = "Vous voyez quels produits attirent des demandes.";
  fr["List every product family, model and specification in the catalogue. Note what is out of date, what is missing and which families bring the most valuable inquiries. Start with those."] = "Listez chaque famille, modèle et spécification du catalogue. Notez ce qui est obsolète, ce qui manque, et quelles familles apportent les demandes les plus utiles. Commencez par elles.";
  fr["A page for every tiny variant often creates many near-duplicate pages. Usually one page per product family or series, with a model table, works better. Give a model its own page only when buyers search for it or it differs significantly."] = "Une page par micro-variante crée souvent beaucoup de pages quasi identiques. En général, une page par famille ou série avec un tableau de modèles fonctionne mieux. Réservez une page à un modèle seulement s’il est recherché ou s’il diffère nettement.";
  fr["A clear H1 with the product type and key specification."] = "Un H1 clair avec le type de produit et la spécification clé.";
  fr["A short introduction: what it is, what it is for, who uses it."] = "Une courte introduction : ce que c’est, à quoi ça sert, qui l’utilise.";
  fr["A specification table in HTML."] = "Un tableau de spécifications en HTML.";
  fr["Applications and options."] = "Applications et options.";
  fr["Certificates that cover the product."] = "Les certificats couvrant le produit.";
  fr["Downloads: datasheet, manual, drawings."] = "Téléchargements : fiche technique, manuel, plans.";
  fr["An RFQ form and related products."] = "Un formulaire de demande et des produits liés.";
  fr["PDFs remain useful: buyers forward them, print them and file them. Offer a datasheet PDF beside each product page, keep the file names descriptive and make sure the PDF and the page say the same thing."] = "Les PDF restent utiles : les acheteurs les transfèrent, les impriment, les classent. Proposez un PDF de fiche technique à côté de chaque page produit, donnez des noms de fichiers explicites et assurez-vous que le PDF et la page disent la même chose.";
  fr["title links"] = "liens de titre";
  fr["asks for descriptive and concise text in each page’s title element. Use the product type and its main specification, not just a model code."] = "demande un texte descriptif et concis dans l’élément title de chaque page. Indiquez le type de produit et sa spécification principale, pas seulement une référence.";
  fr["Where it fits and the facts are accurate,"] = "Lorsque cela convient et que les faits sont exacts,";
  fr["can describe your products to Google. Google’s documentation describes product snippets for pages where people cannot directly purchase the product — the situation of most B2B product pages."] = "peuvent décrire vos produits à Google. La documentation de Google décrit les extraits produit pour les pages où l’on ne peut pas acheter directement le produit — la situation de la plupart des pages produit B2B.";
  fr["Imagine a 120-page pump catalogue with 15 series and 400 models. Instead of one PDF, the website gets 15 series pages, each with a model table, curves, materials, certificates and a datasheet download. Category pages group the series by application. The PDF stays available for buyers who want it."] = "Imaginez un catalogue de pompes de 120 pages, 15 séries et 400 modèles. Au lieu d’un PDF, le site reçoit 15 pages de série, chacune avec tableau de modèles, courbes, matériaux, certificats et fiche à télécharger. Des pages catégorie regroupent les séries par application. Le PDF reste disponible pour qui le souhaite.";
  fr["The buyer searching for a specific type of pump now lands on the right series page, compares models in a table and sends an RFQ from that page — and you know which series it came from."] = "L’acheteur qui cherche un type de pompe précis arrive sur la bonne page de série, compare les modèles dans un tableau et envoie une demande depuis cette page — et vous savez de quelle série elle vient.";
  fr["Change specifications in one place first, then update the other."] = "Modifiez d’abord les spécifications à un endroit, puis mettez l’autre à jour.";
  fr["Put a revision date on each datasheet."] = "Indiquez une date de révision sur chaque fiche.";
  fr["Remove discontinued models from both, or mark them clearly."] = "Retirez les modèles arrêtés des deux, ou marquez-les clairement.";
  fr["Check every quarter that downloads still open."] = "Vérifiez chaque trimestre que les téléchargements fonctionnent.";
  fr["Link families from your category pages and from each other, add them to your XML sitemap and track which pages lead to inquiries. Add the next batch of families based on what you learn."] = "Reliez les familles depuis vos pages catégorie et entre elles, ajoutez-les à votre sitemap XML et suivez les pages qui génèrent des demandes. Ajoutez la série suivante selon ce que vous apprenez.";
  fr["Product-family pages built from your catalogue, with HTML specification tables and PDF downloads."] = "Des pages de familles construites à partir de votre catalogue, avec tableaux HTML et téléchargements PDF.";
  fr["Titles, internal links and sitemaps so each product family can be found."] = "Titres, liens internes et sitemaps pour que chaque famille soit trouvable.";
  fr["Landing pages for chosen product families in campaigns."] = "Des pages d’atterrissage pour les familles choisies dans les campagnes.";
  fr["Posts that link to new product pages as they go live."] = "Des publications renvoyant aux nouvelles pages produit dès leur mise en ligne.";
  fr["Can Google index our PDF catalogue?"] = "Google peut-il indexer notre catalogue PDF ?";
  fr["Yes, Google can index PDFs. But product pages usually serve buyers and search better than one long catalogue."] = "Oui, Google peut indexer les PDF. Mais des pages produit servent généralement mieux acheteurs et recherche qu’un long catalogue.";
  fr["Should we remove the PDF?"] = "Faut-il supprimer le PDF ?";
  fr["No. Keep it as a download, and keep it consistent with the product pages."] = "Non. Gardez-le en téléchargement et restez cohérent avec les pages produit.";
  fr["How many pages do we need?"] = "Combien de pages faut-il ?";
  fr["Usually one per product family or series, with model tables. Start with the families that matter most."] = "En général une par famille ou série, avec tableaux de modèles. Commencez par les plus importantes.";
  fr["Our catalogue is in Chinese. Can you help?"] = "Notre catalogue est en chinois. Pouvez-vous aider ?";
  fr["Yes. We work from Chinese documents and write English pages with your team."] = "Oui. Nous travaillons à partir de documents chinois et rédigeons les pages anglaises avec votre équipe.";
  fr["How long does it take?"] = "Combien de temps cela prend-il ?";
  fr["It depends on the range. We usually start with a template and the top families, then add the rest in batches."] = "Cela dépend de la gamme. Nous commençons en général par un modèle et les principales familles, puis ajoutons le reste par lots.";
  fr["Will this improve our rankings?"] = "Cela améliorera-t-il notre classement ?";
  fr["It usually helps buyers and search find the right product, but nobody can guarantee rankings."] = "Cela aide généralement acheteurs et moteurs à trouver le bon produit, mais personne ne peut garantir un classement.";
  fr["What about prices?"] = "Et les prix ?";
  fr["Most B2B product pages do not show prices; MOQs, lead times and an RFQ form work better."] = "La plupart des pages produit B2B n’affichent pas de prix ; quantité minimale, délais et formulaire de demande fonctionnent mieux.";
  fr["File types indexable by Google"] = "Types de fichiers indexables par Google";
  fr["Influencing your title links in search results"] = "Influencer vos liens de titre dans les résultats";
  fr["Diagram of the steps covered in this guide: 1. Audit the catalogue; 2. Group into families; 3. Build a template; 4. Put specs in HTML; 5. Keep PDFs as downloads; 6. Link and measure."] = "Schéma des étapes : 1. Auditer le catalogue ; 2. Regrouper par familles ; 3. Créer un modèle ; 4. Spécifications en HTML ; 5. PDF en téléchargement ; 6. Relier et mesurer.";
  fr["Google Ads for Exporters: A Setup Guide for Factories | Hurfi"] = "Google Ads pour exportateurs : guide de configuration pour usines | Hurfi";
  fr["Google Ads can bring overseas buyers to a factory’s website within days, but it can also spend a budget on the wrong countries and the wrong searches. This guide covers the settings and checks that matter most for B2B exporters."] = "Google Ads peut amener des acheteurs étrangers sur le site d’une usine en quelques jours, mais peut aussi dépenser un budget sur les mauvais pays et les mauvaises recherches. Ce guide couvre les réglages et vérifications qui comptent le plus pour les exportateurs B2B.";
  fr["Set up conversion tracking before spending"] = "Configurer le suivi des conversions avant de dépenser";
  fr["Choose locations deliberately"] = "Choisir les zones avec intention";
  fr["Use specific, B2B keywords"] = "Utiliser des mots-clés B2B précis";
  fr["Send clicks to the right page"] = "Envoyer les clics vers la bonne page";
  fr["Start small and measure cost per qualified inquiry"] = "Commencer petit et mesurer le coût par demande qualifiée";
  fr["Review search terms every week"] = "Examiner les termes de recherche chaque semaine";
  fr["Location settings: presence or interest"] = "Réglages de zone : présence ou intérêt";
  fr["Negative keywords for B2B exporters"] = "Mots-clés négatifs pour exportateurs B2B";
  fr["Track leads, not just clicks"] = "Suivre les prospects, pas seulement les clics";
  fr["Budget and timing"] = "Budget et calendrier";
  fr["Decide what counts as a conversion: an RFQ form submission, a quote request email or a WhatsApp click. Track them in Google Analytics and import them into Google Ads. Google Analytics lists"] = "Décidez ce qui compte comme conversion : envoi d’un formulaire, e-mail de demande de devis ou clic WhatsApp. Suivez-les dans Google Analytics et importez-les dans Google Ads. Google Analytics liste les";
  fr["recommended events"] = "événements recommandés";
  fr["for lead generation, including generate_lead for when a user submits a form or request."] = "pour la génération de prospects, dont generate_lead lorsqu’un utilisateur envoie un formulaire ou une demande.";
  fr["Without conversion tracking you cannot tell which keywords bring buyers, and automated bidding has nothing to learn from. Google Ads Help states that to use"] = "Sans suivi des conversions, impossible de savoir quels mots-clés amènent des acheteurs, et l’enchère automatique n’a rien à apprendre. L’aide de Google Ads indique que pour utiliser";
  fr["Smart Bidding"] = "l’enchère intelligente";
  fr["you need conversion tracking enabled, and some strategies rely on a minimum volume of conversion data."] = "il faut activer le suivi des conversions, et certaines stratégies exigent un volume minimal de données de conversion.";
  fr["Google Ads offers advanced"] = "Google Ads propose des";
  fr["location options"] = "options de zone avancées";
  fr[". The broad setting, “Presence or Interest”, reaches people in your target locations and people who have shown interest in them; “Presence” limits ads to people who are in or regularly in those locations."] = ". Le réglage large « Présence ou intérêt » touche les personnes dans vos zones cibles et celles qui s’y sont intéressées ; « Présence » limite les annonces aux personnes qui s’y trouvent ou s’y trouvent régulièrement.";
  fr["For an exporter, it is worth checking which setting fits. Google notes that the location mentioned in a search is considered first. Review the location report after the first weeks and exclude places you cannot serve."] = "Pour un exportateur, il vaut la peine de vérifier le réglage adapté. Google précise que la localisation mentionnée dans la recherche est prise en compte en premier. Consultez le rapport de zones après les premières semaines et excluez les lieux que vous ne pouvez pas servir.";
  fr["Target the countries where you can ship, certify and support"] = "Cibler les pays où vous pouvez livrer, certifier et assurer le support";
  fr["Exclude mainland China if your campaign is for overseas buyers only"] = "Exclure la Chine continentale si la campagne vise uniquement l’étranger";
  fr["Check the location report and adjust"] = "Consulter le rapport de zones et ajuster";
  fr["Broad product words attract consumers, students and competitors. Specific searches — product plus specification, standard, “manufacturer”, “supplier” or “OEM” — are more likely to come from buyers. Add negative keywords for retail, “free”, “DIY” and job searches."] = "Les termes produit larges attirent consommateurs, étudiants et concurrents. Les recherches précises — produit plus spécification, norme, « fabricant », « fournisseur » ou « OEM » — viennent plus probablement d’acheteurs. Ajoutez des mots-clés négatifs pour le retail, « gratuit », « DIY » et les recherches d’emploi.";
  fr["Each ad group should lead to the product page that matches the search, with specifications, proof and an RFQ form. Sending every click to the home page wastes money; the buyer has to search again."] = "Chaque groupe d’annonces doit mener à la page produit correspondant à la recherche, avec spécifications, preuves et formulaire. Envoyer tous les clics vers l’accueil gaspille le budget : l’acheteur doit rechercher à nouveau.";
  fr["Begin with a test budget on a few products and markets. After a few weeks, judge results by the number of qualified inquiries and what each one cost — not by clicks or impressions. Mark which inquiries were real buyers in your CRM or a simple sheet; GA4’s close_convert_lead event can record leads that became customers."] = "Commencez avec un budget de test sur quelques produits et marchés. Après quelques semaines, jugez sur le nombre de demandes qualifiées et leur coût — pas sur les clics ou impressions. Notez dans votre CRM ou un simple tableau quelles demandes venaient de vrais acheteurs ; l’événement close_convert_lead de GA4 peut enregistrer les prospects devenus clients.";
  fr["The search terms report shows the actual searches that triggered your ads. Review it weekly at first, add negatives and move good terms into their own ad groups."] = "Le rapport des termes de recherche montre les recherches réelles ayant déclenché vos annonces. Consultez-le chaque semaine au début, ajoutez des négatifs et isolez les bons termes dans leurs propres groupes.";
  fr["Google Ads offers broad geo targeting, called “Presence or Interest”, which reaches people in your target locations and also people who have shown interest in them. Google recommends broad targeting as a best practice on Search, but says to consider “Presence” when you only want to reach users in specific locations, not users elsewhere who are interested in them."] = "Google Ads propose un ciblage géographique large, « Présence ou intérêt », qui touche les personnes dans vos zones cibles et celles qui s’y sont intéressées. Google recommande le ciblage large comme bonne pratique sur le réseau Recherche, mais indique d’envisager « Présence » si vous ne voulez toucher que les utilisateurs de ces zones, pas ceux d’ailleurs qui s’y intéressent.";
  fr["Exporters who can only serve buyers in certain countries — because of certification, voltage, shipping or distributor agreements — often fit that second case. Whichever setting you choose, check the location report after a few weeks and adjust based on where qualified inquiries actually come from."] = "Les exportateurs qui ne peuvent servir que certains pays — pour des raisons de certification, de tension, de transport ou d’accords de distribution — relèvent souvent du second cas. Quel que soit le réglage, consultez le rapport de zones après quelques semaines et ajustez selon l’origine réelle des demandes qualifiées.";
  fr["Industrial searches attract many clicks you do not want: job seekers, students, consumers looking for one unit, and people looking for repairs. A negative keyword list stops those searches triggering your ads."] = "Les recherches industrielles attirent beaucoup de clics indésirables : chercheurs d’emploi, étudiants, particuliers voulant une unité et personnes cherchant une réparation. Une liste de mots-clés négatifs empêche ces recherches de déclencher vos annonces.";
  fr["Job and education terms: job, jobs, career, salary, course, training, PDF."] = "Termes d’emploi et de formation : job, jobs, career, salary, course, training, PDF.";
  fr["Consumer terms, if you do not sell single units: for home, DIY, near me, price of one."] = "Termes grand public, si vous ne vendez pas à l’unité : for home, DIY, near me, price of one.";
  fr["Repair and second-hand terms, unless you offer those services: repair, used, second hand."] = "Termes de réparation et d’occasion, sauf si vous proposez ces services : repair, used, second hand.";
  fr["Competitor brand names, unless you have a deliberate competitor campaign."] = "Les noms de marques concurrentes, sauf campagne concurrentielle assumée.";
  fr["Set up a conversion for each meaningful action: RFQ form submissions, contact form submissions, email clicks and WhatsApp or phone clicks. In Google Analytics 4, the recommended event for a submitted form or request for information is generate_lead."] = "Configurez une conversion pour chaque action significative : envoi du formulaire de demande, envoi du formulaire de contact, clics e-mail et clics WhatsApp ou téléphone. Dans Google Analytics 4, l’événement recommandé pour un formulaire envoyé ou une demande d’information est generate_lead.";
  fr["Then judge campaigns by cost per qualified inquiry, not cost per click. A campaign with expensive clicks that brings two real RFQs a month is better than a cheap campaign that brings none. Review leads with your sales team each month and mark which ones were real buyers."] = "Jugez ensuite les campagnes au coût par demande qualifiée, pas au coût par clic. Une campagne aux clics chers qui apporte deux vraies demandes par mois vaut mieux qu’une campagne bon marché qui n’en apporte aucune. Revoyez les prospects avec votre équipe commerciale chaque mois et notez ceux qui étaient de vrais acheteurs.";
  fr["Start with a budget you can sustain for at least two to three months, focused on one or two markets and a few product groups. Industrial buyers search less often than consumers, so it takes time to collect enough data to judge a campaign."] = "Commencez par un budget tenable au moins deux à trois mois, concentré sur un ou deux marchés et quelques groupes de produits. Les acheteurs industriels cherchent moins souvent que les particuliers : il faut du temps pour réunir assez de données.";
  fr["Consider buyers’ time zones and working days when you review results, and make sure someone can answer inquiries quickly in those hours. An ad that brings an RFQ at 9 a.m. in Germany is wasted if the reply comes two days later."] = "Tenez compte des fuseaux horaires et jours ouvrés des acheteurs dans vos revues, et assurez-vous que quelqu’un peut répondre vite à ces heures. Une annonce qui apporte une demande à 9 h en Allemagne est gâchée si la réponse arrive deux jours après.";
  fr["Landing pages per product that match the ad and end in a working RFQ form."] = "Des pages d’atterrissage par produit, cohérentes avec l’annonce et aboutissant à un formulaire fonctionnel.";
  fr["SEO for the same products, so search traffic continues when ads stop."] = "Du SEO sur les mêmes produits, pour que le trafic de recherche continue quand les annonces s’arrêtent.";
  fr["Campaign setup, conversion tracking, location and keyword management, in your own account."] = "Configuration des campagnes, suivi des conversions, gestion des zones et des mots-clés, dans votre propre compte.";
  fr["LinkedIn content that supports buyers who check you after clicking an ad."] = "Du contenu LinkedIn pour les acheteurs qui vérifient après avoir cliqué sur une annonce.";
  fr["Is Google Ads useful for B2B manufacturers?"] = "Google Ads est-il utile aux industriels B2B ?";
  fr["It can be, for products with clear search demand and a landing page that answers buyers. It works best alongside SEO, not instead of it."] = "Cela peut l’être, pour des produits à demande de recherche claire et avec une page qui répond aux acheteurs. Il fonctionne mieux avec le SEO que sans lui.";
  fr["What should count as a conversion?"] = "Qu’est-ce qui compte comme conversion ?";
  fr["Actions that show buying intent: RFQ form submissions, quote request emails, WhatsApp or phone clicks. GA4 recommends a generate_lead event for form and request submissions."] = "Les actions révélant une intention d’achat : envoi du formulaire, e-mail de demande, clics WhatsApp ou téléphone. GA4 recommande l’événement generate_lead pour les formulaires et demandes.";
  fr["Do we need conversion tracking to use Smart Bidding?"] = "Faut-il le suivi des conversions pour l’enchère intelligente ?";
  fr["Yes. Google Ads Help states that Smart Bidding needs conversion tracking enabled, and some strategies need a minimum amount of conversion data."] = "Oui. L’aide de Google Ads indique que l’enchère intelligente exige le suivi des conversions, et certaines stratégies un volume minimal de données.";
  fr["Which location setting should we use?"] = "Quel réglage de zone choisir ?";
  fr["Google recommends “Presence or Interest” as a best practice on Search, but explains when “Presence” makes sense. Choose based on where you can actually sell, and check the location report."] = "Google recommande « Présence ou intérêt » comme bonne pratique sur le réseau Recherche, mais explique quand « Présence » a du sens. Choisissez selon où vous pouvez réellement vendre et consultez le rapport de zones.";
  fr["How much budget do we need?"] = "De quel budget avons-nous besoin ?";
  fr["Enough to collect meaningful data on a few products and markets. We set a test budget with you and judge it by cost per qualified inquiry."] = "Assez pour recueillir des données significatives sur quelques produits et marchés. Nous fixons un budget de test avec vous et le jugeons au coût par demande qualifiée.";
  fr["Should we send ads to our home page?"] = "Faut-il envoyer les annonces vers l’accueil ?";
  fr["No. Send each ad group to the product page that matches the search."] = "Non. Chaque groupe d’annonces doit mener à la page produit correspondant à la recherche.";
  fr["How do we stop irrelevant clicks?"] = "Comment éviter les clics non pertinents ?";
  fr["Use specific keywords, add negative keywords and review the search terms report weekly."] = "Utilisez des mots-clés précis, ajoutez des négatifs et consultez chaque semaine le rapport des termes de recherche.";
  fr["Can you guarantee a number of leads from ads?"] = "Pouvez-vous garantir un nombre de prospects ?";
  fr["No. Results depend on product, market, price and competition. We report honestly from your own account."] = "Non. Les résultats dépendent du produit, du marché, du prix et de la concurrence. Nous rapportons honnêtement depuis votre compte.";
  fr["Can Hurfi manage our Google Ads?"] = "Hurfi peut-il gérer nos Google Ads ?";
  fr["Yes, through our digital marketing service. The account stays in your company’s name."] = "Oui, via notre service de marketing digital. Le compte reste au nom de votre société.";
  fr["Google Ads Help."] = "Aide Google Ads.";
  fr["About advanced location options"] = "À propos des options de zone avancées";
  fr["About Smart Bidding"] = "À propos de l’enchère intelligente";
  fr["Google Analytics Help."] = "Aide Google Analytics.";
  fr["Recommended events"] = "Événements recommandés";
  fr["Diagram of the steps covered in this guide: 1. Track conversions first; 2. Set locations carefully; 3. Choose specific keywords; 4. Build matching landing pages; 5. Start with a test budget; 6. Review search terms weekly."] = "Schéma des étapes : 1. Suivre les conversions ; 2. Régler les zones avec soin ; 3. Choisir des mots-clés précis ; 4. Créer des pages correspondantes ; 5. Démarrer avec un budget test ; 6. Examiner les termes chaque semaine.";


  // Insight articles: LinkedIn, trade shows, clusters, 2026-10-20.
  zh["LinkedIn for Factory Export Sales: A Practical Guide | Hurfi"] = "工厂出口销售如何用领英：实操指南 | Hurfi";
  zh["When a factory’s sales manager emails an overseas buyer, the buyer often looks up the person and the company on LinkedIn before replying. A blank or inconsistent profile costs trust. This guide covers what a manufacturer needs on LinkedIn and how to keep it working without fabricating anything."] = "工厂的销售经理给海外买家发邮件时，买家往往会在回复前先在领英上查这个人和这家公司。一个空白或前后不一致的档案会损失信任。这份指南讲制造企业在领英上需要什么，以及如何在不编造任何东西的前提下让它起作用。";
  zh["Why LinkedIn matters to overseas buyers"] = "为什么海外买家看重领英";
  zh["Set up the company page properly"] = "把公司主页建好";
  zh["Make sales profiles consistent"] = "让销售档案保持一致";
  zh["Post what only your factory can show"] = "发只有你工厂才能展示的内容";
  zh["Reach out without spamming"] = "主动联系但不要骚扰";
  zh["A weekly routine for a small export team"] = "小出口团队的每周惯例";
  zh["What to post when you cannot show customers"] = "不能点名客户时发什么";
  zh["Connect LinkedIn to your website"] = "把领英和网站连起来";
  zh["Mistakes that make factories look unreliable"] = "让工厂显得不可靠的错误";
  zh["LinkedIn is where many procurement and engineering staff check a supplier and the person contacting them. They look for consistency: does the company page match the website, does the salesperson work there, and is there evidence of real production?"] = "很多采购和工程人员会在领英上核查供应商以及联系他们的人。他们看的是前后一致：公司主页和网站对得上吗？这个销售真的在那儿工作吗？有没有真实生产的证据？";
  zh["A LinkedIn presence does not replace a website. It is a second place to check you, and it should point to the website for details."] = "领英不能替代网站。它是核查你的第二个地方，而且应当指回网站看细节。";
  zh["LinkedIn Help explains how to"] = "领英帮助说明了如何";
  zh["create a LinkedIn Page"] = "创建领英公司主页";
  zh["for a company. Use your English company name exactly as it appears on your website and documents, your website URL, your real location and a short description of what you make."] = "为企业创建主页。使用与网站和文件完全一致的英文公司名称、网站地址、真实所在地，以及一段简短的产品说明。";
  zh["Logo and cover image you own"] = "你自有的标志和封面图";
  zh["Description that names your products and the industries you serve"] = "描述中写明你的产品和所服务的行业";
  zh["Website link to the English site"] = "链接到英文站";
  zh["Location matching your factory address"] = "所在地与工厂地址一致";
  zh["At least two admins from your company"] = "至少两名公司内部管理员";
  zh["Each person who contacts buyers should have a profile with their real name, a professional photo, their role and the company page linked as their employer. Buyers notice when a salesperson’s profile is empty or lists a different company."] = "每个联系买家的人都应有真实姓名、职业照、职位，并把公司主页设为雇主。销售档案空白、或者写着另一家公司，买家一眼就能看出。";
  zh["The most useful posts show things buyers cannot see elsewhere: a new line being installed, a test being run, an engineer explaining a design choice, packaging for an export order (without client names). One genuine post a week beats daily generic content."] = "最有用的帖子展示买家在别处看不到的东西：新产线在安装、正在做测试、工程师解释某个设计选择、出口订单的包装（不点名客户）。每周一条真实内容，胜过每天发套话。";
  zh["Production and testing photos or short videos you own"] = "你自有的生产和检测照片或短视频";
  zh["Trade-show dates and booth details for confirmed fairs"] = "已确认展会的日期和展位信息";
  zh["Certifications when you receive them, with scope"] = "收到证书时发布，并注明范围";
  zh["Introductions to engineers and sales staff"] = "介绍工程师和销售人员";
  zh["Links to new product pages on your website"] = "链接到网站上的新产品页";
  zh["Connection requests and messages work best when they are specific: why you are contacting this person, what you make that is relevant to them, and a link to the right product page. Mass messages with no context damage your reputation and can restrict your account."] = "添加联系人和发消息，具体才有用：为什么联系这个人、你做的什么与他相关、以及对的产品页链接。没有上下文的群发会损害声誉，还可能导致账号受限。";
  zh["Track replies, meetings and RFQs that started on LinkedIn, and visits from LinkedIn to your website in analytics. Follower counts are less important than whether the right buyers engage."] = "跟踪来自领英的回复、会议和询价，以及分析工具里来自领英的网站访问。粉丝数远不如“对的买家是否互动”重要。";
  zh["LinkedIn works best as a steady habit, not a campaign. For a factory with one or two export sales staff, an hour or two a week is enough if it is spent on the right things."] = "领英最好是靠稳定的习惯，而不是靠一场运动。对只有一两个出口销售的工厂来说，每周一两个小时，只要花在对的地方就够了。";
  zh["post one piece of factory content — a production step, a test, a shipment — with a short explanation in English."] = "发一条工厂内容——一个生产环节、一次检测、一批出货——配一段简短的英文说明。";
  zh["Tuesday–Thursday:"] = "周二至周四：";
  zh["reply to comments and messages within a working day; accept relevant connection requests."] = "在一个工作日内回复评论和私信；接受相关的联系人请求。";
  zh["send a few personalised messages to buyers or engineers who engaged with your posts or visited your profile."] = "给与帖子互动或访问过你主页的买家、工程师发几条个性化消息。";
  zh["review which posts led to profile visits, website clicks or conversations, and do more of those."] = "回看哪些帖子带来了主页访问、网站点击或对话，多做这类内容。";
  zh["Many factories cannot name customers or show their parts. That does not leave you with nothing to post. Buyers want to see process, quality and people, and you can show those without revealing a client."] = "很多工厂不能点名客户，也不能展示客户的零件。但这不代表没东西可发。买家想看的是工艺、质量和人，而这些可以在不透露客户的情况下展示。";
  zh["Inspection equipment in use, with what it measures and how often."] = "检测设备的使用场景，说明测什么、多久测一次。";
  zh["Before-and-after examples of a process improvement, without customer names."] = "工艺改进的前后对比，不写客户名称。";
  zh["Certification audits passed, new equipment installed, capacity added."] = "通过的认证审核、新装设备、新增产能。";
  zh["Short explanations of a material, tolerance or standard your buyers ask about."] = "简短解释买家常问的材料、公差或标准。";
  zh["Your team: the engineer who answers technical questions, the person who handles shipping."] = "你的团队：回答技术问题的工程师、负责出货的人。";
  zh["Every LinkedIn post should have somewhere to go. Link to the matching product or capability page on your website, not just the home page. On the website, make the RFQ form short and clear, so a buyer who clicks through from LinkedIn can ask a question in a minute."] = "每条领英帖都该有个去处。链接到网站上对应的产品或能力页面，而不只是首页。网站上，询价表单要短而清楚，这样从领英点进来的买家一分钟就能提问。";
  zh["Use tagged links (UTM parameters) on the links you post, so your analytics show which LinkedIn posts lead to visits and inquiries. Without that, it is hard to tell whether LinkedIn is working."] = "在发布的链接上加标记（UTM 参数），这样分析工具能显示哪条帖子带来了访问和询盘。否则很难判断领英有没有用。";
  zh["A company page with no logo, no website link or a description copied from a marketplace."] = "公司主页没有标志、没有网站链接，或者描述是从平台上抄的。";
  zh["Sales profiles with different company names, job titles in Chinese only, or no photo."] = "销售档案写着不同的公司名、职位只有中文，或者没有照片。";
  zh["Connection requests followed immediately by a price list."] = "刚加好友就发报价单。";
  zh["Posting only product photos with “best price, contact us”, and nothing about process or quality."] = "只发产品图配“最优价格，联系我们”，完全不谈工艺或质量。";
  zh["Long gaps between posts, so the page looks abandoned when a buyer checks it."] = "帖子间隔很久，买家来查时主页像荒废了。";
  zh["Each of these is easy to fix, and fixing them matters because buyers check LinkedIn to confirm that a supplier is real before they reply."] = "这些都容易改，而且值得改，因为买家会在回复前用领英确认供应商是否真实存在。";
  zh["Website pages that LinkedIn posts can link to — product, capability and team pages."] = "领英帖可以链接到的网站页面——产品页、能力页和团队页。";
  zh["Search work so buyers who check you after LinkedIn find your own site first."] = "做好搜索，让从领英过来核查你的买家先找到你自己的网站。";
  zh["LinkedIn campaigns aimed at specific job roles, where the budget justifies it."] = "在预算允许时，针对特定岗位的领英广告。";
  zh["Company page setup, profile guidance and a weekly posting plan with your team."] = "公司主页搭建、档案指导，以及与你的团队一起定的每周发布计划。";
  zh["Do B2B buyers really use LinkedIn to check suppliers?"] = "B2B 买家真的会用领英核查供应商吗？";
  zh["Many procurement and engineering staff do, especially before replying to someone they do not know. A consistent profile reduces doubt."] = "很多采购和工程人员会，尤其是在回复不认识的人之前。一致的档案能减少疑虑。";
  zh["Should we create a company page or only personal profiles?"] = "该建公司主页，还是只做个人档案？";
  zh["Both. The company page shows the organisation; personal profiles show who buyers will deal with. Link them."] = "两者都要。公司主页展示组织，个人档案展示买家将来对接的人。把两者关联起来。";
  zh["What should we post?"] = "应该发什么？";
  zh["Real production, testing, engineering and team content you own, plus new products with links to your website. Avoid stock images and generic slogans."] = "自有的真实生产、检测、工程和团队内容，加上新产品并链接到网站。避免图库图片和空洞口号。";
  zh["How often should we post?"] = "多久发一次？";
  zh["Regularly enough to look active — often one genuine post a week is enough for a factory."] = "要保持看起来活跃——对工厂来说，每周一条真实内容往往就够了。";
  zh["Can we buy followers or connections?"] = "可以买粉丝或好友吗？";
  zh["No. Fake followers do not buy anything and can damage trust if noticed."] = "不可以。假粉丝不会买东西，被发现还会损害信任。";
  zh["Can we use LinkedIn in China?"] = "在中国能用领英吗？";
  zh["Access depends on your network setup and LinkedIn’s services in your region. Many export teams manage their pages from outside China or through partners."] = "能否访问取决于你的网络环境和领英在你所在地区提供的服务。很多出口团队从中国境外或通过合作方管理主页。";
  zh["Should we name our customers in posts?"] = "帖子里可以点名客户吗？";
  zh["Only with written permission. Otherwise describe the application or industry."] = "只有拿到书面许可才可以。否则就描述应用或行业。";
  zh["How do we measure LinkedIn results?"] = "怎么衡量领英效果？";
  zh["Count replies, meetings and RFQs that came from LinkedIn, and LinkedIn visits to your site in analytics."] = "统计来自领英的回复、会议和询价，以及分析工具里来自领英的网站访问。";
  zh["Can Hurfi manage our LinkedIn?"] = "Hurfi 能管理我们的领英吗？";
  zh["Yes. Our social media management service plans and publishes LinkedIn content with your team and links it to your website."] = "可以。我们的社媒管理服务与你的团队一起规划并发布领英内容，并链接到你的网站。";
  zh["LinkedIn Help."] = "领英帮助。";
  zh["Create a LinkedIn Page"] = "创建领英公司主页";
  zh["Diagram of the steps covered in this guide: 1. Create the company page; 2. Fix sales profiles; 3. Plan real content; 4. Link to the website; 5. Reach out carefully; 6. Measure replies."] = "本指南步骤示意图：1. 建公司主页；2. 修好销售档案；3. 规划真实内容；4. 链接到网站；5. 谨慎主动联系；6. 衡量回复。";
  zh["Trade Show Follow-Up for Manufacturers: Leads to RFQs | Hurfi"] = "制造企业的展会跟进：从名片到询价 | Hurfi";
  zh["Trade shows still bring many factories their best buyers. But most of the work happens after the fair, when buyers compare dozens of suppliers they met. This guide covers how to make sure the follow-up — and the website buyers check — works in your favour."] = "展会依然给很多工厂带来最好的买家。但大部分工作发生在展会之后，买家在那时比较他们见过的几十家供应商。这份指南讲怎么让跟进——以及买家会去查的网站——对你有利。";
  zh["Why the follow-up matters more than the booth"] = "为什么跟进比展位更重要";
  zh["Prepare your website before the fair"] = "展会前先把网站准备好";
  zh["Capture useful details at the booth"] = "在展位记录有用的信息";
  zh["Follow up within days, with the right link"] = "几天内跟进，附上对的链接";
  zh["Track every contact through to RFQ"] = "把每个联系人跟踪到询价";
  zh["Stay in touch between fairs"] = "展会之间保持联系";
  zh["A follow-up email template that works"] = "一封有效的跟进邮件模板";
  zh["A 30-day follow-up plan"] = "30 天跟进计划";
  zh["Measuring the return on a fair"] = "衡量参展回报";
  zh["Use the website between fairs"] = "展会之间用好网站";
  zh["At a large fair, a buyer may visit many booths in a day. Afterwards, they sort the contacts: who made what they need, who replied clearly, and who looks trustworthy online. The supplier that follows up fastest with useful information often gets the RFQ."] = "在大型展会上，买家一天可能走访很多展位。之后他们会梳理联系人：谁做的正是自己需要的、谁回复得清楚、谁在网上看起来可信。跟进最快、信息最有用的供应商，往往拿到询价。";
  zh["Canton Fair"] = "广交会";
  zh[", for example, has been held in Guangzhou every spring and autumn since 1957. Many buyers attend repeatedly and keep comparing suppliers between sessions."] = "就是一个例子：自 1957 年起每年春秋两届在广州举办。很多买家反复到场，并在会期之间持续比较供应商。";
  zh["Product pages for every item you will exhibit, with specifications in text"] = "为每件参展产品准备好产品页，规格用文字呈现";
  zh["A trade-show page with booth details for confirmed fairs, linking to those products"] = "一个展会页面，列出已确认展会的展位信息，并链接到这些产品";
  zh["An English contact page with the names of the people at the booth"] = "英文联系页面，写明展位上的人员姓名";
  zh["A short URL or QR code on brochures that leads to the right product section"] = "宣传册上的短链接或二维码，指向对应的产品版块";
  zh["An RFQ form that works on phones"] = "能在手机上正常使用的询价表单";
  zh["Record more than a business card: which products the buyer looked at, their market, quantity, timing and any certification needs. These notes make the follow-up specific instead of generic."] = "别只记一张名片：买家看了哪些产品、所在市场、数量、时间安排、需要的认证。这些笔记能让跟进变得具体，而不是套话。";
  zh["Send a short email that reminds the buyer who you are, answers the question they asked and links to the exact product page — not only the home page or a large catalogue. Buyers who search your company name after the fair should find your own website first."] = "发一封短邮件：提醒买家你是谁、回答他们问的问题、链接到确切的产品页——而不只是首页或一份大目录。展会之后搜索你公司名的买家，应该首先找到你自己的网站。";
  zh["Use a simple CRM or spreadsheet: contact, product interest, date of follow-up, reply, RFQ, quote. Tag website visits from fair materials (for example with campaign parameters on QR links) so you can see which fair brought which inquiries."] = "用简单的 CRM 或表格：联系人、关注产品、跟进日期、回复、询价、报价。给展会物料带来的网站访问打标记（例如在二维码链接上加活动参数），就能看出哪个展会带来了哪些询盘。";
  zh["Buyers who were not ready to order may be ready months later. Useful updates — new products, certifications, a short video of a line — keep you on their list. LinkedIn helps here too, as a second place buyers can follow and check you."] = "当时还没准备下单的买家，几个月后可能就准备好了。有用的更新——新产品、认证、一段产线短视频——能让你留在他们的名单上。领英在这里也有用，它是买家可以关注和核查你的第二个地方。";
  zh["The first email after a fair should be short, specific and easy to reply to. Mention where you met, what the visitor asked about, and give one clear next step."] = "展会后的第一封邮件应该短、具体、容易回复。提到在哪里见过、访客问过什么，并给出一个明确的下一步。";
  zh["name of the fair, your company and the product discussed."] = "展会名称、你的公司、谈到的产品。";
  zh["First line:"] = "第一句：";
  zh["where and when you met, and what they were interested in."] = "何时何地见过，以及他们关注什么。";
  zh["a link to the exact product or capability page, plus one answer to their question."] = "链接到确切的产品或能力页面，并对他们的问题给出一个答案。";
  zh["Next step:"] = "下一步：";
  zh["a specific offer — samples, a quotation, a short video call — with a date."] = "一个具体的提议——样品、报价、一次简短的视频通话——并带日期。";
  zh["name, role, direct email, WhatsApp or phone, and website."] = "姓名、职位、直接邮箱、WhatsApp 或电话，以及网站。";
  zh["first email to every qualified contact, with the right page link."] = "给每个有效联系人发第一封邮件，附上正确的页面链接。";
  zh["second touch for those who did not reply: a short note with something useful, such as a datasheet or a case without client names."] = "对没回复的人做第二次触达：一封短消息，附上有用的东西，比如数据表或不含客户名称的案例。";
  zh["connect on LinkedIn with a personal note; send quotations or samples to those who asked."] = "在领英上带个人留言添加联系；给有需求的人寄报价或样品。";
  zh["review every contact — active, paused or not a fit — and record the reason."] = "逐个复核联系人——在谈、暂停还是不合适——并记录原因。";
  zh["Booth costs, travel and samples add up. To judge whether a fair is worth repeating, track a few numbers for each one: qualified contacts, follow-ups sent, RFQs received, quotations sent and orders won, with the value of each."] = "展位、差旅和样品都是成本。要判断一个展会值不值得再去，就为每个展会记几个数：有效联系人、发出的跟进、收到的询价、发出的报价、成交订单，以及各自金额。";
  zh["Tag the links in your follow-up emails so your analytics show which fair contacts visited your site and which pages they read. Over two or three fairs, this tells you which events, products and messages bring real buyers."] = "给跟进邮件里的链接加标记，分析工具就能显示哪些展会联系人访问了网站、读了哪些页面。经过两三个展会，你就能知道哪些展会、哪些产品、哪些话术带来真实买家。";
  zh["A fair gives you a few days with buyers each year; your website works the other 360. After each fair, add what you learned: answers to the most common booth questions, pages for products that drew interest, and photos or short videos of new equipment."] = "展会一年只给你几天和买家相处的时间，网站则在其余三百六十天替你工作。每次展会后，把学到的东西补上：展位上最常被问的问题的答案、吸引关注的产品页面，以及新设备的照片或短视频。";
  zh["Buyers who could not attend — or who found you later through a colleague — will look at your site first. If it reflects what you showed at the fair, it continues the conversation the booth started."] = "没能到场的买家，或者后来经同事介绍找到你的买家，会先看你的网站。如果网站能体现你在展会展示的东西，它就延续了展位开启的那场对话。";
  zh["Product and trade-show pages ready before the fair, with mobile RFQ forms."] = "展会前备好产品页和展会页，含适合手机的询价表单。";
  zh["Search visibility for your English company name and exhibited products."] = "让英文公司名和参展产品在搜索中可见。";
  zh["Tracking links and follow-up campaigns between fair sessions."] = "展会之间的跟踪链接和跟进活动。";
  zh["LinkedIn posts before, during and after the fair, linked to product pages."] = "展会前中后的领英内容，链接到产品页。";
  zh["How soon should we follow up after a trade show?"] = "展会后多久跟进？";
  zh["Within days, while the buyer still remembers your booth. Answer their question and link to the exact product page."] = "几天之内，趁买家还记得你的展位。回答他们的问题，链接到确切的产品页。";
  zh["What should a follow-up email include?"] = "跟进邮件应该包含什么？";
  zh["A reminder of who you are, the answer to the buyer’s question, a link to the matching product page, and one clear next step."] = "提醒你是谁、回答买家的问题、链接到对应产品页，以及一个明确的下一步。";
  zh["Why does our website matter after the fair?"] = "为什么展会后网站重要？";
  zh["Buyers compare suppliers afterwards and often search your company name. Your site should confirm what they saw at the booth."] = "买家事后比较供应商，常常会搜你的公司名。网站应该印证他们在展位上看到的东西。";
  zh["When is the Canton Fair held?"] = "广交会什么时候举办？";
  zh["According to the organiser, every spring and autumn in Guangzhou. It was first held in spring 1957."] = "据主办方，每年春秋两届，地点在广州。首届于 1957 年春季举办。";
  zh["Should we make a separate page for each fair?"] = "每个展会都要单独建页吗？";
  zh["One trade-show page, updated with confirmed fairs and linking to products, is usually enough. Separate thin pages per fair add little."] = "通常一个展会页面就够：更新已确认的展会，并链接到产品。每个展会单独做一个单薄页面，意义不大。";
  zh["How do we track which fair brought an order?"] = "怎么跟踪订单来自哪个展会？";
  zh["Tag QR links and fair-specific URLs with campaign parameters, and record each contact in a CRM or sheet through to RFQ."] = "给二维码链接和展会专用网址加活动参数，并在 CRM 或表格里把每个联系人记录到询价。";
  zh["Should we connect with buyers on LinkedIn after the fair?"] = "展会后该在领英上加买家吗？";
  zh["Yes, with a personal note mentioning the fair and product. Keep your company page consistent with your website."] = "可以，附一条提到展会和产品的个人留言。公司主页要与网站保持一致。";
  zh["What if buyers do not reply?"] = "买家不回复怎么办？";
  zh["Send one or two useful follow-ups with new information, then keep in touch occasionally. Avoid repetitive messages."] = "再发一两次带新信息的跟进，然后偶尔保持联系。不要反复发重复的消息。";
  zh["Can Hurfi help us prepare for a fair?"] = "Hurfi 能帮我们准备展会吗？";
  zh["Yes. We can prepare product pages, the trade-show page, tracking links and follow-up templates."] = "可以。我们能准备产品页、展会页、跟踪链接和跟进模板。";
  zh["China Import and Export Fair (Canton Fair)."] = "中国进出口商品交易会（广交会）。";
  zh["About the Canton Fair"] = "关于广交会";
  zh["Diagram of the steps covered in this guide: 1. Prepare pages before the fair; 2. Capture details at the booth; 3. Follow up within days; 4. Send the right product page; 5. Track every contact; 6. Keep in touch."] = "本指南步骤示意图：1. 展会前准备页面；2. 展位上记录信息；3. 几天内跟进；4. 发送对的产品页；5. 跟踪每个联系人；6. 保持联系。";
  zh["Hurfi social post: a man with a magnifying glass asks “Looking for your international buyers?”"] = "Hurfi 社媒内容：一位拿着放大镜的男士问“在找你的国际买家吗？”";
  zh["Hurfi social post with a blue knotted rope: “Great products don’t sell themselves. Visibility does.”"] = "Hurfi 社媒内容：一条蓝色打结的绳子，配文“好产品不会自己卖出去，曝光才会。”";
  zh["Hurfi social post “Your factory. Your products. Your global future.” with an illustrated factory and shipping scene"] = "Hurfi 社媒内容：“你的工厂。你的产品。你的全球未来。”配插画风格的工厂与出货场景。";
  zh["Standing Out Online in a Chinese Industrial Cluster | Hurfi"] = "在中国产业集群中如何在线脱颖而出 | Hurfi";
  zh["In many Chinese cities, hundreds of factories make the same kind of product. A buyer searching for pumps, printed fabric or wigs will find dozens of suppliers that look alike. This guide explains how to make your website the one they contact."] = "在中国的很多城市，成百家工厂生产同一种产品。买家搜索泵、印花布或假发时，会看到几十家看起来差不多的供应商。这份指南讲怎么让你的网站成为他们联系的那一个。";
  zh["The cluster problem"] = "集群难题";
  zh["Find your real difference"] = "找到你真正的差别";
  zh["Prove it with specifics"] = "用具体的东西证明";
  zh["Go deeper on products than anyone else"] = "在产品上比别人讲得更深";
  zh["Show that you are the factory"] = "证明你就是工厂";
  zh["Answer questions before they are asked"] = "在问题被问之前就回答";
  zh["Write for buyers, not for keywords"] = "为买家写，不为关键词写";
  zh["Use the cluster as context, not as your message"] = "把集群当背景，而不是当卖点";
  zh["A quick self-test"] = "一个快速自测";
  zh["Let specialisation lead"] = "让专精打头";
  zh["Measure what makes buyers contact you"] = "衡量是什么让买家联系你";
  zh["Official bulletins show how concentrated some industries are. In 2025 Taizhou (Zhejiang) made 64.0521 million pumps and 202.2984 million pairs of eyeglasses, and had 9,418 exporting firms. Shaoxing made 26.349 billion metres of printed and dyed cloth. Xuchang exported 17.2 billion yuan of hair products. In places like these, “manufacturer of high-quality products” describes everyone."] = "官方公报显示有些行业集中度很高。2025 年，台州（浙江）生产水泵 6405.21 万台、眼镜 2.022984 亿副，有 9418 家出口企业。绍兴生产印染布 263.49 亿米。许昌出口发制品 172 亿元。在这样的地方，“高质量产品制造商”这句话适合所有人。";
  zh["Ask your sales team what buyers chose you for last year. The answers are usually specific:"] = "问问你的销售团队：去年买家为什么选你们？答案通常很具体：";
  zh["A product range or size others do not make."] = "别人不做的产品系列或规格。";
  zh["A material, finish or performance level."] = "某种材料、表面处理或性能水平。";
  zh["Certifications for a demanding market."] = "面向要求严格的市场的认证。";
  zh["Speed on samples or small orders."] = "打样或小单的速度。";
  zh["Engineering support or customisation."] = "工程支持或定制能力。";
  zh["Replace adjectives with facts: tolerances, test results, certificates, capacity, lead times, the number of models. Specific numbers that you can support are more convincing than any slogan."] = "用事实代替形容词：公差、检测结果、证书、产能、交期、型号数量。你能拿得出依据的具体数字，比任何口号都有说服力。";
  zh["Most cluster websites have thin product pages: a photo and a few lines. Give each product family a real page with specifications in text, applications, options and downloadable datasheets. Where it fits,"] = "集群里多数网站的产品页很单薄：一张照片加几行字。给每个产品系列做真正的一页：文字规格、应用、选项和可下载的数据表。在合适的地方，";
  zh["can help describe products to Google."] = "可以帮助向谷歌描述产品。";
  zh["Buyers in clusters often cannot tell factories from traders. Show your own production lines, testing, warehouse and team, with your own photos and captions. Give your address and say what you make in-house and what you buy in."] = "集群里的买家常常分不清工厂和贸易商。用你自己的照片和图注展示产线、检测、仓库和团队。写出地址，说明哪些自己做、哪些外购。";
  zh["MOQ and sample terms."] = "最小起订量和样品条款。";
  zh["Lead times for standard and custom products."] = "标准品和定制品交期。";
  zh["Certifications by market."] = "按市场列出的认证。";
  zh["Shipping ports and terms."] = "发货港口和条款。";
  zh["OEM and private-label options."] = "OEM 和贴牌选项。";
  zh["asks whether content provides original information and substantial value compared with other pages. In a cluster, original content means your own products, data and photos — not text copied from a neighbour’s site or a marketplace listing."] = "要求内容是否提供原创信息，并且与其他页面相比是否有实质价值。在产业集群里，原创内容就是你自己的产品、数据和照片——而不是从隔壁网站或平台店铺抄来的文字。";
  zh["Being in a well-known production city can reassure buyers about supply chains and experience. Mention it, but do not make it your main message: every competitor can say the same."] = "身处知名产城，能让买家对供应链和经验更放心。可以提，但不要把它当成主要信息：每个同行都能这么说。";
  zh["Open your home page and a competitor’s side by side. Cover the logos. If a buyer could not tell which is which, your site is not yet doing its job. Then ask:"] = "把你的首页和竞争对手的首页并排放。遮住标志。如果买家分不清哪个是哪个，你的网站还没起到作用。然后问自己：";
  zh["Does our first screen say what we make that is different?"] = "首屏有没有说清我们做的哪里不同？";
  zh["Can a buyer find a specification table in two clicks?"] = "买家点两下能找到规格表吗？";
  zh["Are the photos clearly from our factory?"] = "照片明显来自我们工厂吗？";
  zh["Do we answer MOQ, lead time and certification questions without an email?"] = "最小起订量、交期和认证的问题，不写邮件就能在网站上找到答案吗？";
  zh["Each “no” is a place to start."] = "每个“没有”，都是一个起点。";
  zh["In a cluster, specialists often win online: the supplier that makes one kind of pump, fabric or wig very well, and says so clearly. If you have a speciality, put it first. If you make a broad range, organise it so that each family has the depth a specialist would show."] = "在产业集群里，线上往往是专精者胜出：把某一种泵、布或假发做到很好，并且说得很清楚的供应商。如果你有专长，就把它放在最前面。如果产品线很宽，就组织好，让每个系列都有专精者才有的深度。";
  zh["Track which pages lead to inquiries. Over time you will see which differences buyers care about, and you can strengthen those pages first."] = "跟踪哪些页面带来询盘。时间长了，你会看出买家在意哪些差别，然后先加强这些页面。";
  zh["A site built around what makes you different, with deep product pages and your own photos."] = "围绕你的不同之处建站，配上深入的产品页和自有照片。";
  zh["Searches for exact products and specifications, where specific pages win."] = "针对确切产品和规格的搜索，具体页面更容易胜出。";
  zh["Campaigns for the products where you have a real advantage."] = "为你有真实优势的产品投广告。";
  zh["Posts that show your factory, testing and products."] = "展示你的工厂、检测和产品的帖子。";
  zh["Our products are similar to our neighbours’. How can we stand out?"] = "我们的产品和邻居差不多，怎么脱颖而出？";
  zh["With specifics: the products, materials, tests, certifications and services you offer that others do not, shown with your own data and photos."] = "靠具体的东西：别人没有的产品、材料、检测、认证和服务，并用你自己的数据和照片展示出来。";
  zh["Should we copy successful competitors’ websites?"] = "应该照抄成功同行的网站吗？";
  zh["No. Copied content does not help buyers or search. Learn from them, then show what is different about you."] = "不应该。抄来的内容帮不了买家，也帮不了搜索。向他们学习，然后展示你哪里不同。";
  zh["Is it worth naming our city?"] = "值得写出我们所在的城市吗？";
  zh["Yes, as context. But your differences, not your location, should lead."] = "值得，作为背景。但打头的应该是你的差别，而不是所在地。";
  zh["How many products should we put online?"] = "应该把多少产品放到网上？";
  zh["Start with the families that bring the best inquiries, and make those pages excellent."] = "先做带来最好询盘的那些系列，并把它们做到出色。";
  zh["Do we need our own photos?"] = "需要自己的照片吗？";
  zh["Yes. Stock or supplier photos make you look like a trader."] = "需要。图库照片或供应商给的照片，会让你看起来像贸易商。";
  zh["Can marketplaces replace our website?"] = "平台能替代我们的网站吗？";
  zh["Marketplaces can bring inquiries, but your own site is where you can show everything that makes you different."] = "平台能带来询盘，但只有自己的网站才能把你所有不同之处展示出来。";
  zh["Can Hurfi guarantee we outrank competitors?"] = "Hurfi 能保证我们排名超过竞争对手吗？";
  zh["No. Nobody can. We build better pages and report honestly from your own data."] = "不能。没人能。我们做更好的页面，并用你自己的数据如实汇报。";
  zh["Taizhou (Zhejiang) Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "台州市（浙江）统计局（公报文本据 tjgb.hongheiku.com 转载）。";
  zh["台州市2025年国民经济和社会发展统计公报 (Taizhou 2025 Statistical Bulletin)"] = "台州市2025年国民经济和社会发展统计公报 (Taizhou 2025 Statistical Bulletin)";
  zh["Shaoxing Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "绍兴市统计局（公报文本据 tjgb.hongheiku.com 转载）。";
  zh["2025年绍兴市国民经济和社会发展统计公报 (Shaoxing 2025 Statistical Bulletin)"] = "2025年绍兴市国民经济和社会发展统计公报 (Shaoxing 2025 Statistical Bulletin)";
  zh["Xuchang Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "许昌市统计局（公报文本据 tjgb.hongheiku.com 转载）。";
  zh["2025年许昌市国民经济和社会发展统计公报 (Xuchang 2025 Statistical Bulletin)"] = "2025年许昌市国民经济和社会发展统计公报 (Xuchang 2025 Statistical Bulletin)";
  zh["Diagram of the steps covered in this guide: 1. Know your difference; 2. Show specific proof; 3. Go deep on products; 4. Be the factory; 5. Answer before asked; 6. Measure and refine."] = "本指南步骤示意图：1. 认清你的差别；2. 拿出具体证据；3. 产品讲深；4. 证明是工厂；5. 抢答问题；6. 衡量并改进。";
  fr["LinkedIn for Factory Export Sales: A Practical Guide | Hurfi"] = "LinkedIn pour la vente export d’une usine : guide pratique | Hurfi";
  fr["When a factory’s sales manager emails an overseas buyer, the buyer often looks up the person and the company on LinkedIn before replying. A blank or inconsistent profile costs trust. This guide covers what a manufacturer needs on LinkedIn and how to keep it working without fabricating anything."] = "Quand le responsable commercial d’une usine écrit à un acheteur étranger, celui-ci cherche souvent la personne et l’entreprise sur LinkedIn avant de répondre. Un profil vide ou incohérent coûte de la confiance. Ce guide couvre ce dont un industriel a besoin sur LinkedIn, sans rien inventer.";
  fr["Why LinkedIn matters to overseas buyers"] = "Pourquoi LinkedIn compte pour les acheteurs étrangers";
  fr["Set up the company page properly"] = "Bien configurer la page entreprise";
  fr["Make sales profiles consistent"] = "Rendre les profils commerciaux cohérents";
  fr["Post what only your factory can show"] = "Publier ce que seule votre usine peut montrer";
  fr["Reach out without spamming"] = "Approcher sans spammer";
  fr["A weekly routine for a small export team"] = "Une routine hebdomadaire pour une petite équipe export";
  fr["What to post when you cannot show customers"] = "Que publier quand on ne peut pas montrer de clients";
  fr["Connect LinkedIn to your website"] = "Relier LinkedIn à votre site";
  fr["Mistakes that make factories look unreliable"] = "Les erreurs qui font paraître une usine peu fiable";
  fr["LinkedIn is where many procurement and engineering staff check a supplier and the person contacting them. They look for consistency: does the company page match the website, does the salesperson work there, and is there evidence of real production?"] = "Beaucoup de responsables achats et d’ingénieurs vérifient un fournisseur et son interlocuteur sur LinkedIn. Ils cherchent la cohérence : la page entreprise correspond-elle au site, le commercial y travaille-t-il, et y a-t-il des preuves de production réelle ?";
  fr["A LinkedIn presence does not replace a website. It is a second place to check you, and it should point to the website for details."] = "Une présence LinkedIn ne remplace pas un site. C’est un second endroit où l’on vous vérifie, et elle doit renvoyer au site pour les détails.";
  fr["LinkedIn Help explains how to"] = "L’aide LinkedIn explique comment";
  fr["create a LinkedIn Page"] = "créer une page LinkedIn";
  fr["for a company. Use your English company name exactly as it appears on your website and documents, your website URL, your real location and a short description of what you make."] = "pour une entreprise. Utilisez votre raison sociale anglaise exactement comme sur le site et les documents, l’URL du site, votre localisation réelle et une courte description de ce que vous fabriquez.";
  fr["Logo and cover image you own"] = "Un logo et une image de couverture que vous possédez";
  fr["Description that names your products and the industries you serve"] = "Une description nommant vos produits et les secteurs servis";
  fr["Website link to the English site"] = "Un lien vers le site anglais";
  fr["Location matching your factory address"] = "Une localisation correspondant à l’adresse de l’usine";
  fr["At least two admins from your company"] = "Au moins deux administrateurs de votre société";
  fr["Each person who contacts buyers should have a profile with their real name, a professional photo, their role and the company page linked as their employer. Buyers notice when a salesperson’s profile is empty or lists a different company."] = "Chaque personne en contact avec les acheteurs doit avoir un profil avec son vrai nom, une photo professionnelle, sa fonction et la page entreprise comme employeur. Les acheteurs remarquent un profil vide ou rattaché à une autre société.";
  fr["The most useful posts show things buyers cannot see elsewhere: a new line being installed, a test being run, an engineer explaining a design choice, packaging for an export order (without client names). One genuine post a week beats daily generic content."] = "Les publications les plus utiles montrent ce que l’acheteur ne voit pas ailleurs : une nouvelle ligne en installation, un essai en cours, un ingénieur expliquant un choix de conception, l’emballage d’une commande export (sans noms de clients). Une vraie publication par semaine vaut mieux qu’un contenu générique quotidien.";
  fr["Production and testing photos or short videos you own"] = "Des photos ou courtes vidéos de production et d’essais que vous possédez";
  fr["Trade-show dates and booth details for confirmed fairs"] = "Les dates et stands des salons confirmés";
  fr["Certifications when you receive them, with scope"] = "Les certifications à leur réception, avec leur périmètre";
  fr["Introductions to engineers and sales staff"] = "Des présentations d’ingénieurs et de commerciaux";
  fr["Links to new product pages on your website"] = "Des liens vers les nouvelles pages produit";
  fr["Connection requests and messages work best when they are specific: why you are contacting this person, what you make that is relevant to them, and a link to the right product page. Mass messages with no context damage your reputation and can restrict your account."] = "Les demandes de contact et messages fonctionnent mieux s’ils sont précis : pourquoi vous contactez cette personne, ce que vous fabriquez qui la concerne, et un lien vers la bonne page produit. Les envois massifs sans contexte nuisent à votre réputation et peuvent restreindre votre compte.";
  fr["Track replies, meetings and RFQs that started on LinkedIn, and visits from LinkedIn to your website in analytics. Follower counts are less important than whether the right buyers engage."] = "Suivez les réponses, rendez-vous et demandes nés sur LinkedIn, ainsi que les visites LinkedIn vers votre site dans l’outil d’analyse. Le nombre d’abonnés compte moins que l’engagement des bons acheteurs.";
  fr["LinkedIn works best as a steady habit, not a campaign. For a factory with one or two export sales staff, an hour or two a week is enough if it is spent on the right things."] = "LinkedIn fonctionne mieux comme une habitude régulière que comme une campagne. Pour une usine avec un ou deux commerciaux export, une à deux heures par semaine suffisent si elles sont bien employées.";
  fr["post one piece of factory content — a production step, a test, a shipment — with a short explanation in English."] = "publier un contenu d’usine — une étape de production, un essai, une expédition — avec une courte explication en anglais.";
  fr["Tuesday–Thursday:"] = "Du mardi au jeudi :";
  fr["reply to comments and messages within a working day; accept relevant connection requests."] = "répondre aux commentaires et messages dans la journée ouvrée ; accepter les demandes de contact pertinentes.";
  fr["send a few personalised messages to buyers or engineers who engaged with your posts or visited your profile."] = "envoyer quelques messages personnalisés aux acheteurs ou ingénieurs ayant interagi avec vos publications ou visité votre profil.";
  fr["review which posts led to profile visits, website clicks or conversations, and do more of those."] = "examiner quelles publications ont généré des visites de profil, des clics ou des conversations, et en faire davantage.";
  fr["Many factories cannot name customers or show their parts. That does not leave you with nothing to post. Buyers want to see process, quality and people, and you can show those without revealing a client."] = "Beaucoup d’usines ne peuvent pas nommer leurs clients ni montrer leurs pièces. Cela ne laisse pas sans contenu. Les acheteurs veulent voir le procédé, la qualité et les personnes, et cela se montre sans dévoiler de client.";
  fr["Inspection equipment in use, with what it measures and how often."] = "L’équipement de contrôle en usage, ce qu’il mesure et à quelle fréquence.";
  fr["Before-and-after examples of a process improvement, without customer names."] = "Des exemples avant/après d’une amélioration de procédé, sans noms de clients.";
  fr["Certification audits passed, new equipment installed, capacity added."] = "Des audits de certification réussis, de nouveaux équipements, de la capacité ajoutée.";
  fr["Short explanations of a material, tolerance or standard your buyers ask about."] = "De courtes explications sur un matériau, une tolérance ou une norme que vos acheteurs demandent.";
  fr["Your team: the engineer who answers technical questions, the person who handles shipping."] = "Votre équipe : l’ingénieur qui répond aux questions techniques, la personne qui gère les expéditions.";
  fr["Every LinkedIn post should have somewhere to go. Link to the matching product or capability page on your website, not just the home page. On the website, make the RFQ form short and clear, so a buyer who clicks through from LinkedIn can ask a question in a minute."] = "Chaque publication doit mener quelque part. Renvoyez à la page produit ou capacité correspondante, pas seulement à l’accueil. Sur le site, gardez le formulaire court et clair, pour qu’un acheteur venu de LinkedIn puisse poser sa question en une minute.";
  fr["Use tagged links (UTM parameters) on the links you post, so your analytics show which LinkedIn posts lead to visits and inquiries. Without that, it is hard to tell whether LinkedIn is working."] = "Utilisez des liens balisés (paramètres UTM) dans vos publications, pour que l’analyse montre quelles publications amènent visites et demandes. Sans cela, difficile de savoir si LinkedIn fonctionne.";
  fr["A company page with no logo, no website link or a description copied from a marketplace."] = "Une page entreprise sans logo, sans lien vers le site, ou avec une description copiée d’une marketplace.";
  fr["Sales profiles with different company names, job titles in Chinese only, or no photo."] = "Des profils commerciaux avec un autre nom d’entreprise, des intitulés uniquement en chinois, ou sans photo.";
  fr["Connection requests followed immediately by a price list."] = "Des demandes de contact suivies immédiatement d’une liste de prix.";
  fr["Posting only product photos with “best price, contact us”, and nothing about process or quality."] = "Ne publier que des photos produit avec « meilleur prix, contactez-nous », sans rien sur le procédé ou la qualité.";
  fr["Long gaps between posts, so the page looks abandoned when a buyer checks it."] = "De longs silences entre publications, si bien que la page semble abandonnée quand un acheteur la consulte.";
  fr["Each of these is easy to fix, and fixing them matters because buyers check LinkedIn to confirm that a supplier is real before they reply."] = "Chacun se corrige facilement, et cela compte : les acheteurs vérifient sur LinkedIn qu’un fournisseur existe avant de répondre.";
  fr["Website pages that LinkedIn posts can link to — product, capability and team pages."] = "Des pages du site vers lesquelles renvoyer — produit, capacités et équipe.";
  fr["Search work so buyers who check you after LinkedIn find your own site first."] = "Un travail de recherche pour que les acheteurs qui vérifient après LinkedIn trouvent d’abord votre site.";
  fr["LinkedIn campaigns aimed at specific job roles, where the budget justifies it."] = "Des campagnes LinkedIn ciblant des fonctions précises, lorsque le budget le justifie.";
  fr["Company page setup, profile guidance and a weekly posting plan with your team."] = "Configuration de la page entreprise, conseils de profil et plan de publication hebdomadaire avec votre équipe.";
  fr["Do B2B buyers really use LinkedIn to check suppliers?"] = "Les acheteurs B2B utilisent-ils vraiment LinkedIn pour vérifier un fournisseur ?";
  fr["Many procurement and engineering staff do, especially before replying to someone they do not know. A consistent profile reduces doubt."] = "Beaucoup de responsables achats et d’ingénieurs le font, surtout avant de répondre à un inconnu. Un profil cohérent réduit le doute.";
  fr["Should we create a company page or only personal profiles?"] = "Faut-il créer une page entreprise ou seulement des profils personnels ?";
  fr["Both. The company page shows the organisation; personal profiles show who buyers will deal with. Link them."] = "Les deux. La page entreprise montre l’organisation ; les profils montrent à qui l’acheteur aura affaire. Reliez-les.";
  fr["What should we post?"] = "Que faut-il publier ?";
  fr["Real production, testing, engineering and team content you own, plus new products with links to your website. Avoid stock images and generic slogans."] = "Du contenu réel de production, d’essais, d’ingénierie et d’équipe que vous possédez, plus les nouveaux produits avec liens vers le site. Évitez les images de banque et les slogans creux.";
  fr["How often should we post?"] = "À quelle fréquence publier ?";
  fr["Regularly enough to look active — often one genuine post a week is enough for a factory."] = "Assez régulièrement pour paraître actif — souvent une vraie publication par semaine suffit pour une usine.";
  fr["Can we buy followers or connections?"] = "Peut-on acheter des abonnés ou des contacts ?";
  fr["No. Fake followers do not buy anything and can damage trust if noticed."] = "Non. De faux abonnés n’achètent rien et nuisent à la confiance s’ils sont repérés.";
  fr["Can we use LinkedIn in China?"] = "Peut-on utiliser LinkedIn en Chine ?";
  fr["Access depends on your network setup and LinkedIn’s services in your region. Many export teams manage their pages from outside China or through partners."] = "L’accès dépend de votre réseau et des services LinkedIn dans votre région. Beaucoup d’équipes export gèrent leurs pages depuis l’étranger ou via des partenaires.";
  fr["Should we name our customers in posts?"] = "Faut-il nommer ses clients dans les publications ?";
  fr["Only with written permission. Otherwise describe the application or industry."] = "Seulement avec une autorisation écrite. Sinon, décrivez l’application ou le secteur.";
  fr["How do we measure LinkedIn results?"] = "Comment mesurer les résultats LinkedIn ?";
  fr["Count replies, meetings and RFQs that came from LinkedIn, and LinkedIn visits to your site in analytics."] = "Comptez les réponses, rendez-vous et demandes venus de LinkedIn, et les visites LinkedIn sur le site dans l’analyse.";
  fr["Can Hurfi manage our LinkedIn?"] = "Hurfi peut-il gérer notre LinkedIn ?";
  fr["Yes. Our social media management service plans and publishes LinkedIn content with your team and links it to your website."] = "Oui. Notre service de gestion des réseaux sociaux planifie et publie le contenu LinkedIn avec votre équipe et le relie au site.";
  fr["LinkedIn Help."] = "Aide LinkedIn.";
  fr["Create a LinkedIn Page"] = "Créer une page LinkedIn";
  fr["Diagram of the steps covered in this guide: 1. Create the company page; 2. Fix sales profiles; 3. Plan real content; 4. Link to the website; 5. Reach out carefully; 6. Measure replies."] = "Schéma des étapes : 1. Créer la page entreprise ; 2. Corriger les profils ; 3. Planifier du contenu réel ; 4. Relier au site ; 5. Approcher avec soin ; 6. Mesurer les réponses.";
  fr["Trade Show Follow-Up for Manufacturers: Leads to RFQs | Hurfi"] = "Suivi de salon pour industriels : des contacts aux demandes | Hurfi";
  fr["Trade shows still bring many factories their best buyers. But most of the work happens after the fair, when buyers compare dozens of suppliers they met. This guide covers how to make sure the follow-up — and the website buyers check — works in your favour."] = "Les salons apportent encore à beaucoup d’usines leurs meilleurs acheteurs. Mais l’essentiel se joue après, quand l’acheteur compare les dizaines de fournisseurs rencontrés. Ce guide explique comment faire travailler pour vous le suivi — et le site que l’acheteur consulte.";
  fr["Why the follow-up matters more than the booth"] = "Pourquoi le suivi compte plus que le stand";
  fr["Prepare your website before the fair"] = "Préparer le site avant le salon";
  fr["Capture useful details at the booth"] = "Recueillir des informations utiles sur le stand";
  fr["Follow up within days, with the right link"] = "Relancer en quelques jours, avec le bon lien";
  fr["Track every contact through to RFQ"] = "Suivre chaque contact jusqu’à la demande";
  fr["Stay in touch between fairs"] = "Rester en contact entre les salons";
  fr["A follow-up email template that works"] = "Un modèle d’e-mail de suivi qui fonctionne";
  fr["A 30-day follow-up plan"] = "Un plan de suivi sur 30 jours";
  fr["Measuring the return on a fair"] = "Mesurer le retour d’un salon";
  fr["Use the website between fairs"] = "Utiliser le site entre les salons";
  fr["At a large fair, a buyer may visit many booths in a day. Afterwards, they sort the contacts: who made what they need, who replied clearly, and who looks trustworthy online. The supplier that follows up fastest with useful information often gets the RFQ."] = "Dans un grand salon, un acheteur peut visiter beaucoup de stands en une journée. Ensuite, il trie les contacts : qui fabrique ce qu’il cherche, qui répond clairement, qui inspire confiance en ligne. Le fournisseur qui relance le plus vite avec des informations utiles obtient souvent la demande.";
  fr["Canton Fair"] = "Foire de Canton";
  fr[", for example, has been held in Guangzhou every spring and autumn since 1957. Many buyers attend repeatedly and keep comparing suppliers between sessions."] = ", par exemple, se tient à Guangzhou chaque printemps et chaque automne depuis 1957. Beaucoup d’acheteurs y viennent régulièrement et continuent de comparer les fournisseurs entre deux sessions.";
  fr["Product pages for every item you will exhibit, with specifications in text"] = "Des pages produit pour chaque article exposé, avec spécifications en texte";
  fr["A trade-show page with booth details for confirmed fairs, linking to those products"] = "Une page salon avec les stands des salons confirmés, renvoyant à ces produits";
  fr["An English contact page with the names of the people at the booth"] = "Une page de contact en anglais avec les noms des personnes présentes sur le stand";
  fr["A short URL or QR code on brochures that leads to the right product section"] = "Une URL courte ou un QR code sur les brochures, menant à la bonne section produit";
  fr["An RFQ form that works on phones"] = "Un formulaire de demande utilisable sur téléphone";
  fr["Record more than a business card: which products the buyer looked at, their market, quantity, timing and any certification needs. These notes make the follow-up specific instead of generic."] = "Notez plus qu’une carte de visite : quels produits l’acheteur a regardés, son marché, les quantités, le calendrier et les certifications nécessaires. Ces notes rendent le suivi précis plutôt que générique.";
  fr["Send a short email that reminds the buyer who you are, answers the question they asked and links to the exact product page — not only the home page or a large catalogue. Buyers who search your company name after the fair should find your own website first."] = "Envoyez un e-mail court qui rappelle qui vous êtes, répond à la question posée et renvoie à la page produit exacte — pas seulement à l’accueil ou à un gros catalogue. Un acheteur qui cherche votre nom après le salon doit trouver d’abord votre propre site.";
  fr["Use a simple CRM or spreadsheet: contact, product interest, date of follow-up, reply, RFQ, quote. Tag website visits from fair materials (for example with campaign parameters on QR links) so you can see which fair brought which inquiries."] = "Utilisez un CRM simple ou un tableur : contact, produit d’intérêt, date de relance, réponse, demande, devis. Balisez les visites issues des supports de salon (par exemple avec des paramètres de campagne sur les QR codes) pour voir quel salon a apporté quelles demandes.";
  fr["Buyers who were not ready to order may be ready months later. Useful updates — new products, certifications, a short video of a line — keep you on their list. LinkedIn helps here too, as a second place buyers can follow and check you."] = "Un acheteur qui n’était pas prêt peut l’être des mois plus tard. Des nouvelles utiles — produits, certifications, une courte vidéo de ligne — vous gardent sur sa liste. LinkedIn aide aussi, comme second endroit où suivre et vérifier.";
  fr["The first email after a fair should be short, specific and easy to reply to. Mention where you met, what the visitor asked about, and give one clear next step."] = "Le premier e-mail après un salon doit être court, précis et facile à traiter. Rappelez où vous vous êtes rencontrés, ce que le visiteur a demandé, et proposez une seule étape claire.";
  fr["name of the fair, your company and the product discussed."] = "le nom du salon, votre société et le produit discuté.";
  fr["First line:"] = "Première ligne :";
  fr["where and when you met, and what they were interested in."] = "où et quand vous vous êtes rencontrés, et ce qui les intéressait.";
  fr["a link to the exact product or capability page, plus one answer to their question."] = "un lien vers la page produit ou capacité exacte, plus une réponse à leur question.";
  fr["Next step:"] = "Prochaine étape :";
  fr["a specific offer — samples, a quotation, a short video call — with a date."] = "une offre précise — échantillons, devis, court appel vidéo — avec une date.";
  fr["name, role, direct email, WhatsApp or phone, and website."] = "nom, fonction, e-mail direct, WhatsApp ou téléphone, et site web.";
  fr["first email to every qualified contact, with the right page link."] = "premier e-mail à chaque contact qualifié, avec le bon lien de page.";
  fr["second touch for those who did not reply: a short note with something useful, such as a datasheet or a case without client names."] = "deuxième contact pour ceux qui n’ont pas répondu : un mot court avec quelque chose d’utile, comme une fiche technique ou un cas sans noms de clients.";
  fr["connect on LinkedIn with a personal note; send quotations or samples to those who asked."] = "se connecter sur LinkedIn avec un mot personnel ; envoyer devis ou échantillons à ceux qui l’ont demandé.";
  fr["review every contact — active, paused or not a fit — and record the reason."] = "revoir chaque contact — actif, en pause ou hors cible — et noter la raison.";
  fr["Booth costs, travel and samples add up. To judge whether a fair is worth repeating, track a few numbers for each one: qualified contacts, follow-ups sent, RFQs received, quotations sent and orders won, with the value of each."] = "Stand, déplacements et échantillons coûtent. Pour juger si un salon mérite d’être refait, suivez quelques chiffres par salon : contacts qualifiés, relances envoyées, demandes reçues, devis envoyés et commandes gagnées, avec leur valeur.";
  fr["Tag the links in your follow-up emails so your analytics show which fair contacts visited your site and which pages they read. Over two or three fairs, this tells you which events, products and messages bring real buyers."] = "Balisez les liens de vos e-mails de suivi pour que l’analyse montre quels contacts de salon ont visité le site et quelles pages ils ont lues. Sur deux ou trois salons, vous saurez quels événements, produits et messages amènent de vrais acheteurs.";
  fr["A fair gives you a few days with buyers each year; your website works the other 360. After each fair, add what you learned: answers to the most common booth questions, pages for products that drew interest, and photos or short videos of new equipment."] = "Un salon offre quelques jours par an avec les acheteurs ; votre site travaille les 360 autres. Après chaque salon, ajoutez ce que vous avez appris : réponses aux questions les plus posées sur le stand, pages pour les produits qui ont attiré, photos ou vidéos des nouveaux équipements.";
  fr["Buyers who could not attend — or who found you later through a colleague — will look at your site first. If it reflects what you showed at the fair, it continues the conversation the booth started."] = "Les acheteurs absents — ou qui vous découvrent plus tard par un collègue — regarderont d’abord votre site. S’il reflète ce que vous montriez au salon, il prolonge la conversation commencée sur le stand.";
  fr["Product and trade-show pages ready before the fair, with mobile RFQ forms."] = "Des pages produit et salon prêtes avant le salon, avec formulaires mobiles.";
  fr["Search visibility for your English company name and exhibited products."] = "Une visibilité de recherche sur votre nom anglais et les produits exposés.";
  fr["Tracking links and follow-up campaigns between fair sessions."] = "Des liens de suivi et des campagnes de relance entre les sessions.";
  fr["LinkedIn posts before, during and after the fair, linked to product pages."] = "Des publications LinkedIn avant, pendant et après le salon, liées aux pages produit.";
  fr["How soon should we follow up after a trade show?"] = "Combien de temps après un salon faut-il relancer ?";
  fr["Within days, while the buyer still remembers your booth. Answer their question and link to the exact product page."] = "Dans les jours qui suivent, tant que l’acheteur se souvient du stand. Répondez à sa question et renvoyez à la page produit exacte.";
  fr["What should a follow-up email include?"] = "Que doit contenir un e-mail de suivi ?";
  fr["A reminder of who you are, the answer to the buyer’s question, a link to the matching product page, and one clear next step."] = "Un rappel de qui vous êtes, la réponse à sa question, un lien vers la page produit correspondante et une étape claire.";
  fr["Why does our website matter after the fair?"] = "Pourquoi le site compte-t-il après le salon ?";
  fr["Buyers compare suppliers afterwards and often search your company name. Your site should confirm what they saw at the booth."] = "Les acheteurs comparent après coup et cherchent souvent votre nom. Votre site doit confirmer ce qu’ils ont vu sur le stand.";
  fr["When is the Canton Fair held?"] = "Quand a lieu la Foire de Canton ?";
  fr["According to the organiser, every spring and autumn in Guangzhou. It was first held in spring 1957."] = "Selon l’organisateur, chaque printemps et chaque automne à Guangzhou. La première édition a eu lieu au printemps 1957.";
  fr["Should we make a separate page for each fair?"] = "Faut-il une page par salon ?";
  fr["One trade-show page, updated with confirmed fairs and linking to products, is usually enough. Separate thin pages per fair add little."] = "Une seule page salon, mise à jour avec les salons confirmés et liée aux produits, suffit en général. Des pages creuses par salon apportent peu.";
  fr["How do we track which fair brought an order?"] = "Comment savoir de quel salon vient une commande ?";
  fr["Tag QR links and fair-specific URLs with campaign parameters, and record each contact in a CRM or sheet through to RFQ."] = "Balisez les QR codes et URL propres au salon avec des paramètres de campagne, et enregistrez chaque contact jusqu’à la demande.";
  fr["Should we connect with buyers on LinkedIn after the fair?"] = "Faut-il se connecter aux acheteurs sur LinkedIn après le salon ?";
  fr["Yes, with a personal note mentioning the fair and product. Keep your company page consistent with your website."] = "Oui, avec un mot personnel mentionnant le salon et le produit. Gardez la page entreprise cohérente avec le site.";
  fr["What if buyers do not reply?"] = "Et si les acheteurs ne répondent pas ?";
  fr["Send one or two useful follow-ups with new information, then keep in touch occasionally. Avoid repetitive messages."] = "Envoyez une ou deux relances utiles avec du nouveau, puis gardez le contact occasionnellement. Évitez les messages répétitifs.";
  fr["Can Hurfi help us prepare for a fair?"] = "Hurfi peut-il nous aider à préparer un salon ?";
  fr["Yes. We can prepare product pages, the trade-show page, tracking links and follow-up templates."] = "Oui. Nous préparons les pages produit, la page salon, les liens de suivi et les modèles de relance.";
  fr["China Import and Export Fair (Canton Fair)."] = "Foire d’import-export de Chine (Foire de Canton).";
  fr["About the Canton Fair"] = "À propos de la Foire de Canton";
  fr["Diagram of the steps covered in this guide: 1. Prepare pages before the fair; 2. Capture details at the booth; 3. Follow up within days; 4. Send the right product page; 5. Track every contact; 6. Keep in touch."] = "Schéma des étapes : 1. Préparer les pages avant le salon ; 2. Noter les détails sur le stand ; 3. Relancer en quelques jours ; 4. Envoyer la bonne page produit ; 5. Suivre chaque contact ; 6. Rester en contact.";
  fr["Hurfi social post: a man with a magnifying glass asks “Looking for your international buyers?”"] = "Publication Hurfi : un homme avec une loupe demande « Vous cherchez vos acheteurs internationaux ? »";
  fr["Hurfi social post with a blue knotted rope: “Great products don’t sell themselves. Visibility does.”"] = "Publication Hurfi avec une corde bleue nouée : « Les bons produits ne se vendent pas seuls. La visibilité, si. »";
  fr["Hurfi social post “Your factory. Your products. Your global future.” with an illustrated factory and shipping scene"] = "Publication Hurfi : « Votre usine. Vos produits. Votre avenir mondial. » avec une illustration d’usine et d’expédition.";
  fr["Standing Out Online in a Chinese Industrial Cluster | Hurfi"] = "Se démarquer en ligne dans un cluster industriel chinois | Hurfi";
  fr["In many Chinese cities, hundreds of factories make the same kind of product. A buyer searching for pumps, printed fabric or wigs will find dozens of suppliers that look alike. This guide explains how to make your website the one they contact."] = "Dans beaucoup de villes chinoises, des centaines d’usines fabriquent le même type de produit. Un acheteur qui cherche des pompes, du tissu imprimé ou des perruques trouve des dizaines de fournisseurs qui se ressemblent. Ce guide explique comment faire de votre site celui qu’il contacte.";
  fr["The cluster problem"] = "Le problème du cluster";
  fr["Find your real difference"] = "Trouver votre vraie différence";
  fr["Prove it with specifics"] = "Le prouver par des faits précis";
  fr["Go deeper on products than anyone else"] = "Aller plus loin que les autres sur les produits";
  fr["Show that you are the factory"] = "Montrer que vous êtes l’usine";
  fr["Answer questions before they are asked"] = "Répondre avant que la question soit posée";
  fr["Write for buyers, not for keywords"] = "Écrire pour les acheteurs, pas pour les mots-clés";
  fr["Use the cluster as context, not as your message"] = "Utiliser le cluster comme contexte, pas comme message";
  fr["A quick self-test"] = "Un auto-test rapide";
  fr["Let specialisation lead"] = "Laisser la spécialisation mener";
  fr["Measure what makes buyers contact you"] = "Mesurer ce qui fait contacter";
  fr["Official bulletins show how concentrated some industries are. In 2025 Taizhou (Zhejiang) made 64.0521 million pumps and 202.2984 million pairs of eyeglasses, and had 9,418 exporting firms. Shaoxing made 26.349 billion metres of printed and dyed cloth. Xuchang exported 17.2 billion yuan of hair products. In places like these, “manufacturer of high-quality products” describes everyone."] = "Les bulletins officiels montrent la concentration de certains secteurs. En 2025, Taizhou (Zhejiang) a produit 64,0521 millions de pompes et 202,2984 millions de paires de lunettes, avec 9 418 entreprises exportatrices. Shaoxing a produit 26,349 milliards de mètres de tissu imprimé et teint. Xuchang a exporté pour 17,2 milliards de yuans de produits capillaires. Dans ces villes, « fabricant de produits de haute qualité » décrit tout le monde.";
  fr["Ask your sales team what buyers chose you for last year. The answers are usually specific:"] = "Demandez à vos commerciaux pourquoi les acheteurs les ont choisis l’an dernier. Les réponses sont généralement précises :";
  fr["A product range or size others do not make."] = "Une gamme ou une taille que les autres ne font pas.";
  fr["A material, finish or performance level."] = "Un matériau, une finition ou un niveau de performance.";
  fr["Certifications for a demanding market."] = "Des certifications pour un marché exigeant.";
  fr["Speed on samples or small orders."] = "La rapidité sur les échantillons ou petites séries.";
  fr["Engineering support or customisation."] = "Le support d’ingénierie ou la personnalisation.";
  fr["Replace adjectives with facts: tolerances, test results, certificates, capacity, lead times, the number of models. Specific numbers that you can support are more convincing than any slogan."] = "Remplacez les adjectifs par des faits : tolérances, résultats d’essais, certificats, capacité, délais, nombre de modèles. Des chiffres précis et justifiables convainquent plus que n’importe quel slogan.";
  fr["Most cluster websites have thin product pages: a photo and a few lines. Give each product family a real page with specifications in text, applications, options and downloadable datasheets. Where it fits,"] = "La plupart des sites de cluster ont des pages produit minces : une photo et quelques lignes. Donnez à chaque famille une vraie page avec spécifications en texte, applications, options et fiches téléchargeables. Lorsque cela convient,";
  fr["can help describe products to Google."] = "peuvent aider à décrire les produits à Google.";
  fr["Buyers in clusters often cannot tell factories from traders. Show your own production lines, testing, warehouse and team, with your own photos and captions. Give your address and say what you make in-house and what you buy in."] = "Dans un cluster, les acheteurs distinguent mal usines et négociants. Montrez vos lignes, vos contrôles, votre entrepôt et votre équipe, avec vos propres photos et légendes. Donnez votre adresse et précisez ce que vous fabriquez et ce que vous achetez.";
  fr["MOQ and sample terms."] = "Quantité minimale et conditions d’échantillons.";
  fr["Lead times for standard and custom products."] = "Délais pour produits standard et sur mesure.";
  fr["Certifications by market."] = "Les certifications par marché.";
  fr["Shipping ports and terms."] = "Ports et conditions d’expédition.";
  fr["OEM and private-label options."] = "Options OEM et marque blanche.";
  fr["asks whether content provides original information and substantial value compared with other pages. In a cluster, original content means your own products, data and photos — not text copied from a neighbour’s site or a marketplace listing."] = "demandent si le contenu apporte une information originale et une valeur substantielle par rapport aux autres pages. Dans un cluster, le contenu original, ce sont vos produits, vos données et vos photos — pas un texte copié du site voisin ou d’une fiche marketplace.";
  fr["Being in a well-known production city can reassure buyers about supply chains and experience. Mention it, but do not make it your main message: every competitor can say the same."] = "Être dans une ville de production connue rassure sur les chaînes d’approvisionnement et l’expérience. Mentionnez-le, mais n’en faites pas votre message principal : chaque concurrent peut en dire autant.";
  fr["Open your home page and a competitor’s side by side. Cover the logos. If a buyer could not tell which is which, your site is not yet doing its job. Then ask:"] = "Ouvrez votre page d’accueil et celle d’un concurrent côte à côte. Cachez les logos. Si un acheteur ne peut pas les distinguer, votre site ne fait pas encore son travail. Demandez-vous ensuite :";
  fr["Does our first screen say what we make that is different?"] = "Notre premier écran dit-il ce que nous faisons de différent ?";
  fr["Can a buyer find a specification table in two clicks?"] = "Un acheteur trouve-t-il un tableau de spécifications en deux clics ?";
  fr["Are the photos clearly from our factory?"] = "Les photos viennent-elles clairement de notre usine ?";
  fr["Do we answer MOQ, lead time and certification questions without an email?"] = "Répondons-nous aux questions de quantité minimale, de délai et de certification sans e-mail ?";
  fr["Each “no” is a place to start."] = "Chaque « non » est un point de départ.";
  fr["In a cluster, specialists often win online: the supplier that makes one kind of pump, fabric or wig very well, and says so clearly. If you have a speciality, put it first. If you make a broad range, organise it so that each family has the depth a specialist would show."] = "Dans un cluster, les spécialistes gagnent souvent en ligne : le fournisseur qui maîtrise un type de pompe, de tissu ou de perruque, et le dit clairement. Si vous avez une spécialité, mettez-la en avant. Si votre gamme est large, organisez-la pour que chaque famille ait la profondeur d’un spécialiste.";
  fr["Track which pages lead to inquiries. Over time you will see which differences buyers care about, and you can strengthen those pages first."] = "Suivez les pages qui génèrent des demandes. Avec le temps, vous verrez quelles différences comptent pour les acheteurs, et vous renforcerez ces pages en premier.";
  fr["A site built around what makes you different, with deep product pages and your own photos."] = "Un site construit autour de ce qui vous distingue, avec des pages produit approfondies et vos propres photos.";
  fr["Searches for exact products and specifications, where specific pages win."] = "Des recherches sur des produits et spécifications exacts, où les pages précises gagnent.";
  fr["Campaigns for the products where you have a real advantage."] = "Des campagnes sur les produits où vous avez un vrai avantage.";
  fr["Posts that show your factory, testing and products."] = "Des publications montrant votre usine, vos essais et vos produits.";
  fr["Our products are similar to our neighbours’. How can we stand out?"] = "Nos produits ressemblent à ceux des voisins. Comment se démarquer ?";
  fr["With specifics: the products, materials, tests, certifications and services you offer that others do not, shown with your own data and photos."] = "Par des faits précis : les produits, matériaux, essais, certifications et services que les autres n’ont pas, montrés avec vos propres données et photos.";
  fr["Should we copy successful competitors’ websites?"] = "Faut-il copier le site de concurrents qui réussissent ?";
  fr["No. Copied content does not help buyers or search. Learn from them, then show what is different about you."] = "Non. Un contenu copié n’aide ni les acheteurs ni la recherche. Apprenez d’eux, puis montrez ce qui vous distingue.";
  fr["Is it worth naming our city?"] = "Vaut-il la peine de nommer notre ville ?";
  fr["Yes, as context. But your differences, not your location, should lead."] = "Oui, comme contexte. Mais ce sont vos différences, pas votre localisation, qui doivent mener.";
  fr["How many products should we put online?"] = "Combien de produits mettre en ligne ?";
  fr["Start with the families that bring the best inquiries, and make those pages excellent."] = "Commencez par les familles qui apportent les meilleures demandes, et rendez ces pages excellentes.";
  fr["Do we need our own photos?"] = "Faut-il nos propres photos ?";
  fr["Yes. Stock or supplier photos make you look like a trader."] = "Oui. Des photos de banque ou fournies par un fournisseur vous font passer pour un négociant.";
  fr["Can marketplaces replace our website?"] = "Les marketplaces peuvent-elles remplacer le site ?";
  fr["Marketplaces can bring inquiries, but your own site is where you can show everything that makes you different."] = "Les marketplaces apportent des demandes, mais c’est votre site qui montre tout ce qui vous distingue.";
  fr["Can Hurfi guarantee we outrank competitors?"] = "Hurfi peut-il garantir que nous dépasserons nos concurrents ?";
  fr["No. Nobody can. We build better pages and report honestly from your own data."] = "Non. Personne. Nous construisons de meilleures pages et rapportons honnêtement depuis vos données.";
  fr["Taizhou (Zhejiang) Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "Bureau des statistiques de Taizhou (Zhejiang) (texte du bulletin tel que reproduit par tjgb.hongheiku.com).";
  fr["台州市2025年国民经济和社会发展统计公报 (Taizhou 2025 Statistical Bulletin)"] = "台州市2025年国民经济和社会发展统计公报 (Bulletin statistique 2025 de Taizhou)";
  fr["Shaoxing Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "Bureau des statistiques de Shaoxing (texte du bulletin tel que reproduit par tjgb.hongheiku.com).";
  fr["2025年绍兴市国民经济和社会发展统计公报 (Shaoxing 2025 Statistical Bulletin)"] = "2025年绍兴市国民经济和社会发展统计公报 (Bulletin statistique 2025 de Shaoxing)";
  fr["Xuchang Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "Bureau des statistiques de Xuchang (texte du bulletin tel que reproduit par tjgb.hongheiku.com).";
  fr["2025年许昌市国民经济和社会发展统计公报 (Xuchang 2025 Statistical Bulletin)"] = "2025年许昌市国民经济和社会发展统计公报 (Bulletin statistique 2025 de Xuchang)";
  fr["Diagram of the steps covered in this guide: 1. Know your difference; 2. Show specific proof; 3. Go deep on products; 4. Be the factory; 5. Answer before asked; 6. Measure and refine."] = "Schéma des étapes : 1. Connaître sa différence ; 2. Prouver par des faits ; 3. Approfondir les produits ; 4. Être l’usine ; 5. Répondre avant la question ; 6. Mesurer et affiner.";


  // Insight articles: 2025 export markets, shipping page, 2026-10-20.
  zh["Where Chinese Exports Grew and Fell in 2025 | Hurfi"] = "2025 年中国出口哪里增长、哪里下滑 | Hurfi";
  zh["Official 2025 statistical bulletins tell a clear story: exports to the United States fell in many places, while sales to the EU, ASEAN and Africa grew in several provinces and cities. This guide pulls together the figures we checked for our location guides and explains what they mean for an export website."] = "官方的 2025 年统计公报讲了一个清楚的故事：很多地方对美出口下滑，而若干省市对欧盟、东盟和非洲的销售在增长。这份指南汇总了我们为城市指南核对过的数字，并说明它们对出口网站意味着什么。";
  zh["What the bulletins measure"] = "公报衡量的是什么";
  zh["Inland provinces grew fastest"] = "内陆省份增长最快";
  zh["Some coastal economies fell"] = "部分沿海经济体下滑";
  zh["The United States fell, other markets grew"] = "对美下滑，其他市场增长";
  zh["Check your own data first"] = "先看你自己的数据";
  zh["Pick two or three markets you can really serve"] = "选两三个你真正服务得了的市场";
  zh["Prepare the rules before the page"] = "先弄清规则，再做页面";
  zh["Build market pages that help buyers"] = "做真正帮到买家的市场页";
  zh["Measure, then adjust"] = "衡量之后再调整";
  zh["Each Chinese province and city publishes an annual statistical bulletin (统计公报) with goods trade, exports and, often, exports by market. We use them because they are official and comparable. They describe whole regions, not your company: use them for context, then check your own orders and inquiries."] = "中国的每个省和市都会发布年度统计公报（统计公报），包含货物贸易、出口，很多时候还有分市场出口。我们用它们，因为它们是官方的、可比的。它们描述的是整个地区，而不是你的公司：用它们做背景，然后核对你自己的订单和询盘。";
  zh["Several inland provinces reported strong export growth in 2025:"] = "2025 年有几个内陆省份报告了强劲的出口增长：";
  zh["Hubei: exports up 19.6% to 581.86 billion yuan, with trade with the EU up 40.2%."] = "湖北：出口增长 19.6%，达 5818.6 亿元，对欧盟贸易增长 40.2%。";
  zh["Henan: exports up 18.0% to 616.818 billion yuan."] = "河南：出口增长 18.0%，达 6168.18 亿元。";
  zh["Anhui: exports up 17.8% to 682.31 billion yuan; trade with ASEAN up 38.3% and with the EU 21.6%."] = "安徽：出口增长 17.8%，达 6823.1 亿元；对东盟贸易增长 38.3%，对欧盟增长 21.6%。";
  zh["Much of this was driven by vehicles, batteries and electronics. Anhui’s bulletin, for example, reports vehicle exports of 1.228 million units and exports of electric vehicles, lithium-ion batteries and solar products up 107.8%."] = "其中很大部分由汽车、电池和电子产品带动。以安徽公报为例，汽车出口 122.8 万辆，电动汽车、锂电池和光伏产品出口增长 107.8%。";
  zh["Other bulletins show declines:"] = "另一些公报则显示下滑：";
  zh["Fujian: exports down 6.7% to 1,155.362 billion yuan, with exports to the United States down 22.1% and to ASEAN 18.0% — but exports to the EU up 9.7%."] = "福建：出口下降 6.7%，为 11553.62 亿元，其中对美出口下降 22.1%，对东盟下降 18.0%——但对欧盟出口增长 9.7%。";
  zh["Fuzhou: exports down 32.0% to 174.73 billion yuan, falling in the US, EU and ASEAN."] = "福州：出口下降 32.0%，为 1747.3 亿元，对美、对欧、对东盟均下滑。";
  zh["Hunan: exports down 4.1%; exports to the United States down 29.2%, while exports to ASEAN rose 5.5%."] = "湖南：出口下降 4.1%；对美出口下降 29.2%，而对东盟出口增长 5.5%。";
  zh["Sichuan: exports down 1.5% to 608.65 billion yuan."] = "四川：出口下降 1.5%，为 6086.5 亿元。";
  zh["City bulletins that list markets show the same pattern again and again:"] = "列出分市场的城市公报，一遍又一遍地显示同样的格局：";
  zh["Nantong: exports to the EU up 20.7%, ASEAN 20.9% and Africa 15.8%; to the United States down 19.3%."] = "南通：对欧盟出口增长 20.7%，对东盟 20.9%，对非洲 15.8%；对美下降 19.3%。";
  zh["Taizhou (Zhejiang): exports to the EU up 6.3%; to the United States down 14.4%."] = "台州（浙江）：对欧盟出口增长 6.3%；对美下降 14.4%。";
  zh["Ningde: exports to the EU up 66.4%; to the United States down 13.5%."] = "宁德：对欧盟出口增长 66.4%；对美下降 13.5%。";
  zh["For many exporters, the question in 2026 is not whether to look beyond the United States, but which markets to prepare for first."] = "对很多出口商来说，2026 年的问题不是要不要把眼光放到美国之外，而是先为哪些市场做准备。";
  zh["Regional figures do not tell you where your products sell. Before you plan anything, look at your own last two years:"] = "地区数字不会告诉你你的产品卖到哪里。做任何计划之前，先看你自己过去两年的情况：";
  zh["Orders and revenue by country."] = "按国家分的订单和收入。";
  zh["Website inquiries and RFQs by country."] = "按国家分的网站询盘和询价。";
  zh["Searches and clicks by country in Search Console."] = "Search Console 里按国家分的搜索和点击。";
  zh["Which countries ask for samples but do not order — and why."] = "哪些国家要样品却不下单——以及为什么。";
  zh["A market is worth a page only if you can meet its rules and serve its buyers. For each candidate, ask:"] = "只有当你满足得了市场规则、服务得了那里的买家，这个市场才值得做一页。对每个候选市场问：";
  zh["Do we hold the certifications this market requires?"] = "我们有没有这个市场要求的认证？";
  zh["Can we quote the delivery terms buyers there expect?"] = "我们能不能报出那里买家期望的交付条款？";
  zh["Can we answer inquiries in time, in a language they use?"] = "我们能不能及时用他们使用的语言回复询盘？";
  zh["Do we have at least a few customers or references there?"] = "我们在那里至少有几个客户或案例吗？";
  zh["For the EU, for example, the European Commission explains that manufacturers must carry out the conformity assessment, prepare the technical file, issue the EU declaration of conformity and affix the CE marking where it applies ("] = "以欧盟为例，欧盟委员会说明：制造商必须进行合格评定、编制技术文件、出具欧盟符合性声明，并在适用处加贴 CE 标志（";
  zh["). A market page that promises compliance you do not have does more harm than no page at all."] = "）。承诺你并不具备的合规性，比完全没有页面更糟。";
  zh["Good market pages are specific: the products you sell there, the standards and certificates that apply, the delivery terms you offer, references in the region and who will answer. Google’s guidance on"] = "好的市场页很具体：你在那里卖的产品、适用的标准和证书、你提供的交付条款、当地的案例，以及由谁来回复。谷歌关于";
  zh["explains the URL and language options if you add translated versions."] = "的指南解释了增加翻译版本时的网址和语言选项。";
  zh["Track inquiries by market from the first week. After three to six months you will know which markets respond and which need different products, prices or terms. Statistics point the way; your own data decides."] = "从第一周起就按市场跟踪询盘。三到六个月后，你会知道哪些市场有反应，哪些需要不同的产品、价格或条款。统计指方向，你自己的数据做决定。";
  zh["Market pages built around the products, rules and terms that apply in each market."] = "围绕各市场适用的产品、规则和条款来做市场页。";
  zh["Search Console reports by country, so you see which markets respond."] = "Search Console 提供按国家的报告，能看出哪些市场有反应。";
  zh["Campaigns tested in a few chosen markets before larger budgets."] = "在少数选定市场先做测试，再投入更大预算。";
  zh["Social content planned for the platforms used in your target markets."] = "按目标市场常用的平台规划社媒内容。";
  zh["Where do these figures come from?"] = "这些数字从哪里来？";
  zh["From the 2025 statistical bulletins of each province or city, published by their statistics bureaus. Every figure is listed in the sources below."] = "来自各省市统计局发布的 2025 年统计公报。每个数字都列在下方来源中。";
  zh["Do these figures predict my sales?"] = "这些数字能预测我的销售吗？";
  zh["No. They describe whole regions. Use them for context and check your own orders and inquiries."] = "不能。它们描述的是整个地区。用它们做背景，并核对你自己的订单和询盘。";
  zh["Should we stop selling to the United States?"] = "我们应该停止对美销售吗？";
  zh["That is a business decision we cannot make for you. Many exporters are adding markets rather than leaving one."] = "这是商业决策，我们无法替你做。很多出口商是在增加市场，而不是离开某个市场。";
  zh["Which markets should we target next?"] = "下一步该瞄准哪些市场？";
  zh["The ones where you hold the right certifications, can quote the right terms and already have some customers or interest."] = "那些你持有正确认证、能报出正确条款、并且已有一些客户或兴趣的市场。";
  zh["How many market pages should we build?"] = "应该做多少个市场页？";
  zh["Start with two or three strong ones. Thin pages for every country rarely help buyers or search."] = "先做两三个扎实的。给每个国家做一个单薄页面，对买家和搜索都少有帮助。";
  zh["Do we need translated sites?"] = "需要做翻译站吗？";
  zh["Only where buyers prefer another language and you can answer them in it."] = "只在买家偏好其他语言、而且你能用那种语言回复的地方才需要。";
  zh["Can Hurfi guarantee results in new markets?"] = "Hurfi 能保证新市场的效果吗？";
  zh["No. Nobody can. We plan carefully and report honestly from your own data."] = "不能。没人能。我们仔细规划，并用你自己的数据如实汇报。";
  zh["Henan Provincial Bureau of Statistics and NBS Henan Survey Team (bulletin dated 16 April 2026, as republished by ifeng.com)."] = "河南省统计局、国家统计局河南调查总队（公报日期 2026 年 4 月 16 日，据 ifeng.com 转载）。";
  zh["Anhui Provincial Bureau of Statistics and NBS Anhui Survey Team (bulletin as published by Anhui Economic News, 19 March 2026)."] = "安徽省统计局、国家统计局安徽调查总队（公报据《安徽经济报》2026 年 3 月 19 日刊发）。";
  zh["Fujian Provincial Bureau of Statistics and NBS Fujian Survey Team."] = "福建省统计局、国家统计局福建调查总队。";
  zh["Fuzhou Statistics Bureau and NBS Fuzhou Survey Team."] = "福州市统计局、国家统计局福州调查队。";
  zh["Sichuan Provincial Bureau of Statistics and NBS Sichuan Survey Team (bulletin as published by Sichuan Daily’s Chuanguan News)."] = "四川省统计局、国家统计局四川调查总队（公报据《四川日报》川观新闻刊发）。";
  zh["Ningde Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "宁德市统计局（公报文本据 tjgb.hongheiku.com 转载）。";
  zh["Diagram of the steps covered in this guide: 1. Read the official figures; 2. See which markets grew; 3. Check your own data; 4. Pick two or three markets; 5. Prepare rules and terms; 6. Build market pages."] = "本指南步骤示意图：1. 读官方数字；2. 看哪些市场增长；3. 核对自己的数据；4. 选两三个市场；5. 准备规则和条款；6. 做市场页。";
  zh["The Shipping & Logistics Page for Exporters | Hurfi"] = "出口商的运输与物流页面 | Hurfi";
  zh["“Which port? Which terms? How long?” Almost every overseas buyer asks these questions, often before asking about price. A clear shipping and logistics page answers them once, builds confidence and saves your sales team many emails. This guide explains what to include."] = "“哪个港口？什么条款？要多久？”几乎每个海外买家都会问这些问题，而且常在问价格之前。一个清楚的运输与物流页面能一次回答完，建立信任，还能替你销售团队省下很多邮件。这份指南讲该写什么。";
  zh["Why buyers care so much"] = "为什么买家这么在意";
  zh["Use Incoterms correctly"] = "正确使用 Incoterms";
  zh["Name your ports and routes"] = "写明港口和路线";
  zh["Explain packing"] = "说明包装";
  zh["Give realistic lead times"] = "给出真实的交期";
  zh["Samples and small orders"] = "样品和小单";
  zh["Documents and special cargo"] = "单证和特殊货物";
  zh["Link it from every product page"] = "从每个产品页链接过去";
  zh["A checklist for the page"] = "页面清单";
  zh["Show it, do not just say it"] = "展示出来，而不只是说";
  zh["Keep it honest and current"] = "保持诚实和更新";
  zh["A buyer has to land your product at their door at a known cost and on a known date. If they cannot work that out, they cannot compare you with other suppliers. A shipping page turns an unknown into something they can plan."] = "买家必须能以已知的成本、在已知的日期把产品送到自己门口。如果算不出来，他们就没法把你和其他供应商比较。一个运输页面，把未知变成他们能规划的东西。";
  zh["The International Chamber of Commerce describes the"] = "国际商会把";
  zh["Incoterms® rules"] = "《Incoterms® 规则》";
  zh["as eleven three-letter trade terms that clarify the tasks, costs and risks involved in delivering goods from sellers to buyers. Say which terms you usually offer and name the version you use, for example Incoterms® 2020."] = "描述为十一个三字母贸易术语，用来明确从卖方到买方交付货物所涉及的任务、费用和风险。写明你通常提供哪些术语，并注明所用版本，例如 Incoterms® 2020。";
  zh["Do not list every term if you only quote two or three. Be clear about what you will and will not arrange."] = "如果你只报两三个术语，就不要把所有术语都列上。说清你会安排什么、不会安排什么。";
  zh["Tell buyers where goods leave China. Many manufacturers ship through large container ports — Jiaxing’s port, for example, handled 4.255 million TEU in 2025 and Fujian’s ports 18.4364 million TEU. Inland suppliers should explain how goods reach the coast or travel by rail."] = "告诉买家货物从哪里离开中国。很多制造企业经由大型集装箱港口出货——例如嘉兴港 2025 年完成 425.5 万标箱，福建港口完成 1843.64 万标箱。内陆供应商应当说明货物如何到达沿海，或如何经铁路运输。";
  zh["Main port(s) of loading."] = "主要装货港。";
  zh["Rail or river routes if you use them."] = "如使用铁路或内河路线，写明。";
  zh["Air freight for samples or urgent orders."] = "样品或急单的空运。";
  zh["Typical transit times to your main markets, as ranges."] = "到主要市场的典型运输时间，用区间表示。";
  zh["Standard export packing for each product family."] = "每个产品系列的标准出口包装。";
  zh["Pallet, crate or carton options and dimensions."] = "托盘、木箱或纸箱选项及尺寸。";
  zh["Container loading: how many units per 20′ or 40′ container, if useful."] = "集装箱装载：如适用，写明 20 尺或 40 尺柜能装多少件。";
  zh["Marking, labelling and documents that travel with the goods."] = "随货的唛头、标签和单证。";
  zh["Give ranges for standard products, custom products and repeat orders, and say what affects them: materials, tooling, testing or season. Buyers trust realistic ranges more than promises that turn out to be wrong."] = "分别给出标准品、定制品和返单的交期区间，并说明受什么影响：材料、模具、检测还是季节。买家更信任真实的区间，而不是后来被证明不对的承诺。";
  zh["Many relationships start with a sample. Explain how buyers can get one, what it costs, how it is shipped and how long it takes. If you accept small trial orders, say so and give the minimum."] = "很多合作从样品开始。说明买家怎么拿到样品、费用多少、如何寄送、需要多久。如果接受小批量试单，就写明，并给出最低数量。";
  zh["List the export documents you routinely supply, and explain how you handle special cases such as oversized machinery or goods that need dangerous-goods handling. Do not claim capabilities you do not have; say instead which forwarders or partners you work with."] = "列出你通常提供的出口单证，并说明如何处理特殊情况，比如超大型机械或需要危险品操作的货物。不要声称自己没有的能力；改为说明你与哪些货代或伙伴合作。";
  zh["Put a short “Shipping and lead times” line on each product page with a link to the full page. Add the shipping page to your main navigation or footer and to your XML sitemap. A buyer should never have to search for it."] = "在每个产品页加一行简短的“运输与交期”，链接到完整页面。把运输页放进主导航或页脚，也放进 XML 站点地图。买家不该需要去“找”它。";
  zh["Ports of loading and any inland routes."] = "装货港和任何内陆路线。";
  zh["Incoterms you usually quote, with the version."] = "你通常报的 Incoterms，并注明版本。";
  zh["Packing by product family, with photos."] = "按产品系列说明包装，配照片。";
  zh["Lead-time ranges for samples, standard and custom orders."] = "样品、标准品和定制品各自的交期区间。";
  zh["Documents you supply with each shipment."] = "每批货随附的单证。";
  zh["Who to contact for a freight quote."] = "运费报价找谁。";
  zh["If you can tick every item, most buyers will have the information they need to compare you and ask for a quote."] = "如果每一项都能打勾，多数买家就拿到了比较你并询价所需的信息。";
  zh["Photos and short videos of packing, loading and containers leaving your factory are some of the most convincing content an exporter can publish. They show care, capacity and that you really ship — things buyers cannot judge from text alone."] = "包装、装柜和集装箱驶出工厂的照片与短视频，是出口商能发布的最有说服力的内容之一。它们展示了用心、产能，以及你真的在出货——这些是买家仅凭文字判断不了的。";
  zh["Freight rates and transit times change. Avoid quoting fixed prices; give the information that stays stable — ports, terms, packing and ranges — and invite buyers to request a current quote."] = "运价和运输时间会变。避免报固定价格；给出稳定的信息——港口、条款、包装和区间——并邀请买家索取当前报价。";
  zh["A shipping and logistics page linked from every product page."] = "一个从每个产品页链接过去的运输与物流页面。";
  zh["A clear site structure and sitemap so buyers and search engines find it."] = "清晰的网站结构和站点地图，让买家和搜索引擎都能找到它。";
  zh["Landing pages that answer delivery questions for each campaign market."] = "为每个投放市场回答交付问题的落地页。";
  zh["Posts that show packing, loading and shipments."] = "展示包装、装柜和出货的帖子。";
  zh["What are Incoterms?"] = "什么是 Incoterms？";
  zh["The ICC describes them as eleven three-letter trade terms that clarify the tasks, costs and risks in delivering goods from seller to buyer."] = "国际商会将其描述为十一个三字母贸易术语，用来明确从卖方到买方交付货物中的任务、费用和风险。";
  zh["Should we publish freight prices?"] = "应该公布运价吗？";
  zh["Usually not. Rates change. Publish ports, terms, packing and lead-time ranges, and quote freight on request."] = "通常不必。运价会变。公布港口、条款、包装和交期区间，运费按需报价。";
  zh["We are an inland supplier. What should we say?"] = "我们是内陆供应商，该怎么说？";
  zh["Explain how goods reach the port or travel by rail, and give realistic transit times."] = "说明货物如何到达港口或经铁路运输，并给出真实的运输时间。";
  zh["Should the shipping page list every Incoterm?"] = "运输页要列出所有 Incoterms 吗？";
  zh["No. List the terms you usually offer and name the version."] = "不用。列出你通常提供的术语，并注明版本。";
  zh["Do buyers care about packing?"] = "买家在意包装吗？";
  zh["Yes, especially for machinery, fragile goods and long routes. Photos of real packing help."] = "在意，尤其是机械、易碎品和长途运输。真实包装的照片有帮助。";
  zh["Where should the page appear?"] = "这个页面应该放在哪里？";
  zh["In the navigation or footer, linked from every product page, and in your sitemap."] = "放在导航或页脚，从每个产品页链接，并放进站点地图。";
  zh["Can Hurfi write this page for us?"] = "Hurfi 能帮我们写这个页面吗？";
  zh["Yes. We draft it from your team’s information and your logistics staff approve every detail."] = "可以。我们根据你团队提供的信息起草，由你的物流人员逐项确认。";
  zh["International Chamber of Commerce (ICC)."] = "国际商会（ICC）。";
  zh["Jiaxing Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "嘉兴市统计局（公报文本据 tjgb.hongheiku.com 转载）。";
  zh["Diagram of the steps covered in this guide: 1. Name your ports; 2. State your terms; 3. Explain packing; 4. Give lead times; 5. Cover samples; 6. Link from products."] = "本指南步骤示意图：1. 写明港口；2. 说明条款；3. 解释包装；4. 给出交期；5. 覆盖样品；6. 从产品页链接。";
  fr["Where Chinese Exports Grew and Fell in 2025 | Hurfi"] = "Où les exportations chinoises ont progressé et reculé en 2025 | Hurfi";
  fr["Official 2025 statistical bulletins tell a clear story: exports to the United States fell in many places, while sales to the EU, ASEAN and Africa grew in several provinces and cities. This guide pulls together the figures we checked for our location guides and explains what they mean for an export website."] = "Les bulletins statistiques officiels de 2025 racontent une histoire claire : les exportations vers les États-Unis ont reculé en de nombreux endroits, tandis que les ventes vers l’UE, l’ASEAN et l’Afrique ont progressé dans plusieurs provinces et villes. Ce guide rassemble les chiffres vérifiés pour nos guides de localisation et explique ce qu’ils impliquent pour un site export.";
  fr["What the bulletins measure"] = "Ce que mesurent les bulletins";
  fr["Inland provinces grew fastest"] = "Les provinces intérieures ont le plus progressé";
  fr["Some coastal economies fell"] = "Certaines économies côtières ont reculé";
  fr["The United States fell, other markets grew"] = "Recul des États-Unis, croissance ailleurs";
  fr["Check your own data first"] = "Commencez par vos propres données";
  fr["Pick two or three markets you can really serve"] = "Choisissez deux ou trois marchés que vous pouvez vraiment servir";
  fr["Prepare the rules before the page"] = "Préparez les règles avant la page";
  fr["Build market pages that help buyers"] = "Construisez des pages marché utiles";
  fr["Measure, then adjust"] = "Mesurez, puis ajustez";
  fr["Each Chinese province and city publishes an annual statistical bulletin (统计公报) with goods trade, exports and, often, exports by market. We use them because they are official and comparable. They describe whole regions, not your company: use them for context, then check your own orders and inquiries."] = "Chaque province et ville chinoise publie un bulletin statistique annuel (统计公报) avec le commerce de marchandises, les exportations et souvent les exportations par marché. Nous les utilisons parce qu’ils sont officiels et comparables. Ils décrivent des régions entières, pas votre entreprise : servez-vous-en comme contexte, puis vérifiez vos commandes et demandes.";
  fr["Several inland provinces reported strong export growth in 2025:"] = "Plusieurs provinces intérieures ont annoncé une forte croissance des exportations en 2025 :";
  fr["Hubei: exports up 19.6% to 581.86 billion yuan, with trade with the EU up 40.2%."] = "Hubei : exportations en hausse de 19,6 % à 581,86 milliards de yuans, commerce avec l’UE en hausse de 40,2 %.";
  fr["Henan: exports up 18.0% to 616.818 billion yuan."] = "Henan : exportations en hausse de 18,0 % à 616,818 milliards de yuans.";
  fr["Anhui: exports up 17.8% to 682.31 billion yuan; trade with ASEAN up 38.3% and with the EU 21.6%."] = "Anhui : exportations en hausse de 17,8 % à 682,31 milliards de yuans ; commerce avec l’ASEAN en hausse de 38,3 % et avec l’UE de 21,6 %.";
  fr["Much of this was driven by vehicles, batteries and electronics. Anhui’s bulletin, for example, reports vehicle exports of 1.228 million units and exports of electric vehicles, lithium-ion batteries and solar products up 107.8%."] = "Une grande partie est portée par les véhicules, batteries et l’électronique. Le bulletin de l’Anhui indique par exemple 1,228 million de véhicules exportés et des exportations de véhicules électriques, batteries lithium-ion et produits solaires en hausse de 107,8 %.";
  fr["Other bulletins show declines:"] = "D’autres bulletins montrent des reculs :";
  fr["Fujian: exports down 6.7% to 1,155.362 billion yuan, with exports to the United States down 22.1% and to ASEAN 18.0% — but exports to the EU up 9.7%."] = "Fujian : exportations en baisse de 6,7 % à 1 155,362 milliards de yuans, dont −22,1 % vers les États-Unis et −18,0 % vers l’ASEAN — mais +9,7 % vers l’UE.";
  fr["Fuzhou: exports down 32.0% to 174.73 billion yuan, falling in the US, EU and ASEAN."] = "Fuzhou : exportations en baisse de 32,0 % à 174,73 milliards de yuans, en recul vers les États-Unis, l’UE et l’ASEAN.";
  fr["Hunan: exports down 4.1%; exports to the United States down 29.2%, while exports to ASEAN rose 5.5%."] = "Hunan : exportations en baisse de 4,1 % ; −29,2 % vers les États-Unis, tandis que les exportations vers l’ASEAN progressent de 5,5 %.";
  fr["Sichuan: exports down 1.5% to 608.65 billion yuan."] = "Sichuan : exportations en baisse de 1,5 % à 608,65 milliards de yuans.";
  fr["City bulletins that list markets show the same pattern again and again:"] = "Les bulletins de villes qui détaillent les marchés montrent le même schéma encore et encore :";
  fr["Nantong: exports to the EU up 20.7%, ASEAN 20.9% and Africa 15.8%; to the United States down 19.3%."] = "Nantong : exportations vers l’UE +20,7 %, l’ASEAN +20,9 % et l’Afrique +15,8 % ; −19,3 % vers les États-Unis.";
  fr["Taizhou (Zhejiang): exports to the EU up 6.3%; to the United States down 14.4%."] = "Taizhou (Zhejiang) : exportations vers l’UE +6,3 % ; −14,4 % vers les États-Unis.";
  fr["Ningde: exports to the EU up 66.4%; to the United States down 13.5%."] = "Ningde : exportations vers l’UE +66,4 % ; −13,5 % vers les États-Unis.";
  fr["For many exporters, the question in 2026 is not whether to look beyond the United States, but which markets to prepare for first."] = "Pour beaucoup d’exportateurs, la question en 2026 n’est pas de savoir s’il faut regarder au-delà des États-Unis, mais quels marchés préparer en premier.";
  fr["Regional figures do not tell you where your products sell. Before you plan anything, look at your own last two years:"] = "Les chiffres régionaux ne disent pas où se vendent vos produits. Avant de planifier, regardez vos deux dernières années :";
  fr["Orders and revenue by country."] = "Les commandes et le chiffre d’affaires par pays.";
  fr["Website inquiries and RFQs by country."] = "Les demandes et RFQ du site par pays.";
  fr["Searches and clicks by country in Search Console."] = "Les impressions et clics par pays dans Search Console.";
  fr["Which countries ask for samples but do not order — and why."] = "Quels pays demandent des échantillons sans commander — et pourquoi.";
  fr["A market is worth a page only if you can meet its rules and serve its buyers. For each candidate, ask:"] = "Un marché mérite une page seulement si vous pouvez respecter ses règles et servir ses acheteurs. Pour chaque candidat, demandez-vous :";
  fr["Do we hold the certifications this market requires?"] = "Avons-nous les certifications exigées par ce marché ?";
  fr["Can we quote the delivery terms buyers there expect?"] = "Pouvons-nous proposer les conditions de livraison attendues ?";
  fr["Can we answer inquiries in time, in a language they use?"] = "Pouvons-nous répondre à temps, dans une langue qu’ils utilisent ?";
  fr["Do we have at least a few customers or references there?"] = "Avons-nous au moins quelques clients ou références sur place ?";
  fr["For the EU, for example, the European Commission explains that manufacturers must carry out the conformity assessment, prepare the technical file, issue the EU declaration of conformity and affix the CE marking where it applies ("] = "Pour l’UE, par exemple, la Commission européenne explique que le fabricant doit réaliser l’évaluation de conformité, constituer le dossier technique, établir la déclaration UE de conformité et apposer le marquage CE lorsqu’il s’applique (";
  fr["). A market page that promises compliance you do not have does more harm than no page at all."] = "). Une page marché qui promet une conformité que vous n’avez pas nuit plus que l’absence de page.";
  fr["Good market pages are specific: the products you sell there, the standards and certificates that apply, the delivery terms you offer, references in the region and who will answer. Google’s guidance on"] = "Les bonnes pages marché sont précises : les produits vendus, les normes et certificats applicables, les conditions de livraison proposées, des références locales et la personne qui répond. Les conseils de Google sur";
  fr["explains the URL and language options if you add translated versions."] = "expliquent les options d’URL et de langue si vous ajoutez des versions traduites.";
  fr["Track inquiries by market from the first week. After three to six months you will know which markets respond and which need different products, prices or terms. Statistics point the way; your own data decides."] = "Suivez les demandes par marché dès la première semaine. Après trois à six mois, vous saurez quels marchés répondent et lesquels exigent d’autres produits, prix ou conditions. Les statistiques indiquent la direction ; vos données décident.";
  fr["Market pages built around the products, rules and terms that apply in each market."] = "Des pages marché construites autour des produits, règles et conditions propres à chaque marché.";
  fr["Search Console reports by country, so you see which markets respond."] = "Search Console fournit des rapports par pays, pour voir quels marchés répondent.";
  fr["Campaigns tested in a few chosen markets before larger budgets."] = "Des campagnes testées sur quelques marchés choisis avant des budgets plus larges.";
  fr["Social content planned for the platforms used in your target markets."] = "Un contenu social pensé pour les plateformes utilisées sur vos marchés cibles.";
  fr["Where do these figures come from?"] = "D’où viennent ces chiffres ?";
  fr["From the 2025 statistical bulletins of each province or city, published by their statistics bureaus. Every figure is listed in the sources below."] = "Des bulletins statistiques 2025 de chaque province ou ville, publiés par leurs bureaux des statistiques. Chaque chiffre figure dans les sources ci-dessous.";
  fr["Do these figures predict my sales?"] = "Ces chiffres prédisent-ils mes ventes ?";
  fr["No. They describe whole regions. Use them for context and check your own orders and inquiries."] = "Non. Ils décrivent des régions entières. Servez-vous-en comme contexte et vérifiez vos commandes et demandes.";
  fr["Should we stop selling to the United States?"] = "Faut-il cesser de vendre aux États-Unis ?";
  fr["That is a business decision we cannot make for you. Many exporters are adding markets rather than leaving one."] = "C’est une décision commerciale que nous ne pouvons pas prendre pour vous. Beaucoup d’exportateurs ajoutent des marchés plutôt que d’en quitter un.";
  fr["Which markets should we target next?"] = "Quels marchés cibler ensuite ?";
  fr["The ones where you hold the right certifications, can quote the right terms and already have some customers or interest."] = "Ceux où vous avez les bonnes certifications, pouvez proposer les bonnes conditions et avez déjà des clients ou de l’intérêt.";
  fr["How many market pages should we build?"] = "Combien de pages marché créer ?";
  fr["Start with two or three strong ones. Thin pages for every country rarely help buyers or search."] = "Commencez par deux ou trois solides. Des pages creuses pour chaque pays aident rarement les acheteurs ou la recherche.";
  fr["Do we need translated sites?"] = "Faut-il des sites traduits ?";
  fr["Only where buyers prefer another language and you can answer them in it."] = "Seulement là où les acheteurs préfèrent une autre langue et où vous pouvez leur répondre dans cette langue.";
  fr["Can Hurfi guarantee results in new markets?"] = "Hurfi peut-il garantir des résultats sur de nouveaux marchés ?";
  fr["No. Nobody can. We plan carefully and report honestly from your own data."] = "Non. Personne. Nous planifions avec soin et rapportons honnêtement depuis vos données.";
  fr["Henan Provincial Bureau of Statistics and NBS Henan Survey Team (bulletin dated 16 April 2026, as republished by ifeng.com)."] = "Bureau provincial des statistiques du Henan et équipe d’enquête du NBS pour le Henan (bulletin du 16 avril 2026, repris par ifeng.com).";
  fr["Anhui Provincial Bureau of Statistics and NBS Anhui Survey Team (bulletin as published by Anhui Economic News, 19 March 2026)."] = "Bureau provincial des statistiques de l’Anhui et équipe d’enquête du NBS pour l’Anhui (bulletin publié par Anhui Economic News, 19 mars 2026).";
  fr["Fujian Provincial Bureau of Statistics and NBS Fujian Survey Team."] = "Bureau provincial des statistiques du Fujian et équipe d’enquête du NBS pour le Fujian.";
  fr["Fuzhou Statistics Bureau and NBS Fuzhou Survey Team."] = "Bureau des statistiques de Fuzhou et équipe d’enquête du NBS pour Fuzhou.";
  fr["Sichuan Provincial Bureau of Statistics and NBS Sichuan Survey Team (bulletin as published by Sichuan Daily’s Chuanguan News)."] = "Bureau provincial des statistiques du Sichuan et équipe d’enquête du NBS pour le Sichuan (bulletin publié par Chuanguan News du Sichuan Daily).";
  fr["Ningde Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "Bureau des statistiques de Ningde (texte du bulletin repris par tjgb.hongheiku.com).";
  fr["Diagram of the steps covered in this guide: 1. Read the official figures; 2. See which markets grew; 3. Check your own data; 4. Pick two or three markets; 5. Prepare rules and terms; 6. Build market pages."] = "Schéma des étapes : 1. Lire les chiffres officiels ; 2. Voir quels marchés progressent ; 3. Vérifier vos données ; 4. Choisir deux ou trois marchés ; 5. Préparer règles et conditions ; 6. Créer les pages marché.";
  fr["The Shipping & Logistics Page for Exporters | Hurfi"] = "La page transport et logistique pour exportateurs | Hurfi";
  fr["“Which port? Which terms? How long?” Almost every overseas buyer asks these questions, often before asking about price. A clear shipping and logistics page answers them once, builds confidence and saves your sales team many emails. This guide explains what to include."] = "« Quel port ? Quelles conditions ? Combien de temps ? » Presque tout acheteur étranger pose ces questions, souvent avant celle du prix. Une page transport et logistique claire y répond une fois, rassure et épargne beaucoup d’e-mails à vos commerciaux. Ce guide explique quoi y mettre.";
  fr["Why buyers care so much"] = "Pourquoi cela compte tant";
  fr["Use Incoterms correctly"] = "Bien utiliser les Incoterms";
  fr["Name your ports and routes"] = "Nommer ports et itinéraires";
  fr["Explain packing"] = "Expliquer l’emballage";
  fr["Give realistic lead times"] = "Donner des délais réalistes";
  fr["Samples and small orders"] = "Échantillons et petites séries";
  fr["Documents and special cargo"] = "Documents et cargaisons spéciales";
  fr["Link it from every product page"] = "La relier depuis chaque page produit";
  fr["A checklist for the page"] = "Une liste de contrôle";
  fr["Show it, do not just say it"] = "Montrer, pas seulement dire";
  fr["Keep it honest and current"] = "Rester honnête et à jour";
  fr["A buyer has to land your product at their door at a known cost and on a known date. If they cannot work that out, they cannot compare you with other suppliers. A shipping page turns an unknown into something they can plan."] = "L’acheteur doit recevoir votre produit chez lui à un coût et une date connus. S’il n’y parvient pas, il ne peut pas vous comparer aux autres. Une page transport transforme l’inconnu en quelque chose de planifiable.";
  fr["The International Chamber of Commerce describes the"] = "La Chambre de commerce internationale décrit les";
  fr["Incoterms® rules"] = "règles Incoterms®";
  fr["as eleven three-letter trade terms that clarify the tasks, costs and risks involved in delivering goods from sellers to buyers. Say which terms you usually offer and name the version you use, for example Incoterms® 2020."] = "comme onze termes commerciaux à trois lettres qui clarifient les tâches, coûts et risques de la livraison du vendeur à l’acheteur. Indiquez les termes que vous proposez habituellement et nommez la version utilisée, par exemple Incoterms® 2020.";
  fr["Do not list every term if you only quote two or three. Be clear about what you will and will not arrange."] = "Ne listez pas tous les termes si vous n’en proposez que deux ou trois. Soyez clair sur ce que vous organisez et ce que vous n’organisez pas.";
  fr["Tell buyers where goods leave China. Many manufacturers ship through large container ports — Jiaxing’s port, for example, handled 4.255 million TEU in 2025 and Fujian’s ports 18.4364 million TEU. Inland suppliers should explain how goods reach the coast or travel by rail."] = "Indiquez d’où partent les marchandises. Beaucoup d’industriels expédient via de grands ports à conteneurs — le port de Jiaxing a traité 4,255 millions d’EVP en 2025 et ceux du Fujian 18,4364 millions d’EVP. Un fournisseur intérieur doit expliquer comment les marchandises gagnent la côte ou voyagent par rail.";
  fr["Main port(s) of loading."] = "Port(s) principal(aux) de chargement.";
  fr["Rail or river routes if you use them."] = "Les itinéraires ferroviaires ou fluviaux, le cas échéant.";
  fr["Air freight for samples or urgent orders."] = "Le fret aérien pour échantillons ou commandes urgentes.";
  fr["Typical transit times to your main markets, as ranges."] = "Les délais de transit typiques vers vos principaux marchés, en fourchettes.";
  fr["Standard export packing for each product family."] = "L’emballage export standard par famille de produits.";
  fr["Pallet, crate or carton options and dimensions."] = "Les options palette, caisse ou carton et leurs dimensions.";
  fr["Container loading: how many units per 20′ or 40′ container, if useful."] = "Le chargement en conteneur : combien d’unités par 20′ ou 40′, si utile.";
  fr["Marking, labelling and documents that travel with the goods."] = "Le marquage, l’étiquetage et les documents qui accompagnent la marchandise.";
  fr["Give ranges for standard products, custom products and repeat orders, and say what affects them: materials, tooling, testing or season. Buyers trust realistic ranges more than promises that turn out to be wrong."] = "Donnez des fourchettes pour produits standard, sur mesure et réassorts, en précisant ce qui les influence : matériaux, outillage, essais ou saison. Un acheteur fait plus confiance à des fourchettes réalistes qu’à des promesses démenties.";
  fr["Many relationships start with a sample. Explain how buyers can get one, what it costs, how it is shipped and how long it takes. If you accept small trial orders, say so and give the minimum."] = "Beaucoup de relations commencent par un échantillon. Expliquez comment l’obtenir, son coût, son mode d’envoi et le délai. Si vous acceptez de petites commandes d’essai, dites-le et donnez le minimum.";
  fr["List the export documents you routinely supply, and explain how you handle special cases such as oversized machinery or goods that need dangerous-goods handling. Do not claim capabilities you do not have; say instead which forwarders or partners you work with."] = "Listez les documents export que vous fournissez habituellement et expliquez les cas particuliers, comme les machines hors gabarit ou les marchandises nécessitant une manutention ADR. Ne revendiquez pas des capacités que vous n’avez pas ; indiquez plutôt vos transitaires ou partenaires.";
  fr["Put a short “Shipping and lead times” line on each product page with a link to the full page. Add the shipping page to your main navigation or footer and to your XML sitemap. A buyer should never have to search for it."] = "Ajoutez une courte ligne « Transport et délais » sur chaque page produit, avec un lien vers la page complète. Placez la page transport dans la navigation ou le pied de page et dans le sitemap XML. L’acheteur ne devrait jamais avoir à la chercher.";
  fr["Ports of loading and any inland routes."] = "Les ports de chargement et les itinéraires intérieurs.";
  fr["Incoterms you usually quote, with the version."] = "Les Incoterms proposés, avec la version.";
  fr["Packing by product family, with photos."] = "L’emballage par famille, avec photos.";
  fr["Lead-time ranges for samples, standard and custom orders."] = "Les délais pour échantillons, produits standard et sur mesure.";
  fr["Documents you supply with each shipment."] = "Les documents fournis à chaque expédition.";
  fr["Who to contact for a freight quote."] = "Qui contacter pour un devis de fret.";
  fr["If you can tick every item, most buyers will have the information they need to compare you and ask for a quote."] = "Si vous cochez chaque point, la plupart des acheteurs auront de quoi vous comparer et demander un devis.";
  fr["Photos and short videos of packing, loading and containers leaving your factory are some of the most convincing content an exporter can publish. They show care, capacity and that you really ship — things buyers cannot judge from text alone."] = "Des photos et courtes vidéos de l’emballage, du chargement et des conteneurs quittant l’usine figurent parmi les contenus les plus convaincants qu’un exportateur puisse publier. Ils montrent le soin, la capacité et le fait que vous expédiez vraiment — ce que l’acheteur ne juge pas sur le seul texte.";
  fr["Freight rates and transit times change. Avoid quoting fixed prices; give the information that stays stable — ports, terms, packing and ranges — and invite buyers to request a current quote."] = "Les tarifs de fret et les délais changent. Évitez les prix fixes ; donnez les informations stables — ports, conditions, emballage et fourchettes — et invitez l’acheteur à demander un devis actuel.";
  fr["A shipping and logistics page linked from every product page."] = "Une page transport et logistique reliée depuis chaque page produit.";
  fr["A clear site structure and sitemap so buyers and search engines find it."] = "Une structure de site et un sitemap clairs pour que acheteurs et moteurs la trouvent.";
  fr["Landing pages that answer delivery questions for each campaign market."] = "Des pages d’atterrissage répondant aux questions de livraison par marché de campagne.";
  fr["Posts that show packing, loading and shipments."] = "Des publications montrant emballage, chargement et expéditions.";
  fr["What are Incoterms?"] = "Que sont les Incoterms ?";
  fr["The ICC describes them as eleven three-letter trade terms that clarify the tasks, costs and risks in delivering goods from seller to buyer."] = "La CCI les décrit comme onze termes commerciaux à trois lettres clarifiant les tâches, coûts et risques de la livraison du vendeur à l’acheteur.";
  fr["Should we publish freight prices?"] = "Faut-il publier des prix de fret ?";
  fr["Usually not. Rates change. Publish ports, terms, packing and lead-time ranges, and quote freight on request."] = "En général non. Les tarifs changent. Publiez ports, conditions, emballage et délais, et chiffrez le fret sur demande.";
  fr["We are an inland supplier. What should we say?"] = "Nous sommes un fournisseur intérieur. Que dire ?";
  fr["Explain how goods reach the port or travel by rail, and give realistic transit times."] = "Expliquez comment les marchandises gagnent le port ou voyagent par rail, avec des délais réalistes.";
  fr["Should the shipping page list every Incoterm?"] = "La page doit-elle lister tous les Incoterms ?";
  fr["No. List the terms you usually offer and name the version."] = "Non. Listez les termes proposés et nommez la version.";
  fr["Do buyers care about packing?"] = "L’emballage intéresse-t-il les acheteurs ?";
  fr["Yes, especially for machinery, fragile goods and long routes. Photos of real packing help."] = "Oui, surtout pour les machines, les produits fragiles et les longues distances. Des photos d’emballage réel aident.";
  fr["Where should the page appear?"] = "Où placer cette page ?";
  fr["In the navigation or footer, linked from every product page, and in your sitemap."] = "Dans la navigation ou le pied de page, reliée depuis chaque page produit, et dans le sitemap.";
  fr["Can Hurfi write this page for us?"] = "Hurfi peut-il rédiger cette page ?";
  fr["Yes. We draft it from your team’s information and your logistics staff approve every detail."] = "Oui. Nous la rédigeons à partir des informations de votre équipe, et vos logisticiens valident chaque détail.";
  fr["International Chamber of Commerce (ICC)."] = "Chambre de commerce internationale (CCI).";
  fr["Jiaxing Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "Bureau des statistiques de Jiaxing (texte du bulletin repris par tjgb.hongheiku.com).";
  fr["Diagram of the steps covered in this guide: 1. Name your ports; 2. State your terms; 3. Explain packing; 4. Give lead times; 5. Cover samples; 6. Link from products."] = "Schéma des étapes : 1. Nommer les ports ; 2. Énoncer les conditions ; 3. Expliquer l’emballage ; 4. Donner les délais ; 5. Traiter les échantillons ; 6. Relier depuis les produits.";


  // Bulletin titles kept verbatim in both languages.
  zh["2025年福州市国民经济和社会发展统计公报 (Fuzhou 2025 Statistical Bulletin, dated 31 March 2026)"] = "2025年福州市国民经济和社会发展统计公报 (Fuzhou 2025 Statistical Bulletin, dated 31 March 2026)";
  zh["2025年四川省国民经济和社会发展统计公报 (Sichuan 2025 Statistical Bulletin)"] = "2025年四川省国民经济和社会发展统计公报 (Sichuan 2025 Statistical Bulletin)";
  zh["2025年嘉兴市国民经济和社会发展统计公报 (Jiaxing 2025 Statistical Bulletin)"] = "2025年嘉兴市国民经济和社会发展统计公报 (Jiaxing 2025 Statistical Bulletin)";
  zh["2025年福建省国民经济和社会发展统计公报 (Fujian 2025 Statistical Bulletin)"] = "2025年福建省国民经济和社会发展统计公报 (Fujian 2025 Statistical Bulletin)";
  zh["2025年宁德市国民经济和社会发展统计公报 (Ningde 2025 Statistical Bulletin)"] = "2025年宁德市国民经济和社会发展统计公报 (Ningde 2025 Statistical Bulletin)";
  zh["2025年河南省国民经济和社会发展统计公报 (Henan 2025 Statistical Bulletin)"] = "2025年河南省国民经济和社会发展统计公报 (Henan 2025 Statistical Bulletin)";
  zh["安徽省2025年国民经济和社会发展统计公报 (Anhui 2025 Statistical Bulletin)"] = "安徽省2025年国民经济和社会发展统计公报 (Anhui 2025 Statistical Bulletin)";
  fr["2025年福州市国民经济和社会发展统计公报 (Fuzhou 2025 Statistical Bulletin, dated 31 March 2026)"] = "2025年福州市国民经济和社会发展统计公报 (Fuzhou 2025 Statistical Bulletin, dated 31 March 2026)";
  fr["2025年四川省国民经济和社会发展统计公报 (Sichuan 2025 Statistical Bulletin)"] = "2025年四川省国民经济和社会发展统计公报 (Sichuan 2025 Statistical Bulletin)";
  fr["2025年嘉兴市国民经济和社会发展统计公报 (Jiaxing 2025 Statistical Bulletin)"] = "2025年嘉兴市国民经济和社会发展统计公报 (Jiaxing 2025 Statistical Bulletin)";
  fr["2025年福建省国民经济和社会发展统计公报 (Fujian 2025 Statistical Bulletin)"] = "2025年福建省国民经济和社会发展统计公报 (Fujian 2025 Statistical Bulletin)";
  fr["2025年宁德市国民经济和社会发展统计公报 (Ningde 2025 Statistical Bulletin)"] = "2025年宁德市国民经济和社会发展统计公报 (Ningde 2025 Statistical Bulletin)";
  fr["2025年河南省国民经济和社会发展统计公报 (Henan 2025 Statistical Bulletin)"] = "2025年河南省国民经济和社会发展统计公报 (Henan 2025 Statistical Bulletin)";
  fr["安徽省2025年国民经济和社会发展统计公报 (Anhui 2025 Statistical Bulletin)"] = "安徽省2025年国民经济和社会发展统计公报 (Anhui 2025 Statistical Bulletin)";


  // Shared industry-page blocks, 2026-10-20.
  zh["Sector figures"] = "行业数据";
  zh["What buyers compare"] = "买家比较什么";
  zh["Standards and documents"] = "标准与文件";
  zh["Buyer questions"] = "买家问题";
  zh["Where it is made"] = "产地在哪里";
  zh["Related pages"] = "相关页面";
  zh["Standards, rules and documents buyers ask about"] = "买家会问的标准、规则和文件";
  zh["What buyers ask first, and what your website can show so the answer is already there."] = "买家最先问什么，以及你的网站能展示什么，让答案已经在那里。";
  zh["Want this playbook applied to your products?"] = "想把这套方法用到你的产品上吗？";
  zh["Book a free consultation and we will look at your current site, product range and target markets, and tell you which steps to take first. Prefer to write first? Use the contact form."] = "预约一次免费咨询，我们会看你的现有网站、产品范围和目标市场，告诉你先做哪几步。更想先写信？用联系表单。";
  zh["Province guides:"] = "省份指南：";
  zh[". These pages describe the places, not Hurfi offices; Hurfi works remotely from Xi’an and Bogura."] = "。这些页面介绍的是这些地方，不是 Hurfi 办公室；Hurfi 在西安和博格拉远程工作。";
  zh["Four services, each set up for how buyers in this sector search and compare."] = "四项服务，各自针对这个行业的买家如何搜索和比较来设置。";
  zh["Specialist product areas this page covers:"] = "本页覆盖的细分产品领域：";
  zh["How we work"] = "我们怎么工作";
  zh["Free consultation."] = "免费咨询。";
  zh["We look at your current website, products and target markets, and tell you what we would fix first."] = "我们看你的现有网站、产品和目标市场，告诉你我们会先修什么。";
  zh["We agree the first pages, searches and channels, and what will be measured."] = "我们商定先做哪些页面、哪些搜索和渠道，以及衡量什么。";
  zh["Build and write."] = "搭建与撰写。";
  zh["We draft pages with your team; you approve every technical claim before it goes live."] = "我们与你的团队一起起草页面；每条技术陈述上线前都由你确认。";
  zh["Measure and improve."] = "衡量与改进。";
  zh["We report from your own Search Console and analytics, and adjust the plan from the data."] = "我们用你自己的 Search Console 和分析数据汇报，并根据数据调整计划。";
  zh["Related industries, places and guides"] = "相关行业、地点和指南";
  zh["City and province guides"] = "城市与省份指南";
  zh["Figures and rules are quoted from the sources below and were checked on the date shown. Industry figures describe the sector, not any Hurfi client; check the current text of any regulation or standard before relying on it."] = "数据和规则引自下方来源，并在所示日期核对过。行业数据描述的是整个行业，不是任何 Hurfi 客户；依赖任何法规或标准前，请核对现行文本。";
  zh["A first consultation is free and there is no obligation. Tell us what you make, who buys it and where you want to sell."] = "首次咨询免费，没有任何义务。告诉我们你做什么、谁买、你想卖到哪里。";
  zh["From Hurfi’s own social media"] = "来自 Hurfi 自己的社媒";
  zh["Want posts like this for your factory? See"] = "想让你的工厂也有这样的内容？见";
  zh["National Bureau of Statistics of China."] = "中国国家统计局。";
  zh["中华人民共和国2025年国民经济和社会发展统计公报 (Statistical Communiqué of the PRC on 2025 National Economic and Social Development, 28 February 2026)"] = "中华人民共和国2025年国民经济和社会发展统计公报（Statistical Communiqué of the PRC on 2025 National Economic and Social Development, 28 February 2026）";
  zh["How do we start?"] = "怎么开始？";
  zh["or the"] = "或";
  zh["Browse all"] = "浏览";
  zh["city guides"] = "全部城市指南";
  zh["What the website and search work should include"] = "网站和搜索工作应包含什么";
  zh["Gaps we often see"] = "我们常见的缺口";
  zh["Search topics worth their own page"] = "值得单独建页的搜索主题";
  zh["Related cities and guides"] = "相关城市与指南";
  zh["Official statistics point to this sector among the main industries of"] = "官方统计显示，这个行业是以下地区的主要产业之一：";
  zh[". Our city pages explain what that means for a manufacturer’s website."] = "。我们的城市页面说明这对制造企业的网站意味着什么。";
  zh["For a practical starting point, read"] = "想找个务实起点，可读";
  zh["what overseas buyers check on a factory website"] = "海外买家会核查工厂网站的哪些地方";
  zh["RFQ checklist"] = "询价清单";
  zh["More guides for this sector:"] = "这个行业的更多指南：";
  zh["Where is Hurfi based?"] = "Hurfi 在哪里？";
  zh["Hurfi’s offices are in Xi’an and Bogura. We work with manufacturers anywhere in China remotely."] = "Hurfi 的办公室在西安和博格拉。我们远程服务中国各地的制造企业。";
  zh["Machinery (Machinery Directive 2006/42/EC and Machinery Regulation (EU) 2023/1230)"] = "机械（机械指令 2006/42/EC 与机械法规 (EU) 2023/1230）";
  zh["International Organization for Standardization (ISO)."] = "国际标准化组织（ISO）。";
  zh["Will you guarantee orders?"] = "能保证订单吗？";
  zh["Digital Product Passport (under the Ecodesign for Sustainable Products Regulation (EU) 2024/1781)"] = "数字产品护照（依据《可持续产品生态设计法规》(EU) 2024/1781）";
  zh["Do you guarantee leads or rankings?"] = "能保证询盘或排名吗？";
  zh["Tianjin Statistics Bureau and NBS Tianjin Survey Team (published on the Tianjin government portal)."] = "天津市统计局、国家统计局天津调查总队（发布于天津市政府门户网站）。";
  zh["2025年天津市国民经济和社会发展统计公报 (Tianjin 2025 Statistical Bulletin)"] = "2025年天津市国民经济和社会发展统计公报 (Tianjin 2025 Statistical Bulletin)";
  zh["ISO/IEC 17025 — Testing and calibration laboratories"] = "ISO/IEC 17025 — 检测和校准实验室";
  zh["Wuhu Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "芜湖市统计局（公报文本据 tjgb.hongheiku.com 转载）。";
  zh["芜湖市2025年国民经济和社会发展统计公报 (Wuhu 2025 Statistical Bulletin)"] = "芜湖市2025年国民经济和社会发展统计公报 (Wuhu 2025 Statistical Bulletin)";
  zh["Qingdao Statistics Bureau and NBS Qingdao Survey Team (bulletin published in Qingdao Daily, 8 April 2026)."] = "青岛市统计局、国家统计局青岛调查队（公报刊于《青岛日报》2026 年 4 月 8 日）。";
  zh["2025年青岛市国民经济和社会发展统计公报 (Qingdao 2025 Statistical Bulletin)"] = "2025年青岛市国民经济和社会发展统计公报 (Qingdao 2025 Statistical Bulletin)";
  zh["Low Voltage Directive (LVD)"] = "低电压指令（LVD）";
  zh["Electromagnetic Compatibility (EMC) Directive"] = "电磁兼容（EMC）指令";
  zh["Will you guarantee contracts?"] = "能保证成交合同吗？";
  zh["No. Hurfi’s offices are in Xi’an and Bogura; we work with manufacturers anywhere in China remotely."] = "不能。Hurfi 的办公室在西安和博格拉；我们远程服务中国各地的制造企业。";
  zh["Hunan Provincial People’s Government (enghunan.gov.cn)."] = "湖南省人民政府（enghunan.gov.cn）。";
  zh["Fourth China-Africa Economic and Trade Expo (19 March 2025)"] = "第四届中非经贸博览会（2025 年 3 月 19 日）";
  zh["REACH Regulation (EC 1907/2006)"] = "REACH 法规（EC 1907/2006）";
  zh["OEKO-TEX® STANDARD 100"] = "OEKO-TEX® STANDARD 100";
  zh["No. We improve visibility and evaluation and report real data."] = "不能。我们提升可见度和评估效果，并汇报真实数据。";
  zh["Foshan Statistics Bureau (bulletin figures as published by Southern Plus / Nanfang Daily, 15 June 2026)."] = "佛山市统计局（公报数据据南方+／《南方日报》2026 年 6 月 15 日刊发）。";
  zh["2025年佛山市国民经济和社会发展统计公报 (Foshan 2025 Statistical Bulletin)"] = "2025年佛山市国民经济和社会发展统计公报 (Foshan 2025 Statistical Bulletin)";
  zh["Energy Performance of Buildings Directive (EU/2024/1275)"] = "建筑能效指令（EU/2024/1275）";
  zh["No. We improve visibility and credibility and report real data."] = "不能。我们提升可见度和可信度，并汇报真实数据。";
  zh["Packaging waste (Packaging and Packaging Waste Regulation (EU) 2025/40)"] = "包装废弃物（《包装和包装废弃物法规》(EU) 2025/40）";
  zh["Equipment for potentially explosive atmospheres (ATEX Directive 2014/34/EU)"] = "用于潜在爆炸性环境的设备（ATEX 指令 2014/34/EU）";
  fr["Sector figures"] = "Chiffres du secteur";
  fr["What buyers compare"] = "Ce que comparent les acheteurs";
  fr["Standards and documents"] = "Normes et documents";
  fr["Buyer questions"] = "Questions des acheteurs";
  fr["Where it is made"] = "Où est-ce fabriqué";
  fr["Related pages"] = "Pages liées";
  fr["Standards, rules and documents buyers ask about"] = "Normes, règles et documents demandés par les acheteurs";
  fr["What buyers ask first, and what your website can show so the answer is already there."] = "Ce que les acheteurs demandent d’abord, et ce que votre site peut montrer pour que la réponse y soit déjà.";
  fr["Want this playbook applied to your products?"] = "Envie d’appliquer ce playbook à vos produits ?";
  fr["Book a free consultation and we will look at your current site, product range and target markets, and tell you which steps to take first. Prefer to write first? Use the contact form."] = "Réservez une consultation gratuite : nous examinons votre site actuel, votre gamme et vos marchés cibles, et vous indiquons par quoi commencer. Vous préférez écrire ? Utilisez le formulaire de contact.";
  fr["Province guides:"] = "Guides des provinces :";
  fr[". These pages describe the places, not Hurfi offices; Hurfi works remotely from Xi’an and Bogura."] = ". Ces pages décrivent les lieux, pas des bureaux Hurfi ; Hurfi travaille à distance depuis Xi’an et Bogura.";
  fr["Four services, each set up for how buyers in this sector search and compare."] = "Quatre services, chacun adapté à la façon dont les acheteurs du secteur cherchent et comparent.";
  fr["Specialist product areas this page covers:"] = "Domaines produits spécialisés couverts par cette page :";
  fr["How we work"] = "Notre méthode";
  fr["Free consultation."] = "Consultation gratuite.";
  fr["We look at your current website, products and target markets, and tell you what we would fix first."] = "Nous examinons votre site, vos produits et vos marchés cibles, et indiquons ce que nous corrigerions d’abord.";
  fr["We agree the first pages, searches and channels, and what will be measured."] = "Nous convenons des premières pages, recherches et canaux, et de ce qui sera mesuré.";
  fr["Build and write."] = "Construire et rédiger.";
  fr["We draft pages with your team; you approve every technical claim before it goes live."] = "Nous rédigeons les pages avec votre équipe ; vous validez chaque affirmation technique avant publication.";
  fr["Measure and improve."] = "Mesurer et améliorer.";
  fr["We report from your own Search Console and analytics, and adjust the plan from the data."] = "Nous rapportons depuis votre propre Search Console et vos analyses, et ajustons le plan selon les données.";
  fr["Related industries, places and guides"] = "Secteurs, lieux et guides liés";
  fr["City and province guides"] = "Guides des villes et provinces";
  fr["Figures and rules are quoted from the sources below and were checked on the date shown. Industry figures describe the sector, not any Hurfi client; check the current text of any regulation or standard before relying on it."] = "Les chiffres et règles sont cités depuis les sources ci-dessous et vérifiés à la date indiquée. Les chiffres sectoriels décrivent le secteur, non un client Hurfi ; vérifiez le texte en vigueur de toute réglementation ou norme avant de vous y fier.";
  fr["A first consultation is free and there is no obligation. Tell us what you make, who buys it and where you want to sell."] = "La première consultation est gratuite et sans engagement. Dites-nous ce que vous fabriquez, qui l’achète et où vous voulez vendre.";
  fr["From Hurfi’s own social media"] = "Depuis les réseaux sociaux de Hurfi";
  fr["Want posts like this for your factory? See"] = "Envie de publications comme celles-ci pour votre usine ? Voir";
  fr["National Bureau of Statistics of China."] = "Bureau national des statistiques de Chine.";
  fr["中华人民共和国2025年国民经济和社会发展统计公报 (Statistical Communiqué of the PRC on 2025 National Economic and Social Development, 28 February 2026)"] = "中华人民共和国2025年国民经济和社会发展统计公报 (Communiqué statistique de la RPC sur le développement économique et social national 2025, 28 février 2026)";
  fr["How do we start?"] = "Comment commencer ?";
  fr["or the"] = "ou le";
  fr["Browse all"] = "Parcourir";
  fr["city guides"] = "tous les guides de ville";
  fr["What the website and search work should include"] = "Ce que doivent inclure le site et le travail de recherche";
  fr["Gaps we often see"] = "Les lacunes que nous voyons souvent";
  fr["Search topics worth their own page"] = "Des sujets de recherche qui méritent leur page";
  fr["Related cities and guides"] = "Villes et guides liés";
  fr["Official statistics point to this sector among the main industries of"] = "Les statistiques officielles placent ce secteur parmi les principales industries de";
  fr[". Our city pages explain what that means for a manufacturer’s website."] = ". Nos pages de villes expliquent ce que cela implique pour le site d’un industriel.";
  fr["For a practical starting point, read"] = "Pour un point de départ concret, lisez";
  fr["what overseas buyers check on a factory website"] = "ce que les acheteurs étrangers vérifient sur un site d’usine";
  fr["RFQ checklist"] = "liste de contrôle RFQ";
  fr["More guides for this sector:"] = "D’autres guides pour ce secteur :";
  fr["Where is Hurfi based?"] = "Où est basé Hurfi ?";
  fr["Hurfi’s offices are in Xi’an and Bogura. We work with manufacturers anywhere in China remotely."] = "Les bureaux de Hurfi sont à Xi’an et Bogura. Nous travaillons à distance avec des industriels partout en Chine.";
  fr["Machinery (Machinery Directive 2006/42/EC and Machinery Regulation (EU) 2023/1230)"] = "Machines (directive Machines 2006/42/CE et règlement Machines (UE) 2023/1230)";
  fr["International Organization for Standardization (ISO)."] = "Organisation internationale de normalisation (ISO).";
  fr["Will you guarantee orders?"] = "Garantissez-vous des commandes ?";
  fr["Digital Product Passport (under the Ecodesign for Sustainable Products Regulation (EU) 2024/1781)"] = "Passeport numérique des produits (au titre du règlement Écoconception pour des produits durables (UE) 2024/1781)";
  fr["Do you guarantee leads or rankings?"] = "Garantissez-vous des prospects ou des classements ?";
  fr["Tianjin Statistics Bureau and NBS Tianjin Survey Team (published on the Tianjin government portal)."] = "Bureau des statistiques de Tianjin et équipe d’enquête du NBS pour Tianjin (publié sur le portail du gouvernement de Tianjin).";
  fr["2025年天津市国民经济和社会发展统计公报 (Tianjin 2025 Statistical Bulletin)"] = "2025年天津市国民经济和社会发展统计公报 (Bulletin statistique 2025 de Tianjin)";
  fr["ISO/IEC 17025 — Testing and calibration laboratories"] = "ISO/IEC 17025 — Laboratoires d’essais et d’étalonnage";
  fr["Wuhu Statistics Bureau (bulletin text as reproduced by tjgb.hongheiku.com)."] = "Bureau des statistiques de Wuhu (texte du bulletin repris par tjgb.hongheiku.com).";
  fr["芜湖市2025年国民经济和社会发展统计公报 (Wuhu 2025 Statistical Bulletin)"] = "芜湖市2025年国民经济和社会发展统计公报 (Bulletin statistique 2025 de Wuhu)";
  fr["Qingdao Statistics Bureau and NBS Qingdao Survey Team (bulletin published in Qingdao Daily, 8 April 2026)."] = "Bureau des statistiques de Qingdao et équipe d’enquête du NBS pour Qingdao (bulletin publié dans Qingdao Daily, 8 avril 2026).";
  fr["2025年青岛市国民经济和社会发展统计公报 (Qingdao 2025 Statistical Bulletin)"] = "2025年青岛市国民经济和社会发展统计公报 (Bulletin statistique 2025 de Qingdao)";
  fr["Low Voltage Directive (LVD)"] = "Directive basse tension (DBT)";
  fr["Electromagnetic Compatibility (EMC) Directive"] = "Directive compatibilité électromagnétique (CEM)";
  fr["Will you guarantee contracts?"] = "Garantissez-vous des contrats ?";
  fr["No. Hurfi’s offices are in Xi’an and Bogura; we work with manufacturers anywhere in China remotely."] = "Non. Les bureaux de Hurfi sont à Xi’an et Bogura ; nous travaillons à distance avec des industriels partout en Chine.";
  fr["Hunan Provincial People’s Government (enghunan.gov.cn)."] = "Gouvernement populaire provincial du Hunan (enghunan.gov.cn).";
  fr["Fourth China-Africa Economic and Trade Expo (19 March 2025)"] = "Quatrième exposition économique et commerciale Chine-Afrique (19 mars 2025)";
  fr["REACH Regulation (EC 1907/2006)"] = "Règlement REACH (CE 1907/2006)";
  fr["OEKO-TEX® STANDARD 100"] = "OEKO-TEX® STANDARD 100";
  fr["No. We improve visibility and evaluation and report real data."] = "Non. Nous améliorons la visibilité et l’évaluation, et rapportons des données réelles.";
  fr["Foshan Statistics Bureau (bulletin figures as published by Southern Plus / Nanfang Daily, 15 June 2026)."] = "Bureau des statistiques de Foshan (chiffres du bulletin publiés par Southern Plus / Nanfang Daily, 15 juin 2026).";
  fr["2025年佛山市国民经济和社会发展统计公报 (Foshan 2025 Statistical Bulletin)"] = "2025年佛山市国民经济和社会发展统计公报 (Bulletin statistique 2025 de Foshan)";
  fr["Energy Performance of Buildings Directive (EU/2024/1275)"] = "Directive sur la performance énergétique des bâtiments (UE/2024/1275)";
  fr["No. We improve visibility and credibility and report real data."] = "Non. Nous améliorons la visibilité et la crédibilité, et rapportons des données réelles.";
  fr["Packaging waste (Packaging and Packaging Waste Regulation (EU) 2025/40)"] = "Déchets d’emballages (règlement Emballages et déchets d’emballages (UE) 2025/40)";
  fr["Equipment for potentially explosive atmospheres (ATEX Directive 2014/34/EU)"] = "Équipements destinés aux atmosphères explosibles (directive ATEX 2014/34/UE)";

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

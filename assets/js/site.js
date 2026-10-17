/* Hurfi — shared runtime: header, FAQ, schemas */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var LOGO = "/assets/img/hurfi-logo-for-colorfulbg.png";
  var MQ_MOBILE = "(max-width: 960px)";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function currentPath() {
    var p = window.location.pathname || "/";
    if (p.endsWith("/index.html")) p = p.slice(0, -10) || "/";
    if (p.length > 1 && !p.endsWith("/")) p += "/";
    return p || "/";
  }

  function isActive(itemPath, here) {
    if (itemPath === "/") return here === "/";
    return here === itemPath || here.indexOf(itemPath) === 0;
  }

  function isMobile() {
    return window.matchMedia(MQ_MOBILE).matches;
  }

  function injectJsonLd(data) {
    if (!data) return;
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function ensureSkipLink() {
    if (document.querySelector(".skip-link")) return;
    var a = document.createElement("a");
    a.className = "skip-link";
    a.href = "#main";
    a.textContent = "Skip to content";
    document.body.insertBefore(a, document.body.firstChild);
  }

  function ensureMainId() {
    var main = document.querySelector("main");
    if (main && !main.id) main.id = "main";
  }

  function logoImg(className, w, h) {
    var cls = className ? ' class="' + className + '"' : "";
    return (
      "<img" +
      cls +
      ' src="' +
      LOGO +
      '" alt="Hurfi" width="' +
      w +
      '" height="' +
      h +
      '" decoding="async">'
    );
  }

  function buildNavHtml(nav, here) {
    var html = '<ul class="nav">';
    (nav || []).forEach(function (item) {
      if (item.children && item.children.length) {
        var hasAlert = item.children.some(function (child) {
          return !!child.badge;
        });
        html += '<li class="has-dropdown' + (hasAlert ? " has-alert" : "") + '">';
        html +=
          '<a href="' +
          escapeHtml(item.path) +
          '" class="' +
          (hasAlert ? "has-beep" : "") +
          '"' +
          (isActive(item.path, here) ? ' aria-current="page"' : "") +
          ' aria-haspopup="true" aria-expanded="false">' +
          escapeHtml(item.label) +
          (hasAlert
            ? '<span class="nav-beep" title="New highlight in menu" aria-label="New highlight in menu"><span class="nav-beep-dot"></span></span>'
            : "") +
          '<span class="nav-caret" aria-hidden="true"></span></a>';
        html += '<ul class="dropdown" role="list">';
        item.children.forEach(function (child) {
          html +=
            '<li><a href="' +
            escapeHtml(child.path) +
            '"' +
            (isActive(child.path, here) ? ' aria-current="page"' : "") +
            ">" +
            '<span class="nav-link-text">' +
            escapeHtml(child.label) +
            "</span>" +
            (child.badge
              ? '<span class="badge badge-hot" aria-label="' +
                escapeHtml(child.badge) +
                '"><span class="badge-hot-icon" aria-hidden="true">✦</span><span class="badge-hot-text">' +
                escapeHtml(child.badge) +
                "</span></span>"
              : "") +
            "</a></li>";
        });
        html += "</ul></li>";
        return;
      }

      html +=
        "<li><a" +
        (item.cta ? ' class="btn"' : "") +
        ' href="' +
        escapeHtml(item.path) +
        '"' +
        (isActive(item.path, here) ? ' aria-current="page"' : "") +
        ">" +
        escapeHtml(item.label) +
        (item.cta ? '<span class="cta-free-tag">Limited</span>' : "") +
        "</a></li>";
    });
    html += "</ul>";
    return html;
  }

  function getNavItems() {
    if (window.HURFI_SITE && window.HURFI_SITE.nav && window.HURFI_SITE.nav.length) {
      return window.HURFI_SITE.nav;
    }
    // Fallback if site-data.js failed to load
    return [
      { label: "Home", path: "/" },
      { label: "About", path: "/about/" },
      {
        label: "Services",
        path: "/services/",
        children: [
          { label: "Website Development", path: "/services/website-development/" },
          { label: "SEO", path: "/services/seo/" },
          { label: "Digital Marketing", path: "/services/digital-marketing/" },
          { label: "Social Media Management", path: "/services/social-media-management/", badge: "Hot" },
        ],
      },
      { label: "Projects", path: "/projects/" },
      {
        label: "Industries",
        path: "/industries/",
        children: [
          { label: "Industrial Automation & Robotics", path: "/industries/industrial-automation-robotics/" },
          { label: "Electronics & Semiconductor", path: "/industries/electronics-semiconductor/" },
          { label: "EV & E-Mobility", path: "/industries/ev-e-mobility/" },
          { label: "Battery & Energy Storage", path: "/industries/battery-energy-storage/" },
          { label: "Power Grid & Electrical Equipment", path: "/industries/power-grid-electrical-equipment/" },
          { label: "Medical Devices & Diagnostics", path: "/industries/medical-devices-diagnostics/" },
          { label: "Laboratory & Scientific Equipment", path: "/industries/laboratory-scientific-equipment/" },
          { label: "Industrial Machinery & CNC", path: "/industries/industrial-machinery-cnc/" },
          { label: "Industrial Software & Data", path: "/industries/industrial-software-data/" },
          { label: "Data Centers & Digital Infrastructure", path: "/industries/data-centers-digital-infrastructure/" },
          { label: "Optics & Photonics", path: "/industries/optics-photonics/" },
          { label: "Pharma & Bioprocess Manufacturing", path: "/industries/pharma-bioprocess-manufacturing/" },
        ],
      },
      {
        label: "Locations",
        path: "/locations/",
        children: [
          { label: "China directory", path: "/locations/china/" },
          { label: "Changzhou", path: "/locations/china/changzhou/" },
          { label: "Dongguan", path: "/locations/china/dongguan/" },
          { label: "Guangzhou", path: "/locations/china/guangzhou/" },
          { label: "Hangzhou", path: "/locations/china/hangzhou/" },
          { label: "Hefei", path: "/locations/china/hefei/" },
          { label: "Ningbo", path: "/locations/china/ningbo/" },
          { label: "Quanzhou", path: "/locations/china/quanzhou/" },
          { label: "Shanghai", path: "/locations/china/shanghai/" },
          { label: "Shenzhen", path: "/locations/china/shenzhen/" },
          { label: "Suzhou", path: "/locations/china/suzhou/" },
          { label: "Tianjin", path: "/locations/china/tianjin/" },
          { label: "Wuhan", path: "/locations/china/wuhan/" },
          { label: "Wuxi", path: "/locations/china/wuxi/" },
          { label: "Xiamen", path: "/locations/china/xiamen/" },
          { label: "Xi'an", path: "/locations/china/xian/" },
          { label: "Zhongshan", path: "/locations/china/zhongshan/" },
          { label: "All city guides", path: "/locations/#city-guides" },
        ],
      },
      {
        label: "Insights",
        path: "/insights/",
        children: [
          { label: "All insights", path: "/insights/" },
          { label: "Overseas buyer inquiries", path: "/insights/overseas-buyer-inquiries/" },
          { label: "Factory website trust signals", path: "/insights/factory-website-trust-signals/" },
          { label: "RFQ website checklist", path: "/insights/manufacturer-website-rfq-checklist/" },
          { label: "Industrial product page SEO", path: "/insights/industrial-product-page-seo/" },
          { label: "International SEO checklist", path: "/insights/international-seo-checklist-for-exporters/" },
          { label: "AI search for manufacturers", path: "/insights/ai-search-for-manufacturers/" },
          { label: "Google Ads for exporters", path: "/insights/google-ads-for-exporters/" },
          { label: "LinkedIn for export sales", path: "/insights/linkedin-for-factory-export-sales/" },
          { label: "Trade show follow-up", path: "/insights/trade-show-follow-up-for-manufacturers/" },
          { label: "Export website speed", path: "/insights/export-website-speed-for-overseas-buyers/" },
          { label: "Choosing an export agency", path: "/insights/choosing-an-export-marketing-agency/" },
        ],
      },
      { label: "Contact Us", path: "/contact/" },
      { label: "Free Growth Strategy", path: "/book-consultation/#book-form", cta: true },
    ];
  }

  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var inner = header.querySelector(".header-inner");
    if (!inner) {
      inner = document.createElement("div");
      inner.className = "container container-nav header-inner";
      header.appendChild(inner);
    }
    inner.classList.add("container", "container-nav", "header-inner");

    // Logo (left)
    var logo = inner.querySelector(".logo");
    if (!logo) {
      logo = document.createElement("a");
      logo.className = "logo";
      logo.href = "/";
      inner.insertBefore(logo, inner.firstChild);
    }
    logo.setAttribute("aria-label", "Hurfi home");
    logo.href = "/";
    if (!logo.querySelector("img")) logo.innerHTML = logoImg("logo-img", 168, 40);

    // Nav shell
    var navEl = inner.querySelector("[data-site-nav], nav[aria-label='Main']");
    if (!navEl) {
      navEl = document.createElement("nav");
      navEl.setAttribute("aria-label", "Main");
      navEl.setAttribute("data-site-nav", "");
      inner.appendChild(navEl);
    }
    navEl.id = "site-nav";
    navEl.className = "site-nav";
    navEl.setAttribute("aria-label", "Main");
    navEl.setAttribute("data-site-nav", "");

    var here = currentPath();
    if (!navEl.querySelector(".nav")) {
      navEl.innerHTML =
        '<div class="nav-drawer-head" style="display:none" hidden>' +
        '<a class="nav-drawer-brand" href="/" aria-label="Hurfi home">' +
        logoImg("nav-drawer-logo", 140, 32) +
        "</a></div>" +
        buildNavHtml(getNavItems(), here);
    } else {
      navEl.querySelectorAll("a[href]").forEach(function (link) {
        var href = link.getAttribute("href") || "";
        var path = href.split("#")[0];
        if (href.indexOf("#") === -1 && path.charAt(0) === "/" && isActive(path, here)) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    }

    // Hamburger (right) — only one
    var oldToggles = inner.querySelectorAll(".nav-toggle");
    for (var i = 1; i < oldToggles.length; i++) oldToggles[i].remove();

    var btn = inner.querySelector(".nav-toggle");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nav-toggle";
      btn.innerHTML = '<span class="nav-toggle-lines" aria-hidden="true"></span>';
      inner.appendChild(btn);
    }
    btn.setAttribute("aria-controls", "site-nav");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");

    // Backdrop — only one
    var backdrop = document.querySelector(".nav-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "nav-backdrop";
      document.body.appendChild(backdrop);
    }
    backdrop.setAttribute("aria-hidden", "true");

    function setMenuOpen(open) {
      navEl.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      backdrop.classList.toggle("is-open", open);
      backdrop.setAttribute("aria-hidden", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    // Avoid duplicate listeners by cloning toggle once
    var freshBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(freshBtn, btn);
    btn = freshBtn;
    btn.setAttribute("aria-controls", "site-nav");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");

    btn.addEventListener("click", function () {
      setMenuOpen(!navEl.classList.contains("is-open"));
    });

    backdrop.onclick = function () {
      setMenuOpen(false);
    };

    navEl.onclick = function (e) {
      var link = e.target.closest(".has-dropdown > a");
      if (link && isMobile()) {
        e.preventDefault();
        var item = link.parentElement;
        var open = item.classList.toggle("is-open");
        link.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }

      var a = e.target.closest("a");
      if (!a || a.classList.contains("nav-drawer-brand")) return;
      if (a.closest(".has-dropdown > a")) return;
      if (isMobile() && a.getAttribute("href")) setMenuOpen(false);
    };

    document.addEventListener("keydown", function onEsc(e) {
      if (e.key === "Escape") setMenuOpen(false);
    });

    window.addEventListener(
      "resize",
      function () {
        if (!isMobile()) setMenuOpen(false);
      },
      { passive: true }
    );
    if (window.HURFI_I18N) window.HURFI_I18N.mount(inner);
  }

  function bindHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  function renderFaqs() {
    var mount = document.getElementById("faq-dynamic");
    if (!mount || !window.HURFI_SITE || !window.HURFI_SITE.faqs) return;
    mount.innerHTML = "";
    window.HURFI_SITE.faqs.forEach(function (faq) {
      var article = document.createElement("article");
      article.className = "card";
      article.innerHTML =
        "<h3>" +
        escapeHtml(faq.question) +
        "</h3><p>" +
        escapeHtml(faq.answer) +
        "</p>";
      mount.appendChild(article);
    });
  }

  function canonicalUrl() {
    var link = document.querySelector('link[rel="canonical"]');
    if (link && link.href) return link.href.split("#")[0];
    return "https://hurfi.com" + currentPath();
  }

  function hasSchemaType(type) {
    var nodes = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].textContent.indexOf('"@type":"' + type + '"') !== -1) return true;
      if (nodes[i].textContent.indexOf('"@type": "' + type + '"') !== -1) return true;
    }
    return false;
  }

  function bootSchemas() {
    if (!window.HURFI_SCHEMA) return;
    var pageType = document.body.getAttribute("data-page");
    if (pageType === "404" || pageType === "thanks") return;
    if (!hasSchemaType("Organization")) injectJsonLd(window.HURFI_SCHEMA.organization);
    if (!hasSchemaType("WebSite")) injectJsonLd(window.HURFI_SCHEMA.website);
    if (pageType !== "legal" && !hasSchemaType("ProfessionalService")) {
      injectJsonLd(window.HURFI_SCHEMA.professionalService);
    }
    if (!hasSchemaType("FAQPage")) {
      var entities = [];
      document.querySelectorAll(".rk-faq details").forEach(function (item) {
        var questionEl = item.querySelector("summary span");
        var answerEl = item.querySelector("p");
        if (!questionEl || !answerEl) return;
        var question = questionEl.textContent.trim();
        var answer = answerEl.textContent.trim();
        if (!question || !answer) return;
        entities.push({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        });
      });
      if (entities.length) {
        injectJsonLd({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: entities });
      }
    }
    var url = canonicalUrl();
    if (pageType === "service" && !hasSchemaType("Service")) {
      var serviceName = document.querySelector("h1");
      injectJsonLd({
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceName ? serviceName.textContent.trim() : document.title,
        provider: { "@type": "Organization", name: "Hurfi", url: "https://hurfi.com" },
        areaServed: { "@type": "Country", name: "China" },
        url: url
      });
    }
    if ((pageType === "industry" || pageType === "industries" || pageType === "location") && !hasSchemaType("WebPage") &&
        !hasSchemaType("CollectionPage") && !hasSchemaType("AboutPage") && !hasSchemaType("ContactPage")) {
      var pageName = document.querySelector("h1");
      var pageDesc = document.querySelector('meta[name="description"]');
      var webPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: pageName ? pageName.textContent.trim() : document.title,
        url: url,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", name: "Hurfi", url: "https://hurfi.com" }
      };
      if (pageDesc && pageDesc.content) webPage.description = pageDesc.content;
      injectJsonLd(webPage);
    }
    if (currentPath() !== "/" && !hasSchemaType("BreadcrumbList")) {
      var labels = { industries: "Industries", services: "Services", locations: "Locations", projects: "Projects" };
      var crumbs = [{ "@type": "ListItem", position: 1, name: "Home", item: "https://hurfi.com/" }];
      var parts = currentPath().split("/").filter(Boolean);
      var acc = "";
      parts.forEach(function (part, index) {
        acc += "/" + part + "/";
        var name = labels[part] || part.replace(/-/g, " ");
        if (index === parts.length - 1) {
          var heading = document.querySelector("h1");
          if (heading && heading.textContent.trim()) name = heading.textContent.trim();
        }
        crumbs.push({ "@type": "ListItem", position: index + 2, name: name, item: "https://hurfi.com" + acc });
      });
      injectJsonLd({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs });
    }
  }

  function setYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function renderFooter() {
    var footer = document.querySelector(".site-footer");
    if (!footer || footer.dataset.ready === "1") return;
    footer.dataset.ready = "1";
    footer.innerHTML =
      '<div class="footer-card">' +
      '<div class="footer-top footer-top--6">' +
      '<nav aria-label="Footer">' +
      '<p class="footer-kicker">Navigation</p>' +
      '<ul class="footer-list">' +
      '<li><a href="/about/">About</a></li>' +
      '<li><a href="/services/">Services</a></li>' +
      '<li><a href="/projects/">Projects</a></li>' +
      '<li><a href="/industries/">Industries</a></li>' +
      '<li><a href="/locations/">Locations</a></li>' +
      '<li><a href="/contact/">Contact</a></li>' +
      '<li><a href="/book-consultation/#book-form">Book a Consultation</a></li>' +
      '<li><a href="/brand-guidelines/">Brand Guidelines</a></li>' +
      "</ul></nav>" +
      '<nav aria-label="Resources">' +
      '<p class="footer-kicker">Resources</p>' +
      '<ul class="footer-list">' +
      '<li><a href="/insights/">Insights</a></li>' +
      '<li><a href="/insights/manufacturer-website-rfq-checklist/">RFQ website checklist</a></li>' +
      '<li><a href="/insights/international-seo-checklist-for-exporters/">International SEO checklist</a></li>' +
      '<li><a href="/insights/industrial-product-page-seo/">Industrial product page SEO</a></li>' +
      '<li><a href="/locations/china/">China directory</a></li>' +
      "</ul></nav>" +
      '<nav aria-label="City guides">' +
      '<p class="footer-kicker">City guides</p>' +
      '<ul class="footer-list">' +
      '<li><a href="/locations/china/shenzhen/">Shenzhen</a></li>' +
      '<li><a href="/locations/china/guangzhou/">Guangzhou</a></li>' +
      '<li><a href="/locations/china/shanghai/">Shanghai</a></li>' +
      '<li><a href="/locations/china/suzhou/">Suzhou</a></li>' +
      '<li><a href="/locations/china/ningbo/">Ningbo</a></li>' +
      '<li><a href="/locations/china/xian/">Xi\'an</a></li>' +
      '<li><a href="/locations/#city-guides">All city guides</a></li>' +
      "</ul></nav>" +
      '<div><p class="footer-kicker">Locations</p>' +
      '<div class="footer-place"><p class="footer-place-name">Bangladesh</p>' +
      '<p class="footer-address">Colony Chokforid Road, Bogura, Bangladesh</p>' +
      '<a class="footer-phone" href="tel:+8801925026696">+8801925026696</a></div>' +
      '<div class="footer-place"><p class="footer-place-name">China</p>' +
      '<p class="footer-address">Haitianyuan 3, Chang\'an Campus, Northwestern Polytechnical University, Xi\'an, Shaanxi</p>' +
      '<a class="footer-phone" href="tel:+8617792239260">+86 17792239260</a></div></div>' +
      '<nav aria-label="Socials">' +
      '<p class="footer-kicker">Socials</p>' +
      '<ul class="footer-list">' +
      '<li><a href="https://wa.me/8801859890002" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>' +
      '<li><a href="https://www.instagram.com/hurfi_global/" target="_blank" rel="noopener noreferrer">Instagram</a></li>' +
      '<li><a href="https://www.linkedin.com/company/hurfiglobal/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>' +
      "</ul></nav>" +
      '<nav aria-label="Legal">' +
      '<p class="footer-kicker">Legal</p>' +
      '<ul class="footer-list">' +
      '<li><a href="/privacy-policy/">Privacy Policy</a></li>' +
      '<li><a href="/terms/">Terms &amp; Conditions</a></li>' +
      '<li><a href="/refund-policy/">Refund &amp; Return Policy</a></li>' +
      "</ul></nav></div>" +
      '<div class="footer-partner">' +
      '<a class="footer-partner-badge" href="https://www.hostinger.com?REFERRALCODE=DSZYASIRA579" target="_blank" rel="sponsored noopener"><img src="/assets/img/partners/hostinger-partner-brand-dark.svg" alt="Official Hostinger Agency Partner badge" width="120" height="45" loading="lazy" decoding="async"></a>' +
      '<p class="footer-partner-text"><strong>Official Hostinger® Agency Partner</strong> <span>Websites we build are hosted with priority Hostinger support.</span></p>' +
      "</div>" +
      '<div class="footer-meta">' +
      '<p>© <span id="year"></span> Hurfi. <span>All rights reserved.</span></p>' +
      '<div class="footer-clocks">' +
      '<p><span>Bogura</span> <span aria-hidden="true">→</span> <time data-tz="Asia/Dhaka">--:--:--</time></p>' +
      '<p><span>Xi\'an</span> <span aria-hidden="true">→</span> <time data-tz="Asia/Shanghai">--:--:--</time></p>' +
      "</div>" +
      '<button type="button" class="footer-top-btn">Back to top</button>' +
      "</div>" +
      '<p class="footer-mark" aria-hidden="true">Hurfi Global</p>' +
      "</div>";

    function tickClocks() {
      footer.querySelectorAll("time[data-tz]").forEach(function (node) {
        try {
          node.textContent = new Intl.DateTimeFormat("en-GB", {
            timeZone: node.getAttribute("data-tz"),
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(new Date());
        } catch (e) {}
      });
    }
    tickClocks();
    window.setInterval(tickClocks, 1000);
    var topBtn = footer.querySelector(".footer-top-btn");
    if (topBtn) {
      topBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  function enhanceBookCtas() {
    // Nav CTA "Limited" tag on the header button (the free-consultation chip, offer bar and 3-step timeline were removed in Oct 2026)
    document.querySelectorAll('.site-nav a.btn[href*="book-consultation"]').forEach(function (btn) {
      if (btn.querySelector(".cta-free-tag")) return;
      var tag = document.createElement("span");
      tag.className = "cta-free-tag";
      tag.textContent = "Limited";
      btn.appendChild(tag);
    });
  }

  function initHeroWords() {
    var title = document.querySelector(".home-hero .hero-title");
    if (!title) return;

    var lines = title.querySelectorAll("[data-hero-words]");
    if (!lines.length) return;

    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    var index = 0;
    lines.forEach(function (line) {
      var text = line.textContent.trim();
      if (!text) return;
      var parts = text.split(/\s+/);
      line.textContent = "";
      parts.forEach(function (word) {
        var span = document.createElement("span");
        span.className = "hero-word";
        span.style.setProperty("--i", String(index));
        span.textContent = word;
        line.appendChild(span);
        index += 1;
      });
    });
  }

  function initSectionReveals(sectionSelector, itemSelector) {
    var section = document.querySelector(sectionSelector);
    if (!section) return;

    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var targets = section.querySelectorAll(itemSelector);
    if (reduce || !("IntersectionObserver" in window)) {
      section.classList.add("is-inview");
      targets.forEach(function (el) {
        el.classList.add("is-inview");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(section);
    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initVisibilityGap() {
    initSectionReveals(".visibility-gap-section", ".vg-reveal");
  }

  function initHurfiServices() {
    initSectionReveals(".hurfi-services-section", ".hs-reveal");
  }

  function initWhyHurfi() {
    initSectionReveals(".why-hurfi-section", ".wh-reveal");
  }

  function initClientsMarquee() {
    var rows = document.querySelectorAll(".clients-marquee");
    if (!rows.length) return;

    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function gapPx(el) {
      var styles = window.getComputedStyle(el);
      return parseFloat(styles.columnGap || styles.gap) || 0;
    }

    function layout() {
      rows.forEach(function (marquee) {
        var track = marquee.querySelector(".clients-track");
        var lists = marquee.querySelectorAll(".clients-logos");
        if (!track || !lists.length) return;

        var primary = lists[0];
        var logos = primary.querySelectorAll(".clients-logo");
        var count = logos.length;
        if (!count) return;

        var viewW = marquee.clientWidth;
        if (viewW < 80) return;

        var gap = gapPx(primary);
        lists.forEach(function (list) {
          list.querySelectorAll(".clients-logo").forEach(function (logo) {
            logo.style.width = "";
          });
        });

        var setWidth = primary.scrollWidth;
        var trackGap = gapPx(track);
        var shift = setWidth + trackGap;
        track.style.setProperty("--clients-shift", shift + "px");
        track.style.setProperty("--clients-gap", gap + "px");

        if (reduce) {
          track.style.transform = "none";
          track.style.animation = "none";
        }
      });
    }

    layout();
    window.addEventListener("resize", function () {
      window.clearTimeout(window.__hurfiClientsResize);
      window.__hurfiClientsResize = window.setTimeout(layout, 120);
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(layout).catch(function () {});
    }
  }

  function initHgHero() {
    var hero = document.querySelector(".hg-hero");
    if (!hero) return;

    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    hero.querySelectorAll("[data-count]").forEach(function (card) {
      var target = Number(card.getAttribute("data-count")) || 0;
      var node = card.querySelector("[data-count-value]");
      if (!node) return;
      if (reduce) {
        node.textContent = String(target);
        return;
      }
      var start = null;
      var duration = 1200;
      function tick(now) {
        if (start === null) start = now;
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        node.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });

    var coarse =
      window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    var nodes = hero.querySelectorAll("[data-parallax]");
    hero.addEventListener("mousemove", function (event) {
      var rect = hero.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;
      nodes.forEach(function (node) {
        var depth = Number(node.getAttribute("data-parallax")) || 8;
        node.style.transform = "translate(" + x * depth + "px, " + y * depth + "px)";
      });
    });
    hero.addEventListener("mouseleave", function () {
      nodes.forEach(function (node) {
        node.style.transform = "";
      });
    });
  }

  function initRkMeter() {
    var root = document.querySelector(".rk-meter");
    if (!root) return;
    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var nodes = root.querySelectorAll("[data-count]");

    function paint(node, value) {
      node.textContent = Number(value).toLocaleString("en-US");
    }

    function run() {
      nodes.forEach(function (node) {
        var target = Number(node.getAttribute("data-count")) || 0;
        if (reduce) {
          paint(node, target);
          return;
        }
        var start = null;
        var duration = 1400;
        function tick(now) {
          if (start === null) start = now;
          var t = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - t, 3);
          paint(node, Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }

    if (reduce || !("IntersectionObserver" in window)) {
      run();
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          run();
          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(root);
  }

  function initRkGrowth() {
    var root = document.querySelector(".rk-growth");
    if (!root) return;
    var rail = root.querySelector(".rk-timeline-rail");
    var fill = root.querySelector(".rk-timeline-fill");
    var items = root.querySelectorAll(".rk-timeline-item");
    if (!rail || !fill) return;
    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function update() {
      var rect = rail.getBoundingClientRect();
      var view = window.innerHeight || 800;
      var start = view * 0.72;
      var travel = Math.max(rect.height, 1) + view * 0.22;
      var progress = reduce ? 1 : (start - rect.top) / travel;
      progress = Math.min(1, Math.max(0, progress));
      fill.style.height = (progress * 100).toFixed(2) + "%";
      var tip = rect.top + rect.height * progress;
      items.forEach(function (item) {
        var dot = item.querySelector(".rk-timeline-dot");
        if (!dot) return;
        var box = dot.getBoundingClientRect();
        item.classList.toggle("is-on", reduce || box.top + box.height * 0.45 <= tip + 6);
      });
    }

    update();
    if (reduce) return;
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initRkEco() {
    var root = document.querySelector(".rk-eco");
    if (!root) return;
    var board = root.querySelector(".rk-eco-board");
    var svg = root.querySelector(".rk-eco-lines");
    var hub = root.querySelector(".rk-eco-hub-mark");
    var cards = root.querySelectorAll(".rk-eco-card");
    if (!board || !svg || !hub || !cards.length) return;

    var wide = window.matchMedia("(min-width: 1100px)");
    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function fillBelts() {
      root.querySelectorAll(".rk-eco-track").forEach(function (track) {
        var belt = track.parentElement;
        var lists = track.querySelectorAll("ul");
        var primary = lists[0];
        var twin = lists[1];
        if (!primary || !twin || !belt) return;
        if (!primary.getAttribute("data-seed")) {
          primary.setAttribute("data-seed", String(primary.children.length));
        }
        var seed = Number(primary.getAttribute("data-seed")) || primary.children.length;
        var guard = 0;
        while (primary.scrollWidth < belt.clientWidth + 24 && guard < 8) {
          for (var i = 0; i < seed; i++) {
            primary.appendChild(primary.children[i].cloneNode(true));
          }
          guard += 1;
        }
        twin.innerHTML = primary.innerHTML;
      });
    }

    function draw() {
      if (!wide.matches) {
        svg.setAttribute("hidden", "");
        svg.textContent = "";
        return;
      }
      svg.removeAttribute("hidden");
      var box = board.getBoundingClientRect();
      var w = Math.max(board.clientWidth, 1);
      var h = Math.max(board.clientHeight, 1);
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));
      var hb = hub.getBoundingClientRect();
      var x1 = hb.left + hb.width / 2 - box.left;
      var y1 = hb.bottom - box.top;
      var markup = "";
      cards.forEach(function (card, index) {
        var cb = card.getBoundingClientRect();
        var x2 = cb.left + cb.width / 2 - box.left;
        var y2 = cb.top - box.top;
        var mid = y1 + (y2 - y1) * 0.58;
        var d =
          "M " + x1.toFixed(1) + " " + y1.toFixed(1) +
          " C " + x1.toFixed(1) + " " + mid.toFixed(1) +
          ", " + x2.toFixed(1) + " " + mid.toFixed(1) +
          ", " + x2.toFixed(1) + " " + y2.toFixed(1);
        var stage = card.getAttribute("data-stage") || String(index);
        markup += '<path class="rk-eco-line" data-stage="' + stage + '" d="' + d + '"></path>';
        if (!reduce) {
          markup +=
            '<path class="rk-eco-flow" data-stage="' + stage + '" d="' + d +
            '" style="animation-delay:' + (index * -0.8) + 's"></path>';
        }
      });
      svg.innerHTML = markup;
    }

    function paint(card, on) {
      var stage = card.getAttribute("data-stage");
      card.classList.toggle("is-hot", on);
      svg.querySelectorAll(".rk-eco-line, .rk-eco-flow").forEach(function (path) {
        path.classList.toggle("is-hot", on && path.getAttribute("data-stage") === stage);
      });
    }

    cards.forEach(function (card) {
      card.addEventListener("mouseenter", function () { paint(card, true); });
      card.addEventListener("mouseleave", function () { paint(card, false); });
      card.addEventListener("focusin", function () { paint(card, true); });
      card.addEventListener("focusout", function () { paint(card, false); });
    });

    fillBelts();
    draw();
    if (window.ResizeObserver) {
      var observer = new ResizeObserver(function () {
        fillBelts();
        draw();
      });
      observer.observe(board);
    } else {
      window.addEventListener("resize", draw);
    }
    if (wide.addEventListener) wide.addEventListener("change", draw);

    if (!reduce) root.classList.add("rk-eco--motion");

    if (reduce || !("IntersectionObserver" in window)) {
      root.classList.add("is-in");
      return;
    }
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        root.classList.add("is-in");
        seen.disconnect();
      });
    }, { threshold: 0.18 });
    seen.observe(root);
  }

  function initRkServiceStack() {
    var cards = document.querySelectorAll(".rk-svc-card");
    if (!cards.length) return;
    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    function update() {
      cards.forEach(function (card, index) {
        var next = cards[index + 1];
        if (!next) {
          card.style.transform = "";
          return;
        }
        var current = card.getBoundingClientRect();
        var incoming = next.getBoundingClientRect();
        var covered = current.bottom - incoming.top;
        var amount = Math.min(1, Math.max(0, covered / Math.max(current.height, 1)));
        var scale = 1 - amount * 0.045;
        card.style.transform = "scale(" + scale.toFixed(4) + ")";
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initRkFaq() {
    document.querySelectorAll(".rk-faq-list").forEach(function (list) {
      var items = list.querySelectorAll("details");
      items.forEach(function (item) {
        item.addEventListener("toggle", function () {
          if (!item.open) return;
          items.forEach(function (other) {
            if (other !== item) other.open = false;
          });
        });
      });
    });
  }

  function initRkReel() {
    var videos = document.querySelectorAll(".rk-system-video video, .rk-film video");
    if (!videos.length) return;
    videos.forEach(function (video) {
      video.muted = true;
      function start() {
        var play = video.play();
        if (play && play.catch) play.catch(function () {});
      }
      if (!("IntersectionObserver" in window)) {
        start();
        return;
      }
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) start();
          else video.pause();
        });
      }, { rootMargin: "240px 0px" });
      observer.observe(video);
    });
  }

  function initProof() {
    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll("[data-proof-stage]").forEach(function (stage) {
      var frames = stage.querySelectorAll(".proof-frame");
      var view = stage.querySelector(".proof-stage-view");
      var prev = stage.querySelector("[data-stage-prev]");
      var next = stage.querySelector("[data-stage-next]");
      if (!frames.length || !view) return;
      var index = 0;
      var timer = 0;
      var count = frames.length;

      function place() {
        var shift = view.clientWidth * 0.2;
        frames.forEach(function (frame, i) {
          var offset = i - index;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;
          var abs = Math.abs(offset);
          var hidden = abs > 2;
          frame.style.opacity = hidden ? "0" : offset === 0 ? "1" : "0.8";
          frame.style.zIndex = String(hidden ? 0 : 6 - abs);
          frame.style.pointerEvents = offset === 0 ? "auto" : "none";
          var scale = offset === 0 ? 1 : abs === 1 ? 0.92 : 0.84;
          frame.style.transform =
            "translateX(calc(-50% + " + offset * shift + "px)) scale(" + scale + ")";
        });
      }

      function show(n) {
        index = (n + count) % count;
        place();
      }

      function play() {
        window.clearInterval(timer);
        if (reduce) return;
        timer = window.setInterval(function () {
          show(index + 1);
        }, 3200);
      }

      if (prev) prev.addEventListener("click", function () { show(index - 1); play(); });
      if (next) next.addEventListener("click", function () { show(index + 1); play(); });
      stage.addEventListener("mouseenter", function () { window.clearInterval(timer); });
      stage.addEventListener("mouseleave", play);
      window.addEventListener("resize", place);
      show(0);
      play();
    });

    document.querySelectorAll("[data-proof-fade]").forEach(function (root) {
      var slides = root.querySelectorAll(".proof-fade-slide");
      var prev = document.querySelector("[data-proof-prev]");
      var next = document.querySelector("[data-proof-next]");
      if (!slides.length) return;
      var index = 0;
      var timer = 0;

      function show(n) {
        index = (n + slides.length) % slides.length;
        slides.forEach(function (slide, i) {
          slide.classList.toggle("is-on", i === index);
        });
      }

      function play() {
        window.clearInterval(timer);
        if (reduce) return;
        timer = window.setInterval(function () {
          show(index + 1);
        }, 4200);
      }

      if (prev) {
        prev.addEventListener("click", function () {
          show(index - 1);
          play();
        });
      }
      if (next) {
        next.addEventListener("click", function () {
          show(index + 1);
          play();
        });
      }
      root.addEventListener("mouseenter", function () {
        window.clearInterval(timer);
      });
      root.addEventListener("mouseleave", play);
      show(0);
      play();
    });

    document.querySelectorAll("[data-proof-snap]").forEach(function (scroller) {
      if (reduce) return;
      var timer = 0;
      function step() {
        var card = scroller.querySelector(".proof-snap-card");
        if (!card) return;
        var gap = 16;
        var amount = card.getBoundingClientRect().width + gap;
        var max = scroller.scrollWidth - scroller.clientWidth - 8;
        if (scroller.scrollLeft >= max) scroller.scrollTo({ left: 0, behavior: "smooth" });
        else scroller.scrollBy({ left: amount, behavior: "smooth" });
      }
      function play() {
        window.clearInterval(timer);
        timer = window.setInterval(step, 3800);
      }
      scroller.addEventListener("mouseenter", function () {
        window.clearInterval(timer);
      });
      scroller.addEventListener("mouseleave", play);
      scroller.addEventListener("focusin", function () {
        window.clearInterval(timer);
      });
      scroller.addEventListener("focusout", play);
      play();
    });
  }

  function initRkCompare() {
    var root = document.querySelector(".rk-cmp");
    if (!root) return;
    var head = root.querySelector("[data-rk-cmp-head]");
    var body = root.querySelector("[data-rk-cmp-body]");
    if (!head || !body) return;

    /* Edit this object to change the comparison. Ratings are illustrative. */
    var compare = {
      columns: [
        { key: "visibility", label: "Digital Visibility", width: "14%" },
        { key: "focus", label: "Manufacturing Focus", width: "14%" },
        { key: "flexibility", label: "Flexibility", width: "13%" },
        { key: "scale", label: "Scalability", width: "13%" },
        { key: "cost", label: "Cost Efficiency", width: "14%" }
      ],
      rows: [
        {
          id: "hurfi",
          name: "Hurfi",
          featured: true,
          icon: "hurfi",
          text: "A manufacturing-focused digital growth partner combining industry understanding, brand visibility, and connected growth strategies.",
          scores: { visibility: "strong", focus: "strong", flexibility: "strong", scale: "strong", cost: "depends" }
        },
        {
          id: "agency",
          name: "Traditional Marketing Agencies",
          icon: "building",
          text: "Broad marketing expertise, with industry specialisation and delivery models varying between providers.",
          scores: { visibility: "strong", focus: "depends", flexibility: "depends", scale: "strong", cost: "depends" }
        },
        {
          id: "team",
          name: "In-House Marketing Teams",
          icon: "users",
          text: "Direct brand ownership and internal collaboration, with capabilities dependent on team resources.",
          scores: { visibility: "strong", focus: "depends", flexibility: "strong", scale: "depends", cost: "depends" }
        },
        {
          id: "freelancer",
          name: "Freelance Specialists",
          icon: "pen",
          text: "Flexible specialist support for individual marketing tasks and defined projects.",
          scores: { visibility: "depends", focus: "depends", flexibility: "strong", scale: "depends", cost: "strong" }
        },
        {
          id: "diy",
          name: "DIY Marketing Tools",
          icon: "wrench",
          text: "Self-managed solutions for businesses that prefer to handle their digital presence internally.",
          scores: { visibility: "depends", focus: "limited", flexibility: "strong", scale: "depends", cost: "strong" }
        }
      ]
    };

    var scores = {
      strong: { label: "Strong fit", tip: "Illustrative strong fit. Not a measured score.", icon: "M20 6 9 17l-5-5" },
      depends: { label: "Depends", tip: "Depends on the provider and the engagement.", icon: "M5 12h14" },
      limited: { label: "Limited", tip: "Illustrative limited fit. Not a measured score.", icon: "M18 6 6 18M6 6l12 12" }
    };

    var marks = {
      building: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      pen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      wrench: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };

    function add(parent, tag, className) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      parent.appendChild(node);
      return node;
    }

    var platform = add(head, "th", "");
    platform.scope = "col";
    platform.textContent = "Platform";
    compare.columns.forEach(function (column) {
      var cell = add(head, "th", "");
      cell.scope = "col";
      cell.textContent = column.label;
    });

    compare.rows.forEach(function (row) {
      var tr = add(body, "tr", row.featured ? "rk-cmp-row rk-cmp-row--hurfi" : "rk-cmp-row");
      var who = add(tr, "th", "");
      who.scope = "row";
      var wrap = add(who, "span", "rk-cmp-who");
      var mark = add(wrap, "span", "rk-cmp-mark");
      if (row.icon === "hurfi") {
        var img = add(mark, "img", "");
        img.src = "/assets/img/hurfi-icon.svg";
        img.alt = "";
        img.width = 28;
        img.height = 28;
      } else if (marks[row.icon]) {
        mark.innerHTML = marks[row.icon];
      }
      var copy = add(wrap, "span", "");
      var name = add(copy, "strong", "");
      name.textContent = row.name;
      var desc = add(copy, "p", "");
      desc.textContent = row.text;

      compare.columns.forEach(function (column) {
        var key = row.scores[column.key] || "depends";
        var meta = scores[key] || scores.depends;
        var td = add(tr, "td", "");
        td.setAttribute("data-label", column.label);
        var button = add(td, "button", "rk-cmp-status rk-cmp-status--" + key);
        button.type = "button";
        button.setAttribute("data-tip", meta.tip);
        button.setAttribute("aria-label", row.name + ", " + column.label + ": " + meta.label);
        button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + meta.icon + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      });
    });

    var table = root.querySelector(".rk-cmp-table");
    var cols = document.createElement("colgroup");
    var platformCol = document.createElement("col");
    cols.appendChild(platformCol);
    compare.columns.forEach(function () {
      cols.appendChild(document.createElement("col"));
    });
    table.insertBefore(cols, table.firstChild);

    function layoutCols() {
      var stack = window.matchMedia("(max-width: 980px)").matches;
      var list = cols.children;
      if (stack) {
        table.style.minWidth = "0";
        for (var i = 0; i < list.length; i++) list[i].style.width = "auto";
      } else {
        table.style.minWidth = "980px";
        var widths = ["32%", "14%", "14%", "13%", "13%", "14%"];
        for (var j = 0; j < list.length; j++) list[j].style.width = widths[j];
      }
    }
    layoutCols();
    window.addEventListener("resize", layoutCols);
    var narrowQuery = window.matchMedia("(max-width: 980px)");
    if (narrowQuery.addEventListener) narrowQuery.addEventListener("change", layoutCols);
    var scroller = root.querySelector(".rk-cmp-scroll");
    var hint = root.querySelector(".rk-cmp-hint");
    function syncHint() {
      if (!hint || !scroller) return;
      hint.hidden = scroller.scrollWidth <= scroller.clientWidth + 8;
    }
    syncHint();
    window.addEventListener("resize", syncHint);

    var tip = document.createElement("div");
    tip.className = "rk-cmp-tip";
    tip.setAttribute("role", "tooltip");
    tip.hidden = true;
    document.body.appendChild(tip);
    var tipId = "rk-cmp-tip";
    tip.id = tipId;

    function placeTip(button) {
      var box = button.getBoundingClientRect();
      var x = box.left + box.width / 2;
      x = Math.max(88, Math.min(window.innerWidth - 88, x));
      tip.style.left = x + "px";
      tip.style.top = box.top + "px";
    }
    function showTip(button) {
      tip.textContent = button.getAttribute("data-tip") || "";
      tip.hidden = false;
      button.setAttribute("aria-describedby", tipId);
      placeTip(button);
    }
    function hideTip(button) {
      tip.hidden = true;
      if (button) button.removeAttribute("aria-describedby");
    }

    body.addEventListener("mouseover", function (event) {
      var button = event.target.closest(".rk-cmp-status");
      if (!button || !body.contains(button)) return;
      showTip(button);
    });
    body.addEventListener("mouseout", function (event) {
      var button = event.target.closest(".rk-cmp-status");
      if (!button) return;
      hideTip(button);
    });
    body.addEventListener("focusin", function (event) {
      var button = event.target.closest(".rk-cmp-status");
      if (!button) return;
      showTip(button);
    });
    body.addEventListener("focusout", function (event) {
      var button = event.target.closest(".rk-cmp-status");
      if (!button) return;
      hideTip(button);
    });
    if (scroller) {
      scroller.addEventListener("scroll", function () {
        tip.hidden = true;
      }, { passive: true });
    }

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      root.classList.add("is-in");
      return;
    }
    root.classList.add("rk-cmp--motion");
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        root.classList.add("is-in");
        seen.disconnect();
      });
    }, { threshold: 0.2 });
    seen.observe(root);
  }

  function initRkVoices() {
    var root = document.querySelector(".rk-voice");
    if (!root) return;
    var wall = root.querySelector("[data-rk-voice-wall]");
    if (!wall) return;

    /* Placeholder wording. Names are the real client brands already shown on the page. */
    var logo = "/assets/img/client-logo/";
    var rows = [
      [
        ["Gapgastro", "gaps-gastrol.png", "Hurfi took the time to understand how we actually work, then shaped the site so buyers could see that clearly."],
        ["Sober Society", "sobersociety.png", "They listened before they designed. The result feels like us, and it is easier for people to understand what we offer."],
        ["Compara Ofertas", "comparo.webp", "Straightforward and careful with the details. We always knew what was happening and why."],
        ["Lorbuc Net", "lorbuc.png", "Organised without being rigid. The project kept moving, and there was still room for our feedback."],
        ["Ghorsajan", "ghorsajan.png", "The pages finally explain the brand in a way that feels natural. Working with Hurfi was calm and clear."],
        ["Juice Cards", "juice-safety-card.png", "They paid attention to how customers actually read the site, then made that path simpler."],
        ["Wosny", "wosny.webp", "A thoughtful partner. They explained the choices in plain language and delivered work we were comfortable sharing."],
        ["Gully Apparel", "jully-apperal.webp", "Easy to reach, and the pages present the brand the way we hoped from the start."],
        ["DBIOGH", "dbiogh.svg", "Clear communication and careful craft. That made the whole engagement easier for our team."],
        ["Africa Giant", "218808688_1215915268927398_4145428019116087857_n-removebg-preview.png", "They treated the project like a partnership. We felt heard, and the finished work is something we are proud to share."],
        ["ZorgHulpGids", "69B6B920-7F68-454B-A2FF-363F06AA58BE-removebg-preview-e1777031474200-removebg-preview.png", "Hurfi made a complicated offer easier to follow. The structure is cleaner, and the tone still sounds like us."],
        ["General Coffee", "6DEFF0F3-62A2-4A92-9548-B03CECF73981-removebg-preview.png", "Warm, practical, and on time. The new pages feel closer to how we talk about the product."],
        ["Claflin & Associates", "c003243b-1-removebg-preview.png", "Professional without feeling stiff. They kept the message precise and the process easy to follow."]
      ],
      [
        ["Cammy & Grammy", "c26e2a9e-f3b4-4f5b-b6bd-688e88abd956-removebg-preview.png", "They understood the personality of the brand and kept it intact while making the site clearer."],
        ["Cedar Hills Haven", "cropped_circle_image-Edited-e1768575851754-300x243-removebg-preview.png", "Quiet, careful work. Visitors can now see what we do without hunting through the page."],
        ["Signed Anonymous", "D7AFAAE3-5A12-4B7A-A7C1-EE7B98189742-e1765724064322-1024x570-removebg-preview.png", "Hurfi handled a sensitive brand with restraint. The result is clear, and it still feels private and considered."],
        ["ZK Publishing House", "FA0C16AF-B5E2-4F4D-B1E6-6E996D4D5392-1-removebg-preview.png", "The catalogue is easier to browse, and the writing on the site matches the care we put into the books."],
        ["Goli", "goli-logo.svg", "Simple to work with. They asked the right questions and kept the brand looking like itself."],
        ["Home Health Care Network", "hhcn-2-1.png", "Families can find the right information faster. That was the brief, and Hurfi stayed with it."],
        ["idsein", "logo-idsein-1024x1024.png", "A clean process and a site that finally matches the standard of the work we do."],
        ["Pro Wills", "logoooo_resized-removebg-preview.png", "They made a serious service feel approachable. The pages are clearer, and nothing important got lost."],
        ["Envisio Partners", "C6-e1744564144568.webp", "Thoughtful from the first conversation. The site now explains the partnership in a way clients understand."],
        ["MG Global", "logo_2-removebg-preview-e1765728356644.png", "Steady communication across the project. The finished pages feel international without losing who we are."],
        ["Lukman Hosen", "lukman-hosen.svg", "Direct, respectful, and precise. The new presence is something we are comfortable standing behind."],
        ["Oppein", "Oppein-NJ-logo.png", "Hurfi presented the range with more clarity. Showrooms and buyers can see the offer without the clutter."],
        ["Vivir de DJ", "vivir-de-dj-logo-BQJfj4P_.png", "They kept the energy of the brand and still made the site easy to use. That balance was exactly what we needed."]
      ],
      [
        ["Solomon's Wealth Business", "1000260539-scaled-e1766210506692.webp", "The message is tighter, and the pages feel more trustworthy. Hurfi was patient with the details."],
        ["BuyCellFix", "WhatsApp_Image_2025-08-18_at_22.25.09_13fdebb1-removebg-preview.webp", "Customers can see the service faster. The team was practical and easy to talk to."],
        ["KaMatch", "KaMatch-Logo-e1761303772234.webp", "A clear brief, a clear result. The site now explains the product without extra noise."],
        ["Avidaze", "cropped-avidaze-2025-2048x498.webp", "They respected the visual identity and made the story around it easier to follow."],
        ["JR Accounting", "jr-accounting.svg", "Accurate, calm, and well organised. The site reads the way a professional practice should."],
        ["TT", "F3C2DE0A-487A-483F-9A3D-7B7ADAA6991E-1-removebg-preview.png", "Short feedback loops and careful execution. The pages feel finished, not rushed."],
        ["Asquire", "asquire.png", "Hurfi kept the brand sharp and made the offer easier for new visitors to grasp."],
        ["LegalAbility", "legablity.webp", "They handled a complex service with plain language. Clients can now see the next step."],
        ["N2P", "n2profit.webp", "Focused and responsive. The new pages say what we do, then get out of the way."],
        ["HoneyMulez", "honeymulez.webp", "The brand still feels warm, and the site is much easier to move through."],
        ["Ridebear", "ridebear.webp", "A straightforward collaboration. The result looks like us, only clearer."],
        ["StormFit", "StormFit.webp", "They matched the pace of the brand and still kept the details tight. We would work with them again."]
      ]
    ];

    function makeList(items, hidden) {
      var ul = document.createElement("ul");
      if (hidden) ul.setAttribute("aria-hidden", "true");
      items.forEach(function (item) {
        var li = document.createElement("li");
        var card = document.createElement("article");
        card.className = "rk-voice-card";

        var quote = document.createElement("blockquote");
        var text = document.createElement("p");
        text.textContent = item[2];
        quote.appendChild(text);

        var foot = document.createElement("footer");
        var badge = document.createElement("span");
        badge.className = "rk-voice-logo";
        var img = document.createElement("img");
        img.src = logo + item[1];
        img.alt = "";
        img.width = 72;
        img.height = 72;
        img.loading = "eager";
        badge.appendChild(img);

        var name = document.createElement("strong");
        name.textContent = item[0];
        foot.appendChild(badge);
        foot.appendChild(name);
        card.appendChild(quote);
        card.appendChild(foot);
        li.appendChild(card);
        ul.appendChild(li);
      });
      return ul;
    }

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rows.forEach(function (items) {
      var row = document.createElement("div");
      row.className = "rk-voice-row";
      var track = document.createElement("div");
      track.className = "rk-voice-track";
      track.appendChild(makeList(items, false));
      if (!reduce) track.appendChild(makeList(items, true));
      row.appendChild(track);
      wall.appendChild(row);
    });

    if (reduce || !("IntersectionObserver" in window)) {
      root.classList.add("is-in");
      return;
    }
    root.classList.add("rk-voice--motion");
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        root.classList.add("is-in");
        seen.disconnect();
      });
    }, { threshold: 0.15 });
    seen.observe(root);
  }

  function initRkConsult() {
    var root = document.querySelector(".rk-consult");
    if (!root) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "IntersectionObserver" in window) {
      root.classList.add("rk-consult--motion");
      var seen = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          root.classList.add("is-in");
          seen.disconnect();
        });
      }, { threshold: 0.12 });
      seen.observe(root);
    }

    document.querySelectorAll("[data-open-modal]").forEach(function (button) {
      if (button.getAttribute("data-bound") === "1") return;
      button.addEventListener("click", function () {
        var dialog = document.getElementById(button.getAttribute("data-open-modal"));
        if (dialog && dialog.showModal) dialog.showModal();
      });
    });
    root.querySelectorAll("dialog").forEach(function (dialog) {
      dialog.querySelectorAll("[data-close-modal]").forEach(function (button) {
        button.addEventListener("click", function () { dialog.close(); });
      });
      dialog.addEventListener("click", function (event) {
        if (event.target === dialog) dialog.close();
      });
    });

    var form = root.querySelector("form");
    if (form) form.setAttribute("data-armed-at", String(Date.now()));
    if (form) form.addEventListener("submit", function (event) {
      event.preventDefault();
      submitInquiry(form);
    });
  }

  function submitInquiry(form) {
    var fail = form.querySelector(".rk-consult-fail");
    var name = form.querySelector('[name="name"]');
    var email = form.querySelector('[name="email"]');
    var service = form.querySelector('[name="service"]');
    var details = form.querySelector('[name="details"]');
    var honeypot = form.querySelector('[name="bot-field"]');
    var valid = true;

    function flag(input, bad) {
      var id = input.getAttribute("aria-describedby");
      var note = id ? document.getElementById(id) : null;
      if (note) note.hidden = !bad;
      input.setAttribute("aria-invalid", bad ? "true" : "false");
      if (bad) valid = false;
    }

    flag(name, !name.value.trim());
    flag(email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()));
    flag(service, !service.value);
    flag(details, !details.value.trim());
    if (fail) fail.hidden = true;
    if (!valid) return;
    if (honeypot && honeypot.value) return;
    var honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) return;
    // Spam guard: bots usually submit within a second of page load; people do not.
    var HURFI_FORM_MIN_MS = 2500;
    var armedAt = Number(form.getAttribute("data-armed-at") || 0);
    if (armedAt && Date.now() - armedAt < HURFI_FORM_MIN_MS) {
      if (fail) fail.hidden = false;
      return;
    }

    var button = form.querySelector(".rk-consult-submit");
    var label = form.querySelector(".rk-consult-send-label");
    var wait = form.querySelector(".rk-consult-send-wait");
    button.disabled = true;
    if (label) label.hidden = true;
    if (wait) wait.hidden = false;
    form.setAttribute("aria-busy", "true");

    var payload = {
      _subject: "Hurfi inquiry — " + name.value.trim(),
      _template: "table",
      _captcha: "false",
      _cc: "support@hurfi.com",
      _honey: "",
      _replyto: email.value.trim()
    };
    new FormData(form).forEach(function (value, key) {
      if (key === "bot-field" || key === "_honey" || key.charAt(0) === "_") return;
      if (typeof value !== "string") return;
      var trimmed = value.trim();
      if (trimmed) payload[key] = trimmed;
    });

    fetch("https://formsubmit.co/ajax/yasir@hurfi.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok || String(data.success) !== "true") throw new Error("unconfirmed");
        markLeadPending(form);
        window.location.assign("/thank-you/");
      });
    }).catch(function () {
      if (fail) fail.hidden = false;
      button.disabled = false;
      if (label) label.hidden = false;
      if (wait) wait.hidden = true;
      form.removeAttribute("aria-busy");
    });
  }

  // Land "Book a Consultation" links (/book-consultation/#book-form, legacy #book) on the form heading.
  // The form is injected by JS, so the browser's own anchor jump happens before it exists.
  function jumpToConsultHash() {
    var el = document.getElementById("book-form");
    if (!el) return;
    var userMoved = false;
    function markMoved() { userMoved = true; }
    ["wheel", "touchmove", "keydown"].forEach(function (ev) {
      window.addEventListener(ev, markMoved, { passive: true });
    });
    function go() {
      if (userMoved) return;
      var hd = document.querySelector(".site-header");
      var off = hd ? Math.max(hd.offsetHeight, hd.getBoundingClientRect().bottom) : 0;
      var y = el.getBoundingClientRect().top + window.pageYOffset - off - 16;
      // instant: the html element has scroll-behavior: smooth
      window.scrollTo({ top: Math.max(0, y), left: 0, behavior: "instant" });
    }
    // the header and offer bar shrink once the page scrolls, so correct a few times
    function settle() {
      userMoved = false;
      go();
      window.requestAnimationFrame(go);
      [150, 400, 800, 1300].forEach(function (t) { window.setTimeout(go, t); });
    }
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.hash !== "#book-form" || a.pathname !== window.location.pathname) return;
      e.preventDefault();
      if (history.pushState) history.pushState(null, "", "#book-form");
      settle();
    });
    var h = window.location.hash;
    if (h !== "#book-form" && h !== "#book") return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    settle();
    window.addEventListener("load", function () { if (!userMoved) settle(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
  }

  function renderConsult() {
    var page = document.body.getAttribute("data-page");
    if (page === "404" || page === "thanks") return;
    if (document.querySelector(".rk-consult")) return;
    var main = document.querySelector("main");
    if (!main) return;
    var slot = document.querySelector("[data-consult-slot]") || main;
    slot.insertAdjacentHTML("beforeend", "<section class=\"rk-consult\" aria-labelledby=\"rk-consult-title\">\n      <div class=\"rk-consult-card\">\n        <div class=\"rk-consult-intro\">\n          <p class=\"rk-consult-badge\">Let's build something meaningful</p>\n          <h2 id=\"rk-consult-title\">\n            <span>Your Business Deserves</span>\n            <em>What's Next.</em>\n          </h2>\n          <p class=\"rk-consult-lead\">From digital visibility to meaningful B2B opportunities, let's explore how Hurfi can support your next stage of growth.</p>\n          <ul class=\"rk-consult-benefits\">\n            <li>Direct strategic consultation</li>\n            <li>Manufacturing-focused business insights</li>\n            <li>Practical direction for your next opportunity</li>\n          </ul>\n\n          <article class=\"rk-consult-person\">\n            <figure class=\"rk-consult-portrait\">\n              <img src=\"/assets/team/yasir.webp\" alt=\"Yasir Arafat, Head of Strategy and Consulting at Hurfi\" width=\"200\" height=\"200\">\n            </figure>\n            <div>\n              <h3>Yasir Arafat</h3>\n              <p class=\"rk-consult-role\">Head of Strategy &amp; Consulting, Hurfi</p>\n              <p class=\"rk-consult-note\">Let's discuss your goals and build a clear path forward.</p>\n              <button class=\"rk-consult-wechat\" type=\"button\" data-open-modal=\"yasir-wechat\"><svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M9.5 4C5.4 4 2 6.9 2 10.4c0 2 1.1 3.8 2.9 5l-.7 2.6 2.8-1.4c.8.2 1.6.4 2.5.4.3 0 .6 0 .9-.1-.2-.6-.3-1.2-.3-1.8 0-3.3 3.1-6 6.9-6 .2 0 .5 0 .7.1C16.8 6.1 13.4 4 9.5 4zm-2 3.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm4.2 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM17 9.2c-3.2 0-5.8 2.2-5.8 5s2.6 5 5.8 5c.6 0 1.2-.1 1.7-.2l2.3 1.2-.6-2.1c1.4-.9 2.4-2.3 2.4-3.9 0-2.8-2.6-5-5.8-5zm-1.7 2.3a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zm3.4 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z\"/></svg>Connect with Yasir on WeChat <span aria-hidden=\"true\">→</span></button>\n            </div>\n          </article>\n\n          <article class=\"rk-consult-mini\">\n            <img src=\"/assets/team/sharuk.webp\" alt=\"Shahruk Karim Simanto, China Client Relations Coordinator at Hurfi\" width=\"104\" height=\"104\">\n            <div>\n              <h3>Shahruk Karim Simanto</h3>\n              <p>China Client Relations Coordinator</p>\n              <p>China contact: <a href=\"tel:+8617792239260\">+86 17792239260</a></p>\n              <button class=\"rk-consult-mini-link\" type=\"button\" data-open-modal=\"shahruk-wechat\"><svg viewBox=\"0 0 24 24\" width=\"15\" height=\"15\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M9.5 4C5.4 4 2 6.9 2 10.4c0 2 1.1 3.8 2.9 5l-.7 2.6 2.8-1.4c.8.2 1.6.4 2.5.4.3 0 .6 0 .9-.1-.2-.6-.3-1.2-.3-1.8 0-3.3 3.1-6 6.9-6 .2 0 .5 0 .7.1C16.8 6.1 13.4 4 9.5 4zm-2 3.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm4.2 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM17 9.2c-3.2 0-5.8 2.2-5.8 5s2.6 5 5.8 5c.6 0 1.2-.1 1.7-.2l2.3 1.2-.6-2.1c1.4-.9 2.4-2.3 2.4-3.9 0-2.8-2.6-5-5.8-5zm-1.7 2.3a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zm3.4 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z\"/></svg>Connect on WeChat <span aria-hidden=\"true\">↗</span></button>\n            </div>\n          </article>\n        </div>\n\n        <div class=\"rk-consult-form-wrap\" id=\"book-form\">\n          <h3>Tell Us About Your Project</h3>\n          <p class=\"rk-consult-form-lead\">Share your requirements and let's explore the possibilities together.</p>\n          <form class=\"rk-consult-form\" name=\"project-inquiry\" method=\"POST\" action=\"https://formsubmit.co/yasir@hurfi.com\" novalidate>\n            <input type=\"hidden\" name=\"_subject\" value=\"Hurfi project inquiry\">\n            <input type=\"hidden\" name=\"_template\" value=\"table\">\n            <input type=\"hidden\" name=\"_captcha\" value=\"true\">\n            <input type=\"hidden\" name=\"_cc\" value=\"support@hurfi.com\">\n            <input type=\"hidden\" name=\"_next\" value=\"https://hurfi.com/thank-you/\">\n            <input type=\"hidden\" name=\"form-name\" value=\"project-inquiry\">\n            <p class=\"rk-consult-honey\">\n              <label>Don’t fill this out: <input name=\"bot-field\" tabindex=\"-1\" autocomplete=\"off\"></label> <input type=\"text\" name=\"_honey\" tabindex=\"-1\" autocomplete=\"off\" aria-hidden=\"true\">\n            </p>\n            <label class=\"rk-consult-field\">Full Name\n              <input type=\"text\" name=\"name\" required autocomplete=\"name\" placeholder=\"Your full name\" aria-describedby=\"consult-err-name\">\n              <span class=\"rk-consult-error\" id=\"consult-err-name\" hidden>Enter your full name.</span>\n            </label>\n            <label class=\"rk-consult-field\">Business Email\n              <input type=\"email\" name=\"email\" required autocomplete=\"email\" placeholder=\"you@company.com\" aria-describedby=\"consult-err-email\">\n              <span class=\"rk-consult-error\" id=\"consult-err-email\" hidden>Enter a valid business email.</span>\n            </label>\n            <label class=\"rk-consult-field\">WhatsApp Number\n              <input type=\"tel\" name=\"whatsapp\" autocomplete=\"tel\" inputmode=\"tel\" placeholder=\"+86 or +880\">\n            </label>\n            <label class=\"rk-consult-field\">WeChat ID\n              <input type=\"text\" name=\"wechat\" placeholder=\"Your WeChat ID\" autocomplete=\"off\">\n            </label>\n            <label class=\"rk-consult-field rk-consult-span\">Company / Brand Name\n              <input type=\"text\" name=\"company\" autocomplete=\"organization\" placeholder=\"Your company name\">\n            </label>\n            <label class=\"rk-consult-field\">Service Interested In\n              <select name=\"service\" required aria-describedby=\"consult-err-service\">\n                <option value=\"\">Select a service</option>\n                <option value=\"Business consulting\">Business consulting</option>\n                <option value=\"Website Development\">Website Development</option>\n                <option value=\"SEO\">SEO</option>\n                <option value=\"Digital Marketing\">Digital Marketing</option>\n                <option value=\"Social Media Management\">Social Media Management</option>\n                <option value=\"Other / Not sure\">Other / Not sure</option>\n              </select>\n              <span class=\"rk-consult-error\" id=\"consult-err-service\" hidden>Choose a service.</span>\n            </label>\n            <fieldset class=\"rk-consult-choice\">\n              <legend>Project Budget</legend>\n              <div class=\"rk-consult-pills\">\n                <label><input type=\"radio\" name=\"budget\" value=\"Under $1,000\"><span>Under $1,000</span></label>\n                <label><input type=\"radio\" name=\"budget\" value=\"$1,000 – $3,000\"><span>$1,000 – $3,000</span></label>\n                <label><input type=\"radio\" name=\"budget\" value=\"$3,000 – $5,000\"><span>$3,000 – $5,000</span></label>\n                <label><input type=\"radio\" name=\"budget\" value=\"$5,000 – $10,000\"><span>$5,000 – $10,000</span></label>\n                <label><input type=\"radio\" name=\"budget\" value=\"Above $10,000\"><span>Above $10,000</span></label>\n                <label><input type=\"radio\" name=\"budget\" value=\"Not Sure Yet\"><span>Not Sure Yet</span></label>\n              </div>\n            </fieldset>\n            <label class=\"rk-consult-field\">Project Details\n              <textarea name=\"details\" required rows=\"4\" placeholder=\"Tell us about your business, your goals, and what you need help with...\" aria-describedby=\"consult-err-details\"></textarea>\n              <span class=\"rk-consult-error\" id=\"consult-err-details\" hidden>Tell us about the project.</span>\n            </label>\n            <fieldset class=\"rk-consult-choice\">\n              <legend>Preferred Contact Method</legend>\n              <div class=\"rk-consult-pills\">\n                <label><input type=\"radio\" name=\"contact_method\" value=\"WeChat\" checked><span><svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M9.5 4C5.4 4 2 6.9 2 10.4c0 2 1.1 3.8 2.9 5l-.7 2.6 2.8-1.4c.8.2 1.6.4 2.5.4.3 0 .6 0 .9-.1-.2-.6-.3-1.2-.3-1.8 0-3.3 3.1-6 6.9-6 .2 0 .5 0 .7.1C16.8 6.1 13.4 4 9.5 4zm-2 3.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm4.2 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM17 9.2c-3.2 0-5.8 2.2-5.8 5s2.6 5 5.8 5c.6 0 1.2-.1 1.7-.2l2.3 1.2-.6-2.1c1.4-.9 2.4-2.3 2.4-3.9 0-2.8-2.6-5-5.8-5zm-1.7 2.3a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zm3.4 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z\"/></svg>WeChat</span></label>\n                <label><input type=\"radio\" name=\"contact_method\" value=\"WhatsApp\"><span><svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3zm0 1.6a7.4 7.4 0 0 1 6.3 11.3l-.2.4.7 2.6-2.7-.7-.4.2A7.4 7.4 0 1 1 12 4.6zm4.1 9.3c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1l-.6.7c-.1.2-.3.2-.5.1a6 6 0 0 1-1.8-1.1 6.6 6.6 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.5l.4-.5.2-.3c.1-.2 0-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 1.6.6 1.9.5 2.3.5.3 0 1.1-.4 1.3-.9.2-.4.2-.8.1-.9 0-.1-.2-.1-.4-.2z\"/></svg>WhatsApp</span></label>\n                <label><input type=\"radio\" name=\"contact_method\" value=\"Email\"><span><svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.2 7h15.6L12 12.2zM4 16.8l5.2-3.5L4 8.6v8.2zm16 0V8.6l-5.2 4.7L20 16.8z\"/></svg>Email</span></label>\n              </div>\n            </fieldset>\n            <p class=\"rk-consult-fail\" hidden role=\"alert\">We could not send this inquiry. Email yasir@hurfi.com and try again.</p>\n            <button class=\"rk-consult-submit\" type=\"submit\">\n              <span class=\"rk-consult-send-label\">Send Your Inquiry</span>\n              <span class=\"rk-consult-send-wait\" hidden>Sending…</span>\n              <span aria-hidden=\"true\">→</span>\n            </button>\n          </form>\n          <div class=\"rk-consult-done\" hidden>\n            <h3>Inquiry received</h3>\n            <p>Hurfi has your project details and will follow up.</p>\n          </div>\n        </div>\n      </div>\n\n      <dialog class=\"rk-consult-modal\" id=\"yasir-wechat\" aria-labelledby=\"yasir-wechat-title\">\n        <div class=\"rk-consult-modal-card\">\n          <button class=\"rk-consult-close\" type=\"button\" data-close-modal aria-label=\"Close\">×</button>\n          <h3 id=\"yasir-wechat-title\">Yasir Arafat</h3>\n          <p>Head of Strategy &amp; Consulting, Hurfi</p>\n          <img src=\"/assets/yasirarafating-wechat.jpeg\" alt=\"WeChat QR code for Yasir Arafat\" width=\"720\" height=\"960\">\n          <p>Scan using WeChat to connect directly.</p>\n        </div>\n      </dialog>\n      <dialog class=\"rk-consult-modal\" id=\"shahruk-wechat\" aria-labelledby=\"shahruk-wechat-title\">\n        <div class=\"rk-consult-modal-card\">\n          <button class=\"rk-consult-close\" type=\"button\" data-close-modal aria-label=\"Close\">×</button>\n          <h3 id=\"shahruk-wechat-title\">Connect with Shahruk Karim Simanto</h3>\n          <p>China Client Relations</p>\n          <img src=\"/assets/Shahruk_Karim_Simanto_wechat.jpg\" alt=\"WeChat QR code for Shahruk Karim Simanto\" width=\"720\" height=\"960\">\n          <p>Scan this QR code using WeChat.</p>\n        </div>\n      </dialog>\n    </section>");
  }

  function renderWechatDock() {
    if (document.querySelector(".wx-dock")) return;
    var icon = "<svg viewBox=\"0 0 24 24\" width=\"28\" height=\"28\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M9.5 4C5.4 4 2 6.9 2 10.4c0 2 1.1 3.8 2.9 5l-.7 2.6 2.8-1.4c.8.2 1.6.4 2.5.4.3 0 .6 0 .9-.1-.2-.6-.3-1.2-.3-1.8 0-3.3 3.1-6 6.9-6 .2 0 .5 0 .7.1C16.8 6.1 13.4 4 9.5 4zm-2 3.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm4.2 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM17 9.2c-3.2 0-5.8 2.2-5.8 5s2.6 5 5.8 5c.6 0 1.2-.1 1.7-.2l2.3 1.2-.6-2.1c1.4-.9 2.4-2.3 2.4-3.9 0-2.8-2.6-5-5.8-5zm-1.7 2.3a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zm3.4 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z\"/></svg>";
    if (!document.getElementById("yasir-wechat")) {
      document.body.insertAdjacentHTML("beforeend", "<dialog class=\"rk-consult-modal\" id=\"yasir-wechat\" aria-labelledby=\"yasir-wechat-title\"><div class=\"rk-consult-modal-card\"><button class=\"rk-consult-close\" type=\"button\" data-close-modal aria-label=\"Close\">×</button><h3 id=\"yasir-wechat-title\">Yasir Arafat</h3><p>Head of Strategy &amp; Consulting, Hurfi</p><img src=\"/assets/yasirarafating-wechat.jpeg\" alt=\"WeChat QR code for Yasir Arafat\" width=\"720\" height=\"960\"><p>Scan using WeChat to connect directly.</p></div></dialog>");
      var created = document.getElementById("yasir-wechat");
      created.querySelectorAll("[data-close-modal]").forEach(function (button) {
        button.addEventListener("click", function () { created.close(); });
      });
      created.addEventListener("click", function (event) {
        if (event.target === created) created.close();
      });
    }
    document.body.insertAdjacentHTML("beforeend", "<button class=\"wx-dock\" type=\"button\" data-open-modal=\"yasir-wechat\" data-bound=\"1\" aria-label=\"Connect with Yasir on WeChat\">" + icon + "</button>");
    document.querySelector(".wx-dock").addEventListener("click", function () {
      var dialog = document.getElementById("yasir-wechat");
      if (dialog && typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
    });
  }

  function initMediaPlaceholders() {
    function arm(el, readyEvent) {
      function ready() {
        el.classList.remove("is-pending");
      }
      if (el.dataset.ph || el.classList.contains("rk-hero-figure")) return;
      if (el.tagName === "IMG" && el.complete && el.naturalWidth) return;
      if (el.tagName === "VIDEO" && el.readyState >= 2) return;
      el.classList.add("is-pending");
      el.addEventListener(readyEvent, ready);
      el.addEventListener("error", ready);
      if (el.tagName === "VIDEO") el.addEventListener("playing", ready);
    }
    document.querySelectorAll("img").forEach(function (img) { arm(img, "load"); });
    document.querySelectorAll("video").forEach(function (video) { arm(video, "loadeddata"); });
  }

  // GA4 lead tracking. Never sends names, emails, phone numbers, WeChat IDs or message text.
  // generate_lead fires once, on /thank-you/, only after FormSubmit confirmed success (see submitInquiry).
  var LEAD_KEY = "hurfi_lead_pending";
  var LEAD_MAX_AGE_MS = 30 * 60 * 1000;
  function gaEvent(name, params) {
    try {
      if (typeof window.gtag === "function") { window.gtag("event", name, params); return; }
      window.dataLayer = window.dataLayer || [];
      (function () { window.dataLayer.push(arguments); })("event", name, params);
    } catch (e) {}
  }
  function leadChoice(form, key) {
    var el = form.querySelector('[name="' + key + '"]:checked') || form.querySelector('select[name="' + key + '"]');
    return el && el.value ? String(el.value).slice(0, 100) : "";
  }
  function markLeadPending(form) {
    try {
      var p = {
        form_id: form.getAttribute("name") || "consult-form",
        form_location: document.body.getAttribute("data-page") || "",
        lead_page_path: window.location.pathname,
        service_interest: leadChoice(form, "service"),
        budget_range: leadChoice(form, "budget"),
        contact_method: leadChoice(form, "contact_method"),
        lead_source: "website_form"
      };
      try {
        window.sessionStorage.setItem(LEAD_KEY, JSON.stringify({ ts: Date.now(), params: p }));
        return;
      } catch (e) {}
      // sessionStorage blocked: send now. gtag sends with a beacon, so the hit normally survives the redirect.
      gaEvent("generate_lead", p);
    } catch (e) {}
  }
  function trackLeadOnThanks() {
    if (document.body.getAttribute("data-page") !== "thanks") return;
    var raw = null;
    try {
      raw = window.sessionStorage.getItem(LEAD_KEY);
      window.sessionStorage.removeItem(LEAD_KEY); // consume first: a reload or revisit sends nothing
    } catch (e) { return; }
    if (!raw) return;
    try {
      var pending = JSON.parse(raw);
      if (!pending || !pending.params || !(Date.now() - pending.ts < LEAD_MAX_AGE_MS)) return;
      gaEvent("generate_lead", pending.params);
    } catch (e) {}
  }
  // contact_click: email, phone, WhatsApp and WeChat contact taps. Not a key event; the address or number is not sent.
  function bindContactClicks() {
    document.addEventListener("click", function (event) {
      try {
        var el = event.target && event.target.closest ? event.target.closest("a[href], [data-open-modal]") : null;
        if (!el) return;
        var method = "";
        if (el.tagName === "A") {
          var href = el.getAttribute("href") || "";
          if (/^mailto:/i.test(href) || href.indexOf("/cdn-cgi/l/email-protection") === 0) method = "email";
          else if (/^tel:/i.test(href)) method = "phone";
          else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\//i.test(href)) method = "whatsapp";
        } else if (/wechat/i.test(el.getAttribute("data-open-modal") || "")) {
          method = "wechat";
        }
        if (!method) return;
        var where = el.closest(".wx-dock") ? "wechat_dock"
          : el.closest("footer, .site-footer") ? "footer"
          : el.closest(".rk-consult") ? "consult_card"
          : el.closest("header, .site-header") ? "header" : "content";
        gaEvent("contact_click", { contact_method: method, link_location: where, form_location: document.body.getAttribute("data-page") || "" });
      } catch (e) {}
    }, true);
  }

  function boot() {
    ensureSkipLink();
    ensureMainId();
    initHeader();
    enhanceBookCtas();
    bindHeaderScroll();
    renderFaqs();
    bootSchemas();
    renderFooter();
    renderConsult();
    jumpToConsultHash();
    renderWechatDock();
    setYear();
    initHeroWords();
    initHgHero();
    initRkMeter();
    initRkReel();
    initRkGrowth();
    initRkServiceStack();
    initRkEco();
    initRkCompare();
    initRkVoices();
    initRkFaq();
    initClientsMarquee();
    initVisibilityGap();
    initHurfiServices();
    initWhyHurfi();
    initProof();
    initRkConsult();
    initMediaPlaceholders();
    trackLeadOnThanks();
    bindContactClicks();
    if (window.HURFI_I18N) window.HURFI_I18N.apply(document.body);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

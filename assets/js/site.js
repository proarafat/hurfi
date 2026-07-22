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
      { label: "Case Studies", path: "/case-studies/" },
      { label: "Industries", path: "/industries/" },
      { label: "Locations", path: "/locations/" },
      { label: "Contact Us", path: "/contact/" },
      { label: "Book a Consultation", path: "/book-consultation/", cta: true },
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
    logo.innerHTML = logoImg("logo-img", 168, 40);

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
    // Inline display:none so a stale CDN CSS cannot show the drawer logo on desktop
    navEl.innerHTML =
      '<div class="nav-drawer-head" style="display:none" hidden>' +
      '<a class="nav-drawer-brand" href="/" aria-label="Hurfi home">' +
      logoImg("nav-drawer-logo", 140, 32) +
      "</a></div>" +
      buildNavHtml(getNavItems(), here);

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

  function bootSchemas() {
    if (!window.HURFI_SCHEMA) return;
    var pageType = document.body.getAttribute("data-page");
    var hasStatic = !!document.querySelector('script[type="application/ld+json"]');
    if (!hasStatic) {
      injectJsonLd(window.HURFI_SCHEMA.organization);
      injectJsonLd(window.HURFI_SCHEMA.website);
      injectJsonLd(window.HURFI_SCHEMA.professionalService);
    }
    if ((pageType === "home" || pageType === "faq") && !hasStatic) {
      injectJsonLd(window.HURFI_SCHEMA.faqPage);
    }
    if (pageType === "location") {
      injectJsonLd({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Hurfi — Digital Growth for China",
        areaServed: { "@type": "Country", name: "China" },
        url: window.location.href,
        audience: "Chinese manufacturers, suppliers, and B2B companies",
      });
    }
    if (pageType === "service") {
      injectJsonLd({
        "@context": "https://schema.org",
        "@type": "Service",
        name: document.title,
        provider: { "@type": "Organization", name: "Hurfi" },
        areaServed: { "@type": "Country", name: "China" },
        url: window.location.href,
      });
    }
  }

  function setYear() {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function boot() {
    ensureSkipLink();
    ensureMainId();
    initHeader();
    bindHeaderScroll();
    renderFaqs();
    bootSchemas();
    setYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

/* Hurfi — shared runtime: dynamic nav, mobile menu, FAQ, schemas */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function currentPath() {
    var p = window.location.pathname || "/";
    if (!p.endsWith("/") && !p.split("/").pop().includes(".")) p += "/";
    if (p.endsWith("/index.html")) p = p.slice(0, -10) || "/";
    return p === "" ? "/" : p;
  }

  function isActive(itemPath, here) {
    if (itemPath === "/") return here === "/";
    return here === itemPath || here.indexOf(itemPath) === 0;
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

  function buildNav() {
    var site = window.HURFI_SITE;
    if (!site || !site.nav || !site.nav.length) return;

    var navEl = document.querySelector("[data-site-nav], nav[aria-label='Main']");
    if (!navEl) return;

    var here = currentPath();
    var html = '<ul class="nav">';

    site.nav.forEach(function (item) {
      if (item.children && item.children.length) {
        html += '<li class="has-dropdown">';
        html +=
          '<a href="' +
          escapeHtml(item.path) +
          '"' +
          (isActive(item.path, here) ? ' aria-current="page"' : "") +
          ">" +
          escapeHtml(item.label) +
          "</a>";
        html += '<ul class="dropdown">';
        item.children.forEach(function (child) {
          html +=
            '<li><a href="' +
            escapeHtml(child.path) +
            '"' +
            (isActive(child.path, here) ? ' aria-current="page"' : "") +
            ">" +
            escapeHtml(child.label) +
            "</a></li>";
        });
        html += "</ul></li>";
        return;
      }

      var cls = item.cta ? ' class="btn"' : "";
      html +=
        "<li><a" +
        cls +
        ' href="' +
        escapeHtml(item.path) +
        '"' +
        (isActive(item.path, here) ? ' aria-current="page"' : "") +
        ">" +
        escapeHtml(item.label) +
        "</a></li>";
    });

    html += "</ul>";
    navEl.innerHTML = html;
    if (!navEl.id) navEl.id = "site-nav";

    var header = document.querySelector(".header-inner");
    if (header && !document.querySelector(".nav-toggle")) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nav-toggle";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-controls", navEl.id);
      btn.textContent = "Menu";
      header.insertBefore(btn, navEl);
      btn.addEventListener("click", function () {
        var open = navEl.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
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
    // Avoid duplicating if static JSON-LD already present on home
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
      var geoName = document.body.getAttribute("data-geo") || "China";
      injectJsonLd({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Hurfi — Digital Growth for " + geoName,
        areaServed: { "@type": "Country", name: geoName },
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
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Chinese manufacturers and suppliers",
        },
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
    buildNav();
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

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
      { label: "Case Studies", path: "/case-studies/" },
      { label: "Industries", path: "/industries/" },
      { label: "Locations", path: "/locations/" },
      { label: "Contact Us", path: "/contact/" },
      { label: "Free Growth Strategy", path: "/book-consultation/", cta: true },
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

  function getCtaMeta() {
    var cta =
      (window.HURFI_SITE && window.HURFI_SITE.primaryCTA) || {
        url: "/book-consultation/",
        freeLabel: "Limited-time free",
        offerBar: "Limited-time free consultation — priority slots open now",
        offerHours: 48,
        timeline: [
          { label: "Book", hint: "Free" },
          { label: "Meet", hint: "30 min" },
          { label: "Plan", hint: "Next steps" },
        ],
      };
    return cta;
  }

  function timelineHtml(steps, modifier) {
    var list =
      '<ol class="consult-timeline' +
      (modifier ? " " + modifier : "") +
      '" aria-label="Free consultation steps">';
    (steps || []).forEach(function (step) {
      list +=
        '<li class="consult-timeline__step">' +
        '<span class="consult-timeline__dot" aria-hidden="true"></span>' +
        '<span class="consult-timeline__label">' +
        escapeHtml(step.label) +
        "</span>" +
        '<span class="consult-timeline__hint">' +
        escapeHtml(step.hint || "") +
        "</span></li>";
    });
    list += "</ol>";
    return list;
  }

  var OFFER_DISMISS_KEY = "hurfi_offer_dismissed";
  var OFFER_ENDS_KEY = "hurfi_offer_ends_at";
  var OFFER_ENTRY_KEY = "hurfi_offer_entry_path";

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function formatCountdown(ms) {
    if (ms <= 0) return { expired: true, text: "00:00:00" };
    var totalSec = Math.floor(ms / 1000);
    var days = Math.floor(totalSec / 86400);
    var hours = Math.floor((totalSec % 86400) / 3600);
    var mins = Math.floor((totalSec % 3600) / 60);
    var secs = totalSec % 60;
    if (days > 0) {
      return {
        expired: false,
        text: days + "d " + pad2(hours) + "h " + pad2(mins) + "m " + pad2(secs) + "s",
      };
    }
    return {
      expired: false,
      text: pad2(hours) + "h " + pad2(mins) + "m " + pad2(secs) + "s",
    };
  }

  function getOfferEndsAt(hours) {
    var windowMs = Math.max(1, hours || 48) * 60 * 60 * 1000;
    try {
      var raw = localStorage.getItem(OFFER_ENDS_KEY);
      var ends = raw ? parseInt(raw, 10) : 0;
      if (!ends || isNaN(ends)) {
        ends = Date.now() + windowMs;
        localStorage.setItem(OFFER_ENDS_KEY, String(ends));
        return ends;
      }
      // Loop: when a window expires, start a fresh 48h cycle
      while (ends <= Date.now()) {
        ends += windowMs;
      }
      localStorage.setItem(OFFER_ENDS_KEY, String(ends));
      return ends;
    } catch (e) {
      return Date.now() + windowMs;
    }
  }

  function isOfferDismissed() {
    try {
      return localStorage.getItem(OFFER_DISMISS_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function dismissOffer() {
    try {
      localStorage.setItem(OFFER_DISMISS_KEY, "1");
    } catch (e) {}
  }

  function isFirstViewPage() {
    var here = currentPath();
    try {
      var entry = sessionStorage.getItem(OFFER_ENTRY_KEY);
      if (!entry) {
        sessionStorage.setItem(OFFER_ENTRY_KEY, here);
        entry = here;
      }
      // Only the first page opened in this browser tab/session
      return here === entry;
    } catch (e) {
      return here === "/";
    }
  }

  function shouldShowOfferBar() {
    if (isOfferDismissed()) return false;
    return isFirstViewPage();
  }

  function injectOfferBar() {
    if (document.querySelector(".site-offer-bar")) return;
    var header = document.querySelector(".site-header");
    if (!header) return;
    var cta = getCtaMeta();
    if (!shouldShowOfferBar()) return;

    var hours = cta.offerHours || 48;
    var endsAt = getOfferEndsAt(hours);
    var bar = document.createElement("div");
    bar.className = "site-offer-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Limited-time consultation offer");
    bar.innerHTML =
      '<div class="container offer-bar-inner">' +
      '<span class="offer-bar-badge">Limited</span>' +
      '<p class="offer-bar-text">' +
      '<span class="offer-bar-text-full">' +
      escapeHtml(cta.offerBar || "Free consultation — priority slots open now") +
      "</span>" +
      '<span class="offer-bar-text-short">Free consult open</span>' +
      "</p>" +
      '<div class="offer-countdown" aria-live="polite">' +
      '<span class="offer-countdown-label">Ends in</span>' +
      '<time class="offer-countdown-time" datetime="">--</time>' +
      "</div>" +
      '<a class="offer-bar-cta" href="' +
      escapeHtml(cta.url || "/book-consultation/") +
      '"><span class="offer-bar-cta-free">Limited</span><span class="offer-bar-cta-label">Book Free</span></a>' +
      '<button type="button" class="offer-bar-close" aria-label="Dismiss offer">×</button>' +
      "</div>";
    header.insertAdjacentElement("afterend", bar);

    var timeEl = bar.querySelector(".offer-countdown-time");
    var timerId = null;

    function tick() {
      var left = endsAt - Date.now();
      if (left <= 0) {
        endsAt = getOfferEndsAt(hours);
        left = endsAt - Date.now();
      }
      var parts = formatCountdown(left);
      if (timeEl) {
        timeEl.textContent = parts.text;
        timeEl.setAttribute("datetime", new Date(endsAt).toISOString());
      }
    }

    tick();
    timerId = setInterval(tick, 1000);

    var closeBtn = bar.querySelector(".offer-bar-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        if (timerId) clearInterval(timerId);
        dismissOffer();
        bar.remove();
      });
    }
  }

  function enhanceBookCtas() {
    var cta = getCtaMeta();
    var steps = cta.timeline || [];
    var freeLabel = cta.freeLabel || "Limited-time free";

    document.querySelectorAll('a.btn[href*="book-consultation"]').forEach(function (btn) {
      if (
        btn.closest(".site-nav") ||
        btn.closest(".home-hero") ||
        btn.closest(".cta-stack") ||
        btn.classList.contains("btn-outline")
      ) {
        return;
      }
      var stack = document.createElement("div");
      stack.className = "cta-stack";
      btn.parentNode.insertBefore(stack, btn);
      stack.appendChild(btn);
      var chip = document.createElement("p");
      chip.className = "cta-free-chip";
      chip.textContent = freeLabel;
      stack.appendChild(chip);
      stack.insertAdjacentHTML("beforeend", timelineHtml(steps, "consult-timeline--compact"));
    });

    // Nav CTA limited tag
    document.querySelectorAll('.site-nav a.btn[href*="book-consultation"]').forEach(function (btn) {
      if (btn.querySelector(".cta-free-tag")) return;
      var tag = document.createElement("span");
      tag.className = "cta-free-tag";
      tag.textContent = "Limited";
      btn.appendChild(tag);
    });

    // Book page form submit area
    var formBtn = document.querySelector('form[name="book-consultation"] button.btn[type="submit"]');
    if (formBtn && !formBtn.closest(".cta-stack")) {
      var stack = document.createElement("div");
      stack.className = "cta-stack";
      formBtn.parentNode.replaceChild(stack, formBtn);
      stack.appendChild(formBtn);
      var chip = document.createElement("p");
      chip.className = "cta-free-chip";
      chip.textContent = freeLabel;
      stack.appendChild(chip);
      stack.insertAdjacentHTML("beforeend", timelineHtml(steps, "consult-timeline--compact"));
    }
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
        // Keep logos readable — don't squeeze the full set into one viewport
        var tileW = 168;
        if (viewW < 900) tileW = 150;
        if (viewW < 560) tileW = 136;

        lists.forEach(function (list) {
          list.querySelectorAll(".clients-logo").forEach(function (logo) {
            logo.style.width = tileW + "px";
          });
        });

        var setWidth = tileW * count + gap * Math.max(count - 1, 0);
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

  function boot() {
    ensureSkipLink();
    ensureMainId();
    initHeader();
    injectOfferBar();
    enhanceBookCtas();
    bindHeaderScroll();
    renderFaqs();
    bootSchemas();
    setYear();
    initHeroWords();
    initClientsMarquee();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

/**
 * DL MVP workshop — EN ↔ DE language switch
 * English lives in the HTML; German overrides via i18n-de.json (exact HTML fragment keys).
 */
(function () {
  var STORAGE_KEY = "dl-mvp-lang";
  var SELECTORS = [
    "h1",
    "h2",
    "h3",
    ".eyebrow",
    ".section-break-kicker",
    ".section-break-title",
    ".step-text",
    ".step-sub",
    ".principle-title",
    ".principle-desc",
    ".upside-card-title",
    ".upside-card-desc",
    ".agenda-title",
    ".agenda-pillar-title",
    ".agenda-pillar-sub",
    ".agenda-timing td",
    ".goals-title",
    ".goals-item",
    ".analogy-label",
    ".analogy-title",
    ".analogy-desc",
    ".recap-phrase",
    ".recap-takeaway p",
    ".big-quote",
    ".layer-title",
    ".layer-desc",
    ".panic-card-title",
    ".panic-card-desc",
    ".panic-rules-label",
    ".panic-rules > div",
    ".speaker-lead",
    ".speaker-role-line",
    ".speaker-contact",
    ".speaker-focus span",
    ".speaker-card-body .name",
    ".speaker-card-body .role",
    ".practice-title",
    ".practice-meta-block",
    ".practice-check-item",
    ".flow-node-label",
    ".flow-node-sub",
    ".cmd-explain-cmd",
    ".cmd-explain-desc",
    ".showcase-title",
    ".showcase-desc",
    ".handson-badge",
    ".copyright-title",
    ".copyright-body p",
    "#nav-head > span",
    "#nav-foot",
    ".chip",
    ".title-lead",
    ".slide-inner p",
    ".quote-source",
    "title",
  ].join(",");

  var TAG_LABELS = {
    en: { repeat: "Repeat", bonus: "Bonus", summary: "Summary" },
    de: { repeat: "Repeat", bonus: "Bonus", summary: "Summary" },
  };

  var FOOTER = {
    en: "DL School · B07/26 · Module 3 · MVP Development with AI II",
    de: "DL School · B07/26 · Module 3 · MVP Development with AI II",
  };

  var originals = new WeakMap();
  var deMap = null;
  var current = "en";
  var ready = false;

  function normalize(html) {
    return String(html || "")
      .replace(/\u00a0/g, " ")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/<br\s*\/?>/gi, "<br>")
      .replace(/<([a-zA-Z0-9]+)(\s[^>]*?)(\s*\/?)>/g, function (full, tag, attrs, close) {
        if (!attrs) return full;
        var pairs = [];
        String(attrs).replace(/([a-zA-Z0-9:-]+)="([^"]*)"/g, function (_, k, v) {
          pairs.push([k.toLowerCase(), v]);
        });
        pairs.sort(function (a, b) {
          return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
        });
        var sorted = pairs
          .map(function (p) {
            return p[0] + '="' + p[1] + '"';
          })
          .join(" ");
        return "<" + tag.toLowerCase() + (sorted ? " " + sorted : "") + (close || "") + ">";
      })
      .replace(/\s*=\s*/g, "=")
      .replace(/\s+/g, " ")
      .trim();
  }

  function captureOriginal(el) {
    if (!originals.has(el)) {
      originals.set(el, el.innerHTML);
    }
    return originals.get(el);
  }

  function translateFragment(html, map) {
    var key = normalize(html);
    if (Object.prototype.hasOwnProperty.call(map, key)) return map[key];
    if (Object.prototype.hasOwnProperty.call(map, html)) return map[html];
    return null;
  }

  var PHRASING = {
    A: 1,
    STRONG: 1,
    EM: 1,
    B: 1,
    I: 1,
    CODE: 1,
    SPAN: 1,
    BR: 1,
    KBD: 1,
    U: 1,
    MARK: 1,
    SMALL: 1,
    SUP: 1,
    SUB: 1,
  };

  function isSkippedRegion(el) {
    return !!(
      el.closest(".code-block") ||
      el.closest("pre") ||
      el.closest("aside.notes") ||
      el.closest(".title-terminal") ||
      el.closest("svg") ||
      el.closest(".dl-header")
    );
  }

  function isTranslatableLeaf(el) {
    if (!el || !el.tagName) return false;
    var tag = el.tagName;
    if (
      tag === "SCRIPT" ||
      tag === "STYLE" ||
      tag === "SVG" ||
      tag === "PATH" ||
      tag === "CODE" ||
      tag === "PRE" ||
      tag === "KBD" ||
      tag === "IMG" ||
      tag === "BR" ||
      tag === "HR" ||
      tag === "INPUT" ||
      tag === "BUTTON"
    ) {
      return false;
    }
    if (isSkippedRegion(el)) return false;
    if (el.classList && el.classList.contains("c-green")) return false;
    if (el.classList && (el.classList.contains("c-gray") || el.classList.contains("c-yellow") || el.classList.contains("c-red") || el.classList.contains("c-white")))
      return false;
    var text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (text.length < 3) return false;
    var kids = el.children;
    for (var i = 0; i < kids.length; i++) {
      if (!PHRASING[kids[i].tagName]) return false;
    }
    return true;
  }

  function isInsideSelectorMatch(el) {
    var p = el.parentElement;
    while (p) {
      if (p.matches && p.matches(SELECTORS)) return true;
      if (p.classList && p.classList.contains("slide-inner")) break;
      if (p.id === "nav-overlay" || p.id === "lang-switch") break;
      p = p.parentElement;
    }
    return false;
  }

  function captureAllOriginals() {
    document.querySelectorAll(SELECTORS).forEach(captureOriginal);
    document
      .querySelectorAll(".reveal .slides section .slide-inner *")
      .forEach(function (el) {
        if (!isTranslatableLeaf(el)) return;
        if (el.matches && el.matches(SELECTORS)) return;
        if (isInsideSelectorMatch(el)) return;
        captureOriginal(el);
      });
    var titleEl = document.querySelector("title");
    if (titleEl) captureOriginal(titleEl);
  }

  function applyToElement(el, lang, map) {
    if (isSkippedRegion(el)) return;
    var original = captureOriginal(el);
    if (lang === "en") {
      el.innerHTML = original;
      return;
    }
    var translated = translateFragment(original, map);
    if (translated != null) {
      el.innerHTML = translated;
      return;
    }
    if (el.children.length === 0) {
      var t = translateFragment(el.textContent, map);
      if (t != null) el.textContent = t;
    }
  }

  function updateSlideTags(lang) {
    var labels = TAG_LABELS[lang] || TAG_LABELS.en;
    document.querySelectorAll(".slide-tag").forEach(function (el) {
      Object.keys(labels).forEach(function (key) {
        if (el.classList.contains("slide-tag-" + key))
          el.textContent = labels[key];
      });
    });
  }

  function updateFooter(lang) {
    var text = FOOTER[lang] || FOOTER.en;
    var el = document.getElementById("slide-footer-credit");
    if (el) el.textContent = text;
    document.documentElement.style.setProperty(
      "--dl-slide-footer",
      '"' + text + '"',
    );
  }

  function updateSwitchUI(lang) {
    document.querySelectorAll("[data-lang-option]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang-option") === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function rebuildNavIfPossible() {
    if (typeof window.navRebuild === "function") {
      window.navRebuild();
    }
  }

  function setLanguage(lang, opts) {
    opts = opts || {};
    if (lang !== "en" && lang !== "de") lang = "en";
    if (!ready && lang === "de" && !deMap) return;
    current = lang;
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    var map = lang === "de" ? deMap || {} : {};

    // 1) Known structured selectors
    document.querySelectorAll(SELECTORS).forEach(function (el) {
      applyToElement(el, lang, map);
    });

    // 2) Remaining leaf copy (unlabeled divs, etc.)
    document
      .querySelectorAll(".reveal .slides section .slide-inner *")
      .forEach(function (el) {
        if (!isTranslatableLeaf(el)) return;
        if (el.matches && el.matches(SELECTORS)) return;
        if (isInsideSelectorMatch(el)) return;
        applyToElement(el, lang, map);
      });

    var titleEl = document.querySelector("title");
    if (titleEl) applyToElement(titleEl, lang, map);

    updateSlideTags(lang);
    updateFooter(lang);
    updateSwitchUI(lang);
    rebuildNavIfPossible();

    if (!opts.silent) {
      document.dispatchEvent(
        new CustomEvent("dl-lang-change", { detail: { lang: lang } }),
      );
    }
  }

  function toggleLanguage() {
    setLanguage(current === "en" ? "de" : "en");
  }

  function initSwitch() {
    var root = document.getElementById("lang-switch");
    if (!root) return;
    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lang-option]");
      if (!btn) return;
      setLanguage(btn.getAttribute("data-lang-option"));
    });
  }

  function loadTranslations() {
    return fetch("i18n-de.json", { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("i18n-de.json missing");
        return r.json();
      })
      .then(function (json) {
        // Normalize keys for robust matching
        deMap = {};
        Object.keys(json).forEach(function (k) {
          deMap[k] = json[k];
          deMap[normalize(k)] = json[k];
        });
        ready = true;
      })
      .catch(function (err) {
        console.warn("[i18n]", err);
        deMap = {};
        ready = true;
      });
  }

  window.dlSetLanguage = setLanguage;
  window.dlToggleLanguage = toggleLanguage;
  window.dlGetLanguage = function () {
    return current;
  };

  function boot() {
    initSwitch();
    updateFooter("en");
    var params = new URLSearchParams(window.location.search);
    var fromUrl = params.get("lang");
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}
    var initial =
      fromUrl === "de" || fromUrl === "en"
        ? fromUrl
        : stored === "de" || stored === "en"
          ? stored
          : "en";

    loadTranslations().then(function () {
      captureAllOriginals();
      if (initial === "de") setLanguage("de", { silent: true });
      else {
        current = "en";
        updateSwitchUI("en");
      }
    });
  }

  function whenSlidesReady(cb) {
    var host = document.querySelector(".reveal .slides");
    if (host && host.querySelector("section")) {
      cb();
      return;
    }
    document.addEventListener("dl-slides-ready", cb, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      whenSlidesReady(boot);
    });
  } else {
    whenSlidesReady(boot);
  }
})();

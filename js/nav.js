(function () {
  function buildNav() {
    var sections = Array.from(
      document.querySelectorAll(".reveal .slides > section"),
    );
    var list = document.getElementById("nav-list");
    list.innerHTML = "";

    sections.forEach(function (sec, i) {
      var eyebrowEl = sec.querySelector(".eyebrow");
      var h2El = sec.querySelector("h2");
      var h1El = sec.querySelector("h1");
      var isBreak = !eyebrowEl && !h2El;

      var item = document.createElement("div");
      item.className = "nav-item" + (isBreak ? " is-break" : "");
      item.dataset.idx = i;

      var num = document.createElement("div");
      num.className = "nav-num";
      num.textContent = i + 1;

      var label = document.createElement("div");
      label.className = "nav-label";

      if (eyebrowEl) {
        var ey = document.createElement("div");
        ey.className = "nav-eyebrow";
        ey.textContent = eyebrowEl.textContent.trim();
        label.appendChild(ey);
      }

      var title = document.createElement("div");
      title.className = "nav-title";
      title.textContent = (h2El || h1El)?.textContent.trim() || "—";
      label.appendChild(title);

      item.appendChild(num);
      item.appendChild(label);
      item.addEventListener("click", function () {
        Reveal.slide(i);
        navClose();
      });

      list.appendChild(item);
    });
  }

  function markActive() {
    var idx = Reveal.getState().indexh;
    document.querySelectorAll(".nav-item").forEach(function (el) {
      var active = parseInt(el.dataset.idx, 10) === idx;
      el.classList.toggle("active", active);
      if (active) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }

  window.navToggle = function () {
    var ov = document.getElementById("nav-overlay");
    if (ov.classList.contains("open")) {
      navClose();
    } else {
      ov.classList.add("open");
      markActive();
    }
  };

  window.navClose = function () {
    document.getElementById("nav-overlay").classList.remove("open");
  };

  document.addEventListener("keydown", function (e) {
    if (
      (e.key === "g" || e.key === "G") &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      navToggle();
    }
    if (e.key === "Escape") navClose();
  });

  window.navRebuild = function () {
    buildNav();
    markActive();
  };

  function init() {
    buildNav();
    Reveal.on("slidechanged", markActive);
  }

  if (window.Reveal) {
    Reveal.isReady() ? init() : Reveal.on("ready", init);
  }

  document.addEventListener("dl-lang-change", function () {
    if (typeof window.navRebuild === "function") window.navRebuild();
  });
})();

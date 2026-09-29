// Arinaitwe Foundation — site interactions
(function () {
  "use strict";

  var root = document.documentElement;

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Scroll: progress bar, sticky header state, back-to-top
  var progressBar = document.getElementById("progressBar");
  var header = document.getElementById("siteHeader");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var max = root.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (root.scrollTop / max) * 100 : 0;
    if (progressBar) progressBar.style.width = pct.toFixed(1) + "%";
    if (header) {
      if (root.scrollTop > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    if (toTop) {
      if (root.scrollTop > 480) toTop.classList.add("visible");
      else toTop.classList.remove("visible");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Toggle navigation");
    });
    Array.prototype.forEach.call(menu.querySelectorAll("a"), function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active nav highlighting
  var sections = [];
  Array.prototype.forEach.call(document.querySelectorAll(".nav-menu a[href^='#']"), function (link) {
    var id = link.getAttribute("href").slice(1);
    var el = document.getElementById(id);
    if (el) sections.push({ link: link, el: el });
  });

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          sections.forEach(function (s) { s.link.classList.remove("active"); });
          var key = sections.find(function (s) { return s.el === entry.target; });
          if (key) key.link.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s.el); });
  }

  // Scroll reveal with gentle stagger inside grids
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    Array.prototype.forEach.call(revealEls, function (el) {
      var parent = el.closest(".belief-grid, .pillar-grid, .programme-grid, .timeline");
      if (parent) {
        var i = Array.prototype.indexOf.call(parent.children, el);
        el.style.transitionDelay = Math.min(i * 90, 360) + "ms";
      }
    });
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(revealEls, function (el) { revealObserver.observe(el); });
  } else {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add("visible"); });
  }

  // Demo contact form (client-side only; wire to a real endpoint when ready)
  var form = document.getElementById("contactForm");
  var statusEl = document.getElementById("formStatus");
  if (form && statusEl) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        statusEl.textContent = "Please fill in every field.";
        statusEl.hidden = false;
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        statusEl.textContent = "Please enter a valid email address.";
        statusEl.hidden = false;
        return;
      }

      statusEl.textContent =
        "Thanks, " + name + "! This is a demo form — nothing was sent. " +
        "Wire it to your email service to go live.";
      statusEl.hidden = false;
      form.reset();
    });
  }
})();
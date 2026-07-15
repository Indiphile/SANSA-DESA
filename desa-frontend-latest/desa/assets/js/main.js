// DESA main.js
(function () {
  // -----------------------------
  // Active nav link (supports data-nav or normal links)
  // -----------------------------
  const path = window.location.pathname.split("/").pop() || "";
  const navLinks = document.querySelectorAll("a[data-nav], .nav-links a");

  navLinks.forEach(a => {
    const href = (a.getAttribute("href") || "").split("?")[0];
    if (href === path) a.classList.add("active");
  });

  // -----------------------------
  // Footer year (optional)
  // -----------------------------
  const y = document.querySelector("#year");
  if (y) y.textContent = new Date().getFullYear();

  // -----------------------------
  // Scroll Reveal (site-wide)
  // -----------------------------
  const revealEls = Array.from(document.querySelectorAll(".reveal"));

  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

    revealEls.forEach(el => io.observe(el));
  }

  // -----------------------------
  // Animated counters (optional)
  // Usage: <span class="stat-num counter" data-target="30" data-suffix="+">0</span>
  // -----------------------------
  const counters = Array.from(document.querySelectorAll(".counter"));

  if (counters.length) {
    const animateCounter = (el) => {
      const target = Number(el.dataset.target || "0");
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      const duration = Number(el.dataset.duration || "900"); // ms

      const start = 0;
      const startTime = performance.now();

      const step = (now) => {
        const t = Math.min((now - startTime) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);

        const value = Math.round(start + (target - start) * eased);
        el.textContent = `${prefix}${value}${suffix}`;

        if (t < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    counters.forEach(c => cio.observe(c));
  }
  
  // FAQ toggle
const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
  });
});

// Help search filter
const helpSearch = document.querySelector("#helpSearch");
const faqItems = document.querySelectorAll(".faq-item");

if (helpSearch && faqItems.length) {
  helpSearch.addEventListener("input", () => {
    const term = helpSearch.value.toLowerCase();

    faqItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(term) ? "block" : "none";
    });
  });
}
})();


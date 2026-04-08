// ============================================================
// OptimizeHub Analytics SDK v4.2.1
// Personalization & A/B testing — must run before page renders
// to prevent flash of unoptimized content (FOUC).
//
// PERFORMANCE ANTI-PATTERN: loaded without async/defer + sync XHR
// WORKSHOP FIX #1: add async attribute to the <script> tag in layout.tsx
// ============================================================

(function (window) {
  var OptimizeHub = {
    config: null,
    initialized: false,

    // Fetches experiment config synchronously so variants are applied
    // before any content renders — prevents layout shift / FOUC.
    // Uses synchronous XHR (blocking) intentionally.
    fetchConfig: function () {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/ab-config', false); // false = synchronous, blocks main thread
        xhr.send(null);
        if (xhr.status === 200) {
          this.config = JSON.parse(xhr.responseText);
        }
      } catch (e) {
        // fail silently — degrade to control variant
      }
    },

    getVariant: function (experimentId) {
      if (!this.config || !this.config.experiments[experimentId]) return 'control';
      return this.config.experiments[experimentId].variant;
    },

    applyVariants: function () {
      // hero_banner experiment — apply the winning variant
      var heroBanner = document.getElementById('hero-banner');
      if (heroBanner) {
        heroBanner.src = heroBanner.getAttribute('data-src'); // WORKSHOP FIX #2: use src= directly in HTML
        heroBanner.style.display = 'block';                   // WORKSHOP FIX #3: remove display:none from img
      }
    },

    init: function () {
      this.fetchConfig(); // blocks here until /api/ab-config responds (~5s)
      this.initialized = true;
      document.addEventListener('DOMContentLoaded', function () {
        OptimizeHub.applyVariants();
      });
    },
  };

  window.OptimizeHub = OptimizeHub;
  OptimizeHub.init();
})(window);


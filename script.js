/**
 * ONEVO — OFFICIAL PUBLIC LAUNCH JAVASCRIPT
 * Inspired by Echo Music (echomusic.fun) UI Interactions
 * Pure Vanilla ES6+ • Zero External Dependencies • Static Hosting Ready
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CENTRALIZED RELEASE CONFIGURATION
     All release details are managed here. If a property is null, the UI
     gracefully hides it rather than inventing unverified claims.
     ========================================================================== */
  const ONEVO_RELEASE_CONFIG = {
    appName: "ONEVO",
    tagline: "One profile. Endless connections.",
    apkDownloadUrl: "/apk/release.apk",
    apkFileName: "ONEVO.apk",
    version: "1.0.0",
    releaseDate: "Official Public Release 2026",
    fileSize: null, // Set to string e.g. "18.4 MB" only when verified; otherwise hidden
    compatibility: "Android 8.0 (API 26) or newer",
    distributionNotice: "Official release distributed directly by ONEVO."
  };

  /* ==========================================================================
     2. DOWNLOAD BUTTON SYNCHRONIZATION
     ========================================================================== */
  function syncReleaseConfig() {
    // Detect GitHub Pages subpath (e.g. https://username.github.io/repo-name/)
    let downloadUrl = ONEVO_RELEASE_CONFIG.apkDownloadUrl;
    if (window.location.hostname.includes('github.io')) {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0 && !pathSegments[0].includes('.')) {
        downloadUrl = '/' + pathSegments[0] + '/public/apk/release.apk';
      } else {
        downloadUrl = './public/apk/release.apk';
      }
    }

    const downloadButtons = document.querySelectorAll('a.btn-download, a[data-download-apk]');
    downloadButtons.forEach(btn => {
      btn.setAttribute('href', downloadUrl);
      btn.setAttribute('download', ONEVO_RELEASE_CONFIG.apkFileName);
    });

    const versionEl = document.getElementById('meta-app-version');
    const compatibilityEl = document.getElementById('meta-compatibility');
    const fileSizeCol = document.getElementById('meta-filesize-col');
    const fileSizeVal = document.getElementById('meta-file-size');

    if (versionEl && ONEVO_RELEASE_CONFIG.version) {
      versionEl.textContent = `v${ONEVO_RELEASE_CONFIG.version}`;
    }
    if (compatibilityEl && ONEVO_RELEASE_CONFIG.compatibility) {
      compatibilityEl.textContent = ONEVO_RELEASE_CONFIG.compatibility;
    }
    if (fileSizeCol) {
      if (ONEVO_RELEASE_CONFIG.fileSize) {
        fileSizeCol.style.display = 'flex';
        if (fileSizeVal) fileSizeVal.textContent = ONEVO_RELEASE_CONFIG.fileSize;
      } else {
        fileSizeCol.style.display = 'none';
      }
    }
  }

  /* ==========================================================================
     3. RIPPLE EFFECT (ECHO MUSIC TACTILE CLICKS)
     ========================================================================== */
  function initRippleEffect() {
    const ripples = document.querySelectorAll('.ripple');
    ripples.forEach(el => {
      el.addEventListener('click', function (e) {
        const circle = document.createElement('span');
        const diameter = Math.max(el.clientWidth, el.clientHeight);
        const radius = diameter / 2;
        const rect = el.getBoundingClientRect();

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple-span');

        const existing = el.getElementsByClassName('ripple-span')[0];
        if (existing) existing.remove();

        el.appendChild(circle);

        setTimeout(() => {
          circle.remove();
        }, 600);
      });
    });
  }

  /* ==========================================================================
     4. FAQ ACCORDION (ECHO MUSIC EXPANDABLE + / × PATTERN)
     ========================================================================== */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!question || !answer) return;

      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('open')) {
            otherItem.classList.remove('open');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = '0px';
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('open');
          answer.style.maxHeight = '0px';
        } else {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 32 + 'px';
        }
      });
    });
  }

  /* ==========================================================================
     5. SIGNATURE NAMELINK INTERACTIVE SIMULATION
     ========================================================================== */
  function initNameLinkSimulation() {
    const stage = document.querySelector('.namelink-mini-stage');
    const triggerBtn = document.getElementById('nl-sim-trigger');

    if (!stage) return;

    let timer = null;

    function runSimulation() {
      if (timer) clearTimeout(timer);
      stage.classList.remove('is-active');

      setTimeout(() => {
        stage.classList.add('is-active');
        timer = setTimeout(() => {
          // Keep active until re-triggered
        }, 2200);
      }, 50);
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', function (e) {
        e.preventDefault();
        runSimulation();
      });
    }

    // Auto-trigger on viewport enter
    if ('IntersectionObserver' in window) {
      let triggered = false;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            runSimulation();
          }
        });
      }, { threshold: 0.3 });
      obs.observe(stage);
    } else {
      runSimulation();
    }
  }

  /* ==========================================================================
     6. MOBILE NAVIGATION DRAWER WITH BODY SCROLL LOCK
     ========================================================================== */
  function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const drawerLinks = document.querySelectorAll('.mobile-drawer a');

    if (!toggleBtn || !drawer) return;

    function toggleDrawer(open) {
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      } else {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    toggleBtn.addEventListener('click', function () {
      const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleDrawer(!isOpen);
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => toggleDrawer(false));
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        toggleDrawer(false);
        toggleBtn.focus();
      }
    });
  }

  /* ==========================================================================
     7. MODAL DIALOGS WITH BODY SCROLL LOCK
     ========================================================================== */
  function initModals() {
    const triggers = document.querySelectorAll('[data-open-modal]');
    const modals = document.querySelectorAll('.modal-overlay');

    function openModal(id) {
      const modal = document.getElementById(id);
      if (!modal) return;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    triggers.forEach(t => {
      t.addEventListener('click', function (e) {
        e.preventDefault();
        const id = t.getAttribute('data-open-modal');
        openModal(id);
      });
    });

    modals.forEach(m => {
      const closeBtn = m.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal(m));
      }
      m.addEventListener('click', function (e) {
        if (e.target === m) closeModal(m);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const openEl = document.querySelector('.modal-overlay.is-open');
        if (openEl) closeModal(openEl);
      }
    });
  }

  /* ==========================================================================
     8. REVEAL ON SCROLL (INTERSECTION OBSERVER)
     ========================================================================== */
  function initRevealOnScroll() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.08
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     9. DYNAMIC COPYRIGHT YEAR
     ========================================================================== */
  function initCopyright() {
    const yr = document.getElementById('current-year');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     10. INITIALIZATION
     ========================================================================== */
  function init() {
    syncReleaseConfig();
    initRippleEffect();
    initFaqAccordion();
    initNameLinkSimulation();
    initMobileNav();
    initModals();
    initRevealOnScroll();
    initCopyright();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ONEVO_RELEASE = ONEVO_RELEASE_CONFIG;
})();

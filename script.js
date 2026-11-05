/**
 * ONEVO — OFFICIAL PUBLIC LAUNCH JAVASCRIPT
 * Inspired by Echo Music (echomusic.fun) UI Interactions & ONEVO System
 * Pure Vanilla ES6+ • Zero External Dependencies • Static Hosting Ready
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CENTRALIZED RELEASE CONFIGURATION
     MANDATORY: Single source of truth for the official release APK.
     ========================================================================== */
  const DOWNLOAD_URL = "https://github.com/sonusapien/onevocontact/releases/download/v.1.0.1/release.apk";

  const ONEVO_RELEASE_CONFIG = {
    appName: "ONEVO",
    tagline: "One profile. Endless connections.",
    apkDownloadUrl: DOWNLOAD_URL,
    apkFileName: "ONEVO.apk",
    version: "1.0.1",
    releaseDate: "Official Public Release 2026",
    fileSize: null,
    compatibility: "Android 8.0 (API 26) or newer",
    distributionNotice: "Official release distributed directly by ONEVO via GitHub Releases."
  };

  /* ==========================================================================
     2. CREATOR SUPPORT / COFFEE PAYMENT CONFIGURATION
     Fixed amount: ₹89 (strictly non-editable).
     ========================================================================== */
  const COFFEE_CONFIG = {
    upiId: "sonusapien@fam",
    payeeName: "ONEVO Creator",
    amount: "89.00",
    currency: "INR",
    paymentUri: "upi://pay?pa=sonusapien%40fam&pn=ONEVO%20Creator&am=89.00&cu=INR"
  };

  /* ==========================================================================
     3. DOWNLOAD BUTTON SYNCHRONIZATION
     ========================================================================== */
  function syncReleaseConfig() {
    const downloadUrl = ONEVO_RELEASE_CONFIG.apkDownloadUrl;

    const downloadButtons = document.querySelectorAll('a.btn-download, a[data-download-apk], [data-download]');
    downloadButtons.forEach(btn => {
      btn.setAttribute('href', downloadUrl);
      btn.setAttribute('download', ONEVO_RELEASE_CONFIG.apkFileName);
      btn.setAttribute('target', '_self');
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
     4. RIPPLE EFFECT (TACTILE 3D BUTTON PRESSES)
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
     5. FAQ ACCORDION (+ / − TOGGLE PATTERN)
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
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ==========================================================================
     6. NAMELINK INTERACTIVE RADAR SIMULATOR
     ========================================================================== */
  function initNameLinkSimulation() {
    const triggerBtn = document.getElementById('nl-sim-trigger');
    const statusText = document.getElementById('nl-status-text');
    const badgeText = document.getElementById('nl-badge-text');
    const peerCard = document.getElementById('nl-peer-card');
    const waveRing = document.getElementById('nl-wave-ring');

    if (!triggerBtn || !statusText || !peerCard) return;

    let isSimulating = false;

    triggerBtn.addEventListener('click', function () {
      if (isSimulating) return;
      isSimulating = true;
      triggerBtn.disabled = true;
      triggerBtn.textContent = 'Simulating...';

      // Step 1: Broadcasting
      statusText.textContent = 'Scanning 2.4 GHz local beacon...';
      badgeText.textContent = 'DISCOVERING';
      peerCard.style.opacity = '0.35';
      peerCard.style.transform = 'scale(0.96)';

      setTimeout(() => {
        // Step 2: Peer Found
        statusText.textContent = 'Peer device discovered: Priya Sharma';
        badgeText.textContent = 'FOUND PEER';
        peerCard.style.opacity = '0.7';
        peerCard.style.transform = 'scale(0.98)';
      }, 1100);

      setTimeout(() => {
        // Step 3: Mutual Authorization
        statusText.textContent = 'Awaiting mutual handshake approval...';
        badgeText.textContent = 'REVIEWING';
        peerCard.style.opacity = '0.9';
        peerCard.style.transform = 'scale(1)';
      }, 2300);

      setTimeout(() => {
        // Step 4: Exchanged
        statusText.textContent = '✓ Digital cards exchanged securely on-device.';
        badgeText.textContent = 'CONNECTED';
        peerCard.style.opacity = '1';
        peerCard.style.transform = 'scale(1)';
        triggerBtn.disabled = false;
        triggerBtn.textContent = 'Reset Simulation';
        isSimulating = false;
      }, 3500);
    });
  }

  /* ==========================================================================
     7. STICKY NAVBAR SCROLL SENSING
     ========================================================================== */
  function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function handleScroll() {
      if (window.scrollY > 30) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ==========================================================================
     8. MOBILE NAVIGATION DRAWER WITH BODY SCROLL LOCK
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
     9. MODAL DIALOGS WITH BODY SCROLL LOCK
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
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.focus();
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
     10. CREATOR SUPPORT / COFFEE INTERACTION
     ========================================================================== */
  function initCoffeeSupport() {
    const copyBtn = document.getElementById('copy-upi-btn');
    const toast = document.getElementById('copy-upi-toast');
    const payBtn = document.getElementById('pay-upi-btn');

    if (payBtn) {
      payBtn.setAttribute('href', COFFEE_CONFIG.paymentUri);
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', async function () {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(COFFEE_CONFIG.upiId);
          } else {
            const temp = document.createElement('input');
            temp.value = COFFEE_CONFIG.upiId;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
          }
          if (toast) {
            toast.textContent = '✓ UPI ID copied to clipboard!';
            setTimeout(() => {
              toast.textContent = '';
            }, 2500);
          }
        } catch (err) {
          console.warn('Could not copy UPI ID:', err);
        }
      });
    }
  }

  /* ==========================================================================
     11. REVEAL ON SCROLL (INTERSECTION OBSERVER)
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
     12. DYNAMIC COPYRIGHT YEAR
     ========================================================================== */
  function initCopyright() {
    const yr = document.getElementById('current-year');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     13. INITIALIZATION
     ========================================================================== */
  function init() {
    syncReleaseConfig();
    initStickyNavbar();
    initRippleEffect();
    initFaqAccordion();
    initNameLinkSimulation();
    initMobileNav();
    initModals();
    initCoffeeSupport();
    initRevealOnScroll();
    initCopyright();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.DOWNLOAD_URL = DOWNLOAD_URL;
  window.ONEVO_RELEASE = ONEVO_RELEASE_CONFIG;
  window.COFFEE_CONFIG = COFFEE_CONFIG;
})();

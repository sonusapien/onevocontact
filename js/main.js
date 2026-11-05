/**
 * ONEVO Contact — Main Application Script
 * Showcase Carousel & Tabs, Interactive Lightbox, and Page Orchestration.
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("⚡ ONEVO Contact Official Landing Page Initialized.");
  console.log("📦 Official APK:", window.DOWNLOAD_URL);

  // 1. Showcase Tabs & Carousel Controller
  initShowcase();

  // 2. Lightbox Controller
  initLightbox();
});

/**
 * Showcase Tabs & Carousel Switcher
 */
function initShowcase() {
  const tabs = document.querySelectorAll(".showcase-tab");
  const cards = document.querySelectorAll(".showcase-card");
  const track = document.querySelector(".showcase-track");
  const prevBtn = document.querySelector(".showcase-nav-btn.prev");
  const nextBtn = document.querySelector(".showcase-nav-btn.next");

  if (!tabs.length || !cards.length) return;

  function setActiveCard(index) {
    tabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
      } else {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false");
      }
    });

    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    // Scroll track if on mobile or overflow
    if (track) {
      const targetCard = cards[index];
      if (targetCard) {
        const scrollOffset = targetCard.offsetLeft - (track.clientWidth - targetCard.clientWidth) / 2;
        track.scrollTo({
          left: scrollOffset,
          behavior: "smooth"
        });
      }
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setActiveCard(index));
  });

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      const activeIndex = Array.from(tabs).findIndex((t) => t.classList.contains("active"));
      const newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      setActiveCard(newIndex);
    });

    nextBtn.addEventListener("click", () => {
      const activeIndex = Array.from(tabs).findIndex((t) => t.classList.contains("active"));
      const newIndex = (activeIndex + 1) % tabs.length;
      setActiveCard(newIndex);
    });
  }
}

/**
 * Interactive Lightbox for high-res screen mockups
 */
function initLightbox() {
  const lightbox = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const closeBtn = document.getElementById("lightboxClose");
  const triggers = document.querySelectorAll("[data-lightbox]");

  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, title, desc) {
    lightboxImg.src = src;
    lightboxImg.alt = title || "ONEVO App Screen";
    if (lightboxTitle) lightboxTitle.textContent = title || "";
    if (lightboxDesc) lightboxDesc.textContent = desc || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImg.src = "";
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const src = trigger.getAttribute("data-lightbox");
      const title = trigger.getAttribute("data-title");
      const desc = trigger.getAttribute("data-desc");
      if (src) openLightbox(src, title, desc);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

/**
 * ONEVO Contact — FAQ Accordion Controller
 * Accessible, keyboard-navigable, single-item open accordion.
 */

function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const content = item.querySelector(".faq-content");

    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all other accordion items (single-open rule)
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          const otherTrigger = otherItem.querySelector(".faq-trigger");
          const otherContent = otherItem.querySelector(".faq-content");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("active");
        trigger.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null;
      } else {
        item.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });

    // Keyboard support: Enter / Space handled natively by <button>, but verify
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger.click();
      }
    });
  });

  // Handle window resize to adjust scrollHeight for open items
  window.addEventListener("resize", () => {
    const activeItem = document.querySelector(".faq-item.active");
    if (activeItem) {
      const content = activeItem.querySelector(".faq-content");
      if (content) {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    }
  }, { passive: true });
}

// Auto-run on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFAQ);
} else {
  initFAQ();
}

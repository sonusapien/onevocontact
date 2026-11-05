/**
 * ONEVO Contact — Creator Support & Coffee Modal Controller
 * 
 * Centralized configuration for Buy the Creator a Coffee.
 * Fixed amount: INR 89 (strictly non-editable).
 */

const COFFEE_CONFIG = {
  upiId: "sonusapien@fam",
  payeeName: "ONEVO Creator",
  amount: "89.00",
  currency: "INR",
  paymentUri: "upi://pay?pa=sonusapien%40fam&pn=ONEVO%20Creator&am=89.00&cu=INR"
};

function initCoffeeModal() {
  const openBtns = document.querySelectorAll("[data-open-coffee]");
  const modal = document.getElementById("coffeeModal");
  const closeBtn = document.getElementById("coffeeModalClose");
  const copyBtn = document.getElementById("copyUpiBtn");
  const copyFeedback = document.getElementById("copyUpiFeedback");
  const payUpiBtn = document.getElementById("payViaUpiBtn");

  if (!modal) return;

  // Ensure Pay via UPI button has the exact fixed payment URI
  if (payUpiBtn) {
    payUpiBtn.setAttribute("href", COFFEE_CONFIG.paymentUri);
  }

  function openModal() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scroll
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scroll
  }

  // Open triggers
  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close triggers
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close when clicking outside dialog container
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // Copy UPI ID to clipboard
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(COFFEE_CONFIG.upiId);
        } else {
          // Fallback for older webviews
          const tempInput = document.createElement("input");
          tempInput.value = COFFEE_CONFIG.upiId;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }

        // Show feedback
        if (copyFeedback) {
          copyFeedback.textContent = "UPI ID copied!";
          copyFeedback.classList.add("active");
          setTimeout(() => {
            copyFeedback.classList.remove("active");
            copyFeedback.textContent = "";
          }, 2400);
        }
      } catch (err) {
        console.warn("Could not copy UPI ID:", err);
      }
    });
  }

  // Expose configuration on window for validation
  window.COFFEE_CONFIG = COFFEE_CONFIG;
}

// Auto-run on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCoffeeModal);
} else {
  initCoffeeModal();
}

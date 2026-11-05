/**
 * ONEVO Contact — Download Controller
 * 
 * MANDATORY: Single centralized source of truth for the official release APK.
 * Every download button, link, and trigger on the website MUST use this exact constant.
 */

const DOWNLOAD_URL = "https://github.com/sonusapien/onevocontact/releases/download/v.1.0.1/release.apk";

/**
 * Direct APK download trigger
 * Opens the release APK in the same tab to initiate immediate direct browser download.
 * Strictly no fake progress bars, timers, or countdowns.
 */
function downloadAPK(event) {
  if (event) {
    // If it's a normal link, letting the browser follow href to DOWNLOAD_URL is native and reliable.
    // For buttons or programmatic triggers, navigate in the same tab.
  }
  window.location.href = DOWNLOAD_URL;
}

/**
 * Binds all download triggers across the DOM to the official DOWNLOAD_URL
 */
function initDownloads() {
  const downloadElements = document.querySelectorAll(
    '[data-download], .btn-download, .download-trigger, a[href="#download"]'
  );

  downloadElements.forEach((el) => {
    // Ensure the href is set directly to the release APK
    if (el.tagName.toLowerCase() === "a") {
      el.setAttribute("href", DOWNLOAD_URL);
      el.setAttribute("target", "_self");
      el.setAttribute("rel", "noopener");
    } else {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        downloadAPK(e);
      });
    }

    // Accessible labeling
    if (!el.getAttribute("aria-label")) {
      el.setAttribute("aria-label", "Download ONEVO APK for Android (Direct Download)");
    }
  });

  // Expose on window for accessibility and inline triggers
  window.DOWNLOAD_URL = DOWNLOAD_URL;
  window.downloadAPK = downloadAPK;
}

// Auto-run on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDownloads);
} else {
  initDownloads();
}

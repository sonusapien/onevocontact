/**
 * ONEVO Contact — Navigation & Header Controller
 * Handles sticky navbar styling, smooth scrolling, active link tracking,
 * mobile drawer toggle, and keyboard accessibility.
 */

function initNavigation() {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  const sections = document.querySelectorAll("section[id], header[id]");
  const backToTopBtn = document.getElementById("backToTop");

  if (!navbar) return;

  // 1. Sticky Navbar background on scroll
  function handleNavbarScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    // Active Section Tracking
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${currentSectionId}`) {
          link.classList.add("active");
        } else if (href && href.startsWith("#") && href !== "#download") {
          link.classList.remove("active");
        }
      });
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // initial check

  // 2. Mobile Drawer Toggle
  function toggleMobileMenu(open) {
    if (!mobileMenu || !menuToggle) return;
    const shouldOpen = open !== undefined ? open : !mobileMenu.classList.contains("open");

    if (shouldOpen) {
      mobileMenu.classList.add("open");
      menuToggle.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden"; // lock background scroll
    } else {
      mobileMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => toggleMobileMenu());
  }

  // Close mobile drawer when clicking any link
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      
      // If it's a hashtag anchor link (not a download link)
      if (href && href.startsWith("#") && href !== "#download") {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          toggleMobileMenu(false);

          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      } else {
        // It's a download or external link, close drawer
        toggleMobileMenu(false);
      }
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) {
      toggleMobileMenu(false);
      menuToggle.focus();
    }
  });

  // 3. Back to Top Smooth Scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
}

// Auto-run on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigation);
} else {
  initNavigation();
}

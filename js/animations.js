/**
 * ONEVO Contact — Motion & Scroll Reveal Controller
 * Performant IntersectionObserver animations with prefers-reduced-motion support.
 */

function initAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Scroll-triggered reveal using IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal, .reveal-up, .reveal-scale");

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // Trigger once
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.12
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: reveal immediately if reduced motion or no IntersectionObserver
    revealElements.forEach((el) => {
      el.classList.add("revealed");
    });
  }

  // 2. Subtle 3D Tilt on Hero Phone Mockup (Desktop only, subtle & smooth)
  const heroMockupContainer = document.querySelector(".hero-mockup-wrapper");
  const heroMockup = document.querySelector(".hero-phone-mockup");

  if (heroMockupContainer && heroMockup && !prefersReducedMotion && window.innerWidth > 992) {
    let ticking = false;

    heroMockupContainer.addEventListener("mousemove", (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = heroMockupContainer.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          // Subtle tilt limits (-6 to +6 degrees)
          const rotateX = ((y - centerY) / centerY) * -5;
          const rotateY = ((x - centerX) / centerX) * 5;

          heroMockup.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    heroMockupContainer.addEventListener("mouseleave", () => {
      heroMockup.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  }
}

// Auto-run on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}

/* ========================================
   WENDELL JULES CAPATOY - PORTFOLIO JS
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- SELECT ELEMENTS ----------
  const menuToggle = document.querySelector("#menu-toggle");
  const navbar = document.querySelector("#navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  const yearElement = document.querySelector("#year");

  // ---------- CURRENT YEAR ----------
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ---------- MOBILE MENU ----------
  function closeMenu() {
    if (!menuToggle || !navbar) return;

    navbar.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
      );

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu after choosing a navigation link.
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside the header.
    document.addEventListener("click", (event) => {
      if (
        navbar.classList.contains("open") &&
        !event.target.closest(".header")
      ) {
        closeMenu();
      }
    });

    // Close menu with Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close the mobile menu when returning to desktop width.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // ---------- ACTIVE NAVIGATION LINK ----------
  function setActiveLink(sectionId) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${sectionId}`;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // Highlight the clicked link immediately.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const sectionId = link.getAttribute("href").slice(1);
      setActiveLink(sectionId);
    });
  });

  // Update the active link as sections enter the viewport.
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveLink(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // ---------- SCROLL REVEAL ANIMATIONS ----------
  const revealElements = document.querySelectorAll(
    ".about-visual, .about-content, .service-card, " +
      ".project-card, .contact-content, .contact-form",
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  }

  // ---------- CONTACT FORM ----------
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      // Prevent the browser from reloading the page.
      event.preventDefault();

      // Check the browser's built-in required fields.
      if (!contactForm.reportValidity()) {
        return;
      }

      /*
       * This is a front-end demonstration only.
       * No email is sent because no backend or form service
       * has been connected yet.
       */
      formStatus.textContent =
        "Your form is ready, but message delivery is not " +
        "connected yet. Please contact me using my email.";

      formStatus.setAttribute("role", "status");
    });
  }

  // ---------- BACK TO TOP ----------
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ---------- CONSOLE MESSAGE ----------
  console.log(
    "%cWJ Portfolio",
    "color: #f21d2b; font-size: 20px; font-weight: bold;",
  );

  console.log("Portfolio JavaScript loaded successfully.");
});

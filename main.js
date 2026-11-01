
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
  const backToTop = document.querySelector(".back-to-top");

  // ---------- EMAILJS CONFIGURATION ----------
  const EMAILJS_PUBLIC_KEY = "idzdufqTbLfoNSdZG";
  const EMAILJS_SERVICE_ID = "service_x9qdxhn";
  const EMAILJS_TEMPLATE_ID = "template_yrg6fk7";

  // Initialize EmailJS.
  if (typeof emailjs !== "undefined") {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY
    });
  }

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
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu after clicking a navigation link.
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

    // Close menu using Escape key.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close menu when returning to desktop width.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // ---------- ACTIVE NAVIGATION LINK ----------
  function setActiveLink(sectionId) {

    navLinks.forEach((link) => {
      const isActive =
        link.getAttribute("href") === `#${sectionId}`;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // Highlight clicked navigation link.
  navLinks.forEach((link) => {

    link.addEventListener("click", () => {
      const sectionId = link.getAttribute("href").slice(1);
      setActiveLink(sectionId);
    });

  });

  // Update active link while scrolling.
  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length > 0) {
          setActiveLink(visibleSections[0].target.id);
        }

      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5]
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // ---------- SCROLL REVEAL ANIMATIONS ----------
  const revealElements = document.querySelectorAll(
    ".about-visual, .about-content, .service-card, " +
    ".project-card, .contact-content, .contact-form"
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
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  }

  // ---------- EMAILJS CONTACT FORM ----------
  if (contactForm && formStatus) {

    contactForm.addEventListener("submit", async (event) => {

      // Prevent page reload.
      event.preventDefault();

      // Validate required form fields.
      if (!contactForm.reportValidity()) {
        return;
      }

      const submitButton =
        contactForm.querySelector(".submit-btn");

      // Check EmailJS availability.
      if (typeof emailjs === "undefined") {

        formStatus.textContent =
          "Email service is unavailable. Please try again later.";

        formStatus.style.color = "#ef4444";
        return;
      }

      // Check configuration.
      if (
        EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" ||
        EMAILJS_TEMPLATE_ID === "EMAILJS_TEMPLATE_ID"
      ) {

        formStatus.textContent =
          "Email service is not fully configured yet.";

        formStatus.style.color = "#ef4444";
        return;
      }

      // Prevent repeated submissions.
      submitButton.disabled = true;

      submitButton.innerHTML =
        'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

      formStatus.textContent = "Sending your message...";
      formStatus.style.color = "#60a5fa";

      try {

        // Send message through EmailJS.
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          contactForm
        );

        // Display success message.
        formStatus.textContent =
          "Your message has been sent successfully! Thank you for contacting me.";

        formStatus.style.color = "#22c55e";

        // Clear form after successful sending.
        contactForm.reset();

      } catch (error) {

        // Display error in browser console.
        console.error("EmailJS Error:", error);

        formStatus.textContent =
          "Sorry, your message could not be sent. Please try again.";

        formStatus.style.color = "#ef4444";

      } finally {

        // Enable button again.
        submitButton.disabled = false;

        submitButton.innerHTML =
          'Send Message <i class="fa-solid fa-paper-plane"></i>';

      }

    });
  }

  // ---------- BACK TO TOP ----------
  if (backToTop) {

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });
  }

  // ---------- CONSOLE MESSAGE ----------
  console.log(
    "%cWJ Portfolio",
    "color: #f21d2b; font-size: 20px; font-weight: bold;"
  );

  console.log("Portfolio JavaScript loaded successfully.");

});

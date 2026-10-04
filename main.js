// ================================
// MOBILE MENU
// ================================

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("fa-xmark");
    navbar.classList.toggle("active");
});


// ================================
// CLOSE MENU WHEN NAV LINK IS CLICKED
// ================================

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuIcon.classList.remove("fa-xmark");
        navbar.classList.remove("active");
    });
});


// ================================
// ACTIVE NAVIGATION LINK
// ================================

const sections = document.querySelectorAll("section");
const navigationLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


// ================================
// HEADER SHADOW WHEN SCROLLING
// ================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// ================================
// TYPING ANIMATION
// ================================

const typingText = document.querySelector("#typingg-text");

const words = [
    "Information Technology Student",
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent = currentWord.substring(
            0,
            characterIndex + 1
        );

        characterIndex++;

        if (characterIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingText.textContent = currentWord.substring(
            0,
            characterIndex - 1
        );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}

typeEffect();


// ================================
// SCROLL REVEAL ANIMATION
// ================================

const revealElements = document.querySelectorAll(
    ".home-content, .home-img, .about-img, .about-content, .services-box, .portfolio-box, .contact form"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});


// ================================
// PORTFOLIO CLICK EFFECT
// ================================

const portfolioBoxes = document.querySelectorAll(".portfolio-box");

portfolioBoxes.forEach(box => {

    box.addEventListener("click", () => {

        box.classList.toggle("selected");

    });

});


// ================================
// CONTACT FORM VALIDATION
// ================================

const contactForm = document.querySelector(".contact form");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = contactForm.querySelector(
        'input[placeholder="Full Name"]'
    ).value.trim();

    const email = contactForm.querySelector(
        'input[placeholder="Email Address"]'
    ).value.trim();

    const mobile = contactForm.querySelector(
        'input[placeholder="Mobile Number"]'
    ).value.trim();

    const subject = contactForm.querySelector(
        'input[placeholder="Email Subject"]'
    ).value.trim();

    const message = contactForm.querySelector(
        "textarea"
    ).value.trim();


    if (
        name === "" ||
        email === "" ||
        mobile === "" ||
        subject === "" ||
        message === ""
    ) {

        alert("Please complete all fields before sending your message.");

        return;
    }


    // Basic email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;
    }


    alert(
        "Thank you, " +
        name +
        "! Your message has been submitted."
    );

    contactForm.reset();

});


// ================================
// BACK TO TOP BUTTON
// ================================

const topButton = document.querySelector(
    ".footer-iconTop a"
);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});


// ================================
// SMOOTH SCROLLING
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});
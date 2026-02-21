/**
 * Khan Welding Workshop
 * Main Script for Interactions & Animations
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Header Scroll Effect
  const header =
    document.getElementById("main-header") || document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    highlightNavigation();
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
      menuToggle.classList.toggle("open");
    });

    // Close menu on link click
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        menuToggle.classList.remove("open");
      });
    });
  }

  // 3. Active Navigation Highlighting
  const sections = document.querySelectorAll("section[id]");

  function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelectorAll(".nav-link")
            .forEach((l) => l.classList.remove("active"));
          navLink.classList.add("active");
        }
      }
    });
  }

  // Initialize highlight
  highlightNavigation();

  // 4. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 5. Scroll Reveal Animations with Intersection Observer
  const revealElements = document.querySelectorAll(".reveal-up, .reveal-scale");

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add class to trigger CSS transition
        entry.target.classList.add("revealed");

        // If it contains counters, animate them
        const counters = entry.target.querySelectorAll(".counter");
        if (counters.length > 0) {
          counters.forEach((counter) => animateCounter(counter));
        }

        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // 6. Number Counter Animation for Stats
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCounter();
  }

  // 7. Form Submission Handler (Prevent Default for Demo)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerText;

      btn.innerText = "Sending Application...";
      btn.style.opacity = "0.8";
      btn.disabled = true;

      // Simulate API request
      setTimeout(() => {
        btn.innerText = "Inquiry Submitted successfully!";
        btn.style.background = "#10B981"; // Success green
        btn.style.color = "#fff";

        // Reset form
        contactForm.reset();

        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.background = "";
          btn.style.color = "";
          btn.style.opacity = "1";
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
});

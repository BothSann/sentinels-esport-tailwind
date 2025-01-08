const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.getElementById("navbar");
let activeSection = "";

// Improved scroll effect with throttling
let lastScrollTime = 0;
const scrollThreshold = 100; // ms

window.addEventListener("scroll", () => {
  const now = Date.now();
  if (now - lastScrollTime > scrollThreshold) {
    lastScrollTime = now;

    // Navbar background logic
    if (window.scrollY > 50) {
      navbar.classList.add("bg-black", "bg-opacity-90", "backdrop-blur-sm");
    } else if (mobileMenu.classList.contains("hidden")) {
      navbar.classList.remove("bg-black", "bg-opacity-90", "backdrop-blur-sm");
    }

    // Update active section
    updateActiveSection();
  }
});

// Function to update active section
function updateActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      const newActiveSection = section.getAttribute("id");
      if (activeSection !== newActiveSection) {
        activeSection = newActiveSection;
        updateNavHighlight(activeSection);
      }
    }
  });
}

// Function to update navigation highlight
function updateNavHighlight(sectionId) {
  document.querySelectorAll("nav a").forEach((link) => {
    if (link.getAttribute("href") === `#${sectionId}`) {
      link.classList.add("text-red-500");
    } else {
      link.classList.remove("text-red-500");
    }
  });
}

// Improved mobile menu toggle with animation
menuBtn.addEventListener("click", () => {
  const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", !isExpanded);

  const icon = menuBtn.querySelector("i");
  mobileMenu.classList.toggle("hidden");

  // Smooth icon transition
  icon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");

  // Background handling
  if (!mobileMenu.classList.contains("hidden")) {
    navbar.classList.add("bg-black", "bg-opacity-90", "backdrop-blur-sm");
    mobileMenu.classList.add("slide-in");
  } else if (window.scrollY <= 50) {
    navbar.classList.remove("bg-black", "bg-opacity-90", "backdrop-blur-sm");
    mobileMenu.classList.remove("slide-in");
  }
});

// Improved mobile menu link handling
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.classList.add("hidden");

    const icon = menuBtn.querySelector("i");
    icon.style.transform = "rotate(0deg)";
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");

    if (window.scrollY <= 50) {
      navbar.classList.remove("bg-black", "bg-opacity-90", "backdrop-blur-sm");
    }
  });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Initialize active section on page load
document.addEventListener("DOMContentLoaded", updateActiveSection);

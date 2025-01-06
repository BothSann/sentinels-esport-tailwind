// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.getElementById("navbar");

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("bg-black", "bg-opacity-90", "backdrop-blur-sm");
    // If mobile menu is open, keep the background
    if (!mobileMenu.classList.contains("hidden")) {
      navbar.classList.add("bg-black", "bg-opacity-90", "backdrop-blur-sm");
    }
  } else {
    // Only remove background if mobile menu is closed
    if (mobileMenu.classList.contains("hidden")) {
      navbar.classList.remove("bg-black", "bg-opacity-90", "backdrop-blur-sm");
    }
  }
});

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  // Toggle menu icon
  const icon = menuBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");

  // Add background when menu is open, remove when closed
  if (!mobileMenu.classList.contains("hidden")) {
    navbar.classList.add("bg-black", "bg-opacity-90", "backdrop-blur-sm");
  } else if (window.scrollY <= 50) {
    navbar.classList.remove("bg-black", "bg-opacity-90", "backdrop-blur-sm");
  }
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    const icon = menuBtn.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
    // Remove background if we're at the top
    if (window.scrollY <= 50) {
      navbar.classList.remove("bg-black", "bg-opacity-90", "backdrop-blur-sm");
    }
  });
});

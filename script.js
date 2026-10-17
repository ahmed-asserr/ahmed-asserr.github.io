document.addEventListener("DOMContentLoaded", () => {
  // 1. Interactive Mouse Spotlight Effect
  const spotlightContainer = document.querySelector(".spotlight-container");
  if (spotlightContainer) {
    window.addEventListener("mousemove", (e) => {
      spotlightContainer.style.setProperty("--mouse-x", `${e.clientX}px`);
      spotlightContainer.style.setProperty("--mouse-y", `${e.clientY}px`);
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isActive = navLinks.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", String(isActive));
      const svgEl = navToggle.querySelector("svg");
      if (svgEl) {
        if (isActive) {
          svgEl.innerHTML = `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`;
        } else {
          svgEl.innerHTML = `<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>`;
        }
      }
    });

    // Close menu when clicking nav link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        const svgEl = navToggle.querySelector("svg");
        if (svgEl) {
          svgEl.innerHTML = `<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>`;
        }
      });
    });
  }

  // 4. Active Navigation Tracking on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.pageYOffset + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
        item.setAttribute("aria-current", "page");
      }
    });
  });

  // 5. Scroll Reveal Animation via IntersectionObserver
  const revealElements = document.querySelectorAll(".fade-in");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.documentElement.classList.add("reveal-enabled");
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // 6. Project Cards Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.classList.remove("hidden");
          card.setAttribute("aria-hidden", "false");
          card.setAttribute("tabindex", "0");
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 40);
        } else {
          card.setAttribute("aria-hidden", "true");
          card.setAttribute("tabindex", "-1");
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.classList.add("hidden");
          }, 300);
        }
      });
    });
  });

  // 7. Projects Detailed Case Studies Data
  const projectsData = {
    "capital-shop": {
      title: "Capital Shop — Modern E-Commerce Storefront",
      category: "E-Commerce & Retail",
      image: "capital-shop.webp",
      impact: "High-performance, intuitive e-commerce experience designed for optimal product showcase, responsive shopping, and seamless user interaction.",
      desc: "Capital Shop is a feature-packed fashion storefront tailored for modern online retail. Designed with mobile-first responsiveness and clean component architecture, it provides an intuitive shopping journey across multi-category fashion collections.",
      features: [
        "Interactive promotional hero banners and announcement countdown bars.",
        "Categorized product showcases for Men's, Women's, and Baby Collections.",
        "Trending catalog grid featuring product cards, discounted tags, ratings, and instant view actions.",
        "Header cart indicator with wishlist counters and clean search bar integration.",
        "Fully responsive layout crafted with modern CSS Flexbox and CSS Grid.",
        "Optimized image assets delivering snappy page loads and cross-browser stability."
      ],
      tech: ["HTML5", "CSS3 / Modern Layouts", "JavaScript ES6+", "Responsive Design", "Flexbox & Grid"],
      demoUrl: "https://ahmed-asserr.github.io/Capital-Shop/",
      repoUrl: "https://github.com/ahmed-asserr/Capital-Shop"
    },
    "perfumes-web": {
      title: "Perfumes Web — Luxury Brand & Creative Agency",
      category: "Brand Agency & Showcase",
      image: "perfumes-web.webp",
      impact: "Immersive luxury branding experience that elevates product value through refined typography, dark aesthetic layouts, and interactive showcase galleries.",
      desc: "A boutique web showcase created for high-end luxury fragrances and creative agency branding. Built with attention to visual harmony, elegance, and micro-interactions, the website communicates quality and exclusivity.",
      features: [
        "Atmospheric full-width hero header with evocative background imagery and call-to-actions.",
        "Featured luxury collection showcases emphasizing scent notes, brand identity, and custom typography.",
        "Interactive navigation bar with search bar and direct section anchoring.",
        "Subtle CSS animations and hover transformations enhancing visitor engagement.",
        "Modular stylesheet architecture for effortless extensibility and high maintainability.",
        "Cross-browser tested and fully responsive across mobile, tablet, and desktop viewports."
      ],
      tech: ["HTML5", "CSS3 Animations", "JavaScript ES6+", "UI/UX Design", "Responsive Layouts"],
      demoUrl: "https://ahmed-asserr.github.io/Perfumes-web/",
      repoUrl: "https://github.com/ahmed-asserr/Perfumes-web"
    }
  };

  // 8. Project Modal Handlers
  const projectModal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalTags = document.getElementById("modal-tags");
  const modalImpactDesc = document.getElementById("modal-impact-desc");
  const modalDesc = document.getElementById("modal-desc");
  const modalFeatures = document.getElementById("modal-features");
  const modalTechList = document.getElementById("modal-tech-list");
  const modalDemoLink = document.getElementById("modal-demo-link");
  const modalRepoLink = document.getElementById("modal-repo-link");

  let lastActiveElement = null;

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !projectModal) return;

    lastActiveElement = document.activeElement;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalImpactDesc.textContent = data.impact;
    modalDesc.textContent = data.desc;

    // Tags
    modalTags.innerHTML = `<span class="modal-tag">${data.category}</span>`;

    // Features
    modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join("");

    // Tech
    modalTechList.innerHTML = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join("");

    // Links
    if (modalDemoLink) {
      modalDemoLink.href = data.demoUrl;
      modalDemoLink.style.display = "inline-flex";
    }
    if (modalRepoLink) {
      modalRepoLink.href = data.repoUrl;
      modalRepoLink.style.display = "inline-flex";
    }

    projectModal.classList.add("active");
    projectModal.removeAttribute("inert");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose?.focus();
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove("active");
    projectModal.setAttribute("inert", "");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  // Attach card click handlers
  projectCards.forEach((card) => {
    const projectId = card.getAttribute("data-id");

    card.addEventListener("click", (e) => {
      // If clicking directly on a link icon, don't trigger modal
      if (e.target.closest(".icon-action-btn")) return;
      openProjectModal(projectId);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProjectModal(projectId);
      }
    });
  });

  modalClose?.addEventListener("click", closeProjectModal);

  projectModal?.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // 9. Certificate Preview Modal
  const certModal = document.getElementById("cert-modal");
  const certModalClose = document.getElementById("cert-modal-close");
  const certModalImg = document.getElementById("cert-modal-img");
  const certModalTitle = document.getElementById("cert-modal-title");
  const certModalDownload = document.getElementById("cert-modal-download");

  const certData = {
    "sef-react": {
      title: "SEF Academy — Front-End Web Development Diploma (React JS) [Score: 98.85%]",
      image: "sef-react-cert.webp",
      fileUrl: "Ahmed Asser Mostafa.pdf"
    },
    "amcham": {
      title: "AmCham Egypt — Career Development Center Internship Program 2025",
      image: "amcham-cert.webp",
      fileUrl: "WhatsApp Image 2026-10-17 at 4.34.28 PM.jpeg"
    }
  };

  function openCertModal(certId) {
    const cert = certData[certId];
    if (!cert || !certModal) return;

    lastActiveElement = document.activeElement;
    certModalImg.src = cert.image;
    certModalImg.alt = cert.title;
    certModalTitle.textContent = cert.title;
    certModalDownload.href = cert.fileUrl;

    certModal.classList.add("active");
    certModal.removeAttribute("inert");
    certModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    certModalClose?.focus();
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove("active");
    certModal.setAttribute("inert", "");
    certModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  document.querySelectorAll("[data-cert-id]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const certId = el.getAttribute("data-cert-id");
      openCertModal(certId);
    });
  });

  certModalClose?.addEventListener("click", closeCertModal);

  certModal?.addEventListener("click", (e) => {
    if (e.target === certModal) {
      closeCertModal();
    }
  });

  // Global Escape key listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (projectModal && projectModal.classList.contains("active")) {
        closeProjectModal();
      }
      if (certModal && certModal.classList.contains("active")) {
        closeCertModal();
      }
    }
  });
});


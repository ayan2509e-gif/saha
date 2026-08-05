/* =====================================================================
   SAHA HOME DECOR — MAIN JAVASCRIPT
   Modular, vanilla JS. Each feature is wrapped in its own init function
   and called once the DOM is ready.
   ===================================================================== */

(function () {
  'use strict';

  /* WhatsApp business number (digits only, no + or leading 0) */
  const WHATSAPP_NUMBER = '923197810809';

  /* ===================================================================
     1. NAVBAR — sticky shadow on scroll + active link highlighting
     =================================================================== */
  function initNavbar() {
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = Array.from(navLinks)
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    function onScroll() {
      // Shadow / background on scroll
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Active link highlighting based on scroll position
      let currentSectionId = sections[0] ? sections[0].id : '';
      const scrollPos = window.scrollY + 140;

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPos) {
          currentSectionId = section.id;
        }
      });

      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentSectionId);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Collapse mobile menu after a link is clicked
    const collapseEl = document.getElementById('navbarContent');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (collapseEl.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
        }
      });
    });
  }

  /* ===================================================================
     2. SMOOTH SCROLL — offsets for the fixed navbar height
     =================================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length < 2) return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const navHeight = document.getElementById('mainNavbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ===================================================================
     3. SCROLL REVEAL — IntersectionObserver adds .reveal-active
     =================================================================== */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('reveal-active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-reveal-delay') || 0;
            setTimeout(() => el.classList.add('reveal-active'), Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ===================================================================
     4. ANIMATED COUNTERS — count up when stats section enters view
     =================================================================== */
  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1800;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        // ease-out for a smooth landing
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ===================================================================
     5. BACK TO TOP BUTTON
     =================================================================== */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener(
      'scroll',
      () => {
        btn.classList.toggle('visible', window.scrollY > 480);
      },
      { passive: true }
    );
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================================================================
     6. BUTTON RIPPLE EFFECT
     =================================================================== */
  function initRipple() {
    document.querySelectorAll('.btn-ripple').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const circle = document.createElement('span');
        circle.className = 'ripple-circle';
        circle.style.width = circle.style.height = size + 'px';
        circle.style.left = e.clientX - rect.left - size / 2 + 'px';
        circle.style.top = e.clientY - rect.top - size / 2 + 'px';
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 650);
      });
    });
  }

  /* ===================================================================
     7. COLOR SWATCH SELECTION on product cards
     =================================================================== */
  function initColorSwatches() {
    document.querySelectorAll('.color-options').forEach((group) => {
      group.addEventListener('click', (e) => {
        const swatch = e.target.closest('.color-swatch');
        if (!swatch) return;
        group.querySelectorAll('.color-swatch').forEach((s) => s.classList.remove('active'));
        swatch.classList.add('active');
      });
    });
  }

  /* ===================================================================
     8. PRODUCT CAROUSELS — ensure each card uses its own working controls
     =================================================================== */
  function initProductCarousels() {
    const carousels = document.querySelectorAll('.product-carousel');

    carousels.forEach((carousel, index) => {
      const uniqueId = `product-carousel-${index + 1}`;

      if (!carousel.id || carousel.id.startsWith('carousel')) {
        carousel.id = uniqueId;
      }

      carousel.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach((btn) => {
        btn.setAttribute('data-bs-target', `#${carousel.id}`);
      });

      if (window.bootstrap?.Carousel) {
        if (!carousel.dataset.initialized) {
          window.bootstrap.Carousel.getOrCreateInstance(carousel);
          carousel.dataset.initialized = 'true';
        }
      }
    });
  }

  /* ===================================================================
     9. WHATSAPP DYNAMIC MESSAGE GENERATOR
     =================================================================== */
  function buildProductMessage({ name, price, color, description }) {
    return (
      `Hello SAHA HOME DECOR,\n\n` +
      `I am interested in the following product.\n\n` +
      `Product:\n${name}\n\n` +
      `Price:\nPKR ${price}\n\n` +
      `Color:\n${color}\n\n` +
      `Description:\n${description}\n\n` +
      `Please provide availability and delivery details.\n\n` +
      `Thank you.`
    );
  }

  function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  }

  function initWhatsAppButtons() {
    // Product "Order" buttons inside each product card
    document.querySelectorAll('.whatsapp-order-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.product-card') || btn.closest('.modal-content');
        if (!card) return;

        const name = card.dataset.name || document.getElementById('pm-name')?.textContent || 'Product';
        const price = card.dataset.price || document.getElementById('pm-price')?.dataset.price || '';
        const description = card.dataset.description || document.getElementById('pm-desc')?.textContent || '';
        const activeSwatch = card.querySelector('.color-swatch.active');
        const color = activeSwatch ? activeSwatch.dataset.color : (document.getElementById('pm-order-btn')?.dataset.color || 'Any available');

        const message = buildProductMessage({ name, price, color, description });
        openWhatsApp(message);
      });
    });

    // Generic WhatsApp buttons (hero, footer, floating button, contact section)
    document.querySelectorAll('.whatsapp-generic-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const message = btn.dataset.message || 'Hello SAHA HOME DECOR, I would like more information.';
        openWhatsApp(message);
      });
    });
  }

  /* ===================================================================
     9. PRODUCT DETAILS MODAL — populated dynamically from data-* attrs
     =================================================================== */
  function initProductModal() {
    const modalEl = document.getElementById('productModal');
    if (!modalEl) return;
    const modal = new bootstrap.Modal(modalEl);

    document.querySelectorAll('.view-details-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        const images = btn.dataset.images.split(',');

        document.getElementById('pm-name').textContent = card.dataset.name;
        const priceEl = document.getElementById('pm-price');
        priceEl.textContent = 'PKR ' + card.dataset.price;
        priceEl.dataset.price = card.dataset.price;
        document.getElementById('pm-rating').innerHTML =
          '<i class="fa-solid fa-star" style="color:#F5A623"></i> ' + btn.dataset.rating;
        document.getElementById('pm-colors').textContent = btn.dataset.colors;
        document.getElementById('pm-stock').textContent = btn.dataset.stock;
        document.getElementById('pm-desc').textContent = btn.dataset.fullDesc;

        // Build the modal's own carousel from the product's image list
        const inner = document.getElementById('pm-carousel-inner');
        inner.innerHTML = images
          .map(
            (src, i) =>
              `<div class="carousel-item ${i === 0 ? 'active' : ''}"><img src="${src.trim()}" alt="${card.dataset.name}"></div>`
          )
          .join('');

        // Wire the modal's order button to this product + its selected color
        const orderBtn = document.getElementById('pm-order-btn');
        orderBtn.dataset.color =
          (card.querySelector('.color-swatch.active') || {}).dataset?.color || 'Any available';

        modal.show();
      });
    });
  }

  /* ===================================================================
     10. GALLERY LIGHTBOX
     =================================================================== */
  function initLightbox() {
    const modalEl = document.getElementById('lightboxModal');
    if (!modalEl) return;
    const modal = new bootstrap.Modal(modalEl);
    const lightboxImg = document.getElementById('lightboxImg');

    document.querySelectorAll('.masonry-item img').forEach((img) => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        modal.show();
      });
    });
  }

  /* ===================================================================
     11. CONTACT FORM — Bootstrap validation + WhatsApp handoff
     (No backend is included in this front-end-only build, so a valid
     submission is packaged into a WhatsApp message instead.)
     =================================================================== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const successMsg = document.getElementById('formSuccessMsg');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const name = document.getElementById('cf-name').value.trim();
      const phone = document.getElementById('cf-phone').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const subject = document.getElementById('cf-subject').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      const whatsappMessage =
        `Hello SAHA HOME DECOR,\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `Subject: ${subject}\n\n` +
        `Message:\n${message}`;

      successMsg.classList.remove('d-none');
      openWhatsApp(whatsappMessage);

      form.reset();
      form.classList.remove('was-validated');
      setTimeout(() => successMsg.classList.add('d-none'), 6000);
    });
  }

  /* ===================================================================
     12. FOOTER — current year
     =================================================================== */
  function initFooterYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ===================================================================
     INIT — run everything once the DOM is ready
     =================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSmoothScroll();
    initScrollReveal();
    initCounters();
    initBackToTop();
    initRipple();
    initColorSwatches();
    initProductCarousels();
    initWhatsAppButtons();
    initProductModal();
    initLightbox();
    initContactForm();
    initFooterYear();
  });
})();

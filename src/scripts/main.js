(function () {
  'use strict';

  // ── Footer year ───────────────────────────────────────────
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Header: scroll state ──────────────────────────────────
  const header = document.querySelector('.site-header');

  function updateHeader() {
    if (!header) return;
    const scrolled = window.scrollY > 40;
    header.classList.toggle('is-scrolled', scrolled);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── Mobile nav toggle ─────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
    });

    // Close menu on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
      }
    });
  }

  // ── Hero lookbook rotator ─────────────────────────────────
  const slides = Array.from(document.querySelectorAll('.hero__slide'));
  const dots   = Array.from(document.querySelectorAll('.hero__dot'));
  let current  = 0;
  let timer    = null;

  const INTERVAL = 5000;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goToSlide(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-current', 'false');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-current', 'true');
  }

  function startAutoplay() {
    if (prefersReducedMotion) return;
    timer = setInterval(function () {
      goToSlide(current + 1);
    }, INTERVAL);
  }

  function resetAutoplay() {
    clearInterval(timer);
    startAutoplay();
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToSlide(i);
      resetAutoplay();
    });
  });

  // Pause on tab visibility loss
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      startAutoplay();
    }
  });

  startAutoplay();

  // ── Sticky CTA bar ────────────────────────────────────────
  const stickyCta = document.querySelector('.sticky-cta');
  const heroSection = document.querySelector('.hero');

  if (stickyCta && heroSection) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          stickyCta.classList.toggle('is-visible', !entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(heroSection);
  }

  // ── Scroll-reveal: fade-in sections ───────────────────────
  if (!prefersReducedMotion) {
    const revealTargets = document.querySelectorAll(
      '.collection-card, .about__text-col, .about__accent-col, .visit__text, .visit__map-placeholder, .ig-inner'
    );

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(function (el) {
      el.classList.add('will-reveal');
      revealObserver.observe(el);
    });
  }
}());

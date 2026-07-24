/* ==========================================================================
   Faris Abdillah — Portfolio
   script.js

   Vanilla JavaScript — zero dependencies.

   Table of contents:
     0.  Shared references & helpers
     1.  Theme (dark by default, toggle + persistence)
     2.  Scroll progress bar
     3.  Navbar scrolled state + active link tracking
     4.  Mobile navigation toggle
     5.  Smooth scrolling for in-page anchor links
     6.  Typing effect (hero subtitle)
     7.  Mouse glow + cursor interaction
     8.  Floating card tilt effect
     9.  Hero shapes parallax on scroll
     10. Scroll-reveal animations (Intersection Observer)
     11. Skill bar fill animation
     12. GitHub stat counters
     13. Scroll-to-top button
     14. Footer year
     Init
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     0. Shared references & helpers
  ------------------------------------------------------------------------ */
  const root = document.documentElement;
  const body = document.body;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /** Shorthand for addEventListener that no-ops on missing elements. */
  function on(el, evt, handler, opts) {
    if (el) el.addEventListener(evt, handler, opts);
  }

  /** Wraps a handler so it only runs once per animation frame. Keeps scroll/mousemove listeners at 60fps. */
  function rafThrottle(fn) {
    let ticking = false;
    return function throttled(...args) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        fn.apply(this, args);
        ticking = false;
      });
    };
  }

  /* ------------------------------------------------------------------------
     1. Theme — dark by default, with a persisted light-mode toggle
  ------------------------------------------------------------------------ */
  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const STORAGE_KEY = 'faris-portfolio-theme';
    const saved = localStorage.getItem(STORAGE_KEY);
    const theme = saved === 'light' ? 'light' : 'dark'; // dark is the default

    root.setAttribute('data-theme', theme);
    updateLabel(theme);

    on(toggle, 'click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
      updateLabel(next);
    });

    function updateLabel(current) {
      if (!toggle) return;
      toggle.setAttribute('aria-label', current === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  /* ------------------------------------------------------------------------
     2. Scroll progress bar
  ------------------------------------------------------------------------ */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgressBar');
    if (!bar) return;

    const update = rafThrottle(() => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = progress + '%';
    });

    on(window, 'scroll', update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------------
     3. Navbar scrolled state + active link tracking
  ------------------------------------------------------------------------ */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = navLinks
      .map((link) => document.getElementById(link.dataset.section))
      .filter(Boolean);

    const onScroll = rafThrottle(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
    on(window, 'scroll', onScroll, { passive: true });
    onScroll();

    if (!('IntersectionObserver' in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ------------------------------------------------------------------------
     4. Mobile navigation toggle
  ------------------------------------------------------------------------ */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    const closeMenu = () => {
      body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    on(toggle, 'click', () => {
      const isOpen = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach((link) => on(link, 'click', closeMenu));
    on(document, 'keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ------------------------------------------------------------------------
     5. Smooth scrolling for in-page anchor links
     (CSS `scroll-behavior: smooth` covers the baseline; this adds a
     navbar-aware offset so headings never end up hidden underneath it.)
  ------------------------------------------------------------------------ */
  function initSmoothScroll() {
    const navbar = document.getElementById('navbar');

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      on(link, 'click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const offset = (navbar ? navbar.offsetHeight : 0) + 32;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. Typing effect for the hero subtitle
  ------------------------------------------------------------------------ */
  function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const roles = ['Frontend Engineer', 'UI/UX Designer', 'Creative Developer', 'Motion Enthusiast'];
    const TYPE_SPEED = 70;
    const DELETE_SPEED = 40;
    const HOLD_TIME = 1600;

    if (prefersReducedMotion) {
      el.textContent = roles[0];
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, HOLD_TIME);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
    }

    tick();
  }

  /* ------------------------------------------------------------------------
     7. Mouse glow + cursor interaction
  ------------------------------------------------------------------------ */
  function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || !isFinePointer) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const moveGlow = rafThrottle(() => {
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    });

    on(window, 'mousemove', (e) => {
      x = e.clientX;
      y = e.clientY;
      glow.classList.add('active');
      moveGlow();
    });

    on(document, 'mouseleave', () => glow.classList.remove('active'));

    const interactiveSelector = 'a, button, .glass-card, input, textarea';
    on(document, 'mouseover', (e) => {
      if (e.target.closest && e.target.closest(interactiveSelector)) glow.classList.add('glow-hover');
    });
    on(document, 'mouseout', (e) => {
      if (e.target.closest && e.target.closest(interactiveSelector)) glow.classList.remove('glow-hover');
    });
  }

  /* ------------------------------------------------------------------------
     8. Floating card tilt effect (project & skill cards)
  ------------------------------------------------------------------------ */
  function initCardTilt() {
    if (!isFinePointer || prefersReducedMotion) return;

    const cards = document.querySelectorAll('.project-card, .skill-card');
    const MAX_TILT = 8;

    cards.forEach((card) => {
      on(card, 'mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          `perspective(800px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateY(-6px)`;
      });

      on(card, 'mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------------------------
     9. Hero shapes parallax on scroll
  ------------------------------------------------------------------------ */
  function initParallaxShapes() {
    if (prefersReducedMotion) return;
    const container = document.querySelector('.hero-shapes');
    if (!container) return;

    const onScroll = rafThrottle(() => {
      container.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    });

    on(window, 'scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------------
     10. Scroll-reveal animations
  ------------------------------------------------------------------------ */
  function initScrollReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      items.forEach((item) => item.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    items.forEach((item) => observer.observe(item));
  }

  /* ------------------------------------------------------------------------
     11. Skill bar fill animation
  ------------------------------------------------------------------------ */
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    if (!('IntersectionObserver' in window)) {
      bars.forEach((bar) => (bar.style.width = bar.dataset.percent + '%'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const bar = entry.target;
          bar.style.width = bar.dataset.percent + '%';
          obs.unobserve(bar);
        });
      },
      { threshold: 0.4 }
    );

    bars.forEach((bar) => observer.observe(bar));
  }

  /* ------------------------------------------------------------------------
     12. GitHub stat counters
  ------------------------------------------------------------------------ */
  function formatStat(value) {
    if (value >= 1000) return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return value.toLocaleString();
  }

  function initStatCounters() {
    const values = document.querySelectorAll('.github-stat-value');
    if (!values.length) return;

    function animateValue(el) {
      const target = parseInt(el.dataset.count, 10) || 0;

      if (prefersReducedMotion) {
        el.textContent = formatStat(target);
        return;
      }

      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        el.textContent = formatStat(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = formatStat(target);
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      values.forEach(animateValue);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateValue(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    values.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     13. Scroll-to-top button
  ------------------------------------------------------------------------ */
  function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    const onScroll = rafThrottle(() => {
      btn.classList.toggle('visible', window.scrollY > 500);
    });
    on(window, 'scroll', onScroll, { passive: true });

    on(btn, 'click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     14. Footer year
  ------------------------------------------------------------------------ */
  function initFooterYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     Init
  ------------------------------------------------------------------------ */
  function init() {
    initTheme();
    initScrollProgress();
    initNavbar();
    initMobileNav();
    initSmoothScroll();
    initTypingEffect();
    initCursorGlow();
    initCardTilt();
    initParallaxShapes();
    initScrollReveal();
    initSkillBars();
    initStatCounters();
    initScrollTop();
    initFooterYear();
    body.classList.add('is-loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

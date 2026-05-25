/**
 * AuthSigma – Landing Page Scripts
 * - Mobile nav toggle
 * - Scroll-triggered fade-in animations
 */

(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav on link click (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Intersection Observer for fade-up animations ---- */
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- Stagger children in card grids ---- */
  function staggerChildren(containerSelector, childSelector, delayStep) {
    var containers = document.querySelectorAll(containerSelector);
    containers.forEach(function (container) {
      var children = container.querySelectorAll(childSelector);
      children.forEach(function (child, i) {
        child.style.transitionDelay = (i * delayStep) + 'ms';
      });
    });
  }

  staggerChildren('.problem__cards', '.risk-card', 80);
  staggerChildren('.deliverables__cols', '.deliverable-card', 90);

})();

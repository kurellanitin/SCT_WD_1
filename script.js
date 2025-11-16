// script.js
document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.main-nav');
  const offsetToActivate = 60; // px

  // Change header style on scroll
  function onScroll() {
    if (window.scrollY > offsetToActivate) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightCurrentSection();
  }

  // Smooth scrolling for nav links (native behavior fallback)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Close mobile nav if open
      if (nav.classList.contains('open')) {
        toggleMenu(false);
      }
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', href);
      }
    });
  });

  // Mobile menu toggle
  function toggleMenu(force) {
    const isOpen = typeof force === 'boolean' ? force : !nav.classList.contains('open');
    if (isOpen) {
      nav.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }
  menuToggle.addEventListener('click', () => toggleMenu());

  // Highlight the nav link of the section currently in view
  function highlightCurrentSection() {
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const middle = window.scrollY + window.innerHeight / 3;

    let current = sections[0];
    for (let s of sections) {
      if (s.offsetTop <= middle) current = s;
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + current.id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Accessibility: close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', highlightCurrentSection);

  // initialize state
  onScroll();
});

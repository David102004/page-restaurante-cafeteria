/* ═══════════════════════════════════════════════════
   KLASSY CAFÉ — Modern Vanilla JS Engine
   GSAP + Lenis + IntersectionObserver
   ═══════════════════════════════════════════════════ */

'use strict';

// ─── Wait for DOM ───
document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════
  // LOADER
  // ══════════════════════
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.6,
      delay: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.style.display = 'none';
        document.body.style.overflow = '';
        initHeroAnimations();
      }
    });
  });

  // ══════════════════════
  // LENIS SMOOTH SCROLL
  // ══════════════════════
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  } catch (e) {
    console.warn('Lenis not available, using native scroll');
  }

  // Handle anchor clicks with smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  // ══════════════════════
  // CUSTOM CURSOR
  // ══════════════════════
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .menu-card, .featured-card, .team-card, .gallery__item, input, textarea, select');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // ══════════════════════
  // NAVBAR
  // ══════════════════════
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ══════════════════════
  // MOBILE MENU
  // ══════════════════════
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    }
  });

  // ══════════════════════
  // HERO ANIMATIONS (GSAP)
  // ══════════════════════
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate hero title words
    document.querySelectorAll('.title__word').forEach(word => {
      word.classList.add('revealed');
    });

    tl.from('.hero__tag', { opacity: 0, x: -40, duration: 0.8 }, 0.2)
      .from('.title__word', {
        y: '110%',
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out'
      }, 0.3)
      .from('.hero__sub', { opacity: 0, y: 30, duration: 0.8 }, 1)
      .from('.hero__cta', { opacity: 0, y: 30, duration: 0.8 }, 1.2)
      .from('.hero__scroll', { opacity: 0, y: 20, duration: 0.6 }, 1.4)
      .from('.hero__stats .stat', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6
      }, 1.4);

    // Counter animation for stats
    document.querySelectorAll('.stat__num[data-count]').forEach(num => {
      const target = parseInt(num.dataset.count);
      gsap.to(num, {
        innerHTML: target,
        duration: 2,
        delay: 1.8,
        snap: { innerHTML: 1 },
        ease: 'power2.out'
      });
    });
  }

  // ══════════════════════
  // SCROLL REVEAL (IntersectionObserver)
  // ══════════════════════
  const revealElements = document.querySelectorAll('[data-anim="reveal"], [data-anim="fade"]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ══════════════════════
  // MENU TABS
  // ══════════════════════
  const tabs = document.querySelectorAll('.tab');
  const menuCards = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.tab;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter menu cards with animation
      menuCards.forEach(card => {
        if (card.dataset.category === category) {
          card.classList.remove('hidden');
          gsap.fromTo(card,
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05 }
          );
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ══════════════════════
  // PARALLAX ON HERO IMAGE
  // ══════════════════════
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hero__img', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Marquee speed change on scroll
    gsap.to('.marquee__track', {
      x: '-=200',
      ease: 'none',
      scrollTrigger: {
        trigger: '.marquee',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    });
  }

  // ══════════════════════
  // FORM INTERACTIONS
  // ══════════════════════
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>Reservation Sent ✓</span>';
      btn.style.background = '#44ff88';
      btn.style.color = '#0a0a0a';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ══════════════════════
  // FEATURED SCROLL DRAG
  // ══════════════════════
  const scrollContainer = document.querySelector('.featured__scroll');
  if (scrollContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollContainer.style.cursor = 'grabbing';
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
      isDown = false;
      scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
      isDown = false;
      scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    });

    scrollContainer.style.cursor = 'grab';
  }

  // ══════════════════════
  // ACTIVE NAV LINK HIGHLIGHT
  // ══════════════════════
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  // ══════════════════════
  // CONSOLE BRANDING
  // ══════════════════════
  console.log(
    '%c☕ KLASSY CAFÉ %c Crafted with obsession ',
    'background: #c8a97e; color: #0a0a0a; padding: 8px 16px; font-size: 14px; font-weight: bold; border-radius: 4px 0 0 4px;',
    'background: #1c1c1c; color: #c8a97e; padding: 8px 16px; font-size: 14px; border-radius: 0 4px 4px 0;'
  );

});

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
      btn.innerHTML = '<span>Reservación Enviada ✓</span>';
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
  // FEATURED CAROUSEL
  // ══════════════════════
  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const currentCounter = document.getElementById('carousel-current');
  const totalCounter = document.getElementById('carousel-total');
  const progressBar = document.getElementById('carousel-progress');

  if (carouselTrack && prevBtn && nextBtn) {
    const cards = carouselTrack.querySelectorAll('.carousel-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let cardWidth = 0;
    let gap = 0;
    let maxIndex = 0;

    // Calculate dimensions
    function calcDimensions() {
      if (cards.length === 0) return;
      cardWidth = cards[0].offsetWidth;
      gap = parseInt(getComputedStyle(carouselTrack).gap) || 24;
      const viewportWidth = carouselTrack.parentElement.offsetWidth;
      const visibleCards = Math.floor(viewportWidth / (cardWidth + gap));
      maxIndex = Math.max(0, totalCards - visibleCards);
    }

    calcDimensions();
    window.addEventListener('resize', () => {
      calcDimensions();
      currentIndex = Math.min(currentIndex, maxIndex);
      updateCarousel();
    });

    // Update carousel position
    function updateCarousel(animate = true) {
      const offset = currentIndex * (cardWidth + gap);
      if (!animate) carouselTrack.style.transition = 'none';
      carouselTrack.style.transform = `translateX(-${offset}px)`;
      if (!animate) {
        carouselTrack.offsetHeight; // force reflow
        carouselTrack.style.transition = '';
      }

      // Update counter
      if (currentCounter) {
        currentCounter.textContent = String(currentIndex + 1).padStart(2, '0');
      }
      if (totalCounter) {
        totalCounter.textContent = String(totalCards).padStart(2, '0');
      }

      // Update progress bar
      if (progressBar) {
        const progress = maxIndex > 0 ? ((currentIndex) / maxIndex) * 100 : 100;
        progressBar.style.width = Math.max(10, progress) + '%';
      }

      // Update button states
      prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
      nextBtn.style.opacity = currentIndex >= maxIndex ? '0.3' : '1';
    }

    updateCarousel();

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    // Drag / swipe support
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let dragOffset = 0;

    carouselTrack.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      currentTranslate = currentIndex * (cardWidth + gap);
      carouselTrack.classList.add('dragging');
      e.preventDefault();
    });

    carouselTrack.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
      currentTranslate = currentIndex * (cardWidth + gap);
      carouselTrack.classList.add('dragging');
    }, { passive: true });

    const onMove = (pageX) => {
      if (!isDragging) return;
      dragOffset = pageX - startX;
      const translate = currentTranslate - dragOffset;
      carouselTrack.style.transform = `translateX(-${translate}px)`;
    };

    carouselTrack.addEventListener('mousemove', (e) => onMove(e.pageX));
    carouselTrack.addEventListener('touchmove', (e) => onMove(e.touches[0].pageX), { passive: true });

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      carouselTrack.classList.remove('dragging');

      const threshold = cardWidth * 0.25;
      if (dragOffset > threshold && currentIndex > 0) {
        currentIndex--;
      } else if (dragOffset < -threshold && currentIndex < maxIndex) {
        currentIndex++;
      }
      dragOffset = 0;
      updateCarousel();
    };

    carouselTrack.addEventListener('mouseup', onEnd);
    carouselTrack.addEventListener('mouseleave', onEnd);
    carouselTrack.addEventListener('touchend', onEnd);

    // Expand/collapse cards on click
    cards.forEach(card => {
      const expandBtn = card.querySelector('.carousel-card__expand');
      const visual = card.querySelector('.carousel-card__visual');

      const toggleExpand = (e) => {
        e.stopPropagation();
        const isExpanded = card.classList.contains('expanded');

        // Collapse all others
        cards.forEach(c => c.classList.remove('expanded'));

        if (!isExpanded) {
          card.classList.add('expanded');
          // Animate with GSAP if available
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card.querySelector('.carousel-card__details'),
              { opacity: 0, y: -10 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 }
            );
          }
        }
      };

      if (expandBtn) expandBtn.addEventListener('click', toggleExpand);
      if (visual) visual.addEventListener('click', toggleExpand);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const featuredSection = document.getElementById('featured');
      if (!featuredSection) return;
      const rect = featuredSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;

      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      } else if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });
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

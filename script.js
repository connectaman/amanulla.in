/* ═══════════════════════════════════════════════════════════════
   AMAN ULLA — Portfolio JavaScript
   GSAP Animations / Locomotive Scroll / Neural Canvas / Interactions
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ───────── REGISTER GSAP PLUGINS ─────────
  gsap.registerPlugin(ScrollTrigger);

  // ═══════════════════════════════════════════════════════════
  // PRELOADER
  // ═══════════════════════════════════════════════════════════
  function initPreloader() {
    const tl = gsap.timeline();
    const letters = document.querySelectorAll('.preloader__letter');
    const tagline = document.querySelector('.preloader__tagline');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');

    // Animate letters in
    tl.to(letters, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    })
    .to(tagline, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.2');

    // Progress bar animation
    const progressObj = { val: 0 };
    tl.to(progressObj, {
      val: 100,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        const v = Math.round(progressObj.val);
        progressBar.style.width = v + '%';
        progressPercent.textContent = v + '%';
      },
      onComplete: () => {
        // Fade out preloader
        gsap.to(preloader, {
          opacity: 0,
          scale: 0.92,
          filter: 'blur(10px)',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            // Show main content
            mainContent.classList.add('is-visible');
            gsap.from(mainContent, {
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
              onComplete: initSite,
            });
          },
        });
      },
    }, '-=0.3');

    // Float preloader orbs
    gsap.utils.toArray('.preloader__orb').forEach((orb, i) => {
      gsap.to(orb, {
        y: -30 + i * 10,
        x: 15 - i * 8,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // MAIN SITE INITIALIZATION
  // ═══════════════════════════════════════════════════════════
  function initSite() {
    initNativeScroll();
    initNavigation();
    initHeroAnimations();
    initGlowOrbs();
    initAboutAnimations();
    initSkillsSection();
    initExperienceAnimations();
    initProjectAnimations();
    initCertificationsAnimations();
    initPatentAnimations();
    initPublicationsAnimations();
    initAchievementAnimations();
    initTestimonialsAutoScroll();
    initContactAnimations();
    initFooterAnimations();
    initCustomCursor();
    initParticles();
    initCardTilt();
  }

  // ═══════════════════════════════════════════════════════════
  // NATIVE SCROLL
  // ═══════════════════════════════════════════════════════════
  function initNativeScroll() {
    ScrollTrigger.refresh();

    // Nav scroll state
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════
  function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const mobileTray = document.getElementById('mobileTray');
    const mobileLinks = document.querySelectorAll('.mobile-tray__link');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      mobileTray.classList.toggle('is-open');
      document.body.style.overflow = mobileTray.classList.contains('is-open') ? 'hidden' : '';
    });

    mobileLinks.forEach((link, i) => {
      link.style.transitionDelay = `${0.1 + i * 0.06}s`;
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        mobileTray.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('[data-scroll-to]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = el.getAttribute('href');
        if (target) {
          const dest = document.querySelector(target);
          if (dest) dest.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // HERO ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to('.hero__greeting', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
    .to('.hero__name', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3')
    .to('.hero__title', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .to('.hero__subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')
    .to('.hero__tagline-sub', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.2')
    .to('.hero__cta-group', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.2')
    .to('.hero__3d', {
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      clearProps: 'transform',
      onComplete: function() {
        // On mobile, ensure no inline transform overrides CSS
        if (window.innerWidth <= 1024) {
          document.querySelector('.hero__3d').style.transform = 'none';
        }
      }
    }, '-=0.6');

    // CTA hover pulse
    document.querySelectorAll('.hero__cta').forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.06, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // FLOATING GLOW ORBS
  // ═══════════════════════════════════════════════════════════
  function initGlowOrbs() {
    gsap.utils.toArray('.glow-orb').forEach((orb, i) => {
      gsap.to(orb, {
        y: -20 - i * 5,
        x: 10 + i * 3,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // ABOUT ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  function initAboutAnimations() {
    const aboutSection = '#about';

    // Section header
    gsap.from(`${aboutSection} .section__header`, {
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power3.out',
    });

    // Image from left
    gsap.from('.about__image-wrap', {
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: -60,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Bio
    gsap.from('.about__info', {
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      filter: 'blur(4px)',
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
    });

    // Stats counter animation
    gsap.utils.toArray('.about__stat-num').forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = target % 1 !== 0 ? obj.val.toFixed(1) : Math.round(obj.val);
            },
          });
        },
        once: true,
      });
    });

  }

  // ═══════════════════════════════════════════════════════════
  // SKILLS SECTION (Interactive Tabs + Bar Animation)
  // ═══════════════════════════════════════════════════════════
  function initSkillsSection() {
    const section = '#skills';
    const tabs = document.querySelectorAll('.skills__tab');
    const chips = document.querySelectorAll('.skill-chip');

    // Section header animation
    gsap.fromTo(`${section} .section__header`,
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    // Tabs animation
    gsap.fromTo('.skills__tab',
      { opacity: 0, y: 15 },
      {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out',
      }
    );

    // Chips stagger entrance — use set + to pattern so chips are visible by default
    chips.forEach((chip) => {
      gsap.set(chip, { opacity: 1, y: 0, scale: 1 });
    });

    ScrollTrigger.create({
      trigger: '.skills__grid',
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo('.skill-chip',
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.03, ease: 'power3.out' }
        );
      },
    });

    // Skill bar fill animation on scroll
    ScrollTrigger.create({
      trigger: '.skills__grid',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        document.querySelectorAll('.skill-chip__fill').forEach((fill) => {
          const level = fill.dataset.level || 0;
          gsap.to(fill, {
            width: level + '%',
            duration: 1.2,
            delay: Math.random() * 0.3,
            ease: 'power2.out',
          });
        });
      },
    });

    // Tab filtering
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        const category = tab.dataset.tab;

        chips.forEach((chip) => {
          if (category === 'all' || chip.dataset.category === category) {
            chip.classList.remove('is-hidden');
            gsap.fromTo(chip,
              { opacity: 0, y: 15, scale: 0.9 },
              { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' }
            );
          } else {
            chip.classList.add('is-hidden');
          }
        });

        // Update locomotive scroll after DOM changes
        if (locoScroll) {
          setTimeout(() => locoScroll.update(), 100);
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // EXPERIENCE ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  function initExperienceAnimations() {
    const section = '#experience';

    gsap.from(`${section} .section__header`, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.utils.toArray('.exp-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -30,
        y: 20,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out',
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // PROJECT ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  function initProjectAnimations() {
    const section = '#projects';

    gsap.from(`${section} .section__header`, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
      });
    });

    // Mouse-follow glow on cards
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const glow = card.querySelector('.project-card__glow');
        if (glow) {
          glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(77, 124, 255, 0.08), transparent 40%)`;
        }
      });
    });

    // Touch swipe support
    const track = document.getElementById('projectsTrack');
    if (track) {
      let isDown = false;
      let startX;
      let scrollLeft;

      track.parentElement.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.parentElement.offsetLeft;
        scrollLeft = track.parentElement.scrollLeft;
      });

      track.parentElement.addEventListener('mouseleave', () => isDown = false);
      track.parentElement.addEventListener('mouseup', () => isDown = false);
      track.parentElement.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.parentElement.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.parentElement.scrollLeft = scrollLeft - walk;
      });
    }
  }

  // ═══════════════════════════════════════════════════════════
  // ACHIEVEMENT ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  function initAchievementAnimations() {
    const section = '#achievements';

    gsap.from(`${section} .section__header`, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.utils.toArray('.achievement-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power3.out',
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // TESTIMONIALS AUTO SCROLL
  // ═══════════════════════════════════════════════════════════
  function initTestimonialsAutoScroll() {
    const section = document.getElementById('testimonials');
    if (!section) return;

    const viewport = section.querySelector('.testimonials__viewport');
    const track = section.querySelector('#testimonialsTrack') || section.querySelector('.testimonials__grid');
    if (!viewport || !track) return;

    // Respect reduced motion preferences.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    if (cards.length === 0) return;

    // Clone cards once for a seamless loop.
    const fragment = document.createDocumentFragment();
    cards.forEach((card) => fragment.appendChild(card.cloneNode(true)));
    track.appendChild(fragment);

    let isPaused = false;
    let started = false;
    let offset = 0;
    let halfWidth = 0;
    let lastTs = null;

    function recalc() {
      // After cloning, the track contains two identical sets.
      halfWidth = track.scrollWidth / 2;
      // Keep offset within [-halfWidth, 0]
      offset = Math.max(-halfWidth, Math.min(0, offset));
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    }

    function pause() {
      isPaused = true;
    }

    function resume() {
      isPaused = false;
    }

    viewport.addEventListener('mouseenter', pause);
    viewport.addEventListener('mouseleave', resume);

    const speedPxPerSec = 45; // right-to-left
    const startDelayMs = 5000;

    function step(ts) {
      if (!started) return;

      if (lastTs === null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (!isPaused) {
        if (halfWidth <= 0) return requestAnimationFrame(step);
        offset -= speedPxPerSec * dt;
        // Wrap seamlessly when reaching the half width.
        if (offset <= -halfWidth) offset += halfWidth;
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
      }

      requestAnimationFrame(step);
    }

    // Wait 5 seconds, then start auto-scrolling.
    setTimeout(() => {
      recalc();
      started = true;
      lastTs = null;
      requestAnimationFrame(step);
    }, startDelayMs);

    window.addEventListener('resize', recalc);
  }

  // ═══════════════════════════════════════════════════════════
  // CERTIFICATIONS ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  function initCertificationsAnimations() {
    const section = '#certifications';

    gsap.from(`${section} .section__header`, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.utils.toArray('.cert-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -30,
        duration: 0.5,
        delay: i * 0.06,
        ease: 'power3.out',
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // PATENT ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  function initPatentAnimations() {
    const section = '#patent';

    gsap.from(`${section} .section__header`, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.patent__card', {
      scrollTrigger: {
        trigger: '.patent__card',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      scale: 0.96,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  // ═══════════════════════════════════════════════════════════
  // PUBLICATIONS ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  function initPublicationsAnimations() {
    const section = '#publications';

    gsap.from(`${section} .section__header`, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.utils.toArray('.pub-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out',
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // CONTACT ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  function initContactAnimations() {
    const section = '#contact';

    gsap.from(`${section} .section__header`, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power3.out',
    });

    // Info from left
    gsap.from('.contact__info', {
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: -40,
      duration: 0.7,
      ease: 'power3.out',
    });

    // Social icons glow on hover
    document.querySelectorAll('.contact__social').forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          boxShadow: '0 0 30px rgba(77, 124, 255, 0.3)',
          duration: 0.3,
        });
      });
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          boxShadow: 'none',
          duration: 0.3,
        });
      });
    });

  }

  // ═══════════════════════════════════════════════════════════
  // FOOTER ANIMATIONS
  // ═══════════════════════════════════════════════════════════
  function initFooterAnimations() {
    gsap.from('.footer__content', {
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 60,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  // ═══════════════════════════════════════════════════════════
  // FLOATING PARTICLES (Footer)
  // ═══════════════════════════════════════════════════════════
  function initParticles() {
    gsap.utils.toArray('.footer__particle').forEach((p, i) => {
      gsap.to(p, {
        y: -15 - Math.random() * 20,
        x: (Math.random() - 0.5) * 20,
        opacity: 0.1 + Math.random() * 0.4,
        duration: 2 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.2,
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // CUSTOM CURSOR
  // ═══════════════════════════════════════════════════════════
  function initCustomCursor() {
    if (window.innerWidth < 768) return;

    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      // Cursor - instant
      cursorX += (mouseX - cursorX) * 0.3;
      cursorY += (mouseY - cursorY) * 0.3;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      // Follower - laggy
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';

      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover effect on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .project-card, .skill-chip, .achievement-card, .exp-card__content, .cert-card, .pub-card, .patent__card');
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor--hover');
        follower.classList.add('cursor--hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor--hover');
        follower.classList.remove('cursor--hover');
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // INTERACTIVE CARD TILT (3D perspective on hover)
  // ═══════════════════════════════════════════════════════════
  function initCardTilt() {
    const tiltCards = document.querySelectorAll(
      '.project-card, .achievement-card, .pub-card, .patent__card'
    );

    tiltCards.forEach((card) => {
      card.style.transformStyle = 'preserve-3d';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', initPreloader);

  // Ensure ScrollTrigger positions are correct after all resources load
  // (helps with "content appears late on scroll" symptoms).
  window.addEventListener('load', () => {
    if (locoScroll) locoScroll.update();
    ScrollTrigger.refresh();
  });

})();

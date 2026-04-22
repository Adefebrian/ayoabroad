/* ============================================
   ANIMATIONS - GSAP ScrollTrigger + CSS
   ============================================ */

/**
 * Initialize hero load animation
 */
function initHeroAnimation() {
  // Check GSAP availability
  if (typeof gsap === 'undefined') {
    // Fallback: just show everything
    document.querySelectorAll('.hero-content > *').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const tl = gsap.timeline();

  tl.from('.hero-bg', { opacity: 0, duration: 0.4 })
    .from('.hero-orb', { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, 0.2)
    .from('.hero-orb-2', { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, 0.4)
    .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.5 }, 0.5)
    .from('.hero-title', { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out' }, 0.7)
    .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, 1.0)
    .from('.hero-stat', { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 }, 1.2)
    .from('.hero-cta', { opacity: 0, y: 10, duration: 0.4 }, 1.5);

  // Counter animation after timeline
  setTimeout(() => {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, 1500, suffix);
    });
  }, 1200);
}

/**
 * Helper: create a scroll-triggered animation that ensures visibility
 * Uses onComplete to guarantee elements are fully visible after animation
 */
function scrollReveal(elements, triggerEl, fromVars, staggerVal) {
  if (!elements || (elements.length !== undefined && elements.length === 0)) return;

  const config = {
    scrollTrigger: {
      trigger: triggerEl,
      start: 'top 90%',
      toggleActions: 'play none none none',
      once: true
    },
    ...fromVars,
    onComplete: () => {
      // Ensure all elements are fully visible after animation
      const els = elements.length !== undefined ? elements : [elements];
      Array.from(els).forEach(el => {
        gsap.set(el, { clearProps: 'all' });
      });
    }
  };

  if (staggerVal) {
    config.stagger = staggerVal;
  }

  gsap.from(elements, config);
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Section headers reveal
  gsap.utils.toArray('.section-header').forEach(header => {
    scrollReveal(header, header, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // Glass cards stagger animation
  gsap.utils.toArray('.segment-cards, .insights-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.glass-card, .segment-card');
    if (cards.length === 0) return;
    scrollReveal(cards, grid, {
      opacity: 0,
      y: 40,
      duration: 0.5,
      ease: 'power2.out'
    }, 0.1);
  });

  // Charts grid - animate separately from segment cards to avoid conflict
  gsap.utils.toArray('.charts-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.glass-card, .chart-card');
    if (cards.length === 0) return;
    scrollReveal(cards, grid, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out'
    }, 0.08);
  });

  // Insight box
  gsap.utils.toArray('.insight-box').forEach(box => {
    scrollReveal(box, box, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // Table wrappers
  gsap.utils.toArray('.table-wrapper').forEach(wrapper => {
    scrollReveal(wrapper, wrapper, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  // Heatmap
  const heatmapSection = document.querySelector('.heatmap-container');
  if (heatmapSection) {
    scrollReveal(heatmapSection, heatmapSection, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  // After a safety timeout, ensure everything that might still be hidden gets shown
  // This catches edges cases with fast scrolling or nav jumping
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
}

/**
 * Generate floating particles in hero
 */
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.animationDuration = `${4 + Math.random() * 4}s`;
    particle.style.width = `${1 + Math.random() * 2}px`;
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

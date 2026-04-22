/* ============================================
   MAIN APP - Initialization & Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Create particles
  createParticles();

  // 2. Load data
  const data = await loadCompetitorData();
  if (!data) {
    console.error('Failed to load competitor data');
    return;
  }

  // 3. Initialize navigation
  initNavigation();

  // 4. Initialize scroll progress
  initScrollProgress();

  // 5. Render executive summary
  renderExecutiveSummary(data);

  // 6. Render competitor segment sections
  const segmentsContainer = document.getElementById('segments-container');
  const globalMax = getGlobalMaxPrice(data);

  data.segments.forEach(segment => {
    renderSegmentSection(segment, globalMax, segmentsContainer);
  });

  // 7. Render charts
  initAllCharts(data);

  // 8. Render market gap categories + whitespace table
  renderMarketGapCategories(data);
  renderWhitespace(data);

  // 9. Render positioning section
  renderPositioningSection(data);

  // 10. Initialize hero animation
  initHeroAnimation();

  // 11. Setup modal events
  initModal();

  // 12. Initialize scroll-triggered animations (after all content rendered)
  setTimeout(() => {
    initScrollAnimations();
  }, 300);
});

/**
 * Navigation setup
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const hamburger = document.querySelector('.nav-hamburger');
  const navMenu = document.querySelector('.nav-links');

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Refresh ScrollTrigger after smooth scroll completes
        setTimeout(() => {
          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
        }, 800);
      }

      // Close mobile menu
      if (navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open');
        hamburger.classList.remove('open');
      }
    });
  });

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('mobile-open');
    });
  }

  // Active state on scroll
  window.addEventListener('scroll', debounce(() => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, 100));
}

/**
 * Scroll progress bar
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/**
 * Render Executive Summary section (4 audience cards + insight box)
 */
function renderExecutiveSummary(data) {
  const cardsContainer = document.getElementById('segment-cards');
  if (!cardsContainer) return;

  const audiences = [
    {
      icon: 'graduation-cap',
      title: 'Segmen A: Lulusan SMA',
      profile: '17-19 tahun, ingin S1 di luar negeri',
      desc: 'Membutuhkan IELTS/SAT + konsultasi universitas + bantuan beasiswa. Sensitif harga, bergantung pada orang tua.'
    },
    {
      icon: 'briefcase',
      title: 'Segmen B: Fresh Graduate',
      profile: '21-25 tahun, ingin kerja luar negeri',
      desc: 'Butuh bahasa kerja + CV/portofolio + visa WHV/Ausbildung. Aktif mencari peluang, anggaran terbatas.'
    },
    {
      icon: 'globe',
      title: 'Segmen C: Profesional Imigrasi',
      profile: '25-40 tahun, ingin pindah permanen',
      desc: 'IELTS + Global Talent Visa + network settling. Budget lebih besar, butuh layanan premium end-to-end.'
    },
    {
      icon: 'building',
      title: 'Segmen D: Karyawan Multinasional',
      profile: '25-45 tahun, butuh upgrade bahasa',
      desc: 'Business English + komunikasi lintas budaya. B2B model, dibiayai perusahaan, butuh jadwal fleksibel.'
    }
  ];

  cardsContainer.innerHTML = audiences.map(a => `
    <div class="glass-card segment-card">
      <div class="segment-card-icon">${getIcon(a.icon, 24)}</div>
      <h3>${a.title}</h3>
      <div class="card-profile">${a.profile}</div>
      <p>${a.desc}</p>
    </div>
  `).join('');
}

/**
 * Render Market Gap category summary cards
 */
function renderMarketGapCategories(data) {
  const container = document.getElementById('gap-categories');
  if (!container || !data.whitespace) return;

  // Group gaps by category
  const categories = {};
  data.whitespace.forEach(w => {
    if (!categories[w.category]) categories[w.category] = [];
    categories[w.category].push(w);
  });

  const categoryIcons = {
    'Layanan Terintegrasi': 'layers',
    'Teknologi & AI': 'cpu',
    'Aksesibilitas & Fleksibilitas': 'clock',
    'Model Bisnis': 'trending-up',
    'Segmen Underserved': 'users'
  };

  const categoryColors = {
    'Layanan Terintegrasi': '#D4AF37',
    'Teknologi & AI': '#E74C3C',
    'Aksesibilitas & Fleksibilitas': '#3498DB',
    'Model Bisnis': '#2ECC71',
    'Segmen Underserved': '#9B59B6'
  };

  container.innerHTML = Object.entries(categories).map(([cat, items]) => {
    const icon = categoryIcons[cat] || 'zap';
    const color = categoryColors[cat] || '#D4AF37';
    const highValueCount = items.filter(i => i.market_value.includes('Sangat')).length;
    return `
      <div class="glass-card gap-category-card">
        <div class="gap-cat-header">
          <div class="gap-cat-icon" style="background: ${color}22; color: ${color};">${getIcon(icon, 22)}</div>
          <div>
            <h4 style="color: ${color};">${cat}</h4>
            <span class="gap-cat-count">${items.length} celah ditemukan${highValueCount > 0 ? ` · ${highValueCount} bernilai Sangat Tinggi` : ''}</span>
          </div>
        </div>
        <ul class="gap-cat-list">
          ${items.map(i => `<li>${i.gap}</li>`).join('')}
        </ul>
      </div>
    `;
  }).join('');
}

/**
 * Render Whitespace table (numbered, categorized)
 */
function renderWhitespace(data) {
  const container = document.getElementById('whitespace-table-body');
  if (!container || !data.whitespace) return;

  container.innerHTML = data.whitespace.map((w, idx) => {
    const valueClass = w.market_value.includes('Sangat') ? 'high' : w.market_value.includes('Tinggi') ? 'medium' : 'low';
    const catColor = {
      'Layanan Terintegrasi': '#D4AF37',
      'Teknologi & AI': '#E74C3C',
      'Aksesibilitas & Fleksibilitas': '#3498DB',
      'Model Bisnis': '#2ECC71',
      'Segmen Underserved': '#9B59B6'
    }[w.category] || '#D4AF37';
    return `
      <tr>
        <td style="color: var(--color-text-muted); text-align: center; font-weight: 600;">${w.no || idx + 1}</td>
        <td style="color: var(--color-text-primary); font-weight: 500;">${w.gap}</td>
        <td><span style="color: ${catColor}; font-size: 0.75rem; font-weight: 500;">${w.category}</span></td>
        <td>${w.failed_by}</td>
        <td><span class="value-badge ${valueClass}">${w.market_value}</span></td>
      </tr>
    `;
  }).join('');
}

/**
 * Render Positioning section additional content
 */
function renderPositioningSection(data) {
  // The positioning chart is rendered by charts.js
  // Here we render the comparison features table
  const container = document.getElementById('comparison-table-body');
  if (!container) return;

  const features = ['ielts', 'gmat', 'study_abroad', 'whv', 'ausbildung', 'gtv', 'corporate', 'score_guarantee', 'installment'];

  // Pick representative competitors
  const reps = ['British Council', 'Schoters', 'Bright Education', 'EF (English First)', 'Lister'];
  const allComps = getAllCompetitors(data);
  const selected = reps.map(name => allComps.find(c => c.name === name)).filter(Boolean);

  // Header row
  const headerRow = document.getElementById('comparison-header');
  if (headerRow) {
    headerRow.innerHTML = `<th>Fitur</th>` + selected.map(c => `<th style="font-size: 11px;">${c.name}</th>`).join('') + `<th style="color: #E74C3C;">Ayoabroad!</th>`;
  }

  container.innerHTML = features.map(key => {
    const label = getFeatureLabel(key);
    const cells = selected.map(c => {
      const has = c.features[key];
      return `<td style="text-align: center;">${has ? '<span style="color: #2ECC71;">✓</span>' : '<span style="color: var(--color-text-muted);">·</span>'}</td>`;
    }).join('');
    return `
      <tr>
        <td style="font-weight: 500; color: var(--color-text-primary);">${label}</td>
        ${cells}
        <td style="text-align: center;"><span style="color: #2ECC71; font-weight: 700;">✓</span></td>
      </tr>
    `;
  }).join('');
}

/**
 * Modal system for competitor details
 */
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  // Close modal on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close button
  const closeBtn = overlay.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Delegate click events for detail buttons and comp names
  document.addEventListener('click', (e) => {
    const detailBtn = e.target.closest('.btn-detail');
    const compName = e.target.closest('.comp-name');
    const trigger = detailBtn || compName;

    if (trigger && trigger.dataset.comp) {
      try {
        const comp = JSON.parse(trigger.dataset.comp);
        openModal(comp);
      } catch (err) {
        console.error('Failed to parse competitor data:', err);
      }
    }
  });
}

function openModal(comp) {
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('modal-body-content');
  const title = document.getElementById('modal-title');

  if (!overlay || !body || !title) return;

  title.textContent = comp.name;

  const priceText = comp.price_label || (comp.price_min === comp.price_max
    ? formatRupiah(comp.price_min)
    : `${formatRupiah(comp.price_min)} - ${formatRupiah(comp.price_max)}`);

  body.innerHTML = `
    <div class="detail-row">
      <div class="detail-label">Program</div>
      <div class="detail-value">${comp.program}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Harga</div>
      <div class="detail-value" style="color: var(--color-gold-500); font-size: 1.1rem; font-weight: 600;">${priceText}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Benefit</div>
      <ul class="detail-list">
        ${comp.benefits.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
    <div class="detail-row">
      <div class="detail-label">Kelebihan</div>
      <ul class="detail-list detail-list-pro">
        ${comp.pros.map(p => `<li>${p}</li>`).join('')}
      </ul>
    </div>
    <div class="detail-row">
      <div class="detail-label">Kekurangan</div>
      <ul class="detail-list detail-list-con">
        ${comp.cons.map(c => `<li>${c}</li>`).join('')}
      </ul>
    </div>
    <div class="detail-row">
      <div class="detail-label">Lokasi</div>
      <div class="detail-value">
        <span class="badge ${getLocationClass(comp.location_type)}">${getLocationLabel(comp.location_type)}</span>
        <span style="margin-left: 8px;">${comp.locations.join(', ')}</span>
      </div>
    </div>
    <div class="detail-row" style="display: flex; gap: 2rem; flex-wrap: wrap;">
      <div>
        <div class="detail-label">Garansi Skor</div>
        <div class="detail-value">${comp.score_guarantee ? '<span style="color: #2ECC71;">Ya</span>' : '<span style="color: var(--color-text-muted);">Tidak</span>'}</div>
      </div>
      <div>
        <div class="detail-label">Cicilan</div>
        <div class="detail-value">${comp.installment ? '<span style="color: #2ECC71;">Ya</span>' : '<span style="color: var(--color-text-muted);">Tidak</span>'}</div>
      </div>
      <div>
        <div class="detail-label">Transparansi Harga</div>
        <div class="detail-value">${comp.transparency === 'published' ? '<span style="color: #2ECC71;">Transparan</span>' : comp.transparency === 'partial' ? '<span style="color: #F39C12;">Parsial</span>' : '<span style="color: #E74C3C;">By Request</span>'}</div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

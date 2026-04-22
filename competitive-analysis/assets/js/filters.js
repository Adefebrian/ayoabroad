/* ============================================
   FILTER LOGIC - Tables and categories
   ============================================ */

/**
 * Render a segment section with table + filters + insights
 * @param {object} segment - segment data object
 * @param {number} globalMax - global max price for bar scaling
 * @param {HTMLElement} container - parent container
 */
function renderSegmentSection(segment, globalMax, container) {
  const section = document.createElement('section');
  section.id = `segment-${segment.id}`;
  section.className = 'segment-section';

  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-label">${segment.icon ? getIcon(segment.icon, 16) + ' ' : ''}Segmen Analisis</span>
        <h2 class="section-title" style="color: ${segment.color}">${segment.label}</h2>
        <div class="gold-line" style="background: linear-gradient(90deg, transparent, ${segment.color}, transparent)"></div>
        <p class="section-subtitle">${segment.description}</p>
      </div>

      <div class="filter-bar" id="filter-${segment.id}">
        <div class="filter-group">
          <button class="filter-btn active" data-filter="all" data-segment="${segment.id}">Semua</button>
          <button class="filter-btn" data-filter="hybrid" data-segment="${segment.id}">Hybrid</button>
          <button class="filter-btn" data-filter="online" data-segment="${segment.id}">Online</button>
          <button class="filter-btn" data-filter="offline" data-segment="${segment.id}">Luring</button>
        </div>
        <div class="filter-group">
          <button class="filter-btn" data-sort="price-asc" data-segment="${segment.id}">Harga ↑</button>
          <button class="filter-btn" data-sort="price-desc" data-segment="${segment.id}">Harga ↓</button>
        </div>
        <input type="text" class="search-input" placeholder="Cari lembaga..." data-segment="${segment.id}" id="search-${segment.id}">
      </div>

      <div class="table-wrapper">
        <table class="comp-table" id="table-${segment.id}">
          <thead>
            <tr>
              <th>Lembaga</th>
              <th>Program</th>
              <th>Harga <span class="sort-icon">↕</span></th>
              <th>Kelebihan</th>
              <th>Kekurangan</th>
              <th>Lokasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody id="tbody-${segment.id}"></tbody>
        </table>
      </div>

      <div class="insights-grid" id="insights-${segment.id}"></div>
    </div>
  `;

  container.appendChild(section);

  // Render table rows
  renderTableRows(segment, globalMax);

  // Render insight cards
  renderInsightCards(segment);

  // Attach filter events
  attachFilterEvents(segment, globalMax);
}

/**
 * Render table rows for a segment
 * @param {object} segment
 * @param {number} globalMax
 * @param {string} locationFilter
 * @param {string} sortBy
 * @param {string} searchQuery
 */
function renderTableRows(segment, globalMax, locationFilter = 'all', sortBy = null, searchQuery = '') {
  const tbody = document.getElementById(`tbody-${segment.id}`);
  if (!tbody) return;

  let competitors = [...segment.competitors];

  // Filter by location
  if (locationFilter !== 'all') {
    competitors = competitors.filter(c => c.location_type === locationFilter);
  }

  // Filter by search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    competitors = competitors.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.program.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sortBy === 'price-asc') {
    competitors.sort((a, b) => getAvgPrice(a) - getAvgPrice(b));
  } else if (sortBy === 'price-desc') {
    competitors.sort((a, b) => getAvgPrice(b) - getAvgPrice(a));
  }

  tbody.innerHTML = '';

  if (competitors.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2rem; color: var(--color-text-muted);">
          Tidak ada lembaga yang cocok dengan filter.
        </td>
      </tr>
    `;
    return;
  }

  competitors.forEach((comp, index) => {
    const tr = document.createElement('tr');
    tr.style.animationDelay = `${index * 50}ms`;

    const priceWidth = getPriceBarWidth(comp.price_max, globalMax);
    const priceText = comp.price_label || (comp.price_min === comp.price_max
      ? formatRupiah(comp.price_min)
      : `${formatRupiah(comp.price_min)} - ${formatRupiah(comp.price_max)}`);

    const prosHtml = comp.pros.map(p => `<li class="list-pro">${p}</li>`).join('');
    const consHtml = comp.cons.map(c => `<li class="list-con">${c}</li>`).join('');

    tr.innerHTML = `
      <td><span class="comp-name" data-comp='${JSON.stringify(comp).replace(/'/g, "&#39;")}'>${comp.name}</span></td>
      <td><span class="comp-program">${comp.program}</span></td>
      <td>
        <div class="price-range">
          <div class="price-bar-bg"><div class="price-bar-fill" style="width: ${priceWidth}%"></div></div>
          <span class="price-label">${priceText}</span>
        </div>
      </td>
      <td><ul class="inline-list">${prosHtml}</ul></td>
      <td><ul class="inline-list">${consHtml}</ul></td>
      <td><span class="badge ${getLocationClass(comp.location_type)}">${getLocationLabel(comp.location_type)}</span></td>
      <td><button class="btn-detail" data-comp='${JSON.stringify(comp).replace(/'/g, "&#39;")}'>Detail</button></td>
    `;

    tbody.appendChild(tr);
  });
}

/**
 * Render insight cards for a segment
 * @param {object} segment
 */
function renderInsightCards(segment) {
  const container = document.getElementById(`insights-${segment.id}`);
  if (!container || !segment.insights) return;

  const iconMap = {
    'cheapest': { icon: 'trending-down', class: 'cheapest' },
    'expensive': { icon: 'trending-up', class: 'expensive' },
    'gap': { icon: 'zap', class: 'gap' }
  };

  container.innerHTML = segment.insights.map(insight => {
    const cfg = iconMap[insight.type] || iconMap.gap;
    return `
      <div class="glass-card insight-card">
        <div class="insight-card-header">
          <div class="insight-card-icon ${cfg.class}">${getIcon(cfg.icon, 20)}</div>
          <h4>${insight.title}</h4>
        </div>
        <p>${insight.content}</p>
      </div>
    `;
  }).join('');
}

/**
 * Attach filter event listeners for a segment
 * @param {object} segment
 * @param {number} globalMax
 */
function attachFilterEvents(segment, globalMax) {
  const filterBar = document.getElementById(`filter-${segment.id}`);
  if (!filterBar) return;

  let currentFilter = 'all';
  let currentSort = null;
  let currentSearch = '';

  // Location filter buttons
  filterBar.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTableRows(segment, globalMax, currentFilter, currentSort, currentSearch);
    });
  });

  // Sort buttons
  filterBar.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('[data-sort]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSort = btn.dataset.sort;
      renderTableRows(segment, globalMax, currentFilter, currentSort, currentSearch);
    });
  });

  // Search input
  const searchInput = document.getElementById(`search-${segment.id}`);
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      currentSearch = e.target.value;
      renderTableRows(segment, globalMax, currentFilter, currentSort, currentSearch);
    }, 200));
  }
}

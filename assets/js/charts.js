/* ============================================
   CHARTS - All Chart.js configurations
   ============================================ */

// Global Chart.js defaults
function initChartDefaults() {
  Chart.defaults.color = '#A89B7A';
  Chart.defaults.borderColor = 'rgba(212, 175, 55, 0.1)';
  Chart.defaults.font.family = "'DM Sans', sans-serif";
  Chart.defaults.plugins.legend.labels.color = '#F5F0E8';
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
}

const chartInstances = {};

/**
 * CHART 1: Grouped Bar - Price Distribution per Segment
 */
function renderPriceDistributionChart(data) {
  const ctx = document.getElementById('chart-price-dist');
  if (!ctx) return;

  const segments = data.segments;
  const labels = segments.map(s => s.label);

  // For each segment, find the actual min and max across all competitors
  const minPrices = segments.map(s => {
    const prices = s.competitors.filter(c => c.price_min > 0).map(c => c.price_min);
    return prices.length ? Math.min(...prices) : 0;
  });
  const maxPrices = segments.map(s => {
    const prices = s.competitors.filter(c => c.price_max > 0).map(c => c.price_max);
    return prices.length ? Math.max(...prices) : 0;
  });

  if (chartInstances['price-dist']) chartInstances['price-dist'].destroy();

  chartInstances['price-dist'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Harga Minimum',
          data: minPrices,
          backgroundColor: 'rgba(13, 13, 13, 0.8)',
          borderColor: 'rgba(212, 175, 55, 0.4)',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.7,
          categoryPercentage: 0.8
        },
        {
          label: 'Harga Maksimum',
          data: maxPrices,
          backgroundColor: 'rgba(212, 175, 55, 0.6)',
          borderColor: '#D4AF37',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.7,
          categoryPercentage: 0.8
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: 'easeInOutQuart',
        delay: (context) => context.dataIndex * 100
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${formatRupiah(ctx.raw)}`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(212, 175, 55, 0.06)' },
          ticks: {
            callback: (val) => formatRupiah(val)
          }
        },
        y: {
          grid: { display: false }
        }
      }
    }
  });
}

/**
 * CHART 2: Radar Chart - Competitor Profiles
 */
function renderRadarChart(data) {
  const ctx = document.getElementById('chart-radar');
  if (!ctx) return;

  const radar = data.radar_data;
  const datasets = radar.competitors.map(comp => ({
    label: comp.name,
    data: comp.scores,
    borderColor: comp.color,
    backgroundColor: comp.color + '20',
    borderWidth: 2,
    pointBackgroundColor: comp.color,
    pointBorderColor: comp.color,
    pointRadius: 4,
    pointHoverRadius: 6
  }));

  if (chartInstances['radar']) chartInstances['radar'].destroy();

  chartInstances['radar'] = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: radar.labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 20 }
        }
      },
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2,
            color: '#5C5347',
            backdropColor: 'transparent'
          },
          grid: {
            color: 'rgba(212, 175, 55, 0.08)'
          },
          angleLines: {
            color: 'rgba(212, 175, 55, 0.08)'
          },
          pointLabels: {
            color: '#A89B7A',
            font: { size: 11 }
          }
        }
      }
    }
  });

  // Setup radar toggles
  setupRadarToggles(data);
}

/**
 * Setup radar chart toggle buttons
 */
function setupRadarToggles(data) {
  const container = document.getElementById('radar-toggles');
  if (!container) return;

  const radar = data.radar_data;
  container.innerHTML = radar.competitors.map((comp, i) => `
    <button class="radar-toggle active" data-index="${i}" style="color: ${comp.color}; border-color: ${comp.color}">
      <span class="dot"></span>
      <span>${comp.name}</span>
    </button>
  `).join('');

  container.querySelectorAll('.radar-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const index = parseInt(btn.dataset.index);
      const chart = chartInstances['radar'];
      if (chart) {
        const meta = chart.getDatasetMeta(index);
        meta.hidden = !meta.hidden;
        chart.update();
      }
    });
  });
}

/**
 * CHART 3: Bubble Chart - Positioning Map (Harga vs Kelengkapan)
 */
function renderPositioningChart(data) {
  const ctx = document.getElementById('chart-positioning');
  if (!ctx) return;

  const posData = getPositioningData(data);

  // Group by segment
  const segmentGroups = {};
  posData.forEach(item => {
    if (!segmentGroups[item.segment]) {
      segmentGroups[item.segment] = {
        color: item.segmentColor,
        data: []
      };
    }
    segmentGroups[item.segment].data.push({
      x: item.x || 1,
      y: item.y,
      r: item.r,
      name: item.name,
      price_label: item.price_label
    });
  });

  const datasets = Object.entries(segmentGroups).map(([label, group]) => ({
    label: label,
    data: group.data,
    backgroundColor: group.color + '60',
    borderColor: group.color,
    borderWidth: 2
  }));

  // Add "Ayoabroad! target position" point
  datasets.push({
    label: 'Posisi Target Ayoabroad!',
    data: [{ x: 12000000, y: 85, r: 15, name: 'Ayoabroad!', price_label: 'Rp 12 Jt (est.)' }],
    backgroundColor: 'rgba(231, 76, 60, 0.6)',
    borderColor: '#E74C3C',
    borderWidth: 3,
    pointStyle: 'star'
  });

  if (chartInstances['positioning']) chartInstances['positioning'].destroy();

  chartInstances['positioning'] = new Chart(ctx, {
    type: 'bubble',
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: 'easeInOutQuart'
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const d = ctx.raw;
              return [`${d.name}`, `Harga: ${d.price_label}`, `Skor: ${d.y}/100`];
            }
          }
        },
        legend: {
          position: 'bottom',
          labels: { padding: 16 }
        }
      },
      scales: {
        x: {
          type: 'logarithmic',
          title: {
            display: true,
            text: 'Harga Rata-rata (Rp)',
            color: '#A89B7A'
          },
          grid: { color: 'rgba(212, 175, 55, 0.06)' },
          ticks: {
            callback: (val) => formatRupiah(val)
          },
          min: 100000
        },
        y: {
          title: {
            display: true,
            text: 'Skor Kelengkapan Layanan (0-100)',
            color: '#A89B7A'
          },
          grid: { color: 'rgba(212, 175, 55, 0.06)' },
          min: 0,
          max: 100
        }
      }
    }
  });
}

/**
 * CHART 4: Donut Chart - Location Distribution
 */
function renderDonutChart(data) {
  const ctx = document.getElementById('chart-donut');
  if (!ctx) return;

  const dist = data.location_distribution;

  if (chartInstances['donut']) chartInstances['donut'].destroy();

  chartInstances['donut'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Online Only', 'Luring Only', 'Hybrid (Online + Luring)'],
      datasets: [{
        data: [dist.online_only, dist.offline_only, dist.hybrid],
        backgroundColor: [
          'rgba(52, 152, 219, 0.7)',
          'rgba(231, 76, 60, 0.7)',
          'rgba(212, 175, 55, 0.7)'
        ],
        borderColor: [
          '#3498DB',
          '#E74C3C',
          '#D4AF37'
        ],
        borderWidth: 2,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '65%',
      animation: {
        animateRotate: true,
        duration: 1200,
        easing: 'easeInOutQuart'
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 20 }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((ctx.raw / total) * 100).toFixed(1);
              return `${ctx.label}: ${ctx.raw} lembaga (${pct}%)`;
            }
          }
        }
      }
    }
  });
}

/**
 * CHART 5: Stacked Bar - Guarantees & Transparency
 */
function renderGuaranteeChart(data) {
  const ctx = document.getElementById('chart-guarantee');
  if (!ctx) return;

  const segments = data.segments;
  const labels = segments.map(s => s.label);

  const guaranteeYes = segments.map(s => s.competitors.filter(c => c.score_guarantee).length);
  const guaranteeNo = segments.map(s => s.competitors.filter(c => !c.score_guarantee).length);

  const transparentPublished = segments.map(s => s.competitors.filter(c => c.transparency === 'published').length);
  const transparentRequest = segments.map(s => s.competitors.filter(c => c.transparency !== 'published').length);

  const installmentYes = segments.map(s => s.competitors.filter(c => c.installment).length);
  const installmentNo = segments.map(s => s.competitors.filter(c => !c.installment).length);

  if (chartInstances['guarantee']) chartInstances['guarantee'].destroy();

  chartInstances['guarantee'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Garansi Skor', 'Harga Transparan', 'Cicilan/BNPL'],
      datasets: [
        {
          label: 'Ya',
          data: [
            guaranteeYes.reduce((a, b) => a + b, 0),
            transparentPublished.reduce((a, b) => a + b, 0),
            installmentYes.reduce((a, b) => a + b, 0)
          ],
          backgroundColor: 'rgba(46, 204, 113, 0.6)',
          borderColor: '#2ECC71',
          borderWidth: 1,
          borderRadius: 4
        },
        {
          label: 'Tidak',
          data: [
            guaranteeNo.reduce((a, b) => a + b, 0),
            transparentRequest.reduce((a, b) => a + b, 0),
            installmentNo.reduce((a, b) => a + b, 0)
          ],
          backgroundColor: 'rgba(231, 76, 60, 0.4)',
          borderColor: '#E74C3C',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} dari 31 lembaga`
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { color: 'rgba(212, 175, 55, 0.06)' },
          ticks: { stepSize: 5 }
        },
        y: {
          stacked: true,
          grid: { display: false }
        }
      }
    }
  });
}

/**
 * CHART 6: Line Chart - Journey Cost Timeline
 */
function renderJourneyChart() {
  const ctx = document.getElementById('chart-journey');
  if (!ctx) return;

  const months = Array.from({ length: 25 }, (_, i) => `Bulan ${i}`);

  // Cumulative cost curves for each segment
  const segA = [0, 2, 4, 6, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(v => v * 1000000);
  const segB = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map(v => v * 1000000);
  const segC = [0, 2, 5, 8, 10, 13, 16, 19, 22, 25, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 47, 48, 49, 49.5, 50].map(v => v * 1000000);
  const segD = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48].map(v => v * 100000);

  if (chartInstances['journey']) chartInstances['journey'].destroy();

  chartInstances['journey'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Segmen A: Lulusan SMA (S1)',
          data: segA,
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 2
        },
        {
          label: 'Segmen B: Fresh Graduate (WHV)',
          data: segB,
          borderColor: '#3498DB',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 2
        },
        {
          label: 'Segmen C: Profesional (Imigrasi)',
          data: segC,
          borderColor: '#E74C3C',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 2
        },
        {
          label: 'Segmen D: Korporat (/bulan)',
          data: segD,
          borderColor: '#2ECC71',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          borderWidth: 2,
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
        easing: 'easeInOutQuart'
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${formatRupiah(ctx.raw)}`
          }
        },
        legend: {
          position: 'bottom',
          labels: { padding: 16 }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(212, 175, 55, 0.04)' }
        },
        y: {
          grid: { color: 'rgba(212, 175, 55, 0.06)' },
          ticks: {
            callback: (val) => formatRupiah(val)
          }
        }
      }
    }
  });
}

/**
 * CHART 7: Heatmap (CSS Grid, not Chart.js)
 */
function renderHeatmap(data) {
  const container = document.getElementById('heatmap-grid');
  if (!container) return;

  const featureKeys = ['ielts', 'gmat', 'toefl', 'study_abroad', 'whv', 'ausbildung', 'gtv', 'corporate', 'offline', 'score_guarantee', 'installment', 'native_speaker'];
  const featureLabels = data.heatmap_features;

  const cols = featureKeys.length + 1; // +1 for name column
  container.style.gridTemplateColumns = `180px repeat(${featureKeys.length}, 1fr)`;

  let html = '';

  // Header row
  html += `<div class="heatmap-cell label" style="background: transparent;"></div>`;
  featureLabels.forEach(label => {
    html += `<div class="heatmap-cell header">${label}</div>`;
  });

  // Data rows per segment
  data.segments.forEach(segment => {
    html += `<div class="heatmap-cell segment-header">${segment.label} (${segment.competitors.length})</div>`;

    segment.competitors.forEach(comp => {
      html += `<div class="heatmap-cell label" title="${comp.name}">${comp.name}</div>`;
      featureKeys.forEach(key => {
        const val = comp.features[key];
        const cls = val ? 'yes' : 'no';
        const symbol = val ? '✓' : '·';
        html += `<div class="heatmap-cell ${cls}" title="${getFeatureLabel(key)}: ${val ? 'Ya' : 'Tidak'}">${symbol}</div>`;
      });
    });
  });

  container.innerHTML = html;
}

/**
 * CHART 8: Box Plot (visualized as range bars since Chart.js doesn't support box plots natively)
 */
function renderRangeChart(data) {
  const ctx = document.getElementById('chart-range');
  if (!ctx) return;

  const segments = data.segments;
  const labels = segments.map(s => s.label);

  // Calculate Q1, Median, Q3 for each segment
  const segmentStats = segments.map(s => {
    const prices = s.competitors
      .map(c => getAvgPrice(c))
      .filter(p => p > 0)
      .sort((a, b) => a - b);

    if (prices.length === 0) return { min: 0, q1: 0, median: 0, q3: 0, max: 0 };

    const q1 = prices[Math.floor(prices.length * 0.25)] || prices[0];
    const median = prices[Math.floor(prices.length * 0.5)];
    const q3 = prices[Math.floor(prices.length * 0.75)] || prices[prices.length - 1];

    return {
      min: prices[0],
      q1,
      median,
      q3,
      max: prices[prices.length - 1]
    };
  });

  if (chartInstances['range']) chartInstances['range'].destroy();

  // Use floating bars to simulate box plot
  chartInstances['range'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Range (Min - Max)',
          data: segmentStats.map(s => [s.min, s.max]),
          backgroundColor: 'rgba(212, 175, 55, 0.15)',
          borderColor: 'rgba(212, 175, 55, 0.4)',
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.6
        },
        {
          label: 'IQR (Q1 - Q3)',
          data: segmentStats.map(s => [s.q1, s.q3]),
          backgroundColor: 'rgba(212, 175, 55, 0.5)',
          borderColor: '#D4AF37',
          borderWidth: 2,
          borderRadius: 4,
          barPercentage: 0.4
        },
        {
          label: 'Median',
          data: segmentStats.map(s => [s.median - 200000, s.median + 200000]),
          backgroundColor: '#F5D784',
          borderColor: '#D4AF37',
          borderWidth: 2,
          borderRadius: 2,
          barPercentage: 0.5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const d = ctx.raw;
              if (Array.isArray(d)) {
                return `${ctx.dataset.label}: ${formatRupiah(d[0])} - ${formatRupiah(d[1])}`;
              }
              return `${ctx.dataset.label}: ${formatRupiah(d)}`;
            }
          }
        },
        legend: {
          position: 'bottom',
          labels: { padding: 16 }
        }
      },
      scales: {
        y: {
          grid: { color: 'rgba(212, 175, 55, 0.06)' },
          ticks: {
            callback: (val) => formatRupiah(val)
          }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

/**
 * Initialize all charts
 * @param {object} data
 */
function initAllCharts(data) {
  initChartDefaults();
  renderPriceDistributionChart(data);
  renderRadarChart(data);
  renderPositioningChart(data);
  renderDonutChart(data);
  renderGuaranteeChart(data);
  renderJourneyChart();
  renderHeatmap(data);
  renderRangeChart(data);
}

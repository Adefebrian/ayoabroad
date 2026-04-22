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
  renderFinancialProjectionChart();
  renderRevenueBreakdownChart();
  renderMarginTrendChart();
  renderCohortGrowthChart();
  renderCashflowDecompositionChart();
}

/**
 * CHART 9: 15-Year Financial Projection (Based on Combined_Financial_Modelling.csv)
 */
function renderFinancialProjectionChart() {
  const ctx = document.getElementById('financialProjectionChart');
  if (!ctx) return;

  if (chartInstances['financial-projection']) {
    chartInstances['financial-projection'].destroy();
  }

  // Data from CSV, scaled to Billions (Miliar Rp)
  const years = ['Yr 1', 'Yr 2', 'Yr 3', 'Yr 4', 'Yr 5', 'Yr 6', 'Yr 7', 'Yr 8', 'Yr 9', 'Yr 10', 'Yr 11', 'Yr 12', 'Yr 13', 'Yr 14', 'Yr 15'];
  const grossRevenue = [3.22, 4.29, 5.74, 7.21, 8.80, 9.02, 9.97, 10.22, 12.00, 12.30, 11.56, 11.84, 12.14, 14.02, 14.37];
  const netProfit = [0.65, 1.18, 1.98, 2.76, 3.61, 3.44, 3.94, 3.82, 4.59, 4.63, 4.24, 4.26, 4.28, 5.02, 5.04];
  
  // Calculate Net Margin percentage for tooltips
  const netMargin = netProfit.map((np, i) => ((np / grossRevenue[i]) * 100).toFixed(1));

  chartInstances['financial-projection'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Gross Revenue',
          data: grossRevenue,
          borderColor: '#D4AF37', // Gold
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: '#0D0D0D',
          pointBorderColor: '#D4AF37',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Net Profit',
          data: netProfit,
          borderColor: '#2ECC71', // Green success
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: '#0D0D0D',
          pointBorderColor: '#2ECC71',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              if (context.parsed.y !== null) label += 'Rp ' + context.parsed.y.toFixed(2) + ' M';
              if (context.datasetIndex === 1) label += ` (${netMargin[context.dataIndex]}%)`;
              return label;
            }
          }
        },
        legend: { position: 'top' }
      },
      scales: {
        x: { grid: { color: 'rgba(212, 175, 55, 0.05)' } },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(212, 175, 55, 0.1)' },
          ticks: { callback: (value) => 'Rp ' + value + ' M' }
        }
      }
    }
  });
}

/**
 * CHART 10: Revenue Breakdown Stream 1 vs Stream 2
 */
function renderRevenueBreakdownChart() {
  const ctx = document.getElementById('revenueBreakdownChart');
  if (!ctx) return;

  if (chartInstances['revenue-breakdown']) {
    chartInstances['revenue-breakdown'].destroy();
  }

  const years = ['Yr 1', 'Yr 2', 'Yr 3', 'Yr 4', 'Yr 5', 'Yr 6', 'Yr 7', 'Yr 8', 'Yr 9', 'Yr 10', 'Yr 11', 'Yr 12', 'Yr 13', 'Yr 14', 'Yr 15'];
  const stream1 = [1.61, 2.63, 3.00, 3.72, 4.13, 4.24, 4.34, 4.45, 6.08, 6.23, 5.86, 6.00, 6.15, 7.89, 8.08];
  const stream2 = [1.62, 1.66, 2.74, 3.49, 4.67, 4.79, 5.64, 5.78, 5.92, 6.07, 5.70, 5.85, 5.99, 6.14, 6.29];

  chartInstances['revenue-breakdown'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Stream 1 (Academy)',
          data: stream1,
          backgroundColor: '#D4AF37', // Gold
          borderRadius: 4
        },
        {
          label: 'Stream 2 (Admission)',
          data: stream2,
          backgroundColor: '#3498DB', // Blue
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': Rp ' + context.parsed.y.toFixed(2) + ' Miliar';
            }
          }
        },
        legend: { position: 'top' }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: { color: 'rgba(212, 175, 55, 0.1)' },
          ticks: { callback: (value) => 'Rp ' + value + ' M' }
        }
      }
    }
  });
}

/**
 * CHART 11: Profitability Margins (Gross, Operating, Net)
 */
function renderMarginTrendChart() {
  const ctx = document.getElementById('marginTrendChart');
  if (!ctx) return;

  if (chartInstances['margin-trend']) chartInstances['margin-trend'].destroy();

  const years = ['Yr 1', 'Yr 2', 'Yr 3', 'Yr 4', 'Yr 5', 'Yr 6', 'Yr 7', 'Yr 8', 'Yr 9', 'Yr 10', 'Yr 11', 'Yr 12', 'Yr 13', 'Yr 14', 'Yr 15'];
  const gross = [75.4, 73.6, 73.6, 73.3, 73.0, 72.4, 72.6, 72.0, 70.4, 69.7, 68.7, 68.1, 67.4, 65.8, 65.1];
  const operating = [26.4, 35.6, 44.3, 49.3, 52.7, 49.0, 50.7, 47.9, 49.1, 48.3, 47.1, 46.2, 45.3, 45.9, 45.0];
  const net = [20.4, 27.7, 34.5, 38.4, 41.1, 38.2, 39.5, 37.4, 38.3, 37.6, 36.7, 36.0, 35.3, 35.8, 35.1];

  chartInstances['margin-trend'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Gross Margin (%)',
          data: gross,
          borderColor: '#D4AF37', // Gold
          backgroundColor: '#D4AF37',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 3,
          tension: 0.3
        },
        {
          label: 'Operating Margin (%)',
          data: operating,
          borderColor: '#3498DB', // Blue
          backgroundColor: '#3498DB',
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3
        },
        {
          label: 'Net Margin (%)',
          data: net,
          borderColor: '#2ECC71', // Green
          backgroundColor: '#2ECC71',
          borderWidth: 3,
          pointRadius: 4,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%` }
        },
        legend: { position: 'top' }
      },
      scales: {
        x: { grid: { color: 'rgba(212, 175, 55, 0.05)' } },
        y: {
          grid: { color: 'rgba(212, 175, 55, 0.1)' },
          ticks: { callback: (value) => value + '%' }
        }
      }
    }
  });
}

/**
 * CHART 12: OPEX per Student (Efficiency)
 */
function renderCohortGrowthChart() {
  const ctx = document.getElementById('cohortGrowthChart');
  if (!ctx) return;

  if (chartInstances['cohort-growth']) chartInstances['cohort-growth'].destroy();

  const years = ['Yr 1', 'Yr 2', 'Yr 3', 'Yr 4', 'Yr 5', 'Yr 6', 'Yr 7', 'Yr 8', 'Yr 9', 'Yr 10', 'Yr 11', 'Yr 12', 'Yr 13', 'Yr 14', 'Yr 15'];
  // Calculated OPEX per Student in Juta Rupiah
  const opexPerStudent = [15.68, 12.26, 9.60, 8.24, 7.08, 8.39, 8.18, 9.21, 8.19, 8.48, 8.05, 8.33, 8.63, 7.84, 8.12];

  chartInstances['cohort-growth'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [{
        label: 'OPEX per Siswa (Juta Rp)',
        data: opexPerStudent,
        backgroundColor: 'rgba(52, 152, 219, 0.8)', // Blue
        borderColor: '#3498DB',
        borderWidth: 1,
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: (ctx) => `Biaya Operasional: Rp ${ctx.parsed.y.toFixed(2)} Jt / siswa`
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(212, 175, 55, 0.1)' },
          ticks: { callback: (value) => 'Rp ' + value + ' Jt' }
        }
      }
    }
  });
}

/**
 * CHART 13: Cash Flow Decomposition (100% Stacked Bar)
 */
function renderCashflowDecompositionChart() {
  const ctx = document.getElementById('cashflowDecompositionChart');
  if (!ctx) return;

  if (chartInstances['cashflow-decomp']) chartInstances['cashflow-decomp'].destroy();

  const years = ['Yr 1', 'Yr 2', 'Yr 3', 'Yr 4', 'Yr 5', 'Yr 6', 'Yr 7', 'Yr 8', 'Yr 9', 'Yr 10', 'Yr 11', 'Yr 12', 'Yr 13', 'Yr 14', 'Yr 15'];
  
  // Raw Data in Billions
  const gross = [3.22, 4.29, 5.74, 7.21, 8.80, 9.02, 9.97, 10.22, 12.00, 12.30, 11.56, 11.84, 12.14, 14.02, 14.37];
  const cogsRaw = [0.79, 1.13, 1.52, 1.92, 2.38, 2.49, 2.74, 2.86, 3.56, 3.72, 3.61, 3.78, 3.96, 4.80, 5.02];
  const opexRaw = [1.58, 1.63, 1.68, 1.73, 1.78, 2.11, 2.19, 2.46, 2.55, 2.64, 2.50, 2.59, 2.69, 2.78, 2.88];
  const netRaw = [0.65, 1.18, 1.98, 2.76, 3.61, 3.44, 3.94, 3.82, 4.59, 4.63, 4.24, 4.26, 4.28, 5.02, 5.04];
  
  // Calculate Percentages (100%)
  const cogsPct = cogsRaw.map((val, i) => (val / gross[i]) * 100);
  const opexPct = opexRaw.map((val, i) => (val / gross[i]) * 100);
  const netPct = netRaw.map((val, i) => (val / gross[i]) * 100);
  // Tax is the remainder
  const taxPct = netPct.map((val, i) => 100 - cogsPct[i] - opexPct[i] - val);

  chartInstances['cashflow-decomp'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Net Profit',
          data: netPct,
          backgroundColor: '#2ECC71', // Green
        },
        {
          label: 'Tax & Others',
          data: taxPct,
          backgroundColor: '#E74C3C', // Redish
        },
        {
          label: 'OPEX',
          data: opexPct,
          backgroundColor: '#3498DB', // Blue
        },
        {
          label: 'COGS',
          data: cogsPct,
          backgroundColor: '#F39C12', // Orange/Yellow
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%`
          }
        },
        legend: {
          position: 'top',
          reverse: true // Show Net Profit at top
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false }
        },
        y: {
          stacked: true,
          max: 100, // Force exactly 100%
          grid: { color: 'rgba(212, 175, 55, 0.1)' },
          ticks: { callback: (value) => value + '%' }
        }
      }
    }
  });
}

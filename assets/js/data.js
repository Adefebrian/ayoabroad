/* ============================================
   DATA LAYER - Load and cache competitor data
   ============================================ */

let cachedData = null;

/**
 * Load competitors data from JSON
 * @returns {Promise<object>}
 */
async function loadCompetitorData() {
  if (cachedData) return cachedData;

  try {
    const response = await fetch('./data/competitors.json');
    if (!response.ok) throw new Error('Failed to load data');
    cachedData = await response.json();
    return cachedData;
  } catch (error) {
    console.error('Error loading competitor data:', error);
    return null;
  }
}

/**
 * Get all competitors across all segments
 * @param {object} data
 * @returns {Array}
 */
function getAllCompetitors(data) {
  const all = [];
  data.segments.forEach(segment => {
    segment.competitors.forEach(comp => {
      all.push({ ...comp, segment_id: segment.id, segment_label: segment.label, segment_color: segment.color });
    });
  });
  return all;
}

/**
 * Get the global maximum price across all competitors
 * @param {object} data
 * @returns {number}
 */
function getGlobalMaxPrice(data) {
  let max = 0;
  data.segments.forEach(segment => {
    segment.competitors.forEach(comp => {
      if (comp.price_max > max) max = comp.price_max;
    });
  });
  return max;
}

/**
 * Get segment by ID
 * @param {object} data
 * @param {string} segmentId
 * @returns {object|null}
 */
function getSegment(data, segmentId) {
  return data.segments.find(s => s.id === segmentId) || null;
}

/**
 * Calculate scoring for positioning scatter plot
 * Each competitor gets a "completeness" score out of 100
 * @param {object} comp
 * @returns {number}
 */
function calculateCompletenessScore(comp) {
  let score = 0;
  const features = comp.features;

  // Feature availability (each worth up to 8 points, 12 features = max 96)
  const featureKeys = ['ielts', 'gmat', 'toefl', 'study_abroad', 'whv', 'ausbildung', 'gtv', 'corporate', 'offline', 'score_guarantee', 'installment', 'native_speaker'];
  featureKeys.forEach(key => {
    if (features[key]) score += 8;
  });

  // Cap at 100
  return Math.min(score, 100);
}

/**
 * Get positioning data for bubble chart
 * @param {object} data
 * @returns {Array}
 */
function getPositioningData(data) {
  const all = getAllCompetitors(data);
  return all.map(comp => {
    const avgPrice = getAvgPrice(comp);
    const completeness = calculateCompletenessScore(comp);
    return {
      name: comp.name,
      x: avgPrice,
      y: completeness,
      r: comp.locations ? Math.max(5, Math.min(comp.locations.length * 4, 20)) : 5,
      segment: comp.segment_label,
      segmentColor: comp.segment_color,
      price_label: comp.price_label || formatRupiah(avgPrice)
    };
  });
}

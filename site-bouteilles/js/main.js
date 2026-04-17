/* =========================================
   NAVIGATION — hamburger menu + active link
   ========================================= */
(function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Highlight active page link
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* =========================================
   SMOOTH SCROLL for anchor links
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* =========================================
   SCROLL ANIMATIONS — Intersection Observer
   ========================================= */
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();

/* =========================================
   TABS
   ========================================= */
(function () {
  document.querySelectorAll('.tabs').forEach(tabs => {
    const buttons = tabs.querySelectorAll('.tab-btn');
    const panes   = tabs.querySelectorAll('.tab-pane');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const pane = tabs.querySelector(`.tab-pane[data-tab="${target}"]`);
        if (pane) pane.classList.add('active');
      });
    });
  });
})();

/* =========================================
   HERO CANVAS — Floating debris particles
   ========================================= */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.3 + 0.1,
      alpha: Math.random() * 0.4 + 0.1,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.y > canvas.height) {
        p.y = -p.r;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    });

    animFrame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  init();
  draw();
})();

/* =========================================
   CHART.JS — trigger animation on viewport
   ========================================= */
// Charts are initialized in each page's inline script
// This helper ensures they animate when scrolled into view
window.chartObservers = [];

function observeChart(canvasId, chartFactory) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  let chart = null;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !chart) {
        chart = chartFactory(canvas);
        observer.unobserve(canvas);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(canvas);
}

/* =========================================
   PLASTIC TRACKER EMBED
   The map is now provided by the external site.
   ========================================= */

/* =========================================
   LOCAL PLASTIC TRACKER
   Plastic Tracker-inspired interface using Plastic Adrift trajectories
   ========================================= */
(function () {
  const mapNode = document.getElementById('plastic-tracker-map');
  if (!mapNode || typeof window.L === 'undefined') return;

  const drawBtn = document.getElementById('tracker-draw-btn');
  const locationInput = document.getElementById('tracker-location');
  const statusNode = document.getElementById('tracker-status');

  const map = L.map('plastic-tracker-map', {
    worldCopyJump: true,
    minZoom: 2,
    maxZoom: 8,
  }).setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  const dataSources = [
    { file: 'data/sample1.csv', name: 'Pacifique Nord', color: '#1A6FA8' },
    { file: 'data/sample2.csv', name: 'Atlantique Nord', color: '#3A7D44' },
    { file: 'data/sample3.csv', name: 'Océan Indien', color: '#C08A1E' },
    { file: 'data/sample4.csv', name: 'Atlantique Sud', color: '#7B4B2A' },
    { file: 'data/sample5.csv', name: 'Golfe du Bengale', color: '#d73027' }
  ];

  const dataLayer = L.layerGroup().addTo(map);
  const routeLayer = L.layerGroup().addTo(map);
  const originsLayer = L.layerGroup().addTo(map);
  const loadedRoutes = [];
  let ready = false;

  function normalizeLng(lng) {
    let value = lng;
    while (value > 180) value -= 360;
    while (value < -180) value += 360;
    return value;
  }

  function buildRouteFromCsv(text) {
    const lines = text.split('\n').slice(1).filter(Boolean);
    const points = lines.map((line) => {
      const [year, month, lat, lng, prob] = line.split(',');
      return {
        year: Number(year),
        month: Number(month),
        lat: Number(lat),
        lng: normalizeLng(Number(lng)),
        prob: Number(prob)
      };
    }).filter(point => Number.isFinite(point.lat) && Number.isFinite(point.lng));

    const filtered = points.filter(point => point.prob > 0.05);
    const groupedMonths = [...new Set(filtered.map(point => point.year * 12 + point.month))].sort((a, b) => a - b);
    const route = groupedMonths.map((monthKey) => {
      const candidates = filtered.filter(point => point.year * 12 + point.month === monthKey);
      const best = candidates.reduce((winner, candidate) => candidate.prob > winner.prob ? candidate : winner);
      return [best.lat, best.lng];
    });

    const start = points.find(point => point.year === 0 && point.month === 0) || points[0];
    return { start, route };
  }

  function renderRoutes(origin, label) {
    routeLayer.clearLayers();
    originsLayer.clearLayers();
    dataLayer.clearLayers();

    const allBounds = [];
    const originMarker = L.circleMarker([origin.lat, origin.lng], {
      radius: 9,
      color: '#0A2540',
      fillColor: '#ffffff',
      fillOpacity: 1,
      weight: 3
    }).addTo(originsLayer);

    originMarker.bindPopup('<strong>Départ</strong><br>' + label);
    allBounds.push([origin.lat, origin.lng]);

    loadedRoutes.forEach((entry) => {
      if (!entry.route.length || !entry.start) return;

      const latShift = origin.lat - entry.start.lat;
      const lngShift = origin.lng - entry.start.lng;
      const translatedRoute = entry.route.map(([lat, lng]) => [lat + latShift, normalizeLng(lng + lngShift)]);

      const line = L.polyline(translatedRoute, {
        color: entry.source.color,
        weight: 3,
        opacity: 0.75,
      }).addTo(routeLayer);

      const endPoint = translatedRoute[translatedRoute.length - 1];

      L.circleMarker(translatedRoute[0], {
        radius: 5,
        color: entry.source.color,
        fillColor: entry.source.color,
        fillOpacity: 1,
        weight: 2
      }).addTo(dataLayer).bindPopup('<strong>' + entry.source.name + '</strong><br>Départ modélisé');

      L.circleMarker(endPoint, {
        radius: 6,
        color: entry.source.color,
        fillColor: '#ffffff',
        fillOpacity: 0.85,
        weight: 2,
      }).addTo(dataLayer).bindPopup('<strong>' + entry.source.name + '</strong><br>Fin possible');

      line.bindTooltip(entry.source.name, { sticky: true });
      allBounds.push(...translatedRoute);
    });

    if (allBounds.length > 1) {
      map.fitBounds(allBounds, { padding: [30, 30] });
    }

    statusNode.textContent = 'Trajectoires affichées pour ' + label + '. Les lignes montrent des chemins possibles sur 10 ans.';
  }

  function geocodeLocation(query) {
    const url = 'https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=' + encodeURIComponent(query);
    return fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json());
  }

  function getFallbackOrigin(query) {
    const fallback = {
      paris: [48.8566, 2.3522],
      marseille: [43.2965, 5.3698],
      dakar: [14.7167, -17.4677],
      tokyo: [35.6762, 139.6503],
      montréal: [45.5017, -73.5673],
      montreal: [45.5017, -73.5673],
      newyork: [40.7128, -74.0060],
      newyorkcity: [40.7128, -74.0060],
      rio: [-22.9068, -43.1729],
      london: [51.5072, -0.1276]
    };

    const key = query.toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿñæœ]/g, '');
    return fallback[key] || [20, 0];
  }

  function drawForQuery() {
    const query = (locationInput.value || '').trim();
    if (!query) {
      statusNode.textContent = 'Entre une ville ou une région pour lancer le tracé.';
      return;
    }

    statusNode.textContent = 'Recherche du lieu…';
    geocodeLocation(query)
      .then((results) => {
        let origin;
        let label = query;

        if (Array.isArray(results) && results.length > 0) {
          origin = {
            lat: Number(results[0].lat),
            lng: Number(results[0].lon)
          };
          label = results[0].display_name || query;
        } else {
          const fallback = getFallbackOrigin(query);
          origin = { lat: fallback[0], lng: fallback[1] };
          label = query + ' (position approximative)';
        }

        renderRoutes(origin, label);
      })
      .catch(() => {
        const fallback = getFallbackOrigin(query);
        renderRoutes({ lat: fallback[0], lng: fallback[1] }, query + ' (position approximative)');
      });
  }

  Promise.all(
    dataSources.map((source) =>
      fetch(source.file)
        .then(response => response.text())
        .then(text => ({ source, ...buildRouteFromCsv(text) }))
    )
  ).then((routes) => {
    loadedRoutes.push(...routes.filter(route => route.route.length > 1));
    ready = true;
    statusNode.textContent = 'Tape un lieu puis clique sur DRAW TRAJECTORY pour voir les chemins possibles.';
    drawForQuery();
  }).catch(() => {
    statusNode.textContent = 'Impossible de charger les trajectoires locales. Vérifie les fichiers CSV.';
  });

  drawBtn.addEventListener('click', drawForQuery);
  locationInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      drawForQuery();
    }
  });

  window.addEventListener('resize', () => {
    if (ready) {
      map.invalidateSize();
    }
  });
})();

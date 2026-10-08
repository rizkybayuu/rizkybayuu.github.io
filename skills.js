/**
 * rizkyby.web - Skills & Craft + Software
 * Beginner 0-59 · Intermediate 60-79 · Advanced 80-100
 * Level derived from score; progress bar visual
 */

(() => {
  'use strict';

  const LEVEL_LABEL = { advanced: 'Advanced', intermediate: 'Intermediate', beginner: 'Beginner' };

  function levelOf(score) {
    if (score >= 80) return 'advanced';
    if (score >= 60) return 'intermediate';
    return 'beginner';
  }

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(', ');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function cardStyle(accent) {
    return `--card-accent: ${accent}; --card-accent-rgb: ${hexToRgb(accent)}`;
  }

  /* Craft Fields */
  const CRAFT_FIELDS = [
    {
      title: '3D Art & Render',
      accent: '#ff9d66',
      skills: [
        { name: 'Photoreal Lighting', score: 86 },
        { name: 'Environment & Scene Building', score: 76 },
        { name: 'Hard-Surface Modeling', score: 75 },
        { name: 'Product Visualization', score: 70 },
        { name: 'Texturing & Shading', score: 90 },
        { name: 'Architectural Render', score: 70 }
      ]
    },
    {
      title: 'Motion, VFX & Procedural',
      accent: '#c07bff',
      skills: [
        { name: 'Motion Graphics Design', score: 76 },
        { name: 'Geometry Nodes (Procedural)', score: 90 },
        { name: 'Camera Animation', score: 79 },
        { name: 'Beat-Synced Pacing', score: 76 },
        { name: 'Rigid Body & Fluid Sim', score: 70 }
      ]
    },
    {
      title: 'Graphic Design & Print',
      accent: '#ffc46b',
      skills: [
        { name: 'Editorial Layout', score: 78 },
        { name: 'Typography Lockups', score: 79 },
        { name: 'Grid Systems', score: 72 },
        { name: 'Print Production', score: 70 },
        { name: 'Image Compositing', score: 83 },
        { name: 'Raster Dither Shading', score: 76 }
      ]
    },
    {
      title: 'Video & Audio',
      accent: '#ff8fb1',
      skills: [
        { name: 'Cinematic Cutting & Pacing', score: 71 },
        { name: 'Audio Cleanup', score: 73 },
        { name: 'Sound Design', score: 64 },
        { name: 'Colour Treatment', score: 78 },
        { name: 'Vocal Engineering', score: 62 },
        { name: 'Music Arrangement', score: 54 }
      ]
    },
    {
      title: 'Software & Systems',
      accent: '#7fd1ff',
      skills: [
        { name: 'Vibe Coding', score: 79 },
        { name: 'Frontend (HTML/CSS/JS)', score: 74 },
        { name: 'Backend (C++)', score: 61 },
        { name: 'Systems Admin (Linux)', score: 62 },
        { name: 'OS Deployment & VM', score: 66 },
        { name: 'Software Development', score: 72 },
        { name: 'Git Workflow', score: 70 },
        { name: 'AI Engineering', score: 51 }
      ]
    },
    {
      title: 'Office & Data',
      accent: '#9aa6ff',
      service: true,
      skills: [
        { name: 'Document Formatting', score: 83 },
        { name: 'Spreadsheet Modelling', score: 61 },
        { name: 'Presentation Design', score: 77 }
      ]
    }
  ];

  /* Software */
  const SOFTWARE_GROUPS = [
    {
      title: '3D & Render',
      accent: '#ff9d66',
      tools: [{ name: 'Blender 4.0', score: 92 }]
    },
    {
      title: 'Graphic & Print',
      accent: '#ffc46b',
      tools: [
        { name: 'Adobe Photoshop', score: 71 },
        { name: 'Adobe Illustrator', score: 73 },
        { name: 'Affinity Suite', score: 83 },
        { name: 'GIMP', score: 63 }
      ]
    },
    {
      title: 'Multimedia',
      accent: '#ff8fb1',
      tools: [
        { name: 'DaVinci Resolve', score: 71 },
        { name: 'FL Studio', score: 62 }
      ]
    },
    {
      title: 'Web Development',
      accent: '#7fd1ff',
      tools: [
        { name: 'HTML', score: 82 },
        { name: 'CSS', score: 81 },
        { name: 'JavaScript', score: 64 }
      ]
    },
    {
      title: 'System & Ops',
      accent: '#c07bff',
      tools: [
        { name: 'C++', score: 60 },
        { name: 'Linux', score: 70 },
        { name: 'VM Hypervisors', score: 73 },
        { name: 'Git & GitHub', score: 71 }
      ]
    }
  ];

  /* Typing */
  const TOOLS = [{ name: 'Touch Typing (Average)', wpm: 60 }];

  /* Languages */
  const LANGUAGES = [
    { name: 'Indonesia', level: 'Native', score: 90 },
    { name: 'Javanese', level: 'Native', score: 87 },
    { name: 'English', level: 'Intermediate', score: 63 }
  ];

  /* Arc Generator for Donut Charts */
  function polarToCartesian(cx, cy, r, angleInDegrees) {
    const rad = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: cx + (r * Math.cos(rad)),
      y: cy + (r * Math.sin(rad))
    };
  }

  function describeArc(cx, cy, rOuter, rInner, startAngle, endAngle) {
    const outerStart = polarToCartesian(cx, cy, rOuter, startAngle);
    const outerEnd = polarToCartesian(cx, cy, rOuter, endAngle);
    const innerEnd = polarToCartesian(cx, cy, rInner, endAngle);
    const innerStart = polarToCartesian(cx, cy, rInner, startAngle);

    const angleDiff = endAngle - startAngle;
    const largeArcFlag = angleDiff > 180 ? 1 : 0;

    return [
      'M', outerStart.x.toFixed(2), outerStart.y.toFixed(2),
      'A', rOuter, rOuter, 0, largeArcFlag, 1, outerEnd.x.toFixed(2), outerEnd.y.toFixed(2),
      'L', innerEnd.x.toFixed(2), innerEnd.y.toFixed(2),
      'A', rInner, rInner, 0, largeArcFlag, 0, innerStart.x.toFixed(2), innerStart.y.toFixed(2),
      'Z'
    ].join(' ');
  }

  /* Render Top Banner: Touch Typing Speed */
  function renderTypingHero() {
    const typingTool = TOOLS[0] || { name: 'Touch Typing (Average)', wpm: 60 };
    const wpm = typingTool.wpm || 60;
    const meterPct = Math.min(100, Math.max(10, Math.round((wpm / 120) * 100)));

    return `
      <section class="skills-typing-hero" style="--hero-accent: #ff6f5e; --hero-accent-rgb: 255, 111, 94;">
        <div class="typing-hero-main">
          <div class="typing-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
              <line x1="6" y1="8" x2="6" y2="8"></line><line x1="10" y1="8" x2="10" y2="8"></line><line x1="14" y1="8" x2="14" y2="8"></line><line x1="18" y1="8" x2="18" y2="8"></line>
              <line x1="6" y1="12" x2="6" y2="12"></line><line x1="10" y1="12" x2="10" y2="12"></line><line x1="14" y1="12" x2="14" y2="12"></line><line x1="18" y1="12" x2="18" y2="12"></line>
              <line x1="7" y1="16" x2="17" y2="16"></line>
            </svg>
            INPUT PROFICIENCY
          </div>
          <div class="typing-title-row">
            <h3 class="typing-title">Touch Typing</h3>
            <span class="typing-sub-tag">10-Finger Flow · QWERTY Blind Typing</span>
          </div>
        </div>

        <div class="typing-metric-box">
          <div class="typing-score-cluster">
            <span class="typing-wpm-val">${wpm}</span>
            <span class="typing-wpm-unit">WPM</span>
          </div>
          <div class="typing-status-pill">Average Speed</div>
        </div>

        <div class="typing-gauge-container">
          <div class="typing-gauge-scale">
            <span>0</span>
            <span>30</span>
            <span class="typing-current-pin">${wpm} WPM</span>
            <span>90</span>
            <span>120+</span>
          </div>
          <div class="typing-gauge-track">
            <div class="typing-gauge-bar" style="width: ${meterPct}%;"></div>
            <div class="typing-gauge-marker" style="left: ${meterPct}%;"></div>
          </div>
          <div class="typing-gauge-meta">
            <span>~${wpm * 5} CPM</span>
            <span>Fluent Cadence</span>
            <span>Zero-Look Precision</span>
          </div>
        </div>
      </section>
    `;
  }

  /* Donut Card Component */
  function renderDonutCard({ id, badge, title, segments, overallScore, overallLabel, overallSub, cardAccent }) {
    const totalScore = segments.reduce((sum, s) => sum + s.score, 0);
    const gap = segments.length > 1 ? 2.5 : 0;
    const availableDegrees = 360 - (segments.length * gap);

    let currentAngle = 0;
    const pathsHtml = segments.map((seg) => {
      const span = (seg.score / totalScore) * availableDegrees;
      const startAngle = currentAngle + (gap / 2);
      const endAngle = startAngle + span;
      currentAngle += span + gap;

      const d = describeArc(80, 80, 70, 48, startAngle, endAngle);
      return `<path class="donut-slice"
        d="${d}"
        fill="${seg.accent}"
        data-segment-id="${seg.id}"
        tabindex="0"
        role="button"
        aria-label="${escapeHtml(seg.name)}: ${seg.score}%"></path>`;
    }).join('');

    const legendHtml = segments.map(seg => `
      <div class="donut-legend-item" data-segment-id="${seg.id}" style="--item-accent: ${seg.accent};">
        <div class="donut-legend-left">
          <span class="donut-legend-dot"></span>
          <span class="donut-legend-name">${escapeHtml(seg.name)}</span>
        </div>
        <div class="donut-legend-right">
          ${seg.sub ? `<span class="donut-legend-tag">${escapeHtml(seg.sub)}</span>` : ''}
          <span class="donut-legend-score">${seg.score}%</span>
        </div>
      </div>
    `).join('');

    return `
      <article class="skills-donut-card" id="donut-card-${id}" style="--card-accent: ${cardAccent}; --card-accent-rgb: ${hexToRgb(cardAccent)};">
        <header class="donut-card-header">
          <span class="donut-badge">${escapeHtml(badge)}</span>
          <h3 class="donut-card-title">${escapeHtml(title)}</h3>
        </header>

        <div class="donut-visual-wrap">
          <svg class="donut-svg" viewBox="0 0 160 160" aria-hidden="true">
            <g class="donut-slices-group">
              ${pathsHtml}
            </g>
          </svg>
          <div class="donut-center-info">
            <div class="donut-center-score">${overallScore}</div>
            <div class="donut-center-label">${escapeHtml(overallLabel)}</div>
            <div class="donut-center-sub">${escapeHtml(overallSub)}</div>
          </div>
        </div>

        <div class="donut-legend">
          ${legendHtml}
        </div>
      </article>
    `;
  }

  /* Interaction Binder for Donut Cards */
  function attachDonutInteractions(cardEl, segments, overallScore, overallLabel, overallSub) {
    if (!cardEl) return;
    const scoreEl = cardEl.querySelector('.donut-center-score');
    const labelEl = cardEl.querySelector('.donut-center-label');
    const subEl = cardEl.querySelector('.donut-center-sub');
    const slices = cardEl.querySelectorAll('.donut-slice');
    const legendItems = cardEl.querySelectorAll('.donut-legend-item');

    function activate(id) {
      const seg = segments.find(s => s.id === id);
      if (!seg) return;
      slices.forEach(s => {
        s.classList.toggle('is-hovered', s.getAttribute('data-segment-id') === id);
      });
      legendItems.forEach(item => {
        item.classList.toggle('is-hovered', item.getAttribute('data-segment-id') === id);
      });
      if (scoreEl) {
        scoreEl.textContent = seg.score;
        scoreEl.style.color = seg.accent;
        scoreEl.style.textShadow = `0 0 16px ${seg.accent}`;
      }
      if (labelEl) labelEl.textContent = seg.name;
      if (subEl) subEl.textContent = seg.sub ? `${seg.sub} · ${seg.level}` : seg.level;
    }

    function reset() {
      slices.forEach(s => s.classList.remove('is-hovered'));
      legendItems.forEach(item => item.classList.remove('is-hovered'));
      if (scoreEl) {
        scoreEl.textContent = overallScore;
        scoreEl.style.color = '';
        scoreEl.style.textShadow = '';
      }
      if (labelEl) labelEl.textContent = overallLabel;
      if (subEl) subEl.textContent = overallSub;
    }

    slices.forEach(s => {
      const id = s.getAttribute('data-segment-id');
      s.addEventListener('mouseenter', () => activate(id));
      s.addEventListener('click', (e) => {
        e.stopPropagation();
        activate(id);
      });
    });

    legendItems.forEach(item => {
      const id = item.getAttribute('data-segment-id');
      item.addEventListener('mouseenter', () => activate(id));
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        activate(id);
      });
    });

    cardEl.addEventListener('mouseleave', reset);
    window.addEventListener('pointerdown', (e) => {
      if (!cardEl.contains(e.target)) reset();
    }, { passive: true });
  }

  /* Render: preserved skill bar helper for subcategory details */
  function renderBar(score, name) {
    const level = levelOf(score);
    const pct = Math.min(100, Math.max(0, score));
    return `
      <div class="skill-bar">
        <div class="skill-bar-header">
          <span class="skill-bar-name">${escapeHtml(name)}</span>
          <div class="skill-bar-meta">
            <span class="skill-bar-level" data-level="${level}">${LEVEL_LABEL[level]}</span>
            <span class="skill-bar-score">${score}</span>
          </div>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width: ${pct}%"></div>
        </div>
      </div>`;
  }

  /* Main Skills View Render */
  function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    // 1. Calculate Craft categories & averages
    const craftSegments = CRAFT_FIELDS.map((f, idx) => {
      const sum = f.skills.reduce((acc, s) => acc + s.score, 0);
      const avg = Math.round(sum / f.skills.length);
      return {
        id: `craft-${idx}`,
        name: f.title,
        score: avg,
        accent: f.accent,
        sub: `${f.skills.length} skills`,
        level: LEVEL_LABEL[levelOf(avg)],
        skills: f.skills
      };
    });
    const craftOverallAvg = Math.round(craftSegments.reduce((sum, c) => sum + c.score, 0) / craftSegments.length);

    // 2. Calculate Software groups & averages
    const softwareSegments = SOFTWARE_GROUPS.map((g, idx) => {
      const sum = g.tools.reduce((acc, t) => acc + t.score, 0);
      const avg = Math.round(sum / g.tools.length);
      return {
        id: `soft-${idx}`,
        name: g.title,
        score: avg,
        accent: g.accent,
        sub: `${g.tools.length} tool${g.tools.length > 1 ? 's' : ''}`,
        level: LEVEL_LABEL[levelOf(avg)],
        tools: g.tools
      };
    });
    const softwareOverallAvg = Math.round(softwareSegments.reduce((sum, s) => sum + s.score, 0) / softwareSegments.length);

    // 3. Languages
    const langAccents = {
      'Indonesia': '#00e5ff',
      'Javanese': '#c07bff',
      'English': '#ff9d66'
    };
    const languageSegments = LANGUAGES.map((l, idx) => {
      return {
        id: `lang-${idx}`,
        name: l.name,
        score: l.score,
        accent: langAccents[l.name] || '#9aa6ff',
        sub: l.level,
        level: l.level
      };
    });
    const languageOverallAvg = Math.round(languageSegments.reduce((sum, l) => sum + l.score, 0) / languageSegments.length);

    // Render bare compact touch typing display
    grid.innerHTML = renderCompactTyping();
  }

  /* Render Compact Touch Typing (Left info, Right 60 WPM, Bottom horizontal bar) */
  function renderCompactTyping() {
    const typingTool = TOOLS[0] || { name: 'Touch Typing (Average)', wpm: 60 };
    const wpm = typingTool.wpm || 60;
    // 0 to 120 scale, 60 is exactly 50%
    const pct = Math.min(100, Math.max(0, Math.round((wpm / 120) * 100)));

    return `
      <div class="skills-typing-compact">
        <div class="typing-top-row">
          <div class="typing-left-col">
            <div class="typing-kicker">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                <line x1="6" y1="8" x2="6" y2="8"></line><line x1="10" y1="8" x2="10" y2="8"></line><line x1="14" y1="8" x2="14" y2="8"></line><line x1="18" y1="8" x2="18" y2="8"></line>
                <line x1="6" y1="12" x2="6" y2="12"></line><line x1="10" y1="12" x2="10" y2="12"></line><line x1="14" y1="12" x2="14" y2="12"></line><line x1="18" y1="12" x2="18" y2="12"></line>
                <line x1="7" y1="16" x2="17" y2="16"></line>
              </svg>
              <span>INPUT PROFICIENCY</span>
            </div>
            <h2 class="typing-title">Touch Typing</h2>
            <p class="typing-sub">10-Finger Technique · QWERTY</p>
          </div>

          <div class="typing-right-col">
            <div class="typing-score-cluster">
              <span class="typing-big-num">${wpm}</span>
              <span class="typing-big-unit">WPM</span>
            </div>
            <div class="typing-status-pill">AVERAGE SPEED</div>
          </div>
        </div>

        <!-- Horizontal Progress Gauge (0 to 120+) -->
        <div class="typing-bottom-gauge">
          <div class="typing-scale">
            <span class="scale-mark" style="left: 0%;">0</span>
            <span class="scale-mark" style="left: 25%;">30</span>
            <span class="scale-mark is-current" style="left: ${pct}%;">${wpm} WPM</span>
            <span class="scale-mark" style="left: 75%;">90</span>
            <span class="scale-mark" style="left: 100%;">120+</span>
          </div>

          <div class="typing-track">
            <div class="typing-fill" style="width: ${pct}%;"></div>
            <div class="typing-marker" style="left: ${pct}%;"></div>
          </div>

          <div class="typing-meta">
            <span>~${wpm * 5} CPM</span>
            <span>•</span>
            <span>10-Finger Flow</span>
          </div>
        </div>
      </div>
    `;
  }

  window.RIZKYBY_SKILLS = {
    craft: CRAFT_FIELDS,
    software: SOFTWARE_GROUPS,
    tools: TOOLS,
    languages: LANGUAGES,
    levelOf,
    renderBar,
    renderDonutCard,
    renderCompactTyping,
    render: renderSkills
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSkills);
  } else {
    renderSkills();
  }
})();

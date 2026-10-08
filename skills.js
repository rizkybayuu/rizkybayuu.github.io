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
        { name: 'Simulation', score: 70 }
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
      tools: [{ name: 'Blender', score: 92 }]
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
    { name: 'Indonesian', level: 'Native', score: 91 },
    { name: 'Javanese', level: 'Native', score: 86 },
    { name: 'English', level: 'Intermediate', score: 66 }
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
  function renderDonutCard({
    id,
    kicker,
    iconSvg,
    title,
    subtitle,
    segments,
    overallScore,
    defaultTitle,
    defaultLevel,
    defaultDesc,
    cardAccent
  }) {
    const totalScore = segments.reduce((sum, s) => sum + s.score, 0);
    const gap = segments.length > 1 ? 3 : 0;
    const availableDegrees = 360 - (segments.length * gap);

    let currentAngle = 0;
    const pathsHtml = segments.map((seg) => {
      const span = (seg.score / totalScore) * availableDegrees;
      const startAngle = currentAngle + (gap / 2);
      const endAngle = startAngle + span;
      currentAngle += span + gap;

      const d = describeArc(90, 90, 78, 56, startAngle, endAngle);
      return `<path class="donut-slice"
        d="${d}"
        fill="${seg.accent}"
        data-segment-id="${seg.id}"
        tabindex="0"
        role="button"
        aria-label="${escapeHtml(seg.name)}: ${seg.score}"></path>`;
    }).join('');

    return `
      <article class="skills-donut-card" id="donut-card-${id}" data-category="${id}" tabindex="0" role="button" aria-label="${escapeHtml(title)}, Average: ${overallScore}, click to view detailed breakdown" style="--card-accent: ${cardAccent}; --card-accent-rgb: ${hexToRgb(cardAccent)};">
        <header class="donut-card-header">
          <div class="donut-kicker">
            ${iconSvg || ''}
            <span>${escapeHtml(kicker)}</span>
          </div>
          <h3 class="donut-card-title">${escapeHtml(title)}</h3>
          <p class="donut-card-sub">${escapeHtml(subtitle)}</p>
        </header>

        <div class="donut-visual-wrap">
          <svg class="donut-svg" viewBox="0 0 180 180" aria-hidden="true">
            <circle cx="90" cy="90" r="54" fill="transparent" class="donut-hole-trigger"></circle>
            <g class="donut-slices-group">
              ${pathsHtml}
            </g>
          </svg>
          <div class="donut-center-info">
            <span class="donut-center-score">${overallScore}</span>
          </div>
        </div>

        <div class="donut-dynamic-strip" style="--strip-accent: ${cardAccent};">
          <div class="donut-dyn-header">
            <div class="donut-dyn-left">
              <span class="donut-dyn-dot"></span>
              <span class="donut-dyn-title">${escapeHtml(defaultTitle)}</span>
            </div>
            <div class="donut-dyn-right">
              <span class="donut-dyn-level">${escapeHtml(defaultLevel)}</span>
              <span class="donut-dyn-score">${overallScore}</span>
            </div>
          </div>
          <div class="donut-dyn-desc">${escapeHtml(defaultDesc)}</div>
        </div>

        <div class="donut-card-action">
          <span>Explore Details ↗</span>
        </div>
      </article>
    `;
  }

  /* Interaction Binder for Donut Cards */
  function attachDonutInteractions(cardEl, segments, overallScore, defaultTitle, defaultLevel, defaultDesc, defaultAccent) {
    if (!cardEl) return;
    const scoreEl = cardEl.querySelector('.donut-center-score');
    const visualWrap = cardEl.querySelector('.donut-visual-wrap');
    const holeTrigger = cardEl.querySelector('.donut-hole-trigger');
    const stripEl = cardEl.querySelector('.donut-dynamic-strip');
    const stripTitle = cardEl.querySelector('.donut-dyn-title');
    const stripLevel = cardEl.querySelector('.donut-dyn-level');
    const stripScore = cardEl.querySelector('.donut-dyn-score');
    const stripDesc = cardEl.querySelector('.donut-dyn-desc');
    const slices = cardEl.querySelectorAll('.donut-slice');

    function activate(id) {
      const seg = segments.find(s => s.id === id);
      if (!seg) return;
      slices.forEach(s => {
        s.classList.toggle('is-hovered', s.getAttribute('data-segment-id') === id);
      });
      if (scoreEl) {
        scoreEl.textContent = seg.score;
        scoreEl.style.color = seg.accent;
        scoreEl.style.textShadow = `0 0 22px ${seg.accent}`;
      }
      if (stripEl) {
        stripEl.style.setProperty('--strip-accent', seg.accent);
      }
      if (stripTitle) stripTitle.textContent = seg.name;
      if (stripLevel) {
        stripLevel.textContent = seg.level || 'PROFICIENT';
        stripLevel.style.color = seg.accent;
        stripLevel.style.borderColor = `${seg.accent}55`;
      }
      if (stripScore) {
        stripScore.textContent = seg.score;
        stripScore.style.color = seg.accent;
      }
      if (stripDesc) {
        let descText = seg.sub || '';
        if (seg.skills && seg.skills.length > 0) {
          descText = seg.skills.map(s => s.name).join(' · ');
        } else if (seg.tools && seg.tools.length > 0) {
          descText = seg.tools.map(t => t.name).join(' · ');
        }
        stripDesc.textContent = descText;
      }
    }

    function reset() {
      slices.forEach(s => s.classList.remove('is-hovered'));
      if (scoreEl) {
        scoreEl.textContent = overallScore;
        scoreEl.style.color = '';
        scoreEl.style.textShadow = '';
      }
      if (stripEl) {
        stripEl.style.setProperty('--strip-accent', defaultAccent);
      }
      if (stripTitle) stripTitle.textContent = defaultTitle;
      if (stripLevel) {
        stripLevel.textContent = defaultLevel;
        stripLevel.style.color = '';
        stripLevel.style.borderColor = '';
      }
      if (stripScore) {
        stripScore.textContent = overallScore;
        stripScore.style.color = '';
      }
      if (stripDesc) stripDesc.textContent = defaultDesc;
    }

    slices.forEach(s => {
      const id = s.getAttribute('data-segment-id');
      s.addEventListener('mouseenter', () => activate(id));
      s.addEventListener('focus', () => activate(id));
    });

    // Reset immediately when mouse leaves the donut chart visual wrapper or enters the center hole
    if (visualWrap) {
      visualWrap.addEventListener('mouseleave', reset);
    }
    if (holeTrigger) {
      holeTrigger.addEventListener('mouseenter', reset);
    }
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
          <div class="skill-bar-fill" style="width: ${pct}%;"></div>
        </div>
      </div>`;
  }

  /* Render Compact Touch Typing (Left info, Right 60 WPM, Bottom horizontal bar) */
  function renderCompactTyping() {
    const typingTool = TOOLS[0] || { name: 'Touch Typing (Average)', wpm: 60 };
    const wpm = typingTool.wpm || 60;
    // 0 to 120 scale, 60 is exactly 50%
    const pct = Math.min(100, Math.max(0, Math.round((wpm / 120) * 100)));

    return `
      <div class="skills-typing-compact" role="button" tabindex="0" aria-label="Touch Typing 60 WPM, click to inspect live cadence and verified test proof">
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

        <div class="typing-click-hint">
          <span>Inspect cadence & certified proof ↗</span>
        </div>
      </div>
    `;
  }

  /* Live 60 WPM Human Typing Simulator with Realistic Human Imperfections */
  const SIM_PARAGRAPHS = [
    "Building responsive, event-driven architectures requires continuous synchronization between visual state and algorithmic logic. At sixty words per minute, ten-finger muscle memory navigates complex abstractions—asynchronous pipelines, nested components, and monospaced syntax—without ever looking down at the keyboard. Natural cadence balances rapid bursts on familiar patterns with careful deliberation through tricky code structures.",
    "Mastering touch typing transforms software engineering into an uninterrupted flow of consciousness. When tricky keywords, curly braces, and multi-line indentations execute instinctively through muscle memory, cognitive load vanishes. From high-level architectural patterns to granular debugging routines, steady 60 WPM rhythm ensures thoughts materialize directly into robust code."
  ];

  const ADJACENT_KEYS = {
    'a': ['s', 'q', 'z'],
    'b': ['v', 'g', 'h', 'n'],
    'c': ['x', 'd', 'v'],
    'd': ['s', 'e', 'f', 'c'],
    'e': ['w', 'r', 'd'],
    'f': ['d', 'r', 'g', 'v'],
    'g': ['f', 't', 'h', 'b'],
    'h': ['g', 'y', 'j', 'n'],
    'i': ['u', 'o', 'k'],
    'j': ['h', 'u', 'k', 'm'],
    'k': ['j', 'i', 'l'],
    'l': ['k', 'o', 'p'],
    'm': ['n', 'j', 'k'],
    'n': ['b', 'h', 'j', 'm'],
    'o': ['i', 'p', 'l'],
    'p': ['o', 'l'],
    'q': ['w', 'a'],
    'r': ['e', 't', 'f'],
    's': ['a', 'w', 'd', 'x'],
    't': ['r', 'y', 'g'],
    'u': ['y', 'i', 'j'],
    'v': ['c', 'f', 'b'],
    'w': ['q', 'e', 's'],
    'x': ['z', 's', 'c'],
    'y': ['t', 'u', 'h'],
    'z': ['a', 's', 'x'],
    ' ': ['c', 'v', 'b', 'n']
  };

  const COMMON_BIGRAMS = new Set([
    'th', 'he', 'in', 'er', 'an', 're', 'nd', 'at', 'on', 'nt',
    'ha', 'es', 'st', 'en', 'ed', 'to', 'it', 'ou', 'ea', 'hi',
    'is', 'or', 'ti', 'as', 'te', 'et', 'ng', 'of', 'al', 'de',
    'se', 'le', 'sa', 'si', 'ar', 've', 'ra', 'ld', 'ur', 'io'
  ]);

  const EASY_WORDS = new Set([
    'and', 'the', 'to', 'of', 'in', 'is', 'it', 'for', 'on', 'with',
    'at', 'by', 'from', 'flow', 'code', 'ten', 'when', 'into', 'ever',
    'down', 'state', 'mind', 'words', 'per', 'steady', 'load'
  ]);

  function getWordDetails(text, idx) {
    let start = idx;
    while (start > 0 && text[start - 1] !== ' ') start--;
    let end = idx;
    while (end < text.length && text[end] !== ' ') end++;
    const rawWord = text.slice(start, end);
    const cleanWord = rawWord.toLowerCase().replace(/[^a-z]/g, '');
    const isFirstChar = (idx === start);
    const isLastChar = (idx === end - 1);
    const posInWord = idx - start;

    // Difficulty score based on length, punctuation, and complexity
    let difficulty = 0;
    if (EASY_WORDS.has(cleanWord)) {
      difficulty = 0;
    } else {
      if (cleanWord.length >= 8) difficulty += 2;
      else if (cleanWord.length >= 5) difficulty += 1;
      if (/[-—;,]/.test(rawWord)) difficulty += 1;
      if (/[A-Z]/.test(rawWord)) difficulty += 1;
    }

    return { rawWord, cleanWord, isFirstChar, isLastChar, posInWord, difficulty };
  }

  let simTimer = null;
  let simActive = false;
  let currentParagraphIdx = 0;
  let simStartTime = 0;
  let typedCount = 0;
  let errorCount = 0;
  let totalKeypresses = 0;

  function startSimulator() {
    stopSimulator();
    simActive = true;
    currentParagraphIdx = 0;
    typedCount = 0;
    errorCount = 0;
    totalKeypresses = 0;
    simStartTime = performance.now();
    runSimulationParagraph(SIM_PARAGRAPHS[currentParagraphIdx]);
  }

  function stopSimulator() {
    simActive = false;
    if (simTimer) {
      clearTimeout(simTimer);
      simTimer = null;
    }
  }

  function updateTelemetry(instantWpm) {
    const wpmEl = document.getElementById('sim-live-wpm');
    const cpmEl = document.getElementById('sim-live-cpm');
    const accEl = document.getElementById('sim-live-acc');
    if (!wpmEl || !cpmEl || !accEl) return;

    wpmEl.textContent = `${Math.round(instantWpm)}`;
    cpmEl.textContent = `${Math.round(instantWpm * 5)}`;
    const acc = totalKeypresses > 0
      ? Math.max(93, Math.min(100, Math.round(((totalKeypresses - errorCount) / totalKeypresses) * 1000) / 10))
      : 98.2;
    accEl.textContent = `${acc.toFixed(1)}%`;
  }

  function runSimulationParagraph(text) {
    if (!simActive) return;
    const stage = document.getElementById('sd-typing-text-flow');
    if (!stage) return;

    // Zero-shift pre-rendering: all characters rendered into fixed spans once
    stage.innerHTML = '';
    stage.style.transform = 'translateY(0px)';

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.className = 'type-char pending';
      span.textContent = text[i];
      span.dataset.orig = text[i];
      fragment.appendChild(span);
    }
    stage.appendChild(fragment);

    const spans = stage.children;
    let charIndex = 0;

    // Typo State Machine:
    // 0: Normal
    // 1: Single-key typo pending backspace
    // 2: Overrun typo (two wrong keys typed), pending first backspace
    // 3: Overrun typo second backspace pending
    let typoState = 0;
    let postTypoCaution = 0;

    // Mark initial active character
    if (spans.length > 0) {
      spans[0].className = 'type-char active';
    }

    function scrollCurrentLineIntoView(activeSpan) {
      if (!activeSpan || !stage) return;
      const computedLineH = parseFloat(window.getComputedStyle(stage).lineHeight) || activeSpan.offsetHeight || 38;
      const baseTop = spans[0] ? spans[0].offsetTop : 0;
      const currentTop = activeSpan.offsetTop - baseTop;
      const currentLine = Math.round(currentTop / computedLineH);

      // Keep strictly at most 2 lines in view:
      // Line 0 & 1 -> translateY: 0
      // Line >= 2  -> translateY: - (currentLine - 1) * lineHeight
      const scrollLines = Math.max(0, currentLine - 1);
      const translateY = scrollLines * computedLineH;
      stage.style.transform = `translateY(-${translateY}px)`;
    }

    function step() {
      if (!simActive) return;

      // Handle Compound Typo State 1: Single-key backspace resolution
      if (typoState === 1) {
        typoState = 0;
        const currentSpan = spans[charIndex];
        if (currentSpan) {
          // Revert character back to original in-place
          currentSpan.textContent = currentSpan.dataset.orig;
          currentSpan.className = 'type-char active';
        }
        totalKeypresses++;
        postTypoCaution = 2; // slow down slightly on next 2 keystrokes
        updateTelemetry(57 + Math.random() * 4);
        // Short pause after backspacing before typing correct key (~110-170ms)
        simTimer = setTimeout(step, Math.floor(125 + Math.random() * 50));
        return;
      }

      // Handle Compound Typo State 2: Overrun typo backspace #1
      if (typoState === 2) {
        typoState = 3;
        const nextSpan = spans[charIndex + 1];
        if (nextSpan) {
          nextSpan.textContent = nextSpan.dataset.orig;
          nextSpan.className = 'type-char pending';
        }
        totalKeypresses++;
        updateTelemetry(55 + Math.random() * 4);
        // Rapid double-backspace cascade (~90-130ms)
        simTimer = setTimeout(step, Math.floor(105 + Math.random() * 35));
        return;
      }

      // Handle Compound Typo State 3: Overrun typo backspace #2
      if (typoState === 3) {
        typoState = 0;
        const currentSpan = spans[charIndex];
        if (currentSpan) {
          currentSpan.textContent = currentSpan.dataset.orig;
          currentSpan.className = 'type-char active';
        }
        totalKeypresses++;
        postTypoCaution = 3; // deliberate caution after compound typo
        updateTelemetry(56 + Math.random() * 4);
        // Reset pause before re-striking correct key (~150-230ms)
        simTimer = setTimeout(step, Math.floor(160 + Math.random() * 70));
        return;
      }

      // Check paragraph completion
      if (charIndex >= text.length) {
        if (charIndex > 0 && spans[charIndex - 1]) {
          spans[charIndex - 1].className = 'type-char done';
        }
        updateTelemetry(60);
        // Pause at completion, then rotate to next paragraph
        simTimer = setTimeout(() => {
          if (!simActive) return;
          currentParagraphIdx = (currentParagraphIdx + 1) % SIM_PARAGRAPHS.length;
          runSimulationParagraph(SIM_PARAGRAPHS[currentParagraphIdx]);
        }, 3200);
        return;
      }

      const activeSpan = spans[charIndex];
      const targetChar = text[charIndex];
      const wordInfo = getWordDetails(text, charIndex);

      // Realistic Human Typo Probability Model:
      // Humans rarely typo on simple short words; typos spike on tricky words and complex sequences
      let typoProbability = 0.015; // baseline 1.5%
      if (wordInfo.difficulty >= 2) typoProbability = 0.065; // 6.5% on tricky technical words
      else if (wordInfo.difficulty === 1) typoProbability = 0.035;

      const isAlpha = /[a-zA-Z]/.test(targetChar);
      const canTypo = isAlpha && charIndex > 6 && charIndex < text.length - 6 && (typoState === 0);
      const shouldTypo = canTypo && (Math.random() < typoProbability);

      if (shouldTypo) {
        const lower = targetChar.toLowerCase();
        const adjacent = ADJACENT_KEYS[lower] || ['x'];
        let typoChar = adjacent[Math.floor(Math.random() * adjacent.length)];
        if (targetChar === targetChar.toUpperCase() && targetChar !== targetChar.toLowerCase()) {
          typoChar = typoChar.toUpperCase();
        }

        // Determine if this is a single slip (60%) or momentum overrun (40% on tricky words)
        const canOverrun = (charIndex + 1 < text.length) && (text[charIndex + 1] !== ' ') && (wordInfo.difficulty >= 1);
        const shouldOverrun = canOverrun && (Math.random() < 0.42);

        if (shouldOverrun) {
          // Overrun Momentum Typo: finger typed wrong key, and before brain reacted, already struck next letter
          activeSpan.textContent = typoChar;
          activeSpan.className = 'type-char typo';
          errorCount += 2;
          totalKeypresses += 2;

          const nextSpan = spans[charIndex + 1];
          if (nextSpan) {
            nextSpan.textContent = text[charIndex + 1];
            nextSpan.className = 'type-char typo active';
          }

          typoState = 2; // trigger double-backspace cascade
          // Realization pause: typist freezes upon seeing 2 red errors (~260-380ms)
          const realizationDelay = Math.floor(270 + Math.random() * 110);
          updateTelemetry(54 + Math.random() * 4);
          simTimer = setTimeout(step, realizationDelay);
          return;
        } else {
          // Single-key slip: in-place letter substitution without layout shift
          activeSpan.textContent = typoChar;
          activeSpan.className = 'type-char typo';
          errorCount++;
          totalKeypresses++;
          typoState = 1;

          // Typist reaction pause before hitting backspace (~160 - 230ms)
          const reactionDelay = Math.floor(170 + Math.random() * 60);
          updateTelemetry(56 + Math.random() * 4);
          simTimer = setTimeout(step, reactionDelay);
          return;
        }
      }

      // Mark current span done, advance index, mark next span active
      activeSpan.className = 'type-char done';
      charIndex++;
      typedCount++;
      totalKeypresses++;

      if (charIndex < spans.length) {
        const nextSpan = spans[charIndex];
        nextSpan.className = 'type-char active';
        scrollCurrentLineIntoView(nextSpan);
      }

      // =========================================================================
      // True 60 WPM (300 CPM / 5 chars per sec) Humanized Keystroke Timing Model
      // =========================================================================
      let baseDelay = 110;
      const prevChar = text[charIndex - 1] || '';
      const bigram = (prevChar + targetChar).toLowerCase();

      if (postTypoCaution > 0) {
        // Cautious recovery immediately following a typo (~160-220ms)
        baseDelay = 175 + Math.random() * 45;
        postTypoCaution--;
      } else if (targetChar === ' ') {
        // Word boundary pause: typist completes a word (~150-210ms)
        baseDelay = 165 + Math.random() * 50;

        // Cognitive Lookahead: if upcoming word is tricky, slight planning pause
        if (charIndex < text.length) {
          const nextWordInfo = getWordDetails(text, charIndex);
          if (nextWordInfo.difficulty >= 2) {
            baseDelay += Math.floor(70 + Math.random() * 90); // +70-160ms planning pause
          }
        }
      } else if (/[.,;!?:—-]/.test(targetChar)) {
        // Punctuation and em-dash deliberate pause (~200-280ms)
        baseDelay = 220 + Math.random() * 65;
      } else if (/[A-Z]/.test(targetChar)) {
        // Shift key reach delay (~150-200ms)
        baseDelay = 160 + Math.random() * 40;
      } else if (wordInfo.difficulty === 0 && COMMON_BIGRAMS.has(bigram)) {
        // Easy word muscle-memory fast burst (~65-95ms)
        baseDelay = 70 + Math.random() * 30;
      } else if (wordInfo.difficulty >= 2) {
        // Inside tricky word: deliberate pacing (~120-170ms)
        baseDelay = 130 + Math.random() * 45;

        // Occasional mid-syllable hesitation on very long words
        if ((wordInfo.posInWord === 4 || wordInfo.posInWord === 7) && Math.random() < 0.35) {
          baseDelay += Math.floor(50 + Math.random() * 70);
        }
      } else if (charIndex > 1 && text[charIndex - 1] === text[charIndex - 2]) {
        // Double letter burst (e.g. 'ee', 'll', 'ss') (~65-90ms)
        baseDelay = 75 + Math.random() * 20;
      } else {
        // Normal letter with random variance (~85-130ms)
        baseDelay = 95 + Math.random() * 40;
      }

      // Random hand posture re-alignment (~once every 25 words)
      if (targetChar === ' ' && Math.random() < 0.04) {
        baseDelay += Math.floor(100 + Math.random() * 120);
      }

      // Proportional Speed Governor:
      // Locks net average speed strictly to 60.0 WPM (200ms avg per character)
      const now = performance.now();
      const elapsedSec = Math.max(0.1, (now - simStartTime) / 1000);
      const idealElapsedMs = typedCount * 200; // 5 chars/sec = 200ms per char
      const driftMs = (now - simStartTime) - idealElapsedMs;
      // Damps drift so speed converges to 60 WPM while preserving high human variance
      const speedNudge = Math.round(driftMs * 0.35);
      const delay = Math.max(48, Math.min(420, Math.floor(baseDelay - speedNudge)));

      // True live rolling WPM telemetry calculation
      const rollingWpm = elapsedSec > 0.8
        ? Math.round(((typedCount / 5) / (elapsedSec / 60)) * 10) / 10
        : 60.0;
      updateTelemetry(rollingWpm);

      simTimer = setTimeout(step, delay);
    }

    // Begin typing first letter after brief preparation pause
    simTimer = setTimeout(step, 450);
  }

  let skillsDetailOpen = false;

  /* Detail Panel Renderers */
  function renderCraftDetail() {
    const el = document.getElementById('sd-detail-craft');
    if (!el) return;

    const cardsHtml = CRAFT_FIELDS.map((f) => {
      const sum = f.skills.reduce((acc, s) => acc + s.score, 0);
      const avg = Math.round(sum / f.skills.length);
      const barsHtml = f.skills.map(s => renderBar(s.score, s.name)).join('');

      return `
        <article class="sd-detail-card" style="--field-accent: ${f.accent}; --field-accent-rgb: ${hexToRgb(f.accent)};">
          <header class="sd-card-head">
            <div class="sd-card-title-wrap">
              <span class="sd-card-dot" style="background: ${f.accent}; box-shadow: 0 0 10px ${f.accent};"></span>
              <h3 class="sd-card-title">${escapeHtml(f.title)}</h3>
            </div>
            <div class="sd-card-score-pill">
              <span class="sd-card-score-val">${avg}</span>
              <span class="sd-card-score-lbl">AVG</span>
            </div>
          </header>
          <div class="sd-card-bars">
            ${barsHtml}
          </div>
        </article>
      `;
    }).join('');

    el.innerHTML = `
      <header class="sd-head">
        <div class="sd-titles">
          <div class="sd-kicker" style="color: #ff9d66;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <span>SHOWCASE · CREATIVE EXECUTION</span>
          </div>
          <h2 class="sd-title">HOW I CRAFT & CREATE</h2>
          <p class="sd-blurb">Comprehensive assessment across 6 creative and technical domains, evaluated through production fidelity, creative direction, and technical execution.</p>
        </div>

        <div class="sd-stats-cluster">
          <div class="sd-stat-pill">
            <span class="sd-stat-num">74</span>
            <span class="sd-stat-unit">SCORE</span>
            <span class="sd-stat-label">Discipline Avg</span>
          </div>
          <div class="sd-stat-pill">
            <span class="sd-stat-num">6</span>
            <span class="sd-stat-unit">DOMAINS</span>
            <span class="sd-stat-label">Active Disciplines</span>
          </div>
          <div class="sd-stat-pill">
            <span class="sd-stat-num">34</span>
            <span class="sd-stat-unit">SKILLS</span>
            <span class="sd-stat-label">Total Competencies</span>
          </div>
          <div class="sd-stat-pill">
            <span class="sd-stat-num">78</span>
            <span class="sd-stat-unit">TOP DOMAIN</span>
            <span class="sd-stat-label">3D Art & Motion</span>
          </div>
        </div>
      </header>

      <div class="sd-body">
        <div class="sd-grid-cards">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  function renderSoftwareDetail() {
    const el = document.getElementById('sd-detail-software');
    if (!el) return;

    const cardsHtml = SOFTWARE_GROUPS.map((g) => {
      const sum = g.tools.reduce((acc, t) => acc + t.score, 0);
      const avg = Math.round(sum / g.tools.length);
      const barsHtml = g.tools.map(t => renderBar(t.score, t.name)).join('');

      return `
        <article class="sd-detail-card" style="--field-accent: ${g.accent}; --field-accent-rgb: ${hexToRgb(g.accent)};">
          <header class="sd-card-head">
            <div class="sd-card-title-wrap">
              <span class="sd-card-dot" style="background: ${g.accent}; box-shadow: 0 0 10px ${g.accent};"></span>
              <h3 class="sd-card-title">${escapeHtml(g.title)}</h3>
            </div>
            <div class="sd-card-score-pill">
              <span class="sd-card-score-val">${avg}</span>
              <span class="sd-card-score-lbl">AVG</span>
            </div>
          </header>
          <div class="sd-card-bars">
            ${barsHtml}
          </div>
        </article>
      `;
    }).join('');

    el.innerHTML = `
      <header class="sd-head">
        <div class="sd-titles">
          <div class="sd-kicker" style="color: #7fd1ff;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>SHOWCASE · DIGITAL TOOLCHAINS</span>
          </div>
          <h2 class="sd-title">WHAT I USE TO BUILD</h2>
          <p class="sd-blurb">Toolchain inventory covering 3D DCC software, graphics and print suites, audio/video editors, web platforms, and UNIX environments.</p>
        </div>

        <div class="sd-stats-cluster">
          <div class="sd-stat-pill">
            <span class="sd-stat-num">75</span>
            <span class="sd-stat-unit">SCORE</span>
            <span class="sd-stat-label">Toolchain Avg</span>
          </div>
          <div class="sd-stat-pill">
            <span class="sd-stat-num">5</span>
            <span class="sd-stat-unit">STACKS</span>
            <span class="sd-stat-label">Functional Toolchains</span>
          </div>
          <div class="sd-stat-pill">
            <span class="sd-stat-num">14</span>
            <span class="sd-stat-unit">TOOLS</span>
            <span class="sd-stat-label">Primary Applications</span>
          </div>
          <div class="sd-stat-pill">
            <span class="sd-stat-num">92</span>
            <span class="sd-stat-unit">PEAK TOOL</span>
            <span class="sd-stat-label">Blender 4.0</span>
          </div>
        </div>
      </header>

      <div class="sd-body">
        <div class="sd-grid-cards">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  function renderLanguageDetail() {
    const el = document.getElementById('sd-detail-language');
    if (!el) return;

    const langDetails = [
      {
        name: 'Indonesian',
        score: 91,
        level: 'Native Fluency',
        badge: 'Bahasa Indonesia · Native',
        accent: '#00e5ff',
        blurb: 'Primary national language used for daily communication, formal documentation, creative storytelling, and technical writing.',
        skills: [
          { name: 'Reading', score: 93 },
          { name: 'Listening', score: 86 },
          { name: 'Writing', score: 94 },
          { name: 'Speaking', score: 97 },
          { name: 'Formal Register & Politeness', score: 87 }
        ]
      },
      {
        name: 'Javanese',
        score: 86,
        level: 'Native Regional',
        badge: 'Basa Jawa · Heritage',
        accent: '#c07bff',
        blurb: 'Regional mother tongue spoken fluently across everyday informal speech, social interaction, and traditional cultural etiquette.',
        skills: [
          { name: 'Reading', score: 89 },
          { name: 'Listening', score: 74 },
          { name: 'Writing', score: 91 },
          { name: 'Speaking', score: 93 },
          { name: 'Speech Levels (Ngoko & Krama)', score: 82 }
        ]
      },
      {
        name: 'English',
        score: 66,
        level: 'Professional Working',
        badge: 'Professional Working',
        accent: '#ff9d66',
        blurb: 'Working proficiency spanning reading technical documentation, developer specs, asynchronous Git collaboration, and spoken dialogue.',
        skills: [
          { name: 'Reading', score: 68 },
          { name: 'Listening', score: 53 },
          { name: 'Writing', score: 71 },
          { name: 'Speaking', score: 79 },
          { name: 'Academic & Formal Register', score: 57 }
        ]
      }
    ];

    const cardsHtml = langDetails.map(l => {
      const barsHtml = l.skills.map(s => renderBar(s.score, s.name)).join('');
      return `
        <article class="sd-detail-card sd-lang-card" style="--field-accent: ${l.accent}; --field-accent-rgb: ${hexToRgb(l.accent)};">
          <header class="sd-card-head">
            <div class="sd-card-title-wrap">
              <span class="sd-card-dot" style="background: ${l.accent}; box-shadow: 0 0 10px ${l.accent};"></span>
              <div class="sd-lang-title-group">
                <h3 class="sd-card-title">${escapeHtml(l.name)}</h3>
                <span class="sd-lang-badge">${escapeHtml(l.badge)}</span>
              </div>
            </div>
            <div class="sd-card-score-pill">
              <span class="sd-card-score-val">${l.score}</span>
              <span class="sd-card-score-lbl">OVERALL</span>
            </div>
          </header>
          <p class="sd-lang-blurb">${escapeHtml(l.blurb)}</p>
          <div class="sd-card-bars">
            ${barsHtml}
          </div>
        </article>
      `;
    }).join('');

    el.innerHTML = `
      <header class="sd-head">
        <div class="sd-titles">
          <div class="sd-kicker" style="color: #00e5ff;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>SHOWCASE · LINGUISTIC FLUENCY</span>
          </div>
          <h2 class="sd-title">HOW I COMMUNICATE</h2>
          <p class="sd-blurb">Communication proficiencies spanning native national language, regional heritage mother tongue, and international technical English.</p>
        </div>

        <div class="sd-stats-cluster">
          <div class="sd-stat-pill">
            <span class="sd-stat-num">81</span>
            <span class="sd-stat-unit">SCORE</span>
            <span class="sd-stat-label">Fluency Avg</span>
          </div>
          <div class="sd-stat-pill">
            <span class="sd-stat-num">3</span>
            <span class="sd-stat-unit">LANGUAGES</span>
            <span class="sd-stat-label">Spoken & Written</span>
          </div>
          <div class="sd-stat-pill">
            <span class="sd-stat-num">91</span>
            <span class="sd-stat-unit">NATIVE</span>
            <span class="sd-stat-label">Indonesian</span>
          </div>
          <div class="sd-stat-pill">
            <span class="sd-stat-num">66</span>
            <span class="sd-stat-unit">WORKING</span>
            <span class="sd-stat-label">Technical English</span>
          </div>
        </div>
      </header>

      <div class="sd-body">
        <div class="sd-grid-cards sd-grid-lang">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  function openSkillsDetail(category = 'typing') {
    const detailEl = document.getElementById('skills-detail');
    if (!detailEl) return;
    skillsDetailOpen = true;

    // Toggle specific detail sections
    const detailIds = ['typing', 'craft', 'software', 'language'];
    detailIds.forEach(id => {
      const target = document.getElementById(`sd-detail-${id}`);
      if (target) {
        target.style.display = (id === category) ? 'flex' : 'none';
      }
    });

    document.body.classList.add('skills-detail-open');
    detailEl.setAttribute('aria-hidden', 'false');
    detailEl.scrollTop = 0;

    // Swap top nav to back mode
    const nav = document.getElementById('site-nav');
    if (nav) nav.classList.add('nav-back-mode');

    // Start live simulator only if typing section is open
    if (category === 'typing') {
      startSimulator();
    } else {
      stopSimulator();
    }
  }

  function closeSkillsDetail() {
    if (!skillsDetailOpen) return;
    const detailEl = document.getElementById('skills-detail');
    skillsDetailOpen = false;
    document.body.classList.remove('skills-detail-open');
    if (detailEl) detailEl.setAttribute('aria-hidden', 'true');

    // Restore top nav to normal mode if work detail is also not open
    if (!document.body.classList.contains('detail-open')) {
      const nav = document.getElementById('site-nav');
      if (nav) nav.classList.remove('nav-back-mode');
    }

    // Stop live simulator
    stopSimulator();

    // After animation, hide all panels
    setTimeout(() => {
      if (!skillsDetailOpen) {
        ['typing', 'craft', 'software', 'language'].forEach(id => {
          const target = document.getElementById(`sd-detail-${id}`);
          if (target) target.style.display = 'none';
        });
      }
    }, 360);
  }

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
      'Indonesian': '#00e5ff',
      'Javanese': '#c07bff',
      'English': '#ff9d66'
    };
    const languageSegments = LANGUAGES.map((l, idx) => {
      return {
        id: `lang-${idx}`,
        name: l.name,
        score: l.score,
        accent: langAccents[l.name] || '#9aa6ff',
        sub: l.level === 'Native' ? 'Native Fluency' : 'Working Proficiency',
        level: l.level
      };
    });
    const languageOverallAvg = Math.round(languageSegments.reduce((sum, l) => sum + l.score, 0) / languageSegments.length);

    // Render Compact Typing + 3 Donut Cards inside .skills-overview-content
    grid.innerHTML = `
      <div class="skills-overview-content">
        ${renderCompactTyping()}
        <div class="skills-donuts-grid">
          ${renderDonutCard({
            id: 'craft',
            kicker: 'DISCIPLINE PROFICIENCY',
            iconSvg: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
            title: 'Craft & Disciplines',
            subtitle: '6 Creative Domains · Multi-Disciplinary',
            segments: craftSegments,
            overallScore: craftOverallAvg,
            defaultTitle: '6 Disciplines',
            defaultLevel: LEVEL_LABEL[levelOf(craftOverallAvg)],
            defaultDesc: 'Overall mean across 6 specialized craft disciplines',
            cardAccent: '#ff9d66'
          })}
          ${renderDonutCard({
            id: 'software',
            kicker: 'SOFTWARE PROFICIENCY',
            iconSvg: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
            title: 'Software & Tools',
            subtitle: '5 Production Toolchains · Digital Pipeline',
            segments: softwareSegments,
            overallScore: softwareOverallAvg,
            defaultTitle: '5 Toolchains',
            defaultLevel: LEVEL_LABEL[levelOf(softwareOverallAvg)],
            defaultDesc: 'Toolchain mean across digital production stacks',
            cardAccent: '#7fd1ff'
          })}
          ${renderDonutCard({
            id: 'language',
            kicker: 'LANGUAGE PROFICIENCY',
            iconSvg: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
            title: 'Language Fluency',
            subtitle: '3 Languages · Spoken & Written',
            segments: languageSegments,
            overallScore: languageOverallAvg,
            defaultTitle: '3 Languages',
            defaultLevel: LEVEL_LABEL[levelOf(languageOverallAvg)],
            defaultDesc: 'Overall fluency across spoken & written communication',
            cardAccent: '#00e5ff'
          })}
        </div>
      </div>
    `;

    // Attach Donut Hover Interactions
    const craftCard = document.getElementById('donut-card-craft');
    const softCard = document.getElementById('donut-card-software');
    const langCard = document.getElementById('donut-card-language');

    attachDonutInteractions(
      craftCard,
      craftSegments,
      craftOverallAvg,
      '6 Disciplines',
      LEVEL_LABEL[levelOf(craftOverallAvg)],
      'Overall mean across 6 specialized craft disciplines',
      '#ff9d66'
    );
    attachDonutInteractions(
      softCard,
      softwareSegments,
      softwareOverallAvg,
      '5 Toolchains',
      LEVEL_LABEL[levelOf(softwareOverallAvg)],
      'Toolchain mean across digital production stacks',
      '#7fd1ff'
    );
    attachDonutInteractions(
      langCard,
      languageSegments,
      languageOverallAvg,
      '3 Languages',
      LEVEL_LABEL[levelOf(languageOverallAvg)],
      'Overall fluency across spoken & written communication',
      '#00e5ff'
    );

    // Attach click to compact typing widget
    const typingWidget = grid.querySelector('.skills-typing-compact');
    if (typingWidget) {
      typingWidget.addEventListener('click', () => openSkillsDetail('typing'));
      typingWidget.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openSkillsDetail('typing');
        }
      });
    }

    // Attach click to donut cards
    [
      { el: craftCard, cat: 'craft' },
      { el: softCard, cat: 'software' },
      { el: langCard, cat: 'language' }
    ].forEach(({ el, cat }) => {
      if (!el) return;
      el.addEventListener('click', () => openSkillsDetail(cat));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openSkillsDetail(cat);
        }
      });
    });

    // Populate detail panels HTML
    renderCraftDetail();
    renderSoftwareDetail();
    renderLanguageDetail();
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
    render: renderSkills,
    openDetail: openSkillsDetail,
    closeDetail: closeSkillsDetail,
    isDetailOpen: () => skillsDetailOpen
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSkills);
  } else {
    renderSkills();
  }
})();


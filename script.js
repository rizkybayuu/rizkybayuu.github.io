/**
 * rizkyby.web - Overview Controller
 * Handles typewriter sequencing, sunset background transition,
 * damped mouse position mixing, and interactive click effects.
 */

(() => {
  'use strict';

  // DOM references
  const textWelcome = document.getElementById('text-welcome');
  const caretWelcome = document.getElementById('caret-welcome');
  const textTitle = document.getElementById('text-title');
  const caretTitle = document.getElementById('caret-title');
  const textSub = document.getElementById('text-sub');
  const bgSunset = document.getElementById('bg-sunset');
  const bgMeteors = document.getElementById('bg-meteors');
  const bgStarfield = document.getElementById('bg-starfield');
  let stars = [];
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Content definitions
  const WELCOME_STR = 'welcome to';
  const TITLES = [
    'rizkyby.web',
    '3d visualization',
    'motion & vfx',
    'procedural design',
    'isometric dioramas',
    'creative engineering',
    'graphic & print',
    'sound & video',
    'linux & systems'
  ];
  const SUBTITLES = [
    'portfolio & digital playground',
    'photoreal scenes & lighting',
    'kinetic animation & physics',
    'geometry nodes & shaders',
    'cozy miniature room studies',
    'vanilla code & interactive ui',
    'editorial layout & dither art',
    'synthwave tracks & visual pacing',
    'bare-metal tools & telemetry'
  ];

  let titleIndex = 0;
  let mouseTrackingActive = false;

  /* --------------------------------------------------------------------------
     1. Mouse Tracking with Damped Interpolation (Mixing Position Lag)
     -------------------------------------------------------------------------- */
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener('pointermove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  function updateMousePhysics() {
    if (mouseTrackingActive) {
      // Smooth 50% mixing step / lerp inertia
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      // Stars glow brighter near the cursor (composes with twinkle via filter)
      if (!REDUCED_MOTION && stars.length) {
        for (const star of stars) {
          const sx = window.innerWidth / 2 + star._ox;
          const sy = window.innerHeight / 2 + star._oy;
          const dx = currentX - sx;
          const dy = currentY - sy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const boost = d < 260 ? 1 + (1 - d / 260) * 1.8 : 1;
          if (Math.abs(boost - (star._lastBoost || 1)) > 0.04) {
            star._lastBoost = boost;
            star.style.filter = boost > 1.02 ? `brightness(${boost.toFixed(2)})` : 'none';
          }
        }
      }
    }
    requestAnimationFrame(updateMousePhysics);
  }
  requestAnimationFrame(updateMousePhysics);

  /* --------------------------------------------------------------------------
     2. Interactive Click Ripples (Left & Right)
     -------------------------------------------------------------------------- */
  function spawnRipple(x, y, type) {
    const ripple = document.createElement('div');
    ripple.className = `click-ripple ${type}`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '120px';
    ripple.style.height = '120px';
    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 750);
  }

  window.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      spawnRipple(e.clientX, e.clientY, 'left');
    } else if (e.button === 2) {
      spawnRipple(e.clientX, e.clientY, 'right');
    }
  });

  // Prevent context menu to allow custom right click effect
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    spawnRipple(e.clientX, e.clientY, 'right');
  });

  /* --------------------------------------------------------------------------
     3. Typewriter Engine
     -------------------------------------------------------------------------- */

  // Step 1: Type 'welcome to'
  function typeWelcome(callback) {
    let i = 0;
    function step() {
      if (i <= WELCOME_STR.length) {
        textWelcome.textContent = WELCOME_STR.slice(0, i);
        i++;
        setTimeout(step, 75 + Math.random() * 25);
      } else {
        // Done typing welcome: hide welcome caret
        if (caretWelcome) {
          caretWelcome.style.display = 'none';
        }
        if (typeof callback === 'function') {
          callback();
        }
      }
    }
    step();
  }

  // Step 2: Transition background to sunset & activate mouse tracking
  function triggerSunset() {
    bgSunset.classList.add('active');
    mouseTrackingActive = true;
    if (bgMeteors) {
      bgMeteors.classList.add('active');
      spawnMeteors();
    }
    if (bgStarfield) {
      bgStarfield.classList.add('active');
      spawnStars();
    }
  }

  function spawnMeteors() {
    if (!bgMeteors) return;

    function spawn() {
      if (!bgMeteors.classList.contains('active')) return;

      const meteor = document.createElement('div');
      meteor.className = 'meteor';

      const x = Math.random() * (window.innerWidth + 200) - 100;
      meteor.style.left = `${x}px`;

      const duration = 3.5 + Math.random() * 1.5;
      meteor.style.animationDuration = `${duration}s`;

      const length = 120 + Math.random() * 90;
      meteor.style.height = `${length}px`;

      bgMeteors.appendChild(meteor);

      setTimeout(() => {
        meteor.remove();
      }, duration * 1000 + 100);

      const nextDelay = 1800 + Math.random() * 1400;
      setTimeout(spawn, nextDelay);
    }

    spawn();
    setTimeout(spawn, 600);
  }

  function spawnStars() {
    if (!bgStarfield) return;
    const count = 105;
    const referenceWidth = 1920;
    const referenceHeight = 1080;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const offsetX = (Math.random() - 0.5) * referenceWidth;
      const offsetY = (Math.random() - 0.5) * referenceHeight;
      star._ox = offsetX;
      star._oy = offsetY;
      star.style.left = `calc(50vw + ${offsetX}px)`;
      star.style.top = `calc(50vh + ${offsetY}px)`;
      // Brighter peak opacity (0.50 - 0.90)
      const peak = 0.50 + Math.random() * 0.40;
      star.style.setProperty('--star-peak', peak.toFixed(2));
      // Random twinkle speed & random phase start
      star.style.setProperty('--star-dur', `${(1.8 + Math.random() * 2.7).toFixed(2)}s`);
      star.style.setProperty('--star-delay', `${(-Math.random() * 4.5).toFixed(2)}s`);
      // Mostly 2px, a few 3px for depth
      const size = Math.random() < 0.15 ? 3 : 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      bgStarfield.appendChild(star);
      stars.push(star);
    }
  }

  // Step 3: Type title with ease-in-out pacing, pause, trigger subtitle, backspace
  function runTitleCycle() {
    const currentWord = TITLES[titleIndex];
    const currentSub = SUBTITLES[titleIndex];
    let charIdx = 0;
    const len = currentWord.length;

    // Show title caret
    if (caretTitle) {
      caretTitle.style.display = 'inline-block';
    }

    // REQUIREMENT: Text 3 immediately appears from the start (does not wait for text 2 to finish typing)
    textSub.textContent = currentSub;
    textSub.className = 'visible';

    // Ease-in-out typewriter step for text 2 (starts slow, accelerates in middle, decelerates at end)
    function typeStep() {
      if (charIdx <= len) {
        textTitle.textContent = currentWord.slice(0, charIdx);
        charIdx++;

        if (charIdx <= len) {
          // Normalized progress centered around character midpoints
          const progress = (charIdx - 0.5) / len;
          // Sine bell curve (0 at start/end, 1 at midpoint)
          const speedFactor = Math.sin(progress * Math.PI);
          // Quadratic ease-in-out curve for delay (wide dynamic range)
          const easeCurve = Math.pow(1 - speedFactor, 2);
          // Slower deliberate typing at edges (ease-in & ease-out), rapid burst in the middle
          const minDelay = 40;  // High-speed typing in the center
          const maxDelay = 270; // Slow, deliberate keystrokes at start and end
          const delay = minDelay + (maxDelay - minDelay) * easeCurve;
          setTimeout(typeStep, delay);
        } else {
          // Reached 100% completion - hold for user reading time
          setTimeout(startBackspacing, 2200);
        }
      }
    }

    function startBackspacing() {
      // REQUIREMENT: As text 2 starts backspacing away, text 3 also starts disappearing towards top
      textSub.className = 'leaving';

      let backIdx = len;
      function backStep() {
        if (backIdx > 0) {
          backIdx--;
          textTitle.textContent = currentWord.slice(0, backIdx);
          // Fast backspacing synchronized with text 3 ease-out exit
          setTimeout(backStep, 38);
        } else {
          // Finished backspacing: both text 2 and text 3 are completely gone
          textSub.className = '';
          textSub.textContent = '';
          titleIndex = (titleIndex + 1) % TITLES.length;
          // Brief pause before next cycle begins
          setTimeout(runTitleCycle, 400);
        }
      }
      backStep();
    }

    typeStep();
  }

  /* --------------------------------------------------------------------------
     4. Portfolio Works Catalog & View Router
     -------------------------------------------------------------------------- */
  const WORKS_DATA = [];

  /* View Navigation State */
  let currentView = 'hero';
  let activeCategory = 'All';
  let currentPage = 1;
  const CARDS_PER_PAGE = 3;

  const views = {
    hero: document.getElementById('hero-view'),
    work: document.getElementById('work-view'),
    skills: document.getElementById('skills-view'),
    connect: document.getElementById('connect-view'),
    hire: document.getElementById('hire-view')
  };

  let isTransitioning = false;

  function switchView(viewName) {
    if (!views[viewName] || isTransitioning) return;
    if (viewName === currentView) return;

    isTransitioning = true;
    const oldView = views[currentView];
    const newView = views[viewName];
    currentView = viewName;

    // Update nav links active indicator
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-nav') === viewName) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (viewName === 'work') {
      renderWorkView();
    }

    if (oldView) {
      oldView.classList.remove('active');
      oldView.classList.add('leaving');
    }

    setTimeout(() => {
      if (oldView) {
        oldView.classList.remove('leaving');
      }
      if (newView) {
        newView.classList.add('active');
      }
      isTransitioning = false;
    }, 320);
  }

  function getFilteredWorks() {
    if (activeCategory === 'All') return WORKS_DATA;
    return WORKS_DATA.filter(item => item.category === activeCategory);
  }

  function renderCategoryTabs() {
    const navContainer = document.getElementById('work-cat-nav');
    if (!navContainer) return;

    const categories = ['All', '3D Motion', 'Realistic 3D', 'Isometric', 'Surreal & Astro', 'VFX & Nodes', 'Audio & Music', 'Code & Systems', 'Graphic Design'];
    navContainer.innerHTML = '';

    categories.forEach(cat => {
      const count = cat === 'All' ? WORKS_DATA.length : WORKS_DATA.filter(w => w.category === cat).length;
      const btn = document.createElement('button');
      btn.className = `cat-tab-btn ${cat === activeCategory ? 'active' : ''}`;
      btn.textContent = `${cat} (${count})`;
      btn.onclick = () => {
        activeCategory = cat;
        currentPage = 1;
        renderWorkView();
      };
      navContainer.appendChild(btn);
    });
  }

  function renderWorkView() {
    renderCategoryTabs();
    const deck = document.getElementById('work-deck');
    const counter = document.getElementById('work-counter');
    const pageInfo = document.getElementById('work-page-info');
    const prevBtn = document.getElementById('work-prev-btn');
    const nextBtn = document.getElementById('work-next-btn');

    if (!deck) return;

    const filtered = getFilteredWorks();
    const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
    if (currentPage > totalPages) currentPage = totalPages;

    if (counter) {
      counter.textContent = `${filtered.length} Projects`;
    }

    if (pageInfo) {
      pageInfo.textContent = `${currentPage} / ${totalPages}`;
    }

    if (prevBtn) {
      prevBtn.disabled = currentPage <= 1;
    }
    if (nextBtn) {
      nextBtn.disabled = currentPage >= totalPages;
    }

    if (filtered.length === 0) {
      deck.innerHTML = `
        <div class="coming-soon-card">
          <span class="card-category-badge">Selected Works</span>
          <p class="coming-soon-text">Selected works catalog will be configured next.</p>
        </div>
      `;
      return;
    }

    const start = (currentPage - 1) * CARDS_PER_PAGE;
    const pageItems = filtered.slice(start, start + CARDS_PER_PAGE);

    deck.innerHTML = pageItems.map(item => {
      const linkButtons = item.links.map(link => {
        if (link.url === '#') {
          return `<span class="card-note-badge">${link.label}</span>`;
        }
        return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="card-link-btn">
          <span>${link.label}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </a>`;
      }).join('');

      return `
        <article class="work-card">
          ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}" class="work-thumbnail">` : ''}
          <div>
            <div class="card-top">
              <span class="card-category-badge">${item.category}</span>
              <span class="card-sub-badge">${item.sub}</span>
            </div>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-desc">${item.desc}</p>
          </div>
          <div class="card-actions">
            ${linkButtons}
          </div>
        </article>
      `;
    }).join('');
  }

  function initRouter() {
    // Nav bar links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-nav');
        if (target === currentView && currentView !== 'hero') {
          switchView('hero');
        } else {
          switchView(target);
        }
      });
    });

    // Back buttons in views
    const workBack = document.getElementById('work-back');
    if (workBack) {
      workBack.addEventListener('click', () => switchView('hero'));
    }

    document.querySelectorAll('.view-back-btn').forEach(btn => {
      btn.addEventListener('click', () => switchView('hero'));
    });

    // Pagination buttons
    const prevBtn = document.getElementById('work-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderWorkView();
        }
      });
    }

    const nextBtn = document.getElementById('work-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const filtered = getFilteredWorks();
        const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
        if (currentPage < totalPages) {
          currentPage++;
          renderWorkView();
        }
      });
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (currentView === 'work') {
        if (e.key === 'ArrowLeft') {
          if (currentPage > 1) {
            currentPage--;
            renderWorkView();
          }
        } else if (e.key === 'ArrowRight') {
          const filtered = getFilteredWorks();
          const totalPages = Math.ceil(filtered.length / CARDS_PER_PAGE);
          if (currentPage < totalPages) {
            currentPage++;
            renderWorkView();
          }
        } else if (e.key === 'Escape') {
          switchView('hero');
        }
      } else if (currentView !== 'hero' && e.key === 'Escape') {
        switchView('hero');
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. Constellation Map — In-place Hover Morph & Floating Caption
     -------------------------------------------------------------------------- */
  const NODE_DESCRIPTIONS = {
    1: 'Animated 3D scenes blending typography, objects, and dynamic camera motion.',
    2: 'Photorealistic renders exploring light, materials, and architectural mood.',
    3: 'Cozy isometric dioramas and miniature room studies.',
    4: 'Dreamlike 3D scenes with impossible geometry and emotive color.',
    5: 'Cosmic simulations of planets, nebulae, and orbital dynamics.',
    6: 'Physics-driven simulations: destruction, debris, and mechanical FX.',
    7: 'Node-based generators and parametric structures built in Blender.',
    8: 'Original compositions, sound design, and vocal engineering.',
    9: 'Software & systems — Linux telemetry, POS suite, Rust/Tauri apps.',
    10: 'Editorial layouts, publication design, and procedural shader art.',
    11: 'Beat-synced cuts, cinematic pacing, and color treatment.'
  };

  function initConstellation() {
    const map = document.getElementById('constellation-map');
    if (!map) return;
    const nodes = Array.from(map.querySelectorAll('.constellation-node'));
    if (!nodes.length) return;

    const MARGIN = 12;         // keep the enlarged rectangle inside the map
    const GAP = 18;            // space between the image and the floating text
    const TEXT_MAX_REM = 23;   // caption max-width, in rem (matches style.css)
    const TEXT_MIN_W = 140;    // never squeeze the caption narrower than this
    const FALLBACK_TEXT_W = 368; // 23rem at a 16px root, for the side fit check
    let activeNode = null;
    let closeTimer = null;
    let closingTimer = null;
    let warmedBig = false;
    let isTouchInteraction = false;
    let nodeOpenTime = 0;

    window.addEventListener('pointerdown', e => {
      isTouchInteraction = e.pointerType === 'touch' || e.pointerType === 'pen';
      if (activeNode && !detailOpen && !e.target.closest('.constellation-node')) {
        clearTimeout(closeTimer);
        closeNode();
      }
    }, { passive: true });

    window.addEventListener('touchstart', () => {
      isTouchInteraction = true;
    }, { passive: true });

    window.addEventListener('mousemove', e => {
      if (e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) {
        isTouchInteraction = false;
      }
    }, { passive: true });

    // A hover swaps the <img> to the sharper =s800 file, and naturalWidth reads 0
    // for as long as that request is in flight. Sizing the box from a live
    // naturalWidth therefore fell back to 4/5 and drew landscape art as a
    // portrait box. So every star remembers its real ratio — refreshed whenever
    // a picture decodes — and an open box is re-laid-out when that happens.
    function rememberRatio(node) {
      const img = node.querySelector('.node-thumb');
      if (!img || !img.naturalWidth || !img.naturalHeight) return false;
      const r = img.naturalWidth / img.naturalHeight;
      if (node.dataset.ratio === String(r)) return false;
      node.dataset.ratio = String(r);
      return true;
    }

    // Floating caption (title + short description) — bare text, no wrapper.
    // Each star also remembers the position it was authored at, so the enlarged
    // box can be nudged inside the visible area and afterwards put back exactly
    // where it came from.
    nodes.forEach(node => {
      const img = node.querySelector('.node-thumb');
      node.dataset.leftPct = node.style.left;
      node.dataset.topPct = node.style.top;
      if (img) {
        rememberRatio(node);
        img.addEventListener('load', () => {
          if (rememberRatio(node) && activeNode === node) layout(node);
        });
      }
      const info = document.createElement('div');
      info.className = 'node-info';

      const title = document.createElement('h3');
      title.className = 'node-title';
      title.textContent = img ? img.alt : '';

      const desc = document.createElement('p');
      desc.className = 'node-desc';
      desc.textContent = NODE_DESCRIPTIONS[node.getAttribute('data-id')] || '';

      info.appendChild(title);
      info.appendChild(desc);
      node.appendChild(info);
    });

    // Pull the sharper bitmaps once, for smoother first hover
    function warmBigThumbs() {
      if (warmedBig) return;
      warmedBig = true;
      nodes.forEach(node => {
        const img = node.querySelector('.node-thumb');
        if (!img) return;
        const pre = new Image();
        pre.onload = () => {
          if (pre.naturalWidth && pre.naturalHeight) {
            node.dataset.ratio = String(pre.naturalWidth / pre.naturalHeight);
          }
        };
        pre.src = img.src.replace(/=s\d+(\?.*)?$/, '=s800');
      });
    }

    function closeNode() {
      if (!activeNode) return;
      const node = activeNode;
      const ring = node.querySelector('.node-ring');
      activeNode = null;
      node.classList.remove('is-hovered');
      node.classList.add('is-closing');
      clearTimeout(closingTimer);
      closingTimer = setTimeout(() => node.classList.remove('is-closing'), 540);
      map.classList.remove('map-hovering');
      // Dropping the inline geometry lets CSS ease the box back into the circle
      // its star was authored at.
      ring.style.width = '';
      ring.style.height = '';
      node.style.left = node.dataset.leftPct || '';
      node.style.top = node.dataset.topPct || '';
    }

    // Geometry of the enlarged box. The star size is one share of the *visible*
    // area for every star — only the thumbnail's aspect ratio decides which side
    // is the long one — so a small source image never ends up a tiny box. The
    // box stays centred on its star whenever it fits and is nudged just far
    // enough to stay fully visible when it does not; either way it always still
    // covers the circle it replaced. Recomputed on resize/zoom.
    function layout(node) {
      const ring = node.querySelector('.node-ring');
      const img = node.querySelector('.node-thumb');
      const info = node.querySelector('.node-info');
      if (!ring || !img || !info) return;

      const mr = map.getBoundingClientRect();
      const x0 = Math.max(0, mr.left) - mr.left;
      const y0 = Math.max(0, mr.top) - mr.top;
      const x1 = Math.min(window.innerWidth, mr.right) - mr.left;
      const y1 = Math.min(window.innerHeight, mr.bottom) - mr.top;
      const visW = x1 - x0;
      const visH = y1 - y0;
      if (visW < 120 || visH < 120) return;

      const knownRatio = parseFloat(node.dataset.ratio);
      const ratio = knownRatio > 0
        ? knownRatio
        : img.naturalWidth > 0 ? img.naturalWidth / img.naturalHeight : 4 / 5;
      const frame = Math.max(0, ring.offsetWidth - img.offsetWidth);
      const maxH = visH - 2 * MARGIN - frame;

      let w = Math.min(visW * 0.42, visH * 0.6 * ratio, visW - 2 * MARGIN - frame);
      let h = w / ratio;
      if (h > maxH) { h = maxH; w = h * ratio; }
      if (w < 40) {
        w = Math.min(40, Math.max(24, visW - 2 * MARGIN - frame));
        h = w / ratio;
      }
      const outerW = w + frame;
      const outerH = h + frame;

      // The star's authored point is the anchor — read from the authored
      // percentages, never from where the box currently sits, so a nudge is
      // recomputed from the real centre every time and cannot accumulate.
      const cx = (parseFloat(node.dataset.leftPct) / 100) * mr.width || mr.width / 2;
      const cy = (parseFloat(node.dataset.topPct) / 100) * mr.height || mr.height / 2;

      const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), Math.max(lo, hi));
      const bx = clamp(cx - outerW / 2, x0 + MARGIN, x1 - MARGIN - outerW);
      const by = clamp(cy - outerH / 2, y0 + MARGIN, y1 - MARGIN - outerH);

      ring.style.width = Math.round(outerW) + 'px';
      ring.style.height = Math.round(outerH) + 'px';
      node.style.left = (bx + outerW / 2) + 'px';
      node.style.top = (by + outerH / 2) + 'px';

      // Caption placement, decided by where the picture sits in the wrapper:
      //  • vertical — picture in the lower half → caption above it, otherwise
      //    below it (never squeezed into a side corner where it could be cut);
      //  • horizontal — picture in the left / middle / right third → the text is
      //    left / center / right aligned, and the caption hugs that same edge so
      //    the alignment is visible instead of being swallowed by a centre box.
      // Its width is capped to the room it actually has on that side.
      const rootFs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const maxTextW = TEXT_MAX_REM * rootFs;
      const picCx = bx + outerW / 2;
      const picCy = by + outerH / 2;
      const band = picCx < mr.width / 3 ? 'left'
        : picCx > (mr.width * 2) / 3 ? 'right' : 'center';
      const availLeft = (x1 - MARGIN) - bx;
      const availRight = (bx + outerW) - (x0 + MARGIN);
      const avail = band === 'left' ? availLeft
        : band === 'right' ? availRight
          : 2 * Math.min(picCx - (x0 + MARGIN), (x1 - MARGIN) - picCx);
      info.style.maxWidth = Math.round(Math.max(TEXT_MIN_W, Math.min(maxTextW, avail))) + 'px';
      info.style.textAlign = band;
      info.style.left = band === 'right' ? 'auto' : band === 'center' ? '50%' : '0';
      info.style.right = band === 'right' ? '0' : 'auto';
      info.style.transform = band === 'center' ? 'translateX(-50%)' : 'none';
      info.style.marginLeft = '0';
      info.style.marginRight = '0';

      // The rule above wins unless it has no room for the caption and the
      // opposite side has more.
      const capH = info.offsetHeight;
      const roomAbove = by - (y0 + MARGIN);
      const roomBelow = (y1 - MARGIN) - (by + outerH);
      let above = picCy > mr.height / 2;
      if (above && roomAbove < capH + GAP && roomBelow > roomAbove) {
        above = false;
      } else if (!above && roomBelow < capH + GAP && roomAbove > roomBelow) {
        above = true;
      }
      info.style.top = above ? 'auto' : 'calc(100% + ' + GAP + 'px)';
      info.style.bottom = above ? 'calc(100% + ' + GAP + 'px)' : 'auto';
    }

    function openNode(node) {
      if (detailOpen) return;
      if (activeNode === node) return;
      if (activeNode) closeNode();

      const ring = node.querySelector('.node-ring');
      const img = node.querySelector('.node-thumb');
      if (!ring || !img || !node.querySelector('.node-info')) return;

      activeNode = node;
      nodeOpenTime = Date.now();
      node.classList.remove('is-closing');
      node.classList.add('is-hovered');
      map.classList.add('map-hovering');

      // Load higher-res =s800 asynchronously without stalling the expansion animation
      const big = img.src.replace(/=s\d+(\?.*)?$/, '=s800');
      if (big !== img.src && !img.dataset.bigFailed && !img.dataset.bigApplied) {
        const pre = new Image();
        pre.onload = () => {
          if (activeNode === node) {
            img.dataset.bigApplied = '1';
            img.src = big;
          }
        };
        pre.onerror = () => {
          img.dataset.bigFailed = '1';
        };
        pre.src = big;
      }

      layout(node);
    }

    map.addEventListener('mouseenter', warmBigThumbs, { once: true });

    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        if (!isTouchInteraction) {
          clearTimeout(closeTimer);
          openNode(node);
        }
      });
      node.addEventListener('mouseleave', () => {
        if (!isTouchInteraction) {
          clearTimeout(closeTimer);
          closeTimer = setTimeout(closeNode, 110);
        }
      });

      node.addEventListener('click', e => {
        const id = node.getAttribute('data-id');

        // Tap 1 (touch or un-hovered click): star is not active yet -> open hover state
        if (activeNode !== node) {
          e.preventDefault();
          e.stopPropagation();
          clearTimeout(closeTimer);
          openNode(node);
          return;
        }

        // Tap 1 ongoing: if touch synthetic click fires immediately after opening (< 400ms), don't navigate
        if (isTouchInteraction && (Date.now() - nodeOpenTime < 400)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        // Tap 2 (touch) or Click (mouse on PC): enter category detail
        openDetail(id);
      });
    });

    // Dismiss hover state when tapping/clicking anywhere outside any star
    window.addEventListener('click', e => {
      if (activeNode && !detailOpen && !e.target.closest('.constellation-node')) {
        clearTimeout(closeTimer);
        closeNode();
      }
    });

    map.addEventListener('mouseleave', () => {
      if (!isTouchInteraction) {
        clearTimeout(closeTimer);
        closeNode();
      }
    });

    /* ------------------------------------------------------------------------
       Category detail submenu
       ------------------------------------------------------------------------
       Clicking the star under the pointer fades the whole constellation out and
       opens that category: every piece keeps its plain link, and the sources
       that allow framing (Instagram /embed/, TikTok /embed/v2/, YouTube, Drive
       /preview, the SoundCloud widget — all checked to answer 200 with no
       X-Frame-Options and no frame-ancestors rule) also play inline. One player
       at a time, and closing drops its iframe so nothing keeps playing.
       Content lives in catalog.js; this only arranges it.
    ------------------------------------------------------------------------ */
    const detailEl = document.getElementById('work-detail');
    const detailBody = document.getElementById('wd-body');
    const detailTitle = document.getElementById('wd-title');
    const detailBlurb = document.getElementById('wd-blurb');
    const detailCount = document.getElementById('wd-count');
    const detailKicker = document.getElementById('wd-kicker');
    const detailChips = document.getElementById('wd-chips');
    const detailBack = document.getElementById('wd-back');
    const CAT = (window.RIZKYBY_CATALOG && window.RIZKYBY_CATALOG.categories) || null;
    let detailOpen = false;
    let detailId = null;
    let openCard = null;

    const PLATFORM_LABEL = {
      instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube', drive: 'Google Drive',
      soundcloud: 'SoundCloud', github: 'GitHub', doc: 'Document', blendkit: 'BlendKit', web: 'Website'
    };
    const PLATFORM_GLYPH = {
      instagram: 'IG', tiktok: 'TT', youtube: 'YT', drive: 'DR',
      soundcloud: 'SC', github: 'GH', doc: 'DOC', blendkit: 'BK', web: 'WEB'
    };

    function embedSrcFor(item, cat) {
      if (!item.e) return '';
      switch (item.p) {
        case 'instagram': return 'https://www.instagram.com/p/' + item.e + '/embed/?theme=dark';
        case 'tiktok': return 'https://www.tiktok.com/embed/v2/' + item.e;
        case 'youtube': return 'https://www.youtube.com/embed/' + item.e + '?theme=dark&color=white';
        case 'drive': return 'https://drive.google.com/file/d/' + item.e + '/preview';
        case 'soundcloud': return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(item.e) +
          '&color=' + encodeURIComponent((cat && cat.accent) || '#ff9d66') +
          '&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true';
        case 'doc': return 'https://docs.google.com/document/d/' + item.e + '/preview';
        default: return '';
      }
    }

    // Google renders a real thumbnail for the Drive files it can (images,
    // videos); anything it cannot gets the plate art instead of a broken image.
    const thumbUrl = id => {
      if (!id) return '';
      if (id.startsWith('http')) {
        const m = id.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (m) return 'https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w1200';
        return id;
      }
      return 'https://drive.google.com/thumbnail?id=' + id + '&sz=w1200';
    };

    function el(tag, cls, text) {
      const n = document.createElement(tag);
      if (cls) n.className = cls;
      if (text != null) n.textContent = text;
      return n;
    }

    function linkOut(cls, label, href) {
      const a = el('a', cls, label);
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.addEventListener('click', e => e.stopPropagation());
      return a;
    }

    function buildItem(item, index, cat, bare) {
      const src = embedSrcFor(item, cat);
      const shape = item.shape || 'wide';
      // Calculate aspect ratio from `aspect` or fall back to shape
      let aspectRatio = null;
      if (item.aspect) {
        aspectRatio = item.aspect;
      } else {
        // Fallback from shape
        if (shape === 'square') aspectRatio = 1;
        else if (shape === 'portrait') aspectRatio = 0.8; // 4:5
        else if (shape === 'vertical') aspectRatio = 0.5625; // 9:16
        else if (shape === 'wide') aspectRatio = 1.778; // 16:9
      }

      if (src) {
        // NAKED EMBED: No boxed card container. Bare iframe + bare floating typography.
        const itemEl = el('article', 'wd-item wd-naked shape-' + shape);
        // lets the gallery CSS target one platform's embed geometry on its own
        if (item.p) itemEl.classList.add('p-' + item.p);
        if (aspectRatio) itemEl.style.setProperty('--aspect', aspectRatio);
        // keep every window comfortably wide even for tall media (9:16, etc.)
        itemEl.style.setProperty('--min-w', '240px');

        const embedWrap = el('div', 'wd-embed-wrap');
        const frame = document.createElement('iframe');
        frame.className = 'wd-embed-frame';
        frame.src = src;
        frame.loading = 'lazy';
        frame.title = item.t;
        frame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write');
        frame.setAttribute('allowfullscreen', '');
        // All embeds scroll internally when they overflow — no hard-cropping anywhere.
        frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        embedWrap.appendChild(frame);
        itemEl.appendChild(embedWrap);

        // TikTok's player only ever renders a fixed portrait card and ignores
        // how wide its iframe is. Zoom the iframe so that card fills this 16:9
        // window (the window then shows the centre band of the card).
        if (item.p === 'tiktok') {
          const applyTikTokZoom = () => {
            const w = embedWrap.clientWidth;
            if (w > 0) frame.style.setProperty('--tt-zoom', String(w / 325));
          };
          applyTikTokZoom();
          requestAnimationFrame(applyTikTokZoom);
          if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(applyTikTokZoom).observe(embedWrap);
          } else {
            window.addEventListener('resize', applyTikTokZoom);
          }
        }

        // `fill` = the post's native media aspect, measured inside the embed.
        // Instagram letterboxes instead of cropping, so when the window uses a
        // different aspect (a 4:5 post in a 9:16 window) widen the iframe by
        // media/window and centre the overflow — the window then shows the
        // centred crop that fills it edge to edge. Ratio-only, so it survives
        // resize untouched.
        if (item.fill && aspectRatio) {
          const cover = Math.max(1, (item.fill / aspectRatio) * 1.02);
          itemEl.classList.add('fill-ig');
          frame.classList.add('fill-ig');
          // the embed's own scrollbar would thin the media by ~15px
          frame.setAttribute('scrolling', 'no');
          frame.style.setProperty('--ig-fill', cover.toFixed(4));
        }

        // One area, several media: `strip` keeps extra embeds inside the SAME
        // item — the main embed stays put, the extras share one title and one
        // caption. `stripSide` (default) puts them in a column beside the main
        // embed, each frame 16:9 at the main embed's height; `stripSide:false`
        // falls back to a row underneath.
        if (Array.isArray(item.strip) && item.strip.length) {
          const strip = el('div', 'wd-strip');
          strip.style.setProperty('--strip-n', String(item.strip.length));
          item.strip.forEach((sub, si) => {
            const cell = el('div', 'wd-strip-cell');
            const targetUrl = sub.u || (sub.e ? 'https://drive.google.com/file/d/' + sub.e + '/view' : '#');
            const a = linkOut('wd-strip-link', '', targetUrl);
            a.title = (sub.t || item.t) + ' — Screenshot ' + (si + 1);

            if (sub.p === 'drive' && sub.e) {
              const img = el('img', 'wd-strip-img');
              img.src = thumbUrl(sub.e);
              img.alt = (item.t || '') + ' screenshot ' + (si + 1);
              img.loading = 'lazy';
              a.appendChild(img);
            } else if (sub.e) {
              const sFrame = document.createElement('iframe');
              sFrame.className = 'wd-strip-frame';
              sFrame.src = embedSrcFor(Object.assign({ p: item.p }, sub), cat);
              sFrame.loading = 'lazy';
              sFrame.title = item.t + ' — ' + (si + 1);
              sFrame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write');
              sFrame.setAttribute('allowfullscreen', '');
              sFrame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
              a.appendChild(sFrame);
            }
            cell.appendChild(a);
            strip.appendChild(cell);
          });
          if (item.stripSide === false) {
            itemEl.appendChild(strip);
          } else {
            // media row = main embed + the strip column beside it, one block.
            itemEl.classList.add('wd-has-side');
            const mediaRow = el('div', 'wd-media-row');
            itemEl.insertBefore(mediaRow, embedWrap);
            mediaRow.appendChild(embedWrap);
            mediaRow.appendChild(strip);
          }
        }

        // Every bare layout: title + description floating below the embed.
        // No card panel, no chrome — just the media and its caption.
        if (bare) {
          const info = el('div', 'wd-item-info');
          if (item.t) info.appendChild(el('h3', 'wd-t', item.t));
          if (item.d) info.appendChild(el('p', 'wd-d', item.d));
          const acts = el('div', 'wd-acts');
          if (item.u) {
            let label = item.btn || 'Open ↗';
            if (!item.btn) {
              if (item.p === 'instagram') label = 'Instagram ↗';
              else if (item.p === 'tiktok') label = 'TikTok ↗';
              else if (item.p === 'soundcloud') label = 'SoundCloud ↗';
              else if (item.p === 'github') label = 'GitHub ↗';
              else if (item.p === 'drive') label = 'Drive ↗';
              else if (item.p === 'blendkit') label = 'BlendKit ↗';
            } else if (!label.endsWith('↗')) {
              label += ' ↗';
            }
            acts.appendChild(linkOut('wd-act primary', label, item.u));
          }
          if (item.alt && item.alt.u) {
            acts.appendChild(linkOut('wd-act', (item.alt.label || 'Open') + ' ↗', item.alt.u));
          }
          if (acts.children.length) info.appendChild(acts);
          itemEl.appendChild(info);
          return itemEl;
        }

        const info = el('div', 'wd-item-info');
        const metaRow = el('div', 'wd-info-meta');
        const badge = el('span', 'wd-p', (PLATFORM_LABEL[item.p] || item.p) + (item.tag ? ' · ' + item.tag : ''));
        badge.dataset.p = item.p;
        metaRow.appendChild(badge);
        metaRow.appendChild(el('span', 'wd-num', String(index + 1).padStart(2, '0')));
        info.appendChild(metaRow);

        info.appendChild(el('h3', 'wd-t', item.t));
        if (item.d) info.appendChild(el('p', 'wd-d', item.d));

        const acts = el('div', 'wd-acts');
        if (item.u) {
          let label = 'Open ↗';
          if (item.p === 'instagram') label = 'Instagram ↗';
          else if (item.p === 'tiktok') label = 'TikTok ↗';
          else if (item.p === 'soundcloud') label = 'SoundCloud ↗';
          else if (item.p === 'github') label = 'GitHub ↗';
          else if (item.p === 'drive') label = 'Drive ↗';
          else if (item.p === 'blendkit') label = 'BlendKit ↗';
          acts.appendChild(linkOut('wd-act primary', label, item.u));
        }
        if (item.alt && item.alt.u) acts.appendChild(linkOut('wd-act', item.alt.label + ' ↗', item.alt.u));
        if (acts.children.length) info.appendChild(acts);

        itemEl.appendChild(info);
        return itemEl;
      }

      // If bare layout & item has thumbnail (Drive ID / URL) or local file: render naked image
      if (bare && (item.thumb || (item.p === 'local' && item.path))) {
        const itemEl = el('article', 'wd-item wd-naked-local shape-' + shape);
        if (item.p) itemEl.classList.add('p-' + item.p);
        if (aspectRatio) itemEl.style.setProperty('--aspect', aspectRatio);
        itemEl.style.setProperty('--min-w', '240px');

        const imgWrap = el('div', 'wd-local-wrap');
        const img = el('img', 'wd-local-img');
        img.loading = 'lazy';
        img.alt = item.t;
        img.src = item.thumb ? thumbUrl(item.thumb) : item.path;

        if (item.u) {
          const a = linkOut('wd-local-link', '', item.u);
          a.title = item.t;
          a.appendChild(img);
          imgWrap.appendChild(a);
        } else {
          imgWrap.appendChild(img);
        }
        itemEl.appendChild(imgWrap);

        // Info overlay below
        const info = el('div', 'wd-item-info');
        if (item.t) info.appendChild(el('h3', 'wd-t', item.t));
        if (item.d) info.appendChild(el('p', 'wd-d', item.d));

        const acts = el('div', 'wd-acts');
        if (item.u) {
          let label = item.btn || (item.p === 'drive' ? 'PDF ↗' : 'Open ↗');
          if (!label.endsWith('↗')) label += ' ↗';
          acts.appendChild(linkOut('wd-act primary', label, item.u));
        }
        if (item.alt && item.alt.u) {
          acts.appendChild(linkOut('wd-act', (item.alt.label || 'Open') + ' ↗', item.alt.u));
        }
        if (acts.children.length) info.appendChild(acts);

        itemEl.appendChild(info);
        return itemEl;
      }

      // WRAPPED CARD: Exclusively for items that cannot be embedded (BlendKit variants, GitHub, Docs, specs, local files)
      // Bare layout & no embeddable source: pure typographic link card (no panel).
      if (bare && !src) {
        const card = el('article', 'wd-item wd-text-card');
        if (item.t) card.appendChild(el('h3', 'wd-t', item.t));
        if (item.d) card.appendChild(el('p', 'wd-d', item.d));
        if (item.tag) card.appendChild(el('span', 'wd-tag', item.tag));
        if (item.u) {
          let label = item.btn || 'Open ↗';
          if (!item.btn) {
            if (item.p === 'drive') label = 'Drive ↗';
            else if (item.p === 'doc') label = 'Doc ↗';
            else if (item.p === 'web') label = 'Visit ↗';
            else if (item.p === 'github') label = 'GitHub ↗';
            else if (item.p === 'soundcloud') label = 'SoundCloud ↗';
          } else if (!label.endsWith('↗')) {
            label += ' ↗';
          }
          card.appendChild(linkOut('wd-act primary', label, item.u));
        }
        return card;
      }

      const card = el('article', 'wd-item wd-wrapped shape-' + shape);

      const media = el('div', 'wd-media');
      if (item.thumb) {
        const im = el('img', 'wd-thumb');
        im.loading = 'lazy';
        im.alt = item.t;
        im.src = thumbUrl(item.thumb);
        media.appendChild(im);
      } else {
        const plate = el('div', 'wd-plate');
        plate.appendChild(el('span', 'wd-glyph', PLATFORM_GLYPH[item.p] || '·'));
        plate.appendChild(el('span', 'wd-num', String(index + 1).padStart(2, '0')));
        media.appendChild(plate);
      }
      card.appendChild(media);

      const meta = el('div', 'wd-meta');
      const badge = el('span', 'wd-p', (PLATFORM_LABEL[item.p] || item.p) + (item.tag ? ' · ' + item.tag : ''));
      badge.dataset.p = item.p;
      meta.appendChild(badge);
      meta.appendChild(el('h3', 'wd-t', item.t));
      if (item.d) meta.appendChild(el('p', 'wd-d', item.d));

      const acts = el('div', 'wd-acts');
      if (item.u) {
        let label = 'Open ↗';
        if (item.p === 'instagram') label = 'Instagram ↗';
        else if (item.p === 'tiktok') label = 'TikTok ↗';
        else if (item.p === 'soundcloud') label = 'SoundCloud ↗';
        else if (item.p === 'github') label = 'GitHub ↗';
        else if (item.p === 'drive') label = 'Drive ↗';
        else if (item.p === 'blendkit') label = 'BlendKit ↗';
        acts.appendChild(linkOut('wd-act primary', label, item.u));
      }
      if (item.alt && item.alt.u) acts.appendChild(linkOut('wd-act', item.alt.label + ' ↗', item.alt.u));
      if (acts.children.length) meta.appendChild(acts);
      card.appendChild(meta);

      if (item.gallery && item.gallery.length) {
        const strip = el('div', 'wd-strip');
        item.gallery.forEach(gid => {
          const a = linkOut('', '', 'https://drive.google.com/file/d/' + gid + '/view');
          const im = el('img');
          im.loading = 'lazy';
          im.alt = item.t + ' screenshot';
          im.src = thumbUrl(gid);
          a.appendChild(im);
          strip.appendChild(a);
        });
        card.appendChild(strip);
      }

      return card;
    }

    function buildAsset(item, index) {
      const a = linkOut('wd-asset', '', item.u);
      // BlendKit serves x-frame-options: DENY, so its viewer never embeds.
      // The public CDN preview (`thumb`) stands in for the model itself; the
      // whole tile still links straight to the asset page.
      if (item.thumb) {
        const img = document.createElement('img');
        img.className = 'wd-asset-thumb';
        img.src = item.thumb;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = item.t;
        img.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        a.appendChild(img);
      }
      const meta = el('div', 'wd-asset-meta');
      meta.appendChild(el('span', null, item.t.replace('BlendKit ', '')));
      a.appendChild(meta);
      if (item.d) a.title = item.d;
      return a;
    }

    const hexToRgb = hex => {
      const h = hex.replace('#', '');
      const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
      return ((n >> 16) & 255) + ', ' + ((n >> 8) & 255) + ', ' + (n & 255);
    };

    function renderDetail(id) {
      const cat = CAT && CAT[id];
      if (!cat) return false;
      detailId = id;
      detailEl.style.setProperty('--accent', cat.accent || '#ff9d66');
      if (cat.accent) detailEl.style.setProperty('--accent-rgb', hexToRgb(cat.accent));
      detailKicker.textContent = 'Category ' + String(id).padStart(2, '0');
      detailTitle.textContent = cat.title;
      detailBlurb.textContent = cat.blurb || '';
      const n = cat.items.length;
      detailCount.textContent = '';
      detailBody.className = 'wd-body layout-' + (cat.layout || 'grid') + (cat.compact ? ' is-compact' : '');
      // Wire --cols for instagram-gallery-uniform
      if (cat.layout === 'instagram-gallery-uniform' && cat.cols) {
        detailBody.style.setProperty('--cols', cat.cols);
      }
      // Instagram galleries (4:5, 9:16, uniform): bare embed-only arrangement, no panel chrome.
      const bareEmbeds = cat.layout === 'instagram-gallery' 
        || cat.layout === 'instagram-gallery-wide' 
        || cat.layout === 'instagram-gallery-uniform'
        || cat.layout === 'mixed-procedural'
        || cat.layout === 'audio-bare'
        || cat.layout === 'tech-bare'
        || cat.layout === 'design-bare'
        || cat.layout === 'video-bare';
      detailEl.classList.toggle('ig-clean', bareEmbeds);
      detailBody.scrollTop = 0;
      detailBody.replaceChildren();
      let assets = null;
      let colEl = null;            // current stacked-column wrapper, if any
      let colKey = null;
      cat.items.forEach((item, i) => {
        if (item.p === 'blendkit') {
          if (!assets) {
            const assetHeader = el('div', 'wd-asset-header');
            assetHeader.innerHTML = '<strong>Published on BlendKit</strong>Eight assets authored by you and published on the BlendKit marketplace. Click any tile to view the full asset on BlendKit.';
            assets = el('div', 'wd-assets');
            detailBody.appendChild(assetHeader);
            detailBody.appendChild(assets);
          }
          assets.appendChild(buildAsset(item, i));
          colEl = null; colKey = null;
        } else {
          const built = buildItem(item, i, cat, bareEmbeds);
          // `col: 'name'` on consecutive items stacks them in one column
          // (top/bottom) instead of side by side, which hands the horizontal
          // room to the wide item next to them.
          if (item.col) {
            if (!colEl || colKey !== item.col) {
              colEl = el('div', 'wd-col');
              colKey = item.col;
              detailBody.appendChild(colEl);
            }
            colEl.appendChild(built);
          } else {
            colEl = null; colKey = null;
            detailBody.appendChild(built);
          }
        }
      });
      if (detailChips) {
        Array.from(detailChips.children).forEach(chip => {
          chip.setAttribute('aria-current', chip.dataset.id === id ? 'true' : 'false');
        });
      }
      return true;
    }

    function buildChips() {
      if (!CAT || !detailChips) return;
      const order = (window.RIZKYBY_CATALOG.order || Object.keys(CAT));
      detailChips.replaceChildren();
      order.forEach(id => {
        const cat = CAT[id];
        if (!cat) return;
        const chip = el('button', 'wd-chip', cat.title);
        chip.type = 'button';
        chip.dataset.id = id;
        chip.addEventListener('click', () => { if (id !== detailId) renderDetail(id); });
        detailChips.appendChild(chip);
      });
    }

    function openDetail(id) {
      if (!detailEl || !renderDetail(id)) return;
      closeNode();                       // the star settles back as it fades out
      document.body.classList.add('detail-open');
      detailEl.setAttribute('aria-hidden', 'false');
      detailOpen = true;
      // Swap nav: hide 4 links, show centered back button
      const nav = document.getElementById('site-nav');
      if (nav) nav.classList.add('nav-back-mode');
    }

    function closeDetail() {
      if (!detailEl || !detailOpen) return;
      detailOpen = false;
      document.body.classList.remove('detail-open');
      detailEl.setAttribute('aria-hidden', 'true');
      // Restore nav: show 4 links, hide back button
      const nav = document.getElementById('site-nav');
      if (nav) nav.classList.remove('nav-back-mode');
      // Drop the markup once it is out of sight so no player lingers in memory.
      window.setTimeout(() => { if (!detailOpen) detailBody.replaceChildren(); }, 360);
    }

    if (detailBack) detailBack.addEventListener('click', closeDetail);
    const navBackBtn = document.getElementById('nav-back');
    if (navBackBtn) navBackBtn.addEventListener('click', () => {
      closeDetail();
      if (window.RIZKYBY_SKILLS && window.RIZKYBY_SKILLS.closeDetail) {
        window.RIZKYBY_SKILLS.closeDetail();
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      // "Work" returns to the constellation, any other view takes it along.
      link.addEventListener('click', () => {
        closeDetail();
        if (window.RIZKYBY_SKILLS && window.RIZKYBY_SKILLS.closeDetail) {
          window.RIZKYBY_SKILLS.closeDetail();
        }
      });
    });
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (detailOpen) closeDetail();
        if (window.RIZKYBY_SKILLS && window.RIZKYBY_SKILLS.closeDetail) {
          window.RIZKYBY_SKILLS.closeDetail();
        }
      }
    });
    buildChips();

    const lines = Array.from(map.querySelectorAll('.constellation-line'));
    const nodeById = {};
    nodes.forEach(n => {
      const id = n.getAttribute('data-id');
      if (id) nodeById[id] = n;
    });

    const RATIO_PRESETS = {
      landscape: {
        '1':  { x: 12, y: 25 },
        '2':  { x: 25, y: 38 },
        '3':  { x: 24, y: 76 },
        '4':  { x: 39, y: 22 },
        '5':  { x: 43, y: 56 },
        '6':  { x: 11, y: 62 },
        '7':  { x: 52, y: 80 },
        '8':  { x: 74, y: 22 },
        '9':  { x: 58, y: 38 },
        '10': { x: 78, y: 62 },
        '11': { x: 90, y: 42 }
      },
      compact: {
        '1':  { x: 15, y: 22 },
        '2':  { x: 27, y: 36 },
        '3':  { x: 24, y: 76 },
        '4':  { x: 40, y: 18 },
        '5':  { x: 44, y: 54 },
        '6':  { x: 13, y: 58 },
        '7':  { x: 52, y: 82 },
        '8':  { x: 73, y: 18 },
        '9':  { x: 58, y: 36 },
        '10': { x: 77, y: 62 },
        '11': { x: 87, y: 40 }
      },
      square: {
        '1':  { x: 20, y: 16 },
        '2':  { x: 30, y: 34 },
        '3':  { x: 24, y: 76 },
        '4':  { x: 46, y: 14 },
        '5':  { x: 45, y: 48 },
        '6':  { x: 16, y: 52 },
        '7':  { x: 48, y: 84 },
        '8':  { x: 78, y: 18 },
        '9':  { x: 65, y: 42 },
        '10': { x: 78, y: 76 },
        '11': { x: 84, y: 46 }
      },
      portrait: {
        '1':  { x: 26, y: 10 },
        '2':  { x: 48, y: 22 },
        '3':  { x: 30, y: 45 },
        '4':  { x: 74, y: 12 },
        '5':  { x: 78, y: 32 },
        '6':  { x: 22, y: 32 },
        '7':  { x: 72, y: 47 },
        '8':  { x: 24, y: 74 },
        '9':  { x: 50, y: 60 },
        '10': { x: 76, y: 76 },
        '11': { x: 50, y: 89 }
      }
    };

    let activePreset = null;
    let lineAnimTimer = null;

    function syncSvgLines(coords) {
      lines.forEach(line => {
        const pair = line.getAttribute('data-nodes');
        if (!pair) return;
        const [u, v] = pair.split(',');
        const p1 = coords[u];
        const p2 = coords[v];
        if (p1 && p2) {
          line.setAttribute('x1', (p1.x * 10).toFixed(1));
          line.setAttribute('y1', (p1.y * 6).toFixed(1));
          line.setAttribute('x2', (p2.x * 10).toFixed(1));
          line.setAttribute('y2', (p2.y * 6).toFixed(1));
        }
      });
    }

    function animateSvgLines(duration = 520) {
      if (lineAnimTimer) cancelAnimationFrame(lineAnimTimer);
      const start = performance.now();
      function step(now) {
        const elapsed = now - start;
        const mr = map.getBoundingClientRect();
        if (mr.width > 0 && mr.height > 0) {
          lines.forEach(line => {
            const pair = line.getAttribute('data-nodes');
            if (!pair) return;
            const [u, v] = pair.split(',');
            const nA = nodeById[u];
            const nB = nodeById[v];
            if (nA && nB) {
              const x1 = (nA.offsetLeft / mr.width) * 1000;
              const y1 = (nA.offsetTop / mr.height) * 600;
              const x2 = (nB.offsetLeft / mr.width) * 1000;
              const y2 = (nB.offsetTop / mr.height) * 600;
              line.setAttribute('x1', x1.toFixed(1));
              line.setAttribute('y1', y1.toFixed(1));
              line.setAttribute('x2', x2.toFixed(1));
              line.setAttribute('y2', y2.toFixed(1));
            }
          });
        }
        if (elapsed < duration) {
          lineAnimTimer = requestAnimationFrame(step);
        } else {
          const targetCoords = RATIO_PRESETS[activePreset] || RATIO_PRESETS.landscape;
          syncSvgLines(targetCoords);
        }
      }
      lineAnimTimer = requestAnimationFrame(step);
    }

    function applyConstellationPreset(presetName, animate = true) {
      if (!RATIO_PRESETS[presetName]) return;
      const coords = RATIO_PRESETS[presetName];
      const changed = activePreset !== presetName;
      const wasInitial = activePreset === null;
      activePreset = presetName;

      nodes.forEach(node => {
        const id = node.getAttribute('data-id');
        const pos = coords[id];
        if (!pos) return;
        node.dataset.leftPct = pos.x + '%';
        node.dataset.topPct = pos.y + '%';
        if (node !== activeNode) {
          node.style.left = pos.x + '%';
          node.style.top = pos.y + '%';
        }
      });

      if (changed && animate && !wasInitial) {
        animateSvgLines(520);
      } else {
        syncSvgLines(coords);
      }
    }

    // The wrapper is fluid, so its own box decides how big a star may be. Keeping
    // --node-base proportional to the wrapper (never a fixed rem) means the box
    // always encloses the whole constellation: no zoom threshold, no bottom clip.
    function fitMap() {
      const r = map.getBoundingClientRect();
      if (r.width < 40 || r.height < 40) return;
      const ratio = r.width / r.height;
      let targetPreset = 'landscape';
      if (ratio < 0.85) {
        targetPreset = 'portrait';
      } else if (ratio < 1.15) {
        targetPreset = 'square';
      } else if (ratio < 1.45) {
        targetPreset = 'compact';
      } else {
        targetPreset = 'landscape';
      }

      applyConstellationPreset(targetPreset, true);

      const base = Math.max(26, Math.min(49.6, r.width * 0.055, r.height * 0.09));
      map.style.setProperty('--node-base', base.toFixed(2) + 'px');
    }

    // The constellation is fluid. Re-fit the star size and an open box on any
    // viewport, zoom or wrapper-size change so it can never be clipped.
    let relayoutFrame = 0;
    function relayout() {
      cancelAnimationFrame(relayoutFrame);
      relayoutFrame = requestAnimationFrame(() => {
        fitMap();
        if (activeNode) layout(activeNode);
      });
    }
    window.addEventListener('resize', relayout);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', relayout);
    if (window.ResizeObserver) new ResizeObserver(relayout).observe(map);
    fitMap();
  }

  /* --------------------------------------------------------------------------
     6. Sequence Bootstrap
     -------------------------------------------------------------------------- */
  window.addEventListener('DOMContentLoaded', () => {
    initRouter();
    initConstellation();
    setTimeout(() => {
      typeWelcome(() => {
        // Reveal nav bar smoothly
        const siteNav = document.getElementById('site-nav');
        if (siteNav) {
          siteNav.classList.remove('nav-bar-hidden');
          siteNav.classList.add('nav-bar-visible');
        }

        // Trigger sunset gradient background
        triggerSunset();

        // Start title cycle after short pause
        setTimeout(runTitleCycle, 450);
      });
    }, 350);
  });
})();

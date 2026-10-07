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
    'creative coder',
    '3d & motion design',
    'visual experimenter'
  ];
  const SUBTITLES = [
    'portfolio & digital playground',
    'crafting modern interactive web',
    'blender, shaders, and animations',
    'exploring the edge of design'
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
     5. Sequence Bootstrap
     -------------------------------------------------------------------------- */
  window.addEventListener('DOMContentLoaded', () => {
    initRouter();
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

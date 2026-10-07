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
  const bgMouseRadial = document.getElementById('bg-mouse-radial');
  const mouseGlow = document.getElementById('mouse-glow');

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

  function showMouseRadial() {
    if (bgMouseRadial) bgMouseRadial.classList.remove('mouse-hidden');
    if (mouseGlow) mouseGlow.classList.remove('mouse-hidden');
  }

  function hideMouseRadial() {
    if (bgMouseRadial) bgMouseRadial.classList.add('mouse-hidden');
    if (mouseGlow) mouseGlow.classList.add('mouse-hidden');
  }

  window.addEventListener('pointermove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    showMouseRadial();
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    hideMouseRadial();
  });

  document.addEventListener('mouseenter', () => {
    showMouseRadial();
  });

  function updateMousePhysics() {
    if (mouseTrackingActive) {
      // Smooth 50% mixing step / lerp inertia
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      const pctX = ((currentX / window.innerWidth) * 100).toFixed(2);
      const pctY = ((currentY / window.innerHeight) * 100).toFixed(2);

      document.documentElement.style.setProperty('--mx', `${pctX}%`);
      document.documentElement.style.setProperty('--my', `${pctY}%`);

      if (mouseGlow) {
        mouseGlow.style.left = `${currentX}px`;
        mouseGlow.style.top = `${currentY}px`;
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
    if (bgMouseRadial) bgMouseRadial.classList.add('active');
    mouseGlow.classList.add('active');
    mouseTrackingActive = true;
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
  const WORKS_DATA = [
    {
      id: 'ramadan-2026',
      category: '3D Motion',
      sub: 'Motion Graphics',
      title: 'Ramadan 2026 Celebration',
      desc: '3D celebratory motion graphic featuring illuminated crescent geometry, floating lanterns, and ambient golden particles.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Reel', url: 'https://www.instagram.com/p/DVAAJk6FAx0/' }
      ]
    },
    {
      id: 'utbk-2026',
      category: '3D Motion',
      sub: 'Motion Graphics',
      title: 'UTBK 2026 Motion & Code',
      desc: 'Dynamic 3D motion graphic integrating terminal command streams, cyber aesthetic lighting, and rhythmic hacker typography.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Reel', url: 'https://www.instagram.com/p/DYw6a_qTa1U/' }
      ]
    },
    {
      id: 'product-anim',
      category: '3D Motion',
      sub: 'Commercial Reel',
      title: 'Product Motion Showcase',
      desc: 'High-end commercial 3D product animation focusing on dynamic camera sweeps, materials, and fluid lighting.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Part 1', url: 'https://www.instagram.com/p/DMzrefzvxnM/' },
        { label: 'Instagram Part 2', url: 'https://www.instagram.com/p/DM0Tcx9vNOX/' }
      ]
    },
    {
      id: 'piano-rain',
      category: '3D Motion',
      sub: 'Conceptual Animation',
      title: 'Piano & Musical Note Rain',
      desc: 'Melancholic 3D scene depicting an expressive grand piano amidst a continuous downpour of physical sheet music notes.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/DKonumiSbB2/' }
      ]
    },
    {
      id: 'lakeside-retreat',
      category: 'Realistic 3D',
      sub: 'Environment Design',
      title: 'Lakeside Sanctuary',
      desc: 'Photorealistic architectural render of a serene waterside deck and lounge chair bathed in tranquil twilight illumination.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/DYvvJbXkmjn' }
      ]
    },
    {
      id: 'curved-gallery',
      category: 'Realistic 3D',
      sub: 'Architecture',
      title: 'Curved Origami Gallery',
      desc: 'Architectural concept study mimicking gracefully folded paper sheets with natural daytime bounce lighting and concrete textures.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/DRZH4ZwkmBj/' }
      ]
    },
    {
      id: 'rolls-royce',
      category: 'Realistic 3D',
      sub: 'Automotive Hard-Surface',
      title: 'Rolls Royce Phantom V',
      desc: 'Exacting 3D automotive hard-surface reproduction showcasing metallic clearcoat reflections, studio lighting, and curves.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/C9FIGbTSd5N/' }
      ]
    },
    {
      id: 'abandoned-room',
      category: 'Realistic 3D',
      sub: 'Interior Storytelling',
      title: 'Abandoned Room & Laptop',
      desc: 'Detailed storytelling render of a dusty forgotten workstation, volumetric sunlight shafts, and decaying concrete surroundings.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/C868K1jymmw/?img_index=1' }
      ]
    },
    {
      id: 'morning-tea',
      category: 'Realistic 3D',
      sub: 'Still Life Study',
      title: 'Morning Tea Still Life',
      desc: 'Photorealistic morning beverage study modeled in Blender 4.0 with authentic glass refraction, condensation, and brass kettle.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/C4LROTsyVNZ/?img_index=1' }
      ]
    },
    {
      id: 'interior-study',
      category: 'Realistic 3D',
      sub: 'Lighting Study',
      title: 'Warm Interior Study',
      desc: 'Carefully balanced natural ambient daylight and warm indoor accents exploring architectural material realism.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/DMzqo-Tv8kM/' }
      ]
    },
    {
      id: 'iso-akyas',
      category: 'Isometric',
      sub: 'Level 2 Consecutive',
      title: 'Akyas Lounge & Office (Day 28)',
      desc: 'Eighth and concluding entry of Level 2 Consecutive Isometric series: personalized cozy workspace diorama created as a farewell tribute.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/DH0IoOgyL6g/?img_index=1' }
      ]
    },
    {
      id: 'iso-military',
      category: 'Isometric',
      sub: 'Level 2 Consecutive',
      title: 'Military Memorial Room (Day 27)',
      desc: 'Seventh entry of Level 2 Isometric: dedicated military heritage quarters with medals, authentic posters, and foliage balance.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/DH0IS42SUR3/?img_index=1' }
      ]
    },
    {
      id: 'iso-series',
      category: 'Isometric',
      sub: 'Diorama Worlds',
      title: 'Isometric Living Spaces Series',
      desc: 'Multi-part systematic collection exploring isometric room aesthetics, custom miniature props, and controlled studio palettes.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Series Part 1', url: 'https://www.instagram.com/p/DIcXik2zBSr/?img_index=1' },
        { label: 'Series Part 2', url: 'https://www.instagram.com/p/C3KzVawyzwz/?img_index=1' }
      ]
    },
    {
      id: 'surreal-floating',
      category: 'Surreal & Astro',
      sub: 'Surrealism',
      title: 'Ethereal Spatial Landscapes',
      desc: 'Surreal 3D dreamscape featuring gravity-defying geometries, impossible horizons, and emotive color balancing.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/C11xXl0B_OF/?img_index=1' },
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/C3bes_TSWtC/?img_index=1' }
      ]
    },
    {
      id: 'celestial-dynamics',
      category: 'Surreal & Astro',
      sub: 'Astronomy',
      title: 'Celestial Orbital Dynamics',
      desc: 'Cosmic scale 3D astronomical simulations rendering deep-space nebulae, planetary alignments, and stellar illumination.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/C9CVPMnyBRe/?img_index=1' },
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/DQ6PsyZErxM/?img_index=1' }
      ]
    },
    {
      id: 'street-collapse-vfx',
      category: 'VFX & Nodes',
      sub: 'Dynamics & Physics',
      title: 'Collapsing Road VFX Sequence',
      desc: 'Realistic physics-driven destruction simulation portraying sudden roadway surface collapse with detailed fracturing debris.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Post', url: 'https://www.instagram.com/p/DMzpw5zPtLg/' }
      ]
    },
    {
      id: 'blendkit-staircase',
      category: 'VFX & Nodes',
      sub: 'Procedural Geometry',
      title: 'Procedural Staircase Generator',
      desc: 'Parametric procedural staircase asset generator created in Blender Geometry Nodes and officially published on BlendKit.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Demo', url: 'https://www.instagram.com/p/DcQsphEy-_1/' },
        { label: 'BlendKit Asset', url: 'https://www.blendkit.com/asset-gallery-detail/316be27d-8839-494d-96c8-ccccf71efdea/?query=author_id%3A1305503' }
      ]
    },
    {
      id: 'project-7466',
      category: 'Audio & Music',
      sub: 'Original Music',
      title: 'Project No. 7466',
      desc: 'Original electronic synthwave composition across 6 sequenced movements exploring driving basslines, arpeggios, and melodic progression.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'SoundCloud Track', url: 'https://soundcloud.com/rizky-bayuu/project-no-7466' }
      ]
    },
    {
      id: 'cai-drama-audio',
      category: 'Audio & Music',
      sub: 'Audio Engineering',
      title: 'Drama CAI 2025 Vocal Engineering',
      desc: 'Comprehensive voice acting, dialogue cleanup, dynamic vocal enhancement, and atmospheric sound design for PPM BKI theatrical production.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Audio Demo', url: 'https://drive.google.com/file/d/1jE-CGjSDF2QoDXhjDVnOZeuB4_XEBTJA/view?usp=drive_link' }
      ]
    },
    {
      id: 'rizkyby-monitor',
      category: 'Code & Systems',
      sub: 'Linux Telemetry',
      title: 'RizkybyMONITOR',
      desc: 'Real-time Linux hardware monitor tracking CPU cores, RAM hierarchy, compressed ZRAM, temperature sensors, and process hierarchies.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/rizkybayuu/RizkybyMONITOR' },
        { label: 'Instagram Demo', url: 'https://www.instagram.com/p/Dc3zoGzS4En/' }
      ]
    },
    {
      id: 'sky-retail',
      category: 'Code & Systems',
      sub: 'Desktop Application',
      title: 'SkyRetail POS Suite',
      desc: 'Modern desktop retail point-of-sale architecture designed for rapid local transactions, inventory indexing, and robust offline stability.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'In Development', url: '#' }
      ]
    },
    {
      id: 'writepath-app',
      category: 'Code & Systems',
      sub: 'Tauri & Rust',
      title: 'Writepath Creative Suite',
      desc: 'Focused desktop novel & story authoring suite built with Rust/Tauri v2, neural smart translation engine, and local-first encryption.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'In Development', url: '#' }
      ]
    },
    {
      id: 'vm-orchestration',
      category: 'Code & Systems',
      sub: 'Virtualization',
      title: 'VM & Legacy OS Orchestration',
      desc: 'Hands-on system deployment across virtual machine hypervisors, retro Windows environments, and bare-metal Void Linux builds.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Demo', url: 'https://www.instagram.com/p/Dc72_ssSybI/' }
      ]
    },
    {
      id: 'bitmap-dither',
      category: 'Graphic Design',
      sub: 'Procedural Shader',
      title: 'Bitmap & Dither Shader Pipeline',
      desc: 'Experimental procedural aesthetic pipeline combining Blender Geometry Nodes procedural scattering with modern Affinity raster dithering.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Project Assets', url: 'https://drive.google.com/file/d/1iSYJ3IjJkiEprGIN2lkRptp_sOMT7udc/view?usp=drive_open' }
      ]
    },
    {
      id: 'yearbook-25',
      category: 'Graphic Design',
      sub: 'Editorial Publication',
      title: 'YEARBOOK 25 Publication',
      desc: 'Complete editorial design, typography lockups, and high-resolution layout engineering for full-format commemorative yearbook.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Editorial Design', url: '#' }
      ]
    },
    {
      id: 'magazine-perfect',
      category: 'Graphic Design',
      sub: 'Editorial & Motion',
      title: 'Magazine Perfect & Motion Sequence',
      desc: 'Stylized magazine publication artwork synchronized with fluid 3D commercial motion showcase sequences.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'Instagram Motion', url: 'https://www.instagram.com/p/DK50YJIgD99/' }
      ]
    },
    {
      id: 'video-editing-tiktok',
      category: 'Graphic Design',
      sub: 'Video Editing',
      title: 'Cinematic Rhythm Video Editing',
      desc: 'Dynamic pacing, audio beat synchronization, color treatment, and narrative micro-pacing for social video productions.',
        thumbnail: 'assets/media/thumbnail.svg',
      links: [
        { label: 'TikTok Video', url: 'https://www.tiktok.com/@rizkybayu354/video/7578757396319800583' },
        { label: 'Google Drive Reel', url: 'https://drive.google.com/file/d/1qLo_qkzzpYTNesiCakT9zoHGRXQvJvnr/view?usp=drive_link' }
      ]
    }
  ];

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

  function switchView(viewName) {
    if (!views[viewName]) return;
    currentView = viewName;

    Object.keys(views).forEach(key => {
      if (views[key]) {
        if (key === viewName) {
          views[key].classList.add('active');
        } else {
          views[key].classList.remove('active');
        }
      }
    });

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
        // Trigger sunset gradient background
        triggerSunset();

        // Start title cycle after short pause
        setTimeout(runTitleCycle, 450);
      });
    }, 350);
  });
})();

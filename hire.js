/**
 * rizkyby.web - Hire Me & Commissions Controller
 * Features:
 * 1. Live availability status strip
 * 2. Compact single card with 5 interactive toggles (Default: Email) for WhatsApp, Email, Fiverr, Discord, Instagram
 * 3. Continuous horizontal auto-scrolling showcase of published Instagram 3D works
 * 4. Core deliverables & services
 * 5. 4-step collaboration workflow & principles
 */

(() => {
  'use strict';

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // 1. Five Direct Inquiry Channels (Default: Email)
  const CHANNELS_DATA = [
    {
      id: 'email',
      name: 'Email Proposals',
      tabLabel: 'Email',
      handle: 'rizkybayus354@gmail.com',
      kicker: 'FORMAL PROPOSALS',
      badge: 'Direct Inbox',
      accent: '#38bdf8',
      accentRgb: '56, 189, 248',
      blurb: 'Send formal project briefs, deliverables specifications, budget estimates, or contract agreements.',
      primaryActionText: 'Compose Email ↗',
      primaryUrl: 'mailto:rizkybayus354@gmail.com?subject=Project%20Inquiry%20via%20Portfolio',
      copyValue: 'rizkybayus354@gmail.com',
      copyLabel: 'Copy Email',
      icon: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      `
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Direct',
      tabLabel: 'WhatsApp',
      handle: '+62 878 0380 9493',
      kicker: 'FAST DIRECT CHAT',
      badge: 'Fastest Response',
      accent: '#25d366',
      accentRgb: '37, 211, 102',
      blurb: 'Direct messaging for rapid scope inquiries, quick discussions, and real-time communication.',
      primaryActionText: 'Chat on WhatsApp ↗',
      primaryUrl: 'https://wa.me/6287803809493',
      copyValue: '+62 878 0380 9493',
      copyLabel: 'Copy Number',
      icon: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 0 1-5.82 2.41c-1.45 0-2.88-.38-4.14-1.11l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.43c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z"/>
        </svg>
      `
    },
    {
      id: 'fiverr',
      name: 'Fiverr Escrow',
      tabLabel: 'Fiverr',
      handle: 'Safe Milestone Orders',
      kicker: 'ESCROW PROTECTION',
      badge: 'Buyer Protected',
      accent: '#1dbf73',
      accentRgb: '29, 191, 115',
      blurb: 'Recommended for international clients requiring escrow-backed milestones, verified payment gateways, and order protection.',
      primaryActionText: 'Order on Fiverr ↗',
      primaryUrl: 'https://www.fiverr.com/s/1EEW6ar',
      copyValue: 'https://www.fiverr.com/s/1EEW6ar',
      copyLabel: 'Copy Link',
      icon: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.003 13.568h-3.238c-.12 0-.214-.094-.214-.213v-.38c0-1.879-1.066-2.92-2.883-2.92-1.929 0-3.048 1.258-3.048 3.323 0 2.138 1.144 3.348 3.143 3.348 1.401 0 2.446-.667 2.825-1.83.024-.072.096-.12.167-.12h3.049c.095 0 .167.072.167.167-.453 2.733-2.738 4.49-6.239 4.49-4.048 0-6.669-2.614-6.669-6.073 0-3.529 2.691-6.143 6.645-6.143 4.144 0 6.36 2.71 6.36 6.096 0 .095-.072.166-.167.166zM7.925 7.425v2.85h-1.57c-.12 0-.215.096-.215.215v3.136c0 .12.095.214.215.214h1.57v5.335c0 .12.095.214.214.214h3.31c.12 0 .214-.095.214-.214v-5.335h2.167c.12 0 .214-.095.214-.214v-3.136c0-.12-.095-.215-.214-.215H11.45v-2.07c0-.976.476-1.428 1.381-1.428.524 0 .952.095 1.286.238.071.024.167-.024.19-.095l1.096-2.524c.048-.095 0-.214-.096-.262-.786-.38-1.786-.548-2.857-.548-2.668 0-4.525 1.57-4.525 4.379z"/>
        </svg>
      `
    },
    {
      id: 'discord',
      name: 'Discord',
      tabLabel: 'Discord',
      handle: 'lamp_y',
      kicker: 'REAL-TIME CREATIVE SYNC',
      badge: 'Live Voice & Sync',
      accent: '#5865f2',
      accentRgb: '88, 101, 242',
      blurb: 'Direct messaging for ongoing design sync, live screen sharing, feedback review sessions, and tech chats.',
      primaryActionText: 'Copy "lamp_y"',
      copyValue: 'lamp_y',
      copyLabel: 'Copy "lamp_y"',
      isCopyOnly: true,
      icon: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      `
    },
    {
      id: 'instagram',
      name: 'Instagram DM',
      tabLabel: 'Instagram',
      handle: '@rizkyby.art · @rizkyby.portfolio',
      kicker: 'DIRECT VISUAL MESSAGES',
      badge: 'Visual Inquiries',
      accent: '#e1306c',
      accentRgb: '225, 48, 108',
      blurb: 'Drop a DM directly on Instagram to discuss visual concepts, custom renders, or artwork commissions.',
      isDualLink: true,
      dualLinks: [
        { label: 'DM Art Profile ↗', url: 'https://www.instagram.com/rizkyby.art/' },
        { label: 'DM Portfolio ↗', url: 'https://www.instagram.com/rizkyby.portfolio/' }
      ],
      icon: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      `
    }
  ];

  // 2. Curated Published Works from Instagram
  const SHOWCASE_WORKS = [
    {
      title: 'UTBK 2026 Motion & Code',
      category: '3D Motion',
      tag: 'Reel',
      url: 'https://www.instagram.com/p/DYw6a_qTa1U/',
      thumb: '1_WMwkBJZ8HK_9L6tj9Tju1nQaQHk5WYY',
      desc: 'Terminal command streams, cyber lighting and rhythmic typography.'
    },
    {
      title: 'Lakeside Sanctuary',
      category: 'Realistic 3D',
      tag: 'Render',
      url: 'https://www.instagram.com/p/DYvvJbXkmjn/',
      thumb: '1zypRz7qBbwYNa9dZe57fUaBZ21spUalM',
      desc: 'Waterside deck bathed in tranquil twilight illumination.'
    },
    {
      title: 'Musholla Above the Clouds',
      category: 'Surrealism',
      tag: 'Dreamscape',
      url: 'https://www.instagram.com/p/C11xXl0B_OF/',
      thumb: '1GX8LSY9fgmtD_EizTKTkGhA48eW6a7JJ',
      desc: 'Serene floating prayer sanctuary among golden hour clouds.'
    },
    {
      title: 'Lounge & Office Finale',
      category: 'Isometric 3D',
      tag: 'Workspace',
      url: 'https://www.instagram.com/p/DH0IoOgyL6g/',
      thumb: '1J6zlCclCzvJdGVXvqnsB_cz2xSI0dMvg',
      desc: 'Detailed personalised farewell workspace closing the series.'
    },
    {
      title: 'Product Motion Showcase',
      category: '3D Motion',
      tag: 'Reel',
      url: 'https://www.instagram.com/p/DMzrefzvxnM/',
      thumb: '1_WMwkBJZ8HK_9L6tj9Tju1nQaQHk5WYY',
      desc: 'Sweeping camera moves, material texture & fluid light.'
    },
    {
      title: 'Blackhole Accretion',
      category: 'Astronomy',
      tag: 'Simulation',
      url: 'https://www.instagram.com/p/C9CVPMnyBRe/',
      thumb: '1V9npfNKz5U6w3T2-UXjkYK_EDN8V9pZ1',
      desc: 'Lensed light accretion disc simulation and galactic depth.'
    },
    {
      title: 'Collapsing Road VFX Sequence',
      category: 'VFX & Dynamics',
      tag: 'Simulation',
      url: 'https://www.instagram.com/p/DMzpw5zPtLg/',
      thumb: '1URq7Kyy2s_8-kCApk_0v6J1rC80egrME',
      desc: 'Roadway fracturing debris simulation with dust dynamics.'
    },
    {
      title: 'Procedural Staircase Generator',
      category: 'Procedural',
      tag: 'Geometry Nodes',
      url: 'https://www.instagram.com/p/DcQsphEy-_1/',
      thumb: '1bzbGobWwoNLVTX8_xG_uMvmC76W9o56B',
      desc: 'Parametric staircase asset generated via Geometry Nodes.'
    },
    {
      title: 'Modern Glass Living Space',
      category: 'Realistic 3D',
      tag: 'Interior',
      url: 'https://www.instagram.com/p/DBh8wNZyH9_/',
      thumb: '1zypRz7qBbwYNa9dZe57fUaBZ21spUalM',
      desc: 'Architectural interior study with soft daylight scattering.'
    },
    {
      title: 'Ramadan 2026 Celebration',
      category: '3D Motion',
      tag: 'Celebration',
      url: 'https://www.instagram.com/p/DVAAJk6FAx0/',
      thumb: '1_WMwkBJZ8HK_9L6tj9Tju1nQaQHk5WYY',
      desc: 'Illuminated crescent geometry & floating ambient golden particles.'
    }
  ];

  // 3. Deliverables / Services Offered
  const SERVICES_DATA = [
    {
      num: '01',
      title: '3D Visualization & CGI',
      subtitle: 'Photoreal Renders & Scenes',
      accent: '#ff9d66',
      accentRgb: '255, 157, 102',
      blurb: 'High-fidelity commercial 3D renderings, product showcases, realistic lighting environments, and scene building.',
      skills: ['Environment Building', 'Photoreal Lighting', 'Composition & Color', 'High-Res Output']
    },
    {
      num: '02',
      title: 'Procedural Shaders & Assets',
      subtitle: 'Production-Grade 3D Assets',
      accent: '#c07bff',
      accentRgb: '192, 123, 255',
      blurb: 'Custom procedural material networks, node shaders, textured models, and optimized Blender asset collections.',
      skills: ['Blender Cycles / Eevee', 'Procedural Node Networks', 'PBR Materials', 'Asset Optimization']
    },
    {
      num: '03',
      title: 'Motion & Visual Snippets',
      subtitle: 'Dynamic Camera & Animation',
      accent: '#00f2fe',
      accentRgb: '0, 242, 254',
      blurb: 'Seamless 3D animation loops, cinematic camera moves, visual social reels, and audio-synced visual shorts.',
      skills: ['Animation Loops', 'Camera Choreography', 'Render Compositing', 'Video Deliverables']
    },
    {
      num: '04',
      title: 'Creative Frontend Engineering',
      subtitle: 'Interactive Web Experiences',
      accent: '#3fb950',
      accentRgb: '63, 185, 80',
      blurb: 'Performant web interfaces, glassmorphic UI systems, interactive canvas widgets, and responsive portfolio frontends.',
      skills: ['Vanilla JS / TypeScript', 'Performant CSS Systems', 'Canvas Graphics', 'Responsive Architecture']
    }
  ];

  // 4. Workflow Steps
  const WORKFLOW_STEPS = [
    {
      step: '01',
      title: 'Brief & Scope Alignment',
      blurb: 'We discuss your project goals, references, deliverable formats, resolution specs, and realistic deadline targets.',
      tag: 'Kickoff'
    },
    {
      step: '02',
      title: 'Blockout & Draft Preview',
      blurb: 'Early composition blockouts, lighting tests, or wireframe prototypes are shared to validate artistic direction early.',
      tag: 'Exploration'
    },
    {
      step: '03',
      title: 'Refinement & Feedback',
      blurb: 'High-resolution shading, texturing, detail polishing, and iterative revisions based on your structured feedback.',
      tag: 'Iteration'
    },
    {
      step: '04',
      title: 'Final Master Handoff',
      blurb: 'Complete delivery of master source files (.blend, PBR textures, high-bitrate renders, or clean code repository).',
      tag: 'Delivery'
    }
  ];

  // 5. Working Principles & Commitments
  const PRINCIPLES_DATA = [
    {
      title: 'Transparent Iterations',
      desc: 'Structured revision rounds are baked into every milestone so the final artwork matches your exact vision.'
    },
    {
      title: 'Clean Source Files',
      desc: 'All delivered assets include organized layers, clean node setups, and uncompressed production renders.'
    },
    {
      title: 'Flexible Milestones',
      desc: 'Order securely via Fiverr escrow protection, or via staged direct invoice milestones based on mutual agreement.'
    }
  ];

  let currentTabId = 'email';

  /* Helper to copy text without blocking prompt */
  async function copyTextToClipboard(text, btnEl, originalLabel) {
    let success = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch (_) {}

    if (!success) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        success = true;
      } catch (_) {}
    }

    const label = btnEl.querySelector('.btn-copy-label');
    if (label) label.textContent = 'Copied to clipboard! ✓';
    btnEl.classList.add('is-copied');

    setTimeout(() => {
      if (label) label.textContent = originalLabel;
      btnEl.classList.remove('is-copied');
    }, 2200);
  }

  /* Render Tab Content inside the Single Card */
  function renderActiveChannelContent(c) {
    const badgeHtml = c.badge
      ? `<span class="connect-badge" style="border-color: rgba(${c.accentRgb}, 0.28); color: ${c.accent}; background: rgba(${c.accentRgb}, 0.08);">${escapeHtml(c.badge)}</span>`
      : '';

    let actionsHtml = '';
    if (c.isDualLink) {
      actionsHtml = `
        <div class="hire-dual-actions">
          ${c.dualLinks.map(l => `
            <a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer" class="connect-action-btn hire-sub-btn">
              <span>${escapeHtml(l.label)}</span>
            </a>
          `).join('')}
        </div>
      `;
    } else if (c.isCopyOnly) {
      actionsHtml = `
        <div class="connect-card-action-wrap">
          <button class="connect-action-btn hire-copy-btn" data-copy="${escapeHtml(c.copyValue)}" data-label="${escapeHtml(c.copyLabel)}" type="button" aria-label="Copy ${escapeHtml(c.name)}">
            <svg class="btn-copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span class="btn-copy-label">${escapeHtml(c.copyLabel)}</span>
          </button>
        </div>
      `;
    } else {
      actionsHtml = `
        <div class="hire-split-actions">
          <a href="${escapeHtml(c.primaryUrl)}" target="_blank" rel="noopener noreferrer" class="connect-action-btn hire-primary-action">
            <span>${escapeHtml(c.primaryActionText)}</span>
          </a>
          <button class="connect-action-btn hire-copy-btn" data-copy="${escapeHtml(c.copyValue)}" data-label="${escapeHtml(c.copyLabel)}" type="button" aria-label="Copy ${escapeHtml(c.name)} details">
            <svg class="btn-copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span class="btn-copy-label">${escapeHtml(c.copyLabel)}</span>
          </button>
        </div>
      `;
    }

    return `
      <div class="hire-channel-body" style="--card-accent: ${c.accent}; --card-accent-rgb: ${c.accentRgb};">
        <header class="connect-card-header">
          <div class="connect-kicker" style="color: ${c.accent};">
            ${c.icon}
            <span>${escapeHtml(c.kicker)}</span>
          </div>
          <div class="connect-brand-row">
            <h3 class="connect-card-title">${escapeHtml(c.name)}</h3>
            ${badgeHtml}
          </div>
          <span class="connect-card-handle">${escapeHtml(c.handle)}</span>
        </header>
        <p class="connect-card-blurb">${escapeHtml(c.blurb)}</p>
        <div class="hire-channel-action-box">
          ${actionsHtml}
        </div>
      </div>
    `;
  }

  /* Render Single Card with 5 Toggles */
  function renderSingleToggleCard() {
    const activeChannel = CHANNELS_DATA.find(c => c.id === currentTabId) || CHANNELS_DATA[0];

    const togglesHtml = CHANNELS_DATA.map(c => `
      <button class="hire-toggle-btn ${c.id === currentTabId ? 'active' : ''}" data-tab="${escapeHtml(c.id)}" type="button" style="--tab-accent: ${c.accent}; --tab-accent-rgb: ${c.accentRgb};" aria-label="Switch to ${escapeHtml(c.name)}">
        <span class="hire-toggle-icon">${c.icon}</span>
        <span class="hire-toggle-name">${escapeHtml(c.tabLabel)}</span>
      </button>
    `).join('');

    return `
      <article class="hire-compact-card" id="hire-compact-card" style="--card-accent: ${activeChannel.accent}; --card-accent-rgb: ${activeChannel.accentRgb};">
        <!-- 5 Toggles Pill Bar -->
        <nav class="hire-toggles-bar" aria-label="Contact channels toggle">
          ${togglesHtml}
        </nav>
        <!-- Active Channel Content -->
        <div class="hire-channel-container" id="hire-channel-container">
          ${renderActiveChannelContent(activeChannel)}
        </div>
      </article>
    `;
  }

  /* Render Single Showcase Card */
  function renderShowcaseCard(item) {
    const thumbUrl = `https://drive.google.com/thumbnail?id=${item.thumb}&sz=w600`;
    return `
      <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="hire-showcase-card" aria-label="${escapeHtml(item.title)} on Instagram">
        <div class="hire-showcase-media">
          <img src="${thumbUrl}" alt="${escapeHtml(item.title)}" loading="lazy" class="hire-showcase-img" />
          <div class="hire-showcase-overlay"></div>
          <span class="hire-showcase-badge">${escapeHtml(item.category)}</span>
        </div>
        <div class="hire-showcase-info">
          <h4 class="hire-showcase-title">${escapeHtml(item.title)}</h4>
          <p class="hire-showcase-desc">${escapeHtml(item.desc)}</p>
          <div class="hire-showcase-cta">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>View on Instagram ↗</span>
          </div>
        </div>
      </a>
    `;
  }

  /* Render Service Card */
  function renderServiceCard(s) {
    return `
      <article class="hire-service-card" style="--card-accent: ${s.accent}; --card-accent-rgb: ${s.accentRgb};">
        <div class="hire-service-header">
          <span class="hire-service-num">${escapeHtml(s.num)}</span>
          <span class="hire-service-subtitle" style="color: ${s.accent};">${escapeHtml(s.subtitle)}</span>
        </div>
        <h3 class="hire-service-title">${escapeHtml(s.title)}</h3>
        <p class="hire-service-blurb">${escapeHtml(s.blurb)}</p>
        <div class="hire-service-tags">
          ${s.skills.map(k => `<span class="hire-service-tag">${escapeHtml(k)}</span>`).join('')}
        </div>
      </article>
    `;
  }

  /* Render Workflow Step */
  function renderWorkflowStep(st) {
    return `
      <div class="hire-step-item">
        <div class="hire-step-top">
          <span class="hire-step-index">${escapeHtml(st.step)}</span>
          <span class="hire-step-tag">${escapeHtml(st.tag)}</span>
        </div>
        <h4 class="hire-step-title">${escapeHtml(st.title)}</h4>
        <p class="hire-step-desc">${escapeHtml(st.blurb)}</p>
      </div>
    `;
  }

  /* Bind Interactions for Toggles and Copy Buttons */
  function bindInteractions(container) {
    // 1. Toggles
    const toggleBtns = container.querySelectorAll('.hire-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = btn.getAttribute('data-tab');
        if (!tabId || tabId === currentTabId) return;

        currentTabId = tabId;
        const targetChannel = CHANNELS_DATA.find(c => c.id === currentTabId);
        if (!targetChannel) return;

        // Update toggle active class
        toggleBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === currentTabId));

        // Update card accent variables and channel content
        const cardEl = document.getElementById('hire-compact-card');
        if (cardEl) {
          cardEl.style.setProperty('--card-accent', targetChannel.accent);
          cardEl.style.setProperty('--card-accent-rgb', targetChannel.accentRgb);
        }

        const contentEl = document.getElementById('hire-channel-container');
        if (contentEl) {
          contentEl.innerHTML = renderActiveChannelContent(targetChannel);
          // Re-bind copy buttons inside the updated content
          bindCopyButtons(contentEl);
        }
      });
    });

    // 2. Initial copy buttons
    bindCopyButtons(container);
  }

  function bindCopyButtons(root) {
    root.querySelectorAll('.hire-copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const text = btn.getAttribute('data-copy') || '';
        const origLabel = btn.getAttribute('data-label') || 'Copy';
        copyTextToClipboard(text, btn, origLabel);
      });
    });
  }

  /* Main Hire View Render Function */
  function renderHire() {
    const container = document.getElementById('hire-content');
    if (!container) return;

    // Build repeated track for seamless marquee
    const showcaseCardsHtml = SHOWCASE_WORKS.map(renderShowcaseCard).join('');
    const servicesHtml = SERVICES_DATA.map(renderServiceCard).join('');
    const workflowHtml = WORKFLOW_STEPS.map(renderWorkflowStep).join('');
    const principlesHtml = PRINCIPLES_DATA.map(p => `
      <div class="hire-principle-card">
        <h4 class="hire-principle-title">${escapeHtml(p.title)}</h4>
        <p class="hire-principle-desc">${escapeHtml(p.desc)}</p>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="hire-overview-content">
        <!-- Hero Header -->
        <header class="hire-hero-head">
          <div class="hire-hero-kicker">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>CLIENT ONBOARDING · COMMISSIONS & FREELANCE</span>
          </div>
          <h2 class="hire-hero-title">LET'S BUILD TOGETHER</h2>
          <p class="hire-hero-blurb">Open for select 3D visualization commissions, procedural asset creation, motion loops, and creative web engineering.</p>

          <!-- Live Availability Status Strip -->
          <div class="hire-status-strip">
            <div class="hire-status-pill">
              <span class="hire-status-dot"></span>
              <span class="hire-status-text">AVAILABLE FOR COMMISSIONS</span>
            </div>
            <div class="hire-status-meta">
              <span class="hire-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Indonesia (UTC+7 / WIB)</span>
              </span>
              <span class="hire-meta-sep">/</span>
              <span class="hire-meta-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Avg. Reply: &lt; 24h</span>
              </span>
            </div>
          </div>
        </header>

        <!-- Section 1: Compact Single Card with 5 Toggles (Default: Email) -->
        <section class="hire-section" aria-label="Direct Inquiry Channels">
          <div class="hire-section-kicker">
            <span>// DIRECT INQUIRIES & COMMISSIONS</span>
          </div>
          <div class="hire-compact-wrapper">
            ${renderSingleToggleCard()}
          </div>
        </section>

        <!-- Section 2: Horizontal Auto-Scrolling Instagram Works Showcase -->
        <section class="hire-section" aria-label="Selected Works Showcase">
          <div class="hire-showcase-head-row">
            <div class="hire-section-kicker">
              <span>// VISUAL REPERTOIRE · LIVE WORKS FROM INSTAGRAM</span>
            </div>
            <span class="hire-marquee-hint">Hover to pause · Click card to open on Instagram</span>
          </div>
          <div class="hire-marquee-wrapper" id="hire-marquee-wrapper">
            <div class="hire-marquee-track">
              ${showcaseCardsHtml}
              ${showcaseCardsHtml}
            </div>
          </div>
        </section>

        <!-- Section 3: Core Services Delivered -->
        <section class="hire-section" aria-label="Services Offered">
          <div class="hire-section-kicker">
            <span>// SERVICES & DELIVERABLES</span>
          </div>
          <div class="hire-services-grid">
            ${servicesHtml}
          </div>
        </section>

        <!-- Section 4: Collaboration Process Roadmap -->
        <section class="hire-section" aria-label="Collaboration Process">
          <div class="hire-section-kicker">
            <span>// HOW WE WORK TOGETHER</span>
          </div>
          <div class="hire-workflow-grid">
            ${workflowHtml}
          </div>
        </section>

        <!-- Section 5: Working Principles & Terms -->
        <section class="hire-section" aria-label="Working Principles">
          <div class="hire-section-kicker">
            <span>// WORKING PRINCIPLES & COMMITMENTS</span>
          </div>
          <div class="hire-principles-grid">
            ${principlesHtml}
          </div>
        </section>
      </div>
    `;

    bindInteractions(container);
  }

  // Mount on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHire);
  } else {
    renderHire();
  }

  window.renderHire = renderHire;
})();

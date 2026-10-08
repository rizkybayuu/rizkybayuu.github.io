/**
 * rizkyby.web - Connect & Social Channels Controller
 * Renders social media hubs (unified Instagram 3-profile card, YouTube, TikTok, Discord)
 * and creative/developer platforms (GitHub, BlenderKit, Shutterstock, Fiverr)
 * with bare glassmorphism cards, glowing brand accents, and copy interaction.
 */

(() => {
  'use strict';

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Instagram Unified 3 Profiles
  const INSTAGRAM_DATA = {
    brand: 'Instagram',
    accent: '#e1306c',
    accentRgb: '225, 48, 108',
    title: 'Instagram Profiles',
    kicker: 'SOCIAL PROFILES · 3 ACCOUNTS',
    blurb: 'Three separate Instagram profiles dedicated to 3D artwork, portfolio showcases, and personal life.',
    profiles: [
      {
        id: 'ig-art',
        name: 'Art & 3D Creations',
        handle: '@rizkyby.art',
        role: '3D & Digital Art',
        url: 'https://www.instagram.com/rizkyby.art/',
        accent: '#ff6496',
        accentRgb: '255, 100, 150',
        blurb: '3D artwork explorations, renders, and visual experiments.',
        icon: `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
        `
      },
      {
        id: 'ig-portfolio',
        name: 'Curated Works',
        handle: '@rizkyby.portfolio',
        role: 'Curated Portfolio',
        url: 'https://www.instagram.com/rizkyby.portfolio/',
        accent: '#c07bff',
        accentRgb: '192, 123, 255',
        blurb: 'Curated portfolio of selected design and creative projects.',
        icon: `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        `
      },
      {
        id: 'ig-personal',
        name: 'Personal Space',
        handle: '@rizbayuu_',
        role: 'Personal Account',
        url: 'https://www.instagram.com/rizbayuu_/',
        accent: '#ff9d66',
        accentRgb: '255, 157, 102',
        blurb: 'Personal profile, daily moments, and casual updates.',
        icon: `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        `
      }
    ]
  };

  // Standalone Social Media Channels (YouTube, TikTok, Discord)
  const SOCIAL_CHANNELS = [
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@rizky_bayuu',
      kicker: 'VIDEO CONTENT',
      badge: 'Videos & Content',
      url: 'https://www.youtube.com/@rizky_bayuu',
      accent: '#ff0000',
      accentRgb: '255, 0, 0',
      blurb: 'Video uploads, animations, and creative visual content.',
      actionText: 'Open YouTube ↗',
      icon: `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      `
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@rizkybayu354',
      kicker: 'SHORT VIDEOS',
      badge: 'Creative Clips',
      url: 'https://www.tiktok.com/@rizkybayu354',
      accent: '#00f2fe',
      accentRgb: '0, 242, 254',
      blurb: 'Short videos, creative snippets, and visual clips.',
      actionText: 'Open TikTok ↗',
      icon: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 10.82 4.48c1.23-1.23 1.9-2.88 1.9-4.57V8.71a8.28 8.28 0 0 0 4.87 1.57V6.83a4.84 4.84 0 0 1-2-.14z"/>
        </svg>
      `
    },
    {
      id: 'discord',
      name: 'Discord',
      handle: 'lamp_y',
      kicker: 'DIRECT MESSAGING',
      badge: 'Chat & Connect',
      isDiscord: true,
      accent: '#5865f2',
      accentRgb: '88, 101, 242',
      blurb: 'Direct messaging for chats, discussions, and collaborations.',
      actionText: 'Copy Username',
      icon: `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      `
    }
  ];

  // Creative & Marketplace Platforms (GitHub, BlenderKit, Shutterstock)
  const PLATFORMS_DATA = [
    {
      id: 'github',
      name: 'GitHub',
      handle: '@rizkybayuu',
      kicker: 'OPEN SOURCE & CODE',
      badge: 'Code Repositories',
      url: 'https://github.com/rizkybayuu',
      accent: '#3fb950',
      accentRgb: '63, 185, 80',
      blurb: 'Code repositories, web development, and software projects.',
      actionText: 'View GitHub ↗',
      icon: `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      `
    },
    {
      id: 'blendkit',
      name: 'BlenderKit',
      handle: 'Author ID: 1305503',
      kicker: '3D ASSET STORE',
      badge: 'Blender 3D Models',
      url: 'https://www.blendkit.com/?query=author_id:1305503',
      accent: '#ea7600',
      accentRgb: '234, 118, 0',
      blurb: '3D models, procedural shaders, and Blender asset collection.',
      actionText: 'Browse Assets ↗',
      icon: `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      `
    },
    {
      id: 'shutterstock',
      name: 'Shutterstock',
      handle: '@rizkybayuu',
      kicker: 'COMMERCIAL STOCK',
      badge: 'Stock CGI & Imagery',
      url: 'https://www.shutterstock.com/g/rizkybayuu',
      accent: '#ee2b24',
      accentRgb: '238, 43, 36',
      blurb: 'Stock imagery, CGI renders, and commercial visual assets.',
      actionText: 'View Portfolio ↗',
      icon: `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
          <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
          <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
          <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
          <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
          <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
        </svg>
      `
    }
  ];

  // Freelance Platform (Fiverr - Standard Card)
  const FIVERR_DATA = {
    id: 'fiverr',
    name: 'Fiverr',
    handle: 'Direct Gigs & Custom Orders',
    kicker: 'FREELANCE SERVICES',
    badge: 'Freelance & Orders',
    url: 'https://www.fiverr.com/s/1EEW6ar',
    accent: '#1dbf73',
    accentRgb: '29, 191, 115',
    blurb: 'Freelance services, custom commissions, and project orders.',
    actionText: 'Order on Fiverr ↗',
    icon: `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.003 13.568h-3.238c-.12 0-.214-.094-.214-.213v-.38c0-1.879-1.066-2.92-2.883-2.92-1.929 0-3.048 1.258-3.048 3.323 0 2.138 1.144 3.348 3.143 3.348 1.401 0 2.446-.667 2.825-1.83.024-.072.096-.12.167-.12h3.049c.095 0 .167.072.167.167-.453 2.733-2.738 4.49-6.239 4.49-4.048 0-6.669-2.614-6.669-6.073 0-3.529 2.691-6.143 6.645-6.143 4.144 0 6.36 2.71 6.36 6.096 0 .095-.072.166-.167.166zM7.925 7.425v2.85h-1.57c-.12 0-.215.096-.215.215v3.136c0 .12.095.214.215.214h1.57v5.335c0 .12.095.214.214.214h3.31c.12 0 .214-.095.214-.214v-5.335h2.167c.12 0 .214-.095.214-.214v-3.136c0-.12-.095-.215-.214-.215H11.45v-2.07c0-.976.476-1.428 1.381-1.428.524 0 .952.095 1.286.238.071.024.167-.024.19-.095l1.096-2.524c.048-.095 0-.214-.096-.262-.786-.38-1.786-.548-2.857-.548-2.668 0-4.525 1.57-4.525 4.379z"/>
      </svg>
    `
  };

  /* Render Instagram Sub-profile */
  function renderIgProfile(p) {
    return `
      <a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer" class="connect-ig-profile-item" style="--profile-accent: ${p.accent}; --profile-accent-rgb: ${p.accentRgb};" aria-label="Instagram profile ${p.handle}">
        <div class="connect-ig-prof-top">
          <div class="connect-ig-prof-avatar" style="color: ${p.accent}; background: rgba(${p.accentRgb}, 0.12); border-color: rgba(${p.accentRgb}, 0.25);">
            ${p.icon}
          </div>
          <div class="connect-ig-prof-titlegroup">
            <span class="connect-ig-prof-name">${escapeHtml(p.name)}</span>
            <span class="connect-ig-prof-handle">${escapeHtml(p.handle)}</span>
          </div>
          <span class="connect-ig-prof-arrow">↗</span>
        </div>
        <span class="connect-ig-prof-role" style="color: ${p.accent};">${escapeHtml(p.role)}</span>
        <p class="connect-ig-prof-blurb">${escapeHtml(p.blurb)}</p>
        <span class="connect-ig-prof-action">Visit ${escapeHtml(p.handle)} ↗</span>
      </a>
    `;
  }

  /* Render Standard Card */
  function renderStandardCard(c, extraClass = '') {
    const classAttr = extraClass ? `connect-card ${extraClass}` : 'connect-card';
    const badgeHtml = c.badge
      ? `<span class="connect-badge" style="border-color: rgba(${c.accentRgb}, 0.28); color: ${c.accent}; background: rgba(${c.accentRgb}, 0.08);">${escapeHtml(c.badge)}</span>`
      : '';

    if (c.isDiscord) {
      return `
        <article class="${classAttr} connect-card-discord" style="--card-accent: ${c.accent}; --card-accent-rgb: ${c.accentRgb};">
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
          <div class="connect-card-action-wrap">
            <button class="connect-action-btn connect-copy-btn" id="btn-copy-discord" data-copy="lamp_y" type="button" aria-label="Copy Discord username lamp_y">
              <svg class="btn-copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span class="btn-copy-label">Copy "lamp_y"</span>
            </button>
          </div>
        </article>
      `;
    }

    return `
      <article class="${classAttr}" style="--card-accent: ${c.accent}; --card-accent-rgb: ${c.accentRgb};">
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
        <div class="connect-card-action-wrap">
          <a href="${escapeHtml(c.url)}" target="_blank" rel="noopener noreferrer" class="connect-action-btn">
            <span>${escapeHtml(c.actionText)}</span>
          </a>
        </div>
      </article>
    `;
  }

  function renderConnect() {
    const container = document.getElementById('connect-grid');
    if (!container) return;

    const igProfilesHtml = INSTAGRAM_DATA.profiles.map(renderIgProfile).join('');
    const socialCardsHtml = SOCIAL_CHANNELS.map(renderStandardCard).join('');
    const platformCardsHtml = PLATFORMS_DATA.map(renderStandardCard).join('');

    container.innerHTML = `
      <div class="connect-overview-content">
        <!-- Global Header -->
        <header class="connect-hero-head">
          <div class="connect-hero-kicker">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>SHOWCASE · GLOBAL NETWORK</span>
          </div>
          <h2 class="connect-hero-title">WHERE TO FIND ME</h2>
          <p class="connect-hero-blurb">Verified profiles across social channels, video streaming, Discord messaging, and digital 3D & developer marketplaces.</p>
        </header>

        <!-- Section 1: Social Media Hub -->
        <section class="connect-section" aria-label="Social Media Channels">
          <div class="connect-section-kicker">
            <span>// SOCIAL CHANNELS & PROFILES</span>
          </div>

          <!-- Unified Instagram 3-Profile Card -->
          <article class="connect-card connect-card-instagram">
            <header class="connect-ig-header">
              <div class="connect-ig-title-wrap">
                <div class="connect-ig-icon-badge">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div class="connect-ig-titles">
                  <div class="connect-kicker" style="color: #e1306c;">
                    <span>${escapeHtml(INSTAGRAM_DATA.kicker)}</span>
                  </div>
                  <h3 class="connect-card-title">${escapeHtml(INSTAGRAM_DATA.title)}</h3>
                </div>
              </div>
              <p class="connect-ig-main-blurb">${escapeHtml(INSTAGRAM_DATA.blurb)}</p>
            </header>

            <div class="connect-ig-profiles-grid">
              ${igProfilesHtml}
            </div>
          </article>

          <!-- 3-Column Grid for YouTube, TikTok, Discord -->
          <div class="connect-grid-3">
            ${socialCardsHtml}
          </div>
        </section>

        <!-- Section 2: Creator & Developer Hubs -->
        <section class="connect-section" aria-label="Creator & Developer Platforms">
          <div class="connect-section-kicker">
            <span>// CREATOR HUBS & PLATFORMS</span>
          </div>
          <!-- 3 Columns: 3 cards in row 1, 1 centered card in row 2 -->
          <div class="connect-grid-3">
            ${platformCardsHtml}
            ${renderStandardCard(FIVERR_DATA, 'connect-card-center')}
          </div>
        </section>
      </div>
    `;

    // Bind Discord copy username interaction
    const copyBtn = document.getElementById('btn-copy-discord');
    if (copyBtn) {
      let resetTimer = null;
      copyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const copyText = copyBtn.getAttribute('data-copy') || 'lamp_y';
        let success = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(copyText);
            success = true;
          }
        } catch (_) {}

        if (!success) {
          try {
            const ta = document.createElement('textarea');
            ta.value = copyText;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          } catch (_) {}
        }

        const label = copyBtn.querySelector('.btn-copy-label');
        if (label) label.textContent = 'Copied to clipboard! ✓';
        copyBtn.classList.add('is-copied');

        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          if (label) label.textContent = `Copy "${copyText}"`;
          copyBtn.classList.remove('is-copied');
        }, 2200);
      });
    }
  }

  // Mount on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderConnect);
  } else {
    renderConnect();
  }

  window.renderConnect = renderConnect;
})();

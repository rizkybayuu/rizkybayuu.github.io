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

  /* Render: skill bar with progress */
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

  /* Craft section */
  function renderCraft() {
    let html = '<section class="skills-craft"><h2>Craft Skills</h2><div class="craft-categories">';
    CRAFT_FIELDS.forEach((field) => {
      const svc = field.service ? ' data-service="true"' : '';
      html += `<div class="craft-category"${svc} style="${cardStyle(field.accent)}">`;
      html += `<h3>${escapeHtml(field.title)}</h3>`;
      field.skills.forEach(skill => html += renderBar(skill.score, skill.name));
      html += '</div>';
    });
    html += '</div></section>';
    return html;
  }

  /* Software section */
  function renderSoftware() {
    let html = '<section class="skills-software"><h2>Software & Tools</h2><div class="software-categories">';
    SOFTWARE_GROUPS.forEach((group) => {
      html += `<div class="software-category" style="${cardStyle(group.accent)}">`;
      html += `<h3>${escapeHtml(group.title)}</h3>`;
      group.tools.forEach(tool => html += renderBar(tool.score, tool.name));
      html += '</div>';
    });
    html += '</div></section>';
    return html;
  }

  /* Typing section */
  function renderTyping() {
    let html = '<section class="skills-tools"><h2>Typing & Input</h2><div class="tools-category" style="' + cardStyle('#ff6f5e') + '">';
    html += '<h3>Touch Typing</h3>';
    TOOLS.forEach(tool => {
      html += `
        <div class="skill-bar">
          <div class="skill-bar-header">
            <span class="skill-bar-name">${escapeHtml(tool.name)}</span>
            <div class="skill-bar-meta">
              <span class="skill-bar-wpm">${tool.wpm} WPM</span>
            </div>
          </div>
        </div>`;
    });
    html += '</div></section>';
    return html;
  }

  /* Languages section */
  function renderLanguages() {
    let html = '<section class="skills-languages"><h2>Languages</h2><div class="languages-category" style="' + cardStyle('#9aa6ff') + '">';
    html += '<h3>Spoken & Written</h3>';
    LANGUAGES.forEach(lang => {
      const pct = lang.score;
      html += `
        <div class="skill-bar">
          <div class="skill-bar-header">
            <span class="skill-bar-name">${escapeHtml(lang.name)}</span>
            <div class="skill-bar-meta">
              <span class="skill-bar-level" data-level="${lang.level.toLowerCase()}">${lang.level}</span>
              <span class="skill-bar-score">${lang.score}</span>
            </div>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" style="width: ${pct}%"></div>
          </div>
        </div>`;
    });
    html += '</div></section>';
    return html;
  }

  /* Main render */
  function renderSkills() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.innerHTML = renderCraft() + renderSoftware() + renderTyping() + renderLanguages();
    const meta = document.querySelector('.skills-meta');
    if (meta) meta.style.display = 'none';
  }

  window.RIZKYBY_SKILLS = {
    craft: CRAFT_FIELDS, software: SOFTWARE_GROUPS, tools: TOOLS, languages: LANGUAGES,
    levelOf, render: renderSkills
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSkills);
  } else {
    renderSkills();
  }
})();

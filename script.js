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

  window.addEventListener('pointermove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

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

    // Ease-in-out typewriter step for text 2
    function typeStep() {
      if (charIdx <= len) {
        textTitle.textContent = currentWord.slice(0, charIdx);
        charIdx++;

        if (charIdx <= len) {
          // Progress from 0.0 to 1.0
          const progress = charIdx / len;
          // Sine curve: 0 at start, 1 at mid, 0 at end
          const curve = Math.sin(progress * Math.PI);
          // Slower at edges (ease-in & ease-out), faster in middle
          const delay = 155 - curve * 95;
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
     4. Sequence Bootstrap
     -------------------------------------------------------------------------- */
  window.addEventListener('DOMContentLoaded', () => {
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

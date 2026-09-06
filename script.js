/* ═══════════════════════════════════════════════════════════════════════════
   SKILL FINDER — Interactive Features
   - Particle Background
   - Confetti Celebration
   - Skill Match Swipeable Cards
   - Interactive Skill Map
   - Cursor Glow
   - Scroll Animations
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────────────────────────
     1. PARTICLE BACKGROUND
     ───────────────────────────────────────────────────────────────────────── */
  const particleCanvas = document.getElementById('particleCanvas');
  const particleCtx = particleCanvas.getContext('2d');
  let particles = [];
  let mouseX = 0;
  let mouseY = 0;

  function resizeParticleCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.hue = Math.random() * 60 + 220; // Blue to purple range
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse interaction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150;
        this.x -= dx * force * 0.02;
        this.y -= dy * force * 0.02;
      }

      // Wrap around screen
      if (this.x < 0) this.x = particleCanvas.width;
      if (this.x > particleCanvas.width) this.x = 0;
      if (this.y < 0) this.y = particleCanvas.height;
      if (this.y > particleCanvas.height) this.y = 0;
    }

    draw() {
      particleCtx.beginPath();
      particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      particleCtx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
      particleCtx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((particleCanvas.width * particleCanvas.height) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          particleCtx.beginPath();
          particleCtx.moveTo(particles[i].x, particles[i].y);
          particleCtx.lineTo(particles[j].x, particles[j].y);
          particleCtx.strokeStyle = `rgba(102, 126, 234, ${0.15 * (1 - dist / 120)})`;
          particleCtx.lineWidth = 1;
          particleCtx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    drawConnections();
    requestAnimationFrame(animateParticles);
  }

  resizeParticleCanvas();
  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeParticleCanvas();
    initParticles();
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* ─────────────────────────────────────────────────────────────────────────
     2. CONFETTI CELEBRATION
     ───────────────────────────────────────────────────────────────────────── */
  const confettiCanvas = document.getElementById('confettiCanvas');
  const confettiCtx = confettiCanvas.getContext('2d');
  let confettiPieces = [];
  let confettiAnimationId = null;

  function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  const confettiColors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#43e97b', '#fa709a', '#fee140'
  ];

  class ConfettiPiece {
    constructor() {
      this.x = Math.random() * confettiCanvas.width;
      this.y = -20;
      this.size = Math.random() * 8 + 4;
      this.speedY = Math.random() * 3 + 2;
      this.speedX = (Math.random() - 0.5) * 4;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 10;
      this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      this.opacity = 1;
      this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
      this.speedY += 0.1; // gravity

      // Fade out near bottom
      if (this.y > confettiCanvas.height - 100) {
        this.opacity -= 0.02;
      }
    }

    draw() {
      confettiCtx.save();
      confettiCtx.translate(this.x, this.y);
      confettiCtx.rotate((this.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = this.opacity;
      confettiCtx.fillStyle = this.color;

      if (this.shape === 'rect') {
        confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      } else {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        confettiCtx.fill();
      }

      confettiCtx.restore();
    }
  }

  function launchConfetti(duration = 3000) {
    resizeConfettiCanvas();
    confettiPieces = [];

    // Create initial burst
    for (let i = 0; i < 150; i++) {
      const piece = new ConfettiPiece();
      piece.y = Math.random() * confettiCanvas.height * 0.5;
      confettiPieces.push(piece);
    }

    const startTime = Date.now();

    function animateConfetti() {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

      confettiPieces = confettiPieces.filter(p => p.opacity > 0 && p.y < confettiCanvas.height + 50);

      confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
      });

      if (Date.now() - startTime < duration || confettiPieces.length > 0) {
        confettiAnimationId = requestAnimationFrame(animateConfetti);
      }
    }

    animateConfetti();
  }

  window.addEventListener('resize', resizeConfettiCanvas);

  /* ─────────────────────────────────────────────────────────────────────────
     3. CURSOR GLOW EFFECT
     ───────────────────────────────────────────────────────────────────────── */
  const cursorGlow = document.getElementById('cursorGlow');

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
  });

  /* ─────────────────────────────────────────────────────────────────────────
     4. NAVIGATION SCROLL EFFECT
     ───────────────────────────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  /* ─────────────────────────────────────────────────────────────────────────
     5. SMOOTH SCROLL FOR NAV LINKS
     ───────────────────────────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ─────────────────────────────────────────────────────────────────────────
     6. SCROLL-TRIGGERED FADE-IN ANIMATIONS
     ───────────────────────────────────────────────────────────────────────── */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  /* ─────────────────────────────────────────────────────────────────────────
     7. PIPELINE STEP ANIMATIONS
     ───────────────────────────────────────────────────────────────────────── */
  const pipelineSteps = document.querySelectorAll('.pipeline-step');

  const pipelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 200);
      }
    });
  }, { threshold: 0.3 });

  pipelineSteps.forEach(step => pipelineObserver.observe(step));

  /* ─────────────────────────────────────────────────────────────────────────
     8. COUNTER ANIMATION (Stats)
     ───────────────────────────────────────────────────────────────────────── */
  const statValues = document.querySelectorAll('.stat-value');

  const animateCounter = (el, target) => {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(start + (target - start) * easeProgress);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => counterObserver.observe(el));

  /* ─────────────────────────────────────────────────────────────────────────
     9. COPY TO CLIPBOARD
     ───────────────────────────────────────────────────────────────────────── */
  window.copyCommand = function() {
    const command = 'npx skills add sanyamk23/skill-finder -g -y';
    const btn = document.getElementById('copyBtn');

    navigator.clipboard.writeText(command).then(() => {
      btn.classList.add('copied');
      btn.querySelector('span').textContent = 'Copied!';

      setTimeout(() => {
        btn.classList.remove('copied');
        btn.querySelector('span').textContent = 'Copy';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  /* ─────────────────────────────────────────────────────────────────────────
     10. INSTALL BUTTON WITH CONFETTI
     ───────────────────────────────────────────────────────────────────────── */
  window.celebrateInstall = function() {
    const btn = document.getElementById('installBtn');

    // Launch confetti
    launchConfetti(4000);

    // Animate button
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = 'scale(1.05)';
      btn.innerHTML = '<span>Installed! 🎉</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    }, 150);

    setTimeout(() => {
      btn.style.transform = '';
    }, 300);
  };

  /* ─────────────────────────────────────────────────────────────────────────
     11. SKILL MATCH INTERACTIVE
     ───────────────────────────────────────────────────────────────────────── */

  // Demo skill database
  const skillDatabase = {
    presentations: [
      { name: 'presentation-creator', owner: 'googleworkspace/cli', installs: 29000, desc: 'Create Google Slides presentations', icon: '📊' },
      { name: 'slide-design', owner: 'design-co', installs: 8500, desc: 'Beautiful slide designs', icon: '🎨' },
      { name: 'pitch-deck', owner: 'startup-tools', installs: 4200, desc: 'Startup pitch deck generator', icon: '🚀' },
      { name: 'animations', owner: 'motion-co', installations: 6800, desc: 'Add animations to slides', icon: '✨' },
    ],
    testing: [
      { name: 'vitest-testing', owner: 'vitest-dev', installs: 15000, desc: 'Blazing fast unit testing', icon: '⚡' },
      { name: 'playwright-e2e', owner: 'microsoft', installs: 12000, desc: 'End-to-end testing', icon: '🎭' },
      { name: 'jest-unit', owner: 'facebook', installs: 8000, desc: 'Delightful JavaScript testing', icon: '🃏' },
      { name: 'cypress', owner: 'cypress-io', installs: 9500, desc: 'Fast, easy testing', icon: '🌲' },
    ],
    react: [
      { name: 'react-components', owner: 'google-labs', installs: 50700, desc: 'Transform designs to React', icon: '⚛️' },
      { name: 'react-hooks', owner: 'react-team', installs: 22000, desc: 'Custom React hooks', icon: '🪝' },
      { name: 'react-patterns', owner: 'dan-abramov', installs: 18000, desc: 'Advanced React patterns', icon: '🧩' },
      { name: 'nextjs', owner: 'vercel', installs: 45000, desc: 'The React framework', icon: '▲' },
    ],
    default: [
      { name: 'skill-finder', owner: 'sanyamk23', installs: 3291, desc: 'Find any skill you need', icon: '🔍' },
      { name: 'create-readme', owner: 'github', installs: 18000, desc: 'Generate amazing READMEs', icon: '📝' },
      { name: 'code-review', owner: 'anthropic', installs: 12000, desc: 'AI-powered code review', icon: '🔎' },
      { name: 'deploy', owner: 'vercel', installs: 25000, desc: 'Deploy anywhere', icon: '🚀' },
    ]
  };

  let currentMatchIndex = 0;
  let currentMatchSkills = [];

  window.startMatch = function() {
    const input = document.getElementById('matchInput').value.toLowerCase().trim();
    const container = document.getElementById('matchCards');
    const controls = document.getElementById('matchControls');

    // Find matching category
    let category = 'default';
    for (const key in skillDatabase) {
      if (input.includes(key)) {
        category = key;
        break;
      }
    }

    currentMatchSkills = [...skillDatabase[category]];
    currentMatchIndex = 0;

    if (currentMatchSkills.length === 0) {
      container.innerHTML = '<div class="match-result"><div class="match-result-icon">🤔</div><h3 class="match-result-title">No skills found</h3><p class="match-result-desc">Try a different search term!</p></div>';
      controls.style.display = 'none';
      return;
    }

    controls.style.display = 'flex';
    renderMatchCard();
  };

  function renderMatchCard() {
    const container = document.getElementById('matchCards');
    const controls = document.getElementById('matchControls');

    if (currentMatchIndex >= currentMatchSkills.length) {
      container.innerHTML = '<div class="match-result"><div class="match-result-icon">🎉</div><h3 class="match-result-title">You\'ve seen all matches!</h3><p class="match-result-desc">Go back and search for more.</p></div>';
      controls.style.display = 'none';
      return;
    }

    const skill = currentMatchSkills[currentMatchIndex];
    const compatibility = Math.floor(Math.random() * 20) + 80; // 80-99%

    container.innerHTML = `
      <div class="match-card" id="currentCard">
        <div class="match-card-header">
          <div class="match-card-icon">${skill.icon}</div>
          <h3 class="match-card-name">${skill.name}</h3>
          <p class="match-card-owner">${skill.owner}</p>
        </div>
        <div class="match-card-body">
          <div class="match-card-stats">
            <div class="match-stat">
              <div class="match-stat-value">${(skill.installs / 1000).toFixed(1)}K</div>
              <div class="match-stat-label">Installs</div>
            </div>
            <div class="match-stat">
              <div class="match-stat-value">4.8</div>
              <div class="match-stat-label">Rating</div>
            </div>
          </div>
          <p class="match-card-desc">${skill.desc}</p>
        </div>
        <div class="match-card-footer">
          <div class="compatibility-bar">
            <div class="compatibility-fill" style="width: ${compatibility}%"></div>
          </div>
          <div class="compatibility-text">
            <span>Compatibility</span>
            <span>${compatibility}%</span>
          </div>
        </div>
      </div>
    `;
  }

  window.swipeLeft = function() {
    const card = document.getElementById('currentCard');
    if (card) {
      card.classList.add('swiping-left');
      setTimeout(() => {
        currentMatchIndex++;
        renderMatchCard();
      }, 400);
    }
  };

  window.swipeRight = function() {
    const card = document.getElementById('currentCard');
    if (card) {
      card.classList.add('swiping-right');
      setTimeout(() => {
        currentMatchIndex++;
        renderMatchCard();
      }, 400);
    }
  };

  window.installMatch = function() {
    launchConfetti(3000);
    const card = document.getElementById('currentCard');
    if (card) {
      card.style.transform = 'scale(1.05)';
      card.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.4)';
      setTimeout(() => {
        currentMatchIndex++;
        renderMatchCard();
      }, 500);
    }
  };

  // Enter key support for match input
  document.getElementById('matchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startMatch();
  });

  /* ─────────────────────────────────────────────────────────────────────────
     12. INTERACTIVE SKILL MAP
     ───────────────────────────────────────────────────────────────────────── */

  const mapData = {
    react: {
      center: { name: 'React', x: 400, y: 250, installs: 854700 },
      related: [
        { name: 'Testing', x: 200, y: 150, installs: 15000 },
        { name: 'Styling', x: 600, y: 150, installs: 12000 },
        { name: 'Deployment', x: 200, y: 350, installs: 25000 },
        { name: 'Docs', x: 600, y: 350, installs: 8000 },
      ],
      adjacent: [
        { name: 'Jest', x: 80, y: 80, installs: 8000 },
        { name: 'Vitest', x: 180, y: 50, installs: 15000 },
        { name: 'Tailwind', x: 720, y: 80, installs: 45000 },
        { name: 'Sass', x: 620, y: 50, installs: 6000 },
        { name: 'Vercel', x: 80, y: 420, installs: 35000 },
        { name: 'Netlify', x: 180, y: 450, installs: 18000 },
        { name: 'Storybook', x: 720, y: 420, installs: 12000 },
        { name: 'Docusaurus', x: 620, y: 450, installs: 5000 },
      ]
    },
    testing: {
      center: { name: 'Testing', x: 400, y: 250, installs: 139800 },
      related: [
        { name: 'Unit', x: 200, y: 150, installs: 8000 },
        { name: 'E2E', x: 600, y: 150, installs: 12000 },
        { name: 'Integration', x: 200, y: 350, installs: 9500 },
        { name: 'Visual', x: 600, y: 350, installs: 7000 },
      ],
      adjacent: [
        { name: 'Jest', x: 80, y: 80, installs: 8000 },
        { name: 'Vitest', x: 180, y: 50, installs: 15000 },
        { name: 'Cypress', x: 720, y: 80, installs: 9500 },
        { name: 'Playwright', x: 620, y: 50, installs: 12000 },
        { name: 'Testing Lib', x: 80, y: 420, installs: 11000 },
        { name: 'Mocha', x: 180, y: 450, installs: 6000 },
        { name: 'Percy', x: 720, y: 420, installs: 4000 },
        { name: 'Chromatic', x: 620, y: 450, installs: 3500 },
      ]
    },
    default: {
      center: { name: 'Skills', x: 400, y: 250, installs: 100000 },
      related: [
        { name: 'Frontend', x: 200, y: 150, installs: 854700 },
        { name: 'Backend', x: 600, y: 150, installs: 45000 },
        { name: 'DevOps', x: 200, y: 350, installs: 25000 },
        { name: 'AI/ML', x: 600, y: 350, installs: 65000 },
      ],
      adjacent: [
        { name: 'React', x: 80, y: 80, installs: 854700 },
        { name: 'Vue', x: 180, y: 50, installs: 38000 },
        { name: 'Node', x: 720, y: 80, installs: 55000 },
        { name: 'Python', x: 620, y: 50, installs: 72000 },
        { name: 'Docker', x: 80, y: 420, installs: 45000 },
        { name: 'K8s', x: 180, y: 450, installs: 32000 },
        { name: 'TensorFlow', x: 720, y: 420, installs: 58000 },
        { name: 'PyTorch', x: 620, y: 450, installs: 48000 },
      ]
    }
  };

  window.generateMap = function() {
    const input = document.getElementById('mapInput').value.toLowerCase().trim();
    const svg = document.getElementById('mapSvg');

    // Find matching category
    let category = 'default';
    for (const key in mapData) {
      if (input.includes(key)) {
        category = key;
        break;
      }
    }

    const data = mapData[category];

    // Build SVG content
    let svgContent = `
      <defs>
        <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea"/>
          <stop offset="100%" style="stop-color:#764ba2"/>
        </linearGradient>
        <linearGradient id="relatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4facfe"/>
          <stop offset="100%" style="stop-color:#00f2fe"/>
        </linearGradient>
        <linearGradient id="adjacentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#a78bfa"/>
          <stop offset="100%" style="stop-color:#c4b5fd"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    `;

    // Draw connections first (so they're behind nodes)
    // Center to related
    data.related.forEach(node => {
      svgContent += `<line x1="${data.center.x}" y1="${data.center.y}" x2="${node.x}" y2="${node.y}" class="map-link" data-aos="fade-in"/>`;
    });

    // Related to adjacent
    data.related.forEach((rel, i) => {
      const adj1 = data.adjacent[i * 2];
      const adj2 = data.adjacent[i * 2 + 1];
      if (adj1) svgContent += `<line x1="${rel.x}" y1="${rel.y}" x2="${adj1.x}" y2="${adj1.y}" class="map-link" opacity="0.4"/>`;
      if (adj2) svgContent += `<line x1="${rel.x}" y1="${rel.y}" x2="${adj2.x}" y2="${adj2.y}" class="map-link" opacity="0.4"/>`;
    });

    // Draw adjacent nodes
    data.adjacent.forEach(node => {
      svgContent += `
        <g class="map-node map-node-adjacent" data-name="${node.name}" data-installs="${node.installs}" transform="translate(${node.x}, ${node.y})">
          <circle r="28" filter="url(#glow)"/>
          <text class="map-node-text" y="4">${node.name}</text>
        </g>
      `;
    });

    // Draw related nodes
    data.related.forEach(node => {
      svgContent += `
        <g class="map-node map-node-related" data-name="${node.name}" data-installs="${node.installs}" transform="translate(${node.x}, ${node.y})">
          <circle r="35" filter="url(#glow)"/>
          <text class="map-node-text" y="4">${node.name}</text>
        </g>
      `;
    });

    // Draw center node
    svgContent += `
      <g class="map-node map-node-center" data-name="${data.center.name}" data-installs="${data.center.installs}" transform="translate(${data.center.x}, ${data.center.y})">
        <circle r="50" filter="url(#glow)"/>
        <text class="map-node-text" y="4">${data.center.name}</text>
      </g>
    `;

    svg.innerHTML = svgContent;

    // Add click handlers to nodes
    svg.querySelectorAll('.map-node').forEach(node => {
      node.addEventListener('click', () => {
        const name = node.dataset.name;
        const installs = parseInt(node.dataset.installs);
        showMapInfo(name, installs);
      });
    });

    // Trigger fade-in animation
    svg.querySelectorAll('.map-link').forEach((link, i) => {
      link.style.opacity = '0';
      setTimeout(() => {
        link.style.transition = 'opacity 0.5s ease';
        link.style.opacity = link.dataset.opacity || '0.6';
      }, i * 100);
    });
  };

  function showMapInfo(name, installs) {
    const panel = document.getElementById('mapInfoPanel');
    panel.innerHTML = `
      <div class="info-content">
        <h4>${name}</h4>
        <p>A powerful skill in the ecosystem</p>
        <div class="info-stats">
          <div class="info-stat">
            <div class="info-stat-value">${(installs / 1000).toFixed(1)}K</div>
            <div class="info-stat-label">Installs</div>
          </div>
          <div class="info-stat">
            <div class="info-stat-value">4.8</div>
            <div class="info-stat-label">Rating</div>
          </div>
          <div class="info-stat">
            <div class="info-stat-value">Active</div>
            <div class="info-stat-label">Status</div>
          </div>
        </div>
      </div>
    `;
  }

  // Enter key support for map input
  document.getElementById('mapInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateMap();
  });

  /* ─────────────────────────────────────────────────────────────────────────
     13. PARALLAX EFFECT FOR HERO ORBS
     ───────────────────────────────────────────────────────────────────────── */
  const orbs = document.querySelectorAll('.gradient-orb');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.1;
      orb.style.transform = `translate(${scrolled * speed}px, ${scrolled * speed * 0.5}px)`;
    });
  });

  /* ─────────────────────────────────────────────────────────────────────────
     14. KEYBOARD SHORTCUTS
     ───────────────────────────────────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    // Press 'I' to scroll to install section
    if (e.key === 'i' || e.key === 'I') {
      if (document.activeElement.tagName !== 'INPUT') {
        document.getElementById('install').scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  /* ─────────────────────────────────────────────────────────────────────────
     15. ACHIEVEMENT UNLOCK ANIMATION
     ───────────────────────────────────────────────────────────────────────── */
  const achievements = document.querySelectorAll('.achievement');

  const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && entry.target.classList.contains('unlocked')) {
        setTimeout(() => {
          entry.target.style.transform = 'scale(1.05)';
          setTimeout(() => {
            entry.target.style.transform = '';
          }, 200);
        }, index * 100);
      }
    });
  }, { threshold: 0.5 });

  achievements.forEach(a => achievementObserver.observe(a));

  /* ─────────────────────────────────────────────────────────────────────────
     16. LEVEL NODE INTERACTION
     ───────────────────────────────────────────────────────────────────────── */
  const levelNodes = document.querySelectorAll('.level-node');

  levelNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const level = parseInt(node.dataset.level);
      levelNodes.forEach(n => {
        const nLevel = parseInt(n.dataset.level);
        if (nLevel < level) {
          n.style.opacity = '1';
        }
      });
    });

    node.addEventListener('mouseleave', () => {
      levelNodes.forEach(n => {
        n.style.opacity = '';
      });
    });
  });

});

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY: DEBOUNCE FUNCTION
   ═══════════════════════════════════════════════════════════════════════════ */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY: THROTTLE FUNCTION
   ═══════════════════════════════════════════════════════════════════════════ */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

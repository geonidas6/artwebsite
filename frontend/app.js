(function() {
  const canvas = document.getElementById('artwork');
  const ctx = canvas.getContext('2d');
  const stateLoading = document.getElementById('state-loading');
  const stateError = document.getElementById('state-error');
  const stateEmpty = document.getElementById('state-empty');
  const toastEl = document.getElementById('toast');

  let width, height;
  const palette = ['#2563EB', '#1D4ED8', '#059669', '#DC2626', '#7C3AED', '#DB2777', '#D97706', '#0891B2'];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    drawArtwork();
  }

  function seedFromDate() {
    const now = new Date();
    return now.getFullYear() * 1000000 + (now.getMonth() + 1) * 100000 + now.getDate() * 10000 + now.getHours() * 100 + now.getMinutes();
  }

  function seededRandom(seed) {
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    return function() {
      s = (s * 16807) % 2147483647;
      return (s % 10000) / 10000;
    };
  }

  function drawArtwork() {
    const r = seededRandom(seedFromDate());
    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const passes = 30 + Math.floor(r() * 50);
    for (let i = 0; i < passes; i++) {
      ctx.beginPath();
      ctx.strokeStyle = palette[Math.floor(r() * palette.length)];
      ctx.globalAlpha = 0.1 + r() * 0.4;
      ctx.lineWidth = 0.5 + r() * 10;
      const startX = r() * width;
      const startY = r() * height;
      ctx.moveTo(startX, startY);
      const segments = 2 + Math.floor(r() * 4);
      for (let j = 0; j < segments; j++) {
        ctx.lineTo(r() * width, r() * height);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function hideAllStates() {
    stateLoading.classList.add('hidden');
    stateLoading.classList.remove('visible');
    stateError.classList.add('hidden');
    stateError.classList.remove('visible');
    stateEmpty.classList.add('hidden');
    stateEmpty.classList.remove('visible');
  }

  function showToast(message, type) {
    toastEl.innerHTML = '';
    
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSvg.setAttribute('role', 'img');
    iconSvg.setAttribute('aria-label', type === 'success' ? 'Succès' : 'Erreur');
    iconSvg.setAttribute('focusable', 'false');
    iconSvg.setAttribute('width', '20');
    iconSvg.setAttribute('height', '20');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    
    if (type === 'success') {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '12');
      circle.setAttribute('cy', '12');
      circle.setAttribute('r', '10');
      circle.setAttribute('fill', 'currentColor');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z');
      path.setAttribute('fill', '#fff');
      iconSvg.appendChild(circle);
      iconSvg.appendChild(path);
    } else {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '12');
      circle.setAttribute('cy', '12');
      circle.setAttribute('r', '10');
      circle.setAttribute('fill', 'currentColor');
      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttribute('x1', '15');
      line1.setAttribute('y1', '9');
      line1.setAttribute('x2', '9');
      line1.setAttribute('y2', '15');
      line1.setAttribute('stroke', '#fff');
      line1.setAttribute('stroke-width', '2');
      line1.setAttribute('stroke-linecap', 'round');
      const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line2.setAttribute('x1', '9');
      line2.setAttribute('y1', '9');
      line2.setAttribute('x2', '15');
      line2.setAttribute('y2', '15');
      line2.setAttribute('stroke', '#fff');
      line2.setAttribute('stroke-width', '2');
      line2.setAttribute('stroke-linecap', 'round');
      iconSvg.appendChild(circle);
      iconSvg.appendChild(line1);
      iconSvg.appendChild(line2);
    }
    
    toastEl.appendChild(iconSvg);
    const span = document.createElement('span');
    span.textContent = message;
    toastEl.appendChild(span);
    
    toastEl.className = 'toast ' + type;
    toastEl.setAttribute('aria-hidden', 'false');
    toastEl.classList.add('visible');
    
    setTimeout(() => {
      toastEl.classList.remove('visible');
      toastEl.setAttribute('aria-hidden', 'true');
    }, 3000);
  }

  function loadArtwork() {
    hideAllStates();
    stateLoading.classList.add('visible');
    canvas.setAttribute('aria-busy', 'true');
    
    setTimeout(() => {
      try {
        resize();
        hideAllStates();
        canvas.setAttribute('aria-busy', 'false');
        showToast('Nouvelle œuvre générée', 'success');
      } catch (e) {
        hideAllStates();
        stateError.classList.add('visible');
        canvas.setAttribute('aria-busy', 'false');
        showToast('Erreur lors du chargement', 'error');
      }
    }, 800);
  }

  window.addEventListener('resize', resize);
  
  document.addEventListener('DOMContentLoaded', () => {
    loadArtwork();
    setInterval(loadArtwork, 60000);
  });
})();

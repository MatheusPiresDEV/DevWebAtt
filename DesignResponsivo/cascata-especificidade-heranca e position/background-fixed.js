// Background interativo (canvas) sem bibliotecas externas.
// Substitui a versão que dependia de TweenLite/Circ.
(function () {
  const largeHeader = document.getElementById('large-header');
  const canvas = document.getElementById('demo-canvas');
  if (!largeHeader || !canvas) return;

  const ctx = canvas.getContext('2d');
  let w = 0;
  let h = 0;
  let raf = 0;

  const target = { x: 0, y: 0 };

  const POINT_STEP = 40;
  const MAX_LINK_DIST = 220;

  let points = [];

  function resize() {
    w = Math.max(1, Math.floor(largeHeader.getBoundingClientRect().width));
    h = Math.max(1, Math.floor(largeHeader.getBoundingClientRect().height));

    canvas.width = w;
    canvas.height = h;

    target.x = w / 2;
    target.y = h / 2;

    points = [];
    for (let x = 0; x <= w; x += POINT_STEP) {
      for (let y = 0; y <= h; y += POINT_STEP) {
        points.push({
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // fundo (degradê)
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#0b1022');
    g.addColorStop(1, '#0a0f19');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < points.length; i++) {
      const p = points[i];

      p.x += p.vx;
      p.y += p.vy;

      if (Math.abs(p.x - p.ox) > 25) p.vx *= -1;
      if (Math.abs(p.y - p.oy) > 25) p.vy *= -1;

      const dxm = p.x - target.x;
      const dym = p.y - target.y;
      const dm = Math.sqrt(dxm * dxm + dym * dym);
      const alpha = Math.max(0, 1 - dm / 600);
      const pointAlpha = 0.05 + alpha * 0.35;

      for (let j = i + 1; j < points.length; j++) {
        const q = points[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_LINK_DIST) {
          const a = (1 - d / MAX_LINK_DIST) * alpha;
          if (a > 0) {
            ctx.strokeStyle = `rgba(156, 217, 249, ${a * 0.6})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `rgba(156, 217, 249, ${pointAlpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  function onMove(e) {
    const rect = largeHeader.getBoundingClientRect();
    target.x = e.clientX - rect.left;
    target.y = e.clientY - rect.top;
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMove, { passive: true });

  resize();
  cancelAnimationFrame(raf);
  draw();
})();


// Background via canvas (sem bibliotecas externas)
(() => {
  // canvas principal (mesmo id usado nos exemplos)
  const header = document.getElementById('large-header');
  const canvas = document.getElementById('demo-canvas') || document.getElementById('bg-canvas');

  if (!canvas || !header) return;

  const ctx = canvas.getContext('2d');
  let w = 0;
  let h = 0;
  let raf = 0;

  const target = { x: 0, y: 0 };
  let mouseActive = false;

  const POINT_STEP = 40; // densidade
  const MAX_LINK_DIST = 220;

  const points = [];

  function resize() {
    const rect = header.getBoundingClientRect();
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(rect.height));

    canvas.width = w;
    canvas.height = h;

    target.x = w / 2;
    target.y = h / 2;

    points.length = 0;
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

    // fundo
    // papel de parede sutil e mais claro (suave, sem “pesar”)
    const g = ctx.createRadialGradient(w * 0.5, h * 0.25, 0, w * 0.5, h * 0.5, Math.max(w, h));
    g.addColorStop(0, 'rgba(255, 255, 255, 0.97)');
    g.addColorStop(0.35, 'rgba(255, 255, 255, 0.8)');
    g.addColorStop(1, '#ffffff');
    ctx.fillStyle = g;

    ctx.fillRect(0, 0, w, h);

    // links + pontos
    for (let i = 0; i < points.length; i++) {
      const p = points[i];

      // leve drift
      p.x += p.vx;
      p.y += p.vy;

      // retorno ao original
      if (Math.abs(p.x - p.ox) > 25) p.vx *= -1;
      if (Math.abs(p.y - p.oy) > 25) p.vy *= -1;

      // brilho baseado na distância ao mouse/centro
      const dxm = p.x - target.x;
      const dym = p.y - target.y;
      const dm = Math.sqrt(dxm * dxm + dym * dym);
      const alpha = Math.max(0, 1 - dm / 600);
      const pointAlpha = 0.05 + alpha * 0.35;

      // links
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

      // ponto
      ctx.fillStyle = `rgba(156, 217, 249, ${pointAlpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  function onMove(e) {
    const rect = header.getBoundingClientRect();
    target.x = e.clientX - rect.left;
    target.y = e.clientY - rect.top;
    mouseActive = true;
  }

  function onLeave() {
    mouseActive = false;
    target.x = w / 2;
    target.y = h / 2;
  }

  window.addEventListener('resize', () => resize());
  window.addEventListener('mousemove', onMove, { passive: true });
  header.addEventListener('mouseleave', onLeave);

  resize();
  cancelAnimationFrame(raf);
  draw();
})();


"use client";

import { useEffect, useRef } from "react";

type Star = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  alpha: number;
  arm: number;
};

export default function ArcheNovaGalaxy() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let frame = 0;
    let raf = 0;

    const stars: Star[] = Array.from({ length: 1800 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.pow(Math.random(), 0.58) * 620,
      speed: 0.00035 + Math.random() * 0.00075,
      size: 0.35 + Math.random() * 1.65,
      alpha: 0.18 + Math.random() * 0.82,
      arm: Math.floor(Math.random() * 4),
    }));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      frame += 1;
      const t = frame * 0.006;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
      bg.addColorStop(0, "rgba(255,255,255,0.10)");
      bg.addColorStop(0.18, "rgba(125,160,255,0.12)");
      bg.addColorStop(0.46, "rgba(60,80,180,0.06)");
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        const armAngle = s.arm * (Math.PI / 2);
        const spiral = s.angle + armAngle + s.radius * 0.012 + t * s.speed * 120;
        const wave = Math.sin(spiral * 3 + t) * 26;
        const r = s.radius + wave;

        const x = cx + Math.cos(spiral) * r * 1.22;
        const y = cy + Math.sin(spiral) * r * 0.54;

        if (x < -40 || x > w + 40 || y < -40 || y > h + 40) continue;

        const pulse = 0.68 + Math.sin(t * 1.7 + s.angle * 5) * 0.22;

        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,248,255,${s.alpha * pulse})`;
        ctx.fill();
      }

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
      core.addColorStop(0, "rgba(255,255,255,0.95)");
      core.addColorStop(0.16, "rgba(215,228,255,0.42)");
      core.addColorStop(0.58, "rgba(120,145,255,0.12)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="an-galaxy-wrap" aria-hidden="true">
      <canvas ref={ref} />
      <div className="an-galaxy-orbit" />
      <div className="an-galaxy-caption">
        <span>ARCHENOVA</span>
        <small>Reality → Knowledge → Infrastructure → Civilization</small>
      </div>
    </div>
  );
}
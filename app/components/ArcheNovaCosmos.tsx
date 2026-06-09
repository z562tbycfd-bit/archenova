"use client";

import { useEffect, useRef } from "react";

type Particle = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  alpha: number;
  layer: number;
};

export default function ArcheNovaCosmos() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let frame = 0;
    let raf = 0;

    const particles: Particle[] = Array.from({ length: 3200 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.pow(Math.random(), 0.62) * 680,
      speed: 0.00025 + Math.random() * 0.0009,
      size: 0.35 + Math.random() * 1.8,
      alpha: 0.18 + Math.random() * 0.82,
      layer: Math.floor(Math.random() * 5),
    }));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawRing(cx: number, cy: number, r: number, alpha: number) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 1.36, r * 0.46, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(230,240,255,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function draw() {
      frame += 1;
      const t = frame * 0.006;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
      bg.addColorStop(0, "rgba(255,255,255,0.16)");
      bg.addColorStop(0.18, "rgba(130,160,255,0.12)");
      bg.addColorStop(0.42, "rgba(50,70,150,0.07)");
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        const layerScale = 0.72 + p.layer * 0.13;
        const spiral =
          p.angle +
          p.radius * 0.012 +
          t * p.speed * 110 +
          Math.sin(t * 0.45 + p.layer) * 0.18;

        const wave =
          Math.sin(spiral * 3.2 + t) * 22 +
          Math.sin(spiral * 7.1) * 8;

        const r = (p.radius + wave) * layerScale;

        const x = cx + Math.cos(spiral) * r * 1.22;
        const y = cy + Math.sin(spiral) * r * 0.54;

        if (x < -40 || x > w + 40 || y < -40 || y > h + 40) continue;

        const pulse = 0.58 + Math.sin(t * 1.6 + p.angle * 5) * 0.24;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);

        const color =
          p.layer === 0
            ? "255,255,245"
            : p.layer === 1
            ? "190,215,255"
            : p.layer === 2
            ? "125,165,255"
            : p.layer === 3
            ? "255,210,150"
            : "245,248,255";

        ctx.fillStyle = `rgba(${color},${p.alpha * pulse})`;
        ctx.fill();
      }

      drawRing(cx, cy, 170 + Math.sin(t) * 8, 0.18);
      drawRing(cx, cy, 260 + Math.cos(t * 0.8) * 10, 0.12);
      drawRing(cx, cy, 360 + Math.sin(t * 0.55) * 12, 0.08);

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 155);
      core.addColorStop(0, "rgba(255,255,245,1)");
      core.addColorStop(0.13, "rgba(255,245,220,0.7)");
      core.addColorStop(0.36, "rgba(190,210,255,0.24)");
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
    <div className="archenova-cosmos">
      <canvas ref={canvasRef} />
    </div>
  );
}
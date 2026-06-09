"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
};

type ArmStar = {
  angle: number;
  radius: number;
  size: number;
  alpha: number;
  color: string;
  speed: number;
  arm: number;
};

export default function ArcheNovaGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;

    const backgroundStars: Star[] = Array.from({ length: 900 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      size: 0.4 + Math.random() * 1.8,
      alpha: 0.18 + Math.random() * 0.82,
    }));

    const galaxyStars: ArmStar[] = Array.from({ length: 2600 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.pow(Math.random(), 0.72) * 440,
      size: 0.35 + Math.random() * 1.65,
      alpha: 0.2 + Math.random() * 0.8,
      color:
        Math.random() > 0.82
          ? "255,145,120"
          : Math.random() > 0.45
          ? "160,185,255"
          : "245,248,255",
      speed: 0.00025 + Math.random() * 0.00055,
      arm: Math.floor(Math.random() * 4),
    }));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      frame += 1;
      const t = frame * 0.006;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, width, height);

      for (const s of backgroundStars) {
        ctx.beginPath();
        ctx.arc(
          s.x * width,
          s.y * height,
          s.size * (0.6 + s.z),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255,255,245,${s.alpha * 0.75})`;
        ctx.fill();
      }

      const halo = ctx.createRadialGradient(
        cx,
        cy,
        10,
        cx,
        cy,
        Math.min(width, height) * 0.48
      );
      halo.addColorStop(0, "rgba(255,255,240,0.55)");
      halo.addColorStop(0.14, "rgba(230,230,215,0.20)");
      halo.addColorStop(0.42, "rgba(115,135,170,0.10)");
      halo.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      for (const s of galaxyStars) {
        const armAngle = s.arm * (Math.PI / 2);
        const spiral =
          s.angle +
          armAngle +
          s.radius * 0.017 +
          t * s.speed * 90;

        const dustWave =
          Math.sin(spiral * 2.7 + t * 0.7) * 26 +
          Math.sin(spiral * 5.2) * 9;

        const r = s.radius + dustWave;

        const x = cx + Math.cos(spiral) * r * 1.42;
        const y = cy + Math.sin(spiral) * r * 0.62;

        if (x < -30 || x > width + 30 || y < -30 || y > height + 30) {
          continue;
        }

        const pulse = 0.62 + Math.sin(t + s.angle * 4) * 0.22;

        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${s.alpha * pulse})`;
        ctx.fill();
      }

      const dust = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.min(width, height) * 0.36
      );
      dust.addColorStop(0, "rgba(255,245,220,0.35)");
      dust.addColorStop(0.22, "rgba(220,215,205,0.16)");
      dust.addColorStop(0.55, "rgba(95,110,140,0.08)");
      dust.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = dust;
      ctx.fillRect(0, 0, width, height);

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 115);
      core.addColorStop(0, "rgba(255,255,245,1)");
      core.addColorStop(0.15, "rgba(255,250,225,0.72)");
      core.addColorStop(0.34, "rgba(220,220,210,0.28)");
      core.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = core;
      ctx.fillRect(0, 0, width, height);

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
    <div className="archenova-galaxy" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
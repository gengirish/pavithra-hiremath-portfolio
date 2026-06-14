"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

/** Hero canvas: cyan / indigo / emerald only (avoids generic “AI rainbow” pink accent). */
const COLORS = ["#06b6d4", "#6366f1", "#10b981"];

function drawFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  particles: Particle[],
  connectionDistance: number
) {
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const isDark = document.documentElement.classList.contains("dark");
            const base = isDark ? 0.15 : 0.07;
            const opacity = (1 - dist / connectionDistance) * base;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color + "40";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
}

export default function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particleCount = 60;
    const connectionDistance = 150;
    const particles: Particle[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationId = 0;

    const createParticles = (w: number, h: number) => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: reducedMotion ? 0 : (Math.random() - 0.5) * 0.5,
          vy: reducedMotion ? 0 : (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
        });
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles(w, h);
      if (reducedMotion) {
        drawFrame(ctx, canvas, particles, connectionDistance);
      }
    };

    const onResize = () => {
      resize();
    };

    const animate = () => {
      drawFrame(ctx, canvas, particles, connectionDistance);
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", onResize);

    if (!reducedMotion) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30 dark:opacity-40 motion-reduce:opacity-25"
      aria-hidden
      style={{ pointerEvents: "none" }}
    />
  );
}

'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  angle: number;
  spin: number;
  color: string;
};

const COLORS = [
  '#4A7C59', '#4A7C59', '#4A7C59', '#4A7C59', '#4A7C59',
  '#8C8680', '#8C8680', '#8C8680',
  '#B8860B',
];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.innerWidth < 768;
    const dpr = window.devicePixelRatio || 1;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let animId = 0;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      const count = isMobile ? 30 + Math.floor(Math.random() * 10) : 60 + Math.floor(Math.random() * 20);
      particles = [];
      for (let i = 0; i < count; i++) {
        const w = 2 + Math.random() * 4;
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          homeX: x,
          homeY: y,
          vx: 0,
          vy: 0,
          w,
          h: w * 0.5,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02,
          color: randomColor(),
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const spring = 0.02;
      const damping = 0.95;
      const repelRadius = 150;

      for (const p of particles) {
        if (!prefersReducedMotion) {
          // Spring back to home
          let dx = p.homeX - p.x;
          let dy = p.homeY - p.y;
          p.vx += dx * spring;
          p.vy += dy * spring;

          // Cursor repel (desktop only)
          if (!isMobile) {
            dx = p.x - mouseX;
            dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < repelRadius && dist > 0) {
              const force = (repelRadius - dist) / repelRadius;
              p.vx += (dx / dist) * force * 2;
              p.vy += (dy / dist) * force * 2;
            }
          } else {
            // Gentle idle float on mobile
            p.vx += (Math.random() - 0.5) * 0.05;
            p.vy += (Math.random() - 0.5) * 0.05;
          }

          p.vx *= damping;
          p.vy *= damping;
          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.spin;
        }

        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.angle);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = 0.6;
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx!.restore();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(draw);
      }
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    resize();
    initParticles();

    if (prefersReducedMotion) {
      draw(); // Single static frame
    } else {
      animId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    if (!isMobile) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 h-full w-full"
    />
  );
}

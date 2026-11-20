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
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

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
    let running = false;

    function resize() {
      width = parent!.clientWidth;
      height = parent!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
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

    function step() {
      const spring = 0.02;
      const damping = 0.95;
      const repelRadius = 150;

      for (const p of particles) {
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
    }

    function render() {
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.globalAlpha = 0.6;

      for (const p of particles) {
        // One setTransform (scale by dpr, rotate, translate) instead of
        // save/translate/rotate/restore per particle.
        const cos = Math.cos(p.angle) * dpr;
        const sin = Math.sin(p.angle) * dpr;
        ctx!.setTransform(cos, sin, -sin, cos, p.x * dpr, p.y * dpr);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
    }

    function frame() {
      step();
      render();
      animId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || prefersReducedMotion) return;
      running = true;
      animId = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(animId);
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

    // Fires once on observe, then whenever the hero changes size. Redrawing
    // here keeps the single static frame correct under reduced motion.
    const resizeObserver = new ResizeObserver(() => {
      resize();
      initParticles();
      render();
    });
    resizeObserver.observe(parent);

    // Only animate while the hero is on screen.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    if (!isMobile) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
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

'use client';

import ParticleBackground from './ParticleBackground';
import { useToast } from './Toast';

export default function Hero() {
  const { showToast } = useToast();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Particle layer */}
      <div className="absolute inset-0">
        <ParticleBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-fg md:text-6xl">
          Your mind is for having ideas,
          <br />
          not holding them.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl">
          An agentic system that captures, understands, and organizes your
          thoughts and finances&nbsp;&mdash; autonomously.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => showToast('Coming soon!')}
            className="rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-fg transition-colors hover:bg-primary-hover"
          >
            Try Finance Assistant
          </button>
          <a
            href="https://github.com/mcalero11/second-brain"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-8 py-3 text-base font-medium text-fg transition-colors hover:border-border-hover hover:bg-bg-card"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

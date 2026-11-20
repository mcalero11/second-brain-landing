'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ComingSoonButton from './ComingSoonButton';
import ThemeToggle from './ThemeToggle';
import { useToast } from './Toast';

// Section links are absolute ("/#…") so they also work from /privacy.
const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  {
    label: 'GitHub',
    href: 'https://github.com/mcalero11/second-brain',
    external: true,
  },
];

function NavLink({
  link,
  onClick,
}: {
  link: (typeof NAV_LINKS)[number];
  onClick?: () => void;
}) {
  const className = 'text-sm text-fg-muted transition-colors hover:text-fg';

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} onClick={onClick} className={className}>
      {link.label}
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { showToast } = useToast();

  // Escape closes the mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-border bg-backdrop backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3"
      >
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-fg">
          Second Brain
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} link={link} />
          ))}
          <ThemeToggle />
          <ComingSoonButton className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-fg transition-colors hover:bg-primary-hover">
            Get Started
          </ComingSoonButton>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={menuButtonRef}
          type="button"
          className="-mr-2 flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block h-0.5 w-5 bg-fg transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 bg-fg transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-5 bg-fg transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-bg px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                link={link}
                onClick={() => setMenuOpen(false)}
              />
            ))}
            <ThemeToggle />
            <button
              type="button"
              onClick={() => {
                showToast('Coming soon!');
                setMenuOpen(false);
              }}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-fg transition-colors hover:bg-primary-hover"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

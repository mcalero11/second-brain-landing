'use client';

import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'system' | 'dark';

const OPTIONS: { value: Theme; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
  { value: 'dark', label: 'Dark' },
];

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return OPTIONS.some((opt) => opt.value === stored)
      ? (stored as Theme)
      : 'system';
  } catch {
    return 'system';
  }
}

function applyTheme(theme: Theme) {
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia(DARK_QUERY).matches);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

// Module-level store shared by every ThemeToggle instance (desktop + mobile),
// so they never disagree and the global listeners are attached only once.
let currentTheme: Theme | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function onSystemChange() {
  if (getSnapshot() === 'system') applyTheme('system');
}

function onStorage(e: StorageEvent) {
  if (e.key !== STORAGE_KEY) return;
  currentTheme = readStoredTheme();
  applyTheme(currentTheme);
  notify();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    window.matchMedia(DARK_QUERY).addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorage);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.matchMedia(DARK_QUERY).removeEventListener('change', onSystemChange);
      window.removeEventListener('storage', onStorage);
    }
  };
}

function getSnapshot(): Theme {
  currentTheme ??= readStoredTheme();
  return currentTheme;
}

// The server cannot know the stored theme; render a placeholder until hydrated.
function getServerSnapshot(): Theme | null {
  return null;
}

function setTheme(theme: Theme) {
  currentTheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode): the choice lasts for this page only.
  }
  applyTheme(theme);
  notify();
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (theme === null) {
    return <div className="h-8 w-[10.5rem]" aria-hidden="true" />;
  }

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="flex rounded-lg border border-border bg-bg p-0.5"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={theme === opt.value}
          onClick={() => setTheme(opt.value)}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            theme === opt.value
              ? 'bg-primary text-primary-fg'
              : 'text-fg-muted hover:text-fg'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

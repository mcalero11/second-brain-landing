import Link from 'next/link';

import ComingSoonButton from './ComingSoonButton';

export default function Footer() {
  return (
    <footer className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-fg md:text-4xl">
          Ready to get started?
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ComingSoonButton className="rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-fg transition-colors hover:bg-primary-hover">
            Deploy Now
          </ComingSoonButton>
          <a
            href="https://github.com/mcalero11/second-brain"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-8 py-3 text-base font-medium text-fg transition-colors hover:border-border-hover hover:bg-bg-card"
          >
            Star on GitHub
          </a>
        </div>
        <p className="mt-16 text-sm text-fg-subtle">
          &copy; {new Date().getFullYear()} Second Brain. All rights reserved.
        </p>
        <p className="mt-3 text-sm text-fg-subtle">
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-fg"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}

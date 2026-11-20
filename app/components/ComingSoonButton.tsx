'use client';

import type { ReactNode } from 'react';
import { useToast } from './Toast';

export default function ComingSoonButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { showToast } = useToast();

  return (
    <button
      type="button"
      onClick={() => showToast('Coming soon!')}
      className={className}
    >
      {children}
    </button>
  );
}

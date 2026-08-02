'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

interface TypewriterRevealProps {
  text: string;
  className?: string;
  speedMs?: number;
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function TypewriterReveal({
  text,
  className,
  speedMs = 15,
}: TypewriterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [started, setStarted] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);
  const paragraphs = text.split(/\n\s*\n/);
  const visibleParagraphs = text
    .slice(0, prefersReducedMotion ? text.length : visibleChars)
    .split(/\n\s*\n/);
  const done = prefersReducedMotion || visibleChars >= text.length;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !started || done) return;

    const timer = setInterval(() => {
      setVisibleChars((current) => Math.min(current + 1, text.length));
    }, speedMs);

    return () => clearInterval(timer);
  }, [done, prefersReducedMotion, speedMs, started, text.length]);

  return (
    <div ref={containerRef} className="grid min-w-0">
      <div
        aria-hidden="true"
        className={`${className ?? ''} invisible col-start-1 row-start-1 min-w-0`}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div
        aria-hidden="true"
        className={`${className ?? ''} col-start-1 row-start-1 min-w-0`}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={paragraph}>
            {visibleParagraphs[index] ?? ''}
            {!done && started && index === visibleParagraphs.length - 1 && (
              <span className="inline-block h-[1em] w-[0.5em] -mr-[0.5em] translate-y-[0.15em] animate-pulse bg-current align-middle" />
            )}
          </p>
        ))}
      </div>

      <div className="sr-only">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

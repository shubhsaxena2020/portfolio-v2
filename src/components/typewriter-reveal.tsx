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
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [started, setStarted] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !started || visibleChars >= text.length)
      return;
    const id = setTimeout(() => setVisibleChars((c) => c + 1), speedMs);
    return () => clearTimeout(id);
  }, [prefersReducedMotion, started, visibleChars, text, speedMs]);

  const shownText = prefersReducedMotion ? text : text.slice(0, visibleChars);
  const done = prefersReducedMotion || visibleChars >= text.length;

  return (
    <div ref={ref} className={className} style={{ whiteSpace: 'pre-wrap' }}>
      {shownText}
      {!prefersReducedMotion && started && !done && (
        <span className="typewriter-cursor inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-current align-middle" />
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';

interface CharRevealProps {
  text: string;
  className?: string;
  as?: 'div' | 'h2';
  once?: boolean;
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

export function CharReveal({
  text,
  className,
  as: Component = 'div',
  once = true,
}: CharRevealProps) {
  const paragraphRefs = useRef<Array<HTMLElement | null>>([]);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const paragraphs = text.split(/\n\s*\n/);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timers = new Set<ReturnType<typeof setTimeout>>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const paragraph = entry.target as HTMLElement;
          const chars = Array.from(
            paragraph.querySelectorAll<HTMLElement>('.char')
          );

          if (!once) {
            paragraph.style.opacity = '1';
            chars.forEach((char, index) => {
              char.style.transition = `transform 0.55s ease ${index * 45}ms`;
              char.style.transform = entry.isIntersecting
                ? 'translateY(0)'
                : 'translateY(110%)';
            });
            return;
          }

          if (!entry.isIntersecting) return;

          paragraph.style.opacity = '1';
          chars.forEach((char) => {
            char.style.cssText =
              'display:inline-block; transform:translateY(110%); transition:none';
          });

          const timer = setTimeout(() => {
            chars.forEach((char, index) => {
              char.style.transition = `transform 0.55s ease ${index * 45}ms`;
              char.style.transform = 'translateY(0)';
            });
            timers.delete(timer);
          }, 20);

          timers.add(timer);
          observer.unobserve(paragraph);
        });
      },
      { threshold: 0.3 }
    );

    paragraphRefs.current.forEach((paragraph) => {
      if (paragraph) observer.observe(paragraph);
    });

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [once, prefersReducedMotion, text]);

  const TextElement = Component === 'h2' ? 'span' : 'p';

  return (
    <Component className={className}>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <TextElement
          key={paragraph}
          ref={(element) => {
            paragraphRefs.current[paragraphIndex] = element;
          }}
          className="text-animate"
          aria-label={paragraph}
          style={prefersReducedMotion ? { opacity: 1 } : undefined}
        >
          {(paragraph.match(/\S+\s*/g) ?? []).map((word, wordIndex) => (
            <span
              key={`${paragraphIndex}-${wordIndex}`}
              style={{ display: 'inline-block', verticalAlign: 'bottom' }}
            >
              {word.split('').map((char, charIndex) => (
                <span
                  key={`${paragraphIndex}-${wordIndex}-${charIndex}`}
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    verticalAlign: 'bottom',
                    ...(char === ' ' ? { whiteSpace: 'pre' } : {}),
                  }}
                >
                  <span
                    className="char"
                    style={{
                      display: 'inline-block',
                      transform: prefersReducedMotion
                        ? 'translateY(0)'
                        : 'translateY(110%)',
                      transition: 'none',
                    }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </TextElement>
      ))}
    </Component>
  );
}

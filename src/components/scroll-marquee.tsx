'use client';

import { useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'motion/react';

const MARQUEE_PHRASE = 'BUILD. SHIP. EVOLVE.';
const PHRASES_PER_GROUP = 3;
const LOOP_GROUP_COUNT = 2;
const LOOP_DISTANCE_PERCENT = -(100 / LOOP_GROUP_COUNT);
const SCRUB_SECONDS = 1.15;
const SCROLL_START = 'top bottom';
const SCROLL_END = 'bottom top';
const REVEAL_END_OFFSET = 'start 0.68';
const REVEAL_Y_PX = 28;
const DISPLAY_FONT_VARIATIONS = '"wght" 850, "opsz" 72';

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function ScrollMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', REVEAL_END_OFFSET],
  });
  const revealOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0, 1], [REVEAL_Y_PX, 0]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track || shouldReduceMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: LOOP_DISTANCE_PERCENT,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: SCROLL_START,
            end: SCROLL_END,
            // A timed scrub interpolates toward scroll progress. This creates
            // gentle inertia while retaining natural reverse-on-scroll behavior.
            scrub: SCRUB_SECONDS,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, [shouldReduceMotion]);

  const entranceStyle = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: revealOpacity, y: revealY };

  return (
    <section
      ref={sectionRef}
      aria-label={`${MARQUEE_PHRASE} — selected work follows`}
      data-scroll-marquee
      data-reduced-motion={shouldReduceMotion ? 'true' : 'false'}
      className="relative z-20 overflow-hidden border-t border-border bg-background px-6 py-16 sm:px-10 sm:py-20 lg:px-16"
    >
      <motion.div
        style={entranceStyle}
        data-scroll-marquee-reveal
        className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-border bg-[repeating-linear-gradient(0deg,var(--border)_0_1px,transparent_1px_32px),repeating-linear-gradient(90deg,var(--border)_0_1px,transparent_1px_32px)] bg-background py-7 shadow-[0_20px_70px_-48px_var(--foreground)] sm:py-9"
      >
        <p className="sr-only">{MARQUEE_PHRASE}</p>
        <div
          ref={trackRef}
          data-scroll-marquee-track
          aria-hidden="true"
          className="flex w-max will-change-transform"
        >
          {Array.from({ length: LOOP_GROUP_COUNT }).map((_, groupIndex) => (
            <div
              key={groupIndex}
              className="flex shrink-0 items-center"
            >
              {/* Two pixel-identical groups mean translating the full track by
                  50% lands on the same visual frame with no seam or reset. */}
              {Array.from({ length: PHRASES_PER_GROUP }).map((__, phraseIndex) => (
                <span
                  key={phraseIndex}
                  className="flex shrink-0 items-center gap-6 px-3 sm:gap-9 sm:px-5"
                >
                  <span className="font-display text-[clamp(5rem,12vw,10.5rem)] leading-[0.78] font-black tracking-[0.01em] whitespace-nowrap text-foreground select-none">
                    <span style={{ fontVariationSettings: DISPLAY_FONT_VARIATIONS }}>
                      {MARQUEE_PHRASE}
                    </span>
                  </span>
                  <span
                    role="img"
                    aria-label="fire"
                    className="text-[clamp(2.5rem,6vw,5rem)] leading-none"
                  >
                    🔥
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

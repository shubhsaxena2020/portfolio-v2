'use client';

import { ArrowDown } from 'lucide-react';
import { motion, type MotionValue } from 'motion/react';

interface MarqueeHeroProps {
  marqueeOpacity: MotionValue<number>;
}

export function MarqueeHero({ marqueeOpacity }: MarqueeHeroProps) {
  return (
    <div className="relative w-full h-dvh min-h-[560px] overflow-hidden">
      <h1 className="sr-only">Shubh Saxena</h1>
      <motion.div
        aria-hidden="true"
        style={{ opacity: marqueeOpacity }}
        className="absolute inset-0 flex items-center overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex animate-marquee whitespace-nowrap motion-reduce:animate-none"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="mx-6 font-display text-[14rem] leading-none tracking-tight text-foreground sm:text-[19.5rem] lg:text-[25rem] select-none"
            >
              SHUBH SAXENA
            </span>
          ))}
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero-portrait-marquee.png"
          alt="Shubh Saxena"
          className="h-[calc(100%_-_5rem)] w-auto max-w-none object-contain object-bottom drop-shadow-2xl sm:h-[calc(100%_-_5.625rem)]"
        />
      </div>

      <div className="absolute bottom-6 left-6 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-muted sm:bottom-8 sm:left-10">
        <span className="flex size-9 items-center justify-center rounded-md border border-border sm:size-10">
          <ArrowDown className="size-4 animate-scroll-arrow motion-reduce:animate-none" />
        </span>
        Scroll down
      </div>

      <div className="absolute bottom-6 right-6 text-xs font-medium text-muted sm:bottom-8 sm:right-10">
        &copy;2026
      </div>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { MarqueeHero } from '@/components/marquee-hero';
import { AboutSection } from '@/components/about-section';

export function HeroAboutSection() {
  const aboutStageRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutStageRef,
    offset: ['start end', 'start start'],
  });
  const marqueeOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <section className="sticky top-0 z-0">
        <MarqueeHero marqueeOpacity={marqueeOpacity} />
      </section>
      <section
        ref={aboutStageRef}
        className="sticky top-0 z-10 flex min-h-dvh w-full items-stretch"
      >
        <AboutSection />
      </section>
    </>
  );
}

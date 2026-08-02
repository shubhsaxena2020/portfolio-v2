'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { MarqueeHero } from '@/components/marquee-hero';
import { AboutSection } from '@/components/about-section';

export function HeroAboutSection() {
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'start start'],
  });
  const marqueeOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="relative">
      <section className="sticky top-0">
        <MarqueeHero marqueeOpacity={marqueeOpacity} />
      </section>
      <AboutSection ref={aboutRef} />
    </div>
  );
}

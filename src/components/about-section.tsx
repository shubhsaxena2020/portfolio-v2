import { forwardRef } from 'react';
import { MoodEmoji } from '@/components/mood-emoji';
import { TypewriterReveal } from '@/components/typewriter-reveal';

const ABOUT_TEXT = `I'm Shubh Saxena, a developer focused on building AI-powered tools, automation systems, and modern web applications.

My work includes multi-agent systems, local-first knowledge systems, computer vision, browser-based 3D, and production web applications. I build software with a focus on reliability, maintainability, and practical outcomes, using AI to accelerate development—not replace engineering judgment.

Currently pursuing a BCA in Computer Science at PSIT College of Higher Education, Kanpur.`;

export const AboutSection = forwardRef<HTMLElement>(function AboutSection(
  _props,
  ref
) {
  return (
    <section
      ref={ref}
      id="about"
      className="relative z-10 flex min-h-screen items-center bg-foreground px-6 text-background sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 py-24 lg:grid-cols-[280px_1fr] lg:gap-16">
        <h2 className="flex items-center text-6xl font-bold tracking-tight sm:text-7xl">
          About
          <MoodEmoji />
        </h2>
        <TypewriterReveal
          text={ABOUT_TEXT}
          className="max-w-2xl space-y-6 text-lg leading-relaxed font-medium sm:text-xl"
        />
      </div>
    </section>
  );
});

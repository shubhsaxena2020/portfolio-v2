import { forwardRef } from 'react';
import { CharReveal } from '@/components/char-reveal';
import { TypewriterReveal } from '@/components/typewriter-reveal';
import { Highlighter } from '@/components/ui/highlighter';

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
      className="relative flex min-h-[clamp(620px,70dvh,680px)] w-full items-center bg-foreground px-6 text-background sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-6 sm:py-8 lg:gap-8 lg:py-10">
        <CharReveal
          as="h2"
          text="About"
          once={false}
          className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        />
        <p className="text-lg font-medium sm:text-xl">
          <Highlighter action="highlight" padding={3}>
            AI-powered tools &amp; automation
          </Highlighter>
        </p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr] lg:gap-12">
          <div className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/about-sketch-light.png"
              alt="Line-art sketch portrait of Shubh Saxena"
              className="block h-auto max-h-[320px] w-full object-contain rounded-xl [.dark_&]:hidden [.jungle_&]:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/about-sketch-dark.png"
              alt="Line-art sketch portrait of Shubh Saxena"
              className="hidden h-auto max-h-[320px] w-full object-contain rounded-xl [.dark_&]:block [.jungle_&]:block"
            />
          </div>
          <div className="min-w-0 max-w-3xl">
            <TypewriterReveal
              text={ABOUT_TEXT}
              className="space-y-4 text-base leading-relaxed font-medium sm:text-lg sm:space-y-6 lg:text-xl lg:leading-[1.65]"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

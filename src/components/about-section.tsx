import { forwardRef } from 'react';
import { CharReveal } from '@/components/char-reveal';
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/components/ui/terminal';

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
        <h2 className="text-6xl font-bold tracking-tight sm:text-7xl">About</h2>
        <div className="min-w-0 max-w-2xl">
          <CharReveal
            text={ABOUT_TEXT}
            className="space-y-6 text-lg leading-relaxed font-medium sm:text-xl"
          />
          <Terminal className="mt-10 h-64 max-w-none overflow-hidden border-slate-500/50 bg-[#111820] text-[#d7f9e3] shadow-2xl shadow-black/30 [&>div:first-child]:border-white/10">
            <TypingAnimation className="text-[#f4fbf6]">
              $ cortex status --local
            </TypingAnimation>
            <AnimatedSpan className="text-[#8ee6ad]">
              ✓ SQLite ready · 264 tests pass
            </AnimatedSpan>
            <TypingAnimation className="text-[#f4fbf6]">
              $ orchestrate --agents 5 --verify
            </TypingAnimation>
            <AnimatedSpan className="text-[#9fb3c8]">
              ✓ 5-agent toolchain ready
            </AnimatedSpan>
            <AnimatedSpan className="text-[#8ee6ad]">
              ✓ local-first memory graph online
            </AnimatedSpan>
          </Terminal>
        </div>
      </div>
    </section>
  );
});

'use client';

import { useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MessageSquare, Camera, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BorderBeam } from '@/components/ui/border-beam';
import { NoiseTexture } from '@/components/ui/noise-texture';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

/* -------------------------------------------------------------------------- */
/*  Reduced-motion helpers                                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const contactLinks: { label: string; href: string; icon: React.ReactNode; description: string }[] = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919792544925',
    icon: <MessageSquare className="size-5" />,
    description: 'Quick conversations',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/shubh_builds_',
    icon: <Camera className="size-5" />,
    description: 'Visual build log',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/shubh-saxena-a80376296',
    icon: <Briefcase className="size-5" />,
    description: 'Professional profile',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/shubhsaxena2020',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    description: 'Code & open source',
  },
];

/* -------------------------------------------------------------------------- */
/*  Contact Link Card                                                         */
/* -------------------------------------------------------------------------- */

function ContactCard({
  link,
  reducedMotion,
  index,
}: {
  link: (typeof contactLinks)[number];
  reducedMotion: boolean;
  index: number;
}) {
  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reducedMotion ? 0 : 0.45,
        delay: reducedMotion ? 0 : index * 0.06,
        ease: 'easeOut',
      }}
      className={cn(
        'group/card relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-background/70 p-5',
        'transition-all duration-300 motion-reduce:transition-none',
        'hover:border-accent/40 hover:bg-accent/[0.04] hover:shadow-[0_0_30px_-10px_var(--accent)]',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
      )}
    >
      {/* Icon container */}
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-foreground/[0.04] text-muted transition-all duration-200 group-hover/card:border-accent/30 group-hover/card:bg-accent/[0.08] group-hover/card:text-accent group-hover/card:shadow-[0_0_12px_-4px_var(--accent)]">
        {link.icon}
      </span>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-base font-semibold tracking-tight">
          {link.label}
          <ArrowUpRight className="size-3.5 text-muted opacity-0 transition-all duration-200 motion-reduce:transition-none group-hover/card:opacity-100 group-hover/card:text-accent" />
        </span>
        <span className="mt-0.5 block text-xs text-muted">
          {link.description}
        </span>
      </div>

      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -bottom-8 size-24 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 motion-reduce:transition-none group-hover/card:opacity-100"
      />
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Export                                                                */
/* -------------------------------------------------------------------------- */

export function ContactSection() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  return (
    <section
      id="contact"
      className="relative z-20 scroll-mt-28 border-t border-border bg-background px-6 py-24 sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Main container with border beam */}
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-background p-8 shadow-[0_32px_100px_-60px_var(--foreground)] sm:p-10 lg:p-14">
          {/* Background accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 55%), radial-gradient(ellipse at 80% 80%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 50%)',
            }}
          />

          <NoiseTexture
            noiseOpacity={0.05}
            className="opacity-25 mix-blend-soft-light [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_65%)]"
          />

          {/* Kicker */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reducedMotion ? 0 : 0.45 }}
            className="mb-3 flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.16em] text-muted uppercase"
          >
            <span className="relative flex size-1.5 items-center justify-center">
              <span className="absolute size-1.5 rounded-full bg-accent/30" />
              <span className="relative size-1 rounded-full bg-accent" />
            </span>
            Get in touch
            <span className="h-px min-w-4 flex-1 bg-border" />
            <span>4 channels</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[0.88] font-bold tracking-[-0.02em] sm:leading-[0.85]"
          >
            <AnimatedShinyText active={!reducedMotion}>
              Let&apos;s build something worth shipping.
            </AnimatedShinyText>
          </motion.h2>

          {/* Sub-text */}
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reducedMotion ? 0 : 0.45, delay: 0.08 }}
            className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            For project and technical conversations:
          </motion.p>

          {/* Contact cards grid */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {contactLinks.map((link, index) => (
              <ContactCard
                key={link.label}
                link={link}
                reducedMotion={reducedMotion}
                index={index}
              />
            ))}
          </div>

          {/* Closing line */}
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: 0.18 }}
            className="mt-12 border-t border-border pt-6 font-mono text-[0.72rem] leading-relaxed tracking-wide text-muted"
          >
            Currently beginning BCA-CSE at PSIT College of Higher Education,
            Kanpur, with Cortex in active development.
          </motion.p>

          {/* Corner accents */}
          <span className="absolute top-4 left-4 z-30 h-3 w-3 border-t border-l border-accent/40" />
          <span className="absolute right-4 bottom-4 z-30 h-3 w-3 border-r border-b border-accent/40" />

          <BorderBeam
            paused={reducedMotion}
            duration={10}
            size={80}
            colorFrom="var(--accent)"
            colorTo="color-mix(in srgb, var(--accent) 30%, var(--foreground))"
            className="opacity-70"
          />
          <BorderBeam
            paused={reducedMotion}
            reverse
            delay={5}
            duration={12}
            size={50}
            colorFrom="transparent"
            colorTo="var(--accent)"
            className="opacity-30"
          />
        </div>
      </div>
    </section>
  );
}

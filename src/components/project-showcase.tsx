'use client';

import Image from 'next/image';
import { ArrowUpRight, Code2, ExternalLink, GitBranch } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import Tilt from 'react-parallax-tilt';
import {
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from 'react';

import { BorderBeam } from '@/components/ui/border-beam';
import { NoiseTexture } from '@/components/ui/noise-texture';
import { cn } from '@/lib/utils';

export type ProjectCaseStudy = {
  title: string;
  tagline: string;
  problem: string;
  process: string;
  outcome: string;
  specs: [string, string][];
};

type ProjectEvidence = {
  href: string;
  image: string;
  alt: string;
  sourceLabel: string;
  sourceHost: string;
  layout: 'feature' | 'standard' | 'technical' | 'cinematic';
};

const projectEvidence: ProjectEvidence[] = [
  {
    href: 'https://github.com/shubhsaxena2020/cortex',
    image: '/assets/projects/cortex-github.png',
    alt: 'Public GitHub repository page for shubhsaxena2020/cortex',
    sourceLabel: 'View repository',
    sourceHost: 'github.com/shubhsaxena2020/cortex',
    layout: 'feature',
  },
  {
    href: 'https://github.com/shubhsaxena2020/furniture-3d-viewer',
    image: '/assets/projects/furniture-3d-viewer-github.png',
    alt: 'Public GitHub repository page for shubhsaxena2020/furniture-3d-viewer',
    sourceLabel: 'View repository',
    sourceHost: 'github.com/shubhsaxena2020/furniture-3d-viewer',
    layout: 'standard',
  },
  {
    href: 'https://github.com/shubhsaxena2020/ai-tools-monitor',
    image: '/assets/projects/ai-tools-monitor-github.png',
    alt: 'Public GitHub repository page for shubhsaxena2020/ai-tools-monitor',
    sourceLabel: 'View repository',
    sourceHost: 'github.com/shubhsaxena2020/ai-tools-monitor',
    layout: 'technical',
  },
  {
    href: 'https://github.com/shubhsaxena2020/multi-ai-framework',
    image: '/assets/projects/multi-ai-framework-github.png',
    alt: 'Public GitHub repository page for shubhsaxena2020/multi-ai-framework',
    sourceLabel: 'View repository',
    sourceHost: 'github.com/shubhsaxena2020/multi-ai-framework',
    layout: 'technical',
  },
  {
    href: 'https://friendly-travesseiro-4b4121.netlify.app',
    image: '/assets/projects/fbc-arena-live.png',
    alt: 'Live Fit Body Club Arena website showing its gym homepage hero',
    sourceLabel: 'View live site',
    sourceHost: 'friendly-travesseiro-4b4121.netlify.app',
    layout: 'cinematic',
  },
];

const cardSpans = [
  'lg:col-span-12',
  'lg:col-span-6',
  'lg:col-span-6',
  'lg:col-span-6',
  'lg:col-span-6',
];

const projectColorKeys = [
  'cortex',
  'furniture-3d',
  'ai-tools-monitor',
  'multi-ai-framework',
  'fbc-arena',
] as const;

const contributionPulsePoints = [
  [7, 24, 0],
  [14, 72, 0.8],
  [31, 15, 1.6],
  [68, 18, 0.5],
  [84, 65, 1.3],
  [94, 30, 2.1],
] as const;

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

function subscribeFinePointer(callback: () => void) {
  const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

function getSpecValue(project: ProjectCaseStudy, label: string) {
  return project.specs.find(([specLabel]) => specLabel === label)?.[1] ?? '—';
}

function ProjectSignalGraphic({
  index,
  shouldReduceMotion,
}: {
  index: number;
  shouldReduceMotion: boolean;
}) {
  const sharedTransition = {
    duration: shouldReduceMotion ? 0 : 2.8,
    repeat: shouldReduceMotion ? 0 : Infinity,
    ease: 'easeInOut' as const,
  };

  return (
    <div
      data-card-signal={index + 1}
      aria-hidden="true"
      className={cn(
        'absolute bottom-2 left-2 z-20 flex h-11 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-black/70 text-white shadow-lg backdrop-blur-md',
        index === 2 ? 'w-28 justify-start gap-2 px-2' : 'w-20',
      )}
    >
      {index === 0 ? (
        <svg viewBox="0 0 80 44" className="size-full">
          <motion.path
            d="M13 30 34 13l18 19 15-20"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".45"
            strokeWidth="1"
            initial={shouldReduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.8, ease: 'easeOut' }}
          />
          {[[13, 30], [34, 13], [52, 32], [67, 12]].map(([cx, cy], nodeIndex) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy={cy}
              r="2.5"
              fill="var(--accent)"
              animate={shouldReduceMotion ? { opacity: 0.8, scale: 1 } : { opacity: [0.35, 1, 0.35], scale: [0.8, 1.2, 0.8] }}
              transition={{ ...sharedTransition, delay: nodeIndex * 0.22 }}
            />
          ))}
        </svg>
      ) : null}

      {index === 1 ? (
        <motion.svg
          viewBox="0 0 80 44"
          className="size-full"
          animate={shouldReduceMotion ? false : { rotateY: [0, 12, 0, -12, 0] }}
          transition={{ ...sharedTransition, duration: shouldReduceMotion ? 0 : 5.5 }}
        >
          <path d="m24 12 22-5 12 10-21 6Z M24 12v18l13 7V23m21-6v17l-21 3m9-30v17" fill="none" stroke="var(--accent)" strokeWidth="1" />
          <path d="m24 30 22-6 12 10" fill="none" stroke="currentColor" strokeOpacity=".35" strokeWidth="1" />
        </motion.svg>
      ) : null}

      {index === 2 ? (
        <div className="flex items-center gap-2">
          <div className="flex h-6 items-end gap-0.5">
            {[8, 15, 22, 12, 19].map((height, barIndex) => (
              <motion.span
                key={barIndex}
                className="w-0.5 rounded-full bg-accent"
                style={{ height }}
                animate={shouldReduceMotion ? { scaleY: 0.72 } : { scaleY: [0.35, 1, 0.55] }}
                transition={{ ...sharedTransition, duration: 1.4 + barIndex * 0.13, delay: barIndex * 0.08 }}
              />
            ))}
          </div>
          <span className="font-mono text-[0.42rem] leading-3 tracking-wide text-white/75">
            <span className="block"><b className="text-accent">$</b> build Release</span>
            <span className="block"><b className="text-accent">$</b> test Release</span>
          </span>
        </div>
      ) : null}

      {index === 3 ? (
        <div className="relative size-full">
          <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
          {[0, 1, 2, 3, 4].map((nodeIndex) => (
            <motion.span
              key={nodeIndex}
              className="absolute top-1/2 left-1/2 h-px w-7 origin-left bg-white/35"
              style={{ rotate: `${nodeIndex * 72}deg` }}
              animate={shouldReduceMotion ? { opacity: 0.55 } : { opacity: [0.2, 0.75, 0.2] }}
              transition={{ ...sharedTransition, delay: nodeIndex * 0.16 }}
            >
              <span className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full border border-accent bg-black" />
            </motion.span>
          ))}
        </div>
      ) : null}

      {index === 4 ? (
        <div className="relative size-full">
          <span className="absolute top-2 left-2 size-2 border-t border-l border-accent" />
          <span className="absolute top-2 right-2 size-2 border-t border-r border-accent" />
          <span className="absolute bottom-2 left-2 size-2 border-b border-l border-accent" />
          <span className="absolute right-2 bottom-2 size-2 border-r border-b border-accent" />
          <motion.span
            className="absolute right-3 left-3 h-px bg-linear-to-r from-transparent via-accent to-transparent"
            animate={shouldReduceMotion ? { top: '50%' } : { top: ['28%', '72%', '28%'] }}
            transition={{ ...sharedTransition, duration: shouldReduceMotion ? 0 : 3.2 }}
          />
        </div>
      ) : null}
    </div>
  );
}

function EvidenceWindow({
  evidence,
  index,
  shouldReduceMotion,
}: {
  evidence: ProjectEvidence;
  index: number;
  shouldReduceMotion: boolean;
}) {
  return (
    <a
      href={evidence.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${evidence.sourceLabel}: ${evidence.sourceHost}`}
      className="group/evidence relative block overflow-hidden rounded-[1.1rem] border border-border bg-background shadow-[0_22px_55px_-38px_var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      style={{ transform: 'translateZ(18px)' }}
    >
      <div className="flex h-8 items-center gap-2.5 border-b border-border bg-foreground/[0.04] px-3">
        <span className="flex gap-1" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-foreground/20" />
          <span className="size-1.5 rounded-full bg-foreground/20" />
          <span className="size-1.5 rounded-full bg-accent/70" />
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[0.56rem] tracking-wide text-muted">
          {evidence.sourceHost}
        </span>
        <ArrowUpRight className="size-3 text-muted transition-transform duration-300 motion-reduce:transition-none group-hover/evidence:-translate-y-0.5 group-hover/evidence:translate-x-0.5" />
      </div>
      <div className="relative aspect-[16/6.1] overflow-hidden bg-foreground/[0.04]">
        <Image
          src={evidence.image}
          alt={evidence.alt}
          width={1440}
          height={1000}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="size-full object-cover object-top transition-transform duration-700 ease-out motion-reduce:transition-none group-hover/evidence:scale-[1.04] group-hover/evidence:-translate-y-1"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_48%,color-mix(in_srgb,var(--accent)_16%,transparent)_50%,transparent_52%)] bg-[length:240%_100%] bg-right opacity-0 transition-[background-position,opacity] duration-700 motion-reduce:transition-none group-hover/evidence:bg-left group-hover/evidence:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/55 to-transparent" />
        <ProjectSignalGraphic index={index} shouldReduceMotion={shouldReduceMotion} />
        <span className="absolute right-2 bottom-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.1em] text-white uppercase backdrop-blur-sm">
          {evidence.sourceLabel}
          <ExternalLink className="size-2.5" />
        </span>
      </div>
    </a>
  );
}

function ProjectNarrative({
  project,
  index,
  shouldReduceMotion,
}: {
  project: ProjectCaseStudy;
  index: number;
  shouldReduceMotion: boolean;
}) {
  const chapters = [
    ['Problem', project.problem],
    ['Process', project.process],
    ['Outcome', project.outcome],
  ] as const;
  const [activeChapter, setActiveChapter] = useState(2);

  return (
    <div className="rounded-xl border border-border bg-foreground/[0.025] p-3">
      <div role="tablist" aria-label={`${project.title} case study chapters`} className="flex gap-1 border-b border-border pb-2.5">
        {chapters.map(([label], chapterIndex) => (
          <button
            key={label}
            id={`project-${index}-tab-${chapterIndex}`}
            type="button"
            role="tab"
            aria-selected={activeChapter === chapterIndex}
            aria-controls={`project-${index}-panel`}
            onClick={() => setActiveChapter(chapterIndex)}
            className={cn(
              'rounded-md px-2 py-1 font-mono text-[0.55rem] tracking-[0.13em] uppercase transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-accent',
              activeChapter === chapterIndex
                ? 'bg-accent text-white'
                : 'text-muted hover:bg-foreground/[0.06] hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto self-center font-mono text-[0.52rem] tracking-[0.12em] text-muted uppercase">
          {activeChapter + 1} / 3
        </span>
      </div>
      <motion.p
        key={activeChapter}
        id={`project-${index}-panel`}
        role="tabpanel"
        aria-labelledby={`project-${index}-tab-${activeChapter}`}
        className="mt-2.5 text-[0.72rem] leading-[1.15rem] sm:text-xs sm:leading-5"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
      >
        {chapters[activeChapter][1]}
      </motion.p>
    </div>
  );
}

function ProjectIndex({
  project,
  industries,
}: {
  project: ProjectCaseStudy;
  industries: string[];
}) {
  return (
    <div className="mt-3 flex min-w-0 items-center gap-2 border-t border-border pt-3">
      <div className="flex min-w-0 flex-1 gap-1.5 overflow-hidden">
        {industries.map((industry) => (
          <span
            key={industry}
            className="shrink-0 rounded-full border border-border bg-foreground/[0.025] px-2 py-1 font-mono text-[0.52rem] tracking-[0.08em] uppercase"
          >
            #{industry}
          </span>
        ))}
      </div>
      <details data-project-specs className="group/specs relative shrink-0">
        <summary className="cursor-pointer list-none rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.1em] text-muted uppercase transition-colors marker:content-none motion-reduce:transition-none hover:border-accent/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent">
          Specs · {project.specs.length}
        </summary>
        <div className="absolute right-0 bottom-[calc(100%+0.55rem)] z-50 w-[min(19rem,calc(100vw-4rem))] rounded-xl border border-border bg-background/95 p-3 shadow-[0_24px_70px_-28px_var(--foreground)] backdrop-blur-xl">
          <dl className="max-h-52 space-y-2.5 overflow-y-auto pr-1">
            {project.specs.map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[0.52rem] tracking-[0.13em] text-muted uppercase">{label}</dt>
                <dd className="mt-0.5 text-xs leading-5">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </details>
    </div>
  );
}

function ProjectCard({
  project,
  evidence,
  industries,
  index,
  shouldReduceMotion,
  hasFinePointer,
}: {
  project: ProjectCaseStudy;
  evidence: ProjectEvidence;
  industries: string[];
  index: number;
  shouldReduceMotion: boolean;
  hasFinePointer: boolean;
}) {
  const isFeature = evidence.layout === 'feature';
  const tiltEnabled = hasFinePointer && !shouldReduceMotion;
  const projectColorKey = projectColorKeys[index];

  return (
    <motion.div
      data-project-accent={projectColorKey}
      className={cn('min-w-0', cardSpans[index])}
      style={
        {
          '--project-color': `var(--project-${projectColorKey})`,
          '--project-color-foreground': `var(--project-${projectColorKey}-foreground)`,
        } as CSSProperties
      }
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.14),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Tilt
        tiltEnable={tiltEnabled}
        glareEnable={tiltEnabled}
        tiltMaxAngleX={2.4}
        tiltMaxAngleY={2.8}
        glareMaxOpacity={0.09}
        glareColor="var(--accent)"
        glarePosition="all"
        glareBorderRadius="1.45rem"
        perspective={1500}
        scale={1.006}
        transitionSpeed={650}
        className="h-full [transform-style:preserve-3d]"
      >
        <article
          data-project-card
          data-project-layout={evidence.layout}
          data-tilt-enabled={tiltEnabled ? 'true' : 'false'}
          className="group/card relative isolate h-full min-w-0 overflow-hidden rounded-[1.45rem] border border-border bg-background p-4 shadow-[0_26px_80px_-58px_var(--foreground)] [transform-style:preserve-3d] sm:p-5"
        >
          <div
            data-project-accent-edge
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[3px] bg-[var(--project-color)] shadow-[0_0_18px_color-mix(in_srgb,var(--project-color)_36%,transparent)]"
          />
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_88%_0%,color-mix(in_srgb,var(--project-color)_4%,transparent),transparent_40%)]" />
          <div
            data-project-hover-tint
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-20 bg-[var(--project-color)] opacity-0 transition-opacity duration-500 ease-out motion-reduce:transition-none group-hover/card:opacity-[0.08]"
          />
          <div className="pointer-events-none absolute -top-24 -right-20 -z-10 size-56 rounded-full border border-[color-mix(in_srgb,var(--project-color)_18%,transparent)] transition-transform duration-700 motion-reduce:transition-none group-hover/card:scale-110" />
          <NoiseTexture noiseOpacity={0.08} className="-z-10 opacity-25 mix-blend-soft-light" />

          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/[0.035] px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.11em] uppercase">
              <Code2 className="size-2.5 text-accent" />
              {getSpecValue(project, 'Discipline').split(',')[0]}
            </span>
            <span className="min-w-0 truncate rounded-full border border-accent/35 bg-accent/[0.07] px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.1em] text-accent uppercase">
              {getSpecValue(project, 'Status')}
            </span>
            <span className="ml-auto rounded-full bg-[var(--project-color)] px-2 py-1 font-mono text-[0.55rem] tracking-[0.14em] text-[var(--project-color-foreground)] shadow-[0_5px_16px_-9px_var(--project-color)]">
              0{index + 1} / 05
            </span>
          </div>

          <div className={cn('grid gap-4', isFeature && 'lg:grid-cols-[0.82fr_1.18fr] lg:items-center')}>
            <header className="relative z-10" style={{ transform: 'translateZ(12px)' }}>
              <h3
                className={cn(
                  'font-display font-bold leading-[0.94] tracking-[0.005em] text-balance',
                  isFeature
                    ? 'text-[clamp(2.45rem,4.7vw,4.45rem)]'
                    : 'text-[clamp(1.95rem,2.8vw,2.8rem)]',
                )}
              >
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted sm:text-[0.92rem] sm:leading-6">{project.tagline}</p>
              <a
                href={evidence.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold underline decoration-border underline-offset-4 transition-colors motion-reduce:transition-none hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {evidence.sourceLabel}
                <ArrowUpRight className="size-3.5" />
              </a>
            </header>

            <EvidenceWindow evidence={evidence} index={index} shouldReduceMotion={shouldReduceMotion} />
          </div>

          <div className="mt-3">
            <ProjectNarrative project={project} index={index} shouldReduceMotion={shouldReduceMotion} />
          </div>
          <ProjectIndex project={project} industries={industries} />

          <BorderBeam
            paused={shouldReduceMotion}
            duration={8 + index}
            delay={index * 0.8}
            size={66}
            colorFrom="transparent"
            colorTo="var(--project-color)"
            className="opacity-55"
          />
        </article>
      </Tilt>
    </motion.div>
  );
}

function LiveContributionGraph({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <motion.aside
      data-github-contributions
      data-graph-status={status}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group/graph relative mt-5 overflow-hidden rounded-[1.55rem] border border-border bg-foreground/[0.025] p-4 shadow-[0_26px_90px_-62px_var(--foreground)] motion-reduce:!transform-none motion-reduce:!opacity-100 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_36%),radial-gradient(circle_at_90%_100%,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_32%)]" />
      <NoiseTexture noiseOpacity={0.1} className="opacity-30 mix-blend-soft-light" />
      {contributionPulsePoints.map(([left, top, delay]) => (
        <motion.span
          key={`${left}-${top}`}
          aria-hidden="true"
          className="pointer-events-none absolute size-1 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
          style={{ left: `${left}%`, top: `${top}%` }}
          animate={shouldReduceMotion ? { opacity: 0.28 } : { opacity: [0.1, 0.75, 0.1], scale: [0.7, 1.5, 0.7] }}
          transition={{ duration: shouldReduceMotion ? 0 : 3.2, delay, repeat: shouldReduceMotion ? 0 : Infinity }}
        />
      ))}

      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.18em] text-muted uppercase">
            <GitBranch className="size-3.5" />
            Live GitHub activity
            <span className="relative ml-1 flex size-2 items-center justify-center">
              <motion.span
                className="absolute size-2 rounded-full bg-accent/35"
                animate={shouldReduceMotion ? false : { scale: [1, 2.1], opacity: [0.7, 0] }}
                transition={{ duration: shouldReduceMotion ? 0 : 1.8, repeat: shouldReduceMotion ? 0 : Infinity }}
              />
              <span className="relative size-1 rounded-full bg-accent" />
            </span>
          </p>
          <h3 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">Work leaves a trail.</h3>
        </div>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <span className="font-mono text-[0.54rem] tracking-[0.15em] text-muted uppercase">Live SVG · source intact</span>
          <a
            href="https://github.com/shubhsaxena2020"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 text-xs font-medium underline decoration-border underline-offset-4 transition-colors motion-reduce:transition-none hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            github.com/shubhsaxena2020
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>

      <div
        data-github-graph-frame
        className="relative z-10 mt-5 min-h-24 overflow-hidden rounded-xl border border-border bg-white p-3 shadow-[0_18px_45px_-30px_#000] transition-transform duration-500 motion-reduce:transition-none group-hover/graph:-translate-y-0.5 sm:p-4"
      >
        {status !== 'error' ? (
          <motion.div
            className="relative"
            initial={shouldReduceMotion ? false : { opacity: 0.35, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* The SVG remains the live contribution service; only its presentation animates. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ghchart.rshah.org/shubhsaxena2020"
              alt="Live GitHub contribution graph for shubhsaxena2020"
              width={663}
              height={104}
              loading="lazy"
              decoding="async"
              onLoad={() => setStatus('loaded')}
              onError={() => setStatus('error')}
              className="h-auto w-full"
            />
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 origin-right bg-white"
              initial={shouldReduceMotion ? false : { scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1.1, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        ) : (
          <p className="flex min-h-16 items-center text-sm text-slate-700">
            Live activity is temporarily unavailable. The GitHub profile link remains available above.
          </p>
        )}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-2 w-px bg-linear-to-b from-transparent via-emerald-500/70 to-transparent shadow-[0_0_12px_#22c55e]"
          animate={shouldReduceMotion ? { left: '50%', opacity: 0 } : { left: ['0%', '100%'], opacity: [0, 0.85, 0] }}
          transition={{ duration: shouldReduceMotion ? 0 : 3.8, repeat: shouldReduceMotion ? 0 : Infinity, ease: 'linear', repeatDelay: 1.2 }}
        />
      </div>

      <BorderBeam
        paused={shouldReduceMotion}
        duration={7.5}
        size={84}
        colorFrom="var(--accent)"
        colorTo="color-mix(in srgb, var(--accent) 32%, var(--foreground))"
        className="opacity-75"
      />
    </motion.aside>
  );
}

export function ProjectShowcase({
  projects,
  industries,
}: {
  projects: ProjectCaseStudy[];
  industries: string[][];
}) {
  const shouldReduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const hasFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
  const handoffRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: handoffProgress } = useScroll({
    target: handoffRef,
    offset: ['start end', 'end end'],
  });
  const handoffLift = useTransform(handoffProgress, [0, 0.55, 1], [18, 0, -8]);
  const handoffOpacity = useTransform(handoffProgress, [0, 0.35, 1], [0.35, 1, 1]);

  return (
    <div
      data-project-showcase
      data-reduced-motion={shouldReduceMotion ? 'true' : 'false'}
      className="relative"
    >
      <motion.div
        data-showcase-intro
        className="mb-5 grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-[0.57rem] tracking-[0.15em] text-muted uppercase sm:gap-5 sm:text-[0.62rem]"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      >
        <span className="text-foreground">Case files open</span>
        <span className="relative h-px overflow-hidden bg-border">
          <motion.span
            className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-transparent via-accent to-transparent"
            animate={shouldReduceMotion ? { x: 0, opacity: 0.35 } : { x: ['-100%', '900%'], opacity: [0, 0.9, 0] }}
            transition={{ duration: shouldReduceMotion ? 0 : 4.5, repeat: shouldReduceMotion ? 0 : Infinity, ease: 'linear' }}
          />
        </span>
        <span>Outcome first · details on demand</span>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            evidence={projectEvidence[index]}
            industries={industries[index]}
            index={index}
            shouldReduceMotion={shouldReduceMotion}
            hasFinePointer={hasFinePointer}
          />
        ))}
      </div>

      <LiveContributionGraph shouldReduceMotion={shouldReduceMotion} />

      <div
        ref={handoffRef}
        data-projects-handoff
        data-reduced-motion={shouldReduceMotion ? 'true' : 'false'}
        className="relative mt-5 h-40 sm:h-48"
      >
      <motion.a
        data-showcase-outro
        href="#skills"
        className="sticky top-[calc(100dvh-5.25rem)] grid grid-cols-[auto_1fr_auto] items-center gap-3 overflow-hidden rounded-xl border border-border bg-background/95 px-3.5 pt-3.5 pb-3 font-mono text-[0.56rem] tracking-[0.14em] text-muted uppercase shadow-[0_22px_55px_-34px_var(--foreground)] backdrop-blur-xl transition-colors motion-reduce:transition-none hover:border-accent/45 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:gap-5 sm:text-[0.62rem]"
        style={{
          y: shouldReduceMotion ? 0 : handoffLift,
          opacity: shouldReduceMotion ? 1 : handoffOpacity,
        }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 grid h-0.5 grid-cols-5"
        >
          {projectColorKeys.map((colorKey) => (
            <span
              key={colorKey}
              style={{ backgroundColor: `var(--project-${colorKey})` }}
            />
          ))}
        </span>
        <span>05 / 05 evidence logged</span>
        <span className="h-px bg-border" />
        <span className="text-accent">Continue to capabilities ↓</span>
      </motion.a>
      </div>
    </div>
  );
}

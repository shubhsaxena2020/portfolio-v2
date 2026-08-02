'use client';

import { useSyncExternalStore } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { NoiseTexture } from '@/components/ui/noise-texture';
import {
  Bot,
  Layers,
  Cpu,
  Binary,
  Globe,
  Boxes,
  Search,
  Eye,
  Network,
  Monitor,
  Code2,
  Sparkles,
} from 'lucide-react';

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

type SkillItem = {
  name: string;
  slug?: string;
  icon?: React.ReactNode;
  description?: string;
};

type SkillCategory = {
  title: string;
  kicker: string;
  items: SkillItem[];
};

const skillCategories: SkillCategory[] = [
  {
    title: 'AI-Assisted Development',
    kicker: 'Core tooling',
    items: [
      { name: 'Claude Code', slug: 'claude', icon: <Bot className="size-4" /> },
      { name: 'Codex', icon: <Code2 className="size-4" /> },
      { name: 'Hermes', slug: 'hermes', icon: <Sparkles className="size-4" /> },
      { name: 'OpenCode', slug: 'opencode', icon: <Terminal className="size-4" /> },
      { name: 'Antigravity', icon: <Boxes className="size-4" /> },
    ],
  },
  {
    title: 'Applied Project Stack',
    kicker: 'Build stack',
    items: [
      {
        name: 'Cortex',
        description: 'Electron, React, TypeScript, SQLite, embeddings',
        icon: <Layers className="size-4" />,
      },
      {
        name: 'Furniture 3D Viewer',
        description: 'Python, FastAPI, Three.js, OpenCV',
        icon: <Eye className="size-4" />,
      },
      {
        name: 'AI Tools Monitor',
        description: 'C#, Windows system tray',
        icon: <Monitor className="size-4" />,
      },
      {
        name: 'multi-ai-framework',
        description: 'Claude Code skills, multi-agent protocols',
        icon: <Network className="size-4" />,
      },
      {
        name: 'FBC Arena',
        description: 'Web technologies, Netlify deployment',
        icon: <Globe className="size-4" />,
      },
    ],
  },
  {
    title: 'Technical Focus',
    kicker: 'Domains',
    items: [
      { name: 'RAG & AI Tooling', description: 'Retrieval-augmented generation, embeddings, semantic search', icon: <Search className="size-4" /> },
      { name: 'Desktop Apps', description: 'Electron applications and Windows tray utilities', icon: <Monitor className="size-4" /> },
      { name: 'Information Retrieval', description: 'Full-text search, semantic retrieval, memory graphs', icon: <Binary className="size-4" /> },
      { name: '3D & Computer Vision', description: 'PBR materials, texture transfer, image processing', icon: <Eye className="size-4" /> },
      { name: 'Multi-Agent Systems', description: 'Verification-first delegation across AI agent tools', icon: <Cpu className="size-4" /> },
      { name: 'Web Delivery', description: 'Client landing pages and live deployment', icon: <Globe className="size-4" /> },
    ],
  },
];

/** All unique tech names for the scrolling marquee strip */
const marqueeTechs = [
  'Electron', 'React', 'TypeScript', 'Python', 'Three.js',
  'Tailwind', 'GitHub', 'Docker', 'SQLite', 'FastAPI',
  'OpenCV', 'Next.js', 'C#', 'Git', 'Java',
];

/* -------------------------------------------------------------------------- */
/*  Tiny inline Terminal icon (so we don't import a whole component)          */
/* -------------------------------------------------------------------------- */

function Terminal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tech Marquee Strip — horizontal scrolling tech names                      */
/* -------------------------------------------------------------------------- */

function TechMarqueeStrip({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
      className="mb-8 overflow-hidden rounded-2xl border border-border bg-foreground/[0.025] py-4"
    >
      <div className="relative">
        <div
          data-marquee-strip
          className="flex w-max gap-4 will-change-transform"
          style={{
            animation: reducedMotion ? 'none' : 'marquee-strip 30s linear infinite',
          }}
        >
          {[...marqueeTechs, ...marqueeTechs].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 font-mono text-[0.7rem] tracking-wide text-muted uppercase shadow-sm backdrop-blur-sm transition-colors duration-200 hover:border-accent/40 hover:text-accent"
            >
              <span className="size-1.5 rounded-full bg-accent/50" />
              {tech}
            </span>
          ))}
        </div>
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-foreground/[0.025] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-foreground/[0.025] to-transparent" />
      </div>
      <style>{`
        @keyframes marquee-strip {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-marquee-strip] { animation: none !important; }
        }
      `}</style>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Skill Item Chip                                                           */
/* -------------------------------------------------------------------------- */

function SkillChip({ item, reducedMotion, index }: { item: SkillItem; reducedMotion: boolean; index: number }) {
  const hasImage = !!item.slug;

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reducedMotion ? 0 : 0.4,
        delay: reducedMotion ? 0 : index * 0.04,
        ease: 'easeOut',
      }}
      className="group/chip relative flex items-start gap-3 rounded-xl border border-border bg-background/60 p-3.5 transition-all duration-300 motion-reduce:transition-none hover:border-accent/30 hover:bg-accent/[0.04] hover:shadow-[0_0_20px_-8px_var(--accent)]"
    >
      {/* Icon */}
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-foreground/[0.04] text-muted transition-colors duration-200 group-hover/chip:border-accent/30 group-hover/chip:text-accent">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://cdn.simpleicons.org/${item.slug}/${item.slug}`}
            alt=""
            width={18}
            height={18}
            loading="lazy"
            decoding="async"
            className="size-[18px]"
          />
        ) : (
          item.icon
        )}
      </span>
      {/* Text */}
      <div className="min-w-0 flex-1">
        <span className="block text-sm font-medium leading-snug">{item.name}</span>
        {item.description && (
          <span className="mt-1 block text-xs leading-relaxed text-muted">
            {item.description}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Category Card                                                             */
/* -------------------------------------------------------------------------- */

function CategoryCard({
  category,
  reducedMotion,
  index,
  span,
}: {
  category: SkillCategory;
  reducedMotion: boolean;
  index: number;
  span: string;
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        delay: reducedMotion ? 0 : index * 0.08,
        ease: 'easeOut',
      }}
      className={cn(
        'relative isolate overflow-hidden rounded-[1.6rem] border border-border bg-background p-5 shadow-[0_20px_70px_-50px_var(--foreground)] sm:p-6',
        span,
      )}
    >
      {/* Background gradient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            index === 0
              ? 'radial-gradient(ellipse at top left, color-mix(in srgb, var(--accent) 14%, transparent), transparent 50%)'
              : index === 1
                ? 'radial-gradient(ellipse at top right, color-mix(in srgb, var(--accent) 10%, transparent), transparent 50%)'
                : 'radial-gradient(ellipse at bottom center, color-mix(in srgb, var(--accent) 8%, transparent), transparent 50%)',
        }}
      />

      {/* Kicker */}
      <div className="mb-4 flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.16em] text-muted uppercase">
        <span className="relative flex size-1.5 items-center justify-center">
          <span className="absolute size-1.5 rounded-full bg-accent/30" />
          <span className="relative size-1 rounded-full bg-accent" />
        </span>
        {category.kicker}
        <span className="h-px min-w-3 flex-1 bg-border" />
      </div>

      {/* Title */}
      <h3 className="mb-5 font-display text-xl font-bold tracking-tight sm:text-2xl">
        <span style={{ fontVariationSettings: '"wght" 620, "opsz" 72' }}>
          {category.title}
        </span>
      </h3>

      {/* Items grid */}
      <div className="grid gap-2.5">
        {category.items.map((item, itemIndex) => (
          <SkillChip
            key={item.name}
            item={item}
            reducedMotion={reducedMotion}
            index={itemIndex}
          />
        ))}
      </div>

      <NoiseTexture
        noiseOpacity={0.06}
        className="opacity-30 mix-blend-soft-light [mask-image:radial-gradient(ellipse_at_80%_20%,black,transparent_60%)]"
      />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Export                                                                */
/* -------------------------------------------------------------------------- */

export function SkillsSection() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  return (
    <section
      id="skills"
      className="relative z-20 scroll-mt-28 border-t border-border bg-background px-6 py-24 sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          className="mb-10"
        >
          <div className="mb-3 flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] text-muted uppercase">
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute size-2 rounded-full bg-accent/30" />
              <span className="relative size-1 rounded-full bg-accent" />
            </span>
            Stack overview
            <span className="h-px min-w-4 flex-1 bg-border" />
            <span>15 stack signals</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.82] font-bold tracking-[-0.02em]">
            <span style={{ fontVariationSettings: '"wght" 620, "opsz" 72' }}>
              Skills &amp; Tech Stack
            </span>
          </h2>
        </motion.div>

        {/* Marquee strip of tech names */}
        <TechMarqueeStrip reducedMotion={reducedMotion} />

        {/* Bento grid */}
        <div className="grid gap-5 lg:grid-cols-12">
          {skillCategories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              reducedMotion={reducedMotion}
              index={index}
              span={
                index === 0
                  ? 'lg:col-span-4'
                  : index === 1
                    ? 'lg:col-span-5'
                    : 'lg:col-span-3'
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

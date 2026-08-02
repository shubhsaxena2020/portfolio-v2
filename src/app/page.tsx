import { ArrowDownRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HeroAboutSection } from "@/components/hero-about-section";
import { ScrollMarquee } from "@/components/scroll-marquee";

type CaseStudy = {
  title: string;
  tagline: string;
  problem: string;
  process: string;
  outcome: string;
  specs: [string, string][];
};

const caseStudies: CaseStudy[] = [
  {
    title: "Cortex — Local Knowledge, Connected",
    tagline:
      "A local-first knowledge tool combining semantic retrieval, full-text search, and an auto-linking memory graph in a desktop application.",
    problem:
      "Build a knowledge system that keeps information on the user's machine while supporting meaning-based retrieval, direct text search, and automatic connections between notes.",
    process:
      "Cortex is built with Electron, React, TypeScript, and SQLite. Embeddings power semantic search, full-text indexing handles direct retrieval, and the memory graph automatically links related information.",
    outcome:
      "A functional desktop knowledge system with semantic search, full-text retrieval, a navigable memory graph, and 264 passing tests.",
    specs: [
      ["Discipline", "Desktop Application, Information Retrieval"],
      ["Tools", "Electron, React, TypeScript, SQLite, Embeddings"],
      ["Tests", "264 passing"],
      ["Status", "In development"],
    ],
  },
  {
    title: "Furniture 3D Viewer — From Photograph to Interactive 3D",
    tagline:
      "A browser-based pipeline that converts furniture photographs into textured, interactive 3D models.",
    problem:
      "Convert a standard furniture photograph into a model that can be rotated and inspected in the browser, with texture and material detail preserved in the output.",
    process:
      "The pipeline combines Python, FastAPI, and OpenCV for image and model processing. Three.js renders the result in the browser using PBR materials and multi-view texture transfer.",
    outcome:
      "A working photo-to-model pipeline that produces textured, rotatable furniture models for browser-based viewing.",
    specs: [
      ["Discipline", "Computer Vision, 3D Graphics"],
      ["Tools", "Python, FastAPI, Three.js, OpenCV"],
      ["Rendering", "PBR Materials, Multi-View Texture Transfer"],
      ["Status", "Working pipeline"],
    ],
  },
  {
    title: "AI Tools Monitor — Live Usage Across Five AI Tools",
    tagline:
      "A Windows tray application that tracks real usage across Claude Code, Codex, Hermes, OpenCode, and Antigravity.",
    problem:
      "Usage was distributed across five AI CLI tools without a single live view of activity across the complete workflow.",
    process:
      "Built in C# as a Windows system tray application. The monitor tracks activity across all five tools while remaining available from the taskbar.",
    outcome:
      "A live Windows utility that records actual usage across the complete AI toolset.",
    specs: [
      ["Discipline", "Desktop Utility, Usage Analytics"],
      ["Tools", "C#, Windows System Tray"],
      ["Monitors", "Claude Code, Codex, Hermes, OpenCode, Antigravity"],
      ["Status", "Live Windows application"],
    ],
  },
  {
    title: "multi-ai-framework — Verification-First Agent Delegation",
    tagline:
      "A published open-source Claude Code skill for delegating work across multiple AI agents with verification built into the process.",
    problem:
      "Multi-agent delegation becomes unreliable when completed work returns without a defined verification step.",
    process:
      "The framework establishes a verification-first delegation protocol and supports five agent tools: Claude Code, Codex, OpenCode, Hermes, and Antigravity.",
    outcome:
      "A published, MIT-licensed open-source skill with a dedicated GitHub repository and support for five agent tools.",
    specs: [
      ["Discipline", "AI Orchestration, Agent Frameworks"],
      ["Tools", "Claude Code Skills, Multi-Agent Protocols"],
      ["Agents", "Claude Code, Codex, OpenCode, Hermes, Antigravity"],
      ["License", "MIT"],
      ["Status", "Open-source, published"],
    ],
  },
  {
    title: "FBC Arena — Client Website for a Kanpur Gym",
    tagline:
      "A complete landing page for Fit Body Club Arena, a Kanpur gym coached by an IFBB Men's Physique athlete.",
    problem:
      "Establish a focused online presence covering the gym's membership offer, coaching credentials, training facilities, member testimonials, and essential visitor information.",
    process:
      "Built as a complete landing page with a hero section, membership offer, coach credentials, seven training zones, real testimonials, address, and operating hours.",
    outcome:
      "A live client website deployed at friendly-travesseiro-4b4121.netlify.app. The site is live and in active development.",
    specs: [
      ["Discipline", "Web Design, Client Project"],
      ["Tools", "Web Technologies, Netlify"],
      ["Client", "Fit Body Club Arena, Kanpur"],
      ["Coach", "IFBB Men's Physique Athlete"],
      ["Status", "Live, in active refinement"],
    ],
  },
];

const projectIndustries: string[][] = [
  ["AI", "Desktop", "Knowledge"],
  ["3D", "ComputerVision", "Ecommerce"],
  ["AI", "DeveloperTools", "Analytics"],
  ["AI", "OpenSource", "Agents"],
  ["Fitness", "Web", "LocalBusiness"],
];

function getSpecValue(project: CaseStudy, label: string) {
  return project.specs.find(([specLabel]) => specLabel === label)?.[1] ?? "—";
}

const skillCategories: [string, string[]][] = [
  [
    "AI-Assisted Development",
    ["Claude Code", "Codex", "Hermes", "OpenCode", "Antigravity"],
  ],
  [
    "Applied Project Stack",
    [
      "Cortex: Electron, React, TypeScript, SQLite, embeddings",
      "Furniture 3D Viewer: Python, FastAPI, Three.js, OpenCV",
      "AI Tools Monitor: C#, Windows system tray",
      "multi-ai-framework: Claude Code skills, multi-agent protocols",
      "FBC Arena: Web technologies, Netlify deployment",
    ],
  ],
  [
    "Technical Focus",
    [
      "RAG and AI Tooling: Retrieval-augmented generation, embeddings, semantic search",
      "Desktop Applications: Electron applications and Windows tray utilities",
      "Information Retrieval: Full-text search, semantic retrieval, memory graphs",
      "3D Graphics and Computer Vision: PBR materials, texture transfer, image processing",
      "Multi-Agent Systems: Verification-first delegation across AI agent tools",
      "Web Delivery: Client landing pages and live deployment",
    ],
  ],
];

const contactLinks: [string, string][] = [
  ["WhatsApp", "https://wa.me/919792544925"],
  ["Instagram", "https://instagram.com/shubh_builds_"],
  ["LinkedIn", "https://linkedin.com/in/shubh-saxena-a80376296"],
  ["GitHub", "https://github.com/shubhsaxena2020"],
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero, pinned so About slides up over it */}
      <HeroAboutSection />

      {/* Scroll-linked statement between About and Projects */}
      <ScrollMarquee />

      {/* Projects */}
      <section
        id="work"
        className="relative z-20 scroll-mt-28 border-t border-border bg-background px-6 py-24 sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          <ScrollReveal>
            <div className="mb-14 flex items-end justify-between gap-6 border-b border-border pb-8 sm:mb-16">
              <h2 className="font-display text-7xl leading-none font-black tracking-tight sm:text-8xl lg:text-9xl">
                Projects
              </h2>
              <span className="mb-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-border sm:size-12">
                <ArrowDownRight className="size-5" aria-hidden="true" />
              </span>
            </div>
          </ScrollReveal>
          <div className="divide-y divide-border border-b border-border">
            {caseStudies.map((project, index) => (
              <ScrollReveal key={project.title} delay={Math.min(index * 0.1, 0.3)}>
                <article
                  data-project-row
                  className="group py-10 sm:py-14"
                >
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-start lg:gap-12">
                    <div>
                      <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
                        Project {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-4xl">
                        {project.title}
                      </h3>
                    </div>
                    <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:pt-7">
                      {project.tagline}
                    </p>
                  </div>

                  <dl className="mt-8 grid grid-cols-2 border-y border-border lg:grid-cols-[0.75fr_1fr_1.4fr_1.2fr]">
                    <div className="border-r border-b border-border py-5 pr-4 lg:border-b-0">
                      <dt data-project-meta-header className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                        Timeframe
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed">
                        {getSpecValue(project, "Status")}
                      </dd>
                    </div>
                    <div className="border-b border-border py-5 pl-4 lg:border-r lg:border-b-0 lg:px-5">
                      <dt data-project-meta-header className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                        Discipline
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed">
                        {getSpecValue(project, "Discipline")}
                      </dd>
                    </div>
                    <div className="border-r border-border py-5 pr-4 lg:px-5">
                      <dt data-project-meta-header className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                        Tools
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed">
                        {getSpecValue(project, "Tools")}
                      </dd>
                    </div>
                    <div className="py-5 pl-4 lg:pl-5">
                      <dt data-project-meta-header className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                        Industry
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-1.5">
                        {projectIndustries[index].map((industry) => (
                          <span
                            key={industry}
                            className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.65rem] tracking-wide uppercase"
                          >
                            #{industry}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-8 grid gap-8 sm:grid-cols-3">
                    <div>
                      <h4 className="mb-2 text-sm font-medium tracking-widest text-muted uppercase">
                        Problem
                      </h4>
                      <p className="leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium tracking-widest text-muted uppercase">
                        Process
                      </h4>
                      <p className="leading-relaxed">{project.process}</p>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium tracking-widest text-muted uppercase">
                        Outcome
                      </h4>
                      <p className="leading-relaxed">{project.outcome}</p>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Tech Stack */}
      <section
        id="skills"
        className="relative z-20 scroll-mt-28 border-t border-border bg-background px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto w-full max-w-5xl">
          <ScrollReveal>
            <h2 className="mb-12 text-sm font-medium tracking-widest text-muted uppercase">
              Skills &amp; Tech Stack
            </h2>
            <div className="grid gap-12 sm:grid-cols-3">
              {skillCategories.map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-4 text-lg font-semibold">{category}</h3>
                  <ul className="space-y-2 text-muted">
                    {items.map((item) => (
                      <li key={item} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative z-20 scroll-mt-28 border-t border-border bg-background px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto w-full max-w-5xl">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&apos;s build something worth shipping.
            </h2>
            <p className="mt-4 text-lg text-muted">
              For project and technical conversations:
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {contactLinks.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-lg text-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-16 text-sm text-muted">
              Currently beginning BCA-CSE at PSIT College of Higher Education,
              Kanpur, with Cortex in active development.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

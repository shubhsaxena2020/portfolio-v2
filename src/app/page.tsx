import { ScrollReveal } from "@/components/scroll-reveal";
import { MarqueeHero } from "@/components/marquee-hero";

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
      {/* Hero */}
      <section className="relative">
        <MarqueeHero />
      </section>

      {/* About */}
      <section
        id="about"
        className="scroll-mt-28 border-t border-border px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto w-full max-w-5xl">
          <ScrollReveal>
            <h2 className="mb-8 text-sm font-medium tracking-widest text-muted uppercase">
              About
            </h2>
            <div className="space-y-6 text-lg leading-relaxed sm:text-xl">
              <p>
                I&apos;m Shubh Saxena. I build through AI-assisted development
                workflows, with work spanning a local-first knowledge system
                backed by 264 passing tests, a published verification-first
                multi-agent framework, and a live client website.
              </p>
              <p>
                I build working systems with measurable outcomes. My projects
                span local-first knowledge retrieval, computer vision,
                browser-based 3D rendering, Windows usage analytics,
                multi-agent orchestration, and client web delivery.
              </p>
              <p>
                I architect, build, debug, test, and refine software through a
                disciplined engineering process, using AI-assisted tools to
                amplify—not replace—my judgment. That approach powers projects
                from Cortex&apos;s auto-linking memory graph to a live
                monitoring application covering five AI CLI tools.
              </p>
              <p>
                At 17, I began the BCA-CSE program at PSIT College of Higher
                Education, Kanpur, in August 2026. I completed CBSE Class XII
                in 2026.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Studies */}
      <section
        id="work"
        className="scroll-mt-28 border-t border-border px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto w-full max-w-5xl">
          <ScrollReveal>
            <h2 className="mb-12 text-sm font-medium tracking-widest text-muted uppercase">
              Case Studies
            </h2>
          </ScrollReveal>
          <div className="space-y-20">
            {caseStudies.map((project, index) => (
              <ScrollReveal key={project.title} delay={Math.min(index * 0.1, 0.3)}>
                <article className="group rounded-lg border border-transparent p-6 -m-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-lg text-muted">
                    {project.tagline}
                  </p>
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
                  <dl className="mt-8 grid gap-x-8 gap-y-2 border-t border-border pt-6 sm:grid-cols-2">
                    {project.specs.map(([label, detail]) => (
                      <div key={label} className="flex gap-2 text-sm">
                        <dt className="min-w-28 text-muted">{label}</dt>
                        <dd>{detail}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Tech Stack */}
      <section
        id="skills"
        className="scroll-mt-28 border-t border-border px-6 py-24 sm:px-10 lg:px-16"
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
        className="scroll-mt-28 border-t border-border px-6 py-24 sm:px-10 lg:px-16"
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

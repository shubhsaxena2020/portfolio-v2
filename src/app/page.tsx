import { ScrollReveal } from "@/components/scroll-reveal";
import { HeroAboutSection } from "@/components/hero-about-section";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { ScrollMarquee } from "@/components/scroll-marquee";
import { ProjectsHeader } from "@/components/projects-header";
import {
  ProjectShowcase,
  type ProjectCaseStudy,
} from "@/components/project-showcase";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";

const caseStudies: ProjectCaseStudy[] = [
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

function getSpecValue(project: ProjectCaseStudy, label: string) {
  return project.specs.find(([specLabel]) => specLabel === label)?.[1] ?? "—";
}

function getUniqueSpecItems(label: string) {
  return [
    ...new Set(
      caseStudies.flatMap((project) =>
        getSpecValue(project, label)
          .split(",")
          .map((item) => item.trim()),
      ),
    ),
  ];
}

const projectSummary = {
  timeframe: "2026",
  disciplines: getUniqueSpecItems("Discipline"),
  tools: getUniqueSpecItems("Tools"),
  industries: [...new Set(projectIndustries.flat())],
};

type OrbitTechnology = readonly [slug: string, label: string, src?: string];

const outerOrbitTechnologies: readonly OrbitTechnology[] = [
  ["react", "React"],
  ["typescript", "TypeScript"],
  ["electron", "Electron"],
  ["python", "Python"],
  ["threedotjs", "Three.js"],
  ["tailwindcss", "Tailwind CSS"],
  ["github", "GitHub"],
  ["docker", "Docker"],
];

const innerOrbitTechnologies: readonly OrbitTechnology[] = [
  ["sqlite", "SQLite"],
  ["fastapi", "FastAPI"],
  ["opencv", "OpenCV"],
  ["nextdotjs", "Next.js"],
  ["git", "Git"],
  [
    "java",
    "Java",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  ],
  ["cplusplus", "C++"],
];

function TechLogo({
  slug,
  label,
  src,
}: {
  slug: string;
  label: string;
  src?: string;
}) {
  return (
    // These small decorative marks are served directly by their icon CDNs; a
    // native image avoids routing the remote SVGs through Next's optimizer.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src ?? `https://cdn.simpleicons.org/${slug}/${slug}`}
      alt=""
      title={label}
      width={58}
      height={58}
      loading="lazy"
      decoding="async"
      data-tech-logo={slug}
      className="size-full rounded-[0.82rem] border border-black/10 bg-white p-1.5 shadow-[0_8px_26px_rgba(0,0,0,0.18)]"
    />
  );
}

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
            <ProjectsHeader
              outerOrbit={
                <OrbitingCircles
                  data-orbit-item
                  radius={280}
                  ellipse={116}
                  tilt={-5}
                  duration={40}
                  iconSize={54}
                  className="z-20 rounded-[0.82rem] ring-1 ring-border/70 transition-transform duration-300 hover:scale-110"
                >
                  {outerOrbitTechnologies.map(([slug, label, src]) => (
                    <TechLogo
                      key={slug}
                      slug={slug}
                      label={label}
                      src={src}
                    />
                  ))}
                </OrbitingCircles>
              }
              innerOrbit={
                <OrbitingCircles
                  data-orbit-item
                  reverse
                  radius={170}
                  ellipse={66}
                  tilt={7}
                  duration={28}
                  iconSize={42}
                  className="z-20 rounded-[0.82rem] ring-1 ring-border/70 transition-transform duration-300 hover:scale-110"
                >
                  {innerOrbitTechnologies.map(([slug, label, src]) => (
                    <TechLogo
                      key={slug}
                      slug={slug}
                      label={label}
                      src={src}
                    />
                  ))}
                </OrbitingCircles>
              }
            />
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <dl
              data-project-summary
              className="mt-8 mb-14 grid grid-cols-2 border-b border-border sm:mb-16 lg:grid-cols-[0.75fr_1fr_1.4fr_1.2fr]"
            >
              <div className="border-r border-b border-border py-5 pr-4 lg:border-b-0">
                <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                  Timeframe
                </dt>
                <dd className="mt-2 text-sm leading-relaxed">
                  {projectSummary.timeframe}
                </dd>
              </div>
              <div className="border-b border-border py-5 pl-4 lg:border-r lg:border-b-0 lg:px-5">
                <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                  Discipline
                </dt>
                <dd className="mt-2 text-sm leading-relaxed">
                  {projectSummary.disciplines.join(", ")}
                </dd>
              </div>
              <div className="border-r border-border py-5 pr-4 lg:px-5">
                <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                  Tools
                </dt>
                <dd className="mt-2 text-sm leading-relaxed">
                  {projectSummary.tools.join(", ")}
                </dd>
              </div>
              <div className="py-5 pl-4 lg:pl-5">
                <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                  Industry
                </dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {projectSummary.industries.map((industry) => (
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
          </ScrollReveal>
          <ProjectShowcase
            projects={caseStudies}
            industries={projectIndustries}
          />
        </div>
      </section>

      {/* Skills & Tech Stack */}
      <SkillsSection />

      {/* Contact */}
      <ContactSection />
    </main>
  );
}

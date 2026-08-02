"use client"

import {
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react"
import { motion, type Variants } from "motion/react"

import { AnimatedBeam } from "@/components/ui/animated-beam"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { BorderBeam } from "@/components/ui/border-beam"
import { NoiseTexture } from "@/components/ui/noise-texture"

interface ProjectsHeaderProps {
  outerOrbit: ReactNode
  innerOrbit: ReactNode
}

const signalPoints = [
  [8, 28, 0],
  [18, 74, 1.1],
  [36, 16, 0.5],
  [53, 82, 1.7],
  [68, 24, 2.2],
  [82, 68, 0.9],
  [93, 36, 2.7],
] as const

const projectHeadingCharacters = "Projects".split("")

const headingWordVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.045,
    },
  },
}

const headingCharacterVariants: Variants = {
  hidden: { opacity: 0, y: "0.42em", rotate: 1.5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
}

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getReducedMotionServerSnapshot() {
  return false
}

export function ProjectsHeader({
  outerOrbit,
  innerOrbit,
}: ProjectsHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)
  const orbitCenterRef = useRef<HTMLSpanElement>(null)
  const orbitStageRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )

  const updatePerspective = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType === "touch") return

    const stage = orbitStageRef.current
    if (!stage) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    stage.style.setProperty("--orbit-tilt-x", `${(0.5 - y) * 5}deg`)
    stage.style.setProperty("--orbit-tilt-y", `${(x - 0.5) * 7}deg`)
    stage.style.setProperty("--orbit-glow-x", `${x * 100}%`)
    stage.style.setProperty("--orbit-glow-y", `${y * 100}%`)
  }

  const resetPerspective = () => {
    const stage = orbitStageRef.current
    if (!stage) return

    stage.style.setProperty("--orbit-tilt-x", "0deg")
    stage.style.setProperty("--orbit-tilt-y", "0deg")
    stage.style.setProperty("--orbit-glow-x", "50%")
    stage.style.setProperty("--orbit-glow-y", "50%")
  }

  return (
    <div
      data-projects-header-block
      data-reduced-motion={shouldReduceMotion ? "true" : "false"}
      className="relative"
    >
      <motion.div
        data-projects-intro
        className="mb-4 grid grid-cols-[auto_1fr] items-center gap-3 sm:gap-5"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.18em] text-muted uppercase sm:text-[0.64rem]">
          <span className="flex size-5 items-center justify-center rounded-full border border-accent/35 bg-accent/[0.06] text-[0.5rem] text-accent">
            PX
          </span>
          Portfolio evidence index
        </div>
        <div className="flex min-w-0 items-center gap-2" aria-hidden="true">
          <span className="h-px min-w-3 flex-1 bg-border" />
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.span
              key={index}
              className="relative flex size-2 items-center justify-center"
              animate={
                shouldReduceMotion
                  ? { opacity: 0.65 }
                  : { opacity: [0.3, 1, 0.3] }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 2.4,
                delay: index * 0.16,
                repeat: shouldReduceMotion ? 0 : Infinity,
              }}
            >
              <span className="absolute size-2 rounded-full border border-accent/35" />
              <span className="size-1 rounded-full bg-accent" />
            </motion.span>
          ))}
          <span className="h-px min-w-3 flex-1 bg-border" />
          <span className="hidden font-mono text-[0.58rem] tracking-[0.16em] text-muted uppercase sm:inline">
            05 verified builds
          </span>
        </div>
      </motion.div>

      <div
        ref={containerRef}
        data-projects-header
        data-projects-interface="signal-console"
        data-reduced-motion={shouldReduceMotion ? "true" : "false"}
        className="relative isolate grid h-[17.25rem] grid-rows-[4.8rem_1fr] overflow-hidden rounded-[1.4rem] border border-border bg-background shadow-[0_24px_90px_-60px_var(--foreground)] lg:h-[20rem] lg:grid-cols-[minmax(0,0.82fr)_minmax(34rem,1.18fr)] lg:grid-rows-1"
      >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.38] [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--border)_50%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--border)_45%,transparent)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(90deg,transparent,black_42%,black)]"
      />
      <NoiseTexture
        noiseOpacity={0.11}
        className="opacity-40 mix-blend-soft-light [mask-image:radial-gradient(ellipse_at_78%_50%,black,transparent_68%)]"
      />

      <div className="relative z-20 flex min-w-0 items-center border-b border-border px-3.5 lg:border-r lg:border-b-0 lg:px-8">
        <div className="w-full">
          <motion.div
            data-projects-kicker
            className="mb-1.5 flex items-center gap-2 font-mono text-[0.58rem] leading-none tracking-[0.16em] text-muted uppercase sm:text-[0.64rem] lg:mb-4 lg:text-[0.68rem]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          >
            <span className="relative flex size-2 items-center justify-center">
              <span className="absolute size-2 rounded-full bg-accent/30" />
              <span className="relative size-1 rounded-full bg-accent" />
            </span>
            Selected systems
            <span className="h-px min-w-4 flex-1 bg-border lg:max-w-14" />
            <span>05 / 2026</span>
          </motion.div>

          <motion.h2
            data-projects-heading
            aria-label="Projects"
            className="flex items-center gap-2 font-display text-[3.35rem] leading-[0.78] font-semibold tracking-[-0.025em] sm:text-[3.8rem] lg:gap-3 lg:text-[clamp(4.8rem,7vw,6.25rem)]"
            style={{ fontVariationSettings: '\"wght\" 620, \"opsz\" 72' }}
            initial={false}
          >
            <span
              ref={arrowRef}
              data-projects-arrow
              aria-hidden="true"
              className="relative inline-flex size-[0.54em] shrink-0 items-center justify-center rounded-[0.13em] border border-accent/50 bg-accent/[0.08] font-sans text-[0.42em] leading-none font-medium tracking-normal text-accent shadow-[inset_0_0_16px_color-mix(in_srgb,var(--accent)_10%,transparent)]"
            >
              ↳
            </span>
            <AnimatedShinyText active={!shouldReduceMotion}>
              <motion.span
                data-projects-heading-characters
                aria-hidden="true"
                className="inline-flex overflow-hidden py-[0.08em]"
                variants={headingWordVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.7 }}
              >
                {projectHeadingCharacters.map((character, index) => (
                  <motion.span
                    data-projects-heading-char
                    key={`${character}-${index}`}
                    className="inline-block will-change-transform"
                    variants={headingCharacterVariants}
                    transition={shouldReduceMotion ? { duration: 0 } : undefined}
                  >
                    {character}
                  </motion.span>
                ))}
              </motion.span>
            </AnimatedShinyText>
          </motion.h2>

          <motion.div
            className="mt-5 hidden items-center gap-3 lg:flex"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.2 }}
          >
            <span className="font-mono text-[0.61rem] tracking-[0.15em] text-muted uppercase">
              AI · Desktop · 3D · Web
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[0.61rem] tracking-[0.14em] text-accent uppercase">
              15 stack signals
            </span>
          </motion.div>
        </div>
      </div>

      <div
        data-orbit-stage
        aria-hidden="true"
        className="relative min-h-0 overflow-hidden"
        onPointerMove={updatePerspective}
        onPointerLeave={resetPerspective}
      >
        <div className="absolute top-2 left-2.5 z-30 flex items-center gap-2 rounded-md border border-border/60 bg-background/80 px-1.5 py-1 font-mono text-[0.52rem] tracking-[0.17em] text-muted uppercase shadow-sm backdrop-blur-md lg:top-3.5 lg:left-4 lg:text-[0.58rem]">
          <span className="size-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
          Stack telemetry
        </div>
        <div className="absolute top-2 right-2.5 z-30 rounded-md border border-border/60 bg-background/80 px-1.5 py-1 font-mono text-[0.52rem] tracking-[0.16em] text-muted uppercase shadow-sm backdrop-blur-md lg:top-3.5 lg:right-4 lg:text-[0.58rem]">
          02 orbits / live
        </div>

        <div
          ref={orbitStageRef}
          data-orbit-viewport
          className="absolute inset-0 origin-center transition-transform duration-300 ease-out will-change-transform"
          style={
            {
              "--orbit-tilt-x": "0deg",
              "--orbit-tilt-y": "0deg",
              "--orbit-glow-x": "50%",
              "--orbit-glow-y": "50%",
              transform:
                "perspective(900px) rotateX(var(--orbit-tilt-x)) rotateY(var(--orbit-tilt-y))",
              transformStyle: "preserve-3d",
              background:
                "radial-gradient(circle at var(--orbit-glow-x) var(--orbit-glow-y), color-mix(in srgb, var(--accent) 13%, transparent), transparent 34%)",
            } as CSSProperties
          }
        >
          {signalPoints.map(([left, top, delay], index) => (
            <motion.span
              key={`${left}-${top}`}
              data-signal-particle
              className="absolute size-0.5 rounded-full bg-accent/70 shadow-[0_0_6px_var(--accent)]"
              style={{ left: `${left}%`, top: `${top}%` }}
              animate={
                shouldReduceMotion
                  ? { opacity: 0.45, scale: 1 }
                  : { opacity: [0.15, 0.85, 0.15], scale: [0.7, 1.45, 0.7] }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 2.8 + index * 0.18,
                delay,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            data-orbit-scanner
            className="absolute right-[5%] left-[5%] z-0 h-px bg-linear-to-r from-transparent via-accent/45 to-transparent shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_35%,transparent)]"
            animate={
              shouldReduceMotion
                ? { top: "50%", opacity: 0.25 }
                : { top: ["20%", "80%", "20%"], opacity: [0, 0.55, 0] }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 6.5, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
          />

          <div className="absolute top-[46%] left-1/2 h-[320px] w-[720px] -translate-x-1/2 -translate-y-1/2 scale-[0.44] sm:scale-[0.54] lg:scale-[0.76]">
            <div className="absolute top-1/2 left-1/2 h-[162px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-accent/10 bg-accent/[0.025] blur-[1px]" />
            {outerOrbit}
            {innerOrbit}

            <span
              ref={orbitCenterRef}
              data-projects-orbit-center
              className="absolute top-1/2 left-1/2 z-30 flex h-[76px] w-[108px] items-center gap-2.5 rounded-[1.15rem] border border-border bg-background/90 px-3 shadow-[0_20px_55px_-18px_var(--foreground),inset_0_1px_0_color-mix(in_srgb,var(--foreground)_12%,transparent)] backdrop-blur-md"
              style={{ transform: "translate(-50%, -50%) translateZ(44px)" }}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-center-logo="claude"
                  src="https://cdn.simpleicons.org/claude/claude"
                  alt=""
                  width={24}
                  height={24}
                  decoding="async"
                  className="size-6"
                />
              </span>
              <span className="min-w-0 font-mono leading-none">
                <span className="block text-[0.55rem] tracking-[0.12em] text-muted uppercase">
                  AI core
                </span>
                <span className="mt-1.5 block text-[0.68rem] font-semibold tracking-[0.08em] text-foreground uppercase">
                  Claude
                </span>
              </span>
            </span>
          </div>
        </div>

        <span className="absolute bottom-3 left-3 z-30 h-2.5 w-2.5 border-b border-l border-accent/45 lg:bottom-5 lg:left-5" />
        <span className="absolute right-3 bottom-3 z-30 h-2.5 w-2.5 border-r border-b border-accent/45 lg:right-5 lg:bottom-5" />
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={arrowRef}
        toRef={orbitCenterRef}
        curvature={-34}
        duration={4.2}
        pathColor="var(--border)"
        pathWidth={1.4}
        pathOpacity={0.62}
        gradientStartColor="var(--accent)"
        gradientStopColor="color-mix(in srgb, var(--accent) 34%, var(--foreground))"
        className="z-10"
      />
      <BorderBeam
        paused={shouldReduceMotion}
        duration={9}
        size={92}
        colorFrom="var(--accent)"
        colorTo="color-mix(in srgb, var(--accent) 38%, var(--foreground))"
        className="opacity-85"
      />
      <BorderBeam
        paused={shouldReduceMotion}
        reverse
        delay={4.5}
        duration={11}
        size={58}
        colorFrom="transparent"
        colorTo="var(--accent)"
        className="opacity-35"
      />
      </div>

      <motion.div
        data-projects-outro
        className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono text-[0.57rem] tracking-[0.16em] text-muted uppercase sm:gap-5 sm:text-[0.62rem]"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : 0.15 }}
      >
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
          Signal resolved
        </span>
        <span className="relative h-px overflow-hidden bg-border">
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-transparent via-accent to-transparent"
            animate={shouldReduceMotion ? { x: 0, opacity: 0.35 } : { x: ["-100%", "800%"], opacity: [0, 0.8, 0] }}
            transition={{ duration: shouldReduceMotion ? 0 : 4.8, repeat: shouldReduceMotion ? 0 : Infinity, ease: "linear" }}
          />
        </span>
        <span className="text-accent">Read the field notes ↓</span>
      </motion.div>
    </div>
  )
}

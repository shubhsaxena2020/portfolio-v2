"use client"

import type { CSSProperties } from "react"
import { motion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
  reverse?: boolean
  initialOffset?: number
  paused?: boolean
  transition?: Transition
}

export function BorderBeam({
  className,
  size = 72,
  duration = 8,
  delay = 0,
  colorFrom = "var(--accent)",
  colorTo = "var(--foreground)",
  borderWidth = 1,
  reverse = false,
  initialOffset = 0,
  paused = false,
  transition,
}: BorderBeamProps) {
  return (
    <div
      data-border-beam
      data-reduced-motion={paused ? "true" : "false"}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={{ borderWidth }}
    >
      <motion.div
        className={cn(
          "absolute aspect-square bg-linear-to-l from-[var(--beam-from)] via-[var(--beam-to)] to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--beam-from": colorFrom,
            "--beam-to": colorTo,
          } as CSSProperties
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={
          paused
            ? { offsetDistance: `${initialOffset}%` }
            : {
                offsetDistance: reverse
                  ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
                  : [`${initialOffset}%`, `${100 + initialOffset}%`],
              }
        }
        transition={
          paused
            ? { duration: 0 }
            : {
                repeat: Infinity,
                ease: "linear",
                duration,
                delay: -delay,
                ...transition,
              }
        }
      />
    </div>
  )
}


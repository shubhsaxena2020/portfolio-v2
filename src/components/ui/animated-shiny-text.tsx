"use client"

import type { CSSProperties } from "react"
import { motion, type HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface AnimatedShinyTextProps extends HTMLMotionProps<"span"> {
  shimmerWidth?: number
  active?: boolean
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 180,
  active = true,
  ...props
}: AnimatedShinyTextProps) {
  return (
    <motion.span
      data-animated-shiny-text
      data-reduced-motion={active ? "false" : "true"}
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
          backgroundImage:
            "linear-gradient(110deg, var(--foreground) 20%, var(--foreground) 40%, color-mix(in srgb, var(--accent) 78%, white) 50%, var(--foreground) 60%, var(--foreground) 80%)",
          backgroundSize: "250% 100%",
        } as CSSProperties
      }
      className={cn("inline-block bg-clip-text text-transparent", className)}
      initial={{ backgroundPosition: "125% 0" }}
      animate={active ? { backgroundPosition: ["125% 0", "-125% 0"] } : { backgroundPosition: "50% 0" }}
      transition={
        active
          ? { duration: 5.5, ease: "linear", repeat: Infinity, repeatDelay: 1.8 }
          : { duration: 0 }
      }
      {...props}
    >
      {children}
    </motion.span>
  )
}

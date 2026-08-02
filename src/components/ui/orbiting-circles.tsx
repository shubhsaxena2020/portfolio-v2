import React from "react"

import { cn } from "@/lib/utils"

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  ellipse?: number
  tilt?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 0,
  radius = 160,
  ellipse = radius,
  tilt = 0,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const childCount = React.Children.count(children)

  return (
    <div
      data-orbit-ring
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <ellipse
            className="fill-none stroke-border/55 stroke-1"
            cx="50%"
            cy="50%"
            rx={radius}
            ry={ellipse}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (100 / childCount) * index
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
                offsetPath: `ellipse(${radius}px ${ellipse}px at 50% 50%)`,
                offsetDistance: `${angle}%`,
                offsetRotate: "0deg",
                animationDelay: `${delay - (calculatedDuration * index) / childCount}s`,
              } as React.CSSProperties
            }
            className={cn(
              "animate-orbit-ellipse pointer-events-auto absolute top-0 left-0 flex size-(--icon-size) -translate-x-1/2 -translate-y-1/2 transform-gpu items-center justify-center rounded-full",
              { "[animation-direction:reverse]": reverse },
              className
            )}
            {...props}
          >
            <span
              className="flex size-full items-center justify-center"
              style={{ transform: `rotate(${-tilt}deg)` }}
            >
              {child}
            </span>
          </div>
        )
      })}
      <style>{`
        @keyframes orbit-ellipse {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }

        .animate-orbit-ellipse {
          animation-name: orbit-ellipse;
          animation-duration: calc(var(--duration) * 1s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-orbit-ellipse {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

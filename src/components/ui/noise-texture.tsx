import { useId, type ComponentProps } from "react"

import { cn } from "@/lib/utils"

interface NoiseTextureProps extends ComponentProps<"svg"> {
  frequency?: number
  octaves?: number
  noiseOpacity?: number
}

export function NoiseTexture({
  className,
  frequency = 0.42,
  octaves = 4,
  noiseOpacity = 0.18,
  ...props
}: NoiseTextureProps) {
  const filterId = useId()

  return (
    <svg
      data-noise-texture
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      {...props}
    >
      <filter id={filterId}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={octaves}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect
        width="100%"
        height="100%"
        filter={`url(#${filterId})`}
        opacity={noiseOpacity}
      />
    </svg>
  )
}


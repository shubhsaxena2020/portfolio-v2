import { ArrowDown } from "lucide-react";

export function MarqueeHero() {
  return (
    <div className="relative w-full h-dvh min-h-[560px] overflow-hidden bg-[repeating-linear-gradient(0deg,var(--border)_0_1px,transparent_1px_32px),repeating-linear-gradient(90deg,var(--border)_0_1px,transparent_1px_32px)] bg-background">
      <h1 className="sr-only">Shubh Saxena</h1>
      <div aria-hidden="true" className="absolute inset-0 flex items-center overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap motion-reduce:animate-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="mx-6 font-display text-[14rem] leading-none tracking-tight text-foreground sm:text-[19.5rem] lg:text-[25rem] select-none"
            >
              SHUBH SAXENA
            </span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero-portrait-marquee.png"
          alt="Shubh Saxena"
          className="h-[calc(100%_-_5rem)] w-auto max-w-none object-contain object-bottom drop-shadow-2xl sm:h-[calc(100%_-_5.625rem)]"
        />
      </div>

      <div className="absolute bottom-6 left-6 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-muted sm:bottom-8 sm:left-10">
        <span className="flex size-9 items-center justify-center rounded-md border border-border sm:size-10">
          <ArrowDown className="size-4 animate-scroll-arrow motion-reduce:animate-none" />
        </span>
        Scroll down
      </div>

      <div className="absolute bottom-6 right-6 text-xs font-medium text-muted sm:bottom-8 sm:right-10">
        &copy;2026
      </div>
    </div>
  );
}

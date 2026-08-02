"use client";

import { useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { Leaf, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themeOptions = [
  { name: "light", label: "Light", icon: Sun },
  { name: "dark", label: "Dark", icon: Moon },
  { name: "jungle", label: "Jungle", icon: Leaf },
] as const;

const themeNames = themeOptions.map(({ name }) => name);

const buttonStyles =
  "inline-flex h-9 w-24 items-center justify-start gap-2 rounded-full border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait";

const subscribe = () => () => {};

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

const VT_DURATION = 500;

export function ThemeSwitcher() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTransitioningRef = useRef(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Choose theme"
        className={buttonStyles}
        disabled
      >
        <span aria-hidden="true" className="size-4" />
        <span>Theme</span>
      </button>
    );
  }

  const activeIndex = themeOptions.findIndex(({ name }) => name === theme);
  const currentIndex = activeIndex === -1 ? 0 : activeIndex;
  const currentTheme = themeOptions[currentIndex];
  const nextTheme = themeOptions[(currentIndex + 1) % themeOptions.length];
  const Icon = currentTheme.icon;

  function cycleTheme() {
    const button = buttonRef.current;
    const canAnimate =
      !prefersReducedMotion &&
      typeof document.startViewTransition === "function" &&
      button &&
      !isTransitioningRef.current;

    const applyTheme = () => {
      document.documentElement.classList.remove(...themeNames);
      document.documentElement.classList.add(nextTheme.name);
      setTheme(nextTheme.name);
    };

    if (!canAnimate) {
      applyTheme();
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const { top, left, width, height } = button.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(cx, viewportWidth - cx),
      Math.max(cy, viewportHeight - cy),
    );

    const toX = (x: number) => `${(x / viewportWidth) * 100}%`;
    const toY = (y: number) => `${(y / viewportHeight) * 100}%`;
    const toRadius = (r: number) =>
      `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`;

    const clipPathFrom = `circle(0px at ${toX(cx)} ${toY(cy)})`;
    const clipPathTo = `circle(${toRadius(maxRadius)} at ${toX(cx)} ${toY(cy)})`;

    isTransitioningRef.current = true;
    const root = document.documentElement;
    root.dataset.themeVt = "active";
    let revealAnimation: Animation | undefined;

    const cleanup = () => {
      isTransitioningRef.current = false;
      delete root.dataset.themeVt;
      revealAnimation?.cancel();
    };

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme);
    });

    if (typeof transition?.finished?.finally === "function") {
      transition.finished.finally(cleanup).catch(() => {});
    } else {
      cleanup();
    }

    const ready = transition?.ready;
    if (ready && typeof ready.then === "function") {
      ready
        .then(() => {
          revealAnimation = document.documentElement.animate(
            { clipPath: [clipPathFrom, clipPathTo] },
            {
              duration: VT_DURATION,
              easing: "ease-in-out",
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {});
    }
  }

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={cycleTheme}
      aria-label={`${currentTheme.label} theme. Switch to ${nextTheme.label} theme.`}
      title={`Switch to ${nextTheme.label} theme`}
      className={buttonStyles}
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.8} />
      <span>{currentTheme.label}</span>
    </button>
  );
}

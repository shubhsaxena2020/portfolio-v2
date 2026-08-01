"use client";

import { Leaf, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const themeOptions = [
  { name: "light", label: "Light", icon: Sun },
  { name: "dark", label: "Dark", icon: Moon },
  { name: "jungle", label: "Jungle", icon: Leaf },
] as const;

const themeNames = themeOptions.map(({ name }) => name);

const buttonStyles =
  "inline-flex h-9 w-24 items-center justify-start gap-2 rounded-full border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait";

const subscribe = () => () => {};

export function ThemeSwitcher() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();

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
    document.documentElement.classList.remove(...themeNames);
    document.documentElement.classList.add(nextTheme.name);
    setTheme(nextTheme.name);
  }

  return (
    <button
      type="button"
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

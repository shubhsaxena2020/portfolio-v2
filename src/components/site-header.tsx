'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about', id: 'about', label: 'About' },
  { href: '#work', id: 'work', label: 'Work' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#contact', id: 'contact', label: 'Contact' },
] as const;

type SectionId = (typeof NAV_LINKS)[number]['id'];

interface SiteHeaderProps {
  themeSwitcherSlot?: React.ReactNode;
}

export function SiteHeader({ themeSwitcherSlot }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateHeader = () => {
      frameId = 0;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, nextProgress)));
      setScrolled(window.scrollY > 16);

      const activationLine = window.innerHeight * 0.35;
      let nextSection: SectionId = NAV_LINKS[0].id;

      for (const { id } of NAV_LINKS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          nextSection = id;
        }
      }

      const atPageEnd =
        Math.ceil(window.scrollY + window.innerHeight) >=
        document.documentElement.scrollHeight - 1;
      if (atPageEnd) nextSection = NAV_LINKS[NAV_LINKS.length - 1].id;

      setActiveSection(nextSection);
    };

    const queueUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateHeader);
      }
    };

    updateHeader();
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate);

    return () => {
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={`fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 overflow-hidden rounded-2xl border backdrop-blur-xl transition-[top,background-color,border-color,box-shadow] duration-300 sm:w-[calc(100%-3rem)] ${
        scrolled
          ? 'top-4 border-border/80 bg-background/95 shadow-lg shadow-foreground/[0.06] sm:top-3'
          : 'top-4 border-border bg-background/85 shadow-sm supports-[backdrop-filter]:bg-background/75 sm:top-6'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-14 items-center justify-between gap-3 px-3 sm:px-4"
      >
        <Link
          href="/"
          aria-label="Shubh Saxena, home"
          className="group flex min-w-0 items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[0.65rem] border border-border bg-foreground font-mono text-[0.67rem] font-semibold tracking-[-0.04em] text-background transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transform-none">
            SS
          </span>
          <span className="min-w-0 leading-none">
            <span className="block truncate text-[0.82rem] font-semibold tracking-[-0.02em] text-foreground">
              Shubh Saxena
            </span>
            <span className="mt-1 block font-mono text-[0.54rem] tracking-[0.16em] text-muted uppercase">
              Build · Ship · Evolve
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <div
            className="flex items-center gap-2 rounded-full border border-border/80 px-3 py-2 font-mono text-[0.62rem] tracking-[0.08em] text-muted uppercase"
            title="Open to project conversations"
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-40 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Available
          </div>

          <ul className="flex items-center rounded-full border border-border/80 bg-muted/[0.04] p-1 text-sm">
            {NAV_LINKS.map(({ href, id, label }) => {
              const isActive = activeSection === id;

              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`group relative flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.78rem] transition-[color,background-color,transform] duration-200 outline-none hover:-translate-y-px hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transform-none ${
                      isActive
                        ? 'bg-foreground/[0.06] text-foreground'
                        : 'text-muted'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-1 rounded-full bg-accent transition-[opacity,transform] duration-200 ${
                        isActive
                          ? 'scale-100 opacity-100'
                          : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50'
                      }`}
                    />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {themeSwitcherSlot && (
            <div className="border-l border-border pl-2">
              {themeSwitcherSlot}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 sm:hidden">
          <span className="flex items-center gap-1.5 font-mono text-[0.58rem] tracking-[0.08em] text-muted uppercase">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-40 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Available
          </span>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted transition-[color,background-color,transform] duration-200 outline-none hover:scale-105 hover:bg-foreground/[0.05] hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transform-none"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background/95 px-3 pt-3 pb-4 backdrop-blur-xl sm:hidden"
        >
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="font-mono text-[0.6rem] tracking-[0.18em] text-muted uppercase">
              Navigate
            </span>
            <span className="font-mono text-[0.58rem] text-muted">
              {String(NAV_LINKS.findIndex(({ id }) => id === activeSection) + 1).padStart(2, '0')}
              /{String(NAV_LINKS.length).padStart(2, '0')}
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-1 text-sm">
            {NAV_LINKS.map(({ href, id, label }) => {
              const isActive = activeSection === id;

              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? 'bg-foreground/[0.07] text-foreground'
                        : 'text-muted hover:bg-foreground/[0.04] hover:text-foreground'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                    <span
                      aria-hidden="true"
                      className={`size-1.5 rounded-full ${isActive ? 'bg-accent' : 'bg-border'}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          {themeSwitcherSlot && (
            <div className="mt-3 flex items-center justify-between border-t border-border px-2 pt-3">
              <span className="font-mono text-[0.6rem] tracking-[0.18em] text-muted uppercase">
                Appearance
              </span>
              {themeSwitcherSlot}
            </div>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
        className="absolute inset-x-0 bottom-0 h-px bg-border/40"
      >
        <span
          aria-hidden="true"
          className="block h-full origin-left bg-accent transition-transform duration-150 motion-reduce:transition-none"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>
    </header>
  );
}

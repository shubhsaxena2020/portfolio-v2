'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

interface SiteHeaderProps {
  themeSwitcherSlot?: React.ReactNode;
}

export function SiteHeader({ themeSwitcherSlot }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 inset-x-4 z-50 sm:top-6 sm:inset-x-6 rounded-2xl border border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-semibold text-sm text-foreground hover:text-accent transition-colors">
          Shubh Saxena
        </Link>

        {/* Desktop */}
        <ul className="hidden sm:flex items-center gap-6 text-sm">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="text-muted hover:text-foreground transition-colors">
                {label}
              </a>
            </li>
          ))}
          {themeSwitcherSlot && <li>{themeSwitcherSlot}</li>}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="sm:hidden text-muted hover:text-foreground transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden rounded-b-2xl border-t border-border bg-background/95 backdrop-blur">
          <ul className="flex flex-col gap-1 px-6 py-4 text-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="block py-2 text-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            {themeSwitcherSlot && <li className="pt-2">{themeSwitcherSlot}</li>}
          </ul>
        </div>
      )}
    </header>
  );
}

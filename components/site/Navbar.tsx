'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between bd bg-bone px-4 py-2.5 transition-shadow ${
          scrolled ? 'shadowed' : ''
        }`}
      >
        <Link href="/" aria-label="Mezan home">
          <Logo />
        </Link>

        <div className="hidden items-center md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border-l-2 border-ink px-4 py-1 font-mono text-[12px] uppercase tracking-wider transition-colors hover:bg-ink hover:text-bone"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/app"
            className="font-mono text-[12px] uppercase tracking-wider underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
          <Link
            href="/app"
            className="bd bg-blue px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-wider text-bone lift"
          >
            Launch ↗
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="bd flex h-9 w-9 items-center justify-center bg-lime md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M2.5 5h13M2.5 9h13M2.5 13h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl bd shadowed bg-bone p-2 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b-2 border-ink px-3 py-3 font-mono text-sm uppercase tracking-wider last:border-0"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/app"
            onClick={() => setOpen(false)}
            className="mt-2 block bd bg-blue px-3 py-3 text-center font-mono text-sm font-bold uppercase tracking-wider text-bone"
          >
            Launch app ↗
          </Link>
        </div>
      )}
    </header>
  );
}

import Link from 'next/link';
import { Logo } from './Logo';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Launch app', href: '/app' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Help center', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'DPA', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-4 pb-10 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              The org-intelligence platform that turns your team structure into a living, shareable map.
            </p>
            <div className="mt-5 flex gap-2">
              <Social label="X / Twitter" path="M2 2l5.5 7.4L2 14h1.6l4.6-3.8L11 14h3l-5.7-7.7L13.4 2H11.8L7.6 5.5 5 2H2Z" />
              <Social label="GitHub" path="M8 1a7 7 0 0 0-2.2 13.6c.35.06.48-.15.48-.34v-1.3c-1.95.42-2.36-.83-2.36-.83-.32-.8-.78-1.02-.78-1.02-.64-.43.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.07 1.64.76 2.04.58.06-.45.25-.76.45-.94-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.4.72-1.89-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.93.72a6.6 6.6 0 0 1 3.5 0c1.34-.91 1.93-.72 1.93-.72.38.97.14 1.69.07 1.87.45.49.72 1.12.72 1.89 0 2.7-1.64 3.29-3.2 3.46.25.22.48.65.48 1.32v1.96c0 .19.13.41.49.34A7 7 0 0 0 8 1Z" />
              <Social label="LinkedIn" path="M3.6 5H1.4v8.6h2.2V5ZM2.5 1a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6ZM14.6 13.6V8.9c0-2.5-1.34-3.67-3.12-3.67-1.44 0-2.08.79-2.44 1.35V5H6.8v8.6H9V9c0-.25.02-.5.1-.68.2-.5.65-1 1.4-1 .98 0 1.38.74 1.38 1.84v4.45h2.72Z" />
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-zinc-400 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-7 sm:flex-row">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Mezan. All rights reserved.</p>
          <p className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}

function Social({ label, path }: { label: string; path: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}

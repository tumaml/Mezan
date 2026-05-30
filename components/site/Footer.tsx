import Link from 'next/link';

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
    <footer className="px-5 pb-10 pt-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 border-b border-line pb-14 md:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <span className="font-display text-[26px] font-medium tracking-tight text-ink">
              Mezan<span className="text-accent">.</span>
            </span>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              The org-intelligence platform that turns your team structure into a living, shareable map.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="ink-link text-[14px] text-ink-soft">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-mono text-[11.5px] text-faint">
            © {new Date().getFullYear()} Mezan — Org clarity, by design.
          </p>
          <p className="flex items-center gap-2 font-mono text-[11.5px] text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'Launch app', href: '/app' }, { label: 'Changelog', href: '#' }] },
  { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Contact', href: '#contact' }] },
  { title: 'Resources', links: [{ label: 'Docs', href: '#' }, { label: 'Help', href: '#' }, { label: 'API', href: '#' }, { label: 'Status', href: '#' }] },
  { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }, { label: 'Security', href: '#' }, { label: 'DPA', href: '#' }] },
];

export function Footer() {
  return (
    <footer className="bd-t bg-ink px-3 pb-8 pt-12 text-bone sm:px-5">
      <div className="mx-auto max-w-6xl">
        {/* giant wordmark */}
        <div className="overflow-hidden">
          <span
            className="font-display block text-[clamp(4rem,20vw,16rem)] uppercase leading-[0.78] tracking-[-0.02em] text-transparent"
            style={{ WebkitTextStroke: '2px #e9e6dc' }}
          >
            MEZAN<span className="text-lime" style={{ WebkitTextStroke: '0' }}>.</span>
          </span>
        </div>

        <div className="mt-8 grid gap-8 bd-t border-bone/30 pt-8 md:grid-cols-[1.6fr_repeat(4,1fr)]">
          <p className="max-w-xs text-[14px] font-medium text-bone/70">
            The org chart that fights back. Turn your team structure into a living, draggable, shareable map.
          </p>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-lime">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[14px] text-bone/80 underline-offset-4 hover:text-bone hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 bd-t border-bone/30 pt-6 font-mono text-[11px] uppercase tracking-widest text-bone/50 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Mezan — see everyone, move fast.</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 bg-lime animate-blink" /> all systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}

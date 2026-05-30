/**
 * Editorial product figure: a calm, light rendering of the org canvas.
 * Hairline boxes on white, thin connectors — no glow, no glass.
 */

type Person = { name: string; role: string; dot: string; initials: string };

const ROOT: Person = { name: 'Dana Reyes', role: 'Chief Executive', dot: '#ad4f1e', initials: 'DR' };
const ROW: Person[] = [
  { name: 'Sam Okafor', role: 'Engineering', dot: '#1a1916', initials: 'SO' },
  { name: 'Lina Park', role: 'Product', dot: '#1a1916', initials: 'LP' },
  { name: 'Ravi Mehta', role: 'Revenue', dot: '#1a1916', initials: 'RM' },
];

function Node({ p, root = false }: { p: Person; root?: boolean }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg bg-white px-3 py-2.5"
      style={{ border: root ? '1px solid #1a1916' : '1px solid #1a191622' }}
    >
      <span
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-[10px] font-semibold text-white"
        style={{ background: p.dot }}
      >
        {p.initials}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-medium leading-tight text-ink">{p.name}</span>
        <span className="block truncate text-[10.5px] leading-tight text-muted">{p.role}</span>
      </span>
    </div>
  );
}

export function OrgPreview() {
  return (
    <figure className="w-full max-w-md">
      <div
        className="relative overflow-hidden rounded-xl bg-paper-2 p-5"
        style={{ border: '1px solid #1a191618', boxShadow: '0 1px 0 #ffffff inset, 0 24px 50px -38px #1a191655' }}
      >
        {/* meta strip */}
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[10.5px] tracking-wide text-faint">mezan.app / canvas</span>
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> live
          </span>
        </div>

        <div className="relative">
          {/* connectors */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            <line x1="50%" y1="50" x2="17%" y2="108" stroke="#1a191628" strokeWidth="1" />
            <line x1="50%" y1="50" x2="50%" y2="108" stroke="#1a191628" strokeWidth="1" />
            <line x1="50%" y1="50" x2="83%" y2="108" stroke="#1a191628" strokeWidth="1" />
          </svg>

          <div className="relative flex justify-center">
            <div className="w-48">
              <Node p={ROOT} root />
            </div>
          </div>

          <div className="relative mt-9 grid grid-cols-3 gap-2.5">
            {ROW.map((p) => (
              <Node key={p.name} p={p} />
            ))}
          </div>
        </div>

        {/* metrics */}
        <div className="mt-6 grid grid-cols-3 divide-x divide-line border-t border-line pt-4">
          {[
            ['142', 'people'],
            ['9', 'teams'],
            ['4', 'open roles'],
          ].map(([v, l]) => (
            <div key={l} className="px-2 text-center first:pl-0 last:pr-0">
              <div className="font-display text-xl leading-none text-ink">{v}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-faint">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <figcaption className="mt-3 font-mono text-[11px] text-faint">
        Fig. 01 — A live view of the Mezan canvas
      </figcaption>
    </figure>
  );
}

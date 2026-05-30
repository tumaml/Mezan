/**
 * Stylized product preview: a miniature org graph rendered as a card.
 * Pure SVG + CSS so it stays crisp and dependency-free.
 */

type Person = { name: string; role: string; color: string; initials: string };

const ROOT: Person = { name: 'Dana Reyes', role: 'CEO', color: '#a78bfa', initials: 'DR' };
const ROW: Person[] = [
  { name: 'Sam Okafor', role: 'VP Engineering', color: '#22d3ee', initials: 'SO' },
  { name: 'Lina Park', role: 'VP Product', color: '#f59e0b', initials: 'LP' },
  { name: 'Ravi Mehta', role: 'VP Revenue', color: '#34d399', initials: 'RM' },
];

function Node({ p, highlight = false }: { p: Person; highlight?: boolean }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        border: `1px solid ${highlight ? 'rgba(167,139,250,0.5)' : 'rgba(255,255,255,0.09)'}`,
        boxShadow: highlight ? '0 0 24px -4px rgba(139,92,246,0.5)' : 'none',
      }}
    >
      <span
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-black"
        style={{ background: p.color }}
      >
        {p.initials}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12.5px] font-semibold leading-tight text-white">{p.name}</span>
        <span className="block truncate text-[11px] leading-tight text-zinc-400">{p.role}</span>
      </span>
    </div>
  );
}

export function OrgPreview() {
  return (
    <div
      className="relative w-full max-w-md rounded-3xl p-4 sm:p-5"
      style={{
        background: 'linear-gradient(180deg, rgba(18,18,26,0.9), rgba(10,10,16,0.9))',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 40px 120px -40px rgba(124,58,237,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* window chrome */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400">mezan.app/app</span>
        <span className="text-[10px] font-medium text-emerald-400">● live</span>
      </div>

      <div className="relative bg-dotgrid rounded-2xl p-4 pt-5" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
        {/* connectors */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <line x1="50%" y1="58" x2="17%" y2="120" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
          <line x1="50%" y1="58" x2="50%" y2="120" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
          <line x1="50%" y1="58" x2="83%" y2="120" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
        </svg>

        <div className="relative flex justify-center">
          <div className="animate-float-slow w-48">
            <Node p={ROOT} highlight />
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-3 gap-2">
          {ROW.map((p) => (
            <Node key={p.name} p={p} />
          ))}
        </div>

        {/* mini metrics strip */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ['142', 'people'],
            ['9', 'departments'],
            ['4', 'open roles'],
          ].map(([v, l]) => (
            <div
              key={l}
              className="rounded-lg px-2.5 py-2 text-center"
              style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-sm font-bold text-white">{v}</div>
              <div className="text-[10px] text-zinc-500">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

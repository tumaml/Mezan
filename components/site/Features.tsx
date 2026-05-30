import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

function CardShell({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`surface surface-hover group relative overflow-hidden p-6 sm:p-7 ${className}`}>
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%)' }}
      />
      {children}
    </div>
  );
}

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-xl text-violet-300"
      style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.22)' }}
    >
      {children}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative px-4 py-24 scroll-mt-24">
      <SectionHeading
        eyebrow="Why Mezan"
        title={<>Everything you need to <span className="gradient-text">map your team</span></>}
        subtitle="From a five-person startup to a five-thousand-person enterprise, Mezan keeps your structure accurate, searchable, and beautiful."
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Wide hero feature */}
        <Reveal className="sm:col-span-2 lg:row-span-2">
          <CardShell className="h-full">
            <FeatureIcon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="7.5" y="1.5" width="5" height="4" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                <rect x="1.5" y="14" width="5" height="4" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                <rect x="13.5" y="14" width="5" height="4" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10 5.5V9M10 9H4v5M10 9h6v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </FeatureIcon>
            <h3 className="mt-5 text-xl font-semibold text-white">Infinite interactive canvas</h3>
            <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-zinc-400">
              Pan, zoom, and drag across your entire organization on a buttery-smooth canvas.
              Collapse branches, focus on a team, or zoom out to see the whole picture in one glance.
            </p>

            {/* mini canvas illustration */}
            <div
              className="bg-dotgrid relative mt-6 h-44 overflow-hidden rounded-2xl"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                <line x1="50%" y1="38" x2="26%" y2="104" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                <line x1="50%" y1="38" x2="50%" y2="104" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
                <line x1="50%" y1="38" x2="74%" y2="104" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
              </svg>
              <Pill className="left-1/2 top-4 -translate-x-1/2" color="#a78bfa" />
              <Pill className="left-[18%] top-[100px]" color="#22d3ee" />
              <Pill className="left-1/2 top-[100px] -translate-x-1/2" color="#f59e0b" />
              <Pill className="left-[70%] top-[100px]" color="#34d399" />
            </div>
          </CardShell>
        </Reveal>

        <Reveal delay={0.05}>
          <CardShell className="h-full">
            <FeatureIcon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.4" />
                <path d="m13.5 13.5 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </FeatureIcon>
            <h3 className="mt-5 text-lg font-semibold text-white">Instant search</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Find anyone by name, role, or department in milliseconds — and jump straight to their place in the tree.
            </p>
          </CardShell>
        </Reveal>

        <Reveal delay={0.1}>
          <CardShell className="h-full">
            <FeatureIcon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 16V9M8 16V4M13 16v-5M18 16V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </FeatureIcon>
            <h3 className="mt-5 text-lg font-semibold text-white">Headcount insights</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Live counts by team, span-of-control, and open roles — so planning decisions are grounded in real data.
            </p>
          </CardShell>
        </Reveal>

        <Reveal delay={0.05}>
          <CardShell className="h-full">
            <FeatureIcon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2 3 5.2v4.3c0 4 3 6.8 7 8.5 4-1.7 7-4.5 7-8.5V5.2L10 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M7.3 10l1.9 1.9L13 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </FeatureIcon>
            <h3 className="mt-5 text-lg font-semibold text-white">Roles &amp; permissions</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Granular access keeps sensitive data private while everyone still sees the structure they need.
            </p>
          </CardShell>
        </Reveal>

        <Reveal delay={0.1}>
          <CardShell className="h-full">
            <FeatureIcon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.6 4.6l2.8 2.8M12.6 12.6l2.8 2.8M15.4 4.6l-2.8 2.8M7.4 12.6l-2.8 2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </FeatureIcon>
            <h3 className="mt-5 text-lg font-semibold text-white">Real-time sync</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Connect your HRIS once. Hires, moves, and exits flow into the chart automatically — never stale.
            </p>
          </CardShell>
        </Reveal>
      </div>
    </section>
  );
}

function Pill({ className = '', color }: { className?: string; color: string }) {
  return (
    <div
      className={`absolute flex h-7 w-24 items-center gap-1.5 rounded-lg px-1.5 ${className}`}
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <span className="h-4 w-4 flex-shrink-0 rounded-md" style={{ background: color }} />
      <span className="h-1.5 w-12 rounded-full bg-white/15" />
    </div>
  );
}

import { Reveal } from './Reveal';

const STATS: { value: string; label: string }[] = [
  { value: '12k+', label: 'People mapped' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4×', label: 'Faster re-orgs' },
  { value: '<60s', label: 'To first chart' },
];

export function Stats() {
  return (
    <section className="px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-y-10 border-y border-line py-12 md:grid-cols-4 md:divide-x md:divide-line">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="px-4 text-center">
                <div className="font-display text-[clamp(2.6rem,5vw,3.6rem)] font-medium leading-none tracking-[-0.02em] text-ink">
                  {s.value}
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

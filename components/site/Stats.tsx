import { Reveal } from './Reveal';

const STATS: { value: string; label: string; fill: string }[] = [
  { value: '12K+', label: 'People mapped', fill: 'bg-paper' },
  { value: '99.9%', label: 'Uptime', fill: 'bg-lime' },
  { value: '4×', label: 'Faster re-orgs', fill: 'bg-paper' },
  { value: '<60s', label: 'To first chart', fill: 'bg-coral text-bone' },
];

export function Stats() {
  return (
    <section className="px-3 py-12 sm:px-5">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div className={`bd shadowed ${s.fill} px-4 py-8 text-center lift`}>
              <div className="font-display text-[clamp(3rem,7vw,5rem)] leading-[0.8]">{s.value}</div>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em]">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

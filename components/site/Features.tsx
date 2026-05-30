import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const FEATURES = [
  {
    n: '01',
    title: 'An infinite, interactive canvas',
    body: 'Pan, zoom, collapse branches, and focus a single team. Your whole organization on one calm, fast surface — no more screenshots of stale slides.',
  },
  {
    n: '02',
    title: 'Search that actually finds people',
    body: 'Type a name, role, or department and jump straight to their place in the structure. Answers in milliseconds, not Slack threads.',
  },
  {
    n: '03',
    title: 'Headcount you can plan against',
    body: 'Live counts by team, span-of-control, and open roles. Planning decisions grounded in the real shape of the company.',
  },
  {
    n: '04',
    title: 'Real-time sync with your HRIS',
    body: 'Connect once. Hires, moves, and exits flow into the chart automatically, so the map is never out of date.',
  },
  {
    n: '05',
    title: 'Roles, permissions, and trust',
    body: 'Granular access keeps sensitive data private while everyone still sees the structure they need to do their job.',
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            index="§ 01"
            kicker="Why Mezan"
            title={<>Everything you need to map a team — and nothing you don&apos;t.</>}
            subtitle="From a five-person startup to a five-thousand-person enterprise, the structure stays accurate, searchable, and calm to look at."
          />
        </div>

        <ul className="border-t border-line">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.n} delay={i * 0.04}>
              <div className="group grid grid-cols-[auto_1fr] gap-5 border-b border-line py-7 transition-colors sm:gap-8">
                <span className="font-mono text-[13px] text-faint transition-colors group-hover:text-accent">
                  {f.n}
                </span>
                <div>
                  <h3 className="font-display text-[22px] font-medium leading-snug text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 max-w-lg text-[15px] leading-relaxed text-muted">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

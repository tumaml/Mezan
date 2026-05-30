import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const FEATURES = [
  {
    n: '01',
    title: 'Infinite canvas',
    body: 'Pan, zoom, collapse, focus. Your entire org on one fast, draggable surface. No more screenshots of stale slides.',
    fill: 'bg-paper',
  },
  {
    n: '02',
    title: 'Search that hits',
    body: 'Name, role, department — type it and teleport straight to their box. Answers in milliseconds, not Slack threads.',
    fill: 'bg-lime',
  },
  {
    n: '03',
    title: 'Headcount, live',
    body: 'Counts by team, span-of-control, open roles. Plan against the real shape of the company, not a guess.',
    fill: 'bg-paper',
  },
  {
    n: '04',
    title: 'HRIS sync',
    body: 'Connect once. Hires, moves and exits flow in automatically. The map is never, ever out of date.',
    fill: 'bg-blue text-bone',
  },
  {
    n: '05',
    title: 'Roles & access',
    body: 'Granular permissions keep the sensitive stuff private while everyone still sees the structure they need.',
    fill: 'bg-paper',
  },
  {
    n: '06',
    title: 'Share anywhere',
    body: 'Read-only links and live embeds. Drop the org chart into your wiki and it stays current forever.',
    fill: 'bg-paper',
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 px-3 py-20 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="§01"
          kicker="What you get"
          title={<>Six reasons it<br />doesn&apos;t suck.</>}
          subtitle="From a five-person startup to a five-thousand-person beast, the structure stays accurate, searchable, and fast."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.n} delay={(i % 3) * 0.06}>
              <div className={`group flex h-full flex-col bd shadowed ${f.fill} p-6 lift`}>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-5xl leading-none">{f.n}</span>
                  <span className="font-mono text-[11px] uppercase tracking-widest opacity-50 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </div>
                <h3 className="font-display mt-6 text-2xl uppercase leading-none">{f.title}</h3>
                <p className="mt-3 text-[14.5px] font-medium leading-snug">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

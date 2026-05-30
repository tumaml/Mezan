import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const STEPS = [
  {
    n: '1',
    title: 'Import your people',
    body: 'Upload a CSV, sync your HRIS, or start from a blank canvas. Mezan drafts the first version of your chart in seconds.',
  },
  {
    n: '2',
    title: 'Shape the structure',
    body: 'Drag to re-org, add roles, split departments. Every change recalculates headcount and reporting lines instantly.',
  },
  {
    n: '3',
    title: 'Share and decide',
    body: 'Send a link or embed the chart. Everyone sees one source of truth — and you plan the next move with confidence.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="§ 02"
          kicker="How it works"
          title={<>From spreadsheet chaos to clarity, in three moves.</>}
          align="center"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="h-full bg-paper p-8">
                <span className="font-display text-5xl font-medium leading-none text-ink/15">
                  0{s.n}
                </span>
                <h3 className="font-display mt-6 text-xl font-medium text-ink">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const STEPS = [
  {
    n: '1',
    title: 'Dump your people in',
    body: 'CSV, HRIS sync, or a blank canvas. Mezan drafts the first version of your chart in seconds flat.',
  },
  {
    n: '2',
    title: 'Drag it into shape',
    body: 'Re-org by hand, add roles, split teams. Every move recalculates headcount and reporting lines instantly.',
  },
  {
    n: '3',
    title: 'Ship the link',
    body: 'Send or embed it. Everyone sees one source of truth — and you make the next call with actual confidence.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 bd-t bd-b bg-ink px-3 py-20 text-bone sm:px-5">
      <div className="mx-auto max-w-6xl">
        <Reveal y={0}>
          <div className="flex items-center gap-2">
            <span className="bd bg-bone px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-ink">§02</span>
            <span className="kicker bd bg-lime px-2 py-1 text-ink">How it works</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-5 max-w-4xl text-[clamp(2.4rem,6vw,4.6rem)] uppercase leading-[0.9]">
            Chaos in. Clarity out. Three moves.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="h-full bd bg-bone p-7 text-ink">
                <span className="font-display block text-[5rem] leading-[0.8] text-blue">0{s.n}</span>
                <h3 className="font-display mt-5 text-2xl uppercase">{s.title}</h3>
                <p className="mt-3 text-[15px] font-medium leading-snug">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

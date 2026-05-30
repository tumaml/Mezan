import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const STEPS = [
  {
    n: '01',
    title: 'Import your people',
    body: 'Upload a CSV, sync your HRIS, or start from scratch. Mezan builds the first draft of your chart in seconds.',
  },
  {
    n: '02',
    title: 'Shape the structure',
    body: 'Drag to re-org, add roles, and split departments. Every change recalculates headcount and reporting lines live.',
  },
  {
    n: '03',
    title: 'Share & decide',
    body: 'Send a link or embed the chart. Everyone sees the same source of truth — and you plan your next move with confidence.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative px-4 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title={<>From spreadsheet chaos to <span className="gradient-text">clarity</span> in three steps</>}
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* connecting line */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-px md:block"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12) 15%, rgba(255,255,255,0.12) 85%, transparent)' }}
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative">
                <div
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl font-mono text-lg font-bold text-white"
                  style={{
                    background: 'linear-gradient(160deg, rgba(124,58,237,0.9), rgba(99,102,241,0.7))',
                    boxShadow: '0 10px 30px -10px rgba(124,58,237,0.7)',
                  }}
                >
                  {s.n}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-400">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

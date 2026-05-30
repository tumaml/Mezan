import { Reveal } from './Reveal';

const FEATURED = {
  body: 'Onboarding used to mean a week of “who do I even ask about this?” Now new hires open Mezan and just GET IT. First internal tool the whole company has ever complimented.',
  name: 'Amara Boateng',
  role: 'Head of People · Northwind',
};

const SUPPORTING = [
  {
    body: 'Replaced three stale spreadsheets and a Lucidchart graveyard with one link. Series B headcount planning took an afternoon, not a quarter.',
    name: 'Diego Salas',
    role: 'COO · Voltaic',
    fill: 'bg-lime',
  },
  {
    body: 'The HRIS sync is the killer feature. The chart is never wrong, so leadership finally trusts it for real decisions.',
    name: 'Priya Nair',
    role: 'VP Ops · Meridian',
    fill: 'bg-blue text-bone',
  },
];

export function Testimonials() {
  return (
    <section className="px-3 py-20 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <Reveal y={0}>
          <span className="kicker inline-block bd bg-lime px-2 py-1">Field notes</span>
        </Reveal>

        <Reveal delay={0.05}>
          <figure className="mt-6 bd shadowed bg-paper p-7 sm:p-12">
            <blockquote className="font-display text-[clamp(1.8rem,4.5vw,3.6rem)] uppercase leading-[0.95]">
              <span className="text-blue">“</span>
              {FEATURED.body}
            </blockquote>
            <figcaption className="mt-7 font-mono text-[12px] uppercase tracking-widest">
              — <span className="font-bold">{FEATURED.name}</span>, {FEATURED.role}
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {SUPPORTING.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure className={`h-full bd shadowed ${q.fill} p-7 lift`}>
                <blockquote className="text-[18px] font-bold leading-snug">{q.body}</blockquote>
                <figcaption className="mt-5 font-mono text-[11px] uppercase tracking-widest">
                  — {q.name}, {q.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

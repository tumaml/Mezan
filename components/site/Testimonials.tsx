import { Reveal } from './Reveal';

const FEATURED = {
  body: 'Onboarding used to mean a week of “who do I even ask about this?” Now new hires open Mezan and just get it. It’s the first internal tool the whole company has actually complimented.',
  name: 'Amara Boateng',
  role: 'Head of People, Northwind',
};

const SUPPORTING = [
  {
    body: 'We replaced three stale spreadsheets and a Lucidchart graveyard with one link. Planning our Series B headcount took an afternoon, not a quarter.',
    name: 'Diego Salas',
    role: 'COO, Voltaic',
  },
  {
    body: 'The HRIS sync is the killer feature. The chart is never wrong, so leadership finally trusts it for real decisions.',
    name: 'Priya Nair',
    role: 'VP Operations, Meridian',
  },
];

export function Testimonials() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="kicker">Field notes</span>
        </Reveal>

        <Reveal delay={0.05}>
          <figure className="mt-8 max-w-4xl">
            <blockquote className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal leading-[1.22] tracking-[-0.01em] text-ink">
              <span className="text-accent">“</span>
              {FEATURED.body}
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3 font-mono text-[12px] uppercase tracking-wider text-faint">
              <span className="h-px w-8 bg-line" />
              <span className="text-ink-soft">{FEATURED.name}</span>
              <span>· {FEATURED.role}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border-t border-line md:grid-cols-2 md:gap-12 md:border-0">
          {SUPPORTING.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure className="border-b border-line py-8 md:border-b-0 md:py-0">
                <blockquote className="text-[17px] leading-relaxed text-ink-soft">{q.body}</blockquote>
                <figcaption className="mt-5 font-mono text-[12px] uppercase tracking-wider text-faint">
                  <span className="text-ink-soft">{q.name}</span> · {q.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

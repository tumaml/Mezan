import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

type Quote = {
  body: string;
  name: string;
  role: string;
  initials: string;
  color: string;
};

const QUOTES: Quote[] = [
  {
    body: 'Onboarding used to mean a week of “who do I ask about this?” Now new hires open Mezan and just get it. Our time-to-productivity dropped noticeably.',
    name: 'Amara Boateng',
    role: 'Head of People, Northwind',
    initials: 'AB',
    color: '#a78bfa',
  },
  {
    body: 'We replaced three stale spreadsheets and a Lucidchart graveyard with one Mezan link. Planning our Series B headcount took an afternoon, not a quarter.',
    name: 'Diego Salas',
    role: 'COO, Voltaic',
    initials: 'DS',
    color: '#22d3ee',
  },
  {
    body: 'The HRIS sync is the killer feature. The chart is never wrong, so leadership finally trusts it for real decisions.',
    name: 'Priya Nair',
    role: 'VP Operations, Meridian',
    initials: 'PN',
    color: '#f59e0b',
  },
  {
    body: 'Gorgeous, fast, and genuinely useful. It is rare that an internal tool gets compliments from the whole company.',
    name: 'Tom Vesely',
    role: 'CEO, Everpeak',
    initials: 'TV',
    color: '#34d399',
  },
];

export function Testimonials() {
  return (
    <section className="relative px-4 py-24">
      <SectionHeading
        eyebrow="Loved by teams"
        title={<>Don&apos;t take our word for it</>}
        subtitle="People leaders and operators use Mezan to keep everyone aligned as they scale."
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-2">
        {QUOTES.map((q, i) => (
          <Reveal key={q.name} delay={(i % 2) * 0.08}>
            <figure className="surface surface-hover flex h-full flex-col p-7">
              <div className="mb-4 flex gap-0.5 text-amber-400" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                    <path d="M7.5 1l1.8 3.9 4.2.5-3.1 2.9.8 4.2L7.5 10.4 3.8 12.4l.8-4.2L1.5 5.4l4.2-.5L7.5 1Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-zinc-200">
                “{q.body}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-black"
                  style={{ background: q.color }}
                >
                  {q.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{q.name}</span>
                  <span className="block text-xs text-zinc-400">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

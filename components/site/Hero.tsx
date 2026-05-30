import Link from 'next/link';
import { Reveal } from './Reveal';
import { OrgCanvas } from './OrgCanvas';

export function Hero() {
  return (
    <section className="relative px-3 pt-24 sm:px-5 sm:pt-28">
      {/* ticker under the navbar */}
      <Reveal y={0}>
        <div className="overflow-hidden bd bg-ink text-bone">
          <div className="flex w-max animate-marquee whitespace-nowrap py-2 font-mono text-[12px] uppercase tracking-widest">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k} className="flex">
                {['Drag your org into place', 'Lines snap automatically', 'Headcount in real time', 'Search anyone instantly', 'Never draw a chart again'].map((t) => (
                  <span key={t} className="mx-6 flex items-center gap-6">
                    {t} <span className="text-lime">✺</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-3 grid max-w-6xl gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Headline block */}
        <Reveal className="relative bd grain bg-paper p-6 sm:p-9">
          <span className="kicker inline-block bd bg-lime px-2 py-1">Org intelligence — № 01</span>

          <h1 className="font-display mt-6 text-[clamp(3.4rem,11vw,8.5rem)] leading-[0.82] tracking-[-0.02em] uppercase">
            See
            <br />
            <span className="text-blue">every</span>
            <span className="text-outline">one.</span>
          </h1>

          <p className="mt-7 max-w-md text-[17px] font-medium leading-snug">
            Mezan is the org chart that fights back. Drag your people into place,
            watch the connectors snap, and finally see how the whole company
            <span className="bg-lime px-1"> actually fits together.</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/app"
              className="bd bg-blue px-6 py-3.5 font-mono text-[13px] font-bold uppercase tracking-widest text-bone lift"
            >
              Launch the app ↗
            </Link>
            <a
              href="#how"
              className="bd bg-bone px-6 py-3.5 font-mono text-[13px] font-bold uppercase tracking-widest lift"
            >
              How it works
            </a>
          </div>

          <p className="mt-7 font-mono text-[11px] uppercase tracking-widest text-muted">
            Free to start / no card / under 60 seconds
          </p>

          {/* corner stamp */}
          <div className="pointer-events-none absolute -right-3 -top-3 hidden h-16 w-16 items-center justify-center rounded-full bd bg-coral text-center sm:flex animate-wobble">
            <span className="font-mono text-[9px] font-bold uppercase leading-tight text-bone">
              new
              <br />
              2026
            </span>
          </div>
        </Reveal>

        {/* Interactive canvas */}
        <Reveal delay={0.12} className="flex">
          <div className="flex w-full flex-col">
            <OrgCanvas />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
              Fig. 01 — live, draggable. go on, mess it up.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { Reveal } from './Reveal';

export function CTA() {
  return (
    <section id="contact" className="scroll-mt-24 px-3 py-16 sm:px-5">
      <Reveal className="mx-auto max-w-6xl">
        <div className="grain relative overflow-hidden bd shadowed-lime bg-blue px-6 py-16 text-bone sm:px-12 sm:py-24">
          <span className="kicker inline-block bd bg-lime px-2 py-1 text-ink">Last call</span>
          <h2 className="font-display mt-6 text-[clamp(2.6rem,8vw,6.5rem)] uppercase leading-[0.82]">
            Stop guessing.
            <br />
            <span className="text-lime">Start dragging.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[18px] font-bold leading-snug">
            Join the teams who torched their spreadsheets for a living map.
            Free to start, minutes to set up, yours to fling around.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/app"
              className="bd bg-lime px-7 py-4 font-mono text-[13px] font-bold uppercase tracking-widest text-ink lift"
            >
              Launch the app ↗
            </Link>
            <a
              href="#pricing"
              className="bd bg-bone px-7 py-4 font-mono text-[13px] font-bold uppercase tracking-widest text-ink lift"
            >
              See pricing
            </a>
          </div>

          {/* spinning stamp */}
          <div className="pointer-events-none absolute -bottom-8 -right-8 hidden h-40 w-40 animate-spin-slow items-center justify-center rounded-full bd bg-coral sm:flex">
            <span className="font-mono text-[11px] font-bold uppercase leading-tight text-bone text-center">
              no card<br />· no demo ·<br />just go
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

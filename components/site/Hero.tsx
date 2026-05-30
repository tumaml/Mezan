import Link from 'next/link';
import { Reveal } from './Reveal';
import { OrgPreview } from './OrgPreview';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        {/* top meta line, magazine masthead style */}
        <Reveal>
          <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            <span>Org Intelligence</span>
            <span className="hidden sm:inline">Est. 2026 — for teams that grow</span>
            <span>№ 01</span>
          </div>
        </Reveal>

        <div className="grid items-end gap-12 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-16">
          <div>
            <Reveal delay={0.05}>
              <span className="kicker">A living map of your company</span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display mt-6 text-[clamp(2.9rem,7vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.02em] text-ink">
                Org clarity,
                <br />
                <span className="italic font-normal text-accent">by design.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-md text-[17px] leading-relaxed text-ink-soft">
                Mezan turns your headcount, roles, and reporting lines into one accurate,
                interactive map — so everyone, from the CEO to the newest hire, knows exactly
                how the company fits together.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href="/app"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-ink-soft"
                >
                  Launch the app
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <a href="#how" className="ink-link text-[14px] font-medium text-ink">
                  See how it works
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="mt-8 font-mono text-[11.5px] uppercase tracking-wider text-faint">
                Free to start · No credit card · Set up in minutes
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="flex justify-center lg:justify-end">
            <OrgPreview />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { Reveal } from './Reveal';

export function CTA() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-20 sm:px-8">
      <Reveal className="mx-auto max-w-6xl">
        <div className="grain relative overflow-hidden rounded-2xl bg-ink px-7 py-20 text-paper sm:px-16 sm:py-28">
          <div className="relative max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/45">
              Get started
            </span>
            <h2 className="font-display mt-6 text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em]">
              Your org chart shouldn&apos;t be a{' '}
              <span className="italic font-normal text-accent">mystery</span>.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-paper/65">
              Join the teams who replaced stale spreadsheets with a living map.
              Free to start, minutes to set up, yours to share.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/app"
                className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:bg-white"
              >
                Launch the app
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <a href="#pricing" className="text-[14px] font-medium text-paper/80 underline-offset-4 hover:text-paper hover:underline">
                Compare plans
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

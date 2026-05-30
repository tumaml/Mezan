import Link from 'next/link';
import { Reveal } from './Reveal';

export function CTA() {
  return (
    <section id="contact" className="relative px-4 py-24 scroll-mt-24">
      <Reveal className="mx-auto max-w-5xl">
        <div
          className="relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12 sm:py-20"
          style={{
            background: 'linear-gradient(150deg, rgba(124,58,237,0.25), rgba(34,211,238,0.12))',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <div
            className="animate-aurora pointer-events-none absolute -top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-60 blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.7), transparent 60%)' }}
          />
          <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-50" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Your org chart shouldn&apos;t be a mystery.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-zinc-300">
              Join the teams who replaced stale spreadsheets with a living map. Free to start, minutes to set up.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/app"
                className="group w-full rounded-xl px-7 py-3.5 text-center text-[15px] font-semibold text-white transition-transform active:scale-[0.98] sm:w-auto"
                style={{ background: 'linear-gradient(120deg, #7c3aed, #6366f1)', boxShadow: '0 16px 44px -12px rgba(124,58,237,0.8)' }}
              >
                Launch the app
                <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#pricing"
                className="w-full rounded-xl px-7 py-3.5 text-center text-[15px] font-semibold text-white transition-colors sm:w-auto"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)' }}
              >
                Compare plans
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

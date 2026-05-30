import Link from 'next/link';
import { Reveal } from './Reveal';
import { OrgPreview } from './OrgPreview';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-36 sm:pt-44">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="animate-aurora absolute -top-1/3 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.55), transparent 60%)' }}
        />
        <div
          className="animate-aurora-2 absolute -top-24 right-[8%] h-[460px] w-[460px] rounded-full opacity-50 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.4), transparent 60%)' }}
        />
        <div
          className="absolute left-[6%] top-40 h-[380px] w-[380px] rounded-full opacity-40 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.28), transparent 60%)' }}
        />
        <div className="bg-linegrid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <Reveal>
            <a
              href="#features"
              className="animate-pulse-ring inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-300"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              New · Real-time org sync
              <span className="text-zinc-500">→</span>
            </a>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
              See your whole
              <br className="hidden sm:block" /> organization,{' '}
              <span className="gradient-text animate-shimmer text-glow">clearly</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-zinc-400 lg:mx-0">
              Mezan turns your headcount, roles, and reporting lines into a living, interactive
              map — so everyone from the CEO to the new hire knows exactly how the company fits together.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/app"
                className="group relative w-full rounded-xl px-6 py-3.5 text-center text-[15px] font-semibold text-white transition-transform active:scale-[0.98] sm:w-auto"
                style={{
                  background: 'linear-gradient(120deg, #7c3aed, #6366f1)',
                  boxShadow: '0 14px 40px -12px rgba(124,58,237,0.8)',
                }}
              >
                Launch the app — it&apos;s free
                <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#how"
                className="w-full rounded-xl px-6 py-3.5 text-center text-[15px] font-semibold text-zinc-200 transition-colors hover:text-white sm:w-auto"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500 lg:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon /> No credit card
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon /> SOC 2 ready
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon /> Set up in minutes
              </span>
            </div>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={0.15} className="flex justify-center lg:justify-end">
          <OrgPreview />
        </Reveal>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="6" fill="rgba(52,211,153,0.15)" />
      <path d="M4 6.6l1.8 1.8L9 5" stroke="#34d399" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

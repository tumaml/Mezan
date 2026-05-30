'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { SectionHeading } from './SectionHeading';

const FAQS = [
  {
    q: 'How long does it take to set up?',
    a: 'Most teams are up and running in under a minute. Import a CSV or connect your HRIS and Mezan generates your first chart automatically — no manual drawing required.',
  },
  {
    q: 'Does Mezan sync with our HR system?',
    a: 'Yes. The Growth and Enterprise plans connect to popular HRIS platforms, so hires, role changes, and departures flow into your chart in real time. Your org map is never out of date.',
  },
  {
    q: 'Is my company data secure?',
    a: 'Security is foundational. Data is encrypted in transit and at rest, access is governed by granular roles and permissions, and our Enterprise plan adds SSO, SCIM, audit logs, and SOC 2 compliance.',
  },
  {
    q: 'Can I share the chart with people who don’t have an account?',
    a: 'Absolutely. Generate a read-only link or embed the live chart in your wiki. Viewers always see the latest structure without needing to sign in.',
  },
  {
    q: 'What happens when I outgrow the Starter plan?',
    a: 'Nothing breaks — we simply prompt you to upgrade once you pass 25 people. Move to Growth whenever you’re ready and keep all of your existing data.',
  },
];

function Item({ q, a, n }: { q: string; a: string; n: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-5 py-6 text-left"
      >
        <span className="font-mono text-[12px] text-faint">{n}</span>
        <span className="font-display flex-1 text-[19px] font-medium leading-snug text-ink">{q}</span>
        <span
          className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center text-ink"
          aria-hidden="true"
        >
          <span className="absolute h-px w-3.5 bg-current" />
          <span
            className="absolute h-3.5 w-px bg-current transition-transform duration-300"
            style={{ transform: open ? 'scaleY(0)' : 'scaleY(1)' }}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pl-9 text-[15px] leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index="§ 04" kicker="FAQ" title={<>Questions, answered.</>} />
        </div>
        <div className="border-t border-line">
          {FAQS.map((f, i) => (
            <Item key={f.q} n={`0${i + 1}`} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

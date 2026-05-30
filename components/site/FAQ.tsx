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
    a: 'Yes. The Growth and Enterprise plans connect to popular HRIS platforms so hires, role changes, and departures flow into your chart in real time. Your org map is never out of date.',
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
    q: 'What happens when I hit the Starter limit?',
    a: 'Nothing breaks — we’ll simply prompt you to upgrade when you pass 25 people. You can move to Growth at any time and keep all of your existing data.',
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="surface overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <span className="text-[15px] font-medium text-white">{q}</span>
        <span
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-violet-300 transition-transform duration-300"
          style={{ background: 'rgba(139,92,246,0.12)', transform: open ? 'rotate(45deg)' : 'none' }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1.5v10M1.5 6.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative px-4 py-24 scroll-mt-24">
      <SectionHeading eyebrow="FAQ" title="Questions, answered" />
      <div className="mx-auto mt-12 grid max-w-3xl gap-3">
        {FAQS.map((f) => (
          <Item key={f.q} {...f} />
        ))}
      </div>
    </section>
  );
}

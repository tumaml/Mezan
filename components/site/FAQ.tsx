'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { SectionHeading } from './SectionHeading';

const FAQS = [
  {
    q: 'How long does setup take?',
    a: 'Under a minute for most teams. Import a CSV or connect your HRIS and Mezan generates the first chart automatically — zero manual drawing.',
  },
  {
    q: 'Does it sync with our HR system?',
    a: 'Yes. Growth and Enterprise connect to popular HRIS platforms, so hires, role changes and departures flow into the chart in real time. It is never stale.',
  },
  {
    q: 'Is our company data secure?',
    a: 'Encrypted in transit and at rest, access governed by granular roles and permissions. Enterprise adds SSO, SCIM, audit logs and SOC 2 compliance.',
  },
  {
    q: 'Can I share it with people without an account?',
    a: 'Absolutely. Generate a read-only link or embed the live chart in your wiki. Viewers always see the latest structure without signing in.',
  },
  {
    q: 'What happens when I outgrow Starter?',
    a: 'Nothing breaks — we just nudge you to upgrade past 25 people. Move to Growth whenever and keep all your existing data.',
  },
];

function Item({ q, a, n }: { q: string; a: string; n: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bd ${open ? 'bg-lime' : 'bg-paper'} transition-colors`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
      >
        <span className="font-mono text-[12px] font-bold">{n}</span>
        <span className="font-display flex-1 text-xl uppercase leading-tight sm:text-2xl">{q}</span>
        <span
          className="font-display text-2xl leading-none transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="border-t-2 border-ink px-4 py-4 text-[15px] font-medium leading-snug sm:px-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 px-3 py-20 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="§04" kicker="FAQ" title={<>You ask. We answer.</>} align="center" />
        <div className="mx-auto mt-12 grid max-w-3xl gap-3">
          {FAQS.map((f, i) => (
            <Item key={f.q} n={`0${i + 1}`} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

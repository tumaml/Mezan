'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

type Plan = {
  name: string;
  blurb: string;
  monthly: number;
  yearly: number;
  cta: string;
  featured?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: 'Starter',
    blurb: 'For small teams getting organized.',
    monthly: 0,
    yearly: 0,
    cta: 'Start for free',
    features: ['Up to 25 people', 'Interactive org canvas', 'Search & filters', 'CSV import', 'Community support'],
  },
  {
    name: 'Growth',
    blurb: 'For scaling companies that plan ahead.',
    monthly: 8,
    yearly: 6,
    cta: 'Start free trial',
    featured: true,
    features: [
      'Unlimited people',
      'HRIS real-time sync',
      'Headcount & span insights',
      'Roles & permissions',
      'Shareable & embeddable links',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    blurb: 'For organizations with advanced needs.',
    monthly: -1,
    yearly: -1,
    cta: 'Talk to sales',
    features: ['Everything in Growth', 'SSO & SCIM', 'Audit logs & SOC 2', 'Custom data residency', 'Dedicated success manager', '99.9% uptime SLA'],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative px-4 py-24 scroll-mt-24">
      <SectionHeading
        eyebrow="Pricing"
        title={<>Simple pricing that <span className="gradient-text">scales with you</span></>}
        subtitle="Start free. Upgrade when your team grows. Cancel anytime — no lock-in."
      />

      {/* Billing toggle */}
      <Reveal delay={0.1}>
        <div className="mt-9 flex items-center justify-center gap-3">
          <span className={`text-sm ${!yearly ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
          <button
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly billing"
            onClick={() => setYearly((v) => !v)}
            className="relative h-7 w-12 rounded-full transition-colors"
            style={{ background: yearly ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.14)' }}
          >
            <span
              className="absolute top-1 h-5 w-5 rounded-full bg-white transition-transform"
              style={{ transform: yearly ? 'translateX(22px)' : 'translateX(4px)' }}
            />
          </button>
          <span className={`text-sm ${yearly ? 'text-white' : 'text-zinc-500'}`}>
            Yearly
            <span className="ml-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400">
              −25%
            </span>
          </span>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-6xl items-stretch gap-5 lg:grid-cols-3">
        {PLANS.map((plan, i) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <Reveal key={plan.name} delay={i * 0.08} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-7 ${plan.featured ? '' : 'surface'}`}
                style={
                  plan.featured
                    ? {
                        background: 'linear-gradient(180deg, rgba(124,58,237,0.16), rgba(99,102,241,0.05))',
                        border: '1px solid rgba(139,92,246,0.45)',
                        boxShadow: '0 30px 80px -30px rgba(124,58,237,0.6)',
                      }
                    : undefined
                }
              >
                {plan.featured && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: 'linear-gradient(120deg, #7c3aed, #6366f1)' }}
                  >
                    Most popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-zinc-400">{plan.blurb}</p>

                <div className="mt-6 flex items-end gap-1">
                  {price < 0 ? (
                    <span className="text-4xl font-bold tracking-tight text-white">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold tracking-tight text-white">${price}</span>
                      <span className="mb-1.5 text-sm text-zinc-400">/user / mo</span>
                    </>
                  )}
                </div>
                <p className="mt-1 h-4 text-xs text-zinc-500">
                  {price > 0 && yearly ? 'billed annually' : price === 0 ? 'free forever' : ''}
                </p>

                <Link
                  href={plan.name === 'Enterprise' ? '#contact' : '/app'}
                  className={`mt-6 rounded-xl px-5 py-3 text-center text-sm font-semibold transition-transform active:scale-[0.98] ${
                    plan.featured ? 'text-white' : 'text-zinc-100'
                  }`}
                  style={
                    plan.featured
                      ? { background: 'linear-gradient(120deg, #7c3aed, #6366f1)', boxShadow: '0 12px 30px -10px rgba(124,58,237,0.7)' }
                      : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }
                  }
                >
                  {plan.cta}
                </Link>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <svg className="mt-0.5 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="rgba(52,211,153,0.15)" />
                        <path d="M5 8.2l2 2L11 6" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

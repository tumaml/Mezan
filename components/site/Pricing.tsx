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
    cta: 'Start free',
    features: ['Up to 25 people', 'Interactive canvas', 'Search & filters', 'CSV import'],
  },
  {
    name: 'Growth',
    blurb: 'For scaling companies that plan ahead.',
    monthly: 8,
    yearly: 6,
    cta: 'Start trial',
    featured: true,
    features: ['Unlimited people', 'Real-time HRIS sync', 'Headcount & span insights', 'Roles & permissions', 'Shareable & embeddable links'],
  },
  {
    name: 'Enterprise',
    blurb: 'For organizations with advanced needs.',
    monthly: -1,
    yearly: -1,
    cta: 'Talk to sales',
    features: ['Everything in Growth', 'SSO & SCIM', 'Audit logs & SOC 2', 'Dedicated success manager', '99.9% uptime SLA'],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="scroll-mt-24 px-3 py-20 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading index="§03" kicker="Pricing" title={<>Pay for<br />people. Not seats of pain.</>} />

          <div className="flex bd bg-bone font-mono text-[12px] font-bold uppercase">
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-2 transition-colors ${!yearly ? 'bg-ink text-bone' : ''}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`border-l-2 border-ink px-4 py-2 transition-colors ${yearly ? 'bg-ink text-bone' : ''}`}
            >
              Yearly <span className={yearly ? 'text-lime' : 'text-coral'}>-25%</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-3 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <Reveal key={plan.name} delay={i * 0.06} className="h-full">
                <div className={`flex h-full flex-col bd shadowed p-7 ${plan.featured ? 'bg-blue text-bone' : 'bg-paper'}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-3xl uppercase">{plan.name}</h3>
                    {plan.featured && (
                      <span className="bd bg-lime px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-ink">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className={`mt-2 text-[14px] font-medium ${plan.featured ? 'text-bone/70' : 'text-muted'}`}>
                    {plan.blurb}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    {price < 0 ? (
                      <span className="font-display text-6xl leading-none">POA</span>
                    ) : (
                      <>
                        <span className="font-display text-6xl leading-none">${price}</span>
                        <span className={`font-mono text-[12px] uppercase ${plan.featured ? 'text-bone/60' : 'text-muted'}`}>
                          /user/mo
                        </span>
                      </>
                    )}
                  </div>
                  <p className={`mt-2 h-4 font-mono text-[11px] uppercase ${plan.featured ? 'text-bone/60' : 'text-muted'}`}>
                    {price > 0 && yearly ? 'billed annually' : price === 0 ? 'free forever' : 'custom quote'}
                  </p>

                  <Link
                    href={plan.name === 'Enterprise' ? '#contact' : '/app'}
                    className={`mt-6 bd px-5 py-3 text-center font-mono text-[12px] font-bold uppercase tracking-widest lift ${
                      plan.featured ? 'bg-lime text-ink' : 'bg-ink text-bone'
                    }`}
                  >
                    {plan.cta} ↗
                  </Link>

                  <ul className="mt-7 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] font-medium">
                        <span className={plan.featured ? 'text-lime' : 'text-blue'}>✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

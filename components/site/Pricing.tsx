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
    features: ['Up to 25 people', 'Interactive canvas', 'Search & filters', 'CSV import'],
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
      'Real-time HRIS sync',
      'Headcount & span insights',
      'Roles & permissions',
      'Shareable & embeddable links',
    ],
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
    <section id="pricing" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            index="§ 03"
            kicker="Pricing"
            title={<>Simple pricing that scales with you.</>}
          />

          {/* text toggle */}
          <div className="flex items-center gap-1 rounded-full border border-line p-1 font-mono text-[12px]">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-3 py-1.5 transition-colors ${!yearly ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-3 py-1.5 transition-colors ${yearly ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
            >
              Yearly <span className={yearly ? 'text-paper/70' : 'text-accent'}>−25%</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <Reveal key={plan.name} delay={i * 0.06} className="h-full">
                <div className={`flex h-full flex-col p-8 ${plan.featured ? 'bg-ink text-paper' : 'bg-paper'}`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-display text-xl font-medium ${plan.featured ? 'text-paper' : 'text-ink'}`}>
                      {plan.name}
                    </h3>
                    {plan.featured && (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className={`mt-2 text-[14px] ${plan.featured ? 'text-paper/60' : 'text-muted'}`}>{plan.blurb}</p>

                  <div className="mt-7 flex items-baseline gap-1.5">
                    {price < 0 ? (
                      <span className="font-display text-4xl font-medium">Custom</span>
                    ) : (
                      <>
                        <span className="font-display text-4xl font-medium tracking-tight">${price}</span>
                        <span className={`text-[13px] ${plan.featured ? 'text-paper/50' : 'text-faint'}`}>
                          / user / mo
                        </span>
                      </>
                    )}
                  </div>
                  <p className={`mt-1.5 h-4 font-mono text-[11px] ${plan.featured ? 'text-paper/50' : 'text-faint'}`}>
                    {price > 0 && yearly ? 'billed annually' : price === 0 ? 'free forever' : ''}
                  </p>

                  <Link
                    href={plan.name === 'Enterprise' ? '#contact' : '/app'}
                    className={`mt-7 rounded-full px-5 py-3 text-center text-[14px] font-medium transition-colors ${
                      plan.featured
                        ? 'bg-paper text-ink hover:bg-white'
                        : 'border border-ink text-ink hover:bg-ink hover:text-paper'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="mt-8 space-y-3.5">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-start gap-3 text-[14px] ${plan.featured ? 'text-paper/85' : 'text-ink-soft'}`}>
                        <span className={plan.featured ? 'text-accent' : 'text-accent'}>→</span>
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

'use client';

import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Stat = { value: number; suffix: string; label: string };

const STATS: Stat[] = [
  { value: 12000, suffix: '+', label: 'People mapped' },
  { value: 99.9, suffix: '%', label: 'Uptime' },
  { value: 4, suffix: '×', label: 'Faster re-orgs' },
  { value: 60, suffix: 's', label: 'Average setup' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState('0');
  const decimals = value % 1 !== 0 ? 1 : 0;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.6,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v) => {
        setDisplay(
          v.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        );
      },
    });
    return () => controls.stop();
  }, [inView, value, mv, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="px-4 py-16">
      <div
        className="surface mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col items-center justify-center px-4 py-10 text-center"
            style={{ background: 'linear-gradient(180deg, rgba(13,13,20,0.96), rgba(10,10,16,0.96))' }}
          >
            <div className="bg-clip-text text-4xl font-bold tracking-tight text-white sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-zinc-400">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

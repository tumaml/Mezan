import { Reveal } from './Reveal';

export function SectionHeading({
  index,
  kicker,
  title,
  subtitle,
  align = 'left',
}: {
  index?: string;
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  const isCenter = align === 'center';
  return (
    <div className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <div className={`flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}>
          {index && <span className="font-mono text-[12px] text-faint">{index}</span>}
          <span className="kicker">{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display mt-4 text-[clamp(1.9rem,4vw,2.9rem)] font-medium leading-[1.04] tracking-[-0.015em] text-ink">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

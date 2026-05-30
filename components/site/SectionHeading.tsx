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
    <div className={isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <Reveal y={0}>
        <div className={`flex items-center gap-2 ${isCenter ? 'justify-center' : ''}`}>
          {index && <span className="bd bg-ink px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-bone">{index}</span>}
          <span className="kicker bd bg-lime px-2 py-1">{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display mt-5 text-[clamp(2.4rem,6vw,4.6rem)] uppercase leading-[0.9] tracking-[-0.015em]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={`mt-5 text-[17px] font-medium leading-snug ${isCenter ? 'mx-auto max-w-xl' : 'max-w-lg'}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

import type { CSSProperties } from 'react';

export function LogoMark({ size = 28, style }: { size?: number; style?: CSSProperties }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-xl"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(140deg, rgba(139,92,246,0.22), rgba(34,211,238,0.14))',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 0 24px rgba(139,92,246,0.25)',
        ...style,
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <rect x="4.5" y="0.5" width="3" height="2.6" rx="0.8" fill="#a78bfa" />
        <rect x="0.5" y="6" width="3" height="2.6" rx="0.8" fill="#22d3ee" />
        <rect x="8.5" y="6" width="3" height="2.6" rx="0.8" fill="#f59e0b" />
        <path d="M6 3.1v1.5M6 4.6 H2 V6M6 4.6 H10 V6" stroke="rgba(255,255,255,0.45)" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      </svg>
    </span>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight text-white">Mezan</span>
    </span>
  );
}

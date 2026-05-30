export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-[3px] ${className}`}>
      <span className="font-display text-[22px] font-medium leading-none tracking-tight text-ink">
        Mezan
      </span>
      <span className="text-accent text-[22px] leading-none">.</span>
    </span>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-7 w-7 items-center justify-center bd bg-lime">
        <span className="font-display text-[15px] leading-none">M</span>
      </span>
      <span className="font-display text-[22px] leading-none tracking-tight">MEZAN</span>
    </span>
  );
}

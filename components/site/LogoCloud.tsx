const COMPANIES = [
  'Northwind',
  'Lumen Labs',
  'Acme Corp',
  'Voltaic',
  'Meridian',
  'Cobalt',
  'Everpeak',
  'Helios',
];

export function LogoCloud() {
  return (
    <section className="relative px-4 py-14">
      <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        Trusted by people teams at fast-growing companies
      </p>

      <div
        className="relative mx-auto mt-8 max-w-5xl overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-14">
          {[...COMPANIES, ...COMPANIES].map((name, i) => (
            <span
              key={i}
              className="select-none whitespace-nowrap text-lg font-semibold tracking-tight text-zinc-500 transition-colors hover:text-zinc-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

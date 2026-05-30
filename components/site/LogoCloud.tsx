const COMPANIES = ['Northwind', 'Lumen', 'Voltaic', 'Meridian', 'Everpeak', 'Helios'];

export function LogoCloud() {
  return (
    <section className="px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Trusted by people teams at growing companies
        </p>
        <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-y-6 border-y border-line py-8 sm:grid-cols-3 md:grid-cols-6 md:divide-x md:divide-line">
          {COMPANIES.map((name) => (
            <span
              key={name}
              className="font-display w-full text-center text-lg font-medium tracking-tight text-ink/55"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

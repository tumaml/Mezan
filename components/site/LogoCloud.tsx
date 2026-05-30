const ROW = ['NORTHWIND', 'LUMEN', 'VOLTAIC', 'MERIDIAN', 'EVERPEAK', 'HELIOS', 'COBALT', 'ACME'];

export function LogoCloud() {
  return (
    <section className="mt-3 px-3 sm:px-5">
      <div className="mx-auto max-w-6xl bd bg-ink py-5 text-bone">
        <p className="px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50">
          ／ trusted by people teams shipping fast
        </p>
        <div className="mt-3 flex overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...ROW, ...ROW].map((n, i) => (
              <span
                key={i}
                className="font-display mx-7 text-4xl uppercase tracking-tight text-transparent sm:text-5xl"
                style={{ WebkitTextStroke: '1.5px #e9e6dc' }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MarqueeBanner() {
  const items = [
    "BEYOND COVER • WE SECURE FUTURES",
    "INDEPENDENT INSURANCE BROKERS",
    "MOTOR • MEDICAL • PROPERTY • LIABILITY",
    "28+ YEARS OF TRUSTED BROKERAGE",
    "IRA LICENSED",
    "AIBK MEMBER",
  ];

  const text = items.join(" • ");

  return (
    <section className="bg-shiv-gold py-4 overflow-hidden" aria-hidden>
      <div className="marquee-track whitespace-nowrap">
        <span className="marquee-content text-shiv-navy-deep text-sm md:text-base font-bold uppercase tracking-widest">
          {text} • {text}
        </span>
      </div>
    </section>
  );
}

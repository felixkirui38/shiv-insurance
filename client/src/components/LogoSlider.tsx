import { useState } from 'react';

export interface LogoItem {
  src: string;
  alt: string;
  href?: string;
}

const defaultLogos: LogoItem[] = [
  { src: '/logos/aar.png', alt: 'AAR Insurance' },
  { src: '/logos/apa.png', alt: 'APA Insurance' },
  { src: '/logos/axa.png', alt: 'AXA' },
  { src: '/logos/Britam.png', alt: 'Britam' },
  { src: '/logos/CIC.png', alt: 'CIC Insurance' },
  { src: '/logos/ga.png', alt: 'GA Insurance' },
  { src: '/logos/heritage.png', alt: 'Heritage Insurance' },
  { src: '/logos/icea%20lion.png', alt: 'ICEA LION' },
  { src: '/logos/Jubilee.png', alt: 'Jubilee Insurance' },
  { src: '/logos/kenindia.png', alt: 'KenIndia' },
  { src: '/logos/Madison%20Group.png', alt: 'Madison Group' },
  { src: '/logos/mayfair.png', alt: 'Mayfair Insurance' },
  { src: '/logos/occidental.png', alt: 'Occidental Insurance' },
  { src: '/logos/old%20mutual.png', alt: 'Old Mutual' },
  { src: '/logos/sanlaam.png', alt: 'Sanlam' },
];

const LogoCell = ({ logo }: { logo: LogoItem }) => {
  const [imgError, setImgError] = useState(false);
  const content = (
    <div className="partner-logo-cell group flex h-16 w-36 shrink-0 items-center justify-center px-3 sm:h-[4.5rem] sm:w-40">
      {!imgError ? (
        <img
          src={logo.src}
          alt={logo.alt}
          className="max-h-11 max-w-full object-contain opacity-80 brightness-110 contrast-110 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 sm:max-h-12"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-center text-xs font-medium leading-tight text-white/50">
          {logo.alt}
        </span>
      )}
    </div>
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex shrink-0"
      >
        {content}
      </a>
    );
  }
  return <div className="shrink-0">{content}</div>;
};

const LogoSlider = ({ logos = defaultLogos }: { logos?: LogoItem[] }) => {
  const row = (copyId: number) => (
    <div key={copyId} className="flex shrink-0 items-center gap-6 sm:gap-10">
      {logos.map((logo, i) => (
        <LogoCell key={`${logo.alt}-${copyId}-${i}`} logo={logo} />
      ))}
    </div>
  );

  return (
    <section className="partner-logo-bar" aria-label="Partners & associates">
      <div className="overflow-hidden py-10 sm:py-12">
        <div className="flex w-max animate-logo-marquee">
          {row(0)}
          {row(1)}
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;

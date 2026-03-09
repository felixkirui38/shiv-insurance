import { useState } from 'react';

export interface LogoItem {
  src: string;
  alt: string;
  href?: string;
}

const defaultLogos: LogoItem[] = [
  { src: '/logos/aar.png', alt: 'Partner 1', href: '#' },
  { src: '/logos/apa.png', alt: 'Partner 2', href: '#' },
  { src: '/logos/axa.png', alt: 'Partner 3', href: '#' },
  { src: '/logos/Britam.png', alt: 'Partner 4', href: '#' },
  { src: '/logos/CIC.png', alt: 'Partner 5', href: '#' },
  { src: '/logos/ga.png', alt: 'Partner 6', href: '#' },
  { src: '/logos/heritage.png', alt: 'Partner 7', href: '#' },
  { src: '/logos/icea lion.png', alt: 'Partner 6', href: '#' },
  { src: '/logos/Jubilee.png', alt: 'Partner 6', href: '#' },
  { src: '/logos/kenindia.png', alt: 'Partner 6', href: '#' },
  { src: '/logos/Madison Group.png', alt: 'Partner 6', href: '#' },
  { src: '/logos/mayfair.png', alt: 'Partner 6', href: '#' },
  { src: '/logos/occidental.png', alt: 'Partner 6', href: '#' },
  { src: '/logos/old mutual.png', alt: 'Partner 6', href: '#' },
  { src: '/logos/sanlaam.png', alt: 'Partner 6', href: '#' },
];

const LogoCell = ({ logo, index }: { logo: LogoItem; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const content = (
    <div className="flex items-center justify-center h-12 w-32 shrink-0">
      {!imgError ? (
        <img
          src={logo.src}
          alt={logo.alt}
          className="max-h-10 max-w-full object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-sm font-semibold text-gray-400">{logo.alt}</span>
      )}
    </div>
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex shrink-0 px-4"
      >
        {content}
      </a>
    );
  }
  return <div className="shrink-0 px-4">{content}</div>;
};

const LogoSlider = ({ logos = defaultLogos }: { logos?: LogoItem[] }) => {
  const row = (copyId: number) => (
    <div key={copyId} className="flex items-center gap-4 shrink-0">
      {logos.map((logo, i) => (
        <LogoCell key={`${logo.alt}-${copyId}-${i}`} logo={logo} index={i} />
      ))}
    </div>
  );

  return (
    <section className="bg-white border-y border-gray-200 py-8" aria-label="Partners & associates">
      <div className="overflow-hidden">
        <div className="flex w-max animate-logo-marquee">
          {row(0)}
          {row(1)}
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;

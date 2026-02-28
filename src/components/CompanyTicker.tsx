import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const companies = [
  "Paseo AI",
  "TANKS",
  "CAMPOST",
  "SABC",
  "LIS",
  "ANTIC",
  "Alpha motors",
  "Afrikan Method",
  "ANTIC",
  "Mr SOLDE",
  "ORANGE",
  "Hilton",
  "V-Media",
  "Info Genie"
];

export default function CompanyTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    // Duplicate the content to make the loop seamless
    const content = trackRef.current.innerHTML;
    trackRef.current.innerHTML = content + content;

    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 60,
      repeat: -1,
    });
  }, []);

  return (
    <div className="bg-white py-12 md:py-16 border-y-4 border-black overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1400px] mb-8 md:mb-12">
        <div className="inline-block bg-black px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transform -rotate-1">
          <h3 className="text-xl md:text-2xl font-black font-display text-white uppercase tracking-widest">
            NOS PARTENAIRES
          </h3>
        </div>
      </div>
      
      <div className="overflow-hidden whitespace-nowrap">
        <div ref={trackRef} className="flex items-center gap-12 md:gap-20 px-6 w-max">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center gap-12 md:gap-20">
              <span className="text-3xl md:text-5xl font-black font-display uppercase tracking-widest text-black opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-default">
                {company}
              </span>
              <span className="text-[#f29323] text-2xl md:text-3xl font-black select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

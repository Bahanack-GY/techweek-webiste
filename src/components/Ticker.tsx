import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const tickerItems = [
  "INNOVATION",
  "CRÉATIVITÉ",
  "DÉVELOPPEMENT",
  "INTELLIGENCE ARTIFICIELLE",
  "CYBERSÉCURITÉ",
  "RÉSEAUTAGE",
  "ENTREPRENEURIAT",
  "TECHNOLOGIE",
  "INNOVATION",
  "CRÉATIVITÉ",
  "DÉVELOPPEMENT",
];

export default function Ticker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    
    // Duplicate the content to make the loop seamless
    const content = trackRef.current.innerHTML;
    trackRef.current.innerHTML = content + content;

    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 40,
      repeat: -1,
    });
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bg-black text-white py-4 md:py-6 border-b-[6px] border-black overflow-hidden flex whitespace-nowrap"
    >
      <div ref={trackRef} className="flex items-center gap-8 md:gap-12 px-4 md:px-6 w-max">
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8 md:gap-12">
            {/* 4-point Star Icon */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-6 h-6 md:w-8 md:h-8 text-[#f29323] shrink-0" 
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z" style={{transformOrigin: "center", transform: "scale(1.5)"}}/>
            </svg>
            <span className="text-xl md:text-3xl font-black font-display uppercase tracking-widest">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

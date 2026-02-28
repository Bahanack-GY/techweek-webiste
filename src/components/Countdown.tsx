import { useState, useEffect } from 'react';

// Target date: March 23, 2026
const TARGET_DATE = new Date('2026-03-23T00:00:00+01:00').getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    jours: 0,
    heures: 0,
    minutes: 0,
    secondes: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setTimeLeft({ jours: 0, heures: 0, minutes: 0, secondes: 0 });
        return;
      }

      // Calculations for different time units
      const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
      const heures = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secondes = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ jours, heures, minutes, secondes });
    };

    // Update every second since we only track up to seconds now
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="bg-[#196aab] py-16 md:py-24 border-b-4 border-black overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-[1400px] relative z-10 flex flex-col items-center">
        
        <div className="inline-block bg-[#f29323] px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-12 transform -rotate-2">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-display text-black uppercase tracking-wider">
                Lancement dans
            </h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 w-full max-w-5xl">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="bg-white border-4 border-black w-20 h-24 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-4 md:mb-6 transform hover:-translate-y-2 transition-transform duration-200">
                <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-black font-display">
                  {formatNumber(value)}
                </span>
              </div>
              <span className="text-white font-black uppercase tracking-widest text-xs sm:text-sm md:text-lg lg:text-xl" style={{ textShadow: '2px 2px 0px #000' }}>
                {unit}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '32px 32px' }}></div>
    </section>
  );
}

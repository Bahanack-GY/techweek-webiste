import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarDays, Route as RouteIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const scheduleItems = [
  { day: "J1", date: "Lun 23 Mars", title: "Ouverture & Expo", description: "Cérémonie, Visite des Stands et Conférence.", color: "#196aab", textColor: "white" },
  { day: "J2", date: "Mar 24 Mars", title: "Projets & Pitch", description: "Concours de projets Junior & pitch intensif.", color: "#FF0000", textColor: "white" },
  { day: "J3", date: "Mer 25 Mars", title: "Seniors & Culture", description: "Projets Senior, Soirée au Canal Olympia.", color: "#f29323", textColor: "black" },
  { day: "J4", date: "Jeu 26 Mars", title: "Sécurité", description: "Cyber Security Contest et ateliers techniques.", color: "#196aab", textColor: "white" },
  { day: "J5", date: "Ven 27 Mars", title: "HackVerse", description: "Lancement officiel de la 3e édition.", color: "#FF0000", textColor: "white" },
  { day: "J6", date: "Sam 28 Mars", title: "Clôture & Gala", description: "Délibérations et Grande Soirée de Gala.", color: "#f29323", textColor: "black" }
];

const schedulePositions = [
  { x: 15, y: 50 },
  { x: 31, y: 25 },
  { x: 47, y: 75 },
  { x: 63, y: 25 },
  { x: 79, y: 75 },
  { x: 95, y: 50 },
];

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const revealerRef = useRef<SVGRectElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${scrollContainer.scrollWidth - window.innerWidth + 3000}`, 
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Horizontal scroll
    tl.to(scrollContainer, {
      x: scrollAmount,
      ease: "none",
      duration: 100
    }, 0);

    // Unmask the snake drawing sequentially matching the scroll
    if (revealerRef.current) {
        tl.to(revealerRef.current, {
           attr: { width: 100 },
           ease: "none",
           duration: 100
        }, 0);
    }

    // Pop the cards sync'd perfectly with the drawing tip!
    const cards = gsap.utils.toArray('.snake-card');
    cards.forEach((card: any, i) => {
      // Must set the baseline transform for GSAP to not conflict with CSS
      gsap.set(card, { xPercent: -50, yPercent: -50 });
      
      tl.fromTo(card, 
        { scale: 0, autoAlpha: 0, rotation: -10 },
        { scale: 1, autoAlpha: 1, rotation: 0, ease: "back.out(1.5)", duration: 8 },
        Math.max(0, schedulePositions[i].x - 5) // Start popping exactly when the line hits it
      );
    });

    // Fade out timeline and show CTA at the very end
    tl.to(scrollContainer, {
        autoAlpha: 0,
        scale: 0.9,
        duration: 15
    }, 150); // Increased distance (wait extra scroll cycles)

    const finalCta = finalCtaRef.current;
    if (finalCta) {
        gsap.set(finalCta, { scale: 0.5, autoAlpha: 0, y: 150, rotation: -4 });
        tl.to(finalCta, {
            scale: 1, autoAlpha: 1, y: 0, rotation: 0, ease: "back.out(1.5)", duration: 15
        }, 155);
    }

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="schedule" className="relative h-screen bg-slate-50 overflow-hidden border-b-6 border-black">
      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      {/* Map Header */}
      <div className="absolute top-8 md:top-12 left-6 md:left-12 z-20 pointer-events-none">
         <h2 className="text-3xl md:text-5xl lg:text-7xl font-black font-display uppercase tracking-widest text-black flex items-center gap-3 md:gap-4">
           <span className="bg-[#f29323] p-2 md:p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-3">
             <RouteIcon className="w-8 h-8 md:w-12 md:h-12 text-black" />
           </span>
           <span className="bg-white px-4 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black">ROADMAP</span>
         </h2>
      </div>

      {/* GSAP Scroll Container */}
      <div className="absolute inset-y-0 w-full z-10 flex items-center">
         <div ref={scrollContainerRef} className="relative flex items-center shrink-0 w-[500vw] sm:w-[350vw] md:w-[250vw] lg:w-[200vw] h-[85vh] min-h-[600px]">
            
            {/* Background path line (Light Gray) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M 0 50 L 15 50 L 31 25 L 47 75 L 63 25 L 79 75 L 95 50 L 100 50" 
                     fill="none" stroke="#E2E8F0" strokeWidth="8" vectorEffect="non-scaling-stroke" strokeLinejoin="bevel" strokeLinecap="square" />
            </svg>

            {/* Foreground drawing line (Black) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
               <defs>
                 <clipPath id="snake-clip">
                   <rect ref={revealerRef} x="0" y="0" width="0" height="100" />
                 </clipPath>
               </defs>
               <path d="M 0 50 L 15 50 L 31 25 L 47 75 L 63 25 L 79 75 L 95 50 L 100 50" 
                     fill="none" stroke="black" strokeWidth="10" vectorEffect="non-scaling-stroke" strokeLinejoin="bevel" strokeLinecap="square" clipPath="url(#snake-clip)" />
            </svg>

            {/* Timline Cards perfectly aligned over the SVG path nodes */}
            {scheduleItems.map((item, index) => {
              const pos = schedulePositions[index];
              return (
                <div 
                  key={index}
                  className="snake-card  absolute z-20 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px]"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                   {/* Middle connector dot */}
                   <div className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 border-4 border-black z-[-1] bg-white transform rotate-45"></div>
                   
                   {/* Main Card */}
                   <div className="bg-white p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 relative group">
                      
                      {/* Date Indicator tag */}
                      <div className="absolute -top-4 -left-3 md:-top-5 md:-left-4 px-3 py-1.5 md:px-4 md:py-2 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 font-black font-display uppercase tracking-widest text-xs md:text-sm" style={{ backgroundColor: item.color, color: item.textColor }}>
                         <CalendarDays className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                         <span>{item.day}</span>
                         <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                         <span>{item.date}</span>
                      </div>

                      <h3 className="text-xl md:text-2xl mt-4 md:mt-6 font-black font-display uppercase leading-tight text-black group-hover:underline decoration-4 underline-offset-4 decoration-[#f29323] transition-colors">
                         {item.title}
                      </h3>
                      
                      <p className="mt-4 md:mt-5 text-sm md:text-base text-slate-800 font-medium leading-relaxed bg-[--color-light] p-3 border-l-4 border-black">
                         {item.description}
                      </p>
                      
                   </div>
                </div>
              );
            })}

         </div>
      </div>

      {/* ========================================= */}
      {/* FINAL CTA (Hidden initially)              */}
      {/* ========================================= */}
      <div ref={finalCtaRef} className="absolute inset-0 items-center justify-center z-30 pointer-events-none invisible flex">
        <div className="flex flex-col items-center gap-6 md:gap-8 pointer-events-auto px-4 z-40">
          <h2 className="text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl font-black font-display uppercase tracking-tighter text-black text-center leading-[0.9] flex flex-col items-center">
            <span className="block bg-[#FF0000] text-white px-6 py-2 md:py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 mb-4">NE MANQUEZ</span>
            <span className="block bg-[#f29323] text-black px-6 py-2 md:py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">AUCUN JOUR</span>
          </h2>
        </div>
      </div>

    </section>
  );
}

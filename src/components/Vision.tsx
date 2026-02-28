import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Code2, Rocket, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const visionItems = [
  {
    title: "INNOVATION SANS LIMITE",
    description: "Repousser les frontières de la technologie au Cameroun. Nous ne suivons pas les tendances, nous les créons. La Tech Week est le laboratoire où naissent les solutions de demain.",
    icon: Lightbulb,
    bgColor: "bg-[#FF0000]",
    textColor: "text-white"
  },
  {
    title: "CODE & CRÉATIVITÉ",
    description: "L'art de l'ingénierie logicielle rencontre l'audace créative. Des hackathons intenses aux ateliers de design, maîtrisez les outils qui transforment les idées en réalité numérique.",
    icon: Code2,
    bgColor: "bg-[#196aab]",
    textColor: "text-white"
  },
  {
    title: "PROPULSION ÉTUDIANTE",
    description: "Un tremplin massif pour les talents de l'ENSPY. Connectez-vous avec les leaders de l'industrie, accélérez votre carrière et passez du statut d'étudiant à celui de pionnier tech.",
    icon: Rocket,
    bgColor: "bg-[#f29323]",
    textColor: "text-black"
  },
  {
    title: "RÉSEAU D'ÉLITE",
    description: "Bâtir un écosystème interconnecté. Rencontrez des mentors, trouvez des co-fondateurs et intégrez la communauté la plus dynamique d'ingénieurs et de développeurs d'Afrique Centrale.",
    icon: Network,
    bgColor: "bg-white",
    textColor: "text-black"
  }
];

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scrollContainer = scrollContainerRef.current;
    const titleEl = titleRef.current;
    const finalCta = finalCtaRef.current;

    if (!scrollContainer || !titleEl || !finalCta) return;

    // Explicitly set initial states for reliability
    gsap.set(finalCta, { scale: 0.5, autoAlpha: 0, y: 150, rotation: -4 });
    gsap.set(scrollContainer, { x: window.innerWidth });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000", // Pinned for 3000px of scrolling
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // 1. Move the title from scaled & centered to its top-left DOM position
    tl.fromTo(titleEl, 
      {
        x: () => (window.innerWidth / 2) - (titleEl.offsetLeft + titleEl.offsetWidth / 2),
        y: () => (window.innerHeight / 2) - (titleEl.offsetTop + titleEl.offsetHeight / 2),
        scale: () => window.innerWidth < 768 ? 1.4 : 2,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        ease: "power2.inOut",
        duration: 1
      }
    );

    // 2. Scroll the horizontally stacked cards right to left across the screen
    tl.to(scrollContainer, 
      { 
        x: () => -scrollContainer.scrollWidth, 
        ease: "none",
        duration: 3
      },
      "+=0.2" // Slight delay after title shrinks into place
    );

    // 3. Bring in the massive final "REJOIGNEZ LA RÉVOLUTION" Action
    tl.to(finalCta, 
      { scale: 1, autoAlpha: 1, y: 0, rotation: 0, ease: "back.out(1.5)", duration: 1 },
      "-=0.7" // Start entering slightly before the last card completely vanishes
    );
      
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="vision" className="relative h-screen bg-white overflow-hidden border-b-4 border-black">
      
      {/* Decorative dots grid background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      {/* Dynamic Title */}
      <div ref={titleRef} className="absolute top-10 md:top-16 left-8 md:left-12 z-20">
         <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-display uppercase tracking-wider text-black flex flex-col items-start gap-2 md:gap-4">
            <span className="bg-[#FFFF00] px-4 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 md:-rotate-2">NOTRE</span>
            <span className="bg-[#FF0000] text-white px-4 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1 md:rotate-2 md:ml-12">VISION</span>
         </h2>
      </div>

      {/* Horizontally scrolling Cards */}
      <div className="absolute inset-y-0 w-full z-10 flex items-center pointer-events-none">
        <div ref={scrollContainerRef} className="flex gap-8 md:gap-16 items-center w-max h-full pt-16 md:pt-24 pointer-events-auto">
          
          {visionItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className={`relative w-[300px] md:w-[450px] lg:w-[500px] shrink-0 p-8 md:p-12 ${item.bgColor} border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform transition-transform duration-300 hover:-translate-y-4`}
              >
                <div className="bg-white border-4 border-black w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-black stroke-3" />
                </div>
                
                <h3 className={`text-3xl md:text-4xl font-black mb-6 font-display uppercase leading-[1.1] ${item.textColor}`}>
                  {item.title}
                </h3>
                
                <p className={`text-lg md:text-xl font-medium leading-relaxed ${item.textColor === 'text-white' ? 'text-white/90' : 'text-black/80'}`}>
                  {item.description}
                </p>
                
                {/* Decorative Number */}
                <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 bg-black text-white w-14 h-14 md:w-16 md:h-16 flex items-center justify-center font-black text-2xl md:text-3xl border-4 text-center border-white rounded-full font-display">
                  {index + 1}
                </div>
              </div>
            );
          })}
          
        </div>
      </div>

      {/* Hidden Final Call To Action */}
      <div ref={finalCtaRef} className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none invisible">
        <div className="flex flex-col items-center gap-6 md:gap-8 pointer-events-auto px-4">
          <h2 className="text-[10vw] sm:text-7xl md:text-8xl lg:text-9xl font-black font-display uppercase tracking-tighter text-black text-center leading-[0.9] flex flex-col items-center">
            <span className="block bg-[#f29323] px-6 py-2 md:py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 mb-4">REJOIGNEZ</span>
            <span className="block bg-[#196aab] text-white px-6 py-2 md:py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">LA RÉVOLUTION</span>
          </h2>
          <button className="mt-8 px-8 md:px-12 py-4 bg-[#FFFF00] text-black font-black text-xl md:text-3xl uppercase tracking-widest border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer">
            Participer Maintenant
          </button>
        </div>
      </div>
      
    </section>
  );
}

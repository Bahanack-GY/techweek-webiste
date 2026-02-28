import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Trophy, BookOpen, Music, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const activities = [
  {
    axe: "01",
    title: "DÉCOUVERTE & EXPOSITION",
    description: "Une Foire de l'Innovation Technologique avec 3 zones immersives.",
    list: [
      "Zone Entreprises Tech",
      "Zone Académique",
      "Zone d'Innovation Ouverte"
    ],
    icon: Lightbulb,
    bgColor: "bg-[#FF0000]",
    textColor: "text-white",
    accentColor: "#FF0000"
  },
  {
    axe: "02",
    title: "COMPÉTITIONS",
    description: "3 Compétitions majeures pour les esprits les plus brillants.",
    list: [
      "HackVerse 3.0",
      "CyberSecurity Contest",
      "Concours de Projets Senior & Junior"
    ],
    icon: Trophy,
    bgColor: "bg-[#196aab]",
    textColor: "text-white",
    accentColor: "#196aab"
  },
  {
    axe: "03",
    title: "FORMATION & TRANSFERT",
    description: "Des sessions enrichissantes tout au long de la semaine.",
    list: [
      "3 Conférences par des experts",
      "Ateliers pratiques (Workshops)",
      "Masterclass spéciales"
    ],
    icon: BookOpen,
    bgColor: "bg-[#f29323]",
    textColor: "text-black",
    accentColor: "#f29323"
  },
  {
    axe: "04",
    title: "CULTURE & DIVERTISSEMENT",
    description: "Des moments de détente pour clôturer l'événement en beauté.",
    list: [
      "Journée culturelle & animations",
      "Performances à Canal Olympia",
      "Soirée de Gala au Hilton Hôtel"
    ],
    icon: Music,
    bgColor: "bg-black",
    textColor: "text-white",
    accentColor: "#000000"
  }
];

export default function Activities() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Title lines animation
    gsap.fromTo('.act-title-line',
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        }
      }
    );

    // Cards stagger in from alternating sides
    const cards = gsap.utils.toArray('.activity-card') as HTMLElement[];
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { 
          x: index % 2 === 0 ? -120 : 120, 
          opacity: 0,
          rotateZ: index % 2 === 0 ? -3 : 3 
        },
        {
          x: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          }
        }
      );
    });

  }, { scope: container });

  return (
    <section id="activities" ref={container} className="relative py-24 md:py-32 bg-white overflow-hidden border-y-4 border-black">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      {/* Massive watermark text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black font-display text-black opacity-[0.03] whitespace-nowrap pointer-events-none z-0 select-none">
        ACTIVITÉS
      </div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        
        {/* Section Title */}
        <div className="mb-20 md:mb-28 pl-2 md:pl-8">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-display uppercase tracking-tighter text-black leading-[0.9]">
            <span className="act-title-line block">NOS</span>
            <span className="act-title-line block mt-2">
              <span className="bg-[#f29323] px-4 py-1 md:px-6 md:py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] inline-block transform -rotate-1">ACTIVITÉS</span>
            </span>
          </h2>
          <p className="act-title-line text-lg md:text-xl text-slate-700 max-w-2xl font-medium leading-relaxed mt-8">
            Un écosystème d'activités variées, structurées selon 4 grands axes pour redéfinir les standards de l'innovation.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-8 md:space-y-12">
          {activities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className={`activity-card group relative flex flex-col md:flex-row ${item.bgColor} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 overflow-hidden`}
              >
                {/* Left: Number + Icon */}
                <div className="w-full md:w-48 lg:w-56 shrink-0 flex md:flex-col items-center justify-between md:justify-center gap-4 p-6 md:p-8 border-b-4 md:border-b-0 md:border-r-4 border-black bg-white">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-black font-display text-black opacity-20 leading-none">
                    {item.axe}
                  </span>
                  <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ backgroundColor: item.accentColor }}>
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 p-6 md:p-10 lg:p-12 relative">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-black font-display uppercase leading-[1.05] ${item.textColor}`}>
                      {item.title}
                    </h3>
                    <ArrowUpRight className={`w-8 h-8 md:w-10 md:h-10 shrink-0 ${item.textColor} opacity-40 group-hover:opacity-100 group-hover:rotate-360 transition-all duration-500`} />
                  </div>
                  
                  <p className={`text-base md:text-lg font-medium leading-relaxed mb-6 ${item.textColor === 'text-white' ? 'text-white/80' : 'text-black/70'}`}>
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {item.list.map((listItem, i) => (
                      <span 
                        key={i} 
                        className="inline-block px-4 py-2 bg-white text-black font-bold text-sm md:text-base border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide"
                      >
                        {listItem}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

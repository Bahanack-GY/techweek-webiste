import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const schoolsList = [
  { name: "Polytechnique Yaoundé", location: "Yaoundé", bgColor: "bg-[#FF0000]", textColor: "text-white" },
  { name: "Polytechnique Maroua", location: "Maroua", bgColor: "bg-[#196aab]", textColor: "text-white" },
  { name: "Polytechnique Douala", location: "Douala", bgColor: "bg-[#f29323]", textColor: "text-black" },
  { name: "Polytech Bamenda", location: "Bamenda", bgColor: "bg-white", textColor: "text-black" },
  { name: "Faculty of Eng. & Tech", location: "Buea", bgColor: "bg-[#FFFF00]", textColor: "text-black" },
  { name: "IUC", location: "Douala", bgColor: "bg-black", textColor: "text-white" },
  { name: "UCAC-ICAM", location: "Douala", bgColor: "bg-[#FF0000]", textColor: "text-white" },
  { name: "Institut ST Jean", location: "Yaoundé", bgColor: "bg-[#196aab]", textColor: "text-white" },
  { name: "Institut Siantou", location: "Yaoundé", bgColor: "bg-[#f29323]", textColor: "text-black" },
  { name: "IAI Cameroun", location: "Yaoundé", bgColor: "bg-white", textColor: "text-black" },
  { name: "UPAC", location: "Yaoundé", bgColor: "bg-[#FFFF00]", textColor: "text-black" },
  { name: "SUPTIC", location: "Yaoundé", bgColor: "bg-black", textColor: "text-white" },
  { name: "Ngoa Ekele", location: "Yaoundé", bgColor: "bg-[#FF0000]", textColor: "text-white" },
  { name: "ICT University", location: "Yaoundé", bgColor: "bg-[#196aab]", textColor: "text-white" },
  { name: "Keyce", location: "Douala / Yaoundé", bgColor: "bg-[#f29323]", textColor: "text-black" }
];

export default function Schools() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.school-card') as HTMLElement[];
    
    // Set initial positions: first card at 0, others off-screen bottom
    gsap.set(cards, { 
      yPercent: (i) => (i === 0 ? 0 : 100)
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: `+=${(cards.length - 1) * 100}%`, // Scroll duration proportional to number of cards
        pin: true,
        scrub: 1,
      }
    });

    // Animate each card (except the first) up to 0, one after the other
    cards.forEach((card, index) => {
      if (index === 0) return;
      tl.to(card, {
        yPercent: 0,
        ease: "none",
        duration: 1
      });
    });

  }, { scope: container });

  return (
    <section ref={container} id="schools" className="relative h-screen overflow-hidden bg-black border-b-6 border-black">
      
      {/* Introduction Slide */}
      <div 
        className="school-card absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-[#FFFF00] p-8 z-0"
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <h2 className="relative z-10 text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-black font-display uppercase tracking-tighter text-center leading-[0.9] text-black flex flex-col items-center">
          <span className="block mb-2 md:mb-4">Avec les</span>
          <span className="block mb-4 md:mb-8 text-black" style={{ textShadow: '4px 4px 0px rgba(0,0,0,1)', color: 'white', WebkitTextStroke: '3px black' }}>
            Meilleures
          </span>
          <span className="bg-[#FF0000] text-white px-6 md:px-12 py-3 md:py-6 border-4 md:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] inline-block transform -rotate-2">
            Écoles d'Ingénierie
          </span>
        </h2>
      </div>

      {schoolsList.map((school, index) => (
        <div 
          key={index}
          className={`school-card absolute inset-0 w-full h-full flex flex-col md:flex-row shadow-[0px_-8px_15px_rgba(0,0,0,0.5)] ${school.bgColor}`}
          style={{ zIndex: index + 10 }}
        >
          {/* Decorative Pattern Background for the card */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 2px, transparent 0)', backgroundSize: '32px 32px', color: school.textColor === 'text-black' ? '#000' : '#fff' }}></div>

          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 relative z-10 w-full md:w-1/2 h-1/2 md:h-full">
            <div className="inline-flex items-center gap-3 mb-6 bg-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] self-start transform -rotate-2">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-black" />
              <span className="font-bold text-sm md:text-lg text-black uppercase tracking-widest">{school.location}</span>
            </div>
            
            <h2 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-display uppercase tracking-tighter leading-[0.9] ${school.textColor} drop-shadow-xl`}>
              {school.name}
            </h2>
            
            <div className={`mt-8 md:mt-12 flex items-center gap-4 ${school.textColor} opacity-80`}>
              <GraduationCap className="w-8 h-8 md:w-12 md:h-12" />
              <span className="text-xl md:text-2xl font-black uppercase tracking-widest">Participant Tech Week 2026</span>
            </div>
            
            <div className={`absolute bottom-8 right-8 text-[4rem] md:text-[8rem] font-black font-display opacity-20 ${school.textColor}`}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
          
          <div className="flex-1 relative w-full md:w-1/2 h-1/2 md:h-full border-t-8 md:border-t-0 md:border-l-8 border-black overflow-hidden bg-white">
            {/* Brutalist image placeholder container */}
            <div className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply opacity-80" style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')`, // Generic university placeholder
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            <div className={`absolute inset-0 opacity-30 ${school.bgColor}`}></div>
            
            {/* Brutalist shape overlay on image */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 border-8 border-black flex items-center justify-center bg-transparent mix-blend-overlay">
                <span className="text-black font-black text-6xl md:text-8xl">*</span>
             </div>
          </div>

        </div>
      ))}
    </section>
  );
}

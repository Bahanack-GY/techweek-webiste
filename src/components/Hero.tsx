import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

import img1 from '../assets/Hackathom2025/image.png';
import img2 from '../assets/Hackathom2025/image copy.png';
import img3 from '../assets/Hackathom2025/image copy 2.png';
import img4 from '../assets/Hackathom2025/image copy 3.png';
import img5 from '../assets/Hackathom2025/image copy 4.png';

const HERO_IMAGES = [img1, img2, img3, img4, img5];

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStackStyles = (index: number) => {
    const diff = (index - currentIndex + HERO_IMAGES.length) % HERO_IMAGES.length;
    
    if (diff === 0) return "z-30 scale-100 rotate-0 opacity-100 translate-x-0 translate-y-0";
    if (diff === 1) return "z-20 scale-[0.95] -rotate-3 opacity-100 translate-x-4 -translate-y-2 md:translate-x-6 md:-translate-y-3";
    if (diff === 2) return "z-10 scale-[0.90] rotate-6 opacity-100 translate-x-8 -translate-y-4 md:translate-x-12 md:-translate-y-6";
    if (diff === 3) return "z-0 scale-[0.80] rotate-12 opacity-0 translate-x-12 -translate-y-6 md:translate-x-16 md:-translate-y-8";
    return "z-40 scale-[1.05] -rotate-12 opacity-0 -translate-x-20 translate-y-10 md:-translate-x-32 md:translate-y-16";
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-tag', {
      x: -40,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
    .from('.hero-title-line', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.2')
    .from('.hero-info', {
      x: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.2')
    .from('.hero-btn', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)'
    }, '-=0.2')
    .from('.hero-graphic', {
      scale: 0.8,
      rotation: -10,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.2)'
    }, '-=0.8');

  }, { scope: container });

  const scrollToNext = () => {
    const nextSection = document.getElementById('vision');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRegistration = () => {
    const regSection = document.getElementById('registration');
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={container}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white border-b-[6px] border-black"
    >
      <div className="container relative z-10 px-4 mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start space-y-8 z-10">
            
            {/* Tag */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4">
              <div className="hero-info flex items-center gap-3 text-black bg-white px-4 md:px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-black" />
                <span className="font-bold text-sm md:text-base uppercase tracking-wide">23 - 28 Mars 2026</span>
              </div>
              <div className="hero-info flex items-center gap-3 text-black bg-white px-4 md:px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-black" />
                <span className="font-bold text-sm md:text-base uppercase tracking-wide">Yaoundé</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="flex flex-col items-start gap-1 md:gap-2 text-[3.5rem] sm:text-7xl md:text-[6rem] lg:text-[7.5rem] font-black tracking-tighter font-display uppercase leading-[0.9] text-black">
              <span className="hero-title-line">TECH WEEK</span>
              <span className="hero-title-line bg-[#FF0000] text-white px-2 pt-2 md:pt-4 pb-0 my-2 md:my-3 border-black">2026</span>
              <span className="hero-title-line">ENSPY</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-slate-800 font-medium max-w-xl leading-relaxed mt-4">
              Bâtir le plus grand rassemblement technologique académique du Cameroun
            </p>

            {/* Meta Info */}
            

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mt-8 w-full sm:w-auto">
              <button 
                onClick={scrollToNext}
                className="hero-btn flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#f29323] text-black font-black text-lg uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 cursor-pointer"
              >
                Découvrir
                <ArrowRight className="w-6 h-6 stroke-3 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={scrollToRegistration}
                className="hero-btn w-full sm:w-auto px-6 py-4 bg-white text-black font-black text-sm md:text-md uppercase tracking-wider border-4 border-black hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
              >
                S'inscrire A un concours
              </button>
            </div>

          </div>

          {/* Right Column: Animated Image Stack */}
          <div className="hero-graphic relative w-full aspect-square max-w-[450px] md:max-w-[550px] lg:max-w-[700px] mx-auto mt-16 lg:mt-0 flex justify-center items-center">
            {HERO_IMAGES.map((img, index) => (
              <img 
                key={index}
                src={img}
                alt={`Tech Week Highlight ${index + 1}`}
                className={`absolute w-[95%] h-[95%] object-cover border-4 border-black transition-all duration-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white transform origin-center ${getStackStyles(index)}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}

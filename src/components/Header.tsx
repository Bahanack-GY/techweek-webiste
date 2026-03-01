import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Tech-week-final-no-bg.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? 'border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] py-4' : 'py-6 border-b-0'
      }`}
    >
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src={logo} 
              alt="Tech Week Logo" 
              className="h-8 md:h-10 lg:h-12 object-contain" 
            />
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 font-black uppercase text-sm lg:text-base tracking-wider text-black">
            <button 
              onClick={() => scrollToSection('vision')} 
              className="hover:underline decoration-4 underline-offset-8 transition-all"
            >
              VISION
            </button>
            <button 
              onClick={() => scrollToSection('activities')} 
              className="hover:underline decoration-4 underline-offset-8 transition-all"
            >
              ACTIVITÉS
            </button>
            <button 
              onClick={() => navigate('/shop')} 
              className="hover:underline decoration-4 text-[#22C55E] underline-offset-8 transition-all"
            >
              BOUTIQUE
            </button>
            <button 
              onClick={() => navigate('/image')} 
              className="hover:underline decoration-4 text-[#3B82F6] underline-offset-8 transition-all bg-[#EFF6FF] px-2 py-1 border-2 border-black -rotate-2 shadow-[2px_2px_0px_0px_#1E40AF]"
            >
              BADGE
            </button>
          </nav>

          {/* CTA Button */}
          <div>
            <button 
              onClick={() => scrollToSection('registration')}
              className="uppercase font-black text-xs md:text-sm lg:text-base tracking-wider bg-[#f29323] text-black px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all outline-none cursor-pointer"
            >
              S'INSCRIRE A UN CONCOURS
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

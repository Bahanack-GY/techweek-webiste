import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Tech-week-final-no-bg.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      setIsMobileMenuOpen(false);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
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
              className="h-8 md:h-10 lg:h-12 object-contain relative z-50" 
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden relative z-50 flex flex-col justify-center items-center w-12 h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all outline-none gap-1.5 ${isMobileMenuOpen ? 'bg-[#FF0000]' : 'bg-[#f29323]'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[4px] bg-black transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`}></span>
            <span className={`block w-6 h-[4px] bg-black transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-[4px] bg-black transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`}></span>
          </button>

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
              onClick={() => handleNavigate('/shop')} 
              className="hover:underline decoration-4 text-[#22C55E] underline-offset-8 transition-all"
            >
              BOUTIQUE
            </button>
            <button 
              onClick={() => handleNavigate('/image')} 
              className="hover:underline decoration-4 text-[#3B82F6] underline-offset-8 transition-all bg-[#EFF6FF] px-2 py-1 border-2 border-black -rotate-2 shadow-[2px_2px_0px_0px_#1E40AF]"
            >
              BADGE
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('registration')}
              className="uppercase font-black text-xs md:text-sm lg:text-base tracking-wider bg-[#f29323] text-black px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all outline-none cursor-pointer"
            >
              S'INSCRIRE A UN CONCOURS
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 font-black uppercase text-2xl tracking-wider text-black">
          <button 
            onClick={() => scrollToSection('vision')} 
            className="hover:underline decoration-4 underline-offset-8 transition-all transform hover:scale-110"
          >
            VISION
          </button>
          <button 
            onClick={() => scrollToSection('activities')} 
            className="hover:underline decoration-4 underline-offset-8 transition-all transform hover:scale-110"
          >
            ACTIVITÉS
          </button>
          <button 
            onClick={() => handleNavigate('/shop')} 
            className="text-[#22C55E] hover:underline decoration-4 underline-offset-8 transition-all transform hover:scale-110"
          >
            BOUTIQUE
          </button>
          <button 
            onClick={() => handleNavigate('/image')} 
            className="text-[#3B82F6] hover:underline decoration-4 underline-offset-8 transition-all bg-[#EFF6FF] px-4 py-2 border-4 border-black -rotate-2 shadow-[4px_4px_0px_0px_#1E40AF] transform hover:scale-110"
          >
            BADGE
          </button>
          <button 
            onClick={() => scrollToSection('registration')}
            className="mt-8 uppercase font-black text-lg tracking-wider bg-[#f29323] text-black px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all outline-none w-full max-w-[280px]"
          >
            S'INSCRIRE
          </button>
        </nav>
      </div>
    </header>
  );
}

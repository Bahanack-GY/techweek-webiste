import { CheckCircle, Home, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RegistrationConfirmation() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[--color-light] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-[--color-secondary] opacity-20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl">
        <div className="bg-white border-4 md:border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-16 text-center">
            
          {/* Success Icon */}
          <div className="inline-flex justify-center items-center bg-[#4ADE80] p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-3 mb-10">
            <CheckCircle className="w-16 h-16 md:w-24 md:h-24 text-black" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display uppercase tracking-widest text-black mb-6 leading-tight">
            INSCRIPTION <br/><span className="bg-[#f29323] px-4 py-2 border-4 border-black inline-block transform rotate-2 mt-2">RÉUSSIE !</span>
          </h1>

          <p className="text-xl md:text-2xl font-bold text-slate-800 mb-12 max-w-2xl mx-auto border-l-8 border-[#4ADE80] pl-6 py-2 bg-slate-50">
            Félicitations ! Votre équipe est maintenant officiellement inscrite. Préparez-vous à relever le défi.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => navigate('/')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-black text-lg uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_var(--color-primary)] hover:shadow-[2px_2px_0px_0px_var(--color-primary)] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <Home className="w-6 h-6" />
              Retour à l'accueil
            </button>
            <button 
              onClick={() => navigate('/?section=schedule')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black text-lg uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all group"
            >
              Voir le programme
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

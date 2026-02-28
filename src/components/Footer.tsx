import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[--color-light] pt-16 pb-8 border-t-8 border-[--color-dark] relative overflow-hidden">
      
      {/* Decorative Background Block */}
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[--color-secondary] rounded-full mix-blend-multiply opacity-20 filter blur-2xl"></div>
      <div className="absolute right-0 top-0 w-1/3 h-full bg-[--color-primary] opacity-5 -skew-x-12 transform origin-bottom-right"></div>

      <div className="container relative z-10 px-4 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
          
          {/* Contact Info Column */}
          <div className="space-y-8">
            <div className="inline-block">
              <h3 className="text-4xl md:text-5xl font-black font-display uppercase tracking-wider mb-2 text-[--color-dark] inline-block bg-white px-4 py-2 border-4 border-[--color-dark] shadow-[6px_6px_0px_0px_var(--color-secondary)] -rotate-1 transform">
                Contactez-<span className="text-[--color-primary]">Nous</span>
              </h3>
              <p className="text-slate-800 font-medium mt-8 max-w-md bg-white p-4 border-l-4 border-[--color-primary] shadow-sm">
                Pour toute information complémentaire ou demande de partenariat concernant la TECH WEEK 2026.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-4 bg-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] group-hover:shadow-[2px_2px_0px_0px_var(--color-dark)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
                  <MapPin className="w-6 h-6 text-[--color-primary]" />
                </div>
                <div>
                  <h4 className="text-[--color-dark] font-black uppercase tracking-wide mb-1">Adresse</h4>
                  <p className="text-slate-700 font-medium">B.P : 8390 Yaoundé, Cameroun</p>
                  <p className="text-slate-700 font-medium">Club Génie Informatique (ENSPY)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-4 bg-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] group-hover:shadow-[2px_2px_0px_0px_var(--color-dark)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
                  <Phone className="w-6 h-6 text-[--color-secondary]" />
                </div>
                <div>
                  <h4 className="text-[--color-dark] font-black uppercase tracking-wide mb-1">Téléphone</h4>
                  <p className="text-slate-700 font-medium">+237 6 83 86 24 42</p>
                  <p className="text-slate-700 font-medium">+237 6 97 59 71 79</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-4 bg-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] group-hover:shadow-[2px_2px_0px_0px_var(--color-dark)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
                  <Mail className="w-6 h-6 text-[--color-cta]" />
                </div>
                <div>
                  <h4 className="text-[--color-dark] font-black uppercase tracking-wide mb-1">Email</h4>
                  <a href="mailto:clubinfoenspy@gmail.com" className="text-slate-700 font-medium hover:text-[--color-primary] transition-colors hover:underline decoration-2 underline-offset-4">
                    clubinfoenspy@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form Column */}
          <div className="bg-white border-4 border-[--color-dark] shadow-[8px_8px_0px_0px_var(--color-dark)] p-6 md:p-8 relative">
            
            {/* Folder tab accent */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[--color-primary] border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] flex items-center justify-center opacity-80" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
            </div>

            <div className="mb-8 text-left">
              <h4 className="text-xl md:text-2xl font-black text-[--color-dark] uppercase tracking-widest mb-2 font-display bg-[#DBEAFE] inline-block px-4 py-1 border-2 border-[--color-dark]">
                Laissez un Message
              </h4>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-black text-[--color-dark] uppercase tracking-wider">Nom Complet</label>
                  <input type="text" id="name" placeholder="John Doe" className="w-full bg-[--color-light] p-3 pl-4 border-2 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-[--color-dark]" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-black text-[--color-dark] uppercase tracking-wider">Adresse Email</label>
                  <input type="email" id="email" placeholder="john@example.com" className="w-full bg-[--color-light] p-3 pl-4 border-2 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-[--color-dark]" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-black text-[--color-dark] uppercase tracking-wider">Sujet</label>
                <input type="text" id="subject" placeholder="Partenariat, Question..." className="w-full bg-[--color-light] p-3 pl-4 border-2 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-[--color-dark]" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-black text-[--color-dark] uppercase tracking-wider">Votre Message</label>
                <textarea id="message" rows={4} placeholder="Comment pouvons-nous vous aider ?" className="w-full bg-[--color-light] p-3 pl-4 border-2 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-[--color-dark] resize-none"></textarea>
              </div>

              <button type="submit" className="w-full py-4 mt-2 bg-[--color-cta] text-[--color-dark] font-black text-lg md:text-xl uppercase tracking-widest border-4 border-[--color-dark] shadow-[6px_6px_0px_0px_var(--color-dark)] hover:shadow-[2px_2px_0px_0px_var(--color-dark)] hover:translate-x-1 hover:translate-y-1 transition-all flex justify-center items-center gap-3">
                <Send className="w-6 h-6" />
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center pt-8 border-t-4 border-[--color-dark] flex flex-col items-center justify-center mt-8">
          <p className="text-sm font-bold text-[--color-dark] mb-4">
            © 2026 Club Génie Informatique (ENSPY). Tous droits réservés.
          </p>
          <div className="flex items-center justify-center gap-3 text-sm font-black font-display text-[--color-dark] border-2 border-[--color-dark] px-6 py-2 bg-white shadow-[4px_4px_0px_0px_var(--color-primary)]">
            <span>TECH WEEK</span>
            <span className="w-2 h-2 border-2 border-[--color-dark] bg-[--color-cta]"></span>
            <span>YAOUNDÉ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

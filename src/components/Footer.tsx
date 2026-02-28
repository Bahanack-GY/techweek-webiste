import { MapPin, Phone, Mail, Send, Facebook, Linkedin, Instagram, Twitter, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[--color-light] pt-20 pb-8 border-t-6 md:border-t-8 border-[--color-dark] relative overflow-hidden">
      
      {/* Decorative Background Block */}
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[--color-secondary] rounded-full mix-blend-multiply opacity-20 filter blur-2xl pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-1/3 h-full bg-[--color-primary] opacity-5 -skew-x-12 transform origin-bottom-right pointer-events-none"></div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          
          {/* ========================================= */}
          {/* LEFT COLUMN: Info, Links, Social, Contact */}
          {/* ========================================= */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Brand & Description */}
            <div>
              <h3 className="text-4xl md:text-5xl font-black font-display uppercase tracking-wider mb-2 text-[--color-dark] inline-block bg-white px-4 py-2 border-4 border-[--color-dark] shadow-[6px_6px_0px_0px_var(--color-secondary)] -rotate-1 transform">
                TECH <span className="text-[--color-primary]">WEEK</span>
              </h3>
              <p className="text-slate-800 font-medium mt-6 max-w-lg bg-white p-4 border-l-4 border-[--color-primary] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] text-lg leading-relaxed">
                La semaine de l'informaticien organisée par le Club Génie Informatique de l'ENSPY. Une immersion totale dans l'univers de la tech, de l'innovation et de l'entrepreneuriat au Cameroun.
              </p>
            </div>

            {/* Links & Social Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              
              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-[--color-dark] font-black uppercase tracking-widest text-xl border-b-4 border-[--color-dark] inline-block pb-1">Navigation</h4>
                <ul className="space-y-3 font-bold text-slate-700">
                  <li>
                     <a href="#hero" className="flex items-center gap-2 hover:text-[--color-primary] hover:translate-x-2 transition-all group">
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                        Accueil
                     </a>
                  </li>
                  <li>
                     <a href="#vision" className="flex items-center gap-2 hover:text-[--color-secondary] hover:translate-x-2 transition-all group">
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                        Notre Vision
                     </a>
                  </li>
                  <li>
                     <a href="#activities" className="flex items-center gap-2 hover:text-[--color-cta] hover:translate-x-2 transition-all group">
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                        Activités
                     </a>
                  </li>
                  <li>
                     <a href="#schedule" className="flex items-center gap-2 hover:text-[--color-primary] hover:translate-x-2 transition-all group">
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                        Chronogramme
                     </a>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div className="space-y-6">
                <h4 className="text-[--color-dark] font-black uppercase tracking-widest text-xl border-b-4 border-[--color-dark] inline-block pb-1">Réseaux Sociaux</h4>
                <div className="flex flex-wrap gap-4">
                   <a href="#" aria-label="Facebook" className="p-3 bg-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] hover:shadow-[2px_2px_0px_0px_var(--color-dark)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-[#1877F2]">
                     <Facebook className="w-6 h-6" />
                   </a>
                   <a href="#" aria-label="LinkedIn" className="p-3 bg-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] hover:shadow-[2px_2px_0px_0px_var(--color-dark)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-[#0A66C2]">
                     <Linkedin className="w-6 h-6" />
                   </a>
                   <a href="#" aria-label="Instagram" className="p-3 bg-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] hover:shadow-[2px_2px_0px_0px_var(--color-dark)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-[#E4405F]">
                     <Instagram className="w-6 h-6" />
                   </a>
                   <a href="#" aria-label="Twitter" className="p-3 bg-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] hover:shadow-[2px_2px_0px_0px_var(--color-dark)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-[#1DA1F2]">
                     <Twitter className="w-6 h-6" />
                   </a>
                </div>
              </div>
            </div>

            {/* Direct Contact Info */}
            <div className="pt-8 border-t-4 border-dashed border-[--color-dark]">
               <h4 className="text-[--color-dark] font-black uppercase tracking-widest text-xl mb-6">Informations de Contact</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] group-hover:shadow-[2px_2px_0px_0px_var(--color-dark)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all shrink-0">
                      <MapPin className="w-6 h-6 text-[--color-primary]" />
                    </div>
                    <div>
                      <h5 className="text-[--color-dark] font-black uppercase tracking-wide mb-1">Adresse</h5>
                      <p className="text-slate-700 font-medium">B.P : 8390 Yaoundé</p>
                      <p className="text-slate-700 font-medium">Club Génie Info (ENSPY)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] group-hover:shadow-[2px_2px_0px_0px_var(--color-dark)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all shrink-0">
                      <Phone className="w-6 h-6 text-[--color-secondary]" />
                    </div>
                    <div>
                      <h5 className="text-[--color-dark] font-black uppercase tracking-wide mb-1">Téléphone</h5>
                      <p className="text-slate-700 font-medium">+237 6 83 86 24 42</p>
                      <p className="text-slate-700 font-medium">+237 6 97 59 71 79</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group sm:col-span-2">
                    <div className="p-3 bg-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] group-hover:shadow-[2px_2px_0px_0px_var(--color-dark)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all shrink-0">
                      <Mail className="w-6 h-6 text-[--color-cta]" />
                    </div>
                    <div>
                      <h5 className="text-[--color-dark] font-black uppercase tracking-wide mb-1">Email</h5>
                      <a href="mailto:clubinfoenspy@gmail.com" className="text-slate-700 font-medium hover:text-[--color-primary] transition-colors hover:underline decoration-2 underline-offset-4 border-b-2 border-transparent hover:border-[--color-primary]">
                        clubinfoenspy@gmail.com
                      </a>
                    </div>
                  </div>
               </div>
            </div>

          </div>
          
          {/* ========================================= */}
          {/* RIGHT COLUMN: Contact Form                */}
          {/* ========================================= */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Form Container */}
            <div className="bg-white border-4 border-[--color-dark] shadow-[8px_8px_0px_0px_var(--color-dark)] lg:shadow-[12px_12px_0px_0px_var(--color-dark)] p-6 md:p-8 relative h-full flex flex-col justify-center">
              
              {/* Folder tab accent */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-[--color-primary] text-white border-4 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] flex items-center justify-center opacity-100 z-10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
              </div>

              <div className="mb-8 text-left">
                <h4 className="text-xl md:text-2xl font-black text-[--color-dark] uppercase tracking-widest mb-2 font-display bg-[#DBEAFE] inline-block px-4 py-2 border-2 border-[--color-dark]">
                  Laissez un Message
                </h4>
                <p className="mt-4 font-bold text-slate-600">Vous avez une question ou une proposition de partenariat ? Écrivez-nous directement.</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-black text-[--color-dark] uppercase tracking-wider">Nom Complet</label>
                  <input type="text" id="name" placeholder="John Doe" className="w-full bg-[--color-light] p-3 pl-4 border-2 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-[--color-dark]" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-black text-[--color-dark] uppercase tracking-wider">Adresse Email</label>
                  <input type="email" id="email" placeholder="john@example.com" className="w-full bg-[--color-light] p-3 pl-4 border-2 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-[--color-dark]" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-black text-[--color-dark] uppercase tracking-wider">Sujet</label>
                  <input type="text" id="subject" placeholder="Partenariat, Question..." className="w-full bg-[--color-light] p-3 pl-4 border-2 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-[--color-dark]" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-black text-[--color-dark] uppercase tracking-wider">Votre Message</label>
                  <textarea id="message" rows={4} placeholder="Comment pouvons-nous vous aider ?" className="w-full bg-[--color-light] p-3 pl-4 border-2 border-[--color-dark] shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-[--color-dark] resize-none"></textarea>
                </div>

                <button type="submit" className="w-full py-4 mt-4 bg-[--color-cta] text-[--color-dark] font-black text-lg md:text-xl uppercase tracking-widest border-4 border-[--color-dark] shadow-[6px_6px_0px_0px_var(--color-dark)] hover:shadow-[2px_2px_0px_0px_var(--color-dark)] hover:translate-x-1 hover:translate-y-1 transition-all flex justify-center items-center gap-3">
                  <Send className="w-6 h-6" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* ========================================= */}
        {/* COPYRIGHT BADGE BANDS                     */}
        {/* ========================================= */}
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

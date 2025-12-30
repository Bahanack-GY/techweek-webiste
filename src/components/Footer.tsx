import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'fr' ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
    };

    return (
        <footer className="bg-[var(--color-brand-dark)] border-t border-white/10 py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                
                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-3xl font-bold font-mono mb-4">
                        TECH<span className="text-[var(--color-brand-orange)]">WEEK</span>__25
                    </h2>
                    <p className="text-gray-400 max-w-sm mb-6">
                        {t('footer.brand.subtitle')}
                    </p>
                    <div className="space-y-2 text-gray-400 text-sm">
                        <div className="flex items-center gap-2"><MapPin size={16} className="text-[var(--color-brand-orange)]" /> École Nationale Supérieure Polytechnique de Yaoundé</div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-6">{t('footer.quick_links.title')}</h3>
                    <ul className="space-y-4">
                        <li><a href="#about" className="text-gray-400 hover:text-[var(--color-brand-orange)] transition-colors">{t('footer.quick_links.about')}</a></li>
                        <li><a href="#activities" className="text-gray-400 hover:text-[var(--color-brand-orange)] transition-colors">{t('footer.quick_links.activities')}</a></li>
                        <li><a href="#schedule" className="text-gray-400 hover:text-[var(--color-brand-orange)] transition-colors">{t('footer.quick_links.schedule')}</a></li>
                        <li><a href="#sponsors" className="text-gray-400 hover:text-[var(--color-brand-orange)] transition-colors">{t('footer.quick_links.participating_schools')}</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-6">{t('footer.contact.title')}</h3>
                    <div className="space-y-4 mb-6">
                         <a href="tel:+237683862442" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <Phone size={16} className="text-[var(--color-brand-orange)]" /> +237 683 86 24 42
                        </a>
                        <a href="tel:+237676738248" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <Phone size={16} className="text-[var(--color-brand-orange)]" /> +237 676 73 82 48
                        </a>
                        <a href="mailto:clubinfoenspy@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <Mail size={16} className="text-[var(--color-brand-orange)]" /> clubinfoenspy@gmail.com
                        </a>
                    </div>
                    
                    <div className="flex gap-4 mb-6">
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--color-brand-orange)] transition-colors"><Facebook size={18} /></a>
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--color-brand-orange)] transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--color-brand-orange)] transition-colors"><Linkedin size={18} /></a>
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--color-brand-orange)] transition-colors"><Instagram size={18} /></a>
                    </div>

                     {/* Language Toggle */}
                     <div>
                        <button 
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full hover:border-[var(--color-brand-orange)] hover:text-[var(--color-brand-orange)] transition-all text-sm font-mono"
                        >
                            <span className={i18n.language === 'en' ? 'text-[var(--color-brand-orange)] font-bold' : 'text-gray-400'}>EN</span>
                            <span className="text-gray-600">/</span>
                            <span className={i18n.language === 'fr' ? 'text-[var(--color-brand-orange)] font-bold' : 'text-gray-400'}>FR</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-white/5 mt-16 pt-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} {t('footer.rights')}
            </div>
        </footer>
    );
};

export default Footer;

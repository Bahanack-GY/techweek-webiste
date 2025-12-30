import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const schools = [
    { name: "Polytech Maroua", logo: "https://placehold.co/200x100/101010/FFFFFF?text=Polytech+Maroua" },
    { name: "Polytech Douala", logo: "https://placehold.co/200x100/101010/FFFFFF?text=Polytech+Douala" },
    { name: "Polytech Bamenda", logo: "https://placehold.co/200x100/101010/FFFFFF?text=Polytech+Bamenda" },
    { name: "FET Buea", logo: "https://placehold.co/200x100/101010/FFFFFF?text=FET+Buea" },
    { name: "IUC", logo: "https://placehold.co/200x100/101010/FFFFFF?text=IUC" },
    { name: "UCAC-ICAM", logo: "https://placehold.co/200x100/101010/FFFFFF?text=UCAC-ICAM" },
    { name: "Saint Jean", logo: "https://placehold.co/200x100/101010/FFFFFF?text=Saint+Jean" },
    { name: "Siantou", logo: "https://placehold.co/200x100/101010/FFFFFF?text=Siantou" },
    { name: "IAI Cameroun", logo: "https://placehold.co/200x100/101010/FFFFFF?text=IAI" },
    { name: "Suptic", logo: "https://placehold.co/200x100/101010/FFFFFF?text=Suptic" },
    { name: "FacSciences (Ngoa Ekele)", logo: "https://placehold.co/200x100/101010/FFFFFF?text=FacSciences" },
    { name: "ENSPY", logo: "https://placehold.co/200x100/101010/FFFFFF?text=ENSPY" },
    { name: "ICT-University", logo: "https://placehold.co/200x100/101010/FFFFFF?text=ICT-U" },
];

const ParticipatingSchools = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-[var(--color-brand-black)] border-t border-white/5">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                     <h2 className="text-sm font-mono font-bold text-[var(--color-brand-orange)] uppercase tracking-widest mb-4">
                        {t('participating_schools.title_badge')}
                    </h2>
                     <h3 className="text-3xl md:text-5xl font-bold mb-6">
                        {t('participating_schools.title_main')} <span className="text-gray-500">{t('participating_schools.title_highlight')}</span>
                    </h3>
                </div>

                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                     {schools.map((school, index) => (
                         <motion.div 
                            key={school.name} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="flex items-center justify-center p-6 bg-white/5 rounded-xl border border-white/5 hover:border-[var(--color-brand-orange)]/50 transition-colors group"
                        >
                            <img 
                                src={school.logo} 
                                alt={school.name} 
                                className="w-full h-auto max-h-16 object-contain opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300" 
                            />
                         </motion.div>
                     ))}
                 </div>
             </div>
        </section>
    );
};

export default ParticipatingSchools;

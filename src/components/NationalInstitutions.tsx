import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const institutions = [
    { name: "MINSUP", logo: "https://placehold.co/200x100/101010/FFFFFF?text=MINSUP" },
    { name: "MINRESI", logo: "https://placehold.co/200x100/101010/FFFFFF?text=MINRESI" },
    { name: "MINPOSTEL", logo: "https://placehold.co/200x100/101010/FFFFFF?text=MINPOSTEL" },
    { name: "MINSANTE", logo: "https://placehold.co/200x100/101010/FFFFFF?text=MINSANTE" },
    { name: "MINJEC", logo: "https://placehold.co/200x100/101010/FFFFFF?text=MINJEC" },
    { name: "DDDM", logo: "https://placehold.co/200x100/101010/FFFFFF?text=DDDM" },
    { name: "DRE", logo: "https://placehold.co/200x100/101010/FFFFFF?text=DRE" },
   
];

const NationalInstitutions = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-black border-t border-white/5">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                     <h2 className="text-sm font-mono font-bold text-[var(--color-brand-orange)] uppercase tracking-widest mb-4">
                        {t('national_institutions.title_badge')}
                    </h2>
                     <h3 className="text-3xl md:text-5xl font-bold mb-6">
                        {t('national_institutions.title_main')} <span className="text-gray-500">{t('national_institutions.title_highlight')}</span>
                    </h3>
                </div>

                 <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-12">
                     {institutions.map((inst, index) => (
                         <motion.div 
                            key={inst.name} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center justify-center p-6 bg-white/5 rounded-xl border border-white/5 hover:border-(--color-brand-orange)/50 transition-colors w-full h-24 md:w-52 md:h-32 group"
                        >
                            <img 
                                src={inst.logo} 
                                alt={inst.name} 
                                className="w-full h-full object-contain opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300" 
                            />
                         </motion.div>
                     ))}
                 </div>
             </div>
        </section>
    );
};

export default NationalInstitutions;

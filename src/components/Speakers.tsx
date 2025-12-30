import { motion } from 'motion/react';
import { Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const speakers = [
    {
        name: "Nelly Chatue-Diop",
        role: "CEO, Ejara",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
    },
    {
        name: "Howard Lakougna",
        role: "COO, CITS",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
    },
    {
        name: "Ayuk Etta",
        role: "Head of Engineering, Google",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
    },
    {
        name: "Shubhra Bhatt",
        role: "Product Lead, Spotify",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
    },
];

const Speakers = () => {
    const { t } = useTranslation();

    return (
        <section id="speakers" className="py-24 bg-[var(--color-brand-dark)]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-mono font-bold text-[var(--color-brand-orange)] uppercase tracking-widest mb-4">
                        {t('speakers.title_badge')}
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-bold">
                        {t('speakers.title_main')} <span className="text-gray-500">{t('speakers.title_highlight')}</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {speakers.map((speaker, index) => (
                        <motion.div
                            key={speaker.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-xl bg-white/5"
                        >
                            <div className="aspect-[3/4] overflow-hidden">
                                <img 
                                    src={speaker.image} 
                                    alt={speaker.name} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-100 transition-opacity" />
                            
                            <div className="absolute bottom-0 left-0 w-full p-6">
                                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--color-brand-orange)] transition-colors">{speaker.name}</h4>
                                <p className="text-sm text-gray-300 font-mono mb-4">{speaker.role}</p>
                                
                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-brand-orange)] transition-colors">
                                        <Twitter size={16} />
                                    </a>
                                    <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[var(--color-brand-orange)] transition-colors">
                                        <Linkedin size={16} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Speakers;

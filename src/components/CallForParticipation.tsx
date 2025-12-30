import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Handshake, MicVocal, ArrowRight, Store } from 'lucide-react';

const CallForParticipation = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'partner' | 'speaker' | 'exposant'>('partner');

    return (
        <section id="participate" className="py-24 bg-[var(--color-brand-black)] border-t border-white/5 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-[var(--color-brand-orange)]/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                     <h2 className="text-sm font-mono font-bold text-[var(--color-brand-orange)] uppercase tracking-widest mb-4">
                        {t('call_for_participation.title_badge')}
                    </h2>
                     <h3 className="text-3xl md:text-5xl font-bold mb-8">
                        {t('call_for_participation.title_main')} <span className="text-white">{t('call_for_participation.title_highlight')}</span>
                    </h3>

                    {/* Toggle Switch */}
                    <div className="flex flex-col md:inline-flex md:flex-row bg-white/5 p-1 rounded-3xl md:rounded-full border border-white/10 w-full md:w-auto gap-2 md:gap-0">
                        <button
                            onClick={() => setActiveTab('partner')}
                            className={`relative px-6 py-4 md:px-8 md:py-3 rounded-2xl md:rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 w-full md:w-auto ${activeTab === 'partner' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            {activeTab === 'partner' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-[var(--color-brand-orange)] rounded-2xl md:rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Handshake size={16} /> {t('navbar.sponsors')}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('speaker')}
                            className={`relative px-6 py-4 md:px-8 md:py-3 rounded-2xl md:rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 w-full md:w-auto ${activeTab === 'speaker' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            {activeTab === 'speaker' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-[var(--color-brand-orange)] rounded-2xl md:rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <MicVocal size={16} /> {t('navbar.speakers')}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('exposant')}
                            className={`relative px-6 py-4 md:px-8 md:py-3 rounded-2xl md:rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 w-full md:w-auto ${activeTab === 'exposant' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            {activeTab === 'exposant' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-[var(--color-brand-orange)] rounded-2xl md:rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Store size={16} /> {t('call_for_participation.tabs.exposants')}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        {activeTab === 'partner' && (
                            <motion.div
                                key="partner"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="bg-[var(--color-brand-dark)] border border-white/10 rounded-3xl p-8 md:p-12 text-center"
                            >
                                <div className="inline-flex p-4 rounded-full bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] mb-6">
                                    <Handshake size={48} />
                                </div>
                                <h4 className="text-2xl md:text-3xl font-bold mb-4">Shape the Future with Us</h4>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                                    Showcase your brand to over 10,000 tech enthusiasts, connect with top engineering talent, and demonstrate your commitment to innovation in Cameroon.
                                </p>
                                <a href="mailto:partners@techweek.cm" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-[var(--color-brand-orange)] hover:text-white transition-colors">
                                    Partner with Us <ArrowRight size={20} />
                                </a>
                            </motion.div>
                        )}

                        {activeTab === 'speaker' && (
                            <motion.div
                                key="speaker"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="bg-[var(--color-brand-dark)] border border-white/10 rounded-3xl p-8 md:p-12 text-center"
                            >
                                <div className="inline-flex p-4 rounded-full bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] mb-6">
                                    <MicVocal size={48} />
                                </div>
                                <h4 className="text-2xl md:text-3xl font-bold mb-4">Share Your Expertise</h4>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                                    Have a groundbreaking idea or technical skill to share? Join our lineup of world-class speakers and inspire the next generation of tech leaders.
                                </p>
                                <a href="mailto:speakers@techweek.cm" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-[var(--color-brand-orange)] hover:text-white transition-colors">
                                    Apply as Speaker <ArrowRight size={20} />
                                </a>
                            </motion.div>
                        )}

                        {activeTab === 'exposant' && (
                            <motion.div
                                key="exposant"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="bg-[var(--color-brand-dark)] border border-white/10 rounded-3xl p-8 md:p-12 text-center"
                            >
                                <div className="inline-flex p-4 rounded-full bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] mb-6">
                                    <Store size={48} />
                                </div>
                                <h4 className="text-2xl md:text-3xl font-bold mb-4">Showcase Your Products</h4>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                                   {t('call_for_participation.exposants.description')}
                                </p>
                                <a href="mailto:exhibitors@techweek.cm" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-[var(--color-brand-orange)] hover:text-white transition-colors">
                                    {t('call_for_participation.exposants.cta')} <ArrowRight size={20} />
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CallForParticipation;

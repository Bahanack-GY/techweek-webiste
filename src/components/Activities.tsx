import { motion } from 'motion/react';
import { Target, Code, Shield, Trophy, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Activities = () => {
    const { t } = useTranslation();

    const activities = [
        {
            title: t('activities.cards.fair.title'),
            description: t('activities.cards.fair.description'),
            icon: Lightbulb,
        },
        {
            title: t('activities.cards.hackathon.title'),
            description: t('activities.cards.hackathon.description'),
            icon: Code,
        },
        {
            title: t('activities.cards.cybersecurity.title'),
            description: t('activities.cards.cybersecurity.description'),
            icon: Shield,
        },
        {
            title: t('activities.cards.best_app.title'),
            description: t('activities.cards.best_app.description'),
            icon: Trophy,
        },
        {
            title: t('activities.cards.pitch.title'),
            description: t('activities.cards.pitch.description'),
            icon: Target,
        },
    ];

    return (
        <section id="activities" className="py-24 bg-[var(--color-brand-dark)]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                     <h2 className="text-sm font-mono font-bold text-[var(--color-brand-orange)] uppercase tracking-widest mb-4">
                        {t('activities.title_badge')}
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-bold mb-6">
                        {t('activities.title_main')} <br /><span className="text-gray-500">{t('activities.title_highlight')}</span>
                    </h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t('activities.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={activity.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group"
                        >
                            <div className="mb-6 inline-block p-4 bg-[var(--color-brand-orange)]/10 rounded-xl text-[var(--color-brand-orange)] group-hover:bg-[var(--color-brand-orange)] group-hover:text-white transition-colors">
                                <activity.icon size={32} />
                            </div>
                            <h4 className="text-xl font-bold mb-3">{activity.title}</h4>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {activity.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Activities;

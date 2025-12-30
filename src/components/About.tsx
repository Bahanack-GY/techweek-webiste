import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { MoveRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";



const Counter = ({ value, label, index }: { value: string, label: string, index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
    
    // Extract numeric part and any non-numeric suffix
    const numericPart = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');

    useEffect(() => {
        if (isInView) {
            // For larger numbers (e.g. > 1000), use a slightly longer duration to show off the speed
            // For smaller numbers, keep it snappy
            const duration = numericPart > 1000 ? 2.5 : 1.5;
            
            const controls = animate(count, numericPart, { 
                duration: duration,
                ease: "easeOut"
            });
            return controls.stop;
        }
    }, [isInView, numericPart, count]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl hover:bg-white/10 transition-colors text-center"
        >
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex justify-center items-center gap-0.5">
                <motion.span>{rounded}</motion.span>
                <span>{suffix}</span>
            </div>
            <div className="text-gray-400 font-mono text-sm uppercase tracking-wider">{label}</div>
        </motion.div>
    );
};

const About = () => {
    const { t } = useTranslation();

    const stats = [
        { label: t('about.stats.schools'), value: "13+" },
        { label: t('about.stats.participants'), value: "10000+" },
        { label: t('about.stats.days'), value: "6" },
        { label: t('about.stats.activities'), value: "5+" },
    ];

    return (
        <section id="about" className="py-24 md:py-32 relative bg-[var(--color-brand-black)] overflow-hidden">
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 bg-size-[24px_24px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Text Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-sm font-mono font-bold text-[var(--color-brand-orange)] uppercase tracking-widest mb-4">
                                {t('about.vision_title')}
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {t('about.main_title_start')} <span className="text-white">{t('about.main_title_enspy')}</span> {t('about.main_title_mid')} <span className="text-[var(--color-brand-orange)]">{t('about.main_title_end')}</span>
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                <Trans i18nKey="about.p1_full">
                                    Building on the success of initiatives like HackVerse, the <strong className="text-white">Club Génie Informatique (GI)</strong> of ENSPY is taking a giant leap forward with <strong>Tech Week 2025</strong>.
                                </Trans>
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                {t('about.p2')}
                            </p>
                        </motion.div>

                        <motion.div 
                             initial={{ opacity: 0, y: 20 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.8, delay: 0.2 }}
                            className="pt-4"
                        >
                            <a href="#" className="inline-flex items-center gap-2 text-[var(--color-brand-orange)] font-bold hover:text-white transition-colors group">
                                {t('about.learn_more')} <MoveRight className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 md:gap-8">
                        {stats.map((stat, index) => (
                            <Counter 
                                key={stat.label} 
                                value={stat.value} 
                                label={stat.label} 
                                index={index} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

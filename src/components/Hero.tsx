import { motion } from 'motion/react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-brand-orange)]/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-orange)] animate-pulse" />
            <span className="text-sm font-mono uppercase tracking-widest text-gray-300">{t('hero.date_badge')}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]"
        >
          {t('hero.title_top')} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">
            {t('hero.title_highlight')}
          </span> {t('hero.title_bottom')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
            <a
              href="#participate"
              className="group relative px-8 py-4 bg-[var(--color-brand-orange)] text-white font-bold text-lg rounded-full overflow-hidden transition-transform active:scale-95"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                {t('hero.cta_participate')} <ArrowRight size={20} />
              </span>
            </a>
            
            <a
            href="#schedule"
             className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
                {t('hero.cta_schedule')}
            </a>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-gray-500 font-mono text-sm"
        >
            <div className="flex items-center gap-3">
                <MapPin className="text-[var(--color-brand-orange)]" />
                <span>{t('hero.location')}</span>
            </div>
             <div className="flex items-center gap-3">
                <Calendar className="text-[var(--color-brand-orange)]" />
                <span>{t('hero.date_bottom')}</span>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

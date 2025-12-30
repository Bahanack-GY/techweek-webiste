import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Schedule = () => {
    const { t } = useTranslation();

    const schedule = [
        {
            day: "Day 1",
            title: t('schedule.days.day1.title'),
            events: [
                { time: "09:00 AM", title: t('schedule.days.day1.events.opening'), type: "Ceremony" },
                { time: "11:00 AM", title: t('schedule.days.day1.events.visit'), type: "Exhibition" },
                { time: "02:00 PM", title: t('schedule.days.day1.events.conferences'), type: "Conference" },
            ]
        },
        {
            day: "Day 2",
            title: t('schedule.days.day2.title'),
            events: [
                { time: "09:00 AM", title: t('schedule.days.day2.events.pitch_training'), type: "Training" },
                { time: "02:00 PM", title: t('schedule.days.day2.events.project_contest'), type: "Competition" },
            ]
        },
        {
            day: "Day 3",
            title: t('schedule.days.day3.title'),
            events: [
                { time: "09:00 AM", title: t('schedule.days.day3.events.pitch_contest'), type: "Competition" },
                { time: "06:00 PM", title: t('schedule.days.day3.events.cultural_night'), type: "Social" },
            ]
        },
        {
            day: "Day 4",
            title: t('schedule.days.day4.title'),
            events: [
                { time: "08:00 AM", title: t('schedule.days.day4.events.hacking_contest'), type: "Competition" },
            ]
        },
        {
            day: "Day 5",
            title: t('schedule.days.day5.title'),
            events: [
                { time: "08:00 AM", title: t('schedule.days.day5.events.hackathon_launch'), type: "Hackathon" },
                { time: "All Day", title: t('schedule.days.day5.events.dev'), type: "Hackathon" },
            ]
        },
        {
            day: "Day 6",
            title: t('schedule.days.day6.title'),
            events: [
                { time: "08:00 AM", title: t('schedule.days.day6.events.hackathon_close'), type: "Hackathon" },
                { time: "07:00 PM", title: t('schedule.days.day6.events.gala'), type: "Gala" },
            ]
        },
    ];

    return (
        <section id="schedule" className="py-24 bg-black relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                     <div>
                        <h2 className="text-sm font-mono font-bold text-[var(--color-brand-orange)] uppercase tracking-widest mb-4">
                            {t('schedule.title_badge')}
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold">
                            {t('schedule.title_main')} <br /><span className="text-gray-500">{t('schedule.title_highlight')}</span>
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {schedule.map((day, dayIndex) => (
                        <motion.div 
                            key={day.day}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                            className="bg-[var(--color-brand-dark)] rounded-3xl p-8 border border-white/5"
                        >
                            <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
                                <div>
                                    <h4 className="text-2xl font-bold">{day.day}</h4>
                                    <span className="text-sm text-gray-400 font-mono">{day.title}</span>
                                </div>
                                <span className="text-[var(--color-brand-orange)] font-bold text-xl"></span>
                            </div>
                            
                            <div className="space-y-4">
                                {day.events.map((event, index) => (
                                    <div key={index} className="group flex gap-4 items-start hover:bg-white/5 p-3 rounded-lg transition-colors cursor-pointer">
                                        <div className="min-w-20 pt-1">
                                            <div className="flex items-center gap-1 text-xs font-mono text-gray-400">
                                                <Clock size={12} /> {event.time}
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h5 className="text-base font-bold mb-1 group-hover:text-[var(--color-brand-orange)] transition-colors">{event.title}</h5>
                                            <span className="inline-block px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-400 uppercase tracking-wider">{event.type}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Schedule;

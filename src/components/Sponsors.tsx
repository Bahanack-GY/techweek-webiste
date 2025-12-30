import { useTranslation } from 'react-i18next';

const sponsors = [
    { name: "Ennovation Factory", logo: "https://placehold.co/200x60/101010/FFFFFF?text=Ennovation Factory" },
    { name: "UBC", logo: "https://placehold.co/200x60/101010/FFFFFF?text=UBC" },
    { name: "Mountain Hub", logo: "https://placehold.co/200x60/101010/FFFFFF?text=Mountain Hub" },
    { name: "Campost", logo: "https://placehold.co/200x60/101010/FFFFFF?text=Campost" },
    { name: "Orange", logo: "https://placehold.co/200x60/101010/FFFFFF?text=Orange" },
    { name: "Camtel", logo: "https://placehold.co/200x60/101010/FFFFFF?text=Camtel" },
    { name: "MTN", logo: "https://placehold.co/200x60/101010/FFFFFF?text=MTN" },
    { name: "Boisson du Cameroun", logo: "https://placehold.co/200x60/101010/FFFFFF?text=Boisson du Cameroun" },
    { name: "CCAA", logo: "https://placehold.co/200x60/101010/FFFFFF?text=CCAA" },
    { name: "ANTIC", logo: "https://placehold.co/200x60/101010/FFFFFF?text=ANTIC" },
    { name: "HILTON", logo: "https://placehold.co/200x60/101010/FFFFFF?text=HILTON" },
    { name: "Togetech", logo: "https://placehold.co/200x60/101010/FFFFFF?text=Togetech" },
    { name: "Groupe LIS SARL", logo: "https://placehold.co/200x60/101010/FFFFFF?text=Groupe LIS SARL" },
    { name: "UNDP", logo: "https://placehold.co/200x60/101010/FFFFFF?text=UNDP" },
    { name: "GIZ", logo: "https://placehold.co/200x60/101010/FFFFFF?text=GIZ" },
    { name: "Mr Solde", logo: "https://placehold.co/200x60/101010/FFFFFF?text=Mr Solde" },
];

const Sponsors = () => {
    const { t } = useTranslation();

    return (
        <section id="sponsors" className="py-16 border-y border-white/5 bg-black">
             <div className="container mx-auto px-6">
                 <p className="text-center text-gray-500 font-mono text-sm uppercase tracking-widest mb-12">
                     {t('sponsors.title_badge')}
                 </p>
                 
                 <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                     {sponsors.map((sponsor) => (
                         <div key={sponsor.name} className="opacity-50 hover:opacity-100 transition-opacity duration-300">
                             {/* Using text for now as simple representation, but could be images */}
                             <img src={sponsor.logo} alt={sponsor.name} className="h-8 md:h-10 w-auto grayscale hover:grayscale-0 transition-all" />
                         </div>
                     ))}
                 </div>
             </div>
        </section>
    );
};

export default Sponsors;

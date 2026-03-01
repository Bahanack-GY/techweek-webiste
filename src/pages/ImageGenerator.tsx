import { useState, useRef, type ChangeEvent } from 'react';
import * as htmlToImage from 'html-to-image';
import { Camera, Download, Share2, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import logos from the assets folder
import twLogo from '../assets/logos/Tech-week-final-no-bg.png';
import enspyLogo from '../assets/logos/enspy-logo-bg-white.png';
import clubGiLogo from '../assets/logos/version sur fond blancLOGO.png';

const API_URL = import.meta.env.VITE_API_URL ?? 'https://backend.kioske.shop/api';

export default function ImageGenerator() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = async () => {
    if (!frameRef.current) return;
    setIsGenerating(true);
    try {
      // Small delay to ensure any fonts/images are fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await htmlToImage.toPng(frameRef.current, {
        quality: 1.0,
        pixelRatio: 2, // higher resolution
        cacheBust: true,
      });

      const link = document.createElement('a');
      link.download = `techweek-2026-${name.replace(/\s+/g, '-').toLowerCase() || 'participant'}.png`;
      link.href = dataUrl;
      link.click();

      // Track download in backend (fire-and-forget)
      fetch(`${API_URL}/analytics/download`, { method: 'POST' }).catch(() => {});
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Une erreur s\'est produite lors de la génération de l\'image.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!frameRef.current) return;
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await htmlToImage.toBlob(frameRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
      });

      if (!dataUrl) throw new Error("Impossible de générer l'image");

      const file = new File([dataUrl], 'techweek-2026-badge.png', { type: 'image/png' });
      const text = `Je serai à la Tech Week ENSPY 2026 ! Et vous ? #tw-enspy #techweekenspy #innovationcmr #clubgi-enspy #hackathonenspy2026 #cybersecurite`;

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Tech Week 2026',
          text: text,
        });

        // Track share in backend (fire-and-forget)
        fetch(`${API_URL}/analytics/share`, { method: 'POST' }).catch(() => {});
      } else {
        // Fallback for desktop or non-supported browsers
        alert("Le partage direct n'est pas supporté par votre appareil. Veuillez télécharger l'image puis la partager manuellement avec ces hashtags :\n\n" + text);
        handleDownload();
      }
    } catch (err) {
      console.error('Failed to share', err);
      // Only alert if it's an actual error, not user cancellation
      if (err instanceof Error && err.name !== 'AbortError') {
         alert('Erreur lors du partage.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[--color-light] py-12 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container relative z-10 mx-auto max-w-6xl">
        
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 bg-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-bold text-black uppercase"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <h1 className="text-3xl md:text-4xl font-black font-display uppercase tracking-widest text-black bg-[#f29323] px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            Générateur de Badge
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ========================================= */}
          {/* LEFT: Controls                            */}
          {/* ========================================= */}
          <div className="lg:col-span-5 space-y-8 bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit">
            
            <div className="mb-6">
              <h2 className="text-2xl font-black uppercase text-black mb-2">Créez votre Frame</h2>
              <p className="text-slate-700 font-medium">Personnalisez votre badge pour montrer que vous participez à la Tech Week 2026 !</p>
            </div>

            {/* Name Input */}
            <div className="space-y-3">
              <label htmlFor="name" className="block text-sm font-black text-black uppercase tracking-wider">Votre Nom</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: John Doe" 
                className="w-full bg-slate-50 p-4 border-4 border-black shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-bold text-black text-lg uppercase"
                maxLength={25}
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
               <label className="block text-sm font-black text-black uppercase tracking-wider">Votre Photo</label>
               <div className="grid grid-cols-2 gap-4">
                 
                 {/* Upload File */}
                 <label className="flex flex-col items-center justify-center gap-2 p-4 bg-[#FF0000] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 transition-all">
                    <ImageIcon className="w-8 h-8" />
                    <span className="font-bold text-sm uppercase text-center">Galerie</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                 </label>

                 {/* Take Photo */}
                 <label className="flex flex-col items-center justify-center gap-2 p-4 bg-[#196aab] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 transition-all">
                    <Camera className="w-8 h-8" />
                    <span className="font-bold text-sm uppercase text-center">Caméra</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="user"
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                 </label>
               </div>
               <p className="text-xs text-slate-500 font-bold mt-2">* Utilisez une photo carrée pour un meilleur rendu.</p>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t-4 border-dashed border-black flex flex-col gap-4">
              <button 
                onClick={handleDownload}
                disabled={isGenerating || !image || !name}
                className="w-full py-4 bg-black text-white font-black text-lg uppercase tracking-widest border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-6 h-6" />
                {isGenerating ? 'Génération...' : 'Télécharger'}
              </button>
              
              <button 
                onClick={handleShare}
                disabled={isGenerating || !image || !name}
                className="w-full py-4 bg-white text-black font-black text-lg uppercase tracking-widest border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Share2 className="w-6 h-6" />
                Partager
              </button>
            </div>

          </div>

          {/* ========================================= */}
          {/* RIGHT: Live Preview Frame                 */}
          {/* ========================================= */}
          <div className="lg:col-span-7 flex justify-center items-center bg-slate-200 border-4 border-black shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.1)] p-4 md:p-8 min-h-[500px]">
             
             {/* THE ACTUAL FRAME TO RENDER */}
             {/* We use a fixed aspect ratio container so it's perfectly square for Instagram/sharing */}
             <div 
                ref={frameRef} 
                className="relative w-full max-w-[500px] aspect-square bg-[#f8fafc] border-4 border-black overflow-hidden flex flex-col"
                style={{
                   // Apply a subtle paper texture background or keep it solid brutalist
                   backgroundColor: '#ffffff'
                }}
             >
                {/* Decorative Grid inside frame */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                
                {/* Giant "JE SERAI LA" Background Text */}
                <div className="absolute -top-4 -right-8 opacity-10 font-display font-black text-[8rem] leading-[0.8] uppercase pointer-events-none rotate-12 text-black">
                   TECH<br/>WEEK
                </div>

                <div className="absolute bottom-16 -left-4 opacity-10 font-display font-black text-[6rem] leading-[0.8] tracking-tighter uppercase pointer-events-none -rotate-12 text-[#FF0000]">
                   ENSPY
                </div>

                   {/* Main Content Area */}
                   <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-5 relative z-10 w-full">
                   
                   {/* Top Title */}
                   <div className="w-full flex justify-between items-start mb-2 sm:mb-4">
                     <div className="bg-[#f29323] px-2 sm:px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                        <span className="font-black uppercase text-black tracking-widest text-xs sm:text-sm">23-28 MARS 2026</span>
                     </div>
                     <div className="bg-black text-white px-2 sm:px-3 py-1 border-2 border-black transform rotate-2">
                        <span className="font-black uppercase tracking-widest text-xs sm:text-sm">#TECHWEEK</span>
                     </div>
                   </div>

                   {/* Central "JE SERAI LA" Headline */}
                   <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display uppercase tracking-widest text-center text-black mb-2 sm:mb-4 flex flex-col">
                     <span className="bg-[#FF0000] text-white px-3 sm:px-4 py-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 inline-block">JE SERAI</span> 
                     <span className="bg-white text-black px-3 sm:px-4 py-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-2 mt-1 inline-block">LÀ !</span>
                   </h2>

                   {/* User Profile Picture & Name */}
                   <div className="bg-white p-2 sm:p-3 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1 flex flex-col items-center w-[75%] sm:w-[65%] md:w-[60%] max-w-[280px]">
                      
                      {/* Image Placeholder or Actual Image */}
                      <div className="w-full aspect-square bg-slate-200 border-2 border-black mb-2 overflow-hidden flex items-center justify-center relative shadow-inner">
                         {image ? (
                           <img src={image} alt="User picture" className="w-full h-full object-cover" />
                         ) : (
                           <div className="text-center text-slate-400 font-bold uppercase text-xs sm:text-sm flex flex-col items-center">
                              <Camera className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 opacity-30" />
                              <span className="opacity-50 inline-block leading-tight">Votre<br/>Photo</span>
                           </div>
                         )}

                         {/* overlay frame lines (brutalist touch) */}
                         <div className="absolute top-1 left-1 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-black"></div>
                         <div className="absolute bottom-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-black"></div>
                      </div>

                      {/* User Name */}
                      <div className="w-full px-1 truncate text-center font-black uppercase text-sm sm:text-base md:text-lg text-black bg-slate-50 border-2 border-black pb-0.5 sm:pb-1">
                         {name || 'VOTRE NOM ICI'}
                      </div>
                   </div>

                </div>

                {/* Footer Bar with Logos */}
                <div className="relative z-10 w-full bg-white border-t-4 border-black px-2 sm:px-4 py-1.5 sm:py-2 flex justify-between items-center h-[50px] sm:h-[60px] md:h-[70px] shrink-0">
                   <img src={clubGiLogo} alt="Club GI Logo" className="h-[90%] object-contain max-w-[50px] sm:max-w-[70px]" />
                   <img src={enspyLogo} alt="ENSPY Logo" className="h-[90%] object-contain max-w-[40px] sm:max-w-[60px]" />
                   <img src={twLogo} alt="Tech Week Logo" className="h-[90%] object-contain max-w-[70px] sm:max-w-[90px]" />
                </div>

             </div>
          </div>
        </div>

      </div>
    </main>
  );
}

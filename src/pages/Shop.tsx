import { useState, useEffect, type FormEvent } from 'react';
import { ShoppingBag, Star, HelpCircle, X, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'https://backend.kioske.shop/api';

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Checkout States
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '' });
  const [orderStatus, setOrderStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleOrderSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    
    setOrderStatus('submitting');
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: orderForm.name,
          userPhone: orderForm.phone,
          userAddress: orderForm.address,
          productId: selectedProduct._id,
          productName: selectedProduct.name,
          productImage: selectedProduct.imageUrl,
          totalPrice: selectedProduct.price
        })
      });

      if (!res.ok) throw new Error('Order failed');
      
      setOrderStatus('success');
      // DO NOT close modal immediately, let them see the success message
    } catch (err) {
      console.error(err);
      setOrderStatus('error');
    }
  };

  const closeCheckout = () => {
    setSelectedProduct(null);
    setOrderForm({ name: '', phone: '', address: '' });
    setOrderStatus('idle');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FFF0E5] pt-32 pb-24 font-sans selection:bg-[#3B82F6] selection:text-white">
        <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 relative">
          <div className="inline-block bg-[#1E40AF] text-white px-6 py-2 border-4 border-black font-black uppercase tracking-widest text-sm mb-6 transform -rotate-2">
             Boutique Officielle
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-[#1E3A8A] uppercase leading-none mb-6">
            Pimp Ton <span className="text-[#3B82F6] block mt-2">Style Geek</span>
          </h1>
          <p className="text-xl font-bold text-slate-700 max-w-2xl mx-auto">
            Découvre la collection exclusive Tech Week 2026. Des goodises conçus pour les vrais passionnés de technologie. Stock très limité !
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full border-8 border-t-[#3B82F6] border-black h-16 w-16"></div>
          </div>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {products.map((product, i) => (
              <div 
                key={product._id} 
                className={`bg-white border-4 border-black p-6 flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:-translate-x-2 ${
                  i % 3 === 0 ? 'shadow-[8px_8px_0px_0px_#1E40AF]' : 
                  i % 3 === 1 ? 'shadow-[8px_8px_0px_0px_#22C55E]' : 
                  'shadow-[8px_8px_0px_0px_#3B82F6]'
                }`}
              >
                {/* Product Image */}
                <div className="relative aspect-square border-4 border-black bg-slate-100 mb-6 overflow-hidden group">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                      <HelpCircle className="w-16 h-16 mb-2 opacity-50" />
                      <span className="font-bold uppercase tracking-wider text-sm">Image Indisponible</span>
                    </div>
                  )}
                  
                  {/* Stock Badge */}
                  {product.stock <= 5 && product.stock > 0 && (
                     <div className="absolute top-4 left-4 bg-[#FF0000] text-white px-3 py-1 border-2 border-black font-black uppercase text-xs transform -rotate-3 z-10 shadow-[2px_2px_0px_0px_#000]">
                       Plus que {product.stock} !
                     </div>
                  )}
                  {product.stock === 0 && (
                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 backdrop-blur-sm">
                        <div className="bg-white text-[#FF0000] px-6 py-3 border-4 border-black font-black uppercase text-2xl transform rotate-12 shadow-[4px_4px_0px_0px_#000]">
                          Épuisé
                        </div>
                     </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-2xl font-black uppercase text-[#1E3A8A] leading-tight flex-1">
                      {product.name}
                    </h3>
                    <div className="text-2xl font-display font-black text-black whitespace-nowrap">
                      {product.price} <span className="text-[#3B82F6]">F</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 font-medium mb-8 flex-1">
                    {product.description}
                  </p>
                  
                  {/* Action Button */}
                  <button 
                    disabled={product.stock === 0}
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-[#22C55E] text-black font-black uppercase tracking-widest py-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_#000] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {product.stock === 0 ? 'Épuisé' : 'Acheter'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-24 bg-white border-4 border-black border-dashed max-w-3xl mx-auto">
            <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-black uppercase text-slate-500 mb-2">Bourse Vide</h3>
            <p className="text-slate-400 font-bold max-w-md mx-auto">La boutique est actuellement en cours de réapprovisionnement. Les pépites arrivent bientôt !</p>
          </div>
        )}

      </div>

      {/* Checkout Modal Overlay */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeCheckout}></div>
          
          <div className="relative bg-[#FFF0E5] border-4 border-black p-6 md:p-10 w-full max-w-lg shadow-[12px_12px_0px_0px_#1E40AF] z-10 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={closeCheckout}
              className="absolute top-4 right-4 p-2 bg-white border-4 border-black hover:bg-[#FF0000] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {orderStatus === 'success' ? (
               <div className="text-center py-8">
                 <CheckCircle className="w-20 h-20 text-[#22C55E] mx-auto mb-6" />
                 <h2 className="text-3xl font-black uppercase text-black mb-4 leading-tight">Commande <br/>Confirmée !</h2>
                 <p className="text-lg font-bold text-slate-700 mb-8 border-4 border-black bg-white p-4">
                   Merci pour ton achat de <strong className="text-[#1E40AF]">{selectedProduct.name}</strong>. Vous serez contacté sous peu sur WhatsApp pour la livraison.
                 </p>
                 <button 
                   onClick={closeCheckout}
                   className="w-full bg-black text-white font-black uppercase py-4 border-4 border-black shadow-[4px_4px_0px_0px_#22C55E] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
                 >
                   Fermer
                 </button>
               </div>
            ) : (
              <>
                <div className="mb-8 border-b-4 border-black pb-6 pr-12">
                  <h2 className="text-3xl font-black uppercase text-black leading-tight mb-2">Checkout</h2>
                  <p className="font-bold text-slate-600">
                    Achat: <span className="text-[#1E40AF]">{selectedProduct.name}</span> ({selectedProduct.price} FCFA)
                  </p>
                </div>

                {orderStatus === 'error' && (
                  <div className="mb-6 bg-[#FF0000] text-white p-4 font-bold border-4 border-black">
                    Une erreur est survenue. Veuillez réessayer.
                  </div>
                )}

                <form onSubmit={handleOrderSubmit} className="space-y-5">
                  <div>
                    <label className="block font-black uppercase text-sm mb-2">Nom & Prénom</label>
                    <input 
                      type="text" required
                      value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})}
                      className="w-full p-4 border-4 border-black bg-white focus:outline-none focus:ring-0 font-bold"
                      placeholder="Ex: John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-black uppercase text-sm mb-2">Numéro WhatsApp</label>
                    <input 
                      type="tel" required
                      value={orderForm.phone} onChange={e => setOrderForm({...orderForm, phone: e.target.value})}
                      className="w-full p-4 border-4 border-black bg-white focus:outline-none focus:ring-0 font-bold"
                      placeholder="Ex: 002376XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block font-black uppercase text-sm mb-2">Adresse de Livraison (Campus/Quartier)</label>
                    <textarea 
                      required rows={3}
                      value={orderForm.address} onChange={e => setOrderForm({...orderForm, address: e.target.value})}
                      className="w-full p-4 border-4 border-black bg-white focus:outline-none focus:ring-0 font-bold resize-none"
                      placeholder="Ex: ENSPY, Cité U..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={orderStatus === 'submitting'}
                    className="w-full mt-4 bg-[#22C55E] text-black font-black uppercase tracking-widest py-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-50"
                  >
                    {orderStatus === 'submitting' ? 'Validation...' : 'Confirmer la commande'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      </div>
      <Footer />
    </>
  );
}

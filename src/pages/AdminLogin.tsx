import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://backend.kioske.shop/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Identifiants incorrects');
      }

      const data = await res.json();
      localStorage.setItem('arety_techweek_token', data.access_token);
      navigate('/arety/admin'); // Go to dashboard
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Brutalist styling for the login specifically designed for the admin */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF0000] opacity-20 blur-[100px] pointer-events-none rounded-full"></div>
      
      <div className="relative z-10 w-full max-w-md bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(242,147,35,1)]">
        
        <div className="flex flex-col items-center mb-8">
           <div className="bg-black text-white p-4 border-2 border-black mb-4 transform -rotate-3">
              <ShieldAlert className="w-12 h-12 text-[#f29323]" />
           </div>
           <h1 className="text-3xl font-black uppercase tracking-widest text-center">Arety Admin</h1>
           <p className="text-xs uppercase font-bold text-slate-500 tracking-widest mt-2 border-b-2 border-slate-200 pb-1">Secured Access</p>
        </div>

        {status === 'error' && (
          <div className="bg-red-50 border-2 border-red-500 p-3 mb-6 text-red-700 font-bold text-sm text-center uppercase">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-black text-black uppercase tracking-wider">Nom d'utilisateur</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 p-3 border-4 border-black shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-black" 
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-black text-black uppercase tracking-wider">Mot de passe</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 p-3 border-4 border-black shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-black" 
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full py-4 mt-2 bg-black text-white font-black text-lg uppercase tracking-widest border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all flex justify-center items-center gap-3 disabled:opacity-70"
          >
            {status === 'loading' ? (
               <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
               <>
                 <Lock className="w-5 h-5" />
                 Se Connecter
               </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

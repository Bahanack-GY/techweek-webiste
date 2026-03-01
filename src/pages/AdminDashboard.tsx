import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Users, UserSquare2, Activity, Settings, LogOut, CheckCircle, Plus, Search, Filter, Download, ShoppingBag, Trash, ListOrdered, Check, MessageCircle, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || 'https://backend.kioske.shop/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'équipes' | 'participants' | 'statistiques' | 'admins' | 'boutique' | 'commandes'>('équipes');
  
  const [stats, setStats] = useState({ totalDownloads: 0, totalShares: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [teams, setTeams] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterContest, setFilterContest] = useState<'all' | 'hackathon' | 'cybersecurity'>('all');
  const [filterSchool, setFilterSchool] = useState('all');
  const [filterRole, setFilterRole] = useState<'all' | 'Chef' | 'Membre'>('all');
  
  const [newAdminUser, setNewAdminUser] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [adminStatus, setAdminStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productStatus, setProductStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [confirmPaymentModal, setConfirmPaymentModal] = useState<{ id: string, name: string } | null>(null);

  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderFilterStatus, setOrderFilterStatus] = useState<'all' | 'pending' | 'paid'>('all');
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('arety_techweek_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchData = async () => {
    try {
      // Fetch Stats
      fetch(`${API_URL}/analytics`, { headers: getAuthHeaders() })
        .then(res => res.json())
        .then(data => setStats(data || { totalDownloads: 0, totalShares: 0 }))
        .catch(console.error);

      // Fetch Teams
      fetch(`${API_URL}/registrations`, { headers: getAuthHeaders() })
        .then(res => res.json())
        .then(data => setTeams(data || []))
        .catch(console.error);

      // Fetch Admins
      fetch(`${API_URL}/admins`, { headers: getAuthHeaders() })
        .then(res => res.json())
        .then(data => setAdmins(data || []))
        .catch(console.error);

      // Fetch Products
      fetch(`${API_URL}/products`)
        .then(res => res.json())
        .then(data => setProducts(Array.isArray(data) ? data : []))
        .catch(console.error);

      // Fetch Orders
      fetch(`${API_URL}/orders`, { headers: getAuthHeaders() })
        .then(res => res.json())
        .then(data => setOrders(Array.isArray(data) ? data : []))
        .catch(console.error);

    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('arety_techweek_token');
    navigate('/arety/admin/login');
  };

  const handleCreateAdmin = async (e: FormEvent) => {
    e.preventDefault();
    setAdminStatus('idle');
    try {
      const res = await fetch(`${API_URL}/admins`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ username: newAdminUser, password: newAdminPass }),
      });
      if (!res.ok) throw new Error('Failed to create admin');
      
      setAdminStatus('success');
      setNewAdminUser('');
      setNewAdminPass('');
      fetchData(); // refresh admin list
      setTimeout(() => setAdminStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setAdminStatus('error');
    }
  };

  const handleMarkOrderPaid = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: 'paid' })
      });
      if (res.ok) {
        fetchData(); // reload orders and stats
        setConfirmPaymentModal(null);
      }
    } catch (err) {
      console.error('Failed to mark order as paid', err);
    }
  };

  const handleCreateProduct = async (e: FormEvent) => {
    e.preventDefault();
    setProductStatus('idle');
    try {
      let imageUrl = '';

      // Upload image first if exists
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadRes = await fetch(`${API_URL}/products/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('arety_techweek_token')}`
          },
          body: formData
        });
        
        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.imageUrl;
      }

      // Create product with the image URL
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock),
          imageUrl
        }),
      });
      if (!res.ok) throw new Error('Failed to create product');
      
      setProductStatus('success');
      setNewProduct({ name: '', description: '', price: '', stock: '' });
      setImageFile(null);
      fetchData();
      setTimeout(() => setProductStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setProductStatus('error');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce produit ?')) return;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Failed to delete product');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Memoized filtered data
  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      const matchContest = filterContest === 'all' || team.contestType === filterContest;
      const matchSchool = filterSchool === 'all' || team.school === filterSchool;
      const matchSearch = team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          team.leaderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          team.school.toLowerCase().includes(searchQuery.toLowerCase());
      return matchContest && matchSchool && matchSearch;
    });
  }, [teams, searchQuery, filterContest, filterSchool]);

  const filteredParticipants = useMemo(() => {
    const allParticipants = teams.flatMap(team => {
      const leader = {
        name: team.leaderName,
        email: team.leaderEmail,
        phone: team.leaderPhone,
        team: team.teamName,
        school: team.school,
        contest: team.contestType,
        role: 'Chef',
        id: `${team._id}-leader`
      };
      const members = (team.members || []).map((m: any, i: number) => ({
        name: m.name,
        email: m.email,
        phone: m.phone,
        team: team.teamName,
        school: team.school,
        contest: team.contestType,
        role: 'Membre',
        id: `${team._id}-member-${i}`
      }));
      return [leader, ...members];
    });

    return allParticipants.filter(p => {
      const matchContest = filterContest === 'all' || p.contest === filterContest;
      const matchSchool = filterSchool === 'all' || p.school === filterSchool;
      const matchRole = filterRole === 'all' || p.role === filterRole;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.school.toLowerCase().includes(searchQuery.toLowerCase());
      return matchContest && matchSchool && matchRole && matchSearch;
    });
  }, [teams, searchQuery, filterContest, filterSchool, filterRole]);

  // --- Orders Filtering & Pagination ---
  const filteredOrders = useMemo(() => {
    let result = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Latest first
    
    if (orderFilterStatus !== 'all') {
      result = result.filter(o => o.status === orderFilterStatus);
    }
    
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      result = result.filter(o => 
        o.userName.toLowerCase().includes(q) || 
        o.userPhone.includes(q) || 
        o.productName.toLowerCase().includes(q) ||
        o.userAddress.toLowerCase().includes(q)
      );
    }
    
    return result;
  }, [orders, orderFilterStatus, orderSearchQuery]);

  const totalOrderPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const start = (orderCurrentPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  }, [filteredOrders, orderCurrentPage]);

  // Reset page when filters change
  useEffect(() => {
    setOrderCurrentPage(1);
  }, [orderFilterStatus, orderSearchQuery]);

  // Unique schools for the dropdown
  const uniqueSchools = useMemo(() => {
    const schools = new Set(teams.map(t => t.school));
    return Array.from(schools).sort();
  }, [teams]);

  // Analytics Aggregations
  const totalParticipantsCount = useMemo(() => {
    return teams.reduce((acc, t) => acc + 1 + (t.members?.length || 0), 0);
  }, [teams]);

  const teamsByContest = useMemo(() => {
    const hackathon = teams.filter(t => t.contestType === 'hackathon').length;
    const cyber = teams.filter(t => t.contestType === 'cybersecurity').length;
    return [
      { name: 'Hackathon', value: hackathon, color: '#FF0000' },
      { name: 'Cyber Security', value: cyber, color: '#196aab' }
    ];
  }, [teams]);

  const teamsBySchool = useMemo(() => {
    const counts: Record<string, number> = {};
    teams.forEach(t => {
      counts[t.school] = (counts[t.school] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 schools
  }, [teams]);

  // CSV Export Function
  const handleExportCSV = (type: 'teams' | 'participants') => {
    let headers = [];
    let rows: string[][] = [];

    if (type === 'teams') {
      headers = ['Concours', 'Equipe', 'Ecole', 'Chef', 'Email Chef', 'Telephone Chef', 'Membres'];
      rows = filteredTeams.map(t => [
        t.contestType, t.teamName, t.school, t.leaderName, t.leaderEmail, t.leaderPhone, (t.members?.length || 0).toString()
      ]);
    } else {
      headers = ['Concours', 'Nom', 'Email', 'Telephone', 'Equipe', 'Ecole', 'Role'];
      rows = filteredParticipants.map(p => [
        p.contest, p.name, p.email, p.phone, p.team, p.school, p.role
      ]);
    }

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `techweek-${type}-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-black text-white p-6 border-r-4 border-black flex flex-col gap-8 shadow-[8px_0_0_0_var(--color-primary)] z-20">
        <div className="flex items-center gap-3">
          <div className="bg-[#f29323] p-2 border-2 border-white transform rotate-3">
             <ShieldAlert className="w-8 h-8 text-black" />
          </div>
          <div>
            <h1 className="font-black tracking-widest uppercase text-xl mt-1">Techweek</h1>
            <p className="text-[10px] tracking-widest text-[#f29323] uppercase font-bold">Admin Panel</p>
          </div>
        </div>

        <nav className="flex flex-col gap-4 flex-1">
          <button 
            onClick={() => setActiveTab('équipes')}
            className={`flex items-center gap-3 text-left w-full p-3 font-bold uppercase tracking-wider transition-all border-2 border-transparent hover:border-white ${activeTab === 'équipes' ? 'bg-[#f29323] text-black border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] translate-x-1' : ''}`}
          >
            <Users className="w-5 h-5" /> Équipes
          </button>

          <button 
            onClick={() => setActiveTab('participants')}
            className={`flex items-center gap-3 text-left w-full p-3 font-bold uppercase tracking-wider transition-all border-2 border-transparent hover:border-white ${activeTab === 'participants' ? 'bg-[#196aab] text-white border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] translate-x-1' : ''}`}
          >
            <UserSquare2 className="w-5 h-5" /> Participants
          </button>
          
          <button 
            onClick={() => setActiveTab('statistiques')}
            className={`flex items-center gap-3 text-left w-full p-3 font-bold uppercase tracking-wider transition-all border-2 border-transparent hover:border-white ${activeTab === 'statistiques' ? 'bg-[#FF0000] text-white border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] translate-x-1' : ''}`}
          >
            <Activity className="w-5 h-5" /> Analytics
          </button>

          <button 
            onClick={() => setActiveTab('boutique')}
            className={`flex items-center gap-3 text-left w-full p-3 font-bold uppercase tracking-wider transition-all border-2 border-transparent hover:border-white ${activeTab === 'boutique' ? 'bg-[#22C55E] text-black border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] translate-x-1' : ''}`}
          >
            <ShoppingBag className="w-5 h-5" /> Boutique
          </button>

          <button 
            onClick={() => setActiveTab('commandes')}
            className={`flex items-center gap-3 text-left w-full p-3 font-bold uppercase tracking-wider transition-all border-2 border-transparent hover:border-white ${activeTab === 'commandes' ? 'bg-[#F29323] text-black border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] translate-x-1' : ''}`}
          >
            <ListOrdered className="w-5 h-5" /> Commandes
          </button>
          
          <button 
            onClick={() => setActiveTab('admins')}
            className={`flex items-center gap-3 text-left w-full p-3 font-bold uppercase tracking-wider transition-all border-2 border-transparent hover:border-white ${activeTab === 'admins' ? 'bg-white text-black border-black shadow-[4px_4px_0px_0px_var(--color-primary)] translate-x-1' : ''}`}
          >
            <Settings className="w-5 h-5" /> Gestion
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 p-3 bg-red-600 text-white font-bold uppercase tracking-wider border-2 border-white hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" /> Déconnexion
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        
        {/* TEAMS TAB */}
        {activeTab === 'équipes' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
               <h2 className="text-4xl font-black uppercase text-black border-l-8 border-[#f29323] pl-4">Équipes Inscrites</h2>
               
               <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Rechercher équipe, école..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 border-4 border-black font-bold uppercase w-full sm:w-64 focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select 
                      value={filterContest}
                      onChange={e => setFilterContest(e.target.value as any)}
                      className="pl-10 pr-8 py-3 bg-white border-4 border-black font-bold uppercase appearance-none focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <option value="all">Tous les concours</option>
                      <option value="hackathon">Hackathon</option>
                      <option value="cybersecurity">Cyber Security</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select 
                      value={filterSchool}
                      onChange={e => setFilterSchool(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-white border-4 border-black font-bold uppercase appearance-none focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <option value="all">Toutes les écoles</option>
                      {uniqueSchools.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <button 
                    onClick={() => handleExportCSV('teams')}
                    className="flex items-center gap-2 bg-black text-white px-4 py-3 font-bold border-4 border-black uppercase hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_0px_var(--color-primary)] transition-all"
                  >
                    <Download className="w-5 h-5" /> Exporter CSV
                  </button>
               </div>
            </div>
            
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-100 border-b-4 border-black">
                    <th className="p-4 font-black uppercase tracking-wider">Concours</th>
                    <th className="p-4 font-black uppercase tracking-wider">Équipe</th>
                    <th className="p-4 font-black uppercase tracking-wider">École</th>
                    <th className="p-4 font-black uppercase tracking-wider">Chef</th>
                    <th className="p-4 font-black uppercase tracking-wider">Contact</th>
                    <th className="p-4 font-black uppercase tracking-wider text-center">Taille</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center font-bold text-slate-500 uppercase">Aucune équipe trouvée.</td></tr>
                  ) : (
                    filteredTeams.map((team, i) => (
                      <tr key={i} className="border-b-2 border-slate-200 hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs font-bold uppercase text-white border-2 border-black ${team.contestType === 'hackathon' ? 'bg-[#FF0000]' : 'bg-[#196aab]'}`}>
                            {team.contestType}
                          </span>
                        </td>
                        <td className="p-4 font-bold uppercase text-black">{team.teamName}</td>
                        <td className="p-4 font-medium">{team.school}</td>
                        <td className="p-4 font-medium">{team.leaderName}</td>
                        <td className="p-4 font-medium">
                          <div className="flex flex-col">
                            <span>{team.leaderEmail}</span>
                            <span className="text-sm text-slate-500">{team.leaderPhone || team.members[0]?.phone}</span>
                          </div>
                        </td>
                        <td className="p-4 font-bold text-center text-xl">{team.members?.length || 0}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PARTICIPANTS TAB */}
        {activeTab === 'participants' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
               <h2 className="text-4xl font-black uppercase text-black border-l-8 border-[#196aab] pl-4">Individus Inscrits</h2>
               
               <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Rechercher nom, email..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 border-4 border-black font-bold uppercase w-full sm:w-64 focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select 
                      value={filterContest}
                      onChange={e => setFilterContest(e.target.value as any)}
                      className="pl-10 pr-8 py-3 bg-white border-4 border-black font-bold uppercase appearance-none focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <option value="all">Tous les concours</option>
                      <option value="hackathon">Hackathon</option>
                      <option value="cybersecurity">Cyber Security</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select 
                      value={filterSchool}
                      onChange={e => setFilterSchool(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-white border-4 border-black font-bold uppercase appearance-none focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <option value="all">Toutes les écoles</option>
                      {uniqueSchools.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select 
                      value={filterRole}
                      onChange={e => setFilterRole(e.target.value as any)}
                      className="pl-10 pr-8 py-3 bg-white border-4 border-black font-bold uppercase appearance-none focus:outline-none focus:ring-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <option value="all">Tous les rôles</option>
                      <option value="Chef">Chef</option>
                      <option value="Membre">Membre</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => handleExportCSV('participants')}
                    className="flex items-center gap-2 bg-[#196aab] text-white px-4 py-3 font-bold border-4 border-black uppercase hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_0px_black] transition-all"
                  >
                    <Download className="w-5 h-5" /> Exporter CSV
                  </button>
               </div>
            </div>
            
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-100 border-b-4 border-black">
                    <th className="p-4 font-black uppercase tracking-wider">Concours</th>
                    <th className="p-4 font-black uppercase tracking-wider">Nom du Participant</th>
                    <th className="p-4 font-black uppercase tracking-wider">Email</th>
                    <th className="p-4 font-black uppercase tracking-wider">Téléphone</th>
                    <th className="p-4 font-black uppercase tracking-wider">Équipe</th>
                    <th className="p-4 font-black uppercase tracking-wider">Rôle</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center font-bold text-slate-500 uppercase">Aucun participant trouvé.</td></tr>
                  ) : (
                    filteredParticipants.map((participant) => (
                      <tr key={participant.id} className="border-b-2 border-slate-200 hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <span className={`px-2 py-1 text-[10px] font-bold uppercase text-white border-2 border-black ${participant.contest === 'hackathon' ? 'bg-[#FF0000]' : 'bg-[#196aab]'}`}>
                            {participant.contest}
                          </span>
                        </td>
                        <td className="p-4 font-bold uppercase text-black">
                          {participant.name}
                          <div className="text-[10px] text-slate-500 mt-1">{participant.school}</div>
                        </td>
                        <td className="p-4 font-medium text-sm">{participant.email}</td>
                        <td className="p-4 font-medium text-sm">{participant.phone}</td>
                        <td className="p-4 font-bold uppercase text-[#f29323]">{participant.team}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs font-bold uppercase border-2 border-black ${participant.role === 'Chef' ? 'bg-black text-[#f29323]' : 'bg-white text-black'}`}>
                             {participant.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === 'statistiques' && (
          <div className="space-y-6">
            <h2 className="text-4xl font-black uppercase text-black mb-8 border-l-8 border-[#FF0000] pl-4">Vue d'ensemble & Analytics</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-2 transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 text-center">Équipes</h3>
                  <div className="text-4xl font-display font-black text-black">{teams.length}</div>
               </div>
               <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-2 transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 text-center">Participants</h3>
                  <div className="text-4xl font-display font-black text-[#196aab]">{totalParticipantsCount}</div>
               </div>
               <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-2 transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 text-center">Écoles</h3>
                  <div className="text-4xl font-display font-black text-[#f29323]">{uniqueSchools.length}</div>
               </div>
               <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-2 transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 text-center">Badges</h3>
                  <div className="text-4xl font-display font-black text-[#FF0000]">{stats.totalDownloads || 0}</div>
               </div>
            </div>

            {/* Shop Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
               <div className="bg-[#22C55E] border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-2 transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-sm font-black uppercase tracking-widest text-black text-center">Chiffre d'Affaires</h3>
                  <div className="text-4xl font-display font-black text-black">{stats.totalRevenue || 0} F</div>
               </div>
               <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-2 transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 text-center">Commandes</h3>
                  <div className="text-4xl font-display font-black text-black">{stats.totalOrders || 0}</div>
               </div>
               <div className="bg-[#1E40AF] border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-2 transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white text-center">Produits</h3>
                  <div className="text-4xl font-display font-black text-white">{stats.totalProducts || 0}</div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
               <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                 <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-black pb-2">Répartition par Concours</h3>
                 <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie data={teamsByContest} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                         {teamsByContest.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                       <Tooltip contentStyle={{ border: '4px solid black', borderRadius: 0, fontWeight: 'bold', textTransform: 'uppercase' }} />
                       <Legend wrapperStyle={{ fontWeight: 'bold', textTransform: 'uppercase' }} />
                     </PieChart>
                   </ResponsiveContainer>
                 </div>
               </div>

               <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                 <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-black pb-2">Top 5 Écoles</h3>
                 <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={teamsBySchool} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                       <XAxis dataKey="name" tick={{ fontWeight: 'bold', fontSize: 10 }} interval={0} angle={-45} textAnchor="end" height={80} />
                       <YAxis tick={{ fontWeight: 'bold' }} />
                       <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ border: '4px solid black', borderRadius: 0, fontWeight: 'bold', textTransform: 'uppercase' }} />
                       <Bar dataKey="count" fill="#196aab" />
                     </BarChart>
                   </ResponsiveContainer>
                 </div>
               </div>
            </div>

            <h2 className="text-4xl font-black uppercase text-black mb-8 border-l-8 border-[#FF0000] pl-4">Badge Analytics</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-4 transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-lg font-black uppercase tracking-widest text-[#f29323]">Total Téléchargements</h3>
                  <div className="text-7xl font-display font-black text-black">{stats.totalDownloads}</div>
               </div>

               <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-4 transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-lg font-black uppercase tracking-widest text-[#196aab]">Total Partages API</h3>
                  <div className="text-7xl font-display font-black text-black">{stats.totalShares}</div>
               </div>
            </div>
          </div>
        )}

        {/* ADMINS TAB */}
        {activeTab === 'admins' && (
          <div className="space-y-6">
            <h2 className="text-4xl font-black uppercase text-black mb-8 border-l-8 border-black pl-4">Gestion des Administrateurs</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               
               {/* List Admins */}
               <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                 <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-black pb-2">Administrateurs Actifs</h3>
                 <div className="space-y-4">
                    {admins.map((admin) => (
                      <div key={admin._id} className="flex justify-between items-center p-4 bg-slate-100 border-2 border-black">
                        <div>
                          <p className="font-black uppercase text-lg">{admin.username}</p>
                          <p className="text-xs text-slate-500 font-bold uppercase">Créé le {new Date(admin.createdAt).toLocaleDateString()}</p>
                        </div>
                        <ShieldAlert className="w-6 h-6 text-[#4ADE80]" />
                      </div>
                    ))}
                  </div>
               </div>

               {/* Create Admin */}
               <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit">
                 <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-black pb-2 flex items-center gap-2">
                    <Plus className="w-6 h-6 text-[#FF0000]" /> Nouvel Admin
                 </h3>
                 
                 {adminStatus === 'success' && (
                    <div className="p-3 mb-4 bg-green-100 border-2 border-green-500 text-green-700 font-bold uppercase text-sm flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" /> Admin Créé
                    </div>
                 )}
                 {adminStatus === 'error' && (
                    <div className="p-3 mb-4 bg-red-100 border-2 border-red-500 text-red-700 font-bold uppercase text-sm">
                      Erreur lors de la création
                    </div>
                 )}

                 <form onSubmit={handleCreateAdmin} className="space-y-4">
                   <div>
                     <label className="block text-sm font-black uppercase mb-2">Nom d'utilisateur</label>
                     <input 
                       type="text" 
                       required 
                       value={newAdminUser}
                       onChange={e => setNewAdminUser(e.target.value)}
                       className="w-full p-4 border-4 border-black bg-slate-50 focus:outline-none focus:ring-0 font-bold" 
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-black uppercase mb-2">Mot de passe</label>
                     <input 
                       type="password" 
                       required 
                       minLength={6}
                       value={newAdminPass}
                       onChange={e => setNewAdminPass(e.target.value)}
                       className="w-full p-4 border-4 border-black bg-slate-50 focus:outline-none focus:ring-0 font-bold" 
                     />
                   </div>
                   <button 
                     type="submit" 
                     className="w-full mt-4 bg-black text-white p-4 font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_var(--color-primary)] hover:translate-x-1 hover:translate-y-1 transition-all"
                   >
                     Ajouter l'admin
                   </button>
                 </form>
               </div>

            </div>
          </div>
        )}

        {/* BOUTIQUE TAB */}
        {activeTab === 'boutique' && (
          <div className="space-y-6">
            <h2 className="text-4xl font-black uppercase text-black mb-8 border-l-8 border-[#22C55E] pl-4">Gestion Boutique</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               
               {/* List Products */}
               <div className="lg:col-span-2 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                 <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-black pb-2 flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-[#196aab]" /> Catalogue
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product) => (
                      <div key={product._id} className="flex flex-col border-4 border-black bg-slate-50 overflow-hidden group">
                        <div className="h-48 bg-slate-200 border-b-4 border-black overflow-hidden relative">
                           {product.imageUrl ? (
                             <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">Pas d'image</div>
                           )}
                           <div className="absolute top-2 right-2 bg-[#22C55E] text-black font-black px-2 py-1 border-2 border-black">
                             {product.price} FCFA
                           </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <h4 className="font-black uppercase text-lg mb-1">{product.name}</h4>
                          <p className="text-sm font-medium text-slate-600 line-clamp-2 flex-1">{product.description}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase bg-black text-white px-2 py-1">Stock: {product.stock}</span>
                            <button onClick={() => handleDeleteProduct(product._id)} className="p-2 bg-[#FF0000] text-white border-2 border-black hover:bg-red-700 transition-colors">
                               <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {products.length === 0 && (
                      <div className="col-span-full p-8 text-center font-bold text-slate-500 uppercase border-4 border-dashed border-slate-300">
                        Aucun produit dans la boutique
                      </div>
                    )}
                 </div>
               </div>

               {/* Create Product */}
               <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit">
                 <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-black pb-2 flex items-center gap-2">
                    <Plus className="w-6 h-6 text-[#22C55E]" /> Nouveau Produit
                 </h3>
                 
                 {productStatus === 'success' && (
                    <div className="p-3 mb-4 bg-green-100 border-2 border-green-500 text-green-700 font-bold uppercase text-sm flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" /> Produit Créé
                    </div>
                 )}
                 {productStatus === 'error' && (
                    <div className="p-3 mb-4 bg-red-100 border-2 border-red-500 text-red-700 font-bold uppercase text-sm">
                      Erreur lors de la création
                    </div>
                 )}

                 <form onSubmit={handleCreateProduct} className="space-y-4">
                   <div>
                     <label className="block text-sm font-black uppercase mb-2">Nom</label>
                     <input 
                       type="text" required value={newProduct.name}
                       onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                       className="w-full p-3 border-4 border-black bg-slate-50 focus:outline-none font-bold" 
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-black uppercase mb-2">Description</label>
                     <textarea 
                       required rows={3} value={newProduct.description}
                       onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                       className="w-full p-3 border-4 border-black bg-slate-50 focus:outline-none font-bold resize-none" 
                     />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-black uppercase mb-2">Prix (FCFA)</label>
                       <input 
                         type="number" required min="0" value={newProduct.price}
                         onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                         className="w-full p-3 border-4 border-black bg-slate-50 focus:outline-none font-bold" 
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-black uppercase mb-2">Stock</label>
                       <input 
                         type="number" required min="0" value={newProduct.stock}
                         onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                         className="w-full p-3 border-4 border-black bg-slate-50 focus:outline-none font-bold" 
                       />
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-black uppercase mb-2">Image du produit</label>
                     <input 
                       type="file" 
                       accept="image/*"
                       onChange={e => {
                         if (e.target.files && e.target.files.length > 0) {
                           setImageFile(e.target.files[0]);
                         }
                       }}
                       className="w-full p-2 border-4 border-black bg-slate-50 focus:outline-none font-bold text-sm file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-sm file:font-black file:uppercase file:bg-[#22C55E] file:text-black hover:file:bg-black hover:file:text-[#22C55E] file:cursor-pointer" 
                     />
                   </div>
                   
                   <button 
                     type="submit" 
                     className="w-full mt-6 bg-[#22C55E] text-black p-4 font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_var(--color-primary)] hover:translate-x-1 hover:translate-y-1 transition-all"
                   >
                     Ajouter l'article
                   </button>
                 </form>
               </div>

            </div>
          </div>
        )}

        {/* COMMANDES TAB */}
        {activeTab === 'commandes' && (
          <div className="space-y-6">
            <h2 className="text-4xl font-black uppercase text-black mb-8 border-l-8 border-[#F29323] pl-4">Commandes Boutique</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher par nom, téléphone, produit..." 
                  value={orderSearchQuery}
                  onChange={e => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-4 border-black bg-white focus:outline-none font-bold"
                />
              </div>
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select 
                  value={orderFilterStatus}
                  onChange={e => setOrderFilterStatus(e.target.value as any)}
                  className="w-full pl-12 pr-4 py-3 border-4 border-black bg-white focus:outline-none font-bold appearance-none cursor-pointer"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="paid">Payés</option>
                </select>
              </div>
            </div>

            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left whitespace-nowrap">
                   <thead className="bg-black text-white font-bold uppercase tracking-wider text-sm">
                     <tr>
                       <th className="p-4 border-r-2 border-[#333]">Client</th>
                       <th className="p-4 border-r-2 border-[#333]">Contact & Adresse</th>
                       <th className="p-4 border-r-2 border-[#333]">Produit</th>
                       <th className="p-4 border-r-2 border-[#333]">Prix</th>
                       <th className="p-4 border-r-2 border-[#333]">Date</th>
                       <th className="p-4 border-r-2 border-[#333]">Statut</th>
                       <th className="p-4 text-center">Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {paginatedOrders.length === 0 ? (
                       <tr><td colSpan={7} className="p-8 text-center font-bold text-slate-500 uppercase">Aucune commande trouvée.</td></tr>
                     ) : (
                       paginatedOrders.map((order) => {
                         const orderImage = order.productImage || products.find(p => p._id === order.productId)?.imageUrl;
                         return (
                         <tr key={order._id} className="border-b-2 border-slate-200 hover:bg-slate-50 transition-colors">
                           <td className="p-4 font-bold">{order.userName}</td>
                           <td className="p-4">
                             <div className="text-sm font-bold text-black">{order.userPhone}</div>
                             <div className="text-xs text-slate-500">{order.userAddress}</div>
                           </td>
                           <td className="p-4">
                             <div className="flex items-center gap-3">
                               {orderImage ? (
                                 <img 
                                   src={orderImage} 
                                   alt={order.productName} 
                                   onClick={() => setPreviewImage(orderImage)}
                                   className="w-12 h-12 object-cover border-2 border-black cursor-pointer hover:scale-105 transition-transform" 
                                 />
                               ) : (
                                 <div className="w-12 h-12 bg-slate-200 border-2 border-black flex items-center justify-center">
                                   <ShoppingBag className="w-5 h-5 text-slate-400" />
                                 </div>
                               )}
                               <span className="font-bold text-[#1E40AF]">{order.productName}</span>
                             </div>
                           </td>
                           <td className="p-4 font-black">{order.totalPrice} F</td>
                           <td className="p-4 text-sm font-bold text-slate-600">
                             {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                           </td>
                           <td className="p-4">
                             {order.status === 'paid' ? (
                               <span className="bg-green-100 text-green-700 border-2 border-green-700 px-2 py-1 text-xs font-black uppercase flex items-center gap-1 w-max">
                                 <Check className="w-3 h-3" /> Payé
                               </span>
                             ) : (
                               <span className="bg-orange-100 text-orange-700 border-2 border-orange-700 px-2 py-1 text-xs font-black uppercase flex items-center gap-1 w-max">
                                 En attente
                               </span>
                             )}
                           </td>
                           <td className="p-4 flex items-center justify-center gap-2">
                             <a 
                               href={`https://wa.me/${order.userPhone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(order.userName)},%20nous%20vous%20contactons%20suite%20%C3%A0%20votre%20commande%20de%20%22${encodeURIComponent(order.productName)}%22%20(Tech%20Week%202026).`} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="p-2 bg-[#25D366] text-white border-2 border-black hover:bg-[#128C7E] transition-colors"
                               title="Contacter sur WhatsApp"
                             >
                                <MessageCircle className="w-5 h-5" />
                             </a>
                             {order.status === 'pending' && (
                               <button 
                                 onClick={() => setConfirmPaymentModal({ id: order._id, name: order.userName })} 
                                 className="p-2 bg-black text-white border-2 border-black hover:bg-slate-800 transition-colors"
                                 title="Marquer comme payé"
                               >
                                  <Check className="w-5 h-5" />
                               </button>
                             )}
                           </td>
                         </tr>
                       );
                      })
                     )}
                   </tbody>
                 </table>
               </div>
               
               {/* Pagination Controls */}
               {totalOrderPages > 1 && (
                 <div className="bg-slate-50 border-t-4 border-black p-4 flex items-center justify-between">
                   <p className="font-bold text-sm text-slate-600">
                     Affichage {((orderCurrentPage - 1) * ORDERS_PER_PAGE) + 1} à {Math.min(orderCurrentPage * ORDERS_PER_PAGE, filteredOrders.length)} sur {filteredOrders.length}
                   </p>
                   <div className="flex gap-2">
                     <button 
                       onClick={() => setOrderCurrentPage(prev => Math.max(prev - 1, 1))}
                       disabled={orderCurrentPage === 1}
                       className="px-4 py-2 border-2 border-black font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
                     >
                       Précédent
                     </button>
                     <button 
                       onClick={() => setOrderCurrentPage(prev => Math.min(prev + 1, totalOrderPages))}
                       disabled={orderCurrentPage === totalOrderPages}
                       className="px-4 py-2 border-2 border-black font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
                     >
                       Suivant
                     </button>
                   </div>
                 </div>
               )}
            </div>
          </div>
        )}

      </main>

      {/* Image Preview Lightbox */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setPreviewImage(null)}></div>
          
          <div className="relative z-10 max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute -top-16 right-0 p-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#1E40AF] hover:bg-[#FF0000] hover:text-white transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-w-full max-h-[85vh] bg-white border-4 border-black shadow-[12px_12px_0px_0px_#f29323] object-contain" 
            />
          </div>
        </div>
      )}

      {/* Payment Confirmation Modal */}
      {confirmPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmPaymentModal(null)}></div>
          
          <div className="relative bg-white border-4 border-black p-6 md:p-8 w-full max-w-md shadow-[8px_8px_0px_0px_#FF0000] z-10">
             <div className="text-center">
               <div className="mx-auto bg-orange-100 border-4 border-black w-20 h-20 flex items-center justify-center rounded-full mb-6">
                 <ShoppingBag className="w-10 h-10 text-[#F29323]" />
               </div>
               <h3 className="text-2xl font-black uppercase text-black mb-4">Confirmation de Paiement</h3>
               <p className="text-slate-600 font-bold mb-8">
                 Avez-vous bien reçu l'argent de <span className="text-black">{confirmPaymentModal.name}</span> ? Cette action mettra à jour le stock et les revenus du tableau de bord de manière irréversible.
               </p>
               
               <div className="flex flex-col gap-4 mt-6">
                 <button 
                   onClick={() => handleMarkOrderPaid(confirmPaymentModal.id)}
                   className="w-full bg-[#22C55E] text-black font-black uppercase tracking-widest py-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
                 >
                   Oui, J'ai Reçu L'Argent
                 </button>
                 <button 
                   onClick={() => setConfirmPaymentModal(null)}
                   className="w-full bg-white text-black font-black uppercase tracking-widest py-4 border-4 border-black hover:bg-slate-100 transition-colors"
                 >
                   Annuler
                 </button>
               </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}

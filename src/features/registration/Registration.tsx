import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Code, ArrowLeft, Send, Loader2, UserPlus, UserMinus } from 'lucide-react';
import { useCreateRegistration } from './hooks';
import type { ContestType, TeamMember } from './types';
import { schoolNames } from '../../data/schools';

type SelectedContest = ContestType | null;

const TEAM_SIZE = {
  hackathon: { min: 3, max: 3 },
  cybersecurity: { min: 3, max: 5 },
} as const;

const emptyMember = (): TeamMember => ({ name: '', email: '', phone: '' });

const buildInitialMembers = (contest: ContestType): TeamMember[] =>
  Array.from({ length: TEAM_SIZE[contest].min - 1 }, emptyMember);

const inputClass = 'w-full bg-slate-50 p-4 border-4 border-black shadow-[4px_4px_0px_0px_var(--color-dark)] focus:outline-none focus:ring-0 focus:shadow-[2px_2px_0px_0px_var(--color-dark)] focus:translate-y-0.5 focus:translate-x-0.5 transition-all font-medium text-black';

export default function Registration() {
  const navigate = useNavigate();
  const [selectedContest, setSelectedContest] = useState<SelectedContest>(null);
  const [teamName, setTeamName] = useState('');
  const [school, setSchool] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const mutation = useCreateRegistration();

  const handleSelection = (type: SelectedContest) => {
    setSelectedContest(type);
    mutation.reset();
    if (type) {
      setMembers(buildInitialMembers(type));
    }
  };

  const resetForm = () => {
    setTeamName('');
    setSchool('');
    setLeaderName('');
    setLeaderEmail('');
    setLeaderPhone('');
    setMembers([]);
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)));
  };

  const addMember = () => {
    if (!selectedContest) return;
    if (members.length < TEAM_SIZE[selectedContest].max - 1) {
      setMembers((prev) => [...prev, emptyMember()]);
    }
  };

  const removeMember = (index: number) => {
    if (!selectedContest) return;
    if (members.length > TEAM_SIZE[selectedContest].min - 1) {
      setMembers((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedContest) return;

    mutation.mutate(
      {
        contestType: selectedContest,
        teamName,
        school,
        leaderName,
        leaderEmail,
        leaderPhone,
        members,
      },
      {
        onSuccess: () => {
          resetForm();
          navigate('/registration-success');
        },
      },
    );
  };

  const accentColor = selectedContest === 'hackathon' ? '#FF0000' : '#196aab';
  const totalMembers = selectedContest ? members.length + 1 : 0;
  const canAdd = selectedContest ? members.length < TEAM_SIZE[selectedContest].max - 1 : false;
  const canRemove = selectedContest ? members.length > TEAM_SIZE[selectedContest].min - 1 : false;

  const renderSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12 w-full max-w-5xl mx-auto">
      {/* Hackathon Option */}
      <div className="relative group cursor-pointer" onClick={() => handleSelection('hackathon')}>
        <div className="absolute inset-0 bg-[#FF0000] translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 border-4 border-black transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
        <div className="relative bg-white border-4 border-black p-8 md:p-12 h-full flex flex-col items-center text-center hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300">
          <div className="bg-[#FF0000] p-4 border-4 border-black transform -rotate-3 mb-6">
            <Code className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-widest text-black mb-4">HACKATHON</h3>
          <p className="text-slate-800 font-medium mb-4">
            Construisez l'avenir. Formez votre équipe, innovez et présentez des solutions technologiques pour résoudre les problèmes de demain.
          </p>
          <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-8">3 membres par équipe</p>
          <button className="mt-auto px-8 py-3 bg-white text-black font-black uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors">
            Sélectionner
          </button>
        </div>
      </div>

      {/* Cyber Security Option */}
      <div className="relative group cursor-pointer" onClick={() => handleSelection('cybersecurity')}>
        <div className="absolute inset-0 bg-[#196aab] translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 border-4 border-black transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
        <div className="relative bg-white border-4 border-black p-8 md:p-12 h-full flex flex-col items-center text-center hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300">
          <div className="bg-[#196aab] p-4 border-4 border-black transform rotate-3 mb-6">
            <ShieldAlert className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-widest text-black mb-4">CYBER SECURITY</h3>
          <p className="text-slate-800 font-medium mb-4">
            Défendez les systèmes. Participez à un CTF intense et prouvez vos compétences en sécurité offensive et défensive.
          </p>
          <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-8">3 à 5 membres par équipe</p>
          <button className="mt-auto px-8 py-3 bg-white text-black font-black uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors">
            Sélectionner
          </button>
        </div>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-12 relative">
        <button
          onClick={() => handleSelection(null)}
          className="absolute -top-6 -left-4 md:-top-8 md:-left-8 bg-[#f29323] p-3 md:p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-black z-10"
          aria-label="Retour au choix du concours"
        >
          <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="mb-10 pt-4 md:pt-0 pl-8 md:pl-12">
          <h3 className="text-2xl md:text-4xl font-black font-display uppercase tracking-wider text-black">
            Inscription au{' '}
            <span style={{ color: accentColor }}>
              {selectedContest === 'hackathon' ? 'Hackathon' : 'Concours Cyber Sécurité'}
            </span>
          </h3>
          <p className="text-slate-700 font-medium mt-3 text-sm md:text-base border-l-4 border-black pl-4 bg-slate-50 py-2">
            Veuillez remplir les informations de votre équipe pour valider votre inscription.
            <span className="block mt-1 font-bold">{totalMembers} membre{totalMembers > 1 ? 's' : ''} dans l'équipe</span>
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Team info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-2">
              <label htmlFor="teamName" className="block text-sm font-black text-black uppercase tracking-wider">Nom de l'équipe</label>
              <input type="text" id="teamName" required value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Ex: Les Hackers du Dimanche" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label htmlFor="school" className="block text-sm font-black text-black uppercase tracking-wider">Établissement / École</label>
              <select id="school" required value={school} onChange={(e) => setSchool(e.target.value)} className={`${inputClass} cursor-pointer appearance-none rounded-none`}>
                <option value="" disabled>Sélectionnez votre école</option>
                {schoolNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Leader section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="px-4 py-1 border-4 border-black font-black text-sm uppercase tracking-wider" style={{ backgroundColor: accentColor, color: 'white' }}>
                Chef d'équipe
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="leaderName" className="block text-sm font-black text-black uppercase tracking-wider">Nom complet</label>
                <input type="text" id="leaderName" required value={leaderName} onChange={(e) => setLeaderName(e.target.value)} placeholder="John Doe" className={inputClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="leaderEmail" className="block text-sm font-black text-black uppercase tracking-wider">Email</label>
                <input type="email" id="leaderEmail" required value={leaderEmail} onChange={(e) => setLeaderEmail(e.target.value)} placeholder="john@example.com" className={inputClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="leaderPhone" className="block text-sm font-black text-black uppercase tracking-wider">Téléphone (WhatsApp)</label>
                <input type="tel" id="leaderPhone" required value={leaderPhone} onChange={(e) => setLeaderPhone(e.target.value)} placeholder="+237 6XX XX XX XX" className={inputClass} />
              </div>
            </div>
          </div>

          {/* Members section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="px-4 py-1 border-4 border-black bg-black text-white font-black text-sm uppercase tracking-wider">
                Membres de l'équipe
              </div>
              {canAdd && (
                <button
                  type="button"
                  onClick={addMember}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  Ajouter
                </button>
              )}
            </div>

            <div className="space-y-6">
              {members.map((member, index) => (
                <div key={index} className="border-4 border-black p-4 md:p-6 bg-slate-50 relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-black uppercase tracking-wider text-slate-600">
                      Membre {index + 2}
                    </span>
                    {canRemove && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white border-2 border-black text-xs font-black uppercase hover:bg-red-600 transition-colors"
                      >
                        <UserMinus className="w-3 h-3" />
                        Retirer
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-black uppercase tracking-wider">Nom complet</label>
                      <input type="text" required value={member.name} onChange={(e) => updateMember(index, 'name', e.target.value)} placeholder="Jane Doe" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-black uppercase tracking-wider">Email</label>
                      <input type="email" required value={member.email} onChange={(e) => updateMember(index, 'email', e.target.value)} placeholder="jane@example.com" className={inputClass} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-black text-black uppercase tracking-wider">Téléphone</label>
                      <input type="tel" required value={member.phone} onChange={(e) => updateMember(index, 'phone', e.target.value)} placeholder="+237 6XX XX XX XX" className={inputClass} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {mutation.isError && (
            <div className="bg-red-50 border-4 border-red-500 p-4 text-red-700 font-bold">
              {mutation.error instanceof Error ? mutation.error.message : 'Une erreur est survenue.'}
            </div>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-5 md:py-6 mt-4 text-white font-black text-xl md:text-2xl uppercase tracking-widest border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1.5 hover:translate-y-1.5 transition-all flex justify-center items-center gap-4 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentColor }}
          >
            {mutation.isPending ? (
              <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin" />
            ) : (
              <Send className="w-6 h-6 md:w-8 md:h-8" />
            )}
            {mutation.isPending ? 'Envoi en cours...' : "Soumettre l'Inscription"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <section id="registration" className="relative py-24 min-h-screen bg-[--color-light] border-b-6 md:border-b-8 border-black overflow-hidden flex flex-col justify-center">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute right-0 -top-32 w-96 h-96 bg-[#f29323] opacity-20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-display uppercase tracking-widest text-black flex flex-col items-center gap-2">
            <span className="bg-[#f29323] px-6 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
              INSCRIPTION
            </span>
            <span className="bg-white px-6 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1 mt-2">
              AUX CONCOURS
            </span>
          </h2>
          {!selectedContest && (
            <p className="mt-8 text-lg sm:text-xl font-bold font-mono text-slate-800 uppercase tracking-widest bg-white inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Choisissez Votre Défi
            </p>
          )}
        </div>

        {selectedContest ? renderForm() : renderSelection()}

      </div>
    </section>
  );
}

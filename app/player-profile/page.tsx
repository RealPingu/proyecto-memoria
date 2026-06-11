'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function PlayerProfilePage() {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('antipatron_player_id');
    setPlayerId(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname || !age || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/player/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          playerId, 
          nickname, 
          age: parseInt(age) 
        }),
      });

      if (response.ok) {
        router.push('/survey'); // Vamos a la encuesta Likert (vacía por ahora)
      } else {
        alert("Error al guardar el perfil. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-6 md:p-12 overflow-hidden items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col max-w-md w-full space-y-8 bg-game-surface/20 p-10 border border-game-muted/10 rounded-sm"
      >
        <header className="text-center space-y-2">
          <h1 className="text-2xl font-bold uppercase tracking-tighter text-game-accent italic">
            Registro de Participante
          </h1>
          <p className="text-game-muted text-[10px] uppercase tracking-widest">
            Identificación para fines estadísticos
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-game-muted ml-1">Nombre o Nickname</label>
            <input 
              type="text"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Ej: Jugador_01"
              className="w-full h-12 bg-game-bg border border-game-muted/30 px-4 text-game-text focus:border-game-accent outline-none transition-colors font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-game-muted ml-1">Edad</label>
            <input 
              type="number"
              required
              min="18"
              max="99"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="18"
              className="w-full h-12 bg-game-bg border border-game-muted/30 px-4 text-game-text focus:border-game-accent outline-none transition-colors font-mono text-sm"
            />
            <p className="text-[9px] text-red-500/60 uppercase mt-1 ml-1 italic">
              * Mínimo 18 años requerido por protocolo ético.
            </p>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || !nickname || !age}
            className={`h-14 w-full font-bold uppercase tracking-widest transition-all active:scale-95 mt-4 ${
              !nickname || !age || isSubmitting
                ? 'bg-game-surface text-game-muted opacity-50 cursor-not-allowed'
                : 'bg-game-accent text-game-bg hover:bg-game-text'
            }`}
          >
            {isSubmitting ? 'Guardando...' : 'Confirmar Perfil'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

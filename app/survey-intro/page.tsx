'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SurveyIntroPage() {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('antipatron_player_id');
    setPlayerId(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validación extra en el cliente antes de enviar
    const nicknameRegex = /^[a-zA-Z0-9_]+$/;
    if (!nicknameRegex.test(nickname)) {
      setErrorMessage("Formato inválido: Solo se permiten letras, números y guiones bajos.");
      return;
    }

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

      const data = await response.json();

      if (response.ok) {
        router.push('/survey'); 
      } else if (response.status === 409) {
        setErrorMessage("Este nickname ya está siendo usado por otro participante.");
      } else if (data.error === 'INVALID_FORMAT') {
        setErrorMessage(data.message);
      } else {
        setErrorMessage("Error al guardar el perfil. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setErrorMessage("Error de conexión. Revisa tu internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const parsedAge = parseInt(age);

  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-6 md:p-12 overflow-hidden items-center justify-center relative font-sans">
      <div className="flex flex-col h-full max-w-2xl w-full mx-auto space-y-8 items-center justify-center">
        
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 shrink-0"
        >
          <h1 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter text-game-accent">
            Perfilado Inicial
          </h1>
          <p className="text-game-muted uppercase tracking-widest text-[10px] md:text-xs max-w-md mx-auto">
            Antes de comenzar, necesitamos conocer tu relación con las interfaces digitales.
          </p>
        </motion.header>

        <motion.main 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-md space-y-8 bg-game-surface/20 p-8 md:p-10 border border-game-muted/10 rounded-sm shrink-0"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest text-game-muted ml-1 italic">Nombre o Nickname</label>
              <input 
                type="text"
                required
                minLength={3}
                maxLength={20}
                pattern="^[a-zA-Z0-9_]+$"
                title="Solo letras, números y guiones bajos (sin espacios)"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="..."
                className={`w-full h-12 bg-game-bg border ${errorMessage && (errorMessage.includes("nickname") || errorMessage.includes("Formato")) ? 'border-red-500' : 'border-game-muted/30'} px-4 text-game-text focus:border-game-accent outline-none transition-colors font-mono text-sm`}
              />
              <div className="flex justify-between px-1">
                <p className="text-[9px] text-game-muted uppercase italic">3-20 caracteres (A-Z, 0-9, _)</p>
                <p className="text-[9px] text-game-muted font-mono">{nickname.length}/20</p>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest text-game-muted ml-1 italic">Edad</label>
              <input 
                type="number"
                required
                min="18"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="18"
                className="w-full h-12 bg-game-bg border border-game-muted/30 px-4 text-game-text focus:border-game-accent outline-none transition-colors font-mono text-sm"
              />
              {parsedAge >= 118 ? (
                <p className="text-[9px] text-red-500 font-bold uppercase mt-1 ml-1 leading-tight">
                  La persona más longeva al día de hoy tiene 117 años. ¡Felicitaciones por el logro de todas formas!
                </p>
              ) : (
                <p className="text-[9px] text-red-500/50 uppercase mt-1 ml-1 italic">
                  * Mínimo 18 años requerido.
                </p>
              )}
            </div>

            {errorMessage && (
              <p className="text-[10px] text-red-500 bg-red-500/10 p-2 border border-red-500/20 text-center uppercase tracking-tight">
                {errorMessage}
              </p>
            )}

            <div className="flex flex-col space-y-4 pt-4">
              <button 
                type="submit"
                disabled={isSubmitting || nickname.length < 3 || !age || parsedAge < 18}
                className={`h-14 w-full font-bold uppercase tracking-widest transition-all active:scale-95 ${
                  nickname.length < 3 || !age || isSubmitting || parsedAge < 18
                    ? 'bg-game-surface text-game-muted opacity-50 cursor-not-allowed'
                    : 'bg-game-accent text-game-bg hover:bg-game-text'
                }`}
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Datos'}
              </button>

              <Link 
                href="/onboarding" 
                className="text-center text-[10px] uppercase tracking-widest text-game-muted hover:text-game-accent transition-colors underline underline-offset-8 decoration-zinc-800"
              >
                Regresar a las reglas
              </Link>
            </div>
          </form>
        </motion.main>

      </div>
    </div>
  );
}

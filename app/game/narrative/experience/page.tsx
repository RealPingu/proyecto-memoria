'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NarrativeExperiencePage() {
  const [experience, setExperience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isConsenting, setIsConsenting] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('antipatron_player_id');
      const consent = localStorage.getItem('antipatron_consent') !== 'false';
      setPlayerId(id);
      setIsConsenting(consent);

      // Cargar borrador local si existe
      const localDraft = localStorage.getItem('antipatron_personal_experience');
      if (localDraft) {
        setExperience(localDraft);
      }

      // Opcionalmente recuperar de la base de datos si ya había enviado algo
      if (id) {
        fetch(`/api/player/experience?playerId=${id}`)
          .then(res => (res.ok ? res.json() : null))
          .then(data => {
            if (data && typeof data.personalExperience === 'string') {
              setExperience(data.personalExperience);
              localStorage.setItem('antipatron_personal_experience', data.personalExperience);
            }
          })
          .catch(err => console.error('Error recuperando experiencia:', err))
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 1000) {
      setExperience(val);
      localStorage.setItem('antipatron_personal_experience', val);
    }
  };

  const handleNavigateNext = () => {
    // Limpiamos el borrador local al avanzar
    localStorage.removeItem('antipatron_personal_experience');
    
    if (isConsenting) {
      router.push('/marking/post-intro');
    } else {
      router.push('/credits');
    }
  };

  const handleSubmit = async () => {
    if (!playerId) {
      handleNavigateNext();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/player/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId,
          personalExperience: experience.trim() || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la experiencia');
      }
      handleNavigateNext();
    } catch (e) {
      console.error(e);
      alert('No pudimos guardar tu respuesta, pero puedes continuar.');
      handleNavigateNext();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    // Si se omite, borramos cualquier borrador escrito y avanzamos
    setExperience('');
    localStorage.removeItem('antipatron_personal_experience');
    handleNavigateNext();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-game-bg">
        <p className="text-game-muted animate-pulse uppercase tracking-widest text-[10px] italic">
          Cargando...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-8 overflow-hidden items-center justify-center font-sans">
      <div className="flex flex-col h-full max-w-2xl w-full mx-auto py-4 md:py-12">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-1 shrink-0 py-2 mb-6"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase italic tracking-tighter text-game-accent">
            Tu Experiencia
          </h1>
          <p className="text-game-muted text-[10px] md:text-xs uppercase tracking-widest">
            Cuéntanos sobre ti
          </p>
        </motion.header>

        {/* Main Content */}
        <motion.main 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center min-h-0 overflow-y-auto custom-scrollbar"
        >
          <div className="my-auto w-full max-w-xl space-y-6">
            <div className="bg-game-surface/30 p-6 md:p-10 border border-game-muted/20 rounded-sm shadow-2xl text-left space-y-6">
              
              <div className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed text-center font-sans">
                <p>
                  La <span className="text-game-accent font-semibold">historia</span> de Camo es <span className="text-game-accent font-semibold">ficticia</span>, esta dramatiza y simplifica algunos patrones oscuros.
                </p>
                <p>
                  Pero estos son <span className="text-amber-400 font-semibold">reales</span> y tienen <span className="text-amber-400 font-semibold">consecuencias</span> sobre ti y todos los usuarios de medios digitales.
                </p>
                <p>
                  Estos no son los únicos que existen y están presentes de varias formas y en varios lugares en los medios digitales.
                </p>
                <p className="pt-2 font-medium">
                  ¿Alguna vez te has sentido <span className="text-red-400 font-semibold">engañado</span>, <span className="text-red-400 font-semibold">confundido</span> o <span className="text-red-400 font-semibold">impulsado</span> al comprar en internet, intentar cancelar una suscripción, jugar videojuegos, etc?
                </p>
              </div>

              <p className="leading-relaxed text-zinc-400 text-xs md:text-sm text-center border-t border-game-muted/10 pt-4">
                Si lo deseas, cuéntanos brevemente alguna <span className="text-game-accent font-semibold">experiencia o anécdota personal</span> donde creas haber sido <span className="text-amber-400 font-semibold">afectado</span> por un <span className="text-game-accent font-semibold">patrón oscuro</span>:
              </p>

              <div className="space-y-2 relative">
                <textarea
                  value={experience}
                  onChange={handleTextChange}
                  placeholder="Escribe tu experiencia aquí (opcional)..."
                  className="w-full h-36 bg-game-bg/60 border border-game-muted/30 focus:border-game-accent rounded-sm p-3 text-zinc-200 text-sm outline-none resize-none placeholder:text-zinc-600 focus:ring-1 focus:ring-game-accent font-sans transition-all"
                />
                <div className="text-right text-[10px] font-mono text-game-muted uppercase tracking-wider">
                  {experience.length} / 1000 caracteres
                </div>
              </div>

            </div>
          </div>
        </motion.main>

        {/* Footer Actions */}
        <footer className="shrink-0 pt-4 pb-2 md:pb-6">
          <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto gap-3 md:gap-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 h-12 bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer border border-game-accent disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Enviar y Continuar'}
            </button>
            <button
              onClick={handleSkip}
              disabled={isSubmitting}
              className="flex-1 h-12 border border-zinc-700 text-game-muted font-bold uppercase tracking-widest text-xs flex items-center justify-center hover:bg-game-surface hover:text-game-accent transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              Omitir
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}

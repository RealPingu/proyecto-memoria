'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OnboardingPage() {
  const [consent, setConsent] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('antipatron_player_id');
    setPlayerId(id);
  }, []);

  const handleSaveConsent = async () => {
    if (consent && playerId) {
      try {
        fetch('/api/player/consent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playerId, consent }),
        });
      } catch (error) {
        console.error("Error silencioso al guardar datos:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-6 md:p-12 overflow-hidden items-center justify-center relative">
      <div className="flex flex-col h-full max-w-2xl w-full mx-auto space-y-6">
        
        <header className="text-center space-y-2 shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold uppercase italic tracking-tighter text-game-accent">
            Reglas de la Experiencia
          </h1>
          <p className="text-game-muted uppercase tracking-widest text-[10px] md:text-xs">
            Por favor, lee con atención antes de comenzar
          </p>
        </header>

        <section className="flex-1 min-h-0 space-y-8 bg-game-surface/30 p-6 md:p-8 border border-game-muted/20 rounded-sm overflow-y-auto">
          <div className="flex items-start space-x-4">
            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-game-accent shrink-0" />
            <p className="leading-relaxed text-zinc-300">
              <span className="text-lg font-bold text-game-accent block mb-1">Propósito:</span>
              Antipatron fue diseñado como una experiencia gamificada (demo) sobre patrones oscuros, con el fin de recaudar datos de estudio sobre su capacidad para enseñar a identificarlos.
            </p>
          </div>

          <div className="flex items-start space-x-4">
            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-game-accent shrink-0" />
            <p className="leading-relaxed text-zinc-300">
              <span className="text-lg font-bold text-game-accent block mb-1">Normas de comportamiento:</span>
              Antipatron presenta actividades comunitarias y requiere el consentimiento de mantener una actitud seria, evitando el uso de lenguaje obsceno, soez o de índole ajena al propósito de la experiencia.
            </p>
          </div>

          <div className="flex items-start space-x-4">
            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-game-accent shrink-0" />
            <p className="leading-relaxed text-zinc-300">
              <span className="text-lg font-bold text-game-accent block mb-1">Recaudación de datos:</span>
              Antipatron recolecta datos básicos de la experiencia con propósitos educativos y de estudio, manteniendo el anonimato de los mismos en todo momento.
            </p>
          </div>
        </section>

        <div className="space-y-6 shrink-0 pb-2">
          <div className="w-full opacity-30 hover:opacity-50 transition-opacity">
            <label className="flex items-start space-x-3 cursor-pointer group p-2">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  checked={consent}
                  onChange={() => {
                    const nextValue = !consent;
                    setConsent(nextValue);
                    if (nextValue === false) {
                      setShowPopup(true);
                    }
                  }}
                  className="peer h-4 w-4 opacity-0 absolute cursor-pointer"
                />
                <div className="h-4 w-4 border border-zinc-800 bg-transparent peer-checked:bg-zinc-900 transition-all flex items-center justify-center rounded-sm">
                  {consent && (
                    <svg className="w-3 h-3 text-zinc-700 fill-current" viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500 transition-colors leading-tight">
                He leído las reglas, acepto las normas de comportamiento y doy mi consentimiento para que mis decisiones anónimas sean procesadas con fines académicos.
              </span>
            </label>
          </div>

          <div className="flex flex-col w-full max-w-xs mx-auto space-y-3">
            <Link 
              href="/survey-intro"
              onClick={handleSaveConsent}
              className="flex items-center justify-center h-14 w-full bg-game-accent text-game-bg font-bold uppercase tracking-widest transition-all hover:bg-game-text active:scale-95 text-center"
            >
              Entrar al juego
            </Link>

            <Link 
              href="/"
              className="flex items-center justify-center h-14 w-full border border-zinc-700 text-game-muted font-bold uppercase tracking-widest transition-all hover:bg-game-surface hover:text-game-accent active:scale-95 text-center"
            >
              Volver al menú
            </Link>
          </div>
        </div>
      </div>

      {/* POPUP DE PERSUASIÓN (Dark Pattern: Obstrucción) */}
      {showPopup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-game-bg/95 backdrop-blur-sm p-6">
          <div className="bg-game-surface border border-game-muted/30 p-8 max-w-md w-full space-y-6 text-center animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-bold text-game-accent uppercase tracking-tighter">
              ¿Está seguro de esta decisión?
            </h2>
            <p className="text-sm text-game-muted leading-relaxed">
              Al deshabilitar el consentimiento, la integridad de los datos académicos se verá comprometida, dificultando el análisis de su perfil narrativo y el propósito de este estudio.
            </p>
            
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => {
                  setConsent(true); // Re-activamos
                  setShowPopup(false);
                }}
                className="h-12 bg-game-accent text-game-bg font-bold uppercase text-xs tracking-widest hover:bg-game-text transition-all"
              >
                Re-activar consentimiento (Recomendado)
              </button>
              
              <button 
                onClick={() => setShowPopup(false)}
                className="text-[10px] text-game-muted/50 hover:text-game-muted transition-colors uppercase tracking-widest underline underline-offset-4"
              >
                Continuar sin consentimiento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

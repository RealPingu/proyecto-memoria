'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NarrativeInstructionsPage() {
  const router = useRouter();

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
            Instrucciones
          </h1>
          <p className="text-game-muted text-[10px] md:text-xs uppercase tracking-widest">
            Fase Pre-Narrativa
          </p>
        </motion.header>

        {/* Main Content */}
        <motion.main 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center min-h-0 overflow-y-auto custom-scrollbar"
        >
          <div className="my-auto w-full max-w-xl space-y-6">
            <div className="bg-game-surface/30 p-6 md:p-10 border border-game-muted/20 rounded-sm shadow-2xl text-left space-y-4">
              <h2 className="text-sm font-bold font-mono text-game-accent uppercase tracking-wider text-center mb-2">
                Explicación del Juego
              </h2>
              
              <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                Antipatron es un juego narrativo simple, donde debes ir leyendo y tomando decisiones correctas para progresar en la historia.
              </p>
              
              <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                Para avanzar solo aprieta el cuadro de texto una vez para adelantar el texto y otra para seguir.
              </p>
              
              <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                Para ayudarte a seguir el hilo de la conversación, <span className="text-game-accent font-semibold">el nombre del personaje que está hablando</span> se mostrará de manera destacada justo encima del cuadro de texto.
              </p>
              
              <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                Algunas pantallas requerirán de tu atención para tomar la decisión correcta.
              </p>
              
              <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                Siempre podrás retroceder con el botón "Atrás" en la parte superior si no alcanzaste a leer algo o quieres releer algún diálogo.
              </p>
              
              <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                También dispondrás de un menú para saltar a cualquier capítulo que ya hayas leído, estará en la parte superior derecha.
              </p>
            </div>
          </div>
        </motion.main>

        {/* Footer Actions */}
        <footer className="shrink-0 pt-4 pb-2 md:pb-6">
          <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto gap-3 md:gap-4">
            <button
              onClick={() => router.push('/game/narrative')}
              className="flex-1 h-16 md:h-12 bg-game-accent text-game-bg font-bold uppercase tracking-widest text-sm md:text-xs flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer border border-game-accent"
            >
              Comenzar Aventura
            </button>
            <button
              onClick={() => {
                const isConsenting = localStorage.getItem('antipatron_consent') !== 'false';
                if (isConsenting) {
                  router.push('/marking/intro');
                } else {
                  router.push('/survey/profile');
                }
              }}
              className="flex-1 h-16 md:h-12 border border-zinc-700 text-game-muted font-bold uppercase tracking-widest text-sm md:text-xs flex items-center justify-center hover:bg-game-surface hover:text-game-accent transition-all active:scale-95 cursor-pointer"
            >
              Regresar
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
